#!/usr/bin/env python3
"""
Scan Clueless puzzles (JSONL: h1..v3) for crossing-letter ambiguities against a
Wordle-style vocabulary CSV (word column), same logic as checkCluelessAmbiguity.mjs.

Example:
  python tools/clueless/checkCluelessAmbiguityJsonl.py \\
    -i tools/reports/clueless-combined-pruned.jsonl \\
    --vocab tools/reports/wordle-answers-zipf.csv

  # Drop any puzzle with >=1 lexical ambiguity:
  python tools/clueless/checkCluelessAmbiguityJsonl.py --output-clean tools/reports/clueless-combined-unambiguous.jsonl
"""
from __future__ import annotations

import argparse
import csv
import json
import sys
from pathlib import Path

CROSSINGS = [(r, c) for r in (0, 2, 4) for c in (0, 2, 4)]


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def load_vocab_csv(path: Path) -> set[str]:
    words: set[str] = set()
    with path.open(encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            w = (row.get("word") or "").strip().lower()
            if len(w) == 5 and w.isalpha():
                words.add(w)
    return words


def load_jsonl(path: Path) -> list[dict]:
    rows: list[dict] = []
    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def find_ambiguities(p: dict, vocab: set[str]) -> list[tuple]:
    """Returns list of (r, c, from_ch, to_ch, h_prime, v_prime, strict)."""
    h_words = [str(p["h1"]).lower(), str(p["h2"]).lower(), str(p["h3"]).lower()]
    v_words = [str(p["v1"]).lower(), str(p["v2"]).lower(), str(p["v3"]).lower()]
    out: list[tuple] = []

    for r, c in CROSSINGS:
        h_idx = r // 2
        v_idx = c // 2
        h_word = h_words[h_idx]
        v_word = v_words[v_idx]
        from_ch = h_word[c]
        if from_ch != v_word[r]:
            continue

        for code in range(ord("a"), ord("z") + 1):
            to_ch = chr(code)
            if to_ch == from_ch:
                continue
            h_prime = h_word[:c] + to_ch + h_word[c + 1 :]
            v_prime = v_word[:r] + to_ch + v_word[r + 1 :]
            if h_prime not in vocab or v_prime not in vocab:
                continue
            six = [h_words[0], h_words[1], h_words[2], v_words[0], v_words[1], v_words[2]]
            six[h_idx] = h_prime
            six[3 + v_idx] = v_prime
            strict = len(set(six)) == 6
            out.append((r, c, from_ch, to_ch, h_prime, v_prime, strict))
    return out


def main() -> None:
    root = repo_root()
    default_in = root / "tools" / "reports" / "clueless-combined-pruned.jsonl"
    default_vocab = root / "tools" / "reports" / "wordle-answers-zipf.csv"

    ap = argparse.ArgumentParser(description="Clueless ambiguity scan vs Wordle vocab CSV")
    ap.add_argument("-i", "--input", type=Path, default=default_in, help="JSONL with h1..v3")
    ap.add_argument("--vocab", type=Path, default=default_vocab, help="CSV with word column (5-letter words)")
    ap.add_argument("--json", action="store_true", help="Print one JSON summary line to stdout")
    ap.add_argument(
        "--verbose",
        action="store_true",
        help="List each puzzle index that has ambiguity",
    )
    ap.add_argument(
        "--output-clean",
        type=Path,
        metavar="PATH",
        help="Write only puzzles with zero lexical ambiguities to this JSONL (same keys as input)",
    )
    args = ap.parse_args()

    if not args.input.is_file():
        print(f"Not found: {args.input}", file=sys.stderr)
        sys.exit(1)
    if not args.vocab.is_file():
        print(f"Not found: {args.vocab}", file=sys.stderr)
        sys.exit(1)

    vocab = load_vocab_csv(args.vocab)
    puzzles = load_jsonl(args.input)

    lexical_rows: list[dict] = []
    puzzles_lexical: set[int] = set()
    puzzles_strict: set[int] = set()
    strict_instances = 0

    for i, p in enumerate(puzzles):
        hits = find_ambiguities(p, vocab)
        for h in hits:
            r, c, from_ch, to_ch, hp, vp, strict = h
            lexical_rows.append(
                {
                    "puzzleIndex": i,
                    "r": r,
                    "c": c,
                    "from": from_ch,
                    "to": to_ch,
                    "hPrime": hp,
                    "vPrime": vp,
                    "strict": strict,
                }
            )
            puzzles_lexical.add(i)
            if strict:
                strict_instances += 1
                puzzles_strict.add(i)

    n = len(puzzles)
    print(f"Puzzles in file: {n}", flush=True)
    print(f"Vocabulary size (from {args.vocab.name}): {len(vocab)}", flush=True)
    print(f"Lexical ambiguity instances: {len(lexical_rows)}", flush=True)
    print(f"Strict instances (six distinct words after swap): {strict_instances}", flush=True)
    print(f"Puzzles with >=1 lexical hit: {len(puzzles_lexical)}", flush=True)
    print(f"Puzzles with >=1 strict hit: {len(puzzles_strict)}", flush=True)

    if args.verbose and puzzles_lexical:
        print(f"Lexical puzzle indices: {sorted(puzzles_lexical)}", flush=True)

    if args.output_clean:
        kept = [p for i, p in enumerate(puzzles) if i not in puzzles_lexical]
        args.output_clean.parent.mkdir(parents=True, exist_ok=True)
        with args.output_clean.open("w", encoding="utf-8") as f:
            for e in kept:
                f.write(json.dumps(e, ensure_ascii=False) + "\n")
        try:
            rel = args.output_clean.relative_to(root)
        except ValueError:
            rel = args.output_clean
        removed = len(puzzles) - len(kept)
        print(flush=True)
        print(f"Wrote {rel} ({len(kept):,} puzzles, removed {removed:,} with any ambiguity)", flush=True)

    if args.json:
        import json as _json

        print(
            _json.dumps(
                {
                    "puzzles": n,
                    "vocab_size": len(vocab),
                    "lexical_instances": len(lexical_rows),
                    "strict_instances": strict_instances,
                    "puzzles_with_lexical": len(puzzles_lexical),
                    "puzzles_with_strict": len(puzzles_strict),
                }
            ),
            flush=True,
        )


if __name__ == "__main__":
    main()
