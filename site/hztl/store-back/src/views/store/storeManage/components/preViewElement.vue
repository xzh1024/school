<template>
  <div class="preview-element" ref="previewMain">
    <Marquee :content="marqueeContent"></Marquee>
    <div class="preview-title">当前页面：首页</div>
    <div class="preview-container">
      <div class="preview-tick-mark"></div>
      <div class="preview-nav-bar"></div>
      <div class="preview-main" ref="previewMain">
        <template v-for="(item, index) in list">
          <div
            v-if="item.component === 'BannerSetting'"
            :key="index"
            class="preview-item"
            :class="[
              bannerSettingImgs[item.detail.setting],
              item.checked ? 'is-active' : ''
            ]"
            @click="setEditItem(item)"
          >
            <div class="preview-label">
              <span class="preview-name">{{ item.name }}</span>
              <i
                class="icon-delete"
                @click.stop="deletePreviewItem(item, index)"
              ></i>
            </div>
          </div>
          <div
            v-else-if="item.component === 'ProAreaSetting'"
            :key="index"
            class="preview-item"
            :class="[
              proAreaSettingImgs[item.detail.settingStyle],
              item.checked ? 'is-active' : ''
            ]"
            @click="setEditItem(item)"
          >
            <div class="preview-label">
              <span class="preview-name">{{ item.name }}</span>
              <i
                class="icon-delete"
                @click.stop="deletePreviewItem(item, index)"
              ></i>
            </div>
          </div>
          <div
            v-else
            :key="index"
            class="preview-item"
            :class="[item.img, item.checked ? 'is-active' : '']"
            @click="setEditItem(item)"
          >
            <div class="preview-label">
              <span class="preview-name">{{ item.name }}</span>
              <i
                class="icon-delete"
                @click.stop="deletePreviewItem(item, index)"
              ></i>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Marquee from "./marquee.vue";

export default {
  name: "PreViewElement",
  props: {
    EventBus: Object,
    previewList: {
      type: Array,
      required: true
    }
  },
  components: {
    Marquee
  },
  computed: {
    list() {
      return this.previewList;
    }
  },
  data() {
    return {
      bannerSettingImgs: {
        0: "preview-advertising-2",
        1: "preview-advertising-3",
        2: "preview-advertising-1"
      },
      proAreaSettingImgs: {
        0: "preview-column",
        1: "preview-row"
      },
      marqueeContent:
        "操作指南：点击左侧组件添加组件到中间页面样例中，点击中间页面样例中的组件，在右侧设置区设置相应的组件内容或参数。"
    };
  },
  methods: {
    setEditItem(data) {
      if (data.checked) return;
      this.previewList.forEach(item => {
        item.checked = false;
      });
      data.checked = true;
      this.$emit("setEditItem", data);
    },
    deletePreviewItem(item, index) {
      if (item.checked) {
        this.$emit("setEditItem");
      }
      this.previewList.splice(index, 1);
    },
    // 视图滚动到底部
    previewScroll() {
      const container = this.$refs.previewMain || {};
      container.scrollTop = container.scrollHeight;
    }
  },
  mounted() {
    this.EventBus.$on("previewScroll", this.previewScroll);
  }
};
</script>

<style lang="less" scoped>
.preview-element {
  position: relative;
  height: 100%;
  overflow-y: auto;
  .preview-title {
    margin-top: 16px;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }
  .preview-container {
    min-height: 667px;
    margin: 16px auto 0;
    width: 375px;
    background-color: #f4f4f4;
    box-shadow: 0 0 16px 3px rgba(0, 0, 0, 0.1);
    position: relative;
    .preview-tick-mark {
      position: absolute;
      top: 647px;
      right: 100%;
      &::before {
        content: "Iphone8 手机高度";
        padding-right: @padding-size-main;
        font-size: 12px;
        color: @text-color-hint;
        border-bottom: 1px solid @border-color-base;
        line-height: 20px;
        white-space: nowrap;
      }
    }
    .preview-main {
      cursor: pointer;
      .preview-item {
        position: relative;
        width: 100%;
        box-sizing: border-box;
        margin-top: @margin-size-main;
        &:first-child {
          margin-top: 0;
        }
        &.is-active {
          border: 1px dashed @color-link;
        }
        .item-mask {
          width: 100%;
          height: 34px;
          line-height: 34px;
          position: absolute;
          top: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          padding: 0 16px;
          box-sizing: border-box;
          display: flex;
          color: #ffffff;
          .title {
            flex: 1;
          }
          .icon-delete {
            font-size: 20px;
          }
        }
        &:hover .preview-label {
          .preview-name {
            display: none;
          }
          .icon-delete {
            display: block;
          }
        }
        .preview-label {
          display: block;
          position: absolute;
          left: 383px;
          top: 0;
          height: 32px;
          line-height: 32px;
          background-color: #ffffff;
          white-space: nowrap;
          padding: 0 8px;
          box-shadow: 0px 0px 7px 5px rgba(0, 0, 0, 0.03);
          &::after {
            content: " ";
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 5px solid transparent;
            border-right: 5px solid #ffffff;
            border-bottom: 5px solid transparent;
            border-left: 5px solid transparent;
          }
          .preview-name {
            font-size: 14px;
          }
          .icon-delete {
            display: none;
            font-size: 24px;
            color: @color-warning;
          }
        }
      }
    }
  }
}
</style>
