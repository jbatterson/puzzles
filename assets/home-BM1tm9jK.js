import{j as s,r as i,R as D}from"./client-Dgtgdm0G.js";import{T as Q,P as T,a as k,A as ee}from"./AllTenLinksModal-DDKa0xyZ.js";import{I as U}from"./BugIcon-cwKG8TAz.js";import{I as H}from"./FoldsIcon-va-WQhAw.js";import{I as te}from"./ProductilesIcon-FtQdYnKT.js";import{I as _}from"./SumTilesIcon-BOM5zfqs.js";import{I as se}from"./FactorfallIcon-CLt8wOpS.js";import{I as ne}from"./CluelessIcon-k1eu0Oh7.js";import{I as re}from"./HoneycombsIcon-BlhGjDfz.js";import{b as le,S as oe,d as ie,e as ae,a as ce,c as ue,D as R}from"./hubEntry-B9xT_5fj.js";function de({size:e=28,className:n=""}){return s.jsxs("svg",{width:e,height:e,viewBox:"0 0 150 150",className:n,xmlns:"http://www.w3.org/2000/svg",children:[s.jsxs("g",{children:[s.jsx("path",{fill:"#3588c5",d:"M115.97,111.58c-4.56,0-8.4-1.3-11.73-3.96-3.37-2.7-5.99-6.75-7.79-12.06-1.87-5.48-2.82-12.46-2.82-20.74s.95-15.26,2.82-20.74c1.79-5.28,4.4-9.26,7.76-11.85,3.33-2.57,7.13-3.82,11.59-3.82s8.54,1.27,11.81,3.88c3.32,2.65,5.94,6.68,7.79,11.99,1.92,5.5,2.9,12.47,2.9,20.71s-.98,15.07-2.9,20.64c-1.85,5.36-4.47,9.42-7.79,12.07-3.27,2.61-7.08,3.88-11.65,3.88Z"}),s.jsx("path",{d:"M115.8,40.92c4.09,0,7.44,1.09,10.26,3.33,2.95,2.35,5.3,6,6.99,10.86,1.83,5.24,2.76,11.93,2.76,19.88s-.93,14.52-2.77,19.83c-1.69,4.9-4.04,8.58-6.99,10.93-2.81,2.24-6.11,3.33-10.09,3.33s-7.3-1.12-10.16-3.41c-2.99-2.39-5.34-6.06-6.99-10.92-1.78-5.22-2.69-11.93-2.69-19.93s.9-14.71,2.69-19.94c1.63-4.8,3.96-8.39,6.91-10.67,2.88-2.22,6.18-3.3,10.07-3.3M115.8,35.92c-4.99,0-9.36,1.44-13.12,4.34-3.76,2.9-6.63,7.24-8.6,13.02-1.98,5.8-2.95,12.98-2.95,21.55s.98,15.75,2.95,21.55c1.97,5.78,4.83,10.19,8.6,13.2,3.76,3.01,8.19,4.51,13.29,4.51s9.5-1.47,13.2-4.42c3.7-2.95,6.57-7.35,8.6-13.2,2.02-5.85,3.04-13.01,3.04-21.46s-1.02-15.75-3.04-21.53c-2.02-5.8-4.89-10.16-8.6-13.12-3.7-2.95-8.17-4.42-13.37-4.42h0Z"})]}),s.jsxs("g",{children:[s.jsx("path",{fill:"#3588c5",d:"M36.05,135.73V33.09H11.69V14.27h81.73c-1.99.97-3.92,2.08-5.78,3.33-8.2,5.48-14.74,13.23-19.45,23.05-4.66,9.75-7.02,21.25-7.02,34.18s2.39,24.32,7.12,34.18c4.73,9.9,11.37,17.75,19.71,23.32,1.92,1.28,3.9,2.42,5.93,3.41h-57.88Z"}),s.jsx("path",{d:"M84.46,16.77c-7.74,5.63-13.96,13.29-18.53,22.8-4.82,10.09-7.26,21.95-7.26,35.25s2.48,25.06,7.36,35.25c4.61,9.64,10.96,17.42,18.89,23.15h-46.38V30.59H14.19v-13.82h70.27M115.97,11.77H9.19v23.82h24.36v102.64h82.59c-9.84,0-18.76-2.66-26.75-7.99-7.99-5.33-14.28-12.77-18.84-22.32-4.58-9.56-6.87-20.58-6.87-33.1s2.26-23.65,6.77-33.1c4.52-9.43,10.72-16.79,18.59-22.05,7.87-5.27,16.96-7.9,26.93-7.9h0Z"})]})]})}const pe=new Date(Date.parse("19 Sep 2022 00:00:00 PST")),he=864e5,O=3,me="✅",fe="⬜";function xe(e){return[...e].sort((n,r)=>(n.solveOrder?-1:0)+(r.solveOrder?1:0)||(n.solveOrder||0)-(r.solveOrder||0))}function ge(e){return Array.isArray(e)?xe(e).map(r=>r.solution?`${r.number}${me}`:`${r.number}${fe}`).join(" "):""}function F(e){const n=Math.floor((Number(e)-Number(pe))/he),r=String(n);return(r.length<O?"0".repeat(O-r.length):"")+r}function be(e,n){if(!Array.isArray(e)||e.length===0)return"";const r=F(n),l=e.filter(u=>u&&u.solution!=null).length,o=e.length,a=ge(e);return`All Ten #${r}
${l}/${o}
${a}`}const x="/puzzles/";function f(e){try{return localStorage.getItem(e)}catch{return null}}function ye(){const e=new Date,n=new Date(e.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function L(e){const n=new Date;n.setDate(n.getDate()-e);const r=new Date(n.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function B(e,n){return[0,1,2].map(r=>["1","2"].includes(f(`${e}:${n}:${r}`)))}function ve(e,n){return[0,1,2].map(r=>f(`${e}:${n}:${r}`)==="2")}function we(e,n){return[0,1,2].map(r=>{const l=f(`${e}:${n}:${r}:moves`);return l!=null?parseInt(l,10):null})}function $(e,n){if(e!=="clueless")return null;const r=f(`clueless:${n}:bestAttempts`);if(r==null)return null;const l=parseInt(r,10);return l>=1&&l<=99?l:null}function Se(e,n){return e!=="clueless"?!1:f(`clueless:${n}:failed`)==="1"}function Z(e,n){return e==="clueless"?$(e,n)!=null:["1","2"].includes(f(`${e}:${n}`))}function ze(e,n){return e==="clueless"?$(e,n)===1:f(`${e}:${n}`)==="2"}const je=["easy","medium","hard"];function Te(e,n){const r=f(`clueless:${e}:${n}:bestAttempts`);if(r!=null){const l=parseInt(r,10);if(l>=1&&l<=99)return l}if(n==="medium"){const l=$("clueless",e);if(l!=null)return l}return null}function W(e){return je.map(n=>Te(e,n))}function G(e){const n=e.split("-").map(Number);if(n.length!==3||n.some(Number.isNaN))return"";const[r,l,o]=n,a=Date.UTC(r,l-1,o,12,0,0),u=new Date(a).toLocaleString("en-US",{timeZone:"America/Los_Angeles"}).split(",")[0]?.trim()??"";return u?`${u}-targets`:""}function Y(e){const n=G(e);if(!n)return 0;try{const r=f(n);if(!r)return 0;const l=JSON.parse(r);return Array.isArray(l)?l.filter(o=>o!=null&&o.solution!=null).length:0}catch{return 0}}function ke(e){const n=G(e);if(!n)return null;try{const r=f(n);if(!r)return null;const l=JSON.parse(r);return Array.isArray(l)?l:null}catch{return null}}const $e=365;function P(e,n,r){return e==="allten"?Y(r)>0:e==="clueless"?W(r).some(l=>l!=null):n?Z(e,r):B(e,r).some(Boolean)}function Ie(e,n=!1){const l=P(e,n,L(0))?0:1;let o=0;for(let a=l;a<=$e;a++){const u=L(a);if(P(e,n,u))o++;else break}return o}const Ae=new Set(["sumtiles","productiles"]);function Ce({gameKey:e,completions:n,perfects:r,moveCounts:l}){const o=Ae.has(e),a=n??[!1,!1,!1],u=r??[!1,!1,!1],y=l??[null,null,null];return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(p=>{const g=a[p],I=u[p],z=y[p]!=null?y[p]:null,d=g?o?z!=null?String(Math.min(z,99)):"✓":I?"★":"✓":s.jsx(R,{count:p+1,size:20});return s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:g?"#22c55e":k,color:g?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:d},p)})})}function Ee({completed:e,perfect:n,attempts:r,failed:l}){const o=r!=null||l,a=o?r!=null:e,u=o&&r!=null,y=o&&l&&r==null,p=u?"#22c55e":y?"#374151":a?"#22c55e":k,g=o?r!=null?r===1?"★":String(Math.min(r,99)):l?"•":"1":e?n?"★":"✓":"1";return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:p,color:u||y||a?"#fff":T,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:g})})}function Ne({attempts:e}){return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const r=e?.[n]??null,l=r!=null,o=l?r===1?"★":String(Math.min(r,99)):s.jsx(R,{count:n+1,size:20});return s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:l?"#22c55e":k,color:l?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:o},n)})})}const m=[{key:"allten",href:`${x}puzzlegames/allten/`,Icon:de,title:"All Ten",desc:"Make each target from 1 to 10."},{key:"scurry",href:`${x}puzzlegames/scurry/`,Icon:U,title:"Scurry",desc:"Place bugs to fill every target square."},{key:"clueless",href:`${x}puzzlegames/clueless/`,Icon:ne,title:"Clueless",desc:"Complete six crossing words without clues.",single:!1},{key:"folds",href:`${x}puzzlegames/folds/`,Icon:H,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"honeycombs",href:`${x}puzzlegames/honeycombs/`,Icon:re,title:"Honeycombs",desc:"Fill each honeycomb to form a connected path."},{key:"sumtiles",href:`${x}puzzlegames/sumtiles/`,Icon:_,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${x}puzzlegames/productiles/`,Icon:te,title:"Productiles",desc:"Slide tiles so every row and column hits its product."},{key:"factorfall",href:`${x}puzzlegames/factorfall/`,Icon:se,title:"Factorfall",desc:"Drop factors to clear groups that multiply to the target."}],Me=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});function Ze(){const e=i.useMemo(()=>ye(),[]),n=i.useMemo(()=>Object.fromEntries(m.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,B(t.key,e)])),[e]),r=i.useMemo(()=>Object.fromEntries(m.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,ve(t.key,e)])),[e]),l=i.useMemo(()=>Object.fromEntries(m.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,we(t.key,e)])),[e]),o=i.useMemo(()=>W(e),[e]),a=i.useMemo(()=>Object.fromEntries(m.filter(t=>t.single).map(t=>[t.key,Z(t.key,e)])),[e]),u=i.useMemo(()=>Object.fromEntries(m.filter(t=>t.single).map(t=>[t.key,ze(t.key,e)])),[e]),y=i.useMemo(()=>Object.fromEntries(m.filter(t=>t.single).map(t=>[t.key,$(t.key,e)])),[e]),p=i.useMemo(()=>Object.fromEntries(m.filter(t=>t.single).map(t=>[t.key,Se(t.key,e)])),[e]),[g,I]=i.useState(0),z=i.useMemo(()=>Object.fromEntries(m.map(t=>[t.key,Ie(t.key,!!t.single)])),[e,g]),d=i.useMemo(()=>Y(e),[e,g]),[A,C]=i.useState(null),[V,E]=i.useState(!1),[J,N]=i.useState(!1),w=i.useRef(null);D.useEffect(()=>()=>{w.current&&clearTimeout(w.current)},[]),D.useEffect(()=>{const t=()=>I(b=>b+1),c=()=>{document.visibilityState==="visible"&&t()},v=b=>{b.persisted&&t()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",v),window.addEventListener("storage",t),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",v),window.removeEventListener("storage",t)}},[]);const X=i.useCallback((t,c)=>{if(t.preventDefault(),t.stopPropagation(),!m.find(h=>h.key===c))return;const b=c==="allten"?(()=>{const h=ke(e),S=new Date;return h&&h.length?be(h,S):`All Ten #${F(S)}
${d}/10
`})():le(c,e,x);navigator.clipboard.writeText(b).then(()=>{w.current&&clearTimeout(w.current),C({key:c,preview:b,fadeOut:!1}),w.current=setTimeout(()=>{C(h=>h?{...h,fadeOut:!0}:null),w.current=null},oe)})},[e,d]),q=i.useCallback((t,c)=>t==="allten"?d>0:t==="clueless"?o.some(v=>v!=null):c?a[t]:n[t]?.some(Boolean),[d,o,n,a]);return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
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
                    letter-spacing: 0.02em;
                    cursor: pointer;
                    transition: background 140ms ease, filter 140ms ease;
                }
                .hp-shareBtn:hover { background: var(--puzzle-ink-hover); }
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
            `}),s.jsxs("div",{className:"hp-shell",children:[s.jsx("div",{style:{flexShrink:0,width:"100%"},children:s.jsx(Q,{title:"PUZZLES",showHome:!1,showStats:!1,onCube:()=>N(!0),onHelp:()=>E(!0)})}),s.jsxs("main",{className:"hp-page",children:[s.jsxs("header",{className:"hp-intro",children:[s.jsx("p",{className:"hp-tagline",children:"Daily puzzles for the breakfast table, the car ride, or the classroom warm-up."}),s.jsx("div",{className:"hp-date",children:Me})]}),s.jsx("div",{className:"hp-divider"}),s.jsx("section",{className:"hp-list",children:m.map(({key:t,href:c,Icon:v,title:b,desc:h,single:S})=>{const K=t==="allten"||S?c:t==="clueless"?ie(c,o):ae(c,n[t]);return s.jsxs("div",{className:"hp-cardWrapper",children:[s.jsxs("a",{className:"hp-card",href:K,children:[s.jsx("div",{className:"hp-iconTile",children:s.jsx(v,{size:56})}),s.jsxs("div",{className:"hp-meta",children:[s.jsx("div",{className:"hp-cardTitle",children:b}),s.jsx("div",{className:"hp-desc",children:h}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[t==="allten"?d>0?s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:d>=10?"#22c55e":k,color:d>=10?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":`${d} of 10 targets solved`,children:d})}):null:t==="clueless"?s.jsx(Ne,{attempts:o}):S?s.jsx(Ee,{completed:a[t],perfect:u[t],attempts:y[t],failed:p[t]}):s.jsx(Ce,{gameKey:t,completions:n[t],perfects:r[t],moveCounts:l[t]}),z[t]>0&&s.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",z[t]]})]})]})]}),q(t,S)&&s.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[s.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:j=>X(j,t),"aria-label":"Share results",children:[s.jsx(ce,{size:18}),"Share"]}),A?.key===t&&s.jsx(ue,{preview:A.preview,fadeOut:A.fadeOut,align:"end",placement:"below",onTransitionEnd:j=>{j.target!==j.currentTarget||j.propertyName!=="opacity"||C(M=>M?.fadeOut?null:M)}})]})]},c)})})]})]}),s.jsx(ee,{show:J,onClose:()=>N(!1)}),V&&s.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:s.jsxs("div",{className:"hp-modal-content",children:[s.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>E(!1),"aria-label":"Close",children:"✕"}),s.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),s.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[s.jsx(U,{size:48}),s.jsx(H,{size:48}),s.jsx(_,{size:48})]}),s.jsxs("div",{className:"hp-modal-body",children:[s.jsx("p",{children:"Each day has puzzles of each type listed in order from easiest to hardest."}),s.jsxs("p",{children:[s.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Green"})," indicates completed puzzles. "]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate solves made without using undo or reset."]})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing at least one puzzle daily."]})]})]})})]})}export{Ze as default};
