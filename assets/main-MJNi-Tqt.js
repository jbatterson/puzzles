import{j as e,r as c,R as $,a as C}from"./client-CF9XUsNj.js";import{B as D}from"./BugIcon-Cm5W0Fs3.js";import{F}from"./FoldsIcon-B_XzXa52.js";import{P as N}from"./ProductilesIcon-CA-fO1QI.js";import{S as E}from"./SumTilesIcon-D-wKcPjS.js";import{F as M}from"./FactorfallIcon-DciRw6T6.js";function B({size:s=28}){return e.jsxs("svg",{width:s,height:s,viewBox:"0 0 150 150",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{width:"150",height:"150",fill:"#ffffff"}),e.jsx("rect",{x:"50",y:"50",width:"50",height:"50",fill:"#111111"}),e.jsx("rect",{x:"50",y:"0",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"50",y:"100",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"0",y:"50",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"100",y:"50",width:"50",height:"50",fill:"#e5e5e5"}),e.jsx("rect",{x:"0",y:"0",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"100",y:"0",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"0",y:"100",width:"50",height:"50",fill:"#FFD600"}),e.jsx("rect",{x:"100",y:"100",width:"50",height:"50",fill:"#FFD600"}),e.jsx("line",{x1:"50",y1:"0",x2:"50",y2:"150",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"100",y1:"0",x2:"100",y2:"150",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"0",y1:"50",x2:"150",y2:"50",stroke:"#111",strokeWidth:"4"}),e.jsx("line",{x1:"0",y1:"100",x2:"150",y2:"100",stroke:"#111",strokeWidth:"4"})]})}const g="/puzzles/";function P(){const s=new Date,r=new Date(s.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function R(s){const r=new Date;r.setDate(r.getDate()-s);const o=new Date(r.getTime()-480*60*1e3);return`${o.getUTCFullYear()}-${String(o.getUTCMonth()+1).padStart(2,"0")}-${String(o.getUTCDate()).padStart(2,"0")}`}function z(s,r){return[0,1,2].map(o=>["1","2"].includes(localStorage.getItem(`${s}:${r}:${o}`)))}function O(s,r){return[0,1,2].map(o=>localStorage.getItem(`${s}:${r}:${o}`)==="2")}function U(s,r){return[0,1,2].map(o=>{const n=localStorage.getItem(`${s}:${r}:${o}:moves`);return n!=null?parseInt(n,10):null})}function S(s,r){return["1","2"].includes(localStorage.getItem(`${s}:${r}`))}function A(s,r){return localStorage.getItem(`${s}:${r}`)==="2"}const L=365;function W(s,r=!1){let o=0;for(let n=1;n<=L;n++){const a=R(n);if(r?S(s,a):z(s,a).some(Boolean))o++;else break}return o}const k=new Set(["sumtiles","productiles"]),Y=["Easy","Med","Hard"];function G({gameKey:s,completions:r,perfects:o,moveCounts:n}){const a=k.has(s);return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(i=>{const h=r[i],f=o&&o[i],p=n&&n[i]!=null?n[i]:null,d=h?a?p!=null?String(Math.min(p,99)):"✓":f?"★":"✓":i+1;return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:h?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"0.8rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:d},i)})})}function H({completed:s,perfect:r}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:s?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"0.85rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:s?r?"★":"✓":"1"})})}function K(s,r,o,n,a,i){const h=new URL(o,window.location.origin).href,f=k.has(s);let p=r.toUpperCase()+`
`;for(let d=0;d<3;d++){const y=Y[d];if(n[d]){const u=f&&i&&i[d]!=null?` (${i[d]} moves)`:"",b=!f&&a&&a[d]?" (⭐ First try!)":"";p+=`${y}   🟩${u}${b}
`}else p+=`${y}   ⬜
`}return p+="Play at "+h,p}function _(s,r,o,n){const a=new URL(r,window.location.origin).href;let i=s.toUpperCase()+`
`;return o?i+=`🟩${n?" (⭐ First try!)":""}
`:i+=`⬜
`,i+="Play at "+a,i}function q({size:s=18}){return e.jsxs("svg",{width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const m=[{key:"scurry",href:`${g}puzzlegames/scurry/`,Icon:D,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${g}puzzlegames/clueless/`,Icon:B,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!0},{key:"folds",href:`${g}puzzlegames/folds/`,Icon:F,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${g}puzzlegames/factorfall/`,Icon:M,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${g}puzzlegames/sumtiles/`,Icon:E,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${g}puzzlegames/productiles/`,Icon:N,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],X=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),J=2e3;function Q(){const s=c.useMemo(()=>P(),[]),r=c.useMemo(()=>Object.fromEntries(m.filter(t=>!t.single).map(t=>[t.key,z(t.key,s)])),[s]),o=c.useMemo(()=>Object.fromEntries(m.filter(t=>!t.single).map(t=>[t.key,O(t.key,s)])),[s]),n=c.useMemo(()=>Object.fromEntries(m.filter(t=>!t.single).map(t=>[t.key,U(t.key,s)])),[s]),a=c.useMemo(()=>Object.fromEntries(m.filter(t=>t.single).map(t=>[t.key,S(t.key,s)])),[s]),i=c.useMemo(()=>Object.fromEntries(m.filter(t=>t.single).map(t=>[t.key,A(t.key,s)])),[s]),h=c.useMemo(()=>Object.fromEntries(m.map(t=>[t.key,W(t.key,!!t.single)])),[]),[f,p]=c.useState(null),[d,y]=c.useState(!1),u=c.useRef(null);$.useEffect(()=>()=>{u.current&&clearTimeout(u.current)},[]);const b=c.useCallback((t,l)=>{t.preventDefault(),t.stopPropagation();const x=m.find(w=>w.key===l);if(!x)return;const j=x.single?_(x.title,x.href,a[l],i[l]):K(l,x.title,x.href,r[l],o[l],n[l]);navigator.clipboard.writeText(j).then(()=>{u.current&&clearTimeout(u.current),p(l),u.current=setTimeout(()=>{p(null),u.current=null},J)})},[r,o,n,a,i]),T=c.useCallback((t,l)=>l?a[t]:r[t]?.some(Boolean),[r,a]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsxs("div",{className:"hp-top-inner",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:X})]}),e.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>y(!0),"aria-label":"Open instructions",children:"?"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:m.map(({key:t,href:l,Icon:x,title:j,desc:w,single:v})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:l,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(x,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:j}),e.jsx("div",{className:"hp-desc",children:w}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[v?e.jsx(H,{completed:a[t],perfect:i[t]}):e.jsx(G,{gameKey:t,completions:r[t],perfects:o[t],moveCounts:n[t]}),h[t]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",h[t]]})]})]})]}),T(t,v)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[f===t&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:I=>b(I,t),"aria-label":"Share results",children:[e.jsx(q,{size:18}),"SHARE"]})]})]},l))})]}),d&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>y(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Puzzle order"})," — Each day has three puzzles of each type listed in order from easiest to hardest. Clueless has one puzzle per day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Box colors"})," — On each card, the boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green with star"})," — You completed the puzzle on your first try without using Clear (Scurry, Folds, Factorfall, Clueless)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Green with check"})," — You completed the puzzle."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Gray"})," — Not yet completed."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Tile games (Sum Tiles, Productiles)"})," — A completed box is always green and shows the number of moves you used. You can replay to try to lower your move count."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," — Use the ",e.jsx("strong",{children:"Share"})," button on a card to copy your results for that game to the clipboard. The button only appears when you have at least one completion for that day."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streak"})," — If shown, your streak is the number of consecutive days on which you completed at least one puzzle of that type."]}),e.jsx("p",{children:"Tap a card to play that game's daily puzzles."})]})]})})]})}C.createRoot(document.getElementById("root")).render(e.jsx(Q,{}));
