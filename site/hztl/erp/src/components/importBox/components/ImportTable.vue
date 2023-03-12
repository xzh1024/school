<template>
  <ht-table
    :keyScope="keyScope"
    :index-column="false"
    :columns="columns"
    :data="tableData"
    height="400"
    show-overflow-tooltip
  />
</template>

<script>
import { dateFormat, dateFormatToSecond } from "@/utils/date";

const selctionSymbol = Symbol("selction");
const WIDTH = "160";

export default {
  name: "ImportTable",
  props: {
    keyScope: {
      type: [Symbol, String],
      default: Symbol("ImportBoxTable")
    },
    data: {
      type: Array,
      required: true
    },
    selections: {
      type: Object,
      required: true
    },
    totalOptions: {
      type: Array,
      required: true
    },
    replaceData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      tableData: [],
      columns: [],
      autoSelection: []
    };
  },
  computed: {
    selectableOptions() {
      return this.totalOptions.filter(item => {
        return !Object.keys(this.selections).some(
          key => this.selections[key] === item.value
        );
      });
    }
  },
  watch: {
    data(value) {
      if (value.length) {
        this.getSheetData(value);
      } else {
        this.tableData = [];
        this.columns = [];
      }
    },
    autoSelection() {
      if (
        this.autoSelection &&
        this.autoSelection.length &&
        this.selectableOptions &&
        this.selectableOptions.length
      ) {
        this.autoSelection.forEach(item => {
          this.selectableOptions.forEach(option => {
            // eslint-disable-next-line no-useless-escape
            const reg = /[\(（\)）]/g;
            if (
              option.label === item ||
              (reg.test(option.label) &&
                reg.test(item) &&
                option.label.replace(reg, "") === item.replace(reg, ""))
            ) {
              this.$set(this.selections, item, option.value);
            }
          });
        });
      }
    }
  },
  methods: {
    getCurOptions(value) {
      const options = [
        ...this.totalOptions.filter(item => item.value === value),
        ...this.selectableOptions
      ];
      return options;
    },
    getSheetData(data) {
      const body = data ? [...data] : [];
      const firstData = { title: "导入目标字段" };
      const dataHeader = [...Object.keys(data[0])];
      this.autoSelection = [...dataHeader];
      dataHeader.forEach(key => {
        firstData[key] = selctionSymbol;
      });
      body.forEach((item, index) => {
        item.title = index + 1;
        const keys = Object.keys(item);
        if (keys?.length) {
          keys.forEach(key => {
            if (key.includes("日期")) {
              item[key] = dateFormat(item[key]);
            } else if (key.includes("时间")) {
              item[key] = dateFormatToSecond(item[key]);
            }
          });
        }
      });
      body.unshift({ ...firstData });
      this.tableData = [...body];
      const header = dataHeader.map(item => {
        return {
          label: item,
          prop: item,
          width: WIDTH,
          render: value => {
            if (value === selctionSymbol) {
              return (
                <HtSelect
                  clearable
                  size="mini"
                  name="label"
                  id="value"
                  v-model={this.selections[item]}
                  options={this.getCurOptions(this.selections[item])}
                ></HtSelect>
              );
            }
            return value;
          }
        };
      });
      header.unshift({
        label: "上传文件字段",
        prop: "title",
        width: "120",
        render: value => {
          return value;
        }
      });
      this.columns = [...header];
    },
    checkSelections() {
      if (
        this.selectableOptions.some(item => {
          return item.required;
        })
      ) {
        let wanings = this.selectableOptions.filter(item => {
          let flag = item.required;
          switch (item.value) {
            case "brand":
              flag =
                !(
                  this.replaceData.isAssignBrand && this.replaceData.assignBrand
                ) && item.required;
              break;
            case "productionPlace":
              flag =
                !(
                  this.replaceData.isAssignProductionPlace &&
                  this.replaceData.assignProductionPlace
                ) && item.required;
              break;
            case "warehouseName":
              if (this.replaceData.mode === 3) {
                flag = false;
              } else {
                flag =
                  !(
                    this.replaceData.isAssignWarehouse &&
                    this.replaceData.assignWarehouseId
                  ) && item.required;
              }
              break;
            case "positionName":
              if ([2, 3].includes(this.replaceData.mode)) {
                flag = false;
              } else {
                flag =
                  !(
                    this.replaceData.isAssignPosition &&
                    this.replaceData.assignPositionId
                  ) && item.required;
              }
              break;
            case "batchNo":
              if ([1, 2, 3].includes(this.replaceData.mode)) {
                flag = false;
              }
              break;
            case "companyName":
              flag =
                !(
                  this.replaceData.isAssignCompany &&
                  this.replaceData.assignCompanyId
                ) && item.required;
              break;
            default:
              break;
          }
          return flag;
        });

        if (wanings && wanings.length) {
          wanings = wanings.map(item => {
            return `缺少${item.label}`;
          });
          this.$message.warning({
            message: wanings.join("，"),
            showClose: true
          });
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  }
};
</script>
