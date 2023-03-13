<template>
  <!--  <i-sys @load="load">-->
  <view>
    <view class="store">
      <view
        class="store-top"
        :style="{ height: `${statusBarHeight * 2 + 230}rpx` }"
      >
        <i-fixed
          sticky
          no-nav
          opacity
          ui="bg-primary"
          :opacity-duration="8"
          :index="89"
        >
          <view :style="{ paddingTop: statusBarHeight + 'px' }">
            <view class="store-head flex align-center">
              <view @tap="handleBack">
                <image
                  class="store-top-image"
                  src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/back.png"
                >
                </image>
              </view>
              <view class="search" @tap="toSearch">
                <image
                  class="search-image"
                  src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/coupon/search.png"
                >
                </image>
                <view>搜索</view>
              </view>
              <!-- <view>
                <collect-icon :collect="storeInfo.collect" :storeId="storeId" :type="1" @change="collectChange">
                </collect-icon>
              </view> -->
            </view>
          </view>
        </i-fixed>
        <view
          class="store-bg"
          :style="{
            background: `url(${fixImage(firstBgImage, {
              w: 750
            })}) no-repeat`,
            backgroundSize: '100% 120%'
          }"
        >
        </view>
      </view>
    </view>
    <view class="container">
      <view class="container-box">
        <view class="container-main">
          <view class="container-main-title">{{ storeInfo.storeName }}</view>
          <view class="container-main-type">
            <view>{{ storeInfo.storeFormat }}</view>
            <view class="container-main-sales"
              >月销
              <text class="container-main-num">{{
                storeInfo.sales
              }}</text></view
            >
          </view>
          <!-- <view class="footer-right-box">
            <scroll-view scroll-x class="coupon-list">
              <item-coupon class="coupon-item" :item="item" v-for="(item,index) in couponTag" :key="index" @onClick="couponClick"></item-coupon>
            </scroll-view>
          </view> -->
          <view v-if="storePics.length" class="scroll-content">
            <scroll-view scroll-x>
              <view class="right-scroll-list">
                <view
                  v-for="(item, index) in storePics"
                  :key="index"
                  class="right-scroll-item"
                >
                  <view class="right-scroll-imgbox">
                    <image
                      :src="fixImage(item, { w: 158 })"
                      mode="aspectFill"
                      class="right-scroll-img"
                      @tap="handleImageClick"
                    ></image>
                    <view
                      v-if="index === 5"
                      class="mask"
                      @tap="handleImageClick"
                      >查看更多</view
                    >
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="container-main-date"
            >营业时间：{{ storeInfo.openTime }}
            <span class="container-main-detail" @tap="handleGetDetail"
              >详情
              <image class="container-main-icon" :src="jump2" />
            </span>
          </view>
          <view v-if="feature.length" class="container-secondary-tag">
            <scroll-view scroll-x>
              <view class="tag-list">
                <i-tag
                  v-for="(item, index) in feature"
                  :key="index"
                  :text="item"
                  color="#FB5F05"
                  background-color="#FFEFE6"
                  class="i-tag"
                />
              </view>
            </scroll-view>
          </view>
          <view class="container-address-box">
            <view
              class="container-address-title flex space-between align-center"
            >
              <view class="flex align-center">
                <image
                  class="container-address-name"
                  src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/shop/shop-location.png"
                />
                <text class="address-name">{{ storeInfo.address }}</text>
              </view>
              <image
                class="container-address-phone"
                :src="phone"
                @tap="handlePhone"
              />
            </view>
          </view>
        </view>
        <view>
          <!-- <place :store-id="storeId" /> -->
          <i-fixed
            ref="currentPage"
            sticky
            no-fixed
            :index="15"
            :duration="600"
          >
            <i-tabs
              v-model="tabsIndex"
              :data="businessScopes"
              label-key="title"
              value-key="id"
              flex
              default-color="#666"
              @change="handleTabsChange"
            ></i-tabs>
          </i-fixed>
          <view
            v-if="businessScopes?.length"
            :style="{ minHeight: windowHeight + 'px' }"
          >
            <shop
              v-if="tabsType === 1"
              ref="refShop"
              :height="windowHeight"
              :store-id="storeId"
              :store-info="storeInfo"
              @fixed="onFixed"
            />
            <place
              v-else-if="tabsType === 2"
              :store-id="storeId"
              :height="windowHeight"
            />
            <coupon v-else-if="tabsType === 3" :store-id="storeId" />
            <activity v-else-if="tabsType === 4" :store-id="storeId" />
          </view>
        </view>
      </view>
    </view>
    <view>
      <i-login v-if="isShow"></i-login>
    </view>
  </view>
  <!--  </i-sys>-->
