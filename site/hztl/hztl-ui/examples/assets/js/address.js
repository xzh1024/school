export function Assembly(data) {
  const address = [];
  data.forEach(item => {
    if (item.type === 2) {
      address.push({ ...item });
    }
  });
  address.forEach(aitem => {
    aitem.children = [];
    data.forEach(item => {
      if (item.type === 3 && aitem.id === item.parenId) {
        aitem.children.push(item);
      }
    });
    aitem.children.forEach(citem => {
      citem.children = [];
      data.forEach(item => {
        if (item.type === 4 && citem.id === item.parenId) {
          citem.children.push(item);
        }
      });
    });
  });

  return address;
}
