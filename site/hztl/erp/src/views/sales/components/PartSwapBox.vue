<script>
import { TABLE_SALES_PART_LIST } from "../constants";
import { mapState } from "vuex";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import hotkeys from "hotkeys-js";
import eventBus from "@/event";
import { TAG_TOOLTIP } from "@/constants";
import { getPartDetailsAndStocks } from "@/api/base/search";

let oldKeyScope;
const topHotkeys = new TopHotkeys();

export default {
  name: "PartSwapBox",
  props: {
    partData: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    canAdd: {
      type: Boolean,
      default: true
    },
    searchInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    type: {
      type: String,
      required: true
    },
    mode: {
      type: [String, Number],
      default: 0
    },
    isObtainPrice: Boolean
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableName: `partSwapBox_${TABLE_SALES_PART_LIST.name}`,
      selectedRows: [],
      totalSize: 0,
      page: 1
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    relVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    },
    tableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function addHandle(row, e) {
        e.stopPropagation();
        self.addHandle(row);
      }
      return TABLE_SALES_PART_LIST.columns
        .filter(
          item =>
            !["dwg", "epcRemark"].includes(item.prop) &&
            (this.canAdd || item.prop !== "controls")
        )
        .map(item => {
          if (item.prop === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <el-tooltip placement="top" content="添加" enterable={false}>
                  <i
                    class="icon operation-icon icon-add-info"
                    on-click={e => addHandle(row, e)}
                  ></i>
                </el-tooltip>
              )
            };
          }
          if (item.prop === "labels") {
            return {
              ...item,
              render: value => (
                <div>
                  {value && value.length
                    ? value
                        .filter(label1 => label1 !== "互")
                        .map(label => (
                          <span style="margin-right: 10px">
                            <el-tooltip placement="top" enterable={false}>
                              <span slot="content">{TAG_TOOLTIP[label]}</span>
                              <span class="label-style">{label}</span>
                            </el-tooltip>
                          </span>
                        ))
                    : null}
                </div>
              )
            };
          }
          return item;
        });
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.page = 1;
        this.loadData();
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  mounted() {
    eventBus.$on("quickAddPartRes", this.handleQuickAddPartRes);
  },
  beforeDestroy() {
    eventBus.$off("quickAddPartRes", this.handleQuickAddPartRes);
  },
  methods: {
    handleQuickAddPartRes() {
      if (!this.visible) {
        return;
      }
      this.loadData();
    },
    loadData() {
      this.loading = true;
      getPartDetailsAndStocks({
        type: this.type,
        mode: this.type === "XS" ? this.mode : 3,
        fields: {
          replacementCodes: false
        },
        condsBeforeAgg: {
          parts: {
            codes: this.partData.replacementCodes || []
          }
        },
        page: this.page,
        pageSize: this.pageSize
      })
        .then(res => {
          this.totalSize = res.totalSize;
          this.tableData =
            res.rows && res.rows.length
              ? res.rows.map(item => ({
                  ...item.part,
                  ...item.stock,
                  ...item.bill
                }))
              : [];
          if (this.tableData.length) {
            this.selectedRows = [this.tableData[0]];
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    pageChange(page) {
      this.page = page;
      return this.loadData();
    },
    addHandle(row) {
      if (!this.canAdd) {
        this.$message.warning({
          message: "当前状态不能新增配件",
          showClose: true
        });
        return;
      }
      if (row.labels && row.labels.includes("无此商品")) {
        this.$confirm("配件不存在，是否新增？", "无查询结果提示")
          .then(() => {
            eventBus.$emit("direct-add-part", row);
          })
          .catch(() => {});
      } else {
        if (this.searchInfo.cooperatorId) {
          this.$emit("add-part", row, "add");
        } else {
          if (!this.isObtainPrice) {
            this.$message.warning({
              message: "请选择客户名称",
              showClose: true
            });
          }
          eventBus.$emit("showCreateBill", row, true);
          this.$emit("on-add-data", row);
          this.$emit("updateFocusIndex");
        }
        this.relVisible = false;
      }
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
        title={`「${this.partData.code}」互换件`}
        width="1200px"
        top="7vh"
        class="ignore-top-hotkeys"
      >
        <ht-setting-table
          v-loading={this.loading}
          data={this.tableData}
          columns={this.tableColumns}
          tableName={this.tableName}
          selectedRows={this.selectedRows}
          total={this.totalSize}
          currentPage={this.page}
          pagination
          on={{
            "update:selectedRows": val => (this.selectedRows = val)
          }}
          on-pageChange={this.pageChange}
          on-rowOperation={this.addHandle}
          style="height: 600px;"
        />
      </ht-dialog>
    );
  }
};
</script>
