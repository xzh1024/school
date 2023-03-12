<template>
  <i-sys title="店铺详情" nav-placeholder nav-bg="bg-white">
    <view class="container">
      <view class="container-detail-top">
        <view class="detail-top-title">
          <!-- 灌篮公园PLUS成都东三环梵木 -->
          {{ detailList.storeName }}
        </view>
        <view class="detail-top-box">
          <view class="detail-top-type">
            <!-- 室内篮球馆 -->
            {{ detailList.storeFormat }}
          </view>
          <view class="detail-top-status">
            <!-- 营业中 -->
            {{ detailList.operatingStatus }}
          </view>
        </view>
      </view>
      <view class="container-detail-footer">
        <!-- 营业时间 -->
        <view class="detail-footer-box">
          <view class="detail-footer-business">
            <span class="footer-business-tips"></span>
            <p class="detail-footer-title">营业时间</p>
          </view>
          <view class="detail-footer-date">
            <!-- 周一、周二 08:00-22:00;周三、周四 06:00-22:00 -->
            {{ detailList.openTime }}
          </view>
        </view>
        <!-- 特色服务 -->
        <view class="detail-footer-box special-serve-box">
          <view class="detail-footer-business">
            <span class="footer-business-tips"></span>
            <p class="detail-footer-title">特色服务</p>
          </view>
          <view class="tag-box">
            <i-tag
              v-for="(item, index) in detailList.feature"
              :key="index"
              class="i-tag"
              :text="item"
              color="#FB5F05"
              background-color="#FFEFE6"
            />
          </view>
        </view>
        <!-- 门店地址 -->
        <view class="detail-footer-box">
          <view class="detail-footer-business">
            <span class="footer-business-tips"></span>
            <p class="detail-footer-title">门店地址</p>
          </view>
          <view class="detail-footer-address">
            <image :src="address_red" />
            <!-- <span class="detail-footer-addresss">四川省成都市武侯区天府大道北段拉德方斯东楼七楼</span> -->
            <span class="detail-footer-addresss">{{ detailList.address }}</span>
          </view>
        </view>
        <!-- 客服电话 -->
        <view class="detail-footer-box">
          <view class="detail-footer-business">
            <span class="footer-business-tips"></span>
            <p class="detail-footer-title">客服电话</p>
          </view>
          <view class="detail-footer-box">
            <!--  <view class="detail-footer-phone">
              185-5020-0020
            </view> -->
            <view class="detail-footer-phone">
              {{ detailList.customerServiceTel }}
            </view>
            <view
              class="detail-footer-call"
              @click="handlePhone(detailList.customerServiceTel)"
            >
              致电咨询 <image :src="jump"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
  </i-sys>
</template>

<script setup>
  import { ref } from "vue";
  import { onLoad } from "@dcloudio/uni-app";

  // 图片引入
  import { address_red } from "@/utils/imgUrl";
  import { cbdApiAppletReserveStoreInfoStoreIdGet } from "@/api/index";
  import ITag from "@/components/i-tag";

  onLoad((options) => {
    handleGetShoppingDetail(options.id);
  });

  /**
   * @param  详情
   */
  const handleGetShoppingDetail = async (id) => {
    const data = await cbdApiAppletReserveStoreInfoStoreIdGet({
      storeId: id
    });
    detailList.value = data;
    console.log(detailList.value);
    switch (detailList.value.operatingStatus) {
      case 1:
        detailList.value.operatingStatus = "营业中";
        break;
      case 2:
        detailList.value.operatingStatus = "打烊";
        break;
    }
  };
  const detailList = ref({});
  /**
   * @param  返回
   */
  // const handleBack = () => {
  //   uni.navigateBack({
  //     delta: 1
  //   });
  // };

  /**
   * @param 电话
   */
  const handlePhone = (phone) => {
    uni.makePhoneCall({
      // 手机号
      phoneNumber: phone,
      // 成功回调
      success: () => {
        console.log("调用成功!");
      },
      // 失败回调
      fail: () => {
        console.log("调用失败!");
      }
    });
  };
</script>

<style lang="scss" scoped>
  @import "./merchantsDetail.scss";
</style>
