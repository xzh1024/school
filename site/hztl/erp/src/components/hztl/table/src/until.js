import { dateFormat, dateFormatFull } from "@/utils/date";
import { formateAddress, formateArea } from "@/utils/formateAddress";
import eventBus from "@/event";
import { multiply } from "@/utils/numberAPI";
import { isBusinessBillType } from "@/utils/businessBillType";
import getNoPricePermTips from "@/utils/getNoPricePermTips";
import { formatAmout } from "@/utils/tool";

export function getRowValue(row, prop) {
  if (Array.isArray(prop)) {
    let value = row;
    const array = prop;
    array.forEach(key => {
      value = value && value[key];
    });
    return value;
  }
  return row[prop];
}

export function getPropValue(prop) {
  if (Array.isArray(prop)) {
    return prop.join(".");
  }
  return prop;
}

export const showBillDetail = (billType, billId, e) => {
  if (e) {
    e.stopPropagation();
  }
  if (!billId) {
    return;
  }
  eventBus.$emit("showBillDetail", {
    billType,
    billId
  });
};

export const showFreightNoBillDetail = (registerId, e) => {
  if (e) {
    e.stopPropagation();
  }
  if (!registerId) {
    return;
  }
  eventBus.$emit("showFreightNoBillDetail", {
    registerId
  });
};

export function formatterColums(columns) {
  // h for jsx
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const h = eventBus.$createElement;
  return columns.map(item => {
    const column = {
      ...item,
      key: item.key,
      prop: item.prop,
      label: item.label,
      width: item.width,
      formatter: item.formatter,
      render: item.render,
      classNames: item.classNames || item.className
    };
    switch (item.type) {
      case "index":
      case "multiple":
      case "controls":
      case "expand":
        column.type = item.type;
        break;
      case "number":
        column.classNames += " number-font";
        break;
      case "amount":
        column.classNames += " number-font";
        column.formatter = value => formatAmout(getNoPricePermTips(value));
        break;
      case "date":
        column.formatter = value => dateFormat(value);
        break;
      case "time":
        column.formatter = value => dateFormatFull(value);
        break;
      case "area":
        column.formatter = value => formateArea(value);
        break;
      case "address":
        column.formatter = (value, row) => formateAddress(row);
        break;
      case "percent":
        column.classNames += " number-font";
        column.formatter = value => value && `${multiply(Number(value), 100)}%`;
        break;
      case "invoiceType":
        column.formatter = (value, row) =>
          this.getFormatInvoiceType(value, row.taxRate);
        break;
      case "companyName":
        column.formatter = value => this.getCompanyName(value);
        break;
      case "staffName":
        column.formatter = value => this.getStaffName(value);
        break;
      case "billNo":
        column.render = (value, row) => {
          const billType = item.billTypeField
            ? getRowValue(row, item.billTypeField)
            : item.billTypeData;
          const billId = item.billIdField
            ? getRowValue(row, item.billIdField)
            : row.sourceBillId || row.billId || row.businessId;
          return (
            <a
              class={isBusinessBillType(billType) ? "link" : ""}
              on-click={e =>
                showBillDetail(
                  billType,
                  column.information && column.information.billDetailKey
                    ? row[column.information.billDetailKey]
                    : billId,
                  e
                )
              }
            >
              {value}
            </a>
          );
        };
        break;
      case "billId":
        column.render = (value, row) => {
          const billType = item.billTypeField
            ? getRowValue(row, item.billTypeField)
            : item.billTypeData;
          const billId = item.billIdField
            ? getRowValue(row, item.billIdField)
            : row.id;
          return (
            <a
              class={isBusinessBillType(billType) ? "link" : ""}
              on-click={e =>
                showBillDetail(
                  billType,
                  column.information && column.information.billDetailKey
                    ? row[column.information.billDetailKey]
                    : billId,
                  e
                )
              }
            >
              {value}
            </a>
          );
        };
        break;
      case "freightNo":
        column.render = (value, row) => (
          <a
            class="link"
            on-click={e =>
              showFreightNoBillDetail(row.registerId || row.freightId, e)
            }
          >
            {value}
          </a>
        );
        break;
      case "saleVehModel":
        column.formatter = value => {
          if (value) {
            if (value.length == 1) {
              return value[0];
            } else if (value.length > 1) {
              let vehModel = "";
              value.forEach(item => {
                vehModel += item + "，";
              });
              return vehModel.substr(0, vehModel.length - 1);
            }
          } else {
            return "";
          }
        };
        break;
    }
    return column;
  });
}
