import{r as c,R as v,j as e,a as z}from"./client-CF9XUsNj.js";import{B as S}from"./BugIcon-Cm5W0Fs3.js";import{F as T}from"./FoldsIcon-B_XzXa52.js";import{P as k}from"./ProductilesIcon-CA-fO1QI.js";import{S as I}from"./SumTilesIcon-D-wKcPjS.js";import{F as $}from"./FactorfallIcon-DciRw6T6.js";const x="/puzzles/";function N(){const t=new Date,o=new Date(t.getTime()-480*60*1e3);return`${o.getUTCFullYear()}-${String(o.getUTCMonth()+1).padStart(2,"0")}-${String(o.getUTCDate()).padStart(2,"0")}`}function D(t){const o=new Date;o.setDate(o.getDate()-t);const s=new Date(o.getTime()-480*60*1e3);return`${s.getUTCFullYear()}-${String(s.getUTCMonth()+1).padStart(2,"0")}-${String(s.getUTCDate()).padStart(2,"0")}`}function j(t,o){return[0,1,2].map(s=>["1","2"].includes(localStorage.getItem(`${t}:${o}:${s}`)))}function E(t,o){return[0,1,2].map(s=>localStorage.getItem(`${t}:${o}:${s}`)==="2")}function M(t,o){return[0,1,2].map(s=>{const a=localStorage.getItem(`${t}:${o}:${s}:moves`);return a!=null?parseInt(a,10):null})}const B=365;function C(t){let o=0;for(let s=1;s<=B;s++){const a=D(s);if(j(t,a).some(Boolean))o++;else break}return o}function R({completions:t,perfects:o,moveCounts:s}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(a=>e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:t[a]?o&&o[a]?"#ffbf00":"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"0.8rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:t[a]?s&&s[a]!=null?String(Math.min(s[a],99)):"✓":a+1},a))})}const O=new Set(["sumtiles","productiles"]),P=["Easy","Med","Hard"];function U(t,o,s,a,h,m){const g=new URL(s,window.location.origin).href;let d=o.toUpperCase()+`
`;for(let n=0;n<3;n++){const i=P[n];if(a[n]){const f=h&&h[n]?"🟨":"🟩",r=O.has(t)&&m&&m[n]!=null?` (${m[n]} moves)`:"";d+=`${i}   ${f}${r}
`}else d+=`${i}   ⬜
`}return d+="Play at "+g,d}function F({size:t=18}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const p=[{key:"scurry",href:`${x}puzzlegames/scurry/`,Icon:S,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"folds",href:`${x}puzzlegames/folds/`,Icon:T,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"productiles",href:`${x}puzzlegames/productiles/`,Icon:k,title:"Productiles",desc:"Slide tiles so every row and column hits its product."},{key:"sumtiles",href:`${x}puzzlegames/sumtiles/`,Icon:I,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"factorfall",href:`${x}puzzlegames/factorfall/`,Icon:$,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."}],L=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),A=2e3;function Y(){const t=c.useMemo(()=>N(),[]),o=c.useMemo(()=>Object.fromEntries(p.map(r=>[r.key,j(r.key,t)])),[t]),s=c.useMemo(()=>Object.fromEntries(p.map(r=>[r.key,E(r.key,t)])),[t]),a=c.useMemo(()=>Object.fromEntries(p.map(r=>[r.key,M(r.key,t)])),[t]),h=c.useMemo(()=>Object.fromEntries(p.map(r=>[r.key,C(r.key)])),[]),[m,g]=c.useState(null),[d,n]=c.useState(!1),i=c.useRef(null);v.useEffect(()=>()=>{i.current&&clearTimeout(i.current)},[]);const f=c.useCallback((r,l)=>{r.preventDefault(),r.stopPropagation();const u=p.find(b=>b.key===l);if(!u)return;const y=U(l,u.title,u.href,o[l],s[l],a[l]);navigator.clipboard.writeText(y).then(()=>{i.current&&clearTimeout(i.current),g(l),i.current=setTimeout(()=>{g(null),i.current=null},A)})},[o,s,a]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 18px;
                }
                .hp-top-inner {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    min-width: 0;
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

                .hp-cardWrapper {
                    display: flex;
                    align-items: stretch;
                    position: relative;
                }
                .hp-cardWrapper .hp-card { flex: 1; min-width: 0; }

                .hp-shareBtn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 12px;
                    margin: 12px;
                    align-self: center;
                    background: rgba(15, 23, 42, 0.9);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    cursor: pointer;
                    transition: background 140ms ease;
                }
                .hp-shareBtn:hover { background: rgba(15, 23, 42, 1); }
                .hp-shareBtn:focus-visible {
                    outline: 3px solid rgba(255,255,255,0.5);
                    outline-offset: 2px;
                }

                .toast-panel {
                    max-width: 420px;
                    background: rgba(15, 23, 42, 0.95);
                    color: white;
                    padding: 14px 16px;
                    border-radius: 12px;
                    box-shadow: 0 10px 28px rgba(0,0,0,0.35);
                    z-index: 50;
                }
                .toast-text { font-size: 0.9rem; line-height: 1.4; }
                .hp-shareToast.toast-panel {
                    position: absolute;
                    bottom: 100%;
                    right: 0;
                    margin-bottom: 6px;
                    left: auto;
                    transform: none;
                }
                .hp-shareToast .toast-text { font-size: 0.85rem; }

                .hp-helpBtn {
                    flex-shrink: 0;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: 2px solid var(--text);
                    background: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-weight: 900;
                    font-size: 1.1rem;
                    color: var(--text);
                }
                .hp-helpBtn:hover { background: rgba(0,0,0,0.06); }

                .hp-instructions-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    z-index: 100;
                    padding: 40px 20px;
                    overflow-y: auto;
                }
                .hp-modal-content {
                    width: 100%;
                    max-width: 500px;
                    padding: 40px 20px;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }
                .hp-modal-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 22px;
                    font-weight: 900;
                    cursor: pointer;
                }
                .hp-modal-title { margin-bottom: 1.5rem; text-align: center; }
                .hp-modal-body { font-size: 1rem; line-height: 1.6; }
                .hp-modal-body p { margin: 0 0 1rem; }
                .hp-modal-body ul { margin: 0 0 1rem; padding-left: 1.25rem; }
                .hp-modal-body li { margin-bottom: 0.5rem; }
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsxs("div",{className:"hp-top-inner",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:L})]}),e.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>n(!0),"aria-label":"Open instructions",children:"?"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:p.map(({key:r,href:l,Icon:u,title:y,desc:b})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:l,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(u,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:y}),e.jsx("div",{className:"hp-desc",children:b}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e.jsx(R,{completions:o[r],perfects:s[r],moveCounts:a[r]}),h[r]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",h[r]]})]})]})]}),o[r].some(Boolean)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[m===r&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:w=>f(w,r),"aria-label":"Share results",children:[e.jsx(F,{size:18}),"SHARE"]})]})]},l))})]}),d&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>n(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Puzzle order"})," — Each day has three puzzles listed in order from easiest to hardest."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Box colors"})," — On each card, the three boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Gold"})," — You completed the puzzle on your first try without using Undo or Reset."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Green"})," — You completed the puzzle."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gray"})," — Not yet completed."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tile games (Sum Tiles, Productiles)"})," — The number in a completed box is the number of moves you used. You can replay to try to lower your move count; if you lower your move count on a gold completion, the box will change to green."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," — Use the ",e.jsx("strong",{children:"Share"})," button on a card to copy your results for that game to the clipboard. The button only appears when you have at least one completion for that day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streak"})," — If shown, your streak is the number of consecutive days on which you completed at least one puzzle of that type."]}),e.jsx("p",{children:"Tap a card to play that game's daily puzzles."})]})]})})]})}z.createRoot(document.getElementById("root")).render(e.jsx(Y,{}));
