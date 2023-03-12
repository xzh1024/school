<template>
  <span class="notice-dropdown">
    <el-popover
      v-model="noticeVisible"
      placement="bottom"
      width="420"
      trigger="click"
      @show="loadFirstPageNotices(isNotice)"
    >
      <div class="notice-warp">
        <ul
          ref="noticeWarp"
          v-if="noticeList && noticeList.length"
          @scroll="scrollListener"
        >
          <li v-for="notice in noticeList" :key="notice.id">
            <div class="notice-item">
              <el-row
                v-if="NOTICE_TYPE[notice.category] && title !== '消息通知'"
              >
                <el-col :span="10">
                  <span class="notice-tag">
                    {{ NOTICE_TYPE[notice.category] }}
                  </span>
                </el-col>
                <el-col :span="14">
                  <div
                    class="align-right notice-time"
                    style="margin-right: 10px;"
                  >
                    {{ dateFormatFull(notice.createdAt) }}
                  </div>
                </el-col>
              </el-row>
              <div
                v-else
                class="align-right notice-time"
                style="margin-right: 10px;"
              >
                {{ dateFormatFull(notice.createdAt) }}
              </div>
              <div class="notice-main">
                <div class="notice-content">{{ notice.content }}</div>

                <div
                  v-if="notice.isTodo"
                  v-loading="noticeLoading"
                  class="align-right notice-link"
                  @click="goToSolveNotice(notice)"
                >
                  去处理
                </div>
                <div
                  v-else
                  v-loading="noticeLoading"
                  class="align-right notice-link"
                  @click="readNotice(notice)"
                >
                  知道了
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-else v-loading="noticeLoading" class="no-notice">
          您已处理完所有消息！
        </div>
        <div
          v-show="isNotice && noticeList && noticeList.length"
          class="btn-container"
        >
          <el-button
            v-loading="noticeLoading"
            size="mini"
            type="primary"
            @click="readAllNotices"
          >
            全部消息知道了
          </el-button>
        </div>
      </div>
      <div slot="reference" class="notice-reference">
        <el-badge
          :value="noticetTotal"
          :max="99"
          :hidden="!noticetTotal"
          class="item notice-number"
        >
          <!-- <i v-if="isNotice" class="icon-top icon-img-top-bell" /> -->
          <i v-if="isNotice" class="iconfont icon-top-notice"></i>

          <!-- <i v-else class="icon-top icon-img-top-pending" /> -->
          <i v-else class="iconfont icon-top-backlog"></i>
        </el-badge>
        <span class="margin-left-small">{{ title }}</span>
      </div>
    </el-popover>
  </span>
</template>

<script>
import { mapState } from "vuex";
import { noticeSolve } from "@/mixins";
import { NOTICE_TYPE } from "@/constants";
import { dateFormatFull } from "@/utils/date";
import { noticeRead, noticeReadAll } from "@/api/workbench";
import * as store from "@/utils/store";

export default {
  name: "ErpNotice",
  mixins: [noticeSolve],
  props: {
    noticeType: String,
    title: {
      type: String,
      default: "消息通知"
    }
  },
  data() {
    return {
      noticeVisible: false,
      NOTICE_TYPE,
      dateFormatFull
    };
  },
  computed: {
    ...mapState("admin/im", ["notices"]),
    ...mapState("admin/user", {
      userInfoMsg: state => state.userInfoMsg
    }),
    isNotice() {
      return this.title === "消息通知";
    }
  },
  watch: {
    "userInfoMsg.status"(value) {
      if (value === 0) {
        this.loadFirstPageNotices(this.isNotice);
      }
    },
    notices() {
      this.loadFirstPageNotices(this.isNotice);
    }
  },
  mounted() {
    if (store.userInfoMsg() && store.userInfoMsg().status === 0) {
      this.loadFirstPageNotices(this.isNotice);
    }
  },
  methods: {
    scrollListener() {
      if (!this.isHasNotice) return;
      const noticeWarpDom = this.$refs.noticeWarp;
      if (
        noticeWarpDom.scrollTop >=
        noticeWarpDom.scrollHeight - noticeWarpDom.clientHeight
      ) {
        this.loadNextPage(this.isNotice);
      }
    },
    hideNotice() {
      this.noticeVisible = false;
    },
    goToSolveNotice(notice) {
      this.hideNotice();
      this.goRouteFromNotice(notice);
    },
    readNotice(notice) {
      noticeRead({ all: false, readIds: [notice.id] }).then(() => {
        this.loadFirstPageNotices(this.isNotice);
      });
    },
    readAllNotices() {
      noticeReadAll().then(() => {
        this.loadFirstPageNotices(this.isNotice);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.notice-reference {
  cursor: pointer;
  .iconfont {
    color: white;
    @include font_color("color-primary");
    background-color: $color-bg-primary;
    @include background_color("header-color-name");
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 50% 50%;
    font-size: 18px;
    &:hover {
      font-size: 20px;
    }
  }
}

.no-notice {
  padding: 10px;
  text-align: center;
}

.notice-dropdown {
  display: inline-block;
  margin-right: 10px;
  line-height: 30px;
}

.notice-warp {
  ul {
    height: 300px;
    overflow: auto;
    padding: 0;
    margin: 0;

    li {
      padding: 8px 0;
      border-bottom: 1px solid $border-color-base;
    }
  }

  .btn-container {
    margin-top: 10px;
    text-align: center;
  }
}

.notice-item {
  font-size: 12px;
  line-height: 18px;
  color: $color-text-primary;
  width: 100%;

  .align-right {
    text-align: right;
  }

  .notice-tag {
    padding: 0 5px;
    color: $color-primary;
    @include font_color("color-primary");
    border: 1px solid $color-primary;
    @include border_color("color-primary");
    background: $color-bg-primary-light;
    border-radius: 9px;
  }

  .notice-time {
    color: $color-text-secondary;
  }

  .notice-main {
    position: relative;
    margin-top: 8px;

    .notice-content {
      width: calc(100% - 80px);
    }

    .notice-link {
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0;
      color: $color-primary;
      @include font_color("color-primary");
      pointer-events: auto;

      &:before {
        content: "【";
      }

      &:after {
        content: "】";
      }
    }
  }
}
</style>
