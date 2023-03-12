function statusesMap(oldValue, newValue) {
  const arr = [];
  oldValue.forEach(item => {
    arr.push(...newValue[item]);
  });
  return arr;
}

export default statusesMap;
