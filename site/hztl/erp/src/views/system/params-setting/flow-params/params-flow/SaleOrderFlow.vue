<script>
export default {
  name: "SaleOrderFlow",
  render() {
    return (
      <div>
        <div class="flow-name text-font-primary" style="margin-top: 0;">
          完整流程：
        </div>
        <el-steps active={6} class="flow-container">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="开单" icon="icon-flow-step" />
          <el-step title="定金审核" icon="icon-flow-step" />
          <el-step title="订单审核" icon="icon-flow-step" />
          <el-step title="转销售单" icon="icon-flow-step" />
          <el-step title="结束" icon="icon-flow-step-small" />
        </el-steps>

        <div class="flow-name text-font-primary" style="margin-top: 0;">
          完整流程一：
        </div>
        <el-steps active={5} class="flow-container">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="开单" icon="icon-flow-step" />
          <el-step icon="icon-flow-step">
            <div slot="title">
              <div>订单审核 +</div>
              <div>定金审核</div>
            </div>
          </el-step>
          <el-step title="转销售单" icon="icon-flow-step" />
          <el-step title="结束" icon="icon-flow-step-small" />
        </el-steps>

        <div class="flow-name text-font-primary">简易流程：</div>
        <el-steps active={5} class="flow-container" style="width: 75%;">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="开单" icon="icon-flow-step" />
          <el-step title="定金审核" icon="icon-flow-step" />
          <el-step icon="icon-flow-step">
            <div slot="title">
              <div>订单审核 +</div>
              <div>转销售单</div>
            </div>
          </el-step>
          <el-step title="结束" icon="icon-flow-step-small" />
        </el-steps>

        <div class="flow-name text-font-primary">简易流程一：</div>
        <el-steps active={4} class="flow-container" style="width: 75%;">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="开单" icon="icon-flow-step" />
          <el-step icon="icon-flow-step">
            <div slot="title">
              <div>订单审核 +</div>
              <div>定金审核 +</div>
              <div>转销售单</div>
            </div>
          </el-step>
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
