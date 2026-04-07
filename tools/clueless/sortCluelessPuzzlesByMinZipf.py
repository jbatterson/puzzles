#!/usr/bin/env python3
"""
Sort Clueless JSONL puzzles by Zipf: highest minimum word Zipf first (easiest floor),
lowest minimum last. Tie-break: higher sum of Zipfs, then lexicographic (h1, h2, ...).

Zipf source: CSV (word, zipf_frequency) with wordfreq fallback for missing words.
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


def load_jsonl(path: Path) -> list[dict]:
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


def puzzle_min_sum_zipf(e: dict, zm: dict[str, float]) -> tuple[float, float]:
    n = normalize_slots(e)
    zs = [zipf_word(n[k], zm) for k in ("h1", "h2", "h3", "v1", "v2", "v3")]
    return min(zs), sum(zs)


def sort_key(e: dict, zm: dict[str, float]) -> tuple:
    """Descending min: use negation for sorted(..., key=)."""
    mn, sm = puzzle_min_sum_zipf(e, zm)
    n = normalize_slots(e)
    # Sort ascending on key; we want high min first -> negate min and sum
    return (-mn, -sm, n["h1"], n["h2"], n["h3"], n["v1"], n["v2"], n["v3"])


def main() -> None:
    root = repo_root()
    default_in = root / "tools" / "reports" / "clueless-combined-pruned-unambiguous.jsonl"
    default_out = root / "tools" / "reports" / "clueless-combined-pruned-unambiguous-sorted.jsonl"
    default_zipf = root / "tools" / "reports" / "wordle-answers-zipf-curated.csv"

    ap = argparse.ArgumentParser(description="Sort Clueless JSONL by min word Zipf (descending)")
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
    puzzles = load_jsonl(args.input)
    puzzles.sort(key=lambda e: sort_key(e, zm))

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        for e in puzzles:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

    mn0, sm0 = puzzle_min_sum_zipf(puzzles[0], zm) if puzzles else (0.0, 0.0)
    mn1, sm1 = puzzle_min_sum_zipf(puzzles[-1], zm) if puzzles else (0.0, 0.0)
    try:
        rel = args.output.relative_to(root)
    except ValueError:
        rel = args.output
    print(f"Wrote {len(puzzles):,} puzzles to {rel}", flush=True)
    print(f"  Top puzzle min-Zipf: {mn0:.3f}  (sum {sm0:.3f})", flush=True)
    print(f"  Bottom puzzle min-Zipf: {mn1:.3f}  (sum {sm1:.3f})", flush=True)
    print(f"  Zipf CSV: {args.zipf_csv.name}", flush=True)


if __name__ == "__main__":
    main()
