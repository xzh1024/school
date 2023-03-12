<template>
  <div class="table-wrap">
    <ht-card class="auto-card" style="background:#fff">
      <el-form ref="form" :model="form" inline size="mini" label-width="50px">
        <el-form-item>
          <el-input
            v-model="form.keyword"
            placeHolder="配件编号/配件名称"
            size="small"
          />
        </el-form-item>
        <el-button type="primary" size="small" @click="list()"
          >查询（F5）</el-button
        >
      </el-form>
      <ht-setting-table
        :data="tableData"
        :enable-table-setting="true"
        :columns="enableAdd ? tableColumnsAdd : tableColumns"
        pagination
        :total="totalSize"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        table-name="item-list"
        height="490px"
      />
    </ht-card>
    <!-- 配件详情 -->
    <EditBasketDetailBox
      :visible.sync="showEditDialog"
      :canDiscount="this.canDiscount"
      :discount="partDiscount"
      :partData="editData"
      isEdit
      @sure="partInfoChangeHandle"
    />
  </div>
</template>

<script>
import EditBasketDetailBox from "../../EditBasketDetailBoxInBill/EditBasketDetailBox";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { PART_HISTORY_COLUMNS } from "../const/columns";
import { resumesParts } from "@/api/repairs/resumes";
import { queryStorage } from "@/api/storage";
import { mapState } from "vuex";
export default {
  props: {
    vehicleId: {
      type: Number,
      default: 0
    },
    billType: {
      type: String,
      default: ""
    },
    enableAdd: {
      type: Boolean,
      default: false
    },
    discount: {
      type: Number,
      default: null
    },
    canDiscount: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        keyword: ""
      },
      currentPage: 1,
      totalSize: 0,
      editData: {},
      discountRate: 0,
      partDiscount: "",
      tableData: [],
      showEditDialog: false,
      tableColumnsAdd: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 40,
          cantExport: true,
          render: (value, row) => (
            <div>
              <el-tooltip enterable={false} placement="top" content="添加">
                <span
                  on-click={e => this.handleAddPart(row, e)}
                  class="icon operation-icon icon-add-info"
                />
              </el-tooltip>
            </div>
          )
        },
        ...PART_HISTORY_COLUMNS
      ],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        ...PART_HISTORY_COLUMNS
      ]
    };
  },
  watch: {
    discount: {
      handler() {
        this.partDiscount = this.discount ? this.discount : null;
      },
      immediate: true
    }
  },
  components: {
    EditBasketDetailBox
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      resumesParts({
        keyword: this.form.keyword,
        vehicleId: this.vehicleId,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        if (!rows) {
          this.tableData = [];
          return;
        }
        rows.forEach(item => {
          item.discountLabel = item.discountRate
            ? Number(item.discountRate * 10).toFixed(2)
            : item.discountRate;
        });
        this.totalSize = totalSize;
        this.tableData = rows || [];
      });
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      // 查询列表
      this.list();
    },
    handleAddPart(row) {
      queryStorage({
        condsBeforeAgg: {
          stocks: {
            partId: row.part.partId
          }
        },
        type: this.billType || "XS",
        mode: 3,
        page: 1,
        pageSize: 10
      }).then(res => {
        const { partNotExist, rows } = res;
        const { discountRate } = row;
        if (rows && rows.length) {
          this.showEditDialog = true;
          this.discountRate = Number(discountRate * 10);
          if (partNotExist) {
            this.editData = { ...row };
          } else {
            const part = rows[0];
            this.editData = {
              ...part.part,
              ...part.stock,
              ...part.bill,
              partId: row.partId,
              salePrices: {
                ...part.stock,
                retail: part.stock.salePrices.retail
              }
            };
          }
        } else {
          this.$message({
            type: "warning",
            message: "配件信息不存在！"
          });
        }
      });
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
.table-wrap {
  height: 600px;
  display: flex;
  flex-direction: column;
}
</style>
