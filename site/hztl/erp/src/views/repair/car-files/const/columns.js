import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { vehicleTypeDictionary } from "@/utils/store";
import areas from "@/api/area/area";

function recurFindArea(areaList, areaId) {
  let exist = false;
  let areaLabel = "";
  areaList.forEach(item => {
    if (item.value == areaId) {
      exist = true;
      areaLabel += item.label;
    } else {
      if (item.children && item.children.length > 0) {
        if (recurFindArea(item.children, areaId).exist) {
          exist = true;
          areaLabel =
            item.label + " " + recurFindArea(item.children, areaId).areaLabel;
        }
      }
    }
  });
  return {
    exist,
    areaLabel
  };
}

export const columns = [
  {
    prop: "customerNumber",
    label: "客户编号",
    width: CELL_WIDTH.date
  },
  {
    prop: "customerName",
    label: "客户名称",
    width: CELL_WIDTH.date
  },

  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vin",
    label: "车架号",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehBrand",
    label: "品牌",
    width: CELL_WIDTH.date
  },
  {
    prop: "facBrand",
    label: "厂牌",
    width: CELL_WIDTH.date
  },
  {
    prop: "vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.date
  },
  {
    prop: "year",
    label: "年款",
    width: CELL_WIDTH.date
  },
  {
    prop: "displacementEngine",
    label: "排量｜发动机",
    width: CELL_WIDTH.date
  },
  {
    prop: "gearboxModel",
    label: "变速箱型号",
    width: CELL_WIDTH.date
  },
  {
    prop: "engineNo",
    label: "发动机号",
    width: CELL_WIDTH.date
  },
  {
    prop: "transmission",
    label: "变速箱",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "transmissionNo",
    label: "变速箱号",
    width: CELL_WIDTH.date
  },
  // {
  //   prop: "salesModel",
  //   label: "销售版型",
  //   width: CELL_WIDTH.date,
  //   isHide: true
  // },
  {
    prop: "vehicleLevelName",
    label: "车辆级别",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "drivingType",
    label: "驱动类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "bodyColor",
    label: "车身颜色",
    width: CELL_WIDTH.date
  },
  {
    prop: "interiorColor",
    label: "内饰颜色",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "soundPassword",
    label: "音响密码",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "keyNumber",
    label: "钥匙号",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "docNumber",
    label: "档案号",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "fuelType",
    label: "燃油型号",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "tireSpec",
    label: "轮胎规格",
    width: CELL_WIDTH.date
  },
  {
    prop: "params",
    label: "车型技术参数",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "vehicleTypeId",
    label: "车辆类型",
    width: CELL_WIDTH.date,
    formatter: value => {
      const list = vehicleTypeDictionary();
      return list.find(item => item.id === value)?.name;
    }
  },
  {
    prop: "manufactureDate",
    label: "出厂日期",
    width: CELL_WIDTH.date
  },
  {
    prop: "purchaseDate",
    label: "购车日期",
    width: CELL_WIDTH.date,
    type: "date",
    isHide: true
  },
  {
    prop: "plateDate",
    label: "上牌日期",
    width: CELL_WIDTH.date
  },
  {
    prop: "auditMonth",
    label: "年检月份",
    width: CELL_WIDTH.date
  },
  {
    prop: "firstComeTime",
    label: "首次来厂日期",
    width: CELL_WIDTH.date,
    type: "date"
  },
  {
    prop: "lastLeaveTime",
    label: "最后离厂日期",
    width: CELL_WIDTH.date,
    type: "date"
  },
  {
    prop: "nextMaintainMile",
    label: "下次保养里程",
    width: CELL_WIDTH.date,
    formatter: value => (value ? value + " km" : "")
  },
  {
    prop: "nextMaintainTime",
    label: "下次保养日期",
    width: CELL_WIDTH.date,
    type: "date"
  },
  {
    prop: "repairCount",
    label: "维修次数",
    width: CELL_WIDTH.date
  },

  {
    prop: "mandatoryInsurance",
    label: "保单号（交强险）",
    width: CELL_WIDTH.time
  },
  {
    prop: "commercialInsurance",
    label: "保单号（商业险）",
    width: CELL_WIDTH.time
  },
  {
    prop: "insuranceCompanyName",
    label: "保险公司",
    width: CELL_WIDTH.date
  },
  {
    prop: "insuranceStart",
    label: "保单起保日期",
    width: CELL_WIDTH.date
  },
  {
    prop: "insuranceExpiry",
    label: "保单到期日期",
    width: CELL_WIDTH.date
  },

  {
    prop: "ownerName",
    label: "车主",
    width: CELL_WIDTH.date
  },
  {
    prop: "sex",
    label: "车主性别",
    width: CELL_WIDTH.date,
    formatter: value => {
      if (!value) return "";
      return value == "man" ? "男" : "女";
    }
  },
  {
    prop: "birthday",
    label: "车主生日",
    width: CELL_WIDTH.date
  },
  {
    prop: "ownerPhone",
    label: "车主电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "address",
    label: "车主地址",
    width: CELL_WIDTH.no,
    formatter: (_, row) => {
      const { areaId, address } = row;
      try {
        const area = recurFindArea(areas, areaId);
        return area.areaLabel + address;
      } catch {
        return address;
      }
    }
  },
  {
    prop: "customerAddress",
    label: "客户地址",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsName",
    label: "客户联系人",
    width: CELL_WIDTH.date
  },
  {
    prop: "contactsPhone",
    label: "客户联系电话",
    width: CELL_WIDTH.date
  },
  {
    prop: "certType",
    label: "证件类型",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "certNumber",
    label: "证件号码",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "nation",
    label: "民族",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "education",
    label: "学历",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "industry",
    label: "从事行业",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "householdIncome",
    label: "家庭收入",
    width: CELL_WIDTH.date,
    isHide: true,
    formatter: value => {
      return value ? `${value}万` : "";
    }
  },
  {
    prop: "marriage",
    label: "婚姻状况",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "hobbies",
    label: "兴趣爱好",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "qqWechat",
    label: "QQ/微信",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "email",
    label: "电子邮箱",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "customerCompanyName",
    label: "客户登记分公司",
    width: CELL_WIDTH.time
  },
  {
    prop: "customerCreatedDate",
    label: "客户登记日期",
    width: CELL_WIDTH.time,
    type: "time"
  },
  {
    prop: "companyName",
    label: "车辆登记分公司",
    width: CELL_WIDTH.time
  },
  {
    prop: "createdAt",
    label: "车辆登记日期",
    width: CELL_WIDTH.time,
    type: "time"
  },
  {
    prop: "deductionRate",
    label: "绝对免赔率",
    width: CELL_WIDTH.date,
    isHide: true,
    formatter: value => {
      return `${value ? Number(Number(value) * 100).toFixed(2) + "%" : ""}`;
    }
  },
  {
    prop: "manHourDiscount",
    label: "工时折扣",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "partDiscount",
    label: "配件折扣",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "partPriceType",
    label: "配件价格",
    width: CELL_WIDTH.date,
    isHide: true
  },
  {
    prop: "isSameCustomer",
    label: "同客户属性",
    width: CELL_WIDTH.date,
    isHide: true,
    formatter: (_, row) => {
      const { flags } = row;
      return flags.isSameCustomer ? "是" : "否";
    }
  },
  // {
  //   prop: "canDiscount",
  //   label: "不享受折扣和优惠",
  //   width: CELL_WIDTH.time,
  //   isHide: true,
  //   formatter: (_, row) => {
  //     const { flags } = row;
  //     return flags.canDiscount ? "否" : "是";
  //   }
  // },
  {
    prop: "forReview",
    label: "要求回访",
    width: CELL_WIDTH.date,
    isHide: true,
    formatter: (_, row) => {
      const { flags } = row;
      return flags.forReview ? "是" : "否";
    }
  },
  {
    prop: "remark",
    label: "备注",
    width: CELL_WIDTH.date
  }
];
