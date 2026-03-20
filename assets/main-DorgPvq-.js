import{j as e,r as c,R as A,D as I,a as U}from"./DiceFace-DpNS2CYC.js";import{I as B}from"./BugIcon-3w92ZCY1.js";import{I as R}from"./FoldsIcon-CkhDuZKH.js";import{I as F}from"./ProductilesIcon-C9Q6mFF5.js";import{I as O}from"./SumTilesIcon-CAJho3Ih.js";import{I as P}from"./FactorfallIcon-BxUmAk2e.js";function L({size:t=28,className:r=""}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 150 150",className:r,xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{x:"12.6",y:"12.08",width:"41.36",height:"41.36",transform:"translate(66.04 -.52) rotate(90)",fill:"#f6ae2d",stroke:"#000",strokeWidth:"5",strokeMiterlimit:"3"}),e.jsx("rect",{x:"96.04",y:"12.08",width:"41.36",height:"41.36",transform:"translate(149.48 -83.96) rotate(90)",fill:"#f6ae2d",stroke:"#000",strokeWidth:"5",strokeMiterlimit:"3"}),e.jsx("rect",{x:"54.32",y:"53.8",width:"41.36",height:"41.36",transform:"translate(149.48 -.52) rotate(90)",stroke:"#000",strokeWidth:"5",strokeMiterlimit:"3"}),e.jsx("rect",{x:"12.6",y:"95.51",width:"41.36",height:"41.36",transform:"translate(149.48 82.91) rotate(90)",fill:"#f6ae2d",stroke:"#000",strokeWidth:"5",strokeMiterlimit:"3"}),e.jsx("rect",{x:"96.04",y:"95.51",width:"41.36",height:"41.36",transform:"translate(232.91 -.52) rotate(90)",fill:"#f6ae2d",stroke:"#000",strokeWidth:"5",strokeMiterlimit:"3"})]})}const g="/puzzles/";function W(){const t=new Date,r=new Date(t.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function H(t){const r=new Date;r.setDate(r.getDate()-t);const n=new Date(r.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function T(t,r){return[0,1,2].map(n=>["1","2"].includes(localStorage.getItem(`${t}:${r}:${n}`)))}function Y(t,r){return[0,1,2].map(n=>localStorage.getItem(`${t}:${r}:${n}`)==="2")}function G(t,r){return[0,1,2].map(n=>{const o=localStorage.getItem(`${t}:${r}:${n}:moves`);return o!=null?parseInt(o,10):null})}function j(t,r){if(t!=="clueless")return null;const n=localStorage.getItem(`clueless:${r}:bestAttempts`);if(n==null)return null;const o=parseInt(n,10);return o>=1&&o<=99?o:null}function _(t,r){return t!=="clueless"?!1:localStorage.getItem(`clueless:${r}:failed`)==="1"}function $(t,r){return t==="clueless"?j(t,r)!=null:["1","2"].includes(localStorage.getItem(`${t}:${r}`))}function q(t,r){return t==="clueless"?j(t,r)===1:localStorage.getItem(`${t}:${r}`)==="2"}const X=["easy","medium","hard"];function J(t,r){const n=localStorage.getItem(`clueless:${t}:${r}:bestAttempts`);if(n!=null){const o=parseInt(n,10);if(o>=1&&o<=99)return o}if(r==="medium"){const o=j("clueless",t);if(o!=null)return o}return null}function C(t){return X.map(r=>J(t,r))}const Q=365;function V(t,r=!1){let n=0;for(let o=1;o<=Q;o++){const i=H(o);if(t==="clueless"?C(i).some(a=>a!=null):r?$(t,i):T(t,i).some(Boolean))n++;else break}return n}const M=new Set(["sumtiles","productiles"]),Z=["Easy","Med","Hard"];function K({gameKey:t,completions:r,perfects:n,moveCounts:o}){const i=M.has(t);return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(l=>{const a=r[l],u=n&&n[l],h=o&&o[l]!=null?o[l]:null,d=a?i?h!=null?String(Math.min(h,99)):"✓":u?"★":"✓":e.jsx(I,{count:l+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:d},l)})})}function ee({completed:t,perfect:r,attempts:n,failed:o}){const i=n!=null||o,l=i?n!=null:t,a=i&&n!=null,u=i&&o&&n==null,h=a?"#22c55e":u?"#374151":l?"#22c55e":"#d1d5db",d=i?n!=null?n===1?"★":String(Math.min(n,99)):o?"•":"1":t?r?"★":"✓":"1";return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:h,color:"#fff",fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:d})})}function te({attempts:t}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(r=>{const n=t?.[r]??null,o=n!=null,i=o?n===1?"★":String(Math.min(n,99)):e.jsx(I,{count:r+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:o?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:i},r)})})}function se(t,r,n,o,i,l){const a=new URL(n,window.location.origin).href,u=M.has(t);let h=r.toUpperCase()+`
`;for(let d=0;d<3;d++){const y=Z[d];if(o[d]){const b=u&&l&&l[d]!=null?` (${l[d]} moves)`:"",w=!u&&i&&i[d]?" (⭐ First try!)":"";h+=`${y}   🟩${b}${w}
`}else h+=`${y}   ⬜
`}return h+="Play at "+a,h}function re(t,r,n,o){const i=new URL(r,window.location.origin).href;let l=t.toUpperCase()+`
`;return n?l+=`🟩${o?" (⭐ First try!)":""}
`:l+=`⬜
`,l+="Play at "+i,l}function ne(t,r,n){const o=new URL(r,window.location.origin).href,i=["Easy","Med","Hard"];let l=t.toUpperCase()+`
`;for(let a=0;a<3;a++){const u=n?.[a]??null;if(u!=null){const h=u===1?"★":String(Math.min(u,99));l+=`${i[a]}   🟩 ${h}
`}else l+=`${i[a]}   ⬜
`}return l+="Play at "+o,l}function oe({size:t=18}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const f=[{key:"scurry",href:`${g}puzzlegames/scurry/`,Icon:B,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${g}puzzlegames/clueless/`,Icon:L,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${g}puzzlegames/folds/`,Icon:R,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${g}puzzlegames/factorfall/`,Icon:P,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${g}puzzlegames/sumtiles/`,Icon:O,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${g}puzzlegames/productiles/`,Icon:F,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],le=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),ie=2e3;function ae(){const t=c.useMemo(()=>W(),[]),r=c.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,T(s.key,t)])),[t]),n=c.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,Y(s.key,t)])),[t]),o=c.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,G(s.key,t)])),[t]),i=c.useMemo(()=>C(t),[t]),l=c.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,$(s.key,t)])),[t]),a=c.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,q(s.key,t)])),[t]),u=c.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,j(s.key,t)])),[t]),h=c.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,_(s.key,t)])),[t]),d=c.useMemo(()=>Object.fromEntries(f.map(s=>[s.key,V(s.key,!!s.single)])),[]),[y,b]=c.useState(null),[w,z]=c.useState(!1),x=c.useRef(null);A.useEffect(()=>()=>{x.current&&clearTimeout(x.current)},[]);const E=c.useCallback((s,p)=>{s.preventDefault(),s.stopPropagation();const m=f.find(v=>v.key===p);if(!m)return;const S=p==="clueless"?ne(m.title,m.href,i):m.single?re(m.title,m.href,l[p],a[p]):se(p,m.title,m.href,r[p],n[p],o[p]);navigator.clipboard.writeText(S).then(()=>{x.current&&clearTimeout(x.current),b(p),x.current=setTimeout(()=>{b(null),x.current=null},ie)})},[i,r,n,o,l,a]),D=c.useCallback((s,p)=>s==="clueless"?i.some(m=>m!=null):p?l[s]:r[s]?.some(Boolean),[i,r,l]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsxs("div",{className:"hp-top-inner",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:le})]}),e.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>z(!0),"aria-label":"Open instructions",children:"?"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:f.map(({key:s,href:p,Icon:m,title:S,desc:v,single:k})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:p,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(m,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:S}),e.jsx("div",{className:"hp-desc",children:v}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[s==="clueless"?e.jsx(te,{attempts:i}):k?e.jsx(ee,{completed:l[s],perfect:a[s],attempts:u[s],failed:h[s]}):e.jsx(K,{gameKey:s,completions:r[s],perfects:n[s],moveCounts:o[s]}),d[s]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",d[s]]})]})]})]}),D(s,k)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[y===s&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:N=>E(N,s),"aria-label":"Share results",children:[e.jsx(oe,{size:18}),"SHARE"]})]})]},p))})]}),w&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>z(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Puzzle order"})," — Each day has three puzzles of each type listed in order from easiest to hardest. Clueless has one puzzle per day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Box colors"})," — On each card, the boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green with star"})," — You completed the puzzle on your first try without using Clear (Scurry, Folds, Factorfall, Clueless)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Green with check"})," — You completed the puzzle."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gray"})," — Not yet completed."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tile games (Sum Tiles, Productiles)"})," — A completed box is always green and shows the number of moves you used. You can replay to try to lower your move count."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," — Use the ",e.jsx("strong",{children:"Share"})," button on a card to copy your results for that game to the clipboard. The button only appears when you have at least one completion for that day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streak"})," — If shown, your streak is the number of consecutive days on which you completed at least one puzzle of that type."]}),e.jsx("p",{children:"Tap a card to play that game's daily puzzles."})]})]})})]})}U.createRoot(document.getElementById("root")).render(e.jsx(ae,{}));
