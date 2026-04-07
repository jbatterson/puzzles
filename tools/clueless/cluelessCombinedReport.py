#!/usr/bin/env python3
"""
Build clueless-combined.jsonl from:
  - Current puzzles (puzzlegames/clueless/puzzles.js)
  - tools/reports/clueless-selected-random.jsonl
  - tools/reports/clueless-selected-coverage.jsonl

Print stats:
  - Duplicate puzzles (same 6-word set, any orientation)
  - Words appearing more than 10 times
  - Constraint pressure (fast): word over-use vs 5, overlap pairs with 3+ shared words
  - Greedy repair: a quick upper bound on how many removals would fix the list
    (true minimum removals can be lower; exact MILP is optional and can be slow)

Usage:
  python tools/clueless/cluelessCombinedReport.py
  python tools/clueless/cluelessCombinedReport.py --no-write
  python tools/clueless/cluelessCombinedReport.py --stats-from-combined   # stats for on-disk clueless-combined.jsonl
  python tools/clueless/cluelessCombinedReport.py --exact-removals-seconds 20   # optional CP-SAT
"""
from __future__ import annotations

import argparse
import json
import re
import sys
import time
from collections import Counter, defaultdict
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def parse_puzzles_js(path: Path) -> list[dict[str, str]]:
    """Extract h1..v3 from puzzles.js (strip // comments)."""
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


def load_jsonl(path: Path) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            o = json.loads(line)
            rows.append(
                {
                    "h1": o["h1"].lower(),
                    "h2": o["h2"].lower(),
                    "h3": o["h3"].lower(),
                    "v1": o["v1"].lower(),
                    "v2": o["v2"].lower(),
                    "v3": o["v3"].lower(),
                }
            )
    return rows


def normalize_slots(e: dict) -> dict[str, str]:
    """Lowercase h1..v3 for counting and canonical comparison."""
    return {k: str(e[k]).lower() for k in ("h1", "h2", "h3", "v1", "v2", "v3")}


def canonical_words(p: dict) -> frozenset[str]:
    return frozenset(normalize_slots(p).values())


def load_combined_jsonl(path: Path) -> list[dict]:
    """Load JSONL objects as dicts (preserves source and other keys)."""
    rows: list[dict] = []
    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def dedupe_by_canonical(entries: list[dict]) -> list[dict]:
    """Keep first occurrence of each 6-word set (order of h/v slots may differ)."""
    seen: set[frozenset[str]] = set()
    out: list[dict] = []
    for e in entries:
        key = canonical_words(e)
        if key in seen:
            continue
        seen.add(key)
        out.append(e)
    return out


def build_combined(
    current: list[dict[str, str]],
    random_rows: list[dict[str, str]],
    coverage_rows: list[dict[str, str]],
) -> list[dict]:
    combined: list[dict] = []
    for p in current:
        d = dict(p)
        d["source"] = "current"
        combined.append(d)
    for p in random_rows:
        d = dict(p)
        d["source"] = "random"
        combined.append(d)
    for p in coverage_rows:
        d = dict(p)
        d["source"] = "coverage"
        combined.append(d)
    return combined


def word_counts(entries: list[dict]) -> Counter:
    c: Counter = Counter()
    for e in entries:
        n = normalize_slots(e)
        for k in ("h1", "h2", "h3", "v1", "v2", "v3"):
            c[n[k]] += 1
    return c


def count_words_over(entries: list[dict], limit: int) -> int:
    wc = word_counts(entries)
    return sum(1 for w, n in wc.items() if n > limit)


def duplicate_stats(entries: list[dict]) -> tuple[int, int, int]:
    """Returns (total_entries, unique_canonical, duplicate_extra_instances)."""
    total = len(entries)
    by_canon: dict[frozenset[str], int] = defaultdict(int)
    for e in entries:
        by_canon[canonical_words(e)] += 1
    unique = len(by_canon)
    duplicate_extra = total - unique
    return total, unique, duplicate_extra


def collect_overlap_pairs(puzzles: list[frozenset[str]]) -> set[tuple[int, int]]:
    """Pairs (i,j) with i<j and |Pi ∩ Pj| >= 3."""
    w2i: dict[str, list[int]] = defaultdict(list)
    for i, p in enumerate(puzzles):
        for w in p:
            w2i[w].append(i)

    seen: set[tuple[int, int]] = set()
    for idxs in w2i.values():
        if len(idxs) < 2:
            continue
        idxs = sorted(idxs)
        for a in range(len(idxs)):
            for b in range(a + 1, len(idxs)):
                i, j = idxs[a], idxs[b]
                if i > j:
                    i, j = j, i
                if (i, j) in seen:
                    continue
                if len(puzzles[i] & puzzles[j]) >= 3:
                    seen.add((i, j))
    return seen


def word_overuse_excess(wc: Counter, limit: int = 5) -> tuple[int, int]:
    """How many words exceed `limit`, and total (count - limit) over all such words."""
    n_words = 0
    excess = 0
    for w, c in wc.items():
        if c > limit:
            n_words += 1
            excess += c - limit
    return n_words, excess


