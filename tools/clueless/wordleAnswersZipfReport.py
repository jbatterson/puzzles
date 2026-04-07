#!/usr/bin/env python3
"""
Read a newline-separated word list (e.g. Wordle answers), write CSV:
  word, zipf_frequency, in_clueless_puzzles (Y/N)

Requires: pip install -r tools/clueless/requirements-wordfreq.txt

Example:
  python tools/clueless/wordleAnswersZipfReport.py path/to/wordle_answers.txt
  python tools/clueless/wordleAnswersZipfReport.py wordle_answers.txt -o tools/reports/wordle-answers-zipf.csv
"""
from __future__ import annotations

import argparse
import csv
import re
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

RE_PUZZLE_WORD = re.compile(r'(?:h[123]|v[123]):"([a-zA-Z]{5})"')


def load_clueless_vocab(puzzles_js: Path) -> set[str]:
    text = puzzles_js.read_text(encoding="utf-8")
    words = RE_PUZZLE_WORD.findall(text)
    return {w.lower() for w in words}


def read_wordlist(path: Path) -> list[str]:
    out: list[str] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        w = line.strip().lower()
        if not w or w.startswith("#"):
            continue
        out.append(w)
    return out


def main() -> None:
    repo_root = Path(__file__).resolve().parent.parent.parent
    default_puzzles = repo_root / "puzzlegames" / "clueless" / "puzzles.js"
    default_out = repo_root / "tools" / "reports" / "wordle-answers-zipf.csv"

    parser = argparse.ArgumentParser(
        description="CSV: word, zipf_frequency (wordfreq), in_clueless_puzzles Y/N",
    )
    parser.add_argument(
        "wordlist",
        type=Path,
        help="Text file with one word per line (e.g. wordle_answers.txt)",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=default_out,
        help=f"Output CSV (default: {default_out})",
    )
    parser.add_argument(
        "--puzzles-js",
        type=Path,
        default=default_puzzles,
        help="Path to clueless puzzles.js",
    )
    args = parser.parse_args()

    if not args.wordlist.is_file():
        print(f"Not found: {args.wordlist}", file=sys.stderr)
        sys.exit(1)
    if not args.puzzles_js.is_file():
        print(f"Not found: {args.puzzles_js}", file=sys.stderr)
        sys.exit(1)

    vocab = load_clueless_vocab(args.puzzles_js)
    words = read_wordlist(args.wordlist)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["word", "zipf_frequency", "in_clueless_puzzles"])
        for word in words:
            z = zipf_frequency(word, "en")
            yn = "Y" if word in vocab else "N"
            w.writerow([word, f"{z:.6f}", yn])

    rel = args.output
    try:
        rel = args.output.relative_to(repo_root)
    except ValueError:
        pass
    print(f"Wrote {rel} ({len(words)} rows, {len(vocab)} puzzle words in vocabulary)")


if __name__ == "__main__":
    main()
