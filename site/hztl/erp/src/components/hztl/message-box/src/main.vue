<template>
  <transition name="msgbox-fade">
    <div
      v-show="visible"
      :aria-label="title || 'dialog'"
      class="el-message-box__wrapper ignore-top-hotkeys"
      tabindex="-1"
      role="dialog"
      aria-modal="true"
      @click.self="handleWrapperClick"
    >
      <div
        :class="[customClass, center && 'el-message-box--center']"
        class="el-message-box"
      >
        <div v-if="title !== null" class="el-message-box__header">
          <div class="el-message-box__title">
            <div
              v-if="icon && center"
              :class="['el-message-box__status', icon]"
            />
            <span>{{ title }}</span>
          </div>
          <button
            v-if="showClose"
            type="button"
            class="el-message-box__headerbtn"
            aria-label="Close"
            @click="
              handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
            "
            @keydown.enter="
              handleAction(distinguishCancelAndClose ? 'close' : 'cancel')
            "
          >
            <i class="el-message-box__close el-icon-close" />
          </button>
        </div>
        <div class="el-message-box__content">
          <div class="el-message-box__container">
            <div
              v-if="icon && !center && message !== ''"
              :class="['el-message-box__status', icon]"
            />
            <div v-if="message !== ''" class="el-message-box__message">
              <slot>
                <p v-if="!dangerouslyUseHTMLString">
                  {{ message }}
                </p>
                <p v-else v-html="message" />
              </slot>
            </div>
          </div>
          <div v-show="showInput" class="el-message-box__input">
            <ht-input
              ref="input"
              v-model="inputValue"
              :type="inputType"
              :placeholder="inputPlaceholder"
              @keydown.enter.native="handleInputEnter"
            />
            <div
              :style="{
                visibility: !!editorErrorMessage ? 'visible' : 'hidden'
              }"
              class="el-message-box__errormsg"
            >
              {{ editorErrorMessage }}
            </div>
          </div>
        </div>
        <div v-switch-focus="focusData" class="el-message-box__btns">
          <el-button
            v-show="showConfirmButton"
            ref="confirm"
            :loading="confirmButtonLoading"
            :class="[confirmButtonClasses]"
            :round="roundButton"
            type="primary"
            plain
            class="switch-focus focus-confirm"
            size="small"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || t("el.messagebox.confirm") }}
          </el-button>
          <el-button
            v-if="showCancelButton"
            :loading="cancelButtonLoading"
            :class="[cancelButtonClasses]"
            :round="roundButton"
            type="primary"
            plain
            class="switch-focus focus-cancel"
            size="small"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || t("el.messagebox.cancel") }}
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from "element-ui/lib/utils/popup";
import Locale from "element-ui/lib/mixins/locale";
import { addClass, removeClass } from "element-ui/lib/utils/dom";
import { t } from "element-ui/lib/locale";
import Dialog from "element-ui/lib/utils/aria-dialog";
import hotkeys from "hotkeys-js";

import { Input } from "hztl-ui";

let lastKeyScope;

let messageBox;
const typeMap = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};

