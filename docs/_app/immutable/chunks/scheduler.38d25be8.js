var I=Object.defineProperty;var O=(t,e,n)=>e in t?I(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>(O(t,typeof e!="symbol"?e+"":e,n),n);function L(){}const ft=t=>t;function F(t,e){for(const n in e)t[n]=e[n];return t}function G(t){return t()}function dt(){return Object.create(null)}function U(t){t.forEach(G)}function J(t){return typeof t=="function"}function _t(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let p;function ht(t,e){return t===e?!0:(p||(p=document.createElement("a")),p.href=e,t===p.href)}function mt(t){return Object.keys(t).length===0}function K(t,...e){if(t==null){for(const i of e)i(void 0);return L}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function pt(t,e,n){t.$$.on_destroy.push(K(e,n))}function yt(t,e,n,i){if(t){const s=D(t,e,n,i);return t[0](s)}}function D(t,e,n,i){return t[1]&&i?F(n.ctx.slice(),t[1](i(e))):n.ctx}function gt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const o=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)o[l]=e.dirty[l]|s[l];return o}return e.dirty|s}return e.dirty}function bt(t,e,n,i,s,o){if(s){const r=D(e,n,i,o);t.p(r,s)}}function xt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function wt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function vt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Et(t,e,n){return t.set(n),e}function Nt(t){return t&&J(t.destroy)?t.destroy:L}function Tt(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}let x=!1;function At(){x=!0}function kt(){x=!1}function Q(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function V(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&c.push(u)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let c=0;c<e.length;c++){const a=e[c].claim_order,u=(s>0&&e[n[s]].claim_order<=a?s+1:Q(1,s,W=>e[n[W]].claim_order,a))-1;i[c]=n[u]+1;const k=u+1;n[k]=c,s=Math.max(k,s)}const o=[],r=[];let l=e.length-1;for(let c=n[s]+1;c!=0;c=i[c-1]){for(o.push(e[c-1]);l>=c;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);o.reverse(),r.sort((c,a)=>c.claim_order-a.claim_order);for(let c=0,a=0;c<r.length;c++){for(;a<o.length&&r[c].claim_order>=o[a].claim_order;)a++;const u=a<o.length?o[a]:null;t.insertBefore(r[c],u)}}function j(t,e){t.appendChild(e)}function X(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function Ct(t){const e=w("style");return e.textContent="/* empty */",Y(X(t),e),e.sheet}function Y(t,e){return j(t.head||t,e),e.sheet}function Z(t,e){if(x){for(V(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function $(t,e,n){t.insertBefore(e,n||null)}function tt(t,e,n){x&&!n?Z(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function g(t){t.parentNode&&t.parentNode.removeChild(t)}function St(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function P(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function A(t){return document.createTextNode(t)}function Ht(){return A(" ")}function Mt(){return A("")}function C(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function et(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function Lt(t,e){for(const n in e)et(t,n,e[n])}function Dt(t){return t.dataset.svelteH}function jt(t){return t===""?null:+t}function Pt(t){return Array.from(t.childNodes)}function q(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function z(t,e,n,i,s=!1){q(t);const o=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const c=n(l);return c===void 0?t.splice(r,1):t[r]=c,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const c=n(l);return c===void 0?t.splice(r,1):t[r]=c,s?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function B(t,e,n,i){return z(t,s=>s.nodeName===e,s=>{const o=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||o.push(l.name)}o.forEach(r=>s.removeAttribute(r))},()=>i(e))}function qt(t,e,n){return B(t,e,n,w)}function zt(t,e,n){return B(t,e,n,P)}function nt(t,e){return z(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>A(e),!0)}function Bt(t){return nt(t," ")}function S(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function Rt(t,e){const n=S(t,"HTML_TAG_START",0),i=S(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new H(e);q(t);const s=t.splice(n,i-n+1);g(s[0]),g(s[s.length-1]);const o=s.slice(1,s.length-1);for(const r of o)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new H(e,o)}function Wt(t,e){e=""+e,t.data!==e&&(t.data=e)}function It(t,e){t.value=e??""}function Ot(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ft(t,e,n){for(let i=0;i<t.options.length;i+=1){const s=t.options[i];if(s.__value===e){s.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Gt(t){const e=t.querySelector(":checked");return e&&e.__value}let y;function it(){if(y===void 0){y=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{y=!0}}return y}function Ut(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=w("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=it();let o;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=C(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{o=C(i.contentWindow,"resize",e),e()}),j(t,i),()=>{(s||o&&i.contentWindow)&&o(),g(i)}}function Jt(t,e,n){t.classList.toggle(e,!!n)}function st(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}function Kt(t,e){const n=[];let i=0;for(const s of e.childNodes)if(s.nodeType===8){const o=s.textContent.trim();o===`HEAD_${t}_END`?(i-=1,n.push(s)):o===`HEAD_${t}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class rt{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=P(n.nodeName):this.e=w(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)$(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(g)}}class H extends rt{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)tt(this.t,this.n[i],n)}}function Qt(t,e){return new t(e)}let b;function v(t){b=t}function m(){if(!b)throw new Error("Function called outside component initialization");return b}function Vt(t){m().$$.on_mount.push(t)}function Xt(t){m().$$.after_update.push(t)}function Yt(){const t=m();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const o=st(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,o)}),!o.defaultPrevented}return!0}}function Zt(t,e){return m().$$.context.set(t,e),e}function $t(t){return m().$$.context.get(t)}const h=[],M=[];let _=[];const N=[],R=Promise.resolve();let T=!1;function ot(){T||(T=!0,R.then(lt))}function te(){return ot(),R}function ct(t){_.push(t)}function ee(t){N.push(t)}const E=new Set;let d=0;function lt(){if(d!==0)return;const t=b;do{try{for(;d<h.length;){const e=h[d];d++,v(e),at(e.$$)}}catch(e){throw h.length=0,d=0,e}for(v(null),h.length=0,d=0;M.length;)M.pop()();for(let e=0;e<_.length;e+=1){const n=_[e];E.has(n)||(E.add(n),n())}_.length=0}while(h.length);for(;N.length;)N.pop()();T=!1,E.clear(),v(t)}function at(t){if(t.fragment!==null){t.update(),U(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ct)}}function ne(t){const e=[],n=[];_.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),_=e}export{J as $,pt as A,Kt as B,St as C,Tt as D,ft as E,ht as F,Jt as G,H,ct as I,Ft as J,C as K,U as L,It as M,Gt as N,Dt as O,ee as P,Et as Q,Zt as R,Ut as S,P as T,zt as U,$t as V,Nt as W,F as X,Lt as Y,vt as Z,wt as _,Ht as a,Yt as a0,K as a1,jt as a2,X as a3,Ct as a4,st as a5,dt as a6,lt as a7,mt as a8,ne as a9,b as aa,v as ab,G as ac,h as ad,ot as ae,At as af,kt as ag,Xt as b,Bt as c,g as d,Mt as e,w as f,qt as g,Pt as h,tt as i,et as j,Ot as k,A as l,nt as m,Wt as n,Vt as o,M as p,Qt as q,Rt as r,_t as s,te as t,Z as u,L as v,yt as w,bt as x,xt as y,gt as z};
