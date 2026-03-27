import{j as t,r as d,R as C,T as V,P as S,a as z,b as X}from"./style-BZbYlEFb.js";import{A as Q,D}from"./DiceFace-BKYcvf7Y.js";import{I as N}from"./BugIcon-Xr7TRzU7.js";import{I as R}from"./FoldsIcon-D5H9nNq-.js";import{I as K}from"./ProductilesIcon-CVlfxduv.js";import{I as P}from"./SumTilesIcon-DBvRPnMs.js";import{I as ee}from"./FactorfallIcon-f0fEeJr2.js";import{I as te}from"./CluelessIcon-DEkYE44n.js";function se({size:e=56}){const n=e;return t.jsxs("svg",{width:n,height:n,viewBox:"0 0 64 64",fill:"none",xmlns:"http://www.w3.org/2000/svg","aria-hidden":!0,children:[t.jsx("rect",{x:"6",y:"6",width:"52",height:"52",rx:"10",stroke:"currentColor",strokeWidth:"4"}),t.jsx("path",{d:"M26 22v24",stroke:"currentColor",strokeWidth:"6",strokeLinecap:"round"}),t.jsx("path",{d:"M20 28l6-6",stroke:"currentColor",strokeWidth:"6",strokeLinecap:"round"}),t.jsx("path",{d:"M44 22c-6 0-10 6-10 12s4 12 10 12 10-6 10-12-4-12-10-12Z",stroke:"currentColor",strokeWidth:"6"})]})}const w="/puzzles/";function g(e){try{return localStorage.getItem(e)}catch{return null}}function ne(){const e=new Date,n=new Date(e.getTime()-480*60*1e3);return`${n.getUTCFullYear()}-${String(n.getUTCMonth()+1).padStart(2,"0")}-${String(n.getUTCDate()).padStart(2,"0")}`}function M(e){const n=new Date;n.setDate(n.getDate()-e);const r=new Date(n.getTime()-480*60*1e3);return`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}-${String(r.getUTCDate()).padStart(2,"0")}`}function B(e,n){return[0,1,2].map(r=>["1","2"].includes(g(`${e}:${n}:${r}`)))}function re(e,n){return[0,1,2].map(r=>g(`${e}:${n}:${r}`)==="2")}function oe(e,n){return[0,1,2].map(r=>{const o=g(`${e}:${n}:${r}:moves`);return o!=null?parseInt(o,10):null})}function k(e,n){if(e!=="clueless")return null;const r=g(`clueless:${n}:bestAttempts`);if(r==null)return null;const o=parseInt(r,10);return o>=1&&o<=99?o:null}function ie(e,n){return e!=="clueless"?!1:g(`clueless:${n}:failed`)==="1"}function F(e,n){return e==="clueless"?k(e,n)!=null:["1","2"].includes(g(`${e}:${n}`))}function le(e,n){return e==="clueless"?k(e,n)===1:g(`${e}:${n}`)==="2"}const ae=["easy","medium","hard"];function ce(e,n){const r=g(`clueless:${e}:${n}:bestAttempts`);if(r!=null){const o=parseInt(r,10);if(o>=1&&o<=99)return o}if(n==="medium"){const o=k("clueless",e);if(o!=null)return o}return null}function O(e){return ae.map(n=>ce(e,n))}function de(e){const n=e.split("-").map(Number);if(n.length!==3||n.some(Number.isNaN))return"";const[r,o,i]=n,l=Date.UTC(r,o-1,i,12,0,0),a=new Date(l).toLocaleString("en-US",{timeZone:"America/Los_Angeles"}).split(",")[0]?.trim()??"";return a?`${a}-targets`:""}function W(e){const n=de(e);if(!n)return 0;try{const r=g(n);if(!r)return 0;const o=JSON.parse(r);return Array.isArray(o)?o.filter(i=>i!=null&&i.solution!=null).length:0}catch{return 0}}function pe(e,n,r){const o=new URL(n,window.location.origin).href;return`${e.toUpperCase()}
${r}/10 targets
Play at ${o}`}const ue=365;function A(e,n,r){return e==="allten"?W(r)>0:e==="clueless"?O(r).some(o=>o!=null):n?F(e,r):B(e,r).some(Boolean)}function he(e,n=!1){const o=A(e,n,M(0))?0:1;let i=0;for(let l=o;l<=ue;l++){const a=M(l);if(A(e,n,a))i++;else break}return i}const H=new Set(["sumtiles","productiles"]),me=["Easy","Med","Hard"];function fe({gameKey:e,completions:n,perfects:r,moveCounts:o}){const i=H.has(e),l=n??[!1,!1,!1],a=r??[!1,!1,!1],m=o??[null,null,null];return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(p=>{const h=l[p],v=a[p],b=m[p]!=null?m[p]:null,f=h?i?b!=null?String(Math.min(b,99)):"✓":v?"★":"✓":t.jsx(D,{count:p+1,size:20});return t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:h?"#22c55e":z,color:h?"#fff":S,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:f},p)})})}function xe({completed:e,perfect:n,attempts:r,failed:o}){const i=r!=null||o,l=i?r!=null:e,a=i&&r!=null,m=i&&o&&r==null,p=a?"#22c55e":m?"#374151":l?"#22c55e":z,h=i?r!=null?r===1?"★":String(Math.min(r,99)):o?"•":"1":e?n?"★":"✓":"1";return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:p,color:a||m||l?"#fff":S,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:h})})}function ge({attempts:e}){return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[0,1,2].map(n=>{const r=e?.[n]??null,o=r!=null,i=o?r===1?"★":String(Math.min(r,99)):t.jsx(D,{count:n+1,size:20});return t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:o?"#22c55e":z,color:o?"#fff":S,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:i},n)})})}function be(e,n,r,o,i,l){const a=new URL(r,window.location.origin).href,m=H.has(e);let p=n.toUpperCase()+`
`;for(let h=0;h<3;h++){const v=me[h];if(o[h]){const b=m&&l&&l[h]!=null?` (${l[h]} moves)`:"",f=!m&&i&&i[h]?" (⭐ First try!)":"";p+=`${v}   🟩${b}${f}
`}else p+=`${v}   ⬜
`}return p+="Play at "+a,p}function ye(e,n,r,o){const i=new URL(n,window.location.origin).href;let l=e.toUpperCase()+`
`;return r?l+=`🟩${o?" (⭐ First try!)":""}
`:l+=`⬜
`,l+="Play at "+i,l}function we(e,n,r){const o=new URL(n,window.location.origin).href,i=["Easy","Med","Hard"];let l=e.toUpperCase()+`
`;for(let a=0;a<3;a++){const m=r?.[a]??null;if(m!=null){const p=m===1?"★":String(Math.min(m,99));l+=`${i[a]}   🟩 ${p}
`}else l+=`${i[a]}   ⬜
`}return l+="Play at "+o,l}function ve({size:e=18}){return t.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:[t.jsx("circle",{cx:"6",cy:"12",r:"2.5"}),t.jsx("circle",{cx:"18",cy:"8",r:"2.5"}),t.jsx("circle",{cx:"18",cy:"16",r:"2.5"}),t.jsx("path",{d:"M8.5 11.5L15.5 9.2M8.5 12.5L15.5 14.8"})]})}const x=[{key:"allten",href:`${w}puzzlegames/allten/`,Icon:se,title:"All Ten",desc:"Use the given numbers to make each target from 1 to 10."},{key:"scurry",href:`${w}puzzlegames/scurry/`,Icon:N,title:"Scurry",desc:"Place bugs to fill every highlighted square."},{key:"clueless",href:`${w}puzzlegames/clueless/`,Icon:te,title:"Clueless",desc:"Fill in the missing letters to complete six crossing words.",single:!1},{key:"folds",href:`${w}puzzlegames/folds/`,Icon:R,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"factorfall",href:`${w}puzzlegames/factorfall/`,Icon:ee,title:"Factorfall",desc:"Drop factors into the grid. Clear same-color groups that multiply to the target."},{key:"sumtiles",href:`${w}puzzlegames/sumtiles/`,Icon:P,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${w}puzzlegames/productiles/`,Icon:K,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],je=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"}),Se=2e3;function ze(){const e=d.useMemo(()=>ne(),[]),n=d.useMemo(()=>Object.fromEntries(x.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,B(s.key,e)])),[e]),r=d.useMemo(()=>Object.fromEntries(x.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,re(s.key,e)])),[e]),o=d.useMemo(()=>Object.fromEntries(x.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,oe(s.key,e)])),[e]),i=d.useMemo(()=>O(e),[e]),l=d.useMemo(()=>Object.fromEntries(x.filter(s=>s.single).map(s=>[s.key,F(s.key,e)])),[e]),a=d.useMemo(()=>Object.fromEntries(x.filter(s=>s.single).map(s=>[s.key,le(s.key,e)])),[e]),m=d.useMemo(()=>Object.fromEntries(x.filter(s=>s.single).map(s=>[s.key,k(s.key,e)])),[e]),p=d.useMemo(()=>Object.fromEntries(x.filter(s=>s.single).map(s=>[s.key,ie(s.key,e)])),[e]),[h,v]=d.useState(0),b=d.useMemo(()=>Object.fromEntries(x.map(s=>[s.key,he(s.key,!!s.single)])),[e,h]),f=d.useMemo(()=>W(e),[e,h]),[_,$]=d.useState(null),[Z,I]=d.useState(!1),[G,E]=d.useState(!1),j=d.useRef(null);C.useEffect(()=>()=>{j.current&&clearTimeout(j.current)},[]),C.useEffect(()=>{const s=()=>v(y=>y+1),c=()=>{document.visibilityState==="visible"&&s()},u=y=>{y.persisted&&s()};return document.addEventListener("visibilitychange",c),window.addEventListener("pageshow",u),window.addEventListener("storage",s),()=>{document.removeEventListener("visibilitychange",c),window.removeEventListener("pageshow",u),window.removeEventListener("storage",s)}},[]);const Y=d.useCallback((s,c)=>{s.preventDefault(),s.stopPropagation();const u=x.find(T=>T.key===c);if(!u)return;const y=c==="allten"?pe(u.title,u.href,f):c==="clueless"?we(u.title,u.href,i):u.single?ye(u.title,u.href,l[c],a[c]):be(c,u.title,u.href,n[c],r[c],o[c]);navigator.clipboard.writeText(y).then(()=>{j.current&&clearTimeout(j.current),$(c),j.current=setTimeout(()=>{$(null),j.current=null},Se)})},[f,i,n,r,o,l,a]),q=d.useCallback((s,c)=>s==="allten"?f>0:s==="clueless"?i.some(u=>u!=null):c?l[s]:n[s]?.some(Boolean),[f,i,n,l]);return t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
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
            `}),t.jsxs("div",{className:"hp-shell",children:[t.jsx("div",{style:{flexShrink:0,width:"100%"},children:t.jsx(V,{title:"PUZZLES",showHome:!1,showStats:!1,onCube:()=>E(!0),onHelp:()=>I(!0)})}),t.jsxs("main",{className:"hp-page",children:[t.jsxs("header",{className:"hp-intro",children:[t.jsx("p",{className:"hp-tagline",children:"Daily puzzles for the breakfast table, the car ride, or the classroom warm-up."}),t.jsx("div",{className:"hp-date",children:je})]}),t.jsx("div",{className:"hp-divider"}),t.jsx("section",{className:"hp-list",children:x.map(({key:s,href:c,Icon:u,title:y,desc:T,single:L})=>t.jsxs("div",{className:"hp-cardWrapper",children:[t.jsxs("a",{className:"hp-card",href:c,children:[t.jsx("div",{className:"hp-iconTile",children:t.jsx(u,{size:56})}),t.jsxs("div",{className:"hp-meta",children:[t.jsx("div",{className:"hp-cardTitle",children:y}),t.jsx("div",{className:"hp-desc",children:T}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[s==="allten"?f>0?t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:f>=10?"#22c55e":z,color:f>=10?"#fff":S,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":`${f} of 10 targets solved`,children:f})}):null:s==="clueless"?t.jsx(ge,{attempts:i}):L?t.jsx(xe,{completed:l[s],perfect:a[s],attempts:m[s],failed:p[s]}):t.jsx(fe,{gameKey:s,completions:n[s],perfects:r[s],moveCounts:o[s]}),b[s]>0&&t.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",b[s]]})]})]})]}),q(s,L)&&t.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center"},children:[_===s&&t.jsx("div",{className:"toast-panel hp-shareToast",children:t.jsx("div",{className:"toast-text",children:"RESULTS COPIED TO CLIPBOARD"})}),t.jsxs("button",{type:"button",className:"hp-shareBtn",onClick:J=>Y(J,s),"aria-label":"Share results",children:[t.jsx(ve,{size:18}),"SHARE"]})]})]},c))})]})]}),t.jsx(Q,{show:G,onClose:()=>E(!1)}),Z&&t.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:t.jsxs("div",{className:"hp-modal-content",children:[t.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>I(!1),"aria-label":"Close",children:"✕"}),t.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),t.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[t.jsx(N,{size:48}),t.jsx(R,{size:48}),t.jsx(P,{size:48})]}),t.jsxs("div",{className:"hp-modal-body",children:[t.jsx("p",{children:"Each day has puzzles of each type listed in order from easiest to hardest."}),t.jsxs("p",{children:[t.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),t.jsxs("ul",{children:[t.jsxs("li",{children:[t.jsx("strong",{children:"Green"})," indicates completed puzzles. "]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),t.jsxs("li",{children:[t.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate solves made without using undo or reset."]})]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),t.jsxs("p",{children:[t.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing at least one puzzle daily."]})]})]})})]})}class ke extends C.Component{constructor(n){super(n),this.state={error:null}}static getDerivedStateFromError(n){return{error:n}}componentDidCatch(n,r){console.error("Hub render error:",n,r?.componentStack)}render(){return this.state.error?t.jsxs("div",{style:{fontFamily:"system-ui, sans-serif",padding:"24px",maxWidth:"520px",margin:"40px auto"},children:[t.jsx("h1",{style:{fontSize:"1.1rem"},children:"Something went wrong loading the hub"}),t.jsx("pre",{style:{whiteSpace:"pre-wrap",wordBreak:"break-word",background:"#f4f4f5",padding:"12px",borderRadius:"8px",fontSize:"13px"},children:String(this.state.error)}),t.jsx("p",{style:{fontSize:"14px",color:"#52525b"},children:"Try a hard refresh (Ctrl+Shift+R) or another browser. If this persists, check the browser console for details."})]}):this.props.children}}const U=document.getElementById("root");U&&X.createRoot(U).render(t.jsx(ke,{children:t.jsx(ze,{})}));
