import{m as k,a as S,b,u as p,c as V,d as P,e as x,_ as w,f as L,g as E,h as H,i as N,V as $,j}from"./position-CmzbSwtR.js";import{p as B,m as R,a as q,b as F,c as I,g as z,r as M,d as D,t as g,s as O,u as U,e as u,f as Y,h as T,i as a,j as G,k as J,w as K,o as f,l as y,n as o,q as A,v as Q,x as W,y as X,z as Z,V as ee,A as te,B as ae}from"./index-DzLDnroh.js";const se=B({app:Boolean,color:String,height:{type:[Number,String],default:"auto"},...k(),...R(),...S(),...q(),...b(),...F({tag:"footer"}),...I()},"VFooter"),oe=z()({name:"VFooter",props:se(),setup(e,t){let{slots:c}=t;const s=M(),{themeClasses:n}=D(e),{backgroundColorClasses:l,backgroundColorStyles:d}=p(g(e,"color")),{borderClasses:m}=V(e),{elevationClasses:_}=P(e),{roundedClasses:h}=x(e),r=O(32),{resizeRef:v}=U(i=>{i.length&&(r.value=i[0].target.clientHeight)}),C=u(()=>e.height==="auto"?r.value:parseInt(e.height,10));return Y(()=>e.app,()=>{const i=J({id:e.name,order:u(()=>parseInt(e.order,10)),position:u(()=>"bottom"),layoutSize:C,elementSize:u(()=>e.height==="auto"?void 0:C.value),active:u(()=>e.app),absolute:g(e,"absolute")});K(()=>{s.value=i.layoutItemStyles.value})}),T(()=>a(e.tag,{ref:v,class:["v-footer",n.value,l.value,m.value,_.value,h.value,e.class],style:[d.value,e.app?s.value:{height:G(e.height)},e.style]},c)),{}}}),ne={},le={class:"text-caption text-center"};function ue(e,t){return f(),y(oe,{height:"40",app:""},{default:o(()=>[A("div",le," © 2024-"+Q(new Date().getFullYear())+" Copyright © Daisy ",1)]),_:1})}const ce=w(ne,[["render",ue]]),re=B({color:String,...k(),...R(),...W(),...S(),...L(),...E(),...b(),...F(),...I()},"VSheet"),ie=z()({name:"VSheet",props:re(),setup(e,t){let{slots:c}=t;const{themeClasses:s}=D(e),{backgroundColorClasses:n,backgroundColorStyles:l}=p(g(e,"color")),{borderClasses:d}=V(e),{dimensionStyles:m}=X(e),{elevationClasses:_}=P(e),{locationStyles:h}=H(e),{positionClasses:r}=N(e),{roundedClasses:v}=x(e);return T(()=>a(e.tag,{class:["v-sheet",s.value,n.value,d.value,_.value,r.value,v.value,e.class],style:[l.value,m.value,h.value,e.style]},c)),{}}}),de={};function me(e,t){return f(),y(ie,{class:"py-4",elevation:"2"},{default:o(()=>[a($,null,{default:o(()=>[a(j,null,{default:o(()=>t[0]||(t[0]=[A("h1",{class:"text-h5 font-weight-bold blue--text"},"車牌吉凶分析",-1)])),_:1})]),_:1})]),_:1})}const _e=w(de,[["render",me],["__scopeId","data-v-a8654b99"]]),ge=Z({__name:"default",setup(e){return(t,c)=>{const s=_e,n=te("router-view"),l=ce;return f(),y(ee,null,{default:o(()=>[a(s),a(ae,{class:"p-3"},{default:o(()=>[a(n)]),_:1}),a(l)]),_:1})}}});export{ge as default};
