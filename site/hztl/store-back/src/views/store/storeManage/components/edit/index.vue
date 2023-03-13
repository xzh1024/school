<template>
  <el-card
    class="box-card"
    shadow="never"
    v-if="editItem && editItem.component"
  >
    <template slot="header">
      <span class="title">{{ editItem.name }}</span>
      <el-tooltip
        v-if="editItem.name === '搜索'"
        class="item"
        effect="dark"
        placement="bottom"
      >
        <template slot="content">
          当前系统为您的店铺提供以下4种查询方式，可选择任意查询方式，并支持在下面的输入框中修改查询方式的名称（如：系统提供的查询方式为“OE号”，您可以将其名称改为“件号”或“配件编码”便于您的客户更好理解），您的客户只能通过你勾选的查询方式进行查询。
        </template>
        <i class="icon-Question-Circle-Fill"></i>
      </el-tooltip>
      <el-tooltip
        v-if="editItem.name === '商品目录'"
        class="item"
        effect="dark"
        placement="bottom"
      >
        <template slot="content">
          商品目录组件支持两级菜单的自定义创建，可点击【新增一级目录】按钮创建一个一级目录，在一级目录下点击【新增二级目录】按钮既在当前一级目录下创建二级目录，在二级目录上点击关联商品，既表示用户点击二级目录名称可查看此目录下关联的所有商品。
          注意：每一级目录不易创建过多，需思考清楚自己公司的商品分类的原则，或按品牌或按商品分类或按营销属性
        </template>
        <i class="icon-Question-Circle-Fill"></i>
      </el-tooltip>
      <el-tooltip
        v-if="editItem.name === '商品区'"
        class="item"
        effect="dark"
        placement="bottom"
      >
        <template slot="content">
          <p>
            1、点击【新增商品区】创建一个商品专区，此区域关联的商品将直接展示在首页，可支持创建多个商品区
          </p>
          <p>2、商品区支持设置展示为横向或纵向</p>
          <p>
            若为横向排布则多个商品区的名称将横向排布，点击个商品区的名称可切换
          </p>
          <p>若为纵向排布则直接按商品区的顺序从上往下排列</p>
          <p>
            3、关联门店：点击关联门店后客户在当前区域查件下单时可支持到此区域指定的门店预约服务
          </p>
        </template>
        <i class="icon-Question-Circle-Fill"></i>
      </el-tooltip>
    </template>
    <component
      :ref="editItem.component"
      :is="editItem.component"
      :data="editItem.detail"
      :setting="editItem.setting"
      :previewList="previewList"
      @updatePreviewList="updatePreviewList"
    ></component>
  </el-card>
</template>

<script>
import PageSetup from "./pageSetup.vue";
import ComponentManage from "./componentManage.vue";
import SearchSetting from "./searchSetting.vue";
import BannerSetting from "./bannerSetting.vue";
import ProListSetting from "./proListSetting.vue";
import ProAreaSetting from "./proAreaSetting.vue";
import CompanySetting from "./companySetting.vue";
import AnnouncementSetting from "./announcementSetting.vue";
import InquirySetting from "./inquirySetting.vue";
import DynamicSetting from "./dynamicSetting.vue";
import CouponSetting from "./couponSetting.vue";

export default {
  components: {
    PageSetup,
    ComponentManage,
    SearchSetting,
    BannerSetting,
    ProListSetting,
    ProAreaSetting,
    CompanySetting,
    AnnouncementSetting,
    InquirySetting,
    DynamicSetting,
    CouponSetting
  },
  props: {
    editItem: Object,
    previewList: Array
  },
  methods: {
    updatePreviewList(list) {
      this.$emit("updatePreviewList", list);
    }
  }
};
</script>

<style lang="less" scoped>
.el-card {
  border: none;
  /deep/ .el-card__header {
    border-bottom: none;
    padding: 0;
    .title {
      flex: 1;
      font-size: 16px;
      font-weight: @strong;
    }
    .icon-Question-Circle-Fill {
      margin-left: @margin-size-secondary;
      font-size: 16px;
      color: @color-warning;
      cursor: pointer;
    }
  }
  /deep/ .el-card__body {
    margin-top: @margin-size-main;
    padding: 0;
  }
}
</style>
