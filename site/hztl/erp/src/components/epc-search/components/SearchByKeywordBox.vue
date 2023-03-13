<script>
import EpcPartsList from "./EpcPartsList";
import StockDetails from "@/components/stock-details";
import EpcVehModelsBox from "@/components/epc-veh-models-box";
import SubstitutePartsBox from "@/components/substitute-parts-box";
import BrandPartsBox from "@/components/brand-parts-box";
import { EPC_SEARCH_LOCAL_PARTS_TABLE } from "../constants";
import { getVinPartsList } from "@/api/epc";
import { TAG_TOOLTIP } from "@/constants";

export default {
  name: "SearchByKeywordBox",
  components: {
    EpcPartsList,
    EpcVehModelsBox,
    SubstitutePartsBox,
    BrandPartsBox
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    upSearchData: {
      type: String,
      default: ""
    },
    brandData: {
      type: Object,
      required: true
    },
    vehModelData: {
      type: Object,
      required: true
    },
    saleVehModelData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showFlag: "vinPartsList",
      searchData: "",
      loading: false,
      tableData: [],
      selectedRows: [],
      tableName: EPC_SEARCH_LOCAL_PARTS_TABLE.name,
      showRow: {},
      epcPartsQurey: {},
      epcLoading: false,
      code: "",
      epcType: 0,
      epcVehModelsBoxVisible: false,
      substitutePartsBoxVisible: false,
      brandPartsBoxVisible: false
    };
  },
  computed: {
    relVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
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
      function showEpcPartsList(e, row) {
        e.stopPropagation();
        self.selectedRows = [row];
        self.showEpcPartsList(row);
      }
      const showEpcVehModelsBox = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.epcType = Number(row.epcFlag.type);
        this.code = row.partNumber;
        this.epcVehModelsBoxVisible = true;
      };
      const showSubstitutePartsBox = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.code = row.partNumber;
        this.substitutePartsBoxVisible = true;
      };
      const showBrandPartsBox = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.code = row.partNumber;
        this.brandPartsBoxVisible = true;
      };
      return EPC_SEARCH_LOCAL_PARTS_TABLE.columns.map(item => {
        if (item.prop === "stockDetails") {
          return {
            ...item,
            render: (val, row) => (
              <div>
                {row && row.labels && row.labels.includes("无此商品") ? null : (
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
                )}
              </div>
            )
          };
        }
        if (item.prop === "dwg") {
          return {
            ...item,
            render: (val, row) => (
              <el-link
                underline={false}
                type="primary"
                style="vertical-align: middle;"
                slot="reference"
                on-click={e => showEpcPartsList(e, row)}
              >
                <span style="font-size: 12px;">查看装配图</span>
              </el-link>
            )
          };
        }
        if (item.prop === "epcRemark") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {row.epcFlag && row.epcFlag.brandParts === "1" ? (
                  <span style="margin-right: 10px">
                    <el-tooltip placement="top" enterable={false}>
                      <span slot="content">{TAG_TOOLTIP["品"]}</span>
                      <el-button
                        type="primary"
                        circle
                        size="mini"
                        onClick={e => showBrandPartsBox(row, e)}
                      >
                        {"品"}
                      </el-button>
                    </el-tooltip>
                  </span>
                ) : null}
                {row.epcFlag && row.epcFlag.substituteParts === "1" ? (
                  <span style="margin-right: 10px">
                    <el-tooltip placement="top" enterable={false}>
                      <span slot="content">{TAG_TOOLTIP["替"]}</span>
                      <el-button
                        type="primary"
                        circle
                        size="mini"
                        onClick={e => showSubstitutePartsBox(row, e)}
                      >
                        {"替"}
                      </el-button>
                    </el-tooltip>
                  </span>
                ) : null}
                {row.epcFlag && row.epcFlag.vehModels === "1" ? (
                  <span style="margin-right: 10px">
                    <el-tooltip placement="top" enterable={false}>
                      <span slot="content">{TAG_TOOLTIP["适"]}</span>
                      <el-button
                        type="primary"
                        circle
                        size="mini"
                        onClick={e => showEpcVehModelsBox(row, e)}
                      >
                        {"适"}
                      </el-button>
                    </el-tooltip>
                  </span>
                ) : null}
              </div>
            )
          };
        }
        return { ...item };
      });
    }
  },
  watch: {
    visible(val) {
      this.gotoVinPartsList();
      if (val) {
        this.searchData = this.upSearchData;
        this.searchHandle();
      }
    }
  },
  methods: {
    gotoVinPartsList(e) {
      if (e) {
        e.stopPropagation();
      }
      this.showFlag = "vinPartsList";
    },
    searchHandle(e) {
      if (e) {
        e.stopPropagation();
      }
      if (!this.searchData) {
        this.$message.warning({
          message: "请输入配件编码或名称！",
          showClose: true
        });
        return;
      }
      if (this.loading) {
        return;
      }
      this.loading = true;
      getVinPartsList({
        key: this.searchData,
        vin: this.vehModelData.vinCode,
        mjsid: this.saleVehModelData.mjsid,
        brand: this.brandData.name
      })
        .then(res => {
          this.tableData = res.parts || [];
          if (!this.tableData.length) {
            this.$message({
              message: "查询结果为空！",
              type: "warning",
              showClose: true
            });
          } else if (this.tableData.length === 1) {
            this.showEpcPartsList(this.tableData[0]);
          } else {
            this.gotoVinPartsList();
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    showEpcPartsList(row) {
      this.showFlag = "epcPartsList";
      this.epcPartsQurey = {
        vinCode: this.vehModelData.vinCode,
        mjsid: this.saleVehModelData.mjsid,
        image: row.image,
        imgUrl: row.thumbnailImage
      };
    },
    closeHandle() {
      this.relVisible = false;
    }
  },

  render() {
    return (
      <ht-dialog
        title="配件关键字查询"
        visible={this.relVisible}
        on-close={this.closeHandle}
        append-to-body
        width="calc(100% - 100px)"
        top="7vh"
      >
        <div class="list-height">
          <div class="search-container">
            <div
              v-show={this.showFlag === "epcPartsList"}
              class="text-font-primary"
              style="cursor: pointer;"
              on-click={e => this.gotoVinPartsList(e)}
            >
              返回列表 {">"}
            </div>
            <div v-show={this.showFlag === "vinPartsList"}>{""}</div>
            <ht-input
              v-model={this.searchData}
              size="mini"
              placeholder="请输入配件编码或名称"
              class="search-btn-container"
              style="width: 300px;"
            >
              <el-button
                v-loading={this.loading}
                slot="append"
                type="primary"
                size="mini"
                on-click={e => this.searchHandle(e)}
              >
                查询
              </el-button>
            </ht-input>
          </div>
          <ht-setting-table
            v-show={this.showFlag === "vinPartsList"}
            v-loading={this.loading}
            data={this.tableData}
            tableName={this.tableName}
            columns={this.tableColumns}
            selected-rows={this.selectedRows}
            on-selectChange={val => (this.selectedRows = val)}
            disabledHotkeys
            style="height: calc(100% - 30px);"
          />
          <EpcPartsList
            v-show={this.showFlag === "epcPartsList"}
            brandData={this.brandData}
            vehModelData={this.vehModelData}
            saleVehModelData={this.saleVehModelData}
            epcPartsQurey={this.epcPartsQurey}
            style="height: calc(100% - 30px);"
            on-epc-search={this.closeHandle}
          />

          <EpcVehModelsBox
            visible={this.epcVehModelsBoxVisible}
            on={{
              "update:visible": val => (this.epcVehModelsBoxVisible = val)
            }}
            code={this.code}
            type={this.epcType}
          />
          <SubstitutePartsBox
            visible={this.substitutePartsBoxVisible}
            on={{
              "update:visible": val => (this.substitutePartsBoxVisible = val)
            }}
            code={this.code}
            brand={this.brandData.name || ""}
          />
          <BrandPartsBox
            visible={this.brandPartsBoxVisible}
            on={{
              "update:visible": val => (this.brandPartsBoxVisible = val)
            }}
            code={this.code}
          />
        </div>
      </ht-dialog>
    );
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";
.list-height {
  height: calc(100vh - 140px);

  .search-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    .search-btn-container {
      &::v-deep .el-button {
        border-radius: 0;
        color: rgba(255, 255, 255);
        background: #409eff;
        @include background_color("color-light");
      }
    }
  }
}
</style>
