(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3656],{61612:function(e,t,r){Promise.resolve().then(r.bind(r,33288))},33288:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return d}});var n=r(57437),l=r(2265),o=r(98864),a=r.n(o);let u=a()(()=>Promise.all([r.e(6401),r.e(9838),r.e(6685),r.e(4769),r.e(9659),r.e(6413),r.e(3215),r.e(2435)]).then(r.bind(r,43215)),{loadableGenerated:{webpack:()=>[43215]},ssr:!1});r(74709);let s=async()=>{let e=["backend","dewy","frontend","parser","postok","tokenizer","utils"].map(async e=>{let t="".concat("https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/").concat(e,".py"),r=await fetch(t);return{name:e,code:await r.text()}});return await Promise.all(e)};var i=r(24033);let c=async()=>{let e=await s();return(0,n.jsx)("div",{className:"w-screen h-screen absolute top-0 left-0 z-50 bg-black overflow-y-scroll",children:(0,n.jsx)(f,{dewy_interpreter_source:e})})},f=e=>{let{dewy_interpreter_source:t}=e,r=(0,i.useSearchParams)(),o=r.get("src")||'printl"Hello, World!"',a=(0,l.useRef)(null);return(0,l.useEffect)(()=>{let e=new ResizeObserver(e=>{for(let t of e){let{width:e,height:r}=t.contentRect;window.parent.postMessage({width:e,height:r},"*")}});return a.current&&e.observe(a.current),()=>e.disconnect()},[]),(0,n.jsx)("div",{ref:a,children:(0,n.jsx)("div",{className:"p-2",children:(0,n.jsx)(u,{dewy_interpreter_source:t,initial_code:o})})})};var d=c},74709:function(e,t,r){"use strict";r.d(t,{$K:function(){return n},kB:function(){return o}});let n=e=>void 0!==e,l=new Map([["january",0],["february",1],["march",2],["april",3],["may",4],["june",5],["july",6],["august",7],["september",8],["october",9],["november",10],["december",11]]),o=e=>{let t=new Date(e);if(!isNaN(t.getTime()))return t;let r=e.toLowerCase().split(" ");if(2!==r.length)throw Error("String must be in the format '<Month> <Year>'. Got '".concat(e,"'"));let n=r[0],o=parseInt(r[1]);if(isNaN(o))throw Error("Invalid year");let a=l.get(n);if(void 0===a)throw Error("Invalid month name");return new Date(o,a)}},98864:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let n=r(21024);r(2265);let l=n._(r(90533));function o(e){return{default:(null==e?void 0:e.default)||e}}function a(e,t){let r=l.default,n={loading:e=>{let{error:t,isLoading:r,pastDelay:n}=e;return null}};"function"==typeof e&&(n.loader=e),Object.assign(n,t);let a=n.loader;return r({...n,loader:()=>null!=a?a().then(o):Promise.resolve(o(()=>null))})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},33699:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{suspense:function(){return l},NoSSR:function(){return o}}),r(21024),r(2265);let n=r(37669);function l(){let e=Error(n.NEXT_DYNAMIC_NO_SSR_CODE);throw e.digest=n.NEXT_DYNAMIC_NO_SSR_CODE,e}function o(e){let{children:t}=e;return t}},90533:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return a}});let n=r(21024),l=n._(r(2265)),o=r(33699),a=function(e){let t=Object.assign({loader:null,loading:null,ssr:!0},e);function r(e){let r=t.loading,n=l.default.createElement(r,{isLoading:!0,pastDelay:!0,error:null}),a=t.ssr?l.default.Fragment:o.NoSSR,u=t.lazy;return l.default.createElement(l.default.Suspense,{fallback:n},l.default.createElement(a,null,l.default.createElement(u,e)))}return t.lazy=l.default.lazy(t.loader),r.displayName="LoadableComponent",r}},30622:function(e,t,r){"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=r(2265),l=Symbol.for("react.element"),o=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,u=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,s={key:!0,ref:!0,__self:!0,__source:!0};function i(e,t,r){var n,o={},i=null,c=null;for(n in void 0!==r&&(i=""+r),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(c=t.ref),t)a.call(t,n)&&!s.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===o[n]&&(o[n]=t[n]);return{$$typeof:l,type:e,key:i,ref:c,props:o,_owner:u.current}}t.Fragment=o,t.jsx=i,t.jsxs=i},57437:function(e,t,r){"use strict";e.exports=r(30622)},24033:function(e,t,r){e.exports=r(68165)}},function(e){e.O(0,[2971,596,1744],function(){return e(e.s=61612)}),_N_E=e.O()}]);