"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8203],{77705:function(t,e,r){r.r(e),r.d(e,{Code:function(){return p},CodeBlock:function(){return m},CodeEditor:function(){return x},PlaintextBlock:function(){return g}});var n=r(57437),o=r(35934),s=r(57518),a=r(6374),i=r(34155),l=r(43490),c=r(98116),u=r(2265),d=r(74769),h=r(13591);o.Z.registerLanguage("bash",s.Z),o.Z.registerLanguage("python",a.Z);let f={hybrid:i.Z,railscasts:l.Z},g=t=>{let{text:e,className:r=""}=t;return(0,n.jsx)("div",{className:"mb-6",children:(0,n.jsx)(h.Z6,{className:(0,d.m6)("w-full",r),children:(0,n.jsx)("div",{className:"w-full rounded-md",children:(0,n.jsx)("div",{className:"p-2 whitespace-pre font-mono",children:e})})})})},m=t=>{let{language:e,style:r,code:s,className:a=""}=t;return(0,n.jsx)("div",{className:(0,d.m6)("rounded-md overflow-hidden mb-6",a),children:(0,n.jsx)(o.Z,{language:e,style:r?f[r]:l.Z,children:s})})},p=t=>{let{language:e,style:r,code:s}=t,a=r?f[r]:l.Z,i=a.hljs.background;return(0,n.jsx)("span",{className:"rounded-md",children:(0,n.jsx)(o.Z,{language:e,style:a,customStyle:{display:"inline",padding:"0.125rem 0.25rem",margin:"0 0.125rem",backgroundColor:i,border:"1px solid #444444",borderRadius:"inherit"},children:s})})},x=t=>{let{text:e,setText:r,readonly:o,editable:s,basicSetup:a={},theme:i,language:l,onFocus:d,className:h}=t,f=(0,u.useRef)(null),{setContainer:g}=(0,c.Uq)({container:f.current,theme:i,value:e,readOnly:o,editable:s,extensions:[l],onChange:t=>{null==r||r(t)},basicSetup:{lineNumbers:!1,foldGutter:!1,drawSelection:!1,allowMultipleSelections:!1,highlightActiveLine:!0,highlightSelectionMatches:!1,dropCursor:!1,indentOnInput:!1,rectangularSelection:!1,tabSize:4,closeBracketsKeymap:!1,searchKeymap:!1,foldKeymap:!1,completionKeymap:!1,lintKeymap:!1,autocompletion:!1,...a}});return(0,u.useEffect)(()=>{f.current&&g(f.current)}),(0,n.jsx)("div",{className:h,onFocus:d,children:(0,n.jsx)("div",{ref:f})})}},25589:function(t,e,r){r.d(e,{y:function(){return h},E:function(){return f}});var n=r(30684),o=r(48262),s=r(35209);let a=0,i=t=>{if(t.startsWith("\\u")||t.startsWith("\\U")||t.startsWith("\\x")||t.startsWith("\\X")){let e=2;for(;e<t.length&&/[0-9a-fA-F]/.test(t[e]);)e++;return{type:"number",start:0,end:e}}},l=t=>{if(t.startsWith("\\"))return"n"==t[1]||"r"==t[1]||"t"==t[1]||"v"==t[1]||"b"==t[1]||"f"==t[1]||t[1],{type:"escape",start:0,end:2}},c={'"':'"',"'":"'","{":"}"},u=[t=>{let e=0;if(t.startsWith("/{")&&(a+=1,e=2),0!=a){for(;a>0&&e<t.length;){if(t.startsWith("/{",e)){a++,e+=2;continue}if(t.startsWith("}/",e)){a--,e+=2;continue}e++}return{type:"comment",start:0,end:e}}},t=>{if(t.startsWith("//")){let e=2;for(;e<t.length&&"\n"!=t[e];)e++;return{type:"comment",start:0,end:e}}},t=>t.startsWith("ϵ")?{type:"null",start:0,end:1}:t.startsWith("\\e")||t.startsWith("''")||t.startsWith('""')||t.startsWith("{}")?{type:"null",start:0,end:2}:void 0,t=>t.startsWith("\\u")||t.startsWith("\\U")||t.startsWith("\\x")||t.startsWith("\\X")?{type:"unit",start:0,end:2}:t.startsWith("V")||t.startsWith("U")||t.startsWith("ξ")?{type:"unit",start:0,end:1}:void 0,i,t=>{let e=0;for(;e<t.length&&/[0-9]/.test(t[e]);)e++;if(e>0)return{type:"number",start:0,end:e}},t=>{if(t.startsWith("#")){let e=1;for(;e<t.length&&/[a-zA-Z0-9_]/.test(t[e]);)e++;return{type:"tagName",start:0,end:e}}},t=>{if(t.startsWith("[")){let e=[{type:"bracket",start:0,end:1}],r=1;for(;r<t.length;){let n;if("\n"==t[r]||" "==t[r]){r++;continue}if((n=i(t.slice(r)))||(n=l(t.slice(r)))){n.start+=r,n.end+=r,e.push(n),r=n.end;continue}if("-"==t[r]){e.push({type:"operator",start:r,end:r+1}),r++;continue}if("["==t[r]&&(e.push({type:"invalid",start:r,end:r+1}),r++),"]"==t[r])return e.push({type:"bracket",start:r,end:r+1}),e;e.push({type:"literal",start:r,end:r+1}),r++}}},t=>{let e;if(t.length<=2)return;let r=t[0];if(!('"'==r||"'"==r||"{"==r))return;let n=c[r],o=1,s=[{type:"literal",start:0,end:1}];for(;o<t.length;){if((e=i(t.slice(o)))||(e=l(t.slice(o)))){e.start+=o,e.end+=o,s.push(e),o=e.end;continue}if(t[o]==n)return[...s,{type:"literal",start:o,end:o+1}];s.push({type:"literal",start:o,end:o+1}),o++}},t=>{if(t.startsWith("(")||t.startsWith(")"))return{type:"paren",start:0,end:1}},t=>{if(".*+?~".includes(t[0]))return{type:"logicOperator",start:0,end:1}},t=>{if("=|-/>".includes(t[0]))return{type:"operator",start:0,end:1}},t=>{if(";"==t[0])return{type:"punctuation",start:0,end:1}}],d=t=>{let e=[],r=0;for(;r<t.length;){let n=u.reduce((e,n)=>e||n(t.slice(r)),void 0);n?Array.isArray(n)?(e.push(...n.map(t=>(t.start+=r,t.end+=r,t))),r=n[n.length-1].end):(n.start+=r,n.end+=r,e.push(n),r=n.end):(e.push({type:"invalid",start:r,end:r+1}),r++)}return e},h=()=>new n.ri(n.il.define({token:(t,e)=>{if(e.index>=e.tokens.length&&(e.tokens=d(t.string),e.index=0),e.index<e.tokens.length){let r=e.tokens[e.index++];return t.pos=r.end,r.type}return t.skipToEnd(),null},startState:()=>({tokens:[],index:0})})),f=(t=>{var{theme:e,settings:r={},styles:s=[]}=t,a={".cm-gutters":{}},i={};r.background&&(i.backgroundColor=r.background),r.backgroundImage&&(i.backgroundImage=r.backgroundImage),r.foreground&&(i.color=r.foreground),(r.background||r.foreground)&&(a["&"]=i),r.fontFamily&&(a["&.cm-editor .cm-scroller"]={fontFamily:r.fontFamily}),r.gutterBackground&&(a[".cm-gutters"].backgroundColor=r.gutterBackground),r.gutterForeground&&(a[".cm-gutters"].color=r.gutterForeground),r.gutterBorder&&(a[".cm-gutters"].borderRightColor=r.gutterBorder),r.caret&&(a[".cm-content"]={caretColor:r.caret},a[".cm-cursor, .cm-dropCursor"]={borderLeftColor:r.caret});var l={};r.gutterActiveForeground&&(l.color=r.gutterActiveForeground),r.lineHighlight&&(a[".cm-activeLine"]={backgroundColor:r.lineHighlight},l.backgroundColor=r.lineHighlight),a[".cm-activeLineGutter"]=l,r.selection&&(a["&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"]={background:r.selection+" !important"}),r.selectionMatch&&(a["& .cm-selectionMatch"]={backgroundColor:r.selectionMatch});var c=o.tk.theme(a,{dark:"dark"===e}),u=n.Qf.define(s);return[c,(0,n.nF)(u)]})({theme:"light",settings:{background:"#232323",caret:"#AEAFAD",selection:"#356282",selectionMatch:"#00ff00",lineHighlight:"#333333"},styles:[{tag:s.pJ.comment,color:"#787b80"},{tag:s.pJ.literal,color:"#ce9178"},{tag:s.pJ.bracket,color:"#179fff"},{tag:s.pJ.escape,color:"#d7ba7d"},{tag:s.pJ.number,color:"#b5cea8"},{tag:s.pJ.tagName,color:"#9cdcfe"},{tag:s.pJ.null,color:"#00ff00"},{tag:s.pJ.unit,color:"#ff00ff"},{tag:s.pJ.paren,color:"#ffd700"},{tag:s.pJ.operator,color:"#ffffff"},{tag:s.pJ.punctuation,color:"#ffffff"},{tag:s.pJ.logicOperator,color:"#d44c4c"},{tag:s.pJ.invalid,color:"#ff0000"}]})},13591:function(t,e,r){r.d(e,{H1:function(){return c},H3:function(){return u},H4:function(){return d},OL:function(){return m},P:function(){return f},XZ:function(){return i},YS:function(){return g},Z6:function(){return p},iz:function(){return l},rU:function(){return h}});var n=r(57437),o=r(61396),s=r.n(o),a=r(74769);let i=t=>{let{label:e,isChecked:r,onChange:o,className:s}=t;return(0,n.jsxs)("div",{className:(0,a.m6)("flex items-center",s),children:[(0,n.jsx)("input",{type:"checkbox",id:"custom-checkbox",className:"hidden",checked:r,onChange:o}),(0,n.jsx)("label",{htmlFor:"custom-checkbox",className:" w-6 h-6 border-2 border-gray-300 rounded mr-2 cursor-pointer  bg-white  hover:border-gray-400 flex justify-center items-center ",children:r&&(0,n.jsx)("svg",{className:"w-4 h-4 mx-auto my-auto",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"black",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",children:(0,n.jsx)("polyline",{points:"20 6 9 17 4 12"})})}),e]})},l=t=>{let{className:e=""}=t;return(0,n.jsx)("hr",{className:(0,a.m6)("h-px my-4 bg-gray-500 border-0",e)})};function c(t){let{children:e,className:r="",...o}=t;return(0,n.jsx)("h1",{className:(0,a.m6)("text-4xl my-6 font-quadon",r),...o,children:e})}function u(t){let{children:e,className:r="",...o}=t;return(0,n.jsx)("h3",{className:(0,a.m6)("text-2xl mt-6 mb-2 font-quadon",r),...o,children:e})}function d(t){let{children:e,className:r="",...o}=t;return(0,n.jsx)("h3",{className:(0,a.m6)("text-xl mt-4 mb-2 font-quadon ",r),...o,children:e})}let h=t=>{let{href:e,children:r,className:o="",...i}=t;return(0,n.jsx)(s(),{href:e,className:(0,a.m6)("text-blue-400 hover:text-blue-500 font-gentona text-xl",o),...i,children:r||e.toString()})},f=t=>{let{children:e,className:r="",...o}=t;return(0,n.jsx)("p",{className:(0,a.m6)("mb-6 text-xl font-gentona text-justify",r),...o,children:e})},g=t=>{let{children:e,className:r="",...o}=t;return(0,n.jsx)("p",{className:(0,a.m6)("w-full my-4 text-xl font-gentona text-center",r),...o,children:e})},m=t=>{let{children:e,className:r="",...o}=t;return(0,n.jsx)("ol",{className:(0,a.m6)("list-decimal mb-6 pl-10 text-xl font-gentona",r),...o,children:e})},p=t=>{let{className:e="",children:r}=t;return(0,n.jsxs)("div",{className:(0,a.m6)("flex flex-row overflow-y-hidden overflow-x-auto",e),children:[" ",r]})}}}]);