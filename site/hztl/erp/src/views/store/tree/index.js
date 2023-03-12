export function constructStoreTree(data) {
  data.forEach(item => {
    item.type = "warehouses";
    item.key = "warehouses" + item.id;
    if (!item.next.length) return;
    item.next.forEach(items => {
      items.type = "wareareas";
      items.key = "warehouses.wareareas" + items.id;
      if (!items.next.length) return;
      items.next.forEach(citem => {
        citem.type = "shelves";
        citem.key = "warehouses.wareareas.shelves" + citem.id;
        if (!citem.next.length) return;
        citem.next.forEach(obj => {
          obj.type = "layers";
          obj.key = "warehouses.wareareas.shelves.layers" + obj.id;
          if (!obj.next.length) return;
          obj.next.forEach(o => {
            o.type = "positions";
            o.key = "warehouses.wareareas.shelves.layers.positions" + o.id;
          });
        });
      });
    });
  });
  return data;
}

export function constructCheckedKey(data, type) {
  const keyArr = [];
  if (data === null) {
    return keyArr;
  } else {
    data.forEach(item => {
      keyArr.push(type + item);
    });
    return keyArr;
  }
}
