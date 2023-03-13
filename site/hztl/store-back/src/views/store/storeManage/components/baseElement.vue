<template>
  <div class="base-element">
    <div class="element-list">
      <template v-for="(item, index) in iconList">
      <div
      v-if="item.moduleType === moduleType"
        class="element-item"
        
        :key="index"
        @click="addIcon(item)"
      >
        <div class="element-icon" :class="item.icon"></div>
        <div class="element-name">{{ item.name }}</div>
        <div class="element-num" v-if="item.maxMum">
          ({{ item.mum }}/{{ item.maxMum }})
        </div>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseElement",
  props: {
    EventBus: Object,
    iconList: Array,
    previewList: Array,
    moduleType: {
      type: String,
      default: "base" // marketing
    }
  },
  methods: {
    addIcon(item) {
      const param = JSON.parse(JSON.stringify(item));
      if (param.mum < param.maxMum) {
        this.previewList.forEach(item => {
          item.checked = false;
        });
        param.checked = true;
        this.previewList.push(param);
        this.$emit("setEditItem", param);
        this.$nextTick(() => {
          this.EventBus.$emit("previewScroll");
        });
      } else {
        this.$message.warning("此组件已达到最大数量，无法继续添加！");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.base-element {
  .element-list {
    padding: 16px;
    user-select: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    .element-item {
      width: 64px;
      height: 82px;
      margin-bottom: 8px;
      text-align: center;
      background: #ffffff;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        color: @color-link;
        box-shadow: 0px 0px 15px -4px rgba(101, 137, 248, 0.52);
      }
      .element-icon {
        margin-top: 2px;
        font-size: 28px;
        line-height: 32px;
      }
      .element-name {
        font-size: 14px;
        line-height: 22px;
      }
      .element-num {
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
}
</style>
