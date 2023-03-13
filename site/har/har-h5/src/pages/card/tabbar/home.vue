<template>
  <i-sys title="储值卡" nav-bg="bg-white" nav-theme="dark">
    <!-- #ifndef H5 -->
    <!-- <template #navLeft>
      <view class="project-box" @tap="localChange">
        <text class="project-name">{{ projectName }}</text>
        <image
          class="project-icon"
          src="@/static/card/caret-right-small@2x.png"
        />
      </view>
    </template> -->
    <!-- #endif -->
    <view class="container">
      <!--  -->
      <swiper
        class="swiper"
        circular
        :indicator-dots="false"
        autoplay
        :interval="3000"
        :style="{
          height: bannerList.length > 0 ? '308rpx' : 'auto',
          marginBottom: bannerList.length > 0 ? '32rpx' : 0
        }"
      >
        <swiper-item
          v-for="item in bannerList"
          :key="item.activityCode"
          class="swiper-item"
          @tap="onSwiperTap(item)"
        >
          <image mode="aspectFill" class="swiper-item" :src="item.picUrl" />
        </swiper-item>
      </swiper>
      <!-- menu nav -->
      <view class="menu-nav">
        <view
          v-for="item in menuNavList"
          :key="item.label"
          class="menu-nav-item"
          @tap="linkPath(item.path)"
        >
          <image class="menu-nav-item-icon" :src="item.icon" />
          <view class="menu-nav-text">{{ item.label }}</view>
        </view>
      </view>
    </view>
    <view class="menu-list">
      <view
        v-for="item in menuList"
        :key="item.label"
        class="menu-item"
        @tap="linkPath(item.path)"
      >
        <image class="menu-item-bg" :src="item.bg" mode="aspectFill" />
        <image class="menu-item-icon" :src="item.icon" />
        <view class="menu-item-text">{{ item.label }}</view>
      </view>
    </view>
    <!-- #ifndef H5 -->
    <i-tabbar :data="tabbarData" :active="0" />
    <!-- #endif -->
  </i-sys>
</template>

