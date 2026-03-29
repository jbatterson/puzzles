import{j as t,r as d,R as I,T as ee,P as T,a as $,A as te,b as se}from"./style-bQ7Z7EuY.js";import{I as U}from"./BugIcon-DIjgMPo0.js";import{I as R}from"./FoldsIcon-BdL1eKYm.js";import{I as ne}from"./ProductilesIcon-C8tAmzos.js";import{I as O}from"./SumTilesIcon-DYvp8VL3.js";import{I as re}from"./FactorfallIcon-plEZFoUu.js";import{I as oe}from"./CluelessIcon-jHHXPqXB.js";import{h as le,a as ie,D as P}from"./hubEntry-BXIWyVxe.js";function ae({size:e=28,className:s=""}){return t.jsxs("svg",{width:e,height:e,viewBox:"0 0 150 150",className:s,xmlns:"http://www.w3.org/2000/svg",children:[t.jsxs("g",{children:[t.jsx("path",{fill:"#53b1d6",d:"M115.97,111.58c-4.56,0-8.4-1.3-11.73-3.96-3.37-2.7-5.99-6.75-7.79-12.06-1.87-5.48-2.82-12.46-2.82-20.74s.95-15.26,2.82-20.74c1.79-5.28,4.4-9.26,7.76-11.85,3.33-2.57,7.13-3.82,11.59-3.82s8.54,1.27,11.81,3.88c3.32,2.65,5.94,6.68,7.79,11.99,1.92,5.5,2.9,12.47,2.9,20.71s-.98,15.07-2.9,20.64c-1.85,5.36-4.47,9.42-7.79,12.07-3.27,2.61-7.08,3.88-11.65,3.88Z"}),t.jsx("path",{d:"M115.8,40.92c4.09,0,7.44,1.09,10.26,3.33,2.95,2.35,5.3,6,6.99,10.86,1.83,5.24,2.76,11.93,2.76,19.88s-.93,14.52-2.77,19.83c-1.69,4.9-4.04,8.58-6.99,10.93-2.81,2.24-6.11,3.33-10.09,3.33s-7.3-1.12-10.16-3.41c-2.99-2.39-5.34-6.06-6.99-10.92-1.78-5.22-2.69-11.93-2.69-19.93s.9-14.71,2.69-19.94c1.63-4.8,3.96-8.39,6.91-10.67,2.88-2.22,6.18-3.3,10.07-3.3M115.8,35.92c-4.99,0-9.36,1.44-13.12,4.34-3.76,2.9-6.63,7.24-8.6,13.02-1.98,5.8-2.95,12.98-2.95,21.55s.98,15.75,2.95,21.55c1.97,5.78,4.83,10.19,8.6,13.2,3.76,3.01,8.19,4.51,13.29,4.51s9.5-1.47,13.2-4.42c3.7-2.95,6.57-7.35,8.6-13.2,2.02-5.85,3.04-13.01,3.04-21.46s-1.02-15.75-3.04-21.53c-2.02-5.8-4.89-10.16-8.6-13.12-3.7-2.95-8.17-4.42-13.37-4.42h0Z"})]}),t.jsxs("g",{children:[t.jsx("path",{fill:"#53b1d6",d:"M36.05,135.73V33.09H11.69V14.27h81.73c-1.99.97-3.92,2.08-5.78,3.33-8.2,5.48-14.74,13.23-19.45,23.05-4.66,9.75-7.02,21.25-7.02,34.18s2.39,24.32,7.12,34.18c4.73,9.9,11.37,17.75,19.71,23.32,1.92,1.28,3.9,2.42,5.93,3.41h-57.88Z"}),t.jsx("path",{d:"M84.46,16.77c-7.74,5.63-13.96,13.29-18.53,22.8-4.82,10.09-7.26,21.95-7.26,35.25s2.48,25.06,7.36,35.25c4.61,9.64,10.96,17.42,18.89,23.15h-46.38V30.59H14.19v-13.82h70.27M115.97,11.77H9.19v23.82h24.36v102.64h82.59c-9.84,0-18.76-2.66-26.75-7.99-7.99-5.33-14.28-12.77-18.84-22.32-4.58-9.56-6.87-20.58-6.87-33.1s2.26-23.65,6.77-33.1c4.52-9.43,10.72-16.79,18.59-22.05,7.87-5.27,16.96-7.9,26.93-7.9h0Z"})]})]})}const ce=new Date(Date.parse("19 Sep 2022 00:00:00 PST")),de=864e5,N=3,ue="✅",pe="⬜";function he(e){return[...e].sort((s,r)=>(s.solveOrder?-1:0)+(r.solveOrder?1:0)||(s.solveOrder||0)-(r.solveOrder||0))}function me(e){return Array.isArray(e)?he(e).map(r=>r.solution?`${r.number}${ue}`:`${r.number}${pe}`).join(" "):""}function F(e){const s=Math.floor((Number(e)-Number(ce))/de),r=String(s);return(r.length<N?"0".repeat(N-r.length):"")+r}function fe(e,s){if(!Array.isArray(e)||e.length===0)return"";const r=F(s),o=e.filter(a=>a&&a.solution!=null).length,l=e.length,i=me(e);return`All Ten #${r}
${o}/${l}
${i}`}const v="/puzzles/";function g(e){try{return localStorage.getItem(e)}catch{return null}}function xe(){const e=new Date,s=new Date(e.getTime()-480*60*1e3);return`${s.getUTCFullYear()}-${String(s.getUTCMonth()+1).padStart(2,"0")}-${String(s.getUTCDate()).padStart(2,"0")}`}function M(e){const s=new Date;s.setDate(s.getDate()-e);const r=new Date(s.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function H(e,s){return[0,1,2].map(r=>["1","2"].includes(g(`${e}:${s}:${r}`)))}function ge(e,s){return[0,1,2].map(r=>g(`${e}:${s}:${r}`)==="2")}function be(e,s){return[0,1,2].map(r=>{const o=g(`${e}:${s}:${r}:moves`);return o!=null?parseInt(o,10):null})}function k(e,s){if(e!=="clueless")return null;const r=g(`clueless:${s}:bestAttempts`);if(r==null)return null;const o=parseInt(r,10);return o>=1&&o<=99?o:null}function ye(e,s){return e!=="clueless"?!1:g(`clueless:${s}:failed`)==="1"}function B(e,s){return e==="clueless"?k(e,s)!=null:["1","2"].includes(g(`${e}:${s}`))}function we(e,s){return e==="clueless"?k(e,s)===1:g(`${e}:${s}`)==="2"}const ve=["easy","medium","hard"];function Se(e,s){const r=g(`clueless:${e}:${s}:bestAttempts`);if(r!=null){const o=parseInt(r,10);if(o>=1&&o<=99)return o}if(s==="medium"){const o=k("clueless",e);if(o!=null)return o}return null}function _(e){return ve.map(s=>Se(e,s))}function Z(e){const s=e.split("-").map(Number);if(s.length!==3||s.some(Number.isNaN))return"";const[r,o,l]=s,i=Date.UTC(r,o-1,l,12,0,0),a=new Date(i).toLocaleString("en-US",{timeZone:"America/Los_Angeles"}).split(",")[0]?.trim()??"";return a?`${a}-targets`:""}function W(e){const s=Z(e);if(!s)return 0;try{const r=g(s);if(!r)return 0;const o=JSON.parse(r);return Array.isArray(o)?o.filter(l=>l!=null&&l.solution!=null).length:0}catch{return 0}}function je(e){const s=Z(e);if(!s)return null;try{const r=g(s);if(!r)return null;const o=JSON.parse(r);return Array.isArray(o)?o:null}catch{return null}}const ze=365;function D(e,s,r){return e==="allten"?W(r)>0:e==="clueless"?_(r).some(o=>o!=null):s?B(e,r):H(e,r).some(Boolean)}function Te(e,s=!1){const o=D(e,s,M(0))?0:1;let l=0;for(let i=o;i<=ze;i++){const a=M(i);if(D(e,s,a))l++;else break}return l}const G=new Set(["sumtiles","productiles"]),$e=["Easy","Med","Hard"];function ke({gameKey:e,completions:s,perfects:r,moveCounts:o}){const l=G.has(e),i=s??[!1,!1,!1],a=r??[!1,!1,!1],m=o??[null,null,null];return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(u=>{const p=i[u],S=a[u],b=m[u]!=null?m[u]:null,f=p?l?b!=null?String(Math.min(b,99)):"✓":S?"★":"✓":t.jsx(P,{count:u+1,size:20});return t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:p?"#22c55e":$,color:p?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:f},u)})})}function Ie({completed:e,perfect:s,attempts:r,failed:o}){const l=r!=null||o,i=l?r!=null:e,a=l&&r!=null,m=l&&o&&r==null,u=a?"#22c55e":m?"#374151":i?"#22c55e":$,p=l?r!=null?r===1?"★":String(Math.min(r,99)):o?"•":"1":e?s?"★":"✓":"1";return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:u,color:a||m||i?"#fff":T,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:p})})}function Ce({attempts:e}){return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(s=>{const r=e?.[s]??null,o=r!=null,l=o?r===1?"★":String(Math.min(r,99)):t.jsx(P,{count:s+1,size:20});return t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:o?"#22c55e":$,color:o?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:l},s)})})}function Ee(e,s,r,o,l,i){const a=new URL(r,window.location.origin).href,m=G.has(e);let u=s.toUpperCase()+`
`;for(let p=0;p<3;p++){const S=$e[p];if(o[p]){const b=m&&i&&i[p]!=null?` (${i[p]} moves)`:"",f=!m&&l&&l[p]?" (⭐ First try!)":"";u+=`${S}   🟩${b}${f}
`}else u+=`${S}   ⬜
`}return u+=a,u}function Ae(e,s,r,o){const l=new URL(s,window.location.origin).href;let i=e.toUpperCase()+`
`;return r?i+=`🟩${o?" (⭐ First try!)":""}
`:i+=`⬜
`,i+=l,i}function Ne(e,s,r){const o=new URL(s,window.location.origin).href,l=["Easy","Med","Hard"];let i=e.toUpperCase()+`
`;for(let a=0;a<3;a++){const m=r?.[a]??null;if(m!=null){const u=m===1?"★":String(Math.min(m,99));i+=`${l[a]}   🟩 ${u}
`}else i+=`${l[a]}   ⬜
`}return i+=o,i}function Me({size:e=18}){return t.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[t.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),t.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),t.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),t.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const x=[{key:"allten",href:`${v}puzzlegames/allten/`,Icon:ae,title:"All Ten",desc:"Use the given numbers to make each target from 1 to 10."},{key:"scurry",href:`${v}puzzlegames/scurry/`,Icon:U,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${v}puzzlegames/clueless/`,Icon:oe,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${v}puzzlegames/folds/`,Icon:R,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${v}puzzlegames/factorfall/`,Icon:re,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${v}puzzlegames/sumtiles/`,Icon:O,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${v}puzzlegames/productiles/`,Icon:ne,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],De=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),Le=2e3;function Ue(){const e=d.useMemo(()=>xe(),[]),s=d.useMemo(()=>Object.fromEntries(x.filter(n=>!n.single&&n.key!=="clueless"&&n.key!=="allten").map(n=>[n.key,H(n.key,e)])),[e]),r=d.useMemo(()=>Object.fromEntries(x.filter(n=>!n.single&&n.key!=="clueless"&&n.key!=="allten").map(n=>[n.key,ge(n.key,e)])),[e]),o=d.useMemo(()=>Object.fromEntries(x.filter(n=>!n.single&&n.key!=="clueless"&&n.key!=="allten").map(n=>[n.key,be(n.key,e)])),[e]),l=d.useMemo(()=>_(e),[e]),i=d.useMemo(()=>Object.fromEntries(x.filter(n=>n.single).map(n=>[n.key,B(n.key,e)])),[e]),a=d.useMemo(()=>Object.fromEntries(x.filter(n=>n.single).map(n=>[n.key,we(n.key,e)])),[e]),m=d.useMemo(()=>Object.fromEntries(x.filter(n=>n.single).map(n=>[n.key,k(n.key,e)])),[e]),u=d.useMemo(()=>Object.fromEntries(x.filter(n=>n.single).map(n=>[n.key,ye(n.key,e)])),[e]),[p,S]=d.useState(0),b=d.useMemo(()=>Object.fromEntries(x.map(n=>[n.key,Te(n.key,!!n.single)])),[e,p]),f=d.useMemo(()=>W(e),[e,p]),[Y,C]=d.useState(null),[V,E]=d.useState(!1),[J,A]=d.useState(!1),j=d.useRef(null);I.useEffect(()=>()=>{j.current&&clearTimeout(j.current)},[]),I.useEffect(()=>{const n=()=>S(y=>y+1),c=()=>{document.visibilityState==="visible"&&n()},h=y=>{y.persisted&&n()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",h),window.addEventListener("storage",n),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",h),window.removeEventListener("storage",n)}},[]);const K=d.useCallback((n,c)=>{n.preventDefault(),n.stopPropagation();const h=x.find(w=>w.key===c);if(!h)return;const y=c==="allten"?(()=>{const w=je(e),z=new Date;return w&&w.length?fe(w,z):`All Ten #${F(z)}
${f}/10
`})():c==="clueless"?Ne(h.title,h.href,l):h.single?Ae(h.title,h.href,i[c],a[c]):Ee(c,h.title,h.href,s[c],r[c],o[c]);navigator.clipboard.writeText(y).then(()=>{j.current&&clearTimeout(j.current),C(c),j.current=setTimeout(()=>{C(null),j.current=null},Le)})},[e,f,l,s,r,o,i,a]),X=d.useCallback((n,c)=>n==="allten"?f>0:n==="clueless"?l.some(h=>h!=null):c?i[n]:s[n]?.some(Boolean),[f,l,s,i]);return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
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
            `}),t.jsxs("div",{className:"hp-shell",children:[t.jsx("div",{style:{flexShrink:0,width:"100%"},children:t.jsx(ee,{title:"PUZZLES",showHome:!1,showStats:!1,onCube:()=>A(!0),onHelp:()=>E(!0)})}),t.jsxs("main",{className:"hp-page",children:[t.jsxs("header",{className:"hp-intro",children:[t.jsx("p",{className:"hp-tagline",children:"Daily puzzles for the breakfast table, the car ride, or the classroom warm-up."}),t.jsx("div",{className:"hp-date",children:De})]}),t.jsx("div",{className:"hp-divider"}),t.jsx("section",{className:"hp-list",children:x.map(({key:n,href:c,Icon:h,title:y,desc:w,single:z})=>{const q=n==="allten"||z?c:n==="clueless"?le(c,l):ie(c,s[n]);return t.jsxs("div",{className:"hp-cardWrapper",children:[t.jsxs("a",{className:"hp-card",href:q,children:[t.jsx("div",{className:"hp-iconTile",children:t.jsx(h,{size:56})}),t.jsxs("div",{className:"hp-meta",children:[t.jsx("div",{className:"hp-cardTitle",children:y}),t.jsx("div",{className:"hp-desc",children:w}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[n==="allten"?f>0?t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:f>=10?"#22c55e":$,color:f>=10?"#fff":T,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":`${f} of 10 targets solved`,children:f})}):null:n==="clueless"?t.jsx(Ce,{attempts:l}):z?t.jsx(Ie,{completed:i[n],perfect:a[n],attempts:m[n],failed:u[n]}):t.jsx(ke,{gameKey:n,completions:s[n],perfects:r[n],moveCounts:o[n]}),b[n]>0&&t.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",b[n]]})]})]})]}),X(n,z)&&t.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[Y===n&&t.jsx("div",{className:"toast-panel hp-shareToast",children:t.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),t.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:Q=>K(Q,n),"aria-label":"Share results",children:[t.jsx(Me,{size:18}),"SHARE"]})]})]},c)})})]})]}),t.jsx(te,{show:J,onClose:()=>A(!1)}),V&&t.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:t.jsxs("div",{className:"hp-modal-content",children:[t.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>E(!1),"aria-label":"Close",children:"✕"}),t.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),t.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[t.jsx(U,{size:48}),t.jsx(R,{size:48}),t.jsx(O,{size:48})]}),t.jsxs("div",{className:"hp-modal-body",children:[t.jsx("p",{children:"Each day has puzzles of each type listed in order from easiest to hardest."}),t.jsxs("p",{children:[t.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Green"})," indicates completed puzzles. "]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate solves made without using undo or reset."]})]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing at least one puzzle daily."]})]})]})})]})}class Re extends I.Component{constructor(s){super(s),this.state={error:null}}static getDerivedStateFromError(s){return{error:s}}componentDidCatch(s,r){console.error("Hub render error:",s,r?.componentStack)}render(){return this.state.error?t.jsxs("div",{style:{fontFamily:"system-ui, sans-serif",padding:"24px",maxWidth:"520px",margin:"40px auto"},children:[t.jsx("h1",{style:{fontSize:"1.1rem"},children:"Something went wrong loading the hub"}),t.jsx("pre",{style:{whiteSpace:"pre-wrap",wordBreak:"break-word",background:"#f4f4f5",padding:"12px",borderRadius:"8px",fontSize:"13px"},children:String(this.state.error)}),t.jsx("p",{style:{fontSize:"14px",color:"#52525b"},children:"Try a hard refresh (Ctrl+Shift+R) or another browser. If this persists, check the browser console for details."})]}):this.props.children}}const L=document.getElementById("root");L&&se.createRoot(L).render(t.jsx(Re,{children:t.jsx(Ue,{})}));
