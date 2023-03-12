<template>
  <SearchTemplate
    :formData="formData"
    placeholderText="项目编码/名称等关键字"
    labelWidth="80px"
    @handleQuery="handleQuery"
    @handleReset="handleReset"
  >
    <template slot="more">
      <el-form-item label="项目分类">
        <el-select v-model="formData.category" clearable>
          <el-option
            v-for="item in categoryList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="线上售价">
        <el-input
          class="clear-input-width"
          size="small"
          v-model="formData.priceValue"
          placeholder="金额"
        >
          <el-select
            v-model="formData.priceType"
            placeholder=""
            size="small"
            slot="prepend"
            style="width: 80px"
          >
            <el-option
              v-for="(item, index) in priceTypeList"
              :key="index"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="是否允许线上售卖" labelWidth="122px">
        <el-select v-model="formData.onlineSale">
          <el-option
            v-for="item in onlineSalesList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-select v-model="formData.uploadImage">
          <el-option
            v-for="item in uploadImageTypeList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </template>
  </SearchTemplate>
</template>

<script>
import SearchTemplate from '@/components/search/SearchTemplate.vue';
import { getGoodsCategory } from '@/api/goods';

export default {
  name: 'ProjectSearch',
  components: {
    SearchTemplate,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // 项目分类
      categoryList: [],
      priceTypeList: [
        {
          code: '0',
          name: '全部',
        },
        {
          code: '2',
          name: '大于',
        },
        {
          code: '1',
          name: '等于',
        },
        {
          code: '3',
          name: '小于',
        },
      ],
      // 是否允许线上售卖
      onlineSalesList: [
        {
          code: 0,
          name: '全部',
        },
        {
          code: 1,
          name: '是',
        },
        {
          code: 2,
          name: '否',
        },
      ],
      uploadImageTypeList: [
        {
          code: 0,
          name: '全部',
        },
        {
          code: 1,
          name: '已上传',
        },
        {
          code: 2,
          name: '未上传',
        },
      ],
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    handleQuery() {
      this.$emit('handleQuery');
    },
    handleReset() {
      this.$emit('handleReset');
    },
    getCategoryList() {
      getGoodsCategory({ type: this.formData.type }).then(res => {
        this.categoryList = res || [];
      });
    },
  },
};
</script>

<style lang="less" scoped>
.project-search {
  padding: @padding-size-secondary @padding-size-secondary 0;
  background-color: #ffffff;
  .el-form-item {
    margin-bottom: 8px;
  }
  /deep/ .input-with-select {
    display: flex;
    & > .el-input-group__prepend {
      width: 196px;
      padding: 0;
      & > .el-select {
        width: 98px;
        margin: 0;
        box-sizing: border-box;
        border-right: 1px solid #dcdfe6;
        &:last-child {
          border-right: none;
        }
        .el-input--small .el-input__inner {
          height: 30px;
          line-height: 30px;
        }
      }
    }
    & > .el-input__inner {
      flex: 1;
    }
  }
}
.el-button {
  .icon-Down,
  .icon-Up {
    font-size: 12px;
  }
  .el-icon-arrow-down,
  .el-icon-arrow-up {
    font-size: 12px;
  }
}
</style>
