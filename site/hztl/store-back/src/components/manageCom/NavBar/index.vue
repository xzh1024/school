<template>
  <div class="nav-bar">
    <!-- <div class="nav-item">
      <div class="icon-wrap" @click="showChatsDialog">
        <i class="el-icon-chat-dot-round"></i>
      </div>
    </div> -->
    <div class="nav-item">
      <el-popover
        v-model="noticeVisible"
        placement="bottom-end"
        title="消息通知"
        width="400"
        popper-class="notice-popover"
        trigger="manual"
      >
        <div class="notice-container" v-loading="deleteLoading">
          <div class="notice-body">
            <div class="notice-list" v-show="notices.length">
              <div
                class="notice-item"
                v-for="(item, index) in notices"
                :key="index"
              >
                <div class="notice-head">
                  <div class="notice-type" v-if="item.type === 1">
                    系统消息
                  </div>
                  <div class="notice-type" v-if="item.type === 2">
                    APP消息
                  </div>
                  <div class="notice-time">{{ item.noticeTime }}</div>
                </div>
                <div class="notice-content">
                  {{ item.title + item.content }}
                </div>
              </div>
            </div>
            <div
              class="notice-more"
              v-show="noticePage.page <= noticePage.totalPage"
            >
              <span
                v-show="!noticeLoading"
                class="notice-more-btn"
                @click="getNotices"
                >点击查看更多</span
              >
              <div v-show="noticeLoading" v-loading="noticeLoading"></div>
            </div>
            <div
              class="notice-no"
              v-show="noticePage.page > noticePage.totalPage"
            >
              没有更多消息了
            </div>
          </div>
          <div class="notice-footer">
            <el-tooltip effect="dark" content="清空消息" placement="top">
              <i class="el-icon-delete" @click="updateNotices"></i>
            </el-tooltip>
          </div>
        </div>
        <div
          class="icon-wrap"
          slot="reference"
          @click="noticeVisible = !noticeVisible"
        >
          <i
            class="el-icon-bell"
            :class="{ 'notice-unread': notices.length }"
          ></i>
        </div>
      </el-popover>
    </div>
    <ChatsDialog ref="chatsDialog"></ChatsDialog>
    <audio ref="imAudio" v-show="false"></audio>
  </div>
</template>

<script>
import ChatsDialog from "./components/ChatsDialog.vue";
import { queryNotifications, getNotices, updateNotices } from "@/api/notice";
import {
  ordersCanceledUrl,
  ordersConfirmedUrl,
  ordersCreatedUrl,
  ordersDeliveredUrl,
  ordersFinancialAgreeUrl,
  ordersFinancialRefuseUrl,
  ordersPaidUrl,
  ordersPayingUrl,
  wariningGetUrl,
  wariningToneUrl,
  wariningOfferUrl
} from "@/assets/music/musics.js";

