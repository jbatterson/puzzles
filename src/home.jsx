import React from 'react'
import BugIcon from './shared/icons/BugIcon.jsx'
import FoldsIcon from './shared/icons/FoldsIcon.jsx'
import ProductilesIcon from './shared/icons/ProductilesIcon.jsx'
import SumTilesIcon from './shared/icons/SumTilesIcon.jsx'

const base = import.meta.env.BASE_URL

const GAMES = [
    { href: `${base}puzzlegames/scurry/`,      Icon: BugIcon,         title: 'Scurry',      desc: 'Place bugs to fill every highlighted square.' },
    { href: `${base}puzzlegames/folds/`,       Icon: FoldsIcon,       title: 'Folds',       desc: 'Reflect triangles to match the target pattern.' },
    { href: `${base}puzzlegames/productiles/`, Icon: ProductilesIcon, title: 'Productiles', desc: 'Slide tiles so every row and column hits its product.' },
    { href: `${base}puzzlegames/sumtiles/`,    Icon: SumTilesIcon,    title: 'Sum Tiles',   desc: 'Slide tiles so every row and column hits its sum.' },
]

const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
})

export default function Home() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;900&display=swap');

                :root {
                    --bg: #ffffff;
                    --text: #111111;
                    --muted: #555555;
                    --hairline: #e7e7e7;
                    --tile: #f4f4f4;
                    --tileHover: #eeeeee;
                    --shadow: 0 1px 0 rgba(0,0,0,0.03);
                    --radius: 10px;
                    --maxw: 720px;
                }

                * { box-sizing: border-box; }

                body {
                    margin: 0;
                    background: var(--bg);
                    color: var(--text);
                    font-family: 'Outfit', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                .hp-page {
                    max-width: var(--maxw);
                    margin: 0 auto;
                    padding: 28px 18px 48px;
                }

                .hp-top {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 18px;
                }

                .hp-date {
                    font-size: 13px;
                    color: var(--muted);
                    letter-spacing: 0.02em;
                }

                .hp-h1 {
                    margin: 0;
                    font-size: 28px;
                    line-height: 1.15;
                    font-weight: 900;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                }

                .hp-divider {
                    height: 2px;
                    background: var(--text);
                    margin: 18px 0;
                }

                .hp-list {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 14px;
                }

                a.hp-card {
                    display: flex;
                    gap: 16px;
                    text-decoration: none;
                    color: inherit;
                    padding: 12px;
                    border-radius: var(--radius);
                    transition: background 140ms ease, transform 140ms ease;
                }

                a.hp-card:hover {
                    background: rgba(0,0,0,0.02);
                    transform: translateY(-1px);
                }

                a.hp-card:active { transform: translateY(0px); }

                .hp-iconTile {
                    width: 96px;
                    height: 96px;
                    border-radius: var(--radius);
                    background: var(--tile);
                    border: 1px solid var(--hairline);
                    box-shadow: var(--shadow);
                    display: grid;
                    place-items: center;
                    flex: 0 0 auto;
                    transition: background 140ms ease;
                }

                a.hp-card:hover .hp-iconTile { background: var(--tileHover); }

                .hp-meta {
                    min-width: 0;
                    padding-top: 4px;
                }

                .hp-cardTitle {
                    font-size: 16px;
                    font-weight: 900;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 6px;
                }

                .hp-desc {
                    font-size: 14px;
                    line-height: 1.35;
                    color: var(--muted);
                    max-width: 52ch;
                }

                @media (max-width: 420px) {
                    .hp-iconTile { width: 84px; height: 84px; }
                    .hp-h1 { font-size: 26px; }
                }

                a.hp-card:focus-visible {
                    outline: 3px solid rgba(0,0,0,0.2);
                    outline-offset: 3px;
                }
            `}</style>

            <main className="hp-page">
                <header className="hp-top">
                    <div className="hp-date">{today}</div>
                    <h1 className="hp-h1">Daily Puzzles</h1>
                </header>

                <div className="hp-divider" />

                <section className="hp-list">
                    {GAMES.map(({ href, Icon, title, desc }) => (
                        <a key={href} className="hp-card" href={href}>
                            <div className="hp-iconTile">
                                <Icon size={56} />
                            </div>
                            <div className="hp-meta">
                                <div className="hp-cardTitle">{title}</div>
                                <div className="hp-desc">{desc}</div>
                            </div>
                        </a>
                    ))}
                </section>
            </main>
        </>
    )
}