!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("tags-view",[],t):"object"==typeof exports?exports["tags-view"]=t():e["tags-view"]=t()}(window,(function(){return function(e){var t={};function a(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(s,n,function(t){return e[t]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/",a(a.s=42)}({0:function(e,t,a){"use strict";function s(e,t,a,s,n,o,r,i){var u,c="function"==typeof e?e.options:e;if(t&&(c.render=t,c.staticRenderFns=a,c._compiled=!0),s&&(c.functional=!0),o&&(c._scopeId="data-v-"+o),r?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),n&&n.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(r)},c._ssrRegister=u):n&&(u=i?function(){n.call(this,(c.functional?this.parent:this).$root.$options.shadowRoot)}:n),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(e,t){return u.call(t),l(e,t)}}else{var g=c.beforeCreate;c.beforeCreate=g?[].concat(g,u):[u]}return{exports:e,options:c}}a.d(t,"a",(function(){return s}))},1:function(e,t){e.exports=require("vuex")},12:function(e,t){e.exports=require("vue")},17:function(e,t){e.exports=require("throttle-debounce/debounce")},42:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("ul",{ref:"elTabs",class:{"ht-tags-container":!0,"full-container":e.moreTags.length}},[e._l(e.showTags,(function(t){return a("li",{key:t[e.tagKey],class:{tag:!0,active:e.curRouteKey===t[e.tagKey]},style:{minWidth:e.tagWidth+"px"}},[a("span",{staticClass:"tag-link",on:{click:function(a){return e.routeChange(t)}}},[e._v(e._s(t.disName)+" ")]),e.showTags.length>1&&e.viewTags.includes(t)?a("span",{staticClass:"tag-icon",on:{click:function(a){return a.stopPropagation(),e.closeTag(t)}}},[a("i",{staticClass:"el-icon-close"})]):e._e()])})),a("li",{staticClass:"tag dropdown-tag"},[a("el-dropdown",{attrs:{size:"small"}},[a("span",{staticClass:"el-dropdown-link"},[a("i",{staticClass:"el-icon-caret-bottom"})]),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e._l(e.tagsMenus,(function(t){return a("el-dropdown-item",{key:t.command,staticClass:"ht-tag-dropdown-item",attrs:{command:t}},[a("span",{staticClass:"tag-link",on:{click:function(a){return e.handleMenuClick(t)}}},[e._v(e._s(t.name))])])})),e.moreTags.length?a("el-dropdown-item",{attrs:{divided:""}}):e._e(),a("div",{staticClass:"router-tags-container"},e._l([].concat(e.moreTags),(function(t){return a("el-dropdown-item",{key:t[e.tagKey],staticClass:"ht-tag-dropdown-item",attrs:{command:t}},[a("span",{staticClass:"tag-link",on:{click:function(a){return e.routeChange(t)}}},[e._v(e._s(t.disName))]),a("span",{staticClass:"tag-icon",on:{click:function(a){return a.stopPropagation(),e.closeTag(t)}}},[a("i",{staticClass:"el-icon-close"})])])})),1)],2)],1)],1)],2)])};s._withStripped=!0;var n=a(12),o=a.n(n),r=a(17),i=a.n(r),u=a(1),c=a.n(u);let l,g;o.a.use(c.a);const d={modules:{routeTags:{namespaced:!0,state:function(){return{storeTagKey:"name",tagWidth:140,maxLength:10,defaultTags:[],viewTags:[],moreTags:[]}},actions:{async addTag({state:e,commit:t},a){if(g.find(t=>t[e.storeTagKey]===a[e.storeTagKey]))return;let s=[...e.viewTags,...e.moreTags];const n=s.findIndex(t=>t[e.storeTagKey]===a[e.storeTagKey]);n>=0?e.maxLength<n+1+g.length?(s.splice(n,1),s.unshift(a)):s.splice(n,1,a):s.unshift(a),await t("updateTags",s)},async closeTag({state:e,commit:t},a){let s=[...e.viewTags,...e.moreTags];const{currentRoute:n}=l;if(s=s.filter(t=>t[e.storeTagKey]!==a[e.storeTagKey]),n[e.storeTagKey]===a[e.storeTagKey])if(s.length){const e=s[0];l.push({path:e.path,query:{...e.query}})}else l.push("/");await t("updateTags",s)},async closeTagByType({state:e,commit:t},a){let s=[...e.viewTags,...e.moreTags];switch(a.type){case"otherClose":s=s.filter(t=>t[e.storeTagKey]===a.routeKey);break;case"allClose":s=[],l.push("/")}await t("updateTags",s)},async changeMaxTagsByWidth({state:e,commit:t},a){const s=Math.floor((a.width-30)/e.tagWidth),n=[...e.viewTags,...e.moreTags],o=n.findIndex(e=>e.name===a.routeKey);o>=0&&s<o+1+g.length&&n.unshift(...n.splice(o,1)),e.maxLength=s,await t("updateTags",n)},async initTagsData({state:e,commit:t},a){l=a.router,g=a.defaultTags||[];let s=a.flexibleTags;s=s.filter(t=>{const a=l.match(t.path);return!g.map(t=>t[e.storeTagKey]).includes(t[e.storeTagKey])&&t.disName&&a&&a.matched&&a.matched.length}),await t("updateTags",s)},async clearTags({state:e,commit:t}){e.viewTags=[],e.moreTags=[],await t("updateTags")}},mutations:{updateTags(e,t){const a=t||[...e.viewTags,...e.moreTags];e.viewTags=a.splice(0,e.maxLength-g.length),e.moreTags=a},changeTagKey(e,t){e.storeTagKey=t}}}}};var h={name:"HtTagsView",componentName:"HtTagsView",store:()=>new c.a.Store({...d}),model:{prop:"value",event:"change"},props:{tagKey:{type:String,default:"name"},value:{type:Array,required:!0},defaultTags:{type:Array,default:()=>[]},addRouteTag:{type:Boolean,default:!0},formateName:{type:Function,default:e=>e.meta&&(e.meta.tagName||e.meta.title)||e.name}},data(){const e=[{command:"otherClose",name:"关闭其它"}];return this.defaultTags.length&&e.push({command:"allClose",name:"关闭所有"}),{debounceChangeMaxTags:i()(100,this.changeMaxTags),curTab:null,tagsMenus:e}},computed:{...Object(u.mapState)("routeTags",["storeTagKey","viewTags","moreTags","tagWidth"]),flexibleTags(){return[...this.viewTags,...this.moreTags]},showTags(){return[...this.defaultTags,...this.viewTags]||!1},curRouteKey(){return this.$route[this.storeTagKey]}},watch:{$route(){this.addRouteTag&&this.changeCurTag()},flexibleTags(e){this.$emit("change",e)}},created(){o.a.prototype.closePage=()=>{this.closeTag(this.$route)},this.changeTagKey(this.tagKey)},mounted(){this.initTagsData({defaultTags:this.defaultTags,router:this.$router,flexibleTags:this.value}),window.addEventListener("resize",this.debounceChangeMaxTags),"/"!==this.$route.fullPath&&this.changeCurTag(),this.$nextTick(()=>{this.changeMaxTags()})},beforeDestroy(){window.removeEventListener("resize",this.debounceChangeMaxTags)},methods:{...Object(u.mapActions)("routeTags",["addTag","closeTag","closeTagByType","changeMaxTagsByWidth","initTagsData"]),...Object(u.mapMutations)("routeTags",["changeTagKey"]),changeCurTag(){const e={disName:this.formateName(this.$route),name:this.$route.name,path:this.$route.path,query:this.$route.query||""};this.addTag(e),this.$emit("cur-tag-change",e)},handleMenuClick(e){this.closeTagByType({type:e.command,routeKey:this.curRouteKey})},routeChange(e){e[this.storeTagKey]!==this.curRouteKey&&this.$router.push({path:e.path,query:{...e.query}})},changeMaxTags(){this.$el&&this.changeMaxTagsByWidth({width:this.$el.offsetWidth,routeKey:this.curRouteKey})}}},p=a(0),T=Object(p.a)(h,s,[],!1,null,null,null);T.options.__file="packages/tags-view/src/tags-view.vue";var f=T.exports;f.install=function(e){e.component(f.name,f)};t.default=f}}).default}));
//# sourceMappingURL=index.js.map