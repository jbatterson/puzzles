import{j as e,r as c,R as N,D as T,a as B}from"./DiceFace-DpNS2CYC.js";import{B as A}from"./BugIcon-C3b6dKmt.js";import{F as U}from"./FoldsIcon-CJHy6sT_.js";import{P}from"./ProductilesIcon-C4rSTED1.js";import{S as R}from"./SumTilesIcon-BD7H-9vm.js";import{F as O}from"./FactorfallIcon-C8ySnoAB.js";function L({size:t=28}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 150 150",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{width:"150",height:"150",fill:"#ffffff"}),e.jsx("rect",{x:"50",y:"50",width:"50",height:"50",fill:"#111111"}),e.jsx("rect",{x:"50",y:"0",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"50",y:"100",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"0",y:"50",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"100",y:"50",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"0",y:"0",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"100",y:"0",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"0",y:"100",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"100",y:"100",width:"50",height:"50",fill:"#FFD600"}),e.jsx("line",{x1:"50",y1:"0",x2:"50",y2:"150",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"100",y1:"0",x2:"100",y2:"150",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"0",y1:"50",x2:"150",y2:"50",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"0",y1:"100",x2:"150",y2:"100",stroke:"#111",strokeWidth:"4"})]})}const g="/puzzles/";function W(){const t=new Date,n=new Date(t.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function H(t){const n=new Date;n.setDate(n.getDate()-t);const r=new Date(n.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function I(t,n){return[0,1,2].map(r=>["1","2"].includes(localStorage.getItem(`${t}:${n}:${r}`)))}function Y(t,n){return[0,1,2].map(r=>localStorage.getItem(`${t}:${n}:${r}`)==="2")}function G(t,n){return[0,1,2].map(r=>{const o=localStorage.getItem(`${t}:${n}:${r}:moves`);return o!=null?parseInt(o,10):null})}function j(t,n){if(t!=="clueless")return null;const r=localStorage.getItem(`clueless:${n}:bestAttempts`);if(r==null)return null;const o=parseInt(r,10);return o>=1&&o<=99?o:null}function _(t,n){return t!=="clueless"?!1:localStorage.getItem(`clueless:${n}:failed`)==="1"}function $(t,n){return t==="clueless"?j(t,n)!=null:["1","2"].includes(localStorage.getItem(`${t}:${n}`))}function q(t,n){return t==="clueless"?j(t,n)===1:localStorage.getItem(`${t}:${n}`)==="2"}const X=["easy","medium","hard"];function J(t,n){const r=localStorage.getItem(`clueless:${t}:${n}:bestAttempts`);if(r!=null){const o=parseInt(r,10);if(o>=1&&o<=99)return o}if(n==="medium"){const o=j("clueless",t);if(o!=null)return o}return null}function C(t){return X.map(n=>J(t,n))}const Q=365;function V(t,n=!1){let r=0;for(let o=1;o<=Q;o++){const i=H(o);if(t==="clueless"?C(i).some(a=>a!=null):n?$(t,i):I(t,i).some(Boolean))r++;else break}return r}const F=new Set(["sumtiles","productiles"]),Z=["Easy","Med","Hard"];function K({gameKey:t,completions:n,perfects:r,moveCounts:o}){const i=F.has(t);return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(l=>{const a=n[l],u=r&&r[l],h=o&&o[l]!=null?o[l]:null,d=a?i?h!=null?String(Math.min(h,99)):"✓":u?"★":"✓":e.jsx(T,{count:l+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:d},l)})})}function ee({completed:t,perfect:n,attempts:r,failed:o}){const i=r!=null||o,l=i?r!=null:t,a=i&&r!=null,u=i&&o&&r==null,h=a?"#22c55e":u?"#374151":l?"#22c55e":"#d1d5db",d=i?r!=null?r===1?"★":String(Math.min(r,99)):o?"•":"1":t?n?"★":"✓":"1";return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:h,color:"#fff",fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:d})})}function te({attempts:t}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const r=t?.[n]??null,o=r!=null,i=o?r===1?"★":String(Math.min(r,99)):e.jsx(T,{count:n+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:o?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:i},n)})})}function se(t,n,r,o,i,l){const a=new URL(r,window.location.origin).href,u=F.has(t);let h=n.toUpperCase()+`
`;for(let d=0;d<3;d++){const y=Z[d];if(o[d]){const b=u&&l&&l[d]!=null?` (${l[d]} moves)`:"",w=!u&&i&&i[d]?" (⭐ First try!)":"";h+=`${y}   🟩${b}${w}
`}else h+=`${y}   ⬜
`}return h+="Play at "+a,h}function ne(t,n,r,o){const i=new URL(n,window.location.origin).href;let l=t.toUpperCase()+`
`;return r?l+=`🟩${o?" (⭐ First try!)":""}
`:l+=`⬜
`,l+="Play at "+i,l}function re(t,n,r){const o=new URL(n,window.location.origin).href,i=["Easy","Med","Hard"];let l=t.toUpperCase()+`
`;for(let a=0;a<3;a++){const u=r?.[a]??null;if(u!=null){const h=u===1?"★":String(Math.min(u,99));l+=`${i[a]}   🟩 ${h}
`}else l+=`${i[a]}   ⬜
`}return l+="Play at "+o,l}function oe({size:t=18}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const x=[{key:"scurry",href:`${g}puzzlegames/scurry/`,Icon:A,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${g}puzzlegames/clueless/`,Icon:L,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${g}puzzlegames/folds/`,Icon:U,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${g}puzzlegames/factorfall/`,Icon:O,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${g}puzzlegames/sumtiles/`,Icon:R,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${g}puzzlegames/productiles/`,Icon:P,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],le=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),ie=2e3;function ae(){const t=c.useMemo(()=>W(),[]),n=c.useMemo(()=>Object.fromEntries(x.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,I(s.key,t)])),[t]),r=c.useMemo(()=>Object.fromEntries(x.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,Y(s.key,t)])),[t]),o=c.useMemo(()=>Object.fromEntries(x.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,G(s.key,t)])),[t]),i=c.useMemo(()=>C(t),[t]),l=c.useMemo(()=>Object.fromEntries(x.filter(s=>s.single).map(s=>[s.key,$(s.key,t)])),[t]),a=c.useMemo(()=>Object.fromEntries(x.filter(s=>s.single).map(s=>[s.key,q(s.key,t)])),[t]),u=c.useMemo(()=>Object.fromEntries(x.filter(s=>s.single).map(s=>[s.key,j(s.key,t)])),[t]),h=c.useMemo(()=>Object.fromEntries(x.filter(s=>s.single).map(s=>[s.key,_(s.key,t)])),[t]),d=c.useMemo(()=>Object.fromEntries(x.map(s=>[s.key,V(s.key,!!s.single)])),[]),[y,b]=c.useState(null),[w,z]=c.useState(!1),f=c.useRef(null);N.useEffect(()=>()=>{f.current&&clearTimeout(f.current)},[]);const D=c.useCallback((s,p)=>{s.preventDefault(),s.stopPropagation();const m=x.find(v=>v.key===p);if(!m)return;const S=p==="clueless"?re(m.title,m.href,i):m.single?ne(m.title,m.href,l[p],a[p]):se(p,m.title,m.href,n[p],r[p],o[p]);navigator.clipboard.writeText(S).then(()=>{f.current&&clearTimeout(f.current),b(p),f.current=setTimeout(()=>{b(null),f.current=null},ie)})},[i,n,r,o,l,a]),M=c.useCallback((s,p)=>s==="clueless"?i.some(m=>m!=null):p?l[s]:n[s]?.some(Boolean),[i,n,l]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsxs("div",{className:"hp-top-inner",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:le})]}),e.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>z(!0),"aria-label":"Open instructions",children:"?"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:x.map(({key:s,href:p,Icon:m,title:S,desc:v,single:k})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:p,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(m,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:S}),e.jsx("div",{className:"hp-desc",children:v}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[s==="clueless"?e.jsx(te,{attempts:i}):k?e.jsx(ee,{completed:l[s],perfect:a[s],attempts:u[s],failed:h[s]}):e.jsx(K,{gameKey:s,completions:n[s],perfects:r[s],moveCounts:o[s]}),d[s]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",d[s]]})]})]})]}),M(s,k)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[y===s&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:E=>D(E,s),"aria-label":"Share results",children:[e.jsx(oe,{size:18}),"SHARE"]})]})]},p))})]}),w&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>z(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Puzzle order"})," — Each day has three puzzles of each type listed in order from easiest to hardest. Clueless has one puzzle per day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Box colors"})," — On each card, the boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green with star"})," — You completed the puzzle on your first try without using Clear (Scurry, Folds, Factorfall, Clueless)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Green with check"})," — You completed the puzzle."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gray"})," — Not yet completed."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tile games (Sum Tiles, Productiles)"})," — A completed box is always green and shows the number of moves you used. You can replay to try to lower your move count."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," — Use the ",e.jsx("strong",{children:"Share"})," button on a card to copy your results for that game to the clipboard. The button only appears when you have at least one completion for that day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streak"})," — If shown, your streak is the number of consecutive days on which you completed at least one puzzle of that type."]}),e.jsx("p",{children:"Tap a card to play that game's daily puzzles."})]})]})})]})}B.createRoot(document.getElementById("root")).render(e.jsx(ae,{}));
