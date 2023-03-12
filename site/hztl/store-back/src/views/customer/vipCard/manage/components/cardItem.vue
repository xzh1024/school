<template>
  <div
    class="card-item"
    :class="{'cursor-pointer': buttonShow}"
    :style="{ background: item.color }"
    @click="handleClick(item)"
  >
    <div class="card-status">{{ item.statusName }}</div>
    <div class="card-button" v-if="buttonShow">{{ buttonText }}</div>
    <div class="card-name">{{ item.name }}</div>
    <div class="card-no">{{ item.cardNo }}</div>
    <div class="card-count" v-if="$store.state.base.companyType === 'garage'">
      <div class="card-count-item">
        <div>现金金额</div>
        <div>{{ item.cardBalance.cash }}元</div>
      </div>
      <el-divider direction="vertical" class="divider-base"></el-divider>
      <div class="card-count-item">
        <div>项目剩余</div>
        <div>
          {{
            (item.cardBalance.projects &&
              item.cardBalance.projects.reduce(
                (pre, cur) => pre + Number(cur.qty),
                0
              )) ||
              0
          }}次
        </div>
      </div>
      <el-divider direction="vertical" class="divider-base"></el-divider>
      <div class="card-count-item">
        <div>套餐剩余</div>
        <div>
          {{
            (item.cardBalance.packages &&
              item.cardBalance.packages.reduce(
                (pre, cur) => pre + Number(cur.qty),
                0
              )) ||
              0
          }}个
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    item: {
      type: Object,
      require: true
    },
    buttonText: {
      type: String,
      default: "充值"
    },
    buttonShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClick(data) {
      if (this.buttonShow) {
        this.$emit("handleClick", data);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cursor-pointer {
  cursor: pointer;
}
.card-item {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 282px;
  height: 126px;
  margin-left: @margin-size-secondary;
  padding: @padding-size-main;
  border-radius: 8px;
  color: #ffffff;
  transition: all 0.3s;
  &:first-child {
    margin-left: 0;
  }
  &.is-active {
    transform: translateY(-8px);
  }
  .card-status {
    position: absolute;
    right: 0;
    top: 0;
    background: rgba(white, 0.2);
    height: 16px;
    line-height: 16px;
    padding: 3px 6px;
    font-size: 12px;
    border-radius: 0 8px 0 8px;
  }
  .card-button {
    position: absolute;
    right: 16px;
    top: 30px;
    width: 44px;
    height: 24px;
    line-height: 24px;
    background: #ff4d4f;
    border-radius: 2px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    user-select: none;
  }
  .card-name {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-weight: @strong;
  }
  .card-no {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .card-count {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 20px;
    margin-top: @margin-size-secondary;
    .card-count-item {
      flex: 1;
      text-align: center;
    }
    .divider-base {
      width: 1px;
      background-color: rgba(255, 255, 255, 0.45);
    }
  }
}
</style>
