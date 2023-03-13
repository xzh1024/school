<template>
  <el-dialog
    class="dialog-base"
    title="选择服务项目"
    :visible.sync="visible"
    v-loading="loading"
    :close-on-click-modal="false"
    append-to-body
    width="1242px"
    @close="close"
  >
    <ProjectSearch
      :formData="formData"
      @handleQuery="handleQuery"
      @handleReset="handleReset"
    >
    </ProjectSearch>
    <ProjectTable
      ref="projectTable"
      :notEdit="notEdit"
      :formData="formData"
      @submit="submit"
      @handleQueryAll="handleQueryAll"
    >
    </ProjectTable>
    <ProjectTable
      ref="projectTableInclude"
      type="include"
      :notEdit="notEdit"
      :formData="formData"
      @submit="submit"
      @handleQueryAll="handleQueryAll"
    >
    </ProjectTable>
  </el-dialog>
</template>

<script>
import ProjectSearch from './projectSearch.vue';
import ProjectTable from './projectTable.vue';

const defaultFormData = {
  type: 1, // 类型 0:零配件;1:服务项目;2:项目套餐
  keyword: '', // 项目编码/名称/卖点等关键字
  category: '', // 分类编码
  priceType: '0', // 价格类型 1.等于 2.大于 3.小于 0.查询全部
  priceValue: '', // 价格数值
  onlineSale: 0, // 是否允许线上售卖 1.是 2.否 0.全部
  uploadImage: 0, // 图片上传情况 1.已上传 2.未上传 0.全部
  include: false, // 查询包含商品，true:查询指定的商品;false:查询排除指定的商品
  // ids: [], // 商品ID数组
  respType: '0', // 返回数据类型,不传或0:商品所有信息;1:只返回商品ID
};

export default {
  name: 'ProjectDialog',
  components: {
    ProjectSearch,
    ProjectTable,
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
      this.$refs.projectTable.handleQuery();
      this.$refs.projectTableInclude.handleQuery();
    },
    handleQuery() {
      this.$refs.projectTable.handleQuery();
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
