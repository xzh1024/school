export function formateArea(areaNames) {
  let area = "";
  if (areaNames instanceof Array) {
    if (areaNames.length === 3) {
      area = `${areaNames[0] ? `${areaNames[0]}/` : ""}${
        areaNames[1]
          ? areaNames[1] === areaNames[0]
            ? ""
            : `${areaNames[1]}/`
          : ""
      }${areaNames[2] ? areaNames[2] : ""}`;
    } else if (areaNames.length === 2) {
      area = `${areaNames[0] ? `${areaNames[0]}/` : ""}${
        areaNames[1] ? `${areaNames[1]}` : ""
      }`;
    }
  } else if (areaNames) {
    area = areaNames;
  }
  return area;
}

export function formateAddress(value) {
  let areaAddress = "";
  if (value instanceof Object) {
    let address = "";
    let areaNames = [];
    let keys = [];
    keys = Object.keys(value);
    if (keys.includes("receiverAreaNames")) {
      areaNames = [...value.receiverAreaNames];
    } else if (
      keys.includes("provinceName") &&
      keys.includes("cityName") &&
      keys.includes("areaName")
    ) {
      areaNames = [value.provinceName, value.cityName, value.areaName];
    }
    const area = formateArea(areaNames);
    address = value.receiverAddress || value.address || "";

    areaAddress = `${area} ${address}`;
  } else if (value) {
    areaAddress = value;
  }
  return areaAddress;
}
