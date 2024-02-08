"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8513],{29430:function(e,t,n){n.d(t,{U:function(){return o}});var r=n(57437),s=n(2265),l=n(74769);let o=e=>{let{title:t,children:n,defaultOpen:o=!1}=e,[a,i]=(0,s.useState)(o),c=a?"":"-rotate-90";return(0,r.jsxs)("div",{className:"my-2",children:[(0,r.jsxs)("button",{className:"flex items-center w-full text-left",onClick:()=>i(!a),children:[(0,r.jsx)("svg",{className:(0,l.m6)("h-4 w-4 mr-2 transform transition-transform",c),fill:"currentColor",viewBox:"0 0 96.154 96.154",children:(0,r.jsx)("path",{d:"M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61 c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056 c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"})}),(0,r.jsx)("span",{className:"font-quadon text-xl",children:t})]}),a&&(0,r.jsx)("div",{className:"py-2",children:n})]})}},77705:function(e,t,n){n.r(t),n.d(t,{Code:function(){return x},CodeBlock:function(){return g},CodeEditor:function(){return b},PlaintextBlock:function(){return m},get_lang_support:function(){return w},parse_lang:function(){return y}});var r=n(57437),s=n(35934),l=n(57518),o=n(6374),a=n(34155),i=n(43490),c=n(98116),u=n(30684),d=n(2265),f=n(74769),p=n(13591);s.Z.registerLanguage("bash",l.Z),s.Z.registerLanguage("python",o.Z);let h={hybrid:a.Z,railscasts:i.Z},m=e=>{let{text:t,className:n=""}=e;return(0,r.jsx)("div",{className:"mb-6",children:(0,r.jsx)(p.Z6,{className:(0,f.m6)("w-full rounded-md",n),children:(0,r.jsx)("div",{className:"w-full",children:(0,r.jsx)("div",{className:"p-2 whitespace-pre font-fira-code",children:t})})})})},g=e=>{let{language:t,style:n,code:l,className:o=""}=e;return(0,r.jsx)("div",{className:(0,f.m6)("rounded-md overflow-hidden mb-6",o),children:(0,r.jsx)(s.Z,{language:t,style:n?h[n]:i.Z,children:l})})},x=e=>{let{language:t,style:n,code:l}=e,o=n?h[n]:i.Z,a=o.hljs.background;return(0,r.jsx)("span",{className:"rounded-md",children:(0,r.jsx)(s.Z,{language:t,style:o,customStyle:{display:"inline",padding:"0.125rem 0.25rem",margin:"0 0.125rem",backgroundColor:a,border:"1px solid #444444",borderRadius:"inherit"},children:l})})},y=(e,t,n)=>{let r=[],s=0;for(;s<e.length;){let l=n(t),o=l.reduce((n,r)=>n||r(e.slice(s),t),void 0);o?Array.isArray(o)?(r.push(...o.map(e=>(e.start+=s,e.end+=s,e))),s=o[o.length-1].end):(o.start+=s,o.end+=s,r.push(o),s=o.end):(r.push({type:"invalid",start:s,end:s+1}),s++)}return r},w=(e,t)=>()=>new u.ri(u.il.define({token:(t,n)=>{if(n.index>=n.tokens.length&&(n.tokens=e(t.string,n),n.index=0),n.index<n.tokens.length){let e=n.tokens[n.index++];return t.pos=e.end,e.type}return t.skipToEnd(),null},startState:t})),b=e=>{let{text:t,setText:n,readonly:s,editable:l,basicSetup:o={},theme:a,language:i,onFocus:u,className:h}=e,m=(0,d.useRef)(null),g=(0,d.useRef)(null),[x,y]=(0,d.useState)(1024);(0,d.useEffect)(()=>{if(g.current&&g.current.clientWidth!==x&&y(g.current.clientWidth),!g.current)return;let e=new ResizeObserver(()=>{g.current&&g.current.clientWidth!==x&&y(g.current.clientWidth)});return e.observe(g.current),()=>e.disconnect()});let{setContainer:w}=(0,c.Uq)({container:m.current,minWidth:"".concat(x,"px"),theme:a,value:t,readOnly:s,editable:l,extensions:[i],onChange:e=>{null==n||n(e)},basicSetup:{lineNumbers:!1,foldGutter:!1,drawSelection:!1,allowMultipleSelections:!1,highlightActiveLine:!0,highlightSelectionMatches:!1,dropCursor:!1,indentOnInput:!1,rectangularSelection:!1,tabSize:4,closeBracketsKeymap:!1,searchKeymap:!1,foldKeymap:!1,completionKeymap:!1,lintKeymap:!1,autocompletion:!1,...o}});return(0,d.useEffect)(()=>{m.current&&w(m.current)}),(0,r.jsx)("div",{className:(0,f.m6)("w-full rounded-md overflow-hidden",h),ref:g,children:(0,r.jsx)(p.Z6,{className:"w-full",children:(0,r.jsx)("div",{onFocus:u,children:(0,r.jsx)("div",{ref:m})})})})}},6896:function(e,t,n){n.d(t,{j:function(){return N},k:function(){return C}});var r=n(25567),s=n(35209),l=n(77705);let o=e=>{var t;return null!==(t=e.context_stack.at(-1))&&void 0!==t?t:{type:"block",block_opener:"{"}},a=new Set(["loop","lazy","do","if","return","express","import","let","const"]),i=new Set("0123456789"),c=new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"),u=new Set("ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρςστυφχψω"),d=new Set("_!$&\xb0"),f=new Set([...c,...u,...d]),p=new Set([...c,...i,...u,...d]),h=(e,t)=>{let n=o(t);if("block"===n.type&&(e.startsWith('r"')||e.startsWith("r'"))){let n=e[1],r=1;for(;r+1<e.length&&e[r+1]===n;)r++;return r%2==0&&(r/=2),t.context_stack.push({type:"raw_string",string_opener:n,quote_count:r}),{type:"literal",start:0,end:2}}if("raw_string"===n.type){let{string_opener:r,quote_count:s}=n,l=r.repeat(s),o=0;for(;o<e.length&&!e.slice(o).startsWith(l);)o++;return e.slice(o).startsWith(l)&&(t.context_stack.pop(),o+=l.length),{type:"literal",start:0,end:o}}},m=new Map([["0b",new Set("01")],["0t",new Set("012")],["0q",new Set("0123")],["0s",new Set("012345")],["0o",new Set("01234567")],["0d",new Set("0123456789")],["0z",new Set("0123456789xeXE")],["0x",new Set("0123456789abcdefABCDEF")],["0u",new Set("0123456789abcdefghijklmnopqrstuvABCDEFGHIJKLMNOPQRSTUV")],["0r",new Set("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")],["0y",new Set("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!$")]]),g=new Set(["+","-","*","/","not","@","...","?","`",";","+","-","*","/","%","^","=?",">?","<?",">=?","<=?","in?","is?","isnt?","<=>","|","&","and","or","nand","nor","xor","xnor","??","else","=",":=","as","in","transmute","@?","|>","<|","=>","->","<->","<-",".",":","<<",">>","<<<",">>>","<<!","!>>",",",".."].sort((e,t)=>t.length-e.length)),x=new Set(" 	\n\r\v\f"),y=(e,t)=>{var n;let r=o(t);if("block"===r.type)return e.startsWith("/{")?(t.context_stack.push({type:"block_comment"}),{type:"comment",start:0,end:2}):void 0;let s=0;for(;(null===(n=t.context_stack.at(-1))||void 0===n?void 0:n.type)==="block_comment"&&s<e.length;){if(e.startsWith("/{",s)){t.context_stack.push({type:"block_comment"}),s+=2;continue}if(e.startsWith("}/",s)){t.context_stack.pop(),s+=2;continue}s++}return{type:"comment",start:0,end:s}},w=new Map([["{",new Set(["}"])],["(",new Set([")","]"])],["[",new Set(["]",")"])],["<",new Set([">"])]]),b=e=>w.has(e),v=(e,t)=>{if(b(e[0]))return t.context_stack.push({type:"block",block_opener:e[0]}),{type:"bracket",start:0,end:1};let n=o(t);if("block"!==n.type)return;let{block_opener:r}=n,s=w.get(r);for(let n of s)if(e.startsWith(n))return t.context_stack.pop(),{type:"bracket",start:0,end:1}},_=e=>{if(e.startsWith("\\"))return"n"==e[1]||"r"==e[1]||"t"==e[1]||"v"==e[1]||"b"==e[1]||"f"==e[1]||e[1],{type:"escape",start:0,end:2}},k=(e,t)=>{let n=o(t);if("block"===n.type&&(e.startsWith('"')||e.startsWith("'"))){let n=e[0],r=1;for(;r+1<e.length&&e[r+1]===n;)r++;return r%2==0&&(r/=2),t.context_stack.push({type:"string",string_opener:n,quote_count:r}),{type:"literal",start:0,end:1}}if("string"===n.type){let r=_(e);if(r)return r;if("{"===e[0]){let n=v(e,t);if(n)return n}let{string_opener:s,quote_count:l}=n,o=s.repeat(l),a=0;for(;a<e.length&&!e.slice(a).startsWith(o)&&"{"!==e[a]&&"\\"!==e[a];)a++;return e.slice(a).startsWith(o)&&(t.context_stack.pop(),a+=o.length),{type:"literal",start:0,end:a}}},j={block_comment:[y],string:[k],block:[y,e=>{if(e.startsWith("//")){let t=2;for(;t<e.length&&"\n"!=e[t];)t++;return{type:"comment",start:0,end:t}}},e=>{let t=0;for(;t<e.length&&x.has(e[t]);)t++;if(0!=t)return{type:"comment",start:0,end:t}},h,e=>{for(let t of a)if(e.startsWith(t)&&!c.has(e[t.length]))return{type:"keyword",start:0,end:t.length}},e=>{for(let t of g)if(e.startsWith(t)){if(c.has(e[t.length-1])&&e[t.length]&&c.has(e[t.length]))continue;return{type:"operator",start:0,end:t.length}}},e=>e.startsWith("true")&&!c.has(e[4])?{type:"bool",start:0,end:4}:e.startsWith("false")&&!c.has(e[5])?{type:"bool",start:0,end:5}:void 0,e=>{if(e.startsWith("#")){let t=1;for(;t<e.length&&p.has(e[t]);)t++;if(t>1)return{type:"tagName",start:0,end:t}}},e=>{if(f.has(e[0])){let t=1;for(;t<e.length&&p.has(e[t]);)t++;return{type:"name",start:0,end:t}}},e=>{for(let[t,n]of m)if(e.toLowerCase().startsWith(t)){let r=t.length;for(;r<e.length&&(n.has(e[r])||"_"==e[r]);)r++;if(r==t.length||"."!=e[r])return;r++;let s=0;for(;r+s<e.length&&(n.has(e[r+s])||"_"==e[r+s]);)s++;if(0==s)return;return{type:"number",start:0,end:r+s}}},e=>{for(let[t,n]of m)if(e.toLowerCase().startsWith(t)){let r=t.length;for(;r<e.length&&(n.has(e[r])||"_"==e[r]);)r++;if(r==t.length)return;return{type:"number",start:0,end:r}}},e=>{if(0==e.length||!i.has(e[0]))return;let t=1;for(;t<e.length&&(i.has(e[t])||"_"==e[t]);)t++;if(0==t||"."!=e[t]||++t==e.length||!i.has(e[t]))return;let n=1;for(;t+n<e.length&&i.has(e[t+n])||"_"==e[t+n];)n++;if(0!=n)return{type:"number",start:0,end:t+n}},e=>{if(0==e.length||!i.has(e[0]))return;let t=1;for(;t<e.length&&(i.has(e[t])||"_"==e[t]);)t++;if(0!=t)return{type:"number",start:0,end:t}},v,k],type_param:[],raw_string:[h]},S=e=>j[o(e).type],C=(0,l.get_lang_support)((e,t)=>(0,l.parse_lang)(e,t,S),()=>({tokens:[],index:0,context_stack:[]})),N=(0,r.j)({theme:"light",settings:{background:"#232323",caret:"#AEAFAD",selection:"#356282",selectionMatch:"#00ff00",lineHighlight:"#333333"},styles:[{tag:s.pJ.comment,color:"#787b80"},{tag:s.pJ.literal,color:"#ce9178"},{tag:s.pJ.bracket,color:"#179fff"},{tag:s.pJ.escape,color:"#d7ba7d"},{tag:s.pJ.number,color:"#b5cea8"},{tag:s.pJ.tagName,color:"#9cdcfe"},{tag:s.pJ.keyword,color:"#569cd6"},{tag:s.pJ.name,color:"#4ec9b0"},{tag:s.pJ.bool,color:"#569cd6"},{tag:s.pJ.null,color:"#00ff00"},{tag:s.pJ.unit,color:"#ff00ff"},{tag:s.pJ.paren,color:"#ffd700"},{tag:s.pJ.operator,color:"#ffffff"},{tag:s.pJ.punctuation,color:"#ffffff"},{tag:s.pJ.logicOperator,color:"#d44c4c"},{tag:s.pJ.invalid,color:"#ff0000"}]})},13591:function(e,t,n){n.d(t,{H1:function(){return c},H3:function(){return u},H4:function(){return d},OL:function(){return m},P:function(){return p},XZ:function(){return a},YS:function(){return h},Z6:function(){return g},iz:function(){return i},rU:function(){return f}});var r=n(57437),s=n(61396),l=n.n(s),o=n(74769);let a=e=>{let{label:t,isChecked:n,onChange:s,className:l}=e;return(0,r.jsxs)("div",{className:(0,o.m6)("flex items-center",l),children:[(0,r.jsx)("input",{type:"checkbox",id:"custom-checkbox",className:"hidden",checked:n,onChange:s}),(0,r.jsx)("label",{htmlFor:"custom-checkbox",className:" w-6 h-6 border-2 border-gray-300 rounded mr-2 cursor-pointer  bg-white  hover:border-gray-400 flex justify-center items-center ",children:n&&(0,r.jsx)("svg",{className:"w-4 h-4 mx-auto my-auto",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"black",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",children:(0,r.jsx)("polyline",{points:"20 6 9 17 4 12"})})}),t]})},i=e=>{let{className:t=""}=e;return(0,r.jsx)("hr",{className:(0,o.m6)("h-px my-4 bg-gray-500 border-0",t)})};function c(e){let{children:t,className:n="",...s}=e;return(0,r.jsx)("h1",{className:(0,o.m6)("text-4xl my-6 font-quadon",n),...s,children:t})}function u(e){let{children:t,className:n="",...s}=e;return(0,r.jsx)("h3",{className:(0,o.m6)("text-2xl mt-6 mb-2 font-quadon",n),...s,children:t})}function d(e){let{children:t,className:n="",...s}=e;return(0,r.jsx)("h3",{className:(0,o.m6)("text-xl mt-4 mb-2 font-quadon ",n),...s,children:t})}let f=e=>{let{href:t,children:n,className:s="",...a}=e;return(0,r.jsx)(l(),{href:t,className:(0,o.m6)("text-blue-400 hover:text-blue-500 font-gentona text-xl",s),...a,children:n||t.toString()})},p=e=>{let{children:t,className:n="",...s}=e;return(0,r.jsx)("p",{className:(0,o.m6)("mb-6 text-xl font-gentona text-justify",n),...s,children:t})},h=e=>{let{children:t,className:n="",...s}=e;return(0,r.jsx)("p",{className:(0,o.m6)("w-full my-4 text-xl font-gentona text-center",n),...s,children:t})},m=e=>{let{children:t,className:n="",...s}=e;return(0,r.jsx)("ol",{className:(0,o.m6)("list-decimal mb-6 pl-10 text-xl font-gentona",n),...s,children:t})},g=e=>{let{className:t="",children:n}=e;return(0,r.jsxs)("div",{className:(0,o.m6)("flex flex-row overflow-y-hidden overflow-x-auto",t),children:[" ",n]})}},78513:function(e,t,n){n.r(t),n.d(t,{default:function(){return w}});var r=n(57437),s=n(2265),l=n(57922),o=n(38527);n(67807);let a=()=>{let e=(0,s.useRef)(null),t=(0,s.useRef)(),n=(0,s.useRef)(),r=(0,s.useRef)();(0,s.useEffect)(()=>{if(e.current&&!t.current){let s=new l.Terminal({convertEol:!0,fontSize:18,fontFamily:"monospace"}),a=new o.FitAddon;s.loadAddon(a),s.open(e.current),a.fit(),s.onData(e=>{if(void 0!==n.current){if("\r"===e){var t;null===(t=r.current)||void 0===t||t.call(r,n.current.join("")),n.current=void 0,r.current=void 0,s.write("\r\n")}else"\x7f"===e||"\b"===e?n.current.length>0&&(n.current.pop(),s.write("\b \b")):(n.current.push(e),s.write(e))}}),s.attachCustomKeyEventHandler(e=>"ArrowUp"!==e.key&&"ArrowDown"!==e.key&&"ArrowLeft"!==e.key&&"ArrowRight"!==e.key),t.current=s}return()=>{t.current&&t.current.dispose()}},[]);let a=async()=>new Promise(e=>{n.current=[],r.current=e});return{divRef:e,read:a,write:e=>{var n;null===(n=t.current)||void 0===n||n.write(e)},clear:()=>{var e;null===(e=t.current)||void 0===e||e.clear()}}};var i=n(52543),c=n(62612);let u=e=>{let{stdout:t=e=>console.log(e),stdin:r=async()=>"<no stdin callback set>"}=e,[l,o]=(0,s.useState)(),a=(0,s.useRef)(),[u,d]=(0,s.useState)(!1),f=(0,s.useRef)(),p=e=>{t(String.fromCharCode(e))},h=(e,t)=>{(async()=>{var n;let s=null!==(n=await (null==r?void 0:r()))&&void 0!==n?n:"<no stdin function provided>";(0,i.writeMessage)(e,{message:s},t)})()};(0,s.useEffect)(()=>{"serviceWorker"in navigator||(console.error("service workers not supported. Falling back to prompt() io"),a.current=!0);let e=(0,i.makeServiceWorkerChannel)({scope:"_next/static/chunks/"});o(e)},[]),(0,s.useEffect)(()=>{l&&(async()=>{let e=new Worker(n.tu(new URL(n.p+n.u(8154),n.b))),t=c.Ud(e);await t.setChannel(l),await t.setRawStdout(c.sj(p)),void 0===a.current&&await t.setInputRequester(c.sj(h)),await t.initializePyodide(),f.current=t,d(!0)})()},[l]);let m=u?async e=>{await f.current.runPython(e)}:void 0;return{runPython:m}},d=e=>{let{stdout:t,stdin:n}=e,{runPython:r}=u({stdout:t,stdin:n}),[l,o]=(0,s.useState)(!1);if((0,s.useEffect)(()=>{void 0!==r&&(async()=>{await r("\nimport importlib.abc\nimport importlib.machinery\nimport sys\n\n# Simulated file contents\nfile_contents: dict[str,str] = {}\n\n# Register a file\ndef register_file(name, code):\n    file_contents[name] = code\n\n# Custom module loader\nclass StringLoader(importlib.abc.Loader):\n    def __init__(self, name, code):\n        self.name = name\n        self.code = code\n\n    def get_source(self, fullname):\n        return self.code\n\n    def get_filename(self, fullname):\n        return '<string_loader: {}>'.format(fullname)\n\n    def is_package(self, fullname):\n        return False\n\n    def exec_module(self, module):\n        exec(compile(self.get_source(module.__name__), self.get_filename(module.__name__), 'exec'), module.__dict__)\n\n# Custom module finder\nclass StringFinder(importlib.abc.MetaPathFinder):\n    def find_spec(self, fullname, path, target=None):\n        if fullname in file_contents:\n            return importlib.machinery.ModuleSpec(fullname, StringLoader(fullname, file_contents[fullname]), is_package=False)\n        return None\n\n# Install the custom finder\nsys.meta_path.insert(0, StringFinder())\n"),o(!0)})()},[r]),!l)return{addModule:void 0,run:void 0};let a=async e=>{let t=e.code.replace(/\\/g,"\\\\").replace(/'/g,"\\'");await r("register_file('".concat(e.name,"', '''").concat(t,"''')"))},i=async e=>{await r(e)};return{addModule:a,run:i}},f={small:"w-8 h-8",medium:"w-16 h-16",large:"w-32 h-32"},p=e=>{let{size:t}=e,n=f[t];return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{role:"status",children:[(0,r.jsxs)("svg",{"aria-hidden":"true",className:"".concat(n," mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-accent"),viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,r.jsx)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,r.jsx)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]}),(0,r.jsx)("span",{className:"sr-only",children:"Loading..."})]})})};var h=n(29430),m=n(77705),g=n(6896),x=n(74769);let y=e=>{let t=e.replace(/\\/g,"\\\\").replace(/'/g,"\\'");return"\n# turn off any printing while importing stuff\nimport sys\nimport io\n_stdout = sys.stdout\n_stderr = sys.stderr\nsys.stdout = io.StringIO()\nsys.stderr = io.StringIO()\n\n# silent imports\nfrom tokenizer import tokenize\nfrom postok import post_process\nfrom parser import top_level_parse\nfrom dewy import Scope, Builtin\nfrom functools import partial\n\n# turn printing back on\nsys.stdout = _stdout\nsys.stderr = _stderr\n\n# update the builtin print function to flush after every use\nBuiltin.funcs = {\n    'print': partial(print, end='', flush=True),\n    'printl': partial(print, flush=True),\n    'readl': input\n}\n\n# define main entry point\ndef dewy(src:str):\n    tokens = tokenize(src)\n    post_process(tokens)\n\n    root = Scope.default()\n    ast = top_level_parse(tokens, root)\n    res = ast.eval(root)\n    # if res: print(res) #causes weird behavior in most cases\n\n# replace pdb.set_trace with a message and exit(1)\nimport pdb\ndef pdb_set_trace():\n    print('ERROR: encountered syntax which is not yet implemented. exiting.', flush=True)\n    exit(1)\npdb.set_trace = pdb_set_trace\n\n# run dewy source code\ntry:\n    dewy('''".concat(t,"'''); sys.stdout.flush()\nexcept IOError:\n    print('ERROR: failed to read input. exiting.', flush=True)\nexcept Exception as e:\n    print(f'ERROR: {e}')\n    print('ERROR: encountered problem while running. exiting.', flush=True)\n")};var w=e=>{let{dewy_interpreter_source:t,dewy_examples:n}=e,[l,o]=(0,s.useState)(!1),[i,c]=(0,s.useState)(!1),[u,f]=(0,s.useState)("print'what is your name? '\nname = readl\nprintl'Hello {name}'"),{divRef:w,write:b,read:v,clear:_}=a(),{addModule:k,run:j}=d({stdout:b,stdin:v});return(0,s.useEffect)(()=>{void 0!==k&&void 0!=j&&(async()=>{for(let e of t)await k(e);o(!0)})()},[k,j]),(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"relative flex flex-col gap-4",children:[(0,r.jsx)(m.CodeEditor,{className:"w-full bg-[#232323] text-xl md:text-lg",text:u,setText:f,language:(0,g.k)(),theme:g.j,readonly:i}),(0,r.jsx)("div",{children:(0,r.jsx)("button",{className:(0,x.m6)("font-gentona text-2xl py-2 px-4 rounded-md",i?"bg-[#343434] text-gray-500":"bg-[#232323] hover:bg-[#404040] text-white"),onClick:async()=>{c(!0),_(),await j(y(u)),c(!1)},disabled:i,children:"Run"})}),(0,r.jsx)("div",{className:"border-2 border-white rounded-md",ref:w}),(0,r.jsxs)("div",{className:"w-full",children:[(0,r.jsx)(h.U,{title:"Working Examples",children:(0,r.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:n.good_examples.map((e,t)=>{let{name:n,code:s}=e;return(0,r.jsx)("button",{className:"font-gentona text-2xl px-4 h-[3.5em] whitespace-pre bg-[#232323] hover:bg-[#404040] text-white rounded-md",onClick:()=>{_(),f(s)},children:n},t)})})}),(0,r.jsx)(h.U,{title:"Broken Examples",children:(0,r.jsx)("div",{className:"flex flex-row flex-wrap gap-2",children:n.bad_examples.map((e,t)=>{let{name:n,code:s}=e;return(0,r.jsx)("button",{className:"font-gentona text-2xl px-4 h-[3.5em] whitespace-pre bg-[#232323] hover:bg-[#404040] text-white rounded-md",onClick:()=>{_(),f(s)},children:n},t)})})})]}),!l&&(0,r.jsx)("div",{className:"absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center",children:(0,r.jsx)(p,{size:"medium"})})]})})}}}]);