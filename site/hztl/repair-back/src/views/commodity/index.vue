<template>
  <layout-main />
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import LayoutMain from "@/components/layout/layoutMain.vue";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";
const BaseStore = namespace("base");

@Component({
  name: "Commodity",
  components: {
    LayoutMain
  }
})
export default class Commodity extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;

  @Watch("baseInfo", { deep: true, immediate: true })
  protected watchBaseInfo(newVal: BaseInfoModel) {
    const { erpType } = newVal;
    if (erpType === 1) {
      this.$alert(
        "请前往思锐M8软件打开菜单【配修社区->配件管理】对商品进行上下架操作！咨询电话：010-60219478",
        "提示",
        {
          confirmButtonText: "确定",
          callback: () => {
            return;
          }
        }
      );
    } else if (erpType === 2) {
      let url = "";
      if (process.env.NODE_ENV === "development") {
        url =
          "http://localhost:8091/RepairAuthPlatformManagement?tabName=parameters";
      } else {
        url =
          location.origin.replace("px", "erp") +
          "/RepairAuthPlatformManagement?tabName=parameters";
      }
      window.open(url);
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-main {
  margin: 0 !important;
}
</style>
