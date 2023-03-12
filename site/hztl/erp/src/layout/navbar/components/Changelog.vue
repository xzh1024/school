<template>
  <div style="display: inline; line-height: 30px;">
    <span
      :class="hasNewVersion ? 'version-color' : ''"
      style="cursor: pointer; font-size: 14px;"
      @click="isBoxVisible = true"
      >{{ currentVersion }}</span
    >
    <ht-dialog
      :visible.sync="isBoxVisible"
      title="更新日志"
      width="700px"
      top="7vh"
    >
      <ht-card :title="`版本号：${version}`" no-background>
        <div
          slot="after-title"
          style="text-align: right; height: 24px; line-height: 24px"
          class="text-font"
        >
          更新日期：{{ logDate }}
        </div>
        <div class="text-color">
          <div style="margin-top: 5px; font-weight: bold;">
            更新内容：
          </div>
          <div
            v-if="showType === 'html'"
            v-html="text"
            style="max-height:400px;overflow-y:auto;"
          ></div>
          <pre
            v-else
            style="margin: 5px 0; height: 380px; overflow: auto;"
            v-text="text"
          />
        </div>
      </ht-card>
      <div slot="footer" class="dialog-footer-align">
        <el-button
          :disabled="!canClickLast"
          type="primary"
          size="mini"
          @click="getLastLogDateInfo"
        >
          上一版
        </el-button>
        <el-button type="primary" size="mini" @click="isBoxVisible = false">
          关闭
        </el-button>
        <el-button
          :disabled="!canClickNext"
          type="primary"
          size="mini"
          @click="getNextLogDateInfo"
        >
          下一版
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/date";
import { reqVersionLog } from "@/api/changelog";

export default {
  name: "Changelog",
  data() {
    return {
      isBoxVisible: false,
      logDate: "",
      version: "",
      currentVersion: "",
      text: "",
      newEdition: {},
      oldEdition: {},
      previousId: 0,
      nextId: 0
    };
  },
  computed: {
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
    canClickLast() {
      return this.previousId;
    },
    canClickNext() {
      return this.nextId;
    },
    showType() {
      return this.text && this.text.indexOf(">") > 0 ? "html" : "text";
    }
  },
  watch: {
    isBoxVisible(value) {
      if (value) {
        this.getLogDateInfo();
      }
    }
  },
  mounted() {
    this.oldEdition = JSON.parse(localStorage.getItem("logEdition")) || {};
    this.getLogDateInfo();
  },
  methods: {
    formatter(val) {
      return dateFormat(val);
    },
    getLogDateInfo() {
      reqVersionLog(0).then(data => {
        this.currentVersion = data.versionStr;
        this.logDate = data.releaseDate;
        this.version = data.versionStr;
        this.text = data.doc;
        this.previousId = data.previousId;
        this.nextId = data.nextId;
        this.newEdition = {
          version1: data.version1,
          version2: data.version2,
          version3: data.version3,
          version4: data.version4
        };
      });
    },
    getLastLogDateInfo() {
      reqVersionLog(this.previousId)
        .then(data => {
          this.logDate = data.releaseDate;
          this.version = data.versionStr;
          this.text = data.doc;
          this.previousId = data.previousId;
          this.nextId = data.nextId;
        })
        .catch(() => {});
    },
    getNextLogDateInfo() {
      reqVersionLog(this.nextId)
        .then(data => {
          this.logDate = data.releaseDate;
          this.version = data.versionStr;
          this.text = data.doc;
          this.previousId = data.previousId;
          this.nextId = data.nextId;
        })
        .catch(() => {});
    }
  }
};
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
