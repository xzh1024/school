<template>
  <el-form
    :model="formData"
    :show-message="false"
    class="form-item-small-margin-bottom"
    label-position="left"
    label-width="60px"
    size="mini"
  >
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item label="对账日期" prop="billDate">
          <el-date-picker
            v-model="formData.billDate"
            disabled
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
            @change="updateHeader"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item
          label-width="75px"
          label="预结算日期"
          prop="preClearingDate"
        >
          <el-date-picker
            v-model="formData.preClearingDate"
            :disabled="!canEdit"
            placeholder="请选择日期"
            value-format="yyyy-MM-dd"
            @change="updateHeader"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label-width="45px" label="经办人" prop="handledBy">
          <ht-autoselect
            v-model="formData.handledBy"
            v-delay-focus="autoFocus"
            :disabled="!canEdit"
            :options="store().allStaffs()"
            :default-value.sync="formData.handledByName"
            :trigger-on-focus="false"
            placeholder="请选择"
            clearable
            filter-zero
            highlight-first-item
            @change="updateHeader"
          />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="对方对账" prop="peerPaymenter">
          <ht-input
            v-model="formData.peerPaymenter"
            :disabled="!canEdit"
            maxlength="50"
            @change="updateHeader"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item label="备注" prop="remark">
        <ht-input
          v-model="formData.remark"
          :disabled="!canEdit"
          maxlength="200"
          @change="updateHeader"
        />
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

const defaultFormData = {
  billDate: "",
  preClearingDate: "",
  handledBy: null,
  handledByName: "",
  peerPaymenter: "",
  remark: ""
};

export default {
  name: "HeaderForm",
  mixins: [searchMixin],
  props: {
    header: {
      type: Object,
      default() {
        return {};
      }
    },
    canEdit: Boolean,
    autoFocus: Boolean
  },
  data() {
    return {
      formData: { ...defaultFormData }
    };
  },
  watch: {
    header: {
      handler() {
        this.formData = {
          ...defaultFormData,
          ...this.header
        };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    store() {
      return store;
    },
    updateHeader() {
      this.$nextTick(() => {
        this.$emit("change", this.formData);
      });
    }
  }
};
</script>
