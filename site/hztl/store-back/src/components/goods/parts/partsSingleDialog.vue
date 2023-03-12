<template>
  <el-dialog
    class="parts-single-dialog"
    title="关联零配件"
    :visible.sync="visible"
    v-loading="loading"
    :close-on-click-modal="false"
    append-to-body
    width="1200px"
    @close="close"
  >
    <PartsSearch
      :formData="formData"
      @handleQuery="handleQuery"
      @handleReset="handleReset"
    >
    </PartsSearch>
    <PartsTable
      ref="partsTable"
      :notBatch="true"
      :formData="formData"
      @handleQueryAll="handleConfirm"
    >
    </PartsTable>
  </el-dialog>
</template>

<script>
import PartsSearch from './partsSearch.vue';
import PartsTable from './partsTable.vue';

const defaultFormData = {
  type: 0, // 0:零配件;1:服务项目;2:项目套餐
  keyword: '', // 配件名称/编码/规格/车型/生产码等关键字
  partType: '', // 配件类别
  productionPlace: '', // 产地
  vehBrand: '', // 汽车品牌
  brand: '', // 配件品牌
  priceField: 'retail', // 价格字段 零售价:retail;平台价:alliance;批发价:p;批发价一:p1;批发价二:p2;批发价三:p3;批发价四:p4
  priceType: '0', // 价格对比类型 1,等于 2.大于 3.小于 4.大于等于 5.小于等于 0.查询全部
  priceValue: '', // 价格值
  partProperty: '', // 配件属性
  qtyField: 'qty', // 库存字段 qty:实际库存;lockedQty:锁定库存;orderQty:可订货库存数量
  qtyType: '0', // 库存对比类型 1,等于 2.大于 3.小于 4.大于等于 5.小于等于 0.查询全部
  qtyValue: '', // 库存数量
  image: '0', // 图片上传情况 1.已上传 2.未上传 0.全部
  cleaned: '0', // 标准化 1.已标准化 2.未标准化 0.查询全部
  swCategory: '', // 配件分类
};

export default {
  name: 'PartsSingleDialog',
  components: {
    PartsSearch,
    PartsTable,
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
      this.$refs.partsTable.handleQuery();
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
.parts-single-dialog {
  .form-search {
    padding-bottom: @padding-size-secondary;
  }
  .parts-table {
    padding: 0;
  }
}
</style>
