import{j as e,r as d,R as C,T as G,P as z,a as k,b as Y}from"./style-ByZXMC8I.js";import{A as q,D as U}from"./DiceFace-B_8eLFWB.js";import{I as N}from"./BugIcon-BTtisUsi.js";import{I as A}from"./FoldsIcon-BbpDl8C0.js";import{I as V}from"./ProductilesIcon-BiTc2F2G.js";import{I as D}from"./SumTilesIcon-Cy6uHP7a.js";import{I as X}from"./FactorfallIcon-DoN6jpCB.js";import{I as J}from"./CluelessIcon-C2C3ZRzX.js";function Q({size:t=56}){const n=t;return e.jsxs("svg",{width:n,height:n,viewBox:"0 0 64 64",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsx("rect",{x:"6",y:"6",width:"52",height:"52",rx:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{d:"M26 22v24",stroke:"currentColor",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("path",{d:"M20 28l6-6",stroke:"currentColor",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("path",{d:"M44 22c-6 0-10 6-10 12s4 12 10 12 10-6 10-12-4-12-10-12Z",stroke:"currentColor",strokeWidth:"6"})]})}const g="/puzzles/";function K(){const t=new Date,n=new Date(t.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function M(t){const n=new Date;n.setDate(n.getDate()-t);const o=new Date(n.getTime()-480*60*1e3);return`${o.getUTCFullYear()}-${String(o.getUTCMonth()+1).padStart(2,"0")}-${String(o.getUTCDate()).padStart(2,"0")}`}function R(t,n){return[0,1,2].map(o=>["1","2"].includes(localStorage.getItem(`${t}:${n}:${o}`)))}function ee(t,n){return[0,1,2].map(o=>localStorage.getItem(`${t}:${n}:${o}`)==="2")}function te(t,n){return[0,1,2].map(o=>{const r=localStorage.getItem(`${t}:${n}:${o}:moves`);return r!=null?parseInt(r,10):null})}function v(t,n){if(t!=="clueless")return null;const o=localStorage.getItem(`clueless:${n}:bestAttempts`);if(o==null)return null;const r=parseInt(o,10);return r>=1&&r<=99?r:null}function se(t,n){return t!=="clueless"?!1:localStorage.getItem(`clueless:${n}:failed`)==="1"}function P(t,n){return t==="clueless"?v(t,n)!=null:["1","2"].includes(localStorage.getItem(`${t}:${n}`))}function ne(t,n){return t==="clueless"?v(t,n)===1:localStorage.getItem(`${t}:${n}`)==="2"}const oe=["easy","medium","hard"];function re(t,n){const o=localStorage.getItem(`clueless:${t}:${n}:bestAttempts`);if(o!=null){const r=parseInt(o,10);if(r>=1&&r<=99)return r}if(n==="medium"){const r=v("clueless",t);if(r!=null)return r}return null}function B(t){return oe.map(n=>re(t,n))}const ie=365;function L(t,n,o){return t==="clueless"?B(o).some(r=>r!=null):n?P(t,o):R(t,o).some(Boolean)}function le(t,n=!1){const r=L(t,n,M(0))?0:1;let l=0;for(let i=r;i<=ie;i++){const a=M(i);if(L(t,n,a))l++;else break}return l}const O=new Set(["sumtiles","productiles"]),ae=["Easy","Med","Hard"];function ce({gameKey:t,completions:n,perfects:o,moveCounts:r}){const l=O.has(t);return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(i=>{const a=n[i],u=o&&o[i],h=r&&r[i]!=null?r[i]:null,m=a?l?h!=null?String(Math.min(h,99)):"✓":u?"★":"✓":e.jsx(U,{count:i+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a?"#22c55e":k,color:a?"#fff":z,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:m},i)})})}function de({completed:t,perfect:n,attempts:o,failed:r}){const l=o!=null||r,i=l?o!=null:t,a=l&&o!=null,u=l&&r&&o==null,h=a?"#22c55e":u?"#374151":i?"#22c55e":k,m=l?o!=null?o===1?"★":String(Math.min(o,99)):r?"•":"1":t?n?"★":"✓":"1";return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:h,color:a||u||i?"#fff":z,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:m})})}function pe({attempts:t}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const o=t?.[n]??null,r=o!=null,l=r?o===1?"★":String(Math.min(o,99)):e.jsx(U,{count:n+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:r?"#22c55e":k,color:r?"#fff":z,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:l},n)})})}function ue(t,n,o,r,l,i){const a=new URL(o,window.location.origin).href,u=O.has(t);let h=n.toUpperCase()+`
`;for(let m=0;m<3;m++){const y=ae[m];if(r[m]){const w=u&&i&&i[m]!=null?` (${i[m]} moves)`:"",j=!u&&l&&l[m]?" (⭐ First try!)":"";h+=`${y}   🟩${w}${j}
`}else h+=`${y}   ⬜
`}return h+="Play at "+a,h}function he(t,n,o,r){const l=new URL(n,window.location.origin).href;let i=t.toUpperCase()+`
`;return o?i+=`🟩${r?" (⭐ First try!)":""}
`:i+=`⬜
`,i+="Play at "+l,i}function me(t,n,o){const r=new URL(n,window.location.origin).href,l=["Easy","Med","Hard"];let i=t.toUpperCase()+`
`;for(let a=0;a<3;a++){const u=o?.[a]??null;if(u!=null){const h=u===1?"★":String(Math.min(u,99));i+=`${l[a]}   🟩 ${h}
`}else i+=`${l[a]}   ⬜
`}return i+="Play at "+r,i}function fe({size:t=18}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const f=[{key:"allten",href:`${g}puzzlegames/allten/`,Icon:Q,title:"All Ten",desc:"Use the given numbers to make each target from 1 to 10."},{key:"scurry",href:`${g}puzzlegames/scurry/`,Icon:N,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${g}puzzlegames/clueless/`,Icon:J,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${g}puzzlegames/folds/`,Icon:A,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${g}puzzlegames/factorfall/`,Icon:X,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${g}puzzlegames/sumtiles/`,Icon:D,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${g}puzzlegames/productiles/`,Icon:V,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],xe=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),ge=2e3;function be(){const t=d.useMemo(()=>K(),[]),n=d.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,R(s.key,t)])),[t]),o=d.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,ee(s.key,t)])),[t]),r=d.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,te(s.key,t)])),[t]),l=d.useMemo(()=>B(t),[t]),i=d.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,P(s.key,t)])),[t]),a=d.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,ne(s.key,t)])),[t]),u=d.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,v(s.key,t)])),[t]),h=d.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,se(s.key,t)])),[t]),[m,y]=d.useState(0),w=d.useMemo(()=>Object.fromEntries(f.map(s=>[s.key,le(s.key,!!s.single)])),[t,m]),[j,I]=d.useState(null),[F,T]=d.useState(!1),[W,$]=d.useState(!1),b=d.useRef(null);C.useEffect(()=>()=>{b.current&&clearTimeout(b.current)},[]),C.useEffect(()=>{const s=()=>y(x=>x+1),c=()=>{document.visibilityState==="visible"&&s()},p=x=>{x.persisted&&s()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",p),window.addEventListener("storage",s),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",p),window.removeEventListener("storage",s)}},[]);const H=d.useCallback((s,c)=>{s.preventDefault(),s.stopPropagation();const p=f.find(S=>S.key===c);if(!p)return;const x=c==="clueless"?me(p.title,p.href,l):p.single?he(p.title,p.href,i[c],a[c]):ue(c,p.title,p.href,n[c],o[c],r[c]);navigator.clipboard.writeText(x).then(()=>{b.current&&clearTimeout(b.current),I(c),b.current=setTimeout(()=>{I(null),b.current=null},ge)})},[l,n,o,r,i,a]),_=d.useCallback((s,c)=>s==="clueless"?l.some(p=>p!=null):c?i[s]:n[s]?.some(Boolean),[l,n,i]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;900&display=swap');

                :root {
                    --bg: #ffffff;
                    --text: var(--puzzle-ink);
                    --muted: var(--puzzle-ink-muted);
                    --hairline: #e7e7e7;
                    --tile: #f4f4f4;
                    --tileHover: #eeeeee;
                    --shadow: 0 1px 0 rgba(24, 53, 94, 0.06);
                    --radius: 10px;
                }

                * { box-sizing: border-box; }

                /* Hub uses shared style.css for TopBar/modals; allow full width (games keep #root capped). */
                #root {
                    max-width: none;
                    width: 100%;
                }

                body {
                    margin: 0;
                    background: var(--bg);
                    color: var(--text);
                    font-family: 'Outfit', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                .hp-shell {
                    min-height: 100dvh;
                    display: flex;
                    flex-direction: column;
                }

                /* Same column as TopBar inner + .game-container (500px cap, 20px sides). */
                .hp-page {
                    flex: 1;
                    width: min(95vw, 500px);
                    max-width: min(95vw, 500px);
                    margin: 0 auto;
                    box-sizing: border-box;
                    padding: 18px 20px 48px;
                }

                .hp-intro {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    margin-bottom: 18px;
                }

                .hp-tagline {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 600;
                    line-height: 1.4;
                    color: var(--puzzle-ink-soft);
                    max-width: 52ch;
                }

                .hp-date {
                    font-size: 13px;
                    color: var(--puzzle-ink-muted);
                    letter-spacing: 0.02em;
                }

                .hp-divider {
                    height: 2px;
                    background: var(--puzzle-grid-line);
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
                    background: rgba(24, 53, 94, 0.06);
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
                    color: var(--puzzle-ink-soft);
                    max-width: 52ch;
                }

                @media (max-width: 420px) {
                    .hp-iconTile { width: 84px; height: 84px; }
                }

                a.hp-card:focus-visible {
                    outline: 3px solid rgba(24, 53, 94, 0.35);
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
                    background: var(--puzzle-ink);
                    color: var(--white);
                    border: none;
                    border-radius: 8px;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    cursor: pointer;
                    transition: background 140ms ease, filter 140ms ease;
                }
                .hp-shareBtn:hover { filter: brightness(0.92); }
                .hp-shareBtn:focus-visible {
                    outline: 3px solid rgba(24, 53, 94, 0.45);
                    outline-offset: 2px;
                }

                .toast-panel {
                    max-width: 420px;
                    background: rgba(24, 53, 94, 0.95);
                    color: var(--white);
                    padding: 14px 16px;
                    border-radius: 12px;
                    box-shadow: 0 10px 28px rgba(24, 53, 94, 0.25);
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
                .hp-modal-title { margin-bottom: 0.75rem; text-align: center; }
                .hp-modal-icons {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 1.5rem;
                    margin-bottom: 1.25rem;
                    flex-wrap: wrap;
                }
                .hp-modal-body { font-size: 1rem; line-height: 1.6; }
                .hp-modal-body p { margin: 0 0 1rem; }
                .hp-modal-body ul { margin: 0 0 1rem; padding-left: 1.25rem; }
                .hp-modal-body li { margin-bottom: 0.5rem; }
            `}),e.jsxs("div",{className:"hp-shell",children:[e.jsx("div",{style:{flexShrink:0,width:"100%"},children:e.jsx(G,{title:"PUZZLES",showHome:!1,showStats:!1,onCube:()=>$(!0),onHelp:()=>T(!0)})}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-intro",children:[e.jsx("p",{className:"hp-tagline",children:"Daily puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:xe})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:f.map(({key:s,href:c,Icon:p,title:x,desc:S,single:E})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:c,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(p,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:x}),e.jsx("div",{className:"hp-desc",children:S}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[s==="clueless"?e.jsx(pe,{attempts:l}):E?e.jsx(de,{completed:i[s],perfect:a[s],attempts:u[s],failed:h[s]}):e.jsx(ce,{gameKey:s,completions:n[s],perfects:o[s],moveCounts:r[s]}),w[s]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",w[s]]})]})]})]}),_(s,E)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[j===s&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:Z=>H(Z,s),"aria-label":"Share results",children:[e.jsx(fe,{size:18}),"SHARE"]})]})]},c))})]})]}),e.jsx(q,{show:W,onClose:()=>$(!1)}),F&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>T(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[e.jsx(N,{size:48}),e.jsx(A,{size:48}),e.jsx(D,{size:48})]}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsx("p",{children:"Each day has three puzzles of each type listed in order from easiest to hardest."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green"})," indicates completed puzzles. "]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate solves made without using undo or reset."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing at least one puzzle daily."]})]})]})})]})}Y.createRoot(document.getElementById("root")).render(e.jsx(be,{}));
