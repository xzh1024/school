<script>
import PurchaseBillsTab from "./PurchaseBillsTab";
import SalesDetailsTab from "./SalesDetailsTab";
import { dateFormatFull } from "@/utils/date";

export default {
  name: "PartsBusinessCaseBox",
  components: {
    PurchaseBillsTab,
    SalesDetailsTab
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    infoData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: "purchaseBill",
      tabs: [
        { id: "purchaseBill", name: "往来单据" },
        { id: "salesDetails", name: "加盟店销售情况" }
      ],
      id: 0,
      formList: [
        {
          name: "配件编码",
          file: "code"
        },
        {
          name: "配件名称",
          file: "name"
        },
        {
          name: "配件品牌",
          file: "brand"
        },
        {
          name: "产地",
          file: "productionPlace"
        },
        {
          name: "可售库存",
          file: "dynaQty"
        },
        // {
        //   name: "在途数",
        //   file: "transitQty"
        // },
        {
          name: "上次进货数量",
          file: "lastPurchaseQty"
        },
        {
          name: "上次进货金额",
          file: "lastPurchaseAmount"
        },
        {
          name: "上次进货单价",
          file: "lastPurchasePrice"
        },
        {
          name: "上次进货时间",
          file: "lastPurchaseTime"
        }
      ]
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
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.activeTab = "purchaseBill";
        this.id = this.infoData.id;
      }
    },
    activeTab() {
      this.serchHandle();
    }
  },
  methods: {
    serchHandle() {
      if (this.activeTab === "purchaseBill") {
        this.$refs.refPurchaseBillsTab &&
          this.$refs.refPurchaseBillsTab.loadData();
      } else if (this.activeTab === "salesDetails") {
        this.$refs.refSalesDetailsTab &&
          this.$refs.refSalesDetailsTab.loadData();
      }
    },
    handleClose() {
      this.relVisible = false;
    }
  },

  render() {
    return (
      <ht-dialog
        title="配件经营明细"
        visible={this.relVisible}
        on-close={this.handleClose}
        width="1160px"
        class="ht-dialog-box"
      >
        <div class="flex-container">
          <div class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding">
            <div class="ht-page-title page-title-divider">汇总信息</div>
            <el-form
              v-model={this.infoData}
              size="mini"
              label-position="left"
              label-width="110px"
              class="search-box compact-form ignore-hotkeys"
            >
              {this.formList.map(item => (
                <el-form-item label={item.name} prop={item.file}>
                  <span title={this.infoData[item.file]} class="form-value">
                    {item.file === "dynaQty" && !this.infoData.canViewStorage
                      ? "--"
                      : item.file === "lastPurchaseTime"
                      ? dateFormatFull(this.infoData[item.file])
                      : this.infoData[item.file]}
                  </span>
                </el-form-item>
              ))}
            </el-form>
          </div>
          <div class="flex-block-margin flex-block-bg flex-block-padding auto-block flex-container column-flex">
            <ht-tabs
              v-model={this.activeTab}
              tabs={this.tabs}
              style="margin-top: -3px; font-size: 14px;"
            />
            <PurchaseBillsTab
              v-show={this.activeTab === "purchaseBill"}
              ref="refPurchaseBillsTab"
              id={this.id}
            />
            <SalesDetailsTab
              v-show={this.activeTab === "salesDetails"}
              ref="refSalesDetailsTab"
              id={this.id}
            />
          </div>
        </div>
      </ht-dialog>
    );
  }
};
</script>