export default {
  comments: {
    HtInput: Input
  },
  mixins: [Popup, Locale],

  props: {
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: {
      default: false,
      type: Boolean
    },
    roundButton: {
      default: false,
      type: Boolean
    }
  },

  data() {
    return {
      keyScope: Symbol("messageBox"),
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      uid: 1,
      title: undefined,
      message: "",
      type: "",
      iconClass: "",
      customClass: "",
      showInput: false,
      inputValue: null,
      inputPlaceholder: "",
      inputType: "text",
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: "",
      showConfirmButton: true,
      showCancelButton: false,
      action: "",
      confirmButtonText: "",
      cancelButtonText: "",
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonClass: "",
      confirmButtonDisabled: false,
      cancelButtonClass: "",
      editorErrorMessage: null,
      callback: null,
      dangerouslyUseHTMLString: false,
      focusAfterClosed: null,
      isOnComposition: false,
      distinguishCancelAndClose: false,
      isFocusCancel: false
    };
  },

  computed: {
    icon() {
      const { type, iconClass } = this;
      return (
        iconClass || (type && typeMap[type] ? `el-icon-${typeMap[type]}` : "")
      );
    },

    confirmButtonClasses() {
      return `el-button--primary ${this.confirmButtonClass}`;
    },
    cancelButtonClasses() {
      return `${this.cancelButtonClass}`;
    }
  },

  watch: {
    inputValue: {
      immediate: true,
      handler(val) {
        this.$nextTick(() => {
          if (this.$type === "prompt" && val !== null) {
            this.validate();
          }
        });
      }
    },

    visible: {
      handler(val, oldVal) {
        if (val) {
          this.uid++;
          // 获取焦点方式改变
          // if (this.$type === "alert" || this.$type === "confirm") {
          //     this.$nextTick(() => {
          //         this.$refs.confirm.$el.focus();
          //     });
          // }
          lastKeyScope = hotkeys.getScope();
          this.updateFocusData({
            initial: this.isFocusCancel ? "focus-cancel" : "focus-confirm"
          });
          this.focusAfterClosed = document.activeElement;
          hotkeys.setScope(this.keyScope);
          messageBox = new Dialog(
            this.$el,
            this.focusAfterClosed,
            this.getFirstFocus()
          );
        } else if (oldVal) {
          hotkeys.setScope(lastKeyScope);
        }

        // prompt
        if (this.$type !== "prompt") return;
        if (val) {
          setTimeout(() => {
            if (this.$refs.input && this.$refs.input.$el) {
              this.getInputElement().focus();
            }
          }, 500);
        } else {
          this.editorErrorMessage = "";
          removeClass(this.getInputElement(), "invalid");
        }
      },
      immediate: true
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.closeOnHashChange) {
        window.addEventListener("hashchange", this.close);
      }
    });

    hotkeys("left,up,right,down", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "left":
        case "up":
          this.updateFocusData({
            type: "up"
          });
          break;
        case "right":
        case "down":
          this.updateFocusData({
            type: "down"
          });
          break;
        default:
      }
    });
  },

  beforeDestroy() {
    if (this.closeOnHashChange) {
      window.removeEventListener("hashchange", this.close);
    }
    setTimeout(() => {
      messageBox.closeDialog();
    });
  },

  methods: {
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    getSafeClose() {
      const currentId = this.uid;
      return () => {
        this.$nextTick(() => {
          if (currentId === this.uid) this.doClose();
        });
      };
    },
    doClose() {
      if (!this.visible) return;
      this.visible = false;
      this._closing = true;

      this.onClose && this.onClose();
      messageBox.closeDialog(); // 解绑
      if (this.lockScroll) {
        setTimeout(this.restoreBodyStyle, 200);
      }
      this.opened = false;
      this.doAfterClose();
      setTimeout(() => {
        if (this.action) this.callback(this.action, this);
      });
    },

    handleWrapperClick() {
      if (this.closeOnClickModal) {
        this.handleAction(this.distinguishCancelAndClose ? "close" : "cancel");
      }
    },

    handleInputEnter() {
      if (this.inputType !== "textarea") {
        return this.handleAction("confirm");
      }
    },

    handleAction(action) {
      if (this.$type === "prompt" && action === "confirm" && !this.validate()) {
        return;
      }
      this.action = action;
      if (typeof this.beforeClose === "function") {
        this.close = this.getSafeClose();
        this.beforeClose(action, this, this.close);
      } else {
        this.doClose();
      }
    },

    validate() {
      if (this.$type === "prompt") {
        const inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || "")) {
          this.editorErrorMessage =
            this.inputErrorMessage || t("el.messagebox.error");
          addClass(this.getInputElement(), "invalid");
          return false;
        }
        const inputValidator = this.inputValidator;
        if (typeof inputValidator === "function") {
          const validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage =
              this.inputErrorMessage || t("el.messagebox.error");
            addClass(this.getInputElement(), "invalid");
            return false;
          }
          if (typeof validateResult === "string") {
            this.editorErrorMessage = validateResult;
            addClass(this.getInputElement(), "invalid");
            return false;
          }
        }
      }
      this.editorErrorMessage = "";
      removeClass(this.getInputElement(), "invalid");
      return true;
    },
    getFirstFocus() {
      const btn = this.$el.querySelector(".el-message-box__btns .el-button");
      const title = this.$el.querySelector(
        ".el-message-box__btns .el-message-box__title"
      );
      return btn || title;
    },
    getInputElement() {
      const inputRefs = this.$refs.input.$refs;
      return inputRefs.input || inputRefs.textarea;
    },
    handleClose() {
      this.handleAction("close");
    }
  }
};
</script>
