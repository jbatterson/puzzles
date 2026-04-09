#!/usr/bin/env python3
"""
Build a complete CSV of every valid, unique-solution Clueless puzzle from the
curated word list.  Streams results to disk so memory stays low (~200 MB).

Output columns: h1,h2,h3,v1,v2,v3,sum_zipf

Usage:
  python tools/clueless/buildCandidatePool.py path/to/wordle_answers.txt
  python tools/clueless/buildCandidatePool.py path/to/wordle_answers.txt --curated path/to/curated.csv
  python tools/clueless/buildCandidatePool.py path/to/wordle_answers.txt -o pool.csv

Dedup modes (--dedup):
  hv         Keep only (h1,h2,h3) <= (v1,v2,v3) lexicographically (default; legacy).
  transpose  Keep one of each transpose pair: min of (h1..v3) vs (v1..h3) as 6-tuples.
"""
from __future__ import annotations

import argparse
import csv
import sys
import time
from collections import defaultdict
from pathlib import Path


def load_curated(csv_path: Path) -> tuple[list[str], dict[str, float]]:
    words: list[str] = []
    zipf: dict[str, float] = {}
    with csv_path.open(encoding="utf-8") as f:
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
            words.append(w)
            zipf[w] = z
    return words, zipf


def load_wordlist_txt(path: Path) -> list[str]:
    words: list[str] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        w = line.strip().lower()
        if len(w) == 5 and w.isalpha():
            words.append(w)
    return words


def build_pos_index(words: list[str]) -> dict[int, dict[str, set[str]]]:
    idx: dict[int, dict[str, set[str]]] = {p: defaultdict(set) for p in range(5)}
    for w in words:
        for p in range(5):
            idx[p][w[p]].add(w)
    return idx


def build_alt_table(
    curated: list[str], full_set: set[str]
) -> dict[str, list[set[str]]]:
    alt: dict[str, list[set[str]]] = {}
    for w in curated:
        positions: list[set[str]] = []
        for p in range(5):
            alts: set[str] = set()
            prefix = w[:p]
            suffix = w[p + 1 :]
            for code in range(ord("a"), ord("z") + 1):
                ch = chr(code)
                if ch == w[p]:
                    continue
                if prefix + ch + suffix in full_set:
                    alts.add(ch)
            positions.append(alts)
        alt[w] = positions
    return alt


def is_unique(
    h: tuple[str, str, str],
    v: tuple[str, str, str],
    alt: dict[str, list[set[str]]],
) -> bool:
    for i in range(3):
        for j in range(3):
            if alt[h[i]][2 * j] & alt[v[j]][2 * i]:
                return False
    return True


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent.parent
    default_curated = repo_root / "tools" / "reports" / "wordle-answers-zipf-curated.csv"
    default_out = repo_root / "tools" / "reports" / "clueless-pool.csv"

    parser = argparse.ArgumentParser(
        description="Build complete CSV of all valid unique-solution Clueless puzzles"
    )
    parser.add_argument(
        "wordle_answers",
        type=Path,
        help="Full lexicon for alternate-letter checks (one 5-letter word per line, e.g. wordle_guesses.txt)",
    )
    parser.add_argument("--curated", type=Path, default=default_curated, help="Curated CSV (word,zipf_frequency,...)")
    parser.add_argument("-o", "--output", type=Path, default=default_out, help="Output CSV path")
    parser.add_argument(
        "--dedup",
        choices=("hv", "transpose"),
        default="hv",
        help="How to drop orientation duplicates before uniqueness filter (default: hv)",
    )
    args = parser.parse_args()

    for label, p in [("Wordle answers", args.wordle_answers), ("Curated CSV", args.curated)]:
        if not p.is_file():
            print(f"Not found: {label} -- {p}", file=sys.stderr)
            sys.exit(1)

    t0 = time.time()

    full_words = load_wordlist_txt(args.wordle_answers)
    full_set = set(full_words)
    curated, zipf = load_curated(args.curated)
    curated_set = set(curated)

    print(f"Alternate-check lexicon: {len(full_set)} words", flush=True)
    print(f"Curated list:              {len(curated_set)} words", flush=True)
    print(f"Dedup mode:                {args.dedup}", flush=True)

    by_pos = build_pos_index(list(curated_set))
    alt = build_alt_table(list(curated_set), full_set)

    sorted_curated = sorted(curated_set)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    out = args.output.open("w", encoding="utf-8", newline="")
    writer = csv.writer(out)
    writer.writerow(["h1", "h2", "h3", "v1", "v2", "v3", "sum_zipf"])

    total_grids = 0
    total_distinct = 0
    total_unique = 0

    print(flush=True)
    print("Generating and writing puzzles...", flush=True)

    for idx_h1, h1 in enumerate(sorted_curated):
        if (idx_h1 + 1) % 100 == 0 or idx_h1 == 0:
            elapsed = time.time() - t0
            print(
                f"  [{idx_h1 + 1}/{len(sorted_curated)}] "
                f"grids={total_grids:,}  distinct={total_distinct:,}  "
                f"unique={total_unique:,}  "
                f"elapsed={elapsed:.1f}s",
                flush=True,
            )

        v1_cands = by_pos[0].get(h1[0], set())
        v2_cands = by_pos[0].get(h1[2], set())
        v3_base = by_pos[0].get(h1[4], set())

        for v1 in v1_cands:
            h2a = by_pos[0].get(v1[2], set())
            h3a = by_pos[0].get(v1[4], set())

            for v2 in v2_cands:
                h2_cands = h2a & by_pos[2].get(v2[2], set())
                if not h2_cands:
                    continue
                h3b = h3a & by_pos[2].get(v2[4], set())

                for h2 in h2_cands:
                    v3_cands = v3_base & by_pos[2].get(h2[4], set())
                    if not v3_cands:
                        continue

                    for v3 in v3_cands:
                        h3_cands = h3b & by_pos[4].get(v3[4], set())
                        if not h3_cands:
                            continue

                        for h3 in h3_cands:
                            total_grids += 1

                            if len({h1, h2, h3, v1, v2, v3}) < 6:
                                continue

                            ht = (h1, h2, h3)
                            vt = (v1, v2, v3)
                            if args.dedup == "hv":
                                if ht > vt:
                                    continue
                            else:
                                forward = (h1, h2, h3, v1, v2, v3)
                                backward = (v1, v2, v3, h1, h2, h3)
                                if forward > backward:
                                    continue

                            total_distinct += 1

                            if not is_unique(ht, vt, alt):
                                continue

                            total_unique += 1

                            sz = sum(zipf.get(w, 0) for w in (h1, h2, h3, v1, v2, v3))
                            writer.writerow([h1, h2, h3, v1, v2, v3, f"{sz:.2f}"])

    out.close()

    elapsed = time.time() - t0
    file_mb = args.output.stat().st_size / (1024 * 1024)

    print(flush=True)
    print(f"Done.", flush=True)
    print(f"  Valid grids:              {total_grids:,}", flush=True)
    print(f"  After distinct + dedup:   {total_distinct:,}", flush=True)
    print(f"  Unique-solution puzzles:  {total_unique:,}", flush=True)
    print(f"  Output: {args.output}  ({file_mb:.0f} MB)", flush=True)
    print(f"  Total elapsed: {elapsed:.1f}s", flush=True)


if __name__ == "__main__":
    main()