def greedy_repair_removals(puzzles: list[frozenset[str]], overlap_pairs: set[tuple[int, int]]) -> tuple[int, int]:
    """
    Repeatedly remove one puzzle that breaks the most conflicts until constraints hold.
    Returns (removals, kept). Removals is a *sufficient* count (greedy); the true
    minimum removals is never greater than this, but may be smaller.
    """
    n = len(puzzles)
    if n == 0:
        return 0, 0

    active = set(range(n))
    wc: Counter = Counter()
    for i in active:
        for w in puzzles[i]:
            wc[w] += 1

    bad_pairs = {p for p in overlap_pairs}

    def strip_pairs_with(i: int) -> None:
        nonlocal bad_pairs
        bad_pairs = {b for b in bad_pairs if i not in b}

    def over_words() -> list[str]:
        return [w for w, c in wc.items() if c > 5]

    removals = 0
    while over_words() or bad_pairs:
        best_i = -1
        best_score = -1
        for i in active:
            score = 0
            for w in puzzles[i]:
                if wc[w] > 5:
                    score += wc[w] - 5
            for a, b in bad_pairs:
                if i in (a, b):
                    score += 1
            if score > best_score:
                best_score = score
                best_i = i
        if best_i < 0 or best_score == 0:
            # Fallback: remove any active puzzle (should not happen if loop condition holds)
            best_i = next(iter(active))

        active.remove(best_i)
        for w in puzzles[best_i]:
            wc[w] -= 1
            if wc[w] == 0:
                del wc[w]
        strip_pairs_with(best_i)
        removals += 1

    return removals, len(active)


def max_feasible_subset_size_exact(
    puzzles: list[frozenset[str]],
    overlap_pairs: set[tuple[int, int]],
    time_limit_s: float,
) -> tuple[int, str]:
    """Exact max subset via CP-SAT (can be slow). time_limit_s caps wall time."""
    n = len(puzzles)
    if n == 0:
        return 0, "empty"

    w2i: dict[str, list[int]] = defaultdict(list)
    for i, p in enumerate(puzzles):
        for w in p:
            w2i[w].append(i)

    try:
        from ortools.sat.python import cp_model
    except ImportError:
        return -1, "install ortools: pip install ortools"

    model = cp_model.CpModel()
    x = [model.NewBoolVar(f"x{i}") for i in range(n)]
    model.Maximize(sum(x))

    for idxs in w2i.values():
        if len(idxs) > 5:
            model.Add(sum(x[i] for i in idxs) <= 5)

    for i, j in overlap_pairs:
        model.Add(x[i] + x[j] <= 1)

    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = time_limit_s
    solver.parameters.num_search_workers = 4
    status = solver.Solve(model)
    if status not in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        return -1, f"CP-SAT status={solver.StatusName(status)}"
    proven = "optimal" if status == cp_model.OPTIMAL else "feasible (time-capped or not proven optimal)"
    return int(round(solver.ObjectiveValue())), f"OR-Tools CP-SAT ({proven})"


def print_words_over_limit(wc: Counter, limit: int) -> None:
    items = sorted([(w, c) for w, c in wc.items() if c > limit], key=lambda t: (-t[1], t[0]))
    print(flush=True)
    print(f"=== Words with count > {limit} ({len(items)}) ===", flush=True)
    for w, c in items:
        print(f"  {w}\t{c}", flush=True)


def print_combined_statistics(combined: list[dict], args: argparse.Namespace) -> None:
    total, unique, dup_extra = duplicate_stats(combined)
    print("=== Duplicate puzzles (same 6-word set, ignoring h/v slots) ===", flush=True)
    print(f"  Total entries:              {total:,}", flush=True)
    print(f"  Unique canonical puzzles:   {unique:,}", flush=True)
    print(f"  Extra duplicate instances:  {dup_extra:,}  (total - unique)", flush=True)

    wc = word_counts(combined)
    over10 = sum(1 for w, n in wc.items() if n > 10)
    max_use = max(wc.values()) if wc else 0
    print(flush=True)
    print("=== Word frequency in combined list (each entry counts 6 words) ===", flush=True)
    print(f"  Distinct words:             {len(wc):,}", flush=True)
    print(f"  Max uses of a single word:  {max_use}", flush=True)
    print(f"  Words used > 10 times:      {over10}", flush=True)
    print_words_over_limit(wc, 10)

    print(flush=True)
    print("=== Roster constraints (max 5 uses/word, max 2 shared words/pair) ===", flush=True)
    puzzles_fs = [canonical_words(e) for e in combined]
    overlap_pairs = collect_overlap_pairs(puzzles_fs)
    wc_all = word_counts(combined)
    n_over5, excess5 = word_overuse_excess(wc_all, 5)
    print(f"  Overlap pairs with 3+ shared words: {len(overlap_pairs):,}", flush=True)
    print(f"  Words used more than 5 times:       {n_over5:,}  (total excess over 5: {excess5:,})", flush=True)

    t0 = time.time()
    rem_greedy, kept_greedy = greedy_repair_removals(puzzles_fs, overlap_pairs)
    tg = time.time() - t0
    print(flush=True)
    print(
        "  Greedy repair (sufficient removals, not necessarily minimal): "
        f"remove {rem_greedy:,} -> keep {kept_greedy:,}  ({tg:.2f}s)",
        flush=True,
    )
    print(
        "    (Finding the true minimum removals is a hard optimization problem; "
        "greedy gives one workable upper bound.)",
        flush=True,
    )

    if args.exact_removals_seconds > 0:
        print(flush=True)
        print(
            f"=== Optional exact CP-SAT (<= {args.exact_removals_seconds:g}s) ===",
            flush=True,
        )
        t0 = time.time()
        max_keep, note = max_feasible_subset_size_exact(
            puzzles_fs, overlap_pairs, args.exact_removals_seconds
        )
        elapsed = time.time() - t0
        if max_keep < 0:
            print(f"  Could not solve: {note}", flush=True)
        else:
            min_remove = total - max_keep
            print(f"  Best keepable found:     {max_keep:,}  ({note})", flush=True)
            print(f"  Implied removals (n-k):  {min_remove:,}", flush=True)
            print(f"  Wall time:               {elapsed:.1f}s", flush=True)


