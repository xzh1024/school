<script>
import EpcCanvas from "./EpcCanvas";
import StockDetails from "@/components/stock-details";
import EpcVehModelsBox from "@/components/epc-veh-models-box";
import SubstitutePartsBox from "@/components/substitute-parts-box";
import BrandPartsBox from "@/components/brand-parts-box";
import { EPC_SEARCH_PLATFORM_PARTS_TABLE } from "../constants";
import eventBus from "@/event";
import { getEpcParts } from "@/api/epc";
import { TAG_TOOLTIP } from "@/constants";
import { ROUTE_MAP_BILL_TYPE } from "@/constants";

export default {
  name: "EpcPartsList",
  components: {
    EpcCanvas,
    EpcVehModelsBox,
    SubstitutePartsBox,
    BrandPartsBox
  },
  props: {
    epcPartsQurey: {
      type: Object,
      required: true
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
      loading: false,
      epcPartsData: [],
      joinSearchRows: [],
      imgUrl: "",
      selectedRows: [],
      tableData: [],
      tableName: EPC_SEARCH_PLATFORM_PARTS_TABLE.name,
      isShowCanvas: true,
      showRow: {},
      code: "",
      epcType: 0,
      epcVehModelsBoxVisible: false,
      substitutePartsBoxVisible: false,
      brandPartsBoxVisible: false
    };
  },
  computed: {
    showJoinHandle() {
      return [
        "/PurchaseObtainPrice",
        "/PurchaseBilling",
        "/PurchaseReceiveBilling",
        "/SalesQuotationPrice",
        "/SalesBilling",
        "/SalesOutBilling"
      ].includes(this.$route.path);
    },
    tableColumns() {
      const addHandle = (row, e) => {
        e.stopPropagation();
        eventBus.$emit(
          "direct-add-part",
          {
            code: row.partNumber || "",
            name: row.standardPartName || row.srcPartName || "",
            brand: this.vehModelData.brand || "",
            priceFactory: Number(row.partPrice || 0),
            avaVehModel: `${this.vehModelData.subBrand} ${this.saleVehModelData
              .salesName || this.saleVehModelData.mjVehicleSys} ${
              this.saleVehModelData.year
            }`
          },
          true
        );
      };
      const joinSearchRowsChange = (row, e) => {
        e.stopPropagation();
        if (this.joinSearchRows.includes(row)) {
          this.joinSearchRows = this.joinSearchRows.filter(
            item => item !== row
          );
        } else {
          this.joinSearchRows.push(row);
        }
      };
      const showStockDetails = row => {
        this.showRow = row;
      };
      const hideStockDetails = () => {
        this.showRow = {};
      };
      const showEpcVehModelsBox = (row, e) => {
        e.stopPropagation();
        this.epcType = Number(row.epcFlag.type);
        this.code = row.partNumber;
        this.epcVehModelsBoxVisible = true;
      };
      const showSubstitutePartsBox = (row, e) => {
        e.stopPropagation();
        this.code = row.partNumber;
        this.substitutePartsBoxVisible = true;
      };
      const showBrandPartsBox = (row, e) => {
        e.stopPropagation();
        this.code = row.partNumber;
        this.brandPartsBoxVisible = true;
      };
      return EPC_SEARCH_PLATFORM_PARTS_TABLE.columns
        .filter(item => this.showJoinHandle || item.prop !== "isChecked")
        .map(item => {
          if (item.prop === "controls") {
            return {
              ...item,
              render: (val, row) => (
                <div>
                  {row && row.labels && row.labels.includes("无此商品") ? (
                    <el-tooltip
                      placement="top"
                      content="添加新配件"
                      enterable={false}
                    >
                      <i
                        class="icon operation-icon icon-add-info"
                        on-click={e => addHandle(row, e)}
                      />
                    </el-tooltip>
                  ) : (
                    <el-popover
                      placement="bottom-start"
                      width="1000"
                      trigger="click"
                      title="库存信息"
                      on-show={() => showStockDetails(row)}
                      on-hide={hideStockDetails}
                    >
                      <StockDetails
                        searchStockParams={this.showRow}
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
                          {row === this.showRow
                            ? "收起库存明细"
                            : "查看库存明细"}
                        </span>
                      </el-link>
                    </el-popover>
                  )}
                </div>
              )
            };
          }
          if (item.prop === "isChecked") {
            return {
              ...item,
              render: (val, row) => {
                return (
                  <div style="text-align: center;">
                    <input
                      value={this.joinSearchRows.includes(row)}
                      type="checkbox"
                      style="display: inline-block;vertical-align: middle;"
                      on-click={e => joinSearchRowsChange(row, e)}
                    />
                  </div>
                );
              }
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
    epcPartsQurey(val) {
      this.initData(val);
    },
    $route() {
      this.joinSearchRows = [];
    }
  },
  mounted() {
    eventBus.$on("quickAddPartRes", this.handleQuickAddPartRes);
  },
  beforeDestroy() {
    eventBus.$off("quickAddPartRes", this.handleQuickAddPartRes);
  },
  methods: {
    formatIndex(index, row) {
      return row.partRefOnImage;
    },
    initData(req) {
      this.loading = true;
      getEpcParts({
        vinCode: req.vinCode,
        mjsid: req.mjsid,
        image: req.image,
        brand: this.brandData.name
      })
        .then(res => {
          this.imgUrl = this.epcPartsQurey.imgUrl || "";
          this.tableData =
            res && res.length
              ? res.map((item, index) => ({
                  ...item,
                  // key值用于强制重新渲染
                  key: `${index}${new Date().getTime()}`
                }))
              : [];
          this.joinSearchRows = [];
          this.isShowCanvas = true;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleQuickAddPartRes(params) {
      if (
        this.tableData.length &&
        this.tableData.find(item => item.partNumber === params.code)
      ) {
        this.initData(this.epcPartsQurey);
      }
    },
    handleSelectChange(rows) {
      if (rows.length) {
        this.selectedRows = this.tableData.filter(
          item => item.partRefOnImage === rows[0].partRefOnImage
        );
      } else {
        this.selectedRows = [];
      }
    },
    joinPartsToSearch(parts, e) {
      if (e) {
        e.stopPropagation();
      }
      const arr = this.getEpcSearchParams(this.filterArr(parts));
      eventBus.$emit(
        "epc-search",
        {
          fields: { parts: arr, replacementCodes: true },
          type: ROUTE_MAP_BILL_TYPE[this.$route.path]
        },
        this.$route.path
      );
      this.$emit("epc-search");
      this.$sidebarBox.hideSidebar();
    },
    filterArr(array) {
      const newArray = [];
      if (array && array.length) {
        array.forEach(item => {
          if (
            !newArray.find(
              newItem => newItem && newItem.partNumber === item.partNumber
            )
          ) {
            newArray.push(item);
          }
        });
      }
      return newArray;
    },
    getEpcSearchParams(array) {
      if (array && array.length) {
        return array.map(item => ({
          brand: this.vehModelData.brand || "",
          code: item.partNumber || "",
          name: item.srcPartName || item.standardPartName || "",
          priceFactory: Number(item.partPrice || 0),
          avaVehModel: `${this.vehModelData.subBrand} ${this.saleVehModelData
            .salesName || this.saleVehModelData.mjVehicleSys} ${
            this.saleVehModelData.year
          }`
        }));
      } else {
        return [];
      }
    },
    clearData() {
      this.tableData = [];
      this.selectedRows = [];
      this.imgUrl = "";
      this.isShowCanvas = false;
    }
  },

  render() {
    return (
      <div v-loading={this.loading} style="height: 100%;">
        <el-row
          style={
            this.showJoinHandle
              ? "height: calc(100% - 75px);"
              : "height: calc(100% - 35px);"
          }
        >
          <el-col span={8} style="height: 100%; overflow: hidden;">
            <EpcCanvas
              ref="refEpcCanvas"
              isShowCanvas={this.isShowCanvas}
              tableData={this.tableData}
              selectedRows={this.selectedRows}
              on={{
                "update:tableData": val => (this.tableData = val),
                "update:selectedRows": val => (this.selectedRows = val)
              }}
              url={this.imgUrl}
              style="height: 100%;"
            />
          </el-col>
          <el-col span={16} style="height: 100%;">
            <ht-setting-table
              data={this.tableData}
              tableName={this.tableName}
              columns={this.tableColumns}
              row-key="key"
              selectedRows={this.selectedRows}
              on-selectChange={this.handleSelectChange}
              disabledHotkeys
              formatIndex={this.formatIndex}
              style="padding-left: 5px;"
            />
          </el-col>
        </el-row>

        <div style="margin-top: 10px; text-align: center;">
          <el-button
            v-show={this.showJoinHandle}
            disabled={!this.joinSearchRows.length}
            size="mini"
            type="primary"
            on-click={e => this.joinPartsToSearch(this.joinSearchRows, e)}
          >
            勾选配件加入查询列表
          </el-button>
          <el-button
            v-show={this.showJoinHandle}
            disabled={!(this.tableData && this.tableData.length)}
            size="mini"
            type="primary"
            on-click={e => this.joinPartsToSearch(this.tableData, e)}
          >
            全部配件加入查询列表
          </el-button>
          <div class="footer-tips background-info">
            免责声明：查询结果仅供参考
          </div>
        </div>

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
    );
  }
};
</script>

<style lang="scss" scoped>
.footer-tips {
  margin-top: 10px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
</style>
