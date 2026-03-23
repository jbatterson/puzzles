import{r as d,R as $,j as s,D as E,a as H}from"./DiceFace-DpNS2CYC.js";import{I as M}from"./BugIcon-3w92ZCY1.js";import{I as N}from"./FoldsIcon-Bgeumy9k.js";import{I as W}from"./ProductilesIcon-BFtW__0A.js";import{I as D}from"./SumTilesIcon-CAJho3Ih.js";import{I as _}from"./FactorfallIcon-CvePgXML.js";import{I as G}from"./CluelessIcon-DTm96GMa.js";const b="/puzzles/";function Y(){const t=new Date,n=new Date(t.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function T(t){const n=new Date;n.setDate(n.getDate()-t);const r=new Date(n.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function L(t,n){return[0,1,2].map(r=>["1","2"].includes(localStorage.getItem(`${t}:${n}:${r}`)))}function q(t,n){return[0,1,2].map(r=>localStorage.getItem(`${t}:${n}:${r}`)==="2")}function V(t,n){return[0,1,2].map(r=>{const o=localStorage.getItem(`${t}:${n}:${r}:moves`);return o!=null?parseInt(o,10):null})}function w(t,n){if(t!=="clueless")return null;const r=localStorage.getItem(`clueless:${n}:bestAttempts`);if(r==null)return null;const o=parseInt(r,10);return o>=1&&o<=99?o:null}function X(t,n){return t!=="clueless"?!1:localStorage.getItem(`clueless:${n}:failed`)==="1"}function R(t,n){return t==="clueless"?w(t,n)!=null:["1","2"].includes(localStorage.getItem(`${t}:${n}`))}function J(t,n){return t==="clueless"?w(t,n)===1:localStorage.getItem(`${t}:${n}`)==="2"}const Q=["easy","medium","hard"];function Z(t,n){const r=localStorage.getItem(`clueless:${t}:${n}:bestAttempts`);if(r!=null){const o=parseInt(r,10);if(o>=1&&o<=99)return o}if(n==="medium"){const o=w("clueless",t);if(o!=null)return o}return null}function A(t){return Q.map(n=>Z(t,n))}const K=365;function C(t,n,r){return t==="clueless"?A(r).some(o=>o!=null):n?R(t,r):L(t,r).some(Boolean)}function ee(t,n=!1){const o=C(t,n,T(0))?0:1;let l=0;for(let i=o;i<=K;i++){const a=T(i);if(C(t,n,a))l++;else break}return l}const U=new Set(["sumtiles","productiles"]),te=["Easy","Med","Hard"];function se({gameKey:t,completions:n,perfects:r,moveCounts:o}){const l=U.has(t);return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(i=>{const a=n[i],m=r&&r[i],u=o&&o[i]!=null?o[i]:null,h=a?l?u!=null?String(Math.min(u,99)):"✓":m?"★":"✓":s.jsx(E,{count:i+1,size:20});return s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:h},i)})})}function ne({completed:t,perfect:n,attempts:r,failed:o}){const l=r!=null||o,i=l?r!=null:t,a=l&&r!=null,m=l&&o&&r==null,u=a?"#22c55e":m?"#374151":i?"#22c55e":"#d1d5db",h=l?r!=null?r===1?"★":String(Math.min(r,99)):o?"•":"1":t?n?"★":"✓":"1";return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:u,color:"#fff",fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:h})})}function re({attempts:t}){return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const r=t?.[n]??null,o=r!=null,l=o?r===1?"★":String(Math.min(r,99)):s.jsx(E,{count:n+1,size:20});return s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:o?"#22c55e":"#d1d5db",color:"#fff",fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:l},n)})})}function oe(t,n,r,o,l,i){const a=new URL(r,window.location.origin).href,m=U.has(t);let u=n.toUpperCase()+`
`;for(let h=0;h<3;h++){const y=te[h];if(o[h]){const j=m&&i&&i[h]!=null?` (${i[h]} moves)`:"",v=!m&&l&&l[h]?" (⭐ First try!)":"";u+=`${y}   🟩${j}${v}
`}else u+=`${y}   ⬜
`}return u+="Play at "+a,u}function ie(t,n,r,o){const l=new URL(n,window.location.origin).href;let i=t.toUpperCase()+`
`;return r?i+=`🟩${o?" (⭐ First try!)":""}
`:i+=`⬜
`,i+="Play at "+l,i}function le(t,n,r){const o=new URL(n,window.location.origin).href,l=["Easy","Med","Hard"];let i=t.toUpperCase()+`
`;for(let a=0;a<3;a++){const m=r?.[a]??null;if(m!=null){const u=m===1?"★":String(Math.min(m,99));i+=`${l[a]}   🟩 ${u}
`}else i+=`${l[a]}   ⬜
`}return i+="Play at "+o,i}function ae({size:t=18}){return s.jsxs("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[s.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),s.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),s.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),s.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const f=[{key:"scurry",href:`${b}puzzlegames/scurry/`,Icon:M,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${b}puzzlegames/clueless/`,Icon:G,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${b}puzzlegames/folds/`,Icon:N,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${b}puzzlegames/factorfall/`,Icon:_,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${b}puzzlegames/sumtiles/`,Icon:D,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${b}puzzlegames/productiles/`,Icon:W,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],ce=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),de=2e3;function pe(){const t=d.useMemo(()=>Y(),[]),n=d.useMemo(()=>Object.fromEntries(f.filter(e=>!e.single&&e.key!=="clueless").map(e=>[e.key,L(e.key,t)])),[t]),r=d.useMemo(()=>Object.fromEntries(f.filter(e=>!e.single&&e.key!=="clueless").map(e=>[e.key,q(e.key,t)])),[t]),o=d.useMemo(()=>Object.fromEntries(f.filter(e=>!e.single&&e.key!=="clueless").map(e=>[e.key,V(e.key,t)])),[t]),l=d.useMemo(()=>A(t),[t]),i=d.useMemo(()=>Object.fromEntries(f.filter(e=>e.single).map(e=>[e.key,R(e.key,t)])),[t]),a=d.useMemo(()=>Object.fromEntries(f.filter(e=>e.single).map(e=>[e.key,J(e.key,t)])),[t]),m=d.useMemo(()=>Object.fromEntries(f.filter(e=>e.single).map(e=>[e.key,w(e.key,t)])),[t]),u=d.useMemo(()=>Object.fromEntries(f.filter(e=>e.single).map(e=>[e.key,X(e.key,t)])),[t]),[h,y]=d.useState(0),j=d.useMemo(()=>Object.fromEntries(f.map(e=>[e.key,ee(e.key,!!e.single)])),[t,h]),[v,z]=d.useState(null),[O,I]=d.useState(!1),g=d.useRef(null);$.useEffect(()=>()=>{g.current&&clearTimeout(g.current)},[]),$.useEffect(()=>{const e=()=>y(x=>x+1),c=()=>{document.visibilityState==="visible"&&e()},p=x=>{x.persisted&&e()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",p),window.addEventListener("storage",e),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",p),window.removeEventListener("storage",e)}},[]);const B=d.useCallback((e,c)=>{e.preventDefault(),e.stopPropagation();const p=f.find(S=>S.key===c);if(!p)return;const x=c==="clueless"?le(p.title,p.href,l):p.single?ie(p.title,p.href,i[c],a[c]):oe(c,p.title,p.href,n[c],r[c],o[c]);navigator.clipboard.writeText(x).then(()=>{g.current&&clearTimeout(g.current),z(c),g.current=setTimeout(()=>{z(null),g.current=null},de)})},[l,n,r,o,i,a]),P=d.useCallback((e,c)=>e==="clueless"?l.some(p=>p!=null):c?i[e]:n[e]?.some(Boolean),[l,n,i]);return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
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
            `}),s.jsxs("main",{className:"hp-page",children:[s.jsxs("header",{className:"hp-top",children:[s.jsxs("div",{className:"hp-top-inner",children:[s.jsx("h1",{className:"hp-h1",children:"Daily Puzzles"}),s.jsx("p",{className:"hp-tagline",children:"Math and logic puzzles for the breakfast table, the car ride, or the classroom warm-up."}),s.jsx("div",{className:"hp-date",children:ce})]}),s.jsx("button",{type:"button",className:"hp-helpBtn",onClick:()=>I(!0),"aria-label":"Open instructions",children:"?"})]}),s.jsx("div",{className:"hp-divider"}),s.jsx("section",{className:"hp-list",children:f.map(({key:e,href:c,Icon:p,title:x,desc:S,single:k})=>s.jsxs("div",{className:"hp-cardWrapper",children:[s.jsxs("a",{className:"hp-card",href:c,children:[s.jsx("div",{className:"hp-iconTile",children:s.jsx(p,{size:56})}),s.jsxs("div",{className:"hp-meta",children:[s.jsx("div",{className:"hp-cardTitle",children:x}),s.jsx("div",{className:"hp-desc",children:S}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[e==="clueless"?s.jsx(re,{attempts:l}):k?s.jsx(ne,{completed:i[e],perfect:a[e],attempts:m[e],failed:u[e]}):s.jsx(se,{gameKey:e,completions:n[e],perfects:r[e],moveCounts:o[e]}),j[e]>0&&s.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",j[e]]})]})]})]}),P(e,k)&&s.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[v===e&&s.jsx("div",{className:"toast-panel hp-shareToast",children:s.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),s.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:F=>B(F,e),"aria-label":"Share results",children:[s.jsx(ae,{size:18}),"SHARE"]})]})]},c))})]}),O&&s.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:s.jsxs("div",{className:"hp-modal-content",children:[s.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>I(!1),"aria-label":"Close",children:"✕"}),s.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),s.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[s.jsx(M,{size:48}),s.jsx(N,{size:48}),s.jsx(D,{size:48})]}),s.jsxs("div",{className:"hp-modal-body",children:[s.jsx("p",{children:"Each day has three puzzles of each type listed in order from easiest to hardest."}),s.jsxs("p",{children:[s.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Green"})," indicates completed puzzles. "]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate solves made without using undo or reset."]})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing at least one puzzle daily."]})]})]})})]})}H.createRoot(document.getElementById("root")).render(s.jsx(pe,{}));
