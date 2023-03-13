import { defineStore } from "pinia";
import {
  CbdApiAppletOrderMemberCardConsumerPreviewGetResponse,
  cbdApiAppletOrderPaymentResultPost,
  cbdApiAppletOrderPaymentSignGet,
  cbdApiAppletOrderSubmitPaymentPost,
  CbdApiAppletOrderSubmitPaymentPostRequest,
  cbdApiAppletOrderRetryPayGet
} from "@/api";
import { wxPay } from "@/utils";
import NP from "number-precision";
interface OrderPayment {
  key: string;
  orderMark: string;
  storeId: string;
  wxPay: number;
  cardPay: CbdApiAppletOrderMemberCardConsumerPreviewGetResponse;
}
export interface CardPayment {
  payType: number; // 支付类别  1微信  2支付宝  3储值卡
  svcCard?: CbdApiAppletOrderMemberCardConsumerPreviewGetResponse[0]; // 储值卡数据
}
export const useCashCard = defineStore("cashCard", {
  state: () => {
    return {
      orderPaymentArr: [] as OrderPayment[],
      cardPaymentData: {
        payType: 1
      } as CardPayment
    };
  },
  getters: {
    //已选储值卡总金额
    cardPayTotal(state) {
      return state.orderPaymentArr.reduce((pre, cur) => {
        const oneTotal = cur.cardPay.reduce((preSub, curSub) => {
          return NP.plus(preSub, curSub.amount);
        }, 0);
        return NP.plus(pre, oneTotal);
      }, 0);
    },
    //已选储值卡id
    cardPayIdArr(state) {
      const arr: string[] = [];
      state.orderPaymentArr.forEach((item) => {
        item.cardPay.forEach((sub) => {
          arr.push(sub.memberCardCode);
        });
      });
      return arr;
    },
    //已选支付方式数据
    cardPayData(state) {
      return state.cardPaymentData;
    }
  },
  actions: {
    //删除
    delCard(orderIndex: number, cardIndex: number) {
      this.orderPaymentArr[orderIndex].cardPay.splice(cardIndex, 0);
      console.log(this.orderPaymentArr, "---this.orderPaymentArr---");
    },
    //重新支付
    async orderRetryPay(orderNo: string, type: number) {
      // return await cbdApiAppletOrderRetryPayGet({
      //   orderNo,
      //   type: String(type)
      // });
      try {
        const {
          memberCard,
          storeId,
          venueId,
          serialNo,
          orderNo: reTryOrderNo,
          payAmt: reTryPayAmt
        } = await cbdApiAppletOrderRetryPayGet({
          orderNo,
          type: String(type)
        });
        if (memberCard) {
          uni.navigateTo({
            url: `/pages/order/payment-method?storeId=${storeId}&&venueId=${venueId}&&serialNo=${serialNo}&&orderNo=${reTryOrderNo}&&payAmt=${reTryPayAmt}`
          });
        } else {
          // const res = useCashCardStore.getWXPaySign(orderNo);
          // useCashCardStore.doWXPay(res, payAmt);
          const res = await this.getWXPaySign(orderNo);
          this.doWXPay(res, String(reTryPayAmt));
        }
      } catch (e) {
        console.error(e);
      }
    },
    //获取储蓄卡支付结果
    async getCardPayResult(orderNo: string) {
      return await cbdApiAppletOrderPaymentResultPost({
        orderNo
      });
    },
    //提交储蓄卡支付
    async cardPay(data: CbdApiAppletOrderSubmitPaymentPostRequest) {
      return await cbdApiAppletOrderSubmitPaymentPost({
        ...data
      });
    },
    //获取微信支付凭证
    async getWXPaySign(orderNo: string) {
      return await cbdApiAppletOrderPaymentSignGet({
        orderNo
      });
    },
    //微信支付
    doWXPay(res: any, price: string) {
      wxPay(
        res,
        () => {
          uni.redirectTo({
            url: `/pages/order/pay-result?serverNo=${res.serverRspNo}&price=${price}&orderNo=${res.orderNo}`
          });
        },
        () => {
          uni.showToast({
            title: "微信支付失败",
            icon: "none"
          });
          setTimeout(() => {
            uni.redirectTo({
              url: `/pages/order/index?status=0`
            });
          }, 1500);
        }
      );
    },
    clearOrderPaymentArr() {
      this.orderPaymentArr = [];
    },
    setOrderPaymentArr(data: OrderPayment) {
      this.orderPaymentArr.push(data);
    },
    setOrderPaymentCard(
      wxPay: number,
      data: CbdApiAppletOrderMemberCardConsumerPreviewGetResponse,
      key: string
    ) {
      const index = this.orderPaymentArr.findIndex(
        (item) => Number(item.key) === Number(key)
      );
      if (index > -1) {
        this.orderPaymentArr[index].cardPay = data;
        this.orderPaymentArr[index].wxPay = wxPay;
      }
    },
    findArrBuyKey(key: string) {
      return (
        this.orderPaymentArr.find((item) => Number(item.key) === Number(key)) ||
        {}
      );
    },
    setCardPaymentData(data: CardPayment) {
      this.cardPaymentData = data;
    }
  }
});
