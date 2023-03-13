<template>
  <i-sys @load="load">
    <view class="home">
      <z-paging-swiper>
        <template #top>
          <view class="home-bg" :style="{ paddingTop: statusBarHeight + 'px' }">
            <view class="home-head flex align-center">
              <view class="location flex align-center" @tap="localChange">
                <view class="local-title">{{ localTitle }}</view>
                <image
                  class="local-image"
                  src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_img/arrow_bottom.png"
                ></image>
              </view>
              <view class="tabs-box">
                <view class="tabs flex space-between align-center">
                  <view
                    class="tabs-item"
                    :class="activeIndex === 0 && 'tabs-item-active'"
                    @tap="tabsChange(0)"
                    >在线预约</view
                  >
                  <view
                    class="tabs-item"
                    :class="activeIndex === 1 && 'tabs-item-active'"
                    @tap="tabsChange(1)"
                    >卡项</view
                  >
                </view>
                <view
                  class="tabs-line"
                  :style="{
                    transform: `translateX(${
                      activeIndex === 0 ? '48rpx' : '268rpx'
                    })`
                  }"
                ></view>
              </view>
            </view>

            <view v-if="activeIndex === 0" class="search" @tap="searchPath">
              <image
                class="search-image"
                src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/search.png"
              ></image>
              <view>搜索</view>
            </view>

            <view v-if="activeIndex === 0" class="filter flex">
              <dropdown-menu
                ref="dropMenuRef"
                :top="topHeight"
                :height="800"
                class="width-o"
              >
                <dropdown-item title="分类">
                  <view v-show="activeIndex === 0" class="drop-list">
                    <view
                      v-for="(item, index) in onlineTypeList"
                      :key="index"
                      class="drop-item"
                      :class="
                        venueClassifyId === item.value && 'drop-item-active'
                      "
                      @tap="changeOnlineList(item, 'venueClassifyId')"
                      >{{ item.label }}</view
                    >
                  </view>
                  <view v-show="activeIndex === 1" class="drop-list">
                    <view
                      v-for="(item, index) in activityTypeList"
                      :key="index"
                      class="drop-item"
                      :class="
                        activityTypeId === item.value && 'drop-item-active'
                      "
                      @tap="changeActivityList(item, 'activityTypeId')"
                      >{{ item.label }}</view
                    >
                  </view>
                </dropdown-item>
                <dropdown-item title="智能排序">
                  <view v-show="activeIndex === 0" class="drop-list">
                    <view
                      v-for="(item, index) in homeTypeList"
                      :key="index"
                      class="drop-item"
                      :class="sortType === item.value && 'drop-item-active'"
                      @tap="changeOnlineList(item, 'sortType')"
                      >{{ item.label }}</view
                    >
                  </view>
                  <view v-show="activeIndex === 1" class="drop-list">
                    <view
                      v-for="(item, index) in homeActivityList"
                      :key="index"
                      class="drop-item"
                      :class="sortKey === item.value && 'drop-item-active'"
                      @tap="changeActivityList(item, 'sortKey')"
                      >{{ item.label }}</view
                    >
                  </view>
                </dropdown-item>
                <!-- <template #append-title>
                  <view class="search" @tap="searchPath">
                    <image
                      class="search-image"
                      src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/search.png"
                    ></image>
                    <view>搜索</view>
                  </view>
                </template> -->
              </dropdown-menu>
            </view>
            <view
              v-if="activeIndex === 1"
              class="filter flex"
              style="margin-top: 16rpx"
            >
              <i-tabs
                v-model="cardActive"
                style="width: 100%"
                :data="cardTabArr"
                flex
                @change="onCardTabChange"
              ></i-tabs>
            </view>
          </view>
        </template>
        <swiper
          v-if="activeIndex === 0"
          class="swiper"
          :current="activeIndex"
          @change="swiperChange"
        >
          <swiper-item class="swiper-item"
            ><online
              ref="onlineRef"
              :venue-classify-id="venueClassifyId"
              :sort-type="sortType"
          /></swiper-item>

          <!--          <swiper-item class="swiper-item"-->
          <!--            ><activity-->
          <!--              ref="activityRef"-->
          <!--              :sort-key="sortKey"-->
          <!--              :activity-type-id="activityTypeId"-->
          <!--          /></swiper-item>-->
        </swiper>
        <card-list
          v-if="activeIndex === 1 && cardActive === 0"
          key="card-list-1"
          :card-type="1"
        >
        </card-list>
        <card-list
          v-if="activeIndex === 1 && cardActive === 1"
          key="card-list-2"
          :card-type="2"
        >
        </card-list>
        <MemberCardList
          v-if="activeIndex === 1 && cardActive === 2"
          key="card-list-3"
        >
        </MemberCardList>
      </z-paging-swiper>

      <!--    <i-filter></i-filter>-->
    </view>
  </i-sys>
