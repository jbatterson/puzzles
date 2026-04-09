#!/usr/bin/env python3
"""
Drop rows from an AoA-style pool CSV when the puzzle shares 3+ words with any
puzzle in puzzlegames/clueless/puzzles.js (existing shipped list).

Uses a set of sorted word-triples from each existing puzzle: a candidate shares
>=3 words with some existing iff one of its C(6,3) triples appears in that set.

Usage:
  python tools/clueless/filterAoAPoolVsExistingPuzzles.py
  python tools/clueless/filterAoAPoolVsExistingPuzzles.py -i pool.csv -o out.csv
"""
from __future__ import annotations

import argparse
import csv
import re
import sys
from itertools import combinations
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def parse_puzzles_js(path: Path) -> list[dict[str, str]]:
    text = path.read_text(encoding="utf-8")
    text = re.sub(r"//[^\n]*", "", text)
    pat = re.compile(
        r'h1:\s*"([^"]+)"\s*,\s*h2:\s*"([^"]+)"\s*,\s*h3:\s*"([^"]+)"\s*,'
        r'\s*v1:\s*"([^"]+)"\s*,\s*v2:\s*"([^"]+)"\s*,\s*v3:\s*"([^"]+)"'
    )
    out: list[dict[str, str]] = []
    for m in pat.finditer(text):
        out.append(
            {
                "h1": m.group(1).lower(),
                "h2": m.group(2).lower(),
                "h3": m.group(3).lower(),
                "v1": m.group(4).lower(),
                "v2": m.group(5).lower(),
                "v3": m.group(6).lower(),
            }
        )
    return out


def word_set(p: dict[str, str]) -> frozenset[str]:
    return frozenset(p[k] for k in ("h1", "h2", "h3", "v1", "v2", "v3"))


def triples_from_words(words: frozenset[str]) -> set[tuple[str, str, str]]:
    w = sorted(words)
    return set(combinations(w, 3))


def build_forbidden_triples(existing: list[dict[str, str]]) -> set[tuple[str, str, str]]:
    forbidden: set[tuple[str, str, str]] = set()
    for p in existing:
        forbidden.update(triples_from_words(word_set(p)))
    return forbidden


def candidate_hits_shipped(words: frozenset[str], forbidden: set[tuple[str, str, str]]) -> bool:
    if len(words) != 6:
        return True
    for t in combinations(sorted(words), 3):
        if t in forbidden:
            return True
    return False


def main() -> None:
    root = repo_root()
    default_js = root / "puzzlegames" / "clueless" / "puzzles.js"
    default_in = root / "tools" / "clueless" / "reports" / "clueless-pool-aoa.csv"
    default_out = root / "tools" / "clueless" / "reports" / "clueless-pool-aoa-vs-existing.csv"

    ap = argparse.ArgumentParser(
        description="Filter pool CSV: drop puzzles with >=3 words shared vs puzzles.js"
    )
    ap.add_argument("--puzzles-js", type=Path, default=default_js, help="Shipped Clueless puzzles.js")
    ap.add_argument("-i", "--input", type=Path, default=default_in, help="Input pool CSV")
    ap.add_argument("-o", "--output", type=Path, default=default_out, help="Output pool CSV")
    args = ap.parse_args()

    for label, p in [("puzzles.js", args.puzzles_js), ("Input CSV", args.input)]:
        if not p.is_file():
            print(f"Not found: {label} -- {p}", file=sys.stderr)
            sys.exit(1)

    existing = parse_puzzles_js(args.puzzles_js)
    forbidden = build_forbidden_triples(existing)

    total = 0
    kept = 0
    dropped = 0

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.input.open(encoding="utf-8", newline="") as fin, args.output.open(
        "w", encoding="utf-8", newline=""
    ) as fout:
        reader = csv.reader(fin)
        writer = csv.writer(fout)
        header = next(reader, None)
        if not header or len(header) < 6:
            print("Input CSV missing header or columns", file=sys.stderr)
            sys.exit(1)
        writer.writerow(header)

        for row in reader:
            if not row or not row[0].strip():
                continue
            total += 1
            h1, h2, h3, v1, v2, v3 = (row[i].strip().lower() for i in range(6))
            words = frozenset((h1, h2, h3, v1, v2, v3))
            if candidate_hits_shipped(words, forbidden):
                dropped += 1
                continue
            kept += 1
            writer.writerow(row)

    try:
        rel = args.output.relative_to(root)
    except ValueError:
        rel = args.output

    print(f"Shipped puzzles in puzzles.js: {len(existing):,}", flush=True)
    print(f"Distinct triples index:       {len(forbidden):,}", flush=True)
    print(f"Pool rows read:                 {total:,}", flush=True)
    print(f"Kept:                           {kept:,}", flush=True)
    print(f"Dropped (>=3 words overlap):    {dropped:,}", flush=True)
    print(f"Wrote {rel}", flush=True)


if __name__ == "__main__":
    main()
