<template>
  <layout-main>
    <div slot="main" class="setup-component hz-container">
      <div class="ht-header">
        <el-button type="primary" size="mini">
          保存
        </el-button>
      </div>
      <div class="ht-main">
        <el-row :gutter="50">
          <el-col :span="10">
            <ht-card title="库存展示">
              <el-button type="primary" size="mini" plain slot="after-title"
                >+添加</el-button
              >
            </ht-card>
          </el-col>
          <el-col :span="14">
            <ht-card title="价格展示"> </ht-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </layout-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import layoutMain from "@/components/layout/layoutMain.vue";
import HtCard from "@/components/ht-card";

@Component({
  name: "Setup",
  components: {
    layoutMain,
    HtCard
  }
})
export default class Setup extends Vue {}
</script>

<style lang="scss" scoped>
.setup-component {
  .ht-header {
    margin-bottom: 2px;
  }
  .after-title {
    .el-button {
      position: absolute;
      top: 5px;
      margin-left: 8px;
    }
  }
}
</style>
