<template>
  <div class="header-aside">
    <div class="header-left">
      <div class="header-title">信息展馆-商家后台</div>
      <div class="header-hint">
        * 这里是一排提示语这里是一排提示语
      </div>
    </div>
    <div class="header-right">
      <div class="header-company">
        上海优士汽车零件部件有限公司
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ name: "HeaderAside" })
export default class HeaderAside extends Vue {
}
</script>

<style lang="scss" scoped>
.header-aside {
  width: 100%;
  height: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  background: #fff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3),
    0px 0px 20px rgba(0, 0, 0, 0.1) inset;
  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 15px;
    left: 10px;
    width: 50%;
    height: 20%;
  }
  .header-left {
    flex: 1;
    .header-title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 12px;
      color: #3aa7ff;
    }
    .header-hint {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: 4px;
      font-size: 12px;
      color: #f58423;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
  }
}
</style>
