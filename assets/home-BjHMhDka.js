import{r as o,R as U,j as e}from"./client-Dgtgdm0G.js";import{h as D,F as xe,M as ge,P as S,f as W,t as X,D as G,u as re,w as Q,v as be,b as N,x as ye,y as K,s as Se,k as ve,z as je,S as we,T as ze,a as ke,B as ee,C as te,l as Te,m as Ee,A as Ie,q as Me,i as Ce}from"./AllTenLinksModal-YDdBtEBO.js";import{I as le}from"./FoldsIcon-RxdmIz5N.js";import{I as Ne}from"./ProductilesIcon-VgVuCZqT.js";import{I as ie}from"./SumTilesIcon-BV-rSkI6.js";import{I as Ae}from"./CluelessIcon-_a-FJVWi.js";import{I as $e}from"./HoneycombsIcon-Cy6Gh6Yc.js";import{a as Pe,i as Oe,h as Le,c as He}from"./dailyPuzzleDate-CmYcpVwg.js";const De={display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid rgba(26, 61, 91, 0.12)"},Re="#6b9b3b",oe=t=>({width:"44px",height:"26px",borderRadius:"999px",border:"none",padding:0,cursor:"pointer",background:t?S:N,position:"relative",flexShrink:0,transition:"background 0.2s"}),Be=t=>({...oe(t),background:t?Re:N}),se=t=>({position:"absolute",top:"3px",left:t?"22px":"3px",width:"20px",height:"20px",borderRadius:"50%",background:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",transition:"left 0.2s"}),ne={width:"32px",height:"32px",borderRadius:"6px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s, color 0.2s"};function Ze(t,n){return t?{...ne,cursor:"pointer",background:n?S:N,color:n?"#fff":S}:{...ne,cursor:"default",background:ye,color:re}}function _e({show:t,onClose:n,games:r,onSaved:l}){const[i,d]=o.useState(()=>D()),p=o.useCallback(()=>{const c=D();d(c),l?.()},[l]);U.useEffect(()=>{t&&d(D())},[t]);const z=(c,g)=>{Q({puzzleOn:{[c]:!!g}}),p()},k=(c,g)=>{const I=!X(c,i)[g];be(c,g,I,i)&&p()},m=i.timerOn!==!1,x=()=>{Q({timerOn:!m}),p()};return e.jsxs(xe,{show:t,onClose:n,intent:ge.SETTINGS,contentClassName:"suite-settings-shell",children:[e.jsx("h2",{className:"suite-settings-title",style:{margin:"0 0 8px",fontSize:"1.35rem",fontWeight:900,letterSpacing:"0.06em",textAlign:"center",color:S},children:"SETTINGS"}),e.jsxs("div",{style:{marginBottom:"18px"},children:[e.jsx("div",{style:{fontSize:"0.78rem",fontWeight:900,letterSpacing:"0.14em",color:S,marginBottom:"6px"},children:"MY PUZZLES"}),e.jsx("p",{style:{margin:0,fontSize:"0.95rem",lineHeight:1.45,color:"var(--puzzle-ink-soft, #4a5f72)"},children:"Choose which puzzles appear on your dashboard."})]}),e.jsx("div",{style:{margin:"0 -4px",padding:"0 4px"},children:r.map(({key:c,title:g,Icon:T})=>{const f=i.puzzleOn[c]!==!1,I=W(c)?X(c,i):null,$="108px";return e.jsxs("div",{style:De,children:[e.jsx("div",{style:{width:"40px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"},"aria-hidden":!0,children:T?e.jsx(T,{size:32}):null}),e.jsx("div",{style:{flex:1,minWidth:0,fontWeight:800,fontSize:"0.95rem",color:S},children:g}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexShrink:0},children:[e.jsx("button",{type:"button","aria-label":f?`Turn off ${g}`:`Turn on ${g}`,onClick:()=>z(c,!f),style:oe(f),children:e.jsx("span",{style:se(f)})}),I?e.jsx("div",{style:{display:"flex",gap:"6px",width:$,justifyContent:"flex-end"},children:[0,1,2].map(u=>{const M=I[u],R=I.filter(Boolean).length===1&&M,P=f&&!(R&&M),O=f?M?"#fff":void 0:re;return e.jsx("button",{type:"button",disabled:!P,title:["Easy","Medium","Hard"][u],"aria-label":`${["Easy","Medium","Hard"][u]} ${M?"on":"off"}`,onClick:()=>P&&k(c,u),style:{...Ze(f,M),cursor:P?"pointer":"default"},children:e.jsx(G,{count:u+1,size:18,color:O})},u)})}):e.jsx("div",{style:{width:$,flexShrink:0},"aria-hidden":!0})]})]},c)})}),e.jsxs("div",{style:{marginTop:"18px",paddingTop:"18px",borderTop:"1px solid rgba(26, 61, 91, 0.12)",display:"flex",justifyContent:"center",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[e.jsx("button",{type:"button","aria-label":m?"Turn timer off":"Turn timer on",onClick:x,style:Be(m),children:e.jsx("span",{style:se(m)})}),e.jsx("i",{className:"fa-solid fa-clock",style:{fontSize:"1.15rem",lineHeight:1,color:S},"aria-hidden":!0}),e.jsx("span",{style:{fontWeight:900,fontSize:"0.72rem",letterSpacing:"0.12em",color:S},children:m?"TIMER ON":"TIMER OFF"})]})]})}function ae({size:t=28,className:n="",bodyFill:r="#ea1e31"}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 150 150",className:n,xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M140.34,80.4h-11.15c-.53-8.15-2.86-15.8-6.62-22.55l12.89-5.95c1.76-.81,2.53-2.91,1.72-4.67h0c-.81-1.76-2.91-2.53-4.67-1.72l-13.79,6.36c-7.41-9.96-18.19-17.24-30.64-20.21l3.24-8.15c3.31-.57,5.75-3.54,5.56-6.98-.2-3.71-3.37-6.55-7.07-6.36-3.71.2-6.55,3.37-6.36,7.08.07,1.38.56,2.63,1.33,3.66l-3.8,9.54c-1.77-.18-3.57-.27-5.39-.27-2.2,0-4.37.15-6.5.41l-3.85-9.68c.77-1.03,1.25-2.28,1.33-3.66.2-3.71-2.65-6.88-6.36-7.08-3.71-.2-6.88,2.65-7.08,6.36-.18,3.44,2.25,6.41,5.56,6.98l3.34,8.4c-12.17,3.16-22.66,10.49-29.87,20.36l-14.67-6.77c-1.76-.81-3.86-.04-4.67,1.72h0c-.81,1.76-.04,3.86,1.72,4.67l13.81,6.37c-3.62,6.65-5.86,14.16-6.38,22.13h-12.31c-1.94,0-3.52,1.58-3.52,3.52h0c0,1.94,1.58,3.52,3.52,3.52h12.31c.54,8.33,2.97,16.14,6.88,23l-14.31,6.6c-1.76.81-2.53,2.91-1.72,4.67s2.91,2.53,4.67,1.72l15.28-7.05c9.81,12.92,25.34,21.27,42.81,21.27s32.67-8.18,42.5-20.87l14.43,6.66c1.76.81,3.86.04,4.67-1.72s.04-3.86-1.72-4.67l-13.39-6.18c4.05-6.97,6.57-14.93,7.12-23.43h11.15c1.94,0,3.52-1.58,3.52-3.52h0c0-1.94-1.58-3.52-3.52-3.52Z"}),e.jsx("path",{fill:r,d:"M106.29,47.34c-8.52,4.24-19.16,6.77-30.71,6.77s-22.19-2.53-30.71-6.77c-10.42,8.76-17.06,21.89-17.06,36.58,0,23.54,17.03,43.09,39.44,47.03l8.33-54.21,8.33,54.21c22.41-3.94,39.44-23.49,39.44-47.03,0-14.68-6.63-27.81-17.06-36.58ZM49.31,108.21c-4.66,0-8.44-3.78-8.44-8.44s3.78-8.44,8.44-8.44,8.44,3.78,8.44,8.44-3.78,8.44-8.44,8.44ZM54.65,74.21c-3.71,0-6.73-3.01-6.73-6.73s3.01-6.73,6.73-6.73,6.73,3.01,6.73,6.73-3.01,6.73-6.73,6.73ZM89.78,67.49c0-3.71,3.01-6.73,6.73-6.73s6.73,3.01,6.73,6.73-3.01,6.73-6.73,6.73-6.73-3.01-6.73-6.73ZM101.85,108.21c-4.66,0-8.44-3.78-8.44-8.44s3.78-8.44,8.44-8.44,8.44,3.78,8.44,8.44-3.78,8.44-8.44,8.44Z"})]})}function Fe({size:t=28,className:n=""}){return e.jsxs("svg",{width:t,height:t,viewBox:"0 0 150 150",className:n,xmlns:"http://www.w3.org/2000/svg",children:[e.jsxs("g",{children:[e.jsx("path",{fill:"#2571b1",d:"M115.97,111.58c-4.56,0-8.4-1.3-11.73-3.96-3.37-2.7-5.99-6.75-7.79-12.06-1.87-5.48-2.82-12.46-2.82-20.74s.95-15.26,2.82-20.74c1.79-5.28,4.4-9.26,7.76-11.85,3.33-2.57,7.13-3.82,11.59-3.82s8.54,1.27,11.81,3.88c3.32,2.65,5.94,6.68,7.79,11.99,1.92,5.5,2.9,12.47,2.9,20.71s-.98,15.07-2.9,20.64c-1.85,5.36-4.47,9.42-7.79,12.07-3.27,2.61-7.08,3.88-11.65,3.88Z"}),e.jsx("path",{d:"M115.8,40.92c4.09,0,7.44,1.09,10.26,3.33,2.95,2.35,5.3,6,6.99,10.86,1.83,5.24,2.76,11.93,2.76,19.88s-.93,14.52-2.77,19.83c-1.69,4.9-4.04,8.58-6.99,10.93-2.81,2.24-6.11,3.33-10.09,3.33s-7.3-1.12-10.16-3.41c-2.99-2.39-5.34-6.06-6.99-10.92-1.78-5.22-2.69-11.93-2.69-19.93s.9-14.71,2.69-19.94c1.63-4.8,3.96-8.39,6.91-10.67,2.88-2.22,6.18-3.3,10.07-3.3M115.8,35.92c-4.99,0-9.36,1.44-13.12,4.34-3.76,2.9-6.63,7.24-8.6,13.02-1.98,5.8-2.95,12.98-2.95,21.55s.98,15.75,2.95,21.55c1.97,5.78,4.83,10.19,8.6,13.2,3.76,3.01,8.19,4.51,13.29,4.51s9.5-1.47,13.2-4.42c3.7-2.95,6.57-7.35,8.6-13.2,2.02-5.85,3.04-13.01,3.04-21.46s-1.02-15.75-3.04-21.53c-2.02-5.8-4.89-10.16-8.6-13.12-3.7-2.95-8.17-4.42-13.37-4.42h0Z"})]}),e.jsxs("g",{children:[e.jsx("path",{fill:"#2571b1",d:"M36.05,135.73V33.09H11.69V14.27h81.73c-1.99.97-3.92,2.08-5.78,3.33-8.2,5.48-14.74,13.23-19.45,23.05-4.66,9.75-7.02,21.25-7.02,34.18s2.39,24.32,7.12,34.18c4.73,9.9,11.37,17.75,19.71,23.32,1.92,1.28,3.9,2.42,5.93,3.41h-57.88Z"}),e.jsx("path",{d:"M84.46,16.77c-7.74,5.63-13.96,13.29-18.53,22.8-4.82,10.09-7.26,21.95-7.26,35.25s2.48,25.06,7.36,35.25c4.61,9.64,10.96,17.42,18.89,23.15h-46.38V30.59H14.19v-13.82h70.27M115.97,11.77H9.19v23.82h24.36v102.64h82.59c-9.84,0-18.76-2.66-26.75-7.99-7.99-5.33-14.28-12.77-18.84-22.32-4.58-9.56-6.87-20.58-6.87-33.1s2.26-23.65,6.77-33.1c4.52-9.43,10.72-16.79,18.59-22.05,7.87-5.27,16.96-7.9,26.93-7.9h0Z"})]})]})}const E="/puzzles/";function v(t){try{return localStorage.getItem(t)}catch{return null}}function ce(t,n){return[0,1,2].map(r=>["1","2"].includes(v(`${t}:${n}:${r}`)))}function Ue(t,n){return[0,1,2].map(r=>v(`${t}:${n}:${r}`)==="2")}function We(t,n){return[0,1,2].map(r=>{const l=v(`${t}:${n}:${r}:moves`);return l!=null?parseInt(l,10):null})}function _(t,n){if(t!=="clueless")return null;const r=v(`clueless:${n}:bestAttempts`);if(r==null)return null;const l=parseInt(r,10);return l>=1&&l<=99?l:null}function Ge(t,n){return t!=="clueless"?!1:v(`clueless:${n}:failed`)==="1"}function de(t,n){return t==="clueless"?_(t,n)!=null:["1","2"].includes(v(`${t}:${n}`))}function Ye(t,n){return t==="clueless"?_(t,n)===1:v(`${t}:${n}`)==="2"}const Ve=["easy","medium","hard"];function qe(t,n){const r=v(`clueless:${t}:${n}:bestAttempts`);if(r!=null){const l=parseInt(r,10);if(l>=1&&l<=99)return l}if(n==="medium"){const l=_("clueless",t);if(l!=null)return l}return null}function Je(t){return Ve.map(n=>qe(t,n))}function Y(t){const n=t.split("-").map(Number);if(n.length!==3||n.some(Number.isNaN))return"";const[r,l,i]=n,d=Date.UTC(r,l-1,i,12,0,0),p=new Date(d).toLocaleString("en-US",{timeZone:"America/Los_Angeles"}).split(",")[0]?.trim()??"";return p?`${p}-targets`:""}function pe(t){const n=Y(t);if(!n)return 0;try{const r=v(n);if(!r)return 0;const l=JSON.parse(r);return Array.isArray(l)?l.filter(i=>i!=null&&i.solution!=null).length:0}catch{return 0}}function Xe(t){const n=Y(t);if(!n)return null;try{const r=v(n);if(!r)return null;const l=JSON.parse(r);return Array.isArray(l)?l:null}catch{return null}}function Qe(t){const n=Y(t);if(!n)return null;const r=n.replace(/-targets$/,"");try{const l=v(`${r}-solveElapsedMs`);if(l==null)return null;const i=parseInt(l,10);return Number.isFinite(i)?i:null}catch{return null}}const Ke=365;function et(t,n,r){return t==="allten"?pe(r)>0:W(t)?Ce(t,r):n?de(t,r):ce(t,r).some(Boolean)}const tt=new Set(["sumtiles","productiles"]);function st({gameKey:t,completions:n,perfects:r,moveCounts:l,tierSlots:i}){const d=tt.has(t),p=n??[!1,!1,!1],z=r??[!1,!1,!1],k=l??[null,null,null],m=i??[0,1,2];return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:m.map(x=>{const c=p[x],g=z[x],T=k[x]!=null?k[x]:null,f=c?d?T!=null?String(Math.min(T,99)):"✓":g?"★":"✓":e.jsx(G,{count:x+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:c?"#6b9b3b":N,color:c?"#fff":S,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:f},x)})})}function nt({completed:t,perfect:n,attempts:r,failed:l}){const i=r!=null||l,d=i?r!=null:t,p=i&&r!=null,z=i&&l&&r==null,k=p?"#6b9b3b":z?"#374151":d?"#6b9b3b":N,m=i?r!=null?r===1?"★":String(Math.min(r,99)):l?"•":"1":t?n?"★":"✓":"1";return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:k,color:p||z||d?"#fff":S,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:m})})}function rt({attempts:t,tierSlots:n}){const r=n??[0,1,2];return e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:r.map(l=>{const i=t?.[l]??null,d=i!=null,p=d?i===1?"★":String(Math.min(i,99)):e.jsx(G,{count:l+1,size:20});return e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:d?"#6b9b3b":N,color:d?"#fff":S,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:p},l)})})}const y=[{key:"allten",href:`${E}puzzlegames/allten/`,Icon:Fe,title:"All Ten",desc:"Make each target from 1 to 10."},{key:"scurry",href:`${E}puzzlegames/scurry/`,Icon:ae,title:"Scurry",desc:"Place bugs to fill every target square."},{key:"clueless",href:`${E}puzzlegames/clueless/`,Icon:Ae,title:"Clueless",desc:"Complete six crossing words without clues.",single:!1},{key:"folds",href:`${E}puzzlegames/folds/`,Icon:le,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"honeycombs",href:`${E}puzzlegames/honeycombs/`,Icon:$e,title:"Honeycombs",desc:"Fill each honeycomb to form a connected path."},{key:"sumtiles",href:`${E}puzzlegames/sumtiles/`,Icon:ie,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${E}puzzlegames/productiles/`,Icon:Ne,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],lt=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});function mt(){const t=o.useMemo(()=>Pe(),[]),[n,r]=o.useState(()=>D()),[l,i]=o.useState(!1),d=o.useCallback(()=>r(D()),[]),p=o.useMemo(()=>Object.fromEntries(y.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,ce(s.key,t)])),[t]),z=o.useMemo(()=>Object.fromEntries(y.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,Ue(s.key,t)])),[t]),k=o.useMemo(()=>Object.fromEntries(y.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,We(s.key,t)])),[t]),m=o.useMemo(()=>Je(t),[t]),x=o.useMemo(()=>Object.fromEntries(y.filter(s=>s.single).map(s=>[s.key,de(s.key,t)])),[t]),c=o.useMemo(()=>Object.fromEntries(y.filter(s=>s.single).map(s=>[s.key,Ye(s.key,t)])),[t]),g=o.useMemo(()=>Object.fromEntries(y.filter(s=>s.single).map(s=>[s.key,_(s.key,t)])),[t]),T=o.useMemo(()=>Object.fromEntries(y.filter(s=>s.single).map(s=>[s.key,Ge(s.key,t)])),[t]),[f,I]=o.useState(0),$=o.useMemo(()=>Object.fromEntries(y.map(s=>[s.key,Oe(a=>et(s.key,!!s.single,a),Ke)])),[f,n]),u=o.useMemo(()=>pe(t),[t,f]),M=o.useMemo(()=>y.filter(s=>K(s.key,n)),[n]),R=o.useMemo(()=>y.filter(s=>!K(s.key,n)),[n]),P=o.useMemo(()=>y.map(({key:s,title:a,Icon:j})=>({key:s,title:a,Icon:j})),[]),[O,B]=o.useState(null),[ue,V]=o.useState(!1),[he,q]=o.useState(!1),w=o.useRef(null);U.useEffect(()=>()=>{w.current&&clearTimeout(w.current)},[]),U.useEffect(()=>{const s=()=>I(b=>b+1),a=()=>{document.visibilityState==="visible"&&s()},j=b=>{b.persisted&&s()};document.addEventListener("visibilitychange",a),window.addEventListener("pageshow",j);const C=b=>{s(),b.key===Me&&d()};return window.addEventListener("storage",C),()=>{document.removeEventListener("visibilitychange",a),window.removeEventListener("pageshow",j),window.removeEventListener("storage",C)}},[d]);const F=o.useCallback((s,a)=>s==="allten"?u>0:a?x[s]:Le(s,t),[u,t,x]),me=o.useCallback((s,a,j)=>{if(s.preventDefault(),s.stopPropagation(),!F(a,j)||!y.find(h=>h.key===a))return;const b=a==="allten"?(()=>{const h=Xe(t),L=new Date,A=Qe(t);if(h&&h.length)return Se(h,L,A??void 0);const Z=A!=null&&Number.isFinite(A)?`
${ve(A)}`:"";return`All Ten #${je(L)}
${u}/10${Z}
`})():He(a,t,E);navigator.clipboard.writeText(b).then(()=>{w.current&&clearTimeout(w.current),B({key:a,preview:b,fadeOut:!1}),w.current=setTimeout(()=>{B(h=>h?{...h,fadeOut:!0}:null),w.current=null},we)})},[t,u,F]),fe=o.useCallback(()=>{w.current&&(clearTimeout(w.current),w.current=null),B(null)},[]);return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;900&display=swap');

                :root {
                    --bg: #ffffff;
                    --text: var(--puzzle-ink);
                    --muted: var(--puzzle-ink-muted);
                    --hairline: #e7e7e7;
                    --tile: #f4f4f4;
                    --tileHover: #eeeeee;
                    --shadow: 0 1px 0 rgba(26, 61, 91, 0.06);
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
                    background: rgba(26, 61, 91, 0.06);
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
                    outline: 3px solid rgba(26, 61, 91, 0.35);
                    outline-offset: 3px;
                }

                .hp-cardWrapper {
                    display: flex;
                    align-items: stretch;
                    position: relative;
                }
                .hp-cardWrapper .hp-card { flex: 1; min-width: 0; }
                /* Let the row shrink on narrow viewports; default flex min-width:auto was forcing overflow. */
                .hp-cardWrapper .hp-shareCol { min-width: 0; }

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
                .hp-shareBtn:hover:not(:disabled) { background: var(--puzzle-ink-hover); }
                .hp-shareBtn:focus-visible {
                    outline: 3px solid rgba(26, 61, 91, 0.45);
                    outline-offset: 2px;
                }
                .hp-shareBtn:disabled {
                    background: var(--puzzle-surface-incomplete, #d4d9e5);
                    color: var(--puzzle-ink, #1a3d5b);
                    cursor: default;
                    filter: none;
                }
                .hp-shareBtn:disabled:hover {
                    background: var(--puzzle-surface-incomplete, #d4d9e5);
                }

                .toast-panel {
                    max-width: 420px;
                    background: rgba(26, 61, 91, 0.95);
                    color: var(--white);
                    padding: 14px 16px;
                    border-radius: 12px;
                    box-shadow: 0 10px 28px rgba(26, 61, 91, 0.25);
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

                .hp-tiles-section { margin-top: 22px; }
                .hp-section-label {
                    font-size: 0.72rem;
                    font-weight: 900;
                    letter-spacing: 0.12em;
                    color: var(--puzzle-ink-muted);
                    margin-bottom: 10px;
                }
                .hp-tile-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
                    gap: 10px;
                }
                a.hp-tile {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    padding: 10px 6px;
                    border-radius: var(--radius);
                    text-decoration: none;
                    color: inherit;
                    background: var(--tile);
                    box-shadow: var(--shadow);
                    min-height: 88px;
                    transition: background 140ms ease, transform 140ms ease;
                }
                a.hp-tile:hover {
                    background: var(--tileHover);
                    transform: translateY(-1px);
                }
                .hp-tile-title {
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 0.06em;
                    text-align: center;
                    line-height: 1.2;
                    color: var(--puzzle-ink-soft);
                }
            `}),e.jsxs("div",{className:"hp-shell",children:[e.jsx("div",{style:{flexShrink:0,width:"100%"},children:e.jsx(ze,{title:"PUZZLES",showHome:!1,showStats:!1,titleOpensLinks:!0,onSettings:()=>i(!0),onCube:()=>q(!0),onHelp:()=>V(!0)})}),e.jsxs("main",{className:"hp-page",children:[e.jsxs("header",{className:"hp-intro",children:[e.jsx("p",{className:"hp-tagline",children:"Daily puzzles for the breakfast table, the car ride, or the classroom warm-up."}),e.jsx("div",{className:"hp-date",children:lt})]}),e.jsx("div",{className:"hp-divider"}),e.jsx("div",{className:"hp-section-label",children:"MY PUZZLES"}),e.jsx("section",{className:"hp-list",children:M.map(({key:s,href:a,Icon:j,title:C,desc:b,single:h})=>{const L=W(s)?ke(s,n):[0,1,2],A=s==="allten"||h?a:s==="clueless"?ee(a,m,n):te(a,p[s],n),Z=F(s,h);return e.jsxs("div",{className:"hp-cardWrapper",children:[e.jsxs("a",{className:"hp-card",href:A,children:[e.jsx("div",{className:"hp-iconTile",children:e.jsx(j,{size:56})}),e.jsxs("div",{className:"hp-meta",children:[e.jsx("div",{className:"hp-cardTitle",children:C}),e.jsx("div",{className:"hp-desc",children:b}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[s==="allten"?u>0?e.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:e.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:u>=10?"#6b9b3b":N,color:u>=10?"#fff":S,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":`${u} of 10 targets solved`,children:u})}):null:s==="clueless"?e.jsx(rt,{attempts:m,tierSlots:L}):h?e.jsx(nt,{completed:x[s],perfect:c[s],attempts:g[s],failed:T[s]}):e.jsx(st,{gameKey:s,completions:p[s],perfects:z[s],moveCounts:k[s],tierSlots:L}),$[s]>0&&e.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",$[s]]})]})]})]}),e.jsxs("div",{className:"hp-shareCol",style:{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",alignSelf:"flex-start"},children:[e.jsxs("button",{type:"button",className:"hp-shareBtn",disabled:!Z,onClick:H=>me(H,s,h),"aria-label":Z?"Share results":"Share results (no progress yet)",children:[e.jsx(Te,{size:18}),"Share"]}),O?.key===s&&e.jsx(Ee,{preview:O.preview,fadeOut:O.fadeOut,align:"end",onDismiss:fe,onTransitionEnd:H=>{H.target!==H.currentTarget||H.propertyName!=="opacity"||B(J=>J?.fadeOut?null:J)}})]})]},a)})}),R.length>0?e.jsxs("section",{className:"hp-tiles-section","aria-label":"Other puzzles",children:[e.jsx("div",{className:"hp-section-label",children:"OTHER PUZZLES"}),e.jsx("div",{className:"hp-tile-grid",children:R.map(({key:s,href:a,Icon:j,title:C,single:b})=>{const h=s==="allten"||b?a:s==="clueless"?ee(a,m,n):te(a,p[s],n);return e.jsxs("a",{className:"hp-tile",href:h,children:[e.jsx(j,{size:40}),e.jsx("span",{className:"hp-tile-title",children:C.toUpperCase()})]},s)})})]}):null]})]}),e.jsx(_e,{show:l,onClose:()=>i(!1),games:P,onSaved:d}),e.jsx(Ie,{show:he,onClose:()=>q(!1)}),ue&&e.jsx("div",{className:"hp-instructions-overlay",role:"dialog","aria-modal":"true","aria-label":"How progress works",children:e.jsxs("div",{className:"hp-modal-content",children:[e.jsx("button",{type:"button",className:"hp-modal-close",onClick:()=>V(!1),"aria-label":"Close",children:"✕"}),e.jsx("h2",{className:"hp-modal-title",style:{fontSize:"1.5rem",fontWeight:900},children:"Puzzle Info"}),e.jsxs("div",{className:"hp-modal-icons","aria-hidden":!0,children:[e.jsx(ae,{size:48}),e.jsx(le,{size:48}),e.jsx(ie,{size:48})]}),e.jsxs("div",{className:"hp-modal-body",children:[e.jsx("p",{children:"Each day has puzzles of each type listed in order from easiest to hardest."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Progress"})," boxes show how you did on today's puzzles:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Green"})," indicates completed puzzles."," "]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Numbers"})," in completed puzzles indicate moves or guesses used."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Stars"})," in unnumbered puzzles indicate perfect solves made without using check, undo, or reset, or deletions on Honeycombs."]})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Share"})," copies your results to the clipboard."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Streaks"})," for each puzzle type are maintained by completing your selected daily set (all enabled difficulties) each day."]})]})]})})]})}export{mt as default};
