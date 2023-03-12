<template>
  <ht-dialog
    :show-close="true"
    v-bind="$attrs"
    v-on="$listeners"
    width="330px"
    :title="showTitle"
    @close="resetForm"
  >
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
      class="form-item-small-margin-bottom warehouse-edit form"
    >
      <el-form-item label="仓库名称" prop="name">
        <ht-input
          v-model="formData.name"
          class="switch-focus focus-name"
          maxlength="10"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <!-- <el-form-item label="仓库类型" prop="isOuterWarehouse">
        <el-radio-group v-model="formData.isOuterWarehouse">
          <el-radio :label="false">自有仓库</el-radio>
          <el-radio :label="true">外部仓库</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="仓储公司" prop="storageCompanyId">
        <ht-autoselect
          v-model="formData.storageCompanyId"
          :options="store().allCompanies()"
          :trigger-on-focus="false"
          class="switch-focus focus-storageCompanyId"
          placeholder="请选择公司"
          clearable
          filter-zero
          highlight-first-item
          @intput-enter="debouncedHandleInputEnter"
        />
        <!-- <ht-input
          v-else
          v-model="formData.storageCompanyName"
          class="switch-focus focus-storageCompanyName"
          maxlength="10"
          @intput-enter="debouncedHandleInputEnter"
        /> -->
      </el-form-item>
      <el-form-item label="所属区域" prop="areaIds">
        <area-select v-model="formData.areaIds" />
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <ht-input
          v-model="formData.address"
          class="switch-focus focus-address"
          maxlength="50"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="收货人" prop="receiver">
        <ht-input
          v-model="formData.receiver"
          class="switch-focus focus-receiver"
          maxlength="10"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="收货人电话" prop="phone">
        <ht-input
          v-model="formData.phone"
          class="switch-focus focus-phone"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item label="备注">
        <ht-input
          v-model="formData.remark"
          class="switch-focus focus-remark"
          type="textarea"
          maxlength="200"
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer-align" style="margin-top: 10px">
      <el-button type="primary" size="mini" plain @click="submitAdd">
        确定（F3）
      </el-button>
      <el-button type="primary" size="mini" plain @click="close">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { reqStoreAdd, reqStoreUpdate } from "@/api/store/settings";
import { reqStoreBaseInfo } from "@/api/store/settings";
import { AreaSelect } from "@/components/select";
import { validatePhone } from "@/utils/validate";
import debounce from "throttle-debounce/debounce";
import { searchMixin } from "@/mixins";
import { mapState } from "vuex";
import TopHotkeys from "@/mixins/hotkeyMixin/TopHotkeys";
import * as store from "@/utils/store";

const topHotkeys = new TopHotkeys();
const defaultFormData = {
  basketCount: 50,
  areaIds: null,
  isOuterWarehouse: false
};

export default {
  name: "AddWarehouse",
  inject: ["laodData"],
  components: {
    AreaSelect
  },
  mixins: [searchMixin],
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
      dialogKeyScope: Symbol("AddWarehouseDialog"),
      focusData: {
        updateIndex: 0,
        initial: "focus-name",
        type: null
      },
      formDisabled: false,
      formData: {
        ...defaultFormData
      },
      rules: {
        name: [{ required: true, message: "请输入仓库名称", trigger: "blur" }],
        // isOuterWarehouse: [
        //   { required: true, message: "请选择仓库类型", trigger: "change" }
        // ],
        storageCompanyId: [
          { required: true, message: "请选择所属仓储公司", trigger: "change" }
        ],
        // storageCompanyName: [
        //   { required: true, message: "请选择输入仓储公司", trigger: "blur" }
        // ],
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
  props: {
    editId: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState("admin/warehouseSettings", ["warehousesInfo"]),
    showTitle() {
      return this.editId !== 0 ? "编辑仓库" : "新增仓库";
    }
  },
  watch: {
    "$attrs.visible"(now) {
      if (now) {
        topHotkeys.bindHotkeys(this.$el);
        setTimeout(() => {
          this.$refs.formRef.clearValidate();
          this.updateFocusData({
            initial: "focus-name"
          });
        }, 100);
        this.loadDetail();
      } else {
        topHotkeys.unbindHotkeys(this.$el);
      }
    }
  },
  methods: {
    store() {
      return store;
    },
    loadDetail() {
      if (this.editId) {
        reqStoreBaseInfo(this.editId).then(res => {
          this.formData = res;
        });
      } else {
        this.formData = { ...defaultFormData };
      }
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    close() {
      this.$refs.formRef.resetFields();
      this.$emit("update:visible", false);
    },
    resetForm() {
      this.$refs.formRef.resetFields();
      this.$emit("update:visible", false);
    },
    submitAdd() {
      const formRef = this.$refs.formRef;
      formRef.validate((val, err) => {
        if (val) {
          const reqData = { ...this.formData };
          reqData.areaId = reqData.areaIds[2]
            ? reqData.areaIds[2]
            : reqData.areaIds;
          delete reqData.areaIds;
          if (reqData.id) {
            reqStoreUpdate(reqData)
              .then(() => {
                this.$message.success({ message: "保存成功" });
                this.$emit("success", this.formData);
                this.close();
              })
              .catch();
          } else {
            reqStoreAdd(reqData)
              .then(() => {
                this.$message.success({ message: "新增仓库 " + reqData.name });
                this.$emit("success", this.formData);
                this.close();
              })
              .catch();
          }
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.form
    margin 0 auto
    /deep/.el-form-item__label
        text-align: right !important;
</style>
