<template>
  <div class="cart-container">
    <!-- <van-nav-bar left-text="返回" left-arrow @click-left="goBack" /> -->
    <div class="cart-bg">
      <img class="cart-bg-img" :src="ShoppingCartBgImg" />
    </div>
    <div class="cart-header">
      <div class="header-left">
        <div>商品种类{{ board.category }}</div>
        <div class="line-style">|</div>
        <div>商品件数{{ board.count }}</div>
      </div>
      <div @click="handleEdit">{{ isEdit ? '完成' : '管理' }}</div>
    </div>
    <div class="cart-body">
      <van-checkbox-group
        class="cart-list"
        v-model="checkList"
        ref="checkboxGroup"
      >
        <SkuCard
          v-for="item in cartList"
          :key="item.id"
          :sku="item"
          type="cart"
          @change="changeCartNum"
        >
          <van-checkbox
            slot="left"
            class="cart-checkbox"
            icon-size="16px"
            :checked-color="checkedColor"
            :name="item"
            :disabled="!isEdit && item.disabled"
            @click.stop.native
          ></van-checkbox>
        </SkuCard>
      </van-checkbox-group>
    </div>
    <div class="cart-footer">
      <div class="footer-left">
        <van-checkbox
          icon-size="16px"
          :checked-color="checkedColor"
          v-model="isAll"
        >
          全选
        </van-checkbox>
      </div>
      <div class="footer-right">
        <div v-show="!isEdit" class="check-content">
          <div class="color-danger">
            <span class="font-size-14">合计：</span>
            <span class="font-size-11">¥</span>
            <span class="font-size-16">{{ totalPrice }}</span>
          </div>
          <div class="check-board">
            {{
              `共${checkedBoard.category}种${checkedBoard.count}件，不含运费`
            }}
          </div>
        </div>
        <button class="cart-button" @click="handleDelete" v-show="isEdit">
          {{ `删除(${checkList.length})` }}
        </button>
        <button class="cart-button" @click="handleSettle" v-show="!isEdit">
          {{ `提交订单(${checkList.length})` }}
        </button>
      </div>
    </div>
    <TabbarComponentB />

    <van-overlay :show="loading" class="cart-overlay">
      <van-loading />
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue';
import request, { URL_MODULE } from '@/request';
import { cartsVerifyInventory } from '@/api/common';
import ShoppingCartBgImg from '@/assets/shopping-cart-bg.png';
import GoodsDefaultImg from '../img/Common_goods_def_img.png';
import TabbarComponentB from '../component/TabbarComponentB';
import SkuCard from '../component/Sku/Card.vue';

import {
  Toast,
  NavBar,
  Stepper,
  Loading,
  Checkbox,
  CheckboxGroup,
  Overlay,
} from 'vant';
Vue.use(Toast)
  .use(NavBar)
  .use(Stepper)
  .use(Loading)
  .use(Overlay)
  .use(Checkbox)
  .use(CheckboxGroup);

