(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{Lyq9:function(e,a,t){e.exports={list_box:"list_box___37WJF",header_content:"header_content___1BP2p",header_title:"header_title___3rLph",header_right:"header_right___2OiFp",header_right_switch:"header_right_switch___3Q2QH",header_right_tip:"header_right_tip___3voAc",header_right_tip_icon:"header_right_tip_icon___2zKIT",authed_div:"authed_div___3EpGJ",platform:"platform___1ch87",platform_logo:"platform_logo___3pByG",platform_slot:"platform_slot___3DUEa",title:"title___1UO8x",modalStyle:"modalStyle___1jev6",title_content:"title_content___-t4tr",main_content:"main_content___2rSN5",warning:"warning___iCHxq",accreditModal:"accreditModal___363Ea",img_bottom_line:"img_bottom_line___2nEDf",code_content:"code_content___2EMfu",copy_input:"copy_input___3f_V_",copy_tips:"copy_tips___saXHz","ant-modal-footer":"ant-modal-footer___2fU7e"}},OKo1:function(e,a,t){e.exports={container:"container___2joOk",Divider:"Divider___3FMyw"}},duWE:function(e,a,t){e.exports={container:"container___1b4eN",Divider:"Divider___3Rv59"}},esO6:function(e,a,t){e.exports={headerNoPadding:"headerNoPadding___1MU3i",putaway:"putaway___2rc0R",marginb_10:"marginb_10___3EBGP",setting_tips:"setting_tips___1plLC",tip_logo:"tip_logo___3GGWa","collection-create-form_last-form-item":"collection-create-form_last-form-item___2gm1V"}},lw3K:function(e,a,t){"use strict";t.r(a);t("5NDa");var r=t("5rEg"),l=(t("+L6B"),t("2/Rp")),n=(t("BoS7"),t("Sdc0")),s=(t("Pwec"),t("CtXQ")),i=(t("5Dmo"),t("3S7+")),o=(t("miYZ"),t("tsqr")),c=(t("2qtc"),t("kLXV")),p=t("q1tI"),m=t.n(p),d=t("3a4m"),u=t.n(d),h=t("/MKj"),_=t("Lyq9"),y=t.n(_),E=t("sxGJ"),g=t.n(E),f=(t("jCWc"),t("kPKH")),v=(t("14J3"),t("BMrR")),b=(t("/zsF"),t("PArb")),L=(t("y8nQ"),t("Vl3Y")),N=t("p0pE"),w=t.n(N),k=(t("OaEy"),t("2fM7")),C=t("esO6"),I=t.n(C);function D(e,a){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=S(e))||a&&e&&"number"===typeof e.length){t&&(e=t);var r=0,l=function(){};return{s:l,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:l}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,s=!0,i=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return s=e.done,e},e:function(e){i=!0,n=e},f:function(){try{s||null==t.return||t.return()}finally{if(i)throw n}}}}function S(e,a){if(e){if("string"===typeof e)return T(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?T(e,a):void 0}}function T(e,a){(null==a||a>e.length)&&(a=e.length);for(var t=0,r=new Array(a);t<a;t++)r[t]=e[t];return r}var K=k["a"].Option,P=e=>{var a=e.form,t=e.formData,r=e.loading,n=e.dispatch,s=e.storeList,i=e.propertyList,o=e.priceList,c=e.priceZeroNotUpList,p=(e.dialogShow,a.validateFields),d=a.getFieldDecorator,u=(a.setFieldsValue,a.resetFields,new Array);s.forEach(e=>{u.push(e.depotNo)});var h=["alliance","retail","p","p1","p2","p3","p4"],_="alliance",y={dealerId:t.dealerId,status:t.status,isTL:t.isTL,partnerKey:t.partnerKey,useGroupParts:t.useGroupParts?"1":"0",autoUp:t.autoUp?"1":"0",priceTypes:t.priceTypes?t.priceTypes:t.isTL?h:_,priceZeroNotUp:t.priceZeroNotUp?t.priceZeroNotUp:[],properties:t.properties?t.properties:["\u5b8c\u597d"],store:t.store?t.store:u},E=y||{},g=E.useGroupParts,N=E.autoUp,C=E.priceTypes,S=E.priceZeroNotUp,T=E.store,P=E.properties,A=E.partnerKey,M=E.isTL,O=M?"multiple":"default",q=t.domain;function F(){p((e,a)=>{if(!e){var t=w()({},y,a,{autoUp:!!parseInt(a.autoUp),useGroupParts:!!parseInt(a.useGroupParts)}),r=w()({partnerKey:A},t);n({type:"platformList/fetchSaveSetting",payload:r}),x("/union_setting_page",A)}})}function x(e,a){var t="",r=JSON.parse(localStorage.getItem("configParams")+""),l=r.serverUrl,n=r.dbAccount,s=r.corpID,i=r.parentCorpID;t="".concat(q,"/#").concat(e,"?serverUrl=").concat(l,"\n      &dbAccount=").concat(n,"&corpID=").concat(s,"&parentCorpID=").concat(i,"\n      &partnerKey=").concat(a),window.open(t)}function U(e){e.preventDefault(),p((e,a)=>{if(!e){var t=w()({},y,a,{priceTypes:"string"==typeof a.priceTypes?[a.priceTypes]:a.priceTypes,autoUp:!!parseInt(a.autoUp),useGroupParts:!!parseInt(a.useGroupParts)}),r=w()({partnerKey:A},t);n({type:"platformList/fetchSaveSetting",payload:r})}})}function V(e){var a,t=new Array,r=D(e);try{for(r.s();!(a=r.n()).done;){var l,s=a.value,i=D(o);try{for(i.s();!(l=i.n()).done;){var c=l.value;s==c.code&&t.push(c)}}catch(e){i.e(e)}finally{i.f()}}}catch(e){r.e(e)}finally{r.f()}n({type:"platformList/changePriceType",payload:t})}var j={labelCol:{xs:{span:24},sm:{span:9}},wrapperCol:{xs:{span:24},sm:{span:15}}};return m.a.createElement(L["a"],Object.assign({},j,{className:I.a.container,onSubmit:U}),m.a.createElement(L["a"].Item,{className:I.a.marginb_10,label:"\u662f\u5426\u4e0e\u603b\u516c\u53f8\u5171\u7528\u4e0a\u67b6\u7684\u914d\u4ef6"},d("useGroupParts",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u662f\u5426\u4e0e\u603b\u516c\u53f8\u5171\u7528\u4e0a\u67b6\u7684\u914d\u4ef6"}],initialValue:g})(m.a.createElement(k["a"],{placeholder:"\u662f\u5426\u4e0e\u603b\u516c\u53f8\u5171\u7528\u4e0a\u67b6\u7684\u914d\u4ef6"},m.a.createElement(K,{value:"1"},"\u662f"),m.a.createElement(K,{value:"0"},"\u5426")))),m.a.createElement(L["a"].Item,{className:I.a.marginb_10,label:"\u914d\u4ef6\u662f\u5426\u81ea\u52a8\u4e0a\u67b6"},d("autoUp",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u914d\u4ef6\u662f\u5426\u81ea\u52a8\u4e0a\u67b6"}],initialValue:N})(m.a.createElement(k["a"],{placeholder:"\u914d\u4ef6\u662f\u5426\u81ea\u52a8\u4e0a\u67b6"},m.a.createElement(K,{value:"1"},"\u662f"),m.a.createElement(K,{value:"0"},"\u5426")))),m.a.createElement(L["a"].Item,{className:I.a.marginb_10,label:"\u540c\u6b65\u5230\u5e73\u53f0\u4ef7\u683c\u7c7b\u578b"},d("priceTypes",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u540c\u6b65\u5230\u5e73\u53f0\u4ef7\u683c\u7c7b\u578b"}],initialValue:C})(m.a.createElement(k["a"],{placeholder:"\u540c\u6b65\u5230\u5e73\u53f0\u4ef7\u683c\u7c7b\u578b",mode:O,onChange:V},o.map((e,a)=>{return m.a.createElement(K,{value:e.code,key:a},e.name)})))),m.a.createElement(L["a"].Item,{className:I.a.marginb_10,label:"\u51fa\u5e93\u4ef7\u683c\u4e3a0\u7684\u4e0d\u80fd\u4e0a\u67b6"},d("priceZeroNotUp",{initialValue:S})(m.a.createElement(k["a"],{placeholder:"\u51fa\u5e93\u4ef7\u683c\u4e3a0\u7684\u4e0d\u80fd\u4e0a\u67b6",mode:"multiple"},c.map(e=>{return m.a.createElement(K,{value:e.code,key:e.name},e.name)})))),m.a.createElement(L["a"].Item,{className:I.a.marginb_10,label:"\u5141\u8bb8\u4e0a\u67b6\u5230\u5e73\u53f0\u7684\u914d\u4ef6\u6027\u8d28"},d("properties",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5141\u8bb8\u4e0a\u67b6\u5230\u5e73\u53f0\u7684\u914d\u4ef6\u6027\u8d28"}],initialValue:P})(m.a.createElement(k["a"],{placeholder:"\u5141\u8bb8\u4e0a\u67b6\u5230\u5e73\u53f0\u7684\u914d\u4ef6\u6027\u8d28",mode:"multiple"},i.map((e,a)=>{return m.a.createElement(K,{value:e,key:a},e)})))),m.a.createElement(L["a"].Item,{className:I.a.marginb_10,label:"\u5141\u8bb8\u4e0a\u4f20\u5e93\u5b58\u5230\u5e73\u53f0\u7684\u4ed3\u5e93"},d("store",{rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5141\u8bb8\u4e0a\u4f20\u5e93\u5b58\u5230\u5e73\u53f0\u7684\u4ed3\u5e93"}],initialValue:T})(m.a.createElement(k["a"],{placeholder:"\u5141\u8bb8\u4e0a\u4f20\u5e93\u5b58\u5230\u5e73\u53f0\u7684\u4ed3\u5e93",mode:"multiple"},s.map((e,a)=>{return m.a.createElement(K,{value:e.depotNo,key:a},e.depotName)})))),m.a.createElement(b["a"],{className:I.a.Divider}),m.a.createElement(v["a"],null,m.a.createElement(f["a"],{span:24,style:{textAlign:"center"}},m.a.createElement(l["a"],{type:"primary",htmlType:"submit",loading:r},"\u4fdd\u5b58"),m.a.createElement(l["a"],{style:{marginLeft:8},onClick:F},"\u66f4\u591a\u8bbe\u7f6e"))),m.a.createElement("div",{className:I.a.setting_tips},m.a.createElement("p",null,m.a.createElement("span",{className:I.a.tip_logo},"!"),m.a.createElement("span",{style:{marginLeft:6}},"\u4e0a\u67b6\u53c2\u6570\u8bbe\u7f6e\u8bf4\u660e")),"1\u3001<\u662f\u5426\u4e0e\u603b\u516c\u53f8\u5171\u7528\u4e0a\u67b6\u7684\u914d\u4ef6>\u914d\u4ef6\u5230\u5e73\u53f0\uff0c\u505a\u4e3a\u5206\u516c\u53f8\u53ef\u76f4\u63a5\u5171\u7528\u603b\u516c\u53f8\u4e0a\u67b6\u5230\u5e73\u53f0\u7684\u914d\u4ef6",m.a.createElement("br",null),"2\u3001<\u914d\u4ef6\u662f\u5426\u81ea\u52a8\u4e0a\u67b6>\u7cfb\u7edf\u4f1a\u5c06\u60a8\u5f53\u524d\u7684\u6240\u6709\u7b26\u5408\u4e0a\u9762\u51e0\u4e2a\u53c2\u6570\u7684\u914d\u4ef6\u4fe1\u606f\u81ea\u52a8\u4e0a\u67b6\u5230\u5e73\u53f0\uff0c\u5f53\u60a8\u6709\u65b0\u589e\u7684\u914d\u4ef6\u65f6\u7cfb\u7edf\u4e5f\u4f1a\u5c06\u7b26\u5408\u4e0a\u9762\u51e0\u4e2a\u53c2\u6570\u8bbe\u7f6e\u7684\u914d\u4ef6\u81ea\u52a8\u4e0a\u67b6\u5230\u5e73\u53f0",m.a.createElement("br",null),"3\u3001<\u540c\u6b65\u5230\u5e73\u53f0\u7684\u4ef7\u683c\u7c7b\u578b>\u9009\u4e2d\u7684\u8fd9\u4e9b\u4ef7\u683c\u624d\u540c\u6b65\u5230\u5e73\u53f0",m.a.createElement("br",null),"4\u3001<\u51fa\u5e93\u4ef7\u683c\u4e3a0\u7684\u4e0d\u80fd\u4e0a\u67b6>\u5f53\u914d\u4ef6\u7684\u8fd9\u4e9b\u4ef7\u683c\u7c7b\u578b\u4e3a0\u65f6\u4e0d\u80fd\u4e0a\u67b6\u5230\u5e73\u53f0\uff0c\u65e0\u8bba\u662f\u624b\u52a8\u4e0a\u67b6\u8fd8\u662f\u81ea\u52a8\u4e0a\u67b6",m.a.createElement("br",null),"5\u3001<\u5141\u8bb8\u4e0a\u67b6\u5230\u5e73\u53f0\u7684\u914d\u4ef6\u6027\u8d28>\u9009\u4e2d\u7684\u8fd9\u4e9b\u6027\u8d28\u7684\u914d\u4ef6\u80fd\u591f\u4e0a\u67b6\u5230\u5e73\u53f0",m.a.createElement("br",null),"6\u3001<\u5141\u8bb8\u4e0a\u4f20\u5e93\u5b58\u5230\u5e73\u53f0\u7684\u4ed3\u5e93>\u9009\u4e2d\u7684\u4ed3\u5e93\u624d\u4e0a\u4f20\u5e93\u5b58",m.a.createElement("br",null)))},A=Object(h["c"])(e=>{var a=e.platformList,t=e.loading;return{propertyList:a.propertyList,storeList:a.storeList,priceList:a.priceList,priceZeroNotUpList:a.priceZeroNotUpList,partnerKey:a.partnerKey,formData:a.dialogData,dialogShow:a.dialogShow,loading:t.effects["platformList/openDialog"]}})(P),M=L["a"].create({onFieldsChange(e,a){console.log("onFieldsChange",e),console.log("changedFields",a)},mapPropsToFields(e){console.log("mapPropsToFields",e)},onValuesChange(e,a){}})(A),O=M,q=(t("FJo9"),t("L41K")),F=t("wSeD"),x=t.n(F),U=t("LhIE"),V=(t("fOrg"),t("+KLJ")),j=t("OKo1"),B=t.n(j),G=k["a"].Option;class R extends p["Component"]{constructor(){super(...arguments),this.changePartnerKey=(e=>{var a=this.props.dispatch;a({type:"platformList/changePartnerKey",payload:e})}),this.sendSms=(()=>{var e=this.props,a=e.form.validateFields,t=e.dispatch;a(["partnerKey","phone"],(e,a)=>{e||t({type:"sms/sendSms",payload:a})})})}componentDidMount(){}render(){var e=this.props,a=e.form,t=e.unauthedData,n=e.partnerKey,s=e.cutDown,i=e.initialLoading,o=new Array;if(t.forEach(e=>{e.isTL||o.push(e)}),i)return null;var c=a.getFieldDecorator,p={labelCol:{span:8},wrapperCol:{span:13}},d=o.find(e=>e.key===n)||{},u=d.tips,h=d.verifyMode;return m.a.createElement(m.a.Fragment,null,m.a.createElement(v["a"],{style:{marginTop:10}},m.a.createElement(f["a"],{span:13,offset:8},u&&m.a.createElement(V["a"],{message:u,type:"warning"}))),m.a.createElement(L["a"],Object.assign({},p,{className:B.a.container}),m.a.createElement(L["a"].Item,{label:"\u7535\u5546\u540d\u79f0"},c("partnerKey",{initialValue:n})(m.a.createElement(k["a"],{onChange:this.changePartnerKey,placeholder:"\u7535\u5546\u540d\u79f0"},o.map(e=>m.a.createElement(G,{key:e.key,value:e.key},e.name))))),"input"===h&&m.a.createElement(L["a"].Item,{label:"\u7535\u5546\u8d26\u53f7ID"},c("dealerId",{rules:[{required:!0,message:"\u7535\u5546\u8d26\u53f7ID\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u7535\u5546\u8d26\u53f7ID"}))),"password"===h&&m.a.createElement(m.a.Fragment,null,m.a.createElement(L["a"].Item,{label:"\u8d26\u53f7"},c("userName",{rules:[{required:!0,message:"\u8d26\u53f7\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u8d26\u53f7"}))),m.a.createElement(L["a"].Item,{label:"\u5bc6\u7801"},c("password",{rules:[{required:!0,message:"\u5bc6\u7801\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u5bc6\u7801"})))),"captcha"===h&&m.a.createElement(m.a.Fragment,null,m.a.createElement(L["a"].Item,{label:"\u7535\u5546\u624b\u673a\u53f7"},c("phone",{rules:[{required:!0,message:"\u624b\u673a\u53f7\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u7535\u5546\u624b\u673a\u53f7"}))),m.a.createElement(L["a"].Item,{label:"\u9a8c\u8bc1\u7801"},m.a.createElement(v["a"],{gutter:8},m.a.createElement(f["a"],{span:14},c("smsCaptcha",{rules:[{required:!0,message:"\u9a8c\u8bc1\u7801\u5fc5\u586b!"}]})(m.a.createElement(r["a"],null))),m.a.createElement(f["a"],{span:10},m.a.createElement(l["a"],{onClick:this.sendSms,block:!0,disabled:!!s},s?"".concat(s,"\u79d2"):"\u83b7\u53d6\u9a8c\u8bc1\u7801"))))),"key"===h&&m.a.createElement(L["a"].Item,{label:"\u6388\u6743\u7801"},c("key",{rules:[{required:!0,message:"\u6388\u6743\u7801\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u6388\u6743\u7801"}))),"companyWithCode"===h&&m.a.createElement(m.a.Fragment,null,m.a.createElement(L["a"].Item,{label:"\u516c\u53f8\u7f16\u7801"},c("dealerId",{rules:[{required:!0,message:"\u516c\u53f8\u7f16\u7801\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u516c\u53f8\u7f16\u7801"}))),m.a.createElement(L["a"].Item,{label:"\u516c\u53f8\u540d\u79f0"},c("dealerName",{rules:[{required:!0,message:"\u516c\u53f8\u540d\u79f0\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u516c\u53f8\u540d\u79f0"}))),m.a.createElement(L["a"].Item,{label:"\u6388\u6743\u7801"},c("authCode",{rules:[{required:!0,message:"\u6388\u6743\u7801\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u6388\u6743\u7801"})))),"passwordWithCompany"===h&&m.a.createElement(m.a.Fragment,null,m.a.createElement(L["a"].Item,{label:"\u8d26\u53f7"},c("userName",{rules:[{required:!0,message:"\u8d26\u53f7\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u8d26\u53f7"}))),m.a.createElement(L["a"].Item,{label:"\u5bc6\u7801"},c("password",{rules:[{required:!0,message:"\u5bc6\u7801\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u5bc6\u7801"}))),m.a.createElement(L["a"].Item,{label:"\u516c\u53f8\u540d\u79f0"},c("company",{rules:[{required:!0,message:"\u516c\u53f8\u540d\u79f0\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u516c\u53f8\u540d\u79f0"}))),m.a.createElement(L["a"].Item,{label:"\u8d1f\u8d23\u4eba"},c("chargeMan")(m.a.createElement(r["a"],{placeholder:"\u8d1f\u8d23\u4eba"})))),"phone"===h&&m.a.createElement(m.a.Fragment,null,m.a.createElement(L["a"].Item,{label:"\u624b\u673a\u53f7"},c("phone",{rules:[{required:!0,message:"\u624b\u673a\u53f7\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u624b\u673a\u53f7"}))),m.a.createElement(L["a"].Item,{label:"\u5bc6\u7801"},c("password",{rules:[{required:!0,message:"\u5bc6\u7801\u5fc5\u586b\uff01"}]})(m.a.createElement(r["a"],{placeholder:"\u5bc6\u7801"}))))))}}var Z=Object(h["c"])(e=>{var a=e.platformList,t=e.loading,r=e.sms;return{unauthedData:a.unAuthed,partnerKey:a.partnerKey,cutDown:r.cutDown,initialLoading:t.effects["platformList/fetchUnOpenPartnerList"]}})(R),J=Z,W=t("duWE"),z=t.n(W),H=k["a"].Option;class Q extends p["Component"]{componentDidMount(){var e=this.props,a=e.dispatch,t=e.partsPropertyList;a({type:"platformList/loadDataUnauthed"}),0===t.length&&a({type:"platformList/getPropertyList"})}render(){var e=this.props,a=e.form,t=e.formData,r=e.partnerList,l=e.partsPropertyList,n=e.partsStoreList,s=[{code:"alliance",name:"\u5e73\u53f0\u4ef7"}],i=a.getFieldDecorator,o=t||{},c=o.partnerKey,p=o.priceType,d=o.store,u=o.properties,h={labelCol:{span:8},wrapperCol:{span:13}};return m.a.createElement(L["a"],Object.assign({},h,{className:z.a.container}),m.a.createElement(L["a"].Item,{label:"\u7535\u5546\u540d\u79f0"},i("partnerKey",{initialValue:c})(m.a.createElement(k["a"],{disabled:!0,placeholder:"\u7535\u5546\u540d\u79f0"},r.map(e=>m.a.createElement(H,{key:e.key,value:e.key},e.name))))),m.a.createElement(L["a"].Item,{label:"\u6388\u6743\u4ef7\u683c\u7c7b\u578b"},i("priceType",{initialValue:p,rules:[{required:!0,message:"\u6388\u6743\u4ef7\u683c\u7c7b\u578b\u5fc5\u987b\uff01"}]})(m.a.createElement(k["a"],null,s.map(e=>m.a.createElement(H,{key:e.code,value:e.code},e.name))))),m.a.createElement(L["a"].Item,{label:"\u6388\u6743\u914d\u4ef6\u6027\u8d28",extra:"\u9009\u62e9\u60f3\u8981\u5171\u4eab\u5230\u7535\u5546\u7684\u914d\u4ef6\u6027\u8d28"},i("properties",{initialValue:u,rules:[{required:!0,message:"\u6388\u6743\u914d\u4ef6\u6027\u8d28\u5fc5\u987b\uff01",type:"array"}]})(m.a.createElement(k["a"],{mode:"multiple"},l.map(e=>m.a.createElement(H,{key:e,value:e},e))))),m.a.createElement(L["a"].Item,{label:"\u6388\u6743\u914d\u4ef6\u4ed3\u5e93"},i("store",{initialValue:d,rules:[{required:!0,message:"\u6388\u6743\u914d\u4ef6\u4ed3\u5e93\u5fc5\u987b\uff01",type:"array"}]})(m.a.createElement(k["a"],{mode:"multiple"},n.map(e=>m.a.createElement(H,{key:e.depotNo,value:e.depotNo},e.depotName))))))}}var X=Object(h["c"])(e=>{var a=e.platformList;return{partsPropertyList:a.propertyList,partsStoreList:a.storeList,partnerList:a.unAuthed,partnerKey:a.partnerKey}})(Q),Y=X,$=q["a"].Step,ee=L["a"].create()(J),ae=L["a"].create()(Y),te=e=>{var a=e.current,t=e.visible,r=e.partnerKey,l=e.dispatch,n=m.a.useRef(null),s=m.a.useRef(null);function i(){switch(a){case 0:l({type:"platformList/cancleStep"});break;case 1:l({type:"platformList/preStep"});break}}function o(){switch(a){case 0:if(n&&n.current){var e=n.current.getForm(),t=e.validateFields;t((e,a)=>{e||l({type:"platformList/getDealerParams",payload:a})})}break;case 1:if(s&&s.current){var r=s.current.getForm(),i=r.validateFields;i((e,a)=>{var t=Object.assign({},a,{priceTypes:[a.priceType]});e||l({type:"platformList/createEle",payload:t})})}break}}return m.a.createElement(c["a"],{title:"\u4e09\u65b9\u7535\u5546\u5e73\u53f0\u6388\u6743",visible:t,maskClosable:!1,destroyOnClose:!0,width:600,onCancel:i,onOk:o,cancelText:0===a?"\u53d6\u6d88":"\u4e0a\u4e00\u6b65",okText:a<U["createEleSteps"].length-1?"\u4e0b\u4e00\u6b65":"\u5b8c\u6210"},m.a.createElement("div",{className:x.a.container},m.a.createElement(q["a"],{current:a},U["createEleSteps"].map(e=>m.a.createElement($,{key:e.title,title:e.title,description:e.description}))),0===a&&m.a.createElement(ee,{ref:n}),1===a&&m.a.createElement(ae,{formData:{partnerKey:r},ref:s})))},re=Object(h["c"])(e=>{var a=e.platformList;return{visible:a.isOpend,current:a.currentStep,partnerKey:a.partnerKey}})(te),le=m.a.createElement("span",null,"1. \u5df2\u6309\u5206\u516c\u53f8\u6388\u6743\uff0c\u4e0d\u80fd\u4fee\u6539\u4e3a\u6309\u8d26\u5957\u6388\u6743\uff1b",m.a.createElement("br",null),"2. \u6309\u8d26\u5957\u6388\u6743\u4fee\u6539\u4e3a\u6309\u5206\u516c\u53f8\u6388\u6743\u65f6\uff0c\u9700\u8981\u91cd\u65b0\u767b\u5f55ERP\u3002"),ne=c["a"].confirm;class se extends p["Component"]{constructor(){super(...arguments),this.state={visible:!1,accreditVisible:!1,showAccredit:{url:"",code:"",name:"",domain:""}},this.checkThird=(()=>{this.setState({visible:!0})}),this.handleCancel=(()=>{this.setState({visible:!1})}),this.toManage=(e=>{if("staffAuth"!==e.verifyMode){var a=this.props.dispatch;a({type:"platformList/openDialog",payload:{partnerKey:e.partnerKey,isTL:!!e.isTL&&e.isTL,domain:e.domain}})}else u.a.push("/penguinAutoParts/authManage")}),this.toPlatform=((e,a)=>{var t=this.props.dispatch;a&&e.isTL&&t({type:"platformList/getAuthToken",payload:{partnerKey:e.partnerKey,allianceId:e.allianceId}});var r=e.domain;setTimeout(()=>{if(r){var t=r;this.handleFeedBack(t,e.partnerKey||e.key,a)}else o["a"].error("\u94fe\u63a5\u4e0d\u5b58\u5728")},400)}),this.handleFeedBack=((e,a,t)=>{var r=this.props.token,l="",n=t?encodeURIComponent(r):"";l=n?"".concat(e,"?token=").concat(n,"&next=deal_search_list"):"".concat(e),window.open(l)}),this.toAccredit=(e=>{if("staffAuth"!==e.verifyMode){var a=this.props.dispatch;e.isTL?(a({type:"platformList/getAuthCode",payload:{partnerKey:e.key}}),setTimeout(()=>{var a=sessionStorage.getItem("code");if(a){var t={url:e.logo,code:a,name:e.name,domain:e.domain};this.setState({accreditVisible:!0,showAccredit:t})}},200)):(a({type:"platformList/openStep"}),a({type:"platformList/changePartnerKey",payload:e.key}))}else u.a.push("/penguinAutoParts/authManage")}),this.handleCancelAccredit=(()=>{var e=this.props.dispatch;e({type:"platformList/cancelAuthCode"}),this.setState({accreditVisible:!1})}),this.accredit=(()=>{var e=document.getElementById("copy-inline-btn");e&&e.click();var a=this.state.showAccredit.domain;window.open(a)}),this.dialogCancel=(()=>{var e=this.props.dispatch;e({type:"platformList/closeDialog",payload:{dialogShow:!1}})}),this.copyLicenseCode=(()=>{var e=new g.a("#copy-inline-btn");e.on("success",a=>{o["a"].success("\u590d\u5236\u6210\u529f"),e.destroy()}),e.on("error",()=>{o["a"].success("\u590d\u5236\u5931\u8d25\uff0c\u8bf7\u624b\u52a8\u590d\u5236"),e.destroy()})}),this.switchChange=((e,a)=>{var t=this.props.dispatch;e&&ne({title:"\u5207\u6362\u4e3a\u5206\u516c\u53f8\u6388\u6743\u6a21\u5f0f\u540e\u4e0d\u80fd\u5207\u6362\u56de\u8d26\u5957\u6388\u6743\u6a21\u5f0f\uff0c\u662f\u5426\u786e\u8ba4\u5207\u6362\uff1f",content:"",okText:"\u786e\u5b9a",cancelText:"\u53d6\u6d88",onOk(){t({type:"platformList/postBranchMode"}),t({type:"platformList/saveBase",payload:{branchMode:!0}})},onCancel(){console.log("Cancel")}})})}componentDidMount(){var e=this.props.dispatch;e({type:"platformList/loadData"}),e({type:"platformList/loadDataUnauthed"}),e({type:"platformList/getStoreList"}),e({type:"platformList/getPropertyList"}),e({type:"platformList/getPriceList"}),e({type:"platformList/getBase"}),setTimeout(()=>{new g.a("#copy-inline-btn")},1e3)}get authedList(){var e=this.props.authedData;return e}get unauthedList(){var e=this.props.unauthedData;return e}get branchModeBool(){var e=this.props.branchMode;return e}render(){return m.a.createElement("div",{className:y.a.list_box},m.a.createElement("div",{className:y.a.header_content},m.a.createElement("span",{className:y.a.header_title},"\u5e73\u53f0\u76ee\u5f55"),m.a.createElement("div",{className:y.a.header_right},m.a.createElement("span",{className:y.a.header_right_tip},m.a.createElement(i["a"],{title:le},m.a.createElement("span",{className:y.a.header_right_tip_icon},m.a.createElement(s["a"],{type:"question-circle",theme:"outlined"}))),"\u662f\u5426\u6309\u5206\u5e97\u6388\u6743"),m.a.createElement("span",{className:y.a.header_right_switch},m.a.createElement(n["a"],{checkedChildren:"\u5f00\u542f",unCheckedChildren:"\u5173\u95ed",disabled:this.branchModeBool,onChange:this.switchChange,defaultChecked:this.props.branchMode})),m.a.createElement(l["a"],{className:y.a.header_button,size:"large",onClick:this.checkThird},"\u67e5\u770b\u4e09\u65b9\u7535\u5546\u5e73\u53f0\u6388\u6743\u64cd\u4f5c\u624b\u518c"))),this.authedList&&this.authedList.length>0&&m.a.createElement("div",{className:y.a.authed_div},m.a.createElement("p",{className:y.a.title},"\u5df2\u6388\u6743\u5e73\u53f0"),this.authedList.map((e,a)=>{return m.a.createElement("div",{className:y.a.platform,key:e.partnerKey},m.a.createElement("a",{className:y.a.platform_logo},m.a.createElement("div",null,m.a.createElement("img",{src:e.logo,alt:e.partnerName}))),m.a.createElement("div",{className:y.a.platform_slot},"staffAuth"===e.verifyMode?"":m.a.createElement("span",{onClick:()=>{this.toPlatform(e,1)}},"\u8fdb\u5165\u5e73\u53f0"),m.a.createElement("span",{onClick:()=>{this.toManage(e)}},"\u53c2\u6570\u8bbe\u7f6e")))})),this.unauthedList&&this.unauthedList.length>0&&m.a.createElement("div",{className:y.a.authed_div},m.a.createElement("p",{className:y.a.title},"\u672a\u6388\u6743\u5e73\u53f0"),this.unauthedList.map((e,a)=>{return m.a.createElement("div",{className:y.a.platform,key:e.key},m.a.createElement("a",{className:y.a.platform_logo},m.a.createElement("div",null,m.a.createElement("img",{src:e.logo,alt:e.name}))),m.a.createElement("div",{className:y.a.platform_slot},"staffAuth"===e.verifyMode?"":m.a.createElement("span",{onClick:()=>{this.toPlatform(e,0)}},"\u8fdb\u5165\u5e73\u53f0"),m.a.createElement("span",{onClick:()=>{this.toAccredit(e)}},"\u70b9\u51fb\u6388\u6743")))})),m.a.createElement(c["a"],{title:"\u4e09\u65b9\u7535\u5546\u5e73\u53f0\u6388\u6743\u64cd\u4f5c\u624b\u518c",visible:this.state.visible,onCancel:this.handleCancel,className:y.a.modalStyle,width:"50%",footer:null,maskClosable:!1},m.a.createElement("p",null,"\u5f53\u524d\u5e73\u53f0\u83dc\u5355\u9875\u4ec5\u5217\u51fa\u4e86ERP\u5df2\u7ecf\u5b8c\u6210\u5bf9\u63a5\u7684\u4e09\u65b9\u5e73\u53f0\uff0c\u5e76\u6309\u5df2\u6388\u6743\u7684\u5e73\u53f0\u548c\u672a\u6388\u6743\u7684\u5e73\u53f0\u5206\u7c7b\u5c55\u793a"),m.a.createElement("h1",null,"\u4e00\u3001\u5e73\u53f0\u8d26\u53f7\u6388\u6743\u64cd\u4f5c\uff1a"),m.a.createElement("p",{className:y.a.title},"1\u3001\u5728\u672a\u6388\u6743\u7684\u5e73\u53f0\u4e2d\u627e\u5230\u60a8\u9700\u8981\u6388\u6743\u7684\u4e09\u65b9\u5e73\u53f0"),m.a.createElement("p",{className:y.a.title},"2\u3001\u70b9\u51fb\u3010\u70b9\u51fb\u6388\u6743\u3011\u6309\u94ae\uff0c\u5f39\u51fa\u6388\u6743\u5f39\u6846\uff0c\u5728\u5f39\u6846\u4e2d\u590d\u5236\u201c\u6388\u6743\u7801\u201d\u6216\u586b\u5165\u5e73\u53f0\u8d26\u53f7\u5bc6\u7801\u6216\u79d8\u94a5\u5b8c\u6210\u6388\u6743"),m.a.createElement("p",{className:y.a.title_content},"\u5728\u6388\u6743\u5e73\u53f0\u65f6\u53ef\u80fd\u4f1a\u56e0\u4e3a\u4e0d\u540c\u7684\u5e73\u53f0\u800c\u91c7\u53d6\u4e0d\u540c\u7684\u6388\u6743\u65b9\u5f0f\uff0c\u4e0b\u5217\u4e3a\u4e24\u79cd\u6388\u6743\u65b9\u5f0f\u7684\u64cd\u4f5c\u8bf4\u660e\uff1a"),m.a.createElement("p",{className:y.a.main_content},"\uff081\uff09\u901a\u8fc7\u83b7\u53d6\u6388\u6743\u7801\uff1a\u5728\u6388\u6743\u5f39\u6846\u4e2d\u83b7\u53d6\u201c\u6388\u6743\u7801\u201d\u70b9\u51fb\u3010\u590d\u5236\u3011\u6309\u94ae\u590d\u5236\u201c\u6388\u6743\u7801\u201d\uff0c\u7136\u540e\u70b9\u51fb\u3010\u53bb\u6388\u6743\u3011\u6309\u94ae\u9875\u9762\u8df3\u8f6c\u5230\u5bf9\u5e94\u7684\u4e09\u65b9\u5e73\u53f0 \u767b\u5f55/\u6ce8\u518c\u5e76\u5728\u5bf9\u5e94\u7684\u9875\u9762\u53bb\u7c98\u8d34\u201c\u6388\u6743\u7801\u201d\u5b8c\u6210\u6388\u6743\uff0c\u6700\u540e\u8fd4\u56de\u5230\u5e73\u53f0\u83dc\u5355\u9875\uff0c\u5237\u65b0\u9875\u9762"),m.a.createElement("p",{className:y.a.main_content},"\uff082\uff09\u901a\u8fc7\u586b\u5165\u8d26\u53f7\u5bc6\u7801\u7b49\u4fe1\u606f\uff1a\u5728\u6388\u6743\u5f39\u6846\u4e2d\u586b\u5165\u5bf9\u5e94\u7684\u4e09\u65b9\u5e73\u53f0\u8d26\u53f7\u5bc6\u7801\u6216\u79d8\u94a5\uff08\u6ce8\u610f\uff1a\u6709\u7684\u5e73\u53f0\u53ef\u80fd\u9700\u8981\u586b\u8d26\u53f7\u5bc6\u7801\u3001\u6709\u7684\u5e73\u53f0\u53ef\u80fd \u9700\u8981\u586b\u79d8\u94a5\u3001ID\u7b49\uff0c\u56e0\u5e73\u53f0\u800c\u5f02\uff09\uff0c\u7136\u540e\u70b9\u51fb\u3010\u786e\u5b9a\u3011\u5b8c\u6210\u6388\u6743"),m.a.createElement("p",{className:y.a.title_content},"\u6ce8\u610f\uff1a\u5982\u679c\u60a8\u6ca1\u6ce8\u518c\u67d0\u5e73\u53f0\u8d26\u53f7\uff0c\u9700\u8981\u60a8\u5148\u5728\u8be5\u5e73\u53f0\u4e0a\u53bb\u6ce8\u518c\u8d26\u53f7\u624d\u80fd\u8fdb\u884c\u6388\u6743\u3002"),m.a.createElement("h1",null,"\u4e8c\u3001\u5e73\u53f0\u7ba1\u7406\uff1a"),m.a.createElement("p",{className:y.a.title},"1\u3001\u5728\u5df2\u6388\u6743\u7684\u5e73\u53f0\u4e2d\u627e\u5230\u60a8\u9700\u8981\u8fdb\u884c\u53c2\u6570\u8bbe\u7f6e\u6216\u914d\u4ef6\u4e0a/\u4e0b\u67b6\u64cd\u4f5c\u7684\u4e09\u65b9\u5e73\u53f0"),m.a.createElement("p",{className:y.a.title},"2\u3001\u70b9\u51fb\u3010\u5e73\u53f0\u7ba1\u7406\u3011\u6309\u94ae\uff0c\u9875\u9762\u8df3\u8f6c\u5230\u914d\u4ef6\u4e0a/\u4e0b\u67b6\u7ba1\u7406\u9875\u9762\u5728\u6b64\u9875\u9762\u4e2d\u53ef\u8fdb\u884c\u4ee5\u4e0b\u64cd\u4f5c\uff1a"),m.a.createElement("p",{className:y.a.main_content},"\uff081\uff09\u5404\u79cd\u53c2\u6570\u8bbe\u7f6e\uff1a\u70b9\u51fb\u9875\u9762\u53f3\u4e0a\u89d2\u7684\u3010\u53c2\u6570\u8bbe\u7f6e\u3011\u6309\u94ae\u6253\u5f00\u8bbe\u7f6e\u9875\u9762\uff0c\u5728\u6b64\u9875\u9762\u4e2d\u8fdb\u884c\u5404\u79cd\u53c2\u6570\u503c\u7684\u8bbe\u7f6e\uff0c\u6bcf\u4e00\u9879\u53c2\u6570\u5747\u6709\u81ea\u5e26\u7684\u9ed8\u8ba4\u503c\uff0c \u70b9\u51fb\u6bcf\u4e2a\u53c2\u6570\u6a21\u5757\u7684\u201c\u95ee\u53f7\u201d\u56fe\u6807\uff0c\u53ef\u67e5\u770b\u6bcf\u9879\u53c2\u6570\u7684\u6ce8\u91ca\uff0c\u5f53\u60a8\u6709\u9700\u8981\u65f6\u53ef\u5bf9\u5bf9\u5e94\u7684\u53c2\u6570\u503c\u8fdb\u884c\u8c03\u6574\u3002"),m.a.createElement("p",{className:y.a.main_content},"\uff082\uff09\u914d\u4ef6\u4e0a/\u4e0b\u67b6\u64cd\u4f5c\uff1a\u5728\u914d\u4ef6\u4e0a/\u4e0b\u67b6\u7ba1\u7406\u9875\u9762\u6709\u4e24\u4e2a\u9875\u7b7e\u201c\u672a\u4e0a\u67b6\u914d\u4ef6\u201d\u201c\u5df2\u4e0a\u67b6\u914d\u4ef6\u201d\u8fd9\u662f\u4e24\u4e2a\u914d\u4ef6\u5217\u8868\u9875\uff0c\u7528\u6765\u8868\u793aERP\u4e2d\u7684\u914d\u4ef6\u54ea\u4e9b\u4e3a \u5df2\u4e0a\u67b6\u5230\u5e73\u53f0\u7684\u914d\u4ef6\uff0c\u54ea\u4e9b\u4e3a\u8fd8\u672a\u4e0a\u67b6\u5230\u5e73\u53f0\u7684\u914d\u4ef6\uff0c\u5728\u201c\u672a\u4e0a\u67b6\u914d\u4ef6\u201d\u5217\u8868\u4e2d\u53ef\u52fe\u9009\u914d\u4ef6\u70b9\u51fb\u3010\u4e0a\u67b6\u9009\u4e2d\u7684\u914d\u4ef6\u3011\u6309\u94ae\u5373\u53ef\u5b8c\u6210\u4e0a\u67b6\uff0c\u4e5f\u53ef\u70b9\u51fb\u3010\u5168\u90e8\u914d\u4ef6\u4e0a\u67b6\u3011\u6309\u94ae\u76f4\u63a5\u5c06\u5217\u8868\u4e2d\u6240\u6709\u914d\u4ef6\u4e0a\u67b6"),m.a.createElement("p",{className:y.a.title_content},"\u6ce8\u610f\uff1a\u914d\u4ef6\u80fd\u4e0d\u80fd\u6210\u529f\u4e0a\u67b6\u8fd8\u8981\u53d7\u4e00\u4e9b\u53c2\u6570\u503c\u7684\u63a7\u5236\uff0c\u6240\u4ee5\u5efa\u8bae\u60a8\u5728\u4e0a\u67b6\u914d\u4ef6\u524d\u5148\u8fdb\u5165\u201c\u53c2\u6570\u8bbe\u7f6e\u201d\u9875\u9762\u6309\u9700\u8c03\u6574\u53c2\u6570\u503c"),m.a.createElement("h1",null,"\u4e09\u3001\u8fdb\u5165\u5e73\u53f0\uff1a"),m.a.createElement("p",{className:y.a.title},"1\u3001\u5b8c\u6210\u4e0a\u9762\u4e24\u70b9\u7684\u64cd\u4f5c\uff0c\u60a8\u5c31\u53ef\u4ee5\u5728\u201c\u5e73\u53f0\u83dc\u5355\u9875\u201d\u4e2d\u70b9\u51fb\u3010\u8fdb\u5165\u5e73\u53f0\u3011\u6309\u94ae\u76f4\u63a5\u8fdb\u5165\u5230\u5bf9\u5e94\u7684\u4e09\u65b9\u5e73\u53f0\u4e86"),m.a.createElement("p",{className:y.a.warning},"\u53cb\u60c5\u63d0\u793a\uff1a\u5982\u679c\u60a8\u5bf9\u4e0a\u8ff0\u64cd\u4f5c\u624b\u518c\u8fd8\u6709\u7591\u95ee\uff0c\u53ef\u8054\u7cfb\u6211\u4eec\u7684\u5ba2\u670d\u4eba\u5458\u6216\u9500\u552e\u4eba\u5458\u8fdb\u884c\u54a8\u8be2\uff0c\u6b22\u8fce\u60a8\u7684\u6765\u7535\uff01\u5ba2\u670d\u7535\u8bdd\uff1a 010-60219478/9479")),m.a.createElement(c["a"],{title:"\u4e09\u65b9\u7535\u5546\u5e73\u53f0\u6388\u6743",visible:this.state.accreditVisible,onCancel:this.handleCancelAccredit,width:"600px",className:y.a.accreditModal,maskClosable:!1,okText:"\u53bb\u6388\u6743",onOk:this.accredit},m.a.createElement("img",{src:this.state.showAccredit.url,alt:this.state.showAccredit.name}),m.a.createElement("div",{className:y.a.img_bottom_line}),m.a.createElement("div",{className:y.a.code_content},m.a.createElement("label",null,"\u6388\u6743\u7801\uff1a"),m.a.createElement(r["a"],{readOnly:!0,size:"small",className:y.a.copy_input,value:this.state.showAccredit.code}),m.a.createElement(l["a"],{size:"small",onClick:this.copyLicenseCode,id:"copy-inline-btn","data-clipboard-text":this.state.showAccredit.code},"\u590d\u5236")),m.a.createElement("div",{className:y.a.copy_tips},"\u6388\u6743\u7801\u6709\u6548\u65f6\u95f4\u4e3a24\u5c0f\u65f6\uff0c\u5982\u8d85\u8fc724\u5c0f\u65f6\u8bf7\u91cd\u65b0\u83b7\u53d6\u6388\u6743\u7801\u6388\u6743")),m.a.createElement(c["a"],{title:"\u4e0a\u67b6\u53c2\u6570\u8bbe\u7f6e",visible:this.props.dialogShow,onCancel:this.dialogCancel,width:"600px",className:y.a.modalStyle,maskClosable:!1,footer:null},m.a.createElement(O,null)),m.a.createElement(re,null))}}a["default"]=Object(h["c"])(e=>{var a=e.platformList;return{authedData:a.list,unauthedData:a.unAuthed,dialogShow:a.dialogShow,code:a.code,token:a.token,branchMode:a.branchMode}})(se)},wSeD:function(e,a,t){e.exports={container:"container___222oZ"}}}]);