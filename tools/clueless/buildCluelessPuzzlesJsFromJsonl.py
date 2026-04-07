#!/usr/bin/env python3
"""Emit puzzlegames/clueless/puzzles.js from a JSONL (h1..v3 per line). Tiers: 200 easy, 600 medium, rest hard."""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def main() -> None:
    root = Path(__file__).resolve().parent.parent.parent
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "jsonl",
        type=Path,
        nargs="?",
        default=root / "tools" / "reports" / "clueless-combined-pruned-unambiguous-schoolsafe.jsonl",
    )
    ap.add_argument(
        "-o",
        "--out",
        type=Path,
        default=root / "puzzlegames" / "clueless" / "puzzles.js",
    )
    ap.add_argument("--easy", type=int, default=200)
    ap.add_argument("--medium", type=int, default=600)
    args = ap.parse_args()

    rows: list[dict[str, str]] = []
    with args.jsonl.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            o = json.loads(line)
            rows.append({k: str(o[k]) for k in ("h1", "h2", "h3", "v1", "v2", "v3")})

    e, m = args.easy, args.medium
    easy, med, hard = rows[:e], rows[e : e + m], rows[e + m :]

    def fmt(p: dict[str, str]) -> str:
        return (
            '    { h1:"%s", h2:"%s", h3:"%s", v1:"%s", v2:"%s", v3:"%s" }'
            % (p["h1"], p["h2"], p["h3"], p["v1"], p["v2"], p["v3"])
        )

    def emit_tier(name: str, arr: list[dict[str, str]]) -> str:
        if not arr:
            return f"  {name}: []"
        inner = ",\n".join(fmt(p) for p in arr)
        return f"  {name}: [\n{inner}\n  ]"

    body = ",\n\n".join(
        emit_tier(n, a) for n, a in (("easy", easy), ("medium", med), ("hard", hard))
    )
    text = f"export default {{\n{body}\n}}\n"

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(text, encoding="utf-8")
    print(
        f"Wrote {args.out} ({len(rows)} puzzles: easy {len(easy)}, medium {len(med)}, hard {len(hard)})"
    )


if __name__ == "__main__":
    main()
