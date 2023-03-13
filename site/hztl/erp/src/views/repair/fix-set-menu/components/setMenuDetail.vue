<template>
  <div style="height:100%;" class="set-wrap">
    <!-- 按钮组 -->
    <div class="header-btns">
      <el-button
        v-if="(isNew && allowCreate) || (!isNew && allowUpdate)"
        type="primary"
        size="small"
        @click="save"
        >保存（F3）</el-button
      >
      <el-button
        type="primary"
        v-if="allowUpdate || isNew"
        size="small"
        @click="showService = true"
        >添加服务项目</el-button
      >
      <el-button
        type="primary"
        v-if="allowUpdate || isNew"
        size="small"
        @click="showpart = true"
        >添加配件材料</el-button
      >
      <el-button
        v-if="type === 2 && allowCreate"
        type="primary"
        size="small"
        :disabled="!detail || !detail.id"
        @click="showCopy = true"
        >复制为新套餐</el-button
      >
    </div>
    <!-- 表单 -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :disabled="disabledEdit"
      :show-message="false"
      size="mini"
      label-width="100px"
    >
      <el-form-item :label="type === 1 ? '名称' : '保养里程'" prop="name">
        <el-input
          ref="input"
          v-model="form.name"
          place-holder="名称"
          size="small"
          @input="nameChange"
        />
      </el-form-item>
      <el-form-item label="适用车辆级别" v-if="type === 1">
        <div class="btns">
          <el-checkbox v-model="form.allVehicleLevel">全部级别</el-checkbox>
          <el-checkbox-group
            :disabled="form.allVehicleLevel"
            v-model="form.vehicleLevels"
          >
            <el-checkbox
              v-for="(level, index) in levels"
              :key="index"
              :label="level.id"
              >{{ level.name }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          place-holder="名称/助记符"
          size="small"
        />
      </el-form-item>
    </el-form>
    <!-- 项目配置 -->
    <div class="table-row">
      <div class="row-title">
        服务项目{{ basePriceData.length ? `(${basePriceData.length})` : "" }}
      </div>
      <div class="row-table">
        <ht-setting-table
          :data="basePriceData"
          :enable-table-setting="false"
          :columns="basePriceColumns"
          show-summary
          :summary-method="getServiceSummaries"
          height="235px"
          table-name="basePrice"
        />
      </div>
    </div>
    <div class="table-row">
      <div class="row-title">
        配件材料{{ partData.length ? `(${partData.length})` : "" }}
      </div>
      <div class="row-table">
        <ht-setting-table
          :data="partData"
          :enable-table-setting="false"
          :columns="partColumns"
          show-summary
          height="235px"
          :summary-method="getPartSummaries"
          table-name="level"
        />
      </div>
    </div>
    <p class="total">
      套餐价格:<span>{{ totalSetPrice }}</span>
    </p>
    <ServicesSelector
      :visible="showService"
      @addService="addService"
      @close="showService = false"
    />
    <PartSelector
      :visible="showpart"
      @addPart="addPart"
      @close="showpart = false"
    />
    <Copy
      v-if="parentNode"
      :visible="showCopy"
      :vehicleGroup="vehicleGroup"
      :facBrand="facBrand"
      @copy="copy"
      @close="showCopy = false"
    />
  </div>
</template>

<script>
import { cloneDeep } from "lodash";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { precisionsFixed } from "@/mixins";
import { vehicleLevelDictionary } from "@/utils/store";
import ServicesSelector from "./servicesSelector/servicesSelector";
import PartSelector from "@/components/repair/partSelector/partSelector";
import Copy from "./copy/copy";
const defaultForm = {
  name: "",
  remark: "",
  allVehicleLevel: false,
  vehicleLevels: []
};
export default {
  props: {
    defaultName: {
      type: String,
      default: ""
    },
    type: {
      type: Number,
      default: 1
    },
    detail: {
      type: Object,
      default: () => {}
    },
    parentNode: {
      type: Object,
      default: () => {}
    },
    grandNode: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const basePriceControlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 30,
      cantExport: true,
      render: (_, row) => {
        return this.isNew || (!this.isNew && this.allowUpdate) ? (
          <div>
            <el-tooltip enterable={false} placement="top" content="删除">
              <span
                on-click={e => this.deleteBasePrice(row, e)}
                class="icon operation-icon icon-delete-info"
              />
            </el-tooltip>
          </div>
        ) : (
          ""
        );
      }
    };
    const partControlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 30,
      cantExport: true,
      render: (_, row) => {
        return this.isNew || (!this.isNew && this.allowUpdate) ? (
          <div>
            <el-tooltip enterable={false} placement="top" content="删除">
              <span
                on-click={e => this.deletePart(row, e)}
                class="icon operation-icon icon-delete-info"
              />
            </el-tooltip>
          </div>
        ) : (
          ""
        );
      }
    };
    return {
      isNew: true,
      autoFocus: true,
      vehicleGroup: "",
      facBrand: "",
      totalPartPrice: 0,
      totalServicePrice: 0,
      showCopy: false,
      showService: false,
      showpart: false,
      basePriceData: [],
      basePriceColumns: [
        basePriceControlsColumn,
        {
          label: "项目编码",
          width: CELL_WIDTH.companySortName,
          formatter: (_, row) => {
            const { item } = row;
            return item ? item.code : "-";
          }
        },
        {
          label: "项目名称",
          width: CELL_WIDTH.companySortName,
          formatter: (_, row) => {
            const { item } = row;
            return item ? item.name : "-";
          }
        },
        {
          label: "项目类型",
          width: CELL_WIDTH.companySortName,
          formatter: (_, row) => {
            const { item } = row;
            return item ? item.categoryName : "-";
          }
        },
        {
          prop: "chargeManHour",
          label: "收费工时",
          width: CELL_WIDTH.companySortName,
          render: (value, row, index) => {
            return this.isNew || (!this.isNew && this.allowUpdate) ? (
              <HtFormatNumber
                place-holder="收费工时"
                v-model={value}
                min={0}
                precision-type="qty"
                on-change={this.serviceQtyChange.bind(
                  this,
                  index,
                  "chargeManHour"
                )}
              />
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "checkManHour",
          label: "考核工时",
          width: CELL_WIDTH.companySortName,
          render: (value, row, index) => {
            return this.isNew || (!this.isNew && this.allowUpdate) ? (
              <HtFormatNumber
                place-holder="考核工时"
                v-model={value}
                min={0}
                precision-type="qty"
                on-change={this.serviceQtyChange.bind(
                  this,
                  index,
                  "checkManHour"
                )}
              />
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "manHourPrice",
          label: "工时单价",
          width: CELL_WIDTH.companySortName,
          render: (value, row, index) => {
            return this.isNew || (!this.isNew && this.allowUpdate) ? (
              <el-input
                value={value}
                type="number"
                place-holder="工时单价"
                onInput={this.serviceQtyChange.bind(
                  this,
                  index,
                  "manHourPrice"
                )}
                size="small"
              />
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "total",
          label: "套餐内工时费用",
          width: CELL_WIDTH.companySortName,
          render: (_, row) => {
            const { chargeManHour, manHourPrice } = row;
            const price = Number(chargeManHour * manHourPrice).toFixed(2);
            return <span>{price}</span>;
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            return this.isNew || (!this.isNew && this.allowUpdate) ? (
              <el-input
                value={value}
                place-holder="备注"
                onInput={this.baseInputValueChange.bind(this, index, "remark")}
                size="small"
              />
            ) : (
              <span>{value}</span>
            );
          }
        }
      ],
      partData: [],
      partColumns: [
        partControlsColumn,
        {
          prop: "code",
          label: "配件编码",
          width: CELL_WIDTH.date
        },
        {
          prop: "name",
          label: "配件名称",
          width: CELL_WIDTH.date
        },
        {
          prop: "priceRmb",
          label: "零售价",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices, part } = row;
            return (
              <span>
                {salePrices ? salePrices.retail : part ? part.salePrice : ""}
              </span>
            );
          }
        },
        {
          prop: "price",
          label: "套餐内单价",
          width: CELL_WIDTH.time,
          render: (value, row, index) => {
            return this.isNew || (!this.isNew && this.allowUpdate) ? (
              <HtFormatNumber
                v-model={value}
                min={0}
                precision-type="price"
                on-change={this.partQtyChange.bind(this, index, "price")}
              />
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "qty",
          label: "数量",
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            return this.isNew || (!this.isNew && this.allowUpdate) ? (
              <HtFormatNumber
                v-model={value}
                min={1}
                precision-type="qty"
                on-change={this.partQtyChange.bind(this, index, "qty")}
              />
            ) : (
              <span>{value}</span>
            );
          }
        },
        {
          prop: "total",
          label: "总价",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { price, qty } = row;
            const total = Number(price * qty).toFixed(2);
            return <span>{total}</span>;
          }
        },
        {
          label: "标签",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { part } = row;
            if (!part) {
              return <span></span>;
            }
            const { isAccessories } = part;
            return isAccessories ? <span class="tag">辅</span> : "";
          }
        },
        {
          prop: "brand",
          label: "品牌",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "unit",
          label: "单位",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "partType",
          label: "零件类别",
          width: CELL_WIDTH.date
        },
        {
          prop: "avaVehModel",
          label: "适用车型",
          width: CELL_WIDTH.date
        },
        {
          prop: "model",
          label: "规格",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            return this.isNew || (!this.isNew && this.allowUpdate) ? (
              <el-input
                value={value}
                place-holder="备注"
                onInput={this.partTextInputValueChange.bind(
                  this,
                  index,
                  "remark"
                )}
                size="small"
              />
            ) : (
              <span>{value}</span>
            );
          }
        }
      ],
      form: {
        ...defaultForm
      },
      rules: {
        name: [
          {
            required: true,
            message: this.type === 1 ? "请输入套餐名称" : "请输入保养里程",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mixins: [precisionsFixed],
  watch: {
    detail: {
      handler(val) {
        this.isNew = false;
        if (!val.id) {
          this.isNew = true;
        }
        const { setItemDetails, setPartDetails } = val;
        if (setItemDetails) {
          const newArr = [];
          setItemDetails.forEach(subItem => {
            const itemInfp = subItem.item;
            const tem = { ...subItem, ...itemInfp };
            newArr.push(tem);
          });
          this.basePriceData = setItemDetails;
        } else {
          this.basePriceData = [];
        }
        if (setPartDetails) {
          const newArr = [];
          setPartDetails.forEach(item => {
            const partInfo = item.part;
            const tem = { ...item, ...partInfo };
            newArr.push(tem);
          });
          this.partData = newArr;
        } else {
          this.partData = [];
        }
        if (this.autoFocus) {
          this.$refs.input.focus();
          this.autoFocus = false;
        }
        this.form = { ...val };
        this.$nextTick(() => {
          this.$refs.form?.clearValidate();
        });
        this.$forceUpdate();
      },
      deep: true
    },
    defaultName: {
      handler(val) {
        console.log(val);
        this.form.name = val;
        this.form = cloneDeep(this.form);
      }
    },
    parentNode: {
      handler(newVal) {
        console.log(newVal);
        if (newVal) {
          this.vehicleGroup = newVal.name;
        }
      },
      deep: true
    },
    grandNode: {
      handler(newVal) {
        if (newVal) {
          this.facBrand = newVal.name;
        }
      },
      deep: true
    }
  },
  computed: {
    levels() {
      const levelList = vehicleLevelDictionary();
      console.log(levelList);
      return levelList;
    },
    totalSetPrice() {
      return Number(this.totalServicePrice + this.totalPartPrice).toFixed(2);
    },
    allowCreate() {
      return this.hasAutoPerm("create");
    },
    allowUpdate() {
      return this.hasAutoPerm("update");
    },
    disabledEdit() {
      return !this.isNew && !this.allowUpdate;
    }
  },
  components: {
    ServicesSelector,
    PartSelector,
    Copy
  },
  methods: {
    deleteBasePrice(row) {
      const newArr = this.basePriceData.filter(item => {
        return item.id !== row.id;
      });
      this.basePriceData = cloneDeep(newArr);
    },
    deletePart(row) {
      const newArr = this.partData.filter(item => {
        return item.id !== row.id;
      });
      this.partData = cloneDeep(newArr);
    },
    resetForm() {
      this.form = {
        ...defaultForm
      };
      this.isNew = true;
      this.partData = [];
      this.basePriceData = [];
      this.$refs.input.focus();
      this.$refs.form.clearValidate();
    },
    addService(service) {
      // 检查是否在当前服务项目列表中
      const isExist = this.basePriceData.find(
        item => item.id === service.id || item.itemId === service.id
      );
      if (isExist) {
        this.$message.warning("该项目已经存在于套装中，请勿重复添加。");
        return;
      }
      this.$message.success("添加项目成功");
      this.basePriceData.push(service);
    },
    addPart(e) {
      const tem = { ...e };
      tem.part = { ...e };
      const isExist = this.partData.find(item => item.partId === tem.partId);
      if (isExist) {
        this.$confirm(`该配件已存在于套餐中，是否继续添加？`, "提示", {
          type: "warning"
        }).then(() => {
          this.partData.map(item => {
            if (item.id === e.id) {
              item.price = e.price;
              item.remark = e.remark;
              item.setId = e.setId;
              item.qty = item.qty + +e.qty;
            }
          });
          this.$message.success("添加配件资料成功");
          this.$forceUpdate();
        });
      } else {
        tem.qty = e.qty;
        this.partData.push(tem);
        this.$message.success("添加配件资料成功");
        this.$forceUpdate();
      }
    },
    serviceQtyChange(index, key, e) {
      const value = this.precisionFormat(e, "money");
      this.basePriceData[index][key] = value;
    },
    baseInputValueChange(index, key, e) {
      this.basePriceData[index][key] = e;
    },
    partQtyChange(index, key, e) {
      const value = this.precisionFormat(e, "money");
      this.partData[index][key] = value;
    },
    partTextInputValueChange(index, key, e) {
      this.partData[index][key] = e;
    },
    nameChange(e) {
      this.$emit("nameChange", e);
    },
    copy(e) {
      this.showCopy = false;
      this.$emit("copy", e);
    },
    getServiceSummaries(param) {
      const { columns, data } = param;
      let totalChargeManHour = 0;
      let totalCheckManHour = 0;
      let totalManHourPrice = 0;
      let total = 0;
      data.forEach(item => {
        totalChargeManHour += +item.chargeManHour;
        totalCheckManHour += +item.checkManHour;
        totalManHourPrice += +item.manHourPrice;
        total += +Number(item.chargeManHour * item.manHourPrice).toFixed(2);
      });
      this.totalServicePrice = total;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "chargeManHour":
            sums[index] = totalChargeManHour;
            break;
          case "checkManHour":
            sums[index] = totalCheckManHour;
            break;
          case "manHourPrice":
            sums[index] = Number(totalManHourPrice).toFixed(2);
            break;
          case "total":
            sums[index] = Number(total).toFixed(2);
            break;
          default:
            break;
        }
      });
      return sums;
    },
    getPartSummaries(param) {
      const { columns, data } = param;
      let total = 0;
      let qty = 0;
      data.forEach(item => {
        qty += +item.qty;
        total += +Number(item.qty * item.price).toFixed(2);
      });
      this.totalPartPrice = total;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "qty":
            sums[index] = qty;
            break;
          case "total":
            sums[index] = Number(total).toFixed(2);
            break;
          default:
            break;
        }
      });
      return sums;
    },
    save() {
      const { partData, basePriceData } = this;
      if (!partData.length && !basePriceData.length) {
        this.$message.warning({ message: "请选择服务项目/配件资料" });
        return;
      }
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          this.$emit("save", {
            ...this.form,
            setItemDetails: basePriceData,
            setPartDetails: partData
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.set-wrap {
  ::v-deep {
    .el-form-item {
      margin-bottom: 8px !important;
    }
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
}
.header-btns {
  display: flex;
  justify-content: flex-start;
  padding: 5px 10px;
  margin-top: 5px;
}
.table-row {
  margin-top: 10px;
  overflow-y: scroll;
  .row-title {
    margin-bottom: 10px;
  }
  ::v-deep {
    .cell {
      text-align: right;
    }
  }
}
.el-icon-delete {
  color: #fff;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
}
.btns {
  ::v-deep {
    .el-checkbox-group {
      display: inline;
    }
  }
}
.tag {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  background: #409eff;
  border-radius: 10px;
}
.total {
  font-size: 14px;
  span {
    color: rgb(6, 168, 244);
    margin-left: 20px;
  }
}
</style>
