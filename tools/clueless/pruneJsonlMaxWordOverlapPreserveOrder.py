#!/usr/bin/env python3
"""
Remove puzzles from a JSONL so no two remaining puzzles share more than two words.

When puzzles i and j (i < j in file order) share 3+ words, always drop j — keep the
earlier line (AoA block first in combined lists = higher priority).

Repeats until no bad pairs remain.

Usage:
  python tools/clueless/pruneJsonlMaxWordOverlapPreserveOrder.py
  python tools/clueless/pruneJsonlMaxWordOverlapPreserveOrder.py -i in.jsonl -o out.jsonl
"""
from __future__ import annotations

import argparse
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


def batch_remove_later_index(pairs: list[tuple[int, int, int]]) -> set[int]:
    """Always remove the higher index (later in file)."""
    to_remove: set[int] = set()
    for i, j, _k in pairs:
        to_remove.add(j)
    return to_remove


def apply_removals(active: list[dict], to_remove: set[int]) -> list[dict]:
    return [p for idx, p in enumerate(active) if idx not in to_remove]


def main() -> None:
    root = repo_root()
    reports = root / "tools" / "clueless" / "reports"
    default_in = reports / "clueless-culled-aoa-plus-shipped.jsonl"
    default_out = reports / "clueless-culled-aoa-plus-shipped.jsonl"

    ap = argparse.ArgumentParser(
        description="Prune JSONL: max 2 shared words; keep earlier puzzles on ties"
    )
    ap.add_argument("-i", "--input", type=Path, default=default_in)
    ap.add_argument("-o", "--output", type=Path, default=default_out)
    args = ap.parse_args()

    if not args.input.is_file():
        print(f"Not found: {args.input}", file=sys.stderr)
        sys.exit(1)

    active = load_jsonl(args.input)
    start_n = len(active)
    round_num = 0
    total_removed = 0

    while True:
        pairs = find_pairs(active, min_overlap=2)
        if not pairs:
            break
        round_num += 1
        rem = batch_remove_later_index(pairs)
        before = len(active)
        active = apply_removals(active, rem)
        total_removed += before - len(active)
        print(
            f"Round {round_num}: {len(pairs)} pair(s) with 3+ shared words -> "
            f"removed {len(rem)} puzzle(s); {before:,} -> {len(active):,}",
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
    print(f"Wrote {rel}: {start_n:,} -> {len(active):,} (removed {start_n - len(active):,} total)", flush=True)


if __name__ == "__main__":
    main()
