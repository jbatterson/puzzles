import{j as s,r as i,R as N}from"./client-Dgtgdm0G.js";import{T as q,P as j,a as T,A as Q}from"./AllTenLinksModal-Z86hOdbe.js";import{I as L}from"./BugIcon-cwKG8TAz.js";import{I as O}from"./FoldsIcon-CDXk1q-d.js";import{I as ee}from"./ProductilesIcon-nKY-epuf.js";import{I as P}from"./SumTilesIcon-DlAcN0f4.js";import{I as te}from"./FactorfallIcon-DtQhO2pY.js";import{I as se}from"./CluelessIcon-BLNzyv9l.js";import{I as ne}from"./HoneycombsIcon-CO444eRx.js";import{h as re,a as le,D as U}from"./hubEntry-BfeLQ3tk.js";import{b as oe,S as ie}from"./ShareIcon-DUPd1Smi.js";function ae({size:e=28,className:n=""}){return s.jsxs("svg",{width:e,height:e,viewBox:"0 0 150 150",className:n,xmlns:"http://www.w3.org/2000/svg",children:[s.jsxs("g",{children:[s.jsx("path",{fill:"#53b1d6",d:"M115.97,111.58c-4.56,0-8.4-1.3-11.73-3.96-3.37-2.7-5.99-6.75-7.79-12.06-1.87-5.48-2.82-12.46-2.82-20.74s.95-15.26,2.82-20.74c1.79-5.28,4.4-9.26,7.76-11.85,3.33-2.57,7.13-3.82,11.59-3.82s8.54,1.27,11.81,3.88c3.32,2.65,5.94,6.68,7.79,11.99,1.92,5.5,2.9,12.47,2.9,20.71s-.98,15.07-2.9,20.64c-1.85,5.36-4.47,9.42-7.79,12.07-3.27,2.61-7.08,3.88-11.65,3.88Z"}),s.jsx("path",{d:"M115.8,40.92c4.09,0,7.44,1.09,10.26,3.33,2.95,2.35,5.3,6,6.99,10.86,1.83,5.24,2.76,11.93,2.76,19.88s-.93,14.52-2.77,19.83c-1.69,4.9-4.04,8.58-6.99,10.93-2.81,2.24-6.11,3.33-10.09,3.33s-7.3-1.12-10.16-3.41c-2.99-2.39-5.34-6.06-6.99-10.92-1.78-5.22-2.69-11.93-2.69-19.93s.9-14.71,2.69-19.94c1.63-4.8,3.96-8.39,6.91-10.67,2.88-2.22,6.18-3.3,10.07-3.3M115.8,35.92c-4.99,0-9.36,1.44-13.12,4.34-3.76,2.9-6.63,7.24-8.6,13.02-1.98,5.8-2.95,12.98-2.95,21.55s.98,15.75,2.95,21.55c1.97,5.78,4.83,10.19,8.6,13.2,3.76,3.01,8.19,4.51,13.29,4.51s9.5-1.47,13.2-4.42c3.7-2.95,6.57-7.35,8.6-13.2,2.02-5.85,3.04-13.01,3.04-21.46s-1.02-15.75-3.04-21.53c-2.02-5.8-4.89-10.16-8.6-13.12-3.7-2.95-8.17-4.42-13.37-4.42h0Z"})]}),s.jsxs("g",{children:[s.jsx("path",{fill:"#53b1d6",d:"M36.05,135.73V33.09H11.69V14.27h81.73c-1.99.97-3.92,2.08-5.78,3.33-8.2,5.48-14.74,13.23-19.45,23.05-4.66,9.75-7.02,21.25-7.02,34.18s2.39,24.32,7.12,34.18c4.73,9.9,11.37,17.75,19.71,23.32,1.92,1.28,3.9,2.42,5.93,3.41h-57.88Z"}),s.jsx("path",{d:"M84.46,16.77c-7.74,5.63-13.96,13.29-18.53,22.8-4.82,10.09-7.26,21.95-7.26,35.25s2.48,25.06,7.36,35.25c4.61,9.64,10.96,17.42,18.89,23.15h-46.38V30.59H14.19v-13.82h70.27M115.97,11.77H9.19v23.82h24.36v102.64h82.59c-9.84,0-18.76-2.66-26.75-7.99-7.99-5.33-14.28-12.77-18.84-22.32-4.58-9.56-6.87-20.58-6.87-33.1s2.26-23.65,6.77-33.1c4.52-9.43,10.72-16.79,18.59-22.05,7.87-5.27,16.96-7.9,26.93-7.9h0Z"})]})]})}const ce=new Date(Date.parse("19 Sep 2022 00:00:00 PST")),ue=864e5,E=3,de="✅",pe="⬜";function he(e){return[...e].sort((n,r)=>(n.solveOrder?-1:0)+(r.solveOrder?1:0)||(n.solveOrder||0)-(r.solveOrder||0))}function me(e){return Array.isArray(e)?he(e).map(r=>r.solution?`${r.number}${de}`:`${r.number}${pe}`).join(" "):""}function H(e){const n=Math.floor((Number(e)-Number(ce))/ue),r=String(n);return(r.length<E?"0".repeat(E-r.length):"")+r}function fe(e,n){if(!Array.isArray(e)||e.length===0)return"";const r=H(n),l=e.filter(u=>u&&u.solution!=null).length,o=e.length,a=me(e);return`All Ten #${r}
${l}/${o}
${a}`}const f="/puzzles/";function m(e){try{return localStorage.getItem(e)}catch{return null}}function xe(){const e=new Date,n=new Date(e.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function D(e){const n=new Date;n.setDate(n.getDate()-e);const r=new Date(n.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function R(e,n){return[0,1,2].map(r=>["1","2"].includes(m(`${e}:${n}:${r}`)))}function ge(e,n){return[0,1,2].map(r=>m(`${e}:${n}:${r}`)==="2")}function be(e,n){return[0,1,2].map(r=>{const l=m(`${e}:${n}:${r}:moves`);return l!=null?parseInt(l,10):null})}function k(e,n){if(e!=="clueless")return null;const r=m(`clueless:${n}:bestAttempts`);if(r==null)return null;const l=parseInt(r,10);return l>=1&&l<=99?l:null}function ye(e,n){return e!=="clueless"?!1:m(`clueless:${n}:failed`)==="1"}function _(e,n){return e==="clueless"?k(e,n)!=null:["1","2"].includes(m(`${e}:${n}`))}function ve(e,n){return e==="clueless"?k(e,n)===1:m(`${e}:${n}`)==="2"}const we=["easy","medium","hard"];function Se(e,n){const r=m(`clueless:${e}:${n}:bestAttempts`);if(r!=null){const l=parseInt(r,10);if(l>=1&&l<=99)return l}if(n==="medium"){const l=k("clueless",e);if(l!=null)return l}return null}function F(e){return we.map(n=>Se(e,n))}function B(e){const n=e.split("-").map(Number);if(n.length!==3||n.some(Number.isNaN))return"";const[r,l,o]=n,a=Date.UTC(r,l-1,o,12,0,0),u=new Date(a).toLocaleString("en-US",{timeZone:"America/Los_Angeles"}).split(",")[0]?.trim()??"";return u?`${u}-targets`:""}function Z(e){const n=B(e);if(!n)return 0;try{const r=m(n);if(!r)return 0;const l=JSON.parse(r);return Array.isArray(l)?l.filter(o=>o!=null&&o.solution!=null).length:0}catch{return 0}}function ze(e){const n=B(e);if(!n)return null;try{const r=m(n);if(!r)return null;const l=JSON.parse(r);return Array.isArray(l)?l:null}catch{return null}}const je=365;function M(e,n,r){return e==="allten"?Z(r)>0:e==="clueless"?F(r).some(l=>l!=null):n?_(e,r):R(e,r).some(Boolean)}function Te(e,n=!1){const l=M(e,n,D(0))?0:1;let o=0;for(let a=l;a<=je;a++){const u=D(a);if(M(e,n,u))o++;else break}return o}const ke=new Set(["sumtiles","productiles"]);function Ie({gameKey:e,completions:n,perfects:r,moveCounts:l}){const o=ke.has(e),a=n??[!1,!1,!1],u=r??[!1,!1,!1],g=l??[null,null,null];return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(p=>{const x=a[p],I=u[p],z=g[p]!=null?g[p]:null,d=x?o?z!=null?String(Math.min(z,99)):"✓":I?"★":"✓":s.jsx(U,{count:p+1,size:20});return s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:x?"#22c55e":T,color:x?"#fff":j,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:d},p)})})}function $e({completed:e,perfect:n,attempts:r,failed:l}){const o=r!=null||l,a=o?r!=null:e,u=o&&r!=null,g=o&&l&&r==null,p=u?"#22c55e":g?"#374151":a?"#22c55e":T,x=o?r!=null?r===1?"★":String(Math.min(r,99)):l?"•":"1":e?n?"★":"✓":"1";return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:p,color:u||g||a?"#fff":j,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:x})})}function Ae({attempts:e}){return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const r=e?.[n]??null,l=r!=null,o=l?r===1?"★":String(Math.min(r,99)):s.jsx(U,{count:n+1,size:20});return s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:l?"#22c55e":T,color:l?"#fff":j,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:o},n)})})}const h=[{key:"allten",href:`${f}puzzlegames/allten/`,Icon:ae,title:"All Ten",desc:"Use the given numbers to make each target from 1 to 10."},{key:"scurry",href:`${f}puzzlegames/scurry/`,Icon:L,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${f}puzzlegames/clueless/`,Icon:se,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${f}puzzlegames/folds/`,Icon:O,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"honeycombs",href:`${f}puzzlegames/honeycombs/`,Icon:ne,title:"Honeycombs",desc:"Fill each honeycomb with a single 1-to-N connected path."},{key:"sumtiles",href:`${f}puzzlegames/sumtiles/`,Icon:P,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${f}puzzlegames/productiles/`,Icon:ee,title:"Productiles",desc:"Slide tiles so every row and column hits its product."},{key:"factorfall",href:`${f}puzzlegames/factorfall/`,Icon:te,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."}],Ce=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),Ne=2e3;function Be(){const e=i.useMemo(()=>xe(),[]),n=i.useMemo(()=>Object.fromEntries(h.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,R(t.key,e)])),[e]),r=i.useMemo(()=>Object.fromEntries(h.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,ge(t.key,e)])),[e]),l=i.useMemo(()=>Object.fromEntries(h.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,be(t.key,e)])),[e]),o=i.useMemo(()=>F(e),[e]),a=i.useMemo(()=>Object.fromEntries(h.filter(t=>t.single).map(t=>[t.key,_(t.key,e)])),[e]),u=i.useMemo(()=>Object.fromEntries(h.filter(t=>t.single).map(t=>[t.key,ve(t.key,e)])),[e]),g=i.useMemo(()=>Object.fromEntries(h.filter(t=>t.single).map(t=>[t.key,k(t.key,e)])),[e]),p=i.useMemo(()=>Object.fromEntries(h.filter(t=>t.single).map(t=>[t.key,ye(t.key,e)])),[e]),[x,I]=i.useState(0),z=i.useMemo(()=>Object.fromEntries(h.map(t=>[t.key,Te(t.key,!!t.single)])),[e,x]),d=i.useMemo(()=>Z(e),[e,x]),[W,$]=i.useState(null),[G,A]=i.useState(!1),[Y,C]=i.useState(!1),w=i.useRef(null);N.useEffect(()=>()=>{w.current&&clearTimeout(w.current)},[]),N.useEffect(()=>{const t=()=>I(y=>y+1),c=()=>{document.visibilityState==="visible"&&t()},b=y=>{y.persisted&&t()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",b),window.addEventListener("storage",t),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",b),window.removeEventListener("storage",t)}},[]);const V=i.useCallback((t,c)=>{if(t.preventDefault(),t.stopPropagation(),!h.find(v=>v.key===c))return;const y=c==="allten"?(()=>{const v=ze(e),S=new Date;return v&&v.length?fe(v,S):`All Ten #${H(S)}
${d}/10
`})():oe(c,e,f);navigator.clipboard.writeText(y).then(()=>{w.current&&clearTimeout(w.current),$(c),w.current=setTimeout(()=>{$(null),w.current=null},Ne)})},[e,d]),J=i.useCallback((t,c)=>t==="allten"?d>0:t==="clueless"?o.some(b=>b!=null):c?a[t]:n[t]?.some(Boolean),[d,o,n,a]);return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
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
            `}),s.jsxs("div",{className:"hp-shell",children:[s.jsx("div",{style:{flexShrink:0,width:"100%"},children:s.jsx(q,{title:"PUZZLES",showHome:!1,showStats:!1,onCube:()=>C(!0),onHelp:()=>A(!0)})}),s.jsxs("main",{className:"hp-page",children:[s.jsxs("header",{className:"hp-intro",children:[s.jsx("p",{className:"hp-tagline",children:"Daily puzzles for the breakfast table, the car ride, or the classroom warm-up."}),s.jsx("div",{className:"hp-date",children:Ce})]}),s.jsx("div",{className:"hp-divider"}),s.jsx("section",{className:"hp-list",children:h.map(({key:t,href:c,Icon:b,title:y,desc:v,single:S})=>{const K=t==="allten"||S?c:t==="clueless"?re(c,o):le(c,n[t]);return s.jsxs("div",{className:"hp-cardWrapper",children:[s.jsxs("a",{className:"hp-card",href:K,children:[s.jsx("div",{className:"hp-iconTile",children:s.jsx(b,{size:56})}),s.jsxs("div",{className:"hp-meta",children:[s.jsx("div",{className:"hp-cardTitle",children:y}),s.jsx("div",{className:"hp-desc",children:v}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[t==="allten"?d>0?s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:d>=10?"#22c55e":T,color:d>=10?"#fff":j,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":`${d} of 10 targets solved`,children:d})}):null:t==="clueless"?s.jsx(Ae,{attempts:o}):S?s.jsx($e,{completed:a[t],perfect:u[t],attempts:g[t],failed:p[t]}):s.jsx(Ie,{gameKey:t,completions:n[t],perfects:r[t],moveCounts:l[t]}),z[t]>0&&s.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",z[t]]})]})]})]}),J(t,S)&&s.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[W===t&&s.jsx("div",{className:"toast-panel hp-shareToast",children:s.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),s.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:X=>V(X,t),"aria-label":"Share results",children:[s.jsx(ie,{size:18}),"SHARE"]})]})]},c)})})]})]}),s.jsx(Q,{show:Y,onClose:()=>C(!1)}),G&&s.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:s.jsxs("div",{className:"hp-modal-content",children:[s.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>A(!1),"aria-label":"Close",children:"✕"}),s.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),s.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[s.jsx(L,{size:48}),s.jsx(O,{size:48}),s.jsx(P,{size:48})]}),s.jsxs("div",{className:"hp-modal-body",children:[s.jsx("p",{children:"Each day has puzzles of each type listed in order from easiest to hardest."}),s.jsxs("p",{children:[s.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Green"})," indicates completed puzzles. "]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate solves made without using undo or reset."]})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing at least one puzzle daily."]})]})]})})]})}export{Be as default};
