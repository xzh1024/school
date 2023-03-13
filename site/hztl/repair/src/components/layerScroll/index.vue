<template>
  <transition name="layer">
    <div class="layer-scroll" v-show="mark">
      <ul class="layer-list">
        <li
          v-for="(layer, index) in floors"
          :key="layer.value"
          :class="{ 'is-active': activeIndex === index }"
          @click="layerChange(index)"
        >
          <div class="layer-wrap">
            {{ layer.name }}
          </div>
        </li>
        <li @click="goTop">
          <div class="layer-wrap">
            <i class="icon-up-gray"></i>
            <span class="layer-top-text">顶部</span>
          </div>
        </li>
        <li>
          <div class="layer-wrap">联系客服</div>
          <div class="service-box">
            <div>
              <i class="icon-phone-white"></i>
              <span class="strong">010-60219478</span>
            </div>
            <img class="code-service-img" :src="codeServiceImg" />
            <div>微信扫一扫关注公众号</div>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { FloorModel } from "@/common/interface/commonInterface";
import CodeServiceImg from "@/assets/img/code-service.png";

@Component({ name: "LayerScroll" })
export default class LayerScroll extends Vue {
  @Prop() floors!: FloorModel[];

  private codeServiceImg = CodeServiceImg;

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
    document
      .querySelectorAll<HTMLDivElement>(".floor")
      .forEach((floor: HTMLDivElement, index: number) => {
        floorTop = floor.offsetTop;
        if (topValue > floorTop - 300) {
          this.activeIndex = index;
        }
      });
  }

  protected layerChange(index: number) {
    const floor: HTMLDivElement = document.querySelectorAll<HTMLDivElement>(
      ".floor"
    )[index];
    if (floor) {
      const floorTop = floor.offsetTop;
      if (document.documentElement) {
        document.documentElement.scrollTop = floorTop - 52;
      } else {
        document.body.scrollTop = floorTop - 52;
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
  ul,
  li {
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
    // overflow: hidden;
    li {
      position: relative;
      box-sizing: border-box;
      width: 60px;
      height: 50px;
      // padding: 6px 15px;
      padding: 0 8px;
      // border-top: $border-gray;
      line-height: 19px;
      font-size: 14px;
      text-align: center;
      background-color: $color-white;
      cursor: pointer;
      @extend .user-select-none;
      transition: all 0.5s ease;

      .layer-wrap {
        padding: 6px 7px;
        border-top: $border-gray;
        .layer-top-text {
          display: block;
          transform: translatey(-8px);
        }
      }
      &:first-child {
        border-radius: 6px 6px 0 0;
      }
      &:last-child {
        border-radius: 0 0 6px 6px;
      }
      &:first-child .layer-wrap {
        border-top-color: transparent;
      }
      &:hover {
        color: $color-white !important;
        background: $gradients-primary !important;
        .service-box {
          display: block;
        }
      }
      &:hover .icon-up-gray {
        @extend .icon-up-white;
      }
      &:nth-child(1) {
        color: rgb(255, 97, 49);
      }
      &:nth-child(2) {
        color: rgb(120, 126, 247);
      }
      &:nth-child(3) {
        color: rgb(114, 204, 54);
      }
      .service-box {
        position: absolute;
        left: -175px;
        top: 0;
        display: none;
        width: 168px;
        height: 168px;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 6px;
        color: $color-white;
        background: $gradients-primary;
        box-shadow: 0px 0 10px -3px rgba(255, 110, 76, 0.3);
        &::after {
          content: " ";
          display: inline-block;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-left-color: $color-primary-light;
          position: absolute;
          left: 100%;
          top: 19px;
        }
        .icon-phone-white {
          margin-right: $margin-size-main;
          margin-bottom: -3px;
        }
        .code-service-img {
          display: inline-block;
          width: 96px;
          height: 96px;
          margin: 3px 0;
        }
      }
      &.is-active {
        color: $color-white;
        background: $gradients-primary;
      }
    }
  }
}
</style>
