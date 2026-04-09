#!/usr/bin/env python3
"""
Remove puzzles that contain any blocked word, and remove those words from the
curated Wordle CSV (word column).

Words are chosen for broad classroom / school-library suitability: substances,
violence, crime, profanity-adjacent terms, sensitive body/medical terms, etc.
Extend BLOCKLIST below if policy tightens.

Use --no-curated to filter a JSONL only without rewriting wordle-answers-zipf-curated.csv.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

# All five-letter; match puzzle slots and CSV word column case-insensitively.
BLOCKLIST: frozenset[str] = frozenset(
    {
        # Original review — harm, substances, weapons, sensitive body/medical
        "slave",
        "abuse",
        "urine",
        "opium",
        "vodka",
        "death",
        "knife",
        "rifle",
        "tumor",
        "renal",
        "bowel",
        "belch",
        "bosom",
        "prick",
        # Alcohol & tobacco (beyond vodka)
        "lager",
        "stout",
        "cigar",
        # Drugs / violence / gore
        "crack",
        "blade",
        "blood",
        "venom",
        # Crime
        "mafia",
        "heist",
        # Vulgarity / profanity-adjacent
        "filth",
        "swear",
        "curse",
        # Alcohol / intoxication
        "sober",
        "tipsy",
        # Insults / pejoratives
        "bully",
        "loser",
        "creep",
        "freak",
        # Religious / scripture-adjacent
        "wrath",
        "bible",
        "psalm",
        "altar",
        "tithe",
        "rabbi",
        "vicar",
        "piety",
        # Sensitive topics / tone
        "abort",
        "strip",
        "grave",
        # Additional school review
        "hence",
        "butch",
        "fatal",
        "whack",
        "enema",
        "ovary",
        # AoA / advanced or sensitive vocab cull (younger readers)
        "abbot",
        "agora",
        "allay",
        "avail",
        "azure",
        "beech",
        "beset",
        "billy",
        "blond",
        "booty",
        "briar",
        "cabal",
        "cairn",
        "china",
        "chaff",
        "chard",
        "crump",
        "dandy",
        "detox",
        "diode",
        "ester",
        "fella",
        "femme",
        "fibre",
        "forgo",
        "frock",
        "furor",
        "godly",
        "gypsy",
        "haute",
        "hydro",
        "inter",
        "junta",
        "kappa",
        "leper",
        "liege",
        "loath",
        "lorry",
        "masse",
        "midge",
        "modal",
        "nadir",
        "natal",
        "olden",
        "omega",
        "pagan",
        "palsy",
        "papal",
        "pinto",
        "quasi",
        "roger",
        "ruddy",
        "rupee",
        "salvo",
        "sheik",
        "shunt",
        "smite",
        "snuff",
        "swami",
        "synod",
        "terra",
        "theta",
        "tonga",
        "verso",
        "whoop",
        "wight",
        "willy",
        "woken",
    }
)


def repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def puzzle_has_blocked(p: dict, blocked: frozenset[str]) -> bool:
    for k in ("h1", "h2", "h3", "v1", "v2", "v3"):
        if str(p[k]).lower() in blocked:
            return True
    return False


def load_jsonl(path: Path) -> list[dict]:
    rows: list[dict] = []
    with path.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            rows.append(json.loads(line))
    return rows


def main() -> None:
    root = repo_root()
    default_puzzles = root / "tools" / "reports" / "clueless-combined-pruned-unambiguous-sorted.jsonl"
    default_out_puzzles = root / "tools" / "reports" / "clueless-combined-pruned-unambiguous-schoolsafe.jsonl"
    default_csv = root / "tools" / "reports" / "wordle-answers-zipf-curated.csv"

    ap = argparse.ArgumentParser(description="Filter puzzles and curated CSV by school blocklist")
    ap.add_argument("-i", "--puzzles-in", type=Path, default=default_puzzles)
    ap.add_argument("-o", "--puzzles-out", type=Path, default=default_out_puzzles)
    ap.add_argument("--curated-csv", type=Path, default=default_csv, help="Curated Wordle CSV to rewrite without blocked words")
    ap.add_argument(
        "--no-curated",
        action="store_true",
        help="Only filter puzzles JSONL; do not read or rewrite the curated CSV",
    )
    args = ap.parse_args()

    if not args.puzzles_in.is_file():
        print(f"Not found: {args.puzzles_in}", file=sys.stderr)
        sys.exit(1)
    if not args.no_curated and not args.curated_csv.is_file():
        print(f"Not found: {args.curated_csv}", file=sys.stderr)
        sys.exit(1)

    puzzles = load_jsonl(args.puzzles_in)
    kept = [p for p in puzzles if not puzzle_has_blocked(p, BLOCKLIST)]
    removed_n = len(puzzles) - len(kept)

    args.puzzles_out.parent.mkdir(parents=True, exist_ok=True)
    with args.puzzles_out.open("w", encoding="utf-8") as f:
        for e in kept:
            f.write(json.dumps(e, ensure_ascii=False) + "\n")

    if args.no_curated:
        try:
            rel_p = args.puzzles_out.relative_to(root)
        except ValueError:
            rel_p = args.puzzles_out
        print(f"Puzzles: {len(puzzles):,} -> {len(kept):,} (removed {removed_n:,})", flush=True)
        print(f"Wrote {rel_p}", flush=True)
        print(f"Blocklist ({len(BLOCKLIST)} words) (--no-curated: CSV unchanged)", flush=True)
        return

    text = args.curated_csv.read_text(encoding="utf-8")
    lines = text.splitlines()
    if not lines:
        print("Empty CSV", file=sys.stderr)
        sys.exit(1)

    header = lines[0]
    out_rows: list[str] = [header]
    removed_words = 0
    for line in lines[1:]:
        if not line.strip():
            continue
        first_comma = line.find(",")
        if first_comma == -1:
            out_rows.append(line)
            continue
        word = line[:first_comma].strip().lower()
        if word in BLOCKLIST:
            removed_words += 1
            continue
        out_rows.append(line)

    args.curated_csv.write_text("\n".join(out_rows) + ("\n" if text.endswith("\n") else ""), encoding="utf-8")

    try:
        rel_p = args.puzzles_out.relative_to(root)
        rel_c = args.curated_csv.relative_to(root)
    except ValueError:
        rel_p, rel_c = args.puzzles_out, args.curated_csv

    print(f"Puzzles: {len(puzzles):,} -> {len(kept):,} (removed {removed_n:,})", flush=True)
    print(f"Wrote {rel_p}", flush=True)
    print(f"Curated CSV: removed {removed_words} word row(s) -> {rel_c}", flush=True)
    print(f"Blocklist ({len(BLOCKLIST)} words)", flush=True)


if __name__ == "__main__":
    main()
