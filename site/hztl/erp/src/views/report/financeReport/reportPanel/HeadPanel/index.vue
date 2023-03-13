<template>
  <el-row>
    <el-col :span="8">
      <div
        class="eachPanel"
        style="borderColor: #3AA7FF"
        @click="toFinanceReportList"
      >
        <span class="icon finance"></span>
        <h4>销售回款率分析</h4>
        <span class="enter" style="background: #3AA7FF">进入</span>
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
    toFinanceReportList() {
      this.$router.push({
        name: "financeReportList"
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

  .finance {
    background-image: url("~@/assets/images/head-finance.png");
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
