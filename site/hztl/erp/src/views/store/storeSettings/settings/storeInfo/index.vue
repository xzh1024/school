<template>
  <div v-show="true" v-bind="$attrs" style="height:100%" v-on="$listeners">
    <el-row>
      <el-col :span="6">
        <warearea-info v-if="warehousesInfo.warehouseId" />
      </el-col>
      <el-col :span="6">
        <shelf-info v-if="warehousesInfo.wareareaId" />
      </el-col>
      <el-col :span="6">
        <layer-info v-if="warehousesInfo.shelfId" />
      </el-col>
      <el-col :span="6">
        <position-info v-if="warehousesInfo.layerId" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import wareareaInfo from "@/views/store/storeSettings/settings/storeInfo/wareareaInfo";
import shelfInfo from "@/views/store/storeSettings/settings/storeInfo/shelfInfo";
import layerInfo from "@/views/store/storeSettings/settings/storeInfo/layerInfo";
import positionInfo from "@/views/store/storeSettings/settings/storeInfo/positionInfo";
import hotkeys from "hotkeys-js";
import eventBus from "@/event";

export default {
  name: "StoreInfo",
  components: {
    wareareaInfo,
    shelfInfo,
    layerInfo,
    positionInfo
  },
  inject: ["laodData"],
  props: {
    keyScope: {
      type: [Symbol, String],
      default() {
        return Symbol("StoreInfo");
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("admin/warehouseSettings", ["warehousesInfo"])
  },
  mounted() {
    hotkeys("*", { scope: this.keyScope }, e => {
      this.bindHotkeys(e);
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    bindHotkeys(e) {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
          eventBus.$emit("warehouseFormKeyup", e);
          break;
        default:
          this.$emit("hotkeysUp", e);
          break;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
/deep/.el-row
  height calc(100% - 10px);
/deep/.el-col
  height 100%
</style>
