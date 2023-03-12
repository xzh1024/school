<template>
  <div
    class="menu-card"
    :class="{ 'is-disabled': disabled }"
    @click="handleClick"
  >
    <div class="menu-icon" :class="[icon]"></div>
    <div class="menu-content">
      <div class="menu-name">{{ name }}</div>
      <div class="menu-text">{{ text }}</div>
    </div>
    <slot name="last"></slot>
  </div>
</template>

<script>
export default {
  name: 'MenuCard',
  props: {
    icon: String,
    name: String,
    text: String,
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="less" scoped>
.menu-card {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 @padding-size-main;
  background: #ffffff;
  border: 1px solid #ebebeb;
  user-select: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 28px 0px rgba(0, 0, 0, 0.07),
      0px 2px 16px -8px rgba(0, 0, 0, 0.08);
  }
  &.is-disabled {
    background: #f5f5f5;
    border-color: #f5f5f5;
    cursor: auto;
    &:hover {
      box-shadow: none;
    }
    .menu-content {
      flex: 1;
      .menu-name {
        color: #999999;
      }
    }
  }
  .menu-icon {
    margin-right: @margin-size-main;
  }
  .menu-content {
    flex: 1;
    .menu-name {
      line-height: 24px;
      font-size: 16px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .menu-text {
      margin-top: 4px;
      font-size: 12px;
      line-height: 20px;
      color: #999999;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
}
</style>
