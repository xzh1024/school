//全局公共方法
export default {
  install(Vue, options) {
    Vue.prototype.$strNumRep = function(value) {
      //每隔三位数增加‘，’
      let valueStr = value + "";
      return valueStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    //整数转换为百分数
    Vue.prototype.$intNumToPercentNum = function(strNum) {
      let num = strNum + "";
      let numArr = num.split(".");
      let intNum = numArr[0]; //整数
      let decimal = "0"; //小数
      let returnStr = "";
      if (numArr.length == 2) {
        decimal = numArr[1];
      }
      let sNum = Number(intNum) * 100 + Number(decimal);
      returnStr = sNum / 10000 + "";
      return returnStr;
    };

    window.resetSetItem = function(key, newVal, type) {
      var newStorageEvent = null;
      if (key === "drawer") {
        // 创建一个StorageEvent事件
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);
            // 初始化创建的事件
            newStorageEvent.initStorageEvent(
              "setItem",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );
            // 派发对象
            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "checkQuote") {
        // 创建一个StorageEvent事件
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);

            // 初始化创建的事件
            newStorageEvent.initStorageEvent(
              "checkQuote",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            // 派发对象
            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "quoteList") {
        //报价管理
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);

            newStorageEvent.initStorageEvent(
              "setQuote",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, type);
      } else if (key === "refreshList") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            newStorageEvent.initStorageEvent(
              "refreshList",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );
            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key);
      } else if (key === "refreshrfq") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            newStorageEvent.initStorageEvent(
              "refreshrfq",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );
            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key);
      } else if (key === "quoteListBatch") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);

            newStorageEvent.initStorageEvent(
              "setQuoteBatch",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key);
      } else if (key === "addFullAddress") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);

            newStorageEvent.initStorageEvent(
              "addFullAddress",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key);
      } else if (key === "refreshAddress") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);

            newStorageEvent.initStorageEvent(
              "refreshAddress",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key);
      } else if (key === "openChats") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);

            newStorageEvent.initStorageEvent(
              "openChats",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "uploadGoodsImg") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            newStorageEvent.initStorageEvent(
              "uploadGoodsImg",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "refreshGoods") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            newStorageEvent.initStorageEvent(
              "refreshGoods",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );
            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "setBrandRules") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            newStorageEvent.initStorageEvent(
              "setBrandRules",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );
            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "addVehBrand") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            newStorageEvent.initStorageEvent(
              "addVehBrand",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );
            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "unionCheck") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            newStorageEvent.initStorageEvent(
              "unionCheck",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );
            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "openRepl") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);

            newStorageEvent.initStorageEvent(
              "openRepl",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "setMini") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);

            newStorageEvent.initStorageEvent(
              "setMini",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "openLogisticsInformation") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);
            newStorageEvent.initStorageEvent(
              "openLogisticsInformation",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "selectBrandModal") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);
            newStorageEvent.initStorageEvent(
              "selectBrandModal",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      } else if (key === "bannerDialog") {
        newStorageEvent = document.createEvent("StorageEvent");
        const storage = {
          setItem: function(k, val) {
            sessionStorage.setItem(k, val);
            newStorageEvent.initStorageEvent(
              "bannerDialog",
              false,
              false,
              k,
              null,
              val,
              null,
              null
            );

            window.dispatchEvent(newStorageEvent);
          },
        };
        storage.setItem(key, newVal);
      }
    };
  },
};
