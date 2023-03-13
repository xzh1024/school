<template>
  <div style="display: inline; line-height: 30px;">
    <ht-dialog
      v-if="newVersionVisible"
      :visible.sync="newVersionVisible"
      :close-on-click-modal="false"
      width="700px"
      title="发现新版本，请刷新体验"
      top="7vh"
      v-bind="$attrs"
      v-on="$listeners"
      @close="handleClose"
    >
      <ht-card no-background>
        <div class="text-color">
          <div style="margin-top: 5px; font-weight: bold;">
            更新内容：
          </div>
          <div
            v-html="text"
            style="margin: 5px 0; height: 380px; overflow: auto;"
          ></div>
        </div>
      </ht-card>
      <div slot="footer" class="dialog-footer-align">
        <el-button type="primary" size="mini" @click="hideDialog">
          稍后再提示
        </el-button>
        <el-button type="primary" size="mini" @click="refreshNow">
          立即刷新
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import hotkeys from "hotkeys-js";
import { reqVersionLog } from "@/api/changelog";
import { mapState } from "vuex";
import * as store from "@/utils/store";

const INTERVAL_TIME = 10 * 60 * 1000;
let oldKeyScope = Symbol();

export default Vue.extend({
  name: "NewVersion",
  data() {
    return {
      timer: null,
      newVersionVisible: false,
      text: "",
      oldEdition: {},
      newEdition: {}
    };
  },
  computed: {
    ...mapState("admin/user", ["userInfoMsg"])
  },
  watch: {
    newVersionVisible(value) {
      if (value) {
        oldKeyScope = hotkeys.getScope();
        this.setKeyScope(null);
      } else {
        hotkeys.setScope(oldKeyScope);
      }
    }
  },
  mounted() {
    this.initVersionInfo();
    this.checkNewVersionCircle();
  },
  beforeDestroy() {
    this.clearNewVersionInterval();
  },
  methods: {
    checkNewVersionCircle() {
      this.clearNewVersionInterval();
      this.timer = setInterval(() => {
        if (!this.newVersionVisible) {
          // 10分钟后调用api接口
          this.checkVersionInfo();
        }
      }, INTERVAL_TIME);
    },
    checkNewVersionLater() {
      this.newVersionVisible = false;
      this.checkNewVersionCircle();
    },
    clearNewVersionInterval() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    refreshNow() {
      // 取消浏览器关闭弹框
      window.onbeforeunload = () => undefined;
      this.clearNewVersionInterval();
      window.location.reload();
    },
    hideDialog() {
      this.newVersionVisible = false;
      this.handleClose();
    },
    handleClose() {
      this.checkNewVersionLater();
    },
    initVersionInfo() {
      reqVersionLog(0).then(data => {
        this.newEdition = {
          version1: data.version1,
          version2: data.version2,
          version3: data.version3,
          version4: data.version4
        };
        localStorage.setItem("logEdition", JSON.stringify(this.newEdition));
      });
    },
    checkVersionInfo() {
      if (!store.userInfoMsg()) {
        return;
      }
      reqVersionLog(0).then(data => {
        this.text = data.doc;
        this.newEdition = {
          version1: data.version1,
          version2: data.version2,
          version3: data.version3,
          version4: data.version4
        };
        this.oldEdition = JSON.parse(localStorage.getItem("logEdition"));
        if (this.hasNewVersion() && !this.newVersionVisible) {
          this.newVersionVisible = true;
        }
      });
    },
    hasNewVersion() {
      return (
        this.oldEdition.version1 < this.newEdition.version1 ||
        (this.oldEdition.version1 == this.newEdition.version1 &&
          this.oldEdition.version2 < this.newEdition.version2) ||
        (this.oldEdition.version1 == this.newEdition.version1 &&
          this.oldEdition.version2 == this.newEdition.version2 &&
          this.oldEdition.version3 < this.newEdition.version3) ||
        (this.oldEdition.version1 == this.newEdition.version1 &&
          this.oldEdition.version2 == this.newEdition.version2 &&
          this.oldEdition.version3 == this.newEdition.version3 &&
          this.oldEdition.version4 < this.newEdition.version4)
      );
    },
    setKeyScope(keyScope) {
      hotkeys.setScope(keyScope);
    }
  }
});
</script>

<style lang="stylus" scoped>
@import '../../../assets/base.styl';

.version-color {
    color: $color-warning;
}

.text-color {
    color: $color-text-primary;
}

/deep/ .title {
    height: 24px;
    line-height: 24px;
}

/deep/ .el-card__body {
    padding: 0 8px;
}

/deep/ .el-dialog__header {
    padding: 0 0 0 20px;
    height: 54px;
    line-height: 54px;
}

/deep/ .el-badge__content.is-fixed.is-dot {
    right: 20px;
    top: 20px;
}

.item-log {
    /deep/ .el-badge__content.is-fixed.is-dot {
        display: none;
    }
}
</style>
