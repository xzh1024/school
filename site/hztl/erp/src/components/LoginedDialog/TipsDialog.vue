<template>
  <ht-dialog
    v-bind="$attrs"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    title="服务到期提示"
    width="510px"
    append-to-body
    v-on="$listeners"
  >
    <div class="tips-container" v-html="tips"></div>
    <div slot="footer" style="text-align: center;">
      <el-button
        v-if="showXF"
        type="primary"
        size="mini"
        plain
        @click="gotoRenewal"
      >
        去续费
      </el-button>
      <el-button type="primary" size="mini" plain @click="gotoHandle">
        知道了（{{ countdown }}s）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { sleep } from "@/utils/tool";
import * as store from "@/utils/store";
import { gotoRenewal } from "@/utils/message";
import { uiConfig } from "envConfigPath";

export default {
  name: "TipsDialog",
  data() {
    return {
      uiConfig,
      countdown: 0
    };
  },
  computed: {
    accountSetStatus() {
      if (store.userInfoMsg()) {
        return store.userInfoMsg().accountSetStatus;
      } else {
        return null;
      }
    },
    showXF() {
      return !store.isYx();
    },
    tips() {
      if (store.userInfoMsg()) {
        if (uiConfig && uiConfig.uiTheme === "denso") {
          return `${
            store.userInfoMsg().dueTips
          },为保障您的工作正常开展，请及时绑定云诊车诊断仪并确保诊断仪在有效期间内。`;
        } else {
          return `${
            store.userInfoMsg().dueTips
          }，为保障您的工作开展，请及时为账套服务续费。<br />客服电话：${
            store.userInfoMsg().customerServicePhone
          }`;
        }
      } else {
        return "";
      }
    }
  },
  watch: {
    "$attrs.visible"(val) {
      if (val && this.accountSetStatus === 0) {
        this.countdown = 5;
        this.handleCountdown();
      }
    }
  },
  methods: {
    async handleCountdown() {
      await sleep(1000);
      this.countdown--;
      if (this.countdown > 0) {
        await this.handleCountdown();
      } else {
        this.gotoHandle();
      }
    },
    gotoHandle() {
      this.hideBox();
      this.$emit("on-goto");
    },
    gotoRenewal() {
      return gotoRenewal();
    },
    outLogin() {
      this.hideBox();
      this.$emit("on-out-login");
    },
    hideBox() {
      this.$emit("update:visible", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.tips-container {
  margin: 20px 20px 0 20px;
  line-height: 40px;
  font-size: 18px;
}
</style>
