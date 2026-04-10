import{r as o,R as q,j as t}from"./client-Dgtgdm0G.js";import{h as $,F as se,M as ne,P as x,f as H,l as R,D as U,m as J,w as B,t as ie,b as I,o as le,q as F,T as re,a as oe,s as W,u as G,A as ae,k as ce,i as de}from"./AllTenLinksModal-DDqGnUtC.js";import{I as pe}from"./FoldsIcon-RxdmIz5N.js";import{I as ue}from"./ProductilesIcon-VgVuCZqT.js";import{I as he}from"./SumTilesIcon-BV-rSkI6.js";import{I as fe}from"./CluelessIcon-_a-FJVWi.js";import{I as me}from"./HoneycombsIcon-Cy6Gh6Yc.js";import{a as xe,c as ge}from"./dailyPuzzleDate-BAelgcXQ.js";const be={display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid rgba(26, 61, 91, 0.12)"},ye="#6b9b3b",X=e=>({width:"44px",height:"26px",borderRadius:"999px",border:"none",padding:0,cursor:"pointer",background:e?x:I,position:"relative",flexShrink:0,transition:"background 0.2s"}),Se=e=>({...X(e),background:e?ye:I}),Y=e=>({position:"absolute",top:"3px",left:e?"22px":"3px",width:"20px",height:"20px",borderRadius:"50%",background:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,0.2)",transition:"left 0.2s"}),V={width:"32px",height:"32px",borderRadius:"6px",border:"none",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s, color 0.2s"};function ve(e,n){return e?{...V,cursor:"pointer",background:n?x:I,color:n?"#fff":x}:{...V,cursor:"default",background:le,color:J}}function je({show:e,onClose:n,games:i,onSaved:l}){const[r,c]=o.useState(()=>$()),d=o.useCallback(()=>{const a=$();c(a),l?.()},[l]);q.useEffect(()=>{e&&c($())},[e]);const v=(a,f)=>{B({puzzleOn:{[a]:!!f}}),d()},j=(a,f)=>{const k=!R(a,r)[f];ie(a,f,k,r)&&d()},u=r.timerOn!==!1,b=()=>{B({timerOn:!u}),d()};return t.jsxs(se,{show:e,onClose:n,intent:ne.SETTINGS,contentClassName:"suite-settings-shell",children:[t.jsx("h2",{className:"suite-settings-title",style:{margin:"0 0 8px",fontSize:"1.35rem",fontWeight:900,letterSpacing:"0.06em",textAlign:"center",color:x},children:"SETTINGS"}),t.jsxs("div",{style:{marginBottom:"18px"},children:[t.jsx("div",{style:{fontSize:"0.78rem",fontWeight:900,letterSpacing:"0.14em",color:x,marginBottom:"6px"},children:"MY PUZZLES"}),t.jsx("p",{style:{margin:0,fontSize:"0.95rem",lineHeight:1.45,color:"var(--puzzle-ink-soft, #4a5f72)"},children:"Choose which puzzles appear on your dashboard."})]}),t.jsx("div",{style:{margin:"0 -4px",padding:"0 4px"},children:i.map(({key:a,title:f,Icon:w})=>{const h=r.puzzleOn[a]!==!1,k=H(a)?R(a,r):null,C="108px";return t.jsxs("div",{style:be,children:[t.jsx("div",{style:{width:"40px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"},"aria-hidden":!0,children:w?t.jsx(w,{size:32}):null}),t.jsx("div",{style:{flex:1,minWidth:0,fontWeight:800,fontSize:"0.95rem",color:x},children:f}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexShrink:0},children:[t.jsx("button",{type:"button","aria-label":h?`Turn off ${f}`:`Turn on ${f}`,onClick:()=>v(a,!h),style:X(h),children:t.jsx("span",{style:Y(h)})}),k?t.jsx("div",{style:{display:"flex",gap:"6px",width:C,justifyContent:"flex-end"},children:[0,1,2].map(m=>{const E=k[m],P=k.filter(Boolean).length===1&&E,N=h&&!(P&&E),Z=h?E?"#fff":void 0:J;return t.jsx("button",{type:"button",disabled:!N,title:["Easy","Medium","Hard"][m],"aria-label":`${["Easy","Medium","Hard"][m]} ${E?"on":"off"}`,onClick:()=>N&&j(a,m),style:{...ve(h,E),cursor:N?"pointer":"default"},children:t.jsx(U,{count:m+1,size:18,color:Z})},m)})}):t.jsx("div",{style:{width:C,flexShrink:0},"aria-hidden":!0})]})]},a)})}),t.jsxs("div",{style:{marginTop:"18px",paddingTop:"18px",borderTop:"1px solid rgba(26, 61, 91, 0.12)",display:"flex",justifyContent:"center",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[t.jsx("button",{type:"button","aria-label":u?"Turn timer off":"Turn timer on",onClick:b,style:Se(u),children:t.jsx("span",{style:Y(u)})}),t.jsx("i",{className:"fa-solid fa-clock",style:{fontSize:"1.15rem",lineHeight:1,color:x},"aria-hidden":!0}),t.jsx("span",{style:{fontWeight:900,fontSize:"0.72rem",letterSpacing:"0.12em",color:x},children:u?"TIMER ON":"TIMER OFF"})]})]})}function we({size:e=28,className:n="",bodyFill:i="#ea1e31"}){return t.jsxs("svg",{width:e,height:e,viewBox:"0 0 150 150",className:n,xmlns:"http://www.w3.org/2000/svg",children:[t.jsx("path",{d:"M140.34,80.4h-11.15c-.53-8.15-2.86-15.8-6.62-22.55l12.89-5.95c1.76-.81,2.53-2.91,1.72-4.67h0c-.81-1.76-2.91-2.53-4.67-1.72l-13.79,6.36c-7.41-9.96-18.19-17.24-30.64-20.21l3.24-8.15c3.31-.57,5.75-3.54,5.56-6.98-.2-3.71-3.37-6.55-7.07-6.36-3.71.2-6.55,3.37-6.36,7.08.07,1.38.56,2.63,1.33,3.66l-3.8,9.54c-1.77-.18-3.57-.27-5.39-.27-2.2,0-4.37.15-6.5.41l-3.85-9.68c.77-1.03,1.25-2.28,1.33-3.66.2-3.71-2.65-6.88-6.36-7.08-3.71-.2-6.88,2.65-7.08,6.36-.18,3.44,2.25,6.41,5.56,6.98l3.34,8.4c-12.17,3.16-22.66,10.49-29.87,20.36l-14.67-6.77c-1.76-.81-3.86-.04-4.67,1.72h0c-.81,1.76-.04,3.86,1.72,4.67l13.81,6.37c-3.62,6.65-5.86,14.16-6.38,22.13h-12.31c-1.94,0-3.52,1.58-3.52,3.52h0c0,1.94,1.58,3.52,3.52,3.52h12.31c.54,8.33,2.97,16.14,6.88,23l-14.31,6.6c-1.76.81-2.53,2.91-1.72,4.67s2.91,2.53,4.67,1.72l15.28-7.05c9.81,12.92,25.34,21.27,42.81,21.27s32.67-8.18,42.5-20.87l14.43,6.66c1.76.81,3.86.04,4.67-1.72s.04-3.86-1.72-4.67l-13.39-6.18c4.05-6.97,6.57-14.93,7.12-23.43h11.15c1.94,0,3.52-1.58,3.52-3.52h0c0-1.94-1.58-3.52-3.52-3.52Z"}),t.jsx("path",{fill:i,d:"M106.29,47.34c-8.52,4.24-19.16,6.77-30.71,6.77s-22.19-2.53-30.71-6.77c-10.42,8.76-17.06,21.89-17.06,36.58,0,23.54,17.03,43.09,39.44,47.03l8.33-54.21,8.33,54.21c22.41-3.94,39.44-23.49,39.44-47.03,0-14.68-6.63-27.81-17.06-36.58ZM49.31,108.21c-4.66,0-8.44-3.78-8.44-8.44s3.78-8.44,8.44-8.44,8.44,3.78,8.44,8.44-3.78,8.44-8.44,8.44ZM54.65,74.21c-3.71,0-6.73-3.01-6.73-6.73s3.01-6.73,6.73-6.73,6.73,3.01,6.73,6.73-3.01,6.73-6.73,6.73ZM89.78,67.49c0-3.71,3.01-6.73,6.73-6.73s6.73,3.01,6.73,6.73-3.01,6.73-6.73,6.73-6.73-3.01-6.73-6.73ZM101.85,108.21c-4.66,0-8.44-3.78-8.44-8.44s3.78-8.44,8.44-8.44,8.44,3.78,8.44,8.44-3.78,8.44-8.44,8.44Z"})]})}function ze({size:e=28,className:n=""}){return t.jsxs("svg",{width:e,height:e,viewBox:"0 0 150 150",className:n,xmlns:"http://www.w3.org/2000/svg",children:[t.jsxs("g",{children:[t.jsx("path",{fill:"#2571b1",d:"M115.97,111.58c-4.56,0-8.4-1.3-11.73-3.96-3.37-2.7-5.99-6.75-7.79-12.06-1.87-5.48-2.82-12.46-2.82-20.74s.95-15.26,2.82-20.74c1.79-5.28,4.4-9.26,7.76-11.85,3.33-2.57,7.13-3.82,11.59-3.82s8.54,1.27,11.81,3.88c3.32,2.65,5.94,6.68,7.79,11.99,1.92,5.5,2.9,12.47,2.9,20.71s-.98,15.07-2.9,20.64c-1.85,5.36-4.47,9.42-7.79,12.07-3.27,2.61-7.08,3.88-11.65,3.88Z"}),t.jsx("path",{d:"M115.8,40.92c4.09,0,7.44,1.09,10.26,3.33,2.95,2.35,5.3,6,6.99,10.86,1.83,5.24,2.76,11.93,2.76,19.88s-.93,14.52-2.77,19.83c-1.69,4.9-4.04,8.58-6.99,10.93-2.81,2.24-6.11,3.33-10.09,3.33s-7.3-1.12-10.16-3.41c-2.99-2.39-5.34-6.06-6.99-10.92-1.78-5.22-2.69-11.93-2.69-19.93s.9-14.71,2.69-19.94c1.63-4.8,3.96-8.39,6.91-10.67,2.88-2.22,6.18-3.3,10.07-3.3M115.8,35.92c-4.99,0-9.36,1.44-13.12,4.34-3.76,2.9-6.63,7.24-8.6,13.02-1.98,5.8-2.95,12.98-2.95,21.55s.98,15.75,2.95,21.55c1.97,5.78,4.83,10.19,8.6,13.2,3.76,3.01,8.19,4.51,13.29,4.51s9.5-1.47,13.2-4.42c3.7-2.95,6.57-7.35,8.6-13.2,2.02-5.85,3.04-13.01,3.04-21.46s-1.02-15.75-3.04-21.53c-2.02-5.8-4.89-10.16-8.6-13.12-3.7-2.95-8.17-4.42-13.37-4.42h0Z"})]}),t.jsxs("g",{children:[t.jsx("path",{fill:"#2571b1",d:"M36.05,135.73V33.09H11.69V14.27h81.73c-1.99.97-3.92,2.08-5.78,3.33-8.2,5.48-14.74,13.23-19.45,23.05-4.66,9.75-7.02,21.25-7.02,34.18s2.39,24.32,7.12,34.18c4.73,9.9,11.37,17.75,19.71,23.32,1.92,1.28,3.9,2.42,5.93,3.41h-57.88Z"}),t.jsx("path",{d:"M84.46,16.77c-7.74,5.63-13.96,13.29-18.53,22.8-4.82,10.09-7.26,21.95-7.26,35.25s2.48,25.06,7.36,35.25c4.61,9.64,10.96,17.42,18.89,23.15h-46.38V30.59H14.19v-13.82h70.27M115.97,11.77H9.19v23.82h24.36v102.64h82.59c-9.84,0-18.76-2.66-26.75-7.99-7.99-5.33-14.28-12.77-18.84-22.32-4.58-9.56-6.87-20.58-6.87-33.1s2.26-23.65,6.77-33.1c4.52-9.43,10.72-16.79,18.59-22.05,7.87-5.27,16.96-7.9,26.93-7.9h0Z"})]})]})}const T="/puzzles/";function S(e){try{return localStorage.getItem(e)}catch{return null}}function Q(e,n){return[0,1,2].map(i=>["1","2"].includes(S(`${e}:${n}:${i}`)))}function ke(e,n){return[0,1,2].map(i=>S(`${e}:${n}:${i}`)==="2")}function Ee(e,n){return[0,1,2].map(i=>{const l=S(`${e}:${n}:${i}:moves`);return l!=null?parseInt(l,10):null})}function O(e,n){if(e!=="clueless")return null;const i=S(`clueless:${n}:bestAttempts`);if(i==null)return null;const l=parseInt(i,10);return l>=1&&l<=99?l:null}function Te(e,n){return e!=="clueless"?!1:S(`clueless:${n}:failed`)==="1"}function K(e,n){return e==="clueless"?O(e,n)!=null:["1","2"].includes(S(`${e}:${n}`))}function Ie(e,n){return e==="clueless"?O(e,n)===1:S(`${e}:${n}`)==="2"}const Me=["easy","medium","hard"];function Ce(e,n){const i=S(`clueless:${e}:${n}:bestAttempts`);if(i!=null){const l=parseInt(i,10);if(l>=1&&l<=99)return l}if(n==="medium"){const l=O("clueless",e);if(l!=null)return l}return null}function Ne(e){return Me.map(n=>Ce(e,n))}function $e(e){const n=e.split("-").map(Number);if(n.length!==3||n.some(Number.isNaN))return"";const[i,l,r]=n,c=Date.UTC(i,l-1,r,12,0,0),d=new Date(c).toLocaleString("en-US",{timeZone:"America/Los_Angeles"}).split(",")[0]?.trim()??"";return d?`${d}-targets`:""}function ee(e){const n=$e(e);if(!n)return 0;try{const i=S(n);if(!i)return 0;const l=JSON.parse(i);return Array.isArray(l)?l.filter(r=>r!=null&&r.solution!=null).length:0}catch{return 0}}const Pe=365;function Ae(e,n,i){return e==="allten"?ee(i)>0:H(e)?de(e,i):n?K(e,i):Q(e,i).some(Boolean)}function L(){return t.jsx("span",{style:{display:"inline-block",transform:"translateY(-1px)"},"aria-hidden":"true",children:"★"})}const Le=new Set(["sumtiles","productiles"]);function Oe({gameKey:e,completions:n,perfects:i,moveCounts:l,tierSlots:r}){const c=Le.has(e),d=n??[!1,!1,!1],v=i??[!1,!1,!1],j=l??[null,null,null],u=r??[0,1,2];return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:u.map(b=>{const a=d[b],f=v[b],w=j[b]!=null?j[b]:null,h=a?c?w!=null?String(Math.min(w,99)):"✓":f?t.jsx(L,{}):"✓":t.jsx(U,{count:b+1,size:20});return t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:a?"#6b9b3b":I,color:a?"#fff":x,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:h},b)})})}function Ze({completed:e,perfect:n,attempts:i,failed:l}){const r=i!=null||l,c=r?i!=null:e,d=r&&i!=null,v=r&&l&&i==null,j=d?"#6b9b3b":v?"#374151":c?"#6b9b3b":I,u=r?i!=null?i===1?t.jsx(L,{}):String(Math.min(i,99)):l?"•":"1":e?n?t.jsx(L,{}):"✓":"1";return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:j,color:d||v||c?"#fff":x,fontWeight:900,fontSize:"1.06rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:u})})}function He({attempts:e,tierSlots:n}){const i=n??[0,1,2];return t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:i.map(l=>{const r=e?.[l]??null,c=r!=null,d=c?r===1?t.jsx(L,{}):String(Math.min(r,99)):t.jsx(U,{count:l+1,size:20});return t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:c?"#6b9b3b":I,color:c?"#fff":x,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s"},children:d},l)})})}const g=[{key:"allten",href:`${T}puzzlegames/allten/`,Icon:ze,title:"All Ten",desc:"Make each target from 1 to 10."},{key:"scurry",href:`${T}puzzlegames/scurry/`,Icon:we,title:"Scurry",desc:"Place bugs to fill every target square."},{key:"clueless",href:`${T}puzzlegames/clueless/`,Icon:fe,title:"Clueless",desc:"Complete six crossing words without clues.",single:!1},{key:"folds",href:`${T}puzzlegames/folds/`,Icon:pe,title:"Folds",desc:"Reflect triangles to match the target pattern."},{key:"honeycombs",href:`${T}puzzlegames/honeycombs/`,Icon:me,title:"Honeycombs",desc:"Fill each honeycomb to form a connected path."},{key:"sumtiles",href:`${T}puzzlegames/sumtiles/`,Icon:he,title:"Sum Tiles",desc:"Slide tiles so every row and column hits its sum."},{key:"productiles",href:`${T}puzzlegames/productiles/`,Icon:ue,title:"Productiles",desc:"Slide tiles so every row and column hits its product."}],Ue=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});function Ve(){const e=o.useMemo(()=>xe(),[]),[n,i]=o.useState(()=>$()),[l,r]=o.useState(!1),c=o.useCallback(()=>i($()),[]),d=o.useMemo(()=>Object.fromEntries(g.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,Q(s.key,e)])),[e]),v=o.useMemo(()=>Object.fromEntries(g.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,ke(s.key,e)])),[e]),j=o.useMemo(()=>Object.fromEntries(g.filter(s=>!s.single&&s.key!=="clueless"&&s.key!=="allten").map(s=>[s.key,Ee(s.key,e)])),[e]),u=o.useMemo(()=>Ne(e),[e]),b=o.useMemo(()=>Object.fromEntries(g.filter(s=>s.single).map(s=>[s.key,K(s.key,e)])),[e]),a=o.useMemo(()=>Object.fromEntries(g.filter(s=>s.single).map(s=>[s.key,Ie(s.key,e)])),[e]),f=o.useMemo(()=>Object.fromEntries(g.filter(s=>s.single).map(s=>[s.key,O(s.key,e)])),[e]),w=o.useMemo(()=>Object.fromEntries(g.filter(s=>s.single).map(s=>[s.key,Te(s.key,e)])),[e]),[h,k]=o.useState(0),C=o.useMemo(()=>Object.fromEntries(g.map(s=>[s.key,ge(p=>Ae(s.key,!!s.single,p),Pe)])),[h,n]),m=o.useMemo(()=>ee(e),[e,h]),E=o.useMemo(()=>g.filter(s=>F(s.key,n)),[n]),P=o.useMemo(()=>g.filter(s=>!F(s.key,n)),[n]),N=o.useMemo(()=>g.map(({key:s,title:p,Icon:z})=>({key:s,title:p,Icon:z})),[]),[Z,_]=o.useState(!1);return q.useEffect(()=>{const s=()=>k(y=>y+1),p=()=>{document.visibilityState==="visible"&&s()},z=y=>{y.persisted&&s()};document.addEventListener("visibilitychange",p),window.addEventListener("pageshow",z);const M=y=>{s(),y.key===ce&&c()};return window.addEventListener("storage",M),()=>{document.removeEventListener("visibilitychange",p),window.removeEventListener("pageshow",z),window.removeEventListener("storage",M)}},[c]),t.jsxs(t.Fragment,{children:[t.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;900&display=swap');

                :root {
                    --bg: #ffffff;
                    --text: var(--puzzle-ink);
                    --muted: var(--puzzle-ink-muted);
                    --hairline: #e7e7e7;
                    --tile: #f4f4f4;
                    --tileHover: #eeeeee;
                    --shadow: 0 1px 0 rgba(26, 61, 91, 0.06);
                    /* MY PUZZLES title cards — cool light gray, softer chrome */
                    --hp-card-bg: #f7f8f9;
                    --hp-card-hover: #f1f3f5;
                    --hp-card-shadow: 0 1px 0 rgba(26, 61, 91, 0.04);
                    --hp-card-focus: rgba(26, 61, 91, 0.26);
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
                    background: var(--hp-card-bg);
                    box-shadow: var(--hp-card-shadow);
                    transition: background 140ms ease, transform 140ms ease, box-shadow 140ms ease;
                }

                a.hp-card:hover {
                    background: var(--hp-card-hover);
                    box-shadow: 0 1px 0 rgba(26, 61, 91, 0.055);
                    transform: translateY(-1px);
                }

                a.hp-card:active {
                    transform: translateY(0px);
                    box-shadow: var(--hp-card-shadow);
                }

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
                    outline: 3px solid var(--hp-card-focus);
                    outline-offset: 3px;
                }

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
            `}),t.jsxs("div",{className:"hp-shell",children:[t.jsx("div",{style:{flexShrink:0,width:"100%"},children:t.jsx(re,{title:"PUZZLES",showHome:!1,showStats:!1,titleOpensLinks:!0,onSettings:()=>r(!0),onCube:()=>_(!0)})}),t.jsxs("main",{className:"hp-page",children:[t.jsxs("header",{className:"hp-intro",children:[t.jsx("p",{className:"hp-tagline",children:"Daily puzzles for the breakfast table, the car ride, or the classroom warm-up."}),t.jsx("div",{className:"hp-date",children:Ue})]}),t.jsx("div",{className:"hp-divider"}),t.jsx("div",{className:"hp-section-label",children:"MY PUZZLES"}),t.jsx("section",{className:"hp-list",children:E.map(({key:s,href:p,Icon:z,title:M,desc:y,single:A})=>{const D=H(s)?oe(s,n):[0,1,2],te=s==="allten"||A?p:s==="clueless"?W(p,u,n):G(p,d[s],n);return t.jsxs("a",{className:"hp-card",href:te,children:[t.jsx("div",{className:"hp-iconTile",children:t.jsx(z,{size:56})}),t.jsxs("div",{className:"hp-meta",children:[t.jsx("div",{className:"hp-cardTitle",children:M}),t.jsx("div",{className:"hp-desc",children:y}),t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"},children:[s==="allten"?m>0?t.jsx("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:t.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"6px",background:m>=10?"#6b9b3b":I,color:m>=10?"#fff":x,fontWeight:900,fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"},"aria-label":`${m} of 10 targets solved`,children:m})}):null:s==="clueless"?t.jsx(He,{attempts:u,tierSlots:D}):A?t.jsx(Ze,{completed:b[s],perfect:a[s],attempts:f[s],failed:w[s]}):t.jsx(Oe,{gameKey:s,completions:d[s],perfects:v[s],moveCounts:j[s],tierSlots:D}),C[s]>0&&t.jsxs("span",{style:{fontSize:"14px",color:"var(--muted)",lineHeight:1.35},children:["Streak: ",C[s]]})]})]})]},s)})}),P.length>0?t.jsxs("section",{className:"hp-tiles-section","aria-label":"Other puzzles",children:[t.jsx("div",{className:"hp-section-label",children:"OTHER PUZZLES"}),t.jsx("div",{className:"hp-tile-grid",children:P.map(({key:s,href:p,Icon:z,title:M,single:y})=>{const A=s==="allten"||y?p:s==="clueless"?W(p,u,n):G(p,d[s],n);return t.jsxs("a",{className:"hp-tile",href:A,children:[t.jsx(z,{size:40}),t.jsx("span",{className:"hp-tile-title",children:M.toUpperCase()})]},s)})})]}):null]})]}),t.jsx(je,{show:l,onClose:()=>r(!1),games:N,onSaved:c}),t.jsx(ae,{show:Z,onClose:()=>_(!1)})]})}export{Ve as default};
