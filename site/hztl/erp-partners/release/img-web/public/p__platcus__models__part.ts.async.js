(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[12],{YqfW:function(e,a,t){"use strict";t.r(a);t("miYZ");var r=t("tsqr"),n=t("d6i3"),s=t.n(n),c=t("p0pE"),u=t.n(c),p=t("Dp36"),l=t("k/Of"),o={list:[],selectedRowKeys:[],search:{},paginationData:{current:1,pageSize:l["defaultPageSize"]},totalSize:0,visible:!1,relevanceData:{},customerList:[],selectedCustomer:{},allList:[]},i={namespace:"platList",state:u()({},o),effects:{fetchData(e,a){return s.a.mark(function e(){var t,r,n;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.call,r=a.put,a.select,e.prev=1,e.next=4,t(p["g"]);case 4:return n=e.sent,e.next=7,r({type:"saveAllData",payload:n});case 7:return e.next=9,r({type:"saveData",payload:n});case 9:e.next=15;break;case 11:return e.prev=11,e.t0=e["catch"](1),e.next=15,r({type:"clearData"});case 15:case"end":return e.stop()}},e,null,[[1,11]])})()},searchChange(e,a){return s.a.mark(function t(){var r,n;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,n=a.put,t.next=4,n({type:"filterData",payload:r});case 4:case"end":return t.stop()}},t)})()},filterData(e,a){return s.a.mark(function t(){var r,n,c,u;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,n=a.put,c=a.select,t.next=4,c(e=>{var a=e.platList.allList.filter(e=>{var a=!0;return r.name&&e.name&&-1==e.name.indexOf(r.name)&&(a=!1),r.contacts&&e.contacts&&-1==e.contacts.indexOf(r.contacts)&&(a=!1),r.address&&e.address&&-1==e.address.indexOf(r.address)&&(a=!1),a});return a});case 4:return u=t.sent,t.next=7,n({type:"saveData",payload:u});case 7:case"end":return t.stop()}},t)})()},upStateChange(e,a){return s.a.mark(function t(){var r,n;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,n=a.put,t.next=4,n({type:"clearData"});case 4:return t.next=6,n({type:"fetchData",payload:r});case 6:case"end":return t.stop()}},t)})()},updateDialogVisible(e,a){return s.a.mark(function t(){var r,n,c,u;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,n=a.put,c=a.select,t.next=4,c(e=>{return e.platList.visible});case 4:return u=t.sent,t.next=7,n({type:"clearData",payload:!0});case 7:if(u){t.next=12;break}return t.next=10,n({type:"fetchCustomerData",payload:{}});case 10:return t.next=12,n({type:"saveSelectedCustomer",payload:{}});case 12:return t.next=14,n({type:"saveRelevantData",payload:r||{}});case 14:return t.next=16,n({type:"changeVisible"});case 16:case"end":return t.stop()}},t)})()},searchDialogData(e,a){return s.a.mark(function t(){var r,n;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,n=a.put,t.next=4,n({type:"fetchCustomerData",payload:r});case 4:case"end":return t.stop()}},t)})()},fetchCustomerData(e,a){return s.a.mark(function t(){var r,n,c,u,l;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,n=a.call,c=a.put,u=JSON.parse(JSON.stringify(r)),t.prev=3,t.next=6,n(p["d"],u);case 6:return l=t.sent,t.next=9,c({type:"saveCustomerData",payload:l});case 9:t.next=15;break;case 11:return t.prev=11,t.t0=t["catch"](3),t.next=15,c({type:"clearData",payload:!0});case 15:case"end":return t.stop()}},t,null,[[3,11]])})()},saveSelectedCustomerPatch(e,a){return s.a.mark(function t(){var r,n;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,n=a.put,t.next=4,n({type:"saveSelectedCustomer",payload:r});case 4:case"end":return t.stop()}},t)})()},relevelCustomer(e,a){return s.a.mark(function e(){var t,n,c,l;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a.call,n=a.put,c=a.select,e.next=3,c(e=>{return u()({},e.platList.relevanceData,{erpCode:e.platList.selectedCustomer.code,erpId:e.platList.selectedCustomer.id,erpName:e.platList.selectedCustomer.name,partnerKey:"HNW"})});case 3:return l=e.sent,e.prev=4,e.next=7,t(p["k"],l);case 7:return e.next=9,n({type:"fetchData",payload:{}});case 9:return e.next=11,n({type:"updateDialogVisible"});case 11:r["a"].success("\u5173\u8054\u6210\u529f"),e.next=18;break;case 14:return e.prev=14,e.t0=e["catch"](4),e.next=18,n({type:"clearData",payload:!0});case 18:case"end":return e.stop()}},e,null,[[4,14]])})()},paginationDataChange(e,a){return s.a.mark(function t(){var r,n;return s.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.payload,n=a.put,t.next=4,n({type:"savePaginationData",payload:r});case 4:return t.next=6,n({type:"fetchData",payload:r});case 6:case"end":return t.stop()}},t)})()}},reducers:{clearData(e,a){var t=a.payload;return t?u()({},o,e,{customerList:[]}):u()({},o,e,{list:[]})},saveCustomerData(e,a){var t=a.payload;return u()({},o,e,{customerList:t?t.rows:[]})},saveAllData(e,a){var t=a.payload;return u()({},o,e,{allList:t&&t.rows||[]})},saveData(e,a){var t=a.payload;return u()({},o,e,{list:t&&t.rows||[]})},saveSelectedRowKeys(e,a){var t=a.payload;return u()({},o,e,{selectedRowKeys:t})},saveSearch(e,a){var t=a.payload;return u()({},o,e,{search:t})},savePaginationData(e,a){var t=a.payload;return u()({},o,e,{paginationData:t})},saveRelevantData(e,a){var t=a.payload;return u()({},o,e,{relevanceData:t})},changeVisible(e){return u()({},o,e,{visible:!!e&&!e.visible})},saveSelectedCustomer(e,a){var t=a.payload;return u()({},o,e,{selectedCustomer:t})}}};a["default"]=i}}]);