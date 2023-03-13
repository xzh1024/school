<template>
  <el-dialog
    class="package-single-dialog"
    title="关联套餐"
    :visible.sync="visible"
    v-loading="loading"
    :close-on-click-modal="false"
    append-to-body
    width="1242px"
    @close="close"
  >
    <PackageSearch
      :formData="formData"
      @handleQuery="handleQuery"
      @handleReset="handleReset"
    >
    </PackageSearch>
    <PackageTable
      ref="packageTable"
      :notBatch="true"
      :formData="formData"
      @handleQueryAll="handleConfirm"
    >
    </PackageTable>
  </el-dialog>
</template>

<script>
import PackageSearch from './packageSearch.vue';
import PackageTable from './packageTable.vue';

const defaultFormData = {
  type: 2, // 类型 0:零配件;1:服务项目;2:项目套餐
  keyword: '', // 项目编码/名称/卖点等关键字
  category: '', // 套餐类型
  priceType: '0', // 价格类型 1.等于 2.大于 3.小于 0.查询全部
  priceValue: '', // 价格数值
  onlineSale: 0, // 是否允许线上售卖 1.是 2.否 0.全部
  uploadImage: 0, // 图片上传情况 1.已上传 2.未上传 0.全部
};

export default {
  name: 'PackageSingleDialog',
  components: {
    PackageSearch,
    PackageTable,
  },
  props: {
    now: Object,
  },
  data() {
    return {
      visible: true,
      loading: false,
      formData: JSON.parse(JSON.stringify(defaultFormData)),
    };
  },
  methods: {
    handleConfirm(goods) {
      const now = this.now;
      const nowInternalLink = now.internalLink;
      nowInternalLink.name = now.parentPage.name;
      nowInternalLink.code = now.parentPage.code;
      nowInternalLink.sub || (nowInternalLink.sub = {});
      // nowInternalLink.sub.goodsType = now.page.goodsType;
      nowInternalLink.sub.name = now.page.name;
      nowInternalLink.sub.code = now.page.code;
      nowInternalLink.sub.skuId = goods.id;
      nowInternalLink.sub.skuName = goods.name;
      nowInternalLink.visible = false;
      this.close();
    },
    handleQuery() {
      this.$refs.packageTable.handleQuery();
    },
    handleReset() {
      this.formData = JSON.parse(JSON.stringify(defaultFormData));
    },
    close() {
      this.$emit('hide');
    },
  },
};
</script>

<style lang="less" scoped>
.package-single-dialog {
  .form-search {
    padding-bottom: @padding-size-secondary;
  }
  .package-table {
    padding: 0;
  }
}
</style>
