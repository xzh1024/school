<template>
  <ht-dialog
    v-switch-focus="focusData"
    :title="contentTitle"
    :visible.sync="tipsVisible"
    width="30%"
    append-to-body
    @click.native.stop="handleSetKeyCode"
    @close="handleCancel"
  >
    <span>{{ contentTips }}</span>
    <p style="padding: 0; margin: 0;">
      {{ contentTips_s }}
    </p>
    <div slot="footer" class="dialog-footer-align" style="margin: 5px 0;">
      <el-button
        type="primary"
        size="mini"
        plain
        class="switch-focus focus-sure"
        @click="handleSure"
      >
        确定（F3）
      </el-button>
      <el-button
        v-if="isClose"
        type="primary"
        size="mini"
        plain
        class="switch-focus focus-cancel"
        @click="handleCancel"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import hotkeys from "hotkeys-js";
import {
  checkSelectCooperators,
  updateSelectCooperators
} from "@/api/communion/communion";
import eventBus from "@/event";
let oldKeyScope;

const defaultFocusData = {
  updateIndex: 0,
  initial: null,
  type: null
};

export default {
  name: "VerifyCooperator",
  data() {
    return {
      contentTitle: "",
      contentTips: "",
      // eslint-disable-next-line @typescript-eslint/camelcase
      contentTips_s: "",
      tipsVisible: false,
      contentMsg: {
        type1: "当前输入的往来单位名称不存在，是否新增？",
        title1: "往来单位不存在提示",
        type2: "当前输入的往来单位名称不存在，无法继续开单。",
        // eslint-disable-next-line @typescript-eslint/camelcase
        type2_s: "请联系管理员添加往来单位后重试。",
        title2: "往来单位无权提示",
        type3: "当前输入的往来单位名称已经存在于账套中，但当前公司无权使用!",
        // eslint-disable-next-line @typescript-eslint/camelcase
        type3_s: "是否为本店设置使用权限？",
        title3: "往来单位停用提示",
        type4: "当前输入的往来单位名称已经存在于账套中，但为停用状态!",
        // eslint-disable-next-line @typescript-eslint/camelcase
        type4_s: "是否启用？",
        type5: "当前输入的往来单位名称已经存在于账套中，但当前公司无权使用!",
        // eslint-disable-next-line @typescript-eslint/camelcase
        type5_s: "请联系管理员修改往来单位权限后重新开单。",
        type6: "当前输入的往来单位名称已经存在于账套中，但为停用状态!",
        // eslint-disable-next-line @typescript-eslint/camelcase
        type6_s: "请联系管理员启用往来单位权限后重新开单。",
        title4: "往来单位类型不符提示",
        type7:
          "当前输入的往来单位名称已经存在于账套中，但类型不包含(客户/供应商)",
        // eslint-disable-next-line @typescript-eslint/camelcase
        type7_s: "是否为该单位添加（客户/供应商）类型。",
        type8:
          "当前输入的往来单位名称已经存在于账套中，但类型不包含(客户/供应商)",
        // eslint-disable-next-line @typescript-eslint/camelcase
        type8_s: "请联系管理员修改往来单位类型后再试。"
      },
      custromName: "",
      keyScope: Symbol("createCooperatorDialog"),
      focusData: {
        ...defaultFocusData
      },
      isClose: true,
      localRes: Object,
      localCooperatorId: null,
      cooperatorType: ""
    };
  },
  watch: {
    tipsVisible: {
      handler(val, oldVal) {
        if (val) {
          oldKeyScope = hotkeys.getScope();
          setTimeout(() => {
            this.updateFocusData({
              initial: "focus-sure"
            });
            hotkeys.setScope(this.keyScope);
          }, 300);
        } else if (oldVal) {
          hotkeys.setScope(oldKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    eventBus.$on("handleAbnormalCooperator", this.handleAbnormalCooperator);
    this.bindKeyboard();
  },
  destroyed() {
    eventBus.$off("handleAbnormalCooperator", this.handleAbnormalCooperator);
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    bindKeyboard() {
      hotkeys(
        "f3,up,down,left,right",
        { scope: this.keyScope },
        (e, handler) => {
          switch (handler.key) {
            case "f3":
              this.handleSure();
              break;
            case "up":
            case "left":
              e.preventDefault();
              this.updateFocusData({ type: "up" });
              break;
            case "down":
            case "right":
              e.preventDefault();
              this.updateFocusData({ type: "down" });
              break;
            default:
              return;
          }
        }
      );
    },
    handleSetKeyCode() {
      hotkeys.setScope(this.keyScope);
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    },
    async checkCooperatorAvailability(id) {
      const res = await checkSelectCooperators(id, {
        type: this.cooperatorType
      });
      this.localRes = { ...res };
      return res;
    },
    async updateCooperatorsMakeAvailable(id, params) {
      const res = await updateSelectCooperators(id, params);
      return res;
    },
    handleSumitCheck(val) {
      this.checkCooperatorAvailability(val).then(data => {
        if (data.code === 0) {
          eventBus.$emit("changeLoaclCooperatorInfo", val);
        } else if (data.code === 2 && data.perm) {
          this.contentTitle = this.contentMsg["title2"];
          this.contentTips = this.contentMsg["type3"];
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.contentTips_s = this.contentMsg["type3_s"];
          this.tipsVisible = true;
        } else if (data.code === 3 && data.perm) {
          this.contentTitle = this.contentMsg["title3"];
          this.contentTips = this.contentMsg["type4"];
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.contentTips_s = this.contentMsg["type4_s"];
          this.tipsVisible = true;
        } else if (data.code === 2 && !data.perm) {
          this.isClose = false;
          this.contentTitle = this.contentMsg["title2"];
          this.contentTips = this.contentMsg["type5"];
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.contentTips_s = this.contentMsg["type5_s"];
          this.tipsVisible = true;
        } else if (data.code === 3 && !data.perm) {
          this.isClose = false;
          this.contentTitle = this.contentMsg["title3"];
          this.contentTips = this.contentMsg["type6"];
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.contentTips_s = this.contentMsg["type6_s"];
          this.tipsVisible = true;
        } else if (data.code === 4 && data.perm) {
          this.contentTitle = this.contentMsg["title4"];
          this.contentTips = this.contentMsg["type7"];
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.contentTips_s = this.contentMsg["type7_s"];
          this.tipsVisible = true;
        } else if (data.code === 4 && !data.perm) {
          this.isClose = false;
          this.contentTitle = this.contentMsg["title4"];
          this.contentTips = this.contentMsg["type8"];
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.contentTips_s = this.contentMsg["type8_s"];
          this.tipsVisible = true;
        }
      });
    },
    handleSure() {
      if (this.custromName) {
        if (this.localRes.code === 1 && this.localRes.perm) {
          this.tipsVisible = false;
          hotkeys.setScope(oldKeyScope);
          eventBus.$emit("noMatchcCooperator", {
            type: this.cooperatorType,
            name: this.custromName
          });
        } else if (this.localRes.code === 1 && !this.localRes.perm) {
          this.tipsVisible = false;
        }
      } else {
        if (this.localRes.code === 2 && this.localRes.perm) {
          this.updateCooperatorsMakeAvailable(this.localCooperatorId, {
            type: this.cooperatorType,
            code: this.localRes.code
          }).then(() => {
            this.tipsVisible = false;
            this.handleSumitCheck(this.localCooperatorId);
          });
        } else if (this.localRes.code === 2 && !this.localRes.perm) {
          this.tipsVisible = false;
        } else if (this.localRes.code === 3 && this.localRes.perm) {
          this.updateCooperatorsMakeAvailable(this.localCooperatorId, {
            type: this.cooperatorType,
            code: this.localRes.code
          }).then(() => {
            this.tipsVisible = false;
            this.handleSumitCheck(this.localCooperatorId);
          });
        } else if (this.localRes.code === 0) {
          eventBus.$emit("changeLoaclCooperatorInfo", this.localCooperatorId);
        } else if (this.localRes.code === 3 && !this.localRes.perm) {
          this.tipsVisible = false;
        } else if (this.localRes.code === 4 && this.localRes.perm) {
          this.updateCooperatorsMakeAvailable(this.localCooperatorId, {
            type: this.cooperatorType,
            code: this.localRes.code
          }).then(() => {
            this.tipsVisible = false;
            this.handleSumitCheck(this.localCooperatorId);
          });
        } else if (this.localRes.code === 4 && !this.localRes.perm) {
          this.tipsVisible = false;
        } else {
          this.tipsVisible = false;
        }
      }
    },
    handleNoMatchCooperator() {
      this.checkCooperatorAvailability(0).then(data => {
        if (data.code === 1 && data.perm) {
          this.contentTitle = this.contentMsg["title1"];
          this.contentTips = this.contentMsg["type1"];
          this.tipsVisible = true;
        } else if (data.code === 1 && !data.perm) {
          this.isClose = false;
          this.contentTitle = this.contentMsg["title1"];
          this.contentTips = this.contentMsg["type2"];
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.contentTips_s = this.contentMsg["type2_s"];
          this.tipsVisible = true;
        }
      });
    },
    handleCancel() {
      this.tipsVisible = false;
      eventBus.$emit("cleanLoaclCooperatorInfo");
    },
    handleAbnormalCooperator(val) {
      this.cooperatorType = val.cooperatorType;
      switch (val.type) {
        case "create1":
          this.custromName = val.cooperatorName;
          this.handleNoMatchCooperator();
          break;
        case "match1":
          this.custromName = "";
          this.localCooperatorId = val.cooperatorId;
          this.handleSumitCheck(val.cooperatorId);
          break;
      }
    }
  }
};
</script>
