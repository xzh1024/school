<template>
  <div class="dialog-wrap">
    <ht-dialog
      v-bind="$attrs"
      title="急采配件单"
      width="1000px"
      v-on="$listeners"
    >
      <el-row style="height:95%" :gutter="10">
        <el-col :span="12" style="height: 430px;">
          <p style="margin:5px 0 10px 0;">
            <el-button
              type="primary"
              size="mini"
              :disabled="!isToCommit"
              @click="commitParts"
            >
              提交
            </el-button>
            <el-button
              type="primary"
              size="mini"
              :disabled="disableBtn || !isToConfirm"
              @click="revokeParts"
            >
              撤回
            </el-button>
          </p>
          <ht-card
            title="待处理"
            auto-card
            style="height: 200px;marginBottom:10px;width:100%;"
          >
            <ht-setting-table
              :data="waitData"
              setting-all-column
              selection-type="multiple"
              show-table-setting
              :selected-rows.sync="waitSelectedRows"
              :columns="waitColumns"
              style="height:150px"
              table-name="urgent-orders-service-table"
            />
          </ht-card>
          <ht-card title="处理中" style="height:190px;width:100%;">
            <ht-setting-table
              :data="processData"
              setting-all-column
              selection-type="multiple"
              show-table-setting
              :columns="processColumns"
              style="height:140px;"
              table-name="urgent-orders-service-table"
            />
          </ht-card>
        </el-col>
        <el-col :span="12" style="height: 430px;">
          <p style="margin:5px 0 10px 0;">
            <el-button
              type="primary"
              size="mini"
              :disabled="disablePickConfirmBtn"
              @click="receiveParts"
            >
              确认领料
            </el-button>
            <el-button
              type="primary"
              size="mini"
              :disabled="disablePickCancleBtn"
              @click="returnParts"
            >
              取消领料
            </el-button>
          </p>
          <ht-card title="可领料" style="height: 400px;">
            <ht-setting-table
              :data="okData"
              setting-all-column
              selection-type="multiple"
              show-table-setting
              :selected-rows.sync="okSelectedRows"
              :columns="okColumns"
              style="height:400px;"
              table-name="urgent-orders-service-table"
            />
          </ht-card>
        </el-col>
      </el-row>
      <div style="margin: 20px 0 5px 0; text-align: center;">
        <el-button type="primary" size="mini" plain @click="$emit('close')">
          取 消（Esc）
        </el-button>
      </div>
    </ht-dialog>
    <!-- 确认领料弹窗 -->
    <ht-dialog
      title="确认领料"
      :visible.sync="dialogVisible"
      width="350px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="confirmForm"
        inline
        :rules="rules"
        :show-message="false"
        size="mini"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="领料人" prop="businessManId">
          <ht-autocomplete
            v-model="technician"
            :fetch-suggestions="listAllReceptionMan()"
            placeholder="领料人"
            :trigger-on-focus="false"
            :maxlength="50"
            @select="technicianChange"
            highlight-first-item
          />
        </el-form-item>
        <el-form-item label="领料日期" prop="businessTime">
          <el-date-picker
            v-model="confirmForm.businessTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="confirmForm.remark" size="small" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        aria-labelledby=""
        style="margin: 10px 0 5px 0; text-align: center;"
      >
        <el-button type="primary" size="mini" plain @click="comfirmPartPick">
          确认领料（F3）
        </el-button>
        <el-button
          type="primary"
          size="mini"
          plain
          @click="dialogVisible = false"
        >
          取 消（Esc）
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { WAIT_COLUMNS, PROCESS_COLUMNS, OK_COLUMNS } from "../const/columns";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import {
  listUrgentParts,
  deleteParts,
  revokeParts,
  commitParts,
  receiveParts,
  returnParts
} from "@/api/repairs/picks";
export default {
  name: "StockEditor",
  props: {
    billId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          console.log(this.billId);
          this.init();
        }
      },
      immediate: true
    },
    billId: {
      handler(val) {
        console.log("billId", val);
        if (!val) return;
        this.init();
      }
    }
  },
  data() {
    return {
      technician: "",
      dialogVisible: false,
      waitData: [],
      waitColumns: [
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
            const { status } = row;
            const show = status == "toCommit" || status == "rejected";
            return show ? (
              <div>
                <el-tooltip enterable={false} placement="top" content="删除">
                  <span
                    on-click={e => this.handleDelete(row, e)}
                    class="icon operation-icon icon-delete-info"
                  />
                </el-tooltip>
              </div>
            ) : null;
          }
        },
        ...WAIT_COLUMNS
      ],
      waitSelectedRows: [],
      processData: [],
      processColumns: [...PROCESS_COLUMNS],
      okData: [],
      okColumns: [...OK_COLUMNS],
      okSelectedRows: [],
      rules: {
        businessManId: [
          { required: true, message: "请选择业务员", trigger: "change" }
        ],
        businessTime: [
          { required: true, message: "请输入业务时间", trigger: "change" }
        ]
      },
      confirmForm: {
        businessManId: "",
        businessTime: new Date(),
        remark: ""
      }
    };
  },
  computed: {
    disableBtn() {
      if (!this.waitSelectedRows.length) return true;
      let isSameStatus = true;
      const first = this.waitSelectedRows[0].status;
      this.waitSelectedRows.forEach(item => {
        if (item.status !== first) {
          isSameStatus = false;
        }
      });
      if (isSameStatus) return false;
      return true;
    },
    isToCommit() {
      if (!this.waitSelectedRows.length) return false;
      let isToCommit = true;
      // 列表第一项不是待提交、外采驳回的话，就不允许点击提交按钮
      // if (
      //   this.waitSelectedRows[0].status !== "toCommit" &&
      //   this.waitSelectedRows[0].status !== "rejected"
      // )
      // return false;
      // 入选中有多个，需要保持相同的状态
      this.waitSelectedRows.forEach(item => {
        if (item.status !== "toCommit" && item.status !== "rejected") {
          isToCommit = false;
        }
      });
      return isToCommit;
    },
    isToConfirm() {
      if (!this.waitSelectedRows.length) return true;
      let isToCommit = true;
      this.waitSelectedRows.forEach(item => {
        if (item.status !== "toConfirm") {
          isToCommit = false;
        }
      });
      return isToCommit;
    },
    disablePickConfirmBtn() {
      if (!this.okSelectedRows.length) return true;
      let canConfirm = true;
      this.okSelectedRows.forEach(item => {
        if (item.status !== "toPick") {
          canConfirm = false;
        }
      });
      if (canConfirm) return false;
      return true;
    },
    disablePickCancleBtn() {
      if (!this.okSelectedRows.length) return true;
      let canConfirm = true;
      this.okSelectedRows.forEach(item => {
        if (item.status !== "toPick") {
          canConfirm = false;
        }
      });
      if (canConfirm) return false;
      return true;
    }
  },
  mounted() {
    if (this.billId) {
      this.init();
    }
  },
  methods: {
    init() {
      listUrgentParts({
        billId: this.billId,
        statuses: ["toCommit", "toConfirm", "rejected"]
      }).then(res => {
        this.waitData = res || [];
      });
      listUrgentParts({
        billId: this.billId,
        statuses: ["inProcess"]
      }).then(res => {
        this.processData = res || [];
      });
      listUrgentParts({
        billId: this.billId,
        statuses: ["toPick", "picked", "returned"]
      }).then(res => {
        this.okData = res || [];
      });
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
    technicianChange(e) {
      this.confirmForm.businessManId = e.id;
      this.$forceUpdate();
    },
    handleDelete(e) {
      const ids = [e.id];
      deleteParts({ ids }).then(() => {
        this.$message.success("删除成功");
        this.init();
      });
    },
    commitParts() {
      console.log(this.waitSelectedRows);
      const ids = [];
      this.waitSelectedRows.forEach(item => {
        ids.push(item.id);
      });
      commitParts({ ids }).then(() => {
        this.$message.success("提交成功");
        this.init();
      });
    },
    revokeParts() {
      console.log(this.waitSelectedRows);
      const ids = [];
      this.waitSelectedRows.forEach(item => {
        ids.push(item.id);
      });
      revokeParts({ ids }).then(() => {
        this.$message.success("撤回成功");
        this.init();
      });
    },
    receiveParts() {
      this.dialogVisible = true;
    },
    comfirmPartPick() {
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          const ids = [];
          this.okSelectedRows.forEach(item => {
            ids.push(item.id);
          });
          receiveParts({ ...this.confirmForm, ids }).then(() => {
            this.$message.success("已确认领料");
            this.dialogVisible = false;
            this.init();
          });
        }
      });
    },
    returnParts() {
      console.log(this.okSelectedRows);
      const ids = [];
      this.okSelectedRows.forEach(item => {
        ids.push(item.id);
      });
      returnParts({ ids }).then(() => {
        this.$message.success("已取消领料");
        this.init();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog-wrap {
  ::v-deep {
    .el-card.is-always-shadow,
    .el-card.is-hover-shadow:focus,
    .el-card.is-hover-shadow:hover {
      box-shadow: 0 0 0 0 !important;
    }
  }
}
</style>
