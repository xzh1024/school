<template>
  <div class="store-manage-guide" v-if="guideState">
    <div class="guide-button" @click="handleConfirm"></div>
  </div>
</template>

<script>
import { StoreManageService } from "../services";
const Service = new StoreManageService();

export default {
  name: "StoreManageGuide",
  data() {
    return {
      guideState: false
    };
  },
  methods: {
    handleConfirm() {
      Service.updateStoreGuideState().then(() => {
        this.guideState = false;
      });
    },
    // 获取店铺指引状态
    getStoreGuideState() {
      Service.getStoreGuideState().then(res => {
        if (res === false) {
          this.guideState = true;
        }
      });
    }
  },
  created() {
    this.getStoreGuideState();
  }
};
</script>

<style lang="less" scoped>
.store-manage-guide {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  background: url("~@/assets/img/store/guide-bg.png") no-repeat;
  background-size: 100%;
  .guide-button {
    width: 114px;
    height: 52px;
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translateX(-50%);
    background: url("~@/assets/img/store/guide-button.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
