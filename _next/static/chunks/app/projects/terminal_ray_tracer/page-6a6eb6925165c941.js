(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7146],{21837:function(e,t,i){Promise.resolve().then(i.bind(i,81278))},21798:function(e,t,i){"use strict";i.d(t,{g:function(){return U},l:function(){return B}});var r=i(57437),a=i(16691),n=i.n(a),l=i(13754),s=i(38414),d=i(1130),c=i(52347),u=i(17421),o=i(5274),A=i(75066),h=i(59959),g=i(8757),m=i(7168),f=i(19045),b=i(44550),p=i(34722),x=i(17085),w=i(31575),y=i(76416),v=i(52270),j=i(91036),M=i(19170),C=i(47876),_=i(95972),E=i(6421),N=i(19804),R=i(74769);let S={windows:s.default,apple:d.default,linux:l.default,gamepad:c.default,github:u.default,docs:o.default,hashtag:A.default,"object group":h.default,"jhu hub":g.default,chrome:m.default,table:f.default,envelope:b.default,linkedin:p.default,code:x.default,cubes:w.default,branch:y.default,circuit:v.default,gears:j.default,"apl shield":M.default,"jhu shield":C.default,"idt starburst":_.default,"jataware logo":E.default,trello:N.default},U=e=>{let{icon:t,responsive:i=!1,className:a="",children:l}=e,s=S[t];return(0,r.jsxs)("div",{className:(0,R.m6)("flex flex-row text-sm items-center",a),children:[(0,r.jsx)(n(),{src:s,alt:"".concat(t," icon"),className:"inline-block w-8 h-8 mr-2 ".concat(i?"md:w-12 md:h-12 md:mr-3 lg:w-16 lg:h-16 lg:mr-4":""," pointer-events-none select-none"),draggable:!1}),(0,r.jsx)("span",{className:"align-middle",children:l})]})},B=e=>{let{children:t,className:i=""}=e;return(0,r.jsx)("div",{className:(0,R.m6)("flex flex-col space-y-3",i),children:t})}},77705:function(e,t,i){"use strict";i.r(t),i.d(t,{Code:function(){return f},CodeBlock:function(){return m},CodeEditor:function(){return b},PlaintextBlock:function(){return g}});var r=i(57437),a=i(35934),n=i(57518),l=i(6374),s=i(34155),d=i(43490),c=i(98116),u=i(2265),o=i(74769),A=i(13591);a.Z.registerLanguage("bash",n.Z),a.Z.registerLanguage("python",l.Z);let h={hybrid:s.Z,railscasts:d.Z},g=e=>{let{text:t,className:i=""}=e;return(0,r.jsx)("div",{className:"mb-6",children:(0,r.jsx)(A.Z6,{className:(0,o.m6)("w-full",i),children:(0,r.jsx)("div",{className:"w-full rounded-md",children:(0,r.jsx)("div",{className:"p-2 whitespace-pre font-fira-code",children:t})})})})},m=e=>{let{language:t,style:i,code:n,className:l=""}=e;return(0,r.jsx)("div",{className:(0,o.m6)("rounded-md overflow-hidden mb-6",l),children:(0,r.jsx)(a.Z,{language:t,style:i?h[i]:d.Z,children:n})})},f=e=>{let{language:t,style:i,code:n}=e,l=i?h[i]:d.Z,s=l.hljs.background;return(0,r.jsx)("span",{className:"rounded-md",children:(0,r.jsx)(a.Z,{language:t,style:l,customStyle:{display:"inline",padding:"0.125rem 0.25rem",margin:"0 0.125rem",backgroundColor:s,border:"1px solid #444444",borderRadius:"inherit"},children:n})})},b=e=>{let{text:t,setText:i,readonly:a,editable:n,basicSetup:l={},theme:s,language:d,onFocus:o,className:A}=e,h=(0,u.useRef)(null),{setContainer:g}=(0,c.Uq)({container:h.current,theme:s,value:t,readOnly:a,editable:n,extensions:[d],onChange:e=>{null==i||i(e)},basicSetup:{lineNumbers:!1,foldGutter:!1,drawSelection:!1,allowMultipleSelections:!1,highlightActiveLine:!0,highlightSelectionMatches:!1,dropCursor:!1,indentOnInput:!1,rectangularSelection:!1,tabSize:4,closeBracketsKeymap:!1,searchKeymap:!1,foldKeymap:!1,completionKeymap:!1,lintKeymap:!1,autocompletion:!1,...l}});return(0,u.useEffect)(()=>{h.current&&g(h.current)}),(0,r.jsx)("div",{className:A,onFocus:o,children:(0,r.jsx)("div",{ref:h})})}},13591:function(e,t,i){"use strict";i.d(t,{H1:function(){return c},H3:function(){return u},H4:function(){return o},OL:function(){return m},P:function(){return h},XZ:function(){return s},YS:function(){return g},Z6:function(){return f},iz:function(){return d},rU:function(){return A}});var r=i(57437),a=i(61396),n=i.n(a),l=i(74769);let s=e=>{let{label:t,isChecked:i,onChange:a,className:n}=e;return(0,r.jsxs)("div",{className:(0,l.m6)("flex items-center",n),children:[(0,r.jsx)("input",{type:"checkbox",id:"custom-checkbox",className:"hidden",checked:i,onChange:a}),(0,r.jsx)("label",{htmlFor:"custom-checkbox",className:" w-6 h-6 border-2 border-gray-300 rounded mr-2 cursor-pointer  bg-white  hover:border-gray-400 flex justify-center items-center ",children:i&&(0,r.jsx)("svg",{className:"w-4 h-4 mx-auto my-auto",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",stroke:"black",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4",children:(0,r.jsx)("polyline",{points:"20 6 9 17 4 12"})})}),t]})},d=e=>{let{className:t=""}=e;return(0,r.jsx)("hr",{className:(0,l.m6)("h-px my-4 bg-gray-500 border-0",t)})};function c(e){let{children:t,className:i="",...a}=e;return(0,r.jsx)("h1",{className:(0,l.m6)("text-4xl my-6 font-quadon",i),...a,children:t})}function u(e){let{children:t,className:i="",...a}=e;return(0,r.jsx)("h3",{className:(0,l.m6)("text-2xl mt-6 mb-2 font-quadon",i),...a,children:t})}function o(e){let{children:t,className:i="",...a}=e;return(0,r.jsx)("h3",{className:(0,l.m6)("text-xl mt-4 mb-2 font-quadon ",i),...a,children:t})}let A=e=>{let{href:t,children:i,className:a="",...s}=e;return(0,r.jsx)(n(),{href:t,className:(0,l.m6)("text-blue-400 hover:text-blue-500 font-gentona text-xl",a),...s,children:i||t.toString()})},h=e=>{let{children:t,className:i="",...a}=e;return(0,r.jsx)("p",{className:(0,l.m6)("mb-6 text-xl font-gentona text-justify",i),...a,children:t})},g=e=>{let{children:t,className:i="",...a}=e;return(0,r.jsx)("p",{className:(0,l.m6)("w-full my-4 text-xl font-gentona text-center",i),...a,children:t})},m=e=>{let{children:t,className:i="",...a}=e;return(0,r.jsx)("ol",{className:(0,l.m6)("list-decimal mb-6 pl-10 text-xl font-gentona",i),...a,children:t})},f=e=>{let{className:t="",children:i}=e;return(0,r.jsxs)("div",{className:(0,l.m6)("flex flex-row overflow-y-hidden overflow-x-auto",t),children:[" ",i]})}},81278:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return m}});var r=i(57437),a=i(2265),n=i(13591),l=i(21798),s=i(77705),d=i.p+"static/app/(images)/terminal_ray_tracer/v1.500c2ea0c848f604.mp4",c=i.p+"static/app/(images)/terminal_ray_tracer/v2.d02d56326591e854.mp4",u=i.p+"static/app/(images)/terminal_ray_tracer/v3.1cdb330fa67c462c.mp4",o=i.p+"static/app/(images)/terminal_ray_tracer/v4.4012eed322eeeb1e.mp4",A=i.p+"static/app/(images)/terminal_ray_tracer/v5.a0339f108ef745da.mp4",h=i.p+"static/app/(images)/terminal_ray_tracer/v6.aeb0b18824621444.mp4";let g=e=>{let{videoSrc:t}=e,i=(0,a.useRef)(null);return(0,r.jsx)("div",{onMouseEnter:()=>{i.current&&i.current.play()},onMouseLeave:()=>{i.current&&i.current.pause()},className:"w-full h-full",children:(0,r.jsx)("video",{ref:i,src:t,muted:!0,loop:!0,className:"w-full h-full object-cover",children:"Your browser does not support the video tag."})})};var m=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.P,{children:["At the end of October 2021, I gained access to the beta for the"," ",(0,r.jsx)(n.rU,{href:"https://copilot.github.com/",children:"AI GitHub Copilot"}),", and wanted to test it out on something small in scope. I remembered a side project from 10th grade, I tried developing my own rendering engine from scratch. At the time, I lacked the math experience necessary to ultimately get it working. Though I'd never heard of a ray tracer before, it turns out the design I came up was almost identical (at the time, I was less interested in the reflection aspect, and more interested in the prospect of arbitrarily detailed geometry at any scale level, \xe0 la SVGs). Long story short, I figured it would be a fun challenge to write a ray tracer, now that I had the math background from my linear algebra and robotics classes in college. And as an added challenge (technically to make things easier), I decided that it should run directly in the terminal without the need for any sort of window or display."]}),(0,r.jsx)(n.P,{children:'As it turns out, Copilot isn\'t going to replace programmers any time soon (especially domain experts). I definitely was surprised by how well it "understood" what I wanted it to do, but in general, it tended to lack the high level view needed to get things working together, and also definitely had a hard time dealing with very specific domain problems. But it is still an incredible productivity booster—just about every situation where it was perfectly clear what the code needed to do, the copilot usually had the correct suggestion ready to go.'}),(0,r.jsx)(n.H3,{children:"Development"}),(0,r.jsx)(n.P,{children:"All clips are in real time, and running directly on my cpu (Intel\xae Core™ i7-6700 CPU @ 3.40GHz \xd7 8). Future work definitely includes converting to CUDA and other optimizations."}),(0,r.jsx)("div",{className:"w-full flex flex-col items-center",children:[[d,"Initial rendering of colored spheres"],[c,"Added reflections without lighting"],[u,"Added ground plane and sky color"],[o,"Added multiple rays per pixel for anti-aliasing. Also testing out higher resolution"],[A,"Added lighting (point lights and directional lights)"],[h,"Added image based lighting with skybox cube map"]].map((e,t)=>{let[i,a]=e;return(0,r.jsxs)("div",{className:"w-[75%] m-4",children:[(0,r.jsx)(n.iz,{}),(0,r.jsx)(n.YS,{className:"text-center",children:a}),(0,r.jsx)(g,{videoSrc:i})]},t)})}),(0,r.jsx)(n.H3,{children:"Try It"}),(0,r.jsx)(l.l,{children:(0,r.jsx)(l.g,{icon:"github",children:(0,r.jsx)(n.rU,{href:"https://github.com/david-andrew/TerminalRayTracer",children:"TerminalRayTracer"})})}),(0,r.jsx)("br",{}),(0,r.jsx)(s.CodeBlock,{language:"bash",code:"git clone git@github.com:david-andrew/TerminalRayTracer.git\ncd TerminalRayTracer\nclang TerminalRayTracer.c -lm -O3 && ./a.out"})]})},1295:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var i in t)Object.defineProperty(e,i,{enumerable:!0,get:t[i]})}(t,{default:function(){return c},unstable_getImgProps:function(){return d}});let r=i(21024),a=i(32301),n=i(27873),l=i(63222),s=r._(i(75033)),d=e=>{(0,n.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,a.getImgProps)(e,{defaultLoader:s.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,i]of Object.entries(t))void 0===i&&delete t[e];return{props:t}},c=l.Image},19170:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/apl_shield.ed187f2a.png",height:200,width:200,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAJFBMVEX///////9MaXH////////////////////////////+/v7///9Xx+kjAAAADHRSTlMWQgAHSjeWIl1he2c8OXMwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAN0lEQVR4nBXKyRHAMAwDsSUlWj767zcTvEGkJApdhqpGddZti/RaV4Q589h7KJVNG9N/NTYS9gciiwDfROwsIQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},1130:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/apple.6c3f0c2f.svg",height:448,width:377,blurWidth:0,blurHeight:0}},76416:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/branch.265fb28d.svg",height:512,width:448,blurWidth:0,blurHeight:0}},7168:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/chrome.ff145c23.svg",height:512,width:512,blurWidth:0,blurHeight:0}},52270:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/circuit.8cf8dc9f.png",height:144,width:144,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAFVBMVEX///////////////////9MaXH///+o1vOyAAAAB3RSTlP+SJWR4gDrA4oyQgAAAAlwSFlzAAALEwAACxMBAJqcGAAAACJJREFUeJyVxrEBADAIw7AYHP4/uTdUk1JOj4ZJkuUvRZU+Dw8AZ0UlQUcAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8}},17085:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/code.4f400729.svg",height:510,width:622,blurWidth:0,blurHeight:0}},31575:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/cubes.52bfa026.svg",height:505,width:577,blurWidth:0,blurHeight:0}},5274:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/docs.71257e0f.svg",height:512,width:384,blurWidth:0,blurHeight:0}},44550:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/envelope.68fbd887.svg",height:384,width:512,blurWidth:0,blurHeight:0}},52347:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/gamepad.7f8c19fe.svg",height:384,width:640,blurWidth:0,blurHeight:0}},91036:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/gears.43219d75.png",height:902,width:1e3,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAMFBMVEX///////9MaXH9/f39/f39/f3////////9/f39/f39/f3////8/Pz////////8/PxSdW9IAAAAEHRSTlMB/gC4zN4nCe6lhhV3OJl/vtUq/QAAAAlwSFlzAAALEwAACxMBAJqcGAAAADVJREFUeJwFwYcBwDAMwzBaXpnN/98WQOjOWA3aYWYPVCOPOf1O2LDFzHQfcxMen6rFDS8BPyYIAS1kXKiqAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:7}},17421:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/github.8d24eda3.svg",height:484,width:496,blurWidth:0,blurHeight:0}},75066:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/hashtag.846670df.svg",height:448,width:448,blurWidth:0,blurHeight:0}},95972:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/idt_starburst.88e8b2ee.png",height:225,width:225,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAG1BMVEX////////////////8/Pz8/Pz////6+vr///99a9SwAAAACXRSTlMBGFZKDR17NWmxn4fzAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAMUlEQVR4nB2KyQ0AMAzCDOTYf+Mq5WNZBkDNrWu3dB47gopnnKKdGbuhk59Qxf8MOjwViwCORSWurQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8}},6421:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/jataware_logo.4e4a6b84.png",height:200,width:200,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAADFBMVEX8/Pz///////9MaXEa7cJzAAAABHRSTlMeAgEAGcqjGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAACZJREFUeJxjYIYCBmZGMGBmgIswMYABMwMjjIFQzMTExMjIhBABABKeAIZ0gaXxAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8}},8757:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/jhu_hub.bc0ef920.svg",height:56,width:110,blurWidth:0,blurHeight:0}},47876:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/jhu_shield.7014cafb.png",height:230,width:215,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAMAAAAC2hU0AAAALVBMVEX///////9MaXH///////////////////////////////////////////////8tkOLtAAAAD3RSTlOUcgAwZSJMptE9hFVZCheRDfJyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVR4nAXBhwHAMAzDMMo7o/3/3AD4QZxFxsyEc3UDREmwRbFbXfyRCz7MvdoNs4w0eyGwAP+tG93HAAAAAElFTkSuQmCC",blurWidth:7,blurHeight:8}},34722:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/linkedin.95ede3ed.svg",height:448,width:448,blurWidth:0,blurHeight:0}},13754:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/linux_logo.b344922a.png",height:154,width:128,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAMAAAAC2hU0AAAAMFBMVEVMaXH////////////////////////////////////////////////////////////6w4mEAAAAD3RSTlMA4jRaDpWq8bpIfmj+HSqrp8S2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAANklEQVR4nBXFxxHAQAgDQAmOdMH0362H/SyATwRDTde875mfd8oCNDrOgxibu8Dw5k0Ys5z1AyCZATNVl6EJAAAAAElFTkSuQmCC",blurWidth:7,blurHeight:8}},59959:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/object_group.e44e708c.svg",height:448,width:512,blurWidth:0,blurHeight:0}},19045:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/table.0c847b8e.svg",height:448,width:512,blurWidth:0,blurHeight:0}},19804:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/trello.b6d26a4c.svg",height:448,width:448,blurWidth:0,blurHeight:0}},38414:function(e,t,i){"use strict";i.r(t),t.default={src:"/_next/static/media/windows.6da4ff71.svg",height:448,width:448,blurWidth:0,blurHeight:0}},16691:function(e,t,i){e.exports=i(1295)}},function(e){e.O(0,[6401,6685,3222,8213,9659,2971,596,1744],function(){return e(e.s=21837)}),_N_E=e.O()}]);