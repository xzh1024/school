<template>
  <div class="eachInfo">
    <h4 class="title">
      <span style="position: relative;">
        <span>
          {{ infoData.name }}
        </span>
        <el-popover
          placement="right"
          width="300"
          trigger="hover"
          :content="infoData.content"
        >
          <i
            class="icon-question"
            slot="reference"
            style="position:absolute;top:2px;right:-19px;"
          ></i>
        </el-popover>
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
            style="position:absolute;top:2px;right:-40px;"
          ></i>
        </el-tooltip>
      </span>
    </h4>
    <div v-for="(item, index) in infoData.details" :key="index">
      <div class="item-container">
        <div v-show="item.name" style="margin-right: 5px;">
          {{ item.name }}
        </div>
        <div>{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoItem",
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
  background-image: linear-gradient(135deg, #3f8eff 0%, #41ccff 100%);
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;

  & + .eachInfo {
    margin-top: 10px;
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
.icon-question {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-ques.png");
  background-size: 100% 100%;
}
.icon-view {
  width: 18px;
  height: 18px;
  background-image: url("~@/assets/css/icons/icon-view.png");
  background-size: 100% 100%;
}
</style>
