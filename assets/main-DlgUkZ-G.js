import{j as e,r as d,R as E,P as z,a as k,b as H}from"./chromeUi-CgAW9FL5.js";import{I as N}from"./BugIcon-CdWGlr5h.js";import{I as L}from"./FoldsIcon-D1CBDEEp.js";import{I as G}from"./ProductilesIcon-CQTiTd-4.js";import{I as U}from"./SumTilesIcon-D1nXENUD.js";import{I as Y}from"./FactorfallIcon-CO2jlc4h.js";import{I as Z}from"./CluelessIcon-B4XJrFN5.js";import{D}from"./DiceFace-BzqXqqdf.js";function q({size:t=56}){const n=t;return e.jsxs("svg",{width:n,height:n,viewBox:"0 0 64 64",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[e.jsx("rect",{x:"6",y:"6",width:"52",height:"52",rx:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{d:"M26 22v24",stroke:"currentColor",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("path",{d:"M20 28l6-6",stroke:"currentColor",strokeWidth:"6",strokeLinecap:"round"}),e.jsx("path",{d:"M44 22c-6 0-10 6-10 12s4 12 10 12 10-6 10-12-4-12-10-12Z",stroke:"currentColor",strokeWidth:"6"})]})}const g="/puzzles/";function V(){const t=new Date,n=new Date(t.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function C(t){const n=new Date;n.setDate(n.getDate()-t);const r=new Date(n.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function A(t,n){return[0,1,2].map(r=>["1","2"].includes(localStorage.getItem(`${t}:${n}:${r}`)))}function X(t,n){return[0,1,2].map(r=>localStorage.getItem(`${t}:${n}:${r}`)==="2")}function J(t,n){return[0,1,2].map(r=>{const o=localStorage.getItem(`${t}:${n}:${r}:moves`);return o!=null?parseInt(o,10):null})}function j(t,n){if(t!=="clueless")return null;const r=localStorage.getItem(`clueless:${n}:bestAttempts`);if(r==null)return null;const o=parseInt(r,10);return o>=1&&o<=99?o:null}function Q(t,n){return t!=="clueless"?!1:localStorage.getItem(`clueless:${n}:failed`)==="1"}function R(t,n){return t==="clueless"?j(t,n)!=null:["1","2"].includes(localStorage.getItem(`${t}:${n}`))}function K(t,n){return t==="clueless"?j(t,n)===1:localStorage.getItem(`${t}:${n}`)==="2"}const ee=["easy","medium","hard"];function te(t,n){const r=localStorage.getItem(`clueless:${t}:${n}:bestAttempts`);if(r!=null){const o=parseInt(r,10);if(o>=1&&o<=99)return o}if(n==="medium"){const o=j("clueless",t);if(o!=null)return o}return null}function P(t){return ee.map(n=>te(t,n))}const se=365;function M(t,n,r){return t==="clueless"?P(r).some(o=>o!=null):n?R(t,r):A(t,r).some(Boolean)}function ne(t,n=!1){const o=M(t,n,C(0))?0:1;let l=0;for(let i=o;i<=se;i++){const a=C(i);if(M(t,n,a))l++;else break}return l}const O=new Set(["sumtiles","productiles"]),re=["Easy","Med","Hard"];function oe({gameKey:t,completions:n,perfects:r,moveCounts:o}){const l=O.has(t);return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(i=>{const a=n[i],u=r&&r[i],h=o&&o[i]!=null?o[i]:null,m=a?l?h!=null?String(Math.min(h,99)):"✓":u?"★":"✓":e.jsx(D,{count:i+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a?"#22c55e":k,color:a?"#fff":z,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:m},i)})})}function ie({completed:t,perfect:n,attempts:r,failed:o}){const l=r!=null||o,i=l?r!=null:t,a=l&&r!=null,u=l&&o&&r==null,h=a?"#22c55e":u?"#374151":i?"#22c55e":k,m=l?r!=null?r===1?"★":String(Math.min(r,99)):o?"•":"1":t?n?"★":"✓":"1";return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:h,color:a||u||i?"#fff":z,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:m})})}function le({attempts:t}){return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const r=t?.[n]??null,o=r!=null,l=o?r===1?"★":String(Math.min(r,99)):e.jsx(D,{count:n+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:o?"#22c55e":k,color:o?"#fff":z,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:l},n)})})}function ae(t,n,r,o,l,i){const a=new URL(r,window.location.origin).href,u=O.has(t);let h=n.toUpperCase()+`
`;for(let m=0;m<3;m++){const y=re[m];if(o[m]){const w=u&&i&&i[m]!=null?` (${i[m]} moves)`:"",v=!u&&l&&l[m]?" (⭐ First try!)":"";h+=`${y}   🟩${w}${v}
`}else h+=`${y}   ⬜
`}return h+="Play at "+a,h}function ce(t,n,r,o){const l=new URL(n,window.location.origin).href;let i=t.toUpperCase()+`
`;return r?i+=`🟩${o?" (⭐ First try!)":""}
`:i+=`⬜
`,i+="Play at "+l,i}function de(t,n,r){const o=new URL(n,window.location.origin).href,l=["Easy","Med","Hard"];let i=t.toUpperCase()+`
`;for(let a=0;a<3;a++){const u=r?.[a]??null;if(u!=null){const h=u===1?"★":String(Math.min(u,99));i+=`${l[a]}   🟩 ${h}
`}else i+=`${l[a]}   ⬜
`}return i+="Play at "+o,i}function pe({size:t=18}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[e.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),e.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),e.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const f=[{key:"allten",href:`${g}puzzlegames/allten/`,Icon:q,title:"All Ten",desc:"Use the given numbers to make each target from 1 to 10."},{key:"scurry",href:`${g}puzzlegames/scurry/`,Icon:N,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${g}puzzlegames/clueless/`,Icon:Z,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${g}puzzlegames/folds/`,Icon:L,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${g}puzzlegames/factorfall/`,Icon:Y,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${g}puzzlegames/sumtiles/`,Icon:U,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${g}puzzlegames/productiles/`,Icon:G,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],ue=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),he=2e3;function me(){const t=d.useMemo(()=>V(),[]),n=d.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,A(s.key,t)])),[t]),r=d.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,X(s.key,t)])),[t]),o=d.useMemo(()=>Object.fromEntries(f.filter(s=>!s.single&&s.key!=="clueless").map(s=>[s.key,J(s.key,t)])),[t]),l=d.useMemo(()=>P(t),[t]),i=d.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,R(s.key,t)])),[t]),a=d.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,K(s.key,t)])),[t]),u=d.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,j(s.key,t)])),[t]),h=d.useMemo(()=>Object.fromEntries(f.filter(s=>s.single).map(s=>[s.key,Q(s.key,t)])),[t]),[m,y]=d.useState(0),w=d.useMemo(()=>Object.fromEntries(f.map(s=>[s.key,ne(s.key,!!s.single)])),[t,m]),[v,I]=d.useState(null),[B,T]=d.useState(!1),b=d.useRef(null);E.useEffect(()=>()=>{b.current&&clearTimeout(b.current)},[]),E.useEffect(()=>{const s=()=>y(x=>x+1),c=()=>{document.visibilityState==="visible"&&s()},p=x=>{x.persisted&&s()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",p),window.addEventListener("storage",s),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",p),window.removeEventListener("storage",s)}},[]);const F=d.useCallback((s,c)=>{s.preventDefault(),s.stopPropagation();const p=f.find(S=>S.key===c);if(!p)return;const x=c==="clueless"?de(p.title,p.href,l):p.single?ce(p.title,p.href,i[c],a[c]):ae(c,p.title,p.href,n[c],r[c],o[c]);navigator.clipboard.writeText(x).then(()=>{b.current&&clearTimeout(b.current),I(c),b.current=setTimeout(()=>{I(null),b.current=null},he)})},[l,n,r,o,i,a]),W=d.useCallback((s,c)=>s==="clueless"?l.some(p=>p!=null):c?i[s]:n[s]?.some(Boolean),[l,n,i]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
            `}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-top",children:[e.jsxs("div",{className:"hp-top-inner",children:[e.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),e.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:ue})]}),e.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>T(!0),"aria-label":"Open instructions",children:"?"})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("section",{className:"hp-list",children:f.map(({key:s,href:c,Icon:p,title:x,desc:S,single:$})=>e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:c,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(p,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:x}),e.jsx("div",{className:"hp-desc",children:S}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[s==="clueless"?e.jsx(le,{attempts:l}):$?e.jsx(ie,{completed:i[s],perfect:a[s],attempts:u[s],failed:h[s]}):e.jsx(oe,{gameKey:s,completions:n[s],perfects:r[s],moveCounts:o[s]}),w[s]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",w[s]]})]})]})]}),W(s,$)&&e.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[v===s&&e.jsx("div",{className:"toast-panel hp-shareToast",children:e.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),e.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:_=>F(_,s),"aria-label":"Share results",children:[e.jsx(pe,{size:18}),"SHARE"]})]})]},c))})]}),B&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>T(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[e.jsx(N,{size:48}),e.jsx(L,{size:48}),e.jsx(U,{size:48})]}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsx("p",{children:"Each day has three puzzles of each type listed in order from easiest to hardest."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green"})," indicates completed puzzles. "]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate solves made without using undo or reset."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing at least one puzzle daily."]})]})]})})]})}H.createRoot(document.getElementById("root")).render(e.jsx(me,{}));
