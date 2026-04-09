#!/usr/bin/env python3
"""
Emit word,slot_occurrences,puzzle_count from a Clueless JSONL (h1..v3 per line).
Columns match tools/clueless/reports/clueless-all-puzzle-words.csv.

Usage:
  python tools/clueless/exportCluelessJsonlVocabCsv.py
  python tools/clueless/exportCluelessJsonlVocabCsv.py -i other.jsonl -o out.csv
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def main() -> None:
    root = repo_root()
    reports = root / "tools" / "clueless" / "reports"
    default_in = reports / "clueless-culled-aoa-plus-shipped-wordcap12.jsonl"
    default_out = reports / "clueless-wordcap12-vocabulary.csv"

    ap = argparse.ArgumentParser(description="Export vocabulary CSV from Clueless JSONL")
    ap.add_argument("-i", "--input", type=Path, default=default_in)
    ap.add_argument("-o", "--output", type=Path, default=default_out)
    args = ap.parse_args()

    if not args.input.is_file():
        print(f"Not found: {args.input}", file=sys.stderr)
        sys.exit(1)

    slots: Counter[str] = Counter()
    puzzles_with: dict[str, set[int]] = defaultdict(set)

    with args.input.open(encoding="utf-8") as f:
        for idx, line in enumerate(f):
            line = line.strip()
            if not line:
                continue
            o = json.loads(line)
            for k in ("h1", "h2", "h3", "v1", "v2", "v3"):
                w = str(o[k]).lower()
                slots[w] += 1
                puzzles_with[w].add(idx)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8", newline="") as out:
        w = csv.writer(out)
        w.writerow(["word", "slot_occurrences", "puzzle_count"])
        for word in sorted(slots.keys()):
            w.writerow([word, slots[word], len(puzzles_with[word])])

    try:
        rel = args.output.relative_to(root)
    except ValueError:
        rel = args.output
    print(f"Wrote {rel}: {len(slots):,} words", flush=True)


if __name__ == "__main__":
    main()
