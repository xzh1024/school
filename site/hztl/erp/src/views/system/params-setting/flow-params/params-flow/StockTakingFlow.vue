<script>
export default {
  name: "StockTakingFlow",
  render() {
    return (
      <div>
        <div class="flow-name text-font-primary" style="margin-top: 0;">
          财务库房同时审核流程：
        </div>
        <el-steps active={4} class="flow-container" style="width: 75%;">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="开单" icon="icon-flow-step" />
          <el-step icon="icon-flow-step">
            <div slot="title">
              <div>库房审核 +</div>
              <div>财务审核</div>
            </div>
          </el-step>
          <el-step title="结束" icon="icon-flow-step-small" />
        </el-steps>
        <div class="flow-name text-font-primary">库房审核后财务审核：</div>
        <el-steps active={5} class="flow-container">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="开单" icon="icon-flow-step" />
          <el-step title="库房审核" icon="icon-flow-step" />
          <el-step title="财务审核" icon="icon-flow-step" />
          <el-step title="结束" icon="icon-flow-step-small" />
        </el-steps>
        <div class="flow-name text-font-primary">财务审核后库房审核：</div>
        <el-steps active={5} class="flow-container">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="开单" icon="icon-flow-step" />
          <el-step title="财务审核" icon="icon-flow-step" />
          <el-step title="库房审核" icon="icon-flow-step" />
          <el-step title="结束" icon="icon-flow-step-small" />
        </el-steps>
        <div class="flow-name text-font-primary">简易流程：</div>
        <el-steps active={3} class="flow-container" style="width: 53%;">
          <el-step title="开始" icon="icon-flow-step-small" />
          <el-step title="财务审核" icon="icon-flow-step" />
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
