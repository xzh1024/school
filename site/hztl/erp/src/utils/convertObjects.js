function convertObjects(rows) {
  const newRows = [];
  for (let i = 0; i < rows.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    newRows.push(convertObject(rows[i]));
  }
  return newRows;
}

function convertObject(oldObject) {
  const newObject = {};
  for (const k in oldObject) {
    const keys = k.split(".");
    let o = newObject;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!o[keys[i]]) o[keys[i]] = {};
      o = o[keys[i]];
    }
    o[keys[keys.length - 1]] = oldObject[k];
  }
  return newObject;
}
export default convertObjects;
