import{r as c,R as A,j as e,D as T,a as U}from"./DiceFace-DpNS2CYC.js";import{I as R}from"./BugIcon-3w92ZCY1.js";import{I as B}from"./FoldsIcon-Bgeumy9k.js";import{I as F}from"./ProductilesIcon-BFtW__0A.js";import{I as O}from"./SumTilesIcon-CAJho3Ih.js";import{I as P}from"./FactorfallIcon-CvePgXML.js";import{I as L}from"./CluelessIcon-DTm96GMa.js";const g="/puzzles/";function W(){const t=new Date,n=new Date(t.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function H(t){const n=new Date;n.setDate(n.getDate()-t);const o=new Date(n.getTime()-480*60*1e3);return`${o.getUTCFullYear()}-${String(o.getUTCMonth()+1).padStart(2,"0")}-${String(o.getUTCDate()).padStart(2,"0")}`}function $(t,n){return[0,1,2].map(o=>["1","2"].includes(localStorage.getItem(`${t}:${n}:${o}`)))}function Y(t,n){return[0,1,2].map(o=>localStorage.getItem(`${t}:${n}:${o}`)==="2")}function G(t,n){return[0,1,2].map(o=>{const r=localStorage.getItem(`${t}:${n}:${o}:moves`);return r!=null?parseInt(r,10):null})}function j(t,n){if(t!=="clueless")return null;const o=localStorage.getItem(`clueless:${n}:bestAttempts`);if(o==null)return null;const r=parseInt(o,10);return r>=1&&r<=99?r:null}function _(t,n){return t!=="clueless"?!1:localStorage.getItem(`clueless:${n}:failed`)==="1"}function k(t,n){return t==="clueless"?j(t,n)!=null:["1","2"].includes(localStorage.getItem(`${t}:${n}`))}function q(t,n){return t==="clueless"?j(t,n)===1:localStorage.getItem(`${t}:${n}`)==="2"}const X=["easy","medium","hard"];function J(t,n){const o=localStorage.getItem(`clueless:${t}:${n}:bestAttempts`);if(o!=null){const r=parseInt(o,10);if(r>=1&&r<=99)return r}if(n==="medium"){const r=j("clueless",t);if(r!=null)return r}return null}function C(t){return X.map(n=>J(t,n))}const Q=365;function V(t,n=!1){let o=0;for(let r=1;r<=Q;r++){const i=H(r);if(t==="clueless"?C(i).some(a=>a!=null):n?k(t,i):$(t,i).some(Boolean))o++;else break}return o}const M=new Set(["sumtiles","productiles"]),Z=["Easy","Med","Hard"];function K({gameKey:t,completions:n,perfects:o,moveCounts:r}){const i=M.has(t);return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(l=>{const a=n[l],h=o&&o[l],u=r&&r[l]!=null?r[l]:null,p=a?i?u!=null?String(Math.min(u,99)):"✓":h?"★":"✓":e.jsx(T,{count:l+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:p},l)})})}function ee({completed:t,perfect:n,attempts:o,failed:r}){const i=o!=null||r,l=i?o!=null:t,a=i&&o!=null,h=i&&r&&o==null,u=a?"#22c55e":h?"#374151":l?"#22c55e":"#d1d5db",p=i?o!=null?o===1?"★":String(Math.min(o,99)):r?"•":"1":t?n?"★":"✓":"1";return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:u,color:"#fff",fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:p})})}function te({attempts:t}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const o=t?.[n]??null,r=o!=null,i=r?o===1?"★":String(Math.min(o,99)):e.jsx(T,{count:n+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:r?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:i},n)})})}function se(t,n,o,r,i,l){const a=new URL(o,window.location.origin).href,h=M.has(t);let u=n.toUpperCase()+`
`;for(let p=0;p<3;p++){const y=Z[p];if(r[p]){const b=h&&l&&l[p]!=null?` (${l[p]} moves)`:"",w=!h&&i&&i[p]?" (⭐ First try!)":"";u+=`${y}   🟩${b}${w}
`}else u+=`${y}   ⬜
`}return u+="Play at "+a,u}function ne(t,n,o,r){const i=new URL(n,window.location.origin).href;let l=t.toUpperCase()+`
`;return o?l+=`🟩${r?" (⭐ First try!)":""}
`:l+=`⬜
`,l+="Play at "+i,l}function oe(t,n,o){const r=new URL(n,window.location.origin).href,i=["Easy","Med","Hard"];let l=t.toUpperCase()+`
`;for(let a=0;a<3;a++){const h=o?.[a]??null;if(h!=null){const u=h===1?"★":String(Math.min(h,99));l+=`${i[a]}   🟩 ${u}
`}else l+=`${i[a]}   ⬜
`}return l+="Play at "+r,l}function re({size:t=18}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const f=[{key:"scurry",href:`${g}puzzlegames/scurry/`,Icon:R,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${g}puzzlegames/clueless/`,Icon:L,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${g}puzzlegames/folds/`,Icon:B,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${g}puzzlegames/factorfall/`,Icon:P,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${g}puzzlegames/sumtiles/`,Icon:O,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${g}puzzlegames/productiles/`,Icon:F,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],le=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),ie=2e3;function ae(){const t=c.useMemo(()=>W(),[]),n=c.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,$(s.key,t)])),[t]),o=c.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,Y(s.key,t)])),[t]),r=c.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,G(s.key,t)])),[t]),i=c.useMemo(()=>C(t),[t]),l=c.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,k(s.key,t)])),[t]),a=c.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,q(s.key,t)])),[t]),h=c.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,j(s.key,t)])),[t]),u=c.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,_(s.key,t)])),[t]),p=c.useMemo(()=>Object.fromEntries(f.map(s=>[s.key,V(s.key,!!s.single)])),[]),[y,b]=c.useState(null),[w,z]=c.useState(!1),x=c.useRef(null);A.useEffect(()=>()=>{x.current&&clearTimeout(x.current)},[]);const E=c.useCallback((s,d)=>{s.preventDefault(),s.stopPropagation();const m=f.find(v=>v.key===d);if(!m)return;const S=d==="clueless"?oe(m.title,m.href,i):m.single?ne(m.title,m.href,l[d],a[d]):se(d,m.title,m.href,n[d],o[d],r[d]);navigator.clipboard.writeText(S).then(()=>{x.current&&clearTimeout(x.current),b(d),x.current=setTimeout(()=>{b(null),x.current=null},ie)})},[i,n,o,r,l,a]),D=c.useCallback((s,d)=>s==="clueless"?i.some(m=>m!=null):d?l[s]:n[s]?.some(Boolean),[i,n,l]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsxs("div",{className:"hp-top-inner",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:le})]}),e.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>z(!0),"aria-label":"Open instructions",children:"?"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:f.map(({key:s,href:d,Icon:m,title:S,desc:v,single:I})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:d,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(m,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:S}),e.jsx("div",{className:"hp-desc",children:v}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[s==="clueless"?e.jsx(te,{attempts:i}):I?e.jsx(ee,{completed:l[s],perfect:a[s],attempts:h[s],failed:u[s]}):e.jsx(K,{gameKey:s,completions:n[s],perfects:o[s],moveCounts:r[s]}),p[s]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",p[s]]})]})]})]}),D(s,I)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[y===s&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:N=>E(N,s),"aria-label":"Share results",children:[e.jsx(re,{size:18}),"SHARE"]})]})]},d))})]}),w&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>z(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Puzzle order"})," — Each day has three puzzles of each type listed in order from easiest to hardest. Clueless has one puzzle per day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Box colors"})," — On each card, the boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green with star"})," — You completed the puzzle on your first try without using Clear (Scurry, Folds, Factorfall, Clueless)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Green with check"})," — You completed the puzzle."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gray"})," — Not yet completed."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tile games (Sum Tiles, Productiles)"})," — A completed box is always green and shows the number of moves you used. You can replay to try to lower your move count."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," — Use the ",e.jsx("strong",{children:"Share"})," button on a card to copy your results for that game to the clipboard. The button only appears when you have at least one completion for that day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streak"})," — If shown, your streak is the number of consecutive days on which you completed at least one puzzle of that type."]}),e.jsx("p",{children:"Tap a card to play that game's daily puzzles."})]})]})})]})}U.createRoot(document.getElementById("root")).render(e.jsx(ae,{}));
