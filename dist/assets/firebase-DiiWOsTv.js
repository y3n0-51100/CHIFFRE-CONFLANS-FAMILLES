const gf=()=>{};var vu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jc=function(r){const t=[];let e=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},pf=function(r){const t=[];let e=0,n=0;for(;e<r.length;){const s=r[e++];if(s<128)t[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[e++];t[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[e++],a=r[e++],u=r[e++],l=((s&7)<<18|(i&63)<<12|(a&63)<<6|u&63)-65536;t[n++]=String.fromCharCode(55296+(l>>10)),t[n++]=String.fromCharCode(56320+(l&1023))}else{const i=r[e++],a=r[e++];t[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")},Zc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,t){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],a=s+1<r.length,u=a?r[s+1]:0,l=s+2<r.length,d=l?r[s+2]:0,m=i>>2,g=(i&3)<<4|u>>4;let A=(u&15)<<2|d>>6,R=d&63;l||(R=64,a||(A=64)),n.push(e[m],e[g],e[A],e[R])}return n.join("")},encodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(r):this.encodeByteArray(Jc(r),t)},decodeString(r,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(r):pf(this.decodeStringToByteArray(r,t))},decodeStringToByteArray(r,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=e[r.charAt(s++)],u=s<r.length?e[r.charAt(s)]:0;++s;const d=s<r.length?e[r.charAt(s)]:64;++s;const g=s<r.length?e[r.charAt(s)]:64;if(++s,i==null||u==null||d==null||g==null)throw new _f;const A=i<<2|u>>4;if(n.push(A),d!==64){const R=u<<4&240|d>>2;if(n.push(R),g!==64){const C=d<<6&192|g;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class _f extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const yf=function(r){const t=Jc(r);return Zc.encodeByteArray(t,!0)},tl=function(r){return yf(r).replace(/\./g,"")},If=function(r){try{return Zc.decodeString(r,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ef=()=>el().__FIREBASE_DEFAULTS__,Tf=()=>{if(typeof process>"u"||typeof vu>"u")return;const r=vu.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},vf=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=r&&If(r[1]);return t&&JSON.parse(t)},nl=()=>{try{return gf()||Ef()||Tf()||vf()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},wf=()=>{var r;return(r=nl())===null||r===void 0?void 0:r.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,n)=>{e?this.reject(e):this.resolve(n),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,n))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rl(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function bf(r){return(await fetch(r,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rs(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function sl(){var r;const t=(r=nl())===null||r===void 0?void 0:r.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function il(){return!sl()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function ol(){return!sl()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function al(){try{return typeof indexedDB=="object"}catch{return!1}}function Sf(){return new Promise((r,t)=>{try{let e=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var i;t(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(e){t(e)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf="FirebaseError";class xn extends Error{constructor(t,e,n){super(e),this.code=t,this.customData=n,this.name=Rf,Object.setPrototypeOf(this,xn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ul.prototype.create)}}class ul{constructor(t,e,n){this.service=t,this.serviceName=e,this.errors=n}create(t,...e){const n=e[0]||{},s=`${this.service}/${t}`,i=this.errors[t],a=i?Pf(i,n):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new xn(s,u,n)}}function Pf(r,t){return r.replace(Vf,(e,n)=>{const s=t[n];return s!=null?String(s):`<${n}?>`})}const Vf=/\{\$([^}]+)}/g;function Ps(r,t){if(r===t)return!0;const e=Object.keys(r),n=Object.keys(t);for(const s of e){if(!n.includes(s))return!1;const i=r[s],a=t[s];if(wu(i)&&wu(a)){if(!Ps(i,a))return!1}else if(i!==a)return!1}for(const s of n)if(!e.includes(s))return!1;return!0}function wu(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(r){return r&&r._delegate?r._delegate:r}class Tr{constructor(t,e,n){this.name=t,this.instanceFactory=e,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ve="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cf{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const n=new Af;if(this.instancesDeferred.set(e,n),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){var e;const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(e=t==null?void 0:t.optional)!==null&&e!==void 0?e:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(xf(t))try{this.getOrInitializeService({instanceIdentifier:Ve})}catch{}for(const[e,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(t=Ve){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=Ve){return this.instances.has(t)}getOptions(t=Ve){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,n=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:e});for(const[i,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&a.resolve(s)}return s}onInit(t,e){var n;const s=this.normalizeInstanceIdentifier(e),i=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;i.add(t),this.onInitCallbacks.set(s,i);const a=this.instances.get(s);return a&&t(a,s),()=>{i.delete(t)}}invokeOnInitCallbacks(t,e){const n=this.onInitCallbacks.get(e);if(n)for(const s of n)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let n=this.instances.get(t);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Df(t),options:e}),this.instances.set(t,n),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(n,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,n)}catch{}return n||null}normalizeInstanceIdentifier(t=Ve){return this.component?this.component.multipleInstances?t:Ve:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Df(r){return r===Ve?void 0:r}function xf(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Cf(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(W||(W={}));const kf={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},Of=W.INFO,Mf={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Ff=(r,t,...e)=>{if(t<r.logLevel)return;const n=new Date().toISOString(),s=Mf[t];if(s)console[s](`[${n}]  ${r.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class cl{constructor(t){this.name=t,this._logLevel=Of,this._logHandler=Ff,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in W))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?kf[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...t),this._logHandler(this,W.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...t),this._logHandler(this,W.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,W.INFO,...t),this._logHandler(this,W.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,W.WARN,...t),this._logHandler(this,W.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...t),this._logHandler(this,W.ERROR,...t)}}const Lf=(r,t)=>t.some(e=>r instanceof e);let Au,bu;function Bf(){return Au||(Au=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Uf(){return bu||(bu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ll=new WeakMap,Ji=new WeakMap,hl=new WeakMap,Ui=new WeakMap,Co=new WeakMap;function jf(r){const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("success",i),r.removeEventListener("error",a)},i=()=>{e(de(r.result)),s()},a=()=>{n(r.error),s()};r.addEventListener("success",i),r.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&ll.set(e,r)}).catch(()=>{}),Co.set(t,r),t}function qf(r){if(Ji.has(r))return;const t=new Promise((e,n)=>{const s=()=>{r.removeEventListener("complete",i),r.removeEventListener("error",a),r.removeEventListener("abort",a)},i=()=>{e(),s()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),s()};r.addEventListener("complete",i),r.addEventListener("error",a),r.addEventListener("abort",a)});Ji.set(r,t)}let Zi={get(r,t,e){if(r instanceof IDBTransaction){if(t==="done")return Ji.get(r);if(t==="objectStoreNames")return r.objectStoreNames||hl.get(r);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return de(r[t])},set(r,t,e){return r[t]=e,!0},has(r,t){return r instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in r}};function zf(r){Zi=r(Zi)}function $f(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const n=r.call(ji(this),t,...e);return hl.set(n,t.sort?t.sort():[t]),de(n)}:Uf().includes(r)?function(...t){return r.apply(ji(this),t),de(ll.get(this))}:function(...t){return de(r.apply(ji(this),t))}}function Kf(r){return typeof r=="function"?$f(r):(r instanceof IDBTransaction&&qf(r),Lf(r,Bf())?new Proxy(r,Zi):r)}function de(r){if(r instanceof IDBRequest)return jf(r);if(Ui.has(r))return Ui.get(r);const t=Kf(r);return t!==r&&(Ui.set(r,t),Co.set(t,r)),t}const ji=r=>Co.get(r);function Gf(r,t,{blocked:e,upgrade:n,blocking:s,terminated:i}={}){const a=indexedDB.open(r,t),u=de(a);return n&&a.addEventListener("upgradeneeded",l=>{n(de(a.result),l.oldVersion,l.newVersion,de(a.transaction),l)}),e&&a.addEventListener("blocked",l=>e(l.oldVersion,l.newVersion,l)),u.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const Wf=["get","getKey","getAll","getAllKeys","count"],Hf=["put","add","delete","clear"],qi=new Map;function Su(r,t){if(!(r instanceof IDBDatabase&&!(t in r)&&typeof t=="string"))return;if(qi.get(t))return qi.get(t);const e=t.replace(/FromIndex$/,""),n=t!==e,s=Hf.includes(e);if(!(e in(n?IDBIndex:IDBObjectStore).prototype)||!(s||Wf.includes(e)))return;const i=async function(a,...u){const l=this.transaction(a,s?"readwrite":"readonly");let d=l.store;return n&&(d=d.index(u.shift())),(await Promise.all([d[e](...u),s&&l.done]))[0]};return qi.set(t,i),i}zf(r=>({...r,get:(t,e,n)=>Su(t,e)||r.get(t,e,n),has:(t,e)=>!!Su(t,e)||r.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qf{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Xf(e)){const n=e.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(e=>e).join(" ")}}function Xf(r){const t=r.getComponent();return(t==null?void 0:t.type)==="VERSION"}const to="@firebase/app",Ru="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=new cl("@firebase/app"),Yf="@firebase/app-compat",Jf="@firebase/analytics-compat",Zf="@firebase/analytics",tm="@firebase/app-check-compat",em="@firebase/app-check",nm="@firebase/auth",rm="@firebase/auth-compat",sm="@firebase/database",im="@firebase/data-connect",om="@firebase/database-compat",am="@firebase/functions",um="@firebase/functions-compat",cm="@firebase/installations",lm="@firebase/installations-compat",hm="@firebase/messaging",dm="@firebase/messaging-compat",fm="@firebase/performance",mm="@firebase/performance-compat",gm="@firebase/remote-config",pm="@firebase/remote-config-compat",_m="@firebase/storage",ym="@firebase/storage-compat",Im="@firebase/firestore",Em="@firebase/ai",Tm="@firebase/firestore-compat",vm="firebase",wm="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Am="[DEFAULT]",bm={[to]:"fire-core",[Yf]:"fire-core-compat",[Zf]:"fire-analytics",[Jf]:"fire-analytics-compat",[em]:"fire-app-check",[tm]:"fire-app-check-compat",[nm]:"fire-auth",[rm]:"fire-auth-compat",[sm]:"fire-rtdb",[im]:"fire-data-connect",[om]:"fire-rtdb-compat",[am]:"fire-fn",[um]:"fire-fn-compat",[cm]:"fire-iid",[lm]:"fire-iid-compat",[hm]:"fire-fcm",[dm]:"fire-fcm-compat",[fm]:"fire-perf",[mm]:"fire-perf-compat",[gm]:"fire-rc",[pm]:"fire-rc-compat",[_m]:"fire-gcs",[ym]:"fire-gcs-compat",[Im]:"fire-fst",[Tm]:"fire-fst-compat",[Em]:"fire-vertex","fire-js":"fire-js",[vm]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo=new Map,Sm=new Map,no=new Map;function Pu(r,t){try{r.container.addComponent(t)}catch(e){Zt.debug(`Component ${t.name} failed to register with FirebaseApp ${r.name}`,e)}}function Cs(r){const t=r.name;if(no.has(t))return Zt.debug(`There were multiple attempts to register component ${t}.`),!1;no.set(t,r);for(const e of eo.values())Pu(e,r);for(const e of Sm.values())Pu(e,r);return!0}function Rm(r,t){const e=r.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),r.container.getProvider(t)}function Pm(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vm={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Fe=new ul("app","Firebase",Vm);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(t,e,n){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},e),this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Tr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Fe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dm=wm;function xm(r,t={}){let e=r;typeof t!="object"&&(t={name:t});const n=Object.assign({name:Am,automaticDataCollectionEnabled:!0},t),s=n.name;if(typeof s!="string"||!s)throw Fe.create("bad-app-name",{appName:String(s)});if(e||(e=wf()),!e)throw Fe.create("no-options");const i=eo.get(s);if(i){if(Ps(e,i.options)&&Ps(n,i.config))return i;throw Fe.create("duplicate-app",{appName:s})}const a=new Nf(s);for(const l of no.values())a.addComponent(l);const u=new Cm(e,n,a);return eo.set(s,u),u}function fn(r,t,e){var n;let s=(n=bm[r])!==null&&n!==void 0?n:r;e&&(s+=`-${e}`);const i=s.match(/\s|\//),a=t.match(/\s|\//);if(i||a){const u=[`Unable to register library "${s}" with version "${t}":`];i&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&a&&u.push("and"),a&&u.push(`version name "${t}" contains illegal characters (whitespace or "/")`),Zt.warn(u.join(" "));return}Cs(new Tr(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nm="firebase-heartbeat-database",km=1,vr="firebase-heartbeat-store";let zi=null;function dl(){return zi||(zi=Gf(Nm,km,{upgrade:(r,t)=>{switch(t){case 0:try{r.createObjectStore(vr)}catch(e){console.warn(e)}}}}).catch(r=>{throw Fe.create("idb-open",{originalErrorMessage:r.message})})),zi}async function Om(r){try{const e=(await dl()).transaction(vr),n=await e.objectStore(vr).get(fl(r));return await e.done,n}catch(t){if(t instanceof xn)Zt.warn(t.message);else{const e=Fe.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});Zt.warn(e.message)}}}async function Vu(r,t){try{const n=(await dl()).transaction(vr,"readwrite");await n.objectStore(vr).put(t,fl(r)),await n.done}catch(e){if(e instanceof xn)Zt.warn(e.message);else{const n=Fe.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});Zt.warn(n.message)}}}function fl(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mm=1024,Fm=30;class Lm{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Um(e),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Cu();if(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(a=>a.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>Fm){const a=jm(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){Zt.warn(n)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Cu(),{heartbeatsToSend:n,unsentEntries:s}=Bm(this._heartbeatsCache.heartbeats),i=tl(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return Zt.warn(e),""}}}function Cu(){return new Date().toISOString().substring(0,10)}function Bm(r,t=Mm){const e=[];let n=r.slice();for(const s of r){const i=e.find(a=>a.agent===s.agent);if(i){if(i.dates.push(s.date),Du(e)>t){i.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),Du(e)>t){e.pop();break}n=n.slice(1)}return{heartbeatsToSend:e,unsentEntries:n}}class Um{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return al()?Sf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Om(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Vu(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var e;if(await this._canUseIndexedDBPromise){const s=await this.read();return Vu(this.app,{lastSentHeartbeatDate:(e=t.lastSentHeartbeatDate)!==null&&e!==void 0?e:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Du(r){return tl(JSON.stringify({version:2,heartbeats:r})).length}function jm(r){if(r.length===0)return-1;let t=0,e=r[0].date;for(let n=1;n<r.length;n++)r[n].date<e&&(e=r[n].date,t=n);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qm(r){Cs(new Tr("platform-logger",t=>new Qf(t),"PRIVATE")),Cs(new Tr("heartbeat",t=>new Lm(t),"PRIVATE")),fn(to,Ru,r),fn(to,Ru,"esm2017"),fn("fire-js","")}qm("");var xu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var fe,ml;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(I,p){function y(){}y.prototype=p.prototype,I.D=p.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(E,T,b){for(var _=Array(arguments.length-2),Ht=2;Ht<arguments.length;Ht++)_[Ht-2]=arguments[Ht];return p.prototype[T].apply(E,_)}}function e(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(n,e),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,p,y){y||(y=0);var E=Array(16);if(typeof p=="string")for(var T=0;16>T;++T)E[T]=p.charCodeAt(y++)|p.charCodeAt(y++)<<8|p.charCodeAt(y++)<<16|p.charCodeAt(y++)<<24;else for(T=0;16>T;++T)E[T]=p[y++]|p[y++]<<8|p[y++]<<16|p[y++]<<24;p=I.g[0],y=I.g[1],T=I.g[2];var b=I.g[3],_=p+(b^y&(T^b))+E[0]+3614090360&4294967295;p=y+(_<<7&4294967295|_>>>25),_=b+(T^p&(y^T))+E[1]+3905402710&4294967295,b=p+(_<<12&4294967295|_>>>20),_=T+(y^b&(p^y))+E[2]+606105819&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(p^T&(b^p))+E[3]+3250441966&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(b^y&(T^b))+E[4]+4118548399&4294967295,p=y+(_<<7&4294967295|_>>>25),_=b+(T^p&(y^T))+E[5]+1200080426&4294967295,b=p+(_<<12&4294967295|_>>>20),_=T+(y^b&(p^y))+E[6]+2821735955&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(p^T&(b^p))+E[7]+4249261313&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(b^y&(T^b))+E[8]+1770035416&4294967295,p=y+(_<<7&4294967295|_>>>25),_=b+(T^p&(y^T))+E[9]+2336552879&4294967295,b=p+(_<<12&4294967295|_>>>20),_=T+(y^b&(p^y))+E[10]+4294925233&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(p^T&(b^p))+E[11]+2304563134&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(b^y&(T^b))+E[12]+1804603682&4294967295,p=y+(_<<7&4294967295|_>>>25),_=b+(T^p&(y^T))+E[13]+4254626195&4294967295,b=p+(_<<12&4294967295|_>>>20),_=T+(y^b&(p^y))+E[14]+2792965006&4294967295,T=b+(_<<17&4294967295|_>>>15),_=y+(p^T&(b^p))+E[15]+1236535329&4294967295,y=T+(_<<22&4294967295|_>>>10),_=p+(T^b&(y^T))+E[1]+4129170786&4294967295,p=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(p^y))+E[6]+3225465664&4294967295,b=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(b^p))+E[11]+643717713&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^p&(T^b))+E[0]+3921069994&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^b&(y^T))+E[5]+3593408605&4294967295,p=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(p^y))+E[10]+38016083&4294967295,b=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(b^p))+E[15]+3634488961&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^p&(T^b))+E[4]+3889429448&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^b&(y^T))+E[9]+568446438&4294967295,p=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(p^y))+E[14]+3275163606&4294967295,b=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(b^p))+E[3]+4107603335&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^p&(T^b))+E[8]+1163531501&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(T^b&(y^T))+E[13]+2850285829&4294967295,p=y+(_<<5&4294967295|_>>>27),_=b+(y^T&(p^y))+E[2]+4243563512&4294967295,b=p+(_<<9&4294967295|_>>>23),_=T+(p^y&(b^p))+E[7]+1735328473&4294967295,T=b+(_<<14&4294967295|_>>>18),_=y+(b^p&(T^b))+E[12]+2368359562&4294967295,y=T+(_<<20&4294967295|_>>>12),_=p+(y^T^b)+E[5]+4294588738&4294967295,p=y+(_<<4&4294967295|_>>>28),_=b+(p^y^T)+E[8]+2272392833&4294967295,b=p+(_<<11&4294967295|_>>>21),_=T+(b^p^y)+E[11]+1839030562&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^p)+E[14]+4259657740&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^b)+E[1]+2763975236&4294967295,p=y+(_<<4&4294967295|_>>>28),_=b+(p^y^T)+E[4]+1272893353&4294967295,b=p+(_<<11&4294967295|_>>>21),_=T+(b^p^y)+E[7]+4139469664&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^p)+E[10]+3200236656&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^b)+E[13]+681279174&4294967295,p=y+(_<<4&4294967295|_>>>28),_=b+(p^y^T)+E[0]+3936430074&4294967295,b=p+(_<<11&4294967295|_>>>21),_=T+(b^p^y)+E[3]+3572445317&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^p)+E[6]+76029189&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(y^T^b)+E[9]+3654602809&4294967295,p=y+(_<<4&4294967295|_>>>28),_=b+(p^y^T)+E[12]+3873151461&4294967295,b=p+(_<<11&4294967295|_>>>21),_=T+(b^p^y)+E[15]+530742520&4294967295,T=b+(_<<16&4294967295|_>>>16),_=y+(T^b^p)+E[2]+3299628645&4294967295,y=T+(_<<23&4294967295|_>>>9),_=p+(T^(y|~b))+E[0]+4096336452&4294967295,p=y+(_<<6&4294967295|_>>>26),_=b+(y^(p|~T))+E[7]+1126891415&4294967295,b=p+(_<<10&4294967295|_>>>22),_=T+(p^(b|~y))+E[14]+2878612391&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~p))+E[5]+4237533241&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~b))+E[12]+1700485571&4294967295,p=y+(_<<6&4294967295|_>>>26),_=b+(y^(p|~T))+E[3]+2399980690&4294967295,b=p+(_<<10&4294967295|_>>>22),_=T+(p^(b|~y))+E[10]+4293915773&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~p))+E[1]+2240044497&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~b))+E[8]+1873313359&4294967295,p=y+(_<<6&4294967295|_>>>26),_=b+(y^(p|~T))+E[15]+4264355552&4294967295,b=p+(_<<10&4294967295|_>>>22),_=T+(p^(b|~y))+E[6]+2734768916&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~p))+E[13]+1309151649&4294967295,y=T+(_<<21&4294967295|_>>>11),_=p+(T^(y|~b))+E[4]+4149444226&4294967295,p=y+(_<<6&4294967295|_>>>26),_=b+(y^(p|~T))+E[11]+3174756917&4294967295,b=p+(_<<10&4294967295|_>>>22),_=T+(p^(b|~y))+E[2]+718787259&4294967295,T=b+(_<<15&4294967295|_>>>17),_=y+(b^(T|~p))+E[9]+3951481745&4294967295,I.g[0]=I.g[0]+p&4294967295,I.g[1]=I.g[1]+(T+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+T&4294967295,I.g[3]=I.g[3]+b&4294967295}n.prototype.u=function(I,p){p===void 0&&(p=I.length);for(var y=p-this.blockSize,E=this.B,T=this.h,b=0;b<p;){if(T==0)for(;b<=y;)s(this,I,b),b+=this.blockSize;if(typeof I=="string"){for(;b<p;)if(E[T++]=I.charCodeAt(b++),T==this.blockSize){s(this,E),T=0;break}}else for(;b<p;)if(E[T++]=I[b++],T==this.blockSize){s(this,E),T=0;break}}this.h=T,this.o+=p},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var p=1;p<I.length-8;++p)I[p]=0;var y=8*this.o;for(p=I.length-8;p<I.length;++p)I[p]=y&255,y/=256;for(this.u(I),I=Array(16),p=y=0;4>p;++p)for(var E=0;32>E;E+=8)I[y++]=this.g[p]>>>E&255;return I};function i(I,p){var y=u;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=p(I)}function a(I,p){this.h=p;for(var y=[],E=!0,T=I.length-1;0<=T;T--){var b=I[T]|0;E&&b==p||(y[T]=b,E=!1)}this.g=y}var u={};function l(I){return-128<=I&&128>I?i(I,function(p){return new a([p|0],0>p?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return g;if(0>I)return x(d(-I));for(var p=[],y=1,E=0;I>=y;E++)p[E]=I/y|0,y*=4294967296;return new a(p,0)}function m(I,p){if(I.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(I.charAt(0)=="-")return x(m(I.substring(1),p));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(p,8)),E=g,T=0;T<I.length;T+=8){var b=Math.min(8,I.length-T),_=parseInt(I.substring(T,T+b),p);8>b?(b=d(Math.pow(p,b)),E=E.j(b).add(d(_))):(E=E.j(y),E=E.add(d(_)))}return E}var g=l(0),A=l(1),R=l(16777216);r=a.prototype,r.m=function(){if(k(this))return-x(this).m();for(var I=0,p=1,y=0;y<this.g.length;y++){var E=this.i(y);I+=(0<=E?E:4294967296+E)*p,p*=4294967296}return I},r.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(k(this))return"-"+x(this).toString(I);for(var p=d(Math.pow(I,6)),y=this,E="";;){var T=X(y,p).g;y=$(y,T.j(p));var b=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=T,C(y))return b+E;for(;6>b.length;)b="0"+b;E=b+E}},r.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(var p=0;p<I.g.length;p++)if(I.g[p]!=0)return!1;return!0}function k(I){return I.h==-1}r.l=function(I){return I=$(this,I),k(I)?-1:C(I)?0:1};function x(I){for(var p=I.g.length,y=[],E=0;E<p;E++)y[E]=~I.g[E];return new a(y,~I.h).add(A)}r.abs=function(){return k(this)?x(this):this},r.add=function(I){for(var p=Math.max(this.g.length,I.g.length),y=[],E=0,T=0;T<=p;T++){var b=E+(this.i(T)&65535)+(I.i(T)&65535),_=(b>>>16)+(this.i(T)>>>16)+(I.i(T)>>>16);E=_>>>16,b&=65535,_&=65535,y[T]=_<<16|b}return new a(y,y[y.length-1]&-2147483648?-1:0)};function $(I,p){return I.add(x(p))}r.j=function(I){if(C(this)||C(I))return g;if(k(this))return k(I)?x(this).j(x(I)):x(x(this).j(I));if(k(I))return x(this.j(x(I)));if(0>this.l(R)&&0>I.l(R))return d(this.m()*I.m());for(var p=this.g.length+I.g.length,y=[],E=0;E<2*p;E++)y[E]=0;for(E=0;E<this.g.length;E++)for(var T=0;T<I.g.length;T++){var b=this.i(E)>>>16,_=this.i(E)&65535,Ht=I.i(T)>>>16,Ln=I.i(T)&65535;y[2*E+2*T]+=_*Ln,q(y,2*E+2*T),y[2*E+2*T+1]+=b*Ln,q(y,2*E+2*T+1),y[2*E+2*T+1]+=_*Ht,q(y,2*E+2*T+1),y[2*E+2*T+2]+=b*Ht,q(y,2*E+2*T+2)}for(E=0;E<p;E++)y[E]=y[2*E+1]<<16|y[2*E];for(E=p;E<2*p;E++)y[E]=0;return new a(y,0)};function q(I,p){for(;(I[p]&65535)!=I[p];)I[p+1]+=I[p]>>>16,I[p]&=65535,p++}function U(I,p){this.g=I,this.h=p}function X(I,p){if(C(p))throw Error("division by zero");if(C(I))return new U(g,g);if(k(I))return p=X(x(I),p),new U(x(p.g),x(p.h));if(k(p))return p=X(I,x(p)),new U(x(p.g),p.h);if(30<I.g.length){if(k(I)||k(p))throw Error("slowDivide_ only works with positive integers.");for(var y=A,E=p;0>=E.l(I);)y=nt(y),E=nt(E);var T=H(y,1),b=H(E,1);for(E=H(E,2),y=H(y,2);!C(E);){var _=b.add(E);0>=_.l(I)&&(T=T.add(y),b=_),E=H(E,1),y=H(y,1)}return p=$(I,T.j(p)),new U(T,p)}for(T=g;0<=I.l(p);){for(y=Math.max(1,Math.floor(I.m()/p.m())),E=Math.ceil(Math.log(y)/Math.LN2),E=48>=E?1:Math.pow(2,E-48),b=d(y),_=b.j(p);k(_)||0<_.l(I);)y-=E,b=d(y),_=b.j(p);C(b)&&(b=A),T=T.add(b),I=$(I,_)}return new U(T,I)}r.A=function(I){return X(this,I).h},r.and=function(I){for(var p=Math.max(this.g.length,I.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)&I.i(E);return new a(y,this.h&I.h)},r.or=function(I){for(var p=Math.max(this.g.length,I.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)|I.i(E);return new a(y,this.h|I.h)},r.xor=function(I){for(var p=Math.max(this.g.length,I.g.length),y=[],E=0;E<p;E++)y[E]=this.i(E)^I.i(E);return new a(y,this.h^I.h)};function nt(I){for(var p=I.g.length+1,y=[],E=0;E<p;E++)y[E]=I.i(E)<<1|I.i(E-1)>>>31;return new a(y,I.h)}function H(I,p){var y=p>>5;p%=32;for(var E=I.g.length-y,T=[],b=0;b<E;b++)T[b]=0<p?I.i(b+y)>>>p|I.i(b+y+1)<<32-p:I.i(b+y);return new a(T,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,ml=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=m,fe=a}).apply(typeof xu<"u"?xu:typeof self<"u"?self:typeof window<"u"?window:{});var us=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var gl,or,pl,gs,ro,_l,yl,Il;(function(){var r,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,c,h){return o==Array.prototype||o==Object.prototype||(o[c]=h.value),o};function e(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof us=="object"&&us];for(var c=0;c<o.length;++c){var h=o[c];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=e(this);function s(o,c){if(c)t:{var h=n;o=o.split(".");for(var f=0;f<o.length-1;f++){var w=o[f];if(!(w in h))break t;h=h[w]}o=o[o.length-1],f=h[o],c=c(f),c!=f&&c!=null&&t(h,o,{configurable:!0,writable:!0,value:c})}}function i(o,c){o instanceof String&&(o+="");var h=0,f=!1,w={next:function(){if(!f&&h<o.length){var S=h++;return{value:c(S,o[S]),done:!1}}return f=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(o){return o||function(){return i(this,function(c,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function l(o){var c=typeof o;return c=c!="object"?c:o?Array.isArray(o)?"array":c:"null",c=="array"||c=="object"&&typeof o.length=="number"}function d(o){var c=typeof o;return c=="object"&&o!=null||c=="function"}function m(o,c,h){return o.call.apply(o.bind,arguments)}function g(o,c,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,f),o.apply(c,w)}}return function(){return o.apply(c,arguments)}}function A(o,c,h){return A=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?m:g,A.apply(null,arguments)}function R(o,c){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function C(o,c){function h(){}h.prototype=c.prototype,o.aa=c.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,w,S){for(var D=Array(arguments.length-2),et=2;et<arguments.length;et++)D[et-2]=arguments[et];return c.prototype[w].apply(f,D)}}function k(o){const c=o.length;if(0<c){const h=Array(c);for(let f=0;f<c;f++)h[f]=o[f];return h}return[]}function x(o,c){for(let h=1;h<arguments.length;h++){const f=arguments[h];if(l(f)){const w=o.length||0,S=f.length||0;o.length=w+S;for(let D=0;D<S;D++)o[w+D]=f[D]}else o.push(f)}}class ${constructor(c,h){this.i=c,this.j=h,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function q(o){return/^[\s\xa0]*$/.test(o)}function U(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function X(o){return X[" "](o),o}X[" "]=function(){};var nt=U().indexOf("Gecko")!=-1&&!(U().toLowerCase().indexOf("webkit")!=-1&&U().indexOf("Edge")==-1)&&!(U().indexOf("Trident")!=-1||U().indexOf("MSIE")!=-1)&&U().indexOf("Edge")==-1;function H(o,c,h){for(const f in o)c.call(h,o[f],f,o)}function I(o,c){for(const h in o)c.call(void 0,o[h],h,o)}function p(o){const c={};for(const h in o)c[h]=o[h];return c}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function E(o,c){let h,f;for(let w=1;w<arguments.length;w++){f=arguments[w];for(h in f)o[h]=f[h];for(let S=0;S<y.length;S++)h=y[S],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function T(o){var c=1;o=o.split(":");const h=[];for(;0<c&&o.length;)h.push(o.shift()),c--;return o.length&&h.push(o.join(":")),h}function b(o){u.setTimeout(()=>{throw o},0)}function _(){var o=pi;let c=null;return o.g&&(c=o.g,o.g=o.g.next,o.g||(o.h=null),c.next=null),c}class Ht{constructor(){this.h=this.g=null}add(c,h){const f=Ln.get();f.set(c,h),this.h?this.h.next=f:this.g=f,this.h=f}}var Ln=new $(()=>new Nd,o=>o.reset());class Nd{constructor(){this.next=this.g=this.h=null}set(c,h){this.h=c,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Bn,Un=!1,pi=new Ht,va=()=>{const o=u.Promise.resolve(void 0);Bn=()=>{o.then(kd)}};var kd=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){b(h)}var c=Ln;c.j(o),100>c.h&&(c.h++,o.next=c.g,c.g=o)}Un=!1};function re(){this.s=this.s,this.C=this.C}re.prototype.s=!1,re.prototype.ma=function(){this.s||(this.s=!0,this.N())},re.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function yt(o,c){this.type=o,this.g=this.target=c,this.defaultPrevented=!1}yt.prototype.h=function(){this.defaultPrevented=!0};var Od=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,c=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};u.addEventListener("test",h,c),u.removeEventListener("test",h,c)}catch{}return o}();function jn(o,c){if(yt.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=c,c=o.relatedTarget){if(nt){t:{try{X(c.nodeName);var w=!0;break t}catch{}w=!1}w||(c=null)}}else h=="mouseover"?c=o.fromElement:h=="mouseout"&&(c=o.toElement);this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Md[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&jn.aa.h.call(this)}}C(jn,yt);var Md={2:"touch",3:"pen",4:"mouse"};jn.prototype.h=function(){jn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var zr="closure_listenable_"+(1e6*Math.random()|0),Fd=0;function Ld(o,c,h,f,w){this.listener=o,this.proxy=null,this.src=c,this.type=h,this.capture=!!f,this.ha=w,this.key=++Fd,this.da=this.fa=!1}function $r(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Kr(o){this.src=o,this.g={},this.h=0}Kr.prototype.add=function(o,c,h,f,w){var S=o.toString();o=this.g[S],o||(o=this.g[S]=[],this.h++);var D=yi(o,c,f,w);return-1<D?(c=o[D],h||(c.fa=!1)):(c=new Ld(c,this.src,S,!!f,w),c.fa=h,o.push(c)),c};function _i(o,c){var h=c.type;if(h in o.g){var f=o.g[h],w=Array.prototype.indexOf.call(f,c,void 0),S;(S=0<=w)&&Array.prototype.splice.call(f,w,1),S&&($r(c),o.g[h].length==0&&(delete o.g[h],o.h--))}}function yi(o,c,h,f){for(var w=0;w<o.length;++w){var S=o[w];if(!S.da&&S.listener==c&&S.capture==!!h&&S.ha==f)return w}return-1}var Ii="closure_lm_"+(1e6*Math.random()|0),Ei={};function wa(o,c,h,f,w){if(Array.isArray(c)){for(var S=0;S<c.length;S++)wa(o,c[S],h,f,w);return null}return h=Sa(h),o&&o[zr]?o.K(c,h,d(f)?!!f.capture:!1,w):Bd(o,c,h,!1,f,w)}function Bd(o,c,h,f,w,S){if(!c)throw Error("Invalid event type");var D=d(w)?!!w.capture:!!w,et=vi(o);if(et||(o[Ii]=et=new Kr(o)),h=et.add(c,h,f,D,S),h.proxy)return h;if(f=Ud(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)Od||(w=D),w===void 0&&(w=!1),o.addEventListener(c.toString(),f,w);else if(o.attachEvent)o.attachEvent(ba(c.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Ud(){function o(h){return c.call(o.src,o.listener,h)}const c=jd;return o}function Aa(o,c,h,f,w){if(Array.isArray(c))for(var S=0;S<c.length;S++)Aa(o,c[S],h,f,w);else f=d(f)?!!f.capture:!!f,h=Sa(h),o&&o[zr]?(o=o.i,c=String(c).toString(),c in o.g&&(S=o.g[c],h=yi(S,h,f,w),-1<h&&($r(S[h]),Array.prototype.splice.call(S,h,1),S.length==0&&(delete o.g[c],o.h--)))):o&&(o=vi(o))&&(c=o.g[c.toString()],o=-1,c&&(o=yi(c,h,f,w)),(h=-1<o?c[o]:null)&&Ti(h))}function Ti(o){if(typeof o!="number"&&o&&!o.da){var c=o.src;if(c&&c[zr])_i(c.i,o);else{var h=o.type,f=o.proxy;c.removeEventListener?c.removeEventListener(h,f,o.capture):c.detachEvent?c.detachEvent(ba(h),f):c.addListener&&c.removeListener&&c.removeListener(f),(h=vi(c))?(_i(h,o),h.h==0&&(h.src=null,c[Ii]=null)):$r(o)}}}function ba(o){return o in Ei?Ei[o]:Ei[o]="on"+o}function jd(o,c){if(o.da)o=!0;else{c=new jn(c,this);var h=o.listener,f=o.ha||o.src;o.fa&&Ti(o),o=h.call(f,c)}return o}function vi(o){return o=o[Ii],o instanceof Kr?o:null}var wi="__closure_events_fn_"+(1e9*Math.random()>>>0);function Sa(o){return typeof o=="function"?o:(o[wi]||(o[wi]=function(c){return o.handleEvent(c)}),o[wi])}function It(){re.call(this),this.i=new Kr(this),this.M=this,this.F=null}C(It,re),It.prototype[zr]=!0,It.prototype.removeEventListener=function(o,c,h,f){Aa(this,o,c,h,f)};function St(o,c){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=c.type||c,typeof c=="string")c=new yt(c,o);else if(c instanceof yt)c.target=c.target||o;else{var w=c;c=new yt(f,o),E(c,w)}if(w=!0,h)for(var S=h.length-1;0<=S;S--){var D=c.g=h[S];w=Gr(D,f,!0,c)&&w}if(D=c.g=o,w=Gr(D,f,!0,c)&&w,w=Gr(D,f,!1,c)&&w,h)for(S=0;S<h.length;S++)D=c.g=h[S],w=Gr(D,f,!1,c)&&w}It.prototype.N=function(){if(It.aa.N.call(this),this.i){var o=this.i,c;for(c in o.g){for(var h=o.g[c],f=0;f<h.length;f++)$r(h[f]);delete o.g[c],o.h--}}this.F=null},It.prototype.K=function(o,c,h,f){return this.i.add(String(o),c,!1,h,f)},It.prototype.L=function(o,c,h,f){return this.i.add(String(o),c,!0,h,f)};function Gr(o,c,h,f){if(c=o.i.g[String(c)],!c)return!0;c=c.concat();for(var w=!0,S=0;S<c.length;++S){var D=c[S];if(D&&!D.da&&D.capture==h){var et=D.listener,pt=D.ha||D.src;D.fa&&_i(o.i,D),w=et.call(pt,f)!==!1&&w}}return w&&!f.defaultPrevented}function Ra(o,c,h){if(typeof o=="function")h&&(o=A(o,h));else if(o&&typeof o.handleEvent=="function")o=A(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:u.setTimeout(o,c||0)}function Pa(o){o.g=Ra(()=>{o.g=null,o.i&&(o.i=!1,Pa(o))},o.l);const c=o.h;o.h=null,o.m.apply(null,c)}class qd extends re{constructor(c,h){super(),this.m=c,this.l=h,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Pa(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function qn(o){re.call(this),this.h=o,this.g={}}C(qn,re);var Va=[];function Ca(o){H(o.g,function(c,h){this.g.hasOwnProperty(h)&&Ti(c)},o),o.g={}}qn.prototype.N=function(){qn.aa.N.call(this),Ca(this)},qn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ai=u.JSON.stringify,zd=u.JSON.parse,$d=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function bi(){}bi.prototype.h=null;function Da(o){return o.h||(o.h=o.i())}function xa(){}var zn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Si(){yt.call(this,"d")}C(Si,yt);function Ri(){yt.call(this,"c")}C(Ri,yt);var Ae={},Na=null;function Wr(){return Na=Na||new It}Ae.La="serverreachability";function ka(o){yt.call(this,Ae.La,o)}C(ka,yt);function $n(o){const c=Wr();St(c,new ka(c))}Ae.STAT_EVENT="statevent";function Oa(o,c){yt.call(this,Ae.STAT_EVENT,o),this.stat=c}C(Oa,yt);function Rt(o){const c=Wr();St(c,new Oa(c,o))}Ae.Ma="timingevent";function Ma(o,c){yt.call(this,Ae.Ma,o),this.size=c}C(Ma,yt);function Kn(o,c){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},c)}function Gn(){this.g=!0}Gn.prototype.xa=function(){this.g=!1};function Kd(o,c,h,f,w,S){o.info(function(){if(o.g)if(S)for(var D="",et=S.split("&"),pt=0;pt<et.length;pt++){var Q=et[pt].split("=");if(1<Q.length){var Et=Q[0];Q=Q[1];var Tt=Et.split("_");D=2<=Tt.length&&Tt[1]=="type"?D+(Et+"="+Q+"&"):D+(Et+"=redacted&")}}else D=null;else D=S;return"XMLHTTP REQ ("+f+") [attempt "+w+"]: "+c+`
`+h+`
`+D})}function Gd(o,c,h,f,w,S,D){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+w+"]: "+c+`
`+h+`
`+S+" "+D})}function Ye(o,c,h,f){o.info(function(){return"XMLHTTP TEXT ("+c+"): "+Hd(o,h)+(f?" "+f:"")})}function Wd(o,c){o.info(function(){return"TIMEOUT: "+c})}Gn.prototype.info=function(){};function Hd(o,c){if(!o.g)return c;if(!c)return null;try{var h=JSON.parse(c);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var w=f[1];if(Array.isArray(w)&&!(1>w.length)){var S=w[0];if(S!="noop"&&S!="stop"&&S!="close")for(var D=1;D<w.length;D++)w[D]=""}}}}return Ai(h)}catch{return c}}var Hr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Fa={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Pi;function Qr(){}C(Qr,bi),Qr.prototype.g=function(){return new XMLHttpRequest},Qr.prototype.i=function(){return{}},Pi=new Qr;function se(o,c,h,f){this.j=o,this.i=c,this.l=h,this.R=f||1,this.U=new qn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new La}function La(){this.i=null,this.g="",this.h=!1}var Ba={},Vi={};function Ci(o,c,h){o.L=1,o.v=Zr(Qt(c)),o.m=h,o.P=!0,Ua(o,null)}function Ua(o,c){o.F=Date.now(),Xr(o),o.A=Qt(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),tu(h.i,"t",f),o.C=0,h=o.j.J,o.h=new La,o.g=yu(o.j,h?c:null,!o.m),0<o.O&&(o.M=new qd(A(o.Y,o,o.g),o.O)),c=o.U,h=o.g,f=o.ca;var w="readystatechange";Array.isArray(w)||(w&&(Va[0]=w.toString()),w=Va);for(var S=0;S<w.length;S++){var D=wa(h,w[S],f||c.handleEvent,!1,c.h||c);if(!D)break;c.g[D.key]=D}c=o.H?p(o.H):{},o.m?(o.u||(o.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,c)):(o.u="GET",o.g.ea(o.A,o.u,null,c)),$n(),Kd(o.i,o.u,o.A,o.l,o.R,o.m)}se.prototype.ca=function(o){o=o.target;const c=this.M;c&&Xt(o)==3?c.j():this.Y(o)},se.prototype.Y=function(o){try{if(o==this.g)t:{const Tt=Xt(this.g);var c=this.g.Ba();const tn=this.g.Z();if(!(3>Tt)&&(Tt!=3||this.g&&(this.h.h||this.g.oa()||au(this.g)))){this.J||Tt!=4||c==7||(c==8||0>=tn?$n(3):$n(2)),Di(this);var h=this.g.Z();this.X=h;e:if(ja(this)){var f=au(this.g);o="";var w=f.length,S=Xt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){be(this),Wn(this);var D="";break e}this.h.i=new u.TextDecoder}for(c=0;c<w;c++)this.h.h=!0,o+=this.h.i.decode(f[c],{stream:!(S&&c==w-1)});f.length=0,this.h.g+=o,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,Gd(this.i,this.u,this.A,this.l,this.R,Tt,h),this.o){if(this.T&&!this.K){e:{if(this.g){var et,pt=this.g;if((et=pt.g?pt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(et)){var Q=et;break e}}Q=null}if(h=Q)Ye(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,xi(this,h);else{this.o=!1,this.s=3,Rt(12),be(this),Wn(this);break t}}if(this.P){h=!0;let Bt;for(;!this.J&&this.C<D.length;)if(Bt=Qd(this,D),Bt==Vi){Tt==4&&(this.s=4,Rt(14),h=!1),Ye(this.i,this.l,null,"[Incomplete Response]");break}else if(Bt==Ba){this.s=4,Rt(15),Ye(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else Ye(this.i,this.l,Bt,null),xi(this,Bt);if(ja(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Tt!=4||D.length!=0||this.h.h||(this.s=1,Rt(16),h=!1),this.o=this.o&&h,!h)Ye(this.i,this.l,D,"[Invalid Chunked Response]"),be(this),Wn(this);else if(0<D.length&&!this.W){this.W=!0;var Et=this.j;Et.g==this&&Et.ba&&!Et.M&&(Et.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),Li(Et),Et.M=!0,Rt(11))}}else Ye(this.i,this.l,D,null),xi(this,D);Tt==4&&be(this),this.o&&!this.J&&(Tt==4?mu(this.j,this):(this.o=!1,Xr(this)))}else ff(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,Rt(12)):(this.s=0,Rt(13)),be(this),Wn(this)}}}catch{}finally{}};function ja(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Qd(o,c){var h=o.C,f=c.indexOf(`
`,h);return f==-1?Vi:(h=Number(c.substring(h,f)),isNaN(h)?Ba:(f+=1,f+h>c.length?Vi:(c=c.slice(f,f+h),o.C=f+h,c)))}se.prototype.cancel=function(){this.J=!0,be(this)};function Xr(o){o.S=Date.now()+o.I,qa(o,o.I)}function qa(o,c){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Kn(A(o.ba,o),c)}function Di(o){o.B&&(u.clearTimeout(o.B),o.B=null)}se.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Wd(this.i,this.A),this.L!=2&&($n(),Rt(17)),be(this),this.s=2,Wn(this)):qa(this,this.S-o)};function Wn(o){o.j.G==0||o.J||mu(o.j,o)}function be(o){Di(o);var c=o.M;c&&typeof c.ma=="function"&&c.ma(),o.M=null,Ca(o.U),o.g&&(c=o.g,o.g=null,c.abort(),c.ma())}function xi(o,c){try{var h=o.j;if(h.G!=0&&(h.g==o||Ni(h.h,o))){if(!o.K&&Ni(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var w=f;if(w[0]==0){t:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)is(h),rs(h);else break t;Fi(h),Rt(18)}}else h.za=w[1],0<h.za-h.T&&37500>w[2]&&h.F&&h.v==0&&!h.C&&(h.C=Kn(A(h.Za,h),6e3));if(1>=Ka(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Re(h,11)}else if((o.K||h.g==o)&&is(h),!q(c))for(w=h.Da.g.parse(c),c=0;c<w.length;c++){let Q=w[c];if(h.T=Q[0],Q=Q[1],h.G==2)if(Q[0]=="c"){h.K=Q[1],h.ia=Q[2];const Et=Q[3];Et!=null&&(h.la=Et,h.j.info("VER="+h.la));const Tt=Q[4];Tt!=null&&(h.Aa=Tt,h.j.info("SVER="+h.Aa));const tn=Q[5];tn!=null&&typeof tn=="number"&&0<tn&&(f=1.5*tn,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;const Bt=o.g;if(Bt){const as=Bt.g?Bt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(as){var S=f.h;S.g||as.indexOf("spdy")==-1&&as.indexOf("quic")==-1&&as.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(ki(S,S.h),S.h=null))}if(f.D){const Bi=Bt.g?Bt.g.getResponseHeader("X-HTTP-Session-Id"):null;Bi&&(f.ya=Bi,st(f.I,f.D,Bi))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var D=o;if(f.qa=_u(f,f.J?f.ia:null,f.W),D.K){Ga(f.h,D);var et=D,pt=f.L;pt&&(et.I=pt),et.B&&(Di(et),Xr(et)),f.g=D}else du(f);0<h.i.length&&ss(h)}else Q[0]!="stop"&&Q[0]!="close"||Re(h,7);else h.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Re(h,7):Mi(h):Q[0]!="noop"&&h.l&&h.l.ta(Q),h.v=0)}}$n(4)}catch{}}var Xd=class{constructor(o,c){this.g=o,this.map=c}};function za(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function $a(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ka(o){return o.h?1:o.g?o.g.size:0}function Ni(o,c){return o.h?o.h==c:o.g?o.g.has(c):!1}function ki(o,c){o.g?o.g.add(c):o.h=c}function Ga(o,c){o.h&&o.h==c?o.h=null:o.g&&o.g.has(c)&&o.g.delete(c)}za.prototype.cancel=function(){if(this.i=Wa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function Wa(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let c=o.i;for(const h of o.g.values())c=c.concat(h.D);return c}return k(o.i)}function Yd(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var c=[],h=o.length,f=0;f<h;f++)c.push(o[f]);return c}c=[],h=0;for(f in o)c[h++]=o[f];return c}function Jd(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var c=[];o=o.length;for(var h=0;h<o;h++)c.push(h);return c}c=[],h=0;for(const f in o)c[h++]=f;return c}}}function Ha(o,c){if(o.forEach&&typeof o.forEach=="function")o.forEach(c,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,c,void 0);else for(var h=Jd(o),f=Yd(o),w=f.length,S=0;S<w;S++)c.call(void 0,f[S],h&&h[S],o)}var Qa=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zd(o,c){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),w=null;if(0<=f){var S=o[h].substring(0,f);w=o[h].substring(f+1)}else S=o[h];c(S,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Se(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Se){this.h=o.h,Yr(this,o.j),this.o=o.o,this.g=o.g,Jr(this,o.s),this.l=o.l;var c=o.i,h=new Xn;h.i=c.i,c.g&&(h.g=new Map(c.g),h.h=c.h),Xa(this,h),this.m=o.m}else o&&(c=String(o).match(Qa))?(this.h=!1,Yr(this,c[1]||"",!0),this.o=Hn(c[2]||""),this.g=Hn(c[3]||"",!0),Jr(this,c[4]),this.l=Hn(c[5]||"",!0),Xa(this,c[6]||"",!0),this.m=Hn(c[7]||"")):(this.h=!1,this.i=new Xn(null,this.h))}Se.prototype.toString=function(){var o=[],c=this.j;c&&o.push(Qn(c,Ya,!0),":");var h=this.g;return(h||c=="file")&&(o.push("//"),(c=this.o)&&o.push(Qn(c,Ya,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Qn(h,h.charAt(0)=="/"?nf:ef,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Qn(h,sf)),o.join("")};function Qt(o){return new Se(o)}function Yr(o,c,h){o.j=h?Hn(c,!0):c,o.j&&(o.j=o.j.replace(/:$/,""))}function Jr(o,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);o.s=c}else o.s=null}function Xa(o,c,h){c instanceof Xn?(o.i=c,of(o.i,o.h)):(h||(c=Qn(c,rf)),o.i=new Xn(c,o.h))}function st(o,c,h){o.i.set(c,h)}function Zr(o){return st(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Hn(o,c){return o?c?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Qn(o,c,h){return typeof o=="string"?(o=encodeURI(o).replace(c,tf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function tf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Ya=/[#\/\?@]/g,ef=/[#\?:]/g,nf=/[#\?]/g,rf=/[#\?@]/g,sf=/#/g;function Xn(o,c){this.h=this.g=null,this.i=o||null,this.j=!!c}function ie(o){o.g||(o.g=new Map,o.h=0,o.i&&Zd(o.i,function(c,h){o.add(decodeURIComponent(c.replace(/\+/g," ")),h)}))}r=Xn.prototype,r.add=function(o,c){ie(this),this.i=null,o=Je(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(c),this.h+=1,this};function Ja(o,c){ie(o),c=Je(o,c),o.g.has(c)&&(o.i=null,o.h-=o.g.get(c).length,o.g.delete(c))}function Za(o,c){return ie(o),c=Je(o,c),o.g.has(c)}r.forEach=function(o,c){ie(this),this.g.forEach(function(h,f){h.forEach(function(w){o.call(c,w,f,this)},this)},this)},r.na=function(){ie(this);const o=Array.from(this.g.values()),c=Array.from(this.g.keys()),h=[];for(let f=0;f<c.length;f++){const w=o[f];for(let S=0;S<w.length;S++)h.push(c[f])}return h},r.V=function(o){ie(this);let c=[];if(typeof o=="string")Za(this,o)&&(c=c.concat(this.g.get(Je(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)c=c.concat(o[h])}return c},r.set=function(o,c){return ie(this),this.i=null,o=Je(this,o),Za(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[c]),this.h+=1,this},r.get=function(o,c){return o?(o=this.V(o),0<o.length?String(o[0]):c):c};function tu(o,c,h){Ja(o,c),0<h.length&&(o.i=null,o.g.set(Je(o,c),k(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],c=Array.from(this.g.keys());for(var h=0;h<c.length;h++){var f=c[h];const S=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var w=S;D[f]!==""&&(w+="="+encodeURIComponent(String(D[f]))),o.push(w)}}return this.i=o.join("&")};function Je(o,c){return c=String(c),o.j&&(c=c.toLowerCase()),c}function of(o,c){c&&!o.j&&(ie(o),o.i=null,o.g.forEach(function(h,f){var w=f.toLowerCase();f!=w&&(Ja(this,f),tu(this,w,h))},o)),o.j=c}function af(o,c){const h=new Gn;if(u.Image){const f=new Image;f.onload=R(oe,h,"TestLoadImage: loaded",!0,c,f),f.onerror=R(oe,h,"TestLoadImage: error",!1,c,f),f.onabort=R(oe,h,"TestLoadImage: abort",!1,c,f),f.ontimeout=R(oe,h,"TestLoadImage: timeout",!1,c,f),u.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else c(!1)}function uf(o,c){const h=new Gn,f=new AbortController,w=setTimeout(()=>{f.abort(),oe(h,"TestPingServer: timeout",!1,c)},1e4);fetch(o,{signal:f.signal}).then(S=>{clearTimeout(w),S.ok?oe(h,"TestPingServer: ok",!0,c):oe(h,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(w),oe(h,"TestPingServer: error",!1,c)})}function oe(o,c,h,f,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),f(h)}catch{}}function cf(){this.g=new $d}function lf(o,c,h){const f=h||"";try{Ha(o,function(w,S){let D=w;d(w)&&(D=Ai(w)),c.push(f+S+"="+encodeURIComponent(D))})}catch(w){throw c.push(f+"type="+encodeURIComponent("_badmap")),w}}function ts(o){this.l=o.Ub||null,this.j=o.eb||!1}C(ts,bi),ts.prototype.g=function(){return new es(this.l,this.j)},ts.prototype.i=function(o){return function(){return o}}({});function es(o,c){It.call(this),this.D=o,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(es,It),r=es.prototype,r.open=function(o,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=c,this.readyState=1,Jn(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(c.body=o),(this.D||u).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Yn(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Jn(this)),this.g&&(this.readyState=3,Jn(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;eu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function eu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var c=o.value?o.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!o.done}))&&(this.response=this.responseText+=c)}o.done?Yn(this):Jn(this),this.readyState==3&&eu(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,Yn(this))},r.Qa=function(o){this.g&&(this.response=o,Yn(this))},r.ga=function(){this.g&&Yn(this)};function Yn(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Jn(o)}r.setRequestHeader=function(o,c){this.u.append(o,c)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],c=this.h.entries();for(var h=c.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=c.next();return o.join(`\r
`)};function Jn(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(es.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function nu(o){let c="";return H(o,function(h,f){c+=f,c+=":",c+=h,c+=`\r
`}),c}function Oi(o,c,h){t:{for(f in h){var f=!1;break t}f=!0}f||(h=nu(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):st(o,c,h))}function at(o){It.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(at,It);var hf=/^https?$/i,df=["POST","PUT"];r=at.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,c,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);c=c?c.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Pi.g(),this.v=this.o?Da(this.o):Da(Pi),this.g.onreadystatechange=A(this.Ea,this);try{this.B=!0,this.g.open(c,String(o),!0),this.B=!1}catch(S){ru(this,S);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var w in f)h.set(w,f[w]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const S of f.keys())h.set(S,f.get(S));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(S=>S.toLowerCase()=="content-type"),w=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(df,c,void 0))||f||w||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,D]of h)this.g.setRequestHeader(S,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{ou(this),this.u=!0,this.g.send(o),this.u=!1}catch(S){ru(this,S)}};function ru(o,c){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=c,o.m=5,su(o),ns(o)}function su(o){o.A||(o.A=!0,St(o,"complete"),St(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,St(this,"complete"),St(this,"abort"),ns(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ns(this,!0)),at.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?iu(this):this.bb())},r.bb=function(){iu(this)};function iu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Xt(o)!=4||o.Z()!=2)){if(o.u&&Xt(o)==4)Ra(o.Ea,0,o);else if(St(o,"readystatechange"),Xt(o)==4){o.h=!1;try{const D=o.Z();t:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var h;if(!(h=c)){var f;if(f=D===0){var w=String(o.D).match(Qa)[1]||null;!w&&u.self&&u.self.location&&(w=u.self.location.protocol.slice(0,-1)),f=!hf.test(w?w.toLowerCase():"")}h=f}if(h)St(o,"complete"),St(o,"success");else{o.m=6;try{var S=2<Xt(o)?o.g.statusText:""}catch{S=""}o.l=S+" ["+o.Z()+"]",su(o)}}finally{ns(o)}}}}function ns(o,c){if(o.g){ou(o);const h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,c||St(o,"ready");try{h.onreadystatechange=f}catch{}}}function ou(o){o.I&&(u.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function Xt(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<Xt(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var c=this.g.responseText;return o&&c.indexOf(o)==0&&(c=c.substring(o.length)),zd(c)}};function au(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function ff(o){const c={};o=(o.g&&2<=Xt(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<o.length;f++){if(q(o[f]))continue;var h=T(o[f]);const w=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const S=c[w]||[];c[w]=S,S.push(h)}I(c,function(f){return f.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Zn(o,c,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||c}function uu(o){this.Aa=0,this.i=[],this.j=new Gn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Zn("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Zn("baseRetryDelayMs",5e3,o),this.cb=Zn("retryDelaySeedMs",1e4,o),this.Wa=Zn("forwardChannelMaxRetries",2,o),this.wa=Zn("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new za(o&&o.concurrentRequestLimit),this.Da=new cf,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=uu.prototype,r.la=8,r.G=1,r.connect=function(o,c,h,f){Rt(0),this.W=o,this.H=c||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=_u(this,null,this.W),ss(this)};function Mi(o){if(cu(o),o.G==3){var c=o.U++,h=Qt(o.I);if(st(h,"SID",o.K),st(h,"RID",c),st(h,"TYPE","terminate"),tr(o,h),c=new se(o,o.j,c),c.L=2,c.v=Zr(Qt(h)),h=!1,u.navigator&&u.navigator.sendBeacon)try{h=u.navigator.sendBeacon(c.v.toString(),"")}catch{}!h&&u.Image&&(new Image().src=c.v,h=!0),h||(c.g=yu(c.j,null),c.g.ea(c.v)),c.F=Date.now(),Xr(c)}pu(o)}function rs(o){o.g&&(Li(o),o.g.cancel(),o.g=null)}function cu(o){rs(o),o.u&&(u.clearTimeout(o.u),o.u=null),is(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function ss(o){if(!$a(o.h)&&!o.s){o.s=!0;var c=o.Ga;Bn||va(),Un||(Bn(),Un=!0),pi.add(c,o),o.B=0}}function mf(o,c){return Ka(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=c.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Kn(A(o.Ga,o,c),gu(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const w=new se(this,this.j,o);let S=this.o;if(this.S&&(S?(S=p(S),E(S,this.S)):S=this.S),this.m!==null||this.O||(w.H=S,S=null),this.P)t:{for(var c=0,h=0;h<this.i.length;h++){e:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break e}f=void 0}if(f===void 0)break;if(c+=f,4096<c){c=h;break t}if(c===4096||h===this.i.length-1){c=h+1;break t}}c=1e3}else c=1e3;c=hu(this,w,c),h=Qt(this.I),st(h,"RID",o),st(h,"CVER",22),this.D&&st(h,"X-HTTP-Session-Id",this.D),tr(this,h),S&&(this.O?c="headers="+encodeURIComponent(String(nu(S)))+"&"+c:this.m&&Oi(h,this.m,S)),ki(this.h,w),this.Ua&&st(h,"TYPE","init"),this.P?(st(h,"$req",c),st(h,"SID","null"),w.T=!0,Ci(w,h,null)):Ci(w,h,c),this.G=2}}else this.G==3&&(o?lu(this,o):this.i.length==0||$a(this.h)||lu(this))};function lu(o,c){var h;c?h=c.l:h=o.U++;const f=Qt(o.I);st(f,"SID",o.K),st(f,"RID",h),st(f,"AID",o.T),tr(o,f),o.m&&o.o&&Oi(f,o.m,o.o),h=new se(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),c&&(o.i=c.D.concat(o.i)),c=hu(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),ki(o.h,h),Ci(h,f,c)}function tr(o,c){o.H&&H(o.H,function(h,f){st(c,f,h)}),o.l&&Ha({},function(h,f){st(c,f,h)})}function hu(o,c,h){h=Math.min(o.i.length,h);var f=o.l?A(o.l.Na,o.l,o):null;t:{var w=o.i;let S=-1;for(;;){const D=["count="+h];S==-1?0<h?(S=w[0].g,D.push("ofs="+S)):S=0:D.push("ofs="+S);let et=!0;for(let pt=0;pt<h;pt++){let Q=w[pt].g;const Et=w[pt].map;if(Q-=S,0>Q)S=Math.max(0,w[pt].g-100),et=!1;else try{lf(Et,D,"req"+Q+"_")}catch{f&&f(Et)}}if(et){f=D.join("&");break t}}}return o=o.i.splice(0,h),c.D=o,f}function du(o){if(!o.g&&!o.u){o.Y=1;var c=o.Fa;Bn||va(),Un||(Bn(),Un=!0),pi.add(c,o),o.v=0}}function Fi(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Kn(A(o.Fa,o),gu(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,fu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Kn(A(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Rt(10),rs(this),fu(this))};function Li(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function fu(o){o.g=new se(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var c=Qt(o.qa);st(c,"RID","rpc"),st(c,"SID",o.K),st(c,"AID",o.T),st(c,"CI",o.F?"0":"1"),!o.F&&o.ja&&st(c,"TO",o.ja),st(c,"TYPE","xmlhttp"),tr(o,c),o.m&&o.o&&Oi(c,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=Zr(Qt(c)),h.m=null,h.P=!0,Ua(h,o)}r.Za=function(){this.C!=null&&(this.C=null,rs(this),Fi(this),Rt(19))};function is(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function mu(o,c){var h=null;if(o.g==c){is(o),Li(o),o.g=null;var f=2}else if(Ni(o.h,c))h=c.D,Ga(o.h,c),f=1;else return;if(o.G!=0){if(c.o)if(f==1){h=c.m?c.m.length:0,c=Date.now()-c.F;var w=o.B;f=Wr(),St(f,new Ma(f,h)),ss(o)}else du(o);else if(w=c.s,w==3||w==0&&0<c.X||!(f==1&&mf(o,c)||f==2&&Fi(o)))switch(h&&0<h.length&&(c=o.h,c.i=c.i.concat(h)),w){case 1:Re(o,5);break;case 4:Re(o,10);break;case 3:Re(o,6);break;default:Re(o,2)}}}function gu(o,c){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*c}function Re(o,c){if(o.j.info("Error code "+c),c==2){var h=A(o.fb,o),f=o.Xa;const w=!f;f=new Se(f||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||Yr(f,"https"),Zr(f),w?af(f.toString(),h):uf(f.toString(),h)}else Rt(2);o.G=0,o.l&&o.l.sa(c),pu(o),cu(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Rt(2)):(this.j.info("Failed to ping google.com"),Rt(1))};function pu(o){if(o.G=0,o.ka=[],o.l){const c=Wa(o.h);(c.length!=0||o.i.length!=0)&&(x(o.ka,c),x(o.ka,o.i),o.h.i.length=0,k(o.i),o.i.length=0),o.l.ra()}}function _u(o,c,h){var f=h instanceof Se?Qt(h):new Se(h);if(f.g!="")c&&(f.g=c+"."+f.g),Jr(f,f.s);else{var w=u.location;f=w.protocol,c=c?c+"."+w.hostname:w.hostname,w=+w.port;var S=new Se(null);f&&Yr(S,f),c&&(S.g=c),w&&Jr(S,w),h&&(S.l=h),f=S}return h=o.D,c=o.ya,h&&c&&st(f,h,c),st(f,"VER",o.la),tr(o,f),f}function yu(o,c,h){if(c&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=o.Ca&&!o.pa?new at(new ts({eb:h})):new at(o.pa),c.Ha(o.J),c}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Iu(){}r=Iu.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function os(){}os.prototype.g=function(o,c){return new Dt(o,c)};function Dt(o,c){It.call(this),this.g=new uu(c),this.l=o,this.h=c&&c.messageUrlParams||null,o=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(o?o["X-WebChannel-Content-Type"]=c.messageContentType:o={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(o?o["X-WebChannel-Client-Profile"]=c.va:o={"X-WebChannel-Client-Profile":c.va}),this.g.S=o,(o=c&&c.Sb)&&!q(o)&&(this.g.m=o),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!q(c)&&(this.g.D=c,o=this.h,o!==null&&c in o&&(o=this.h,c in o&&delete o[c])),this.j=new Ze(this)}C(Dt,It),Dt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Dt.prototype.close=function(){Mi(this.g)},Dt.prototype.o=function(o){var c=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Ai(o),o=h);c.i.push(new Xd(c.Ya++,o)),c.G==3&&ss(c)},Dt.prototype.N=function(){this.g.l=null,delete this.j,Mi(this.g),delete this.g,Dt.aa.N.call(this)};function Eu(o){Si.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var c=o.__sm__;if(c){t:{for(const h in c){o=h;break t}o=void 0}(this.i=o)&&(o=this.i,c=c!==null&&o in c?c[o]:void 0),this.data=c}else this.data=o}C(Eu,Si);function Tu(){Ri.call(this),this.status=1}C(Tu,Ri);function Ze(o){this.g=o}C(Ze,Iu),Ze.prototype.ua=function(){St(this.g,"a")},Ze.prototype.ta=function(o){St(this.g,new Eu(o))},Ze.prototype.sa=function(o){St(this.g,new Tu)},Ze.prototype.ra=function(){St(this.g,"b")},os.prototype.createWebChannel=os.prototype.g,Dt.prototype.send=Dt.prototype.o,Dt.prototype.open=Dt.prototype.m,Dt.prototype.close=Dt.prototype.close,Il=function(){return new os},yl=function(){return Wr()},_l=Ae,ro={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Hr.NO_ERROR=0,Hr.TIMEOUT=8,Hr.HTTP_ERROR=6,gs=Hr,Fa.COMPLETE="complete",pl=Fa,xa.EventType=zn,zn.OPEN="a",zn.CLOSE="b",zn.ERROR="c",zn.MESSAGE="d",It.prototype.listen=It.prototype.K,or=xa,at.prototype.listenOnce=at.prototype.L,at.prototype.getLastError=at.prototype.Ka,at.prototype.getLastErrorCode=at.prototype.Ba,at.prototype.getStatus=at.prototype.Z,at.prototype.getResponseJson=at.prototype.Oa,at.prototype.getResponseText=at.prototype.oa,at.prototype.send=at.prototype.ea,at.prototype.setWithCredentials=at.prototype.Ha,gl=at}).apply(typeof us<"u"?us:typeof self<"u"?self:typeof window<"u"?window:{});const Nu="@firebase/firestore",ku="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}wt.UNAUTHENTICATED=new wt(null),wt.GOOGLE_CREDENTIALS=new wt("google-credentials-uid"),wt.FIRST_PARTY=new wt("first-party-uid"),wt.MOCK_USER=new wt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nn="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe=new cl("@firebase/firestore");function un(){return qe.logLevel}function V(r,...t){if(qe.logLevel<=W.DEBUG){const e=t.map(Do);qe.debug(`Firestore (${Nn}): ${r}`,...e)}}function ct(r,...t){if(qe.logLevel<=W.ERROR){const e=t.map(Do);qe.error(`Firestore (${Nn}): ${r}`,...e)}}function ge(r,...t){if(qe.logLevel<=W.WARN){const e=t.map(Do);qe.warn(`Firestore (${Nn}): ${r}`,...e)}}function Do(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r,t,e){let n="Unexpected state";typeof t=="string"?n=t:e=t,El(r,n,e)}function El(r,t,e){let n=`FIRESTORE (${Nn}) INTERNAL ASSERTION FAILED: ${t} (ID: ${r.toString(16)})`;if(e!==void 0)try{n+=" CONTEXT: "+JSON.stringify(e)}catch{n+=" CONTEXT: "+e}throw ct(n),new Error(n)}function L(r,t,e,n){let s="Unexpected state";typeof e=="string"?s=e:n=e,r||El(t,s,n)}function F(r,t){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends xn{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class $m{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(wt.UNAUTHENTICATED))}shutdown(){}}class Km{constructor(t){this.t=t,this.currentUser=wt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){L(this.o===void 0,42304);let n=this.i;const s=l=>this.i!==n?(n=this.i,e(l)):Promise.resolve();let i=new Jt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Jt,t.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const l=i;t.enqueueRetryable(async()=>{await l.promise,await s(this.currentUser)})},u=l=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>u(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?u(l):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Jt)}},0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(n=>this.i!==t?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new zm(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return L(t===null||typeof t=="string",2055,{h:t}),new wt(t)}}class Gm{constructor(t,e,n){this.P=t,this.T=e,this.I=n,this.type="FirstParty",this.user=wt.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const t=this.R();return t&&this.A.set("Authorization",t),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Wm{constructor(t,e,n){this.P=t,this.T=e,this.I=n}getToken(){return Promise.resolve(new Gm(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable(()=>e(wt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ou{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Hm{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Pm(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){L(this.o===void 0,3512);const n=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const a=i.token!==this.m;return this.m=i.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>n(i))};const s=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ou(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(L(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new Ou(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qm(r){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(r);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let n=0;n<r;n++)e[n]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tl(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=Qm(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%62))}return n}}function j(r,t){return r<t?-1:r>t?1:0}function so(r,t){let e=0;for(;e<r.length&&e<t.length;){const n=r.codePointAt(e),s=t.codePointAt(e);if(n!==s){if(n<128&&s<128)return j(n,s);{const i=Tl(),a=Xm(i.encode(Mu(r,e)),i.encode(Mu(t,e)));return a!==0?a:j(n,s)}}e+=n>65535?2:1}return j(r.length,t.length)}function Mu(r,t){return r.codePointAt(t)>65535?r.substring(t,t+2):r.substring(t,t+1)}function Xm(r,t){for(let e=0;e<r.length&&e<t.length;++e)if(r[e]!==t[e])return j(r[e],t[e]);return j(r.length,t.length)}function gn(r,t,e){return r.length===t.length&&r.every((n,s)=>e(n,t[s]))}function vl(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu="__name__";class jt{constructor(t,e,n){e===void 0?e=0:e>t.length&&M(637,{offset:e,range:t.length}),n===void 0?n=t.length-e:n>t.length-e&&M(1746,{length:n,range:t.length-e}),this.segments=t,this.offset=e,this.len=n}get length(){return this.len}isEqual(t){return jt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof jt?t.forEach(n=>{e.push(n)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,n=this.limit();e<n;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const n=Math.min(t.length,e.length);for(let s=0;s<n;s++){const i=jt.compareSegments(t.get(s),e.get(s));if(i!==0)return i}return j(t.length,e.length)}static compareSegments(t,e){const n=jt.isNumericId(t),s=jt.isNumericId(e);return n&&!s?-1:!n&&s?1:n&&s?jt.extractNumericId(t).compare(jt.extractNumericId(e)):so(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return fe.fromString(t.substring(4,t.length-2))}}class Z extends jt{construct(t,e,n){return new Z(t,e,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const n of t){if(n.indexOf("//")>=0)throw new O(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);e.push(...n.split("/").filter(s=>s.length>0))}return new Z(e)}static emptyPath(){return new Z([])}}const Ym=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ot extends jt{construct(t,e,n){return new ot(t,e,n)}static isValidIdentifier(t){return Ym.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ot.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Fu}static keyField(){return new ot([Fu])}static fromServerFormat(t){const e=[];let n="",s=0;const i=()=>{if(n.length===0)throw new O(P.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(n),n=""};let a=!1;for(;s<t.length;){const u=t[s];if(u==="\\"){if(s+1===t.length)throw new O(P.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new O(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=l,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(n+=u,s++):(i(),s++)}if(i(),a)throw new O(P.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ot(e)}static emptyPath(){return new ot([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N{constructor(t){this.path=t}static fromPath(t){return new N(Z.fromString(t))}static fromName(t){return new N(Z.fromString(t).popFirst(5))}static empty(){return new N(Z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&Z.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return Z.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new N(new Z(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jm(r,t,e){if(!e)throw new O(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${t}.`)}function Zm(r,t,e,n){if(t===!0&&n===!0)throw new O(P.INVALID_ARGUMENT,`${r} and ${e} cannot be used together.`)}function Lu(r){if(!N.isDocumentKey(r))throw new O(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function wl(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function No(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(r);return t?`a custom ${t} object`:"an object"}}return typeof r=="function"?"a function":M(12329,{type:typeof r})}function Ds(r,t){if("_delegate"in r&&(r=r._delegate),!(r instanceof t)){if(t.name===r.constructor.name)throw new O(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=No(r);throw new O(P.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(r,t){const e={typeString:r};return t&&(e.value=t),e}function Mr(r,t){if(!wl(r))throw new O(P.INVALID_ARGUMENT,"JSON must be an object");let e;for(const n in t)if(t[n]){const s=t[n].typeString,i="value"in t[n]?{value:t[n].value}:void 0;if(!(n in r)){e=`JSON missing required field: '${n}'`;break}const a=r[n];if(s&&typeof a!==s){e=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&a!==i.value){e=`Expected '${n}' field to equal '${i.value}'`;break}}if(e)throw new O(P.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu=-62135596800,Uu=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(t){return Y.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),n=Math.floor((t-1e3*e)*Uu);return new Y(e,n)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<Bu)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Uu}_compareTo(t){return this.seconds===t.seconds?j(this.nanoseconds,t.nanoseconds):j(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(Mr(t,Y._jsonSchema))return new Y(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-Bu;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:dt("string",Y._jsonSchemaVersion),seconds:dt("number"),nanoseconds:dt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class B{static fromTimestamp(t){return new B(t)}static min(){return new B(new Y(0,0))}static max(){return new B(new Y(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pn=-1;class xs{constructor(t,e,n,s){this.indexId=t,this.collectionGroup=e,this.fields=n,this.indexState=s}}function io(r){return r.fields.find(t=>t.kind===2)}function Ce(r){return r.fields.filter(t=>t.kind!==2)}xs.UNKNOWN_ID=-1;class ps{constructor(t,e){this.fieldPath=t,this.kind=e}}class wr{constructor(t,e){this.sequenceNumber=t,this.offset=e}static empty(){return new wr(0,Mt.min())}}function Al(r,t){const e=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=B.fromTimestamp(n===1e9?new Y(e+1,0):new Y(e,n));return new Mt(s,N.empty(),t)}function bl(r){return new Mt(r.readTime,r.key,pn)}class Mt{constructor(t,e,n){this.readTime=t,this.documentKey=e,this.largestBatchId=n}static min(){return new Mt(B.min(),N.empty(),pn)}static max(){return new Mt(B.max(),N.empty(),pn)}}function ko(r,t){let e=r.readTime.compareTo(t.readTime);return e!==0?e:(e=N.comparator(r.documentKey,t.documentKey),e!==0?e:j(r.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Rl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ee(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Sl)throw r;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class v{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new v((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(n,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof v?e:v.resolve(e)}catch(e){return v.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):v.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):v.reject(e)}static resolve(t){return new v((e,n)=>{e(t)})}static reject(t){return new v((e,n)=>{n(t)})}static waitFor(t){return new v((e,n)=>{let s=0,i=0,a=!1;t.forEach(u=>{++s,u.next(()=>{++i,a&&i===s&&e()},l=>n(l))}),a=!0,i===s&&e()})}static or(t){let e=v.resolve(!1);for(const n of t)e=e.next(s=>s?v.resolve(s):n());return e}static forEach(t,e){const n=[];return t.forEach((s,i)=>{n.push(e.call(this,s,i))}),this.waitFor(n)}static mapArray(t,e){return new v((n,s)=>{const i=t.length,a=new Array(i);let u=0;for(let l=0;l<i;l++){const d=l;e(t[d]).next(m=>{a[d]=m,++u,u===i&&n(a)},m=>s(m))}})}static doWhile(t,e){return new v((n,s)=>{const i=()=>{t()===!0?e().next(()=>{i()},s):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt="SimpleDb";class Ys{static open(t,e,n,s){try{return new Ys(e,t.transaction(s,n))}catch(i){throw new hr(e,i)}}constructor(t,e){this.action=t,this.transaction=e,this.aborted=!1,this.S=new Jt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{e.error?this.S.reject(new hr(t,e.error)):this.S.resolve()},this.transaction.onerror=n=>{const s=Oo(n.target.error);this.S.reject(new hr(t,s))}}get D(){return this.S.promise}abort(t){t&&this.S.reject(t),this.aborted||(V(xt,"Aborting transaction:",t?t.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}v(){const t=this.transaction;this.aborted||typeof t.commit!="function"||t.commit()}store(t){const e=this.transaction.objectStore(t);return new eg(e)}}class me{static delete(t){return V(xt,"Removing database:",t),xe(el().indexedDB.deleteDatabase(t)).toPromise()}static C(){if(!al())return!1;if(me.F())return!0;const t=Rs(),e=me.M(t),n=0<e&&e<10,s=Pl(t),i=0<s&&s<4.5;return!(t.indexOf("MSIE ")>0||t.indexOf("Trident/")>0||t.indexOf("Edge/")>0||n||i)}static F(){var t;return typeof process<"u"&&((t=process.__PRIVATE_env)===null||t===void 0?void 0:t.O)==="YES"}static N(t,e){return t.store(e)}static M(t){const e=t.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=e?e[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(t,e,n){this.name=t,this.version=e,this.B=n,this.L=null,me.M(Rs())===12.2&&ct("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async k(t){return this.db||(V(xt,"Opening database:",this.name),this.db=await new Promise((e,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const a=i.target.result;e(a)},s.onblocked=()=>{n(new hr(t,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const a=i.target.error;a.name==="VersionError"?n(new O(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new O(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new hr(t,a))},s.onupgradeneeded=i=>{V(xt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const a=i.target.result;if(this.L!==null&&this.L!==i.oldVersion)throw new Error(`refusing to open IndexedDB database due to potential corruption of the IndexedDB database data; this corruption could be caused by clicking the "clear site data" button in a web browser; try reloading the web page to re-initialize the IndexedDB database: lastClosedDbVersion=${this.L}, event.oldVersion=${i.oldVersion}, event.newVersion=${i.newVersion}, db.version=${a.version}`);this.B.q(a,s.transaction,i.oldVersion,this.version).next(()=>{V(xt,"Database upgrade to version "+this.version+" complete")})}}),this.db.addEventListener("close",e=>{const n=e.target;this.L=n.version},{passive:!0})),this.db.addEventListener("versionchange",e=>{var n;e.newVersion===null&&(ge('Received "versionchange" event with newVersion===null; notifying the registered DatabaseDeletedListener, if any'),(n=this.databaseDeletedListener)===null||n===void 0||n.call(this))},{passive:!0}),this.db}setDatabaseDeletedListener(t){if(this.databaseDeletedListener)throw new Error("setDatabaseDeletedListener() may only be called once, and it has already been called");this.databaseDeletedListener=t}async runTransaction(t,e,n,s){const i=e==="readonly";let a=0;for(;;){++a;try{this.db=await this.k(t);const u=Ys.open(this.db,t,i?"readonly":"readwrite",n),l=s(u).next(d=>(u.v(),d)).catch(d=>(u.abort(d),v.reject(d))).toPromise();return l.catch(()=>{}),await u.D,l}catch(u){const l=u,d=l.name!=="FirebaseError"&&a<3;if(V(xt,"Transaction failed with error:",l.message,"Retrying:",d),this.close(),!d)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Pl(r){const t=r.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}class tg{constructor(t){this.$=t,this.U=!1,this.K=null}get isDone(){return this.U}get W(){return this.K}set cursor(t){this.$=t}done(){this.U=!0}G(t){this.K=t}delete(){return xe(this.$.delete())}}class hr extends O{constructor(t,e){super(P.UNAVAILABLE,`IndexedDB transaction '${t}' failed: ${e}`),this.name="IndexedDbTransactionError"}}function Te(r){return r.name==="IndexedDbTransactionError"}class eg{constructor(t){this.store=t}put(t,e){let n;return e!==void 0?(V(xt,"PUT",this.store.name,t,e),n=this.store.put(e,t)):(V(xt,"PUT",this.store.name,"<auto-key>",t),n=this.store.put(t)),xe(n)}add(t){return V(xt,"ADD",this.store.name,t,t),xe(this.store.add(t))}get(t){return xe(this.store.get(t)).next(e=>(e===void 0&&(e=null),V(xt,"GET",this.store.name,t,e),e))}delete(t){return V(xt,"DELETE",this.store.name,t),xe(this.store.delete(t))}count(){return V(xt,"COUNT",this.store.name),xe(this.store.count())}j(t,e){const n=this.options(t,e),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new v((a,u)=>{i.onerror=l=>{u(l.target.error)},i.onsuccess=l=>{a(l.target.result)}})}{const i=this.cursor(n),a=[];return this.J(i,(u,l)=>{a.push(l)}).next(()=>a)}}H(t,e){const n=this.store.getAll(t,e===null?void 0:e);return new v((s,i)=>{n.onerror=a=>{i(a.target.error)},n.onsuccess=a=>{s(a.target.result)}})}Y(t,e){V(xt,"DELETE ALL",this.store.name);const n=this.options(t,e);n.Z=!1;const s=this.cursor(n);return this.J(s,(i,a,u)=>u.delete())}X(t,e){let n;e?n=t:(n={},e=t);const s=this.cursor(n);return this.J(s,e)}ee(t){const e=this.cursor({});return new v((n,s)=>{e.onerror=i=>{const a=Oo(i.target.error);s(a)},e.onsuccess=i=>{const a=i.target.result;a?t(a.primaryKey,a.value).next(u=>{u?a.continue():n()}):n()}})}J(t,e){const n=[];return new v((s,i)=>{t.onerror=a=>{i(a.target.error)},t.onsuccess=a=>{const u=a.target.result;if(!u)return void s();const l=new tg(u),d=e(u.primaryKey,u.value,l);if(d instanceof v){const m=d.catch(g=>(l.done(),v.reject(g)));n.push(m)}l.isDone?s():l.W===null?u.continue():u.continue(l.W)}}).next(()=>v.waitFor(n))}options(t,e){let n;return t!==void 0&&(typeof t=="string"?n=t:e=t),{index:n,range:e}}cursor(t){let e="next";if(t.reverse&&(e="prev"),t.index){const n=this.store.index(t.index);return t.Z?n.openKeyCursor(t.range,e):n.openCursor(t.range,e)}return this.store.openCursor(t.range,e)}}function xe(r){return new v((t,e)=>{r.onsuccess=n=>{const s=n.target.result;t(s)},r.onerror=n=>{const s=Oo(n.target.error);e(s)}})}let ju=!1;function Oo(r){const t=me.M(Rs());if(t>=12.2&&t<13){const e="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(e)>=0){const n=new O("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return ju||(ju=!0,setTimeout(()=>{throw n},0)),n}}return r}const dr="IndexBackfiller";class ng{constructor(t,e){this.asyncQueue=t,this.te=e,this.task=null}start(){this.ne(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}ne(t){V(dr,`Scheduled in ${t}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",t,async()=>{this.task=null;try{const e=await this.te.re();V(dr,`Documents written: ${e}`)}catch(e){Te(e)?V(dr,"Ignoring IndexedDB error during index backfill: ",e):await Ee(e)}await this.ne(6e4)})}}class rg{constructor(t,e){this.localStore=t,this.persistence=e}async re(t=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",e=>this.ie(e,t))}ie(t,e){const n=new Set;let s=e,i=!0;return v.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(t).next(a=>{if(a!==null&&!n.has(a))return V(dr,`Processing collection: ${a}`),this.se(t,a,s).next(u=>{s-=u,n.add(a)});i=!1})).next(()=>e-s)}se(t,e,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(t,e).next(s=>this.localStore.localDocuments.getNextDocuments(t,e,s,n).next(i=>{const a=i.changes;return this.localStore.indexManager.updateIndexEntries(t,a).next(()=>this.oe(s,i)).next(u=>(V(dr,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(t,e,u))).next(()=>a.size)}))}oe(t,e){let n=t;return e.changes.forEach((s,i)=>{const a=bl(i);ko(a,n)>0&&(n=a)}),new Mt(n.readTime,n.documentKey,Math.max(e.batchId,t.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=n=>this._e(n),this.ae=n=>e.writeSequenceNumber(n))}_e(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ae&&this.ae(t),t}}Ct.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le=-1;function Js(r){return r==null}function Ar(r){return r===0&&1/r==-1/0}function Vl(r){return typeof r=="number"&&Number.isInteger(r)&&!Ar(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns="";function bt(r){let t="";for(let e=0;e<r.length;e++)t.length>0&&(t=qu(t)),t=sg(r.get(e),t);return qu(t)}function sg(r,t){let e=t;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":e+="";break;case Ns:e+="";break;default:e+=i}}return e}function qu(r){return r+Ns+""}function zt(r){const t=r.length;if(L(t>=2,64408,{path:r}),t===2)return L(r.charAt(0)===Ns&&r.charAt(1)==="",56145,{path:r}),Z.emptyPath();const e=t-2,n=[];let s="";for(let i=0;i<t;){const a=r.indexOf(Ns,i);switch((a<0||a>e)&&M(50515,{path:r}),r.charAt(a+1)){case"":const u=r.substring(i,a);let l;s.length===0?l=u:(s+=u,l=s,s=""),n.push(l);break;case"":s+=r.substring(i,a),s+="\0";break;case"":s+=r.substring(i,a+1);break;default:M(61167,{path:r})}i=a+2}return new Z(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const De="remoteDocuments",Fr="owner",en="owner",br="mutationQueues",ig="userId",Ut="mutations",zu="batchId",Me="userMutationsIndex",$u=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _s(r,t){return[r,bt(t)]}function Cl(r,t,e){return[r,bt(t),e]}const og={},_n="documentMutations",ks="remoteDocumentsV14",ag=["prefixPath","collectionGroup","readTime","documentId"],ys="documentKeyIndex",ug=["prefixPath","collectionGroup","documentId"],Dl="collectionGroupIndex",cg=["collectionGroup","readTime","prefixPath","documentId"],Sr="remoteDocumentGlobal",oo="remoteDocumentGlobalKey",yn="targets",xl="queryTargetsIndex",lg=["canonicalId","targetId"],In="targetDocuments",hg=["targetId","path"],Mo="documentTargetsIndex",dg=["path","targetId"],Os="targetGlobalKey",Be="targetGlobal",Rr="collectionParents",fg=["collectionId","parent"],En="clientMetadata",mg="clientId",Zs="bundles",gg="bundleId",ti="namedQueries",pg="name",Fo="indexConfiguration",_g="indexId",ao="collectionGroupIndex",yg="collectionGroup",fr="indexState",Ig=["indexId","uid"],Nl="sequenceNumberIndex",Eg=["uid","sequenceNumber"],mr="indexEntries",Tg=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],kl="documentKeyIndex",vg=["indexId","uid","orderedDocumentKey"],ei="documentOverlays",wg=["userId","collectionPath","documentId"],uo="collectionPathOverlayIndex",Ag=["userId","collectionPath","largestBatchId"],Ol="collectionGroupOverlayIndex",bg=["userId","collectionGroup","largestBatchId"],Lo="globals",Sg="name",Ml=[br,Ut,_n,De,yn,Fr,Be,In,En,Sr,Rr,Zs,ti],Rg=[...Ml,ei],Fl=[br,Ut,_n,ks,yn,Fr,Be,In,En,Sr,Rr,Zs,ti,ei],Ll=Fl,Bo=[...Ll,Fo,fr,mr],Pg=Bo,Bl=[...Bo,Lo],Vg=Bl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class co extends Rl{constructor(t,e){super(),this.ce=t,this.currentSequenceNumber=e}}function ft(r,t){const e=F(r);return me.N(e.ce,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ku(r){let t=0;for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t++;return t}function Qe(r,t){for(const e in r)Object.prototype.hasOwnProperty.call(r,e)&&t(e,r[e])}function Ul(r){for(const t in r)if(Object.prototype.hasOwnProperty.call(r,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(t,e){this.comparator=t,this.root=e||_t.EMPTY}insert(t,e){return new rt(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,_t.BLACK,null,null))}remove(t){return new rt(this.comparator,this.root.remove(t,this.comparator).copy(null,null,_t.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const n=this.comparator(t,e.key);if(n===0)return e.value;n<0?e=e.left:n>0&&(e=e.right)}return null}indexOf(t){let e=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(t,n.key);if(s===0)return e+n.left.size;s<0?n=n.left:(e+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,n)=>(t(e,n),!1))}toString(){const t=[];return this.inorderTraversal((e,n)=>(t.push(`${e}:${n}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new cs(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new cs(this.root,t,this.comparator,!1)}getReverseIterator(){return new cs(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new cs(this.root,t,this.comparator,!0)}}class cs{constructor(t,e,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?n(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class _t{constructor(t,e,n,s,i){this.key=t,this.value=e,this.color=n??_t.RED,this.left=s??_t.EMPTY,this.right=i??_t.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,n,s,i){return new _t(t??this.key,e??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,n){let s=this;const i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return _t.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return _t.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,_t.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,_t.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw M(43730,{key:this.key,value:this.value});if(this.right.isRed())throw M(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw M(27949);return t+(this.isRed()?0:1)}}_t.EMPTY=null,_t.RED=!0,_t.BLACK=!1;_t.EMPTY=new class{constructor(){this.size=0}get key(){throw M(57766)}get value(){throw M(16141)}get color(){throw M(16727)}get left(){throw M(29726)}get right(){throw M(36894)}copy(t,e,n,s,i){return this}insert(t,e,n){return new _t(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(t){this.comparator=t,this.data=new rt(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,n)=>(t(e),!1))}forEachInRange(t,e){const n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let n;for(n=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();)if(!t(n.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Gu(this.data.getIterator())}getIteratorFrom(t){return new Gu(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(n=>{e=e.add(n)}),e}isEqual(t){if(!(t instanceof J)||this.size!==t.size)return!1;const e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new J(this.comparator);return e.data=t,e}}class Gu{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function nn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t){this.fields=t,t.sort(ot.comparator)}static empty(){return new Lt([])}unionWith(t){let e=new J(ot.comparator);for(const n of this.fields)e=e.add(n);for(const n of t)e=e.add(n);return new Lt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return gn(this.fields,t.fields,(e,n)=>e.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new jl("Invalid base64 string: "+i):i}}(t);return new lt(e)}static fromUint8Array(t){const e=function(s){let i="";for(let a=0;a<s.length;++a)i+=String.fromCharCode(s[a]);return i}(t);return new lt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return j(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}lt.EMPTY_BYTE_STRING=new lt("");const Cg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function te(r){if(L(!!r,39018),typeof r=="string"){let t=0;const e=Cg.exec(r);if(L(!!e,46558,{timestamp:r}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:t}}return{seconds:it(r.seconds),nanos:it(r.nanos)}}function it(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function ee(r){return typeof r=="string"?lt.fromBase64String(r):lt.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ql="server_timestamp",zl="__type__",$l="__previous_value__",Kl="__local_write_time__";function Uo(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{})[zl])===null||e===void 0?void 0:e.stringValue)===ql}function ni(r){const t=r.mapValue.fields[$l];return Uo(t)?ni(t):t}function Pr(r){const t=te(r.mapValue.fields[Kl].timestampValue);return new Y(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(t,e,n,s,i,a,u,l,d,m){this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=m}}const Ms="(default)";class ze{constructor(t,e){this.projectId=t,this.database=e||Ms}static empty(){return new ze("","")}get isDefaultDatabase(){return this.database===Ms}isEqual(t){return t instanceof ze&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo="__type__",Gl="__max__",he={mapValue:{fields:{__type__:{stringValue:Gl}}}},qo="__vector__",Tn="value",Is={nullValue:"NULL_VALUE"};function pe(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Uo(r)?4:Wl(r)?9007199254740991:ri(r)?10:11:M(28295,{value:r})}function Wt(r,t){if(r===t)return!0;const e=pe(r);if(e!==pe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===t.booleanValue;case 4:return Pr(r).isEqual(Pr(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=te(s.timestampValue),u=te(i.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(r,t);case 5:return r.stringValue===t.stringValue;case 6:return function(s,i){return ee(s.bytesValue).isEqual(ee(i.bytesValue))}(r,t);case 7:return r.referenceValue===t.referenceValue;case 8:return function(s,i){return it(s.geoPointValue.latitude)===it(i.geoPointValue.latitude)&&it(s.geoPointValue.longitude)===it(i.geoPointValue.longitude)}(r,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return it(s.integerValue)===it(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const a=it(s.doubleValue),u=it(i.doubleValue);return a===u?Ar(a)===Ar(u):isNaN(a)&&isNaN(u)}return!1}(r,t);case 9:return gn(r.arrayValue.values||[],t.arrayValue.values||[],Wt);case 10:case 11:return function(s,i){const a=s.mapValue.fields||{},u=i.mapValue.fields||{};if(Ku(a)!==Ku(u))return!1;for(const l in a)if(a.hasOwnProperty(l)&&(u[l]===void 0||!Wt(a[l],u[l])))return!1;return!0}(r,t);default:return M(52216,{left:r})}}function Vr(r,t){return(r.values||[]).find(e=>Wt(e,t))!==void 0}function _e(r,t){if(r===t)return 0;const e=pe(r),n=pe(t);if(e!==n)return j(e,n);switch(e){case 0:case 9007199254740991:return 0;case 1:return j(r.booleanValue,t.booleanValue);case 2:return function(i,a){const u=it(i.integerValue||i.doubleValue),l=it(a.integerValue||a.doubleValue);return u<l?-1:u>l?1:u===l?0:isNaN(u)?isNaN(l)?0:-1:1}(r,t);case 3:return Wu(r.timestampValue,t.timestampValue);case 4:return Wu(Pr(r),Pr(t));case 5:return so(r.stringValue,t.stringValue);case 6:return function(i,a){const u=ee(i),l=ee(a);return u.compareTo(l)}(r.bytesValue,t.bytesValue);case 7:return function(i,a){const u=i.split("/"),l=a.split("/");for(let d=0;d<u.length&&d<l.length;d++){const m=j(u[d],l[d]);if(m!==0)return m}return j(u.length,l.length)}(r.referenceValue,t.referenceValue);case 8:return function(i,a){const u=j(it(i.latitude),it(a.latitude));return u!==0?u:j(it(i.longitude),it(a.longitude))}(r.geoPointValue,t.geoPointValue);case 9:return Hu(r.arrayValue,t.arrayValue);case 10:return function(i,a){var u,l,d,m;const g=i.fields||{},A=a.fields||{},R=(u=g[Tn])===null||u===void 0?void 0:u.arrayValue,C=(l=A[Tn])===null||l===void 0?void 0:l.arrayValue,k=j(((d=R==null?void 0:R.values)===null||d===void 0?void 0:d.length)||0,((m=C==null?void 0:C.values)===null||m===void 0?void 0:m.length)||0);return k!==0?k:Hu(R,C)}(r.mapValue,t.mapValue);case 11:return function(i,a){if(i===he.mapValue&&a===he.mapValue)return 0;if(i===he.mapValue)return 1;if(a===he.mapValue)return-1;const u=i.fields||{},l=Object.keys(u),d=a.fields||{},m=Object.keys(d);l.sort(),m.sort();for(let g=0;g<l.length&&g<m.length;++g){const A=so(l[g],m[g]);if(A!==0)return A;const R=_e(u[l[g]],d[m[g]]);if(R!==0)return R}return j(l.length,m.length)}(r.mapValue,t.mapValue);default:throw M(23264,{le:e})}}function Wu(r,t){if(typeof r=="string"&&typeof t=="string"&&r.length===t.length)return j(r,t);const e=te(r),n=te(t),s=j(e.seconds,n.seconds);return s!==0?s:j(e.nanos,n.nanos)}function Hu(r,t){const e=r.values||[],n=t.values||[];for(let s=0;s<e.length&&s<n.length;++s){const i=_e(e[s],n[s]);if(i)return i}return j(e.length,n.length)}function vn(r){return lo(r)}function lo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(e){const n=te(e);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(e){return ee(e).toBase64()}(r.bytesValue):"referenceValue"in r?function(e){return N.fromName(e).toString()}(r.referenceValue):"geoPointValue"in r?function(e){return`geo(${e.latitude},${e.longitude})`}(r.geoPointValue):"arrayValue"in r?function(e){let n="[",s=!0;for(const i of e.values||[])s?s=!1:n+=",",n+=lo(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(e){const n=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const a of n)i?i=!1:s+=",",s+=`${a}:${lo(e.fields[a])}`;return s+"}"}(r.mapValue):M(61005,{value:r})}function Es(r){switch(pe(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=ni(r);return t?16+Es(t):16;case 5:return 2*r.stringValue.length;case 6:return ee(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+Es(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Qe(n.fields,(i,a)=>{s+=i.length+Es(a)}),s}(r.mapValue);default:throw M(13486,{value:r})}}function zo(r,t){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${t.path.canonicalString()}`}}function ho(r){return!!r&&"integerValue"in r}function Cr(r){return!!r&&"arrayValue"in r}function Qu(r){return!!r&&"nullValue"in r}function Xu(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ts(r){return!!r&&"mapValue"in r}function ri(r){var t,e;return((e=(((t=r==null?void 0:r.mapValue)===null||t===void 0?void 0:t.fields)||{})[jo])===null||e===void 0?void 0:e.stringValue)===qo}function gr(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const t={mapValue:{fields:{}}};return Qe(r.mapValue.fields,(e,n)=>t.mapValue.fields[e]=gr(n)),t}if(r.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(r.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=gr(r.arrayValue.values[e]);return t}return Object.assign({},r)}function Wl(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===Gl}const Hl={mapValue:{fields:{[jo]:{stringValue:qo},[Tn]:{arrayValue:{}}}}};function xg(r){return"nullValue"in r?Is:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?zo(ze.empty(),N.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?ri(r)?Hl:{mapValue:{}}:M(35942,{value:r})}function Ng(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?zo(ze.empty(),N.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Hl:"mapValue"in r?ri(r)?{mapValue:{}}:he:M(61959,{value:r})}function Yu(r,t){const e=_e(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?-1:!r.inclusive&&t.inclusive?1:0}function Ju(r,t){const e=_e(r.value,t.value);return e!==0?e:r.inclusive&&!t.inclusive?1:!r.inclusive&&t.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t){this.value=t}static empty(){return new Vt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let n=0;n<t.length-1;++n)if(e=(e.mapValue.fields||{})[t.get(n)],!Ts(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=gr(e)}setAll(t){let e=ot.emptyPath(),n={},s=[];t.forEach((a,u)=>{if(!e.isImmediateParentOf(u)){const l=this.getFieldsMap(e);this.applyChanges(l,n,s),n={},s=[],e=u.popLast()}a?n[u.lastSegment()]=gr(a):s.push(u.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,n,s)}delete(t){const e=this.field(t.popLast());Ts(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Wt(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let n=0;n<t.length;++n){let s=e.mapValue.fields[t.get(n)];Ts(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,n){Qe(e,(s,i)=>t[s]=i);for(const s of n)delete t[s]}clone(){return new Vt(gr(this.value))}}function Ql(r){const t=[];return Qe(r.fields,(e,n)=>{const s=new ot([e]);if(Ts(n)){const i=Ql(n.mapValue).fields;if(i.length===0)t.push(s);else for(const a of i)t.push(s.child(a))}else t.push(s)}),new Lt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(t,e,n,s,i,a,u){this.key=t,this.documentType=e,this.version=n,this.readTime=s,this.createTime=i,this.data=a,this.documentState=u}static newInvalidDocument(t){return new ut(t,0,B.min(),B.min(),B.min(),Vt.empty(),0)}static newFoundDocument(t,e,n,s){return new ut(t,1,e,B.min(),n,s,0)}static newNoDocument(t,e){return new ut(t,2,e,B.min(),B.min(),Vt.empty(),0)}static newUnknownDocument(t,e){return new ut(t,3,e,B.min(),B.min(),Vt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(B.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Vt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Vt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=B.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof ut&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new ut(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(t,e){this.position=t,this.inclusive=e}}function Zu(r,t,e){let n=0;for(let s=0;s<r.position.length;s++){const i=t[s],a=r.position[s];if(i.field.isKeyField()?n=N.comparator(N.fromName(a.referenceValue),e.key):n=_e(a,e.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function tc(r,t){if(r===null)return t===null;if(t===null||r.inclusive!==t.inclusive||r.position.length!==t.position.length)return!1;for(let e=0;e<r.position.length;e++)if(!Wt(r.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fs{constructor(t,e="asc"){this.field=t,this.dir=e}}function kg(r,t){return r.dir===t.dir&&r.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{}class K extends Xl{constructor(t,e,n){super(),this.field=t,this.op=e,this.value=n}static create(t,e,n){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,n):new Og(t,e,n):e==="array-contains"?new Lg(t,n):e==="in"?new nh(t,n):e==="not-in"?new Bg(t,n):e==="array-contains-any"?new Ug(t,n):new K(t,e,n)}static createKeyFieldInFilter(t,e,n){return e==="in"?new Mg(t,n):new Fg(t,n)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison(_e(e,this.value)):e!==null&&pe(this.value)===pe(e)&&this.matchesComparison(_e(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class tt extends Xl{constructor(t,e){super(),this.filters=t,this.op=e,this.he=null}static create(t,e){return new tt(t,e)}matches(t){return An(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function An(r){return r.op==="and"}function fo(r){return r.op==="or"}function $o(r){return Yl(r)&&An(r)}function Yl(r){for(const t of r.filters)if(t instanceof tt)return!1;return!0}function mo(r){if(r instanceof K)return r.field.canonicalString()+r.op.toString()+vn(r.value);if($o(r))return r.filters.map(t=>mo(t)).join(",");{const t=r.filters.map(e=>mo(e)).join(",");return`${r.op}(${t})`}}function Jl(r,t){return r instanceof K?function(n,s){return s instanceof K&&n.op===s.op&&n.field.isEqual(s.field)&&Wt(n.value,s.value)}(r,t):r instanceof tt?function(n,s){return s instanceof tt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,a,u)=>i&&Jl(a,s.filters[u]),!0):!1}(r,t):void M(19439)}function Zl(r,t){const e=r.filters.concat(t);return tt.create(e,r.op)}function th(r){return r instanceof K?function(e){return`${e.field.canonicalString()} ${e.op} ${vn(e.value)}`}(r):r instanceof tt?function(e){return e.op.toString()+" {"+e.getFilters().map(th).join(" ,")+"}"}(r):"Filter"}class Og extends K{constructor(t,e,n){super(t,e,n),this.key=N.fromName(n.referenceValue)}matches(t){const e=N.comparator(t.key,this.key);return this.matchesComparison(e)}}class Mg extends K{constructor(t,e){super(t,"in",e),this.keys=eh("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Fg extends K{constructor(t,e){super(t,"not-in",e),this.keys=eh("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function eh(r,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(n=>N.fromName(n.referenceValue))}class Lg extends K{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Cr(e)&&Vr(e.arrayValue,this.value)}}class nh extends K{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Vr(this.value.arrayValue,e)}}class Bg extends K{constructor(t,e){super(t,"not-in",e)}matches(t){if(Vr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Vr(this.value.arrayValue,e)}}class Ug extends K{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Cr(e)||!e.arrayValue.values)&&e.arrayValue.values.some(n=>Vr(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(t,e=null,n=[],s=[],i=null,a=null,u=null){this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=a,this.endAt=u,this.Pe=null}}function go(r,t=null,e=[],n=[],s=null,i=null,a=null){return new jg(r,t,e,n,s,i,a)}function $e(r){const t=F(r);if(t.Pe===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(n=>mo(n)).join(","),e+="|ob:",e+=t.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),Js(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(n=>vn(n)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(n=>vn(n)).join(",")),t.Pe=e}return t.Pe}function Lr(r,t){if(r.limit!==t.limit||r.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<r.orderBy.length;e++)if(!kg(r.orderBy[e],t.orderBy[e]))return!1;if(r.filters.length!==t.filters.length)return!1;for(let e=0;e<r.filters.length;e++)if(!Jl(r.filters[e],t.filters[e]))return!1;return r.collectionGroup===t.collectionGroup&&!!r.path.isEqual(t.path)&&!!tc(r.startAt,t.startAt)&&tc(r.endAt,t.endAt)}function Ls(r){return N.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Bs(r,t){return r.filters.filter(e=>e instanceof K&&e.field.isEqual(t))}function ec(r,t,e){let n=Is,s=!0;for(const i of Bs(r,t)){let a=Is,u=!0;switch(i.op){case"<":case"<=":a=xg(i.value);break;case"==":case"in":case">=":a=i.value;break;case">":a=i.value,u=!1;break;case"!=":case"not-in":a=Is}Yu({value:n,inclusive:s},{value:a,inclusive:u})<0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Yu({value:n,inclusive:s},{value:a,inclusive:e.inclusive})<0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}function nc(r,t,e){let n=he,s=!0;for(const i of Bs(r,t)){let a=he,u=!0;switch(i.op){case">=":case">":a=Ng(i.value),u=!1;break;case"==":case"in":case"<=":a=i.value;break;case"<":a=i.value,u=!1;break;case"!=":case"not-in":a=he}Ju({value:n,inclusive:s},{value:a,inclusive:u})>0&&(n=a,s=u)}if(e!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(t)){const a=e.position[i];Ju({value:n,inclusive:s},{value:a,inclusive:e.inclusive})>0&&(n=a,s=e.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(t,e=null,n=[],s=[],i=null,a="F",u=null,l=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=a,this.startAt=u,this.endAt=l,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function rh(r,t,e,n,s,i,a,u){return new si(r,t,e,n,s,i,a,u)}function ii(r){return new si(r)}function rc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function qg(r){return r.collectionGroup!==null}function pr(r){const t=F(r);if(t.Te===null){t.Te=[];const e=new Set;for(const i of t.explicitOrderBy)t.Te.push(i),e.add(i.field.canonicalString());const n=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new J(ot.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.Te.push(new Fs(i,n))}),e.has(ot.keyField().canonicalString())||t.Te.push(new Fs(ot.keyField(),n))}return t.Te}function Ot(r){const t=F(r);return t.Ie||(t.Ie=zg(t,pr(r))),t.Ie}function zg(r,t){if(r.limitType==="F")return go(r.path,r.collectionGroup,t,r.filters,r.limit,r.startAt,r.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Fs(s.field,i)});const e=r.endAt?new wn(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new wn(r.startAt.position,r.startAt.inclusive):null;return go(r.path,r.collectionGroup,t,r.filters,r.limit,e,n)}}function po(r,t,e){return new si(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),t,e,r.startAt,r.endAt)}function oi(r,t){return Lr(Ot(r),Ot(t))&&r.limitType===t.limitType}function sh(r){return`${$e(Ot(r))}|lt:${r.limitType}`}function cn(r){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>th(s)).join(", ")}]`),Js(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>vn(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>vn(s)).join(",")),`Target(${n})`}(Ot(r))}; limitType=${r.limitType})`}function Br(r,t){return t.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):N.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,t)&&function(n,s){for(const i of pr(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,t)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,t)&&function(n,s){return!(n.startAt&&!function(a,u,l){const d=Zu(a,u,l);return a.inclusive?d<=0:d<0}(n.startAt,pr(n),s)||n.endAt&&!function(a,u,l){const d=Zu(a,u,l);return a.inclusive?d>=0:d>0}(n.endAt,pr(n),s))}(r,t)}function ih(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function oh(r){return(t,e)=>{let n=!1;for(const s of pr(r)){const i=$g(s,t,e);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function $g(r,t,e){const n=r.field.isKeyField()?N.comparator(t.key,e.key):function(i,a,u){const l=a.data.field(i),d=u.data.field(i);return l!==null&&d!==null?_e(l,d):M(42886)}(r.field,t,e);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const n=this.mapKeyFn(t),s=this.inner[n];if(s===void 0)return this.inner[n]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),n=this.inner[e];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],t))return n.length===1?delete this.inner[e]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(t){Qe(this.inner,(e,n)=>{for(const[s,i]of n)t(s,i)})}isEmpty(){return Ul(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=new rt(N.comparator);function Nt(){return Kg}const ah=new rt(N.comparator);function ar(...r){let t=ah;for(const e of r)t=t.insert(e.key,e);return t}function uh(r){let t=ah;return r.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function $t(){return _r()}function ch(){return _r()}function _r(){return new ne(r=>r.toString(),(r,t)=>r.isEqual(t))}const Gg=new rt(N.comparator),Wg=new J(N.comparator);function z(...r){let t=Wg;for(const e of r)t=t.add(e);return t}const Hg=new J(j);function Ko(){return Hg}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(r,t){if(r.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ar(t)?"-0":t}}function lh(r){return{integerValue:""+r}}function Qg(r,t){return Vl(t)?lh(t):Go(r,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(){this._=void 0}}function Xg(r,t,e){return r instanceof Dr?function(s,i){const a={fields:{[zl]:{stringValue:ql},[Kl]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Uo(i)&&(i=ni(i)),i&&(a.fields[$l]=i),{mapValue:a}}(e,t):r instanceof bn?dh(r,t):r instanceof Sn?fh(r,t):function(s,i){const a=hh(s,i),u=sc(a)+sc(s.Ee);return ho(a)&&ho(s.Ee)?lh(u):Go(s.serializer,u)}(r,t)}function Yg(r,t,e){return r instanceof bn?dh(r,t):r instanceof Sn?fh(r,t):e}function hh(r,t){return r instanceof xr?function(n){return ho(n)||function(i){return!!i&&"doubleValue"in i}(n)}(t)?t:{integerValue:0}:null}class Dr extends ai{}class bn extends ai{constructor(t){super(),this.elements=t}}function dh(r,t){const e=mh(t);for(const n of r.elements)e.some(s=>Wt(s,n))||e.push(n);return{arrayValue:{values:e}}}class Sn extends ai{constructor(t){super(),this.elements=t}}function fh(r,t){let e=mh(t);for(const n of r.elements)e=e.filter(s=>!Wt(s,n));return{arrayValue:{values:e}}}class xr extends ai{constructor(t,e){super(),this.serializer=t,this.Ee=e}}function sc(r){return it(r.integerValue||r.doubleValue)}function mh(r){return Cr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(t,e){this.field=t,this.transform=e}}function Zg(r,t){return r.field.isEqual(t.field)&&function(n,s){return n instanceof bn&&s instanceof bn||n instanceof Sn&&s instanceof Sn?gn(n.elements,s.elements,Wt):n instanceof xr&&s instanceof xr?Wt(n.Ee,s.Ee):n instanceof Dr&&s instanceof Dr}(r.transform,t.transform)}class tp{constructor(t,e){this.version=t,this.transformResults=e}}class kt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new kt}static exists(t){return new kt(void 0,t)}static updateTime(t){return new kt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function vs(r,t){return r.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(r.updateTime):r.exists===void 0||r.exists===t.isFoundDocument()}class ui{}function gh(r,t){if(!r.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return r.isNoDocument()?new Wo(r.key,kt.none()):new kn(r.key,r.data,kt.none());{const e=r.data,n=Vt.empty();let s=new J(ot.comparator);for(let i of t.fields)if(!s.has(i)){let a=e.field(i);a===null&&i.length>1&&(i=i.popLast(),a=e.field(i)),a===null?n.delete(i):n.set(i,a),s=s.add(i)}return new ve(r.key,n,new Lt(s.toArray()),kt.none())}}function ep(r,t,e){r instanceof kn?function(s,i,a){const u=s.value.clone(),l=oc(s.fieldTransforms,i,a.transformResults);u.setAll(l),i.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(r,t,e):r instanceof ve?function(s,i,a){if(!vs(s.precondition,i))return void i.convertToUnknownDocument(a.version);const u=oc(s.fieldTransforms,i,a.transformResults),l=i.data;l.setAll(ph(s)),l.setAll(u),i.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(r,t,e):function(s,i,a){i.convertToNoDocument(a.version).setHasCommittedMutations()}(0,t,e)}function yr(r,t,e,n){return r instanceof kn?function(i,a,u,l){if(!vs(i.precondition,a))return u;const d=i.value.clone(),m=ac(i.fieldTransforms,l,a);return d.setAll(m),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(r,t,e,n):r instanceof ve?function(i,a,u,l){if(!vs(i.precondition,a))return u;const d=ac(i.fieldTransforms,l,a),m=a.data;return m.setAll(ph(i)),m.setAll(d),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(g=>g.field))}(r,t,e,n):function(i,a,u){return vs(i.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(r,t,e)}function np(r,t){let e=null;for(const n of r.fieldTransforms){const s=t.data.field(n.field),i=hh(n.transform,s||null);i!=null&&(e===null&&(e=Vt.empty()),e.set(n.field,i))}return e||null}function ic(r,t){return r.type===t.type&&!!r.key.isEqual(t.key)&&!!r.precondition.isEqual(t.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&gn(n,s,(i,a)=>Zg(i,a))}(r.fieldTransforms,t.fieldTransforms)&&(r.type===0?r.value.isEqual(t.value):r.type!==1||r.data.isEqual(t.data)&&r.fieldMask.isEqual(t.fieldMask))}class kn extends ui{constructor(t,e,n,s=[]){super(),this.key=t,this.value=e,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class ve extends ui{constructor(t,e,n,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function ph(r){const t=new Map;return r.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const n=r.data.field(e);t.set(e,n)}}),t}function oc(r,t,e){const n=new Map;L(r.length===e.length,32656,{Ae:e.length,Re:r.length});for(let s=0;s<e.length;s++){const i=r[s],a=i.transform,u=t.data.field(i.field);n.set(i.field,Yg(a,u,e[s]))}return n}function ac(r,t,e){const n=new Map;for(const s of r){const i=s.transform,a=e.data.field(s.field);n.set(s.field,Xg(i,a,t))}return n}class Wo extends ui{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class _h extends ui{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(t,e,n,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(t,e){const n=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&ep(i,t,n[s])}}applyToLocalView(t,e){for(const n of this.baseMutations)n.key.isEqual(t.key)&&(e=yr(n,t,e,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(t.key)&&(e=yr(n,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const n=ch();return this.mutations.forEach(s=>{const i=t.get(s.key),a=i.overlayedDocument;let u=this.applyToLocalView(a,i.mutatedFields);u=e.has(s.key)?null:u;const l=gh(a,u);l!==null&&n.set(s.key,l),a.isValidDocument()||a.convertToNoDocument(B.min())}),n}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),z())}isEqual(t){return this.batchId===t.batchId&&gn(this.mutations,t.mutations,(e,n)=>ic(e,n))&&gn(this.baseMutations,t.baseMutations,(e,n)=>ic(e,n))}}class Qo{constructor(t,e,n,s){this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s}static from(t,e,n){L(t.mutations.length===n.length,58842,{Ve:t.mutations.length,me:n.length});let s=function(){return Gg}();const i=t.mutations;for(let a=0;a<i.length;a++)s=s.insert(i[a].key,n[a].version);return new Qo(t,e,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xo{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ht,G;function sp(r){switch(r){case P.OK:return M(64938);case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0;default:return M(15467,{code:r})}}function yh(r){if(r===void 0)return ct("GRPC error has no .code"),P.UNKNOWN;switch(r){case ht.OK:return P.OK;case ht.CANCELLED:return P.CANCELLED;case ht.UNKNOWN:return P.UNKNOWN;case ht.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case ht.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case ht.INTERNAL:return P.INTERNAL;case ht.UNAVAILABLE:return P.UNAVAILABLE;case ht.UNAUTHENTICATED:return P.UNAUTHENTICATED;case ht.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case ht.NOT_FOUND:return P.NOT_FOUND;case ht.ALREADY_EXISTS:return P.ALREADY_EXISTS;case ht.PERMISSION_DENIED:return P.PERMISSION_DENIED;case ht.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case ht.ABORTED:return P.ABORTED;case ht.OUT_OF_RANGE:return P.OUT_OF_RANGE;case ht.UNIMPLEMENTED:return P.UNIMPLEMENTED;case ht.DATA_LOSS:return P.DATA_LOSS;default:return M(39323,{code:r})}}(G=ht||(ht={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip=new fe([4294967295,4294967295],0);function uc(r){const t=Tl().encode(r),e=new ml;return e.update(t),new Uint8Array(e.digest())}function cc(r){const t=new DataView(r.buffer),e=t.getUint32(0,!0),n=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new fe([e,n],0),new fe([s,i],0)]}class Yo{constructor(t,e,n){if(this.bitmap=t,this.padding=e,this.hashCount=n,e<0||e>=8)throw new ur(`Invalid padding: ${e}`);if(n<0)throw new ur(`Invalid hash count: ${n}`);if(t.length>0&&this.hashCount===0)throw new ur(`Invalid hash count: ${n}`);if(t.length===0&&e!==0)throw new ur(`Invalid padding when bitmap length is 0: ${e}`);this.fe=8*t.length-e,this.ge=fe.fromNumber(this.fe)}pe(t,e,n){let s=t.add(e.multiply(fe.fromNumber(n)));return s.compare(ip)===1&&(s=new fe([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ge).toNumber()}ye(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.fe===0)return!1;const e=uc(t),[n,s]=cc(e);for(let i=0;i<this.hashCount;i++){const a=this.pe(n,s,i);if(!this.ye(a))return!1}return!0}static create(t,e,n){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),a=new Yo(i,s,e);return n.forEach(u=>a.insert(u)),a}insert(t){if(this.fe===0)return;const e=uc(t),[n,s]=cc(e);for(let i=0;i<this.hashCount;i++){const a=this.pe(n,s,i);this.we(a)}}we(t){const e=Math.floor(t/8),n=t%8;this.bitmap[e]|=1<<n}}class ur extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(t,e,n,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,n){const s=new Map;return s.set(t,jr.createSynthesizedTargetChangeForCurrentChange(t,e,n)),new Ur(B.min(),s,new rt(j),Nt(),z())}}class jr{constructor(t,e,n,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,n){return new jr(n,e,z(),z(),z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(t,e,n,s){this.Se=t,this.removedTargetIds=e,this.key=n,this.be=s}}class Ih{constructor(t,e){this.targetId=t,this.De=e}}class Eh{constructor(t,e,n=lt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s}}class lc{constructor(){this.ve=0,this.Ce=hc(),this.Fe=lt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(t){t.approximateByteSize()>0&&(this.xe=!0,this.Fe=t)}Le(){let t=z(),e=z(),n=z();return this.Ce.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:n=n.add(s);break;default:M(38017,{changeType:i})}}),new jr(this.Fe,this.Me,t,e,n)}ke(){this.xe=!1,this.Ce=hc()}qe(t,e){this.xe=!0,this.Ce=this.Ce.insert(t,e)}Qe(t){this.xe=!0,this.Ce=this.Ce.remove(t)}$e(){this.ve+=1}Ue(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class op{constructor(t){this.We=t,this.Ge=new Map,this.ze=Nt(),this.je=ls(),this.Je=ls(),this.He=new rt(j)}Ye(t){for(const e of t.Se)t.be&&t.be.isFoundDocument()?this.Ze(e,t.be):this.Xe(e,t.key,t.be);for(const e of t.removedTargetIds)this.Xe(e,t.key,t.be)}et(t){this.forEachTarget(t,e=>{const n=this.tt(e);switch(t.state){case 0:this.nt(e)&&n.Be(t.resumeToken);break;case 1:n.Ue(),n.Oe||n.ke(),n.Be(t.resumeToken);break;case 2:n.Ue(),n.Oe||this.removeTarget(e);break;case 3:this.nt(e)&&(n.Ke(),n.Be(t.resumeToken));break;case 4:this.nt(e)&&(this.rt(e),n.Be(t.resumeToken));break;default:M(56790,{state:t.state})}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.Ge.forEach((n,s)=>{this.nt(s)&&e(s)})}it(t){const e=t.targetId,n=t.De.count,s=this.st(e);if(s){const i=s.target;if(Ls(i))if(n===0){const a=new N(i.path);this.Xe(e,a,ut.newNoDocument(a,B.min()))}else L(n===1,20013,{expectedCount:n});else{const a=this.ot(e);if(a!==n){const u=this._t(t),l=u?this.ut(u,t,a):1;if(l!==0){this.rt(e);const d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(e,d)}}}}}_t(t){const e=t.De.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=e;let a,u;try{a=ee(n).toUint8Array()}catch(l){if(l instanceof jl)return ge("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{u=new Yo(a,s,i)}catch(l){return ge(l instanceof ur?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return u.fe===0?null:u}ut(t,e,n){return e.De.count===n-this.ht(t,e.targetId)?0:2}ht(t,e){const n=this.We.getRemoteKeysForTarget(e);let s=0;return n.forEach(i=>{const a=this.We.lt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${i.path.canonicalString()}`;t.mightContain(u)||(this.Xe(e,i,null),s++)}),s}Pt(t){const e=new Map;this.Ge.forEach((i,a)=>{const u=this.st(a);if(u){if(i.current&&Ls(u.target)){const l=new N(u.target.path);this.Tt(l).has(a)||this.It(a,l)||this.Xe(a,l,ut.newNoDocument(l,t))}i.Ne&&(e.set(a,i.Le()),i.ke())}});let n=z();this.Je.forEach((i,a)=>{let u=!0;a.forEachWhile(l=>{const d=this.st(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.ze.forEach((i,a)=>a.setReadTime(t));const s=new Ur(t,e,this.He,this.ze,n);return this.ze=Nt(),this.je=ls(),this.Je=ls(),this.He=new rt(j),s}Ze(t,e){if(!this.nt(t))return;const n=this.It(t,e.key)?2:0;this.tt(t).qe(e.key,n),this.ze=this.ze.insert(e.key,e),this.je=this.je.insert(e.key,this.Tt(e.key).add(t)),this.Je=this.Je.insert(e.key,this.dt(e.key).add(t))}Xe(t,e,n){if(!this.nt(t))return;const s=this.tt(t);this.It(t,e)?s.qe(e,1):s.Qe(e),this.Je=this.Je.insert(e,this.dt(e).delete(t)),this.Je=this.Je.insert(e,this.dt(e).add(t)),n&&(this.ze=this.ze.insert(e,n))}removeTarget(t){this.Ge.delete(t)}ot(t){const e=this.tt(t).Le();return this.We.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.tt(t).$e()}tt(t){let e=this.Ge.get(t);return e||(e=new lc,this.Ge.set(t,e)),e}dt(t){let e=this.Je.get(t);return e||(e=new J(j),this.Je=this.Je.insert(t,e)),e}Tt(t){let e=this.je.get(t);return e||(e=new J(j),this.je=this.je.insert(t,e)),e}nt(t){const e=this.st(t)!==null;return e||V("WatchChangeAggregator","Detected inactive target",t),e}st(t){const e=this.Ge.get(t);return e&&e.Oe?null:this.We.Et(t)}rt(t){this.Ge.set(t,new lc),this.We.getRemoteKeysForTarget(t).forEach(e=>{this.Xe(t,e,null)})}It(t,e){return this.We.getRemoteKeysForTarget(t).has(e)}}function ls(){return new rt(N.comparator)}function hc(){return new rt(N.comparator)}const ap={asc:"ASCENDING",desc:"DESCENDING"},up={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},cp={and:"AND",or:"OR"};class lp{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function _o(r,t){return r.useProto3Json||Js(t)?t:{value:t}}function Rn(r,t){return r.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Th(r,t){return r.useProto3Json?t.toBase64():t.toUint8Array()}function hp(r,t){return Rn(r,t.toTimestamp())}function Pt(r){return L(!!r,49232),B.fromTimestamp(function(e){const n=te(e);return new Y(n.seconds,n.nanos)}(r))}function Jo(r,t){return yo(r,t).canonicalString()}function yo(r,t){const e=function(s){return new Z(["projects",s.projectId,"databases",s.database])}(r).child("documents");return t===void 0?e:e.child(t)}function vh(r){const t=Z.fromString(r);return L(Dh(t),10190,{key:t.toString()}),t}function Us(r,t){return Jo(r.databaseId,t.path)}function Ue(r,t){const e=vh(t);if(e.get(1)!==r.databaseId.projectId)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+r.databaseId.projectId);if(e.get(3)!==r.databaseId.database)throw new O(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+r.databaseId.database);return new N(bh(e))}function wh(r,t){return Jo(r.databaseId,t)}function Ah(r){const t=vh(r);return t.length===4?Z.emptyPath():bh(t)}function Io(r){return new Z(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function bh(r){return L(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function dc(r,t,e){return{name:Us(r,t),fields:e.value.mapValue.fields}}function dp(r,t,e){const n=Ue(r,t.name),s=Pt(t.updateTime),i=t.createTime?Pt(t.createTime):B.min(),a=new Vt({mapValue:{fields:t.fields}}),u=ut.newFoundDocument(n,s,i,a);return e&&u.setHasCommittedMutations(),e?u.setHasCommittedMutations():u}function fp(r,t){let e;if("targetChange"in t){t.targetChange;const n=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M(39313,{state:d})}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(d,m){return d.useProto3Json?(L(m===void 0||typeof m=="string",58123),lt.fromBase64String(m||"")):(L(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),lt.fromUint8Array(m||new Uint8Array))}(r,t.targetChange.resumeToken),a=t.targetChange.cause,u=a&&function(d){const m=d.code===void 0?P.UNKNOWN:yh(d.code);return new O(m,d.message||"")}(a);e=new Eh(n,s,i,u||null)}else if("documentChange"in t){t.documentChange;const n=t.documentChange;n.document,n.document.name,n.document.updateTime;const s=Ue(r,n.document.name),i=Pt(n.document.updateTime),a=n.document.createTime?Pt(n.document.createTime):B.min(),u=new Vt({mapValue:{fields:n.document.fields}}),l=ut.newFoundDocument(s,i,a,u),d=n.targetIds||[],m=n.removedTargetIds||[];e=new ws(d,m,l.key,l)}else if("documentDelete"in t){t.documentDelete;const n=t.documentDelete;n.document;const s=Ue(r,n.document),i=n.readTime?Pt(n.readTime):B.min(),a=ut.newNoDocument(s,i),u=n.removedTargetIds||[];e=new ws([],u,a.key,a)}else if("documentRemove"in t){t.documentRemove;const n=t.documentRemove;n.document;const s=Ue(r,n.document),i=n.removedTargetIds||[];e=new ws([],i,s,null)}else{if(!("filter"in t))return M(11601,{At:t});{t.filter;const n=t.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,a=new rp(s,i),u=n.targetId;e=new Ih(u,a)}}return e}function js(r,t){let e;if(t instanceof kn)e={update:dc(r,t.key,t.value)};else if(t instanceof Wo)e={delete:Us(r,t.key)};else if(t instanceof ve)e={update:dc(r,t.key,t.data),updateMask:Ip(t.fieldMask)};else{if(!(t instanceof _h))return M(16599,{Rt:t.type});e={verify:Us(r,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(n=>function(i,a){const u=a.transform;if(u instanceof Dr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof bn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Sn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof xr)return{fieldPath:a.field.canonicalString(),increment:u.Ee};throw M(20930,{transform:a.transform})}(0,n))),t.precondition.isNone||(e.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:hp(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:M(27497)}(r,t.precondition)),e}function Eo(r,t){const e=t.currentDocument?function(i){return i.updateTime!==void 0?kt.updateTime(Pt(i.updateTime)):i.exists!==void 0?kt.exists(i.exists):kt.none()}(t.currentDocument):kt.none(),n=t.updateTransforms?t.updateTransforms.map(s=>function(a,u){let l=null;if("setToServerValue"in u)L(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),l=new Dr;else if("appendMissingElements"in u){const m=u.appendMissingElements.values||[];l=new bn(m)}else if("removeAllFromArray"in u){const m=u.removeAllFromArray.values||[];l=new Sn(m)}else"increment"in u?l=new xr(a,u.increment):M(16584,{proto:u});const d=ot.fromServerFormat(u.fieldPath);return new Jg(d,l)}(r,s)):[];if(t.update){t.update.name;const s=Ue(r,t.update.name),i=new Vt({mapValue:{fields:t.update.fields}});if(t.updateMask){const a=function(l){const d=l.fieldPaths||[];return new Lt(d.map(m=>ot.fromServerFormat(m)))}(t.updateMask);return new ve(s,i,a,e,n)}return new kn(s,i,e,n)}if(t.delete){const s=Ue(r,t.delete);return new Wo(s,e)}if(t.verify){const s=Ue(r,t.verify);return new _h(s,e)}return M(1463,{proto:t})}function mp(r,t){return r&&r.length>0?(L(t!==void 0,14353),r.map(e=>function(s,i){let a=s.updateTime?Pt(s.updateTime):Pt(i);return a.isEqual(B.min())&&(a=Pt(i)),new tp(a,s.transformResults||[])}(e,t))):[]}function Sh(r,t){return{documents:[wh(r,t.path)]}}function Rh(r,t){const e={structuredQuery:{}},n=t.path;let s;t.collectionGroup!==null?(s=n,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=n.popLast(),e.structuredQuery.from=[{collectionId:n.lastSegment()}]),e.parent=wh(r,s);const i=function(d){if(d.length!==0)return Ch(tt.create(d,"and"))}(t.filters);i&&(e.structuredQuery.where=i);const a=function(d){if(d.length!==0)return d.map(m=>function(A){return{field:ln(A.field),direction:pp(A.dir)}}(m))}(t.orderBy);a&&(e.structuredQuery.orderBy=a);const u=_o(r,t.limit);return u!==null&&(e.structuredQuery.limit=u),t.startAt&&(e.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(t.endAt)),{Vt:e,parent:s}}function Ph(r){let t=Ah(r.parent);const e=r.structuredQuery,n=e.from?e.from.length:0;let s=null;if(n>0){L(n===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let i=[];e.where&&(i=function(g){const A=Vh(g);return A instanceof tt&&$o(A)?A.getFilters():[A]}(e.where));let a=[];e.orderBy&&(a=function(g){return g.map(A=>function(C){return new Fs(hn(C.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(A))}(e.orderBy));let u=null;e.limit&&(u=function(g){let A;return A=typeof g=="object"?g.value:g,Js(A)?null:A}(e.limit));let l=null;e.startAt&&(l=function(g){const A=!!g.before,R=g.values||[];return new wn(R,A)}(e.startAt));let d=null;return e.endAt&&(d=function(g){const A=!g.before,R=g.values||[];return new wn(R,A)}(e.endAt)),rh(t,s,a,i,u,"F",l,d)}function gp(r,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M(28987,{purpose:s})}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Vh(r){return r.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=hn(e.unaryFilter.field);return K.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=hn(e.unaryFilter.field);return K.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=hn(e.unaryFilter.field);return K.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=hn(e.unaryFilter.field);return K.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return M(61313);default:return M(60726)}}(r):r.fieldFilter!==void 0?function(e){return K.create(hn(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return M(58110);default:return M(50506)}}(e.fieldFilter.op),e.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(e){return tt.create(e.compositeFilter.filters.map(n=>Vh(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return M(1026)}}(e.compositeFilter.op))}(r):M(30097,{filter:r})}function pp(r){return ap[r]}function _p(r){return up[r]}function yp(r){return cp[r]}function ln(r){return{fieldPath:r.canonicalString()}}function hn(r){return ot.fromServerFormat(r.fieldPath)}function Ch(r){return r instanceof K?function(e){if(e.op==="=="){if(Xu(e.value))return{unaryFilter:{field:ln(e.field),op:"IS_NAN"}};if(Qu(e.value))return{unaryFilter:{field:ln(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(Xu(e.value))return{unaryFilter:{field:ln(e.field),op:"IS_NOT_NAN"}};if(Qu(e.value))return{unaryFilter:{field:ln(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ln(e.field),op:_p(e.op),value:e.value}}}(r):r instanceof tt?function(e){const n=e.getFilters().map(s=>Ch(s));return n.length===1?n[0]:{compositeFilter:{op:yp(e.op),filters:n}}}(r):M(54877,{filter:r})}function Ip(r){const t=[];return r.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Dh(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(t,e,n,s,i=B.min(),a=B.min(),u=lt.EMPTY_BYTE_STRING,l=null){this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=l}withSequenceNumber(t){return new Yt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Yt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(t){this.gt=t}}function Ep(r,t){let e;if(t.document)e=dp(r.gt,t.document,!!t.hasCommittedMutations);else if(t.noDocument){const n=N.fromSegments(t.noDocument.path),s=Ge(t.noDocument.readTime);e=ut.newNoDocument(n,s),t.hasCommittedMutations&&e.setHasCommittedMutations()}else{if(!t.unknownDocument)return M(56709);{const n=N.fromSegments(t.unknownDocument.path),s=Ge(t.unknownDocument.version);e=ut.newUnknownDocument(n,s)}}return t.readTime&&e.setReadTime(function(s){const i=new Y(s[0],s[1]);return B.fromTimestamp(i)}(t.readTime)),e}function fc(r,t){const e=t.key,n={prefixPath:e.getCollectionPath().popLast().toArray(),collectionGroup:e.collectionGroup,documentId:e.path.lastSegment(),readTime:qs(t.readTime),hasCommittedMutations:t.hasCommittedMutations};if(t.isFoundDocument())n.document=function(i,a){return{name:Us(i,a.key),fields:a.data.value.mapValue.fields,updateTime:Rn(i,a.version.toTimestamp()),createTime:Rn(i,a.createTime.toTimestamp())}}(r.gt,t);else if(t.isNoDocument())n.noDocument={path:e.path.toArray(),readTime:Ke(t.version)};else{if(!t.isUnknownDocument())return M(57904,{document:t});n.unknownDocument={path:e.path.toArray(),version:Ke(t.version)}}return n}function qs(r){const t=r.toTimestamp();return[t.seconds,t.nanoseconds]}function Ke(r){const t=r.toTimestamp();return{seconds:t.seconds,nanoseconds:t.nanoseconds}}function Ge(r){const t=new Y(r.seconds,r.nanoseconds);return B.fromTimestamp(t)}function Ne(r,t){const e=(t.baseMutations||[]).map(i=>Eo(r.gt,i));for(let i=0;i<t.mutations.length-1;++i){const a=t.mutations[i];if(i+1<t.mutations.length&&t.mutations[i+1].transform!==void 0){const u=t.mutations[i+1];a.updateTransforms=u.transform.fieldTransforms,t.mutations.splice(i+1,1),++i}}const n=t.mutations.map(i=>Eo(r.gt,i)),s=Y.fromMillis(t.localWriteTimeMs);return new Ho(t.batchId,s,e,n)}function cr(r){const t=Ge(r.readTime),e=r.lastLimboFreeSnapshotVersion!==void 0?Ge(r.lastLimboFreeSnapshotVersion):B.min();let n;return n=function(i){return i.documents!==void 0}(r.query)?function(i){const a=i.documents.length;return L(a===1,1966,{count:a}),Ot(ii(Ah(i.documents[0])))}(r.query):function(i){return Ot(Ph(i))}(r.query),new Yt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,t,e,lt.fromBase64String(r.resumeToken))}function Nh(r,t){const e=Ke(t.snapshotVersion),n=Ke(t.lastLimboFreeSnapshotVersion);let s;s=Ls(t.target)?Sh(r.gt,t.target):Rh(r.gt,t.target).Vt;const i=t.resumeToken.toBase64();return{targetId:t.targetId,canonicalId:$e(t.target),readTime:e,resumeToken:i,lastListenSequenceNumber:t.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function kh(r){const t=Ph({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?po(t,t.limit,"L"):t}function $i(r,t){return new Xo(t.largestBatchId,Eo(r.gt,t.overlayMutation))}function mc(r,t){const e=t.path.lastSegment();return[r,bt(t.path.popLast()),e]}function gc(r,t,e,n){return{indexId:r,uid:t,sequenceNumber:e,readTime:Ke(n.readTime),documentKey:bt(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tp{getBundleMetadata(t,e){return pc(t).get(e).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:Ge(i.createTime),version:i.version}}(n)})}saveBundleMetadata(t,e){return pc(t).put(function(s){return{bundleId:s.id,createTime:Ke(Pt(s.createTime)),version:s.version}}(e))}getNamedQuery(t,e){return _c(t).get(e).next(n=>{if(n)return function(i){return{name:i.name,query:kh(i.bundledQuery),readTime:Ge(i.readTime)}}(n)})}saveNamedQuery(t,e){return _c(t).put(function(s){return{name:s.name,readTime:Ke(Pt(s.readTime)),bundledQuery:s.bundledQuery}}(e))}}function pc(r){return ft(r,Zs)}function _c(r){return ft(r,ti)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{constructor(t,e){this.serializer=t,this.userId=e}static yt(t,e){const n=e.uid||"";return new ci(t,n)}getOverlay(t,e){return er(t).get(mc(this.userId,e)).next(n=>n?$i(this.serializer,n):null)}getOverlays(t,e){const n=$t();return v.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){const s=[];return n.forEach((i,a)=>{const u=new Xo(e,a);s.push(this.wt(t,u))}),v.waitFor(s)}removeOverlaysForBatchId(t,e,n){const s=new Set;e.forEach(a=>s.add(bt(a.getCollectionPath())));const i=[];return s.forEach(a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);i.push(er(t).Y(uo,u))}),v.waitFor(i)}getOverlaysForCollection(t,e,n){const s=$t(),i=bt(e),a=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return er(t).j(uo,a).next(u=>{for(const l of u){const d=$i(this.serializer,l);s.set(d.getKey(),d)}return s})}getOverlaysForCollectionGroup(t,e,n,s){const i=$t();let a;const u=IDBKeyRange.bound([this.userId,e,n],[this.userId,e,Number.POSITIVE_INFINITY],!0);return er(t).X({index:Ol,range:u},(l,d,m)=>{const g=$i(this.serializer,d);i.size()<s||g.largestBatchId===a?(i.set(g.getKey(),g),a=g.largestBatchId):m.done()}).next(()=>i)}wt(t,e){return er(t).put(function(s,i,a){const[u,l,d]=mc(i,a.mutation.key);return{userId:i,collectionPath:l,documentId:d,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:js(s.gt,a.mutation)}}(this.serializer,this.userId,e))}}function er(r){return ft(r,ei)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{St(t){return ft(t,Lo)}getSessionToken(t){return this.St(t).get("sessionToken").next(e=>{const n=e==null?void 0:e.value;return n?lt.fromUint8Array(n):lt.EMPTY_BYTE_STRING})}setSessionToken(t,e){return this.St(t).put({name:"sessionToken",value:e.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke{constructor(){}bt(t,e){this.Dt(t,e),e.vt()}Dt(t,e){if("nullValue"in t)this.Ct(e,5);else if("booleanValue"in t)this.Ct(e,10),e.Ft(t.booleanValue?1:0);else if("integerValue"in t)this.Ct(e,15),e.Ft(it(t.integerValue));else if("doubleValue"in t){const n=it(t.doubleValue);isNaN(n)?this.Ct(e,13):(this.Ct(e,15),Ar(n)?e.Ft(0):e.Ft(n))}else if("timestampValue"in t){let n=t.timestampValue;this.Ct(e,20),typeof n=="string"&&(n=te(n)),e.Mt(`${n.seconds||""}`),e.Ft(n.nanos||0)}else if("stringValue"in t)this.xt(t.stringValue,e),this.Ot(e);else if("bytesValue"in t)this.Ct(e,30),e.Nt(ee(t.bytesValue)),this.Ot(e);else if("referenceValue"in t)this.Bt(t.referenceValue,e);else if("geoPointValue"in t){const n=t.geoPointValue;this.Ct(e,45),e.Ft(n.latitude||0),e.Ft(n.longitude||0)}else"mapValue"in t?Wl(t)?this.Ct(e,Number.MAX_SAFE_INTEGER):ri(t)?this.Lt(t.mapValue,e):(this.kt(t.mapValue,e),this.Ot(e)):"arrayValue"in t?(this.qt(t.arrayValue,e),this.Ot(e)):M(19022,{Qt:t})}xt(t,e){this.Ct(e,25),this.$t(t,e)}$t(t,e){e.Mt(t)}kt(t,e){const n=t.fields||{};this.Ct(e,55);for(const s of Object.keys(n))this.xt(s,e),this.Dt(n[s],e)}Lt(t,e){var n,s;const i=t.fields||{};this.Ct(e,53);const a=Tn,u=((s=(n=i[a].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.length)||0;this.Ct(e,15),e.Ft(it(u)),this.xt(a,e),this.Dt(i[a],e)}qt(t,e){const n=t.values||[];this.Ct(e,50);for(const s of n)this.Dt(s,e)}Bt(t,e){this.Ct(e,37),N.fromName(t).path.forEach(n=>{this.Ct(e,60),this.$t(n,e)})}Ct(t,e){t.Ft(e)}Ot(t){t.Ft(2)}}ke.Ut=new ke;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rn=255;function wp(r){if(r===0)return 8;let t=0;return r>>4||(t+=4,r<<=4),r>>6||(t+=2,r<<=2),r>>7||(t+=1),t}function yc(r){const t=64-function(n){let s=0;for(let i=0;i<8;++i){const a=wp(255&n[i]);if(s+=a,a!==8)break}return s}(r);return Math.ceil(t/8)}class Ap{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Kt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.Wt(n.value),n=e.next();this.Gt()}zt(t){const e=t[Symbol.iterator]();let n=e.next();for(;!n.done;)this.jt(n.value),n=e.next();this.Jt()}Ht(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.Wt(n);else if(n<2048)this.Wt(960|n>>>6),this.Wt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.Wt(480|n>>>12),this.Wt(128|63&n>>>6),this.Wt(128|63&n);else{const s=e.codePointAt(0);this.Wt(240|s>>>18),this.Wt(128|63&s>>>12),this.Wt(128|63&s>>>6),this.Wt(128|63&s)}}this.Gt()}Yt(t){for(const e of t){const n=e.charCodeAt(0);if(n<128)this.jt(n);else if(n<2048)this.jt(960|n>>>6),this.jt(128|63&n);else if(e<"\uD800"||"\uDBFF"<e)this.jt(480|n>>>12),this.jt(128|63&n>>>6),this.jt(128|63&n);else{const s=e.codePointAt(0);this.jt(240|s>>>18),this.jt(128|63&s>>>12),this.jt(128|63&s>>>6),this.jt(128|63&s)}}this.Jt()}Zt(t){const e=this.Xt(t),n=yc(e);this.en(1+n),this.buffer[this.position++]=255&n;for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=255&e[s]}tn(t){const e=this.Xt(t),n=yc(e);this.en(1+n),this.buffer[this.position++]=~(255&n);for(let s=e.length-n;s<e.length;++s)this.buffer[this.position++]=~(255&e[s])}nn(){this.rn(rn),this.rn(255)}sn(){this._n(rn),this._n(255)}reset(){this.position=0}seed(t){this.en(t.length),this.buffer.set(t,this.position),this.position+=t.length}an(){return this.buffer.slice(0,this.position)}Xt(t){const e=function(i){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,i,!1),new Uint8Array(a.buffer)}(t),n=!!(128&e[0]);e[0]^=n?255:128;for(let s=1;s<e.length;++s)e[s]^=n?255:0;return e}Wt(t){const e=255&t;e===0?(this.rn(0),this.rn(255)):e===rn?(this.rn(rn),this.rn(0)):this.rn(e)}jt(t){const e=255&t;e===0?(this._n(0),this._n(255)):e===rn?(this._n(rn),this._n(0)):this._n(t)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(t){this.en(1),this.buffer[this.position++]=t}_n(t){this.en(1),this.buffer[this.position++]=~t}en(t){const e=t+this.position;if(e<=this.buffer.length)return;let n=2*this.buffer.length;n<e&&(n=e);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class bp{constructor(t){this.un=t}Nt(t){this.un.Kt(t)}Mt(t){this.un.Ht(t)}Ft(t){this.un.Zt(t)}vt(){this.un.nn()}}class Sp{constructor(t){this.un=t}Nt(t){this.un.zt(t)}Mt(t){this.un.Yt(t)}Ft(t){this.un.tn(t)}vt(){this.un.sn()}}class nr{constructor(){this.un=new Ap,this.cn=new bp(this.un),this.ln=new Sp(this.un)}seed(t){this.un.seed(t)}hn(t){return t===0?this.cn:this.ln}an(){return this.un.an()}reset(){this.un.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(t,e,n,s){this.Pn=t,this.Tn=e,this.In=n,this.dn=s}En(){const t=this.dn.length,e=t===0||this.dn[t-1]===255?t+1:t,n=new Uint8Array(e);return n.set(this.dn,0),e!==t?n.set([0],this.dn.length):++n[n.length-1],new Oe(this.Pn,this.Tn,this.In,n)}An(t,e,n){return{indexId:this.Pn,uid:t,arrayValue:As(this.In),directionalValue:As(this.dn),orderedDocumentKey:As(e),documentKey:n.path.toArray()}}Rn(t,e,n){const s=this.An(t,e,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function ae(r,t){let e=r.Pn-t.Pn;return e!==0?e:(e=Ic(r.In,t.In),e!==0?e:(e=Ic(r.dn,t.dn),e!==0?e:N.comparator(r.Tn,t.Tn)))}function Ic(r,t){for(let e=0;e<r.length&&e<t.length;++e){const n=r[e]-t[e];if(n!==0)return n}return r.length-t.length}function As(r){return ol()?function(e){let n="";for(let s=0;s<e.length;s++)n+=String.fromCharCode(e[s]);return n}(r):r}function Ec(r){return typeof r!="string"?r:function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(r)}class Tc{constructor(t){this.Vn=new J((e,n)=>ot.comparator(e.field,n.field)),this.collectionId=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment(),this.mn=t.orderBy,this.fn=[];for(const e of t.filters){const n=e;n.isInequality()?this.Vn=this.Vn.add(n):this.fn.push(n)}}get gn(){return this.Vn.size>1}pn(t){if(L(t.collectionGroup===this.collectionId,49279),this.gn)return!1;const e=io(t);if(e!==void 0&&!this.yn(e))return!1;const n=Ce(t);let s=new Set,i=0,a=0;for(;i<n.length&&this.yn(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.Vn.size>0){const u=this.Vn.getIterator().getNext();if(!s.has(u.field.canonicalString())){const l=n[i];if(!this.wn(u,l)||!this.Sn(this.mn[a++],l))return!1}++i}for(;i<n.length;++i){const u=n[i];if(a>=this.mn.length||!this.Sn(this.mn[a++],u))return!1}return!0}bn(){if(this.gn)return null;let t=new J(ot.comparator);const e=[];for(const n of this.fn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")e.push(new ps(n.field,2));else{if(t.has(n.field))continue;t=t.add(n.field),e.push(new ps(n.field,0))}for(const n of this.mn)n.field.isKeyField()||t.has(n.field)||(t=t.add(n.field),e.push(new ps(n.field,n.dir==="asc"?0:1)));return new xs(xs.UNKNOWN_ID,this.collectionId,e,wr.empty())}yn(t){for(const e of this.fn)if(this.wn(e,t))return!0;return!1}wn(t,e){if(t===void 0||!t.field.isEqual(e.fieldPath))return!1;const n=t.op==="array-contains"||t.op==="array-contains-any";return e.kind===2===n}Sn(t,e){return!!t.field.isEqual(e.fieldPath)&&(e.kind===0&&t.dir==="asc"||e.kind===1&&t.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oh(r){var t,e;if(L(r instanceof K||r instanceof tt,20012),r instanceof K){if(r instanceof nh){const s=((e=(t=r.value.arrayValue)===null||t===void 0?void 0:t.values)===null||e===void 0?void 0:e.map(i=>K.create(r.field,"==",i)))||[];return tt.create(s,"or")}return r}const n=r.filters.map(s=>Oh(s));return tt.create(n,r.op)}function Rp(r){if(r.getFilters().length===0)return[];const t=wo(Oh(r));return L(Mh(t),7391),To(t)||vo(t)?[t]:t.getFilters()}function To(r){return r instanceof K}function vo(r){return r instanceof tt&&$o(r)}function Mh(r){return To(r)||vo(r)||function(e){if(e instanceof tt&&fo(e)){for(const n of e.getFilters())if(!To(n)&&!vo(n))return!1;return!0}return!1}(r)}function wo(r){if(L(r instanceof K||r instanceof tt,34018),r instanceof K)return r;if(r.filters.length===1)return wo(r.filters[0]);const t=r.filters.map(n=>wo(n));let e=tt.create(t,r.op);return e=zs(e),Mh(e)?e:(L(e instanceof tt,64498),L(An(e),40251),L(e.filters.length>1,57927),e.filters.reduce((n,s)=>Zo(n,s)))}function Zo(r,t){let e;return L(r instanceof K||r instanceof tt,38388),L(t instanceof K||t instanceof tt,25473),e=r instanceof K?t instanceof K?function(s,i){return tt.create([s,i],"and")}(r,t):vc(r,t):t instanceof K?vc(t,r):function(s,i){if(L(s.filters.length>0&&i.filters.length>0,48005),An(s)&&An(i))return Zl(s,i.getFilters());const a=fo(s)?s:i,u=fo(s)?i:s,l=a.filters.map(d=>Zo(d,u));return tt.create(l,"or")}(r,t),zs(e)}function vc(r,t){if(An(t))return Zl(t,r.getFilters());{const e=t.filters.map(n=>Zo(r,n));return tt.create(e,"or")}}function zs(r){if(L(r instanceof K||r instanceof tt,11850),r instanceof K)return r;const t=r.getFilters();if(t.length===1)return zs(t[0]);if(Yl(r))return r;const e=t.map(s=>zs(s)),n=[];return e.forEach(s=>{s instanceof K?n.push(s):s instanceof tt&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:tt.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(){this.Dn=new ta}addToCollectionParentIndex(t,e){return this.Dn.add(e),v.resolve()}getCollectionParents(t,e){return v.resolve(this.Dn.getEntries(e))}addFieldIndex(t,e){return v.resolve()}deleteFieldIndex(t,e){return v.resolve()}deleteAllFieldIndexes(t){return v.resolve()}createTargetIndexes(t,e){return v.resolve()}getDocumentsMatchingTarget(t,e){return v.resolve(null)}getIndexType(t,e){return v.resolve(0)}getFieldIndexes(t,e){return v.resolve([])}getNextCollectionGroupToUpdate(t){return v.resolve(null)}getMinOffset(t,e){return v.resolve(Mt.min())}getMinOffsetFromCollectionGroup(t,e){return v.resolve(Mt.min())}updateCollectionGroup(t,e,n){return v.resolve()}updateIndexEntries(t,e){return v.resolve()}}class ta{constructor(){this.index={}}add(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new J(Z.comparator),i=!s.has(n);return this.index[e]=s.add(n),i}has(t){const e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n)}getEntries(t){return(this.index[t]||new J(Z.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc="IndexedDbIndexManager",hs=new Uint8Array(0);class Vp{constructor(t,e){this.databaseId=e,this.vn=new ta,this.Cn=new ne(n=>$e(n),(n,s)=>Lr(n,s)),this.uid=t.uid||""}addToCollectionParentIndex(t,e){if(!this.vn.has(e)){const n=e.lastSegment(),s=e.popLast();t.addOnCommittedListener(()=>{this.vn.add(e)});const i={collectionId:n,parent:bt(s)};return Ac(t).put(i)}return v.resolve()}getCollectionParents(t,e){const n=[],s=IDBKeyRange.bound([e,""],[vl(e),""],!1,!0);return Ac(t).j(s).next(i=>{for(const a of i){if(a.collectionId!==e)break;n.push(zt(a.parent))}return n})}addFieldIndex(t,e){const n=rr(t),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(l=>[l.fieldPath.canonicalString(),l.kind])}}(e);delete s.indexId;const i=n.add(s);if(e.indexState){const a=on(t);return i.next(u=>{a.put(gc(u,this.uid,e.indexState.sequenceNumber,e.indexState.offset))})}return i.next()}deleteFieldIndex(t,e){const n=rr(t),s=on(t),i=sn(t);return n.delete(e.indexId).next(()=>s.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([e.indexId],[e.indexId+1],!1,!0)))}deleteAllFieldIndexes(t){const e=rr(t),n=sn(t),s=on(t);return e.Y().next(()=>n.Y()).next(()=>s.Y())}createTargetIndexes(t,e){return v.forEach(this.Fn(e),n=>this.getIndexType(t,n).next(s=>{if(s===0||s===1){const i=new Tc(n).bn();if(i!=null)return this.addFieldIndex(t,i)}}))}getDocumentsMatchingTarget(t,e){const n=sn(t);let s=!0;const i=new Map;return v.forEach(this.Fn(e),a=>this.Mn(t,a).next(u=>{s&&(s=!!u),i.set(a,u)})).next(()=>{if(s){let a=z();const u=[];return v.forEach(i,(l,d)=>{V(wc,`Using index ${function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map(X=>`${X.fieldPath}:${X.kind}`).join(",")}`}(l)} to execute ${$e(e)}`);const m=function(U,X){const nt=io(X);if(nt===void 0)return null;for(const H of Bs(U,nt.fieldPath))switch(H.op){case"array-contains-any":return H.value.arrayValue.values||[];case"array-contains":return[H.value]}return null}(d,l),g=function(U,X){const nt=new Map;for(const H of Ce(X))for(const I of Bs(U,H.fieldPath))switch(I.op){case"==":case"in":nt.set(H.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return nt.set(H.fieldPath.canonicalString(),I.value),Array.from(nt.values())}return null}(d,l),A=function(U,X){const nt=[];let H=!0;for(const I of Ce(X)){const p=I.kind===0?ec(U,I.fieldPath,U.startAt):nc(U,I.fieldPath,U.startAt);nt.push(p.value),H&&(H=p.inclusive)}return new wn(nt,H)}(d,l),R=function(U,X){const nt=[];let H=!0;for(const I of Ce(X)){const p=I.kind===0?nc(U,I.fieldPath,U.endAt):ec(U,I.fieldPath,U.endAt);nt.push(p.value),H&&(H=p.inclusive)}return new wn(nt,H)}(d,l),C=this.xn(l,d,A),k=this.xn(l,d,R),x=this.On(l,d,g),$=this.Nn(l.indexId,m,C,A.inclusive,k,R.inclusive,x);return v.forEach($,q=>n.H(q,e.limit).next(U=>{U.forEach(X=>{const nt=N.fromSegments(X.documentKey);a.has(nt)||(a=a.add(nt),u.push(nt))})}))}).next(()=>u)}return v.resolve(null)})}Fn(t){let e=this.Cn.get(t);return e||(t.filters.length===0?e=[t]:e=Rp(tt.create(t.filters,"and")).map(n=>go(t.path,t.collectionGroup,t.orderBy,n.getFilters(),t.limit,t.startAt,t.endAt)),this.Cn.set(t,e),e)}Nn(t,e,n,s,i,a,u){const l=(e!=null?e.length:1)*Math.max(n.length,i.length),d=l/(e!=null?e.length:1),m=[];for(let g=0;g<l;++g){const A=e?this.Bn(e[g/d]):hs,R=this.Ln(t,A,n[g%d],s),C=this.kn(t,A,i[g%d],a),k=u.map(x=>this.Ln(t,A,x,!0));m.push(...this.createRange(R,C,k))}return m}Ln(t,e,n,s){const i=new Oe(t,N.empty(),e,n);return s?i:i.En()}kn(t,e,n,s){const i=new Oe(t,N.empty(),e,n);return s?i.En():i}Mn(t,e){const n=new Tc(e),s=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment();return this.getFieldIndexes(t,s).next(i=>{let a=null;for(const u of i)n.pn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a})}getIndexType(t,e){let n=2;const s=this.Fn(e);return v.forEach(s,i=>this.Mn(t,i).next(a=>{a?n!==0&&a.fields.length<function(l){let d=new J(ot.comparator),m=!1;for(const g of l.filters)for(const A of g.getFlattenedFilters())A.field.isKeyField()||(A.op==="array-contains"||A.op==="array-contains-any"?m=!0:d=d.add(A.field));for(const g of l.orderBy)g.field.isKeyField()||(d=d.add(g.field));return d.size+(m?1:0)}(i)&&(n=1):n=0})).next(()=>function(a){return a.limit!==null}(e)&&s.length>1&&n===2?1:n)}qn(t,e){const n=new nr;for(const s of Ce(t)){const i=e.data.field(s.fieldPath);if(i==null)return null;const a=n.hn(s.kind);ke.Ut.bt(i,a)}return n.an()}Bn(t){const e=new nr;return ke.Ut.bt(t,e.hn(0)),e.an()}Qn(t,e){const n=new nr;return ke.Ut.bt(zo(this.databaseId,e),n.hn(function(i){const a=Ce(i);return a.length===0?0:a[a.length-1].kind}(t))),n.an()}On(t,e,n){if(n===null)return[];let s=[];s.push(new nr);let i=0;for(const a of Ce(t)){const u=n[i++];for(const l of s)if(this.$n(e,a.fieldPath)&&Cr(u))s=this.Un(s,a,u);else{const d=l.hn(a.kind);ke.Ut.bt(u,d)}}return this.Kn(s)}xn(t,e,n){return this.On(t,e,n.position)}Kn(t){const e=[];for(let n=0;n<t.length;++n)e[n]=t[n].an();return e}Un(t,e,n){const s=[...t],i=[];for(const a of n.arrayValue.values||[])for(const u of s){const l=new nr;l.seed(u.an()),ke.Ut.bt(a,l.hn(e.kind)),i.push(l)}return i}$n(t,e){return!!t.filters.find(n=>n instanceof K&&n.field.isEqual(e)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(t,e){const n=rr(t),s=on(t);return(e?n.j(ao,IDBKeyRange.bound(e,e)):n.j()).next(i=>{const a=[];return v.forEach(i,u=>s.get([u.indexId,this.uid]).next(l=>{a.push(function(m,g){const A=g?new wr(g.sequenceNumber,new Mt(Ge(g.readTime),new N(zt(g.documentKey)),g.largestBatchId)):wr.empty(),R=m.fields.map(([C,k])=>new ps(ot.fromServerFormat(C),k));return new xs(m.indexId,m.collectionGroup,R,A)}(u,l))})).next(()=>a)})}getNextCollectionGroupToUpdate(t){return this.getFieldIndexes(t).next(e=>e.length===0?null:(e.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:j(n.collectionGroup,s.collectionGroup)}),e[0].collectionGroup))}updateCollectionGroup(t,e,n){const s=rr(t),i=on(t);return this.Wn(t).next(a=>s.j(ao,IDBKeyRange.bound(e,e)).next(u=>v.forEach(u,l=>i.put(gc(l.indexId,this.uid,a,n)))))}updateIndexEntries(t,e){const n=new Map;return v.forEach(e,(s,i)=>{const a=n.get(s.collectionGroup);return(a?v.resolve(a):this.getFieldIndexes(t,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),v.forEach(u,l=>this.Gn(t,s,l).next(d=>{const m=this.zn(i,l);return d.isEqual(m)?v.resolve():this.jn(t,i,l,d,m)}))))})}Jn(t,e,n,s){return sn(t).put(s.An(this.uid,this.Qn(n,e.key),e.key))}Hn(t,e,n,s){return sn(t).delete(s.Rn(this.uid,this.Qn(n,e.key),e.key))}Gn(t,e,n){const s=sn(t);let i=new J(ae);return s.X({index:kl,range:IDBKeyRange.only([n.indexId,this.uid,As(this.Qn(n,e))])},(a,u)=>{i=i.add(new Oe(n.indexId,e,Ec(u.arrayValue),Ec(u.directionalValue)))}).next(()=>i)}zn(t,e){let n=new J(ae);const s=this.qn(e,t);if(s==null)return n;const i=io(e);if(i!=null){const a=t.data.field(i.fieldPath);if(Cr(a))for(const u of a.arrayValue.values||[])n=n.add(new Oe(e.indexId,t.key,this.Bn(u),s))}else n=n.add(new Oe(e.indexId,t.key,hs,s));return n}jn(t,e,n,s,i){V(wc,"Updating index entries for document '%s'",e.key);const a=[];return function(l,d,m,g,A){const R=l.getIterator(),C=d.getIterator();let k=nn(R),x=nn(C);for(;k||x;){let $=!1,q=!1;if(k&&x){const U=m(k,x);U<0?q=!0:U>0&&($=!0)}else k!=null?q=!0:$=!0;$?(g(x),x=nn(C)):q?(A(k),k=nn(R)):(k=nn(R),x=nn(C))}}(s,i,ae,u=>{a.push(this.Jn(t,e,n,u))},u=>{a.push(this.Hn(t,e,n,u))}),v.waitFor(a)}Wn(t){let e=1;return on(t).X({index:Nl,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),e=s.sequenceNumber+1}).next(()=>e)}createRange(t,e,n){n=n.sort((a,u)=>ae(a,u)).filter((a,u,l)=>!u||ae(a,l[u-1])!==0);const s=[];s.push(t);for(const a of n){const u=ae(a,t),l=ae(a,e);if(u===0)s[0]=t.En();else if(u>0&&l<0)s.push(a),s.push(a.En());else if(l>0)break}s.push(e);const i=[];for(let a=0;a<s.length;a+=2){if(this.Yn(s[a],s[a+1]))return[];const u=s[a].Rn(this.uid,hs,N.empty()),l=s[a+1].Rn(this.uid,hs,N.empty());i.push(IDBKeyRange.bound(u,l))}return i}Yn(t,e){return ae(t,e)>0}getMinOffsetFromCollectionGroup(t,e){return this.getFieldIndexes(t,e).next(bc)}getMinOffset(t,e){return v.mapArray(this.Fn(e),n=>this.Mn(t,n).next(s=>s||M(44426))).next(bc)}}function Ac(r){return ft(r,Rr)}function sn(r){return ft(r,mr)}function rr(r){return ft(r,Fo)}function on(r){return ft(r,fr)}function bc(r){L(r.length!==0,28825);let t=r[0].indexState.offset,e=t.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;ko(s,t)<0&&(t=s),e<s.largestBatchId&&(e=s.largestBatchId)}return new Mt(t.readTime,t.documentKey,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Fh=41943040;class At{static withCacheSize(t){return new At(t,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,n){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lh(r,t,e){const n=r.store(Ut),s=r.store(_n),i=[],a=IDBKeyRange.only(e.batchId);let u=0;const l=n.X({range:a},(m,g,A)=>(u++,A.delete()));i.push(l.next(()=>{L(u===1,47070,{batchId:e.batchId})}));const d=[];for(const m of e.mutations){const g=Cl(t,m.key.path,e.batchId);i.push(s.delete(g)),d.push(m.key)}return v.waitFor(i).next(()=>d)}function $s(r){if(!r)return 0;let t;if(r.document)t=r.document;else if(r.unknownDocument)t=r.unknownDocument;else{if(!r.noDocument)throw M(14731);t=r.noDocument}return JSON.stringify(t).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */At.DEFAULT_COLLECTION_PERCENTILE=10,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,At.DEFAULT=new At(Fh,At.DEFAULT_COLLECTION_PERCENTILE,At.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),At.DISABLED=new At(-1,0,0);class li{constructor(t,e,n,s){this.userId=t,this.serializer=e,this.indexManager=n,this.referenceDelegate=s,this.Zn={}}static yt(t,e,n,s){L(t.uid!=="",64387);const i=t.isAuthenticated()?t.uid:"";return new li(i,e,n,s)}checkEmpty(t){let e=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return ue(t).X({index:Me,range:n},(s,i,a)=>{e=!1,a.done()}).next(()=>e)}addMutationBatch(t,e,n,s){const i=dn(t),a=ue(t);return a.add({}).next(u=>{L(typeof u=="number",49019);const l=new Ho(u,e,n,s),d=function(R,C,k){const x=k.baseMutations.map(q=>js(R.gt,q)),$=k.mutations.map(q=>js(R.gt,q));return{userId:C,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:x,mutations:$}}(this.serializer,this.userId,l),m=[];let g=new J((A,R)=>j(A.canonicalString(),R.canonicalString()));for(const A of s){const R=Cl(this.userId,A.key.path,u);g=g.add(A.key.path.popLast()),m.push(a.put(d)),m.push(i.put(R,og))}return g.forEach(A=>{m.push(this.indexManager.addToCollectionParentIndex(t,A))}),t.addOnCommittedListener(()=>{this.Zn[u]=l.keys()}),v.waitFor(m).next(()=>l)})}lookupMutationBatch(t,e){return ue(t).get(e).next(n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:e}),Ne(this.serializer,n)):null)}Xn(t,e){return this.Zn[e]?v.resolve(this.Zn[e]):this.lookupMutationBatch(t,e).next(n=>{if(n){const s=n.keys();return this.Zn[e]=s,s}return null})}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return ue(t).X({index:Me,range:s},(a,u,l)=>{u.userId===this.userId&&(L(u.batchId>=n,47524,{er:n}),i=Ne(this.serializer,u)),l.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(t){const e=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Le;return ue(t).X({index:Me,range:e,reverse:!0},(s,i,a)=>{n=i.batchId,a.done()}).next(()=>n)}getAllMutationBatches(t){const e=IDBKeyRange.bound([this.userId,Le],[this.userId,Number.POSITIVE_INFINITY]);return ue(t).j(Me,e).next(n=>n.map(s=>Ne(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(t,e){const n=_s(this.userId,e.path),s=IDBKeyRange.lowerBound(n),i=[];return dn(t).X({range:s},(a,u,l)=>{const[d,m,g]=a,A=zt(m);if(d===this.userId&&e.path.isEqual(A))return ue(t).get(g).next(R=>{if(!R)throw M(61480,{tr:a,batchId:g});L(R.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:R.userId,batchId:g}),i.push(Ne(this.serializer,R))});l.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new J(j);const s=[];return e.forEach(i=>{const a=_s(this.userId,i.path),u=IDBKeyRange.lowerBound(a),l=dn(t).X({range:u},(d,m,g)=>{const[A,R,C]=d,k=zt(R);A===this.userId&&i.path.isEqual(k)?n=n.add(C):g.done()});s.push(l)}),v.waitFor(s).next(()=>this.nr(t,n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1,i=_s(this.userId,n),a=IDBKeyRange.lowerBound(i);let u=new J(j);return dn(t).X({range:a},(l,d,m)=>{const[g,A,R]=l,C=zt(A);g===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(R)):m.done()}).next(()=>this.nr(t,u))}nr(t,e){const n=[],s=[];return e.forEach(i=>{s.push(ue(t).get(i).next(a=>{if(a===null)throw M(35274,{batchId:i});L(a.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:a.userId,batchId:i}),n.push(Ne(this.serializer,a))}))}),v.waitFor(s).next(()=>n)}removeMutationBatch(t,e){return Lh(t.ce,this.userId,e).next(n=>(t.addOnCommittedListener(()=>{this.rr(e.batchId)}),v.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(t,s))))}rr(t){delete this.Zn[t]}performConsistencyCheck(t){return this.checkEmpty(t).next(e=>{if(!e)return v.resolve();const n=IDBKeyRange.lowerBound(function(a){return[a]}(this.userId)),s=[];return dn(t).X({range:n},(i,a,u)=>{if(i[0]===this.userId){const l=zt(i[1]);s.push(l)}else u.done()}).next(()=>{L(s.length===0,56720,{ir:s.map(i=>i.canonicalString())})})})}containsKey(t,e){return Bh(t,this.userId,e)}sr(t){return Uh(t).get(this.userId).next(e=>e||{userId:this.userId,lastAcknowledgedBatchId:Le,lastStreamToken:""})}}function Bh(r,t,e){const n=_s(t,e.path),s=n[1],i=IDBKeyRange.lowerBound(n);let a=!1;return dn(r).X({range:i,Z:!0},(u,l,d)=>{const[m,g,A]=u;m===t&&g===s&&(a=!0),d.done()}).next(()=>a)}function ue(r){return ft(r,Ut)}function dn(r){return ft(r,_n)}function Uh(r){return ft(r,br)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(t){this._r=t}next(){return this._r+=2,this._r}static ar(){return new We(0)}static ur(){return new We(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(t,e){this.referenceDelegate=t,this.serializer=e}allocateTargetId(t){return this.cr(t).next(e=>{const n=new We(e.highestTargetId);return e.highestTargetId=n.next(),this.lr(t,e).next(()=>e.highestTargetId)})}getLastRemoteSnapshotVersion(t){return this.cr(t).next(e=>B.fromTimestamp(new Y(e.lastRemoteSnapshotVersion.seconds,e.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(t){return this.cr(t).next(e=>e.highestListenSequenceNumber)}setTargetsMetadata(t,e,n){return this.cr(t).next(s=>(s.highestListenSequenceNumber=e,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),e>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=e),this.lr(t,s)))}addTargetData(t,e){return this.hr(t,e).next(()=>this.cr(t).next(n=>(n.targetCount+=1,this.Pr(e,n),this.lr(t,n))))}updateTargetData(t,e){return this.hr(t,e)}removeTargetData(t,e){return this.removeMatchingKeysForTargetId(t,e.targetId).next(()=>an(t).delete(e.targetId)).next(()=>this.cr(t)).next(n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.lr(t,n)))}removeTargets(t,e,n){let s=0;const i=[];return an(t).X((a,u)=>{const l=cr(u);l.sequenceNumber<=e&&n.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(t,l)))}).next(()=>v.waitFor(i)).next(()=>s)}forEachTarget(t,e){return an(t).X((n,s)=>{const i=cr(s);e(i)})}cr(t){return Rc(t).get(Os).next(e=>(L(e!==null,2888),e))}lr(t,e){return Rc(t).put(Os,e)}hr(t,e){return an(t).put(Nh(this.serializer,e))}Pr(t,e){let n=!1;return t.targetId>e.highestTargetId&&(e.highestTargetId=t.targetId,n=!0),t.sequenceNumber>e.highestListenSequenceNumber&&(e.highestListenSequenceNumber=t.sequenceNumber,n=!0),n}getTargetCount(t){return this.cr(t).next(e=>e.targetCount)}getTargetData(t,e){const n=$e(e),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return an(t).X({range:s,index:xl},(a,u,l)=>{const d=cr(u);Lr(e,d.target)&&(i=d,l.done())}).next(()=>i)}addMatchingKeys(t,e,n){const s=[],i=le(t);return e.forEach(a=>{const u=bt(a.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(t,n,a))}),v.waitFor(s)}removeMatchingKeys(t,e,n){const s=le(t);return v.forEach(e,i=>{const a=bt(i.path);return v.waitFor([s.delete([n,a]),this.referenceDelegate.removeReference(t,n,i)])})}removeMatchingKeysForTargetId(t,e){const n=le(t),s=IDBKeyRange.bound([e],[e+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(t,e){const n=IDBKeyRange.bound([e],[e+1],!1,!0),s=le(t);let i=z();return s.X({range:n,Z:!0},(a,u,l)=>{const d=zt(a[1]),m=new N(d);i=i.add(m)}).next(()=>i)}containsKey(t,e){const n=bt(e.path),s=IDBKeyRange.bound([n],[vl(n)],!1,!0);let i=0;return le(t).X({index:Mo,Z:!0,range:s},([a,u],l,d)=>{a!==0&&(i++,d.done())}).next(()=>i>0)}Et(t,e){return an(t).get(e).next(n=>n?cr(n):null)}}function an(r){return ft(r,yn)}function Rc(r){return ft(r,Be)}function le(r){return ft(r,In)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc="LruGarbageCollector",jh=1048576;function Vc([r,t],[e,n]){const s=j(r,e);return s===0?j(t,n):s}class Dp{constructor(t){this.Tr=t,this.buffer=new J(Vc),this.Ir=0}dr(){return++this.Ir}Er(t){const e=[t,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(e);else{const n=this.buffer.last();Vc(e,n)<0&&(this.buffer=this.buffer.delete(n).add(e))}}get maxValue(){return this.buffer.last()[0]}}class qh{constructor(t,e,n){this.garbageCollector=t,this.asyncQueue=e,this.localStore=n,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(t){V(Pc,`Garbage collection scheduled in ${t}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Te(e)?V(Pc,"Ignoring IndexedDB error during garbage collection: ",e):await Ee(e)}await this.Rr(3e5)})}}class xp{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.mr(t).next(n=>Math.floor(e/100*n))}nthSequenceNumber(t,e){if(e===0)return v.resolve(Ct.ue);const n=new Dp(e);return this.Vr.forEachTarget(t,s=>n.Er(s.sequenceNumber)).next(()=>this.Vr.gr(t,s=>n.Er(s))).next(()=>n.maxValue)}removeTargets(t,e,n){return this.Vr.removeTargets(t,e,n)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),v.resolve(Sc)):this.getCacheSize(t).next(n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Sc):this.pr(t,e))}getCacheSize(t){return this.Vr.getCacheSize(t)}pr(t,e){let n,s,i,a,u,l,d;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(t,s))).next(g=>(n=g,u=Date.now(),this.removeTargets(t,n,e))).next(g=>(i=g,l=Date.now(),this.removeOrphanedDocuments(t,n))).next(g=>(d=Date.now(),un()<=W.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${i} targets in `+(l-u)+`ms
	Removed ${g} documents in `+(d-l)+`ms
Total Duration: ${d-m}ms`),v.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:g})))}}function zh(r,t){return new xp(r,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(t,e){this.db=t,this.garbageCollector=zh(this,e)}mr(t){const e=this.yr(t);return this.db.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}yr(t){let e=0;return this.gr(t,n=>{e++}).next(()=>e)}forEachTarget(t,e){return this.db.getTargetCache().forEachTarget(t,e)}gr(t,e){return this.wr(t,(n,s)=>e(s))}addReference(t,e,n){return ds(t,n)}removeReference(t,e,n){return ds(t,n)}removeTargets(t,e,n){return this.db.getTargetCache().removeTargets(t,e,n)}markPotentiallyOrphaned(t,e){return ds(t,e)}Sr(t,e){return function(s,i){let a=!1;return Uh(s).ee(u=>Bh(s,u,i).next(l=>(l&&(a=!0),v.resolve(!l)))).next(()=>a)}(t,e)}removeOrphanedDocuments(t,e){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.wr(t,(a,u)=>{if(u<=e){const l=this.Sr(t,a).next(d=>{if(!d)return i++,n.getEntry(t,a).next(()=>(n.removeEntry(a,B.min()),le(t).delete(function(g){return[0,bt(g.path)]}(a))))});s.push(l)}}).next(()=>v.waitFor(s)).next(()=>n.apply(t)).next(()=>i)}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(t,n)}updateLimboDocument(t,e){return ds(t,e)}wr(t,e){const n=le(t);let s,i=Ct.ue;return n.X({index:Mo},([a,u],{path:l,sequenceNumber:d})=>{a===0?(i!==Ct.ue&&e(new N(zt(s)),i),i=d,s=l):i=Ct.ue}).next(()=>{i!==Ct.ue&&e(new N(zt(s)),i)})}getCacheSize(t){return this.db.getRemoteDocumentCache().getSize(t)}}function ds(r,t){return le(r).put(function(n,s){return{targetId:0,path:bt(n.path),sequenceNumber:s}}(t,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(){this.changes=new ne(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,ut.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const n=this.changes.get(e);return n!==void 0?v.resolve(n):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(t){this.serializer=t}setIndexManager(t){this.indexManager=t}addEntry(t,e,n){return Pe(t).put(n)}removeEntry(t,e,n){return Pe(t).delete(function(i,a){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],qs(a),u[u.length-1]]}(e,n))}updateMetadata(t,e){return this.getMetadata(t).next(n=>(n.byteSize+=e,this.br(t,n)))}getEntry(t,e){let n=ut.newInvalidDocument(e);return Pe(t).X({index:ys,range:IDBKeyRange.only(sr(e))},(s,i)=>{n=this.Dr(e,i)}).next(()=>n)}vr(t,e){let n={size:0,document:ut.newInvalidDocument(e)};return Pe(t).X({index:ys,range:IDBKeyRange.only(sr(e))},(s,i)=>{n={document:this.Dr(e,i),size:$s(i)}}).next(()=>n)}getEntries(t,e){let n=Nt();return this.Cr(t,e,(s,i)=>{const a=this.Dr(s,i);n=n.insert(s,a)}).next(()=>n)}Fr(t,e){let n=Nt(),s=new rt(N.comparator);return this.Cr(t,e,(i,a)=>{const u=this.Dr(i,a);n=n.insert(i,u),s=s.insert(i,$s(a))}).next(()=>({documents:n,Mr:s}))}Cr(t,e,n){if(e.isEmpty())return v.resolve();let s=new J(xc);e.forEach(l=>s=s.add(l));const i=IDBKeyRange.bound(sr(s.first()),sr(s.last())),a=s.getIterator();let u=a.getNext();return Pe(t).X({index:ys,range:i},(l,d,m)=>{const g=N.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;u&&xc(u,g)<0;)n(u,null),u=a.getNext();u&&u.isEqual(g)&&(n(u,d),u=a.hasNext()?a.getNext():null),u?m.G(sr(u)):m.done()}).next(()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null})}getDocumentsMatchingQuery(t,e,n,s,i){const a=e.path,u=[a.popLast().toArray(),a.lastSegment(),qs(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],l=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Pe(t).j(IDBKeyRange.bound(u,l,!0)).next(d=>{i==null||i.incrementDocumentReadCount(d.length);let m=Nt();for(const g of d){const A=this.Dr(N.fromSegments(g.prefixPath.concat(g.collectionGroup,g.documentId)),g);A.isFoundDocument()&&(Br(e,A)||s.has(A.key))&&(m=m.insert(A.key,A))}return m})}getAllFromCollectionGroup(t,e,n,s){let i=Nt();const a=Dc(e,n),u=Dc(e,Mt.max());return Pe(t).X({index:Dl,range:IDBKeyRange.bound(a,u,!0)},(l,d,m)=>{const g=this.Dr(N.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);i=i.insert(g.key,g),i.size===s&&m.done()}).next(()=>i)}newChangeBuffer(t){return new Op(this,!!t&&t.trackRemovals)}getSize(t){return this.getMetadata(t).next(e=>e.byteSize)}getMetadata(t){return Cc(t).get(oo).next(e=>(L(!!e,20021),e))}br(t,e){return Cc(t).put(oo,e)}Dr(t,e){if(e){const n=Ep(this.serializer,e);if(!(n.isNoDocument()&&n.version.isEqual(B.min())))return n}return ut.newInvalidDocument(t)}}function Kh(r){return new kp(r)}class Op extends $h{constructor(t,e){super(),this.Or=t,this.trackRemovals=e,this.Nr=new ne(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(t){const e=[];let n=0,s=new J((i,a)=>j(i.canonicalString(),a.canonicalString()));return this.changes.forEach((i,a)=>{const u=this.Nr.get(i);if(e.push(this.Or.removeEntry(t,i,u.readTime)),a.isValidDocument()){const l=fc(this.Or.serializer,a);s=s.add(i.path.popLast());const d=$s(l);n+=d-u.size,e.push(this.Or.addEntry(t,i,l))}else if(n-=u.size,this.trackRemovals){const l=fc(this.Or.serializer,a.convertToNoDocument(B.min()));e.push(this.Or.addEntry(t,i,l))}}),s.forEach(i=>{e.push(this.Or.indexManager.addToCollectionParentIndex(t,i))}),e.push(this.Or.updateMetadata(t,n)),v.waitFor(e)}getFromCache(t,e){return this.Or.vr(t,e).next(n=>(this.Nr.set(e,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(t,e){return this.Or.Fr(t,e).next(({documents:n,Mr:s})=>(s.forEach((i,a)=>{this.Nr.set(i,{size:a,readTime:n.get(i).readTime})}),n))}}function Cc(r){return ft(r,Sr)}function Pe(r){return ft(r,ks)}function sr(r){const t=r.path.toArray();return[t.slice(0,t.length-2),t[t.length-2],t[t.length-1]]}function Dc(r,t){const e=t.documentKey.path.toArray();return[r,qs(t.readTime),e.slice(0,e.length-2),e.length>0?e[e.length-1]:""]}function xc(r,t){const e=r.path.toArray(),n=t.path.toArray();let s=0;for(let i=0;i<e.length-2&&i<n.length-2;++i)if(s=j(e[i],n[i]),s)return s;return s=j(e.length,n.length),s||(s=j(e[e.length-2],n[n.length-2]),s||j(e[e.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gh{constructor(t,e,n,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=n,this.indexManager=s}getDocument(t,e){let n=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(n=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(n!==null&&yr(n.mutation,s,Lt.empty(),Y.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.getLocalViewOfDocuments(t,n,z()).next(()=>n))}getLocalViewOfDocuments(t,e,n=z()){const s=$t();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,n).next(i=>{let a=ar();return i.forEach((u,l)=>{a=a.insert(u,l.overlayedDocument)}),a}))}getOverlayedDocuments(t,e){const n=$t();return this.populateOverlays(t,n,e).next(()=>this.computeViews(t,e,n,z()))}populateOverlays(t,e,n){const s=[];return n.forEach(i=>{e.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((a,u)=>{e.set(a,u)})})}computeViews(t,e,n,s){let i=Nt();const a=_r(),u=function(){return _r()}();return e.forEach((l,d)=>{const m=n.get(d.key);s.has(d.key)&&(m===void 0||m.mutation instanceof ve)?i=i.insert(d.key,d):m!==void 0?(a.set(d.key,m.mutation.getFieldMask()),yr(m.mutation,d,m.mutation.getFieldMask(),Y.now())):a.set(d.key,Lt.empty())}),this.recalculateAndSaveOverlays(t,i).next(l=>(l.forEach((d,m)=>a.set(d,m)),e.forEach((d,m)=>{var g;return u.set(d,new Mp(m,(g=a.get(d))!==null&&g!==void 0?g:null))}),u))}recalculateAndSaveOverlays(t,e){const n=_r();let s=new rt((a,u)=>a-u),i=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(a=>{for(const u of a)u.keys().forEach(l=>{const d=e.get(l);if(d===null)return;let m=n.get(l)||Lt.empty();m=u.applyToLocalView(d,m),n.set(l,m);const g=(s.get(u.batchId)||z()).add(l);s=s.insert(u.batchId,g)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const l=u.getNext(),d=l.key,m=l.value,g=ch();m.forEach(A=>{if(!i.has(A)){const R=gh(e.get(A),n.get(A));R!==null&&g.set(A,R),i=i.add(A)}}),a.push(this.documentOverlayCache.saveOverlays(t,d,g))}return v.waitFor(a)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(n=>this.recalculateAndSaveOverlays(t,n))}getDocumentsMatchingQuery(t,e,n,s){return function(a){return N.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):qg(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,n,s):this.getDocumentsMatchingCollectionQuery(t,e,n,s)}getNextDocuments(t,e,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,n,s).next(i=>{const a=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,n.largestBatchId,s-i.size):v.resolve($t());let u=pn,l=i;return a.next(d=>v.forEach(d,(m,g)=>(u<g.largestBatchId&&(u=g.largestBatchId),i.get(m)?v.resolve():this.remoteDocumentCache.getEntry(t,m).next(A=>{l=l.insert(m,A)}))).next(()=>this.populateOverlays(t,d,i)).next(()=>this.computeViews(t,l,d,z())).next(m=>({batchId:u,changes:uh(m)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new N(e)).next(n=>{let s=ar();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,n,s){const i=e.collectionGroup;let a=ar();return this.indexManager.getCollectionParents(t,i).next(u=>v.forEach(u,l=>{const d=function(g,A){return new si(A,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(e,l.child(i));return this.getDocumentsMatchingCollectionQuery(t,d,n,s).next(m=>{m.forEach((g,A)=>{a=a.insert(g,A)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(t,e,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,n.largestBatchId).next(a=>(i=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,n,i,s))).next(a=>{i.forEach((l,d)=>{const m=d.getKey();a.get(m)===null&&(a=a.insert(m,ut.newInvalidDocument(m)))});let u=ar();return a.forEach((l,d)=>{const m=i.get(l);m!==void 0&&yr(m.mutation,d,Lt.empty(),Y.now()),Br(e,d)&&(u=u.insert(l,d))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(t){this.serializer=t,this.Br=new Map,this.Lr=new Map}getBundleMetadata(t,e){return v.resolve(this.Br.get(e))}saveBundleMetadata(t,e){return this.Br.set(e.id,function(s){return{id:s.id,version:s.version,createTime:Pt(s.createTime)}}(e)),v.resolve()}getNamedQuery(t,e){return v.resolve(this.Lr.get(e))}saveNamedQuery(t,e){return this.Lr.set(e.name,function(s){return{name:s.name,query:kh(s.bundledQuery),readTime:Pt(s.readTime)}}(e)),v.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(){this.overlays=new rt(N.comparator),this.kr=new Map}getOverlay(t,e){return v.resolve(this.overlays.get(e))}getOverlays(t,e){const n=$t();return v.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}saveOverlays(t,e,n){return n.forEach((s,i)=>{this.wt(t,e,i)}),v.resolve()}removeOverlaysForBatchId(t,e,n){const s=this.kr.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.kr.delete(n)),v.resolve()}getOverlaysForCollection(t,e,n){const s=$t(),i=e.length+1,a=new N(e.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const l=u.getNext().value,d=l.getKey();if(!e.isPrefixOf(d.path))break;d.path.length===i&&l.largestBatchId>n&&s.set(l.getKey(),l)}return v.resolve(s)}getOverlaysForCollectionGroup(t,e,n,s){let i=new rt((d,m)=>d-m);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===e&&d.largestBatchId>n){let m=i.get(d.largestBatchId);m===null&&(m=$t(),i=i.insert(d.largestBatchId,m)),m.set(d.getKey(),d)}}const u=$t(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,m)=>u.set(d,m)),!(u.size()>=s)););return v.resolve(u)}wt(t,e,n){const s=this.overlays.get(n.key);if(s!==null){const a=this.kr.get(s.largestBatchId).delete(n.key);this.kr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Xo(e,n));let i=this.kr.get(e);i===void 0&&(i=z(),this.kr.set(e,i)),this.kr.set(e,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(){this.sessionToken=lt.EMPTY_BYTE_STRING}getSessionToken(t){return v.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,v.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(){this.qr=new J(mt.Qr),this.$r=new J(mt.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(t,e){const n=new mt(t,e);this.qr=this.qr.add(n),this.$r=this.$r.add(n)}Kr(t,e){t.forEach(n=>this.addReference(n,e))}removeReference(t,e){this.Wr(new mt(t,e))}Gr(t,e){t.forEach(n=>this.removeReference(n,e))}zr(t){const e=new N(new Z([])),n=new mt(e,t),s=new mt(e,t+1),i=[];return this.$r.forEachInRange([n,s],a=>{this.Wr(a),i.push(a.key)}),i}jr(){this.qr.forEach(t=>this.Wr(t))}Wr(t){this.qr=this.qr.delete(t),this.$r=this.$r.delete(t)}Jr(t){const e=new N(new Z([])),n=new mt(e,t),s=new mt(e,t+1);let i=z();return this.$r.forEachInRange([n,s],a=>{i=i.add(a.key)}),i}containsKey(t){const e=new mt(t,0),n=this.qr.firstAfterOrEqual(e);return n!==null&&t.isEqual(n.key)}}class mt{constructor(t,e){this.key=t,this.Hr=e}static Qr(t,e){return N.comparator(t.key,e.key)||j(t.Hr,e.Hr)}static Ur(t,e){return j(t.Hr,e.Hr)||N.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.er=1,this.Yr=new J(mt.Qr)}checkEmpty(t){return v.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,n,s){const i=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Ho(i,e,n,s);this.mutationQueue.push(a);for(const u of s)this.Yr=this.Yr.add(new mt(u.key,i)),this.indexManager.addToCollectionParentIndex(t,u.key.path.popLast());return v.resolve(a)}lookupMutationBatch(t,e){return v.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const n=e+1,s=this.Xr(n),i=s<0?0:s;return v.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return v.resolve(this.mutationQueue.length===0?Le:this.er-1)}getAllMutationBatches(t){return v.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const n=new mt(e,0),s=new mt(e,Number.POSITIVE_INFINITY),i=[];return this.Yr.forEachInRange([n,s],a=>{const u=this.Zr(a.Hr);i.push(u)}),v.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let n=new J(j);return e.forEach(s=>{const i=new mt(s,0),a=new mt(s,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([i,a],u=>{n=n.add(u.Hr)})}),v.resolve(this.ei(n))}getAllMutationBatchesAffectingQuery(t,e){const n=e.path,s=n.length+1;let i=n;N.isDocumentKey(i)||(i=i.child(""));const a=new mt(new N(i),0);let u=new J(j);return this.Yr.forEachWhile(l=>{const d=l.key.path;return!!n.isPrefixOf(d)&&(d.length===s&&(u=u.add(l.Hr)),!0)},a),v.resolve(this.ei(u))}ei(t){const e=[];return t.forEach(n=>{const s=this.Zr(n);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){L(this.ti(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Yr;return v.forEach(e.mutations,s=>{const i=new mt(s.key,e.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.Yr=n})}rr(t){}containsKey(t,e){const n=new mt(e,0),s=this.Yr.firstAfterOrEqual(n);return v.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,v.resolve()}ti(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(t){this.ni=t,this.docs=function(){return new rt(N.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const n=e.key,s=this.docs.get(n),i=s?s.size:0,a=this.ni(e);return this.docs=this.docs.insert(n,{document:e.mutableCopy(),size:a}),this.size+=a-i,this.indexManager.addToCollectionParentIndex(t,n.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const n=this.docs.get(e);return v.resolve(n?n.document.mutableCopy():ut.newInvalidDocument(e))}getEntries(t,e){let n=Nt();return e.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():ut.newInvalidDocument(s))}),v.resolve(n)}getDocumentsMatchingQuery(t,e,n,s){let i=Nt();const a=e.path,u=new N(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(u);for(;l.hasNext();){const{key:d,value:{document:m}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||ko(bl(m),n)<=0||(s.has(m.key)||Br(e,m))&&(i=i.insert(m.key,m.mutableCopy()))}return v.resolve(i)}getAllFromCollectionGroup(t,e,n,s){M(9500)}ri(t,e){return v.forEach(this.docs,n=>e(n))}newChangeBuffer(t){return new qp(this)}getSize(t){return v.resolve(this.size)}}class qp extends $h{constructor(t){super(),this.Or=t}applyChanges(t){const e=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?e.push(this.Or.addEntry(t,s)):this.Or.removeEntry(n)}),v.waitFor(e)}getFromCache(t,e){return this.Or.getEntry(t,e)}getAllFromCache(t,e){return this.Or.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(t){this.persistence=t,this.ii=new ne(e=>$e(e),Lr),this.lastRemoteSnapshotVersion=B.min(),this.highestTargetId=0,this.si=0,this.oi=new ea,this.targetCount=0,this._i=We.ar()}forEachTarget(t,e){return this.ii.forEach((n,s)=>e(s)),v.resolve()}getLastRemoteSnapshotVersion(t){return v.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return v.resolve(this.si)}allocateTargetId(t){return this.highestTargetId=this._i.next(),v.resolve(this.highestTargetId)}setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.si&&(this.si=e),v.resolve()}hr(t){this.ii.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this._i=new We(e),this.highestTargetId=e),t.sequenceNumber>this.si&&(this.si=t.sequenceNumber)}addTargetData(t,e){return this.hr(e),this.targetCount+=1,v.resolve()}updateTargetData(t,e){return this.hr(e),v.resolve()}removeTargetData(t,e){return this.ii.delete(e.target),this.oi.zr(e.targetId),this.targetCount-=1,v.resolve()}removeTargets(t,e,n){let s=0;const i=[];return this.ii.forEach((a,u)=>{u.sequenceNumber<=e&&n.get(u.targetId)===null&&(this.ii.delete(a),i.push(this.removeMatchingKeysForTargetId(t,u.targetId)),s++)}),v.waitFor(i).next(()=>s)}getTargetCount(t){return v.resolve(this.targetCount)}getTargetData(t,e){const n=this.ii.get(e)||null;return v.resolve(n)}addMatchingKeys(t,e,n){return this.oi.Kr(e,n),v.resolve()}removeMatchingKeys(t,e,n){this.oi.Gr(e,n);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(a=>{i.push(s.markPotentiallyOrphaned(t,a))}),v.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.oi.zr(e),v.resolve()}getMatchingKeysForTargetId(t,e){const n=this.oi.Jr(e);return v.resolve(n)}containsKey(t,e){return v.resolve(this.oi.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(t,e){this.ai={},this.overlays={},this.ui=new Ct(0),this.ci=!1,this.ci=!0,this.li=new Bp,this.referenceDelegate=t(this),this.hi=new zp(this),this.indexManager=new Pp,this.remoteDocumentCache=function(s){return new jp(s)}(n=>this.referenceDelegate.Pi(n)),this.serializer=new xh(e),this.Ti=new Fp(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Lp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let n=this.ai[t.toKey()];return n||(n=new Up(e,this.referenceDelegate),this.ai[t.toKey()]=n),n}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(t,e,n){V("MemoryPersistence","Starting transaction:",t);const s=new $p(this.ui.next());return this.referenceDelegate.Ii(),n(s).next(i=>this.referenceDelegate.di(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Ei(t,e){return v.or(Object.values(this.ai).map(n=>()=>n.containsKey(t,e)))}}class $p extends Rl{constructor(t){super(),this.currentSequenceNumber=t}}class hi{constructor(t){this.persistence=t,this.Ai=new ea,this.Ri=null}static Vi(t){return new hi(t)}get mi(){if(this.Ri)return this.Ri;throw M(60996)}addReference(t,e,n){return this.Ai.addReference(n,e),this.mi.delete(n.toString()),v.resolve()}removeReference(t,e,n){return this.Ai.removeReference(n,e),this.mi.add(n.toString()),v.resolve()}markPotentiallyOrphaned(t,e){return this.mi.add(e.toString()),v.resolve()}removeTarget(t,e){this.Ai.zr(e.targetId).forEach(s=>this.mi.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(i=>this.mi.add(i.toString()))}).next(()=>n.removeTargetData(t,e))}Ii(){this.Ri=new Set}di(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return v.forEach(this.mi,n=>{const s=N.fromPath(n);return this.fi(t,s).next(i=>{i||e.removeEntry(s,B.min())})}).next(()=>(this.Ri=null,e.apply(t)))}updateLimboDocument(t,e){return this.fi(t,e).next(n=>{n?this.mi.delete(e.toString()):this.mi.add(e.toString())})}Pi(t){return 0}fi(t,e){return v.or([()=>v.resolve(this.Ai.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ei(t,e)])}}class Ks{constructor(t,e){this.persistence=t,this.gi=new ne(n=>bt(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=zh(this,e)}static Vi(t,e){return new Ks(t,e)}Ii(){}di(t){return v.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}mr(t){const e=this.yr(t);return this.persistence.getTargetCache().getTargetCount(t).next(n=>e.next(s=>n+s))}yr(t){let e=0;return this.gr(t,n=>{e++}).next(()=>e)}gr(t,e){return v.forEach(this.gi,(n,s)=>this.Sr(t,n,s).next(i=>i?v.resolve():e(s)))}removeTargets(t,e,n){return this.persistence.getTargetCache().removeTargets(t,e,n)}removeOrphanedDocuments(t,e){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ri(t,a=>this.Sr(t,a,e).next(u=>{u||(n++,i.removeEntry(a,B.min()))})).next(()=>i.apply(t)).next(()=>n)}markPotentiallyOrphaned(t,e){return this.gi.set(e,t.currentSequenceNumber),v.resolve()}removeTarget(t,e){const n=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,n)}addReference(t,e,n){return this.gi.set(n,t.currentSequenceNumber),v.resolve()}removeReference(t,e,n){return this.gi.set(n,t.currentSequenceNumber),v.resolve()}updateLimboDocument(t,e){return this.gi.set(e,t.currentSequenceNumber),v.resolve()}Pi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=Es(t.data.value)),e}Sr(t,e,n){return v.or([()=>this.persistence.Ei(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.gi.get(e);return v.resolve(s!==void 0&&s>n)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(t){this.serializer=t}q(t,e,n,s){const i=new Ys("createOrUpgrade",e);n<1&&s>=1&&(function(l){l.createObjectStore(Fr)}(t),function(l){l.createObjectStore(br,{keyPath:ig}),l.createObjectStore(Ut,{keyPath:zu,autoIncrement:!0}).createIndex(Me,$u,{unique:!0}),l.createObjectStore(_n)}(t),Nc(t),function(l){l.createObjectStore(De)}(t));let a=v.resolve();return n<3&&s>=3&&(n!==0&&(function(l){l.deleteObjectStore(In),l.deleteObjectStore(yn),l.deleteObjectStore(Be)}(t),Nc(t)),a=a.next(()=>function(l){const d=l.store(Be),m={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:B.min().toTimestamp(),targetCount:0};return d.put(Os,m)}(i))),n<4&&s>=4&&(n!==0&&(a=a.next(()=>function(l,d){return d.store(Ut).j().next(g=>{l.deleteObjectStore(Ut),l.createObjectStore(Ut,{keyPath:zu,autoIncrement:!0}).createIndex(Me,$u,{unique:!0});const A=d.store(Ut),R=g.map(C=>A.put(C));return v.waitFor(R)})}(t,i))),a=a.next(()=>{(function(l){l.createObjectStore(En,{keyPath:mg})})(t)})),n<5&&s>=5&&(a=a.next(()=>this.pi(i))),n<6&&s>=6&&(a=a.next(()=>(function(l){l.createObjectStore(Sr)}(t),this.yi(i)))),n<7&&s>=7&&(a=a.next(()=>this.wi(i))),n<8&&s>=8&&(a=a.next(()=>this.Si(t,i))),n<9&&s>=9&&(a=a.next(()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(t)})),n<10&&s>=10&&(a=a.next(()=>this.bi(i))),n<11&&s>=11&&(a=a.next(()=>{(function(l){l.createObjectStore(Zs,{keyPath:gg})})(t),function(l){l.createObjectStore(ti,{keyPath:pg})}(t)})),n<12&&s>=12&&(a=a.next(()=>{(function(l){const d=l.createObjectStore(ei,{keyPath:wg});d.createIndex(uo,Ag,{unique:!1}),d.createIndex(Ol,bg,{unique:!1})})(t)})),n<13&&s>=13&&(a=a.next(()=>function(l){const d=l.createObjectStore(ks,{keyPath:ag});d.createIndex(ys,ug),d.createIndex(Dl,cg)}(t)).next(()=>this.Di(t,i)).next(()=>t.deleteObjectStore(De))),n<14&&s>=14&&(a=a.next(()=>this.Ci(t,i))),n<15&&s>=15&&(a=a.next(()=>function(l){l.createObjectStore(Fo,{keyPath:_g,autoIncrement:!0}).createIndex(ao,yg,{unique:!1}),l.createObjectStore(fr,{keyPath:Ig}).createIndex(Nl,Eg,{unique:!1}),l.createObjectStore(mr,{keyPath:Tg}).createIndex(kl,vg,{unique:!1})}(t))),n<16&&s>=16&&(a=a.next(()=>{e.objectStore(fr).clear()}).next(()=>{e.objectStore(mr).clear()})),n<17&&s>=17&&(a=a.next(()=>{(function(l){l.createObjectStore(Lo,{keyPath:Sg})})(t)})),n<18&&s>=18&&ol()&&(a=a.next(()=>{e.objectStore(fr).clear()}).next(()=>{e.objectStore(mr).clear()})),a}yi(t){let e=0;return t.store(De).X((n,s)=>{e+=$s(s)}).next(()=>{const n={byteSize:e};return t.store(Sr).put(oo,n)})}pi(t){const e=t.store(br),n=t.store(Ut);return e.j().next(s=>v.forEach(s,i=>{const a=IDBKeyRange.bound([i.userId,Le],[i.userId,i.lastAcknowledgedBatchId]);return n.j(Me,a).next(u=>v.forEach(u,l=>{L(l.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const d=Ne(this.serializer,l);return Lh(t,i.userId,d).next(()=>{})}))}))}wi(t){const e=t.store(In),n=t.store(De);return t.store(Be).get(Os).next(s=>{const i=[];return n.X((a,u)=>{const l=new Z(a),d=function(g){return[0,bt(g)]}(l);i.push(e.get(d).next(m=>m?v.resolve():(g=>e.put({targetId:0,path:bt(g),sequenceNumber:s.highestListenSequenceNumber}))(l)))}).next(()=>v.waitFor(i))})}Si(t,e){t.createObjectStore(Rr,{keyPath:fg});const n=e.store(Rr),s=new ta,i=a=>{if(s.add(a)){const u=a.lastSegment(),l=a.popLast();return n.put({collectionId:u,parent:bt(l)})}};return e.store(De).X({Z:!0},(a,u)=>{const l=new Z(a);return i(l.popLast())}).next(()=>e.store(_n).X({Z:!0},([a,u,l],d)=>{const m=zt(u);return i(m.popLast())}))}bi(t){const e=t.store(yn);return e.X((n,s)=>{const i=cr(s),a=Nh(this.serializer,i);return e.put(a)})}Di(t,e){const n=e.store(De),s=[];return n.X((i,a)=>{const u=e.store(ks),l=function(g){return g.document?new N(Z.fromString(g.document.name).popFirst(5)):g.noDocument?N.fromSegments(g.noDocument.path):g.unknownDocument?N.fromSegments(g.unknownDocument.path):M(36783)}(a).path.toArray(),d={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};s.push(u.put(d))}).next(()=>v.waitFor(s))}Ci(t,e){const n=e.store(Ut),s=Kh(this.serializer),i=new na(hi.Vi,this.serializer.gt);return n.j().next(a=>{const u=new Map;return a.forEach(l=>{var d;let m=(d=u.get(l.userId))!==null&&d!==void 0?d:z();Ne(this.serializer,l).keys().forEach(g=>m=m.add(g)),u.set(l.userId,m)}),v.forEach(u,(l,d)=>{const m=new wt(d),g=ci.yt(this.serializer,m),A=i.getIndexManager(m),R=li.yt(m,this.serializer,A,i.referenceDelegate);return new Gh(s,R,g,A).recalculateAndSaveOverlaysForDocumentKeys(new co(e,Ct.ue),l).next()})})}}function Nc(r){r.createObjectStore(In,{keyPath:hg}).createIndex(Mo,dg,{unique:!0}),r.createObjectStore(yn,{keyPath:"targetId"}).createIndex(xl,lg,{unique:!0}),r.createObjectStore(Be)}const ce="IndexedDbPersistence",Ki=18e5,Gi=5e3,Wi="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",Gp="main";class ra{constructor(t,e,n,s,i,a,u,l,d,m,g=18){if(this.allowTabSynchronization=t,this.persistenceKey=e,this.clientId=n,this.Fi=i,this.window=a,this.document=u,this.Mi=d,this.xi=m,this.Oi=g,this.ui=null,this.ci=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ni=null,this.inForeground=!1,this.Bi=null,this.Li=null,this.ki=Number.NEGATIVE_INFINITY,this.qi=A=>Promise.resolve(),!ra.C())throw new O(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Np(this,s),this.Qi=e+Gp,this.serializer=new xh(l),this.$i=new me(this.Qi,this.Oi,new Kp(this.serializer)),this.li=new vp,this.hi=new Cp(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Kh(this.serializer),this.Ti=new Tp,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,m===!1&&ct(ce,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ki().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new O(P.FAILED_PRECONDITION,Wi);return this.Wi(),this.Gi(),this.zi(),this.runTransaction("getHighestListenSequenceNumber","readonly",t=>this.hi.getHighestSequenceNumber(t))}).then(t=>{this.ui=new Ct(t,this.Mi)}).then(()=>{this.ci=!0}).catch(t=>(this.$i&&this.$i.close(),Promise.reject(t)))}ji(t){return this.qi=async e=>{if(this.started)return t(e)},t(this.isPrimary)}setDatabaseDeletedListener(t){this.$i.setDatabaseDeletedListener(t)}setNetworkEnabled(t){this.networkEnabled!==t&&(this.networkEnabled=t,this.Fi.enqueueAndForget(async()=>{this.started&&await this.Ki()}))}Ki(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",t=>fs(t).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Ji(t).next(e=>{e||(this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)))})}).next(()=>this.Hi(t)).next(e=>this.isPrimary&&!e?this.Yi(t).next(()=>!1):!!e&&this.Zi(t).next(()=>!0))).catch(t=>{if(Te(t))return V(ce,"Failed to extend owner lease: ",t),this.isPrimary;if(!this.allowTabSynchronization)throw t;return V(ce,"Releasing owner lease after error during lease refresh",t),!1}).then(t=>{this.isPrimary!==t&&this.Fi.enqueueRetryable(()=>this.qi(t)),this.isPrimary=t})}Ji(t){return ir(t).get(en).next(e=>v.resolve(this.Xi(e)))}es(t){return fs(t).delete(this.clientId)}async ts(){if(this.isPrimary&&!this.ns(this.ki,Ki)){this.ki=Date.now();const t=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",e=>{const n=ft(e,En);return n.j().next(s=>{const i=this.rs(s,Ki),a=s.filter(u=>i.indexOf(u)===-1);return v.forEach(a,u=>n.delete(u.clientId)).next(()=>a)})}).catch(()=>[]);if(this.Ui)for(const e of t)this.Ui.removeItem(this.ss(e.clientId))}}zi(){this.Li=this.Fi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ki().then(()=>this.ts()).then(()=>this.zi()))}Xi(t){return!!t&&t.ownerId===this.clientId}Hi(t){return this.xi?v.resolve(!0):ir(t).get(en).next(e=>{if(e!==null&&this.ns(e.leaseTimestampMs,Gi)&&!this._s(e.ownerId)){if(this.Xi(e)&&this.networkEnabled)return!0;if(!this.Xi(e)){if(!e.allowTabSynchronization)throw new O(P.FAILED_PRECONDITION,Wi);return!1}}return!(!this.networkEnabled||!this.inForeground)||fs(t).j().next(n=>this.rs(n,Gi).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,a=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||a&&u)return!0}return!1})===void 0)}).next(e=>(this.isPrimary!==e&&V(ce,`Client ${e?"is":"is not"} eligible for a primary lease.`),e))}async shutdown(){this.ci=!1,this.us(),this.Li&&(this.Li.cancel(),this.Li=null),this.cs(),this.ls(),await this.$i.runTransaction("shutdown","readwrite",[Fr,En],t=>{const e=new co(t,Ct.ue);return this.Yi(e).next(()=>this.es(e))}),this.$i.close(),this.hs()}rs(t,e){return t.filter(n=>this.ns(n.updateTimeMs,e)&&!this._s(n.clientId))}Ps(){return this.runTransaction("getActiveClients","readonly",t=>fs(t).j().next(e=>this.rs(e,Ki).map(n=>n.clientId)))}get started(){return this.ci}getGlobalsCache(){return this.li}getMutationQueue(t,e){return li.yt(t,this.serializer,e,this.referenceDelegate)}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(t){return new Vp(t,this.serializer.gt.databaseId)}getDocumentOverlayCache(t){return ci.yt(this.serializer,t)}getBundleCache(){return this.Ti}runTransaction(t,e,n){V(ce,"Starting transaction:",t);const s=e==="readonly"?"readonly":"readwrite",i=function(l){return l===18?Vg:l===17?Bl:l===16?Pg:l===15?Bo:l===14?Ll:l===13?Fl:l===12?Rg:l===11?Ml:void M(60245)}(this.Oi);let a;return this.$i.runTransaction(t,s,i,u=>(a=new co(u,this.ui?this.ui.next():Ct.ue),e==="readwrite-primary"?this.Ji(a).next(l=>!!l||this.Hi(a)).next(l=>{if(!l)throw ct(`Failed to obtain primary lease for action '${t}'.`),this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)),new O(P.FAILED_PRECONDITION,Sl);return n(a)}).next(l=>this.Zi(a).next(()=>l)):this.Ts(a).next(()=>n(a)))).then(u=>(a.raiseOnCommittedEvent(),u))}Ts(t){return ir(t).get(en).next(e=>{if(e!==null&&this.ns(e.leaseTimestampMs,Gi)&&!this._s(e.ownerId)&&!this.Xi(e)&&!(this.xi||this.allowTabSynchronization&&e.allowTabSynchronization))throw new O(P.FAILED_PRECONDITION,Wi)})}Zi(t){const e={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ir(t).put(en,e)}static C(){return me.C()}Yi(t){const e=ir(t);return e.get(en).next(n=>this.Xi(n)?(V(ce,"Releasing primary lease."),e.delete(en)):v.resolve())}ns(t,e){const n=Date.now();return!(t<n-e)&&(!(t>n)||(ct(`Detected an update time that is in the future: ${t} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Bi=()=>{this.Fi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ki()))},this.document.addEventListener("visibilitychange",this.Bi),this.inForeground=this.document.visibilityState==="visible")}cs(){this.Bi&&(this.document.removeEventListener("visibilitychange",this.Bi),this.Bi=null)}Gi(){var t;typeof((t=this.window)===null||t===void 0?void 0:t.addEventListener)=="function"&&(this.Ni=()=>{this.us();const e=/(?:Version|Mobile)\/1[456]/;il()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Fi.enterRestrictedMode(!0),this.Fi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ni))}ls(){this.Ni&&(this.window.removeEventListener("pagehide",this.Ni),this.Ni=null)}_s(t){var e;try{const n=((e=this.Ui)===null||e===void 0?void 0:e.getItem(this.ss(t)))!==null;return V(ce,`Client '${t}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ct(ce,"Failed to get zombied client id.",n),!1}}us(){if(this.Ui)try{this.Ui.setItem(this.ss(this.clientId),String(Date.now()))}catch(t){ct("Failed to set zombie client id.",t)}}hs(){if(this.Ui)try{this.Ui.removeItem(this.ss(this.clientId))}catch{}}ss(t){return`firestore_zombie_${this.persistenceKey}_${t}`}}function ir(r){return ft(r,Fr)}function fs(r){return ft(r,En)}function Wh(r,t){let e=r.projectId;return r.isDefaultDatabase||(e+="."+r.database),"firestore/"+t+"/"+e+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{constructor(t,e,n,s){this.targetId=t,this.fromCache=e,this.Is=n,this.ds=s}static Es(t,e){let n=z(),s=z();for(const i of e.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new sa(t,e.fromCache,n,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return il()?8:Pl(Rs())>0?6:4}()}initialize(t,e){this.gs=t,this.indexManager=e,this.As=!0}getDocumentsMatchingQuery(t,e,n,s){const i={result:null};return this.ps(t,e).next(a=>{i.result=a}).next(()=>{if(!i.result)return this.ys(t,e,s,n).next(a=>{i.result=a})}).next(()=>{if(i.result)return;const a=new Wp;return this.ws(t,e,a).next(u=>{if(i.result=u,this.Rs)return this.Ss(t,e,a,u.size)})}).next(()=>i.result)}Ss(t,e,n,s){return n.documentReadCount<this.Vs?(un()<=W.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",cn(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),v.resolve()):(un()<=W.DEBUG&&V("QueryEngine","Query:",cn(e),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.fs*s?(un()<=W.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",cn(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Ot(e))):v.resolve())}ps(t,e){if(rc(e))return v.resolve(null);let n=Ot(e);return this.indexManager.getIndexType(t,n).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=po(e,null,"F"),n=Ot(e)),this.indexManager.getDocumentsMatchingTarget(t,n).next(i=>{const a=z(...i);return this.gs.getDocuments(t,a).next(u=>this.indexManager.getMinOffset(t,n).next(l=>{const d=this.bs(e,u);return this.Ds(e,d,a,l.readTime)?this.ps(t,po(e,null,"F")):this.vs(t,d,e,l)}))})))}ys(t,e,n,s){return rc(e)||s.isEqual(B.min())?v.resolve(null):this.gs.getDocuments(t,n).next(i=>{const a=this.bs(e,i);return this.Ds(e,a,n,s)?v.resolve(null):(un()<=W.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),cn(e)),this.vs(t,a,e,Al(s,pn)).next(u=>u))})}bs(t,e){let n=new J(oh(t));return e.forEach((s,i)=>{Br(t,i)&&(n=n.add(i))}),n}Ds(t,e,n,s){if(t.limit===null)return!1;if(n.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}ws(t,e,n){return un()<=W.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",cn(e)),this.gs.getDocumentsMatchingQuery(t,e,Mt.min(),n)}vs(t,e,n,s){return this.gs.getDocumentsMatchingQuery(t,n,s).next(i=>(e.forEach(a=>{i=i.insert(a.key,a)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ia="LocalStore",Hp=3e8;class Qp{constructor(t,e,n,s){this.persistence=t,this.Cs=e,this.serializer=s,this.Fs=new rt(j),this.Ms=new ne(i=>$e(i),Lr),this.xs=new Map,this.Os=t.getRemoteDocumentCache(),this.hi=t.getTargetCache(),this.Ti=t.getBundleCache(),this.Ns(n)}Ns(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Gh(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.Fs))}}function Qh(r,t,e,n){return new Qp(r,t,e,n)}async function Xh(r,t){const e=F(r);return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,e.Ns(t),e.mutationQueue.getAllMutationBatches(n))).next(i=>{const a=[],u=[];let l=z();for(const d of s){a.push(d.batchId);for(const m of d.mutations)l=l.add(m.key)}for(const d of i){u.push(d.batchId);for(const m of d.mutations)l=l.add(m.key)}return e.localDocuments.getDocuments(n,l).next(d=>({Bs:d,removedBatchIds:a,addedBatchIds:u}))})})}function Xp(r,t){const e=F(r);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=t.batch.keys(),i=e.Os.newChangeBuffer({trackRemovals:!0});return function(u,l,d,m){const g=d.batch,A=g.keys();let R=v.resolve();return A.forEach(C=>{R=R.next(()=>m.getEntry(l,C)).next(k=>{const x=d.docVersions.get(C);L(x!==null,48541),k.version.compareTo(x)<0&&(g.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),m.addEntry(k)))})}),R.next(()=>u.mutationQueue.removeMutationBatch(l,g))}(e,n,t,i).next(()=>i.apply(n)).next(()=>e.mutationQueue.performConsistencyCheck(n)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(n,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let l=z();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(l=l.add(u.batch.mutations[d].key));return l}(t))).next(()=>e.localDocuments.getDocuments(n,s))})}function Yh(r){const t=F(r);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.hi.getLastRemoteSnapshotVersion(e))}function Yp(r,t){const e=F(r),n=t.snapshotVersion;let s=e.Fs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const a=e.Os.newChangeBuffer({trackRemovals:!0});s=e.Fs;const u=[];t.targetChanges.forEach((m,g)=>{const A=s.get(g);if(!A)return;u.push(e.hi.removeMatchingKeys(i,m.removedDocuments,g).next(()=>e.hi.addMatchingKeys(i,m.addedDocuments,g)));let R=A.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(g)!==null?R=R.withResumeToken(lt.EMPTY_BYTE_STRING,B.min()).withLastLimboFreeSnapshotVersion(B.min()):m.resumeToken.approximateByteSize()>0&&(R=R.withResumeToken(m.resumeToken,n)),s=s.insert(g,R),function(k,x,$){return k.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=Hp?!0:$.addedDocuments.size+$.modifiedDocuments.size+$.removedDocuments.size>0}(A,R,m)&&u.push(e.hi.updateTargetData(i,R))});let l=Nt(),d=z();if(t.documentUpdates.forEach(m=>{t.resolvedLimboDocuments.has(m)&&u.push(e.persistence.referenceDelegate.updateLimboDocument(i,m))}),u.push(Jp(i,a,t.documentUpdates).next(m=>{l=m.Ls,d=m.ks})),!n.isEqual(B.min())){const m=e.hi.getLastRemoteSnapshotVersion(i).next(g=>e.hi.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(m)}return v.waitFor(u).next(()=>a.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,l,d)).next(()=>l)}).then(i=>(e.Fs=s,i))}function Jp(r,t,e){let n=z(),s=z();return e.forEach(i=>n=n.add(i)),t.getEntries(r,n).next(i=>{let a=Nt();return e.forEach((u,l)=>{const d=i.get(u);l.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),l.isNoDocument()&&l.version.isEqual(B.min())?(t.removeEntry(u,l.readTime),a=a.insert(u,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(t.addEntry(l),a=a.insert(u,l)):V(ia,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",l.version)}),{Ls:a,ks:s}})}function Zp(r,t){const e=F(r);return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(t===void 0&&(t=Le),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}function Gs(r,t){const e=F(r);return e.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return e.hi.getTargetData(n,t).next(i=>i?(s=i,v.resolve(s)):e.hi.allocateTargetId(n).next(a=>(s=new Yt(t,a,"TargetPurposeListen",n.currentSequenceNumber),e.hi.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=e.Fs.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.Fs=e.Fs.insert(n.targetId,n),e.Ms.set(t,n.targetId)),n})}async function Pn(r,t,e){const n=F(r),s=n.Fs.get(t),i=e?"readwrite":"readwrite-primary";try{e||await n.persistence.runTransaction("Release target",i,a=>n.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!Te(a))throw a;V(ia,`Failed to update sequence numbers for target ${t}: ${a}`)}n.Fs=n.Fs.remove(t),n.Ms.delete(s.target)}function Ao(r,t,e){const n=F(r);let s=B.min(),i=z();return n.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,m){const g=F(l),A=g.Ms.get(m);return A!==void 0?v.resolve(g.Fs.get(A)):g.hi.getTargetData(d,m)}(n,a,Ot(t)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.hi.getMatchingKeysForTargetId(a,u.targetId).next(l=>{i=l})}).next(()=>n.Cs.getDocumentsMatchingQuery(a,t,e?s:B.min(),e?i:z())).next(u=>(td(n,ih(t),u),{documents:u,qs:i})))}function Jh(r,t){const e=F(r),n=F(e.hi),s=e.Fs.get(t);return s?Promise.resolve(s.target):e.persistence.runTransaction("Get target data","readonly",i=>n.Et(i,t).next(a=>a?a.target:null))}function Zh(r,t){const e=F(r),n=e.xs.get(t)||B.min();return e.persistence.runTransaction("Get new document changes","readonly",s=>e.Os.getAllFromCollectionGroup(s,t,Al(n,pn),Number.MAX_SAFE_INTEGER)).then(s=>(td(e,t,s),s))}function td(r,t,e){let n=r.xs.get(t)||B.min();e.forEach((s,i)=>{i.readTime.compareTo(n)>0&&(n=i.readTime)}),r.xs.set(t,n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ed="firestore_clients";function kc(r,t){return`${ed}_${r}_${t}`}const nd="firestore_mutations";function Oc(r,t,e){let n=`${nd}_${r}_${e}`;return t.isAuthenticated()&&(n+=`_${t.uid}`),n}const rd="firestore_targets";function Hi(r,t){return`${rd}_${r}_${t}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt="SharedClientState";class Ws{constructor(t,e,n,s){this.user=t,this.batchId=e,this.state=n,this.error=s}static Ks(t,e,n){const s=JSON.parse(n);let i,a=typeof s=="object"&&["pending","acknowledged","rejected"].indexOf(s.state)!==-1&&(s.error===void 0||typeof s.error=="object");return a&&s.error&&(a=typeof s.error.message=="string"&&typeof s.error.code=="string",a&&(i=new O(s.error.code,s.error.message))),a?new Ws(t,e,s.state,i):(ct(qt,`Failed to parse mutation state for ID '${e}': ${n}`),null)}Ws(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Ir{constructor(t,e,n){this.targetId=t,this.state=e,this.error=n}static Ks(t,e){const n=JSON.parse(e);let s,i=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return i&&n.error&&(i=typeof n.error.message=="string"&&typeof n.error.code=="string",i&&(s=new O(n.error.code,n.error.message))),i?new Ir(t,n.state,s):(ct(qt,`Failed to parse target state for ID '${t}': ${e}`),null)}Ws(){const t={state:this.state,updateTimeMs:Date.now()};return this.error&&(t.error={code:this.error.code,message:this.error.message}),JSON.stringify(t)}}class Hs{constructor(t,e){this.clientId=t,this.activeTargetIds=e}static Ks(t,e){const n=JSON.parse(e);let s=typeof n=="object"&&n.activeTargetIds instanceof Array,i=Ko();for(let a=0;s&&a<n.activeTargetIds.length;++a)s=Vl(n.activeTargetIds[a]),i=i.add(n.activeTargetIds[a]);return s?new Hs(t,i):(ct(qt,`Failed to parse client data for instance '${t}': ${e}`),null)}}class oa{constructor(t,e){this.clientId=t,this.onlineState=e}static Ks(t){const e=JSON.parse(t);return typeof e=="object"&&["Unknown","Online","Offline"].indexOf(e.onlineState)!==-1&&typeof e.clientId=="string"?new oa(e.clientId,e.onlineState):(ct(qt,`Failed to parse online state: ${t}`),null)}}class bo{constructor(){this.activeTargetIds=Ko()}Gs(t){this.activeTargetIds=this.activeTargetIds.add(t)}zs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class Qi{constructor(t,e,n,s,i){this.window=t,this.Fi=e,this.persistenceKey=n,this.js=s,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Js=this.Hs.bind(this),this.Ys=new rt(j),this.started=!1,this.Zs=[];const a=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=i,this.Xs=kc(this.persistenceKey,this.js),this.eo=function(l){return`firestore_sequence_number_${l}`}(this.persistenceKey),this.Ys=this.Ys.insert(this.js,new bo),this.no=new RegExp(`^${ed}_${a}_([^_]*)$`),this.ro=new RegExp(`^${nd}_${a}_(\\d+)(?:_(.*))?$`),this.io=new RegExp(`^${rd}_${a}_(\\d+)$`),this.so=function(l){return`firestore_online_state_${l}`}(this.persistenceKey),this.oo=function(l){return`firestore_bundle_loaded_v2_${l}`}(this.persistenceKey),this.window.addEventListener("storage",this.Js)}static C(t){return!(!t||!t.localStorage)}async start(){const t=await this.syncEngine.Ps();for(const n of t){if(n===this.js)continue;const s=this.getItem(kc(this.persistenceKey,n));if(s){const i=Hs.Ks(n,s);i&&(this.Ys=this.Ys.insert(i.clientId,i))}}this._o();const e=this.storage.getItem(this.so);if(e){const n=this.ao(e);n&&this.uo(n)}for(const n of this.Zs)this.Hs(n);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(t){this.setItem(this.eo,JSON.stringify(t))}getAllActiveQueryTargets(){return this.co(this.Ys)}isActiveQueryTarget(t){let e=!1;return this.Ys.forEach((n,s)=>{s.activeTargetIds.has(t)&&(e=!0)}),e}addPendingMutation(t){this.lo(t,"pending")}updateMutationState(t,e,n){this.lo(t,e,n),this.ho(t)}addLocalQueryTarget(t,e=!0){let n="not-current";if(this.isActiveQueryTarget(t)){const s=this.storage.getItem(Hi(this.persistenceKey,t));if(s){const i=Ir.Ks(t,s);i&&(n=i.state)}}return e&&this.Po.Gs(t),this._o(),n}removeLocalQueryTarget(t){this.Po.zs(t),this._o()}isLocalQueryTarget(t){return this.Po.activeTargetIds.has(t)}clearQueryState(t){this.removeItem(Hi(this.persistenceKey,t))}updateQueryState(t,e,n){this.To(t,e,n)}handleUserChange(t,e,n){e.forEach(s=>{this.ho(s)}),this.currentUser=t,n.forEach(s=>{this.addPendingMutation(s)})}setOnlineState(t){this.Io(t)}notifyBundleLoaded(t){this.Eo(t)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Js),this.removeItem(this.Xs),this.started=!1)}getItem(t){const e=this.storage.getItem(t);return V(qt,"READ",t,e),e}setItem(t,e){V(qt,"SET",t,e),this.storage.setItem(t,e)}removeItem(t){V(qt,"REMOVE",t),this.storage.removeItem(t)}Hs(t){const e=t;if(e.storageArea===this.storage){if(V(qt,"EVENT",e.key,e.newValue),e.key===this.Xs)return void ct("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Fi.enqueueRetryable(async()=>{if(this.started){if(e.key!==null){if(this.no.test(e.key)){if(e.newValue==null){const n=this.Ao(e.key);return this.Ro(n,null)}{const n=this.Vo(e.key,e.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.ro.test(e.key)){if(e.newValue!==null){const n=this.mo(e.key,e.newValue);if(n)return this.fo(n)}}else if(this.io.test(e.key)){if(e.newValue!==null){const n=this.po(e.key,e.newValue);if(n)return this.yo(n)}}else if(e.key===this.so){if(e.newValue!==null){const n=this.ao(e.newValue);if(n)return this.uo(n)}}else if(e.key===this.eo){const n=function(i){let a=Ct.ue;if(i!=null)try{const u=JSON.parse(i);L(typeof u=="number",30636,{wo:i}),a=u}catch(u){ct(qt,"Failed to read sequence number from WebStorage",u)}return a}(e.newValue);n!==Ct.ue&&this.sequenceNumberHandler(n)}else if(e.key===this.oo){const n=this.So(e.newValue);await Promise.all(n.map(s=>this.syncEngine.bo(s)))}}}else this.Zs.push(e)})}}get Po(){return this.Ys.get(this.js)}_o(){this.setItem(this.Xs,this.Po.Ws())}lo(t,e,n){const s=new Ws(this.currentUser,t,e,n),i=Oc(this.persistenceKey,this.currentUser,t);this.setItem(i,s.Ws())}ho(t){const e=Oc(this.persistenceKey,this.currentUser,t);this.removeItem(e)}Io(t){const e={clientId:this.js,onlineState:t};this.storage.setItem(this.so,JSON.stringify(e))}To(t,e,n){const s=Hi(this.persistenceKey,t),i=new Ir(t,e,n);this.setItem(s,i.Ws())}Eo(t){const e=JSON.stringify(Array.from(t));this.setItem(this.oo,e)}Ao(t){const e=this.no.exec(t);return e?e[1]:null}Vo(t,e){const n=this.Ao(t);return Hs.Ks(n,e)}mo(t,e){const n=this.ro.exec(t),s=Number(n[1]),i=n[2]!==void 0?n[2]:null;return Ws.Ks(new wt(i),s,e)}po(t,e){const n=this.io.exec(t),s=Number(n[1]);return Ir.Ks(s,e)}ao(t){return oa.Ks(t)}So(t){return JSON.parse(t)}async fo(t){if(t.user.uid===this.currentUser.uid)return this.syncEngine.Do(t.batchId,t.state,t.error);V(qt,`Ignoring mutation for non-active user ${t.user.uid}`)}yo(t){return this.syncEngine.vo(t.targetId,t.state,t.error)}Ro(t,e){const n=e?this.Ys.insert(t,e):this.Ys.remove(t),s=this.co(this.Ys),i=this.co(n),a=[],u=[];return i.forEach(l=>{s.has(l)||a.push(l)}),s.forEach(l=>{i.has(l)||u.push(l)}),this.syncEngine.Co(a,u).then(()=>{this.Ys=n})}uo(t){this.Ys.get(t.clientId)&&this.onlineStateHandler(t.onlineState)}co(t){let e=Ko();return t.forEach((n,s)=>{e=e.unionWith(s.activeTargetIds)}),e}}class sd{constructor(){this.Fo=new bo,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,n){}addLocalQueryTarget(t,e=!0){return e&&this.Fo.Gs(t),this.Mo[t]||"not-current"}updateQueryState(t,e,n){this.Mo[t]=e}removeLocalQueryTarget(t){this.Fo.zs(t)}isLocalQueryTarget(t){return this.Fo.activeTargetIds.has(t)}clearQueryState(t){delete this.Mo[t]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(t){return this.Fo.activeTargetIds.has(t)}start(){return this.Fo=new bo,Promise.resolve()}handleUserChange(t,e,n){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_{xo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mc="ConnectivityMonitor";class Fc{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(t){this.ko.push(t)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){V(Mc,"Network connectivity changed: AVAILABLE");for(const t of this.ko)t(0)}Lo(){V(Mc,"Network connectivity changed: UNAVAILABLE");for(const t of this.ko)t(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ms=null;function So(){return ms===null?ms=function(){return 268435456+Math.round(2147483648*Math.random())}():ms++,"0x"+ms.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xi="RestConnection",e_={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class n_{get Qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.$o=e+"://"+t.host,this.Uo=`projects/${n}/databases/${s}`,this.Ko=this.databaseId.database===Ms?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Wo(t,e,n,s,i){const a=So(),u=this.Go(t,e.toUriEncodedString());V(Xi,`Sending RPC '${t}' ${a}:`,u,n);const l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(l,s,i);const{host:d}=new URL(u),m=rl(d);return this.jo(t,u,l,n,m).then(g=>(V(Xi,`Received RPC '${t}' ${a}: `,g),g),g=>{throw ge(Xi,`RPC '${t}' ${a} failed with error: `,g,"url: ",u,"request:",n),g})}Jo(t,e,n,s,i,a){return this.Wo(t,e,n,s,i)}zo(t,e,n){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Nn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach((s,i)=>t[i]=s),n&&n.headers.forEach((s,i)=>t[i]=s)}Go(t,e){const n=e_[t];return`${this.$o}/v1/${e}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(t){this.Ho=t.Ho,this.Yo=t.Yo}Zo(t){this.Xo=t}e_(t){this.t_=t}n_(t){this.r_=t}onMessage(t){this.i_=t}close(){this.Yo()}send(t){this.Ho(t)}s_(){this.Xo()}o_(){this.t_()}__(t){this.r_(t)}a_(t){this.i_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt="WebChannelConnection";class s_ extends n_{constructor(t){super(t),this.u_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}jo(t,e,n,s,i){const a=So();return new Promise((u,l)=>{const d=new gl;d.setWithCredentials(!0),d.listenOnce(pl.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case gs.NO_ERROR:const g=d.getResponseJson();V(vt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(g)),u(g);break;case gs.TIMEOUT:V(vt,`RPC '${t}' ${a} timed out`),l(new O(P.DEADLINE_EXCEEDED,"Request time out"));break;case gs.HTTP_ERROR:const A=d.getStatus();if(V(vt,`RPC '${t}' ${a} failed with status:`,A,"response text:",d.getResponseText()),A>0){let R=d.getResponseJson();Array.isArray(R)&&(R=R[0]);const C=R==null?void 0:R.error;if(C&&C.status&&C.message){const k=function($){const q=$.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(q)>=0?q:P.UNKNOWN}(C.status);l(new O(k,C.message))}else l(new O(P.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new O(P.UNAVAILABLE,"Connection failed."));break;default:M(9055,{c_:t,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{V(vt,`RPC '${t}' ${a} completed.`)}});const m=JSON.stringify(s);V(vt,`RPC '${t}' ${a} sending request:`,s),d.send(e,"POST",m,n,15)})}P_(t,e,n){const s=So(),i=[this.$o,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=Il(),u=yl(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.zo(l.initMessageHeaders,e,n),l.encodeInitMessageHeaders=!0;const m=i.join("");V(vt,`Creating RPC '${t}' stream ${s}: ${m}`,l);const g=a.createWebChannel(m,l);this.T_(g);let A=!1,R=!1;const C=new r_({Ho:x=>{R?V(vt,`Not sending because RPC '${t}' stream ${s} is closed:`,x):(A||(V(vt,`Opening RPC '${t}' stream ${s} transport.`),g.open(),A=!0),V(vt,`RPC '${t}' stream ${s} sending:`,x),g.send(x))},Yo:()=>g.close()}),k=(x,$,q)=>{x.listen($,U=>{try{q(U)}catch(X){setTimeout(()=>{throw X},0)}})};return k(g,or.EventType.OPEN,()=>{R||(V(vt,`RPC '${t}' stream ${s} transport opened.`),C.s_())}),k(g,or.EventType.CLOSE,()=>{R||(R=!0,V(vt,`RPC '${t}' stream ${s} transport closed`),C.__(),this.I_(g))}),k(g,or.EventType.ERROR,x=>{R||(R=!0,ge(vt,`RPC '${t}' stream ${s} transport errored. Name:`,x.name,"Message:",x.message),C.__(new O(P.UNAVAILABLE,"The operation could not be completed")))}),k(g,or.EventType.MESSAGE,x=>{var $;if(!R){const q=x.data[0];L(!!q,16349);const U=q,X=(U==null?void 0:U.error)||(($=U[0])===null||$===void 0?void 0:$.error);if(X){V(vt,`RPC '${t}' stream ${s} received error:`,X);const nt=X.status;let H=function(y){const E=ht[y];if(E!==void 0)return yh(E)}(nt),I=X.message;H===void 0&&(H=P.INTERNAL,I="Unknown error status: "+nt+" with message "+X.message),R=!0,C.__(new O(H,I)),g.close()}else V(vt,`RPC '${t}' stream ${s} received:`,q),C.a_(q)}}),k(u,_l.STAT_EVENT,x=>{x.stat===ro.PROXY?V(vt,`RPC '${t}' stream ${s} detected buffering proxy`):x.stat===ro.NOPROXY&&V(vt,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(t=>t.close()),this.u_=[]}T_(t){this.u_.push(t)}I_(t){this.u_=this.u_.filter(e=>e===t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function id(){return typeof window<"u"?window:null}function bs(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function di(r){return new lp(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(t,e,n=1e3,s=1.5,i=6e4){this.Fi=t,this.timerId=e,this.d_=n,this.E_=s,this.A_=i,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(t){this.cancel();const e=Math.floor(this.R_+this.p_()),n=Math.max(0,Date.now()-this.m_),s=Math.max(0,e-n);s>0&&V("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),t())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc="PersistentStream";class ad{constructor(t,e,n,s,i,a,u,l){this.Fi=t,this.w_=n,this.S_=s,this.connection=i,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new od(t,e)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(t){this.q_(),this.stream.send(t)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,t!==4?this.F_.reset():e&&e.code===P.RESOURCE_EXHAUSTED?(ct(e.toString()),ct("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):e&&e.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.n_(e)}U_(){}auth(){this.state=1;const t=this.K_(this.b_),e=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.b_===e&&this.W_(n,s)},n=>{t(()=>{const s=new O(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.G_(s)})})}W_(t,e){const n=this.K_(this.b_);this.stream=this.z_(t,e),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.e_(()=>{n(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(s=>{n(()=>this.G_(s))}),this.stream.onMessage(s=>{n(()=>++this.C_==1?this.j_(s):this.onNext(s))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(t){return V(Lc,`close with error: ${t}`),this.stream=null,this.close(4,t)}K_(t){return e=>{this.Fi.enqueueAndForget(()=>this.b_===t?e():(V(Lc,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class i_ extends ad{constructor(t,e,n,s,i,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}z_(t,e){return this.connection.P_("Listen",t,e)}j_(t){return this.onNext(t)}onNext(t){this.F_.reset();const e=fp(this.serializer,t),n=function(i){if(!("targetChange"in i))return B.min();const a=i.targetChange;return a.targetIds&&a.targetIds.length?B.min():a.readTime?Pt(a.readTime):B.min()}(t);return this.listener.J_(e,n)}H_(t){const e={};e.database=Io(this.serializer),e.addTarget=function(i,a){let u;const l=a.target;if(u=Ls(l)?{documents:Sh(i,l)}:{query:Rh(i,l).Vt},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=Th(i,a.resumeToken);const d=_o(i,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(B.min())>0){u.readTime=Rn(i,a.snapshotVersion.toTimestamp());const d=_o(i,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,t);const n=gp(this.serializer,t);n&&(e.labels=n),this.k_(e)}Y_(t){const e={};e.database=Io(this.serializer),e.removeTarget=t,this.k_(e)}}class o_ extends ad{constructor(t,e,n,s,i,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,n,s,a),this.serializer=i}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(t,e){return this.connection.P_("Write",t,e)}j_(t){return L(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,L(!t.writeResults||t.writeResults.length===0,55816),this.listener.ea()}onNext(t){L(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.F_.reset();const e=mp(t.writeResults,t.commitTime),n=Pt(t.commitTime);return this.listener.ta(n,e)}na(){const t={};t.database=Io(this.serializer),this.k_(t)}X_(t){const e={streamToken:this.lastStreamToken,writes:t.map(n=>js(this.serializer,n))};this.k_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class a_{}class u_ extends a_{constructor(t,e,n,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=n,this.serializer=s,this.ra=!1}ia(){if(this.ra)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,n,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,a])=>this.connection.Wo(t,yo(e,n),s,i,a)).catch(i=>{throw i.name==="FirebaseError"?(i.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new O(P.UNKNOWN,i.toString())})}Jo(t,e,n,s,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Jo(t,yo(e,n),s,a,u,i)).catch(a=>{throw a.name==="FirebaseError"?(a.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(P.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class c_{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(t){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ua("Offline")))}set(t){this.ha(),this.sa=0,t==="Online"&&(this._a=!1),this.ua(t)}ua(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}ca(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(ct(e),this._a=!1):V("OnlineStateTracker",e)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const He="RemoteStore";class l_{constructor(t,e,n,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=i,this.Ea.xo(a=>{n.enqueueAndForget(async()=>{Xe(this)&&(V(He,"Restarting streams for network reachability change."),await async function(l){const d=F(l);d.Ia.add(4),await qr(d),d.Aa.set("Unknown"),d.Ia.delete(4),await fi(d)}(this))})}),this.Aa=new c_(n,s)}}async function fi(r){if(Xe(r))for(const t of r.da)await t(!0)}async function qr(r){for(const t of r.da)await t(!1)}function mi(r,t){const e=F(r);e.Ta.has(t.targetId)||(e.Ta.set(t.targetId,t),ca(e)?ua(e):Mn(e).x_()&&aa(e,t))}function Vn(r,t){const e=F(r),n=Mn(e);e.Ta.delete(t),n.x_()&&ud(e,t),e.Ta.size===0&&(n.x_()?n.B_():Xe(e)&&e.Aa.set("Unknown"))}function aa(r,t){if(r.Ra.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(B.min())>0){const e=r.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Mn(r).H_(t)}function ud(r,t){r.Ra.$e(t),Mn(r).Y_(t)}function ua(r){r.Ra=new op({getRemoteKeysForTarget:t=>r.remoteSyncer.getRemoteKeysForTarget(t),Et:t=>r.Ta.get(t)||null,lt:()=>r.datastore.serializer.databaseId}),Mn(r).start(),r.Aa.aa()}function ca(r){return Xe(r)&&!Mn(r).M_()&&r.Ta.size>0}function Xe(r){return F(r).Ia.size===0}function cd(r){r.Ra=void 0}async function h_(r){r.Aa.set("Online")}async function d_(r){r.Ta.forEach((t,e)=>{aa(r,t)})}async function f_(r,t){cd(r),ca(r)?(r.Aa.la(t),ua(r)):r.Aa.set("Unknown")}async function m_(r,t,e){if(r.Aa.set("Online"),t instanceof Eh&&t.state===2&&t.cause)try{await async function(s,i){const a=i.cause;for(const u of i.targetIds)s.Ta.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ta.delete(u),s.Ra.removeTarget(u))}(r,t)}catch(n){V(He,"Failed to remove targets %s: %s ",t.targetIds.join(","),n),await Qs(r,n)}else if(t instanceof ws?r.Ra.Ye(t):t instanceof Ih?r.Ra.it(t):r.Ra.et(t),!e.isEqual(B.min()))try{const n=await Yh(r.localStore);e.compareTo(n)>=0&&await function(i,a){const u=i.Ra.Pt(a);return u.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){const m=i.Ta.get(d);m&&i.Ta.set(d,m.withResumeToken(l.resumeToken,a))}}),u.targetMismatches.forEach((l,d)=>{const m=i.Ta.get(l);if(!m)return;i.Ta.set(l,m.withResumeToken(lt.EMPTY_BYTE_STRING,m.snapshotVersion)),ud(i,l);const g=new Yt(m.target,l,d,m.sequenceNumber);aa(i,g)}),i.remoteSyncer.applyRemoteEvent(u)}(r,e)}catch(n){V(He,"Failed to raise snapshot:",n),await Qs(r,n)}}async function Qs(r,t,e){if(!Te(t))throw t;r.Ia.add(1),await qr(r),r.Aa.set("Offline"),e||(e=()=>Yh(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{V(He,"Retrying IndexedDB access"),await e(),r.Ia.delete(1),await fi(r)})}function ld(r,t){return t().catch(e=>Qs(r,e,t))}async function On(r){const t=F(r),e=ye(t);let n=t.Pa.length>0?t.Pa[t.Pa.length-1].batchId:Le;for(;g_(t);)try{const s=await Zp(t.localStore,n);if(s===null){t.Pa.length===0&&e.B_();break}n=s.batchId,p_(t,s)}catch(s){await Qs(t,s)}hd(t)&&dd(t)}function g_(r){return Xe(r)&&r.Pa.length<10}function p_(r,t){r.Pa.push(t);const e=ye(r);e.x_()&&e.Z_&&e.X_(t.mutations)}function hd(r){return Xe(r)&&!ye(r).M_()&&r.Pa.length>0}function dd(r){ye(r).start()}async function __(r){ye(r).na()}async function y_(r){const t=ye(r);for(const e of r.Pa)t.X_(e.mutations)}async function I_(r,t,e){const n=r.Pa.shift(),s=Qo.from(n,t,e);await ld(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await On(r)}async function E_(r,t){t&&ye(r).Z_&&await async function(n,s){if(function(a){return sp(a)&&a!==P.ABORTED}(s.code)){const i=n.Pa.shift();ye(n).N_(),await ld(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await On(n)}}(r,t),hd(r)&&dd(r)}async function Bc(r,t){const e=F(r);e.asyncQueue.verifyOperationInProgress(),V(He,"RemoteStore received new credentials");const n=Xe(e);e.Ia.add(3),await qr(e),n&&e.Aa.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await fi(e)}async function Ro(r,t){const e=F(r);t?(e.Ia.delete(2),await fi(e)):t||(e.Ia.add(2),await qr(e),e.Aa.set("Unknown"))}function Mn(r){return r.Va||(r.Va=function(e,n,s){const i=F(e);return i.ia(),new i_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Zo:h_.bind(null,r),e_:d_.bind(null,r),n_:f_.bind(null,r),J_:m_.bind(null,r)}),r.da.push(async t=>{t?(r.Va.N_(),ca(r)?ua(r):r.Aa.set("Unknown")):(await r.Va.stop(),cd(r))})),r.Va}function ye(r){return r.ma||(r.ma=function(e,n,s){const i=F(e);return i.ia(),new o_(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Zo:()=>Promise.resolve(),e_:__.bind(null,r),n_:E_.bind(null,r),ea:y_.bind(null,r),ta:I_.bind(null,r)}),r.da.push(async t=>{t?(r.ma.N_(),await On(r)):(await r.ma.stop(),r.Pa.length>0&&(V(He,`Stopping write stream with ${r.Pa.length} pending writes`),r.Pa=[]))})),r.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(t,e,n,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Jt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,n,s,i){const a=Date.now()+n,u=new la(t,e,a,s,i);return u.start(n),u}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(P.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ha(r,t){if(ct("AsyncQueue",`${t}: ${r}`),Te(r))return new O(P.UNAVAILABLE,`${t}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{static emptySet(t){return new mn(t.comparator)}constructor(t){this.comparator=t?(e,n)=>t(e,n)||N.comparator(e.key,n.key):(e,n)=>N.comparator(e.key,n.key),this.keyedMap=ar(),this.sortedSet=new rt(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,n)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof mn)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const n=new mn;return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(){this.fa=new rt(N.comparator)}track(t){const e=t.doc.key,n=this.fa.get(e);n?t.type!==0&&n.type===3?this.fa=this.fa.insert(e,t):t.type===3&&n.type!==1?this.fa=this.fa.insert(e,{type:n.type,doc:t.doc}):t.type===2&&n.type===2?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):t.type===2&&n.type===0?this.fa=this.fa.insert(e,{type:0,doc:t.doc}):t.type===1&&n.type===0?this.fa=this.fa.remove(e):t.type===1&&n.type===2?this.fa=this.fa.insert(e,{type:1,doc:n.doc}):t.type===0&&n.type===1?this.fa=this.fa.insert(e,{type:2,doc:t.doc}):M(63341,{At:t,ga:n}):this.fa=this.fa.insert(e,t)}pa(){const t=[];return this.fa.inorderTraversal((e,n)=>{t.push(n)}),t}}class Cn{constructor(t,e,n,s,i,a,u,l,d){this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(t,e,n,s,i){const a=[];return e.forEach(u=>{a.push({type:0,doc:u})}),new Cn(t,e,mn.emptySet(e),a,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&oi(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==n[s].type||!e[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T_{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(t=>t.ba())}}class v_{constructor(){this.queries=jc(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(e,n){const s=F(e),i=s.queries;s.queries=jc(),i.forEach((a,u)=>{for(const l of u.wa)l.onError(n)})})(this,new O(P.ABORTED,"Firestore shutting down"))}}function jc(){return new ne(r=>sh(r),oi)}async function w_(r,t){const e=F(r);let n=3;const s=t.query;let i=e.queries.get(s);i?!i.Sa()&&t.ba()&&(n=2):(i=new T_,n=t.ba()?0:1);try{switch(n){case 0:i.ya=await e.onListen(s,!0);break;case 1:i.ya=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const u=ha(a,`Initialization of query '${cn(t.query)}' failed`);return void t.onError(u)}e.queries.set(s,i),i.wa.push(t),t.va(e.onlineState),i.ya&&t.Ca(i.ya)&&da(e)}async function A_(r,t){const e=F(r),n=t.query;let s=3;const i=e.queries.get(n);if(i){const a=i.wa.indexOf(t);a>=0&&(i.wa.splice(a,1),i.wa.length===0?s=t.ba()?0:1:!i.Sa()&&t.ba()&&(s=2))}switch(s){case 0:return e.queries.delete(n),e.onUnlisten(n,!0);case 1:return e.queries.delete(n),e.onUnlisten(n,!1);case 2:return e.onLastRemoteStoreUnlisten(n);default:return}}function b_(r,t){const e=F(r);let n=!1;for(const s of t){const i=s.query,a=e.queries.get(i);if(a){for(const u of a.wa)u.Ca(s)&&(n=!0);a.ya=s}}n&&da(e)}function S_(r,t,e){const n=F(r),s=n.queries.get(t);if(s)for(const i of s.wa)i.onError(e);n.queries.delete(t)}function da(r){r.Da.forEach(t=>{t.next()})}var Po,qc;(qc=Po||(Po={})).Fa="default",qc.Cache="cache";class R_{constructor(t,e,n){this.query=t,this.Ma=e,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=n||{}}Ca(t){if(!this.options.includeMetadataChanges){const n=[];for(const s of t.docChanges)s.type!==3&&n.push(s);t=new Cn(t.query,t.docs,t.oldDocs,n,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.xa?this.Na(t)&&(this.Ma.next(t),e=!0):this.Ba(t,this.onlineState)&&(this.La(t),e=!0),this.Oa=t,e}onError(t){this.Ma.error(t)}va(t){this.onlineState=t;let e=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,t)&&(this.La(this.Oa),e=!0),e}Ba(t,e){if(!t.fromCache||!this.ba())return!0;const n=e!=="Offline";return(!this.options.ka||!n)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Na(t){if(t.docChanges.length>0)return!0;const e=this.Oa&&this.Oa.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}La(t){t=Cn.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.xa=!0,this.Ma.next(t)}ba(){return this.options.source!==Po.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(t){this.key=t}}class md{constructor(t){this.key=t}}class P_{constructor(t,e){this.query=t,this.Ha=e,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=z(),this.mutatedKeys=z(),this.Xa=oh(t),this.eu=new mn(this.Xa)}get tu(){return this.Ha}nu(t,e){const n=e?e.ru:new Uc,s=e?e.eu:this.eu;let i=e?e.mutatedKeys:this.mutatedKeys,a=s,u=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((m,g)=>{const A=s.get(m),R=Br(this.query,g)?g:null,C=!!A&&this.mutatedKeys.has(A.key),k=!!R&&(R.hasLocalMutations||this.mutatedKeys.has(R.key)&&R.hasCommittedMutations);let x=!1;A&&R?A.data.isEqual(R.data)?C!==k&&(n.track({type:3,doc:R}),x=!0):this.iu(A,R)||(n.track({type:2,doc:R}),x=!0,(l&&this.Xa(R,l)>0||d&&this.Xa(R,d)<0)&&(u=!0)):!A&&R?(n.track({type:0,doc:R}),x=!0):A&&!R&&(n.track({type:1,doc:A}),x=!0,(l||d)&&(u=!0)),x&&(R?(a=a.add(R),i=k?i.add(m):i.delete(m)):(a=a.delete(m),i=i.delete(m)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),i=i.delete(m.key),n.track({type:1,doc:m})}return{eu:a,ru:n,Ds:u,mutatedKeys:i}}iu(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,n,s){const i=this.eu;this.eu=t.eu,this.mutatedKeys=t.mutatedKeys;const a=t.ru.pa();a.sort((m,g)=>function(R,C){const k=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M(20277,{At:x})}};return k(R)-k(C)}(m.type,g.type)||this.Xa(m.doc,g.doc)),this.su(n),s=s!=null&&s;const u=e&&!s?this.ou():[],l=this.Za.size===0&&this.current&&!s?1:0,d=l!==this.Ya;return this.Ya=l,a.length!==0||d?{snapshot:new Cn(this.query,t.eu,i,a,t.mutatedKeys,l===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),_u:u}:{_u:u}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Uc,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(t){return!this.Ha.has(t)&&!!this.eu.has(t)&&!this.eu.get(t).hasLocalMutations}su(t){t&&(t.addedDocuments.forEach(e=>this.Ha=this.Ha.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.Ha=this.Ha.delete(e)),this.current=t.current)}ou(){if(!this.current)return[];const t=this.Za;this.Za=z(),this.eu.forEach(n=>{this.au(n.key)&&(this.Za=this.Za.add(n.key))});const e=[];return t.forEach(n=>{this.Za.has(n)||e.push(new md(n))}),this.Za.forEach(n=>{t.has(n)||e.push(new fd(n))}),e}uu(t){this.Ha=t.qs,this.Za=z();const e=this.nu(t.documents);return this.applyChanges(e,!0)}cu(){return Cn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Fn="SyncEngine";class V_{constructor(t,e,n){this.query=t,this.targetId=e,this.view=n}}class C_{constructor(t){this.key=t,this.lu=!1}}class D_{constructor(t,e,n,s,i,a){this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new ne(u=>sh(u),oi),this.Tu=new Map,this.Iu=new Set,this.du=new rt(N.comparator),this.Eu=new Map,this.Au=new ea,this.Ru={},this.Vu=new Map,this.mu=We.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function x_(r,t,e=!0){const n=gi(r);let s;const i=n.Pu.get(t);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.cu()):s=await gd(n,t,e,!0),s}async function N_(r,t){const e=gi(r);await gd(e,t,!0,!1)}async function gd(r,t,e,n){const s=await Gs(r.localStore,Ot(t)),i=s.targetId,a=r.sharedClientState.addLocalQueryTarget(i,e);let u;return n&&(u=await fa(r,t,i,a==="current",s.resumeToken)),r.isPrimaryClient&&e&&mi(r.remoteStore,s),u}async function fa(r,t,e,n,s){r.gu=(g,A,R)=>async function(k,x,$,q){let U=x.view.nu($);U.Ds&&(U=await Ao(k.localStore,x.query,!1).then(({documents:I})=>x.view.nu(I,U)));const X=q&&q.targetChanges.get(x.targetId),nt=q&&q.targetMismatches.get(x.targetId)!=null,H=x.view.applyChanges(U,k.isPrimaryClient,X,nt);return Vo(k,x.targetId,H._u),H.snapshot}(r,g,A,R);const i=await Ao(r.localStore,t,!0),a=new P_(t,i.qs),u=a.nu(i.documents),l=jr.createSynthesizedTargetChangeForCurrentChange(e,n&&r.onlineState!=="Offline",s),d=a.applyChanges(u,r.isPrimaryClient,l);Vo(r,e,d._u);const m=new V_(t,e,a);return r.Pu.set(t,m),r.Tu.has(e)?r.Tu.get(e).push(t):r.Tu.set(e,[t]),d.snapshot}async function k_(r,t,e){const n=F(r),s=n.Pu.get(t),i=n.Tu.get(s.targetId);if(i.length>1)return n.Tu.set(s.targetId,i.filter(a=>!oi(a,t))),void n.Pu.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Pn(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),e&&Vn(n.remoteStore,s.targetId),Dn(n,s.targetId)}).catch(Ee)):(Dn(n,s.targetId),await Pn(n.localStore,s.targetId,!0))}async function O_(r,t){const e=F(r),n=e.Pu.get(t),s=e.Tu.get(n.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(n.targetId),Vn(e.remoteStore,n.targetId))}async function M_(r,t,e){const n=_a(r);try{const s=await function(a,u){const l=F(a),d=Y.now(),m=u.reduce((R,C)=>R.add(C.key),z());let g,A;return l.persistence.runTransaction("Locally write mutations","readwrite",R=>{let C=Nt(),k=z();return l.Os.getEntries(R,m).next(x=>{C=x,C.forEach(($,q)=>{q.isValidDocument()||(k=k.add($))})}).next(()=>l.localDocuments.getOverlayedDocuments(R,C)).next(x=>{g=x;const $=[];for(const q of u){const U=np(q,g.get(q.key).overlayedDocument);U!=null&&$.push(new ve(q.key,U,Ql(U.value.mapValue),kt.exists(!0)))}return l.mutationQueue.addMutationBatch(R,d,$,u)}).next(x=>{A=x;const $=x.applyToLocalDocumentSet(g,k);return l.documentOverlayCache.saveOverlays(R,x.batchId,$)})}).then(()=>({batchId:A.batchId,changes:uh(g)}))}(n.localStore,t);n.sharedClientState.addPendingMutation(s.batchId),function(a,u,l){let d=a.Ru[a.currentUser.toKey()];d||(d=new rt(j)),d=d.insert(u,l),a.Ru[a.currentUser.toKey()]=d}(n,s.batchId,e),await we(n,s.changes),await On(n.remoteStore)}catch(s){const i=ha(s,"Failed to persist write");e.reject(i)}}async function pd(r,t){const e=F(r);try{const n=await Yp(e.localStore,t);t.targetChanges.forEach((s,i)=>{const a=e.Eu.get(i);a&&(L(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.lu=!0:s.modifiedDocuments.size>0?L(a.lu,14607):s.removedDocuments.size>0&&(L(a.lu,42227),a.lu=!1))}),await we(e,n,t)}catch(n){await Ee(n)}}function zc(r,t,e){const n=F(r);if(n.isPrimaryClient&&e===0||!n.isPrimaryClient&&e===1){const s=[];n.Pu.forEach((i,a)=>{const u=a.view.va(t);u.snapshot&&s.push(u.snapshot)}),function(a,u){const l=F(a);l.onlineState=u;let d=!1;l.queries.forEach((m,g)=>{for(const A of g.wa)A.va(u)&&(d=!0)}),d&&da(l)}(n.eventManager,t),s.length&&n.hu.J_(s),n.onlineState=t,n.isPrimaryClient&&n.sharedClientState.setOnlineState(t)}}async function F_(r,t,e){const n=F(r);n.sharedClientState.updateQueryState(t,"rejected",e);const s=n.Eu.get(t),i=s&&s.key;if(i){let a=new rt(N.comparator);a=a.insert(i,ut.newNoDocument(i,B.min()));const u=z().add(i),l=new Ur(B.min(),new Map,new rt(j),a,u);await pd(n,l),n.du=n.du.remove(i),n.Eu.delete(t),pa(n)}else await Pn(n.localStore,t,!1).then(()=>Dn(n,t,e)).catch(Ee)}async function L_(r,t){const e=F(r),n=t.batch.batchId;try{const s=await Xp(e.localStore,t);ga(e,n,null),ma(e,n),e.sharedClientState.updateMutationState(n,"acknowledged"),await we(e,s)}catch(s){await Ee(s)}}async function B_(r,t,e){const n=F(r);try{const s=await function(a,u){const l=F(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let m;return l.mutationQueue.lookupMutationBatch(d,u).next(g=>(L(g!==null,37113),m=g.keys(),l.mutationQueue.removeMutationBatch(d,g))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,m,u)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,m)).next(()=>l.localDocuments.getDocuments(d,m))})}(n.localStore,t);ga(n,t,e),ma(n,t),n.sharedClientState.updateMutationState(t,"rejected",e),await we(n,s)}catch(s){await Ee(s)}}function ma(r,t){(r.Vu.get(t)||[]).forEach(e=>{e.resolve()}),r.Vu.delete(t)}function ga(r,t,e){const n=F(r);let s=n.Ru[n.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),n.Ru[n.currentUser.toKey()]=s}}function Dn(r,t,e=null){r.sharedClientState.removeLocalQueryTarget(t);for(const n of r.Tu.get(t))r.Pu.delete(n),e&&r.hu.pu(n,e);r.Tu.delete(t),r.isPrimaryClient&&r.Au.zr(t).forEach(n=>{r.Au.containsKey(n)||_d(r,n)})}function _d(r,t){r.Iu.delete(t.path.canonicalString());const e=r.du.get(t);e!==null&&(Vn(r.remoteStore,e),r.du=r.du.remove(t),r.Eu.delete(e),pa(r))}function Vo(r,t,e){for(const n of e)n instanceof fd?(r.Au.addReference(n.key,t),U_(r,n)):n instanceof md?(V(Fn,"Document no longer in limbo: "+n.key),r.Au.removeReference(n.key,t),r.Au.containsKey(n.key)||_d(r,n.key)):M(19791,{yu:n})}function U_(r,t){const e=t.key,n=e.path.canonicalString();r.du.get(e)||r.Iu.has(n)||(V(Fn,"New document in limbo: "+e),r.Iu.add(n),pa(r))}function pa(r){for(;r.Iu.size>0&&r.du.size<r.maxConcurrentLimboResolutions;){const t=r.Iu.values().next().value;r.Iu.delete(t);const e=new N(Z.fromString(t)),n=r.mu.next();r.Eu.set(n,new C_(e)),r.du=r.du.insert(e,n),mi(r.remoteStore,new Yt(Ot(ii(e.path)),n,"TargetPurposeLimboResolution",Ct.ue))}}async function we(r,t,e){const n=F(r),s=[],i=[],a=[];n.Pu.isEmpty()||(n.Pu.forEach((u,l)=>{a.push(n.gu(l,t,e).then(d=>{var m;if((d||e)&&n.isPrimaryClient){const g=d?!d.fromCache:(m=e==null?void 0:e.targetChanges.get(l.targetId))===null||m===void 0?void 0:m.current;n.sharedClientState.updateQueryState(l.targetId,g?"current":"not-current")}if(d){s.push(d);const g=sa.Es(l.targetId,d);i.push(g)}}))}),await Promise.all(a),n.hu.J_(s),await async function(l,d){const m=F(l);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>v.forEach(d,A=>v.forEach(A.Is,R=>m.persistence.referenceDelegate.addReference(g,A.targetId,R)).next(()=>v.forEach(A.ds,R=>m.persistence.referenceDelegate.removeReference(g,A.targetId,R)))))}catch(g){if(!Te(g))throw g;V(ia,"Failed to update sequence numbers: "+g)}for(const g of d){const A=g.targetId;if(!g.fromCache){const R=m.Fs.get(A),C=R.snapshotVersion,k=R.withLastLimboFreeSnapshotVersion(C);m.Fs=m.Fs.insert(A,k)}}}(n.localStore,i))}async function j_(r,t){const e=F(r);if(!e.currentUser.isEqual(t)){V(Fn,"User change. New user:",t.toKey());const n=await Xh(e.localStore,t);e.currentUser=t,function(i,a){i.Vu.forEach(u=>{u.forEach(l=>{l.reject(new O(P.CANCELLED,a))})}),i.Vu.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,n.removedBatchIds,n.addedBatchIds),await we(e,n.Bs)}}function q_(r,t){const e=F(r),n=e.Eu.get(t);if(n&&n.lu)return z().add(n.key);{let s=z();const i=e.Tu.get(t);if(!i)return s;for(const a of i){const u=e.Pu.get(a);s=s.unionWith(u.view.tu)}return s}}async function z_(r,t){const e=F(r),n=await Ao(e.localStore,t.query,!0),s=t.view.uu(n);return e.isPrimaryClient&&Vo(e,t.targetId,s._u),s}async function $_(r,t){const e=F(r);return Zh(e.localStore,t).then(n=>we(e,n))}async function K_(r,t,e,n){const s=F(r),i=await function(u,l){const d=F(u),m=F(d.mutationQueue);return d.persistence.runTransaction("Lookup mutation documents","readonly",g=>m.Xn(g,l).next(A=>A?d.localDocuments.getDocuments(g,A):v.resolve(null)))}(s.localStore,t);i!==null?(e==="pending"?await On(s.remoteStore):e==="acknowledged"||e==="rejected"?(ga(s,t,n||null),ma(s,t),function(u,l){F(F(u).mutationQueue).rr(l)}(s.localStore,t)):M(6720,"Unknown batchState",{wu:e}),await we(s,i)):V(Fn,"Cannot apply mutation batch with id: "+t)}async function G_(r,t){const e=F(r);if(gi(e),_a(e),t===!0&&e.fu!==!0){const n=e.sharedClientState.getAllActiveQueryTargets(),s=await $c(e,n.toArray());e.fu=!0,await Ro(e.remoteStore,!0);for(const i of s)mi(e.remoteStore,i)}else if(t===!1&&e.fu!==!1){const n=[];let s=Promise.resolve();e.Tu.forEach((i,a)=>{e.sharedClientState.isLocalQueryTarget(a)?n.push(a):s=s.then(()=>(Dn(e,a),Pn(e.localStore,a,!0))),Vn(e.remoteStore,a)}),await s,await $c(e,n),function(a){const u=F(a);u.Eu.forEach((l,d)=>{Vn(u.remoteStore,d)}),u.Au.jr(),u.Eu=new Map,u.du=new rt(N.comparator)}(e),e.fu=!1,await Ro(e.remoteStore,!1)}}async function $c(r,t,e){const n=F(r),s=[],i=[];for(const a of t){let u;const l=n.Tu.get(a);if(l&&l.length!==0){u=await Gs(n.localStore,Ot(l[0]));for(const d of l){const m=n.Pu.get(d),g=await z_(n,m);g.snapshot&&i.push(g.snapshot)}}else{const d=await Jh(n.localStore,a);u=await Gs(n.localStore,d),await fa(n,yd(d),a,!1,u.resumeToken)}s.push(u)}return n.hu.J_(i),s}function yd(r){return rh(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function W_(r){return function(e){return F(F(e).persistence).Ps()}(F(r).localStore)}async function H_(r,t,e,n){const s=F(r);if(s.fu)return void V(Fn,"Ignoring unexpected query state notification.");const i=s.Tu.get(t);if(i&&i.length>0)switch(e){case"current":case"not-current":{const a=await Zh(s.localStore,ih(i[0])),u=Ur.createSynthesizedRemoteEventForCurrentChange(t,e==="current",lt.EMPTY_BYTE_STRING);await we(s,a,u);break}case"rejected":await Pn(s.localStore,t,!0),Dn(s,t,n);break;default:M(64155,e)}}async function Q_(r,t,e){const n=gi(r);if(n.fu){for(const s of t){if(n.Tu.has(s)&&n.sharedClientState.isActiveQueryTarget(s)){V(Fn,"Adding an already active target "+s);continue}const i=await Jh(n.localStore,s),a=await Gs(n.localStore,i);await fa(n,yd(i),a.targetId,!1,a.resumeToken),mi(n.remoteStore,a)}for(const s of e)n.Tu.has(s)&&await Pn(n.localStore,s,!1).then(()=>{Vn(n.remoteStore,s),Dn(n,s)}).catch(Ee)}}function gi(r){const t=F(r);return t.remoteStore.remoteSyncer.applyRemoteEvent=pd.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=q_.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=F_.bind(null,t),t.hu.J_=b_.bind(null,t.eventManager),t.hu.pu=S_.bind(null,t.eventManager),t}function _a(r){const t=F(r);return t.remoteStore.remoteSyncer.applySuccessfulWrite=L_.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=B_.bind(null,t),t}class Nr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=di(t.databaseInfo.databaseId),this.sharedClientState=this.bu(t),this.persistence=this.Du(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Cu(t,this.localStore),this.indexBackfillerScheduler=this.Fu(t,this.localStore)}Cu(t,e){return null}Fu(t,e){return null}vu(t){return Qh(this.persistence,new Hh,t.initialUser,this.serializer)}Du(t){return new na(hi.Vi,this.serializer)}bu(t){return new sd}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Nr.provider={build:()=>new Nr};class X_ extends Nr{constructor(t){super(),this.cacheSizeBytes=t}Cu(t,e){L(this.persistence.referenceDelegate instanceof Ks,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new qh(n,t.asyncQueue,e)}Du(t){const e=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new na(n=>Ks.Vi(n,e),this.serializer)}}class Id extends Nr{constructor(t,e,n){super(),this.Mu=t,this.cacheSizeBytes=e,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(t){await super.initialize(t),await this.Mu.initialize(this,t),await _a(this.Mu.syncEngine),await On(this.Mu.remoteStore),await this.persistence.ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(t){return Qh(this.persistence,new Hh,t.initialUser,this.serializer)}Cu(t,e){const n=this.persistence.referenceDelegate.garbageCollector;return new qh(n,t.asyncQueue,e)}Fu(t,e){const n=new rg(e,this.persistence);return new ng(t.asyncQueue,n)}Du(t){const e=Wh(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?At.withCacheSize(this.cacheSizeBytes):At.DEFAULT;return new ra(this.synchronizeTabs,e,t.clientId,n,t.asyncQueue,id(),bs(),this.serializer,this.sharedClientState,!!this.forceOwnership)}bu(t){return new sd}}class Y_ extends Id{constructor(t,e){super(t,e,!1),this.Mu=t,this.cacheSizeBytes=e,this.synchronizeTabs=!0}async initialize(t){await super.initialize(t);const e=this.Mu.syncEngine;this.sharedClientState instanceof Qi&&(this.sharedClientState.syncEngine={Do:K_.bind(null,e),vo:H_.bind(null,e),Co:Q_.bind(null,e),Ps:W_.bind(null,e),bo:$_.bind(null,e)},await this.sharedClientState.start()),await this.persistence.ji(async n=>{await G_(this.Mu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}bu(t){const e=id();if(!Qi.C(e))throw new O(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=Wh(t.databaseInfo.databaseId,t.databaseInfo.persistenceKey);return new Qi(e,t.asyncQueue,n,t.clientId,t.initialUser)}}class kr{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>zc(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=j_.bind(null,this.syncEngine),await Ro(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new v_}()}createDatastore(t){const e=di(t.databaseInfo.databaseId),n=function(i){return new s_(i)}(t.databaseInfo);return function(i,a,u,l){return new u_(i,a,u,l)}(t.authCredentials,t.appCheckCredentials,n,e)}createRemoteStore(t){return function(n,s,i,a,u){return new l_(n,s,i,a,u)}(this.localStore,this.datastore,t.asyncQueue,e=>zc(this.syncEngine,e,0),function(){return Fc.C()?new Fc:new t_}())}createSyncEngine(t,e){return function(s,i,a,u,l,d,m){const g=new D_(s,i,a,u,l,d);return m&&(g.fu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(s){const i=F(s);V(He,"RemoteStore shutting down."),i.Ia.add(5),await qr(i),i.Ea.shutdown(),i.Aa.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}kr.provider={build:()=>new kr};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.xu(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.xu(this.observer.error,t):ct("Uncaught Error in snapshot listener:",t.toString()))}Ou(){this.muted=!0}xu(t,e){setTimeout(()=>{this.muted||t(e)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ie="FirestoreClient";class Z_{constructor(t,e,n,s,i){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=n,this.databaseInfo=s,this.user=wt.UNAUTHENTICATED,this.clientId=xo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async a=>{V(Ie,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(n,a=>(V(Ie,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Jt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const n=ha(e,"Failed to shutdown persistence");t.reject(n)}}),t.promise}}async function Yi(r,t){r.asyncQueue.verifyOperationInProgress(),V(Ie,"Initializing OfflineComponentProvider");const e=r.configuration;await t.initialize(e);let n=e.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await Xh(t.localStore,s),n=s)}),t.persistence.setDatabaseDeletedListener(()=>{ge("Terminating Firestore due to IndexedDb database deletion"),r.terminate().then(()=>{V("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(s=>{ge("Terminating Firestore due to IndexedDb database deletion failed",s)})}),r._offlineComponents=t}async function Kc(r,t){r.asyncQueue.verifyOperationInProgress();const e=await ty(r);V(Ie,"Initializing OnlineComponentProvider"),await t.initialize(e,r.configuration),r.setCredentialChangeListener(n=>Bc(t.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Bc(t.remoteStore,s)),r._onlineComponents=t}async function ty(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){V(Ie,"Using user provided OfflineComponentProvider");try{await Yi(r,r._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(s){return s.name==="FirebaseError"?s.code===P.FAILED_PRECONDITION||s.code===P.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(e))throw e;ge("Error using user provided cache. Falling back to memory cache: "+e),await Yi(r,new Nr)}}else V(Ie,"Using default OfflineComponentProvider"),await Yi(r,new X_(void 0));return r._offlineComponents}async function Ed(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(V(Ie,"Using user provided OnlineComponentProvider"),await Kc(r,r._uninitializedComponentsProvider._online)):(V(Ie,"Using default OnlineComponentProvider"),await Kc(r,new kr))),r._onlineComponents}function ey(r){return Ed(r).then(t=>t.syncEngine)}async function ny(r){const t=await Ed(r),e=t.eventManager;return e.onListen=x_.bind(null,t.syncEngine),e.onUnlisten=k_.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=N_.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=O_.bind(null,t.syncEngine),e}function ry(r,t,e={}){const n=new Jt;return r.asyncQueue.enqueueAndForget(async()=>function(i,a,u,l,d){const m=new J_({next:A=>{m.Ou(),a.enqueueAndForget(()=>A_(i,g));const R=A.docs.has(u);!R&&A.fromCache?d.reject(new O(P.UNAVAILABLE,"Failed to get document because the client is offline.")):R&&A.fromCache&&l&&l.source==="server"?d.reject(new O(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(A)},error:A=>d.reject(A)}),g=new R_(ii(u.path),m,{includeMetadataChanges:!0,ka:!0});return w_(i,g)}(await ny(r),r.asyncQueue,t,e,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Td(r){const t={};return r.timeoutSeconds!==void 0&&(t.timeoutSeconds=r.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sy="firestore.googleapis.com",Wc=!0;class Hc{constructor(t){var e,n;if(t.host===void 0){if(t.ssl!==void 0)throw new O(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=sy,this.ssl=Wc}else this.host=t.host,this.ssl=(e=t.ssl)!==null&&e!==void 0?e:Wc;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Fh;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<jh)throw new O(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Zm("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Td((n=t.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new O(P.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class vd{constructor(t,e,n,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Hc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Hc(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new $m;switch(n.type){case"firstParty":return new Wm(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new O(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Gc.get(e);n&&(V("ComponentProvider","Removing Datastore"),Gc.delete(e),n.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ya{constructor(t,e,n){this.converter=e,this._query=n,this.type="query",this.firestore=t}withConverter(t){return new ya(this.firestore,t,this._query)}}class gt{constructor(t,e,n){this.converter=e,this._key=n,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Or(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new gt(this.firestore,t,this._key)}toJSON(){return{type:gt._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,n){if(Mr(e,gt._jsonSchema))return new gt(t,n||null,new N(Z.fromString(e.referencePath)))}}gt._jsonSchemaVersion="firestore/documentReference/1.0",gt._jsonSchema={type:dt("string",gt._jsonSchemaVersion),referencePath:dt("string")};class Or extends ya{constructor(t,e,n){super(t,e,ii(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new gt(this.firestore,null,new N(t))}withConverter(t){return new Or(this.firestore,t,this._path)}}function xy(r,t,...e){if(r=Vs(r),arguments.length===1&&(t=xo.newId()),Jm("doc","path",t),r instanceof vd){const n=Z.fromString(t,...e);return Lu(n),new gt(r,null,new N(n))}{if(!(r instanceof gt||r instanceof Or))throw new O(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(Z.fromString(t,...e));return Lu(n),new gt(r.firestore,r instanceof Or?r.converter:null,new N(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qc="AsyncQueue";class Xc{constructor(t=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new od(this,"async_queue_retry"),this.oc=()=>{const n=bs();n&&V(Qc,"Visibility state changed to "+n.visibilityState),this.F_.y_()},this._c=t;const e=bs();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.ac(),this.uc(t)}enterRestrictedMode(t){if(!this.Xu){this.Xu=!0,this.rc=t||!1;const e=bs();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.oc)}}enqueue(t){if(this.ac(),this.Xu)return new Promise(()=>{});const e=new Jt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Zu.push(t),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(t){if(!Te(t))throw t;V(Qc,"Operation failed with retryable error: "+t)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(t){const e=this._c.then(()=>(this.nc=!0,t().catch(n=>{throw this.tc=n,this.nc=!1,ct("INTERNAL UNHANDLED ERROR: ",Yc(n)),n}).then(n=>(this.nc=!1,n))));return this._c=e,e}enqueueAfterDelay(t,e,n){this.ac(),this.sc.indexOf(t)>-1&&(e=0);const s=la.createAndSchedule(this,t,e,n,i=>this.lc(i));return this.ec.push(s),s}ac(){this.tc&&M(47125,{hc:Yc(this.tc)})}verifyOperationInProgress(){}async Pc(){let t;do t=this._c,await t;while(t!==this._c)}Tc(t){for(const e of this.ec)if(e.timerId===t)return!0;return!1}Ic(t){return this.Pc().then(()=>{this.ec.sort((e,n)=>e.targetTimeMs-n.targetTimeMs);for(const e of this.ec)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Pc()})}dc(t){this.sc.push(t)}lc(t){const e=this.ec.indexOf(t);this.ec.splice(e,1)}}function Yc(r){let t=r.message||"";return r.stack&&(t=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),t}class Ia extends vd{constructor(t,e,n,s){super(t,e,n,s),this.type="firestore",this._queue=new Xc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new Xc(t),this._firestoreClient=void 0,await t}}}function iy(r,t,e){e||(e=Ms);const n=Rm(r,"firestore");if(n.isInitialized(e)){const s=n.getImmediate({identifier:e}),i=n.getOptions(e);if(Ps(i,t))return s;throw new O(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(t.cacheSizeBytes!==void 0&&t.localCache!==void 0)throw new O(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(t.cacheSizeBytes!==void 0&&t.cacheSizeBytes!==-1&&t.cacheSizeBytes<jh)throw new O(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return t.host&&rl(t.host)&&bf(t.host),n.initialize({options:t,instanceIdentifier:e})}function wd(r){if(r._terminated)throw new O(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||oy(r),r._firestoreClient}function oy(r){var t,e,n;const s=r._freezeSettings(),i=function(u,l,d,m){return new Dg(u,l,d,m.host,m.ssl,m.experimentalForceLongPolling,m.experimentalAutoDetectLongPolling,Td(m.experimentalLongPollingOptions),m.useFetchStreams,m.isUsingEmulator)}(r._databaseId,((t=r._app)===null||t===void 0?void 0:t.options.appId)||"",r._persistenceKey,s);r._componentsProvider||!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((n=s.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),r._firestoreClient=new Z_(r._authCredentials,r._appCheckCredentials,r._queue,i,r._componentsProvider&&function(u){const l=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(l),_online:l}}(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(t){this._byteString=t}static fromBase64String(t){try{return new Ft(lt.fromBase64String(t))}catch(e){throw new O(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new Ft(lt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:Ft._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(Mr(t,Ft._jsonSchema))return Ft.fromBase64String(t.bytes)}}Ft._jsonSchemaVersion="firestore/bytes/1.0",Ft._jsonSchema={type:dt("string",Ft._jsonSchemaVersion),bytes:dt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ot(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return j(this._lat,t._lat)||j(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Kt._jsonSchemaVersion}}static fromJSON(t){if(Mr(t,Kt._jsonSchema))return new Kt(t.latitude,t.longitude)}}Kt._jsonSchemaVersion="firestore/geoPoint/1.0",Kt._jsonSchema={type:dt("string",Kt._jsonSchemaVersion),latitude:dt("number"),longitude:dt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,t._values)}toJSON(){return{type:Gt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(Mr(t,Gt._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every(e=>typeof e=="number"))return new Gt(t.vectorValues);throw new O(P.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Gt._jsonSchemaVersion="firestore/vectorValue/1.0",Gt._jsonSchema={type:dt("string",Gt._jsonSchemaVersion),vectorValues:dt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay=/^__.*__$/;class uy{constructor(t,e,n){this.data=t,this.fieldMask=e,this.fieldTransforms=n}toMutation(t,e){return this.fieldMask!==null?new ve(t,this.data,this.fieldMask,e,this.fieldTransforms):new kn(t,this.data,e,this.fieldTransforms)}}function bd(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M(40011,{Ec:r})}}class Ta{constructor(t,e,n,s,i,a){this.settings=t,this.databaseId=e,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.Ac(),this.fieldTransforms=i||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(t){return new Ta(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Rc({path:n,mc:!1});return s.fc(t),s}gc(t){var e;const n=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Rc({path:n,mc:!1});return s.Ac(),s}yc(t){return this.Rc({path:void 0,mc:!0})}wc(t){return Xs(t,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.fc(this.path.get(t))}fc(t){if(t.length===0)throw this.wc("Document fields must not be empty");if(bd(this.Ec)&&ay.test(t))throw this.wc('Document fields cannot begin and end with "__"')}}class cy{constructor(t,e,n){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=n||di(t)}Dc(t,e,n,s=!1){return new Ta({Ec:t,methodName:e,bc:n,path:ot.emptyPath(),mc:!1,Sc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ly(r){const t=r._freezeSettings(),e=di(r._databaseId);return new cy(r._databaseId,!!t.ignoreUndefinedProperties,e)}function hy(r,t,e,n,s,i={}){const a=r.Dc(i.merge||i.mergeFields?2:0,t,e,s);Vd("Data must be an object, but it was:",a,n);const u=Rd(n,a);let l,d;if(i.merge)l=new Lt(a.fieldMask),d=a.fieldTransforms;else if(i.mergeFields){const m=[];for(const g of i.mergeFields){const A=dy(t,g,e);if(!a.contains(A))throw new O(P.INVALID_ARGUMENT,`Field '${A}' is specified in your field mask but missing from your input data.`);my(m,A)||m.push(A)}l=new Lt(m),d=a.fieldTransforms.filter(g=>l.covers(g.field))}else l=null,d=a.fieldTransforms;return new uy(new Vt(u),l,d)}function Sd(r,t){if(Pd(r=Vs(r)))return Vd("Unsupported field value:",t,r),Rd(r,t);if(r instanceof Ad)return function(n,s){if(!bd(s.Ec))throw s.wc(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s.wc(`${n._methodName}() is not currently supported inside arrays`);const i=n._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(r,t),null;if(r===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),r instanceof Array){if(t.settings.mc&&t.Ec!==4)throw t.wc("Nested arrays are not supported");return function(n,s){const i=[];let a=0;for(const u of n){let l=Sd(u,s.yc(a));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),a++}return{arrayValue:{values:i}}}(r,t)}return function(n,s){if((n=Vs(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Qg(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const i=Y.fromDate(n);return{timestampValue:Rn(s.serializer,i)}}if(n instanceof Y){const i=new Y(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Rn(s.serializer,i)}}if(n instanceof Kt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ft)return{bytesValue:Th(s.serializer,n._byteString)};if(n instanceof gt){const i=s.databaseId,a=n.firestore._databaseId;if(!a.isEqual(i))throw s.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Jo(n.firestore._databaseId||s.databaseId,n._key.path)}}if(n instanceof Gt)return function(a,u){return{mapValue:{fields:{[jo]:{stringValue:qo},[Tn]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw u.wc("VectorValues must only contain numeric values.");return Go(u.serializer,d)})}}}}}}(n,s);throw s.wc(`Unsupported field value: ${No(n)}`)}(r,t)}function Rd(r,t){const e={};return Ul(r)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Qe(r,(n,s)=>{const i=Sd(s,t.Vc(n));i!=null&&(e[n]=i)}),{mapValue:{fields:e}}}function Pd(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof Y||r instanceof Kt||r instanceof Ft||r instanceof gt||r instanceof Ad||r instanceof Gt)}function Vd(r,t,e){if(!Pd(e)||!wl(e)){const n=No(e);throw n==="an object"?t.wc(r+" a custom object"):t.wc(r+" "+n)}}function dy(r,t,e){if((t=Vs(t))instanceof Ea)return t._internalPath;if(typeof t=="string")return Cd(r,t);throw Xs("Field path arguments must be of type string or ",r,!1,void 0,e)}const fy=new RegExp("[~\\*/\\[\\]]");function Cd(r,t,e){if(t.search(fy)>=0)throw Xs(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,e);try{return new Ea(...t.split("."))._internalPath}catch{throw Xs(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,e)}}function Xs(r,t,e,n,s){const i=n&&!n.isEmpty(),a=s!==void 0;let u=`Function ${t}() called with invalid data`;e&&(u+=" (via `toFirestore()`)"),u+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${n}`),a&&(l+=` in document ${s}`),l+=")"),new O(P.INVALID_ARGUMENT,u+r+l)}function my(r,t){return r.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(t,e,n,s,i){this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new gt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new gy(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(xd("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class gy extends Dd{data(){return super.data()}}function xd(r,t){return typeof t=="string"?Cd(r,t):t instanceof Ea?t._internalPath:t._delegate._internalPath}class py{convertValue(t,e="none"){switch(pe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return it(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ee(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw M(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const n={};return Qe(t,(s,i)=>{n[s]=this.convertValue(i,e)}),n}convertVectorValue(t){var e,n,s;const i=(s=(n=(e=t.fields)===null||e===void 0?void 0:e[Tn].arrayValue)===null||n===void 0?void 0:n.values)===null||s===void 0?void 0:s.map(a=>it(a.doubleValue));return new Gt(i)}convertGeoPoint(t){return new Kt(it(t.latitude),it(t.longitude))}convertArray(t,e){return(t.values||[]).map(n=>this.convertValue(n,e))}convertServerTimestamp(t,e){switch(e){case"previous":const n=ni(t);return n==null?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(Pr(t));default:return null}}convertTimestamp(t){const e=te(t);return new Y(e.seconds,e.nanos)}convertDocumentKey(t,e){const n=Z.fromString(t);L(Dh(n),9688,{name:t});const s=new ze(n.get(1),n.get(3)),i=new N(n.popFirst(5));return s.isEqual(e)||ct(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _y(r,t,e){let n;return n=r?r.toFirestore(t):t,n}class lr{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class je extends Dd{constructor(t,e,n,s,i,a){super(t,e,n,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new Ss(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const n=this._document.data.field(xd("DocumentSnapshot.get",t));if(n!==null)return this._userDataWriter.convertValue(n,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(P.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=je._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}je._jsonSchemaVersion="firestore/documentSnapshot/1.0",je._jsonSchema={type:dt("string",je._jsonSchemaVersion),bundleSource:dt("string","DocumentSnapshot"),bundleName:dt("string"),bundle:dt("string")};class Ss extends je{data(t={}){return super.data(t)}}class Er{constructor(t,e,n,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new lr(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(n=>{t.call(e,new Ss(this._firestore,this._userDataWriter,n.key,n,new lr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new O(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const l=new Ss(s._firestore,s._userDataWriter,u.doc.key,u.doc,new lr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const l=new Ss(s._firestore,s._userDataWriter,u.doc.key,u.doc,new lr(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,m=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),m=a.indexOf(u.doc.key)),{type:yy(u.type),doc:l,oldIndex:d,newIndex:m}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(P.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=Er._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=xo.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(e.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function yy(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M(61501,{type:r})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ny(r){r=Ds(r,gt);const t=Ds(r.firestore,Ia);return ry(wd(t),r._key).then(e=>Ty(t,r,e))}Er._jsonSchemaVersion="firestore/querySnapshot/1.0",Er._jsonSchema={type:dt("string",Er._jsonSchemaVersion),bundleSource:dt("string","QuerySnapshot"),bundleName:dt("string"),bundle:dt("string")};class Iy extends py{constructor(t){super(),this.firestore=t}convertBytes(t){return new Ft(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new gt(this.firestore,null,e)}}function ky(r,t,e){r=Ds(r,gt);const n=Ds(r.firestore,Ia),s=_y(r.converter,t);return Ey(n,[hy(ly(n),"setDoc",r._key,s,r.converter!==null,e).toMutation(r._key,kt.none())])}function Ey(r,t){return function(n,s){const i=new Jt;return n.asyncQueue.enqueueAndForget(async()=>M_(await ey(n),s,i)),i.promise}(wd(r),t)}function Ty(r,t,e){const n=e.docs.get(t._key),s=new Iy(r);return new je(r,s,t._key,n,new lr(e.hasPendingWrites,e.fromCache),t.converter)}class vy{constructor(t){let e;this.kind="persistent",t!=null&&t.tabManager?(t.tabManager._initialize(t),e=t.tabManager):(e=Sy(),e._initialize(t)),this._onlineComponentProvider=e._onlineComponentProvider,this._offlineComponentProvider=e._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function wy(r){return new vy(r)}class Ay{constructor(t){this.forceOwnership=t,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=kr.provider,this._offlineComponentProvider={build:e=>new Id(e,t==null?void 0:t.cacheSizeBytes,this.forceOwnership)}}}class by{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(t){this._onlineComponentProvider=kr.provider,this._offlineComponentProvider={build:e=>new Y_(e,t==null?void 0:t.cacheSizeBytes)}}}function Sy(r){return new Ay(void 0)}function Ry(){return new by}(function(t,e=!0){(function(s){Nn=s})(Dm),Cs(new Tr("firestore",(n,{instanceIdentifier:s,options:i})=>{const a=n.getProvider("app").getImmediate(),u=new Ia(new Km(n.getProvider("auth-internal")),new Hm(a,n.getProvider("app-check-internal")),function(d,m){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new O(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ze(d.options.projectId,m)}(a,s),a);return i=Object.assign({useFetchStreams:e},i),u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),fn(Nu,ku,t),fn(Nu,ku,"esm2017")})();var Py="firebase",Vy="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */fn(Py,Vy,"app");const Cy={apiKey:"AIzaSyB1PNvmmnZZ2DibHdKjluG64gbYUTcAm_I",authDomain:"cosy-conflans.firebaseapp.com",projectId:"cosy-conflans",storageBucket:"cosy-conflans.firebasestorage.app",messagingSenderId:"701291286359",appId:"1:701291286359:web:5c7b1b236d7e90ea0bf812"},Oy=iy(xm(Cy),{localCache:wy({tabManager:Ry()})}),My="suiviCaMarge",Fy="previsionnel",Ly="stocks",By="magasin_275",Uy=r=>r==="ok"?"Firebase · à jour":r==="saving"?"Enregistrement…":r==="offline"?"Hors ligne · saisie conservée":r==="error"?"Firebase · injoignable":"Firebase · connexion…",jy=r=>r==="ok"?"ok":r==="error"?"error":r==="offline"?"warn":"loading";export{Fy as C,By as D,jy as a,ky as b,Oy as c,xy as d,My as e,Ly as f,Ny as g,Uy as s};
