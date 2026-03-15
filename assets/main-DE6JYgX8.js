import{r as i,j as e,R as f}from"./client-Bw-YqWxE.js";import{B as u}from"./BugIcon-BWfvEhW3.js";import{F as x}from"./FoldsIcon-Bupbnd5Q.js";import{P as y}from"./ProductilesIcon-BMBThO_2.js";import{S as b}from"./SumTilesIcon-DADM2jih.js";import{F as v}from"./FactorfallIcon-39nNJFAR.js";const n="/puzzles/";function j(){const t=new Date,a=new Date(t.getTime()-480*60*1e3);return`${a.getUTCFullYear()}-${String(a.getUTCMonth()+1).padStart(2,"0")}-${String(a.getUTCDate()).padStart(2,"0")}`}function w(t){const a=new Date;a.setDate(a.getDate()-t);const s=new Date(a.getTime()-480*60*1e3);return`${s.getUTCFullYear()}-${String(s.getUTCMonth()+1).padStart(2,"0")}-${String(s.getUTCDate()).padStart(2,"0")}`}function d(t,a){return[0,1,2].map(s=>["1","2"].includes(localStorage.getItem(`${t}:${a}:${s}`)))}function z(t,a){return[0,1,2].map(s=>localStorage.getItem(`${t}:${a}:${s}`)==="2")}function S(t,a){return[0,1,2].map(s=>{const o=localStorage.getItem(`${t}:${a}:${s}:moves`);return o!=null?parseInt(o,10):null})}const k=365;function $(t){let a=0;for(let s=1;s<=k;s++){const o=w(s);if(d(t,o).some(Boolean))a++;else break}return a}function I({completions:t,perfects:a,moveCounts:s}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(o=>e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:t[o]?a&&a[o]?"#ffbf00":"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"0.8rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:t[o]?s&&s[o]!=null?String(Math.min(s[o],99)):"✓":o+1},o))})}const l=[{key:"scurry",href:`${n}puzzlegames/scurry/`,Icon:u,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"folds",href:`${n}puzzlegames/folds/`,Icon:x,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"productiles",href:`${n}puzzlegames/productiles/`,Icon:y,title:"Productiles",desc:"Slide tiles so every row and column hits its product."},{key:"sumtiles",href:`${n}puzzlegames/sumtiles/`,Icon:b,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"factorfall",href:`${n}puzzlegames/factorfall/`,Icon:v,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."}],T=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});function D(){const t=i.useMemo(()=>j(),[]),a=i.useMemo(()=>Object.fromEntries(l.map(r=>[r.key,d(r.key,t)])),[t]),s=i.useMemo(()=>Object.fromEntries(l.map(r=>[r.key,z(r.key,t)])),[t]),o=i.useMemo(()=>Object.fromEntries(l.map(r=>[r.key,S(r.key,t)])),[t]),c=i.useMemo(()=>Object.fromEntries(l.map(r=>[r.key,$(r.key)])),[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the back seat, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:T})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:l.map(({key:r,href:p,Icon:m,title:h,desc:g})=>e.jsxs("a",{className:"hp-card",href:p,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(m,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:h}),e.jsx("div",{className:"hp-desc",children:g}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e.jsx(I,{completions:a[r],perfects:s[r],moveCounts:o[r]}),c[r]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",c[r]]})]})]})]},p))})]})]})}f.createRoot(document.getElementById("root")).render(e.jsx(D,{}));
