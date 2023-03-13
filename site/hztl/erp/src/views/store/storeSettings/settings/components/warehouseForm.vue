<template>
  <el-form
    ref="formRef"
    v-switch-focus="focusData"
    :model="formData"
    :rules="rules"
    :disabled="formDisabled"
    :show-message="false"
    label-position="left"
    label-width="90px"
    size="mini"
    class="form-item-small-margin-bottom warehouse-edit "
  >
    <el-form-item label="仓库名称" prop="name">
      <ht-input
        v-model="formData.name"
        class="switch-focus focus-name"
        maxlength="10"
        @intput-enter="debouncedHandleInputEnter"
      />
    </el-form-item>

    <el-form-item label="仓储公司" prop="storageCompanyId">
      <ht-autoselect
        v-model="formData.storageCompanyId"
        :options="store().allCompanies()"
        :trigger-on-focus="false"
        class="switch-focus"
        placeholder="请选择公司"
        clearable
        filter-zero
        highlight-first-item
        @intput-enter="debouncedHandleInputEnter"
      />
    </el-form-item>
    <el-form-item label="所属区域" prop="areaIds">
      <area-select v-model="formData.areaIds" />
    </el-form-item>
    <el-form-item label="详细地址" prop="address">
      <ht-input
        v-model="formData.address"
        class="switch-focus"
        maxlength="50"
        @intput-enter="debouncedHandleInputEnter"
      />
    </el-form-item>
    <el-form-item label="收货人姓名" prop="receiver">
      <ht-input
        v-model="formData.receiver"
        class="switch-focus"
        maxlength="10"
        @intput-enter="debouncedHandleInputEnter"
      />
    </el-form-item>
    <el-form-item label="收货人电话" prop="phone">
      <ht-input
        v-model="formData.phone"
        class="switch-focus"
        @intput-enter="debouncedHandleInputEnter"
      />
    </el-form-item>
    <el-form-item label="拣货篮数量" prop="basketCount">
      <ht-input
        v-model.number="formData.basketCount"
        class="switch-focus"
        placeholder="0-10000"
        @intput-enter="debouncedHandleInputEnter"
      />
    </el-form-item>
    <el-form-item label="是否外部仓库">
      <div class="switch-focus">
        <el-switch v-model="formData.isOuterWarehouse" />
      </div>
    </el-form-item>
    <el-form-item label="备注">
      <ht-input
        v-model="formData.remark"
        class="switch-focus"
        type="textarea"
        maxlength="200"
      />
    </el-form-item>
    <el-form-item v-if="showDisableReason" label="停用原因">
      <ht-input
        v-model="formData.reason"
        class="switch-focus"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
<script>
import { AreaSelect } from "@/components/select";
import { validatePhone } from "@/utils/validate";
import { reqStoreAddress, reqStoreBaseInfo } from "@/api/store/settings";
import debounce from "throttle-debounce/debounce";
import eventBus from "@/event";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";
export default {
  name: "WarehouseForm",
  components: { AreaSelect },
  mixins: [searchMixin],
  props: {
    id: {
      type: Number,
      default: 0
    },
    showDisableReason: {
      type: Boolean,
      default: true
    }
  },
  data() {
    // 自定义- 校验telphone(必须)
    const validatorNeedPhone = (rule, value, callback) => {
      if (validatePhone(value)) {
        callback();
      } else {
        // 需要返回错误信息
        callback(new Error(rule.message));
      }
    };
    return {
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        updateIndex: 0,
        initial: "focus-name",
        type: null
      },
      formDisabled: false,
      formData: {
        basketCount: 50,
        areaIds: null,
        isOuterWarehouse: false
      },
      rules: {
        name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
        storageCompanyId: [
          { required: true, message: "请选择所属仓储公司", trigger: "change" }
        ],
        basketCount: [
          {
            type: "number",
            min: 0,
            max: 10000,
            message: "拣货篮数量在0-10000之间",
            trigger: "blur"
          }
        ],
        areaIds: [{ required: true, message: "请选择地址", trigger: "change" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        phone: [
          {
            required: true,
            validator: validatorNeedPhone,
            trigger: "blur",
            message: "请输入正确的电话号码"
          }
        ],
        receiver: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    id(val) {
      // this.formData = val.data;
      this.updateWarehouseInfo(val);
    }
  },
  mounted() {
    this.updateWarehouseInfo(this.id);
    eventBus.$on("infoFormFocus", this.focus);
    eventBus.$on("warehouseFormKeyup", this.bindHotkeys);
  },
  destroyed() {
    eventBus.$off("infoFormFocus", this.focus);
    eventBus.$off("warehouseFormKeyup", this.bindHotkeys);
  },
  methods: {
    store() {
      return store;
    },
    focus() {
      this.updateFocusData({ initial: "focus-name" });
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    bindHotkeys(e) {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          this.updateFocusData({ type: "up" });
          break;
        case "ArrowDown":
          this.updateFocusData({ type: "down" });
          break;
        default:
          break;
      }
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    updateWarehouseInfo(id) {
      if (id == 0) {
        return;
      }
      this.formDisabled = true;
      this.$refs["formRef"].clearValidate();

      reqStoreBaseInfo(id).then(baseData => {
        reqStoreAddress(baseData.addressId).then(data => {
          delete data.id;
          delete data.areaNames;
          this.formData = { ...baseData, ...data };
          if (
            (baseData && baseData.flags === 2) ||
            (baseData && baseData.flags === 3)
          ) {
            this.formDisabled = true;
          } else {
            this.formDisabled = false;
          }
          this.$nextTick(() => {
            this.$refs["formRef"] && this.$refs["formRef"].clearValidate();
          });
        });
      });
    },
    validate(cb) {
      this.$refs["formRef"].validate(cb);
    },
    resetCleanForm() {
      this.$refs["formRef"].resetFields();
    }
  }
};
</script>
<style lang="stylus" scoped>
.warehouse-edit
    width 300px
</style>
