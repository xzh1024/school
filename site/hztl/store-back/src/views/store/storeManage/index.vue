<template>
  <div class="store-container" v-loading="load">
    <div class="store-not-open" v-if="storeStatus === 0">
      <div class="not-open-inset"></div>
      <div class="not-open-slogan">
        <div class="not-open-text">
          线上店铺, 足不出户<br />
          助力店铺业绩直线飙升
        </div>
        <div class="not-open-arrow"></div>
        <div></div>
      </div>
      <el-button type="primary" size="mini" @click="storeTemplateDialogShow">
        马上开通我的店铺
      </el-button>
    </div>

    <StoreManageComponent
      ref="storeManageComponent"
      v-if="[1, 2].includes(storeStatus)"
    ></StoreManageComponent>

    <StoreTemplateDialog ref="storeTemplateDialog" :storeTemplates="storeTemplates" @chooseTemplate="chooseTemplate"></StoreTemplateDialog>
  </div>
</template>

<script>
import { StoreManageService } from "./services";
const storeManageService = new StoreManageService();
import StoreManageComponent from "./storeManageComponent.vue";
import StoreTemplateDialog from "./components/storeTemplateDialog.vue";

export default {
  name: "StoreManage",
  components: { StoreManageComponent, StoreTemplateDialog },
  data() {
    return {
      load: false,
      storeStatus: "",
      storeTemplates: []
    };
  },
  methods: {
    storeTemplateDialogShow() {
      this.$refs.storeTemplateDialog.show();
    },
    storeTemplateDialogHide() {
      this.$refs.storeTemplateDialog.hide();
    },
    // getBase() {
    //   storeManageService
    //     .getBase().then(res => {
    //       console.log("--------------------");
    //       console.log(res);
    //       switch (res.companyType) {
    //         case "garage": // 汽修厂
              
    //           break;
    //         case "dealer": // 经销商
              
    //           break;
    //         case "manufacturer": // 生产厂家
              
    //           break;
    //         default:
    //           break;
    //       }
    //     })
    // },
    // 获取模板列表
    getTemplateList() {
      storeManageService.getTemplateList().then(res => {
        const findData = res.find(item => item.check);
        if(findData) {
          this.chooseTemplate(findData.id);
        } else {
          this.storeTemplates = res || [];
          this.storeStatus = 0;
        }
      });
    },
    chooseTemplate(id) {
      this.load = true;
      const params = {
        template: id
      };
      storeManageService
        .chooseTemplate(params)
        .then(() => {
          this.load = false;
          // this.$emit("updateStoreStatus");
          this.getStoreStatus();
          this.storeTemplateDialogHide();
        })
        .catch(() => {
          this.load = false;
          this.$message.error("数据获取失败，点击【使用模板】重试！");
        });
    },
    getStoreStatus() {
      this.load = true;
      storeManageService
        .getStoreStatus()
        .then(res => {
          if (res) {
            // 店铺状态 0:未开通、1:启用、2停用
            // this.storeStatus = res.storeStatus;
            const { storeStatus } = res;
            switch (storeStatus) {
              case 0:
                console.log("未开通");
                this.getTemplateList();
                // this.getBase();
                break;
              default:
                this.storeStatus = storeStatus;
                break;
            }
          }
          this.load = false;
        })
        .catch(() => (this.load = false));
    }
  },
  created() {
    this.getStoreStatus();
  },
  beforeRouteLeave(to, from, next) {
    if ([1, 2].includes(this.storeStatus)) {
      const oldPreviewList = sessionStorage.previewList;
      let newPreviewList = JSON.parse(
        JSON.stringify(this.$refs.storeManageComponent.previewList)
      );
      newPreviewList.forEach(item => {
        delete item.checked;
      });
      newPreviewList = JSON.stringify(newPreviewList);

      let oldPageSetup = sessionStorage.pageSetup;
      const newPageSetup = JSON.stringify(
        this.$refs.storeManageComponent.pageSetupData
      );
      if (oldPreviewList && oldPageSetup) {
        if (
          oldPreviewList === newPreviewList &&
          oldPageSetup === newPageSetup
        ) {
          next();
        } else {
          this.$confirm("数据还未保存，是否离开？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            showClose: false
          })
            .then(() => next())
            .catch(() => next(false));
        }
      } else {
        next();
      }
    } else {
      next();
    }
  }
};
</script>

<style lang="less" scoped>
.store-container {
  width: 100%;
  height: 100%;
  .store-not-open {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .not-open-inset {
      width: 440px;
      height: 349px;
      background: url("~@/assets/img/store/not-open-inset1.png") no-repeat;
      background-size: 100% 100%;
    }
    .not-open-slogan {
      display: flex;
      align-items: center;
      margin: 32px 0;
      .not-open-text {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: @color-link;
        text-align: center;
        line-height: 24px;
        font-weight: 500;
      }
      .not-open-arrow {
        margin-left: 12px;
        width: 57px;
        height: 41px;
        background: url("~@/assets/img/store/not-open-arrow.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
