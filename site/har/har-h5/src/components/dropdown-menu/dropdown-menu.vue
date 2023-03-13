<template>
  <view class="dropdown-menu">
    <view class="dropdown-menu-head">
      <slot name="pre-title"></slot>
      <view
        v-for="(item, index) in titles"
        :key="index"
        class="item"
        :class="{ active: activeIndex === index }"
        @tap="handleTitleTap(index)"
      >
        <view class="title">{{ item }}</view>
      </view>
      <slot name="append-title"></slot>
    </view>
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: "DropdownMenu"
  };
</script>
<script setup>
  import { ref, computed, provide } from "vue";

  const props = defineProps({
    height: {
      //下拉菜单高度
      type: Number,
      default: 960
    },
    top: {
      type: Number
    }
  });

  // const top = ref(props.top);

  provide("addVM", addVM);
  provide("removeActive", removeActive);
  provide("getTop", getTop);
  provide("parentHeight", props.height);

  const items = ref([]);
  const activeIndex = ref(-1);

  function getTop() {
    return props.top;
  }
  function addVM(vm) {
    items.value.push(vm);
  }

  function removeActive() {
    activeIndex.value = -1;
  }

  function handleTitleTap(index) {
    if (index === activeIndex.value) {
      items.value[index].close();
    } else {
      items.value.forEach((item, i) => {
        if (i === index) item.open();
        else item.close();
      });
      activeIndex.value = index;
    }
  }
  const titles = computed(() => {
    return items.value.map((vm) => vm.title);
  });

  function closeAll() {
    items.value.forEach((item) => item?.close());
  }

  defineExpose({ closeAll });
</script>

<style lang="scss" scoped>
  .dropdown-menu {
    width: 100%;
    position: relative;
    .dropdown-menu-head {
      height: 104rpx;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 10;
      background-color: white;
      border-bottom: 1rpx solid #e5e6eb;
      .item {
        height: 40rpx;
        width: 0;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 12rpx;
        .title {
          position: relative;
          padding-right: 36rpx;
          font-size: 28rpx;
          line-height: 28rpx;
          color: #333;
          @include ellipsis;
          &:after {
            position: absolute;
            top: 50%;
            right: 0;
            width: 28rpx;
            height: 28rpx;
            background: url(https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_img/arrow_bottom_black.png)
              no-repeat;
            background-size: 100% 100%;
            //margin-top: -10rpx;
            //border-color: transparent transparent #aaa #aaa;
            //border-style: solid;
            //border-width: 6rpx;
            transform: translateY(-50%);
            content: "";
          }
        }
        &.active {
          .title {
            color: #fb5f00;
          }
        }
        &.selected {
          .title {
            color: #fb5f00;
          }
        }
      }
    }
  }
</style>
