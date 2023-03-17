<template>
  <bar-top />
  <!-- 自定义的顶部导航栏 -->
  <view>
    <view>
      <view
        class="head"
        :style="{
          height: `${S_height}px`,
        }"
        >
        <view class="head-left">
          ←
        </view>
        <view>
          {{ title }}
        </view>
        </view
      >
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from "vue";

onMounted(() => {
  capSule();
});

const title = ref("小店");

// 存储胶囊按钮的位置数据
const search_data = reactive({
  S_height: 0, // 胶囊按钮的高度
  S_top: 0, // 胶囊按钮距离顶部的高度
});

const { S_height, S_top } = toRefs(search_data);

// 获取胶囊按钮的位置数据
function capSule() {
  const { statusBarHeight } = uni.getSystemInfoSync();
  const but_data = wx.getMenuButtonBoundingClientRect();
  console.log(but_data);
  search_data.S_height = (but_data.top - statusBarHeight) * 2 + but_data.height;
  search_data.S_top = but_data.top;
}
</script>

<style lang="scss" scoped>
.head {
  // color: $uni-color-error;
  // background: red;
  border-bottom: 1px solid #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .head-left {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
