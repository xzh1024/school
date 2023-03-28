type CellModel = {
  value: string;
  count: number;
};
type ItemModel = {
  left: CellModel[];
  right: CellModel[];
} & CellModel;

function getTopThree(text: string) {
  const list = text.split(' ');
  if (!list.length) return [];
  const tempList: ItemModel[] = [];
  const len = list.length;
  list.forEach((key, index) => {
    const findData = tempList.find(
      (item) => item.value.toLowerCase() === key.toLowerCase()
    );
    if (findData) {
      findData.count++;
      // 记录左边单词出现次数
      const leftKey = list[index - 1];
      const findLeft = findData.left.find(
        (lItem) => lItem.value.toLowerCase() === leftKey.toLowerCase()
      );
      if (findLeft) {
        findLeft.count++;
      } else {
        findData.left.push({
          value: leftKey,
          count: 1
        });
      }
      // 记录右边单词出现次数
      if (index < len - 1) {
        const rightKey = list[index + 1];
        const findRight = findData.right.find(
          (rItem) => rItem.value.toLowerCase() === rightKey.toLowerCase()
        );
        if (findRight) {
          findRight.count++;
        } else {
          findData.right.push({
            value: rightKey,
            count: 1
          });
        }
      }
    } else {
      const temp = {
        value: key,
        count: 1,
        left: index
          ? [
              {
                value: list[index - 1],
                count: 1
              }
            ]
          : [],
        right:
          index < len - 1
            ? [
                {
                  value: list[index + 1],
                  count: 1
                }
              ]
            : []
      };
      tempList.push(temp);
    }
  });
  // 排序
  sortList(tempList);
  // 返回前三的数据
  if (tempList.length < 3) {
    return tempList.slice(0, tempList.length);
  }
  return tempList.slice(0, 3);
}

// 从大到小排序，大小相等则按字母排序
function sortList(list: CellModel[]): CellModel[] {
  list.sort((a, b) => {
    if (a.count === b.count) {
      const nameA = a.value.toUpperCase();
      const nameB = b.value.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    }
    return b.count - a.count;
  });
  return list;
}

const text =
  'Since 2016, this leading Philippine fiber broadband operator has built or leased nine ' +
  'IDCs across Manila’s metropolitan area, a region with 12.9 million people and one of ' +
  'the most densely populated cities in the world. The demand for data center services has ' +
  'dramatically increased so much that Converge is already engaging in a new series of ' +
  'major upgrades. As the company’s IDC services have been growing, customer demand has ' +
  'grown even faster, with bandwidth demand increasing ten-fold in just two years, ' +
  'straining legacy DCI systems. But given physical constraints, any new upgrades needed ' +
  'to be carefully thought through. The physical footprint had to be kept to a minimum, ' +
  'with hardware future- proofed to be match predicted increases in bandwidth demand. ' +
  'Furthermore, rollout needed to be quick and efficient, and simplified Operations and ' +
  'Maintenance (O&M) were a must, to minimize the risk of downtime.Converge looked to ' +
  'implement upgrades that could be deployed quickly in order to maintain the company’s ' +
  'reputation for high-speed, low latency services and network reliability. Following an ' +
  'in-depth evaluation, it selected Huawei’s DC OptiX 2.0 Wavelength Division Multiplexing ' +
  '(WDM) solution that, Brusola believes, is capable of handling the company’s burgeoning ' +
  'IDC traffic not just right now, but for the next decade too.';
const finalList = getTopThree(text);
// 拼接字符串模板
let str = '';
finalList.forEach((item) => {
  const leftList = sortList(item.left);
  const rightList = sortList(item.right);
  let leftData = {
    value: '',
    count: 0
  };
  if (leftList.length) leftData = leftList[0];
  let rightData = {
    value: '',
    count: 0
  };
  if (rightList.length) rightData = rightList[0];
  str += `- ${item.value} ${item.count}, left: ${leftData.value} ${
    leftData.count || ''
  }, right: ${rightData.value} ${rightData.count || ''} <br>`;
});
document.body.innerHTML = str;
