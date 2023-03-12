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
import { getBillsSuggestions } from "@/api/repairs/bills";
import { mapState } from "vuex";
export default {
  props: {
    billId: {
      type: Number,
      default: 0
    }
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
      form: {},
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
          prop: "itemCode",
          label: "项目/套餐编码",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { setId, setCode, itemCode } = row;
            return setId > 0 ? setCode : itemCode;
          }
        },
        {
          prop: "itemCode2",
          label: "建议类型",
          width: CELL_WIDTH.date,
          formatter: (_, row) => {
            const { setId } = row;
            return setId > 0 ? "套餐" : "项目";
          }
        },
        {
          prop: "itemName",
          label: "项目/套餐名称",
          width: CELL_WIDTH.date,
          formatter: (value, row) => {
            let setName = "";
            if (row.setId > 0) {
              setName = row.setName;
            }
            return setName + value || "";
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.date
        }
      ]
    };
  },
  mounted() {
    if (this.billId) {
      this.list();
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"])
  },
  methods: {
    _handleSizeChange(page) {
      this.currentPage = page;
      this.list();
    },
    list() {
      const { billId } = this;
      getBillsSuggestions({
        billId,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.tableData = rows || [];
        this.totalSize = totalSize;
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
