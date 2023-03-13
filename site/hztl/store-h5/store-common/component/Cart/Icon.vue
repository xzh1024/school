<template>
  <div class="cart" @click="toCart">
    <img class="icon" src="../../img/icon-cart-gradient.png" />
    <div
      class="cart-number"
      v-if="cartNum>0"
    >{{cartNum | numFilter}}</div>
  </div>
</template>

<script>
import request, { URL_MODULE } from "@/request";

export default {
  name: "cartIcon",
  data() {
    return {
      cartNum: 0
    };
  },
  created: function() {
    let _this = this;
    _this.loadCartNumber();
  },
  methods: {
    reloadCartNumber() {
      let _this = this;
      _this.loadCartNumber();
    },
    loadCartNumber() {
      let _this = this;
      if (this.hasCookie || !this.needVisitor) {
        request({
            url: "/carts/app",
            baseURL: URL_MODULE.united
          })
          .then(res => {
            _this.cartNum = res.length;
          });
      }
    },
    toCart() {
      let _this = this;
      // let backUrl = _this.$route.path + 
      //   '?id='+ _this.$route.query.id +
      //   '&companyId='+ _this.$route.query.companyId +
      //   (_this.$route.query.areaId?('&areaId='+ _this.$route.query.areaId) : '');
      // sessionStorage.setItem('backUrl',backUrl);
      _this.$router.push({
        name: `cart`
      });
    }
  },
  filters: {
    numFilter(num) {
      if (num > 99) {
        return "...";
      }
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
.cart {
  width: 50px;
  position: relative;
  display: flex;
  align-items: center;
  height: 46px;
  .icon {
    width: 27px;
    height: 27px;
  }
  .cart-num {
    position: absolute;
    top: 0px;
    left: 15px;
    padding-left: 0.8em;
    padding-right: 0.8em;
    font-size: 10px;
  }
  .cart-number {
    position: absolute;
    top: 0px;
    left: 15px;
    background-color: #FF6E4C;
    width: 18px;
    height: 18px;
    border-radius: 50% 50%;
    font-size: 12px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
  }
}
</style>