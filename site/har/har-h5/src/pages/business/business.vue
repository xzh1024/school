<template>
  <i-sys>
    <view class="business-page">
      <view id="topBg" class="top-bg">
        <view class="content-box">
          <view
            class="title-box"
            :style="{
              paddingTop: titlePaddingTop + 'px',
              height: titleHeight + 'px'
            }"
            >商圈</view
          >
          <view class="search-tab-box">
            <view class="search-content" @click="onSearch">
              <view class="flex align-center">
                <image
                  class="icon-search"
                  src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_img/search.png"
                  mode="aspectFill"
                />
                <view class="search-title">请输入店铺名或商品名</view>
              </view>
              <view class="search-btn">搜索</view>
            </view>
            <view class="tab-content">
              <!--              <i-tabs-->
              <!--                :data="tabsArr"-->
              <!--                label-key="name"-->
              <!--                flex-->
              <!--                value-key="id"-->
              <!--                v-model="tabsIndex"-->
              <!--                selected-under-line-color="#FB5F05"-->
              <!--                selected-color="#333"-->
              <!--                @change="onTabChange"-->
              <!--              />-->
            </view>
          </view>
        </view>
      </view>
      <view
        class="content-inner-box"
        :class="pageShow ? 'fixed' : ''"
        :style="{ marginTop: contentMarginTop }"
      >
        <view class="banner-box">
          <swiper
            v-if="bannerList.length > 0"
            class="swiper"
            circular
            indicator-dots
            indicator-color="#fff"
            indicator-active-color="#FB5F05"
            autoplay
            :interval="3000"
          >
            <swiper-item
              v-for="(item, index) in bannerList"
              :key="index"
              @click="onBanner(item)"
            >
              <image
                class="image-style"
                :src="fixImage(item.coverPic, { w: 686 })"
                mode="aspectFill"
              />
            </swiper-item>
          </swiper>
          <view v-else class="swiper no-data-box">
            <image
              class="icon-no-data"
              src="https://har-cbd-cdn.huianrong.com/har-cbd/applet/business/icon-no-banner.png"
            />
          </view>
        </view>
        <!-- 热门活动 -->
        <view v-if="tabsIndex === 0" class="activity-box">
          <view
            v-if="discountObjInfo && newDiscountTypeListArr?.length > 0"
            class="item-box"
          >
            <view class="item-title">{{ discountObjInfo.name }}</view>
            <view class="item-handle">
              <view
                v-for="(item, index) in newDiscountTypeListArr"
                :key="index"
                class="handle-box"
                @click="onCouponList(item.type, discountObjInfo.name)"
              >
                <image
                  class="image-style"
                  :src="fixImage(item.url, { w: 184 })"
                  mode="aspectFill"
                />
              </view>
            </view>
          </view>
          <view
            v-if="benefitObjInfo && benefitObjInfo?.benefitInfoList?.length > 0"
            class="item-box"
          >
            <view class="item-title flex align-center">
              <view>{{ benefitObjInfo.name }}</view>
              <view
                class="more-box flex align-center"
                @click="onCouponMore(benefitObjInfo.name)"
              >
                <view>查看更多</view>
                <image class="icon-more" :src="iconMore" />
              </view>
            </view>
            <view class="item-scroll">
              <scroll-view scroll-x class="cell-box">
                <view
                  v-for="(item, index) in benefitObjInfo.benefitInfoList"
                  :key="index"
                  class="image-box"
                  @click="onCouponDetail(item)"
                >
                  <image
                    class="image-style"
                    :src="fixImage(item.pic, { w: 490 })"
                    mode="aspectFill"
                  />
                </view>
              </scroll-view>
            </view>
          </view>
          <view
            v-if="formatObjInfo && formatTypeArrayList?.length > 0"
            class="item-box"
          >
            <view class="item-title flex align-center">
              <view>{{ formatObjInfo.name }}</view>
              <view class="more-box flex align-center" @click="onClassifyMore">
                <view>查看更多</view>
                <image class="icon-more" :src="iconMore" />
              </view>
            </view>
            <view class="item-classify">
              <view
                v-for="(item, index) in formatTypeArrayList"
                :key="index"
                class="item-cell"
                @click="onClassify(item, formatObjInfo.name)"
              >
                <image
                  class="icon-logo"
                  :src="fixImage(item.pic, { w: 48 })"
                  mode="aspectFill"
                ></image>
                <view class="cell-name">{{ item.formatName }}</view>
              </view>
            </view>
          </view>
        </view>
        <!-- 优质商家 -->
        <view v-if="tabsIndex === 1" class="store-box">
          <z-paging
            ref="paging"
            v-model="list"
            inside-more
            :use-page-scroll="true"
            :safe-area-inset-bottom="true"
            :refresher-enabled="false"
            :content-z-index="contentZIndex"
            @query="initStoreList"
          >
            <view class="item-classify">
              <view
                v-for="(item, index) in firstClassifySplit"
                :key="index"
                class="item-cell"
                @click="onKind(item)"
              >
                <image
                  class="icon-logo"
                  :src="fixImage(item.icon, { w: 48 })"
                  mode="aspectFill"
                ></image>
                <view class="cell-name">{{ item.label }}</view>
              </view>
            </view>
            <view
              :class="scrollTop > 333 ? 'condition-box' : ''"
              :style="{ top: fixedTop + 'px' }"
            >
              <top-popup-tabs
                ref="topPopup"
                :popup-padding-top="newTop"
                @on-select-change="onSelectChange"
                @on-popup-change="onPopupChange"
              />
            </view>
            <view class="store-info-box">
              <view
                v-for="(item, index) in list"
                :key="index"
                class="store-cell-box"
              >
                <store-cell :item="item" />
              </view>
            </view>
          </z-paging>
          <!-- <view class="item-classify">
            <view
              class="item-cell"
              v-for="(item, index) in firstClassifySplit"
              :key="index"
              @click="onKind(item)"
            >
              <image class="icon-logo" :src="item.icon" mode="aspectFill"></image>
              <view class="cell-name">{{ item.label }}</view>
            </view>
          </view>
          <view class="condition-box">
            <top-popup-tabs
              :popup-padding-top="newTop"
              @onSelectChange="onSelectChange"
            />
          </view>
          <view class="store-info-box">
            <z-paging
              ref="paging"
              v-model="list"
              @query="initStoreList"
              inside-more
              :safe-area-inset-bottom="true"
            >
              <view class="store-cell-box" v-for="(item, index) in list" :key="index">
                <store-cell :item="item" />
              </view>
            </z-paging>
          </view> -->
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script>
  export default {
    name: "Business"
  };
