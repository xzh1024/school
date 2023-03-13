<template>
  <div class="table-wrap">
    <div class="top-wrap">
      <ht-card class="auto-card" title="工单列表" style="background:#fff">
        <el-form ref="form" :model="form" inline size="mini" label-width="50px">
          <el-form-item>
            <el-input
              v-model="form.keyword"
              placeHolder="请输入工单号"
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
          :columns="orderColumns"
          pagination
          :total="totalSize"
          @row-dblclick="selectChange"
          :current-page.sync="currentPage"
          @pageChange="_handleSizeChange"
          table-name="order-list"
          height="160px"
        />
      </ht-card>
    </div>
    <div class="bottom-wrap">
      <div class="left">
        <ht-card
          title="服务项目"
          class="auto-card"
          style="height:300px;background:#fff"
        >
          <ht-setting-table
            :data="serviceData"
            :enable-table-setting="true"
            :columns="enableAdd ? serviceColumnsAdd : serviceColumns"
            table-name="service-list"
          />
        </ht-card>
      </div>
      <div class="right">
        <ht-card
          title="配件材料"
          class="auto-card"
          style="height:300px;background:#fff"
        >
          <ht-setting-table
            :data="partData"
            :enable-table-setting="true"
            :columns="enableAdd ? partColumnsAdd : partColumns"
            table-name="part-list"
          />
        </ht-card>
      </div>
    </div>
    <!-- 配件详情 -->
    <EditBasketDetailBox
      :visible.sync="showEditDialog"
      :discount="discountRate"
      :partData="editData"
      isEdit
      @sure="partInfoChangeHandle"
    />
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { ORDER_COLUMNS, SERVICE_COLUMNS, PART_COLUMNS } from "../const/columns";
import EditBasketDetailBox from "../../EditBasketDetailBoxInBill/EditBasketDetailBox";
import { queryStorage } from "@/api/storage";
import { resumesBills } from "@/api/repairs/resumes";
import { resumesItems } from "@/api/repairs/resumes";
import { resumesParts } from "@/api/repairs/resumes";

import { mapState } from "vuex";
export default {
  props: {
    vehicleId: {
      type: Number,
      default: 0
    },
    enableAdd: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    vehicleId: {
      handler() {
        this.list();
      },
      immediate: true
    }
  },
  components: {
    EditBasketDetailBox
  },
  data() {
    return {
      showEditDialog: false,
      editData: {},
      form: {
        plateNumber: ""
      },
      currentPage: 1,
      discountRate: 0,
      totalSize: 0,
      tableData: [],
      serviceData: [],
      partData: [],
      orderColumns: [...ORDER_COLUMNS],
      serviceColumnsAdd: [
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
                  on-click={e => this.handleAddItem(row, e)}
                  class="icon operation-icon icon-add-info"
                />
              </el-tooltip>
            </div>
          )
        },
        ...SERVICE_COLUMNS
      ],
      serviceColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        ...SERVICE_COLUMNS
      ],
      partColumnsAdd: [
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
        ...PART_COLUMNS
      ],
      partColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        ...PART_COLUMNS
      ]
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      resumesBills({
        keyword: this.form.keyword,
        vehicleId: this.vehicleId,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.totalSize = totalSize;
        this.tableData = rows || [];
      });
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.serviceData = [];
      this.partData = [];
      // 查询列表
      this.list();
    },
    selectChange(e) {
      this.getBillsItems(e.id);
      this.getBillsParts(e.id);
    },
    getBillsItems(billId) {
      resumesItems({
        billId,
        vehicleId: this.vehicleId,
        page: 1,
        pageSize: 99
      }).then(res => {
        const { rows } = res;
        if (!rows) {
          this.serviceData = [];
          return;
        }
        rows.forEach(item => {
          item.discountLabel = item.discountRate
            ? Number(item.discountRate * 10).toFixed(2)
            : item.discountRate;
        });
        this.serviceData = rows || [];
      });
    },
    getBillsParts(billId) {
      resumesParts({
        billId,
        vehicleId: this.vehicleId,
        page: 1,
        pageSize: 99
      }).then(res => {
        const { rows } = res;
        if (!rows) {
          this.partData = [];
          return;
        }
        rows.forEach(item => {
          item.discountLabel = item.discountRate
            ? Number(item.discountRate * 10).toFixed(2)
            : item.discountRate;
        });
        this.partData = rows || [];
      });
    },
    handleAddItem(e) {
      this.$emit("addItem", e);
    },
    handleAddPart(row) {
      console.log(row);
      const { part } = row;
      this.showEditDialog = true;
      queryStorage({
        fields: {
          parts: [
            {
              code: part.code,
              name: part.name
            }
          ]
        },
        type: "XS",
        mode: 3,
        page: 1,
        pageSize: 10
      }).then(res => {
        const { partNotExist, rows } = res;
        const { discountRate, price } = row;
        this.discountRate = Number(discountRate * 10);
        if (partNotExist) {
          this.editData = { ...row };
        } else {
          const part = rows[0];
          this.editData = {
            ...part.part,
            ...part.stock,
            ...part.bill,
            salePrices: { ...part.stock, retail: price }
          };
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
  background: #e7ebed;
  ::v-deep {
    .el-card.is-always-shadow,
    .el-card.is-hover-shadow:focus,
    .el-card.is-hover-shadow:hover {
      box-shadow: 0 0 0 0 !important;
    }
  }
}
.top-wrap {
  height: 300px;
}
.bottom-wrap {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .left,
  .right {
    width: 49%;
  }
}
</style>
