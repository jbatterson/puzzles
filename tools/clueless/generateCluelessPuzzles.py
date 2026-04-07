#!/usr/bin/env python3
"""
Generate Clueless puzzles from a curated word list, selecting a maximal set
where every puzzle has a unique solution and the roster satisfies:
  - No word appears more than N times (default 5)
  - No two puzzles share more than K words (default 2)
Coverage-aware selection spreads word usage across the full vocabulary.

Pipeline:
  Stage 1 -- Generate raw grids into a bounded heap (scored by sum-zipf).
  Stage 2 -- Filter the pool for unique solutions.
  Stage 3 -- Sort by sum-zipf descending (random tiebreaker).
  Stage 4 -- Coverage-aware batched greedy selection.
  Stage 5 -- Randomize h/v assignment and write output.

Usage:
  python tools/clueless/generateCluelessPuzzles.py path/to/wordle_answers.txt
  python tools/clueless/generateCluelessPuzzles.py path/to/wordle_answers.txt --pool-size 3000000
  python tools/clueless/generateCluelessPuzzles.py path/to/wordle_answers.txt --count-only
  python tools/clueless/generateCluelessPuzzles.py path/to/wordle_answers.txt --seed 42
"""
from __future__ import annotations

import argparse
import csv
import heapq
import json
import random
import sys
import time
from collections import Counter, defaultdict
from pathlib import Path


# ── Data loading ─────────────────────────────────────────────────────────────

def load_curated(csv_path: Path) -> tuple[list[str], dict[str, float]]:
    """Return (word_list, {word: zipf_frequency})."""
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


# ── Index building ───────────────────────────────────────────────────────────

def build_pos_index(words: list[str]) -> dict[int, dict[str, set[str]]]:
    idx: dict[int, dict[str, set[str]]] = {p: defaultdict(set) for p in range(5)}
    for w in words:
        for p in range(5):
            idx[p][w[p]].add(w)
    return idx


def build_alt_table(
    curated: list[str], full_set: set[str]
) -> dict[str, list[set[str]]]:
    """For each curated word and position, which substitute letters produce a
    word in the full Wordle answer list."""
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


# ── Uniqueness check ────────────────────────────────────────────────────────

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


# ── Stage 1: generate candidates into a bounded heap ────────────────────────

