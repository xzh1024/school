<template>
  <div
    class="coupon-card"
    :class="{ 'is-disabled': disabled }"
    @click="handleClick"
  >
    <slot>
      <div class="coupon-name">{{ name }}</div>
      <div class="coupon-text">{{ text }}</div>
      <div class="coupon-button">
        <el-button size="mini" type="warning" round @click="handleClick">立即新建</el-button>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'CouponCard',
  props: {
    icon: String,
    name: String,
    text: String,
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="less" scoped>
.coupon-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 280px;
  height: 116px;
  padding: 0 @padding-size-main;
  user-select: none;
  color: #ff8766;
  background: url('~@/assets/img/marketing/coupon-y-bg.png') no-repeat;
  background-size: 100% 100%;
  &.is-disabled {
    background: url('~@/assets/img/marketing/coupon-n-bg.png') no-repeat;
    background-size: 100% 100%;
    align-items: center;
    color: @text-color-hint;
    .coupon-button {
      display: none;
    }
  }
  .coupon-name {
    line-height: 24px;
    font-size: 16px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .coupon-text {
    margin-top: 4px;
    font-size: 12px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .coupon-button {
    margin-top: 12px;
  }
}
</style>
