<template>
  <el-dialog
    class="dialog-base"
    title="选择零配件"
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
      :notEdit="notEdit"
      :formData="formData"
      @submit="submit"
      @handleQueryAll="handleQueryAll"
    >
    </PartsTable>
    <PartsTable
      ref="partsTableInclude"
      :notEdit="notEdit"
      type="include"
      :formData="formData"
      @submit="submit"
      @handleQueryAll="handleQueryAll"
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
  include: false, // 查询包含商品，true:查询指定的商品;false:查询排除指定的商品
  // ids: [], // 商品ID数组
  respType: '0', // 返回数据类型,不传或0:商品所有信息;1:只返回商品ID
  swCategory: '', // 配件分类
};

export default {
  name: 'PartsDialog',
  components: {
    PartsSearch,
    PartsTable,
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    notEdit: {
      type: Boolean,
    },
  },
  data() {
    return {
      visible: true,
      loading: false,
      formData: JSON.parse(JSON.stringify(defaultFormData)),
    };
  },
  created() {
    this.formData.ids = this.list;
  },
  methods: {
    submit() {
      const list = this.list;
      list.splice(0, list.length, ...this.formData.ids);
      this.handleQueryAll();
    },
    handleQueryAll() {
      this.$refs.partsTable.handleQuery();
      this.$refs.partsTableInclude.handleQuery();
    },
    handleQuery() {
      this.$refs.partsTable.handleQuery();
    },
    handleReset() {
      // 重置时不能覆盖ids
      Object.assign(this.formData, JSON.parse(JSON.stringify(defaultFormData)));
    },
    close() {
      this.$emit('hide');
    },
  },
};
</script>

<style lang="less" scoped>
.dialog-base {
  .form-search {
    padding: @padding-size-secondary;
  }
}
</style>
