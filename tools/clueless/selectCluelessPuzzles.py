#!/usr/bin/env python3
"""
Select Clueless puzzles from the pre-built candidate pool (clueless-pool.csv).

Produces two selection strategies for comparison:
  1. Simple random greedy  -> clueless-selected-random.jsonl
  2. Multi-pass coverage   -> clueless-selected-coverage.jsonl

Both use the same randomly shuffled candidate order. h/v assignment is
randomized in the output to eliminate alphabetical slot bias.

Usage:
  python tools/clueless/selectCluelessPuzzles.py
  python tools/clueless/selectCluelessPuzzles.py --seed 42
  python tools/clueless/selectCluelessPuzzles.py --pool path/to/pool.csv
  python tools/clueless/selectCluelessPuzzles.py --max-word-uses 3 --max-overlap 1
"""
from __future__ import annotations

import argparse
import array
import csv
import json
import random
import struct
import sys
import time
from collections import Counter, defaultdict
from pathlib import Path

RECORD_BYTES = 12  # 6 x uint16


# ── Loading ──────────────────────────────────────────────────────────────────

def load_curated_zipf(csv_path: Path) -> dict[str, float]:
    zipf: dict[str, float] = {}
    with csv_path.open(encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if not row or not row[0].strip():
                continue
            w = row[0].strip().lower()
            if len(w) == 5 and w.isalpha():
                try:
                    zipf[w] = float(row[1])
                except (IndexError, ValueError):
                    zipf[w] = 0.0
    return zipf


def load_pool(pool_path: Path) -> tuple[bytearray, int, list[str]]:
    """Load pool CSV into a compact bytearray (12 bytes per puzzle).
    Returns (data, count, id_to_word)."""
    word_to_id: dict[str, int] = {}
    id_to_word: list[str] = []
    data = bytearray()
    count = 0
    t0 = time.time()

    with pool_path.open(encoding="utf-8") as f:
        next(f)  # skip header
        for line in f:
            parts = line.split(",")
            ids: list[int] = []
            for i in range(6):
                w = parts[i]
                wid = word_to_id.get(w)
                if wid is None:
                    wid = len(id_to_word)
                    word_to_id[w] = wid
                    id_to_word.append(w)
                ids.append(wid)
            data.extend(struct.pack("<6H", *ids))
            count += 1
            if count % 10_000_000 == 0:
                print(f"  {count:,} loaded... ({time.time() - t0:.0f}s)", flush=True)

    return data, count, id_to_word


# ── Selection helpers ────────────────────────────────────────────────────────

def accept_puzzle(
    words: tuple[str, ...],
    selected: list[tuple[str, ...]],
    word_usage: Counter,
    word_to_sel: dict[str, set[int]],
) -> None:
    sel_idx = len(selected)
    selected.append(words)
    for w in words:
        word_usage[w] += 1
        word_to_sel[w].add(sel_idx)


def shuffle_hv(words: tuple[str, ...]) -> dict:
    h1, h2, h3, v1, v2, v3 = words
    if random.random() < 0.5:
        return {"h1": v1, "h2": v2, "h3": v3, "v1": h1, "v2": h2, "v3": h3}
    return {"h1": h1, "h2": h2, "h3": h3, "v1": v1, "v2": v2, "v3": v3}


# ── Selection strategies ─────────────────────────────────────────────────────

def select_random_greedy(
    data: bytearray,
    indices: array.array,
    count: int,
    id_to_word: list[str],
    max_uses: int,
    max_overlap: int,
) -> list[tuple[str, ...]]:
    """Iterate shuffled candidates; accept any that pass constraints."""
    selected: list[tuple[str, ...]] = []
    word_usage: Counter[str] = Counter()
    word_to_sel: dict[str, set[int]] = defaultdict(set)
    overlap_buf: dict[int, int] = {}

    for order in range(count):
        if order % 10_000_000 == 0:
            print(f"  {order:,}/{count:,}  selected={len(selected)}", flush=True)

        idx = indices[order]
        ids = struct.unpack_from("<6H", data, idx * RECORD_BYTES)
        words = tuple(id_to_word[i] for i in ids)

        reject = False
        for w in words:
            if word_usage[w] >= max_uses:
                reject = True
                break
        if reject:
            continue

        overlap_buf.clear()
        for w in words:
            for si in word_to_sel[w]:
                c = overlap_buf.get(si, 0) + 1
                if c > max_overlap:
                    reject = True
                    break
                overlap_buf[si] = c
            if reject:
                break
        if reject:
            continue

        accept_puzzle(words, selected, word_usage, word_to_sel)

    return selected


def select_multipass_coverage(
    data: bytearray,
    indices: array.array,
    count: int,
    id_to_word: list[str],
    max_uses: int,
    max_overlap: int,
) -> list[tuple[str, ...]]:
    """Four passes with decreasing new-word thresholds."""
    selected: list[tuple[str, ...]] = []
    word_usage: Counter[str] = Counter()
    word_to_sel: dict[str, set[int]] = defaultdict(set)
    overlap_buf: dict[int, int] = {}

    for pass_num, min_new in enumerate([3, 2, 1, 0]):
        t_pass = time.time()
        accepted_this_pass = 0

        for order in range(count):
            idx = indices[order]
            ids = struct.unpack_from("<6H", data, idx * RECORD_BYTES)
            words = tuple(id_to_word[i] for i in ids)

            reject = False
            for w in words:
                if word_usage[w] >= max_uses:
                    reject = True
                    break
            if reject:
                continue

            new_count = 0
            for w in words:
                if word_usage[w] == 0:
                    new_count += 1
            if new_count < min_new:
                continue

            overlap_buf.clear()
            for w in words:
                for si in word_to_sel[w]:
                    c = overlap_buf.get(si, 0) + 1
                    if c > max_overlap:
                        reject = True
                        break
                    overlap_buf[si] = c
                if reject:
                    break
            if reject:
                continue

            accept_puzzle(words, selected, word_usage, word_to_sel)
            accepted_this_pass += 1

        elapsed = time.time() - t_pass
        distinct = set()
        for ws in selected:
            distinct.update(ws)
        print(
            f"  Pass {pass_num + 1} (min_new>={min_new}): "
            f"+{accepted_this_pass} puzzles, total={len(selected)}, "
            f"words={len(distinct)}, time={elapsed:.1f}s",
            flush=True,
        )

    return selected


# ── Reporting ────────────────────────────────────────────────────────────────

def report_stats(label: str, selected: list[tuple[str, ...]], zipf: dict[str, float]) -> None:
    distinct: set[str] = set()
    for words in selected:
        distinct.update(words)

    usage: Counter[str] = Counter()
    for words in selected:
        for w in words:
            usage[w] += 1

    print(f"  --- {label} ---", flush=True)
    print(f"  Puzzles:       {len(selected):,}", flush=True)
    print(f"  Distinct words: {len(distinct):,}", flush=True)

    for n in range(5, 0, -1):
        c = sum(1 for v in usage.values() if v == n)
        if c:
            print(f"    Used {n}x: {c}", flush=True)

    if selected:
        sum_scores = [sum(zipf.get(w, 0) for w in ws) for ws in selected]
        min_scores = [min(zipf.get(w, 0) for w in ws) for ws in selected]
        print(f"  Sum-zipf: {min(sum_scores):.2f} -- {max(sum_scores):.2f}", flush=True)
        print(f"  Min-zipf: {min(min_scores):.2f} -- {max(min_scores):.2f}", flush=True)

        cell00 = Counter(ws[0][0] for ws in selected)
        letters = " ".join(f"{k}:{v}" for k, v in sorted(cell00.items()))
        print(f"  (0,0) letter: {letters}", flush=True)


def write_output(path: Path, selected: list[tuple[str, ...]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        for words in selected:
            f.write(json.dumps(shuffle_hv(words)) + "\n")


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent.parent
    default_pool = repo_root / "tools" / "reports" / "clueless-pool.csv"
    default_curated = repo_root / "tools" / "reports" / "wordle-answers-zipf-curated.csv"
    reports_dir = repo_root / "tools" / "reports"

    parser = argparse.ArgumentParser(description="Select puzzles from pre-built pool")
    parser.add_argument("--pool", type=Path, default=default_pool)
    parser.add_argument("--curated", type=Path, default=default_curated)
    parser.add_argument("--max-word-uses", type=int, default=5)
    parser.add_argument("--max-overlap", type=int, default=2)
    parser.add_argument("--seed", type=int, default=None)
    args = parser.parse_args()

    if args.seed is not None:
        random.seed(args.seed)

    for label, p in [("Pool CSV", args.pool), ("Curated CSV", args.curated)]:
        if not p.is_file():
            print(f"Not found: {label} -- {p}", file=sys.stderr)
            sys.exit(1)

    t0 = time.time()

    zipf = load_curated_zipf(args.curated)

    print("Loading pool...", flush=True)
    data, count, id_to_word = load_pool(args.pool)
    print(
        f"  {count:,} puzzles ({len(data) / 1024 / 1024:.0f} MB), "
        f"{len(id_to_word)} distinct words, "
        f"{time.time() - t0:.1f}s",
        flush=True,
    )

    print(flush=True)
    print("Shuffling indices...", flush=True)
    t_shuf = time.time()
    indices = array.array("I", range(count))
    random.shuffle(indices)
    print(f"  {time.time() - t_shuf:.1f}s", flush=True)

    print(f"Max word uses: {args.max_word_uses}", flush=True)
    print(f"Max overlap:   {args.max_overlap}", flush=True)
    if args.seed is not None:
        print(f"Seed:          {args.seed}", flush=True)

    # ── Selection 1 ──────────────────────────────────────────────────────────
    print(flush=True)
    print("=== Selection 1: Simple random greedy ===", flush=True)
    t_s1 = time.time()
    selected1 = select_random_greedy(
        data, indices, count, id_to_word, args.max_word_uses, args.max_overlap,
    )
    print(f"  Time: {time.time() - t_s1:.1f}s", flush=True)
    report_stats("Random greedy", selected1, zipf)

    # ── Selection 2 ──────────────────────────────────────────────────────────
    print(flush=True)
    print("=== Selection 2: Multi-pass coverage ===", flush=True)
    t_s2 = time.time()
    selected2 = select_multipass_coverage(
        data, indices, count, id_to_word, args.max_word_uses, args.max_overlap,
    )
    print(f"  Total time: {time.time() - t_s2:.1f}s", flush=True)
    report_stats("Coverage greedy", selected2, zipf)

    # ── Write outputs ────────────────────────────────────────────────────────
    print(flush=True)
    print("=== Writing outputs ===", flush=True)

    out1 = reports_dir / "clueless-selected-random.jsonl"
    out2 = reports_dir / "clueless-selected-coverage.jsonl"
    write_output(out1, selected1)
    write_output(out2, selected2)

    print(f"  {out1.name}: {len(selected1):,} puzzles", flush=True)
    print(f"  {out2.name}: {len(selected2):,} puzzles", flush=True)
    print(f"  Total elapsed: {time.time() - t0:.1f}s", flush=True)


if __name__ == "__main__":
    main()
