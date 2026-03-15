import{r as o,j as e,R as h}from"./client-Bw-YqWxE.js";import{B as g}from"./BugIcon-BWfvEhW3.js";import{F as f}from"./FoldsIcon-Bupbnd5Q.js";import{P as x}from"./ProductilesIcon-BMBThO_2.js";import{S as u}from"./SumTilesIcon-DADM2jih.js";import{F as y}from"./FactorfallIcon-39nNJFAR.js";const i="/puzzles/";function b(){const a=new Date,t=new Date(a.getTime()-480*60*1e3);return`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}function v(a){const t=new Date;t.setDate(t.getDate()-a);const s=new Date(t.getTime()-480*60*1e3);return`${s.getUTCFullYear()}-${String(s.getUTCMonth()+1).padStart(2,"0")}-${String(s.getUTCDate()).padStart(2,"0")}`}function p(a,t){return[0,1,2].map(s=>localStorage.getItem(`${a}:${t}:${s}`)==="1")}const w=365;function z(a){let t=0;for(let s=1;s<=w;s++){const r=v(s);if(p(a,r).some(Boolean))t++;else break}return t}function j({completions:a}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(t=>e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a[t]?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"0.8rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:a[t]?"✓":t+1},t))})}const n=[{key:"scurry",href:`${i}puzzlegames/scurry/`,Icon:g,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"folds",href:`${i}puzzlegames/folds/`,Icon:f,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"productiles",href:`${i}puzzlegames/productiles/`,Icon:x,title:"Productiles",desc:"Slide tiles so every row and column hits its product."},{key:"sumtiles",href:`${i}puzzlegames/sumtiles/`,Icon:u,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"factorfall",href:`${i}puzzlegames/factorfall/`,Icon:y,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."}],S=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});function k(){const a=o.useMemo(()=>b(),[]),t=o.useMemo(()=>Object.fromEntries(n.map(r=>[r.key,p(r.key,a)])),[a]),s=o.useMemo(()=>Object.fromEntries(n.map(r=>[r.key,z(r.key)])),[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
                    gap: 6px;
                    margin-bottom: 18px;
                }

                .hp-tagline {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 1.4;
                    color: var(--muted);
                    max-width: 480px;
                }

                .hp-date {
                    font-size: 13px;
                    color: var(--muted);
                    letter-spacing: 0.02em;
                    order: 2;
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
                    display: grid;
                    place-items: center;
                    flex: 0 0 auto;
                }

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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the back seat, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:S})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:n.map(({key:r,href:l,Icon:c,title:d,desc:m})=>e.jsxs("a",{className:"hp-card",href:l,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(c,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:d}),e.jsx("div",{className:"hp-desc",children:m}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e.jsx(j,{completions:t[r]}),s[r]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",s[r]]})]})]})]},l))})]})]})}h.createRoot(document.getElementById("root")).render(e.jsx(k,{}));
