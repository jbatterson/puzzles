import{j as s,r as u,R as E}from"./client-Dgtgdm0G.js";import{T as Q,P as T,a as $,A as ee}from"./AllTenLinksModal-Cbp-srmj.js";import{I as L}from"./BugIcon-cwKG8TAz.js";import{I as U}from"./FoldsIcon-CDXk1q-d.js";import{I as te}from"./ProductilesIcon-nKY-epuf.js";import{I as O}from"./SumTilesIcon-DlAcN0f4.js";import{I as se}from"./FactorfallIcon-DtQhO2pY.js";import{I as ne}from"./CluelessIcon-Bxtft9fy.js";import{h as re,a as le,D as P}from"./hubEntry-BfeLQ3tk.js";function oe({size:e=28,className:n=""}){return s.jsxs("svg",{width:e,height:e,viewBox:"0 0 150 150",className:n,xmlns:"http://www.w3.org/2000/svg",children:[s.jsxs("g",{children:[s.jsx("path",{fill:"#53b1d6",d:"M115.97,111.58c-4.56,0-8.4-1.3-11.73-3.96-3.37-2.7-5.99-6.75-7.79-12.06-1.87-5.48-2.82-12.46-2.82-20.74s.95-15.26,2.82-20.74c1.79-5.28,4.4-9.26,7.76-11.85,3.33-2.57,7.13-3.82,11.59-3.82s8.54,1.27,11.81,3.88c3.32,2.65,5.94,6.68,7.79,11.99,1.92,5.5,2.9,12.47,2.9,20.71s-.98,15.07-2.9,20.64c-1.85,5.36-4.47,9.42-7.79,12.07-3.27,2.61-7.08,3.88-11.65,3.88Z"}),s.jsx("path",{d:"M115.8,40.92c4.09,0,7.44,1.09,10.26,3.33,2.95,2.35,5.3,6,6.99,10.86,1.83,5.24,2.76,11.93,2.76,19.88s-.93,14.52-2.77,19.83c-1.69,4.9-4.04,8.58-6.99,10.93-2.81,2.24-6.11,3.33-10.09,3.33s-7.3-1.12-10.16-3.41c-2.99-2.39-5.34-6.06-6.99-10.92-1.78-5.22-2.69-11.93-2.69-19.93s.9-14.71,2.69-19.94c1.63-4.8,3.96-8.39,6.91-10.67,2.88-2.22,6.18-3.3,10.07-3.3M115.8,35.92c-4.99,0-9.36,1.44-13.12,4.34-3.76,2.9-6.63,7.24-8.6,13.02-1.98,5.8-2.95,12.98-2.95,21.55s.98,15.75,2.95,21.55c1.97,5.78,4.83,10.19,8.6,13.2,3.76,3.01,8.19,4.51,13.29,4.51s9.5-1.47,13.2-4.42c3.7-2.95,6.57-7.35,8.6-13.2,2.02-5.85,3.04-13.01,3.04-21.46s-1.02-15.75-3.04-21.53c-2.02-5.8-4.89-10.16-8.6-13.12-3.7-2.95-8.17-4.42-13.37-4.42h0Z"})]}),s.jsxs("g",{children:[s.jsx("path",{fill:"#53b1d6",d:"M36.05,135.73V33.09H11.69V14.27h81.73c-1.99.97-3.92,2.08-5.78,3.33-8.2,5.48-14.74,13.23-19.45,23.05-4.66,9.75-7.02,21.25-7.02,34.18s2.39,24.32,7.12,34.18c4.73,9.9,11.37,17.75,19.71,23.32,1.92,1.28,3.9,2.42,5.93,3.41h-57.88Z"}),s.jsx("path",{d:"M84.46,16.77c-7.74,5.63-13.96,13.29-18.53,22.8-4.82,10.09-7.26,21.95-7.26,35.25s2.48,25.06,7.36,35.25c4.61,9.64,10.96,17.42,18.89,23.15h-46.38V30.59H14.19v-13.82h70.27M115.97,11.77H9.19v23.82h24.36v102.64h82.59c-9.84,0-18.76-2.66-26.75-7.99-7.99-5.33-14.28-12.77-18.84-22.32-4.58-9.56-6.87-20.58-6.87-33.1s2.26-23.65,6.77-33.1c4.52-9.43,10.72-16.79,18.59-22.05,7.87-5.27,16.96-7.9,26.93-7.9h0Z"})]})]})}const ie=new Date(Date.parse("19 Sep 2022 00:00:00 PST")),ae=864e5,N=3,ce="✅",ue="⬜";function de(e){return[...e].sort((n,r)=>(n.solveOrder?-1:0)+(r.solveOrder?1:0)||(n.solveOrder||0)-(r.solveOrder||0))}function pe(e){return Array.isArray(e)?de(e).map(r=>r.solution?`${r.number}${ce}`:`${r.number}${ue}`).join(" "):""}function R(e){const n=Math.floor((Number(e)-Number(ie))/ae),r=String(n);return(r.length<N?"0".repeat(N-r.length):"")+r}function he(e,n){if(!Array.isArray(e)||e.length===0)return"";const r=R(n),l=e.filter(a=>a&&a.solution!=null).length,o=e.length,i=pe(e);return`All Ten #${r}
${l}/${o}
${i}`}const w="/puzzles/";function g(e){try{return localStorage.getItem(e)}catch{return null}}function me(){const e=new Date,n=new Date(e.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function M(e){const n=new Date;n.setDate(n.getDate()-e);const r=new Date(n.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function H(e,n){return[0,1,2].map(r=>["1","2"].includes(g(`${e}:${n}:${r}`)))}function fe(e,n){return[0,1,2].map(r=>g(`${e}:${n}:${r}`)==="2")}function xe(e,n){return[0,1,2].map(r=>{const l=g(`${e}:${n}:${r}:moves`);return l!=null?parseInt(l,10):null})}function k(e,n){if(e!=="clueless")return null;const r=g(`clueless:${n}:bestAttempts`);if(r==null)return null;const l=parseInt(r,10);return l>=1&&l<=99?l:null}function ge(e,n){return e!=="clueless"?!1:g(`clueless:${n}:failed`)==="1"}function F(e,n){return e==="clueless"?k(e,n)!=null:["1","2"].includes(g(`${e}:${n}`))}function be(e,n){return e==="clueless"?k(e,n)===1:g(`${e}:${n}`)==="2"}const ye=["easy","medium","hard"];function ve(e,n){const r=g(`clueless:${e}:${n}:bestAttempts`);if(r!=null){const l=parseInt(r,10);if(l>=1&&l<=99)return l}if(n==="medium"){const l=k("clueless",e);if(l!=null)return l}return null}function _(e){return ye.map(n=>ve(e,n))}function B(e){const n=e.split("-").map(Number);if(n.length!==3||n.some(Number.isNaN))return"";const[r,l,o]=n,i=Date.UTC(r,l-1,o,12,0,0),a=new Date(i).toLocaleString("en-US",{timeZone:"America/Los_Angeles"}).split(",")[0]?.trim()??"";return a?`${a}-targets`:""}function Z(e){const n=B(e);if(!n)return 0;try{const r=g(n);if(!r)return 0;const l=JSON.parse(r);return Array.isArray(l)?l.filter(o=>o!=null&&o.solution!=null).length:0}catch{return 0}}function we(e){const n=B(e);if(!n)return null;try{const r=g(n);if(!r)return null;const l=JSON.parse(r);return Array.isArray(l)?l:null}catch{return null}}const Se=365;function D(e,n,r){return e==="allten"?Z(r)>0:e==="clueless"?_(r).some(l=>l!=null):n?F(e,r):H(e,r).some(Boolean)}function je(e,n=!1){const l=D(e,n,M(0))?0:1;let o=0;for(let i=l;i<=Se;i++){const a=M(i);if(D(e,n,a))o++;else break}return o}const W=new Set(["sumtiles","productiles"]),ze=["Easy","Med","Hard"];function Te({gameKey:e,completions:n,perfects:r,moveCounts:l}){const o=W.has(e),i=n??[!1,!1,!1],a=r??[!1,!1,!1],m=l??[null,null,null];return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(d=>{const p=i[d],S=a[d],b=m[d]!=null?m[d]:null,f=p?o?b!=null?String(Math.min(b,99)):"✓":S?"★":"✓":s.jsx(P,{count:d+1,size:20});return s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:p?"#22c55e":$,color:p?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:f},d)})})}function $e({completed:e,perfect:n,attempts:r,failed:l}){const o=r!=null||l,i=o?r!=null:e,a=o&&r!=null,m=o&&l&&r==null,d=a?"#22c55e":m?"#374151":i?"#22c55e":$,p=o?r!=null?r===1?"★":String(Math.min(r,99)):l?"•":"1":e?n?"★":"✓":"1";return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:d,color:a||m||i?"#fff":T,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:p})})}function ke({attempts:e}){return s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const r=e?.[n]??null,l=r!=null,o=l?r===1?"★":String(Math.min(r,99)):s.jsx(P,{count:n+1,size:20});return s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:l?"#22c55e":$,color:l?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:o},n)})})}function Ie(e,n,r,l,o,i){const a=new URL(r,window.location.origin).href,m=W.has(e);let d=n.toUpperCase()+`
`;for(let p=0;p<3;p++){const S=ze[p];if(l[p]){const b=m&&i&&i[p]!=null?` (${i[p]} moves)`:"",f=!m&&o&&o[p]?" (⭐ First try!)":"";d+=`${S}   🟩${b}${f}
`}else d+=`${S}   ⬜
`}return d+=a,d}function Ce(e,n,r,l){const o=new URL(n,window.location.origin).href;let i=e.toUpperCase()+`
`;return r?i+=`🟩${l?" (⭐ First try!)":""}
`:i+=`⬜
`,i+=o,i}function Ae(e,n,r){const l=new URL(n,window.location.origin).href,o=["Easy","Med","Hard"];let i=e.toUpperCase()+`
`;for(let a=0;a<3;a++){const m=r?.[a]??null;if(m!=null){const d=m===1?"★":String(Math.min(m,99));i+=`${o[a]}   🟩 ${d}
`}else i+=`${o[a]}   ⬜
`}return i+=l,i}function Ee({size:e=18}){return s.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[s.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),s.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),s.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),s.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const x=[{key:"allten",href:`${w}puzzlegames/allten/`,Icon:oe,title:"All Ten",desc:"Use the given numbers to make each target from 1 to 10."},{key:"scurry",href:`${w}puzzlegames/scurry/`,Icon:L,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${w}puzzlegames/clueless/`,Icon:ne,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${w}puzzlegames/folds/`,Icon:U,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${w}puzzlegames/factorfall/`,Icon:se,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${w}puzzlegames/sumtiles/`,Icon:O,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${w}puzzlegames/productiles/`,Icon:te,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],Ne=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),Me=2e3;function Be(){const e=u.useMemo(()=>me(),[]),n=u.useMemo(()=>Object.fromEntries(x.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,H(t.key,e)])),[e]),r=u.useMemo(()=>Object.fromEntries(x.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,fe(t.key,e)])),[e]),l=u.useMemo(()=>Object.fromEntries(x.filter(t=>!t.single&&t.key!=="clueless"&&t.key!=="allten").map(t=>[t.key,xe(t.key,e)])),[e]),o=u.useMemo(()=>_(e),[e]),i=u.useMemo(()=>Object.fromEntries(x.filter(t=>t.single).map(t=>[t.key,F(t.key,e)])),[e]),a=u.useMemo(()=>Object.fromEntries(x.filter(t=>t.single).map(t=>[t.key,be(t.key,e)])),[e]),m=u.useMemo(()=>Object.fromEntries(x.filter(t=>t.single).map(t=>[t.key,k(t.key,e)])),[e]),d=u.useMemo(()=>Object.fromEntries(x.filter(t=>t.single).map(t=>[t.key,ge(t.key,e)])),[e]),[p,S]=u.useState(0),b=u.useMemo(()=>Object.fromEntries(x.map(t=>[t.key,je(t.key,!!t.single)])),[e,p]),f=u.useMemo(()=>Z(e),[e,p]),[G,I]=u.useState(null),[Y,C]=u.useState(!1),[V,A]=u.useState(!1),j=u.useRef(null);E.useEffect(()=>()=>{j.current&&clearTimeout(j.current)},[]),E.useEffect(()=>{const t=()=>S(y=>y+1),c=()=>{document.visibilityState==="visible"&&t()},h=y=>{y.persisted&&t()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",h),window.addEventListener("storage",t),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",h),window.removeEventListener("storage",t)}},[]);const J=u.useCallback((t,c)=>{t.preventDefault(),t.stopPropagation();const h=x.find(v=>v.key===c);if(!h)return;const y=c==="allten"?(()=>{const v=we(e),z=new Date;return v&&v.length?he(v,z):`All Ten #${R(z)}
${f}/10
`})():c==="clueless"?Ae(h.title,h.href,o):h.single?Ce(h.title,h.href,i[c],a[c]):Ie(c,h.title,h.href,n[c],r[c],l[c]);navigator.clipboard.writeText(y).then(()=>{j.current&&clearTimeout(j.current),I(c),j.current=setTimeout(()=>{I(null),j.current=null},Me)})},[e,f,o,n,r,l,i,a]),K=u.useCallback((t,c)=>t==="allten"?f>0:t==="clueless"?o.some(h=>h!=null):c?i[t]:n[t]?.some(Boolean),[f,o,n,i]);return s.jsxs(s.Fragment,{children:[s.jsx("style",{children:`
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
            `}),s.jsxs("div",{className:"hp-shell",children:[s.jsx("div",{style:{flexShrink:0,width:"100%"},children:s.jsx(Q,{title:"PUZZLES",showHome:!1,showStats:!1,onCube:()=>A(!0),onHelp:()=>C(!0)})}),s.jsxs("main",{className:"hp-page",children:[s.jsxs("header",{className:"hp-intro",children:[s.jsx("p",{className:"hp-tagline",children:"Daily puzzles for the breakfast table, the car ride, or the classroom warm-up."}),s.jsx("div",{className:"hp-date",children:Ne})]}),s.jsx("div",{className:"hp-divider"}),s.jsx("section",{className:"hp-list",children:x.map(({key:t,href:c,Icon:h,title:y,desc:v,single:z})=>{const X=t==="allten"||z?c:t==="clueless"?re(c,o):le(c,n[t]);return s.jsxs("div",{className:"hp-cardWrapper",children:[s.jsxs("a",{className:"hp-card",href:X,children:[s.jsx("div",{className:"hp-iconTile",children:s.jsx(h,{size:56})}),s.jsxs("div",{className:"hp-meta",children:[s.jsx("div",{className:"hp-cardTitle",children:y}),s.jsx("div",{className:"hp-desc",children:v}),s.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[t==="allten"?f>0?s.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:s.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:f>=10?"#22c55e":$,color:f>=10?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":`${f} of 10 targets solved`,children:f})}):null:t==="clueless"?s.jsx(ke,{attempts:o}):z?s.jsx($e,{completed:i[t],perfect:a[t],attempts:m[t],failed:d[t]}):s.jsx(Te,{gameKey:t,completions:n[t],perfects:r[t],moveCounts:l[t]}),b[t]>0&&s.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",b[t]]})]})]})]}),K(t,z)&&s.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[G===t&&s.jsx("div",{className:"toast-panel hp-shareToast",children:s.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),s.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:q=>J(q,t),"aria-label":"Share results",children:[s.jsx(Ee,{size:18}),"SHARE"]})]})]},c)})})]})]}),s.jsx(ee,{show:V,onClose:()=>A(!1)}),Y&&s.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:s.jsxs("div",{className:"hp-modal-content",children:[s.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>C(!1),"aria-label":"Close",children:"✕"}),s.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),s.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[s.jsx(L,{size:48}),s.jsx(U,{size:48}),s.jsx(O,{size:48})]}),s.jsxs("div",{className:"hp-modal-body",children:[s.jsx("p",{children:"Each day has puzzles of each type listed in order from easiest to hardest."}),s.jsxs("p",{children:[s.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Green"})," indicates completed puzzles. "]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate solves made without using undo or reset."]})]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),s.jsxs("p",{children:[s.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing at least one puzzle daily."]})]})]})})]})}export{Be as default};
