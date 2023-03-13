interface EnumHashType {
  readonly [index: number]: string;
}
interface ListDataType {
  [key: string]: any;
  isEnum?: boolean;
  source?: EnumHashType;
  hasUnit?: boolean;
  unit?: string;
  span?: number;
}
export default function useFormatDescription(
  data: ListDataType,
  item: ListDataType
) {
  const defaultValue = '--';
  let t: any = '';
  if (item.hasUnit) {
    t = `${data[item.prop] ? `${data[item.prop] + item.unit}` : defaultValue}`;
  } else if (item.isEnum) {
    t = item.source
      ? item.source[data[item.prop]] ?? defaultValue
      : defaultValue;
  } else if (item.multiple) {
    const temp = data[item.prop];
    if (temp) {
      temp.forEach((el: any) => {
        t += `${el[item.multiKey]}丶`;
      });
      t = t.slice(0, t.length - 1);
    }
  } else {
    t = data[item.prop] === '' ? defaultValue : data[item.prop];
  }
  return t;
}
