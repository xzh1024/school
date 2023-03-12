<template>
  <div class="coupon-setting">
    *有进行中的优惠券的情况下会在首页展示进行中的优惠券信息，因首页篇幅有限所以最多展示2个优惠券的信息在首页，超过2个优惠券的情况下会引导客户进入领券中心查看全部进行中的可领取的优惠券
  </div>
</template>

<script>
export default {
  name: 'CouponSetting',
};
</script>

<style lang="less" scoped>
.coupon-setting {
  font-size: 14px;
  line-height: 22px;
  color: @color-warning;
}
</style>
