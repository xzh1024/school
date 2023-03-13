<template>
  <SearchTemplate
    :formData="formData"
    placeholderText="配件名称/编码/规格/车型/生产码等关键字"
    labelWidth="80px"
    @handleQuery="handleQuery"
    @handleReset="handleReset"
  >
    <el-button
      v-if="isShelvesButton"
      slot="right"
      type="primary"
      plain
      size="small"
      @click="goShelves"
    >
      去上下架配件
    </el-button>
    <template slot="more">
      <el-form-item label="配件分类">
        <el-input
          v-model.trim="formData.swCategory"
          clearable
          placeholder="配件分类"
        ></el-input>
      </el-form-item>
      <el-form-item label="配件类别">
        <el-input
          v-model.trim="formData.partType"
          clearable
          placeholder="配件类别"
        ></el-input>
      </el-form-item>
      <el-form-item label="配件品牌">
        <el-input
          v-model.trim="formData.brand"
          clearable
          placeholder="配件品牌"
        ></el-input>
      </el-form-item>
      <el-form-item label="配件属性">
        <el-input
          v-model.trim="formData.partProperty"
          clearable
          placeholder="配件属性"
        ></el-input>
      </el-form-item>
      <el-form-item label="产地">
        <el-input
          v-model.trim="formData.productionPlace"
          clearable
          placeholder="产地"
        ></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-select v-model="formData.image">
          <el-option
            v-for="item in imageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标准化">
        <el-select v-model="formData.cleaned">
          <el-option
            v-for="item in cleanedOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="汽车品牌">
        <el-input
          v-model.trim="formData.vehBrand"
          clearable
          placeholder="汽车品牌"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input
          class="input-with-select"
          v-model.trim="formData.priceValue"
          clearable
          placeholder="金额"
        >
          <el-select
            slot="prepend"
            v-model="formData.priceField"
            placeholder="请选择"
          >
            <el-option
              v-for="item in priceFieldOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            slot="prepend"
            v-model="formData.priceType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in priceTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="库存">
        <el-input
          class="input-with-select"
          v-model.trim="formData.qtyValue"
          clearable
          placeholder="数量"
        >
          <el-select
            slot="prepend"
            v-model="formData.qtyField"
            placeholder="请选择"
          >
            <el-option
              v-for="item in qtyFieldOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            slot="prepend"
            v-model="formData.qtyType"
            placeholder="请选择"
          >
            <el-option
              v-for="item in qtyTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>
    </template>
  </SearchTemplate>
</template>

<script>
import SearchTemplate from '@/components/search/SearchTemplate.vue';

export default {
  name: 'PartsSearch',
  components: {
    SearchTemplate,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    isShelvesButton: {
      type: Boolean,
    },
  },
  data() {
    return {
      zeroPriceList: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '是',
        },
        {
          value: '2',
          label: '否',
        },
      ],
      priceFieldOptions: [
        {
          value: 'retail',
          label: '零售价',
        },
        {
          value: 'alliance',
          label: '平台价',
        },
        {
          value: 'p',
          label: '批发价',
        },
        {
          value: 'p1',
          label: '批发价一',
        },
        {
          value: 'p2',
          label: '批发价二',
        },
        {
          value: 'p3',
          label: '批发价三',
        },
        {
          value: 'p4',
          label: '批发价四',
        },
      ],
      priceTypeOptions: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '等于',
        },
        {
          value: '2',
          label: '大于',
        },
        {
          value: '3',
          label: '小于',
        },
        {
          value: '4',
          label: '大于等于',
        },
        {
          value: '5',
          label: '小于等于',
        },
      ],
      // 库存字段 qty:实际库存;lockedQty:锁定库存;orderQty:可订货库存数量
      qtyFieldOptions: [
        {
          value: 'qty',
          label: '实际库存',
        },
        {
          value: 'lockedQty',
          label: '锁定库存',
        },
        {
          value: 'orderQty',
          label: '可订货库存数量',
        },
      ],
      // 库存对比类型 1,等于 2.大于 3.小于 4.大于等于 5.小于等于 0.查询全部
      qtyTypeOptions: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '等于',
        },
        {
          value: '2',
          label: '大于',
        },
        {
          value: '3',
          label: '小于',
        },
        {
          value: '4',
          label: '大于等于',
        },
        {
          value: '5',
          label: '小于等于',
        },
      ],
      imageOptions: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '已上传',
        },
        {
          value: '2',
          label: '未上传',
        },
      ],
      cleanedOptions: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '已标准化',
        },
        {
          value: '2',
          label: '未标准化',
        },
      ],
    };
  },
  methods: {
    handleQuery() {
      this.$emit('handleQuery');
    },
    handleReset() {
      this.$emit('handleReset');
    },
    // 去上下架配件
    goShelves() {
      if (window !== window.top) {
        window.top.postMessage({ type: 'jump-parameters' }, '*');
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .form-search {
  // padding: @padding-size-secondary @padding-size-secondary 0;
  background-color: #ffffff;
  .el-form-item {
    margin-bottom: 8px;
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