<script setup lang="ts">
  import ls from "@/ls";
  // 菜单图片导入
  import CardImg from "@/static/card/Frame@2x(4).png";
  import CardBg from "@/static/card/Group59@2x.png";
  import ActivityImg from "@/static/card/Frame@2x(6).png";
  import ActivityBg from "@/static/card/Group60@2x.png";
  import HelpImg from "@/static/card/Frame@2x(5).png";
  import HelpBg from "@/static/card/Group61@2x.png";
  import GuideImg from "@/static/card/Frame@2x(7).png";
  import GuideBg from "@/static/card/Group62@2x.png";
  // nav menu
  import BugCardImg from "@/static/card/Frame@2x(1).png";
  import RechargeImg from "@/static/card/Frame@2x(2).png";
  import PayImg from "@/static/card/Frame@2x(3).png";
  import MessageImg from "@/static/card/message@2x.png";
  import { ref } from "vue";
  import useFuncProxy from "@/hooks/useFuncProxy";
  // import { useProjectStore } from "@/stores/project";
  import { svcAppletHomePageBannerListGet } from "@/api/card";
  import type { SvcAppletHomePageBannerListGetResponse } from "@/api/card";

  import { useTabbar } from "./useTabbar";
  import { onLoad, onUnload } from "@dcloudio/uni-app";
  //#ifdef H5
  import Messaenger from "MessengerJS";
  // #endif
  const bannerList = ref<SvcAppletHomePageBannerListGetResponse>([]);
  //#ifdef H5
  // @ts-ignore
  const NAVIGATE_STATUS = false;
  const messenger = new Messaenger("homeIframeRefs", "card");
  // @ts-ignore
  messenger.listen((data) => {
    console.log("iframe----listen", data);
    bannerList.value = data;
  });
  // #endif
  // #ifndef H5
  // @ts-ignore
  const NAVIGATE_STATUS = true;
  const [getBannerList] = useFuncProxy(async () => {
    const d = await svcAppletHomePageBannerListGet();
    bannerList.value = d || [];
  });
  // #endif

  const tabbarData = useTabbar("home");
  // const projectStore = useProjectStore();

  const projectName = ref<string>(ls.get("projectName"));
  // const projectList = computed(() => projectStore.projectList);
  // console.log(projectStore);

  const menuNavList = [
    { label: "购卡", icon: BugCardImg, path: "/pages/card/recharge/recharge" },
    {
      label: "充值",
      icon: RechargeImg,
      path: "/pages/card/card/card?type=recharge"
    },
    { label: "付款", icon: PayImg, path: "/pages/card/card/card?type=pay" },
    { label: "消息", icon: MessageImg, path: "/pages/card/notice/list" }
  ];

  const menuList = [
    {
      label: "我的储值卡",
      icon: CardImg,
      bg: CardBg,
      path: "/pages/card/card/card"
    },
    {
      label: "活动消息",
      icon: ActivityImg,
      bg: ActivityBg,
      path: "/pages/card/message/message"
    },
    {
      label: "帮助中心",
      icon: HelpImg,
      bg: HelpBg,
      path: "/pages/card/help/help?type=help"
    },
    {
      label: "使用指引",
      icon: GuideImg,
      bg: GuideBg,
      path: "/pages/card/help/help"
    }
  ];

  function linkPath(url: string) {
    if (!NAVIGATE_STATUS) return;
    uni.navigateTo({ url });
  }

  // function localChange() {
  //   uni.navigateTo({
  //     url: "/pages/home/location/location"
  //   });
  // }

  function onSwiperTap(item: {
    type: number;
    activityCode?: string | undefined;
    path?: string | undefined;
    picUrl: string;
  }) {
    if (item.type === 1) {
      // 图片
      ls.set("webviewPath", item.path);
      uni.navigateTo({
        url: "pages/webview/webview"
      });
    } else {
      // 活动
      uni.navigateTo({
        url: `/pages/card/message/detail?activityCode=${item.activityCode}`
      });
    }
  }

  // const project = ref('');
  // type PickerEventType = {
  //   detail: {
  //     value: number;
  //   };
  // };
  // function onChange(e: PickerEventType) {
  //   const { value } = e.detail;
  //   projectStore.PROJECT_CHANGE({
  //     projectId: String(projectList.value[value]?.projectId),
  //     projectName: projectList.value[value]?.projectName
  //   });
  // }
  // banner
  // const bannerList = ref<SvcAppletHomePageBannerListGetResponse>([]);
  // const [getBannerList] = useFuncProxy(async () => {
  //   const d = await svcAppletHomePageBannerListGet();
  //   bannerList.value = d;
  // });

  uni.$on("switchItem", (item) => {
    projectName.value = item.label;
    getBannerList();
  });
  // #ifndef H5
  onLoad(() => {
    getBannerList();
  });
  // #endif

  onUnload(() => {
    uni.$off("switchItem");
  });
</script>

<style lang="scss" src="../common.scss"></style>
<style lang="scss" scoped>
  .container {
    background-color: #fff;
  }

  .menu-list {
    margin-top: 24rpx;
    padding: 0 32rpx;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    // gap: 22rpx 24rpx;
  }

  .menu-item {
    // width: calc(50% - 12rpx);
    width: 332rpx;
    height: 188rpx;
    padding: 24rpx;
    box-sizing: border-box;
    border-radius: 16rpx;
    position: relative;
    box-shadow: 0px 4rpx 8rpx rgba(111, 111, 111, 0.08);

    &:nth-child(2n) {
      margin-left: 22rpx;
    }

    &:nth-child(n + 3) {
      margin-top: 24rpx;
    }
  }

  .menu-item-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .menu-item-icon {
    width: 36rpx;
    height: 36rpx;
    position: relative;
    z-index: 2;
  }

  .menu-item-text {
    margin-top: 16rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #ffffff;
    line-height: 48rpx;
    position: relative;
    z-index: 2;
  }

  .menu-nav {
    display: flex;
  }

  .menu-nav-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .menu-nav-item-icon {
    width: 80rpx;
    height: 80rpx;
  }

  .menu-nav-text {
    font-size: 28rpx;
    font-weight: 400;
    color: #070a16;
    line-height: 44rpx;
  }

  .project-box {
    padding-left: 32rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: 400;
    color: #070a16;
    line-height: 44rpx;
  }

  .project-icon {
    width: 32rpx;
    height: 32rpx;
    margin-left: 4rpx;
  }

  .swiper,
  .swiper-item {
    width: 100%;
    height: 100%;
    border-radius: 24rpx;
    overflow: hidden;
  }

  .swiper-item {
    background-color: #ddd;
  }
</style>
