#!/usr/bin/env python3
"""
Greedy cull: remove puzzles until every word (across h1..v3) appears at most
--max-uses times. Each step removes one puzzle maximizing
  sum_{w in puzzle} max(0, freq[w] - max_uses)
Tie-break: higher count of words with freq > max_uses, then larger line index
(keep earlier puzzles when scores tie).

Usage:
  python tools/clueless/pruneJsonlWordUseCap.py
  python tools/clueless/pruneJsonlWordUseCap.py -i in.jsonl -o out.jsonl --max-uses 15
"""
from __future__ import annotations

import argparse
import json
import sys
from collections import Counter, defaultdict
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def normalize_slots(e: dict) -> dict[str, str]:
    return {k: str(e[k]).lower() for k in ("h1", "h2", "h3", "v1", "v2", "v3")}


def puzzle_words(p: dict) -> tuple[str, ...]:
    n = normalize_slots(p)
    return tuple(n[k] for k in ("h1", "h2", "h3", "v1", "v2", "v3"))


def load_jsonl(path: Path) -> list[dict]:
    rows: list[dict] = []
    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def word_freq(puzzles: list[dict]) -> Counter[str]:
    c: Counter[str] = Counter()
    for p in puzzles:
        for w in puzzle_words(p):
            c[w] += 1
    return c


def word_overuse_excess(freq: Counter[str], limit: int) -> tuple[int, int]:
    n_words = 0
    excess = 0
    for w, ct in freq.items():
        if ct > limit:
            n_words += 1
            excess += ct - limit
    return n_words, excess


def build_word_to_indices(puzzles: list[dict]) -> dict[str, list[int]]:
    m: dict[str, list[int]] = defaultdict(list)
    for i, p in enumerate(puzzles):
        for w in set(puzzle_words(p)):
            m[w].append(i)
    return m


def pick_remove_index(puzzles: list[dict], freq: Counter[str], limit: int) -> int:
    """Return index of puzzle to remove (max score; tie-break hot count, then later index)."""
    overs = [w for w, c in freq.items() if c > limit]
    if not overs:
        return -1

    w2i = build_word_to_indices(puzzles)
    candidates: set[int] = set()
    for w in overs:
        candidates.update(w2i.get(w, ()))

    best_i = -1
    best_key: tuple[int, int, int] | None = None

    for i in candidates:
        words = puzzle_words(puzzles[i])
        score = sum(max(0, freq[w] - limit) for w in words)
        hot = sum(1 for w in words if freq[w] > limit)
        key = (score, hot, i)
        if best_key is None or key > best_key:
            best_key = key
            best_i = i

    return best_i


def top_k_words(freq: Counter[str], k: int) -> list[tuple[str, int]]:
    return sorted(freq.items(), key=lambda x: (-x[1], x[0]))[:k]


def main() -> None:
    root = repo_root()
    reports = root / "tools" / "clueless" / "reports"
    default_in = reports / "clueless-culled-aoa-plus-shipped.jsonl"
    default_out = reports / "clueless-culled-aoa-plus-shipped-wordcap15.jsonl"

    ap = argparse.ArgumentParser(description="Cull JSONL until each word appears at most N times")
    ap.add_argument("-i", "--input", type=Path, default=default_in)
    ap.add_argument("-o", "--output", type=Path, default=default_out)
    ap.add_argument("--max-uses", type=int, default=15, metavar="N")
    args = ap.parse_args()

    if not args.input.is_file():
        print(f"Not found: {args.input}", file=sys.stderr)
        sys.exit(1)

    active = load_jsonl(args.input)
    start_n = len(active)
    limit = args.max_uses

    freq = word_freq(active)
    nw, ex = word_overuse_excess(freq, limit)
    print(f"Start: {start_n:,} puzzles; max word freq {max(freq.values(), default=0)}", flush=True)
    print(f"  Words over cap ({limit}): {nw:,}; total excess: {ex:,}", flush=True)

    removals = 0
    while True:
        freq = word_freq(active)
        if all(c <= limit for c in freq.values()):
            break
        i = pick_remove_index(active, freq, limit)
        if i < 0:
            print("Internal error: over cap but no candidate", file=sys.stderr)
            sys.exit(1)
        del active[i]
        removals += 1
        if removals % 50 == 0:
            print(f"  ... removed {removals} puzzles; remaining {len(active):,}", flush=True)

    freq_final = word_freq(active)
    max_f = max(freq_final.values(), default=0)
    nw2, ex2 = word_overuse_excess(freq_final, limit)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        for e in active:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

    try:
        rel = args.output.relative_to(root)
    except ValueError:
        rel = args.output

    print(flush=True)
    print(f"Removed {removals:,} puzzle(s); kept {len(active):,}", flush=True)
    print(f"End: max word freq {max_f}; words over cap: {nw2}; total excess: {ex2}", flush=True)
    print("Top 10 words by frequency:", flush=True)
    for w, c in top_k_words(freq_final, 10):
        print(f"  {w}: {c}", flush=True)
    print(f"Wrote {rel}", flush=True)

    if max_f > limit or nw2 > 0:
        print("ERROR: cap not satisfied", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
