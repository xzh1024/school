<template>
  <div :class="billStatusColor" class="bill-status-bar">
    <div class="bill-status-text">{{ billNo }}</div>
    <div v-show="billNo" class="cricle-dot" />
    <span class="bill-status-text">{{ billStatus }}</span>
  </div>
</template>

<script>
const COMPLETES = ["完成", "已完成"];

export default {
  name: "BillStatusBar",
  props: {
    billStatus: {
      type: String
    },
    billNo: {
      type: String
    }
  },
  computed: {
    billStatusColor() {
      return {
        "bill-uncomplete":
          this.billStatus !== "待提交" && !COMPLETES.includes(this.billStatus),
        "bill-complete": COMPLETES.includes(this.billStatus)
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";
.bill-status-bar {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: $color-bg-primary;
  @include font_color("color-bg-primary");

  .cricle-dot {
    width: 4px;
    height: 4px;
    margin: 0 5px;
    border-radius: 100%;
    background-color: $color-bg-primary;
    @include background_color("color-bg-primary");
  }
  &.bill-complete {
    color: $color-success;
    .cricle-dot {
      background-color: $color-success;
    }
  }
  &.bill-uncomplete {
    color: $color-warning;
    .cricle-dot {
      background-color: $color-warning;
    }
  }
}
</style>
