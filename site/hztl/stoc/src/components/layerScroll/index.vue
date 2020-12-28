<template>
  <transition name="layer">
    <div class="layer-scroll" v-show="mark">
      <div class="logo-32 layer-logo"></div>
      <ul class="layer-list">
        <li
          class="layer-item"
          v-for="(layer, index) in floors"
          :key="layer.value"
          :class="{ 'is-active': activeIndex === index }"
          @click="layerChange(index)"
        >
          {{ layer.name }}
        </li>
        <li class="layer-item" @click="goTop">
          <i class="icon-up-gray"></i>
          <span class="layer-top-text">顶部</span>
        </li>
        <li class="layer-item">联系客服</li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { FloorModel } from "@/common/interface/commonInterface";

@Component({ name: "LayerScroll" })
export default class LayerScroll extends Vue {
  @Prop() floors!: FloorModel[];

  protected activeIndex = -1;
  protected mark = false;

  protected floorSrcollEventListener() {
    // 获取当前距离文档顶部的距离
    let topValue = 0;
    if (document.documentElement) {
      topValue = document.documentElement.scrollTop;
    } else {
      topValue = document.body.scrollTop;
    }

    if (topValue > 200) {
      this.mark = true;
    } else {
      this.mark = false;
    }

    // 定义变量存放.floor相对于文档的高度
    let floorTop = 0;
    document.querySelectorAll(".floor").forEach((floor: any, index: number) => {
      floorTop = floor.offsetTop;
      if (topValue > floorTop - 300) {
        this.activeIndex = index;
      }
    });
  }

  protected layerChange(index: number) {
    const floor: any = document.querySelectorAll(".floor")[index];
    if (floor) {
      const floorTop = floor.offsetTop;
      if (document.documentElement) {
        document.documentElement.scrollTop = floorTop;
      } else {
        document.body.scrollTop = floorTop;
      }
    }
  }

  protected goTop() {
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    } else {
      document.body.scrollTop = 0;
    }
  }

  mounted() {
    window.addEventListener("scroll", this.floorSrcollEventListener);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.floorSrcollEventListener);
  }
}
</script>

<style lang="scss" scoped>
.layer-enter-active,
.layer-leave-active {
  transition: opacity 0.5s;
}
.layer-enter,
.layer-leave-to {
  opacity: 0;
}
.layer-scroll {
  position: fixed;
  top: 200px;
  left: 50%;
  margin-left: 615px;
  z-index: 100;
  ul, li {
    margin: 0;
    padding: 0;
  }
  .layer-logo {
    display: block;
    margin: 0 auto;
  }
  .layer-list {
    box-shadow: 0 2px 6px -1px rgba(255, 110, 76, 0.2);
    border: $border-gray;
    border-top-color: transparent;
    border-radius: 6px;
    overflow: hidden;
    .layer-item {
      box-sizing: border-box;
      width: 60px;
      height: 50px;
      padding: 6px 15px;
      border-top: $border-gray;
      line-height: 19px;
      font-size: 14px;
      text-align: center;
      background-color: $color-white;
      cursor: pointer;
      @extend .user-select-none;
      transition: all 0.5s ease;
      .layer-top-text {
        display: block;
        transform: translatey(-8px);
      }
      &:first-child {
        border-top-color: transparent;
      }
      &:hover {
        color: $color-white !important;
        background: $gradients-primary !important;
      }
      &:hover .icon-up-gray {
        @extend .icon-top-white;
      }
    }
    .layer-item.is-active {
      color: $color-primary;
    }
  }
}
</style>
