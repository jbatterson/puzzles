#!/usr/bin/env python3
"""
Merge two Clueless JSONLs (e.g. random + coverage AoA selections), dedupe by
the six-word set (orientation may differ), then prune until no two puzzles
share more than two words (same batch logic as cluelessPruneOverlap.py).

When two puzzles share 3+ words, drop the one that is harder for young readers:
higher min AoA among its six words (later acquisition). Tie-break: higher sum AoA.
Keep the puzzle with lower min (and lower sum on tie). Scores from
five_letter_words_AoA.csv (column 1); missing words -> 0.0.

Usage:
  python tools/clueless/combineAoASelectionsPruneOverlap.py
  python tools/clueless/combineAoASelectionsPruneOverlap.py -a a.jsonl -b b.jsonl -o out.jsonl
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def normalize_slots(e: dict) -> dict[str, str]:
    return {k: str(e[k]).lower() for k in ("h1", "h2", "h3", "v1", "v2", "v3")}


def canonical_words(p: dict) -> frozenset[str]:
    return frozenset(normalize_slots(p).values())


def load_jsonl(path: Path) -> list[dict]:
    rows: list[dict] = []
    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def load_aoa_scores(csv_path: Path) -> dict[str, float]:
    zm: dict[str, float] = {}
    with csv_path.open(encoding="utf-8", newline="") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if not row or not row[0].strip():
                continue
            w = row[0].strip().lower()
            if len(w) != 5 or not w.isalpha():
                continue
            z = 0.0
            try:
                z = float(row[1])
            except (IndexError, ValueError):
                pass
            zm[w] = z
    return zm


def puzzle_min_sum(words: frozenset[str], zm: dict[str, float]) -> tuple[float, float]:
    zs = [zm.get(x, 0.0) for x in words]
    return min(zs), sum(zs)


def worse_index(i: int, j: int, active: list[dict], zm: dict[str, float]) -> int:
    """Index to remove: higher min AoA (later-learned floor word); tie-break higher sum."""
    wi = canonical_words(active[i])
    wj = canonical_words(active[j])
    mi, si = puzzle_min_sum(wi, zm)
    mj, sj = puzzle_min_sum(wj, zm)
    if mi > mj:
        return i
    if mj > mi:
        return j
    if si > sj:
        return i
    if sj > si:
        return j
    return j


def find_pairs(active: list[dict], min_overlap: int) -> list[tuple[int, int, int]]:
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


def merge_dedupe(first: list[dict], second: list[dict]) -> list[dict]:
    seen: set[frozenset[str]] = set()
    out: list[dict] = []
    for p in first + second:
        key = canonical_words(p)
        if len(key) != 6:
            continue
        if key in seen:
            continue
        seen.add(key)
        out.append(p)
    return out


def prune_overlap(active: list[dict], zm: dict[str, float]) -> list[dict]:
    """Same phases as cluelessPruneOverlap: 4+ then iterate 3+."""
    pairs_gt3 = find_pairs(active, min_overlap=3)
    rem = batch_remove(active, pairs_gt3, zm)
    active = apply_removals(active, rem)

    round_num = 0
    while True:
        pairs_gt2 = find_pairs(active, min_overlap=2)
        if not pairs_gt2:
            break
        round_num += 1
        rem = batch_remove(active, pairs_gt2, zm)
        active = apply_removals(active, rem)

    return active


def main() -> None:
    root = repo_root()
    reports = root / "tools" / "clueless" / "reports"
    default_a = reports / "clueless-selected-aoa-random.jsonl"
    default_b = reports / "clueless-selected-aoa-coverage.jsonl"
    default_out = reports / "clueless-selected-aoa-combined-pruned.jsonl"
    default_scores = reports / "five_letter_words_AoA.csv"

    ap = argparse.ArgumentParser(description="Merge two AoA JSONLs and prune 3+ word overlap")
    ap.add_argument("-a", "--first", type=Path, default=default_a, help="First JSONL (order preserved for dedupe)")
    ap.add_argument("-b", "--second", type=Path, default=default_b, help="Second JSONL")
    ap.add_argument("-o", "--output", type=Path, default=default_out)
    ap.add_argument("--scores", type=Path, default=default_scores, help="AoA CSV for tie-break scores")
    args = ap.parse_args()

    for label, p in [("First JSONL", args.first), ("Second JSONL", args.second), ("Scores CSV", args.scores)]:
        if not p.is_file():
            print(f"Not found: {label} -- {p}", file=sys.stderr)
            sys.exit(1)

    zm = load_aoa_scores(args.scores)
    a = load_jsonl(args.first)
    b = load_jsonl(args.second)
    merged = merge_dedupe(a, b)
    deduped = len(a) + len(b) - len(merged)

    print(f"Loaded {len(a):,} + {len(b):,} puzzles", flush=True)
    print(f"After dedupe (same 6 words): {len(merged):,} (dropped {deduped:,} duplicate sets)", flush=True)

    start_merge = len(merged)
    active = prune_overlap(merged, zm)
    removed = start_merge - len(active)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        for e in active:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

    try:
        rel = args.output.relative_to(root)
    except ValueError:
        rel = args.output
    print(f"After overlap prune (>2 words shared): {len(active):,} puzzles (removed {removed:,})", flush=True)
    print(f"Wrote {rel}", flush=True)


if __name__ == "__main__":
    main()
