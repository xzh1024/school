<script>
import { BRAND_PARTS_BOX_TABLE } from "./constants";
import { getPartBrandParts } from "@/api/parts";
import StockDetails from "@/components/stock-details";
import EpcVehModelsBox from "@/components/epc-veh-models-box";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import hotkeys from "hotkeys-js";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
export default {
  name: "BrandPartsBox",
  comments: { EpcVehModelsBox },
  props: {
    visible: Boolean,
    code: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      tableName: BRAND_PARTS_BOX_TABLE.name,
      selectedRows: [],
      showRow: {},
      epcVehModelsBoxVisible: false,
      brandCode: ""
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
        self.selectedRows = [row];
        self.showRow = row;
      }
      function hideStockDetails(row) {
        self.selectedRows = [row];
        self.showRow = {};
      }
      const showEpcVehModelsBox = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.brandCode = row.code;
        this.epcVehModelsBoxVisible = true;
      };
      return BRAND_PARTS_BOX_TABLE.columns.map(item => {
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
                  on-hide={() => hideStockDetails(row)}
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
        if (item.prop === "vehModel") {
          return {
            ...item,
            render: (val, row) => (
              <a
                onClick={e => showEpcVehModelsBox(row, e)}
                class="ht-link text-font-primary"
              >
                详情
              </a>
            )
          };
        }
        return { ...item };
      });
    }
  },
  methods: {
    loadData() {
      this.loading = true;
      getPartBrandParts({
        code: this.code
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
        title={`「${this.code}」品牌件`}
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

        <EpcVehModelsBox
          visible={this.epcVehModelsBoxVisible}
          on={{
            "update:visible": val => (this.epcVehModelsBoxVisible = val)
          }}
          code={this.brandCode}
          type={1}
        />
      </ht-dialog>
    );
  }
};
</script>