def generate_pool(
    curated_set: set[str],
    by_pos: dict[int, dict[str, set[str]]],
    zipf: dict[str, float],
    pool_size: int,
    count_only: bool,
) -> tuple[list[tuple[float, float, dict]], int, int]:
    """Return (pool, total_grids, total_distinct).
    Score = sum(zipf) with random tiebreaker.
    Uniqueness is NOT checked here (deferred to Stage 2)."""

    pool: list[tuple[float, float, dict]] = []
    total_grids = 0
    total_distinct = 0

    sorted_curated = sorted(curated_set)
    t0 = time.time()

    for idx_h1, h1 in enumerate(sorted_curated):
        if (idx_h1 + 1) % 200 == 0 or idx_h1 == 0:
            elapsed = time.time() - t0
            pool_floor = -pool[0][0] if pool else 0
            print(
                f"  [{idx_h1 + 1}/{len(sorted_curated)}] "
                f"grids={total_grids:,}  distinct={total_distinct:,}  "
                f"pool={len(pool):,}  pool_floor={pool_floor:.2f}  "
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
                            if ht > vt:
                                continue

                            total_distinct += 1

                            if count_only:
                                continue

                            score = sum(zipf.get(w, 0) for w in (h1, h2, h3, v1, v2, v3))
                            neg_score = -score
                            entry = (neg_score, random.random(), {"h1": h1, "h2": h2, "h3": h3, "v1": v1, "v2": v2, "v3": v3})

                            if len(pool) < pool_size:
                                heapq.heappush(pool, entry)
                            elif neg_score < pool[0][0]:
                                heapq.heapreplace(pool, entry)

    return pool, total_grids, total_distinct


# ── Stage 2: filter pool for unique solutions ────────────────────────────────

def filter_unique(
    pool: list[tuple[float, float, dict]],
    alt: dict[str, list[set[str]]],
) -> list[tuple[float, float, dict]]:
    kept: list[tuple[float, float, dict]] = []
    for entry in pool:
        p = entry[2]
        ht = (p["h1"], p["h2"], p["h3"])
        vt = (p["v1"], p["v2"], p["v3"])
        if is_unique(ht, vt, alt):
            kept.append(entry)
    return kept


# ── Stage 4: coverage-aware batched greedy selection ─────────────────────────

def greedy_select_coverage(
    candidates: list[tuple[float, float, dict]],
    max_word_uses: int,
    max_overlap: int,
    batch_size: int,
) -> list[dict]:
    selected: list[dict] = []
    word_usage: Counter[str] = Counter()
    word_to_indices: dict[str, set[int]] = defaultdict(set)

    i = 0
    n = len(candidates)
    while i < n:
        batch_end = min(i + batch_size, n)
        batch = list(range(i, batch_end))

        made_progress = True
        while batch and made_progress:
            made_progress = False

            best_idx_in_batch = -1
            best_coverage = -1
            best_neg_score = 0.0

            for bi, ci in enumerate(batch):
                neg_score, _, puzzle = candidates[ci]
                words = frozenset(puzzle.values())

                if any(word_usage[w] >= max_word_uses for w in words):
                    continue

                overlap_counts: Counter[int] = Counter()
                too_similar = False
                for w in words:
                    for idx in word_to_indices[w]:
                        overlap_counts[idx] += 1
                        if overlap_counts[idx] > max_overlap:
                            too_similar = True
                            break
                    if too_similar:
                        break
                if too_similar:
                    continue

                coverage = sum(1 for w in words if word_usage[w] == 0)
                if (coverage > best_coverage) or (coverage == best_coverage and neg_score < best_neg_score):
                    best_idx_in_batch = bi
                    best_coverage = coverage
                    best_neg_score = neg_score

            if best_idx_in_batch >= 0:
                ci = batch[best_idx_in_batch]
                puzzle = candidates[ci][2]
                words = frozenset(puzzle.values())

                sel_idx = len(selected)
                selected.append(puzzle)
                for w in words:
                    word_usage[w] += 1
                    word_to_indices[w].add(sel_idx)

                batch.pop(best_idx_in_batch)
                made_progress = True

        i = batch_end

    return selected


# ── Stage 5: randomize h/v and write ─────────────────────────────────────────

def shuffle_hv(puzzle: dict) -> dict:
    if random.random() < 0.5:
        return {
            "h1": puzzle["v1"], "h2": puzzle["v2"], "h3": puzzle["v3"],
            "v1": puzzle["h1"], "v2": puzzle["h2"], "v3": puzzle["h3"],
        }
    return puzzle


# ── Main ─────────────────────────────────────────────────────────────────────

def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent.parent
    default_curated = repo_root / "tools" / "reports" / "wordle-answers-zipf-curated.csv"
    default_out = repo_root / "tools" / "reports" / "clueless-candidates.jsonl"

    parser = argparse.ArgumentParser(description="Generate unique-solution Clueless puzzles with roster constraints")
    parser.add_argument("wordle_answers", type=Path, help="Full Wordle answer list (one word per line)")
    parser.add_argument("--curated", type=Path, default=default_curated, help="Curated CSV (word,zipf_frequency,...)")
    parser.add_argument("-o", "--output", type=Path, default=default_out, help="Output JSONL path")
    parser.add_argument("--pool-size", type=int, default=5_000_000, help="Candidate pool size kept in memory (default 5000000)")
    parser.add_argument("--max-word-uses", type=int, default=5, help="Max times one word may appear across selected puzzles (default 5)")
    parser.add_argument("--max-overlap", type=int, default=2, help="Max words two puzzles may share (default 2)")
    parser.add_argument("--batch-size", type=int, default=5000, help="Lookahead window for coverage-aware selection (default 5000)")
    parser.add_argument("--seed", type=int, default=None, help="Random seed for reproducible runs")
    parser.add_argument("--count-only", action="store_true", help="Count valid puzzles without selection or file output")
    args = parser.parse_args()

    if args.seed is not None:
        random.seed(args.seed)

    for label, p in [("Wordle answers", args.wordle_answers), ("Curated CSV", args.curated)]:
        if not p.is_file():
            print(f"Not found: {label} -- {p}", file=sys.stderr)
            sys.exit(1)

    t0 = time.time()

    full_words = load_wordlist_txt(args.wordle_answers)
    full_set = set(full_words)
    curated, zipf = load_curated(args.curated)
    curated_set = set(curated)

    print(f"Full Wordle list: {len(full_set)} words", flush=True)
    print(f"Curated list:     {len(curated_set)} words", flush=True)
    print(f"Pool size:        {args.pool_size:,}", flush=True)
    if not args.count_only:
        print(f"Max word uses:    {args.max_word_uses}", flush=True)
        print(f"Max overlap:      {args.max_overlap}", flush=True)
        print(f"Batch size:       {args.batch_size:,}", flush=True)
    if args.seed is not None:
        print(f"Seed:             {args.seed}", flush=True)

    by_pos = build_pos_index(list(curated_set))
    alt = build_alt_table(list(curated_set), full_set)

    # ── Stage 1 ──────────────────────────────────────────────────────────────
    print(flush=True)
    print("=== Stage 1: Generate raw grids into bounded heap (sum-zipf) ===", flush=True)

    pool, total_grids, total_distinct = generate_pool(
        curated_set, by_pos, zipf, args.pool_size, args.count_only,
    )

    elapsed_s1 = time.time() - t0
    print(flush=True)
    print(f"  Valid grids (all crossings match):   {total_grids:,}", flush=True)
    print(f"  After distinct + symmetry dedup:     {total_distinct:,}", flush=True)
    print(f"  Candidates kept in pool:             {len(pool):,}", flush=True)
    if pool:
        print(f"  Pool floor (sum-zipf of worst):      {-pool[0][0]:.2f}", flush=True)
    print(f"  Stage 1 elapsed: {elapsed_s1:.1f}s", flush=True)

    if args.count_only:
        print("(count-only mode -- done)", flush=True)
        return

    # ── Stage 2 ──────────────────────────────────────────────────────────────
    print(flush=True)
    print("=== Stage 2: Filter for unique solutions ===", flush=True)

    pool_size_before = len(pool)
    unique_pool = filter_unique(pool, alt)
    pool = []

    elapsed_s2 = time.time() - t0
    print(f"  Before uniqueness: {pool_size_before:,}", flush=True)
    print(f"  After uniqueness:  {len(unique_pool):,}", flush=True)
    print(f"  Stage 2 elapsed:   {elapsed_s2 - elapsed_s1:.1f}s", flush=True)

    # ── Stage 3 ──────────────────────────────────────────────────────────────
    print(flush=True)
    print("=== Stage 3: Sort by sum-zipf (descending, random ties) ===", flush=True)

    unique_pool.sort(key=lambda x: (x[0], x[1]))

    if unique_pool:
        best = -unique_pool[0][0]
        worst = -unique_pool[-1][0]
        print(f"  Best sum-zipf:  {best:.2f}", flush=True)
        print(f"  Worst sum-zipf: {worst:.2f}", flush=True)

    # ── Stage 4 ──────────────────────────────────────────────────────────────
    print(flush=True)
    print("=== Stage 4: Coverage-aware greedy selection ===", flush=True)

    selected = greedy_select_coverage(unique_pool, args.max_word_uses, args.max_overlap, args.batch_size)
    unique_pool = []

    distinct_words = set()
    for p in selected:
        distinct_words.update(p.values())

    print(f"  Selected puzzles:    {len(selected)}", flush=True)
    print(f"  Distinct words used: {len(distinct_words)}", flush=True)

    if selected:
        sum_scores = [sum(zipf.get(w, 0) for w in p.values()) for p in selected]
        min_scores = [min(zipf.get(w, 0) for w in p.values()) for p in selected]
        print(f"  Sum-zipf range: {min(sum_scores):.2f} -- {max(sum_scores):.2f}", flush=True)
        print(f"  Min-zipf range: {min(min_scores):.2f} -- {max(min_scores):.2f}", flush=True)

    # ── Stage 5 ──────────────────────────────────────────────────────────────
    print(flush=True)
    print("=== Stage 5: Randomize h/v and write output ===", flush=True)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        for p in selected:
            f.write(json.dumps(shuffle_hv(p)) + "\n")

    rel = args.output
    try:
        rel = args.output.relative_to(repo_root)
    except ValueError:
        pass

    elapsed_total = time.time() - t0
    print(f"  Output: {rel}", flush=True)
    print(f"  Total elapsed: {elapsed_total:.1f}s", flush=True)


if __name__ == "__main__":
    main()
