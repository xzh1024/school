<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    append-to-body
    title="设置查件权限"
    width="500px"
  >
    <div style="text-align: center;">
      <el-radio-group v-model="search">
        <el-radio :label="true">可查件</el-radio>
        <el-radio :label="false">不可查件</el-radio>
      </el-radio-group>
    </div>

    <div style="margin-top: 20px; text-align: center;">
      <el-button
        plain
        type="danger"
        size="mini"
        @click="cancelHandle"
      >取消</el-button>
      <el-button
        plain
        type="primary"
        size="mini"
        @click="saveHandle"
      >保存</el-button>
      <el-button
        plain
        size="mini"
        @click="saveToSetPriceHandle"
      >保存并设置价格</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { PollablePartsSettingApi } from './services'
const pollablePartsSettingApi = new PollablePartsSettingApi();

export default {
  name: "SearchPermSetBox",
  props: {
    searchData:{
      required: true
    },
    selectedRows: {
      type: Array,
      required: true
    },
    customerType: {
      required: true
    },
    customerId: {
      required: true
    }
  },
  data() {
    return {
      search: undefined
    };
  },
  watch: {
    "$attrs.visible"(val) {
      if (val) {
        this.search = this.selectedRows.length === 1
          ? this.selectedRows[0].canSearch
          : undefined;
      }
    }
  },
  methods: {
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    saveHandle() {
      this.saveReq();
    },
    saveReq() {
      let params = {
        search: this.search,
        allSku: this.selectedRows.length ? false : true,
        skuIds: this.selectedRows.map(item => item.skuId),
        customerId: this.customerId,
        customerType: this.customerType,
        allSkuCond:this.searchData
      }
      return pollablePartsSettingApi.customerUpsert(params)
      .then(() => {
        this.$message.success({ message: "保存成功!", showClose: true });
        this.$emit("success");
        this.cancelHandle();
      })
      .catch(res => {
        this.$message.error({ message: res, showClose: true });
      })
      
    },
    saveToSetPriceHandle() {
      this.saveReq().then(() => {
        this.$emit("price-type-set");
      })
    }
  },
}
</script>