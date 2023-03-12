import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import eventBus from "@/event";

// h for jsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = eventBus.$createElement;

// import { baseDictionary } from "@/api/base/base"; // 基础信息
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息

const userParams = {
  roles: ["systemAdmin", "companyAdmin", "receptionConsultant"]
};
export const USER_LIST_KEY_VALUE = {};
searchTypeStaffs(userParams).then(res => {
  res.forEach(item => {
    USER_LIST_KEY_VALUE[item.id] = item.name;
  });
});

// export const REPAIR_BUSINESS_CATEGORY = {};
// baseDictionary({ type: "repairBusinessCategory" }).then(res => {
//   res.options.forEach(item => {
//     REPAIR_BUSINESS_CATEGORY[item.id] = item.name;
//   });
// });

export const APPOINTMENT_COLUMNS = [
  {
    prop: "index",
    label: "序号",
    type: "index",
    width: CELL_WIDTH.index,
    cantHide: true,
    cantExport: true
  },
  {
    prop: "arrivalDate",
    label: "预约到店日期",
    width: CELL_WIDTH.date
  },
  {
    label: "预约到店时段",
    width: CELL_WIDTH.date,
    align: "center",
    formatter(_, row) {
      const { startTime, endTime } = row;
      if (startTime == "00:00:00" && endTime == "23:59:00") {
        return "全天";
      } else {
        return `${startTime ? startTime.substr(0, 5) : ""} - ${
          endTime ? endTime.substr(0, 5) : ""
        }`;
      }
    }
  },
  {
    prop: "billNo",
    label: "预约单号",
    width: CELL_WIDTH.no
  },
  {
    prop: "status",
    label: "预约状态",
    width: CELL_WIDTH.status,
    cantExport: true,
    render: value => {
      if (value == "超时未到") {
        return <span style="color: #F56C6C">{value}</span>;
      }
      if (value == "未到店") {
        return <span style="color:#E6A23C">{value}</span>;
      }
      if (value == "已转单") {
        return <span style="color:#409EFF">{value}</span>;
      }
      if (value == "已取消") {
        return <span style="color:#909399">{value}</span>;
      }
    }
  },
  {
    prop: "sourceType",
    label: "来源类型",
    width: CELL_WIDTH.date
  },
  {
    prop: "plateNumber",
    label: "车牌号",
    width: CELL_WIDTH.date
  },
  {
    prop: "customerName",
    label: "客户名称",
    width: CELL_WIDTH.partSortName
  },
  {
    prop: "customerPhone",
    label: "客户电话",
    width: CELL_WIDTH.phone
  },
  {
    prop: "contactsName",
    label: "预约人",
    width: CELL_WIDTH.partSortName
  },
  {
    prop: "contactsPhone",
    label: "预约电话",
    width: CELL_WIDTH.phone
  },
  {
    prop: "vehBrand",
    label: "车辆品牌",
    width: CELL_WIDTH.brand
  },
  {
    prop: "facBrand",
    label: "车辆厂牌",
    width: CELL_WIDTH.partType
  },
  {
    prop: "vehicleGroup",
    label: "车型组",
    width: CELL_WIDTH.type
  },
  {
    prop: "year",
    label: "年款",
    width: CELL_WIDTH.type
  },
  {
    prop: "displacement",
    label: "排量|发动机",
    width: CELL_WIDTH.type,
    formatter(_, row) {
      const { displacement, engine } = row;
      return `${displacement ? displacement : ""} ${
        displacement && engine ? "|" : ""
      } ${engine ? engine : ""}`;
    }
  },
  {
    prop: "transmission",
    label: "变速箱",
    width: CELL_WIDTH.type
  },
  {
    prop: "typeName",
    label: "预约业务类型",
    width: CELL_WIDTH.partType
  },
  {
    prop: "remark",
    label: "预约备注",
    width: CELL_WIDTH.remark
  },
  {
    prop: "receptionistId",
    label: "接待员",
    width: CELL_WIDTH.date,
    formatter(value) {
      return USER_LIST_KEY_VALUE[value] || "-";
    }
  },
  {
    prop: "newCustomer",
    label: "是否新客户",
    width: CELL_WIDTH.date,
    formatter(value) {
      return value == true ? "是" : "否";
    }
  }
];
