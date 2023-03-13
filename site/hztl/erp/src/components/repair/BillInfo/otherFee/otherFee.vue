<template>
  <div style="height: 550px;">
    <div class="auto-block flex-block-bg flex-block-margin table-box">
      <ht-setting-table
        :data="tableData"
        setting-all-column
        show-table-setting
        pagination
        :total="totalSize"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        :columns="tableColumns"
        style="height:550px;"
        table-name="advices-orders-service"
      />
    </div>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { listExtraFee } from "@/api/repairs/otherFee";
import { mapState } from "vuex";

export default {
  props: {
    billId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  watch: {
    billId: {
      handler(value) {
        if (value) {
          this.list();
        }
      },
      deep: true
    }
  },
  data() {
    return {
      totalSize: 0,
      currentPage: 1,
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

        {
          prop: "name",
          label: "费用名称",
          width: CELL_WIDTH.date
        },
        {
          prop: "price",
          label: "单价",
          width: CELL_WIDTH.date,
          formatter: value => {
            return <span style="color:#409eff;">{value}</span>;
          }
        },
        {
          prop: "qty",
          label: "数量",
          width: CELL_WIDTH.date,
          formatter: value => {
            return <span style="color:#409eff;">{value}</span>;
          }
        },
        {
          prop: "unit",
          label: "单位",
          width: CELL_WIDTH.date
        },
        {
          prop: "untaxedDueAmount",
          label: "收费金额",
          width: CELL_WIDTH.date,
          formatter: value => {
            return (
              <span style="color:#409eff;">{Number(value).toFixed(2)}</span>
            );
          }
        }
      ]
    };
  },
  mounted() {
    if (this.billId) {
      this.list();
    }
  },
  methods: {
    _handleSizeChange(page) {
      this.currentPage = page;
      this.list();
    },
    list() {
      const { billId } = this;
      listExtraFee({
        billId,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (!res) {
          this.tableData = [];
          return;
        }
        res.forEach(item => {
          item.discountLabel = item.discountRate ? item.discountRate * 10 : 10;
        });
        this.tableData = res || [];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin-bottom: 10px 0;
  padding: 5px;
  border-radius: 2px;
  border-bottom: solid 1px #eee;
}
.item-wrap {
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  .item {
    border-radius: 2px;
    border: solid 1px #eee;
    margin-right: 10px;
  }
  .active {
    color: blue;
    border-color: blue;
    background: grey;
  }
}
</style>