def main() -> None:
    root = repo_root()
    default_js = root / "puzzlegames" / "clueless" / "puzzles.js"
    default_random = root / "tools" / "reports" / "clueless-selected-random.jsonl"
    default_cov = root / "tools" / "reports" / "clueless-selected-coverage.jsonl"
    default_out = root / "tools" / "reports" / "clueless-combined.jsonl"

    ap = argparse.ArgumentParser(description="Build combined Clueless list and print stats")
    ap.add_argument("--puzzles-js", type=Path, default=default_js)
    ap.add_argument("--random-jsonl", type=Path, default=default_random)
    ap.add_argument("--coverage-jsonl", type=Path, default=default_cov)
    ap.add_argument("-o", "--output", type=Path, default=default_out)
    ap.add_argument("--no-write", action="store_true", help="Print stats only, do not write combined file")
    ap.add_argument(
        "--exact-removals-seconds",
        type=float,
        default=0.0,
        metavar="SEC",
        help="Optional: run CP-SAT up to SEC seconds for proven/near-optimal max keepable (0=skip)",
    )
    ap.add_argument(
        "--dedupe-only",
        action="store_true",
        help="Read combined JSONL, drop duplicate 6-word sets (keep first line), write -o, then exit",
    )
    ap.add_argument(
        "--stats-from-combined",
        action="store_true",
        help="Read combined JSONL from -o (no rebuild from sources); print full stats for that file",
    )
    args = ap.parse_args()

    if args.stats_from_combined:
        if not args.output.is_file():
            print(f"Not found: combined file -- {args.output}", file=sys.stderr)
            sys.exit(1)
        combined = load_combined_jsonl(args.output)
        try:
            rel = args.output.relative_to(repo_root())
        except ValueError:
            rel = args.output
        print(f"=== Stats from {rel} ({len(combined):,} lines) ===", flush=True)
        print_combined_statistics(combined, args)
        return

    if args.dedupe_only:
        if not args.output.is_file():
            print(f"Not found: combined file -- {args.output}", file=sys.stderr)
            sys.exit(1)
        combined = load_combined_jsonl(args.output)
        before = len(combined)
        deduped = dedupe_by_canonical(combined)
        after = len(deduped)
        args.output.parent.mkdir(parents=True, exist_ok=True)
        with args.output.open("w", encoding="utf-8") as f:
            for e in deduped:
                f.write(json.dumps(e, ensure_ascii=False) + "\n")
        try:
            rel = args.output.relative_to(repo_root())
        except ValueError:
            rel = args.output
        print(f"Deduped {rel}: {before:,} -> {after:,} lines (removed {before - after:,} duplicates)", flush=True)
        return

    for label, p in [
        ("puzzles.js", args.puzzles_js),
        ("random jsonl", args.random_jsonl),
        ("coverage jsonl", args.coverage_jsonl),
    ]:
        if not p.is_file():
            print(f"Not found: {label} -- {p}", file=sys.stderr)
            sys.exit(1)

    current = parse_puzzles_js(args.puzzles_js)
    random_rows = load_jsonl(args.random_jsonl)
    coverage_rows = load_jsonl(args.coverage_jsonl)

    combined = build_combined(current, random_rows, coverage_rows)

    if not args.no_write:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        with args.output.open("w", encoding="utf-8") as f:
            for e in combined:
                f.write(json.dumps(e, ensure_ascii=False) + "\n")
        try:
            rel = args.output.relative_to(root)
        except ValueError:
            rel = args.output
        print(f"Wrote {rel} ({len(combined):,} lines)", flush=True)
        print(flush=True)

    print_combined_statistics(combined, args)


if __name__ == "__main__":
    main()