</script>

<script setup>
  import { onShow, onPullDownRefresh, onPageScroll } from "@dcloudio/uni-app";
  import { ref, onMounted, computed, watch } from "vue";
  import {
    cbdApiAppletBannerListTypeGet,
    cbdApiAppletFormatSelectFormatGet,
    cbdApiAppletHotInfoGet,
    cbdApiAppletStoreListGet
  } from "../../api";
  import StoreCell from "../../components/common/store-cell/store-cell";
  import TopPopupTabs from "./_component_/top-popup-tabs";
  import { fixImage } from "@/utils";

  // 通用体育折扣券
  const discount_default =
    "https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_im/discount_default.png";
  // 积分现金券
  const integral_default =
    "https://har-cbd-cdn.huianrong.com/har-cbd/applet/hom/integral.png";
  // 满减
  const full_reduction_default =
    "https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_im/full_reduction_default.png";
  // 礼品券
  const gift_default =
    "https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_im/gift_default.png";

  const iconMore =
    "https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_im/more.png";

  /*const icon_arrow =
    "https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_img/arrow_bottom_black.png";*/

  const tabsIndex = ref(0);
  /*const tabsArr = [
    {
      name: "热门活动",
      id: 1
    },
    {
      name: "优质商家",
      id: 2
    }
  ];*/

  const titlePaddingTop = ref(0);
  const titleHeight = ref(0);

  const bannerList = ref([]);
  const newTop = ref(0);
  const contentMarginTop = ref(0);
  onMounted(async () => {
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    titlePaddingTop.value = top;
    titleHeight.value = height;
    newTop.value = top + height + 4 + "px";
    await getBanner(1);
    await getHotInfo();
    setTimeout(() => {
      const query = uni.createSelectorQuery();
      query
        .select("#topBg")
        .boundingClientRect((data) => {
          const { height } = data;
          contentMarginTop.value = height + 10 + "px";
        })
        .exec();
    }, 100);
  });

  onShow(async () => {
    await tabChangeSever(tabsIndex.value);
  });

  onPullDownRefresh(async () => {
    await tabChangeSever(tabsIndex.value);
  });

  const scrollTop = ref(0);
  const topPopup = ref(null);
  const fixedTop = ref(0);
  onPageScroll((e) => {
    console.log(e, "--e--");
    // const { sysScrollTop } = topPopup.value;
    // scrollTop.value = sysScrollTop ? Object.values(sysScrollTop)[0] : e.scrollTop;
    if (topPopup.value && topPopup.value?.sysScrollTop) {
      scrollTop.value = Object.values(topPopup.value?.sysScrollTop)[0];
    } else {
      scrollTop.value = e.scrollTop;
    }
    const query = uni.createSelectorQuery();
    query
      .select("#topBg")
      .boundingClientRect((data) => {
        const { height } = data;
        fixedTop.value = height;
      })
      .exec();
  });

  const onClassify = (item, title) => {
    const { formatId } = item;
    if (formatId === "") {
      // 全部
      uni.navigateTo({
        url: `./others/more-classify?type=1`
      });
    } else {
      // 单个
      uni.navigateTo({
        url: `/pages/coupon/list?id=${formatId}&type=6&title=${title}`
      });
    }
  };

  /**
   * 更多品类券
   */
  const onClassifyMore = () => {
    uni.navigateTo({
      url: `./others/more-classify?type=1`
    });
  };

  /**
   * 优惠券详情
   * @param item
   */
  const onCouponDetail = (item) => {
    const { couponTemplateId } = item;
    uni.navigateTo({
      url: `/pages/coupon/apply-store?id=${couponTemplateId}`
    });
  };

  /**
   * 更多信息
   * @param title
   */
  const onCouponMore = (title) => {
    uni.navigateTo({
      url: `/pages/coupon/list?type=5&title=${title}`
    });
  };

  /**
   * 优惠券列表
   * @param type
   * @param title
   */
  const onCouponList = (type, title) => {
    uni.navigateTo({
      url: `/pages/coupon/list?type=${type}&title=${title}`
    });
  };

  /**
   * banner跳转
   */
  const onBanner = (item) => {
    const { detailType, detailId } = item;
    if (detailType === 1) {
      uni.navigateTo({
        url: `../home/merchants/merchants?storeId=${detailId}`
      });
    } else if (detailType === 2) {
      uni.navigateTo({
        url: `../activity/detail?id=${detailId}`
      });
    }
  };
  /**
   * 去搜索
   */
  const onSearch = () => {
    if (tabsIndex.value === 0) {
      uni.navigateTo({
        url: `../home/search/search?num=2`
      });
    } else {
      uni.navigateTo({
        url: `../home/search/search?num=1`
      });
    }
  };

  /**
   * tab切换
   * @param e
   * @returns {Promise<void>}
   */
  /*const onTabChange = async (e) => {
    uni.pageScrollTo({
      scrollTop: 0
    });
    const { id } = e;
    await getBanner(id);
  };*/

  const discountObjInfo = ref({});
  const benefitObjInfo = ref({});
  const formatObjInfo = ref({});
  const getHotInfo = async () => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      const { discount, benefit, format } = await cbdApiAppletHotInfoGet();
      discountObjInfo.value = discount;
      benefitObjInfo.value = benefit;
      formatObjInfo.value = format;
      setTimeout(() => {
        uni.hideLoading();
      }, 500);
    } catch (e) {
      console.error(e);
      uni.hideLoading();
    }
  };

  /**
   * 品类券截取
   */
  const formatTypeArrayList = computed(() => {
    let arr = [];
    const { formatInfoList = [] } = formatObjInfo.value;
    if (formatInfoList.length < 5) {
      return formatInfoList;
    } else {
      arr = formatInfoList.slice(0, 4);
      arr.push({
        formatId: "",
        formatName: "全部",
        pic: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/business/icon-business.png"
      });
    }
    return arr;
  });

  /**
   * 热门优惠
   */
  const newDiscountTypeListArr = computed(() => {
    if (discountObjInfo.value) {
      const { discountInfo } = discountObjInfo.value;
      if (discountInfo && Object.keys(discountInfo).length > 0) {
        const tempArr = [];
        const { cashPic, giftPic, fullPic, discountPic } = discountInfo;
        for (let i = 1; i <= Object.keys(discountInfo).length; i++) {
          let url = "";
          let name = "";
          switch (i) {
            case 1:
              url = fullPic || full_reduction_default;
              name = "满减";
              break;
            case 2:
              url = discountPic || discount_default;
              name = "折扣";
              break;
            case 3:
              url = giftPic || gift_default;
              name = "礼品";
              break;
            case 4:
              url = cashPic || integral_default;
              name = "积分";
              break;
          }
          tempArr.push({
            url,
            type: i,
            name
          });
        }
        return [tempArr[3], tempArr[2], tempArr[0], tempArr[1]];
      } else {
        return "";
      }
    } else {
      return "";
    }
  });

  /**
   * 获取banner图
   * @param type
   * @returns {Promise<any>}
   */
  const getBanner = async (type) => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      bannerList.value = await cbdApiAppletBannerListTypeGet({
        type
      });
      uni.hideLoading();
      // setTimeout(() => {
      //
      // }, 500);
    } catch (e) {
      console.error(e);
      uni.hideLoading();
    }
  };

  const firstClassify = ref([]);
  /**
   * 获取一级业态
   * @returns {Promise<void>}
   */
  const getClassify = async () => {
    uni.showLoading({
      title: "加载中"
    });
    try {
      firstClassify.value = await cbdApiAppletFormatSelectFormatGet({
        parentId: ""
      });
      uni.hideLoading();
      // setTimeout(() => {
      //   uni.hideLoading();
      // }, 500);
    } catch (e) {
      console.error(e);
      uni.hideLoading();
    }
  };
  /**
   * 一级业态截取
   */
  const firstClassifySplit = computed(() => {
    let arr = [];
    if (firstClassify.value.length < 5) {
      return firstClassify.value;
    } else {
      arr = firstClassify.value.slice(0, 4);
      arr.push({
        value: "",
        label: "全部",
        icon: "https://har-cbd-cdn.huianrong.com/har-cbd/applet/business/icon-business.png"
      });
    }
    return arr;
  });
  /**
   * 业态详情
   * @param item
   */
  const onKind = (item) => {
    const { value, label } = item;
    if (value === "") {
      uni.navigateTo({
        url: `./others/more-classify?type=2`
      });
    } else {
      // 单个
      uni.navigateTo({
        url: `./others/classify-detail?id=${value}&title=${label}`
      });
    }
  };

  const paging = ref(null);
  const list = ref([]);
  const formatId = ref("");
  const sortType = ref(0);
  const initStoreList = async (pageNo, pageSize) => {
    try {
      const d = await cbdApiAppletStoreListGet({
        formatId: formatId.value,
        sortType: sortType.value,
        pageNum: pageNo,
        pageSize
      });
      paging.value.complete(d?.rows || []);
    } catch (e) {
      console.error(e);
      paging.value.complete(false);
    }
  };

  const onSelectChange = ({ classify, sort }) => {
    // console.log(item, "搜索条件变化");
    formatId.value = classify.value;
    sortType.value = sort.value;
    scrollTop.value = 0;
    paging.value.reload();
  };

  const contentZIndex = ref(9);
  const pageShow = ref(false);
  const onPopupChange = (value) => {
    pageShow.value = value;
    contentZIndex.value = value ? 11 : 9;
  };

  const tabChangeSever = async (tabIndex) => {
    if (tabIndex === 0) {
      await getHotInfo();
      await getBanner(1);
      uni.stopPullDownRefresh();
      // setTimeout(() => {
      //   uni.stopPullDownRefresh();
      // }, 1000);
    } else if (tabIndex === 1) {
      await getBanner(2);
      await getClassify();
      // paging.value.reload();
      uni.stopPullDownRefresh();
      // setTimeout(() => {
      //   uni.stopPullDownRefresh();
      // }, 1000);
    }
  };

  watch(
    () => tabsIndex.value,
    (newVal) => {
      tabChangeSever(newVal);
    }
  );
