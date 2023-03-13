<template>
  <view class="dropdown-item">
    <i-popup
      ref="itemRef"
      type="top"
      mask-class-name="absolute"
      mask-background-color="rgba(0, 0, 0, 0.4)"
      :popup-top="`${top}px`"
      @change="change"
    >
      <scroll-view
        scroll-y
        class="popup-content"
        :style="{ maxHeight: `${parentHeight}rpx` }"
      >
        <slot></slot>
      </scroll-view>
    </i-popup>
  </view>
</template>

<script setup>
  import { ref, nextTick, inject, onMounted } from "vue";
  import { getRect } from "@/utils/index";
  import IPopup from "@/components/i-popup/uni-popup";

  const addVM = inject("addVM");
  const removeActive = inject("removeActive");
  const parentHeight = inject("parentHeight");
  const getTop = inject("getTop");

  const props = defineProps({
    title: {
      type: String,
      default: ""
    }
  });
  const containerHeight = ref(0);
  const top = ref(0);
  // const isActive = ref(true);
  const itemRef = ref(null);

  onMounted(() => {
    addVM({
      open,
      close,
      title: props.title
    });
    console.log(getTop(), "parentTop");
    nextTick(() => {
      if (getTop()) {
        top.value = getTop();
        console.log(top.value, "top");
      } else {
        getContainerHeight();
      }
    });
  });

  function change({ show }) {
    if (!show) removeActive();
  }

  function open() {
    itemRef.value.open();
  }
  function close() {
    itemRef.value.close();
  }

  async function getContainerHeight() {
    const rect = await getRect(".dropdown-item");
    console.log(rect, "rect");
    top.value = rect.top;
    const info = uni.getSystemInfoSync();
    const winH = info.screenHeight;
    containerHeight.value = winH - rect.top;
  }
</script>

<style lang="scss">
  .dropdown-item {
    .popup-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      box-sizing: border-box;
    }
  }
</style>
