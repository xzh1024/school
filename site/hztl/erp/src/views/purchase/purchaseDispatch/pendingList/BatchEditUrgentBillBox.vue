<template>
  <ht-dialog
    v-on="$listeners"
    v-bind="$attrs"
    title="生成急件到货单"
    width="400px"
    @closed="clearCreateFrom"
  >
    <el-form
      ref="createForm"
      :model="createForm"
      :rules="createRules"
      :show-message="false"
      class="form-item-no-margin-bottom"
      label-width="70px"
      size="mini"
    >
      <el-form-item label="供应商" prop="cooperatorId">
        <CooperatorsSelect
          v-model="createForm.cooperatorId"
          :default-value.sync="createForm.cooperatorName"
          :allow-create="hasCompletePerm('basics.cooperators.createSupplier')"
          no-data-tips="没有查询到供应商,回车新增"
          type="supplier"
          placeholder="请选择"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer-align">
      <el-button
        :loading="loading"
        :disabled="!createForm.cooperatorId"
        type="primary"
        size="mini"
        @click.stop="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" @click.stop="cancelHandle">
        取消（Esc）
      </el-button>
    </div>

    <merge-dialog
      :visible.sync="mergeInfo.visible"
      :req-type="mergeInfo.reqType"
      :req-body="mergeInfo.reqBody"
      :bill-list="mergeInfo.billList"
      @done="mergeDone"
    />
  </ht-dialog>
</template>

<script>
import { batchCreatePurchaseDispatch } from "@/api/purchase/purchaseDispatch/pending";
import { CooperatorsSelect } from "@/components/select";
import MergeDialog from "../components/MergeDialog";

export default {
  name: "BatchEditUrgentBillBox",
  components: {
    CooperatorsSelect,
    MergeDialog
  },
  props: {
    selectedRows: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      createForm: {
        cooperatorId: "",
        cooperatorName: ""
      },
      createRules: {
        cooperatorId: [
          {
            required: true,
            trigger: "blur",
            message: "请选择供应商"
          }
        ]
      },
      mergeInfo: {
        reqType: "batchCreate",
        reqBody: {},
        billList: [],
        visible: false
      },
      loading: false
    };
  },
  methods: {
    sureHandle() {
      if (!this.createForm.cooperatorId || this.loading) return;
      this.getCreateForm().validate((valid, err) => {
        if (valid) {
          this.loading = true;
          const req = {
            cooperatorId: this.createForm.cooperatorId,
            urgentIds: this.selectedRows.map(item => item.id)
          };
          batchCreatePurchaseDispatch(req)
            .then(res => {
              this.loading = false;

              if (res.code === "ok") {
                this.cancelHandle();
                this.$emit("on-success");
                this.$message({
                  type: "success",
                  message: "创建急件到货单成功"
                });
              } else if (res.code === "merge-option") {
                this.mergeInfo.reqBody = req;
                this.mergeInfo.billList = res.data;
                this.mergeInfo.visible = true;
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        }
      });
    },
    clearCreateFrom() {
      this.createForm.cooperatorName = "";
      this.getCreateForm().resetFields();
    },
    getCreateForm() {
      return this.$refs.createForm;
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    mergeDone(isMerge) {
      this.cancelHandle();
      this.$emit("on-success", isMerge);
      this.$message({
        type: "success",
        message: "创建急件到货单成功"
      });
    }
  }
};
</script>
