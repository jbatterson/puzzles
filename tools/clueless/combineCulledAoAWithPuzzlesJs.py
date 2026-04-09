#!/usr/bin/env python3
"""
Merge culled AoA JSONL (first) and culled puzzlegames/clueless/puzzles.js into
one JSONL in tools/clueless/reports (h1..v3 per line, lowercase).

Usage:
  python tools/clueless/combineCulledAoAWithPuzzlesJs.py
  python tools/clueless/combineCulledAoAWithPuzzlesJs.py -o path/out.jsonl
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def load_jsonl(path: Path) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            o = json.loads(line)
            rows.append({k: str(o[k]).lower() for k in ("h1", "h2", "h3", "v1", "v2", "v3")})
    return rows


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


def main() -> None:
    root = repo_root()
    reports = root / "tools" / "clueless" / "reports"
    default_aoa = reports / "clueless-selected-aoa-combined-pruned.jsonl"
    default_js = root / "puzzlegames" / "clueless" / "puzzles.js"
    default_out = reports / "clueless-culled-aoa-plus-shipped.jsonl"

    ap = argparse.ArgumentParser(description="Combine culled AoA JSONL + puzzles.js into one JSONL")
    ap.add_argument("--aoa", type=Path, default=default_aoa, help="Culled AoA JSONL (written first)")
    ap.add_argument("--puzzles-js", type=Path, default=default_js, help="Culled puzzles.js")
    ap.add_argument("-o", "--output", type=Path, default=default_out)
    args = ap.parse_args()

    for label, p in [("AoA JSONL", args.aoa), ("puzzles.js", args.puzzles_js)]:
        if not p.is_file():
            print(f"Not found: {label} -- {p}", file=sys.stderr)
            sys.exit(1)

    aoa_rows = load_jsonl(args.aoa)
    js_rows = parse_puzzles_js(args.puzzles_js)
    combined = aoa_rows + js_rows

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as f:
        for e in combined:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

    try:
        rel = args.output.relative_to(root)
    except ValueError:
        rel = args.output
    print(
        f"Wrote {rel}: {len(aoa_rows):,} AoA + {len(js_rows):,} shipped = {len(combined):,} total",
        flush=True,
    )


if __name__ == "__main__":
    main()
