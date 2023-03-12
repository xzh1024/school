"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localSearchData = localSearchData;
exports.mnemonicSearch = mnemonicSearch;

var _lodash = require("lodash");

function localSearchData(options, queryString) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "name";

  // 处理各种情况下的数据返回
  if (!options) {
    return [];
  }

  if (!queryString) {
    return options;
  }

  return options.filter(function (item) {
    var queryData = (0, _lodash.isString)(item) ? item : item[field];
    return queryData.includes(queryString);
  });
}

function mnemonicSearch(options, queryString, filed) {
  //  只处理过滤逻辑，真正过滤判断以及返回数据在localSearchData
  var queryFiled = filed || "name";

  if (queryString && /[A-Za-z]+$/.test(queryString)) {
    queryFiled = filed || "mnemonic";
    queryString = queryString.toUpperCase();
  }

  return localSearchData(options, queryString, queryFiled);
}