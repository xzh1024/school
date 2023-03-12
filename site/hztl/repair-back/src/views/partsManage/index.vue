<template>
  <div class="layout-container" v-if="visible">
    <ht-tabs
      v-model="activeTab"
      :tabs="tabs"
      class="tabs-primary tabs-large"
      @change="changeTab"
    />
    <div class="layout-main m-main"><components :is="activeTab" /></div>
    <el-button
          type="primary"
          size="mini"
          round
          class="gradients-button"
          @click="m8"
        >
          去配修社区首页
        </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import LayoutMain from "@/components/layout/layoutMain.vue";
import Parameters from "./parameters/index.vue";
import Shelves from "./shelves/index.vue";
import { TabModel } from "@/common/interface/commonInterface";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");
import TabChangeMixin from "@/common/mixins/tabChangeMixin";

@Component({
  name: "Commodity",
  components: {
    LayoutMain,
    Parameters,
    Shelves
  }
})
export default class Commodity extends Mixins(TabChangeMixin) {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;

  protected visible = false;

  @Watch("baseInfo", { deep: true, immediate: true })
  protected watchBaseInfo(newVal: BaseInfoModel) {
    const { erpType } = newVal;
    if (erpType === 1) {
      this.visible = true;
    }
  }

  protected activeName = "parameters";

  public activeTab = "Parameters";
  public defaultTab = "Parameters";
  public tabs: Array<TabModel> = [
    { id: "Parameters", name: "参数设置" },
    { id: "Shelves", name: "配件上下架" }
  ];

  protected m8() {
    let url = window.location.origin;
    if (sessionStorage.token) {
      url += "/?token=" + sessionStorage.token;
    }
    if ((window as any).ChromiumWebBrowser) {
      (window as any).ChromiumWebBrowser.JsOpenBrowser(url);
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  position: relative;
}
.gradients-button {
  position: absolute;
  right: 50px;
  top: 7px;
  z-index: 100;
}
</style>
