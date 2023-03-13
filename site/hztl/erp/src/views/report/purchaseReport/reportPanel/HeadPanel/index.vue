<template>
  <el-row :gutter="10" style="min-width:1300px;margin-right:0">
    <el-col :span="8">
      <div class="eachPanel" @click="toReport">
        <span class="icon report"></span>
        <h4>采购明细报表</h4>
        <span class="enter">进入</span>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="eachPanel" style="border-color:#50E3C2" @click="toSupplier">
        <span class="icon supplier"></span>
        <h4>供应商供货报表</h4>
        <span class="enter" style="background:#50E3C2">进入</span>
      </div>
    </el-col>
    <!-- <el-col :span="8">
      <div class="eachPanel" style="borderColor: #3AA7FF" @click="toReplen">
        <span class="icon replen"></span>
        <h4>补货报表</h4>
        <span class="enter" style="background:#3AA7FF" 
          >进入</span
        >
      </div>
    </el-col> -->
  </el-row>
</template>
<script>
export default {
  name: "HeadPanel",
  data() {
    return {};
  },
  methods: {
    toReport() {
      this.$router.push({
        name: "purchaseReportList"
      });
    },
    toSupplier() {
      this.$router.push({
        name: "supplierReportList"
      });
    },
    toReplen() {
      this.$router.push("replenList");
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
    background-image: url("~@/assets/images/supplier-icon.png");
  }

  .report {
    background-image: url("~@/assets/images/report-icon.png");
  }

  .replen {
    background-image: url("~@/assets/images/replen-icon.png");
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
