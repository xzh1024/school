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
        <el-col :span="5">
          <span class="table-label">配件编码：</span>
          <span class="table-value" :title="info.swOeCode">
            {{ info.swOeCode }}
          </span>
        </el-col>
        <el-col :span="5">
          <span class="table-label">配件名称：</span>
          <span class="table-value" :title="info.swOeName">
            {{ info.swOeName }}
          </span>
        </el-col>
        <el-col :span="4">
          <span class="table-label">性质：</span>
          <span class="table-value" :title="info.property">
            {{ info.property }}
          </span>
        </el-col>
        <el-col :span="4">
          <span class="table-label">库存数量：</span>
          <span class="table-value" :title="info.qty">{{ info.qty }}</span>
        </el-col>
        <el-col :span="3">
          <span class="table-label">零售价：</span>
          <span class="table-value" :title="info.priceRetail">
            {{ info.priceRetail }}
          </span>
        </el-col>
        <el-col :span="3">
          <span class="table-label">批价二：</span>
          <span class="table-value" :title="info.priceP2">
            {{ info.priceP2 }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="5">
          <span class="table-label">标准件号：</span>
          <span class="table-value" :title="info.stdOeCode">
            {{ info.stdOeCode }}
          </span>
        </el-col>
        <el-col :span="5">
          <span class="table-label">标准名称：</span>
          <span class="table-value" :title="info.stdName">
            {{ info.stdName }}
          </span>
        </el-col>
        <el-col :span="4">
          <span class="table-label">产地：</span>
          <span class="table-value" :title="info.swProductionPlace">
            {{ info.swProductionPlace }}
          </span>
        </el-col>
        <el-col :span="4">
          <span class="table-label">锁定数：</span>
          <span class="table-value" :title="info.lockedQty">
            {{ info.lockedQty }}
          </span>
        </el-col>
        <el-col :span="3">
          <span class="table-label">平台价：</span>
          <span class="table-value" :title="info.priceAlliance">
            {{ info.priceAlliance }}
          </span>
        </el-col>
        <el-col :span="3">
          <span class="table-label">批价三：</span>
          <span class="table-value" :title="info.priceP3">
            {{ info.priceP3 }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="5">
          <span class="table-label">生产码：</span>
          <span class="table-value" :title="info.swManuCode">
            {{ info.swManuCode }}
          </span>
        </el-col>
        <el-col :span="5">
          <span class="table-label">原厂名称：</span>
          <span class="table-value" :title="info.oeName">
            {{ info.oeName }}
          </span>
        </el-col>
        <el-col :span="4">
          <span class="table-label">规格：</span>
          <span class="table-value" :title="info.swModel">
            {{ info.swModel }}
          </span>
        </el-col>
        <el-col :span="4">
          <span class="table-label">可订货数量：</span>
          <span class="table-value" :title="info.canOrderQty">
            {{ info.canOrderQty }}
          </span>
        </el-col>
        <el-col :span="3">
          <span class="table-label">批发价：</span>
          <span class="table-value" :title="info.priceP">
            {{ info.priceP }}
          </span>
        </el-col>
        <el-col :span="3">
          <span class="table-label">批价四：</span>
          <span class="table-value" :title="info.priceP4">
            {{ info.priceP4 }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="5">
          <span class="table-label">配件品牌：</span>
          <span class="table-value" :title="info.swBrand">
            {{ info.swBrand }}
          </span>
        </el-col>
        <el-col :span="5">
          <span class="table-label">汽车品牌：</span>
          <span class="table-value" :title="info.vehBrand">
            {{ info.vehBrand }}
          </span>
        </el-col>
        <el-col :span="4">
          <span class="table-label">配件类别：</span>
          <span class="table-value" :title="info.partType">
            {{ info.partType }}
          </span>
        </el-col>

        <el-col :span="4">
          <span class="table-label">配件分类：</span>
          <span class="table-value" :title="info.swCategory">
            {{ info.swCategory }}
          </span>
        </el-col>
        <el-col :span="3">
          <span class="table-label">批价一：</span>
          <span class="table-value" :title="info.priceP1">
            {{ info.priceP1 }}
          </span>
        </el-col>

        <el-col :span="3">
          <span class="table-label">单位：</span>
          <span class="table-value" :title="info.swUnitName">
            {{ info.swUnitName }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="5">
          <span class="table-label">划线价：</span>
          <span class="table-value" :title="info.linePrice">{{ info.linePrice }}</span>
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
      <el-row :gutter="16">
        <el-col :span="24">
          <span class="table-label">车型：</span>
          <span class="table-value" :title="info.swVehModel">
            {{ info.swVehModel }}
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="24">
          <span class="table-label">适用车型：</span>
          <span class="table-value" :title="info.vehSeries">
            {{ info.vehSeries }}
          </span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import NotAvailableImg from '@/assets/img/store/not-available.png';

export default {
  name: 'PartsTableExpand',
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
  height: 234px;
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
    overflow: hidden;
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
