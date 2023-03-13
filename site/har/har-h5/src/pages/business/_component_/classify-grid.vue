<template>
  <view class="grid-box">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="item-box"
      @click="onDetail(item)"
    >
      <view class="item-cell">
        <image class="cell-icon" :src="item.icon" mode="aspectFill" />
        <text class="cell-text">{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "ClassifyGrid"
  };
</script>
<script setup>
  const emits = defineEmits(["onDetail"]);
  defineProps({
    list: {
      type: Array,
      default: () => []
    }
  });

  const onDetail = (item) => {
    if (item.leaf)
      return uni.showToast({
        title: "暂无下级业态",
        icon: "none",
        duration: 1500
      });
    emits("onDetail", item);
  };
</script>

<style scoped lang="scss">
  .grid-box {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    row-gap: 20rpx;
    .item-box {
      background-color: #ffffff;
      border-radius: 6rpx;
      box-sizing: border-box;
      .item-cell {
        text-align: center;
        display: flex;
        align-items: center;
        flex-direction: column;
        .cell-icon {
          width: 48rpx;
          height: 48rpx;
        }
        .cell-text {
          margin-top: 16rpx;
          text-align: center;
          font-size: 24rpx;
          font-weight: 400;
          color: #666666;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
        }
      }
    }
  }
</style>
