import $ from 'jquery';
import { URL_MODULE } from "@/request";
export function getAddressList(){
  let addressList =[{data:[]}];
  $.ajax({
    type :"get",
    url: URL_MODULE.accounts+"/areas",
    async: false,
    success : function(res) {
      if(res.code == "ok"){
        let list = res.data;
        //拼接省数据入
        for(let item of list){
          if(item.type ==2){
            addressList[0].data.push({
              id: item.id,
              value: item.name,
              childs:[]
            })
          }
        }
        //省拼接好后循环拼接省对应的市
        for(let item of list){
          for(let province of addressList[0].data){
            if(item.parenId == province.id){
              province.childs.push({
                id: item.id,
                value: item.name,
                childs: []
              })
            }
          }
        }
        //最后拼接所有市对应的县或者区
        for(let item of list){
          for(let province of addressList[0].data){
            for(let city of province.childs){
              if(item.parenId == city.id){
                city.childs.push({
                  id: item.id,
                  value: item.name
                })
              }
            }
          }
        }
      }
    },
  })
  return addressList;
}

function injectAddressList(list){
  let addressList =[{data:[]}];
  //拼接省数据入
  for(let item of list){
    if(item.type ==2){
      addressList[0].data.push({
        id: item.id,
        value: item.name,
        childs:[]
      })
    }
  }
  //省拼接好后循环拼接省对应的市
  for(let item of list){
    for(let province of addressList[0].data){
      if(item.parenId == province.id){
        province.childs.push({
          id: item.id,
          value: item.name,
          childs: []
        })
      }
    }
  }
  //最后拼接所有市对应的县或者区
  for(let item of list){
    for(let province of addressList[0].data){
      for(let city of province.childs){
        if(item.parenId == city.id){
          city.childs.push({
            id: item.id,
            value: item.name
          })
        }
      }
    }
  }
  return addressList
}

export function getPositionAreaById(areaId, list){
  let tempFlat = [];
  let mark = true;
  if (!list || list.length <= 0) return tempFlat;
  for (let index = 0; index < list.length; index++) {
    const item = list[index];
    if(item.id === areaId) {
      mark = false;
      tempFlat.push(index);
    }
    const flat = getPositionAreaById(areaId, item.childs);
    if(flat.length && mark) {
      tempFlat.push(index);
    }
    tempFlat = tempFlat.concat(flat);
  }
  return tempFlat;
}