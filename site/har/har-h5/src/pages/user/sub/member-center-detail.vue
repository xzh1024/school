<template>
  <i-sys title="我的会员" :nav-placeholder="true" nav-bg="bg" nav-theme="light">
    <view class="page-overflow bg"></view>
    <view class="page">
      <view class="top-info-box">
        <member-level :member-info="userInfo" :level-info="levelInfo" />
        <view class="prompt-info">
          <view class="text-brown-light text-sm margin-bottom-4"
            >如何获取等级豆</view
          >
          <view class="prompt-cell">
            <view
              v-for="(item, index) in ruleInfo"
              :key="index"
              class="text-xs text-brown margin-bottom-4"
            >
              {{ item }}
            </view>
          </view>
        </view>
      </view>
      <view class="integral-record-box">
        <view class="title">等级豆</view>
        <view class="record-box">
          <z-paging
            ref="paging"
            v-model="list"
            height="300rpx"
            :fixed="false"
            inside-more
            @query="initBeanList"
          >
            <view v-for="(item, index) in list" :key="index" class="item-cell">
              <view class="i-tag"></view>
              <view class="flex-sub flex">
                <view>
                  <view class="margin-bottom-4 text-color-3"
                    >{{ item.type === 1 ? "购买" : "退款" }}-订单号[{{
                      item.orderNo
                    }}]</view
                  >
                  <view class="text-color-3e">{{ item.createTime }}</view>
                </view>
                <view :class="item.negative ? 'text-color-9b' : 'text-brown'">
                  {{ item.levelBean }}等级豆
                </view>
              </view>
            </view>
          </z-paging>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script>
  export default {
    name: "MemberCenterDetail"
  };
</script>
<script setup>
  import { onMounted, ref, computed } from "vue";
  import {
    cbdApiAppletMemberInfoGet,
    cbdApiAppletMemberLevelInfoGet,
    cbdApiAppletMemberBeanRecordsGet
  } from "@/api";
  import MemberLevel from "../_components_/member-level";

  onMounted(async () => {
    await initMemberInfo();
    await initLevelInfo();
  });

  const paging = ref(null);
  const list = ref([]);
  const initBeanList = async (pageNo, pageSize) => {
    try {
      const d = await cbdApiAppletMemberBeanRecordsGet({
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    }
  };

  const memberInfo = ref({});
  const initMemberInfo = async () => {
    try {
      memberInfo.value = await cbdApiAppletMemberInfoGet();
    } catch (e) {
      console.error(e);
    }
  };
  const ruleInfo = ref([]);
  const levelInfo = ref([]);
  const initLevelInfo = async () => {
    try {
      const d = await cbdApiAppletMemberLevelInfoGet();
      levelInfo.value = d.levels;
      ruleInfo.value = d.rules;
    } catch (e) {
      console.error(e);
    }
  };

  const userInfo = computed(() => {
    const {
      avatarUrl,
      nickName,
      levelDefaultName,
      levelBean,
      integral,
      levelName,
      nextLevelBean,
      levelId
    } = memberInfo.value;
    return {
      nickName,
      avatarUrl,
      levelDefaultName,
      levelBean,
      integral,
      levelName,
      nextLevelBean,
      levelId
    };
  });
</script>

<style scoped lang="scss">
  :deep(.border-bottom) {
    &::after {
      border: none;
    }
  }
  .margin-bottom-4 {
    margin-bottom: 8rpx;
  }
  .text-xs {
    font-size: 24rpx;
  }
  .text-sm {
    font-size: 28rpx;
  }
  .text-brown-light {
    color: #f8d8ab;
  }
  .text-brown {
    color: #8c683e;
  }
  .text-color-9b {
    color: #9b9b9b;
  }
  .text-color-3e {
    color: #3e4958;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .flex-sub {
    flex: 1;
  }
  .bg {
    background: linear-gradient(180deg, #342c21 0%, #0f0f0f 100%);
  }
  .page-overflow {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .page {
    //padding: 32rpx;
    .top-info-box {
      padding: 32rpx 32rpx 0 32rpx;
    }
    .prompt-info {
      margin: 44rpx 0 32rpx 0;
      .prompt-cell {
      }
    }
    .integral-record-box {
      margin: 0 32rpx 32rpx 32rpx;
      border-radius: 8rpx;
      box-shadow: 0 8rpx 16rpx 2rpx rgba(0, 0, 0, 0.08);
      background: #fdf8ea;
      height: 460rpx;
      overflow: auto;
      .title {
        padding: 24rpx 32rpx;
        font-size: 28rpx;
        color: #333333;
        border-bottom: 2rpx solid #eaeaea;
      }
      .record-box {
        padding: 24rpx 32rpx;
        .item-cell {
          display: flex;
          justify-content: space-between;
          font-size: 24rpx;
          margin-bottom: 40rpx;
          .i-tag {
            width: 8rpx;
            height: 32rpx;
            background: #a77938;
            border-radius: 2rpx;
            margin-right: 16rpx;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