</template>

<script setup>
  import { jump2, phone } from "@/utils/imgUrl";
  import { onLoad, onShow, onShareAppMessage } from "@dcloudio/uni-app";
  import { ref, computed } from "vue";
  import IFixed from "@/components/i-fixed/i-fixed.vue";
  import ILogin from "@/components/i-login/index.vue";
  import Place from "./components/place";
  import Activity from "./components/activity";
  import Coupon from "./components/coupon";
  import Shop from "./components/shop";
  import { cbdApiAppletReserveStoreStoreIdGet } from "@/api";
  // import CollectIcon from "@/components/common/collect-icon";
  import ITabs from "../../../components/i-tabs";
  import { fixImage } from "@/utils";
  // import ItemCoupon from "../../../components/common/item-coupon";
  import ITag from "../../../components/i-tag";
  import { useAppStore } from "../../../stores/app";

  const storeId = ref();
  const tabsIndex = ref();
  const statusBarHeight = ref("");
  const storeInfo = ref({});
  const tabsType = ref();
  const refShop = ref(null);
  const windowHeight = ref(0);

  const store = useAppStore();
  const isShow = computed(() => {
    return store.showLogin;
  });
  onLoad(async (options) => {
    const { storeId: id, type } = options;
    storeId.value = Number(id);

    await getStoreInfo(id);
    const { businessScopes = [] } = storeInfo.value;
    const index = businessScopes.findIndex((i) => i.type === Number(type));
    if (type && index > -1) {
      tabsType.value = Number(type);
      tabsIndex.value = index;
    } else {
      const item = businessScopes[0] || {};
      tabsType.value = item.type;
      tabsIndex.value = 0;
    }
    const s = uni.getSystemInfoSync();
    statusBarHeight.value = s.statusBarHeight;
    windowHeight.value = s.windowHeight - s.statusBarHeight - 44 - 36; // 44 导航栏高度  36 tabs高度
    console.log(windowHeight.value, "window");
  });
  onShow(() => {
    refShop.value?.updateCart();
  });

  async function getStoreInfo(id) {
    try {
      const res = await cbdApiAppletReserveStoreStoreIdGet({
        storeId: id || storeId.value
      });
      let { businessScopes = [] } = res;
      businessScopes = businessScopes.map((i) => {
        return {
          ...i,
          name: i.title
        };
      });

      storeInfo.value = {
        ...res,
        businessScopes
      };
    } catch (e) {
      console.error(e);
    }
  }

  const handleBack = () => {
    uni.navigateBack({
      delta: 1
    });
  };

  const firstBgImage = computed(() => {
    return storePics.value.length
      ? storePics.value[0]
      : "https://har-cbd-cdn.huianrong.com/har-cbd/applet/user/bg-userInfo.png";
  });
  const storePics = computed(() => {
    return storeInfo.value?.storePics || [];
  });
  const feature = computed(() => {
    return storeInfo.value?.feature || [];
  });
  const businessScopes = computed(() => {
    return storeInfo.value?.businessScopes || [];
  });
  // const couponTag = computed(() => {
  //   return storeInfo.value?.couponTag || [];
  // });

  // function couponClick() {
  //   const index = businessScopes.value.findIndex((i) => i.type === 3);
  //   if (index > -1) {
  //     tabsType.value = 3;
  //     tabsIndex.value = index;
  //   }
  // }

  /**
   * @param 搜索
   */
  // const handleSearch = (e) => {
  //   uni.navigateTo({
  //     url: `../../search/search`
  //   });
  // };

  /**
   * @param 店铺详情
   */
  const handleGetDetail = () => {
    uni.navigateTo({
      url: `./merchantsDetail/merchantsDetail?id=${storeId.value}`
    });
  };

  const handlePhone = () => {
    uni.makePhoneCall({
      phoneNumber: storeInfo.value.customerServiceTel
    });
  };

  const handleTabsChange = (item) => {
    tabsType.value = item.type;
  };

  const handleImageClick = () => {
    uni.navigateTo({
      url: `/pages/home/merchants/album/album?id=${storeId.value}`
    });
  };

  // function collectChange(v) {
  //   storeInfo.value.collect = v;
  // }
  function toSearch() {
    uni.navigateTo({
      url: `/pages/home/merchants/search?storeId=${storeId.value}&type=${tabsType.value}`
    });
  }
  onShareAppMessage(() => {
    return {
      title: storeInfo.value.storeName,
      path: `/pages/home/merchants/merchants?storeId=${storeId.value}`
    };
  });
  const currentPage = ref(null);
  function onFixed() {
    console.log(111);
    currentPage.value?.fixedTop();
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 0;
    :deep(.tab-item .i-active-box) {
      bottom: 12rpx !important;
    }
    :deep(.tab-box) {
      border-bottom: 2rpx solid #eaeaea;
    }
  }
  .store-top {
    height: 214rpx;
    position: relative;

    .store-bg {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      //background:transparent url(https://har-cbd-cdn.huianrong.com/har-cbd/applet/user/bg-userInfo.png) center center no-repeat;
      filter: blur(5px);
      z-index: -1;
      //background-size:cover;
    }

    .store-head {
      padding: 12rpx 0 12rpx 64rpx;
    }

    .store-top-image {
      width: 38rpx;
      height: 38rpx;
      margin-right: 20rpx;
    }

    .search {
      font-size: 32rpx;
      line-height: 32rpx;
      color: #999999;
      width: 340rpx;
      height: 64rpx;
      border-radius: 30rpx;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 0 48rpx;
      background-color: #fff;
      margin-right: 28rpx;
      position: relative;
      z-index: 1;
      .search-image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 16rpx;
      }
    }

    .collection {
      width: 52rpx;
      height: 52rpx;
      margin-left: 28rpx;
    }
  }

  .tag-list {
    white-space: nowrap;
    .i-tag {
      display: inline-block;
    }
  }

  .scroll-content {
    padding-left: 32rpx;
  }

  ::v-deep .har-top__popup-wrap {
    top: 130rpx !important;
  }
  .coupon-list {
    width: 100%;
    white-space: nowrap;
    //display: inline-block;
    .coupon-item {
      display: inline-block;
      vertical-align: top;
    }
  }
  .container {
    margin-top: -126rpx;
    //padding-bottom: 160rpx;
    .container-box {
      //padding: 32rpx;
      border-radius: 48rpx 48rpx 0 0;
      overflow: hidden;

      .container-main {
        // margin-bottom: 32rpx;
        background-color: #fff;
        //  为i-FIXED 定高  否则获取错误
        //height: 550rpx;

        .container-main-title {
          padding-top: 32rpx;
          box-sizing: border-box;
          padding-left: 32rpx;
          width: 500rpx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 32rpx;
          font-weight: 500;
          color: #333333;
        }

        .container-main-type {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 22rpx 32rpx 16rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: #999999;

          .container-main-sales {
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;

            .container-main-num {
              font-size: 24rpx;
              font-weight: 400;
              color: #333333;
            }
          }
        }

        .footer-right-box {
          display: flex;
          flex-wrap: wrap;
          padding: 0 64rpx;
          margin-bottom: 16rpx;
        }

        .right-scroll-list {
          display: flex;
          align-items: center;

          .right-scroll-item {
            background-color: #fff;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            flex-shrink: 0;
            padding-right: 32rpx;

            .right-scroll-imgbox {
              width: 158rpx;
              height: 116rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: border-box;
              border-radius: 8rpx;
              overflow: hidden;
              position: relative;

              .mask {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                font-size: 24rpx;
              }

              .right-scroll-img {
                width: 100%;
                height: 100%;
                display: block;
                border-radius: 8rpx;
              }
            }
          }
        }

        .container-main-date {
          display: flex;
          padding: 32rpx 32rpx 16rpx;
          justify-content: space-between;
          align-items: center;
          font-size: 24rpx;
          font-weight: 400;
          color: #999999;

          .container-main-detail {
            font-size: 24rpx;
            font-weight: 400;
            color: #999999;

            .container-main-icon {
              width: 18rpx;
              height: 18rpx;
            }
          }
        }

        .container-secondary-tag {
          display: flex;
          flex-wrap: wrap;
          padding: 0 32rpx;
          .i-tag {
            margin-right: 16rpx;
            margin-bottom: 16rpx;
          }
        }

        .container-address-box {
          padding: 10rpx 32rpx 32rpx;

          .container-address-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 28rpx;
            font-weight: 400;
            color: #333333;

            .container-address-name {
              width: 32rpx;
              height: 34rpx;
              margin-right: 10rpx;
            }

            .address-name {
              width: 540rpx;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .container-address-phone {
              width: 36rpx;
              height: 35rpx;
            }
          }
        }
      }
    }
  }
</style>
