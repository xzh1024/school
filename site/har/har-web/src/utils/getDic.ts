/**
 *  数据字典内容库
 *
 * */

import localStore from '@/utils/localStore';
import {
  cbdApiProjectCommonDeptSelectListGet,
  cbdApiProjectCommonFormatSelectListGet,
  cbdApiProjectCommonGetDictDataCodeGet,
  cbdApiProjectCommonProductAttributeBrandGet,
  cbdApiProjectCommonProductAttributeClassifyGet,
  cbdApiProjectCommonProductAttributeSpecificationsGet,
  cbdApiProjectCommonProductAttributeUnitsGet,
  cbdApiProjectCommonRoleSelectListGet,
  cbdApiProjectCommonUserSelectListGet,
  cbdApiProjectIncomingCommonAreaListGet,
  cbdApiProjectIncomingCommonBankListGet,
  cbdApiProjectIncomingCommonBankTypeListGet,
  cbdApiProjectIncomingCommonBusinessListGet
} from '@/api';
import { filterEmptyChildren } from '@/utils/index';
import dayjs from 'dayjs';
import {
  groundPcApiCommonProductAttributeBrandGet,
  groundPcApiCommonProductAttributeClassifyGet,
  groundPcApiCommonProductAttributeSpecificationsGet,
  groundPcApiCommonProductAttributeUnitsGet
} from '@/api/ground-pc-api';

interface resType {
  creatTime: string;
  expireTime?: number | undefined;
  key: string;
  version: string;
  value: any;
}
interface dicType {
  value: any;
  key: string;
  children?: Array<dicType>;
}

// 公共字典处理库
export function baseHandler(
  key: string,
  api: (p?: any) => Promise<any>,
  params?: object,
  refresh?: boolean,
  expireTime?: number //毫秒
): Promise<any> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      let res: resType | null = await localStore.getLocal('dic', key);
      if (refresh) {
        res = null;
      }
      const { expireTime: et, creatTime } = res || {};
      if (dayjs().diff(dayjs(creatTime)) > Number(et)) {
        res = null;
      }
      // console.log(res, 'res', key);
      if (res) {
        resolve(res?.value || []);
      } else {
        let resArray: Array<dicType> = await api(params);
        resArray = filterEmptyChildren(resArray);
        if (resArray.length)
          await localStore.setLocal('dic', key, resArray, expireTime);
        resolve(resArray);
      }
    } catch (e) {
      reject(e);
      console.error(e);
    }
  });
}

// 业态下拉
export function getFormatDic(): Promise<any> {
  return baseHandler('formatSelect', cbdApiProjectCommonFormatSelectListGet);
}

// 用户选择下拉
interface userParams {
  roleId: string;
  deptId: string;
}
export function getUserDic(params: userParams): Promise<any> {
  return baseHandler(
    'userSelect',
    cbdApiProjectCommonUserSelectListGet,
    params,
    false,
    120000
  );
}

// 部门选择下拉
export function getDeptDic(): Promise<any> {
  return baseHandler(
    'deptSelect',
    cbdApiProjectCommonDeptSelectListGet,
    {},
    false,
    300000
  );
}

// 角色选择下拉
export function getRoleDic(): Promise<any> {
  return baseHandler(
    'roleSelect',
    cbdApiProjectCommonRoleSelectListGet,
    {},
    false,
    300000
  );
}

// 获取指定的数据字典数据
export function getPublicDic(key: string, refresh?: boolean): Promise<any> {
  return baseHandler(
    key,
    cbdApiProjectCommonGetDictDataCodeGet,
    { code: key },
    refresh,
    120000
  );
}

// 获取商品库单位下拉
export function getUnitsDic(refresh?: boolean): Promise<any> {
  return baseHandler(
    'unitsSelect',
    groundPcApiCommonProductAttributeUnitsGet,
    {},
    refresh,
    300000
  );
}

// 商品库品牌下拉
export function getBrandDic(refresh?: boolean): Promise<any> {
  return baseHandler(
    'brandSelect',
    groundPcApiCommonProductAttributeBrandGet,
    {},
    refresh,
    300000
  );
}

// 商品库规格下拉
export function getSpecificationsDic(refresh?: boolean): Promise<any> {
  return baseHandler(
    'specificationsSelect',
    groundPcApiCommonProductAttributeSpecificationsGet,
    {},
    refresh,
    300000
  );
}

// 商品库分类下拉
export function getClassifyDic(refresh?: boolean): Promise<any> {
  return baseHandler(
    'classifySelect',
    groundPcApiCommonProductAttributeClassifyGet,
    {},
    refresh,
    300000
  );
}

// 账户进件  行别
export function getBankTypeListDic(refresh?: boolean): Promise<any> {
  return baseHandler(
    'bankTypeListSelect',
    cbdApiProjectIncomingCommonBankTypeListGet,
    {},
    refresh,
    300000
  );
}

// 账户进件 开户行
export function getBankListDic(refresh?: boolean): Promise<any> {
  return baseHandler(
    'bankListSelect',
    cbdApiProjectIncomingCommonBankListGet,
    {},
    refresh,
    300000
  );
}

// 账户进件 经营范围
export function getBusinessListDic(refresh?: boolean): Promise<any> {
  return baseHandler(
    'businessListSelect',
    cbdApiProjectIncomingCommonBusinessListGet,
    { type: 1, source: 1 },
    refresh
  );
}

// 账户进件 省市区下拉
export function getAreaListDic(refresh?: boolean): Promise<any> {
  return baseHandler(
    'areaListSelect',
    cbdApiProjectIncomingCommonAreaListGet,
    {},
    refresh
  );
}
