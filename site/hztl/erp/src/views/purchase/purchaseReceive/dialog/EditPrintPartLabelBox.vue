<script>
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import {
  CELL_WIDTH,
  PRINT_LABEL_COMPLETED,
  PRINT_LABEL_MAX,
  PRINT_LABEL_TIPS
} from "@/constants";
import { openNewWindow } from "@/utils/tool";
import {
  reqReceiveDetailsGetPrintCount,
  reqReceiveDetailsUpdatePrintCount
} from "@/api/purchase/purchaseReceive";
import { add, subtract } from "@/utils/numberAPI";

let oldKeyScope;
const topHotkeys = new TopHotkeys();

export default {
  name: "EditPrintPartLabelBox",
  props: {
    visible: Boolean,
    billId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      tableName: "purchaseReceiveEditPrintPartLabelBoxList",
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
        { prop: "model", label: "规格", width: CELL_WIDTH.model },
        {
          prop: "qty",
          label: "采购数",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "labelPrintCount",
          label: "已打印数",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "printCount",
          label: "打印数",
          width: CELL_WIDTH.qty
        }
      ]
    };
  },
  computed: {
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
        if (item.prop === "printCount") {
          return {
            ...item,
            render: (value, row) => (
              <div on-click={e => e.stopPropagation()}>
                <ht-format-number
                  v-model={row.printCount}
                  min={0}
                  max={Number(row.qty || 0)}
                  size="mini"
                />
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
  mounted() {
    window.addEventListener("message", this.getPrintLabelCompleted);
    if (localStorage.printLabelCountMap) {
      localStorage.removeItem("printLabelCountMap");
    }
  },
  destroyed() {
    window.removeEventListener("message", this.getPrintLabelCompleted);
  },
  methods: {
    initTableData() {
      if (!this.billId) {
        this.tableData = [];
        return;
      }
      this.loading = true;
      return reqReceiveDetailsGetPrintCount(this.billId)
        .then(res => {
          if (res.length) {
            let toatalPrintQty = 0;
            let printCount = 0;
            this.tableData = res.map(item => {
              let leftPrintCouunt = subtract(item.qty, item.labelPrintCount);
              if (leftPrintCouunt > PRINT_LABEL_MAX) {
                leftPrintCouunt = PRINT_LABEL_MAX;
              }
              printCount = leftPrintCouunt;
              toatalPrintQty = add(toatalPrintQty, printCount);
              if (toatalPrintQty > PRINT_LABEL_MAX) {
                printCount = subtract(
                  leftPrintCouunt,
                  subtract(toatalPrintQty, PRINT_LABEL_MAX)
                );
              }
              return {
                id: item.id,
                code: item.code,
                name: item.name,
                brand: item.brand,
                productionPlace: item.productionPlace,
                model: item.model,
                qty: item.qty,
                labelPrintCount: item.labelPrintCount,
                printCount
              };
            });

            this.selectedRows = this.tableData.filter(item =>
              this.selectable(item)
            );
          } else {
            this.tableData = [];
            this.selectedRows = [];
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    selectable(row) {
      return Number(row.printCount || 0) > 0;
    },

    printHandle(e) {
      e?.stopPropagation();
      if (!this.validPrintData(this.selectedRows)) {
        this.$message({
          type: "warning",
          message: PRINT_LABEL_TIPS,
          showClose: true
        });
        return;
      }

      this.setPrintLabelCountList(this.selectedRows);
      openNewWindow(
        this.$router.resolve({
          path: "/Print/Label/Part/" + this.billId
        }).href,
        "print",
        process.env.NODE_ENV === "development" ? "http" : "https"
      );
    },
    validPrintData(rows) {
      let count = PRINT_LABEL_MAX;
      rows.forEach(item => {
        if (count >= 0) {
          count = subtract(count, item.printCount || 0);
        }
      });
      return count >= 0;
    },
    setPrintLabelCountList(rows) {
      const printLabelCountMap = {};
      rows.forEach(item => {
        printLabelCountMap[item.id] = Number(item.printCount || 0);
      });
      localStorage.setItem(
        "printLabelCountMap",
        JSON.stringify(printLabelCountMap)
      );
    },
    getPrintLabelCompleted(e) {
      const isPrintLabelCompleted = e.data == PRINT_LABEL_COMPLETED;
      if (isPrintLabelCompleted) {
        this.loading = true;
        const printCountList = this.selectedRows.map(item => ({
          id: item.id,
          count: Number(item.printCount || 0)
        }));
        reqReceiveDetailsUpdatePrintCount(printCountList)
          .then(() => {
            this.loading = false;
            this.initTableData();
          })
          .catch(() => {
            this.loading = false;
          });
      }
    },
    cancelHandle(e) {
      e?.stopPropagation();
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
        title="选择打印配件"
        width="1100px"
        top="50px"
        class="dialog-body ignore-top-hotkeys"
      >
        <ht-card noPadding title={PRINT_LABEL_TIPS}>
          <ht-setting-table
            loading={this.loading}
            tableName={this.tableName}
            columns={this.tableColumns}
            data={this.tableData}
            selectedRows={this.selectedRows}
            on={{
              "update:selectedRows": val => (this.selectedRows = val)
            }}
            selectable={this.selectable}
            selection-type="multiple"
            style="height: 555px;"
          />
        </ht-card>
        <div style="margin: 10px 0 5px 0; text-align: center;">
          <el-button
            loading={this.loading}
            type="primary"
            size="mini"
            onClick={e => this.printHandle(e)}
          >
            打印（F11）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            onClick={e => this.cancelHandle(e)}
          >
            取消（Esc）
          </el-button>
        </div>
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
