<template>
  <div :class="`eachInfo ${infoData.className}`">
    <h4 class="title">
      <span style="position: relative;">
        <span>
          {{ infoData.name }}
        </span>
        <el-tooltip
          v-show="infoData.view"
          :enterable="false"
          placement="bottom-start"
          effect="dark"
          trigger="hover"
        >
          <div slot="content">
            <div v-for="(item, index) in infoData.view" :key="index">
              <div class="item-container">
                <div v-show="item.name" style="margin-right: 5px;">
                  {{ item.name }}：
                </div>
                <div>{{ item.value }}</div>
              </div>
            </div>
          </div>
          <i
            class="icon-view"
            style="position:absolute;top:2px;right:-19px;"
          ></i>
        </el-tooltip>
      </span>
    </h4>
    <div class="text-font-primary">{{ infoData.value }}</div>
  </div>
</template>

<script>
export default {
  name: "ViewItem",
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
.eachInfo {
  flex: 1;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;

  & + .eachInfo {
    margin-top: 10px;
  }

  &.status_blue {
    .status_icon {
      border-color: #3aa7ff;
    }
    &:hover {
      cursor: pointer;
      background: #ffffff;
      box-shadow: 0 2px 6px 0 rgba(58, 167, 255, 0.39);
    }
  }
}
.title {
  font-size: 16px;
  margin: 0 0 8px;
}
.item-container {
  display: flex;
  margin: 0 0 8px;
  font-size: 14px;
  line-height: 20px;
}
.icon-view {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-view.png");
  background-size: 100% 100%;
}
</style>
