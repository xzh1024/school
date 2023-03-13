<template>
  <div
    :class="{
      'account-pick-container': true,
      isYp: accountType === 'yp',
      isYx: accountType === 'yx'
    }"
    @click.stop="setAccountType"
  >
    <p class="title">{{ title }}</p>
    <p class="subTitle">
      {{ subTitle }}
    </p>
    <p class="des">{{ des }}</p>
    <div class="account-btn" v-if="accountTypeName">
      {{ accountTypeName }}
    </div>
    <div class="image-accout"></div>
  </div>
</template>

<script>
export default {
  props: {
    accountType: {
      type: String,
      default: ""
    },
    accountTypeName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    des: {
      type: String,
      default: ""
    }
  },
  name: "JoinCompanyBar",
  methods: {
    setAccountType() {
      this.$emit("set-account-type", this.accountType);
    }
  }
};
</script>

<style lang="scss" scoped>
.account-pick-container {
  width: 750px;
  box-sizing: border-box;
  position: relative;
  height: 190px;
  padding: 36px 20px 20px 36px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: #333;
  cursor: pointer;
  background-repeat: no-repeat;
  border-radius: 20px;
  background-image: url("~@/assets/images/account-staff-bg.png");
  background-size: cover;
  overflow: hidden;
  margin-bottom: 5px;
  p {
    margin: 0;
  }
  .title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .subTitle {
    font-size: 14px;
    flex: auto;
    font-size: 14px;
  }
  .des {
    font-size: 14px;
    color: #666;
  }
  .account-btn {
    position: absolute;
    top: 3px;
    right: 5px;
    width: 132px;
    height: 32px;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    position: absolute;
  }
  .image-accout {
    width: 144px;
    height: 85px;
    position: absolute;
    bottom: 5px;
    right: 36px;
    background-image: url("~@/assets/images/account-staff.png");
    background-size: cover;
  }
}

.isYp {
  background-image: url("~@/assets/images/account-yp-bg.png");
  .image-accout {
    background-image: url("~@/assets/images/account-yp.png");
  }
}

.isYx {
  background-image: url("~@/assets/images/account-yx-bg.png");
  .image-accout {
    background-image: url("~@/assets/images/account-yx.png");
  }
}

.account-pick-container:hover {
  background-image: url("~@/assets/images/account-staff-bg-hover.png");
}
.isYp:hover {
  background-image: url("~@/assets/images/account-yp-bg-hover.png");
}
.isYx:hover {
  background-image: url("~@/assets/images/account-yx-bg-hover.png");
}
</style>
