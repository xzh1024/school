!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("hztl-ui/lib/packages/dialog")):"function"==typeof define&&define.amd?define("promise-dialog",["hztl-ui/lib/packages/dialog"],t):"object"==typeof exports?exports["promise-dialog"]=t(require("hztl-ui/lib/packages/dialog")):e["promise-dialog"]=t(e["hztl-ui/lib/packages/dialog"])}(window,(function(e){return function(e){var t={};function o(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(i,n,function(t){return e[t]}.bind(null,n));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=52)}({0:function(e,t,o){"use strict";function i(e,t,o,i,n,r,s,l){var a,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=o,c._compiled=!0),i&&(c.functional=!0),r&&(c._scopeId="data-v-"+r),s?(a=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=a):n&&(a=l?function(){n.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:n),a)if(c.functional){c._injectStyles=a;var d=c.render;c.render=function(e,t){return a.call(t),d(e,t)}}else{var u=c.beforeCreate;c.beforeCreate=u?[].concat(u,a):[a]}return{exports:e,options:c}}o.d(t,"a",(function(){return i}))},12:function(e,t){e.exports=require("vue")},3:function(e,t){e.exports=require("@vue/babel-helper-vue-jsx-merge-props")},36:function(t,o){t.exports=e},4:function(e,t){e.exports=require("lodash")},52:function(e,t,o){"use strict";o.r(t);var i=o(12),n=o.n(i),r=o(4),s=o(3),l=o.n(s),a=o(36),c={components:{HtDialog:o.n(a).a},data:()=>({isLoading:!1,topClass:"",width:"600px",visible:!1,disabledHotkeys:!1,keyScope:Symbol("promiseDialog"),model:{},isFocusCancel:!1,sureText:"",focusData:{updateIndex:0,initial:void 0,type:void 0,title:""},beforeConfirm:()=>!0,afterVisible(){}}),watch:{visible:{handler(e){e&&this.afterVisible()},immediate:!0}},methods:{async handleClose(e){this.isLoading=!0;let t=!e;if(e)try{t=await this.beforeConfirm(this.model)}catch(e){t=!1}this.isLoading=!1,t&&(this.visible=!1,this.closeDialog(e,this.model))},contentRender(){},closeDialog(){}},render(){const e=arguments[0];return e("ht-dialog",l()([{class:"ht-promise-dialog "+this.topClass,attrs:{visible:this.visible,title:this.title}},{on:{"update:visible":this.handleClose}},{attrs:{"close-on-click-modal":!1,width:this.width}}]),[this.contentRender(this.model),e("div",{class:"btns-group"},[e("el-button",{ref:"confirm",attrs:{type:"primary",plain:!0,size:"small"},directives:[{name:"loading",value:this.isLoading}],on:{click:()=>this.handleClose(!0)}},[this.sureText||"确认（F3）"]),e("el-button",{ref:"confirm",attrs:{type:"primary",plain:!0,size:"small"},on:{click:()=>this.handleClose(!1)}},["取消（Esc）"])])])}},d=o(0),u=Object(d.a)(c,void 0,void 0,!1,null,null,null);u.options.__file="packages/promise-dialog/src/main.vue";var p=u.exports;const f={topClass:"",width:"600px",title:null,visible:!1,sureText:"",isFocusCancel:!1,disabledHotkeys:!1,contentRender(){},model:{},beforeConfirm:()=>!0,afterVisible(){}},h=n.a.extend(p);let b,m,v=[];const g=e=>{b&&(e?b.resolve(m.model):b.reject(m.model))},y=()=>{if(m||(m=new h({el:document.createElement("div")}),m.closeDialog=g),(!m.visible||m.closeTimer)&&v.length>0){b=v.shift();const e=b.options;for(const t in e)Object.prototype.hasOwnProperty.call(e,t)&&(m[t]=e[t]);void 0===e.closeDialog&&(m.closeDialog=g);const t=m.closeDialog;m.closeDialog=(e,o)=>{t(e,o),y()},document.body.appendChild(m.$el),n.a.nextTick(()=>{m.visible=!0})}},x=e=>{if(!n.a.prototype.$isServer)return new Promise((t,o)=>{v.push({options:Object(r.merge)({},f,Object(r.cloneDeep)(e)),resolve:t,reject:o}),y()})};x.close=()=>{m.doClose(),m.visible=!1,v=[],b=null};var _=x;t.default=_}}).default}));
//# sourceMappingURL=index.js.map