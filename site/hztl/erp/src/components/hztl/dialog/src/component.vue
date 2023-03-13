<template>
  <transition
    @after-enter="afterEnter"
    @after-leave="afterLeave"
    name="dialog-fade"
  >
    <div
      v-show="visible"
      @click.self="handleWrapperClick"
      class="el-dialog__wrapper"
    >
      <div
        ref="dialog"
        :key="key"
        :aria-label="title || 'dialog'"
        :class="[
          'el-dialog',
          { 'is-fullscreen': fullscreen, 'el-dialog--center': center },
          customClass
        ]"
        :style="style"
        role="dialog"
        aria-modal="true"
      >
        <div ref="slider" class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            v-if="showClose"
            @click="handleClose"
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
          >
            <i class="el-dialog__close el-icon el-icon-close" />
          </button>
        </div>
        <div v-if="rendered" class="el-dialog__body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="el-dialog__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Popup from "element-ui/lib/utils/popup";
import Migrating from "element-ui/lib/mixins/migrating";
import emitter from "element-ui/lib/mixins/emitter";

export default {
  name: "HtDialog",

  mixins: [Popup, emitter, Migrating],

  props: {
    title: {
      type: String,
      default: ""
    },

    modal: {
      type: Boolean,
      default: true
    },

    modalAppendToBody: {
      type: Boolean,
      default: true
    },

    appendToBody: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: true
    },

    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    closeOnPressEscape: {
      type: Boolean,
      default: true
    },

    showClose: {
      type: Boolean,
      default: true
    },

    width: String,

    fullscreen: Boolean,

    customClass: {
      type: String,
      default: ""
    },

    top: {
      type: String,
      default: "10vh"
    },
    beforeClose: Function,
    center: {
      type: Boolean,
      default: false
    },

    destroyOnClose: Boolean
  },

  data() {
    return {
      positionTop: "10vh",
      setLeft: null,
      closed: false,
      key: 0
    };
  },

  computed: {
    relWidth() {
      return this.width ? this.width : "50%";
    },
    positionLeft() {
      return this.setLeft !== null
        ? this.setLeft
        : `calc(50vw - ${this.relWidth} / 2)`;
    },
    style() {
      const style = {};
      if (!this.fullscreen) {
        style.top = this.positionTop;
        style.left = this.positionLeft;
        style.width = this.relWidth;
      }
      return style;
    }
  },

  watch: {
    top: {
      handler(val) {
        this.positionTop = val;
      },
      immediate: true
    },
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit("open");
        this.$el.addEventListener("scroll", this.updatePopper);
        this.$nextTick(() => {
          this.positionTop = this.top;
          this.setLeft = null;
          this.initRightListen();
        });
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      } else {
        this.$refs.slider.onmousedown = null;
        this.$el.removeEventListener("scroll", this.updatePopper);
        if (!this.closed) this.$emit("close");
        if (this.destroyOnClose) {
          this.$nextTick(() => {
            this.key++;
          });
        }
      }
    }
  },

  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
      if (this.appendToBody) {
        document.body.appendChild(this.$el);
      }
      this.$nextTick(() => {
        this.$el.addEventListener("scroll", this.updatePopper);
      });
    }
  },
  beforeDestroy() {
    this.$refs.slider.onmousedown = null;
    this.$el.removeEventListener("scroll", this.updatePopper);
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },

  methods: {
    initRightListen() {
      const reserved = 50;
      const sliderRef = this.$refs.slider;
      const minLeft = reserved - this.$refs.dialog.clientWidth;
      const maxLeft = document.body.clientWidth - reserved;
      const maxTop = document.body.clientHeight - reserved;

      sliderRef.onmousedown = e => {
        const startX = e.clientX;
        const startY = e.clientY;
        const offsetLeft = this.$refs.dialog.offsetLeft;
        const offsetTop = this.$refs.dialog.offsetTop;
        document.onmousemove = e => {
          e.preventDefault();
          const moveLeft = e.clientX - startX;
          const moveTop = e.clientY - startY;
          let setLeft = offsetLeft + moveLeft;
          let positionTop = offsetTop + moveTop;
          if (setLeft < minLeft) {
            setLeft = minLeft;
          } else if (setLeft > maxLeft) {
            setLeft = maxLeft;
          }
          if (positionTop < 0) {
            positionTop = 0;
          } else if (positionTop > maxTop) {
            positionTop = maxTop;
          }
          this.setLeft = `${setLeft}px`;
          this.positionTop = `${positionTop}px`;
        };
        document.onmouseup = () => {
          sliderRef.releaseCapture && sliderRef.releaseCapture();
          document.onmousemove = null;
          document.onmouseup = null;
        };
        sliderRef.setCapture && sliderRef.setCapture();
      };
    },
    getMigratingConfig() {
      return {
        props: {
          size: "size is removed."
        }
      };
    },
    handleWrapperClick() {
      if (!this.closeOnClickModal) return;
      this.handleClose();
    },
    handleClose() {
      if (typeof this.beforeClose === "function") {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit("update:visible", false);
        this.$emit("close");
        this.closed = true;
      }
    },
    updatePopper() {
      this.broadcast("ElSelectDropdown", "updatePopper");
      this.broadcast("ElDropdownMenu", "updatePopper");
    },
    afterEnter() {
      this.$emit("opened");
    },
    afterLeave() {
      this.$emit("closed");
    }
  }
};
</script>