export default {
  components: { TabbarComponentB, SkuCard },
  data() {
    return {
      loading: false,
      cartList: [],
      checkList: [],
      ShoppingCartBgImg,
      totalPrice: '0',
      checkedColor: '#FF6E4C',
      isEdit: false,
    };
  },
  computed: {
    isAll: {
      get() {
        let len = 0;
        if (this.isEdit) {
          len = this.cartList.length;
        } else {
          len = this.cartList.filter(item => !item.disabled).length;
        }
        if (len && len === this.checkList.length) {
          return true;
        } else {
          return false;
        }
      },
      set(value) {
        if (value) {
          if (this.isEdit) {
            this.checkList = this.cartList;
          } else {
            this.checkList = this.cartList.filter(item => !item.disabled);
          }
        } else {
          this.checkList = [];
        }
      },
    },
    board() {
      const board = {
        category: 0,
        count: 0,
      };
      const list = this.cartList;
      list.forEach(item => {
        board.category++;
        board.count += Number(item.qty);
      });
      return board;
    },
    checkedBoard() {
      const board = {
        category: 0,
        count: 0,
      };
      const list = this.checkList;
      list.forEach(item => {
        board.category++;
        board.count += Number(item.qty);
      });
      return board;
    },
  },
  watch: {
    checkList: {
      handler: function() {
        this.sacleTotalPrice();
      },
      deep: true,
    },
  },
  methods: {
    goBack() {
      this.$router.push('/home');
    },
    getCartList() {
      this.loading = true;
      //请求购物车列表，获取购物车数量
      request({
        url: '/carts/app',
        baseURL: URL_MODULE.united,
      })
        .then(res => {
          this.pickList(res || []);
          this.loading = false;
        })
        .catch(err => {
          if (err && err.message) {
            Toast.fail(err.message);
          }
          this.loading = false;
        });
    },
    pickList(list) {
      this.cartList = list.map(item => {
        return {
          ...item,
          disabled: !item.companyId || item.canNotOrder,
        };
      });
    },
    // 更新购物车数量
    changeCartNum(item) {
      this.loading = true;
      request({
        method: 'post',
        url: '/carts/' + item.id,
        baseURL: URL_MODULE.united,
        data: {
          qty: item.qty,
          remarks: '',
        },
      })
        .then(res => {
          this.loading = false;
          // 更新实时价格
          item.rtPrice = parseFloat(res.price);
        })
        .catch(err => {
          this.loading = false;
          if (err.message) {
            Toast.fail(err.message);
          }
          if (err.code === 'stocks-lack') {
            // Toast.fail(err.message);
            --item.qty;
          }
        });
    },
    // 计算选中项的总价格，每次发生改变时计算一次
    sacleTotalPrice() {
      this.totalPrice = '0';
      this.checkList.forEach(check => {
        this.cartList.forEach(cart => {
          if (cart.id == check.id) {
            this.totalPrice = (
              +this.totalPrice +
              cart.rtPrice * cart.qty
            ).toFixed(2);
          }
        });
      });
    },
    handleEdit() {
      this.checkList = [];
      this.isEdit = !this.isEdit;
    },
    // 结算
    async handleSettle() {
      //没有选中数据时，不能跳转
      const checkList = this.checkList;
      if (checkList.length) {
        // 校验库存
        const sellers = [...new Set(checkList.map(item => item.companyId))].map(
          companyId => {
            return {
              sellerId: companyId,
              skus: [],
            };
          },
        );
        checkList.forEach(item => {
          const findData = sellers.find(
            seller => seller.sellerId === item.companyId,
          );
          findData.skus.push({
            id: item.skuId,
            qty: Number(item.qty),
            promotionCombine: false,
            type: item.goodsType
          });
        });
        try {
          await cartsVerifyInventory({ sellers });
        } catch (error) {
          if (error.message) {
            Toast.fail(error.message);
          }
          return;
        }

        localStorage.removeItem('confirmOrderParam');
        localStorage.setItem(
          'confirmOrderParam',
          JSON.stringify({
            ids: this.checkList.map(item => item.id),
          }),
        );
        this.$router.push('confirmOrder');
      } else {
        Toast.fail('没有选中的商品');
      }
    },
    // 删除
    handleDelete() {
      Promise.all(
        this.checkList.map(item => {
          return request({
            method: 'delete',
            baseURL: URL_MODULE.united,
            url: '/carts/' + item.id,
          });
        }),
      )
        .then(() => this.getCartList())
        .catch(() => this.getCartList());
    },
  },
  filters: {
    skuImage(image) {
      let result = GoodsDefaultImg;
      if (location.hostname == 'jndm.hztl3.com') {
        result = GoodsDefaultImg;
      }
      if (image) {
        result = image + '&imageView2/1/w/100/h/100';
      }
      return result;
    },
    priceFilter(value) {
      let parse = '--';
      if (Number(value)) {
        parse = parseFloat(value).toFixed(2);
      }
      return parse;
    },
  },
  created() {
    this.getCartList();
  },
};
</script>

<style lang="less" scoped>
@size: 12px;
.strong {
  font-weight: 700;
}
.color-danger {
  color: #e1251b;
}
.color-warning {
  color: #ff6e4c;
}
.m-t-4 {
  margin-top: 4px;
}
.font-size-11 {
  font-size: 11px;
}
.font-size-12 {
  font-size: 12px;
}
.font-size-13 {
  font-size: 13px;
}
.font-size-14 {
  font-size: 14px;
}
.font-size-15 {
  font-size: 15px;
}
.font-size-16 {
  font-size: 16px;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix:after,
.clearfix:before {
  content: '';
  display: block;
  clear: both;
}

.cart-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  text-align: left;
  .cart-bg {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #f4f4f4;
    z-index: -2;
    .cart-bg-img {
      width: 100%;
    }
  }
  .cart-header {
    padding: 0 @size;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    .header-left {
      flex: 1;
      display: flex;
      align-items: center;
      .line-style {
        margin: 0 8px;
      }
    }
  }
  .cart-body {
    padding: 0 @size;
    flex: 1;
    overflow-y: auto;
    .cart-list {
      border-radius: 8px;
      overflow: hidden;
    }
    .cart-checkbox {
      margin-top: 22px;
      margin-right: @size;
    }
  }
  .cart-footer {
    padding: 0 @size;
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    .footer-left {
      flex: 1;
      font-size: 13px;
    }
    .footer-right {
      display: flex;
      align-items: center;
      .check-board {
        font-size: 12px;
        color: #666666;
      }
      .cart-button {
        margin-left: 12px;
        padding: 0 18px;
        height: 36px;
        line-height: 36px;
        border: 0;
        outline: none;
        font-size: 15px;
        font-weight: 700;
        color: #ffffff;
        background-image: linear-gradient(224deg, #ffb12d 0%, #ff6e4c 100%);
        border-radius: 20px;
      }
    }
  }
  /deep/ .van-tabbar--fixed {
    position: relative;
  }
}

.cart-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
