<template>
  <div class="dialog-wrap">
    <ht-dialog
      v-bind="$attrs"
      title="退料入库"
      width="1000px"
      v-on="$listeners"
    >
      <ht-card class="auto-card" title="退料配件" padding style="height:350px;">
        <ht-setting-table
          :data="rows"
          :columns="partInfoColumns"
          style="height:300px;"
          table-name="part-info"
        />
      </ht-card>
      <ht-card class="auto-card" title="退料信息" padding style="height:100px;">
        <el-form
          ref="form"
          :model="confirmForm"
          inline
          :rules="rules"
          :show-message="false"
          size="mini"
          label-position="left"
          label-width="80px"
        >
          <el-form-item label="退料人" prop="businessManId">
            <ht-autocomplete
              v-model="technician"
              :fetch-suggestions="listAllReceptionMan()"
              placeholder="退料人"
              :trigger-on-focus="false"
              :maxlength="50"
              @select="technicianChange"
              highlight-first-item
            />
          </el-form-item>
          <el-form-item label="退料日期" prop="businessTime">
            <el-date-picker
              v-model="confirmForm.businessTime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="confirmForm.remark" size="small" />
          </el-form-item>
        </el-form>
      </ht-card>
      <div style="margin: 10px 0 5px 0; text-align: center;">
        <el-button type="primary" size="mini" plain @click="confirm">
          确 定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="$emit('close')">
          取 消（Esc）
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { searchMixin } from "@/mixins";
import { loadSearchPosition } from "@/api/store/stocks";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
const defaultForm = {
  businessManId: "",
  businessTime: new Date()
};
export default {
  name: "PartReturn",
  mixins: [searchMixin],
  props: {
    currentRow: {
      type: Object,
      default: () => {}
    },
    dataRows: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    // "$attrs.visible": {
    //   handler(value) {
    //     if (value) {
    //       this.confirmForm = { ...defaultForm };
    //       this.technician = "";
    //     }
    //   },
    //   immediate: true
    // },
    currentRow: {
      handler(value) {
        if (value) {
          const { businessManId, businessManName } = value;
          this.confirmForm = { ...defaultForm, businessManId, businessManName };
          this.technician = businessManName;
        }
      },
      immediate: true
    },
    dataRows: {
      handler(val) {
        if (val && val.length) {
          this.rows = val.map(item => {
            return {
              ...item,
              backQty: Number(item.qty),
              warehouseId: item.stock.warehouseId,
              warehouseName: item.stock.warehouseName,
              positionId: item.stock.positionId,
              positionName: item.stock.positionName
            };
          });
        }
      }
    }
  },
  data() {
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 30,
      cantExport: true,
      render: (_, row) => (
        <div>
          <el-tooltip enterable={false} placement="top" content="删除">
            <span
              on-click={e => this.deleteParts(row, e)}
              class="icon operation-icon el-icon-delete"
            />
          </el-tooltip>
        </div>
      )
    };
    return {
      rules: {
        businessManId: [
          { required: true, message: "请选择业务员", trigger: "change" }
        ],
        businessTime: [
          { required: true, message: "请输入业务时间", trigger: "change" }
        ]
      },
      confirmForm: { ...defaultForm },
      technician: "",
      rows: [],
      partInfoColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        controlsColumn,
        {
          label: "配件编码",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part.code;
          }
        },
        {
          label: "配件名称",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part.name;
          }
        },
        {
          prop: "warehouseId",
          label: "仓库",
          width: CELL_WIDTH.no,
          render: (value, row, index) => {
            const { warehouseName } = row;
            return (
              <ht-autoselect
                size="mini"
                v-model={value}
                default-value={warehouseName}
                fetch-suggestions={query =>
                  this.searchLoadAllWarehouses(query, index)
                }
                on-select={e => this.warehouseChange(e, index)}
                trigger-on-focus={false}
                clearable={false}
                class="switch-focus focus-urgent-warehouseId"
                filter-zero
                remote
                highlight-first-item
              />
            );
          }
        },
        {
          prop: "positionId",
          label: "货位",
          width: CELL_WIDTH.no,
          render: (value, row, index) => {
            const { warehouseId, positionName } = row;
            return (
              <ht-autoselect
                size="mini"
                v-model={value}
                default-value={positionName}
                fetch-suggestions={query =>
                  this.getPositions(warehouseId, query)
                }
                on-select={e => this.positionChange(e, index)}
                trigger-on-focus={false}
                clearable={false}
                class="switch-focus focus-urgent-warehouseId"
                filter-zero
                remote
                highlight-first-item
              />
            );
          }
        },
        {
          prop: "backQty",
          label: "退料数量",
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            const { qty } = row;
            return (
              <ht-format-number
                v-model={value}
                max={Number(qty)}
                precision-type="money"
                onInput={this.inputValueChange.bind(
                  this,
                  index,
                  "backQty",
                  qty
                )}
              />
            );
          }
        },
        {
          prop: "1",
          label: "品牌",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part.brand;
          }
        },
        {
          prop: "2",
          label: "产地",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part.productionPlace;
          }
        },
        {
          prop: "3",
          label: "供应商",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { stock } = row;
            return stock.supplierName;
          }
        },
        {
          prop: "4",
          label: "批次号",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { stock } = row;
            return stock.batchNo;
          }
        },
        {
          prop: "5",
          label: "单位",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part.unit;
          }
        },
        {
          prop: "6",
          label: "零件类别",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part.partType;
          }
        },
        {
          prop: "7",
          label: "规格",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { part } = row;
            return part.model;
          }
        }
      ]
    };
  },
  methods: {
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    deleteParts(e) {
      const newArr = this.rows.filter(item => item.id !== e.id);
      console.log(newArr);
      if (newArr.length === 0) {
        this.$emit("close");
        return;
      }
      this.rows = [...newArr];
    },
    technicianChange(e) {
      this.confirmForm.businessManId = e.id;
      this.$forceUpdate();
    },
    warehouseChange(e, index) {
      if (!e || !e.id) return;
      this.rows[index].warehouseId = e.id;
      this.rows[index].positionId = null;
      this.rows[index].positionName = "";
    },
    positionChange(e, index) {
      if (!e || !e.id) return;
      this.rows[index].positionId = e.id;
    },
    listAllReceptionMan() {
      const { receptionMan } = this;
      const params = {
        company: "self",
        name: receptionMan,
        roles: ["technicianLeader", "technician"]
      };
      return (query, callback) => {
        searchTypeStaffs(params).then(res => {
          const data = res || [];
          callback(data.map(item => ({ id: item.id, value: item.name })));
        });
      };
    },
    inputValueChange(index, key, max, e) {
      if (e > max) return;
      this.rows[index][key] = e;
    },
    confirm() {
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          const arr = this.rows.map(item => {
            return {
              ...item,
              qty: item.backQty
            };
          });
          this.$emit("confirm", {
            ...this.confirmForm,
            details: [...arr]
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.operation-icon {
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
}
.el-icon-delete {
  background: #f56c6c;
}
</style>