export default {
  name: "NavBar",
  components: { ChatsDialog },
  data() {
    return {
      notices: [],
      noticePage: {
        page: 1,
        totalPage: 0,
        totalSize: 0
      },
      noticeLoading: false,
      noticeVisible: false,
      deleteLoading: false,
      notificationParams: {}
    };
  },
  created() {
    this.getNotices(true);
  },
  mounted() {
    this.$nextTick(() => {
      this.queryNotifications();
    });
  },
  methods: {
    queryNotifications() {
      const params = {
        // "carts-qty-change": "",
        // "chats": "", // 通聊新消息通知
        "orders-buyer-confirmed": "", // 订单采购确认
        "orders-canceled": "", // 订单取消
        "orders-confirmed": "", // 订单确认
        "orders-created": "", // 订单创建
        "orders-delivered": "", // 交付的订单
        "orders-financial-agree": "", // 订单财务同意
        "orders-financial-refuse": "", // 订单财务拒绝
        "orders-payed": "", // 订单已支付
        "orders-paying": "", // 订单待支付
        "service-payed": "", // 服务支付
        "wants-unread": "",
        "new-want": "", // 卖家收到新询价单
        "new-offer": "" // 买家收到新报价
      };
      Object.assign(params, this.notificationParams);
      queryNotifications(params)
        .then(res => {
          if (res) {
            // Object.assign(this.notificationParams, res);
            this.handleNotifications(res);
          }
          this.queryNotifications();
        })
        .catch(() => {
          this.queryNotifications();
        });
    },
    handleNotifications(data) {
      const arg = this.notificationParams;
      if (data["inquiry-update"]) {
        //播放提示音
        if (arg["inquiry-update"]) {
          this.playAudio(wariningToneUrl);
        }
        arg["inquiry-update"] = data["inquiry-update"];
        // document.dispatchEvent(enquireUpdateEvent);
      }
      if (data["inquiry-expired"]) {
        arg["inquiry-expired"] = data["inquiry-expired"];
        // document.dispatchEvent(enquireExpiredEvent);
      }
      if (data["new-want"]) {
        //播放提示音
        if (arg["new-want"]) {
          this.playAudio(wariningGetUrl);
        }
        arg["new-want"] = data["new-want"];
        // document.dispatchEvent(receiverHasNewWantEvent);
      }
      if (data["new-offer"]) {
        //播放提示音
        if (arg["new-offer"]) {
          this.playAudio(wariningOfferUrl);
        }
        arg["new-offer"] = data["new-offer"];
        // document.dispatchEvent(receiverHasNewOfferEvent);
      }
      //新提示音添加
      if (data["orders-created"]) {
        if (arg["orders-created"]) {
          this.playAudio(ordersCreatedUrl);
        }
        arg["orders-created"] = data["orders-created"];
        // document.dispatchEvent(receiverOrdersCreatedEvent);
      }
      if (data["orders-paying"]) {
        if (arg["orders-paying"]) {
          this.playAudio(ordersPayingUrl);
        }
        arg["orders-paying"] = data["orders-paying"];
        // document.dispatchEvent(receiverOrdersPayingEvent);
      }
      if (data["orders-confirmed"]) {
        if (arg["orders-confirmed"]) {
          this.playAudio(ordersConfirmedUrl);
        }

        arg["orders-confirmed"] = data["orders-confirmed"];
        // document.dispatchEvent(receiverOrdersConfirmedEvent);
      }
      if (data["orders-financial-agree"]) {
        if (arg["orders-financial-agree"]) {
          this.playAudio(ordersFinancialAgreeUrl);
        }
        arg["orders-financial-agree"] = data["orders-financial-agree"];
        // document.dispatchEvent(receiverOrdersFinancialAgreeEvent);
      }
      if (data["orders-financial-refuse"]) {
        if (arg["orders-financial-refuse"]) {
          this.playAudio(ordersFinancialRefuseUrl);
        }
        arg["orders-financial-refuse"] = data["orders-financial-refuse"];
        // document.dispatchEvent(receiverOrdersFinancialRefuseEvent);
      }
      if (data["orders-delivered"]) {
        if (arg["orders-delivered"]) {
          this.playAudio(ordersDeliveredUrl);
        }
        arg["orders-delivered"] = data["orders-delivered"];
        // document.dispatchEvent(receiverOrdersDeliveredEvent);
      }
      if (data["orders-canceled"]) {
        if (arg["orders-canceled"]) {
          this.playAudio(ordersCanceledUrl);
        }
        arg["orders-canceled"] = data["orders-canceled"];
        // document.dispatchEvent(receiverOrdersCanceledEvent);
      }
      if (data["orders-buyer-confirmed"]) {
        if (arg["orders-buyer-confirmed"]) {
          this.playAudio(ordersPaidUrl);
        }
        arg["orders-buyer-confirmed"] = data["orders-buyer-confirmed"];
        // document.dispatchEvent(receiverOrdersBuyerConfirmedEvent);
      }
    },
    playAudio(src) {
      this.initNotices();
      this.showNotices();
      if (this.$store.state.audioMuted) return;
      const audio = this.$refs.imAudio;
      audio.setAttribute("src", src);
      audio.load();
      audio.play();
    },
    showChatsDialog() {
      this.$refs.chatsDialog.show();
    },
    initNotices() {
      this.notices = [];
      this.noticePage = {
        page: 1,
        totalPage: 0,
        totalSize: 0
      };
      this.getNotices(true);
    },
    showNotices() {
      // this.$refs.notice.click();
      this.noticeVisible = true;
    },
    getNotices(init) {
      this.noticeLoading = true;
      const params = {
        page: this.noticePage.page++,
        pageSize: 10,
        status: 0
      };
      getNotices(params)
        .then(res => {
          this.noticeLoading = false;
          this.noticePage.totalPage = res.totalPage || 0;
          this.noticePage.totalSize = res.totalSize || 0;
          const rows = res.rows || [];
          if (init) {
            this.notices = rows;
          } else {
            this.notices = [...this.notices, ...rows];
          }
        })
        .catch(() => (this.noticeLoading = false));
    },
    updateNotices() {
      this.deleteLoading = true;
      updateNotices({
        noticeIds: ""
      })
        .then(() => {
          // this.noticePage.page = 1;
          this.initNotices();
          this.deleteLoading = false;
        })
        .catch(() => (this.deleteLoading = false));
    }
  }
};
</script>

<style lang="less">
.notice-popover {
  padding: 0;
  .el-popover__title {
    margin: 0;
    padding: 12px;
    border-bottom: 1px solid @border-color-base;
  }
  .notice-container {
    .notice-body {
      max-height: 240px;
      overflow-y: auto;
      .notice-list {
        padding: 0 10px;
        .notice-item {
          padding: 10px 0;
          border-top: 1px solid @border-color-base;
          &:first-child {
            border-top: none;
          }
          .notice-head {
            display: flex;
            align-items: center;
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            .notice-type {
              padding: 0 4px;
              height: 19px;
              line-height: 18px;
              box-sizing: border-box;
              border-radius: 11px;
              border: 1px solid @border-color-base;
              color: @text-color-secondary;
            }
            .notice-time {
              color: @text-color-hint;
            }
          }
          .notice-content {
            margin-top: 10px;
            font-size: 16px;
            font-weight: 400;
            color: #212529;
          }
        }
      }
      .notice-more {
        padding-bottom: 10px;
        text-align: center;
        .notice-more-btn {
          font-size: 16px;
          color: @color-link;
          cursor: pointer;
        }
      }
      .notice-no {
        padding-bottom: 10px;
        font-size: 12px;
        text-align: center;
        color: @text-color-hint;
      }
    }
    .notice-footer {
      box-sizing: border-box;
      height: 40px;
      border-top: 1px solid @border-color-base;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon-delete {
        font-size: 22px;
        color: @text-color-hint;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.nav-bar {
  display: flex;
  height: 58px;
  .nav-item {
    align-items: center;
    color: @text-color-hint;
    cursor: pointer;
    &:hover {
      color: @text-color-base;
      background-color: rgba(@border-color-base, 0.3);
    }
    .icon-wrap {
      height: 100%;
      padding: 0 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-icon-bell,
      .el-icon-chat-dot-round {
        margin-right: 0;
        font-size: 22px;
        &.notice-unread::after {
          content: " ";
          width: 0;
          height: 0;
          border: 3px solid @color-error;
          border-radius: 50% 50%;
          position: absolute;
        }
      }
    }
  }
}
</style>
