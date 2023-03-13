<template>
  <ht-dialog v-bind="$attrs" title="完工检查" width="600px" v-on="$listeners">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :show-message="false"
      label-width="80px"
    >
      <el-form-item label="检查人" prop="inspectMan">
        <ht-autocomplete
          v-model="inspectMan"
          :fetch-suggestions="listAllReceptionMan()"
          placeholder="检查人"
          :trigger-on-focus="false"
          @select="inspectManChange"
          :maxlength="50"
          highlight-first-item
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div
      class="dialog-footer-align flex-block-bg flex-block-padding flex-block-margin"
    >
      <el-button size="small" type="primary" @click="submit"
        >确定 (F3)</el-button
      >
      <el-button size="small" @click="$emit('close')">取消 (ESC)</el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { inspectBills } from "@/api/repairs/bills";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { userInfoMsg } from "@/utils/store";

export default {
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          const { id } = value;
          this.orderId = id;
        }
      },
      deep: true
    }
  },
  data() {
    return {
      orderId: null,
      inspectMan: "",
      form: {
        inspectMan: null,
        remark: ""
      },
      rules: {
        inspectMan: [
          { required: true, message: "请选择检查人", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    userInfoMsg() {
      return userInfoMsg();
    }
  },
  mounted() {
    if (this.orderInfo) {
      const { id } = this.orderInfo;
      this.orderId = id;
    }
  },
  methods: {
    listAllReceptionMan() {
      const { inspectMan } = this;
      const params = {
        company: this.userInfoMsg.companyId,
        name: inspectMan,
        roles: ["technicianLeader", "receptionConsultant"]
      };
      // "systemAdmin", "companyAdmin",
      return (query, callback) => {
        searchTypeStaffs(params).then(res => {
          const data = res || [];
          callback(data.map(item => ({ id: item.id, value: item.name })));
        });
      };
    },
    inspectManChange(e) {
      this.form.inspectMan = e.id;
    },
    submit() {
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          inspectBills({ id: this.orderId, ...this.form, action: "save" }).then(
            () => {
              this.$message.success("完检完成！");
              this.$emit("updateOrder");
            }
          );
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.barcode-wrap {
  width: 100%;
  text-align: center;
}
.barcode {
  display: inline-block;
  width: 300px;
  height: 300px;
  margin: 0 auto;
  border: solid 1px #eee;
}
</style>
