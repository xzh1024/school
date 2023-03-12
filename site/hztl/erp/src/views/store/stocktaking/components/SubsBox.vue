<script>
import { stocktakingSubsList } from "@/api/store/stocktaking";
import { precisionsFixed } from "@/mixins";
import { CELL_WIDTH } from "@/constants";
import RowSpans from "../mixins/RowSpans";

export default {
  name: "StocktakingBillDetailBox",
  mixins: [precisionsFixed, RowSpans],
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
      loading: false,
      tableData: [],
      selectedRows: [],
      tableName: "StocktakingBillDetailBox",
      columns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "supplierName",
          label: "供应商",
          width: CELL_WIDTH.companyName
        },
        { prop: "batchNo", label: "批次号", width: CELL_WIDTH.no },
        { prop: "property", label: "配件性质", width: CELL_WIDTH.property },
        { prop: "positionName", label: "货位", width: CELL_WIDTH.positionName },
        {
          prop: "profitLossQty",
          label: "盈亏数",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "batchNoQty",
          label: "帐面数",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "realQty",
          label: "盘点数",
          width: CELL_WIDTH.qty,
          type: "number"
        },
        {
          prop: "profitLossTaxedAmount",
          label: "盈亏额",
          width: CELL_WIDTH.money,
          type: "number"
        },
        {
          prop: "taxedPurchasePrice",
          label: "库存进价",
          width: CELL_WIDTH.money,
          type: "number"
        },
        {
          prop: "realTaxedPrice",
          label: "调整进价",
          width: CELL_WIDTH.money,
          type: "number"
        }
      ],
      formList: [
        {
          name: "货主",
          file: "ownerCompanyName"
        },
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
          name: "仓库",
          file: "warehouseName"
        },
        {
          name: "盘前货位",
          file: "positionName"
        },
        {
          name: "账面数",
          file: "bookQty"
        },
        {
          name: "盘点数",
          file: "realQty"
        },
        {
          name: "盈亏数",
          file: "profitLossQty"
        },
        {
          name: "盈亏额",
          file: "profitLossTaxedAmount"
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
    visible(value) {
      if (value) {
        this.initeData();
      }
    }
  },
  methods: {
    initeData() {
      if (this.infoData.takingDetailId) {
        stocktakingSubsList({
          takingDetailId: this.infoData.takingDetailId
        }).then(res => {
          this.tableData = res || [];
          this.setupRowSpans(this.tableData);
        });
      }
    },
    handleClose() {
      this.relVisible = false;
    }
  },
  render() {
    return (
      <ht-dialog
        title="库存明细"
        visible={this.relVisible}
        on-close={this.handleClose}
        width="1200px"
        class="ht-dialog-box"
      >
        <div class="flex-container">
          <div class="ht-detail-form flex-block-margin flex-block-bg flex-block-padding">
            <div class="ht-page-title page-title-divider">汇总信息</div>
            <el-form
              v-model={this.infoData}
              show-message={false}
              size="mini"
              label-position="left"
              label-width="100px"
              class="search-box compact-form ignore-hotkeys"
            >
              {this.formList.map(item => (
                <el-form-item label={item.name} prop={item.file}>
                  <span title={this.infoData[item.file]} class="form-value">
                    {this.infoData[item.file]}
                  </span>
                </el-form-item>
              ))}
            </el-form>
          </div>
          <div class="flex-block-margin flex-block-bg flex-block-padding auto-block flex-container column-flex">
            <div class="ht-page-title page-title-divider">盘点明细</div>
            <ht-setting-table
              class="auto-block"
              v-loading={this.loading}
              data={this.tableData}
              columns={this.columns}
              table-name={this.tableName}
              selected-rows={this.selectedRows}
              span-method={this.getSpans}
            />
          </div>
        </div>
      </ht-dialog>
    );
  }
};
</script>
