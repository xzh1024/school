<script lang="ts">
  // #ifdef MP-WEIXIN
  const updateManager = uni.getUpdateManager();
  updateManager.onUpdateReady(function () {
    uni.showModal({
      title: "更新提示",
      content: "新版本已经准备好，是否重启应用？",
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      }
    });
  });
  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
  });
  // #endif
  export default {
    onLaunch: function () {
      console.warn(
        "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！"
      );
      console.log("App Launch");
    },
    onShow: function () {
      console.log("App Show");
      // #ifdef MP-WEIXIN
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate);
      });
      // #endif
    },
    onHide: function () {
      console.log("App Hide");
    }
  };
</script>

<style lang="scss">
  @import "@/styles/common.scss";
  page {
    background-color: #f6f6f6;
  }

  .container {
    padding: 32rpx;
    box-sizing: border-box;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .bg-green {
    background-color: #3d9a55;
  }
</style>
