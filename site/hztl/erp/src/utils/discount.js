/* 根据工单信息获取默认的项目折扣 */
export function getDisCountInfo(orderInfo, type, listCanDiscount) {
  switch (type) {
    case "item": // 项目
      return getItemCountInfo(orderInfo, listCanDiscount);
    case "part": // 配件
      return getPartCountInfo(orderInfo);
    case "set": // 套餐（除已购套餐）
      return getSetCountInfo(orderInfo);
    case "paid": // 已购类
      return {
        discount: null,
        canChangeDiscount: false
      };
    default:
      return {
        discount: null,
        canChangeDiscount: false
      };
  }
}

function getItemCountInfo(orderInfo, listCanDiscount) {
  try {
    // const canVehicleDiscount = orderInfo.vehicle.flags.canDiscount; // 车辆能否打折
    const canItemDiscount = listCanDiscount; // 项目能否打折
    let canChangeDiscount = false; // 是否可以修改折扣
    let discount = null; // 折扣
    if (canItemDiscount) {
      canChangeDiscount = true;
      if (orderInfo.memberDiscountType) {
        discount = orderInfo.memberDiscountItem;
      }
    }
    // console.log("车辆能否打折", canVehicleDiscount);
    // console.log("项目能否打折", canItemDiscount);
    // console.log("是否可以修改折扣", canChangeDiscount);
    // console.log("折扣", discount);
    return {
      canChangeDiscount,
      discount
    };
  } catch {
    return {
      discount: null,
      canChangeDiscount: false
    };
  }
}

function getPartCountInfo(orderInfo) {
  try {
    // const canVehicleDiscount = orderInfo.vehicle.flags.canDiscount; // 车辆能否打折
    const canChangeDiscount = true; // 是否可以修改折扣
    let discount = 1; // 折扣
    if (orderInfo.memberDiscountType) {
      discount = orderInfo.memberDiscountPart;
    }
    // console.log("车辆能否打折", canVehicleDiscount);
    // console.log("是否可以修改折扣", canChangeDiscount);
    // console.log("折扣", discount);
    return {
      canChangeDiscount,
      discount
    };
  } catch {
    return {
      discount: 1,
      canChangeDiscount: true
    };
  }
}

function getSetCountInfo(orderInfo) {
  try {
    // const canVehicleDiscount = orderInfo.vehicle.flags.canDiscount; // 车辆能否打折
    let canChangeDiscount = false; // 是否可以修改折扣
    let discount = null; // 折扣
    if (orderInfo.memberDiscountType) {
      canChangeDiscount = true;
      discount = orderInfo.memberDiscountSet;
    }
    // console.log("车辆能否打折", canVehicleDiscount);
    // console.log("是否可以修改折扣", canChangeDiscount);
    // console.log("折扣", discount);
    return {
      canChangeDiscount,
      discount
    };
  } catch {
    return {
      discount: null,
      canChangeDiscount: false
    };
  }
}
