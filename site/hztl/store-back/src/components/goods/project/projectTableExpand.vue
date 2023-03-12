<template>
  <div class="table-expand" v-loading="row.loading">
    <div class="table-expand-left">
      <el-image
        :z-index="3000"
        style="display: table-cell; width: 80px; height: 80px"
        :src="info.images ? info.images[0] : ''"
        :preview-src-list="info.images ? [info.images[0]] : []"
      >
        <img slot="error" class="not-available-img" :src="NotAvailableImg" />
      </el-image>
    </div>
    <div class="table-expand-right">
      <el-row :gutter="16">
        <el-col :span="6">
          <span class="table-label">项目编码：</span>
          <span class="table-value" :title="info.code">
            {{ info.code }}
          </span>
        </el-col>
        <el-col :span="6">
          <span class="table-label">项目名称：</span>
          <span class="table-value" :title="info.name">
            {{ info.name }}
          </span>
        </el-col>
        <el-col :span="6">
          <span class="table-label">项目分类：</span>
          <span class="table-value" :title="info.category">
            {{ info.category }}
          </span>
        </el-col>
        <el-col :span="6">
          <span class="table-label">是否允许线上售卖：</span>
          <span class="table-value">
            {{ info.notOnlineSale ? '否' : '是' }}
          </span>
        </el-col>
        <el-col :span="6">
          <span class="table-label">线上售价：</span>
          <span class="table-value" :title="info.price">{{ info.price }}</span>
        </el-col>
        <el-col :span="6">
          <span class="table-label">划线价：</span>
          <span class="table-value" :title="info.linePrice">{{ info.linePrice }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="16" v-if="info.showPrices">
        <el-col :span="6" v-for="(item, index) in info.showPrices" :key="index">
          <span class="table-label">{{ `${item.name}：` }}</span>
          <span class="table-value" :title="item.value">
            {{ item.value }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="24">
          <span class="table-label">卖点：</span>
          <span class="table-value" :title="info.description">
            {{ info.description }}
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import NotAvailableImg from '@/assets/img/store/not-available.png';

export default {
  name: 'ProjectTableExpand',
  props: {
    row: Object,
  },
  computed: {
    info() {
      return this.row.info || {};
    },
  },
  data() {
    return {
      NotAvailableImg,
    };
  },
};
</script>

<style lang="less" scoped>
.table-expand {
  width: 100%;
  box-sizing: border-box;
  padding: @padding-size-main;
  background-color: @bg-color-base;
  overflow: hidden;
  display: flex;
  .table-expand-left {
    box-sizing: border-box;
    width: 96px;
    height: 96px;
    margin-right: @margin-size-main;
    padding: @padding-size-secondary;
    border: 1px solid @border-color-base;
    background-color: #ffffff;
  }
  .table-expand-right {
    flex: 1;
    .el-row {
      .el-col {
        margin-bottom: @margin-size-secondary;
        height: 22px;
        line-height: 22px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .table-label {
          color: @text-color-secondary;
        }
      }
    }
  }
}
</style>
