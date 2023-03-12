<template>
  <ht-dialog
    v-switch-focus="focusData"
    v-bind="$attrs"
    title="业务员绑定提示"
    width="530px"
    append-to-body
    v-on="$listeners"
  >
    <p>
      该员工目前绑定了往来单位业务员，取消业务员角色后，将不再跟往来单位绑定！
    </p>
    <p>您可以选择其他业务员进行替换。</p>
    <el-form
      ref="headerForm"
      :model="header"
      :show-message="false"
      class="form-item-small-margin-bottom"
      label-position="left"
      label-width="75px"
      size="mini"
    >
      <el-form-item
        v-show="isPurchaseMan"
        style="width: 300px;"
        prop="purchaseManId"
        label="采购业务员"
      >
        <ht-autoselect
          v-model="header.purchaseManId"
          :options="store().purchaseMen()"
          :trigger-on-focus="false"
          placeholder="请选择"
          filter-zero
          clearable
          highlight-first-item
          class="switch-focus focus-purchaseManId"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
      <el-form-item
        v-show="isSalesMan"
        style="width: 300px;"
        prop="salesManId"
        label="销售业务员"
      >
        <ht-autoselect
          v-model="header.salesManId"
          :options="store().salesMen()"
          :trigger-on-focus="false"
          placeholder="请选择"
          filter-zero
          clearable
          highlight-first-item
          class="switch-focus focus-salesManId"
          @intput-enter="debouncedHandleInputEnter"
        />
      </el-form-item>
    </el-form>
    <div class="dialog-footer-align" style="margin: 20px 0 5px 0;">
      <el-button
        class="switch-focus focus-button"
        type="primary"
        size="mini"
        plain
        @click="sureHandle"
        @keyup.right.native="cancelFocus = true"
        @keyup.left.native="cancelFocus = true"
      >
        确定（F3）
      </el-button>
      <el-button
        v-delay-focus="cancelFocus"
        type="primary"
        size="mini"
        plain
        @click="cancelHandle"
        @keyup.right.native="getSureFocus"
        @keyup.left.native="getSureFocus"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import debounce from "throttle-debounce/debounce";
import hotkeys from "hotkeys-js";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

let oldKeyScope;

export default {
  name: "ChangeCooperatorManager",
  mixins: [searchMixin],
  props: {
    isPurchaseMan: Boolean,
    isSalesMan: Boolean,
    staffId: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      keyScope: Symbol("changeCooperatorManager"),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter), // 解决回车导致两个切换问题
      focusData: {
        updateIndex: 0,
        initial: null,
        type: null
      },
      header: {
        purchaseManId: 0,
        salesManId: 0
      },
      cancelFocus: false
    };
  },
  computed: {
    salesMen() {
      return store.salesMen().filter(item => item.id != this.staffId);
    },
    purchaseMen() {
      return store.purchaseMen().filter(item => item.id != this.staffId);
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value, oldValue) {
        if (value) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            this.updateFocusData({ initial: "focus-purchaseManId" });
            hotkeys.setScope(this.keyScope);
          }, 100);
        } else if (oldValue) {
          hotkeys.setScope(oldKeyScope);
          this.$refs.headerForm.resetFields();
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$store.dispatch("admin/purchaseMan/loadAll");
    this.$store.dispatch("admin/salesMan/loadAll");
    hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
          break;
        case "up":
        case "down":
          e.preventDefault();
          this.updateFocusData({ type: handler.key });
          this.cancelFocus = false;
          break;
        default:
          return;
      }
    });
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    store() {
      return store;
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    getSureFocus() {
      this.cancelFocus = false;
      this.updateFocusData({ initial: "focus-button" });
    },
    sureHandle() {
      this.$emit("on-change", { ...this.header });
      this.cancelHandle();
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
