import { isString } from "lodash";

type Option = any;

export function localSearchData(
  options: Option[],
  queryString: string,
  field = "name"
): Option[] {
  // 处理各种情况下的数据返回
  if (!options) {
    return [];
  }
  if (!queryString) {
    return options;
  }
  return options.filter(item => {
    const queryData = isString(item) ? item : item[field];
    return queryData && queryData.toString().includes(queryString);
  });
}

export function mnemonicSearch(
  options: Option[],
  queryString: string,
  filed?: string
): Option[] {
  //  只处理过滤逻辑，真正过滤判断以及返回数据在localSearchData
  let queryFiled = filed || "name";
  if (queryString && /[A-Za-z]+$/.test(queryString)) {
    queryFiled = filed || "mnemonic";
    queryString = queryString.toUpperCase();
  }
  return localSearchData(options, queryString, queryFiled);
}

export function frontendOrder(list: Option[], string: string): Option[] {
  return list
    .sort((a, b) => {
      return a.name.length - b.name.length;
    })
    .sort((a, b) => {
      const aIndex = a.name.indexOf(string);
      const bIndex = b.name.indexOf(string);
      return aIndex - bIndex;
    });
}
