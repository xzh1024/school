<script>
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { searchMixin } from "@/mixins";
import { CELL_WIDTH } from "@/constants";
import { loadSearchPosition } from "@/api/store/stocks";
import {
  reqReceiveSubmit,
  reqReceiveDetailsBatchUpdateWare
} from "@/api/purchase/purchaseReceive";
import BatchSetWarehouseBox from "../../components/BatchSetWarehouseBox";
import { ALL_SPACE_REG_EXP, QUICK_ADD_POSITION_LEN } from "@/constants";
import quickGetPositions from "@/utils/quickGetPositions";

let oldKeyScope;
const topHotkeys = new TopHotkeys();

export default {
  name: "EditWarehouseBox",
  components: { BatchSetWarehouseBox },
  mixins: [searchMixin],
  props: {
    visible: Boolean,
    details: {
      type: Array,
      required: true
    },
    header: {
      type: Object,
      required: true
    },
    hasSubmit: Boolean,
    companyId: [String, Number]
  },
  data() {
    return {
      loading: false,
      tableName: "purchaseReceiveEditWarehouseBoxList",
      tableData: [],
      selectedRows: [],
      columns: [
        {
          label: "序号",
          prop: "index",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "multiple",
          label: "选择",
          type: "multiple",
          width: CELL_WIDTH.multiple,
          cantExport: true
        },
        { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
        { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
        { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.productionPlace
        },
        { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
        { prop: "qty", label: "数量", width: CELL_WIDTH.qty },
        {
          prop: "warehouseName",
          label: "到货仓库",
          width: CELL_WIDTH.warehouseName
        },
        { prop: "positionName", label: "货位", width: CELL_WIDTH.positionName }
      ],
      warehouseRules: {
        warehouseId: {
          required: true,
          message: "请选择到货仓库",
          trigger: "change"
        }
      },
      batchSetWarehouseVisible: false
    };
  },
  computed: {
    ...mapState("admin/systemParams", {
      isEasyMode: state => !!state.params.manageMode
    }),
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    tableColumns() {
      return this.columns.map(item => {
        if (item.prop === "warehouseName") {
          return {
            ...item,
            render: (value, row) => (
              <div on-click={e => e.stopPropagation()}>
                <el-form
                  attrs={{
                    model: row,
                    rules: this.warehouseRules,
                    "show-message": false
                  }}
                  size="mini"
                  label-width="0"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item prop="warehouseId">
                    <ht-autoselect
                      v-model={row.warehouseId}
                      fetch-suggestions={query =>
                        this.searchLoadAllWarehouses(
                          query,
                          Number(this.companyId || 0)
                        )
                      }
                      defaultValue={row.warehouseName}
                      remote
                      filter-zero
                      trigger-on-focus={false}
                      highlight-first-item
                      placeholder="请选择"
                      on-change={warehouseId =>
                        this.handleWarehouseChange(warehouseId, row)
                      }
                    />
                  </el-form-item>
                </el-form>
              </div>
            )
          };
        }
        if (item.prop === "positionName") {
          return {
            ...item,
            render: (value, row) => (
              <div on-click={e => e.stopPropagation()}>
                <el-form
                  size="mini"
                  label-width="0"
                  class="form-item-small-margin-bottom"
                >
                  <el-form-item>
                    {this.isEasyMode ? (
                      <ht-autoselect
                        v-model={row.positionId}
                        keepInputValue={row.positionName}
                        fetch-suggestions={query =>
                          this.getPositions(row.warehouseId, query)
                        }
                        defaultValue={row.positionName}
                        remote
                        keep-input
                        filter-zero
                        clearable
                        no-match-text=""
                        trigger-on-focus={false}
                        placeholder="请选择"
                        on-input-change={positionName =>
                          this.handlePositionNameChange(positionName, row)
                        }
                        on-change={positionId =>
                          this.handlePositionIdChange(positionId, row)
                        }
                      />
                    ) : (
                      <ht-autoselect
                        v-model={row.positionId}
                        fetch-suggestions={query =>
                          this.getPositions(row.warehouseId, query)
                        }
                        defaultValue={row.positionName}
                        remote
                        filter-zero
                        clearable
                        trigger-on-focus={false}
                        highlight-first-item
                        placeholder="请选择"
                        on-change={positionId =>
                          this.handlePositionIdChange(positionId, row)
                        }
                      />
                    )}
                  </el-form-item>
                </el-form>
              </div>
            )
          };
        }

        return item;
      });
    }
  },
  watch: {
    visible(value, oldValue) {
      if (value) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.initTableData();
      } else if (oldValue) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  methods: {
    initTableData() {
      if (this.details.length) {
        this.tableData = this.details.map(item => {
          return {
            id: item.id,
            code: item.code,
            name: item.name,
            brand: item.brand,
            productionPlace: item.productionPlace,
            property: item.property,
            qty: item.qty,
            warehouseId: item.warehouseId ? item.warehouseId : null,
            warehouseName: item.warehouseName ? item.warehouseName : "",
            positionName: item.positionName ? item.positionName : "",
            positionId: item.positionId ? item.positionId : null,
            cachePositionId: item.positionId ? item.positionId : null
          };
        });
      } else {
        this.tableData = [];
      }
    },

    async handleWarehouseChange(warehouseId, row) {
      const positions = await this.getPositions(warehouseId);
      if (positions.length) {
        const position = positions.find(
          item => item.id === row.cachePositionId
        );
        if (position) {
          row.positionId = row.cachePositionId;
        } else {
          row.positionId = null;
        }
      } else {
        row.positionId = null;
      }
    },
    async getPositions(warehouseId, query) {
      const positions = await loadSearchPosition({
        name: query,
        warehouseId
      });
      return positions || [];
    },
    handlePositionIdChange(positionId, row) {
      if (!positionId) return;
      row.cachePositionId = positionId;
    },
    handlePositionNameChange(positionName, row) {
      if (positionName) {
        row.positionName = positionName.replace(ALL_SPACE_REG_EXP, "");
      } else {
        row.positionName = "";
      }
    },

    inverseHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      const ids = this.selectedRows.map(item => item.id);
      this.selectedRows = this.tableData.filter(item => !ids.includes(item.id));
    },
    batchSetWarehouseHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.selectedRows.length) {
        return;
      }
      this.batchSetWarehouseVisible = true;
    },
    handleBatchSetWarehouseSure(data) {
      const ids = this.selectedRows.map(item => item.id);
      this.tableData = this.tableData.map(item => {
        if (ids.includes(item.id)) {
          return {
            ...item,
            warehouseId: data.warehouseId,
            warehouseName: data.warehouseName,
            positionId: data.positionId,
            positionName: data.positionName
          };
        } else {
          return { ...item };
        }
      });
      this.selectedRows = this.tableData.filter(item => ids.includes(item.id));
    },

    async sureHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (this.loading || !this.validateTableData()) {
        return;
      }

      this.loading = true;
      let warehouseInfos = this.tableData.map(item => {
        if (this.hasSubmit) {
          return {
            detailId: item.id,
            warehouseId: item.warehouseId,
            positionId: item.positionId
          };
        } else {
          return {
            id: item.id,
            warehouseId: item.warehouseId,
            positionId: item.positionId
          };
        }
      });

      if (
        this.isEasyMode &&
        this.tableData.some(item => !item.positionId && item.positionName)
      ) {
        if (
          this.tableData.some(
            item =>
              !item.positionId &&
              item.positionName &&
              item.positionName.length > QUICK_ADD_POSITION_LEN
          )
        ) {
          this.$message.warning({
            message: `货位名称字数需小于等于${QUICK_ADD_POSITION_LEN}`,
            showClose: true
          });
          this.loading = false;
          return;
        }

        const positionIds = await quickGetPositions(
          this.tableData.map(item => ({
            warehouseId: item.warehouseId,
            name: item.positionName
          }))
        );
        if (!positionIds) {
          this.loading = false;
          return;
        }

        warehouseInfos = warehouseInfos.map((item, index) => ({
          ...item,
          positionId: positionIds[index]
        }));
      }

      if (this.hasSubmit) {
        reqReceiveSubmit({ id: Number(this.header.billId), warehouseInfos })
          .then(() => {
            this.$message.success({
              message: "单据 " + this.header.billNo + " 提交成功！",
              showClose: true
            });
            this.$emit("on-eidt");
            this.cancelHandle();
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        reqReceiveDetailsBatchUpdateWare(warehouseInfos)
          .then(() => {
            this.$message.success({
              message: "单据 " + this.header.billNo + " 设置到货仓库成功！",
              showClose: true
            });
            this.$emit("on-eidt");
            this.cancelHandle();
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    validateTableData() {
      let flag = true;
      if (this.tableData.some(item => !item.warehouseId)) {
        this.$message.warning({
          message: this.warehouseRules.warehouseId.message,
          showClose: true
        });
        flag = false;
      }
      return flag;
    },
    cancelHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      this.$emit("update:visible", false);
    }
  },

  render() {
    return (
      <ht-dialog
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        title="到货仓库设置"
        width="1200px"
        top="50px"
        class="dialog-body ignore-top-hotkeys"
      >
        <ht-setting-table
          tableName={this.tableName}
          columns={this.tableColumns}
          data={this.tableData}
          selectedRows={this.selectedRows}
          on={{
            "update:selectedRows": val => (this.selectedRows = val)
          }}
          selection-type="multiple"
          style="height: 565px;"
        />
        <div style="padding: 5px; background-color: #fbfbfb;">
          <el-button
            type="primary"
            size="mini"
            onClick={e => this.inverseHandle(e)}
          >
            反选
          </el-button>
          <el-button
            disabled={!this.selectedRows.length}
            type="primary"
            size="mini"
            onClick={e => this.batchSetWarehouseHandle(e)}
          >
            批量设置到货仓库
          </el-button>
        </div>
        <div style="margin: 10px 0 5px 0; text-align: center;">
          <el-button
            v-loading={this.loading}
            type="primary"
            size="mini"
            onClick={e => this.sureHandle(e)}
          >
            确定（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={e => this.cancelHandle(e)}
          >
            取消（Esc）
          </el-button>
        </div>

        <BatchSetWarehouseBox
          visible={this.batchSetWarehouseVisible}
          on={{
            "update:visible": val => (this.batchSetWarehouseVisible = val)
          }}
          companyId={this.companyId}
          onSure={this.handleBatchSetWarehouseSure}
        />
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
.dialog-body {
  &::v-deep .el-dialog__body {
    padding: 5px;
    background-color: #e7ebed;
  }
}
</style>