</script>

<style scoped lang="scss">
  .image-style {
    height: 100%;
    width: 100%;
  }
  .business-page {
    .top-bg {
      width: 100%;
      background-image: url("https://har-cbd-cdn.huianrong.com/har-cbd/applet/home_im/home_bg.png");
      background-size: 100% 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10;
      overflow: hidden;
      .content-box {
        width: 100%;
        height: 100%;
        .title-box {
          color: #ffffff;
          font-size: 34rpx;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20rpx;
        }
        .search-tab-box {
          width: stretch;
          border-radius: 24rpx 24rpx 0 0;
          background: #ffffff;
          padding: 32rpx 32rpx 0 32rpx;
          .search-content {
            width: stretch;
            height: 64rpx;
            background: #f7f7f7;
            border-radius: 30rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 48rpx;
            font-size: 28rpx;
            color: #999999;
            margin-bottom: 20rpx;
            .icon-search {
              height: 40rpx;
              width: 40rpx;
              margin-right: 16rpx;
            }
            .search-btn {
              width: 152rpx;
              height: 100%;
              background: #fb5f05;
              border-radius: 32rpx;
              color: #ffffff;
              font-size: 32rpx;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .tab-content {
            // 隐藏活动
            //height: 80rpx;
            height: 20rpx;
          }
        }
      }
    }
    .fixed {
      position: fixed;
      width: stretch;
      z-index: 99;
    }
    .content-inner-box {
      padding: 0 32rpx 32rpx 32rpx;
      .banner-box {
        .swiper {
          width: 100%;
          height: 440rpx;
          background: #ffffff;
          border-radius: 16rpx;
          overflow: hidden;
          .image-style {
            height: 100%;
            width: 100%;
          }
          .icon-no-data {
            width: 192px;
            height: 146px;
          }
        }
        .no-data-box {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .activity-box {
        .item-box {
          .item-title {
            font-size: 32rpx;
            margin-top: 48rpx;
            margin-bottom: 32rpx;
            color: #333333;
            justify-content: space-between;
            .more-box {
              font-size: 24rpx;
              color: #666666;
              .icon-more {
                height: 18rpx;
                width: 18rpx;
              }
            }
          }
          .item-handle {
            display: grid;
            grid-template-columns: repeat(2, 334rpx);
            grid-template-rows: repeat(2, 308rpx);
            grid-gap: 10rpx;
            .handle-box {
              height: 100%;
              width: 100%;
              border-radius: 8rpx;
              overflow: hidden;
              .image-style {
                height: 100%;
                width: 100%;
              }
            }
          }
          .item-scroll {
            width: 100%;
            white-space: nowrap;
            .cell-box {
              display: flex;
              .image-box {
                display: inline-block;
                width: 490rpx;
                height: 194rpx;
                margin-right: 32rpx;
                border-radius: 8rpx;
                overflow: hidden;
                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
        }
      }
      .item-classify {
        display: grid;
        grid-template-columns: repeat(5, 20%);
        background: #ffffff;
        border-radius: 16rpx;
        padding: 32rpx 24rpx;
        .item-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .icon-logo {
            height: 48rpx;
            width: 48rpx;
          }
          .cell-name {
            font-size: 24rpx;
            color: #666666;
            margin-top: 16rpx;
          }
        }
      }
      .store-box {
        padding-top: 32rpx;
        .condition-box {
          position: fixed;
          z-index: 99;
          left: 0;
          width: 100%;
        }
        .store-info-box {
          .store-cell-box {
            margin-bottom: 32rpx;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
</style>
