(this["webpackJsonpplane-under-sunset"]=this["webpackJsonpplane-under-sunset"]||[]).push([[0],{38:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var r=n(31),a=(n(38),n(14)),o=n(46),i=n(8),c=n(2),s=n(7),l=n(47),g=n(11),u=n(32),f=n(33),v=n(9);Object(a.b)({Refractor:u.a});var m=function(e){var t=Object(i.useRef)(null),n=Object(i.useState)((function(){return new c.PlaneBufferGeometry})),r=Object(g.a)(n,1)[0];return Object(a.c)((function(e){var n=e.clock.elapsedTime;t.current.material.uniforms.time.value=n})),Object(v.jsx)("refractor",Object(s.a)({ref:t,args:[r,{textureWidth:1024,textureHeight:1024,shader:Object(s.a)(Object(s.a)({},f.a),{},{fragmentShader:"\n  // uniform vec3 color;\n  uniform float time;\n  uniform sampler2D tDiffuse;\n  varying vec2 vUv;\n  varying vec4 vUvRefraction;\n\n  //\tClassic Perlin 3D Noise \n  //\tby Stefan Gustavson\n  //\n  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\n  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}\n\n  float cnoise(vec3 P){\n    vec3 Pi0 = floor(P); // Integer part for indexing\n    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n    Pi0 = mod(Pi0, 289.0);\n    Pi1 = mod(Pi1, 289.0);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n\n    vec4 gx0 = ixy0 / 7.0;\n    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n    vec4 gx1 = ixy1 / 7.0;\n    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n    return 2.2 * n_xyz;\n  }\n\n  void main() {\n    float strength = 0.12;\n    float speed = 10.0;\n    float noise = cnoise(vec3(vUv * 20.0, time * 4.0));\n    float strengthFilter = clamp((2.4 - distance(vUv, vec2(0.5)) * 5.0), 0.0, 1.0);\n    vec4 uv = vec4(vUvRefraction);\n    uv.x += sin(noise) * strength * strengthFilter;\n    uv.y += cos(noise) * strength * strengthFilter;\n    vec4 base = texture2DProj( tDiffuse, uv );\n    gl_FragColor = vec4( base.rgb, 1.0 );\n  }\n"})}]},e))},x=function(e){var t=Object(i.useRef)(null),n=Object(l.a)("/littleplane/static/models/plane.glb"),r=n.nodes,o=n.materials,g=Object(i.useMemo)((function(){var e=new c.MeshLambertMaterial;return e.copy(o.SimpleMaterial),o.SimpleMaterial.dispose(),e}),[o.SimpleMaterial]);return Object(a.c)((function(e){var n=e.clock;t.current.rotation.z=6.04+.16*Math.cos(n.elapsedTime),t.current.rotation.x=6.04+.04*Math.sin(n.elapsedTime),t.current.position.y=5.8+.4*Math.cos(n.elapsedTime),t.current.position.x=.5+-.6*Math.sin(n.elapsedTime/1.2)})),Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("group",Object(s.a)(Object(s.a)({ref:t},e),{},{position:[0,5.5,0],scale:6.8,rotation:[6.04,0,6.04],dispose:null,children:[Object(v.jsx)("mesh",{castShadow:!0,receiveShadow:!0,geometry:r.SimplePlane.geometry,material:g,"material-side":c.FrontSide,"material-fog":!1}),Object(v.jsx)(m,{rotation:[Math.PI/2+.1,-.05,0],scale:[2.54,.9,1],position:[.12,-.148,-.11]})]}))})};l.a.preload("/littleplane/static/models/plane.glb");var p=function(e){var t=Object(i.useRef)(null),n=Object(l.a)("/littleplane/static/models/runway.glb"),r=n.nodes,a=n.materials,o=Object(i.useMemo)((function(){var e=new c.MeshLambertMaterial,t=new c.MeshLambertMaterial;return e.copy(a.Material),e.side=c.FrontSide,e.fog=!1,t.copy(e),t.fog=!0,a.Material.dispose(),[e,t]}),[a.Material]),u=Object(g.a)(o,2),f=u[0],m=u[1];return Object(v.jsxs)("group",Object(s.a)(Object(s.a)({ref:t,scale:7.5,"rotation-y":Math.PI/2},e),{},{dispose:null,children:[Object(v.jsx)("mesh",{name:"Runway",geometry:r.Runway.geometry,material:f,position:[0,.031,0],receiveShadow:!0}),Object(v.jsx)("mesh",{name:"Rock3",geometry:r.Rock3.geometry,material:f,position:[38.724,.917,-.11]}),Object(v.jsx)("mesh",{name:"Rock1",geometry:r.Rock1.geometry,material:f,position:[3.585,.984,29.125]}),Object(v.jsx)("mesh",{name:"Rock2",geometry:r.Rock2.geometry,material:f,position:[4.024,.984,-28.879],rotation:[-Math.PI,0,-Math.PI]}),Object(v.jsx)("mesh",{name:"Rock4",geometry:r.Rock4.geometry,material:f,position:[-33.986,.917,-.11],rotation:[-Math.PI,0,-Math.PI]}),Object(v.jsx)("mesh",{name:"Grass",geometry:r.Grass.geometry,material:m,position:[3.067,0,0],receiveShadow:!0})]}))};l.a.preload("/littleplane/static/models/runway.glb");var j=n(45),d=function(e){var t=e.progress;return Object(v.jsx)("svg",{version:"1.1",id:"Layer_1",x:"0px",y:"0px",viewBox:"0 0 115 115",width:"115",height:"115",children:Object(v.jsx)("path",{style:{transition:"stroke-dashoffset 0.2s"},fill:"none",stroke:"white",strokeWidth:2,strokeMiterlimit:10,strokeDasharray:400.6,strokeDashoffset:400.6-t/100*400.6,d:"M103.4,77v-9.8L64.3,42.9V16c0-4.1-3.3-7.3-7.3-7.3S49.7,12,49.7,16v26.8L10.6,67.3V77l39.1-12.2v26.8L39.9,99\r v7.3l17.1-4.9l17.1,4.9V99l-9.8-7.3V64.8L103.4,77z"})})},y={container:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"#171717",display:"flex",alignItems:"center",justifyContent:"center",transition:"opacity 300ms ease",zIndex:1e3},inner:{width:100,height:3,background:"#272727",textAlign:"center"},data:{display:"inline-block",position:"relative",fontVariantNumeric:"tabular-nums",marginTop:"0.8em",color:"#f0f0f0",fontSize:"0.6em",fontFamily:'-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, Roboto, Ubuntu, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',whiteSpace:"nowrap"}},b=function(){var e=Object(j.a)(),t=e.active,n=e.progress,r=Object(i.useRef)(0),a=Object(i.useRef)(0),o=Object(i.useRef)(null),c=Object(i.useState)(t),l=Object(g.a)(c,2),u=l[0],f=l[1];Object(i.useEffect)((function(){var e;return t!==u&&(e=window.setTimeout((function(){return f(t)}),300)),function(){return clearTimeout(e)}}),[u,t]);var m=Object(i.useCallback)((function(){var e;o.current&&(r.current+=(n-r.current)/2,(r.current>.95*n||100===n)&&(r.current=n),o.current.innerText=(e=r.current,"Loading ".concat(e.toFixed(2),"%")),r.current<n&&(a.current=requestAnimationFrame(m)))}),[n]);return Object(i.useEffect)((function(){return m(),function(){return cancelAnimationFrame(a.current)}}),[m]),u?Object(v.jsx)("div",{style:Object(s.a)(Object(s.a)({},y.container),{},{opacity:t?1:0}),children:Object(v.jsx)("div",{children:Object(v.jsxs)("div",{style:Object(s.a)({},y.inner),children:[Object(v.jsx)(d,{progress:n}),Object(v.jsx)("span",{ref:o,style:y.data})]})})}):null},h=function(){var e=Object(i.useRef)(null),t=Object(i.useRef)(null);return Object(i.useEffect)((function(){e.current.shadow.camera=new c.OrthographicCamera(-9,10,9,-1,1,35)}),[]),Object(v.jsxs)(v.Fragment,{children:[Object(v.jsx)("ambientLight",{color:"#36379a",ref:t}),Object(v.jsx)("directionalLight",{ref:e,"shadow-mapSize-width":512,"shadow-mapSize-height":512,intensity:1.5,color:"#e88063",position:[10,5,-4],"shadow-normalBias":.02,castShadow:!0})]})},O=function(){var e=Object(o.a)(["px.png","nx.png","py.png","ny.png","pz.png","nz.png"],{path:"/littleplane/static/textures/redpink/"}),t=Object(a.e)().scene;return Object(i.useEffect)((function(){e.encoding=c.sRGBEncoding,e.generateMipmaps=!1,e.magFilter=c.LinearFilter,e.minFilter=c.LinearFilter,t.background=e})),null},z=function(){return Object(a.c)((function(e){var t=e.camera,n=e.mouse;t.position.z=c.MathUtils.lerp(t.position.z,3*n.x,.2),t.position.y=c.MathUtils.lerp(t.position.y,2*n.y+4.19,.2),t.position.x=c.MathUtils.lerp(t.position.x,2*(1-Math.cos(n.x*Math.PI/2))-15.6,.2),t.lookAt(0,5.5,0)})),null};function P(){var e=Math.min(window.devicePixelRatio,2);return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)(a.a,{dpr:e,gl:{antialias:e<2},shadows:!0,camera:{position:[-15.6,4.19,-.57],rotation:[.05,-1.54,.05]},onCreated:function(e){var t=e.gl;t.toneMapping=c.ReinhardToneMapping,t.toneMappingExposure=2.3},children:[Object(v.jsxs)(i.Suspense,{fallback:null,children:[Object(v.jsx)(x,{}),Object(v.jsx)(p,{}),Object(v.jsx)(O,{})]}),Object(v.jsx)(h,{}),Object(v.jsx)(z,{}),Object(v.jsx)("fog",{attach:"fog",args:["#31326f",0,100]})]}),Object(v.jsx)(b,{}),Object(v.jsx)("a",{style:{position:"absolute",top:"25px",left:"25px",fontFamily:"sans-serif",color:"white",textDecoration:"none"},href:"https://lchsam.github.io/",target:"_blank",rel:"noreferrer",children:"@lchsam"})]})}var w=document.getElementById("root");Object(r.render)(Object(v.jsx)(P,{}),w)}},[[43,1,2]]]);