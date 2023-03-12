export type DataSource = { name: string; value: number };
/**
 * @params [source] 数据源 DataSource[]
 * @params [num] 需要显示多少个,如:传10就是top9+其他
 * @params [restName] 剩下的分类名字.默认:其他
 * */
export default function useSetEchartsOthers(
  source: DataSource[],
  num = 10,
  restName = '其他'
) {
  // 数据源<=num时,无需操作直接显示
  if (source.length <= num) {
    return source;
  }
  // 取出top num-1,固定会显示
  const finalData = source.slice(0, num - 1);
  // 取出剩下的所有分类
  const others = source.slice(num - 1);
  // 剩下的求和构造其他类
  const otherTotal: number = others.reduce(
    (prev: number, cur) => cur['value'] + prev,
    0
  );
  // 固定显示的数据拼接'其他'分类
  finalData.push({ name: restName, value: otherTotal });
  return finalData;
}
