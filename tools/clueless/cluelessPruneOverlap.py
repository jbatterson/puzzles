#!/usr/bin/env python3
"""
Prune clueless-combined.jsonl by removing puzzles that overlap too much with others.

Score for a puzzle = (min Zipf among its 6 words, sum Zipf). Lower min is worse; tie-break
by lower sum. Zipf comes from wordle-answers-zipf-curated.csv with wordfreq fallback.

1) Batch-remove one puzzle per pair with >3 shared words (the worse-scoring puzzle).
2) Repeat: while any pair shares >2 words, batch-remove the worse puzzle from each such pair
   until no overlapping pairs remain.

Writes JSONL with the same object shape as the input (e.g. source field preserved).
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

try:
    from wordfreq import zipf_frequency
except ImportError:
    print(
        "Missing dependency. Install with:\n  pip install -r tools/clueless/requirements-wordfreq.txt",
        file=sys.stderr,
    )
    sys.exit(1)


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def normalize_slots(e: dict) -> dict[str, str]:
    return {k: str(e[k]).lower() for k in ("h1", "h2", "h3", "v1", "v2", "v3")}


def canonical_words(p: dict) -> frozenset[str]:
    return frozenset(normalize_slots(p).values())


def load_combined_jsonl(path: Path) -> list[dict]:
    rows: list[dict] = []
    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def load_zipf_csv(path: Path) -> dict[str, float]:
    zm: dict[str, float] = {}
    with path.open(encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            w = (row.get("word") or "").strip().lower()
            if not w:
                continue
            z = row.get("zipf_frequency") or row.get("zipf")
            if z is None or z == "":
                continue
            zm[w] = float(z)
    return zm


def zipf_word(w: str, zm: dict[str, float]) -> float:
    if w in zm:
        return zm[w]
    return float(zipf_frequency(w, "en"))


def puzzle_min_sum(words: frozenset[str], zm: dict[str, float]) -> tuple[float, float]:
    zs = [zipf_word(x, zm) for x in words]
    return min(zs), sum(zs)


def worse_index(i: int, j: int, active: list[dict], zm: dict[str, float]) -> int:
    """Return index of puzzle to remove (lower min Zipf loses; tie-break lower sum, then j)."""
    wi = canonical_words(active[i])
    wj = canonical_words(active[j])
    mi, si = puzzle_min_sum(wi, zm)
    mj, sj = puzzle_min_sum(wj, zm)
    if mi < mj:
        return i
    if mj < mi:
        return j
    if si < sj:
        return i
    if sj < si:
        return j
    return j


def find_pairs(active: list[dict], min_overlap: int) -> list[tuple[int, int, int]]:
    """Pairs (i, j, |intersection|) with i < j and |∩| > min_overlap."""
    sets = [canonical_words(p) for p in active]
    n = len(active)
    out: list[tuple[int, int, int]] = []
    for i in range(n):
        for j in range(i + 1, n):
            k = len(sets[i] & sets[j])
            if k > min_overlap:
                out.append((i, j, k))
    return out


def batch_remove(active: list[dict], pairs: list[tuple[int, int, int]], zm: dict[str, float]) -> set[int]:
    to_remove: set[int] = set()
    for i, j, _k in pairs:
        to_remove.add(worse_index(i, j, active, zm))
    return to_remove


def apply_removals(active: list[dict], to_remove: set[int]) -> list[dict]:
    return [p for idx, p in enumerate(active) if idx not in to_remove]


def main() -> None:
    root = repo_root()
    default_in = root / "tools" / "reports" / "clueless-combined.jsonl"
    default_out = root / "tools" / "reports" / "clueless-combined-pruned.jsonl"
    default_zipf = root / "tools" / "reports" / "wordle-answers-zipf-curated.csv"

    ap = argparse.ArgumentParser(description="Prune combined Clueless JSONL by overlap + Zipf score")
    ap.add_argument("-i", "--input", type=Path, default=default_in)
    ap.add_argument("-o", "--output", type=Path, default=default_out)
    ap.add_argument("--zipf-csv", type=Path, default=default_zipf)
    args = ap.parse_args()

    if not args.input.is_file():
        print(f"Not found: {args.input}", file=sys.stderr)
        sys.exit(1)
    if not args.zipf_csv.is_file():
        print(f"Not found: {args.zipf_csv}", file=sys.stderr)
        sys.exit(1)

    zm = load_zipf_csv(args.zipf_csv)
    active = load_combined_jsonl(args.input)
    start_n = len(active)
    print(f"Loaded {start_n:,} puzzles from {args.input}", flush=True)

    # Phase 1: pairs with >3 shared words (overlap > 3)
    pairs_gt3 = find_pairs(active, min_overlap=3)
    print(f"Phase 1 - pairs with >3 shared words: {len(pairs_gt3)}", flush=True)
    rem = batch_remove(active, pairs_gt3, zm)
    active = apply_removals(active, rem)
    print(f"  Removing {len(rem)} puzzle(s); remaining {len(active):,}", flush=True)

    # Phase 2: pairs with >2 shared words until none
    round_num = 0
    while True:
        pairs_gt2 = find_pairs(active, min_overlap=2)
        if not pairs_gt2:
            break
        round_num += 1
        rem = batch_remove(active, pairs_gt2, zm)
        before = len(active)
        active = apply_removals(active, rem)
        after = len(active)
        print(
            f"Phase 2 round {round_num} - pairs with >2 shared words: {len(pairs_gt2)}; "
            f"remove {len(rem)} -> {before:,} -> {after:,}",
            flush=True,
        )

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        for e in active:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

    try:
        rel = args.output.relative_to(root)
    except ValueError:
        rel = args.output
    print(flush=True)
    print(f"Wrote {rel} ({len(active):,} puzzles); removed {start_n - len(active):,} total", flush=True)


if __name__ == "__main__":
    main()
