(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5677],{25567:function(e,t,r){"use strict";r.d(t,{j:function(){return l}});var n=r(48262),i=r(30684),l=e=>{var{theme:t,settings:r={},styles:l=[]}=e,s={".cm-gutters":{}},o={};r.background&&(o.backgroundColor=r.background),r.backgroundImage&&(o.backgroundImage=r.backgroundImage),r.foreground&&(o.color=r.foreground),(r.background||r.foreground)&&(s["&"]=o),r.fontFamily&&(s["&.cm-editor .cm-scroller"]={fontFamily:r.fontFamily}),r.gutterBackground&&(s[".cm-gutters"].backgroundColor=r.gutterBackground),r.gutterForeground&&(s[".cm-gutters"].color=r.gutterForeground),r.gutterBorder&&(s[".cm-gutters"].borderRightColor=r.gutterBorder),r.caret&&(s[".cm-content"]={caretColor:r.caret},s[".cm-cursor, .cm-dropCursor"]={borderLeftColor:r.caret});var a={};r.gutterActiveForeground&&(a.color=r.gutterActiveForeground),r.lineHighlight&&(s[".cm-activeLine"]={backgroundColor:r.lineHighlight},a.backgroundColor=r.lineHighlight),s[".cm-activeLineGutter"]=a,r.selection&&(s["&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"]={background:r.selection+" !important"}),r.selectionMatch&&(s["& .cm-selectionMatch"]={backgroundColor:r.selectionMatch});var c=n.tk.theme(s,{dark:"dark"===t}),u=i.Qf.define(l);return[c,(0,i.nF)(u)]}},40382:function(e,t,r){Promise.resolve().then(r.t.bind(r,63222,23)),Promise.resolve().then(r.bind(r,13754)),Promise.resolve().then(r.bind(r,1130)),Promise.resolve().then(r.bind(r,52347)),Promise.resolve().then(r.bind(r,17421)),Promise.resolve().then(r.bind(r,38414)),Promise.resolve().then(r.bind(r,75066)),Promise.resolve().then(r.bind(r,5274)),Promise.resolve().then(r.bind(r,59959)),Promise.resolve().then(r.bind(r,8757)),Promise.resolve().then(r.bind(r,19045)),Promise.resolve().then(r.bind(r,7168)),Promise.resolve().then(r.bind(r,44550)),Promise.resolve().then(r.bind(r,34722)),Promise.resolve().then(r.bind(r,17085)),Promise.resolve().then(r.bind(r,31575)),Promise.resolve().then(r.bind(r,52270)),Promise.resolve().then(r.bind(r,76416)),Promise.resolve().then(r.bind(r,91036)),Promise.resolve().then(r.bind(r,19170)),Promise.resolve().then(r.bind(r,47876)),Promise.resolve().then(r.bind(r,95972)),Promise.resolve().then(r.bind(r,6421)),Promise.resolve().then(r.bind(r,19804)),Promise.resolve().then(r.t.bind(r,46685,23)),Promise.resolve().then(r.bind(r,42556)),Promise.resolve().then(r.bind(r,77705))},29430:function(e,t,r){"use strict";r.d(t,{U:function(){return s}});var n=r(57437),i=r(2265),l=r(74769);let s=e=>{let{title:t,children:r,defaultOpen:s=!1}=e,[o,a]=(0,i.useState)(s),c=o?"":"-rotate-90";return(0,n.jsxs)("div",{className:"my-2",children:[(0,n.jsxs)("button",{className:"flex items-center w-full text-left",onClick:()=>a(!o),children:[(0,n.jsx)("svg",{className:(0,l.m6)("h-4 w-4 mr-2 transform transition-transform",c),fill:"currentColor",viewBox:"0 0 96.154 96.154",children:(0,n.jsx)("path",{d:"M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61 c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056 c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"})}),(0,n.jsx)("span",{className:"font-quadon text-xl",children:t})]}),o&&(0,n.jsx)("div",{className:"py-2",children:r})]})}},77705:function(e,t,r){"use strict";r.r(t),r.d(t,{Code:function(){return x},CodeBlock:function(){return g},CodeEditor:function(){return w},PlaintextBlock:function(){return m},get_lang_support:function(){return p},parse_lang:function(){return b}});var n=r(57437),i=r(35934),l=r(57518),s=r(6374),o=r(34155),a=r(43490),c=r(98116),u=r(30684),d=r(2265),h=r(74769),A=r(13591);i.Z.registerLanguage("bash",l.Z),i.Z.registerLanguage("python",s.Z);let f={hybrid:o.Z,railscasts:a.Z},m=e=>{let{text:t,className:r=""}=e;return(0,n.jsx)("div",{className:"mb-6",children:(0,n.jsx)(A.Z6,{className:(0,h.m6)("w-full rounded-md",r),children:(0,n.jsx)("div",{className:"w-full",children:(0,n.jsx)("div",{className:"p-2 whitespace-pre font-fira-code",children:t})})})})},g=e=>{let{language:t,style:r,code:l,className:s=""}=e;return(0,n.jsx)("div",{className:(0,h.m6)("rounded-md overflow-hidden mb-6",s),children:(0,n.jsx)(i.Z,{language:t,style:r?f[r]:a.Z,children:l})})},x=e=>{let{language:t,style:r,code:l}=e,s=r?f[r]:a.Z,o=s.hljs.background;return(0,n.jsx)("span",{className:"rounded-md",children:(0,n.jsx)(i.Z,{language:t,style:s,customStyle:{display:"inline",padding:"0.125rem 0.25rem",margin:"0 0.125rem",backgroundColor:o,border:"1px solid #444444",borderRadius:"inherit"},children:l})})},b=(e,t,r)=>{let n=[],i=0;for(;i<e.length;){let l=r(t),s=l.reduce((r,n)=>r||n(e.slice(i),t),void 0);s?Array.isArray(s)?(n.push(...s.map(e=>(e.start+=i,e.end+=i,e))),i=s[s.length-1].end):(s.start+=i,s.end+=i,n.push(s),i=s.end):(n.push({type:"invalid",start:i,end:i+1}),i++)}return n},p=(e,t)=>()=>new u.ri(u.il.define({token:(t,r)=>{if(r.index>=r.tokens.length&&(r.tokens=e(t.string,r),r.index=0),r.index<r.tokens.length){let e=r.tokens[r.index++];return t.pos=e.end,e.type}return t.skipToEnd(),null},startState:t})),v=e=>{let{children:t,onKey:r}=e,i=(0,d.useRef)([]);return(0,d.useEffect)(()=>{let e=e=>{let t=e.key;i.current=[...new Set([...i.current,t])],null==r||r(i.current,e)},t=e=>{let t=e.key;i.current=i.current.filter(e=>e!==t),null==r||r(i.current,e)};return window.addEventListener("keydown",e),window.addEventListener("keyup",t),()=>{window.removeEventListener("keydown",e),window.removeEventListener("keyup",t)}},[r]),(0,n.jsx)("div",{children:t})},w=e=>{let{text:t,setText:r,readonly:i,editable:l,basicSetup:s={},theme:o,language:a,onFocus:u,keyListener:f,className:m,setFocusCallback:g}=e,x=(0,d.useRef)(null),b=(0,d.useRef)(null),[p,w]=(0,d.useState)(1024);(0,d.useEffect)(()=>{if(b.current&&b.current.clientWidth!==p&&w(b.current.clientWidth),!b.current)return;let e=new ResizeObserver(()=>{b.current&&b.current.clientWidth!==p&&w(b.current.clientWidth)});return e.observe(b.current),()=>e.disconnect()});let{view:y,setContainer:j}=(0,c.Uq)({container:x.current,minWidth:"".concat(p,"px"),theme:o,value:t,readOnly:i,editable:l,extensions:[a],onChange:e=>{null==r||r(e)},basicSetup:{lineNumbers:!1,foldGutter:!1,drawSelection:!1,allowMultipleSelections:!1,highlightActiveLine:!0,highlightSelectionMatches:!1,dropCursor:!1,indentOnInput:!1,rectangularSelection:!1,tabSize:4,closeBracketsKeymap:!1,searchKeymap:!1,foldKeymap:!1,completionKeymap:!1,lintKeymap:!1,autocompletion:!1,defaultKeymap:!1,...s}});return(0,d.useEffect)(()=>{x.current&&(j(x.current),null==g||g(()=>{null==y||y.focus()}))}),(0,n.jsx)("div",{className:(0,h.m6)("w-full rounded-md overflow-hidden",m),ref:b,children:(0,n.jsx)(A.Z6,{className:"w-full",children:(0,n.jsx)(v,{onKey:f,children:(0,n.jsx)("div",{onFocus:u,children:(0,n.jsx)("div",{ref:x})})})})})}},13591:function(e,t,r){"use strict";r.d(t,{H1:function(){return c},H3:function(){return u},H4:function(){return d},OL:function(){return m},P:function(){return A},XZ:function(){return o},YS:function(){return f},Z6:function(){return g},iz:function(){return a},rU:function(){return h}});var n=r(57437),i=r(61396),l=r.n(i),s=r(74769);let o=e=>{let{label:t,isChecked:r,onChange:i,className:l}=e;return(0,n.jsxs)("div",{className:(0,s.m6)("flex items-center",l),children:[(0,n.jsx)("input",{type:"checkbox",id:"custom-checkbox",className:"hidden",checked:r,onChange:i}),(0,n.jsx)("label",{htmlFor:"custom-checkbox",className:" w-6 h-6 border-2 border-gray-300 rounded mr-2 cursor-pointer  bg-white  hover:border-gray-400 flex justify-center items-center ",children:r&&(0,n.jsx)("svg",{className:"w-4 h-4 mx-auto my-auto",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"black",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",children:(0,n.jsx)("polyline",{points:"20 6 9 17 4 12"})})}),t]})},a=e=>{let{className:t=""}=e;return(0,n.jsx)("hr",{className:(0,s.m6)("h-px my-4 bg-gray-500 border-0",t)})};function c(e){let{children:t,className:r="",...i}=e;return(0,n.jsx)("h1",{className:(0,s.m6)("text-4xl my-6 font-quadon",r),...i,children:t})}function u(e){let{children:t,className:r="",...i}=e;return(0,n.jsx)("h3",{className:(0,s.m6)("text-2xl mt-6 mb-2 font-quadon",r),...i,children:t})}function d(e){let{children:t,className:r="",...i}=e;return(0,n.jsx)("h3",{className:(0,s.m6)("text-xl mt-4 mb-2 font-quadon ",r),...i,children:t})}let h=e=>{let{href:t,children:r,className:i="",...o}=e;return(0,n.jsx)(l(),{href:t,className:(0,s.m6)("text-blue-400 hover:text-blue-500 font-gentona text-xl",i),...o,children:r||t.toString()})},A=e=>{let{children:t,className:r="",...i}=e;return(0,n.jsx)("p",{className:(0,s.m6)("mb-6 text-xl font-gentona text-justify",r),...i,children:t})},f=e=>{let{children:t,className:r="",...i}=e;return(0,n.jsx)("p",{className:(0,s.m6)("w-full my-4 text-xl font-gentona text-center",r),...i,children:t})},m=e=>{let{children:t,className:r="",...i}=e;return(0,n.jsx)("ol",{className:(0,s.m6)("list-decimal mb-6 pl-10 text-xl font-gentona",r),...i,children:t})},g=e=>{let{className:t="",children:r}=e;return(0,n.jsxs)("div",{className:(0,s.m6)("flex flex-row overflow-y-hidden overflow-x-auto",t),children:[" ",r]})}},42556:function(e,t,r){"use strict";r.r(t),r.d(t,{DewyLiveParser:function(){return E},GrammarCodeBlock:function(){return _},useDelayed:function(){return j},useStringBuffer:function(){return x}});var n=r(57437),i=r(13591),l=r(29430),s=r(77705),o=r(25567),a=r(35209);let c=(e,t)=>{if(e.startsWith("\\u")||e.startsWith("\\U")||e.startsWith("\\x")||e.startsWith("\\X")){let t=2;for(;t<e.length&&/[0-9a-fA-F]/.test(e[t]);)t++;return{type:"number",start:0,end:t}}},u=(e,t)=>{if(e.startsWith("\\"))return"n"==e[1]||"r"==e[1]||"t"==e[1]||"v"==e[1]||"b"==e[1]||"f"==e[1]||e[1],{type:"escape",start:0,end:2}},d={'"':'"',"'":"'","{":"}"},h=[(e,t)=>{let r=0;if(e.startsWith("/{")&&(t.block_comment_open_depth+=1,r=2),0!=t.block_comment_open_depth){for(;t.block_comment_open_depth>0&&r<e.length;){if(e.startsWith("/{",r)){t.block_comment_open_depth++,r+=2;continue}if(e.startsWith("}/",r)){t.block_comment_open_depth--,r+=2;continue}r++}return{type:"comment",start:0,end:r}}},(e,t)=>{if(e.startsWith("//")){let t=2;for(;t<e.length&&"\n"!=e[t];)t++;return{type:"comment",start:0,end:t}}},(e,t)=>e.startsWith("ϵ")?{type:"null",start:0,end:1}:e.startsWith("\\e")||e.startsWith("''")||e.startsWith('""')||e.startsWith("{}")?{type:"null",start:0,end:2}:void 0,(e,t)=>e.startsWith("\\u")||e.startsWith("\\U")||e.startsWith("\\x")||e.startsWith("\\X")?{type:"unit",start:0,end:2}:e.startsWith("V")||e.startsWith("U")||e.startsWith("ξ")?{type:"unit",start:0,end:1}:void 0,c,(e,t)=>{let r=0;for(;r<e.length&&/[0-9]/.test(e[r]);)r++;if(r>0)return{type:"number",start:0,end:r}},(e,t)=>{if(e.startsWith("#")){let t=1;for(;t<e.length&&/[a-zA-Z0-9_]/.test(e[t]);)t++;return{type:"tagName",start:0,end:t}}},(e,t)=>{if(e.startsWith("[")){let r=[{type:"bracket",start:0,end:1}],n=1;for(;n<e.length;){let i;if("\n"==e[n]||" "==e[n]){n++;continue}if((i=c(e.slice(n),t))||(i=u(e.slice(n),t))){i.start+=n,i.end+=n,r.push(i),n=i.end;continue}if("-"==e[n]){r.push({type:"operator",start:n,end:n+1}),n++;continue}if("["==e[n]&&(r.push({type:"invalid",start:n,end:n+1}),n++),"]"==e[n])return r.push({type:"bracket",start:n,end:n+1}),r;r.push({type:"literal",start:n,end:n+1}),n++}}},(e,t)=>{let r;if(e.length<=2)return;let n=e[0];if(!('"'==n||"'"==n||"{"==n))return;let i=d[n],l=1,s=[{type:"literal",start:0,end:1}];for(;l<e.length;){if((r=c(e.slice(l),t))||(r=u(e.slice(l),t))){r.start+=l,r.end+=l,s.push(r),l=r.end;continue}if(e[l]==i)return[...s,{type:"literal",start:l,end:l+1}];s.push({type:"literal",start:l,end:l+1}),l++}},(e,t)=>{if(e.startsWith("(")||e.startsWith(")"))return{type:"paren",start:0,end:1}},(e,t)=>{if(".*+?~".includes(e[0]))return{type:"logicOperator",start:0,end:1}},(e,t)=>{if("=|-/>".includes(e[0]))return{type:"operator",start:0,end:1}},(e,t)=>{if(";"==e[0])return{type:"punctuation",start:0,end:1}}],A=(0,s.get_lang_support)((e,t)=>(0,s.parse_lang)(e,t,()=>h),()=>({tokens:[],index:0,block_comment_open_depth:0})),f=(0,o.j)({theme:"light",settings:{background:"#232323",caret:"#AEAFAD",selection:"#356282",selectionMatch:"#00ff00",lineHighlight:"#333333"},styles:[{tag:a.pJ.comment,color:"#787b80"},{tag:a.pJ.literal,color:"#ce9178"},{tag:a.pJ.bracket,color:"#179fff"},{tag:a.pJ.escape,color:"#d7ba7d"},{tag:a.pJ.number,color:"#b5cea8"},{tag:a.pJ.tagName,color:"#9cdcfe"},{tag:a.pJ.null,color:"#00ff00"},{tag:a.pJ.unit,color:"#ff00ff"},{tag:a.pJ.paren,color:"#ffd700"},{tag:a.pJ.operator,color:"#ffffff"},{tag:a.pJ.punctuation,color:"#ffffff"},{tag:a.pJ.logicOperator,color:"#d44c4c"},{tag:a.pJ.invalid,color:"#ff0000"}]});var m=r(2265),g=r(74769);let x=()=>{let e=(0,m.useRef)(),[t,r]=(0,m.useState)();return[t,t=>{void 0===e.current&&(e.current=[]),e.current.push(t)},()=>{var t;r(null===(t=e.current)||void 0===t?void 0:t.join("\n"))},()=>{e.current=void 0,r(void 0)}]},b={"Parse Forest":"forest","RNGLR Table":"table","Item Sets":"grammarItems","Meta Scanner":"metascanner","Meta AST":"metaast",CFG:"metaparser","First Sets":"grammarFirsts"},p=Object.keys(b),v=p.map(e=>b[e]),w=e=>{var t,r;if(void 0===e)return;let[n,i,l,s,o,a,c]=e.split("".concat("<<<<<<<<<<<<")),[u,d]=null!==(t=null==s?void 0:s.split("itemsets:\n"))&&void 0!==t?t:[void 0,void 0],h=e.indexOf("ERROR: "),A=h>=0?e.slice(h):void 0,f=(null!==(r=null==a?void 0:a.indexOf("failure"))&&void 0!==r?r:-1)>=0;return{metascanner:null==n?void 0:n.trimEnd(),metaast:null==i?void 0:i.trimEnd(),metaparser:null==l?void 0:l.trimEnd(),grammarFirsts:null==u?void 0:u.slice(12).trimEnd(),grammarItems:null==d?void 0:d.trimEnd(),table:null==o?void 0:o.trimEnd(),result:null==a?void 0:a.trimEnd(),forest:f?"Parse failed":null==c?void 0:c.trimEnd(),grammarError:A}},y=(e,t)=>{let[r,n,i,l]=x(),s=(0,m.useRef)(null),o=(0,m.useCallback)(async()=>{let r="/wasm/dewy_old/dewy_parser_wrapper",l="".concat(r,".js");try{let o=await fetch(l),a=await fetch("".concat(r,".wasm"));if(!o.ok||!a.ok)throw Error("Failed to find script or WASM file at ".concat(r));s.current=document.createElement("script"),s.current.src=l,s.current.async=!0,s.current.onload=()=>{Module({onRuntimeInitialized:()=>{},print:n}).then(r=>{let n=r.cwrap("dewy_parser","void",["string","string"]);try{n(e,t)}catch(e){console.error(e)}finally{i()}})},document.body.appendChild(s.current)}catch(e){console.error(e),i()}},[e,t]);(0,m.useEffect)(()=>(o(),()=>{s.current&&(document.body.removeChild(s.current),s.current=null),l()}),[e,t]);let a=r?w(r):void 0;return a},j=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:200,[r,n]=(0,m.useState)(e),i=(0,m.useRef)();return(0,m.useEffect)(()=>{void 0!==i.current&&(window.clearTimeout(i.current),i.current=void 0),i.current=window.setTimeout(()=>{n(e),i.current=void 0},t)},[t,...e]),r},k=e=>{let{text:t,setText:r,onFocus:i,className:l=""}=e,s=(0,m.useRef)(null),o=()=>{if(s.current){s.current.style.height="0px";let e=s.current.scrollHeight;s.current.style.height=e+"px"}};return(0,m.useEffect)(()=>(o(),window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)),[t]),(0,n.jsx)("textarea",{ref:s,className:(0,g.m6)("hide-h-scrollbar overflow-y-hidden rounded-md font-mono resize-none overflow-x-auto whitespace-pre outline outline-1 outline-[#808080] focus:outline-2 focus:outline-white px-0.5",l),style:{minHeight:"1em"},value:t,spellCheck:!1,onChange:e=>{r(e.target.value)},onFocus:i})},E=e=>{let{grammars:t,initial_idx:r=0}=e;if(t.length<r)throw Error("initial_idx must be less than the number of grammars. initial_idx: ".concat(r,", grammars.length: ").concat(t.length));let[o,a]=(0,m.useState)(!1),[c,u]=(0,m.useState)(0),[d,h]=(0,m.useState)(t[r].source),[x,b]=(0,m.useState)(t[r].grammar),w=()=>{o||a(!0)},E=e=>{h(e),o||a(!0)},_=e=>{b(e),o||a(!0)},[C,W]=j([x,d]),S=y(C,W),M=o&&(null==S?void 0:S.result)==="failure",F=o&&(null==S?void 0:S.grammarError)!==void 0,R=o?"gap-x-[2%]":"gap-x-[5%]",B=o?"grid-cols-[4fr,0fr,5fr]":"grid-cols-[1fr,1fr]";return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:(0,g.m6)("max-md:hidden grid w-full",R,B),children:[(0,n.jsx)("div",{className:"flex flex-col justify-end",children:(0,n.jsx)(i.H4,{className:"mt-0",children:"Source Input"})}),o&&(0,n.jsx)(i.H4,{className:"mt-0 select-none",children:"\xa0"}),(0,n.jsx)("div",{className:"flex flex-col justify-end",children:(0,n.jsx)(i.H4,{className:"mt-0",children:"Grammar Specification"})}),(0,n.jsx)(k,{className:(0,g.m6)("w-full bg-[#232323] text-xl",M?"outline-[#FF0000] focus:outline-[#FF0000]":""),text:d,setText:E,onFocus:w}),o&&(0,n.jsxs)("div",{className:"flex whitespace-nowrap font-mono h-min select-none",children:[(0,n.jsx)("span",{className:"text-xl pr-1",children:"<"}),(0,n.jsx)("span",{className:"text-lg outline outline-1 outline-white px-1",children:"edit me"}),(0,n.jsx)("span",{className:"text-xl pl-1",children:">"})]}),(0,n.jsx)(s.CodeEditor,{className:(0,g.m6)("w-full bg-[#232323] text-xl",F?"outline outline-[#FF0000] focus:outline-[#FF0000]":""),language:A(),theme:f,text:x,setText:_,onFocus:w})]}),(0,n.jsxs)("div",{className:"md:hidden flex flex-col",children:[(0,n.jsx)(i.H4,{className:"mt-0",children:"Grammar Specification"}),(0,n.jsx)(s.CodeEditor,{className:(0,g.m6)("w-full bg-[#232323] text-lg hide-h-scrollbar overflow-y-hidden overflow-x-auto",F?"outline outline-[#FF0000] focus:outline-[#FF0000]":""),language:A(),theme:f,text:x,setText:_,onFocus:w}),(0,n.jsx)(i.H4,{children:"Source Input"}),(0,n.jsx)(k,{className:(0,g.m6)("w-full bg-[#232323] text-lg",M?"outline-[#FF0000] focus:outline-[#FF0000]":""),text:d,setText:E,onFocus:w})]}),!o&&(0,n.jsx)("div",{className:"flex flex-col justify-center pt-6",children:(0,n.jsx)("button",{className:"w-24 h-8 bg-[#232323] text-white rounded-md",onClick:()=>a(!o),children:"Try Me"})}),o&&(0,n.jsxs)("div",{className:"w-full my-6",children:[(0,n.jsx)(l.U,{title:"Examples",children:(0,n.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:t.map((e,t)=>(0,n.jsx)("button",{className:"font-gentona text-2xl px-4 h-[3.5em] whitespace-pre bg-[#232323] hover:bg-[#404040] text-white rounded-md",onClick:()=>{_(e.grammar),E(e.source)},children:N(e.label,22)},t))})}),(0,n.jsx)(l.U,{title:"Output",defaultOpen:!0,children:(0,n.jsxs)("div",{className:"flex flex-col w-full",children:[(0,n.jsx)("div",{className:"flex flex-row w-min max-w-full overflow-x-auto rounded-tl-md rounded-tr-md overflow-hidden border border-b-0 border-solid border-[#444444]",children:p.map((e,t)=>(0,n.jsx)("button",{className:"\n                                                font-gentona text-2xl px-4 h-[3.5em] whitespace-pre \n                                                ".concat(t!==c?"bg-[#000000] hover:bg-[#232323]":"bg-[#232323]","\n                                                text-white \n                                                border border-b-0 border-solid border-[#444444]\n                                            "),onClick:()=>{u(t)},children:N(e,22)},t))}),(0,n.jsx)("div",{className:"w-full bg-[#232323] text-white  rounded-b-md rounded-tr-md overflow-hidden border border-t-0 border-solid border-[#444444]",children:(0,n.jsx)("div",{className:"whitespace-pre w-full overflow-x-auto p-4 font-mono max-md:text-lg md:text-xl",children:S?S[v[c]]:"Loading..."})})]})})]})]})},N=(e,t)=>{if(e.length<=t)return e;let r=Math.floor(e.length/2),n=e.indexOf(" ",r),i=e.lastIndexOf(" ",r);if(-1===n&&-1===i)return e.slice(0,r)+"-\n-"+e.slice(r);if(-1===n)return e.slice(0,i)+"\n"+e.slice(i+1);if(-1===i)return e.slice(0,n)+"\n"+e.slice(n+1);let l=n-r,s=r-i;return l<s?e.slice(0,n)+"\n"+e.slice(n+1):e.slice(0,i)+"\n"+e.slice(i+1)},_=e=>{let{code:t}=e;return(0,n.jsx)(s.CodeEditor,{className:"w-full bg-[#232323] text-lg md:text-xl",language:A(),theme:f,text:t,readonly:!0,editable:!1,basicSetup:{highlightActiveLine:!1}})}},19170:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/apl_shield.ed187f2a.png",height:200,width:200,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAJFBMVEX///////9MaXH////////////////////////////+/v7///9Xx+kjAAAADHRSTlMWQgAHSjeWIl1he2c8OXMwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAN0lEQVR4nBXKyRHAMAwDsSUlWj767zcTvEGkJApdhqpGddZti/RaV4Q589h7KJVNG9N/NTYS9gciiwDfROwsIQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},1130:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/apple.6c3f0c2f.svg",height:448,width:377,blurWidth:0,blurHeight:0}},76416:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/branch.265fb28d.svg",height:512,width:448,blurWidth:0,blurHeight:0}},7168:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/chrome.ff145c23.svg",height:512,width:512,blurWidth:0,blurHeight:0}},52270:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/circuit.8cf8dc9f.png",height:144,width:144,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAFVBMVEX///////////////////9MaXH///+o1vOyAAAAB3RSTlP+SJWR4gDrA4oyQgAAAAlwSFlzAAALEwAACxMBAJqcGAAAACJJREFUeJyVxrEBADAIw7AYHP4/uTdUk1JOj4ZJkuUvRZU+Dw8AZ0UlQUcAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8}},17085:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/code.4f400729.svg",height:510,width:622,blurWidth:0,blurHeight:0}},31575:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/cubes.52bfa026.svg",height:505,width:577,blurWidth:0,blurHeight:0}},5274:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/docs.71257e0f.svg",height:512,width:384,blurWidth:0,blurHeight:0}},44550:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/envelope.68fbd887.svg",height:384,width:512,blurWidth:0,blurHeight:0}},52347:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/gamepad.7f8c19fe.svg",height:384,width:640,blurWidth:0,blurHeight:0}},91036:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/gears.43219d75.png",height:902,width:1e3,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAMFBMVEX///////9MaXH9/f39/f39/f3////////9/f39/f39/f3////8/Pz////////8/PxSdW9IAAAAEHRSTlMB/gC4zN4nCe6lhhV3OJl/vtUq/QAAAAlwSFlzAAALEwAACxMBAJqcGAAAADVJREFUeJwFwYcBwDAMwzBaXpnN/98WQOjOWA3aYWYPVCOPOf1O2LDFzHQfcxMen6rFDS8BPyYIAS1kXKiqAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:7}},17421:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/github.8d24eda3.svg",height:484,width:496,blurWidth:0,blurHeight:0}},75066:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/hashtag.846670df.svg",height:448,width:448,blurWidth:0,blurHeight:0}},95972:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/idt_starburst.88e8b2ee.png",height:225,width:225,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAG1BMVEX////////////////8/Pz8/Pz////6+vr///99a9SwAAAACXRSTlMBGFZKDR17NWmxn4fzAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAMUlEQVR4nB2KyQ0AMAzCDOTYf+Mq5WNZBkDNrWu3dB47gopnnKKdGbuhk59Qxf8MOjwViwCORSWurQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},6421:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/jataware_logo.4e4a6b84.png",height:200,width:200,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAADFBMVEX8/Pz///////9MaXEa7cJzAAAABHRSTlMeAgEAGcqjGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAACZJREFUeJxjYIYCBmZGMGBmgIswMYABMwMjjIFQzMTExMjIhBABABKeAIZ0gaXxAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8}},8757:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/jhu_hub.bc0ef920.svg",height:56,width:110,blurWidth:0,blurHeight:0}},47876:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/jhu_shield.7014cafb.png",height:230,width:215,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAMAAAAC2hU0AAAALVBMVEX///////9MaXH///////////////////////////////////////////////8tkOLtAAAAD3RSTlOUcgAwZSJMptE9hFVZCheRDfJyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVR4nAXBhwHAMAzDMMo7o/3/3AD4QZxFxsyEc3UDREmwRbFbXfyRCz7MvdoNs4w0eyGwAP+tG93HAAAAAElFTkSuQmCC",blurWidth:7,blurHeight:8}},34722:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/linkedin.95ede3ed.svg",height:448,width:448,blurWidth:0,blurHeight:0}},13754:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/linux_logo.b344922a.png",height:154,width:128,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAMAAAAC2hU0AAAAMFBMVEVMaXH////////////////////////////////////////////////////////////6w4mEAAAAD3RSTlMA4jRaDpWq8bpIfmj+HSqrp8S2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAANklEQVR4nBXFxxHAQAgDQAmOdMH0362H/SyATwRDTde875mfd8oCNDrOgxibu8Dw5k0Ys5z1AyCZATNVl6EJAAAAAElFTkSuQmCC",blurWidth:7,blurHeight:8}},59959:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/object_group.e44e708c.svg",height:448,width:512,blurWidth:0,blurHeight:0}},19045:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/table.0c847b8e.svg",height:448,width:512,blurWidth:0,blurHeight:0}},19804:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/trello.b6d26a4c.svg",height:448,width:448,blurWidth:0,blurHeight:0}},38414:function(e,t,r){"use strict";r.r(t),t.default={src:"/_next/static/media/windows.6da4ff71.svg",height:448,width:448,blurWidth:0,blurHeight:0}},30622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),i=Symbol.for("react.element"),l=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,o=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function c(e,t,r){var n,l={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)s.call(t,n)&&!a.hasOwnProperty(n)&&(l[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===l[n]&&(l[n]=t[n]);return{$$typeof:i,type:e,key:c,ref:u,props:l,_owner:o.current}}t.Fragment=l,t.jsx=c,t.jsxs=c},57437:function(e,t,r){"use strict";e.exports=r(30622)}},function(e){e.O(0,[6401,6685,3222,4769,9659,2971,596,1744],function(){return e(e.s=40382)}),_N_E=e.O()}]);