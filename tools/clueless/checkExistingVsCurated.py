#!/usr/bin/env python3
"""
One-off check: how many existing Clueless puzzles (puzzles.js) have ambiguous
crossings when the vocabulary is the curated Wordle answer list?
"""
from __future__ import annotations

import csv
import re
from pathlib import Path

repo_root = Path(__file__).resolve().parent.parent.parent
puzzles_js = repo_root / "puzzlegames" / "clueless" / "puzzles.js"
curated_csv = repo_root / "tools" / "reports" / "wordle-answers-zipf-curated.csv"

RE_PUZZLE = re.compile(
    r'\{\s*h1:"(\w+)",\s*h2:"(\w+)",\s*h3:"(\w+)",\s*v1:"(\w+)",\s*v2:"(\w+)",\s*v3:"(\w+)"\s*\}'
)

def load_puzzles():
    text = puzzles_js.read_text(encoding="utf-8")
    return [
        {"h1": m[1], "h2": m[2], "h3": m[3], "v1": m[4], "v2": m[5], "v3": m[6]}
        for m in RE_PUZZLE.finditer(text)
    ]

def load_curated_vocab():
    words = set()
    with curated_csv.open(encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if row and row[0].strip():
                w = row[0].strip().lower()
                if len(w) == 5 and w.isalpha():
                    words.add(w)
    return words

CROSSINGS = [(r, c) for r in (0, 2, 4) for c in (0, 2, 4)]

def check_puzzle(p, vocab):
    h = [p["h1"].lower(), p["h2"].lower(), p["h3"].lower()]
    v = [p["v1"].lower(), p["v2"].lower(), p["v3"].lower()]
    hits = []
    for r, c in CROSSINGS:
        hi, vi = r // 2, c // 2
        hw, vw = h[hi], v[vi]
        orig = hw[c]
        for code in range(ord("a"), ord("z") + 1):
            ch = chr(code)
            if ch == orig:
                continue
            hp = hw[:c] + ch + hw[c+1:]
            vp = vw[:r] + ch + vw[r+1:]
            if hp in vocab and vp in vocab:
                hits.append((r, c, orig, ch, hp, vp))
    return hits

def main():
    puzzles = load_puzzles()
    vocab = load_curated_vocab()
    print(f"Puzzles: {len(puzzles)}")
    print(f"Curated vocab: {len(vocab)} words")
    print()

    total_hits = 0
    puzzles_with_hits = 0
    for i, p in enumerate(puzzles):
        hits = check_puzzle(p, vocab)
        if hits:
            puzzles_with_hits += 1
            total_hits += len(hits)
            words = f'{p["h1"]} {p["h2"]} {p["h3"]} / {p["v1"]} {p["v2"]} {p["v3"]}'
            print(f"  puzzle {i}: {words}")
            for r, c, orig, ch, hp, vp in hits:
                print(f"    ({r},{c}) {orig}->{ch}  h'={hp}  v'={vp}")

    print()
    print(f"Puzzles with >=1 ambiguous crossing: {puzzles_with_hits} / {len(puzzles)}")
    print(f"Total ambiguous instances: {total_hits}")

if __name__ == "__main__":
    main()
