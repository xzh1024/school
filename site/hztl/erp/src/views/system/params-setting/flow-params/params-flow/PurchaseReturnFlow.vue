<script>
export default {
  name: "PurchaseReturnFlow",
  render() {
    return (
      <div>
        <div class="flow-name text-font-primary" style="margin-top: 0;">
          简易流程：
        </div>
        <el-steps active={4} class="flow-container">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="开单" icon="icon-flow-step" />
          <el-step title="财务结算并自动出库" icon="icon-flow-step" />
          <el-step title="结束" icon="icon-flow-step-small" />
        </el-steps>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.flow-container {
  margin: 10px 0 10px 10px;

  &::v-deep .el-step__icon {
    background: #fbfbfb;
    @include background_color("color-content-bg");
  }
  &::v-deep .el-step__title {
    margin-right: 10px;
    line-height: 22px;
    font-size: 14px;
  }
}
.flow-name {
  margin: 30px 10px 0 10px;
  font-size: 16px;
}
</style>
