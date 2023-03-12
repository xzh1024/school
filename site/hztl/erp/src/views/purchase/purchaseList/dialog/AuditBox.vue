<template>
  <ht-dialog
    class="ignore-top-hotkeys"
    v-bind="$attrs"
    :title="title"
    width="400px"
    v-on="$listeners"
  >
    <el-form
      ref="form"
      :rules="rules"
      :model="formData"
      :validate-on-rule-change="false"
      :show-message="false"
      size="mini"
      style="margin: 10px;"
    >
      <el-form-item>
        <el-radio-group
          v-model="formData.isApproved"
          @change="onIsApprovedChange"
        >
          <el-radio :label="true">
            审核通过
          </el-radio>
          <el-radio :label="false">
            审核不通过并退回
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="!formData.isApproved" prop="auditComment">
        <ht-input
          v-model="formData.auditComment"
          :rows="4"
          type="textarea"
          placeholder="请填写事由"
        />
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px;" class="dialog-footer-align">
      <el-button
        :loading="loading"
        size="mini"
        plain
        type="primary"
        @click="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button
        :loading="loading"
        type="primary"
        size="mini"
        plain
        @click="cancelHandle"
      >
        取消（Esc）
      </el-button>
    </div>

    <OrderError :visible.sync="orderErrorVisible" :data="orderErrorData" />
  </ht-dialog>
</template>

<script>
import hotkeys from "hotkeys-js";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import { auditPurchaseBilling } from "@/api/purchase/purchaseList";
import { OrderError } from "@/components/errors";

let oldKeyScope;
const topHotkeys = new TopHotkeys();
const rules = {
  auditComment: [{ required: true, message: "请填写事由", trigger: "blur" }]
};
const defaultFormData = {
  isApproved: true,
  auditComment: ""
};

export default {
  name: "AuditBox",
  components: { OrderError },
  props: {
    orderId: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      formData: { ...defaultFormData },
      rules: {},
      orderErrorData: {},
      orderErrorVisible: false,
      loading: false
    };
  },
  computed: {
    title() {
      return this.type === "order" ? "审核" : "定金审核";
    }
  },
  watch: {
    "$attrs.visible": {
      handler(val, oldVal) {
        if (val) {
          oldKeyScope = hotkeys.getScope();
          topHotkeys.bindHotkeys(this.$el);
          this.formData = { ...defaultFormData };
          this.$nextTick(() => {
            this.$refs.form && this.$refs.form.clearValidate();
          });
        } else if (oldVal) {
          topHotkeys.unbindHotkeys(this.$el);
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    }
  },
  methods: {
    onIsApprovedChange(type) {
      if (type) {
        this.rules = {};
      } else {
        this.rules = rules;
      }
    },
    sureHandle() {
      if (this.loading) {
        return;
      }
      this.$refs.form.validate((valid, err) => {
        if (valid) {
          this.loading = true;
          auditPurchaseBilling({
            ...this.formData,
            orderId: Number(this.orderId),
            type: this.type
          })
            .then(res => {
              this.loading = false;
              this.cancelHandle();
              if (res && res.code && res.code !== "OK") {
                this.orderErrorData = res;
                this.orderErrorVisible = true;
                return;
              } else {
                this.$emit("on-complete", { ...this.formData });
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
    cancelHandle() {
      if (this.loading) return;
      this.$emit("update:visible", false);
    }
  }
};
</script>
