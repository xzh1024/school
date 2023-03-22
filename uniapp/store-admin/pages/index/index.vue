<template>
  <view class="top-view">
    <!-- <bar-top /> -->
    <!-- 自定义的顶部导航栏 -->
    <view :style="{ height: Custom_height + 'px' }">
      <view :style="{ height: S_top + 'px' }"></view>
      <view :style="{ height: S_height + 'px' }"></view>
    </view>
    <!-- 定位的订单收益板块 -->
    <view class="profit-view" :style="{ top: pro_hei + 'px' }">
      <view class="profit-num">
        <text class="profit-view-title">累计收益(元)</text>
        <text>5.58</text>
      </view>
      <view class="profit-sale">
        <view>
          <text>今日销售额</text>
          <text>20</text>
        </view>
        <view>
          <text>今日订单数</text>
          <text>20</text>
        </view>
        <view>
          <text>累计订单数</text>
          <text>30</text>
        </view>
      </view>
    </view>
    <!-- 九宫格 -->
    <view :style="{ top: profit_top + 'px' }" class="Gong-ge">
      <view
        class="manage-item"
        v-for="item in search_data.plate"
        :key="item.name"
      >
        <image :src="item.image" mode="aspectFit" />
        <text>{{ item.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue'

onMounted(() => {
  capSule()
  proFit()
})

const title = ref('小店')

// 存储胶囊按钮的位置数据
const search_data = reactive({
  S_height: 0, // 胶囊按钮的高度
  S_top: 0, // 胶囊按钮距离顶部的高度
  Custom_height: 0, // 上两个的和
  pro_hei: 0, // 订单收益板块距离手机顶部的高度
  profit_top: 0, // 九宫格距离手机顶部的高度
  // 九宫格的数据
  plate: [
    {
      image: '/static/icons/tupian.png',
      name: '横幅管理'
    },
    {
      image: '/static/icons/youhui.png',
      name: '秒杀管理'
    },
    {
      image: '/static/icons/shangpin.png',
      name: '商品管理'
    },
    {
      image: '/static/icons/chakandingdan.png',
      name: '订单管理'
    },
    {
      image: '/static/icons/fenlei.png',
      name: '分类管理'
    }
  ]
})

const { S_height, S_top, Custom_height, pro_hei, profit_top } =
  toRefs(search_data)

// 获取胶囊按钮的位置数据
function capSule() {
  // const { statusBarHeight } = uni.getSystemInfoSync()
  const but_data = wx.getMenuButtonBoundingClientRect()
  // console.log(but_data)
  // search_data.S_height = (but_data.top - statusBarHeight) * 2 + but_data.height
  search_data.S_top = but_data.top
  search_data.S_height = but_data.height
  search_data.Custom_height = but_data.top + but_data.height
  search_data.pro_hei = but_data.top + but_data.height + 20
}

// 计算收益板块的高度
function proFit() {
  const query = uni.createSelectorQuery()
  query
    .select('.profit-view')
    .boundingClientRect((data) => {
      console.log(data)
    })
    .exec((data) => {
      console.log('exec:')
      console.log(data)

      console.log(pro_hei)
      search_data.profit_top = data[0].height + search_data.pro_hei + 10
    })
}
</script>

<style lang="scss" scoped>
// .head {
//   // color: $uni-color-error;
//   // background: red;
//   // border-bottom: 1px solid #cccccc;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   .head-left {
//     position: absolute;
//     left: 10px;
//     top: 50%;
//     transform: translateY(-50%);
//   }
// }
.top-view {
  height: 330rpx;
  position: relative;
  background-image: linear-gradient(to top, #9be15d, #00e3ae);
  .profit-view {
    background-color: #ffffff;
    position: absolute;
    left: 20rpx;
    right: 20rpx;
    border-radius: 10rpx;
    padding: 20rpx;
    .profit-num {
      display: flex;
      flex-direction: column;
    }
    .profit-sale {
      display: flex;
      align-items: center;
      justify-content: space-between;
      view {
        // flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        text {
          &:first-child {
            color: #999999;
          }
          &:last-child {
            font-weight: 500;
          }
        }
      }
    }
  }
  .Gong-ge {
    background-color: #ffffff;
    margin: 0 20rpx 20rpx;
    border-radius: 10rpx;
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    left: 0;
    right: 0;
    color: #555555;
    .manage-item {
      width: calc(25% - 10rpx * 2);
      margin: 20rpx 10rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      image {
        display: block;
        width: 55rpx;
        height: 55rpx;
        margin-bottom: 20rpx;
      }
    }
  }
}
</style>
