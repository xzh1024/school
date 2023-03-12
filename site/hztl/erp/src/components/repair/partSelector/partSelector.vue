<template>
  <ht-dialog
    v-bind="$attrs"
    title="添加配件材料"
    width="1200px"
    v-on="$listeners"
  >
    <ht-card padding style="margin:5px;background: #fff" class="form-wrap">
      <el-row>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="searchVisible = true"
            >查询（F5）</el-button
          >
        </el-col>
        <el-col :span="2" style="margin-left:10px;">
          <el-button type="primary" size="small" @click="showAddPart()"
            >快速新增配件</el-button
          >
        </el-col>
      </el-row>
    </ht-card>
    <div class="content-wrap">
      <ht-setting-table
        :data="tableData"
        :enable-table-setting="true"
        :columns="
          type
            ? type == 'XS'
              ? saleTableColumns
              : pickTableColumns
            : tableColumns
        "
        pagination
        :total="totalSize"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        @row-dblclick="dbClik"
        style="background: #fff;"
        table-name="kpi"
      />
    </div>
    <!-- 查询 -->
    <search-box
      :visible.sync="searchVisible"
      type="PC"
      @searchParamsChange="searchBoxHandle"
    />
    <!-- 配件详情 -->
    <EditBasketDetailBox
      :visible.sync="showEditDialog"
      :partData="editData"
      :searchParams="searchParams.condsBeforeAgg"
      isEdit
      @sure="partInfoChangeHandle"
    />
  </ht-dialog>
</template>

<script>
import SearchBox from "@/views/base/accessories/components/SearchBox";
import EditBasketDetailBox from "../EditBasketDetailBox/EditBasketDetailBox";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { queryStorage } from "@/api/storage";
import eventBus from "@/event";
import { mapState } from "vuex";
export default {
  name: "PartSelector",
  props: {
    type: {
      type: String,
      default: ""
    },
    billType: {
      type: String,
      default: ""
    },
    companyId: {
      type: Number,
      default: 0
    },
    filterZero: {
      type: Boolean,
      default: true
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
          <el-tooltip enterable={false} placement="top" content="添加">
            <span
              on-click={e => this.beforeAdd(row, e)}
              class="icon operation-icon el-icon-plus"
            />
          </el-tooltip>
        </div>
      )
    };
    return {
      showEditDialog: false,
      editData: {},
      searchVisible: false,
      currentItem: {},
      detailForm: {},
      searchParams: {
        condsBeforeAgg: {}
      },
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      commonHead: [
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
          prop: "code",
          label: "配件编码",
          width: CELL_WIDTH.index
        },
        {
          prop: "name",
          label: "配件名称",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "property",
          label: "性质",
          width: CELL_WIDTH.multiple
        }
      ],
      commonFoot: [
        {
          label: "标签",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { isAccessories } = row;
            return isAccessories ? <span class="tag">辅</span> : "";
          }
        },
        {
          prop: "brand",
          label: "品牌",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "unit",
          label: "单位",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "partType",
          label: "零件类别",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "avaVehModel",
          label: "适用车型",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "model",
          label: "规格",
          width: CELL_WIDTH.multiple
        }
      ]
    };
  },
  components: {
    SearchBox,
    EditBasketDetailBox
  },
  watch: {
    "$attrs.visible": {
      handler() {
        this.searchParams = {};
        this.queryStorage();
      },
      immediate: true
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    tableColumns() {
      return [
        ...this.commonHead,
        {
          label: "零售价",
          width: CELL_WIDTH.multiple,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.retail : ""}</span>;
          }
        },
        ...this.commonFoot
      ];
    },
    saleTableColumns() {
      return [
        ...this.commonHead,
        {
          label: "零售价",
          width: CELL_WIDTH.multiple,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.retail : ""}</span>;
          }
        },
        {
          prop: "qty",
          label: "实际数",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "dynaQty",
          label: "动态数",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "purchaseQtyInTransit",
          label: "采购在途数",
          width: CELL_WIDTH.date
        },
        ...this.commonFoot
      ];
    },
    pickTableColumns() {
      return [
        ...this.commonHead,
        {
          prop: "qty",
          label: "实际数",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "dynaQty",
          label: "动态数",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "warehouseName",
          label: "仓库",
          width: CELL_WIDTH.date
        },
        {
          prop: "positionName",
          label: "货位",
          width: CELL_WIDTH.date
        },
        {
          prop: "batchNo",
          label: "批次号",
          width: CELL_WIDTH.date
        },
        {
          label: "零售价",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.retail : ""}</span>;
          }
        },
        {
          label: "平台价",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.platform : ""}</span>;
          }
        },
        {
          label: "调拨价",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.allot : ""}</span>;
          }
        },
        {
          label: "批发价",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.wholesale : ""}</span>;
          }
        },
        {
          label: "批发价1",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.wholesale1 : ""}</span>;
          }
        },
        {
          label: "批发价2",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.wholesale2 : ""}</span>;
          }
        },
        {
          label: "批发价3",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.wholesale3 : ""}</span>;
          }
        },
        {
          label: "批发价4",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.wholesale4 : ""}</span>;
          }
        },
        ...this.commonFoot
      ];
    }
  },
  mounted() {
    eventBus.$on("quickAddPartRes", this.handleQuickAddPartRes);
  },
  methods: {
    showAddPart() {
      eventBus.$emit("direct-add-part");
    },
    select(e) {
      this.currentItem = { ...e };
    },
    queryStorage() {
      let query = {};
      if (this.type == "PICK" || this.type == "XS") {
        query = {
          condsBeforeAgg: {
            ...this.searchParams.condsBeforeAgg,
            stocks: {
              ownerCompanyId: this.companyId
            },
            filterZero: this.filterZero
          }
        };
      }
      queryStorage({
        ...this.searchParams,
        ...query,
        type: this.type == "PICK" ? "LL" : this.billType,
        mode: this.type == "PICK" ? 0 : 3,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (!res.rows) return;
        const arr = [];
        res.rows.forEach(item => {
          arr.push({
            ...item.part,
            ...item.stock,
            ...item.bill
          });
        });
        // retail: item.stock.salePrices ? item.stock.salePrices.retail : ""
        this.tableData = arr;
        this.totalSize = res.totalSize;
      });
    },
    searchBoxHandle(searchData) {
      this.searchParams = searchData;
      this.currentPage = 1;
      this.queryStorage();
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.queryStorage();
    },
    handleQuickAddPartRes() {
      this.queryStorage();
    },
    dbClik(e) {
      this.beforeAdd(e);
    },
    beforeAdd(row) {
      this.showEditDialog = true;
      this.editData = { ...row };
    },
    partInfoChangeHandle(data) {
      this.$emit("addPart", {
        ...data,
        salePrice: data.priceRmb,
        partId: data.partId
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-icon-plus {
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
}
.form-wrap {
  ::v-deep {
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .pagination {
      padding: 3px 0 5px 0 !important;
    }
  }
}
.content-wrap {
  ::v-deep {
    .pagination {
      padding: 3px 0 5px 0 !important;
    }
  }
}
.content-wrap {
  height: 60vh;
  display: flex;
  justify-content: space-between;
  padding: 0 8px 5px 8px;
  background: #fff;
  .item-list {
    width: 60%;
    margin-right: 8px;
    overflow-x: scroll;
  }
  .item-price {
    width: 40%;
  }
}
.tag {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #fff;
  background: #409eff;
  border-radius: 10px;
}
</style>
