(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{jAQa:function(e,a,t){"use strict";t.r(a);var n=t("d6i3"),s=t.n(n),r=t("p0pE"),p=t.n(r),c=t("Dp36"),i={eleList:[]},u={namespace:"partBaseData",state:p()({},i),effects:{fetchEleList(e,a){return s.a.mark(function t(){var n,r,p,i;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.payload,r=a.call,p=a.put,t.next=4,r(c["f"],n);case 4:return i=t.sent,t.next=7,p({type:"saveEleList",payload:i});case 7:case"end":return t.stop()}},t)})()}},reducers:{saveEleList(e,a){var t=a.payload;return p()({},i,e,{eleList:t})}}};a["default"]=u}}]);