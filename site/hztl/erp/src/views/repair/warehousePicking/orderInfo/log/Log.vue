<template>
  <div class="picking-wrap">
    <div class="btns">
      <el-form
        ref="form"
        :model="form"
        inline
        size="mini"
        label-position="right"
      >
        <el-form-item label="配件">
          <el-input
            v-model="form.keyword"
            size="mini"
            placeHolder="配件编码/名称"
            style="width:90px;"
          />
        </el-form-item>
        <el-form-item label="领/退料日期">
          <el-form-item label="" prop="billDate">
            <ht-date-range :clearable="false" v-model="form.billDateRange" />
          </el-form-item>
        </el-form-item>
        <el-form-item label="单据号">
          <el-input v-model="form.billNo" size="mini" style="width:90px;" />
        </el-form-item>
        <el-form-item label="单据类型">
          <ht-select
            v-model="form.billType"
            :options="billTypeOptions"
            filterable
            size="mini"
            style="width:90px;"
            placeholder="请选择"
          >
          </ht-select>
        </el-form-item>
        <el-form-item style="margin-left:20px;">
          <el-button type="primary" size="small" @click="list"
            >查找单据</el-button
          >
          <el-button type="primary" size="small" @click="reset"
            >重置（F6）</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div>
      <ht-card
        title="领/退料单据"
        class="auto-card"
        style="height:300px;overflow:scroll;background:#fff;"
      >
        <ht-setting-table
          :data="logData"
          :enable-table-setting="true"
          :columns="logColumns"
          :selected-rows.sync="selectedRows"
          :row-class-name="itemTableRowClassName"
          @row-dblclick="logSelectChange"
          table-name="wait-to-pick"
        />
      </ht-card>
    </div>
    <div class="op-btns">
      <el-button
        v-if="allowPick"
        type="primary"
        size="small"
        :disabled="disableEditBtn"
        @click="back"
        >继续编辑（F4）</el-button
      >
      <el-button
        type="primary"
        size="small"
        v-if="allowReturn"
        :disabled="detailSelectedRows.length == 0 || disableBtn"
        @click="partOfReturn"
        >选中配件退回（F3）</el-button
      >
      <el-button
        type="primary"
        size="small"
        v-if="allowReturn"
        :disabled="disableBtn"
        @click="wholereturn"
        >整单退回</el-button
      >
      <el-button type="primary" size="small" @click="print"
        >打印（F10）</el-button
      >
    </div>
    <div class="part-wrap">
      <el-form
        ref="form"
        :model="currentRow"
        inline
        :rules="rules"
        :show-message="false"
        size="mini"
        label-position="left"
        label-width="100px"
      >
        <el-form-item :label="isLL ? '领料人' : '退料人'" prop="businessManId">
          <ht-autocomplete
            :disabled="true"
            v-model="technician"
            :fetch-suggestions="listAllReceptionMan()"
            placeholder="领料人"
            :trigger-on-focus="false"
            :maxlength="50"
            @select="technicianChange"
            highlight-first-item
          />
        </el-form-item>
        <el-form-item
          :label="isLL ? '领料日期' : '退料日期'"
          prop="businessTime"
        >
          <el-date-picker
            :disabled="true"
            v-model="currentRow.businessTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input :disabled="true" v-model="currentRow.remark" size="small" />
        </el-form-item>
      </el-form>
      <ht-setting-table
        :data="logDetailData"
        setting-all-column
        selection-type="multiple"
        :selected-rows.sync="detailSelectedRows"
        show-table-setting
        :columns="isPicked ? logDetailLLColumns : logDetailColumns"
        table-name="part-list"
        height="250px"
      />
    </div>
    <!-- 退料入库 -->
    <PartReturn
      :visible="partReturnVisible"
      :currentRow="currentRow"
      :dataRows="returnRows"
      @confirm="confirmReturn"
      @close="partReturnVisible = false"
    />
  </div>
</template>

<script>
import {
  getBillsPicksList,
  getBillsPicksDetails,
  returnRecieve
} from "@/api/repairs/bills";
import PartReturn from "./components/PartReturn";
import {
  LOG_COLUMNS,
  LOG_DETAIL_COLUMNS,
  LOG_DETAIL_LL_COLUMNS
} from "../../const/columns";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { openNewWindow } from "@/utils/tool";