</template>

<script>
  export default {
    name: "Home"
  };
</script>
<script setup>
  import { ref, computed, nextTick } from "vue";
  import ls from "@/ls";
  import { cbdApiAppletProjectSelectProjectGet } from "@/api";
  import Online from "./components/online";
  // import Activity from "./components/activity";
  import DropdownMenu from "../../components/dropdown-menu/dropdown-menu";
  import DropdownItem from "../../components/dropdown-item/dropdown-item";
  import {
    cbdApiAppletCommonSelectVenueClassifyGet,
    cbdApiAppletCommonSelectActivityTypeGet
  } from "../../api";
  import { onLoad, onShow } from "@dcloudio/uni-app";
  import { homeTypeList, homeActivityList } from "@/utils/dic";
  import ITabs from "@/components/i-tabs";
  import CardList from "./components/card-list";
  import MemberCardList from "./components/member-card-list";

  const statusBarHeight = ref(0);
  const activeIndex = ref(0);
  const localItem = ref({});
  // const filterType = ref();
  const onlineTypeList = ref([]);
  const activityTypeList = ref([]);
  const venueClassifyId = ref("");
  const sortType = ref("");
  const topHeight = ref(0);
  const dropMenuRef = ref(null);
  const onlineRef = ref(null);
  const activityRef = ref(null);
  const activityTypeId = ref("");
  const sortKey = ref("");
  const initial = ref(true);
  const currentProjectId = ref();

  onLoad(() => {
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight;
    topHeight.value = uni.upx2px(330) + statusBarHeight.value;
  });

  onShow(() => {
    if (initial.value) return;
    const currentId = ls.get("projectId");
    if (Number(currentId) === currentProjectId.value) return;
    load();
  });

  const cardTabArr = ref([
    {
      label: "限期卡",
      value: 0
    },
    {
      label: "次卡",
      value: 1
    },
    {
      label: "储值卡",
      value: 2
    }
  ]);
  const cardActive = ref(0);
  const onCardTabChange = (value) => {
    // const { id } = item;
    // active.value = id;
    console.log(value);
    console.log(cardActive.value);
    console.log(cardActive.value);
  };

  async function load() {
    await locationChange();
    await getTypeList();
    await getActivityTypeList();
    initial.value = false;
    onlineRef.value?.reload();
    activityRef.value?.reload();
  }
  function tabsChange(v) {
    activeIndex.value = v;
  }
  async function locationChange() {
    try {
      const data = await cbdApiAppletProjectSelectProjectGet({});
      const currentId = ls.get("projectId");
      const item = data.find((i) => i.value === Number(currentId));
      if (item) {
        localItem.value = item;
      } else {
        localItem.value = data[0];
      }
      currentProjectId.value = localItem.value.value;
      ls.set("projectId", localItem.value.value);
    } catch (e) {
      console.error(e);
    }
  }

  async function getTypeList() {
    try {
      const res = await cbdApiAppletCommonSelectVenueClassifyGet();

      res?.unshift({ label: "全部", value: "" });
      onlineTypeList.value = res;
    } catch (e) {
      console.error(e);
    }
  }

  async function getActivityTypeList() {
    try {
      const res = await cbdApiAppletCommonSelectActivityTypeGet();
      res?.unshift({ label: "全部", value: "" });
      activityTypeList.value = res;
    } catch (e) {
      console.error(e);
    }
  }
  const localTitle = computed(() => {
    return localItem.value.label;
  });
  function localChange() {
    uni.navigateTo({
      url: "/pages/home/location/location"
    });
  }

  function swiperChange(e) {
    activeIndex.value = e.detail.current;
  }
  // const handleSearch = () => {
  //   // 如果选项卡下标为0 在线预约跳转搜索  为1 附近活动跳转
  //   if (activeIndex.value === 0) {
  //     uni.navigateTo({
  //       url: `/pages/home/search/search?num=${1}`
  //     });
  //   } else {
  //     uni.navigateTo({
  //       url: `/pages/home/search/search?num=${2}`
  //     });
  //   }
  // };

  function changeOnlineList({ value = "" }, type = "sortType") {
    if (type === "sortType") {
      sortType.value = value;
    } else {
      venueClassifyId.value = value;
    }
    dropMenuRef.value.closeAll();
    nextTick(() => {
      onlineRef.value.reload();
    });
  }

  function changeActivityList({ value = "" }, type = "sortKey") {
    if (type === "sortKey") {
      sortKey.value = value;
    } else {
      activityTypeId.value = value;
    }
    dropMenuRef.value.closeAll();
    nextTick(() => {
      activityRef.value.reload();
    });
  }
  function searchPath() {
    const num = activeIndex.value === 0 ? 1 : 2;
    uni.navigateTo({
      url: `/pages/home/search/search?num=${num}`
    });
  }
