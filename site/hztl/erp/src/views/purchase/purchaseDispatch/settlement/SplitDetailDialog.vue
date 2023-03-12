<template>
  <ht-dialog v-bind="$attrs" v-on="$listeners" width="400px" title="急件拆分">
    <el-form
      ref="formRef"
      :rules="rules"
      :model="formData"
      label-width="100px"
      label-position="left"
      size="mini"
      class=""
    >
      <el-form-item style="flex: auto" label="拆分供应商" prop="cooperatorId">
        <CooperatorsSelect
          v-model="formData.cooperatorId"
          :clearable="false"
          :default-value.sync="formData.cooperatorName"
          :allow-create="hasCompletePerm('basics.cooperators.createSupplier')"
          type="supplier"
          no-data-tips="没有查询到供应商,回车新增"
          class="switch-focus focus-cooperatorId"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="拆分数量" prop="splitQty">
        <el-input-number
          v-model="formData.splitQty"
          :min="1"
          :max="Number(detail.row.qty)"
          autocomplete="off"
          style="width:100%"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click.stop="closeDialog">
        取消（Esc）
      </el-button>
      <el-button type="primary" size="small" @click.stop="confirm">
        确定（F3）
      </el-button>
    </div>
    <merge-dialog
      :visible.sync="mergeInfo.visible"
      :req-type="mergeInfo.reqType"
      :req-body="mergeInfo.reqBody"
      :bill-list="mergeInfo.billList"
      @done="handleMergeDone"
    />
  </ht-dialog>
</template>

<script>
import { baseDataMixin, precisionsFixed } from "@/mixins";
import { CooperatorsSelect } from "@/components/select";
import { splitPurchaseDispatch } from "@/api/purchase/purchaseDispatch";
import MergeDialog from "../components/MergeDialog";

export default {
  name: "SplitDetailDialog",
  components: {
    CooperatorsSelect,
    MergeDialog
  },
  mixins: [precisionsFixed, baseDataMixin],
  props: {
    detail: {
      type: Object,
      default() {
        return {
          row: {},
          header: {}
        };
      }
    }
  },
  data() {
    const checkCooperator = (rule, val, cb) => {
      if (!val) {
        return cb(new Error("请选择供应商"));
      } else if (val == this.detail.header.cooperatorId) {
        return cb(new Error("拆分目标供应商为当前供应商"));
      }
      cb();
    };
    return {
      mergeInfo: {
        reqType: "split",
        reqBody: {},
        billList: [],
        visible: false
      },
      formData: {},
      rules: {
        splitQty: [
          {
            required: true,
            message: "请填写拆分数量",
            trigger: "blur"
          }
        ],
        cooperatorId: [
          {
            validator: checkCooperator,
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    "$attrs.visible"(val) {
      if (val) {
        this.formData = {};
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    confirm() {
      this.$refs["formRef"].validate(valid => {
        if (valid) {
          const req = {};
          req.detailId = this.detail.row.id;
          req.cooperatorId = this.formData.cooperatorId;
          req.splitQty = this.formData.splitQty;
          req.billId = this.detail.header.id;

          splitPurchaseDispatch(req)
            .then(res => {
              if (res.code === "ok") {
                this.$message({
                  type: "success",
                  message: "拆分成功"
                });
                this.closeDialog();
                this.$emit("success");
              } else if (res.code === "merge-option") {
                this.$message({
                  type: "success",
                  message: "拆分成功"
                });
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
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    handleMergeDone(isMerge) {
      this.closeDialog();
      this.$emit("merge-success", isMerge);
    }
  }
};
</script>
