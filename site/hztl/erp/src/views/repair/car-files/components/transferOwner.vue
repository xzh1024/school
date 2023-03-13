<template>
  <div class="dialog-wrap">
    <ht-dialog v-bind="$attrs" title="车辆过户" width="650px" v-on="$listeners">
      <el-form
        :rules="rules"
        ref="form"
        :model="form"
        size="mini"
        label-position="left"
        label-width="110px"
      >
        <el-row>
          <el-col>
            <el-form-item label="车牌号">{{ plateNumber }}</el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="当前客户">{{ customerName }}</el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="过户给" prop="newCooperatorId">
          <CooperatorsSelect
            v-model="form.newCooperatorId"
            :default-value.sync="form.cooperatorName"
            :clearable="false"
            :allow-create="hasCompletePerm('basics.cooperators.createCustomer')"
            no-data-tips="没有查询到客户,回车新增"
            type="customer"
            class="switch-focus focus-cooperatorId"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="transferOwner"
            >确定（F3）</el-button
          >
          <el-button size="small" @click="cancelHandle">取消（ESC）</el-button>
        </el-form-item>
      </el-form>
    </ht-dialog>
  </div>
</template>

<script>
import { searchAllCooperators } from "@/api/communion/communion";
import { changeOwner } from "@/api/repairs";
import { CooperatorsSelect } from "@/components/select";
export default {
  name: "TransferOwner",
  props: {
    currentFile: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    CooperatorsSelect
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value) {
          // this.getLogs();
        }
      },
      immediate: true
    },
    currentFile: {
      handler(value) {
        if (value) {
          // console.log("编辑模式");
          const { plateNumber, id, customerName, cooperatorId } = value;
          this.currentId = id;
          this.plateNumber = plateNumber;
          this.customerName = customerName;
          this.form = {
            vehicleId: id,
            oldCooperatorId: cooperatorId,
            newCooperatorId: ""
          };
        }
      },
      deep: true
    }
  },
  data() {
    return {
      form: {},
      plateNumber: "",
      customerName: "",
      currentId: 0,
      rules: {
        newCooperatorId: [
          {
            required: true,
            message: "请选择需要过户到的客户",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    async searchLoadAllCustromerCooperators(query) {
      return (
        (await searchAllCooperators({
          type: "customer",
          keyword: query
        })) || []
      );
    },

    transferOwner() {
      this.$refs.form.validate((valid, err) => {
        if (!valid) {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
        } else {
          changeOwner(this.form).then(() => {
            this.$message.success({ message: "过户成功!" });
            this.$emit("update");
          });
        }
      });
    },
    cancelHandle() {
      if (this.loading) return;
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.time-line-wrap {
  height: 25vh;
}
</style>
