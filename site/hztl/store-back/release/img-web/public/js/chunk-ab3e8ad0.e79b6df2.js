(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ab3e8ad0"],{"0978":function(t,e,a){},"466d":function(t,e,a){"use strict";var s=a("d784"),i=a("825a"),o=a("50c4"),n=a("1d80"),r=a("8aa5"),c=a("14c3");s("match",1,(function(t,e,a){return[function(e){var a=n(this),s=void 0==e?void 0:e[t];return void 0!==s?s.call(e,a):new RegExp(e)[t](String(a))},function(t){var s=a(e,t,this);if(s.done)return s.value;var n=i(t),l=String(this);if(!n.global)return c(n,l);var u=n.unicode;n.lastIndex=0;var p,d=[],m=0;while(null!==(p=c(n,l))){var f=String(p[0]);d[m]=f,""===f&&(n.lastIndex=r(l,o(n.lastIndex),u)),m++}return 0===m?null:d}]}))},"4de4":function(t,e,a){"use strict";var s=a("23e7"),i=a("b727").filter,o=a("1dde"),n=o("filter");s({target:"Array",proto:!0,forced:!n},{filter:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},5530:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));a("b64b"),a("a4d3"),a("4de4"),a("e439"),a("159b"),a("dbb4");var s=a("ade3");function i(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function o(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?i(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}},6872:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"title"},[a("span",[t._v(t._s(t.titleName))]),a("div",{staticClass:"dashed"})])},i=[],o={props:{titleName:String}},n=o,r=(a("774a"),a("2877")),c=Object(r["a"])(n,s,i,!1,null,"ed9d470a",null);e["a"]=c.exports},"73fc":function(t,e,a){},"774a":function(t,e,a){"use strict";a("0978")},a434:function(t,e,a){"use strict";var s=a("23e7"),i=a("23cb"),o=a("a691"),n=a("50c4"),r=a("7b0b"),c=a("65f0"),l=a("8418"),u=a("1dde"),p=u("splice"),d=Math.max,m=Math.min,f=9007199254740991,v="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!p},{splice:function(t,e){var a,s,u,p,y,h,g=r(this),b=n(g.length),_=i(t,b),D=arguments.length;if(0===D?a=s=0:1===D?(a=0,s=b-_):(a=D-2,s=m(d(o(e),0),b-_)),b+a-s>f)throw TypeError(v);for(u=c(g,s),p=0;p<s;p++)y=_+p,y in g&&l(u,p,g[y]);if(u.length=s,a<s){for(p=_;p<b-s;p++)y=p+s,h=p+a,y in g?g[h]=g[y]:delete g[h];for(p=b;p>b-s+a;p--)delete g[p-1]}else if(a>s)for(p=b-s;p>_;p--)y=p+s-1,h=p+a-1,y in g?g[h]=g[y]:delete g[h];for(p=0;p<a;p++)g[p+_]=arguments[p+2];return g.length=b-s+a,u}})},ade3:function(t,e,a){"use strict";function s(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}a.d(e,"a",(function(){return s}))},b023:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"basic_setting"},[a("div",{staticClass:"goods_div"},[a("DetailTitle",{attrs:{titleName:"库存设置"}}),a("div",{staticClass:"goods_info"},[a("p",{staticClass:"autoConfirmDiv item_set"},[t._v(" 是否展示0库存配件 "),a("el-switch",{model:{value:t.postData.allowZeroStock,callback:function(e){t.$set(t.postData,"allowZeroStock",e)},expression:"postData.allowZeroStock"}}),t.postData.allowZeroStock?a("span",{staticClass:"switch-yes",staticStyle:{bottom:"0",left:"132px"}},[t._v("是")]):t._e(),t.postData.allowZeroStock?t._e():a("span",{staticClass:"switch-no",staticStyle:{bottom:"0",left:"147px"}},[t._v("否")]),a("span",{staticClass:"greyColor tip_left"},[t._v("* 若设置为“是”，则真实的可订货库存为0 的配件客户可以查到，若设置为“否”则真实的可订货库存为0的配件客户将无法查询到")])],1),t._m(0),t.isErpUser?t._e():a("div",{staticClass:"tip_ptn tip_stock"},[t.stockShowModeVisible?[a("el-popover",{attrs:{placement:"top",width:"600",trigger:"click"}},[a("div",[a("p",[t._v("举例：配件A性质完好，在仓库1有库存10个、仓库2有库存20个、仓库3有库存30个、仓库4有库存40个，此时库存分组1关联仓库1仓库2、库存分组2关联仓库3仓库4，100及以上库存状态“充足”、30及以下展示“紧张”；此时按下列三种不同的维度展示库存效果")]),a("div",{staticClass:"mt-3"},[a("div",{staticClass:"flex"},[a("div",{staticClass:"tip_label"},[t._v("按配件：")]),a("div",{staticClass:"tip_content greyColor"},[t._v("配件A 库存：充足")])]),a("div",{staticClass:"flex"},[a("div",{staticClass:"tip_label"},[t._v("按配件+库存分组：")]),a("div",{staticClass:"tip_content greyColor"},[a("p",[t._v("配件A 库存分组1 库存：紧张")]),a("p",{staticStyle:{"margin-left":"43px"}},[t._v("库存分组2 库存：70个")])])]),a("div",{staticClass:"flex"},[a("div",{staticClass:"tip_label"},[t._v("按配件+仓库：")]),a("div",{staticClass:"tip_content greyColor"},[a("p",[t._v("配件A 仓库1 库存：紧张")]),a("p",{staticStyle:{"margin-left":"43px"}},[t._v("仓库2 库存：紧张")]),a("p",{staticStyle:{"margin-left":"43px"}},[t._v("仓库3 库存：紧张")]),a("p",{staticStyle:{"margin-left":"43px"}},[t._v("仓库4 库存：40个")])])])])]),a("i",{staticClass:"el-icon-question tips_logo",attrs:{slot:"reference"},slot:"reference"})]),t._m(1),a("el-radio-group",{model:{value:t.postData.stockShowMode,callback:function(e){t.$set(t.postData,"stockShowMode",e)},expression:"postData.stockShowMode"}},[a("el-radio",{staticClass:"radio-margin",attrs:{label:0}},[t._v("按配件")]),a("el-radio",{staticClass:"radio-margin",attrs:{label:1}},[t._v("按配件+库存分组")]),a("el-radio",{staticClass:"radio-margin",attrs:{label:2}},[t._v("按配件+仓库")])],1),a("span",{staticClass:"tip_left"},[a("span",{staticClass:"greyColor"},[t._v("* 若按配件+库存分组设置，需要先创建库存分组")]),a("a",{staticClass:"primaryColor",on:{click:t.toStockGroup}},[t._v("去设置 >")])])]:t._e()],2),a("div",{staticClass:"stock-container"},[a("div",{staticStyle:{"max-height":"200px",overflow:"auto"}},t._l(t.postData.stockRangeRule,(function(e,s){return a("div",{key:s,staticStyle:{display:"flex","align-items":"center","margin-bottom":"8px"}},[a("el-tooltip",{attrs:{enterable:!1,effect:"dark",content:"删除",placement:"top"}},[a("i",{staticClass:"el-icon-delete del_logo",on:{click:function(e){return t.clearStockItem(s)}}})]),a("div",{staticStyle:{"margin-right":"8px"}},[t._v("库存区间")]),a("el-input",{staticStyle:{flex:"none",width:"90px"},attrs:{type:"number",size:"small",placeholder:"-"},on:{change:function(a){return t.onNumberInput("startQty",e)}},model:{value:e.startQty,callback:function(a){t.$set(e,"startQty",a)},expression:"item.startQty"}}),a("div",{staticStyle:{margin:"0 8px"}},[t._v("至")]),a("el-input",{staticStyle:{flex:"none",width:"90px"},attrs:{type:"number",size:"small",placeholder:"-"},on:{change:function(a){return t.onNumberInput("endQty",e)}},model:{value:e.endQty,callback:function(a){t.$set(e,"endQty",a)},expression:"item.endQty"}}),a("div",{staticStyle:{margin:"0 8px"}},[t._v("时库存展示为")]),a("div",{staticStyle:{display:"flex","align-items":"center","margin-left":"5px"}},[a("el-select",{attrs:{size:"small"},model:{value:e.type,callback:function(a){t.$set(e,"type",a)},expression:"item.type"}},t._l(t.STOCK_TYPES,(function(t,s){return a("el-option",{key:s,attrs:{disabled:!e.endQty&&5==t.code,label:t.name,value:t.code}})})),1),a("el-input",{directives:[{name:"show",rawName:"v-show",value:5===e.type,expression:"item.type === 5"}],staticStyle:{flex:"none",width:"80px"},attrs:{type:"number",size:"small"},on:{change:function(a){return t.onNumberInput("upperLimitQty",e)}},model:{value:e.upperLimitQty,callback:function(a){t.$set(e,"upperLimitQty",a)},expression:"item.upperLimitQty"}})],1)],1)})),0),a("el-button",{attrs:{type:"text"},on:{click:t.addStockItem}},[t._v("添加库存区间")])],1)])],1),a("div",{staticClass:"goods_div"},[a("DetailTitle",{attrs:{titleName:"价格设置"}}),a("div",{staticClass:"goods_info"},[a("p",{staticClass:"autoConfirmDiv item_set"},[t._v(" 是否展示0价格商品 "),a("el-switch",{class:t.postData.allowZeroPrice?"yes":"no",model:{value:t.postData.allowZeroPrice,callback:function(e){t.$set(t.postData,"allowZeroPrice",e)},expression:"postData.allowZeroPrice"}}),a("span",{staticClass:"greyColor tip_left"},[t._v("* 若设置为“是”，则客户享受的价格类型为0时客户也可以查询到该商品，但0价格的商品不允许提交订单；若设置为“否” ，则客户享受的价格类型为0时客户将无法查询到该商品")])],1)])],1),a("div",{staticClass:"goods_div"},[a("DetailTitle",{attrs:{titleName:"订单设置"}}),a("div",{staticClass:"goods_info"},[a("p",{staticClass:"stockChechDiv item_set"},[t._v(" 下单时是否需要校验库存 "),a("el-switch",{model:{value:t.postData.checkStock,callback:function(e){t.$set(t.postData,"checkStock",e)},expression:"postData.checkStock"}}),t.postData.checkStock?a("span",{staticClass:"switch-yes",staticStyle:{bottom:"0",left:"165px"}},[t._v("是")]):t._e(),t.postData.checkStock?t._e():a("span",{staticClass:"switch-no",staticStyle:{bottom:"0",left:"180px"}},[t._v("否")]),a("span",{staticClass:"greyColor tip_left"},[t._v("*若设置为“是”，用户只能购买您有库存的商品；若设置为“否”，用户购买配件不受库存限制")])],1),a("p",{staticClass:"autoConfirmDiv item_set"},[t._v(" 是否自动确认订单 "),a("el-switch",{model:{value:t.postData.autoConfirmOrder,callback:function(e){t.$set(t.postData,"autoConfirmOrder",e)},expression:"postData.autoConfirmOrder"}}),t.postData.autoConfirmOrder?a("span",{staticClass:"switch-yes",staticStyle:{bottom:"0",left:"123px"}},[t._v("是")]):t._e(),t.postData.autoConfirmOrder?t._e():a("span",{staticClass:"switch-no",staticStyle:{bottom:"0",left:"138px"}},[t._v("否")]),a("span",{staticClass:"greyColor tip_left"},[t._v("*若设置为“是”，客户提交订单后，系统将自动确认订单，客户直接进入支付环节；若设置为“否”，客户提交订单后，需要您手动去确认接单后，客户才能进行付款")])],1),a("p",{staticClass:"item_set"},[t._v(" 订单完成发货 "),a("el-input-number",{staticStyle:{width:"88px"},attrs:{"controls-position":"right",step:1,size:"small",min:0},on:{change:function(e){return t.onNumberInput("autoReceiveOrder")}},model:{value:t.postData.autoReceiveOrder,callback:function(e){t.$set(t.postData,"autoReceiveOrder",e)},expression:"postData.autoReceiveOrder"}}),t._v(" 天后系统自动收货 "),a("span",{staticClass:"greyColor tip_left"},[t._v("*订单中的商品全部完成发货后到达当前设置的天数后系统自动对该订单进行收货，并将此订单更新为“已完成”状态")])],1),a("div",{staticClass:"item_set"},[a("span",[t._v("订单线下支付财务审核方式")]),a("el-radio-group",{model:{value:t.postData.autoConfirmOfflinePay,callback:function(e){t.$set(t.postData,"autoConfirmOfflinePay",e)},expression:"postData.autoConfirmOfflinePay"}},[a("el-radio",{staticClass:"radio-margin",attrs:{label:!1}},[t._v("手动审核")]),a("el-radio",{staticClass:"radio-margin",attrs:{label:!0}},[t._v("自动审核")])],1),a("span",{staticClass:"greyColor tip_left"},[t._v("* 若手动审核则客户提交待财务审核的支付单后商家需要在交易->支付单中进行手动审核才能完成订单的支付环节，若设置为自动审核则客户提交待财务审核支付单后自动审核通过，请谨慎设置")])],1)])],1),a("div",{staticClass:"goods_div"},[a("DetailTitle",{attrs:{titleName:"客户设置"}}),a("div",{staticClass:"goods_info"},[a("div",{staticClass:"item_set"},[a("span",[t._v("客户审核方式")]),t.postData.customerSetting?a("el-radio-group",{on:{change:t.refrensh},model:{value:t.postData.customerSetting.autoAudit,callback:function(e){t.$set(t.postData.customerSetting,"autoAudit",e)},expression:"postData.customerSetting.autoAudit"}},[a("el-radio",{staticClass:"radio-margin",attrs:{label:!1}},[t._v("手动审核")]),a("el-radio",{staticClass:"radio-margin",attrs:{label:!0}},[t._v("自动审核")])],1):t._e()],1),a("div",{staticClass:"customer-container"},[t.postData.customerSetting&&t.postData.customerSetting.autoAudit?a("div",[a("div",[a("div",{staticClass:"con-input"},[a("span",{staticClass:"title expire"},[t._v("结算方式")]),t.postData.customerSetting?a("el-select",{attrs:{size:"small"},model:{value:t.postData.customerSetting.paymentType,callback:function(e){t.$set(t.postData.customerSetting,"paymentType",e)},expression:"postData.customerSetting.paymentType"}},t._l(t.paymentTypeList,(function(t){return a("el-option",{key:t.Code,attrs:{label:t.name,value:t.Code}})})),1):t._e()],1),a("div",{staticClass:"con-input"},[a("span",{staticClass:"title expire"},[t._v("发票类型")]),t.postData.customerSetting?a("el-select",{attrs:{size:"small"},model:{value:t.postData.customerSetting.invoiceType,callback:function(e){t.$set(t.postData.customerSetting,"invoiceType",e)},expression:"postData.customerSetting.invoiceType"}},t._l(t.invoiceTypeList,(function(t){return a("el-option",{key:t.Code,attrs:{label:t.name,value:t.Code}})})),1):t._e()],1)]),a("div",[a("div",{staticClass:"con-input"},[a("span",{staticClass:"title"},[t._v("价格类型")]),t.postData.customerSetting?a("el-select",{attrs:{size:"small"},model:{value:t.postData.customerSetting.priceType,callback:function(e){t.$set(t.postData.customerSetting,"priceType",e)},expression:"postData.customerSetting.priceType"}},t._l(t.priceTypeList,(function(t){return a("el-option",{key:t.Code,attrs:{label:t.name,value:t.Code}})})),1):t._e()],1),a("div",{staticClass:"con-input"},[a("span",{staticClass:"title"},[t._v("享受折扣率")]),t.postData.customerSetting?a("el-input",{attrs:{size:"small"},model:{value:t.postData.customerSetting.discount,callback:function(e){t.$set(t.postData.customerSetting,"discount",e)},expression:"postData.customerSetting.discount"}}):t._e()],1)])]):t._e()])])],1),a("div",{staticClass:"footer_btn"},[a("div",{staticClass:"button-div"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.save}},[t._v("保存")])],1)])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"set_margin_bottom"},[a("span",[t._v("库存展示设置")]),a("span",{staticClass:"greyColor tip_left"},[t._v("（在可订货数量的基础上设置展示给客户看的库存信息，未包含在库存区间内的将展示真实的库存）")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"margin-left":"10px"}},[a("span",[t._v("库存展示维度")])])}],o=a("b85c"),n=a("5530"),r=(a("d81d"),a("466d"),a("ac1f"),a("5319"),a("a434"),a("a9e3"),a("4de4"),a("6872")),c=a("d4ec"),l=a("bee2"),u=a("b775"),p=function(){function t(){Object(c["a"])(this,t)}return Object(l["a"])(t,[{key:"getSettingDetail",value:function(t){return Object(u["b"])({baseURL:u["a"].accounts,url:"/company-settings/detail",method:"get",params:t})}},{key:"getDictsByType",value:function(t){return Object(u["b"])({baseURL:u["a"].accounts,url:"/dicts",method:"get",params:t})}},{key:"saveSetting",value:function(t){return Object(u["b"])({baseURL:u["a"].accounts,url:"/company-settings",method:"post",data:t})}}]),t}(),d=new p,m=[{code:0,name:"有货"},{code:1,name:"充足"},{code:2,name:"紧张"},{code:3,name:"缺货"},{code:4,name:"真实库存"},{code:5,name:"设置展示上限"}],f={name:"basic_setting",components:{DetailTitle:r["a"]},data:function(){return{postData:{partNameRule:0,stockRangeRule:[],allowZeroStock:!0,checkStock:!0,autoConfirmOrder:!1,autoReceiveOrder:15,stockShowMode:0,allowZeroPrice:!1,autoConfirmOfflinePay:!1},premiumRates:{},paymentTypeList:[],invoiceTypeList:[],priceTypeList:[],showFirstTab:!1,tabs:[],active:0,STOCK_TYPES:m,isErpUser:!1}},watch:{"$store.state.base":{handler:function(t){this.isErpUser=2===t.erpType},deep:!0,immediate:!0}},computed:{stockShowModeVisible:function(){var t=!0,e=this.$store.state.base.erp,a=e.hasYP,s=e.hasYX;return(a||s)&&(t=!1),t}},mounted:function(){this.initData()},methods:{toStockGroup:function(){this.$router.push("/stockGroup")},initData:function(){var t=this;d.getSettingDetail().then((function(e){for(var a in t.postData=Object(n["a"])(Object(n["a"])({},e),{},{stockRangeRule:e.stockRangeRule&&e.stockRangeRule.length?e.stockRangeRule.map((function(t){return Object(n["a"])({},t)})):[{startQty:"0",endQty:"",upperLimitQty:"",type:0}],autoReceiveOrder:e.autoReceiveOrder||15}),t.premiumRates=e.premiumRates,t.premiumRates)t.toNumberFn(t.premiumRates,a);t.getpaymentTypeList(),t.getinvoiceTypeList(),t.getpriceTypeList()}))},toNumberFn:function(t,e){var a=Math.round(100*parseFloat(t[e]?t[e]:0));t[e].match(/\d+(\.\d{0,2})?/)?t[e]=a+"%":t[e]="0%",this.$forceUpdate()},toFixdTwo:function(t,e){t[e].indexOf("%")>-1?(t[e]=t[e].replace(/\%/,""),t[e]=parseFloat(t[e])):t[e]=t[e].substr(0,t[e].length-1),/^\d{1,4}?/.test(t[e])?t[e]=t[e]+"%":t[e]="0%",this.$forceUpdate()},getpaymentTypeList:function(){var t=this,e={type:"paymentType"};d.getDictsByType(e).then((function(e){t.paymentTypeList=e,t.postData.customerSetting.paymentType||(t.postData.customerSetting.paymentType=t.paymentTypeList[0].Code)})).catch((function(e){t.$message.error(e)}))},getinvoiceTypeList:function(){var t=this,e={type:"invoiceType"};d.getDictsByType(e).then((function(e){t.invoiceTypeList=e,t.postData.customerSetting.invoiceType||(t.postData.customerSetting.invoiceType=t.invoiceTypeList[0].Code)})).catch((function(e){t.$message.error(e)}))},getpriceTypeList:function(){var t=this,e={type:"priceType"};d.getDictsByType(e).then((function(e){t.priceTypeList=e,t.postData.customerSetting.priceType||(t.postData.customerSetting.priceType=t.priceTypeList[0].Code)})).catch((function(e){t.$message.error(e)}))},toggle:function(t){this.active!=t&&(this.active=t,this.showFirstTab=!this.showFirstTab)},refrensh:function(){this.$forceUpdate()},addSettingList:function(){if(this.postData.stockRangeRule.length>=20)this.$alert("最多只能添加20条","提示",{confirmButtonText:"确定"});else{var t=this.checkIsCross();t||this.postData.stockRangeRule.push({stockRangeStart:"",stockRangeEnd:"",upperLimit:""})}},deleteThisItem:function(t){this.postData.stockRangeRule.splice(t,1)},checkIsCross:function(){if(this.postData.stockRangeRule&&this.postData.stockRangeRule.length>0){var t,e=Object(o["a"])(this.postData.stockRangeRule);try{for(e.s();!(t=e.n()).done;){var a=t.value;if(!a.startQty&&!a.endQty)return this.$alert("库存区间值不能全部为空","提示",{confirmButtonText:"确定"}),!0;if(a.startQty&&a.endQty&&Number(a.startQty)>=Number(a.endQty))return this.$alert("库存区间开始值不能大于等于结束值","提示",{confirmButtonText:"确定"}),!0;if(5===a.type&&!a.upperLimitQty)return this.$alert("库存显示上限不能为空","提示",{confirmButtonText:"确定"}),!0}}catch(s){e.e(s)}finally{e.f()}return!1}return!1},toFloatNumberFn:function(t){var e={};for(var a in t){var s=t[a].substr(0,t[a].length-1);if(1==s.length)s=parseFloat("0.0"+s)+"";else if(2==s.length)s="0."+s;else if(s.length>2){var i=s.substr(0,s.length-2),o=s.substr(s.length-2);s=i+"."+o}e[a]=s}return e},save:function(){var t=this,e=!1;if(e=this.checkIsCross(),!e){if(this.postData.stockRangeRule&&this.postData.stockRangeRule.length>0){var a,s=Object(o["a"])(this.postData.stockRangeRule);try{for(s.s();!(a=s.n()).done;){var i=a.value;i.startQty=i.startQty||null,i.endQty=i.endQty||null,i.upperLimitQty=i.upperLimitQty||null}}catch(u){s.e(u)}finally{s.f()}}if(this.postData.stockRangeRule&&(this.postData.stockRangeRule.length<=0||this.postData.stockRangeRule.length>50))this.$alert("库存区间设置条数需大于0小于等于50条","提示",{confirmButtonText:"确定"});else{var r=Object(n["a"])({},this.premiumRates),c=this.toFloatNumberFn(r);this.postData.premiumRates=Object.assign({},c),this.postData.customerSetting.autoAudit&&(this.postData.customerSetting.discount=""!==this.postData.customerSetting.discount?this.postData.customerSetting.discount:null);var l=Object(n["a"])(Object(n["a"])({},this.postData),{},{autoReceiveOrder:Number(this.postData.autoReceiveOrder)});d.saveSetting(l).then((function(e){t.$message({message:"操作成功！",type:"success"}),t.initData()})).catch((function(e){t.$message.error(e)}))}}},addStockItem:function(){if(this.postData.stockRangeRule.length>=50)this.$alert("最多只能添加50条","提示",{confirmButtonText:"确定"});else{var t=this.checkIsCross();t||this.postData.stockRangeRule.push({startQty:"0",endQty:"",upperLimitQty:"",type:0})}},clearStockItem:function(t){this.postData.stockRangeRule=this.postData.stockRangeRule.filter((function(e,a){return t!==a}))},onDecrease:function(t){Number(this.postData.autoReceiveOrder||0)>1&&(this.postData.autoReceiveOrder=Number(this.postData.autoReceiveOrder||0)-t)},onIncrease:function(t){this.postData.autoReceiveOrder=Number(this.postData.autoReceiveOrder||0)+t},onNumberInput:function(t,e){switch(t){case"startQty":e.startQty&&Number(e.startQty||0)<0&&(e.startQty=0);break;case"endQty":e.endQty&&Number(e.endQty||0)<Number(e.startQty||0)&&(e.endQty=e.startQty?Number(e.startQty)+1:0);break;case"upperLimitQty":e.upperLimitQty&&Number(e.upperLimitQty||0)<Number(e.startQty||0)&&(e.upperLimitQty=e.startQty||0),e.upperLimitQty&&e.endQty&&Number(e.upperLimitQty||0)>Number(e.endQty)&&(e.upperLimitQty=Number(e.endQty)>0?Number(e.endQty)-1:0);break;case"autoReceiveOrder":Number(this.postData.autoReceiveOrder||0)<1&&(this.postData.autoReceiveOrder=1),Number(this.postData.autoReceiveOrder||0)%1!==0&&(this.postData.autoReceiveOrder=Math.floor(Number(this.postData.autoReceiveOrder||0)));break;default:break}}}},v=f,y=(a("d998"),a("2877")),h=Object(y["a"])(v,s,i,!1,null,"39158bc5",null);e["default"]=h.exports},b64b:function(t,e,a){var s=a("23e7"),i=a("7b0b"),o=a("df75"),n=a("d039"),r=n((function(){o(1)}));s({target:"Object",stat:!0,forced:r},{keys:function(t){return o(i(t))}})},b85c:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");var s=a("06c5");function i(t,e){var a="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=Object(s["a"])(t))||e&&t&&"number"===typeof t.length){a&&(t=a);var i=0,o=function(){};return{s:o,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,r=!0,c=!1;return{s:function(){a=a.call(t)},n:function(){var t=a.next();return r=t.done,t},e:function(t){c=!0,n=t},f:function(){try{r||null==a["return"]||a["return"]()}finally{if(c)throw n}}}}},bee2:function(t,e,a){"use strict";function s(t,e){for(var a=0;a<e.length;a++){var s=e[a];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function i(t,e,a){return e&&s(t.prototype,e),a&&s(t,a),t}a.d(e,"a",(function(){return i}))},d4ec:function(t,e,a){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}a.d(e,"a",(function(){return s}))},d81d:function(t,e,a){"use strict";var s=a("23e7"),i=a("b727").map,o=a("1dde"),n=o("map");s({target:"Array",proto:!0,forced:!n},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},d998:function(t,e,a){"use strict";a("73fc")},dbb4:function(t,e,a){var s=a("23e7"),i=a("83ab"),o=a("56ef"),n=a("fc6a"),r=a("06cf"),c=a("8418");s({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var e,a,s=n(t),i=r.f,l=o(s),u={},p=0;while(l.length>p)a=i(s,e=l[p++]),void 0!==a&&c(u,e,a);return u}})},e439:function(t,e,a){var s=a("23e7"),i=a("d039"),o=a("fc6a"),n=a("06cf").f,r=a("83ab"),c=i((function(){n(1)})),l=!r||c;s({target:"Object",stat:!0,forced:l,sham:!r},{getOwnPropertyDescriptor:function(t,e){return n(o(t),e)}})}}]);
//# sourceMappingURL=chunk-ab3e8ad0.e79b6df2.js.map