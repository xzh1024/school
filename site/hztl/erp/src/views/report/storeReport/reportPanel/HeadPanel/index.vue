<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <div class="eachPanel" style="border-color: #50E3C2" @click="toStore">
        <span class="icon report"></span>
        <h4>出入库明细报表</h4>
        <span class="enter" style="background: #50E3C2">进入</span>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="eachPanel" style="borderColor: #3AA7FF" @click="toOverstock">
        <span class="icon supplier"></span>
        <h4>超储商品报表</h4>
        <span class="enter" style="background: #3AA7FF">进入</span>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="eachPanel" style="border-color: #7ED321" @click="toUnsalable">
        <span class="icon replen"></span>
        <h4>滞销商品报表</h4>
        <span class="enter" style="background: #7ED321">进入</span>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getDate } from "../../../common/common";
export default {
  name: "HeadPanel",
  data() {
    return {};
  },
  methods: {
    getDate: getDate,
    toStore() {
      this.$router.push({
        name: "storeReportList"
      });
    },
    toOverstock() {
      this.$router.push({
        name: "overstockReportList"
      });
    },
    toUnsalable() {
      this.$router.push({
        name: "unsalableList"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.eachPanel {
  cursor: pointer;
  position: relative;
  font-family: PingFangSC-Medium;
  height: 80px;
  border-radius: 6px;
  border-left: 6px solid #7ed321;
  overflow: hidden;
  background: #ffffff;

  .icon {
    position: absolute;
    top: 16px;
    left: 32px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-size: 100% 100%;
  }

  .supplier {
    background-image: url("~@/assets/images/head-chaochu.png");
  }

  .report {
    background-image: url("~@/assets/images/icon-churuku.png");
  }

  .replen {
    background-image: url("~@/assets/images/icon-unsale.png");
  }

  h4 {
    margin: 28px 0 0 112px;
    font-size: 18px;
    color: #333333;
    font-weight: 600;
  }

  .enter {
    position: absolute;
    top: 26px;
    right: 32px;
    display: inline-block;
    width: 64px;
    height: 28px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #ffffff;
    border-radius: 16px;
    background: #7ed321;
    cursor: pointer;
    text-align: center;
    line-height: 28px;
  }
}
</style>
