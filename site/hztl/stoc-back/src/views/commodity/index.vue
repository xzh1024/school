<template>
  <layout-main>
    <div class="commodity">
      商品
    </div>
  </layout-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import LayoutMain from "@/components/layout/layoutMain.vue";
import { BaseInfoModel } from "@/store/modules/base/interface";
import { namespace } from "vuex-class";

const BaseStore = namespace("base");

@Component({
  name: "Commodity",
  components: { LayoutMain }
})
export default class Commodity extends Vue {
  @BaseStore.Getter("baseInfo")
  protected baseInfo!: BaseInfoModel;

  @Watch("baseInfo", { deep: true, immediate: true })
  protected watchBaseInfo(newVal: BaseInfoModel) {
    console.log(newVal);
    const { erpType = 0 } = newVal;
    // const port = 8091;
    // const url = `${location.protocol}${location.hostname}:${port}/Hall?tabName=parameters`
    if (erpType === 1) {
      console.log("M8用户");
    } else if (erpType === 2) {
      console.log("云配管家用户");
      // let url = "";
      // if (process.env.NODE_ENV === "development") {
      //   url = "http://localhost:8091/Hall?tabName=parameters";
      // } else {
      //   url = location.origin.replace("erp", "manual");
      // }
      // window.open(url, "manual");
    }
  }
}
</script>
