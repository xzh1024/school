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
        :columns="tableColumns"
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
      :searchParams="searchParams.condsBeforeAgg"
      :discount="partDiscount"
      :canDiscount="canDiscount"
      :partData="editData"
      isEdit
      @sure="partInfoChangeHandle"
    />
  </ht-dialog>
</template>

<script>
import SearchBox from "@/views/base/accessories/components/SearchBox";
import EditBasketDetailBox from "../EditBasketDetailBoxInBill/EditBasketDetailBox";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { queryStorage } from "@/api/storage";
import eventBus from "@/event";
import { mapState } from "vuex";
export default {
  name: "PartSelector",
  props: {
    discount: {
      type: Number,
      default: null
    },
    canDiscount: {
      type: Boolean,
      default: false
    },
    billType: {
      type: String,
      default: ""
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
      searchParams: {},
      currentPage: 1,
      partDiscount: 10,
      totalSize: 0,
      tableData: [],
      tableColumns: [
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
        },
        {
          label: "零售价",
          width: CELL_WIDTH.multiple,
          formatter: (_, row) => {
            const { salePrices } = row;
            return <span>{salePrices ? salePrices.retail : ""}</span>;
          }
        },
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
    },
    discount: {
      handler() {
        this.partDiscount = this.discount ? this.discount : null;
      },
      immediate: true
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.partDiscount = this.discount || null;
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
      const query = {
        condsBeforeAgg: {
          ...this.searchParams.condsBeforeAgg,
          stocks: {
            ownerCompanyId: this.companyId
          },
          filterZero: this.filterZero
        }
      };
      queryStorage({
        ...this.searchParams,
        ...query,
        type: this.billType,
        mode: 3,
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
  }
}
.content-wrap {
  height: 60vh;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
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
