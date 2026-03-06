import{j as e,r as n,R as h}from"./client-Bw-YqWxE.js";import{B as m}from"./BugIcon-BWfvEhW3.js";import{F as x}from"./FoldsIcon-Bupbnd5Q.js";import{P as g}from"./ProductilesIcon-BMBThO_2.js";import{S as u}from"./SumTilesIcon-DADM2jih.js";function y({size:a=24,className:t=""}){const i=a*.22;return e.jsxs("svg",{width:a,height:a,viewBox:"0 0 48 48",fill:"none",className:t,"aria-hidden":!0,children:[e.jsx("circle",{cx:"24",cy:"10",r:i,fill:"#ff5f5f"}),e.jsx("text",{x:"24",y:"10",textAnchor:"middle",dominantBaseline:"central",fill:"white",fontSize:"7",fontWeight:"900",fontFamily:"Outfit, sans-serif",children:"3"}),e.jsx("circle",{cx:"14",cy:"24",r:i,fill:"#3273dc"}),e.jsx("text",{x:"14",y:"24",textAnchor:"middle",dominantBaseline:"central",fill:"white",fontSize:"7",fontWeight:"900",fontFamily:"Outfit, sans-serif",children:"2"}),e.jsx("circle",{cx:"34",cy:"24",r:i,fill:"#ff5f5f"}),e.jsx("text",{x:"34",y:"24",textAnchor:"middle",dominantBaseline:"central",fill:"white",fontSize:"7",fontWeight:"900",fontFamily:"Outfit, sans-serif",children:"4"}),e.jsx("circle",{cx:"14",cy:"38",r:i,fill:"#ff5f5f"}),e.jsx("text",{x:"14",y:"38",textAnchor:"middle",dominantBaseline:"central",fill:"white",fontSize:"7",fontWeight:"900",fontFamily:"Outfit, sans-serif",children:"6"}),e.jsx("circle",{cx:"24",cy:"38",r:i,fill:"#3273dc"}),e.jsx("text",{x:"24",y:"38",textAnchor:"middle",dominantBaseline:"central",fill:"white",fontSize:"7",fontWeight:"900",fontFamily:"Outfit, sans-serif",children:"2"}),e.jsx("circle",{cx:"34",cy:"38",r:i,fill:"#3273dc"}),e.jsx("text",{x:"34",y:"38",textAnchor:"middle",dominantBaseline:"central",fill:"white",fontSize:"7",fontWeight:"900",fontFamily:"Outfit, sans-serif",children:"5"}),e.jsx("path",{d:"M24 2 L24 6",stroke:"#999",strokeWidth:"1.5",strokeLinecap:"round"}),e.jsx("path",{d:"M22 4.5 L24 7 L26 4.5",stroke:"#999",strokeWidth:"1.2",strokeLinecap:"round",strokeLinejoin:"round",fill:"none"})]})}const r="/puzzles/";function j(){const a=new Date,t=new Date(a.getTime()-480*60*1e3);return`${t.getUTCFullYear()}-${String(t.getUTCMonth()+1).padStart(2,"0")}-${String(t.getUTCDate()).padStart(2,"0")}`}function w(a){const t=new Date;t.setDate(t.getDate()-a);const i=new Date(t.getTime()-480*60*1e3);return`${i.getUTCFullYear()}-${String(i.getUTCMonth()+1).padStart(2,"0")}-${String(i.getUTCDate()).padStart(2,"0")}`}function c(a,t){return[0,1,2].map(i=>localStorage.getItem(`${a}:${t}:${i}`)==="1")}const b=365;function z(a){let t=0;for(let i=1;i<=b;i++){const s=w(i);if(c(a,s).some(Boolean))t++;else break}return t}function v({completions:a}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(t=>e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a[t]?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"0.8rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:a[t]?"✓":t+1},t))})}const o=[{key:"scurry",href:`${r}puzzlegames/scurry/`,Icon:m,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"folds",href:`${r}puzzlegames/folds/`,Icon:x,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"productiles",href:`${r}puzzlegames/productiles/`,Icon:g,title:"Productiles",desc:"Slide tiles so every row and column hits its product."},{key:"sumtiles",href:`${r}puzzlegames/sumtiles/`,Icon:u,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"factorfall",href:`${r}puzzlegames/factorfall/`,Icon:y,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."}],S=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});function k(){const a=n.useMemo(()=>j(),[]),t=n.useMemo(()=>Object.fromEntries(o.map(s=>[s.key,c(s.key,a)])),[a]),i=n.useMemo(()=>Object.fromEntries(o.map(s=>[s.key,z(s.key)])),[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the back seat, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:S})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:o.map(({key:s,href:l,Icon:d,title:p,desc:f})=>e.jsxs("a",{className:"hp-card",href:l,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(d,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:p}),e.jsx("div",{className:"hp-desc",children:f}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e.jsx(v,{completions:t[s]}),i[s]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",i[s]]})]})]})]},l))})]})]})}h.createRoot(document.getElementById("root")).render(e.jsx(k,{}));
