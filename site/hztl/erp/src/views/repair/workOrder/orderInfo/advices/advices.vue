<template>
  <div class="container-box" style="background:#fff;">
    <div style="height: 100%;">
      <div class="flex-container column-flex">
        <div class="flex-block-bg flex-block-padding btns">
          <el-button
            type="primary"
            size="small"
            :disabled="!enableEdit || !editAble"
            @click="showServiceSelector = true"
            >添加建议</el-button
          >
        </div>

        <div class="auto-block flex-block-bg flex-block-margin table-box">
          <ht-setting-table
            :data="tableData"
            setting-all-column
            show-table-setting
            :total="totalSize"
            :current-page.sync="currentPage"
            :columns="tableColumns"
            table-name="advices-orders-service"
          />
        </div>
      </div>
    </div>
    <!-- 项目选择弹窗 -->
    <ServiceSelector
      :hidePaid="true"
      :visible="showServiceSelector"
      :vehicle="orderInfo.vehicle"
      :title="'添加建议项目/套餐'"
      @addService="addService"
      @addSet="addSet"
      @addFixSet="addSet"
      @close="showServiceSelector = false"
    />
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import {
  getBillsSuggestions,
  createBillsSuggestions,
  updateBillsSuggestions,
  deleteBillsSuggestions
} from "@/api/repairs/bills";
import ServiceSelector from "@/components/repair/serviceSelector/serviceSelector";
import { mapState } from "vuex";
export default {
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    },
    editAble: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          const { status } = value;
          this.enableEdit = status == "recepting" || status == "repairing";
          console.log("建议项目组件获取到更新的工单信息", value);
          this.form = { ...value };
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
      enableEdit: false,
      showServiceSelector: false,
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
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 70,
          cantExport: true,
          render: (value, row) => {
            return this.enableEdit ? (
              <div>
                <el-tooltip enterable={false} placement="top" content="删除">
                  {this.hasEditPerm ? (
                    <span
                      on-click={e => this.handleDelete(row, e)}
                      class="icon operation-icon icon-delete-info"
                    />
                  ) : (
                    ""
                  )}
                </el-tooltip>
              </div>
            ) : (
              ""
            );
          }
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
          width: CELL_WIDTH.date,
          render: (value, row, index) => {
            return this.enableEdit && this.hasEditPerm ? (
              <div>
                <el-input
                  value={value}
                  place-holder="备注"
                  onInput={this.inputValueChange.bind(this, index, "remark")}
                  size="small"
                />
              </div>
            ) : (
              <span>{value}</span>
            );
          }
        }
      ]
    };
  },
  mounted() {
    if (this.orderInfo) {
      this.form = { ...this.orderInfo };
      const { status } = this.orderInfo;
      this.enableEdit = status == "recepting" || status == "repairing";
      console.log("服务项目组件获取到工单信息", this.form);
      this.list();
    }
  },
  components: {
    ServiceSelector
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    hasEditPerm() {
      return this.hasBelongsPerm("update", ["self", "others"]);
    }
  },
  methods: {
    _handleSizeChange(page) {
      this.currentPage = page;
      this.list();
    },
    list() {
      const { id: billId } = this.form;
      getBillsSuggestions({
        billId,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.tableData = rows || [];
        this.totalSize = totalSize;
      });
    },
    handleDelete(e) {
      this.$confirm(`确定删除此项目？`, "提示").then(() => {
        deleteBillsSuggestions({
          id: e.id
        }).then(() => {
          this.list();
          this.$emit("updateCount");
        });
      });
    },
    addService(e) {
      console.log("项目列表接收到-项目:", e);
      const { id: billId } = this.form;
      const { id: itemId, remark } = e;
      const isExist = this.tableData.findIndex(item => item.itemId === itemId);
      if (isExist > -1) {
        this.$confirm(
          `即将添加的项目已经存在于列表中，是否继续？`,
          "提示"
        ).then(() => {
          this.createItem({
            billId,
            type: "item",
            qty: 1,
            itemId,
            remark
          });
        });
        return;
      }
      this.createItem({
        billId,
        type: "item",
        qty: 1,
        itemId,
        remark
      });
    },
    addSet(e) {
      console.log("项目列表接收到-套餐:", e);
      const { id: billId } = this.form;
      const { id: setId, remark } = e;
      const isExist = this.tableData.findIndex(item => item.setId === setId);
      if (isExist > -1) {
        this.$confirm(
          `即将添加的项目已经存在于列表中，是否继续？`,
          "提示"
        ).then(() => {
          this.createItem({
            billId,
            type: "set",
            qty: 1,
            setId,
            remark
          });
        });
        return;
      }
      this.createItem({
        billId,
        type: "set",
        qty: 1,
        setId,
        remark
      });
    },
    createItem(data) {
      createBillsSuggestions(data).then(() => {
        this.$message.success("添加成功");
        this.list();
        this.$emit("updateCount");
      });
    },
    inputValueChange(index, key, e) {
      this.tableData[index][key] = e;
      const {
        id,
        feeProperty,
        chargeManHour,
        manHourPrice,
        qty,
        remark,
        discountLabel
      } = this.tableData[index];
      updateBillsSuggestions({
        id,
        feeProperty,
        chargeManHour,
        manHourPrice,
        qty,
        remark,
        discountRate: discountLabel / 10
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
