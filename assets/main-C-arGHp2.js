import{j as e,r as a,R as D,a as N}from"./client-CF9XUsNj.js";import{B as M}from"./BugIcon-Cm5W0Fs3.js";import{F as E}from"./FoldsIcon-B_XzXa52.js";import{P as B}from"./ProductilesIcon-CA-fO1QI.js";import{S as O}from"./SumTilesIcon-D-wKcPjS.js";import{F as P}from"./FactorfallIcon-DciRw6T6.js";function R({size:s=28}){return e.jsxs("svg",{width:s,height:s,viewBox:"0 0 150 150",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{width:"150",height:"150",fill:"#ffffff"}),e.jsx("rect",{x:"50",y:"50",width:"50",height:"50",fill:"#111111"}),e.jsx("rect",{x:"50",y:"0",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"50",y:"100",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"0",y:"50",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"100",y:"50",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"0",y:"0",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"100",y:"0",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"0",y:"100",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"100",y:"100",width:"50",height:"50",fill:"#FFD600"}),e.jsx("line",{x1:"50",y1:"0",x2:"50",y2:"150",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"100",y1:"0",x2:"100",y2:"150",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"0",y1:"50",x2:"150",y2:"50",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"0",y1:"100",x2:"150",y2:"100",stroke:"#111",strokeWidth:"4"})]})}const g="/puzzles/";function A(){const s=new Date,r=new Date(s.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function U(s){const r=new Date;r.setDate(r.getDate()-s);const o=new Date(r.getTime()-480*60*1e3);return`${o.getUTCFullYear()}-${String(o.getUTCMonth()+1).padStart(2,"0")}-${String(o.getUTCDate()).padStart(2,"0")}`}function k(s,r){return[0,1,2].map(o=>["1","2"].includes(localStorage.getItem(`${s}:${r}:${o}`)))}function L(s,r){return[0,1,2].map(o=>localStorage.getItem(`${s}:${r}:${o}`)==="2")}function W(s,r){return[0,1,2].map(o=>{const n=localStorage.getItem(`${s}:${r}:${o}:moves`);return n!=null?parseInt(n,10):null})}function S(s,r){if(s!=="clueless")return null;const o=localStorage.getItem(`clueless:${r}:bestAttempts`);if(o==null)return null;const n=parseInt(o,10);return n>=1&&n<=99?n:null}function Y(s,r){return s!=="clueless"?!1:localStorage.getItem(`clueless:${r}:failed`)==="1"}function T(s,r){return s==="clueless"?S(s,r)!=null:["1","2"].includes(localStorage.getItem(`${s}:${r}`))}function G(s,r){return s==="clueless"?S(s,r)===1:localStorage.getItem(`${s}:${r}`)==="2"}const H=365;function _(s,r=!1){let o=0;for(let n=1;n<=H;n++){const l=U(n);if(r?T(s,l):k(s,l).some(Boolean))o++;else break}return o}const I=new Set(["sumtiles","productiles"]),q=["Easy","Med","Hard"];function K({gameKey:s,completions:r,perfects:o,moveCounts:n}){const l=I.has(s);return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(i=>{const u=r[i],m=o&&o[i],p=n&&n[i]!=null?n[i]:null,c=u?l?p!=null?String(Math.min(p,99)):"✓":m?"★":"✓":i+1;return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:u?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"0.8rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:c},i)})})}function X({completed:s,perfect:r,attempts:o,failed:n}){const l=o!=null||n,i=l?o!=null:s,u=l&&o!=null,m=l&&n&&o==null,p=u?"#22c55e":m?"#374151":i?"#22c55e":"#d1d5db",c=l?o!=null?o===1?"★":String(Math.min(o,99)):n?"•":"1":s?r?"★":"✓":"1";return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:p,color:"#fff",fontWeight:900,fontSize:"0.85rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:c})})}function J(s,r,o,n,l,i){const u=new URL(o,window.location.origin).href,m=I.has(s);let p=r.toUpperCase()+`
`;for(let c=0;c<3;c++){const y=q[c];if(n[c]){const j=m&&i&&i[c]!=null?` (${i[c]} moves)`:"",b=!m&&l&&l[c]?" (⭐ First try!)":"";p+=`${y}   🟩${j}${b}
`}else p+=`${y}   ⬜
`}return p+="Play at "+u,p}function Q(s,r,o,n){const l=new URL(r,window.location.origin).href;let i=s.toUpperCase()+`
`;return o?i+=`🟩${n?" (⭐ First try!)":""}
`:i+=`⬜
`,i+="Play at "+l,i}function V({size:s=18}){return e.jsxs("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const h=[{key:"scurry",href:`${g}puzzlegames/scurry/`,Icon:M,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${g}puzzlegames/clueless/`,Icon:R,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!0},{key:"folds",href:`${g}puzzlegames/folds/`,Icon:E,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${g}puzzlegames/factorfall/`,Icon:P,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${g}puzzlegames/sumtiles/`,Icon:O,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${g}puzzlegames/productiles/`,Icon:B,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],Z=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),ee=2e3;function te(){const s=a.useMemo(()=>A(),[]),r=a.useMemo(()=>Object.fromEntries(h.filter(t=>!t.single).map(t=>[t.key,k(t.key,s)])),[s]),o=a.useMemo(()=>Object.fromEntries(h.filter(t=>!t.single).map(t=>[t.key,L(t.key,s)])),[s]),n=a.useMemo(()=>Object.fromEntries(h.filter(t=>!t.single).map(t=>[t.key,W(t.key,s)])),[s]),l=a.useMemo(()=>Object.fromEntries(h.filter(t=>t.single).map(t=>[t.key,T(t.key,s)])),[s]),i=a.useMemo(()=>Object.fromEntries(h.filter(t=>t.single).map(t=>[t.key,G(t.key,s)])),[s]),u=a.useMemo(()=>Object.fromEntries(h.filter(t=>t.single).map(t=>[t.key,S(t.key,s)])),[s]),m=a.useMemo(()=>Object.fromEntries(h.filter(t=>t.single).map(t=>[t.key,Y(t.key,s)])),[s]),p=a.useMemo(()=>Object.fromEntries(h.map(t=>[t.key,_(t.key,!!t.single)])),[]),[c,y]=a.useState(null),[j,b]=a.useState(!1),f=a.useRef(null);D.useEffect(()=>()=>{f.current&&clearTimeout(f.current)},[]);const $=a.useCallback((t,d)=>{t.preventDefault(),t.stopPropagation();const x=h.find(v=>v.key===d);if(!x)return;const w=x.single?Q(x.title,x.href,l[d],i[d]):J(d,x.title,x.href,r[d],o[d],n[d]);navigator.clipboard.writeText(w).then(()=>{f.current&&clearTimeout(f.current),y(d),f.current=setTimeout(()=>{y(null),f.current=null},ee)})},[r,o,n,l,i]),C=a.useCallback((t,d)=>d?l[t]:r[t]?.some(Boolean),[r,l]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsxs("div",{className:"hp-top-inner",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:Z})]}),e.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>b(!0),"aria-label":"Open instructions",children:"?"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:h.map(({key:t,href:d,Icon:x,title:w,desc:v,single:z})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:d,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(x,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:w}),e.jsx("div",{className:"hp-desc",children:v}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[z?e.jsx(X,{completed:l[t],perfect:i[t],attempts:u[t],failed:m[t]}):e.jsx(K,{gameKey:t,completions:r[t],perfects:o[t],moveCounts:n[t]}),p[t]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",p[t]]})]})]})]}),C(t,z)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[c===t&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:F=>$(F,t),"aria-label":"Share results",children:[e.jsx(V,{size:18}),"SHARE"]})]})]},d))})]}),j&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>b(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Puzzle order"})," — Each day has three puzzles of each type listed in order from easiest to hardest. Clueless has one puzzle per day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Box colors"})," — On each card, the boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green with star"})," — You completed the puzzle on your first try without using Clear (Scurry, Folds, Factorfall, Clueless)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Green with check"})," — You completed the puzzle."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gray"})," — Not yet completed."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tile games (Sum Tiles, Productiles)"})," — A completed box is always green and shows the number of moves you used. You can replay to try to lower your move count."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," — Use the ",e.jsx("strong",{children:"Share"})," button on a card to copy your results for that game to the clipboard. The button only appears when you have at least one completion for that day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streak"})," — If shown, your streak is the number of consecutive days on which you completed at least one puzzle of that type."]}),e.jsx("p",{children:"Tap a card to play that game's daily puzzles."})]})]})})]})}N.createRoot(document.getElementById("root")).render(e.jsx(te,{}));
