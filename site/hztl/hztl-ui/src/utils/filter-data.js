import { isString } from "lodash";

export function localSearchData(options, queryString, field = "name") {
    // 处理各种情况下的数据返回
    if (!options) {
        return []
    }
    if (!queryString) {
        return options;
    }
    return options.filter(item => {
        let queryData = isString(item) ? item : item[field];
        return queryData.includes(queryString)
    })
}

export function mnemonicSearch(options, queryString, filed) {
    //  只处理过滤逻辑，真正过滤判断以及返回数据在localSearchData
    let queryFiled = filed || "name"
    if (queryString && /[A-Za-z]+$/.test(queryString)) {
        queryFiled = filed || "mnemonic";
        queryString = queryString.toUpperCase();
    }
    return localSearchData(options, queryString, queryFiled)
}