const defaultForm = {
  keyword: "",
  date: "",
  billNo: "",
  billType: ""
};
export default {
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    PartReturn
  },
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          console.log("领料记录组件获取到更新的工单信息", value);
          this.currentOrderInfo = { ...value };
          this.list();
        }
      },
      deep: true
    }
  },
  computed: {
    disableBtn() {
      if (!this.selectedRows || !this.selectedRows.length) return true;
      if (!this.isPicked) return true;
      return false;
    },
    disableEditBtn() {
      if (!this.currentRow) return true;
      return this.currentRow.status == "completed";
    },
    isLL() {
      if (!this.currentRow) return false;
      if (this.currentRow.billType == "LL") return true;
      return false;
    },
    isPicked() {
      if (!this.currentRow) return false;
      return this.isLL && this.currentRow.status == "completed";
    },
    allowPick() {
      return this.hasAutoPerm("receive");
    },
    allowReturn() {
      return this.hasAutoPerm("return");
    }
  },
  mounted() {
    if (this.orderInfo) {
      this.currentOrderInfo = { ...this.orderInfo };
      this.list();
    }
  },
  data() {
    return {
      form: {
        billDateRange: []
      },
      currentRow: {},
      confirmForm: {
        businessManId: "",
        businessTime: new Date()
      },
      technician: "",
      logData: [],
      detailData: [],
      returnRows: [],
      currentOrderInfo: {},
      logDetailData: [],
      selectedRows: [],
      detailSelectedRows: [],
      billTypeOptions: [
        {
          id: "LL",
          name: "领料"
        },
        {
          id: "TL",
          name: "退料"
        }
      ],
      logColumns: [...LOG_COLUMNS],
      logDetailColumns: [...LOG_DETAIL_COLUMNS],
      logDetailLLColumns: [...LOG_DETAIL_LL_COLUMNS], // 已领料单的明细
      partReturnVisible: false, // 退料入库
      stock: {}, // 在库存明细中选中的库存信息
      rules: {
        businessManId: [
          { required: true, message: "请选择业务员", trigger: "change" }
        ],
        businessTime: [
          { required: true, message: "请输入业务时间", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    itemTableRowClassName({ row }) {
      if (row.billType == "TL") {
        return "form-bill-row";
      }
      return "";
    },
    list() {
      const { billDateRange } = this.form;
      const { id: billId } = this.currentOrderInfo;
      getBillsPicksList({
        ...this.form,
        businessTimeStart: billDateRange ? billDateRange[0] : null,
        businessTimeEnd: billDateRange ? billDateRange[1] : null,
        billId
      }).then(res => {
        this.logData = res || [];
        if (res && res.length) {
          this.selectedRows = [res[0]];
        }
        this.logSelectChange(res[0]);
      });
    },
    technicianChange(e) {
      this.confirmForm.businessManId = e.id;
      this.$forceUpdate();
    },
    listAllReceptionMan() {
      const { receptionMan } = this;
      const params = {
        company: "self",
        name: receptionMan,
        roles: ["technicianLeader", "technician"]
      };
      return (query, callback) => {
        searchTypeStaffs(params).then(res => {
          const data = res || [];
          callback(data.map(item => ({ id: item.id, value: item.name })));
        });
      };
    },
    logSelectChange(e) {
      console.log(e);
      this.currentRow = { ...e };
      this.technician = e.businessManName;
      getBillsPicksDetails({ billPartPickId: e.id }).then(res => {
        this.logDetailData = res || [];
      });
    },
    print() {
      const { id, billType } = this.currentRow;
      console.log(billType);
      console.log(billType == "LL");
      if (billType == "LL") {
        openNewWindow(
          this.$router.resolve({
            path: "/Print/repair/pick/" + id
          }).href,
          "print"
        );
      } else {
        openNewWindow(
          this.$router.resolve({
            path: "/Print/repair/returnPart/" + id
          }).href,
          "print"
        );
      }
    },
    partOfReturn() {
      // console.log(this.currentRow);
      this.returnRows = [...this.detailSelectedRows];
      this.partReturnVisible = true;
    },
    wholereturn() {
      // console.log(this.currentRow);
      this.returnRows = [...this.logDetailData];
      this.partReturnVisible = true;
    },
    reset() {
      this.form = { ...defaultForm };
      this.list;
    },
    back() {
      this.$emit("showPick");
    },
    confirmReturn(e) {
      this.partReturnVisible = false;
      if (!this.selectedRows || !this.selectedRows.length) return;
      const { id } = this.selectedRows[0];
      returnRecieve({
        id,
        ...e
      }).then(() => {
        this.$message.success("退料成功！");
        this.list();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.operation-icon {
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 20px;
}
.el-icon-delete {
  background: #f56c6c;
}
.picking-wrap {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 0 5px 0 0;
  ::v-deep {
    .form-bill-row {
      color: red;
    }
  }
}
.op-btns {
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 2px;
  margin-top: 10px;
}
.btns {
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin-bottom: 10px;
  padding: 5px 5px 0 5px;
  border-radius: 2px;
  ::v-deep {
    .el-row {
      width: 1200px;
    }
    .el-form-item {
      margin-bottom: 5px;
    }
  }
  .log {
    flex: 1;
    text-align: right;
  }
}
.btn-wrap {
  width: 100%;
  height: 300px;
  line-height: 300px;
  text-align: center;
}
.part-wrap {
  flex: 1;
  border-radius: 5px;
  background: #fff;
  padding: 10px;
}
</style>
