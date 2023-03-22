<template>
  <view class="sort-Header sort-position">
    <text>分类</text>
    <text>操作</text>
  </view>
  <view class="sort-list">
    <view class="sort-Header sort-table">
      <text class="occupy">休闲零食</text>
      <text class="sort-but">删除</text>
    </view>
    <view
      class="sort-Header sort-table"
      v-for="(item, index) in list"
      :key="index"
    >
      <text class="occupy">{{ item.name }}</text>
      <text class="sort-but">删除</text>
    </view>
  </view>
  <!-- 底部新增分类 -->
  <view class="newly-added-view">
    <view class="newly-added" @click="isShow = true">新增分类</view>
  </view>
  <!-- 弹框 -->
  <page-container
    :show="isShow"
    position="bottom"
    bindenter="onEnter"
    bindafterleave="onAfterleave"
  >
    <view class="space-view">
      <view class="modify-sub">
        <image src="" mode="widthFix" @click="isShow = false" />
      </view>
      <view class="att-input">
        <input
          type="text"
          placeholder="输入分类"
          placeholder-class="I-style"
          cursor-spacing="50"
          v-model="value"
        />
      </view>
      <view class="newly-added classif">提交</view>
    </view>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('')
const isShow = ref(true)
const list = [
  {
    id: 1,
    name: '休闲零食'
  },
  {
    id: 2,
    name: '粮油副食'
  },
  {
    id: 3,
    name: '鸡蛋肉禽'
  },
  {
    id: 4,
    name: '碳酸饮料'
  }
]

function onEnter(e) {
  console.log(e)
}

function onAfterleave(e) {
  console.log(e)
  isShow.value = false
}
</script>

<style scoped lang="scss">
.I-style {
  color: #cccccc;
}
.att-input {
  background-color: #f7f7f7;
  padding: 20rpx;
  border-radius: 7rpx;
}
.classif {
  margin: 60rpx 0 !important;
}
.modify-sub {
  padding-bottom: 60rpx !important;
}
.sort-list {
  margin-top: 90rpx;
  margin-bottom: 300rpx;
}
</style>
