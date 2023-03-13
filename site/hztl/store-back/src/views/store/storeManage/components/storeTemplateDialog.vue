<template>
  <el-dialog
    title="选择模版"
    v-loading="load"
    :visible.sync="visible"
    :close-on-click-modal="false"
    width="1060px"
    top="5vh"
  >
    <el-tabs
      tab-position="left"
      type="card"
      :stretch="true"
      style="height: 100%;"
    >
      <el-tab-pane
        v-for="(item, index) in storeTemplates"
        :key="index"
        :label="item.name"
      >
        <div slot="label" class="el-tabs__item-label">
          {{ item.name }}
        </div>
        <div class="template">
          <div class="template-content">
            <div class="template-image">
              <img :src="item.image" />
            </div>
            <div class="template-button">
              <el-button
                type="primary"
                size="mini"
                @click="chooseTemplate(item.id)"
              >
                使用此模板
              </el-button>
            </div>
          </div>
          <div class="template-text">
            {{ item.description }}
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
// import { StoreManageService } from "../services";
// const storeManageService = new StoreManageService();

export default {
  name: "StoreTemplateDialog",
  props: {
    storeTemplates: {
      type: Array
    }
  },
  data() {
    return {
      visible: false,
      load: false,
      // storeTemplates: []
    };
  },
  methods: {
    show() {
      // this.getTemplateList();
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    // 获取模板列表
    // getTemplateList() {
    //   storeManageService.getTemplateList().then(res => {
    //     console.log(res);
    //     this.storeTemplates = res || [];
    //   });
    // },
    // 使用模板
    chooseTemplate(id) {
      this.$emit("chooseTemplate", id);
      // this.load = true;
      // const params = {
      //   template: id
      // };
      // storeManageService
      //   .chooseTemplate(params)
      //   .then(() => {
      //     this.load = false;
      //     this.$emit("updateStoreStatus");
      //     this.hide();
      //   })
      //   .catch(() => {
      //     this.load = false;
      //     this.$message.error("数据获取失败，点击【使用模板】重试！");
      //   });
    }
  }
};
</script>

<style lang="less" scoped>
@main-height: 580px;
/deep/ .el-dialog {
  .el-dialog__header {
    border-bottom: 1px solid @border-color-base;
  }
  .el-dialog__body {
    height: @main-height;
    padding: 0;
    overflow-y: auto;
    background: @bg-color-base;
    .el-tabs--left {
      > .el-tabs__header {
        margin-right: 0;
        border: none;
        background-color: #ffffff;
        .el-tabs__nav {
          border: none;
        }
      }
      .el-tabs__item.is-left {
        width: 136px;
        height: 32px;
        line-height: 32px;
        margin: 8px 12px;
        border: none;
        border-radius: 4px;
        &:hover {
          color: @color-link;
          background-color: #e1e8fa;
        }
        .el-tabs__item-label {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .el-tabs__item.is-left.is-active {
        border-right: none;
        color: @color-link;
        background-color: #e1e8fa;
      }
      .el-tabs__content {
        height: @main-height;
        .el-tab-pane {
          height: @main-height;
        }
        .template {
          width: 100%;
          height: 100%;
          padding: 16px 0;
          box-sizing: border-box;
          display: flex;
          .template-content {
            width: 250px;
            height: 558px;
            margin: 0 40px;
            position: relative;
            overflow: hidden;
            .template-image {
              width: 100%;
              height: calc(100% - 48px);
              box-sizing: border-box;
              overflow-y: auto;
              img {
                width: 100%;
              }
            }
            .template-button {
              width: 100%;
              position: absolute;
              left: 0;
              bottom: 0;
              text-align: center;
              margin-bottom: 6px;
            }
          }
          .template-text {
            flex: 1;
            height: 100%;
            margin-right: 40px;
            overflow-y: auto;
            line-height: 22px;
            color: @text-color-base;
          }
        }
      }
    }
  }
}
</style>
