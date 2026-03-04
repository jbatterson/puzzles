import{j as e,R as o}from"./client-DBDiSal0.js";import{F as l}from"./FoldsIcon-42Xd_kIt.js";import{P as n}from"./ProductilesIcon-CcV0CjOf.js";import{S as d}from"./SumTilesIcon-C05fy3Mi.js";function c({size:t=28,className:s=""}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 28 28",className:s,children:[e.jsx("path",{d:"M10 6 Q 8 2 6 4",fill:"none",stroke:"#000",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("path",{d:"M18 6 Q 20 2 22 4",fill:"none",stroke:"#000",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsxs("g",{stroke:"#000",strokeWidth:"1.5",strokeLinecap:"round",children:[e.jsx("line",{x1:"8",y1:"12",x2:"3",y2:"10"}),e.jsx("line",{x1:"7",y1:"16",x2:"2",y2:"16"}),e.jsx("line",{x1:"8",y1:"20",x2:"3",y2:"22"}),e.jsx("line",{x1:"20",y1:"12",x2:"25",y2:"10"}),e.jsx("line",{x1:"21",y1:"16",x2:"26",y2:"16"}),e.jsx("line",{x1:"20",y1:"20",x2:"25",y2:"22"})]}),e.jsx("circle",{cx:"14",cy:"16",r:"9",fill:"#FF3B30",stroke:"#000",strokeWidth:"1"}),e.jsx("path",{d:"M8 13 A 7 7 0 0 1 20 13",fill:"#000"}),e.jsx("circle",{cx:"11",cy:"17",r:"1.5",fill:"white"}),e.jsx("circle",{cx:"17",cy:"17",r:"1.5",fill:"white"})]})}const i="/puzzles/",p=[{href:`${i}puzzlegames/scurry/`,Icon:c,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{href:`${i}puzzlegames/folds/`,Icon:l,title:"Folds",desc:"Reflect triangles to match the target pattern."},{href:`${i}puzzlegames/productiles/`,Icon:n,title:"Productiles",desc:"Slide tiles so every row and column hits its product."},{href:`${i}puzzlegames/sumtiles/`,Icon:d,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."}],h=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});function x(){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsx("div",{className:"hp-date",children:h}),e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:p.map(({href:t,Icon:s,title:a,desc:r})=>e.jsxs("a",{className:"hp-card",href:t,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(s,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:a}),e.jsx("div",{className:"hp-desc",children:r})]})]},t))})]})]})}o.createRoot(document.getElementById("root")).render(e.jsx(x,{}));
