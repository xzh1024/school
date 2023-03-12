<template>
  <div class="company-template">
    <img
      class="company-img"
      :src="storeInfo.businessCard || ''"
      @error="defaultImg"
    />
    <div class="company-content">
      <div class="company-head">
        <div class="company-name">
          {{ storeInfo.name }}
        </div>
        <!-- <slot name="after" default>
          <div class="company-contact" v-if="contact">
            <i class="icon-phone-right"></i>
            联系商家
          </div>
        </slot> -->
        <div class="company-contact" v-if="isContact" @click="contact">
          <i class="icon-phone-right"></i>
          联系商家
        </div>
      </div>
      <div class="company-address">
        {{ storeInfo.address }}
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/request";
import DefaultRectangleImg from "@/assets/maintenance/default-rectangle.png";

export default {
  name: "CompanyTemplate",
  props: {
    isContact: {
      type: Boolean
    }
  },
  data() {
    return {
      storeInfo: {}
    };
  },
  methods: {
    // 获取账号信息
    getStoreInfo() {
      request({
        url: "/open/stores/info"
      }).then(res => {
        this.storeInfo = res || {};
      });
    },
    defaultImg(event) {
      const img = event.srcElement;
      img.src = DefaultRectangleImg;
      img.onerror = null;
    },
    // 联系商家
    contact() {
      if (this.storeInfo.phone) {
        const link = document.createElement("a");
        link.href = "tel:" + this.storeInfo.phone;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  },
  created() {
    this.getStoreInfo();
  }
};
</script>

<style lang="less" scoped>
.icon-phone-right {
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("~@/assets/icons/icon-phone-right.png") no-repeat;
  background-size: 100% 100%;
}

.company-template {
  display: flex;
  .company-img {
    width: 110px;
    height: 65px;
    border-radius: 4px;
    margin-right: 12px;
  }
  .company-content {
    flex: 1;
    overflow: hidden;
    .company-head {
      display: flex;
      .company-name {
        flex: 1;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .company-contact {
        display: flex;
        align-items: center;
      }
    }
    .company-address {
      height: 36px;
      margin-top: 8px;
      line-height: 18px;
      font-size: 13px;
      color: #999999;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>