</script>

<style scoped lang="scss">
  .width-o {
    width: 100%;
  }
  .swiper {
    height: 100%;
  }
  .home {
    .home-bg {
      background: url(https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_im/home_bg.png)
        no-repeat 0 0;
      background-size: 100%;
      // height: 240rpx;
    }
    .home-head {
      height: 88rpx;
      padding: 0 32rpx;
      position: relative;
    }
    .local-title {
      font-size: 24rpx;
      color: #ffffff;
      font-weight: 400;
      line-height: 24rpx;
      margin-right: 8rpx;
      max-width: 200rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .local-image {
      width: 16rpx;
      height: 16rpx;
    }
    .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      line-height: 88rpx;
      z-index: 1;
      font-size: 34rpx;
      color: #fff;
      font-weight: 400;
    }
    .tabs-box {
      // padding: 20rpx 184rpx 32rpx;
      width: 50%;
      position: relative;
      margin-left: 54rpx;
      .tabs-line {
        position: absolute;
        left: 0;
        bottom: -12rpx;
        z-index: 1;
        width: 44rpx;
        height: 4rpx;
        border-radius: 2rpx;
        background: #fff;
        transition: all 0.5s;
      }
      .tabs {
        &-item {
          font-size: 32rpx;
          color: #fff;
          font-weight: 400;
          opacity: 0.7;
          &-active {
            color: #fff;
            opacity: 1;
          }
        }
      }
      .tabs-item {
        margin-right: 24rpx;
      }
    }

    .search {
      height: 64rpx;
      line-height: 64rpx;
      background: #f7f7f7;
      border-radius: 30rpx;
      font-size: 32rpx;
      color: #999999;
      font-weight: 400;
      display: flex;
      align-items: center;
      padding: 0 64rpx;
      box-sizing: border-box;
      margin: 16rpx 32rpx 32rpx 32rpx;
    }
    .search-image {
      width: 40rpx;
      height: 40rpx;
      margin-right: 16rpx;
    }
    .filter {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      padding: 0 32rpx;
      border-radius: 48rpx 48rpx 0 0;
      height: 128rpx;
      :deep(.dropdown-menu-head) {
        border-radius: 48rpx 48rpx 0 0;
        height: 128rpx;
        width: 100%;
        border-bottom: none;
      }
      .search {
        width: 318rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: #f7f7f7;
        border-radius: 30rpx;
        font-size: 32rpx;
        color: #999999;
        font-weight: 400;
        display: flex;
        align-items: center;
        padding: 0 64rpx;
        box-sizing: border-box;
      }
      .search-image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 16rpx;
      }
    }
  }
</style>
