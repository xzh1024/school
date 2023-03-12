import { TableSettingConfig } from "@/constants/interface";
import { CELL_WIDTH } from "@/constants";

export const AREA = [
  { label: "空", value: 0 },
  { label: "江苏", value: 1 },
  { label: "湖北", value: 2 },
  { label: "浙江", value: 3 },
  { label: "甘肃", value: 4 },
  { label: "河南", value: 5 },
  { label: "重庆", value: 6 },
  { label: "北京", value: 7 },
  { label: "河北", value: 8 },
  { label: "宁夏", value: 9 },
  { label: "贵州", value: 10 },
  { label: "海南", value: 11 },
  { label: "福建", value: 12 },
  { label: "湖南", value: 13 },
  { label: "山西", value: 14 },
  { label: "上海", value: 15 },
  { label: "江西", value: 16 },
  { label: "天津", value: 17 },
  { label: "陕西", value: 18 },
  { label: "新疆", value: 19 },
  { label: "安徽", value: 20 },
  { label: "内蒙古", value: 21 },
  { label: "山西太原", value: 22 },
  { label: "山东", value: 23 },
  { label: "山东青岛", value: 24 },
  { label: "福建厦门", value: 25 },
  { label: "云南", value: 26 },
  { label: "青海 (暂未开通)", value: 27 }
];
export const HEALTH_PARAMETERS_LIST: TableSettingConfig<any> = {
  name: "systemParamsSettingParametersList",
  columns: [
    {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    },
    {
      prop: "multiple",
      label: "选择",
      type: "multiple",
      width: CELL_WIDTH.multiple,
      cantExport: true
    },
    {
      prop: "name",
      label: "分公司名称",
      width: CELL_WIDTH.companyName
    },
    {
      prop: "factoryCode",
      label: "维修厂编号",
      width: 90,
      formatter: (_, row) => {
        return row.factoryCode;
      }
    },
    {
      prop: "account",
      label: "用户名",
      width: 90,
      formatter: (_, row) => {
        return row.account;
      }
    },
    {
      prop: "password",
      label: "密码",
      width: 90,
      formatter: (_, row) => {
        return row.password;
      }
    },
    {
      prop: "areaCode",
      label: "所属地区",
      width: 90,
      formatter: (_, row) => {
        return row.areaCode;
      }
    }
  ]
};
