<template>
  <div :class="`status_each ${infoData.className}`">
    <h4 class="status">
      <span class="status_icon"></span>
      {{ infoData.name }}
    </h4>
    <div v-for="(item, index) in infoData.details" :key="index">
      <div class="item-container">
        <div v-show="item.name">
          {{ item.name }}
        </div>
        <div style="margin-left: 5px;">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    infoData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.status_each {
  flex: 1;
  margin: 0;
  height: 114px;
  background: #fafafa;
  border-radius: 6px;
  padding: 16px;
  .status {
    font-size: 16px;
    margin: 0 0 16px;
    .status_icon {
      margin-right: 5px;
      width: 12px;
      height: 12px;
      background: #ffffff;
      display: inline-block;
      border: 3px solid #3aa7ff;
      border-radius: 50%;
    }
  }

  &.status_orange {
    .status_icon {
      border-color: #f5a623;
    }
    &:hover {
      border-bottom: 7px solid #f5a623;
      background: #ffffff;
      box-shadow: 0 2px 6px 0 rgba(245, 166, 35, 0.4);
    }
  }
  &.status_blue {
    .status_icon {
      border-color: #3aa7ff;
    }
    &:hover {
      border-bottom: 7px solid #3aa7ff;
      background: #ffffff;
      box-shadow: 0 2px 6px 0 rgba(58, 167, 255, 0.39);
    }
  }
  &.status_green {
    .status_icon {
      border-color: #7ed321;
    }
    &:hover {
      border-bottom: 7px solid #7ed321;
      background: #ffffff;
      box-shadow: 0 2px 6px 0 rgba(126, 211, 33, 0.39);
    }
  }
  &.status_grey {
    .status_icon {
      border-color: #9b9b9b;
    }
    &:hover {
      border-bottom: 7px solid #9b9b9b;
      background: #ffffff;
      box-shadow: 0 2px 6px 0 rgba(155, 155, 155, 0.4);
    }
  }
  &.status_purple {
    .status_icon {
      border-color: #c166ff;
    }
    &:hover {
      border-bottom: 7px solid #c166ff;
      background: #ffffff;
      box-shadow: 0 2px 6px 0 rgba(193, 102, 255, 0.39);
    }
  }
}
.item-container {
  display: flex;
  margin: 0;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  font-weight: 500;
  color: #666666;
}
</style>
