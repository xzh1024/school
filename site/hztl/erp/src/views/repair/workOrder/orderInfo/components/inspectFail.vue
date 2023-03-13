<template>
  <ht-dialog v-bind="$attrs" title="完检前检查" width="600px" v-on="$listeners">
    <div class="error-list">
      <p>工单有异常未解决，暂时不能完检，请解决完异常后再试。</p>
      <p v-for="(item, index) in list" :key="index">
        <span>{{ index + 1 }}. {{ ERROR_MESSAGES[item] }}</span>
        <span>
          <span
            v-if="item === 'uncomplete'"
            style="color:#3AA7FF;cursor: pointer;"
            @click="goItem"
            >去处理</span
          >
          <span
            v-if="
              item === 'setNotAllReceive' ||
                item === 'receiveToConfirm' ||
                item === 'hasUrgent'
            "
            style="color:#3AA7FF;cursor: pointer;"
            @click="goPicking"
            >去处理</span
          >
          <!-- <span
            v-if="item === 'hasUrgent'"
            style="color:#3AA7FF;cursor: pointer;"
            @click="goUrgent"
            >去处理</span
          > -->
          <span
            v-if="
              item === 'none' ||
                item === 'noReceive' ||
                item === 'itemNotSetChargeMan' ||
                item === 'partNotSetChargeMan'
            "
            ><el-checkbox v-model="ignore">忽略</el-checkbox></span
          >
        </span>
      </p>
    </div>
    <div class="error-list" v-if="noNextMaintenance">
      <p>
        {{ list.length + 1 }}.
        {{ businessCategoryName }}工单没有设置下次保养数据
      </p>
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :show-message="false"
      label-width="120px"
    >
      <el-form-item v-if="noNextMaintenance" label="下次保养里程">
        <div style="display:flex;">
          <ht-input v-model="form.nextMaintenanceMileage">
            <span slot="append">km</span>
          </ht-input>
          <el-popover
            placement="bottom-start"
            title=""
            width="100"
            trigger="click"
          >
            <div class="mile">
              <p @click="addMile(5000)">+5000km</p>
              <p @click="addMile(7000)">+7000km</p>
              <p @click="addMile(10000)">+10000km</p>
              <p @click="addMile(15000)">+15000km</p>
            </div>
            <span
              slot="reference"
              style="display:inline-block;width:100px;text-align:center;color:#1696ff;"
              >选择</span
            >
          </el-popover>
        </div>
      </el-form-item>
      <el-form-item v-if="noNextMaintenance" label="下次保养日期">
        <el-date-picker
          v-model="form.nextMaintenanceDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
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
      <el-button
        size="small"
        type="primary"
        @click="submit"
        :disabled="disableSubmit"
        >确定 (F3)</el-button
      >
      <el-button size="small" @click="$emit('close')">取消 (ESC)</el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { ERROR_MESSAGES } from "../../const/errorMessages";
import { inspectBills } from "@/api/repairs/bills";
import { searchTypeStaffs } from "@/api/company/company"; // 员工信息
import { userInfoMsg } from "@/utils/store";

export default {
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    },
    errorsList: {
      type: Array,
      default: () => {}
    },
    noNextMaintenance: {
      type: Boolean,
      default: () => {}
    }
  },
  watch: {
    orderInfo: {
      handler(value) {
        if (value) {
          const {
            id,
            businessCategoryName,
            mileage,
            nextMaintenanceMileage,
            nextMaintenanceDate
          } = value;
          this.mileage = mileage;
          this.businessCategoryName = businessCategoryName;
          this.orderId = id;
          this.form = {
            ...this.form,
            nextMaintenanceMileage,
            nextMaintenanceDate
          };
        }
      },
      deep: true
    },
    errorsList: {
      handler(value) {
        if (value) {
          this.list = value;
        }
      },
      deep: true
    }
  },
  data() {
    return {
      mileage: 0,
      businessCategoryName: "此",
      ERROR_MESSAGES,
      list: [],
      orderId: null,
      ignore: false,
      inspectMan: "",
      form: {
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
    disableSubmit() {
      const isUnCompleteExist =
        (this.list && this.list.indexOf("uncomplete") > -1) ||
        (this.list && this.list.indexOf("receiveToConfirm") > -1) ||
        (this.list && this.list.indexOf("hasUrgent") > -1);
      const isIgnoreBoxExist =
        (this.list && this.list.indexOf("noReceive") > -1) ||
        (this.list && this.list.indexOf("none") > -1) ||
        (this.list && this.list.indexOf("itemNotSetChargeMan") > -1) ||
        (this.list && this.list.indexOf("partNotSetChargeMan") > -1);
      if (isUnCompleteExist || (isIgnoreBoxExist && !this.ignore)) {
        return true;
      }
      return false;
    },
    userInfoMsg() {
      return userInfoMsg();
    }
  },
  mounted() {
    if (this.orderInfo) {
      const { id, businessCategoryName, mileage } = this.orderInfo;
      this.mileage = mileage;
      this.businessCategoryName = businessCategoryName;
      this.orderId = id;
    }
    this.list = this.errorsList;
  },
  methods: {
    listAllReceptionMan() {
      const { inspectMan } = this;
      const params = {
        company: this.orderInfo ? this.orderInfo.companyId : null,
        name: inspectMan,
        roles: ["technicianLeader", "receptionConsultant"]
      };
      return (query, callback) => {
        searchTypeStaffs(params).then(res => {
          const data = res || [];
          callback(data.map(item => ({ id: item.id, value: item.name })));
        });
      };
    },
    submit() {
      inspectBills({
        id: this.orderInfo.id,
        ...this.form,
        action: "save"
      }).then(() => {
        this.$message.success("完检完成！");
        this.$emit("updateOrder");
      });
    },
    inspectManChange(e) {
      this.form.inspectMan = e.id;
      this.$forceUpdate();
    },
    addMile(miles) {
      this.form.nextMaintenanceMileage = this.mileage
        ? parseInt(this.mileage) + parseInt(miles)
        : parseInt(miles);
      this.$forceUpdate();
    },
    goItem() {
      this.$emit("showItems");
    },
    goPart() {
      this.$emit("showPart");
    },
    goPicking() {
      const { billNo } = this.orderInfo;
      this.$emit("close");
      localStorage.setItem("billNo", billNo);
      this.$router.push("/WarehousePicking");
    },
    goUrgent() {
      this.$emit("close");
      this.$router.push(
        "/PurchaseDispatch?tabName=ConfirmList&childTabName=Sale"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.error-list {
  padding: 0 35px;
  p {
    display: flex;
    justify-content: space-between;
  }
}
</style>
