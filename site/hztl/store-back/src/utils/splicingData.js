import request, { SERVICE_MODULE_MAP } from "@/utils/request";

export function getAddressList(){
  //获取区域 list
  let addressList = [];
  request({
    baseURL: SERVICE_MODULE_MAP.accounts,
    url: "/areas",
    method: "get"
  }).then( res => {
    let list = res;
    //拼接省数据入
    for (let item of list) {
      if (item.type == 2) {
        addressList.push({
          value: item.id,
          label: item.name,
          children: []
        })
      }
    }
    //省拼接好后循环拼接省对应的市
    for (let item of list) {
      for (let province of addressList) {
        if (item.parenId == province.value) {
          province.children.push({
            value: item.id,
            label: item.name,
            children: []
          })
        }
      }
    }
    //最后拼接所有市对应的县或者区
    for (let item of list) {
      for (let province of addressList) {
        for (let city of province.children) {
          if (item.parenId == city.value) {
            city.children.push({
              value: item.id,
              label: item.name
            })
          }
        }
      }
    }

  });
  return addressList;
}

export function getPositionAreaById(areaId, list) {
  //三次循环匹配需要的position
  for (let provinceIndex of list) {
    for (let cityIndex of provinceIndex.children) {
      for (let countryIndex of cityIndex.children) {
        if (areaId == countryIndex.value) {
          return {
            position: [provinceIndex.value, cityIndex.value, areaId],
            name: provinceIndex.label + "/" + cityIndex.label + "/" + countryIndex.label
          }
        }
      }
    }
  }
  //循环结束后如果没有返回数据，则在这里返回一条数据
  return {
    position: [],
    name: "",
  }
}
