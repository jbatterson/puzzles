import{r as d,R as z,j as e,a as S}from"./client-CF9XUsNj.js";import{B as T}from"./BugIcon-Cm5W0Fs3.js";import{F as k}from"./FoldsIcon-B_XzXa52.js";import{P as I}from"./ProductilesIcon-CA-fO1QI.js";import{S as $}from"./SumTilesIcon-D-wKcPjS.js";import{F as N}from"./FactorfallIcon-DciRw6T6.js";const g="/puzzles/";function D(){const o=new Date,r=new Date(o.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function E(o){const r=new Date;r.setDate(r.getDate()-o);const s=new Date(r.getTime()-480*60*1e3);return`${s.getUTCFullYear()}-${String(s.getUTCMonth()+1).padStart(2,"0")}-${String(s.getUTCDate()).padStart(2,"0")}`}function j(o,r){return[0,1,2].map(s=>["1","2"].includes(localStorage.getItem(`${o}:${r}:${s}`)))}function M(o,r){return[0,1,2].map(s=>localStorage.getItem(`${o}:${r}:${s}`)==="2")}function B(o,r){return[0,1,2].map(s=>{const n=localStorage.getItem(`${o}:${r}:${s}:moves`);return n!=null?parseInt(n,10):null})}const C=365;function R(o){let r=0;for(let s=1;s<=C;s++){const n=E(s);if(j(o,n).some(Boolean))r++;else break}return r}function F({gameKey:o,completions:r,perfects:s,moveCounts:n}){const p=w.has(o);return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(i=>{const h=r[i],m=s&&s[i],c=n&&n[i]!=null?n[i]:null,a=h?p?c!=null?String(Math.min(c,99)):"✓":m?"★":"✓":i+1;return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:h?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"0.8rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:a},i)})})}const w=new Set(["sumtiles","productiles"]),O=["Easy","Med","Hard"];function P(o,r,s,n,p,i){const h=new URL(s,window.location.origin).href,m=w.has(o);let c=r.toUpperCase()+`
`;for(let a=0;a<3;a++){const f=O[a];if(n[a]){const t=m&&i&&i[a]!=null?` (${i[a]} moves)`:"",l=!m&&p&&p[a]?" (⭐ First try!)":"";c+=`${f}   🟩${t}${l}
`}else c+=`${f}   ⬜
`}return c+="Play at "+h,c}function U({size:o=18}){return e.jsxs("svg",{width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const u=[{key:"scurry",href:`${g}puzzlegames/scurry/`,Icon:T,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"folds",href:`${g}puzzlegames/folds/`,Icon:k,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${g}puzzlegames/factorfall/`,Icon:N,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${g}puzzlegames/sumtiles/`,Icon:$,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${g}puzzlegames/productiles/`,Icon:I,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],A=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),L=2e3;function K(){const o=d.useMemo(()=>D(),[]),r=d.useMemo(()=>Object.fromEntries(u.map(t=>[t.key,j(t.key,o)])),[o]),s=d.useMemo(()=>Object.fromEntries(u.map(t=>[t.key,M(t.key,o)])),[o]),n=d.useMemo(()=>Object.fromEntries(u.map(t=>[t.key,B(t.key,o)])),[o]),p=d.useMemo(()=>Object.fromEntries(u.map(t=>[t.key,R(t.key)])),[]),[i,h]=d.useState(null),[m,c]=d.useState(!1),a=d.useRef(null);z.useEffect(()=>()=>{a.current&&clearTimeout(a.current)},[]);const f=d.useCallback((t,l)=>{t.preventDefault(),t.stopPropagation();const x=u.find(b=>b.key===l);if(!x)return;const y=P(l,x.title,x.href,r[l],s[l],n[l]);navigator.clipboard.writeText(y).then(()=>{a.current&&clearTimeout(a.current),h(l),a.current=setTimeout(()=>{h(null),a.current=null},L)})},[r,s,n]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsxs("div",{className:"hp-top-inner",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:A})]}),e.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>c(!0),"aria-label":"Open instructions",children:"?"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:u.map(({key:t,href:l,Icon:x,title:y,desc:b})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:l,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(x,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:y}),e.jsx("div",{className:"hp-desc",children:b}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e.jsx(F,{gameKey:t,completions:r[t],perfects:s[t],moveCounts:n[t]}),p[t]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",p[t]]})]})]})]}),r[t].some(Boolean)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[i===t&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:v=>f(v,t),"aria-label":"Share results",children:[e.jsx(U,{size:18}),"SHARE"]})]})]},l))})]}),m&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>c(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Puzzle order"})," — Each day has three puzzles of each type listed in order from easiest to hardest."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Box colors"})," — On each card, the three boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green with star"})," — You completed the puzzle on your first try without using Undo or Reset (Scurry, Folds, Factorfall only)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Green with check"})," — You completed the puzzle."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gray"})," — Not yet completed."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tile games (Sum Tiles, Productiles)"})," — A completed box is always green and shows the number of moves you used. You can replay to try to lower your move count."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," — Use the ",e.jsx("strong",{children:"Share"})," button on a card to copy your results for that game to the clipboard. The button only appears when you have at least one completion for that day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streak"})," — If shown, your streak is the number of consecutive days on which you completed at least one puzzle of that type."]}),e.jsx("p",{children:"Tap a card to play that game's daily puzzles."})]})]})})]})}S.createRoot(document.getElementById("root")).render(e.jsx(K,{}));
