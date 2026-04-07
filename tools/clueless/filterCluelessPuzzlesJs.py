#!/usr/bin/env python3
"""
Drop any puzzle from puzzlegames/clueless/puzzles.js that uses a word in
cluelessSchoolSafeFilter.BLOCKLIST, then rewrite puzzles.js (easy / medium / hard).

Does not read or write combined JSONL reports or curated CSV — only puzzles.js.
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

_tools_dir = Path(__file__).resolve().parent
if str(_tools_dir) not in sys.path:
    sys.path.insert(0, str(_tools_dir))
from cluelessSchoolSafeFilter import BLOCKLIST, puzzle_has_blocked


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def dump_flat_via_node(root: Path, out_json: Path) -> None:
    script = (
        "import p from './puzzlegames/clueless/puzzles.js';"
        "import fs from 'fs';"
        f"fs.writeFileSync({json.dumps(str(out_json))}, JSON.stringify([...p.easy, ...p.medium, ...p.hard]));"
    )
    r = subprocess.run(
        ["node", "--input-type=module", "-e", script],
        cwd=root,
        check=False,
    )
    if r.returncode != 0:
        print("node failed — is puzzles.js valid ESM?", file=sys.stderr)
        sys.exit(1)


def write_puzzles_js(path: Path, rows: list[dict[str, str]], easy_n: int, medium_n: int) -> None:
    e, m = easy_n, medium_n
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
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def main() -> None:
    root = repo_root()
    ap = argparse.ArgumentParser(description="Filter clueless puzzles.js by BLOCKLIST only")
    ap.add_argument(
        "--out",
        type=Path,
        default=root / "puzzlegames" / "clueless" / "puzzles.js",
    )
    ap.add_argument("--easy", type=int, default=200)
    ap.add_argument("--medium", type=int, default=600)
    args = ap.parse_args()

    tmp = root / "_clueless_flat_dump.json"
    try:
        dump_flat_via_node(root, tmp)
        raw = json.loads(tmp.read_text(encoding="utf-8"))
    finally:
        if tmp.is_file():
            tmp.unlink()

    before = len(raw)
    kept: list[dict[str, str]] = []
    for p in raw:
        if puzzle_has_blocked(p, BLOCKLIST):
            continue
        kept.append({k: str(p[k]) for k in ("h1", "h2", "h3", "v1", "v2", "v3")})

    write_puzzles_js(args.out, kept, args.easy, args.medium)

    try:
        rel = args.out.relative_to(root)
    except ValueError:
        rel = args.out
    print(
        f"{rel}: {before} -> {len(kept)} puzzles (dropped {before - len(kept)}); "
        f"tiers easy {args.easy} / medium {args.medium} / rest hard — "
        f"BLOCKLIST has {len(BLOCKLIST)} words"
    )


if __name__ == "__main__":
    main()
