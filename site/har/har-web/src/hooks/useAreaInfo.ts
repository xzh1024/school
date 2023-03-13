import area from '@/utils/area.json';

interface Item {
  value: string;
  label: string;
  children: Array<any>;
}

interface Obj {
  value: string;
  label: string;
}

export default async function useAreaInfo(
  provinceCode: string,
  cityCode: string,
  countyCode: string
) {
  let provinceName = '';
  let cityName = '';
  let countyName = '';

  const province: any = await area.find((item: any) => {
    return item.value === provinceCode;
  });
  provinceName = province.label;

  const city: Item = await province.children.find((item: any) => {
    return item.value === cityCode;
  });
  cityName = city.label;

  const county: Obj = await city.children.find((item: any) => {
    return item.value === countyCode;
  });
  countyName = county.label;

  return {
    provinceName,
    cityName,
    countyName
  };
}
