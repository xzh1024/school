<script>
import { SUBSTITUTE_PARTS_BOX_TABLE } from "./constants";
import { getPartSubstituteParts } from "@/api/parts";
import StockDetails from "@/components/stock-details";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import hotkeys from "hotkeys-js";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
export default {
  name: "SubstitutePartsBox",
  props: {
    visible: Boolean,
    code: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableName: SUBSTITUTE_PARTS_BOX_TABLE.name,
      selectedRows: [],
      showRow: {}
    };
  },
  watch: {
    visible(val, oldVal) {
      if (val) {
        oldKeyScope = hotkeys.getScope();
        topHotkeys.bindHotkeys(this.$el);
        this.loadData();
      } else if (oldVal) {
        topHotkeys.unbindHotkeys(this.$el);
        hotkeys.setScope(oldKeyScope);
      }
    }
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
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function showStockDetails(row) {
        self.showRow = row;
      }
      function hideStockDetails() {
        self.showRow = {};
      }
      return SUBSTITUTE_PARTS_BOX_TABLE.columns.map(item => {
        if (item.prop === "controls") {
          return {
            ...item,
            render: (val, row) =>
              Number(row.stocksCount || 0) ? (
                <el-popover
                  placement="bottom-start"
                  width="1000"
                  trigger="click"
                  title="库存信息"
                  on-show={() => showStockDetails(row)}
                  on-hide={hideStockDetails}
                >
                  <StockDetails
                    searchStockParams={self.showRow}
                    curData={row}
                  />
                  <el-link
                    underline={false}
                    type="primary"
                    style="vertical-align: middle;"
                    slot="reference"
                    on-click={e => e.stopPropagation()}
                  >
                    <span style="font-size: 12px;">
                      {row === self.showRow ? "收起库存明细" : "查看库存明细"}
                    </span>
                  </el-link>
                </el-popover>
              ) : null
          };
        }
        return { ...item };
      });
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      getPartSubstituteParts({
        code: this.code,
        brand: this.brand
      })
        .then(res => {
          this.tableData = res || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    }
  },

  render() {
    return (
      <ht-dialog
        title={`「${this.code}」替换件`}
        visible={this.relVisible}
        on={{
          "update:visible": val => (this.relVisible = val)
        }}
        append-to-body
        width="1200px"
        class="ignore-top-hotkeys"
      >
        <ht-setting-table
          v-loading={this.loading}
          data={this.tableData}
          columns={this.tableColumns}
          tableName={this.tableName}
          selectedRows={this.selectedRows}
          on={{
            "update:visible": val => (this.selectedRows = val)
          }}
          style="height: 500px;"
        />
      </ht-dialog>
    );
  }
};
</script>
