(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5677],{93525:function(e,t,r){Promise.resolve().then(r.t.bind(r,63222,23)),Promise.resolve().then(r.bind(r,13754)),Promise.resolve().then(r.bind(r,38414)),Promise.resolve().then(r.bind(r,1130)),Promise.resolve().then(r.bind(r,59959)),Promise.resolve().then(r.bind(r,52347)),Promise.resolve().then(r.bind(r,17421)),Promise.resolve().then(r.bind(r,5274)),Promise.resolve().then(r.bind(r,75066)),Promise.resolve().then(r.bind(r,8757)),Promise.resolve().then(r.bind(r,7168)),Promise.resolve().then(r.bind(r,19045)),Promise.resolve().then(r.bind(r,44550)),Promise.resolve().then(r.bind(r,34722)),Promise.resolve().then(r.bind(r,17085)),Promise.resolve().then(r.bind(r,31575)),Promise.resolve().then(r.bind(r,76416)),Promise.resolve().then(r.bind(r,52270)),Promise.resolve().then(r.bind(r,91036)),Promise.resolve().then(r.bind(r,47876)),Promise.resolve().then(r.bind(r,19170)),Promise.resolve().then(r.bind(r,95972)),Promise.resolve().then(r.bind(r,6421)),Promise.resolve().then(r.bind(r,19804)),Promise.resolve().then(r.t.bind(r,46685,23)),Promise.resolve().then(r.bind(r,42556)),Promise.resolve().then(r.bind(r,77705))},42556:function(e,t,r){"use strict";r.r(t),r.d(t,{DewyLiveParser:function(){return F},GrammarCodeBlock:function(){return E},useDelayed:function(){return N},useStringBuffer:function(){return v}});var n=r(57437),s=r(13591),l=r(29430),i=r(77705),o=r(25567),a=r(35209);let d=(e,t)=>{if(e.startsWith("\\u")||e.startsWith("\\U")||e.startsWith("\\x")||e.startsWith("\\X")){let t=2;for(;t<e.length&&/[0-9a-fA-F]/.test(e[t]);)t++;return{type:"number",start:0,end:t}}},c=(e,t)=>{if(e.startsWith("\\"))return"n"==e[1]||"r"==e[1]||"t"==e[1]||"v"==e[1]||"b"==e[1]||"f"==e[1]||e[1],{type:"escape",start:0,end:2}},u={'"':'"',"'":"'","{":"}"},m=[(e,t)=>{let r=0;if(e.startsWith("/{")&&(t.block_comment_open_depth+=1,r=2),0!=t.block_comment_open_depth){for(;t.block_comment_open_depth>0&&r<e.length;){if(e.startsWith("/{",r)){t.block_comment_open_depth++,r+=2;continue}if(e.startsWith("}/",r)){t.block_comment_open_depth--,r+=2;continue}r++}return{type:"comment",start:0,end:r}}},(e,t)=>{if(e.startsWith("//")){let t=2;for(;t<e.length&&"\n"!=e[t];)t++;return{type:"comment",start:0,end:t}}},(e,t)=>e.startsWith("ϵ")?{type:"null",start:0,end:1}:e.startsWith("\\e")||e.startsWith("''")||e.startsWith('""')||e.startsWith("{}")?{type:"null",start:0,end:2}:void 0,(e,t)=>e.startsWith("\\u")||e.startsWith("\\U")||e.startsWith("\\x")||e.startsWith("\\X")?{type:"unit",start:0,end:2}:e.startsWith("V")||e.startsWith("U")||e.startsWith("ξ")?{type:"unit",start:0,end:1}:void 0,d,(e,t)=>{let r=0;for(;r<e.length&&/[0-9]/.test(e[r]);)r++;if(r>0)return{type:"number",start:0,end:r}},(e,t)=>{if(e.startsWith("#")){let t=1;for(;t<e.length&&/[a-zA-Z0-9_]/.test(e[t]);)t++;return{type:"tagName",start:0,end:t}}},(e,t)=>{if(e.startsWith("[")){let r=[{type:"bracket",start:0,end:1}],n=1;for(;n<e.length;){let s;if("\n"==e[n]||" "==e[n]){n++;continue}if((s=d(e.slice(n),t))||(s=c(e.slice(n),t))){s.start+=n,s.end+=n,r.push(s),n=s.end;continue}if("-"==e[n]){r.push({type:"operator",start:n,end:n+1}),n++;continue}if("["==e[n]&&(r.push({type:"invalid",start:n,end:n+1}),n++),"]"==e[n])return r.push({type:"bracket",start:n,end:n+1}),r;r.push({type:"literal",start:n,end:n+1}),n++}}},(e,t)=>{let r;if(e.length<=2)return;let n=e[0];if(!('"'==n||"'"==n||"{"==n))return;let s=u[n],l=1,i=[{type:"literal",start:0,end:1}];for(;l<e.length;){if((r=d(e.slice(l),t))||(r=c(e.slice(l),t))){r.start+=l,r.end+=l,i.push(r),l=r.end;continue}if(e[l]==s)return[...i,{type:"literal",start:l,end:l+1}];i.push({type:"literal",start:l,end:l+1}),l++}},(e,t)=>{if(e.startsWith("(")||e.startsWith(")"))return{type:"paren",start:0,end:1}},(e,t)=>{if(".*+?~".includes(e[0]))return{type:"logicOperator",start:0,end:1}},(e,t)=>{if("=|-/>".includes(e[0]))return{type:"operator",start:0,end:1}},(e,t)=>{if(";"==e[0])return{type:"punctuation",start:0,end:1}}],h=(0,i.get_lang_support)((e,t)=>(0,i.parse_lang)(e,t,()=>m),()=>({tokens:[],index:0,block_comment_open_depth:0})),f=(0,o.j)({theme:"light",settings:{background:"#232323",caret:"#AEAFAD",selection:"#356282",selectionMatch:"#00ff00",lineHighlight:"#333333"},styles:[{tag:a.pJ.comment,color:"#787b80"},{tag:a.pJ.literal,color:"#ce9178"},{tag:a.pJ.bracket,color:"#179fff"},{tag:a.pJ.escape,color:"#d7ba7d"},{tag:a.pJ.number,color:"#b5cea8"},{tag:a.pJ.tagName,color:"#9cdcfe"},{tag:a.pJ.null,color:"#00ff00"},{tag:a.pJ.unit,color:"#ff00ff"},{tag:a.pJ.paren,color:"#ffd700"},{tag:a.pJ.operator,color:"#ffffff"},{tag:a.pJ.punctuation,color:"#ffffff"},{tag:a.pJ.logicOperator,color:"#d44c4c"},{tag:a.pJ.invalid,color:"#ff0000"}]});var p=r(2265),x=r(74769);let v=()=>{let e=(0,p.useRef)(),[t,r]=(0,p.useState)();return[t,t=>{void 0===e.current&&(e.current=[]),e.current.push(t)},()=>{var t;r(null===(t=e.current)||void 0===t?void 0:t.join("\n"))},()=>{e.current=void 0,r(void 0)}]},g={"Parse Forest":"forest","RNGLR Table":"table","Item Sets":"grammarItems","Meta Scanner":"metascanner","Meta AST":"metaast",CFG:"metaparser","First Sets":"grammarFirsts"},b=Object.keys(g),w=b.map(e=>g[e]),y=e=>{var t,r;if(void 0===e)return;let[n,s,l,i,o,a,d]=e.split("".concat("<<<<<<<<<<<<")),[c,u]=null!==(t=null==i?void 0:i.split("itemsets:\n"))&&void 0!==t?t:[void 0,void 0],m=e.indexOf("ERROR: "),h=m>=0?e.slice(m):void 0,f=(null!==(r=null==a?void 0:a.indexOf("failure"))&&void 0!==r?r:-1)>=0;return{metascanner:null==n?void 0:n.trimEnd(),metaast:null==s?void 0:s.trimEnd(),metaparser:null==l?void 0:l.trimEnd(),grammarFirsts:null==c?void 0:c.slice(12).trimEnd(),grammarItems:null==u?void 0:u.trimEnd(),table:null==o?void 0:o.trimEnd(),result:null==a?void 0:a.trimEnd(),forest:f?"Parse failed":null==d?void 0:d.trimEnd(),grammarError:h}},j=(e,t)=>{let[r,n,s,l]=v(),i=(0,p.useRef)(null),o=(0,p.useCallback)(async()=>{let r="/wasm/dewy_old/dewy_parser_wrapper",l="".concat(r,".js");try{let o=await fetch(l),a=await fetch("".concat(r,".wasm"));if(!o.ok||!a.ok)throw Error("Failed to find script or WASM file at ".concat(r));i.current=document.createElement("script"),i.current.src=l,i.current.async=!0,i.current.onload=()=>{Module({onRuntimeInitialized:()=>{},print:n}).then(r=>{let n=r.cwrap("dewy_parser","void",["string","string"]);try{n(e,t)}catch(e){console.error(e)}finally{s()}})},document.body.appendChild(i.current)}catch(e){console.error(e),s()}},[e,t]);(0,p.useEffect)(()=>(o(),()=>{i.current&&(document.body.removeChild(i.current),i.current=null),l()}),[e,t]);let a=r?y(r):void 0;return a},N=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,[r,n]=(0,p.useState)(e),s=(0,p.useRef)();return(0,p.useEffect)(()=>{void 0!==s.current&&(window.clearTimeout(s.current),s.current=void 0),s.current=window.setTimeout(()=>{n(e),s.current=void 0},t)},[t,...e]),r},_=e=>{let{text:t,setText:r,onFocus:s,className:l=""}=e,i=(0,p.useRef)(null),o=()=>{if(i.current){i.current.style.height="0px";let e=i.current.scrollHeight;i.current.style.height=e+"px"}};return(0,p.useEffect)(()=>(o(),window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)),[t]),(0,n.jsx)("textarea",{ref:i,className:(0,x.m6)("hide-h-scrollbar overflow-y-hidden rounded-md font-mono resize-none overflow-x-auto whitespace-pre outline outline-1 outline-[#808080] focus:outline-2 focus:outline-white px-0.5",l),style:{minHeight:"1em"},value:t,spellCheck:!1,onChange:e=>{r(e.target.value)},onFocus:s})},F=e=>{let{grammars:t,initial_idx:r=0}=e;if(t.length<r)throw Error("initial_idx must be less than the number of grammars. initial_idx: ".concat(r,", grammars.length: ").concat(t.length));let[o,a]=(0,p.useState)(!1),[d,c]=(0,p.useState)(0),[u,m]=(0,p.useState)(t[r].source),[v,g]=(0,p.useState)(t[r].grammar),y=()=>{o||a(!0)},F=e=>{m(e),o||a(!0)},E=e=>{g(e),o||a(!0)},[W,k]=N([v,u]),S=j(W,k),C=o&&(null==S?void 0:S.result)==="failure",J=o&&(null==S?void 0:S.grammarError)!==void 0,O=o?"gap-x-[2%]":"gap-x-[5%]",R=o?"grid-cols-[4fr,0fr,5fr]":"grid-cols-[1fr,1fr]";return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:(0,x.m6)("max-md:hidden grid w-full",O,R),children:[(0,n.jsx)("div",{className:"flex flex-col justify-end",children:(0,n.jsx)(s.H4,{className:"mt-0",children:"Source Input"})}),o&&(0,n.jsx)(s.H4,{className:"mt-0 select-none",children:"\xa0"}),(0,n.jsx)("div",{className:"flex flex-col justify-end",children:(0,n.jsx)(s.H4,{className:"mt-0",children:"Grammar Specification"})}),(0,n.jsx)(_,{className:(0,x.m6)("w-full bg-[#232323] text-xl",C?"outline-[#FF0000] focus:outline-[#FF0000]":""),text:u,setText:F,onFocus:y}),o&&(0,n.jsxs)("div",{className:"flex whitespace-nowrap font-mono h-min select-none",children:[(0,n.jsx)("span",{className:"text-xl pr-1",children:"<"}),(0,n.jsx)("span",{className:"text-lg outline outline-1 outline-white px-1",children:"edit me"}),(0,n.jsx)("span",{className:"text-xl pl-1",children:">"})]}),(0,n.jsx)(i.CodeEditor,{className:(0,x.m6)("w-full bg-[#232323] text-xl",J?"outline outline-[#FF0000] focus:outline-[#FF0000]":""),language:h(),theme:f,text:v,setText:E,onFocus:y})]}),(0,n.jsxs)("div",{className:"md:hidden flex flex-col",children:[(0,n.jsx)(s.H4,{className:"mt-0",children:"Grammar Specification"}),(0,n.jsx)(i.CodeEditor,{className:(0,x.m6)("w-full bg-[#232323] text-lg hide-h-scrollbar overflow-y-hidden overflow-x-auto",J?"outline outline-[#FF0000] focus:outline-[#FF0000]":""),language:h(),theme:f,text:v,setText:E,onFocus:y}),(0,n.jsx)(s.H4,{children:"Source Input"}),(0,n.jsx)(_,{className:(0,x.m6)("w-full bg-[#232323] text-lg",C?"outline-[#FF0000] focus:outline-[#FF0000]":""),text:u,setText:F,onFocus:y})]}),!o&&(0,n.jsx)("div",{className:"flex flex-col justify-center pt-6",children:(0,n.jsx)("button",{className:"w-24 h-8 bg-[#232323] text-white rounded-md",onClick:()=>a(!o),children:"Try Me"})}),o&&(0,n.jsxs)("div",{className:"w-full my-6",children:[(0,n.jsx)(l.U,{title:"Examples",children:(0,n.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:t.map((e,t)=>(0,n.jsx)("button",{className:"font-gentona text-2xl px-4 h-[3.5em] whitespace-pre bg-[#232323] hover:bg-[#404040] text-white rounded-md",onClick:()=>{E(e.grammar),F(e.source)},children:P(e.label,22)},t))})}),(0,n.jsx)(l.U,{title:"Output",defaultOpen:!0,children:(0,n.jsxs)("div",{className:"flex flex-col w-full",children:[(0,n.jsx)("div",{className:"flex flex-row w-min max-w-full overflow-x-auto rounded-tl-md rounded-tr-md overflow-hidden border border-b-0 border-solid border-[#444444]",children:b.map((e,t)=>(0,n.jsx)("button",{className:"\n                                                font-gentona text-2xl px-4 h-[3.5em] whitespace-pre \n                                                ".concat(t!==d?"bg-[#000000] hover:bg-[#232323]":"bg-[#232323]","\n                                                text-white \n                                                border border-b-0 border-solid border-[#444444]\n                                            "),onClick:()=>{c(t)},children:P(e,22)},t))}),(0,n.jsx)("div",{className:"w-full bg-[#232323] text-white  rounded-b-md rounded-tr-md overflow-hidden border border-t-0 border-solid border-[#444444]",children:(0,n.jsx)("div",{className:"whitespace-pre w-full overflow-x-auto p-4 font-mono max-md:text-lg md:text-xl",children:S?S[w[d]]:"Loading..."})})]})})]})]})},P=(e,t)=>{if(e.length<=t)return e;let r=Math.floor(e.length/2),n=e.indexOf(" ",r),s=e.lastIndexOf(" ",r);if(-1===n&&-1===s)return e.slice(0,r)+"-\n-"+e.slice(r);if(-1===n)return e.slice(0,s)+"\n"+e.slice(s+1);if(-1===s)return e.slice(0,n)+"\n"+e.slice(n+1);let l=n-r,i=r-s;return l<i?e.slice(0,n)+"\n"+e.slice(n+1):e.slice(0,s)+"\n"+e.slice(s+1)},E=e=>{let{code:t}=e;return(0,n.jsx)(i.CodeEditor,{className:"w-full bg-[#232323] text-lg md:text-xl",language:h(),theme:f,text:t,readonly:!0,editable:!1,basicSetup:{highlightActiveLine:!1}})}}},function(e){e.O(0,[6401,6685,3222,8213,9659,8875,2971,596,1744],function(){return e(e.s=93525)}),_N_E=e.O()}]);