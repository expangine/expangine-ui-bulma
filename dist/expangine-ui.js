!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("expangine-runtime"),require("expangine-runtime-live")):"function"==typeof define&&define.amd?define(["expangine-runtime","expangine-runtime-live"],t):"object"==typeof exports?exports["expangine-ui"]=t(require("expangine-runtime"),require("expangine-runtime-live")):e["expangine-ui"]=t(e["expangine-runtime"],e["expangine-runtime-live"])}(window,(function(e,t){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(t,n){t.exports=e},function(e,t,n){var r,s;window,e.exports=(r=n(0),s=n(2),function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(r,s,function(t){return e[t]}.bind(null,s));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=r},function(e,t){e.exports=s},function(e,t,n){"use strict";n.r(t);var r=n(0),s=n(1),o={pop:1,push:1,shift:1,unshift:1,reverse:1,splice:1,sort:1},i={concat:1,every:1,fill:1,filter:1,find:1,findIndex:1,forEach:1,includes:1,indexOf:1,join:1,lastIndexOf:1,map:1,reduce:1,reduceRight:1,slice:1,some:1},c=function(){function e(e){this.value=e,this.next=this.prev=this}return e.prototype.forEach=function(e){for(var t=this.next,n=0;t!==this;){var r=t.next;e(t.value,t,n),t=r,n++}return n},e.prototype.toArray=function(){var e=[];return this.forEach((function(t){return e.push(t)})),e},e.prototype.insertAfter=function(e){this.next=e.next,this.prev=e,this.prev.next=this.next.prev=this},e.prototype.push=function(e){e.insertAfter(this.prev)},e.prototype.remove=function(){this.isEmpty()||(this.next.prev=this.prev,this.prev.next=this.next,this.prev=this.next=this)},e.prototype.isEmpty=function(){return this.next===this},e.head=function(){return new e(null)},e}(),a=function(){function e(e){this.observer=e,this.links=c.head()}return e.prototype.notify=function(e){void 0===e&&(e=!1);var t=!1;return this.links.toArray().forEach((function(e){e.watcher.notify(),t=t||e.watcher.deep})),e&&t&&this.observer.parent&&this.observer.parent.notify(e),t},e.prototype.destroy=function(){this.links.forEach((function(e){return e.remove()}))},e}(),u=[],l=function(){function e(e,t,n){void 0===t&&(t=!0),void 0===n&&(n=!1),this.expression=e,this.immediate=t,this.deep=n,this.dirty=!1,this.paused=!1,this.evaluating=!1,this.links=c.head()}return e.prototype.isWatching=function(){return!this.links.isEmpty()},e.prototype.notify=function(){this.evaluating||(this.dirty=!0,this.immediate&&this.update())},e.prototype.update=function(){this.evaluating=!0,this.off(),u.push(this);try{this.result=this.expression()}finally{if(u.pop(),this.dirty=!1,this.onResult)try{this.onResult()}finally{this.evaluating=!1}this.evaluating=!1}},e.prototype.off=function(){this.links.forEach((function(e){return e.remove()}))},e.prototype.pause=function(){this.paused||(this.off(),this.paused=!0)},e.prototype.resume=function(){this.paused&&(this.update(),this.paused=!1)},e}(),d=function(){function e(e,t){this.watcher=e,this.dependency=t,this.watcherNode=new c(this),this.dependencyNode=new c(this)}return e.prototype.remove=function(){this.watcherNode.remove(),this.dependencyNode.remove()},e.create=function(t,n){var r=null;return n.links.forEach((function(e){return r=e.watcher===t?e:r})),r||(r=new e(t,n),n.links.push(r.dependencyNode),t.links.push(r.watcherNode)),r},e}(),p={get:function(e,t,n){var r=e[t];if("$obs"===t)return r;var s=e.$obs;if("function"==typeof r){if(e instanceof Array){if(t in o)return function(e,t,n){return function(){for(var r=e.slice(),s=t.apply(e,arguments),o=Math.max(r.length,e.length),i=!1,c=0;c<o;c++)r[c]!==e[c]&&(i=i||n.notify(c)),c>=e.length&&n.remove(c);return e.length!==r.length&&(i=i||n.notify("length")),i&&n.parent&&n.parent.notify(!0),s}}(e,r,s);if(t in i)return function(e,t,n){return function(){for(var r=e.length,s=0;s<r;s++)f(e,s,e[s],n);return f(e,"length",e.length,n),t.apply(e,arguments)}}(e,r,s)}return r}return f(e,t,r,s)},set:function(e,t,n,r){return n!==e[t]&&(e[t]=n,e.$obs.notify(t,!0)),!0},deleteProperty:function(e,t){return e.$obs.remove(t),!0}};function f(e,t,n,r){var s=r.dep(t);return u.forEach((function(e){return d.create(e,s)})),m(n)&&!b(n)&&(e[t]=n=h(n,{parent:s})),n}function h(e,t){var n=(void 0===t?{}:t).parent,r=void 0===n?null:n;if(m(e)&&!e.$obs){var s=Proxy.revocable(e,p);e=s.proxy,Object.defineProperty(e,"$obs",{value:new v(s.revoke,r),writable:!1,configurable:!0,enumerable:!1})}return e}function m(e){return!("object"!=typeof e||null===e)}function b(e){return!("object"!=typeof e||null===e||!e.$obs)}var v=function(){function e(e,t){void 0===t&&(t=null),this.revoke=e,this.parent=t,this.deps=Object.create(null)}return e.prototype.dep=function(e){var t=this.deps[e];return t||(this.deps[e]=t=new a(this)),t},e.prototype.notify=function(e,t){void 0===t&&(t=!1);var n=this.deps;return e in n?n[e].notify(t):(t&&this.parent&&this.parent.notify(t),!1)},e.prototype.remove=function(e){var t=this.deps;e in t&&(t[e].destroy(),delete t[e])},e.prototype.destroy=function(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!0);var r=this.deps;for(var s in r)if(r[s].destroy(),delete r[s],t){var o=e[s];b(o)&&o.$obs.destroy(o,t,n)}n&&this.revoke()},e}();function y(e,t){var n=void 0===t?{}:t,r=n.immediate,s=void 0===r||r,o=n.deep,i=new l(e,s,void 0!==o&&o);return i.update(),i}class g{constructor(e=null,t=Object.create(null)){this.parent=e,this.observed=h(t),this.disables=0,this.link=new c(this),this.watchers=c.head()}createChild(e={},t=!0){const n=new g(this,e);return t&&(this.children||(this.children=c.head()),this.children.push(n.link)),n}get(e,t,n=!1){return e in this.observed?this.observed[e]:this.parent&&!n?this.parent.get(e,t):t}has(e,t=!1){return e in this.observed||!(!this.parent||t)&&this.parent.has(e)}set(e,t,n=!1){if(e in this.observed||n)this.observed[e]=t;else{if(!this.parent)return!1;this.parent.set(e,t)||(this.observed[e]=t)}return!0}remove(e){e in this.observed?delete this.observed[e]:this.parent&&this.parent.remove(e)}setMany(e){for(const t in e)this.set(t,e[t])}watch(e,t,n=!0,o=!1){const i=s.LiveRuntime.defs.getExpression(e),a=s.LiveRuntime.eval(i);if(!i.isDynamic())return t(a(this)),()=>{};let u,l=!0;const d=y(()=>{const e=a(this);!n&&l||!l&&o&&r.DataTypes.equals(u,e)||t(e),u=o?r.DataTypes.copy(e):e,l=!1}),p=new c(d);return this.watchers.push(p),()=>{d.off(),p.remove()}}eval(e){const t=s.LiveRuntime.eval(e);return e=>{if(e){const n=this.createChild(e),r=t(n);return n.destroy(),r}return t(this)}}enable(){this.disables>0&&(this.disables--,0===this.disables&&this.watchers.forEach(e=>e.resume()),this.children&&this.children.forEach(e=>e.enable()))}disable(){0===this.disables&&this.watchers.forEach(e=>e.pause()),this.children&&this.children.forEach(e=>e.disable()),this.disables++}setEnabled(e){e?this.enable():this.disable()}destroy(){this.link.remove(),this.disables=Number.MAX_SAFE_INTEGER,this.watchers.forEach(e=>e.off()),this.children&&this.children.forEach(e=>e.destroy()),function(e,t,n){if(void 0===t&&(t=!1),void 0===n&&(n=!0),b(e)){var r=e.$obs;delete e.$obs,r.destroy(e,t,n)}}(this.observed)}static register(){if(!this.registered){const{dataSet:e,dataGet:t,dataHas:n,dataRemove:r}=s.LiveRuntime;s.LiveRuntime.dataGet=(e,n)=>e instanceof g?e.get(n):t(e,n),s.LiveRuntime.dataSet=(t,n,r)=>t instanceof g?t.set(n,r):e(t,n,r),s.LiveRuntime.dataHas=(e,t)=>e instanceof g?e.has(t):n(e,t),s.LiveRuntime.dataRemove=(e,t)=>e instanceof g?e.remove(t):r(e,t),this.registered=!0}}static isWatchable(e){return s.LiveRuntime.defs.isExpression(e)}}function x(e,t){return E[t||`${e.collection}/${e.name}`]=e,e}g.registered=!1,g.register();const E=Object.create(null);class O{constructor(e,t,n,r,s,o){this.component=e,this.attrs=t,this.scope=n,this.outerScope=o||n,this.slots=r,this.parent=s,this.cache=Object.create(null)}call(e,t){var n,s;const o=null===(n=this.component.attributes)||void 0===n?void 0:n[e],i=this.attrs[e]||(null===(s=o)||void 0===s?void 0:s.default);if(i){const e=r.Exprs.define();for(const n in t)e.with(n,r.defs.getExpression(t[n]));return e.run(r.defs.getExpression(i)),e}return r.Exprs.noop()}trigger(e,t,n=this.scope){this.scope.observed.emit[e]=n.eval(t)()}on(e,t){return this.scope.watch(r.Exprs.get("emit",e),t,!1)}update(){this.component.updated&&this.node&&this.component.updated(this)}render(){this.cache=Object.create(null);const e=w(this.component.render(this),this,this.scope);I(this.node.elements,e.elements),this.node=e}destroy(){this.scope.destroy()}getSlotArrayLength(e="default"){const t=this.getSlotOptions(e);if(t&&t.arrayLength)return r.defs.getExpression(t.arrayLength);if(this.slots&&this.slots[e]&&Object(r.isObject)(this.slots[e])){const t=this.slots[e];let n;for(const e in t){const t=parseInt(e);Object(r.isNumber)(t)&&(void 0===n||t>n)&&(n=t)}if(void 0!==n)return r.Exprs.const(n+1)}return r.Exprs.const(0)}getSlotOptions(e="default"){const t=this.component;if(t.slots){const s=t.slots[e];return n=s,Object(r.isObject)(n)&&n.scope instanceof r.Type?s:{scope:s}}var n;return!1}hasSlot(e,t,n){return e in this.slots?t:n}whenSlot(e,t,n){return e in this.slots?n():t}}function j(e){const[t]=e,n=Object(r.isString)(t)?t in F?t:t in E?":component":"*":":dynamic";return F[n]}function w(e,t,n,r){return j(e)(e,t,n,r)}function S(e,t,n){const r=new g(null,Object.assign(Object.assign({},e),{refs:{}})),s=new O({collection:"expangine",name:"mounted",attributes:{},events:{},slots:{},state:{},computed:{},render:()=>t},{},r),o=w(t,s,r);return n&&I([n],o.elements),s.node=o,s}function C(e){return!!e&&Object(r.isObject)(e.style)}function T(e,t="default",n=0){return e?Object(r.isArray)(e)?e:Object(r.isObject)(e)&&Object(r.isArray)(e[t])?e[t]:Object(r.isObject)(e)&&Object(r.isObject)(e[t])&&Object(r.isArray)(e[t][n])?e[t][n]:[]:[]}function L(e){return"object"==typeof e&&!Array.isArray(e)}function I(e,t){if(0===e.length)e.push(...t);else{const n=e[0].parentNode;if(n){const r=new Set(e);let s=e[0].previousSibling;for(let o=0;o<t.length;o++){const i=t[o],c=s?s.nextSibling:e[o];r.delete(i),c!==i&&(c?n.insertBefore(i,c):!s&&n.firstChild?n.insertBefore(i,n.firstChild):n.appendChild(i)),s=i}for(const e of r)n.removeChild(e)}e.splice(0,e.length,...t)}}function A(e,t,n,s,o=!1){const i=[],c=[];for(const o of e)if(Object(r.isString)(o))i.push(document.createTextNode(o));else if(g.isWatchable(o)){const e=document.createTextNode("");t.watch(o,t=>{e.textContent=t}),i.push(e)}else{const e=w(o,n,t,s);for(const t of e.elements)i.push(t);e.scope!==t&&c.push(e.scope),s.children?s.children.push(e):s.children=[e]}return{elements:i,updateScopes(e){t.setMany(e);for(const t of c)t.setMany(e)},destroy(){o||t.destroy();for(const e of c)e.destroy()}}}const N={prevent:(e,t)=>(t.preventDefault&&t.preventDefault(),!0),stop:(e,t)=>(t.stopPropagation&&t.stopPropagation(),!0),self:(e,t)=>t.target===e};function M(e,t){const n=e.indexOf(t),r=n>=0;return r&&e.splice(n,1),r}function _(e,t,n){""===n||null==n?e.hasAttribute(t)&&e.removeAttribute(t):e.setAttribute(t,function e(t,n=!1){if(Object(r.isArray)(t))return t.map(t=>e(t)).filter(e=>Boolean(e)).join(n?"; ":" ");if(Object(r.isObject)(t)){const r=[];for(const s in t)(t[s]||n&&0===t[s])&&r.push(n?s+": "+e(t[s]):s);return r.join(n?"; ":" ")}return null==t?"":String(t)}(n,"style"===t.toLowerCase()))}const k=(e,t,n,s)=>{const[o,i,,c]=e,a=o.substring(1),u=[document.createComment(a)],l=u.slice(),d={parent:s,component:t,scope:n,elements:l},p=n.createChild();if(!(i&&i.cases&&i.value))throw new Error(`The ${o} directive requires a cases and value attribute.`);{const e=i.mode||"detach",s=r.defs.getExpression(i.value),o=r.Exprs.switch(s,i.isEqual||r.AnyOps.isEqual);for(const e in i.cases)o.case(i.cases[e]).than(e);let a,l;o.default("default"),n.watch(o,n=>{const r=T(c,n);if(0===r.length)switch(p.setEnabled(!1),e){case"detach":I(d.elements,u);break;case"destroy":l&&(l.destroy(),l=void 0),I(d.elements,u);break;case"hide":if(l){const e=d.elements.slice();for(let t=0;t<e.length;t++){const n=e[t];C(n)?n.style.display="none":e[t]=document.createComment("")}I(d.elements,e)}}else{if(n!==a||"destroy"===e){l&&(l.destroy(),l=void 0);const e=A(r,p,t,d,!0);I(d.elements,e.elements),l=e,a=n}else if("detach"===e)I(d.elements,l.elements);else{const e=d.elements.slice();for(let t=0;t<e.length;t++){const n=e[t];C(n)?n.style.display="":e[t]=l.elements[t]}I(d.elements,e)}p.setEnabled(!0)}},!0,!0)}return d},F={"*":(e,t,n,s)=>{const[o,i,c,a]=e,u=document.createElement(o),l={elements:[u],component:t,scope:n,parent:s};if(Object(r.isObject)(i))for(const e in i){const t=i[e];g.isWatchable(t)?n.watch(t,t=>{_(u,e,t)}):_(u,e,t)}if(Object(r.isObject)(c))for(const e in c){const t=e.split("."),s=t.shift(),o=c[s],i={once:M(t,"once"),passive:M(t,"passive"),capture:M(t,"capture")},a=Object(r.isFunction)(o)?o:n.eval(o);u.addEventListener(s,e=>{for(const n of t)if(n in N&&!N[n](u,e))return;const r={nativeEvent:e,scope:n,stop:!1,prevent:!1};if(!1===a(r))return!1;for(const t in r)if(r[t]&&t in N&&!N[t](u,e))return},i)}const d=T(a);if(d.length>0){const e=A(d,n,t,l);for(const t of e.elements)u.appendChild(t)}return l},":dynamic":(e,t,n,r)=>{const[s]=e,o={parent:r,component:t,scope:n,elements:[document.createComment("dynamic")]};let i;return n.watch(s,s=>{e[0]=s,i&&i.destroy(),i=n.createChild();const c=w(e,t,i,r);I(o.elements,c.elements)},!0,!0),o},":component":(e,t,n,s)=>{const[o,i,c,a]=e,u=E[o],l=new g(null,{emit:{},refs:{}}),d=new O(u,i,l,L(a)?a:void 0,t,n),p=null==i?void 0:i.ref;if(p&&delete i.ref,u.attributes)for(const e in u.attributes){const t=u.attributes[e],s=t instanceof r.Type?{type:t}:t;if(s.callable)continue;const o=i&&e in i?i[e]:s.default;if(g.isWatchable(o)){let t=!0;n.watch(o,n=>{l.set(e,n,!0),t&&s.initial?s.initial(n,d):!t&&s.changed&&s.changed(n,d),s.update&&s.update(n,d),!t&&u.updated&&u.updated(d),t=!1})}else l.set(e,o,!0)}if(u.state)for(const e in u.state){const t=u.state[e];l.set(e,l.eval(t)(),!0)}if(u.computed)for(const e in u.computed){const t=u.computed[e];l.watch(t,t=>{l.set(e,t,!0)})}if(Object(r.isObject)(c)&&u.events)for(const e in c){if(!(e in u.events))continue;const t=c[e];if(g.isWatchable(t)){const r=n.eval(t);d.on(e,r)}}const f=w(u.render(d),d,l,s);return d.node=f,u.created&&u.created(d),p&&t&&(t.scope.observed.refs[p]=l.observed),f},":if":([e,t,n,r],s,o,i)=>k([e,Object.assign({value:!0},t),n,r],s,o,i),":slot":(e,t,n,r)=>{const[,s,,o]=e,i={parent:r,component:t,scope:n,elements:[document.createComment("slot")]};if(s){const e=s.name||"default",r=s.slotIndex&&n.eval(s.slotIndex)()||0,c=T(t.slots,e,r),a=c.length>0,u=a?c:T(o,e,r),l=a?t.outerScope.createChild():n.createChild();if(s.slotIndex){const n=t.getSlotOptions(e),s=n&&n.arrayIndexAlias||"slotIndex";l.set(s,r)}if(s.scope)for(const e in s.scope){const t=s.scope[e];g.isWatchable(t)?n.watch(t,t=>{l.set(e,t,!0)}):l.set(e,t,!0)}if(u){const e=A(u,l,t,i);i.elements=e.elements}}return i},":for":(e,t,n,s)=>{const[,o,,i]=e,c=document.createComment("for"),a={parent:s,component:t,scope:n,elements:[c]},u=T(i);if(o&&o.items){const e=o.item||"item",s=o.index||"index",i=o.key||r.Exprs.get(s),l=n.eval(i),d=new Map;n.watch(o.items,o=>{const i=[c],p=new Set;!function(e,t){if(Object(r.isArray)(e))for(let n=0;n<e.length;n++)t(e[n],n);else if(Object(r.isSet)(e)){let n=0;for(const r of e)t(r,n++)}else if(Object(r.isMap)(e))for(const[n,r]of e.entries())t(r,n);else if(Object(r.isObject)(e))for(const n in e)t(e[n],e);else if(Object(r.isNumber)(e))for(let n=0;n<e;n++)t(n,n)}(o,(r,o)=>{const c={[e]:r,[s]:o},f=l(Object.assign({},c));let h=d.get(f);if(h)h.updateScopes(c);else{const e=n.createChild(c);h=A(u,e,t,a),d.set(f,h)}p.add(f),i.push(...h.elements)}),I(a.elements,i),d.forEach((e,t)=>{p.has(t)||(e.destroy(),d.delete(t))})})}return a},":switch":k};function R(e,t,n="detach"){return P([[e,t]],void 0,n)}function D(e,t,n,r="detach"){return P([[e,t]],n,r)}function P(e,t,n="detach"){return[":if",{mode:n,cases:e.reduce((e,[t],n)=>(e[n]=t,e),{})},{},Object.assign(Object.assign({},e.reduce((e,[,t],n)=>(e[n]=t,e),{})),{default:t})]}function $(e,t){return P([[e,t]],void 0,"hide")}function W(e,t){return P([[r.Exprs.not(e),t]],void 0,"hide")}function q(e,t,n,r){return[":switch",{value:e,cases:t.reduce((e,[t],n)=>(e[n]=t,e),{}),isEqual:r},{},Object.assign(Object.assign({},t.reduce((e,[,t],n)=>(e[n]=t,e),{})),{default:n})]}function U(e,t={},n={},r={}){return[`${e.collection}/${e.name}`,t,n,r]}function H(e,t,n={}){return[":for",Object.assign({items:e},n),{},t]}function B(e,t=[]){return[":slot",e,{},t]}n.d(t,"DEFAULT_SLOT",(function(){return"default"})),n.d(t,"COMPILER_DEFAULT",(function(){return"*"})),n.d(t,"COMPILER_DYNAMIC",(function(){return":dynamic"})),n.d(t,"COMPILER_COMPONENT",(function(){return":component"})),n.d(t,"DIRECTIVE_IF",(function(){return":if"})),n.d(t,"DIRECTIVE_SWITCH",(function(){return":switch"})),n.d(t,"DIRECTIVE_FOR",(function(){return":for"})),n.d(t,"DIRECTIVE_SLOT",(function(){return":slot"})),n.d(t,"compilers",(function(){return F})),n.d(t,"getCompiler",(function(){return j})),n.d(t,"compile",(function(){return w})),n.d(t,"mount",(function(){return S})),n.d(t,"createIf",(function(){return R})),n.d(t,"createIfElse",(function(){return D})),n.d(t,"createIfs",(function(){return P})),n.d(t,"createShow",(function(){return $})),n.d(t,"createHide",(function(){return W})),n.d(t,"createSwitch",(function(){return q})),n.d(t,"createComponent",(function(){return U})),n.d(t,"createFor",(function(){return H})),n.d(t,"createSlot",(function(){return B})),n.d(t,"isStyleElement",(function(){return C})),n.d(t,"getSlots",(function(){return T})),n.d(t,"isNamedSlots",(function(){return L})),n.d(t,"changeElements",(function(){return I})),n.d(t,"createChildNodes",(function(){return A})),n.d(t,"Scope",(function(){return g})),n.d(t,"ComponentInstance",(function(){return O})),n.d(t,"addComponent",(function(){return x})),n.d(t,"ComponentRegistry",(function(){return E}))}]))},function(e,n){e.exports=t},function(e,t,n){"use strict";n.r(t);var r=n(0),s=n(1);const o=Object(s.addComponent)({collection:"bulma",name:"columns",attributes:{gap:{type:r.Types.number(0,8,!0),default:r.Exprs.const(3)},multiline:{type:r.Types.bool(),default:r.Exprs.const(!1)},verticalAlign:{type:r.Types.bool(),default:r.Exprs.const(!1)},centered:{type:r.Types.bool(),default:r.Exprs.const(!1)},mobile:{type:r.Types.bool(),default:r.Exprs.const(!1)}},computed:{columnsClass:r.Exprs.tuple("columns",r.Exprs.if(r.Exprs.op(r.NumberOps.isNotEqual,{value:r.Exprs.get("gap"),test:3})).than(r.Exprs.template("is-variable is-{gap}",{gap:r.Exprs.get("gap")})),r.Exprs.if(r.Exprs.get("multiline")).than(r.Exprs.const("is-multiline")),r.Exprs.if(r.Exprs.get("verticalAlign")).than(r.Exprs.const("is-vcentered")),r.Exprs.if(r.Exprs.get("centered")).than(r.Exprs.const("is-centered")),r.Exprs.if(r.Exprs.get("mobile")).than(r.Exprs.const("is-mobile")))},slots:{default:{scope:r.Types.object(),array:!0}},render:e=>["div",{class:r.Exprs.get("columnsClass")},{},[Object(s.createFor)(e.getSlotArrayLength(),[Object(s.createSlot)({slotIndex:r.Exprs.get("index")})])]]}),i=Object(s.addComponent)({collection:"bulma",name:"column",attributes:{width:{type:r.Types.optional(r.Types.number(1,12,!0))},offset:{type:r.Types.number(1,12,!0),default:r.Exprs.const(0)},narrow:{type:r.Types.bool(),default:r.Exprs.const(!1)},narrowBreakpoint:{type:r.Types.enumForText([["is-narrow","None"],["is-narrow-mobile","Mobile"],["is-narrow-tablet","Tablet"],["is-narrow-touch","Touch"],["is-narrow-desktop","Desktop"],["is-narrow-widescreen","Widescreen"],["is-narrow-fullhd","Full HD"]]),default:r.Exprs.const("is-narrow")}},computed:{columnClass:r.Exprs.tuple("column",r.Exprs.if(r.Exprs.op(r.NumberOps.isValid,{value:r.Exprs.get("width")})).than(r.Exprs.template("is-{width}",{width:r.Exprs.get("width")})),r.Exprs.if(r.Exprs.op(r.NumberOps.isGreater,{value:r.Exprs.get("offset"),test:0})).than(r.Exprs.template("is-offset-{offset}",{offset:r.Exprs.get("offset")})),r.Exprs.if(r.Exprs.get("narrow")).than(r.Exprs.get("narrowBreakpoint")))},render:e=>["div",{class:r.Exprs.get("columnClass")},{},[Object(s.createSlot)({})]]}),c=Object(s.addComponent)({collection:"bulma",name:"container",attributes:{type:{type:r.Types.enumForText([["Default",""],["Fluid","is-fluid"],["Widescreen","is-widescreen"],["Full HD","is-fullhd"]]),default:r.Exprs.const("")}},computed:{containerClass:r.Exprs.tuple("container",r.Exprs.get("type"))},render:e=>["div",{class:r.Exprs.get("containerClass")},{},[Object(s.createSlot)({})]]}),a=Object(s.addComponent)({collection:"bulma",name:"level",attributes:{centered:{type:r.Types.bool(),default:r.Exprs.false()},mobile:{type:r.Types.bool(),default:r.Exprs.false()}},computed:{itemClass:r.Exprs.object({"level-item":!0,"has-text-centered":r.Exprs.get("centered")}),levelClass:r.Exprs.object({level:!0,"is-mobile":r.Exprs.get("mobile")})},slots:{left:{scope:r.Types.object(),array:!0},right:{scope:r.Types.object(),array:!0},default:{scope:r.Types.object(),array:!0}},render:e=>["div",{class:r.Exprs.get("levelClass")},{},[e.whenSlot("left","",()=>["div",{class:"level-left"},{},[Object(s.createFor)(e.getSlotArrayLength("left"),[["div",{class:r.Exprs.get("itemClass")},{},[Object(s.createSlot)({name:"left",slotIndex:r.Exprs.get("index")})]]])]]),e.whenSlot("default","",()=>Object(s.createFor)(e.getSlotArrayLength("default"),[["div",{class:r.Exprs.get("itemClass")},{},[Object(s.createSlot)({name:"default",slotIndex:r.Exprs.get("index")})]]])),e.whenSlot("right","",()=>["div",{class:"level-right"},{},[Object(s.createFor)(e.getSlotArrayLength("right"),[["div",{class:r.Exprs.get("itemClass")},{},[Object(s.createSlot)({name:"right",slotIndex:r.Exprs.get("index")})]]])]])]]}),u=Object(s.addComponent)({collection:"bulma",name:"media",slots:{left:r.Types.object(),right:r.Types.object(),default:r.Types.object()},render:e=>["article",{class:"media"},{},[e.whenSlot("left","",()=>["figure",{class:"media-left"},{},[Object(s.createSlot)({name:"left"})]]),["div",{class:"media-content"},{},[Object(s.createSlot)({})]],e.whenSlot("right","",()=>["div",{class:"media-right"},{},[Object(s.createSlot)({name:"right"})]])]]}),l=Object(s.addComponent)({collection:"bulma",name:"hero",attributes:{type:r.Types.optional(r.Types.enumForText([["is-primary","Primary"],["is-info","Info"],["is-success","Success"],["is-link","Link"],["is-warning","Warning"],["is-danger","Danger"],["is-light","Light"],["is-dark","Dark"]])),size:r.Types.optional(r.Types.enumForText([["","Default"],["is-medium","Medium"],["is-large","Large"],["is-fullheight","Fullheight"],["is-fullheight-with-navbar","Fullheight with Navbar"]])),gradient:{type:r.Types.bool(),default:r.Exprs.false()}},computed:{heroClass:r.Exprs.tuple("hero",r.Exprs.get("type"),r.Exprs.get("size"),r.Exprs.if(r.Exprs.get("gradient")).than(r.Exprs.const("is-bold")))},slots:{header:r.Types.object(),footer:r.Types.object(),default:r.Types.object()},render:e=>["section",{class:r.Exprs.get("heroClass")},{},[e.whenSlot("header","",()=>["div",{class:"hero-head"},{},[Object(s.createSlot)({name:"header"})]]),["div",{class:"hero-body"},{},[Object(s.createSlot)({})]],e.whenSlot("footer","",()=>["div",{class:"hero-foot"},{},[Object(s.createSlot)({name:"footer"})]])]]});n.d(t,"COLLECTION",(function(){return"bulma"})),n.d(t,"COLUMN_MIN",(function(){return 1})),n.d(t,"COLUMN_MAX",(function(){return 12})),n.d(t,"COLUMN_DEFAULT_GAP",(function(){return 3})),n.d(t,"COLUMN_DEFAULT_OFFSET",(function(){return 0})),n.d(t,"Columns",(function(){return o})),n.d(t,"Column",(function(){return i})),n.d(t,"Container",(function(){return c})),n.d(t,"Level",(function(){return a})),n.d(t,"Media",(function(){return u})),n.d(t,"Hero",(function(){return l}))}])}));
//# sourceMappingURL=expangine-ui.js.map