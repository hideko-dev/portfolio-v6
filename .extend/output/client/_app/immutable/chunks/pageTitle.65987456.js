import{s as _,n}from"./scheduler.abd4628c.js";import{S as h,i as v,y,k as c,e as u,f as p,g as d,h as f,j as g,q as o,n as S,o as m,p as q}from"./index.4ad3ea3a.js";function T(i){let e;return document.title=e=i[0]+" - Hideko",{c:n,l(t){y("svelte-a43fy5",document.head).forEach(c)},m:n,p(t,[a]){a&1&&e!==(e=t[0]+" - Hideko")&&(document.title=e)},i:n,o:n,d:n}}function j(i,e,t){let{value:a}=e;return i.$$set=s=>{"value"in s&&t(0,a=s.value)},[a]}class x extends h{constructor(e){super(),v(this,e,j,T,_,{value:0})}}function k(i){let e,t,a;return{c(){e=u("div"),t=u("p"),a=p(i[0]),this.h()},l(s){e=d(s,"DIV",{class:!0,style:!0});var l=f(e);t=d(l,"P",{class:!0});var r=f(t);a=g(r,i[0]),r.forEach(c),l.forEach(c),this.h()},h(){o(t,"class","titles svelte-9qwjzi"),o(e,"class","title svelte-9qwjzi"),o(e,"style",i[1])},m(s,l){S(s,e,l),m(e,t),m(t,a)},p(s,[l]){l&1&&q(a,s[0]),l&2&&o(e,"style",s[1])},i:n,o:n,d(s){s&&c(e)}}}function E(i,e,t){let{title:a}=e,{customStyle:s}=e;return i.$$set=l=>{"title"in l&&t(0,a=l.title),"customStyle"in l&&t(1,s=l.customStyle)},[a,s]}class z extends h{constructor(e){super(),v(this,e,E,k,_,{title:0,customStyle:1})}}export{z as P,x as T};
