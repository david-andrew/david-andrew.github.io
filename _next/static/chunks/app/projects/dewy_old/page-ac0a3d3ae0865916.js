(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5677],{6014:function(e,t,r){Promise.resolve().then(r.t.bind(r,63222,23)),Promise.resolve().then(r.bind(r,38414)),Promise.resolve().then(r.bind(r,13754)),Promise.resolve().then(r.bind(r,52347)),Promise.resolve().then(r.bind(r,17421)),Promise.resolve().then(r.bind(r,5274)),Promise.resolve().then(r.bind(r,75066)),Promise.resolve().then(r.bind(r,1130)),Promise.resolve().then(r.bind(r,59959)),Promise.resolve().then(r.bind(r,8757)),Promise.resolve().then(r.bind(r,7168)),Promise.resolve().then(r.bind(r,19045)),Promise.resolve().then(r.bind(r,44550)),Promise.resolve().then(r.bind(r,34722)),Promise.resolve().then(r.bind(r,17085)),Promise.resolve().then(r.bind(r,31575)),Promise.resolve().then(r.bind(r,76416)),Promise.resolve().then(r.bind(r,52270)),Promise.resolve().then(r.bind(r,91036)),Promise.resolve().then(r.bind(r,19170)),Promise.resolve().then(r.bind(r,47876)),Promise.resolve().then(r.bind(r,95972)),Promise.resolve().then(r.bind(r,6421)),Promise.resolve().then(r.bind(r,19804)),Promise.resolve().then(r.t.bind(r,46685,23)),Promise.resolve().then(r.bind(r,93006)),Promise.resolve().then(r.bind(r,77705))},77705:function(e,t,r){"use strict";r.r(t),r.d(t,{Code:function(){return A},CodeBlock:function(){return h},CodeEditor:function(){return m}});var n=r(57437),i=r(35934),l=r(57518),s=r(6374),a=r(34155),o=r(43490),c=r(98116),u=r(2265);i.Z.registerLanguage("bash",l.Z),i.Z.registerLanguage("python",s.Z);let d={hybrid:a.Z,railscasts:o.Z},h=e=>{let{language:t,style:r,code:l}=e;return(0,n.jsx)("div",{className:"rounded-md overflow-hidden mb-6",children:(0,n.jsx)(i.Z,{language:t,style:r?d[r]:o.Z,children:l})})},A=e=>{let{language:t,style:r,code:l}=e,s=r?d[r]:o.Z,a=s.hljs.background;return(0,n.jsx)("span",{className:"rounded-md",children:(0,n.jsx)(i.Z,{language:t,style:s,customStyle:{display:"inline",padding:"0.125rem 0.25rem",margin:"0 0.125rem",backgroundColor:a,border:"1px solid #444444",borderRadius:"inherit"},children:l})})},m=e=>{let{text:t,setText:r,readonly:i,editable:l,basicSetup:s={},theme:a,language:o,onFocus:d,className:h}=e,A=(0,u.useRef)(null),{setContainer:m}=(0,c.Uq)({container:A.current,theme:a,value:t,readOnly:i,editable:l,extensions:[o],onChange:e=>{null==r||r(e)},basicSetup:{lineNumbers:!1,foldGutter:!1,drawSelection:!1,allowMultipleSelections:!1,highlightActiveLine:!0,highlightSelectionMatches:!1,dropCursor:!1,indentOnInput:!1,rectangularSelection:!1,tabSize:4,closeBracketsKeymap:!1,searchKeymap:!1,foldKeymap:!1,completionKeymap:!1,lintKeymap:!1,autocompletion:!1,...s}});return(0,u.useEffect)(()=>{A.current&&m(A.current)}),(0,n.jsx)("div",{className:h,onFocus:d,children:(0,n.jsx)("div",{ref:A})})}},25589:function(e,t,r){"use strict";r.d(t,{y:function(){return h},E:function(){return A}});var n=r(30684),i=r(48262),l=r(35209);let s=0,a=e=>{if(e.startsWith("\\u")||e.startsWith("\\U")||e.startsWith("\\x")||e.startsWith("\\X")){let t=2;for(;t<e.length&&/[0-9a-fA-F]/.test(e[t]);)t++;return{type:"number",start:0,end:t}}},o=e=>{if(e.startsWith("\\"))return"n"==e[1]||"r"==e[1]||"t"==e[1]||"v"==e[1]||"b"==e[1]||"f"==e[1]||e[1],{type:"escape",start:0,end:2}},c={'"':'"',"'":"'","{":"}"},u=[e=>{let t=0;if(e.startsWith("/{")&&(s+=1,t=2),0!=s){for(;s>0&&t<e.length;){if(e.startsWith("/{",t)){s++,t+=2;continue}if(e.startsWith("}/",t)){s--,t+=2;continue}t++}return{type:"comment",start:0,end:t}}},e=>{if(e.startsWith("//")){let t=2;for(;t<e.length&&"\n"!=e[t];)t++;return{type:"comment",start:0,end:t}}},e=>e.startsWith("ϵ")?{type:"null",start:0,end:1}:e.startsWith("\\e")||e.startsWith("''")||e.startsWith('""')||e.startsWith("{}")?{type:"null",start:0,end:2}:void 0,e=>e.startsWith("\\u")||e.startsWith("\\U")||e.startsWith("\\x")||e.startsWith("\\X")?{type:"unit",start:0,end:2}:e.startsWith("V")||e.startsWith("U")||e.startsWith("ξ")?{type:"unit",start:0,end:1}:void 0,a,e=>{let t=0;for(;t<e.length&&/[0-9]/.test(e[t]);)t++;if(t>0)return{type:"number",start:0,end:t}},e=>{if(e.startsWith("#")){let t=1;for(;t<e.length&&/[a-zA-Z0-9_]/.test(e[t]);)t++;return{type:"tagName",start:0,end:t}}},e=>{if(e.startsWith("[")){let t=[{type:"bracket",start:0,end:1}],r=1;for(;r<e.length;){let n;if("\n"==e[r]||" "==e[r]){r++;continue}if((n=a(e.slice(r)))||(n=o(e.slice(r)))){n.start+=r,n.end+=r,t.push(n),r=n.end;continue}if("-"==e[r]){t.push({type:"operator",start:r,end:r+1}),r++;continue}if("["==e[r]&&(t.push({type:"invalid",start:r,end:r+1}),r++),"]"==e[r])return t.push({type:"bracket",start:r,end:r+1}),t;t.push({type:"literal",start:r,end:r+1}),r++}}},e=>{let t;if(e.length<=2)return;let r=e[0];if(!('"'==r||"'"==r||"{"==r))return;let n=c[r],i=1,l=[{type:"literal",start:0,end:1}];for(;i<e.length;){if((t=a(e.slice(i)))||(t=o(e.slice(i)))){t.start+=i,t.end+=i,l.push(t),i=t.end;continue}if(e[i]==n)return[...l,{type:"literal",start:i,end:i+1}];l.push({type:"literal",start:i,end:i+1}),i++}},e=>{if(e.startsWith("(")||e.startsWith(")"))return{type:"paren",start:0,end:1}},e=>{if(".*+?~".includes(e[0]))return{type:"logicOperator",start:0,end:1}},e=>{if("=|-/>".includes(e[0]))return{type:"operator",start:0,end:1}},e=>{if(";"==e[0])return{type:"punctuation",start:0,end:1}}],d=e=>{let t=[],r=0;for(;r<e.length;){let n=u.reduce((t,n)=>t||n(e.slice(r)),void 0);n?Array.isArray(n)?(t.push(...n.map(e=>(e.start+=r,e.end+=r,e))),r=n[n.length-1].end):(n.start+=r,n.end+=r,t.push(n),r=n.end):(t.push({type:"invalid",start:r,end:r+1}),r++)}return t},h=()=>new n.ri(n.il.define({token:(e,t)=>{if(t.index>=t.tokens.length&&(t.tokens=d(e.string),t.index=0),t.index<t.tokens.length){let r=t.tokens[t.index++];return e.pos=r.end,r.type}return e.skipToEnd(),null},startState:()=>({tokens:[],index:0})})),A=(e=>{var{theme:t,settings:r={},styles:l=[]}=e,s={".cm-gutters":{}},a={};r.background&&(a.backgroundColor=r.background),r.backgroundImage&&(a.backgroundImage=r.backgroundImage),r.foreground&&(a.color=r.foreground),(r.background||r.foreground)&&(s["&"]=a),r.fontFamily&&(s["&.cm-editor .cm-scroller"]={fontFamily:r.fontFamily}),r.gutterBackground&&(s[".cm-gutters"].backgroundColor=r.gutterBackground),r.gutterForeground&&(s[".cm-gutters"].color=r.gutterForeground),r.gutterBorder&&(s[".cm-gutters"].borderRightColor=r.gutterBorder),r.caret&&(s[".cm-content"]={caretColor:r.caret},s[".cm-cursor, .cm-dropCursor"]={borderLeftColor:r.caret});var o={};r.gutterActiveForeground&&(o.color=r.gutterActiveForeground),r.lineHighlight&&(s[".cm-activeLine"]={backgroundColor:r.lineHighlight},o.backgroundColor=r.lineHighlight),s[".cm-activeLineGutter"]=o,r.selection&&(s["&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"]={background:r.selection+" !important"}),r.selectionMatch&&(s["& .cm-selectionMatch"]={backgroundColor:r.selectionMatch});var c=i.tk.theme(s,{dark:"dark"===t}),u=n.Qf.define(l);return[c,(0,n.nF)(u)]})({theme:"light",settings:{background:"#232323",caret:"#AEAFAD",selection:"#356282",selectionMatch:"#00ff00",lineHighlight:"#333333"},styles:[{tag:l.pJ.comment,color:"#787b80"},{tag:l.pJ.literal,color:"#ce9178"},{tag:l.pJ.bracket,color:"#179fff"},{tag:l.pJ.escape,color:"#d7ba7d"},{tag:l.pJ.number,color:"#b5cea8"},{tag:l.pJ.tagName,color:"#9cdcfe"},{tag:l.pJ.null,color:"#00ff00"},{tag:l.pJ.unit,color:"#ff00ff"},{tag:l.pJ.paren,color:"#ffd700"},{tag:l.pJ.operator,color:"#ffffff"},{tag:l.pJ.punctuation,color:"#ffffff"},{tag:l.pJ.logicOperator,color:"#d44c4c"},{tag:l.pJ.invalid,color:"#ff0000"}]})},13591:function(e,t,r){"use strict";r.d(t,{H1:function(){return c},H3:function(){return u},H4:function(){return d},OL:function(){return f},P:function(){return A},XZ:function(){return a},YS:function(){return m},iz:function(){return o},rU:function(){return h}});var n=r(57437),i=r(61396),l=r.n(i),s=r(74769);let a=e=>{let{label:t,isChecked:r,onChange:i,className:l}=e;return(0,n.jsxs)("div",{className:(0,s.m6)("flex items-center",l),children:[(0,n.jsx)("input",{type:"checkbox",id:"custom-checkbox",className:"hidden",checked:r,onChange:i}),(0,n.jsx)("label",{htmlFor:"custom-checkbox",className:" w-6 h-6 border-2 border-gray-300 rounded mr-2 cursor-pointer  bg-white  hover:border-gray-400 flex justify-center items-center ",children:r&&(0,n.jsx)("svg",{className:"w-4 h-4 mx-auto my-auto",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"black",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",children:(0,n.jsx)("polyline",{points:"20 6 9 17 4 12"})})}),t]})},o=e=>{let{className:t=""}=e;return(0,n.jsx)("hr",{className:(0,s.m6)("h-px my-4 bg-gray-500 border-0",t)})};function c(e){let{children:t,className:r="",...i}=e;return(0,n.jsx)("h1",{className:(0,s.m6)("text-4xl my-6 font-quadon",r),...i,children:t})}function u(e){let{children:t,className:r="",...i}=e;return(0,n.jsx)("h3",{className:(0,s.m6)("text-2xl mt-6 mb-2 font-quadon",r),...i,children:t})}function d(e){let{children:t,className:r="",...i}=e;return(0,n.jsx)("h3",{className:(0,s.m6)("text-xl mt-4 mb-2 font-quadon ",r),...i,children:t})}let h=e=>{let{href:t,children:r,className:i="",...a}=e;return(0,n.jsx)(l(),{href:t,className:(0,s.m6)("text-blue-400 hover:text-blue-500 font-gentona text-xl",i),...a,children:r||t.toString()})},A=e=>{let{children:t,className:r="",...i}=e;return(0,n.jsx)("p",{className:(0,s.m6)("mb-6 text-xl font-gentona text-justify",r),...i,children:t})},m=e=>{let{children:t,className:r="",...i}=e;return(0,n.jsx)("p",{className:(0,s.m6)("w-full my-4 text-xl font-gentona text-center",r),...i,children:t})},f=e=>{let{children:t,className:r="",...i}=e;return(0,n.jsx)("ol",{className:(0,s.m6)("list-decimal mb-6 pl-10 text-xl font-gentona",r),...i,children:t})}},93006:function(e,t,r){"use strict";r.r(t),r.d(t,{DewyLiveParser:function(){return b},GrammarCodeBlock:function(){return w},HorizontalScroll:function(){return v},useDelayed:function(){return f},useStringBuffer:function(){return c}});var n=r(57437),i=r(13591),l=r(77705),s=r(25589),a=r(2265),o=r(74769);let c=()=>{let e=(0,a.useRef)(),[t,r]=(0,a.useState)();return[t,t=>{void 0===e.current&&(e.current=[]),e.current.push(t)},()=>{var t;r(null===(t=e.current)||void 0===t?void 0:t.join("\n"))},()=>{e.current=void 0,r(void 0)}]},u={"Parse Forest":"forest","RNGLR Table":"table","Item Sets":"grammarItems","Meta Scanner":"metascanner","Meta AST":"metaast",CFG:"metaparser","First Sets":"grammarFirsts"},d=Object.keys(u),h=d.map(e=>u[e]),A=e=>{var t,r;if(void 0===e)return;let[n,i,l,s,a,o,c]=e.split("".concat("<<<<<<<<<<<<")),[u,d]=null!==(t=null==s?void 0:s.split("itemsets:\n"))&&void 0!==t?t:[void 0,void 0],h=e.indexOf("ERROR: "),A=h>=0?e.slice(h):void 0,m=(null!==(r=null==o?void 0:o.indexOf("failure"))&&void 0!==r?r:-1)>=0;return{metascanner:null==n?void 0:n.trimEnd(),metaast:null==i?void 0:i.trimEnd(),metaparser:null==l?void 0:l.trimEnd(),grammarFirsts:null==u?void 0:u.slice(12).trimEnd(),grammarItems:null==d?void 0:d.trimEnd(),table:null==a?void 0:a.trimEnd(),result:null==o?void 0:o.trimEnd(),forest:m?"Parse failed":null==c?void 0:c.trimEnd(),grammarError:A}},m=(e,t)=>{let[r,n,i,l]=c(),s=(0,a.useRef)(null),o=(0,a.useCallback)(async()=>{let r="/wasm/dewy_old/dewy_parser_wrapper",l="".concat(r,".js");try{let a=await fetch(l),o=await fetch("".concat(r,".wasm"));if(!a.ok||!o.ok)throw Error("Failed to find script or WASM file at ".concat(r));s.current=document.createElement("script"),s.current.src=l,s.current.async=!0,s.current.onload=()=>{Module({onRuntimeInitialized:()=>{console.log("onRuntimeInitialized")},print:n}).then(r=>{let n=r.cwrap("dewy_parser","void",["string","string"]);try{n(e,t)}catch(e){console.error(e)}finally{i()}})},document.body.appendChild(s.current)}catch(e){console.error(e),i()}},[e,t]);(0,a.useEffect)(()=>(o(),()=>{s.current&&(document.body.removeChild(s.current),s.current=null),l()}),[e,t]);let u=r?A(r):void 0;return u},f=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,[r,n]=(0,a.useState)(e),i=(0,a.useRef)();return(0,a.useEffect)(()=>{void 0!==i.current&&(window.clearTimeout(i.current),i.current=void 0),i.current=window.setTimeout(()=>{n(e),i.current=void 0},t)},[t,...e]),r},g=e=>{let{text:t,setText:r,onFocus:i,className:l=""}=e,s=(0,a.useRef)(null),c=()=>{if(s.current){s.current.style.height="0px";let e=s.current.scrollHeight;s.current.style.height=e+"px"}};return(0,a.useEffect)(()=>(c(),window.addEventListener("resize",c),()=>window.removeEventListener("resize",c)),[t]),(0,n.jsx)("textarea",{ref:s,className:(0,o.m6)("hide-h-scrollbar overflow-y-hidden font-mono resize-none overflow-x-auto whitespace-pre outline outline-1 outline-[#808080] focus:outline-2 focus:outline-white px-0.5",l),style:{minHeight:"1em"},value:t,spellCheck:!1,onChange:e=>{r(e.target.value)},onFocus:i})},x=e=>{let{title:t,children:r,defaultOpen:i=!1}=e,[l,s]=(0,a.useState)(i),c=l?"":"-rotate-90";return(0,n.jsxs)("div",{className:"my-2",children:[(0,n.jsxs)("button",{className:"flex items-center w-full text-left",onClick:()=>s(!l),children:[(0,n.jsx)("svg",{className:(0,o.m6)("h-4 w-4 mr-2 transform transition-transform",c),fill:"currentColor",viewBox:"0 0 96.154 96.154",children:(0,n.jsx)("path",{d:"M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61 c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056 c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"})}),(0,n.jsx)("span",{className:"font-quadon text-xl",children:t})]}),l&&(0,n.jsx)("div",{className:"py-2",children:r})]})},b=e=>{let{grammars:t,initial_idx:r=0}=e;if(t.length<r)throw Error("initial_idx must be less than the number of grammars. initial_idx: ".concat(r,", grammars.length: ").concat(t.length));let[c,u]=(0,a.useState)(!1),[A,b]=(0,a.useState)(0),[w,y]=(0,a.useState)(t[r].source),[j,E]=(0,a.useState)(t[r].grammar),N=()=>{c||u(!0)},k=e=>{y(e),c||u(!0)},C=e=>{E(e),c||u(!0)},[M,W]=f([j,w]),F=m(M,W),S=c&&(null==F?void 0:F.result)==="failure",H=c&&(null==F?void 0:F.grammarError)!==void 0,R=c?"gap-x-[2%]":"gap-x-[5%]",B=c?"grid-cols-[4fr,0fr,5fr]":"grid-cols-[1fr,1fr]";return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:(0,o.m6)("max-md:hidden grid w-full",R,B),children:[(0,n.jsx)("div",{className:"flex flex-col justify-end",children:(0,n.jsx)(i.H4,{className:"mt-0",children:"Source Input"})}),c&&(0,n.jsx)(i.H4,{className:"mt-0 select-none",children:"\xa0"}),(0,n.jsx)("div",{className:"flex flex-col justify-end",children:(0,n.jsx)(i.H4,{className:"mt-0",children:"Grammar Specification"})}),(0,n.jsx)(g,{className:(0,o.m6)("w-full bg-[#232323] text-xl",S?"outline-[#FF0000] focus:outline-[#FF0000]":""),text:w,setText:k,onFocus:N}),c&&(0,n.jsxs)("div",{className:"flex whitespace-nowrap font-mono h-min select-none",children:[(0,n.jsx)("span",{className:"text-xl pr-1",children:"<"}),(0,n.jsx)("span",{className:"text-lg outline outline-1 outline-white px-1",children:"edit me"}),(0,n.jsx)("span",{className:"text-xl pl-1",children:">"})]}),(0,n.jsx)(v,{className:"w-full",children:(0,n.jsx)(l.CodeEditor,{className:(0,o.m6)("w-full bg-[#232323] text-xl",H?"outline outline-[#FF0000] focus:outline-[#FF0000]":""),language:(0,s.y)(),theme:s.E,text:j,setText:C,onFocus:N})})]}),(0,n.jsxs)("div",{className:"md:hidden flex flex-col",children:[(0,n.jsx)(i.H4,{className:"mt-0",children:"Grammar Specification"}),(0,n.jsx)(v,{className:"w-full",children:(0,n.jsx)(l.CodeEditor,{className:(0,o.m6)("w-full bg-[#232323] text-lg hide-h-scrollbar overflow-y-hidden overflow-x-auto",H?"outline outline-[#FF0000] focus:outline-[#FF0000]":""),language:(0,s.y)(),theme:s.E,text:j,setText:C,onFocus:N})}),(0,n.jsx)(i.H4,{children:"Source Input"}),(0,n.jsx)(g,{className:(0,o.m6)("w-full bg-[#232323] text-lg",S?"outline-[#FF0000] focus:outline-[#FF0000]":""),text:w,setText:k,onFocus:N}),(0,n.jsx)("div",{children:"placeholder"})]}),!c&&(0,n.jsx)("div",{className:"flex flex-col justify-center pt-6",children:(0,n.jsx)("button",{className:"w-24 h-8 bg-[#232323] text-white rounded-md",onClick:()=>u(!c),children:"Try Me"})}),c&&(0,n.jsxs)("div",{className:"w-full my-6",children:[(0,n.jsx)(x,{title:"Examples",children:(0,n.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:t.map((e,t)=>(0,n.jsx)("button",{className:"font-gentona text-2xl px-4 h-[3.5em] whitespace-pre bg-[#232323] hover:bg-[#404040] text-white rounded-md",onClick:()=>{C(e.grammar),k(e.source)},children:p(e.label,22)},t))})}),(0,n.jsx)(x,{title:"Output",defaultOpen:!0,children:(0,n.jsxs)("div",{className:"flex flex-col w-full",children:[(0,n.jsx)("div",{className:"flex flex-row w-min max-w-full overflow-x-auto rounded-tl-md rounded-tr-md overflow-hidden border border-b-0 border-solid border-[#444444]",children:d.map((e,t)=>(0,n.jsx)("button",{className:"\n                                                font-gentona text-2xl px-4 h-[3.5em] whitespace-pre \n                                                ".concat(t!==A?"bg-[#000000] hover:bg-[#232323]":"bg-[#232323]","\n                                                text-white \n                                                border border-b-0 border-solid border-[#444444]\n                                            "),onClick:()=>{b(t)},children:p(e,22)},t))}),(0,n.jsx)("div",{className:"w-full bg-[#232323] text-white  rounded-b-md rounded-tr-md overflow-hidden border border-t-0 border-solid border-[#444444]",children:(0,n.jsx)("div",{className:"whitespace-pre w-full overflow-x-auto p-4 font-mono max-md:text-lg md:text-xl",children:F?F[h[A]]:"Loading..."})})]})})]})]})},p=(e,t)=>{if(e.length<=t)return e;let r=Math.floor(e.length/2),n=e.indexOf(" ",r),i=e.lastIndexOf(" ",r);if(-1===n&&-1===i)return e.slice(0,r)+"-\n-"+e.slice(r);if(-1===n)return e.slice(0,i)+"\n"+e.slice(i+1);if(-1===i)return e.slice(0,n)+"\n"+e.slice(n+1);let l=n-r,s=r-i;return l<s?e.slice(0,n)+"\n"+e.slice(n+1):e.slice(0,i)+"\n"+e.slice(i+1)},v=e=>{let{className:t="",children:r}=e;return(0,n.jsx)("div",{className:(0,o.m6)("flex flex-row hide-h-scrollbar overflow-y-hidden overflow-x-auto",t),children:r})},w=e=>{let{code:t}=e;return(0,n.jsx)(v,{className:"w-full",children:(0,n.jsx)(l.CodeEditor,{className:"w-full bg-[#232323] text-lg md:text-xl",language:(0,s.y)(),theme:s.E,text:t,readonly:!0,editable:!1,basicSetup:{highlightActiveLine:!1}})})}},19170:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/apl_shield.ed187f2a.png",height:200,width:200,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAJFBMVEX///////9MaXH////////////////////////////+/v7///9Xx+kjAAAADHRSTlMWQgAHSjeWIl1he2c8OXMwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAN0lEQVR4nBXKyRHAMAwDsSUlWj767zcTvEGkJApdhqpGddZti/RaV4Q589h7KJVNG9N/NTYS9gciiwDfROwsIQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},1130:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/apple.6c3f0c2f.svg",height:448,width:377,blurWidth:0,blurHeight:0}},76416:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/branch.265fb28d.svg",height:512,width:448,blurWidth:0,blurHeight:0}},7168:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/chrome.ff145c23.svg",height:512,width:512,blurWidth:0,blurHeight:0}},52270:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/circuit.8cf8dc9f.png",height:144,width:144,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAFVBMVEX///////////////////9MaXH///+o1vOyAAAAB3RSTlP+SJWR4gDrA4oyQgAAAAlwSFlzAAALEwAACxMBAJqcGAAAACJJREFUeJyVxrEBADAIw7AYHP4/uTdUk1JOj4ZJkuUvRZU+Dw8AZ0UlQUcAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8}},17085:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/code.4f400729.svg",height:510,width:622,blurWidth:0,blurHeight:0}},31575:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/cubes.52bfa026.svg",height:505,width:577,blurWidth:0,blurHeight:0}},5274:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/docs.71257e0f.svg",height:512,width:384,blurWidth:0,blurHeight:0}},44550:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/envelope.68fbd887.svg",height:384,width:512,blurWidth:0,blurHeight:0}},52347:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/gamepad.7f8c19fe.svg",height:384,width:640,blurWidth:0,blurHeight:0}},91036:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/gears.43219d75.png",height:902,width:1e3,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAMFBMVEX///////9MaXH9/f39/f39/f3////////9/f39/f39/f3////8/Pz////////8/PxSdW9IAAAAEHRSTlMB/gC4zN4nCe6lhhV3OJl/vtUq/QAAAAlwSFlzAAALEwAACxMBAJqcGAAAADVJREFUeJwFwYcBwDAMwzBaXpnN/98WQOjOWA3aYWYPVCOPOf1O2LDFzHQfcxMen6rFDS8BPyYIAS1kXKiqAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:7}},17421:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/github.8d24eda3.svg",height:484,width:496,blurWidth:0,blurHeight:0}},75066:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/hashtag.846670df.svg",height:448,width:448,blurWidth:0,blurHeight:0}},95972:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/idt_starburst.88e8b2ee.png",height:225,width:225,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAG1BMVEX////////////////8/Pz8/Pz////6+vr///99a9SwAAAACXRSTlMBGFZKDR17NWmxn4fzAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAMUlEQVR4nB2KyQ0AMAzCDOTYf+Mq5WNZBkDNrWu3dB47gopnnKKdGbuhk59Qxf8MOjwViwCORSWurQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},6421:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/jataware_logo.4e4a6b84.png",height:200,width:200,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAADFBMVEX8/Pz///////9MaXEa7cJzAAAABHRSTlMeAgEAGcqjGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAACZJREFUeJxjYIYCBmZGMGBmgIswMYABMwMjjIFQzMTExMjIhBABABKeAIZ0gaXxAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8}},8757:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/jhu_hub.bc0ef920.svg",height:56,width:110,blurWidth:0,blurHeight:0}},47876:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/jhu_shield.7014cafb.png",height:230,width:215,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAMAAAAC2hU0AAAALVBMVEX///////9MaXH///////////////////////////////////////////////8tkOLtAAAAD3RSTlOUcgAwZSJMptE9hFVZCheRDfJyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVR4nAXBhwHAMAzDMMo7o/3/3AD4QZxFxsyEc3UDREmwRbFbXfyRCz7MvdoNs4w0eyGwAP+tG93HAAAAAElFTkSuQmCC",blurWidth:7,blurHeight:8}},34722:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/linkedin.95ede3ed.svg",height:448,width:448,blurWidth:0,blurHeight:0}},13754:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/linux_logo.b344922a.png",height:154,width:128,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAMAAAAC2hU0AAAAMFBMVEVMaXH////////////////////////////////////////////////////////////6w4mEAAAAD3RSTlMA4jRaDpWq8bpIfmj+HSqrp8S2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAANklEQVR4nBXFxxHAQAgDQAmOdMH0362H/SyATwRDTde875mfd8oCNDrOgxibu8Dw5k0Ys5z1AyCZATNVl6EJAAAAAElFTkSuQmCC",blurWidth:7,blurHeight:8}},59959:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/object_group.e44e708c.svg",height:448,width:512,blurWidth:0,blurHeight:0}},19045:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/table.0c847b8e.svg",height:448,width:512,blurWidth:0,blurHeight:0}},19804:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/trello.b6d26a4c.svg",height:448,width:448,blurWidth:0,blurHeight:0}},38414:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/windows.6da4ff71.svg",height:448,width:448,blurWidth:0,blurHeight:0}},61396:function(e,t,r){e.exports=r(46685)}},function(e){e.O(0,[6401,6685,3222,8213,504,2971,596,1744],function(){return e(e.s=6014)}),_N_E=e.O()}]);