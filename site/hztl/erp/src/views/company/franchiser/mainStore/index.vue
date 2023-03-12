<script>
import { getFranchiserAuthSettings } from "@/api/franchiser";
import ManageFranchiser from "./manageFranchiser";
import AuditFranchiser from "./auditFranchiser";
import Clipboard from "clipboard";
import eventBus from "@/event";
import { tabChangeMixin } from "@/mixins";

export default {
  name: "MainStore",
  components: {
    ManageFranchiser,
    AuditFranchiser
  },
  mixins: [tabChangeMixin],
  data() {
    return {
      franchiserAuthSettings: { authCode: "" },
      routeParamsName: "childTabName",
      defaultTab: "ManageFranchiser",
      tabList: [
        { id: "ManageFranchiser", name: "加盟店管理" },
        { id: "AuditFranchiser", name: "加盟店审核" }
      ]
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    openManualDialog() {
      //传入角色管理对应id，打开dialog
      // this.manualVisible = true;
      eventBus.$emit("open-manual-dialog", 11);
    },
    loadData() {
      getFranchiserAuthSettings().then(res => {
        this.franchiserAuthSettings = res || {};
      });
    },
    copyHandle(codeType) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      const clipboard = new Clipboard(`.${codeType}`);
      clipboard.on("success", function() {
        self.$message.success({ message: "复制成功！", showClose: true });
        clipboard.destroy();
      });
      clipboard.on("error", function() {
        self.$message.error({
          message: "复制失败，请手动复制。",
          showClose: true
        });
        clipboard.destroy();
      });
    },
    handleAuditChange() {
      this.$refs.manageFranchiser && this.$refs.manageFranchiser.refreshLists();
    }
  },

  render() {
    return (
      <div class="container-box">
        <ht-card no-padding class="auto-card">
          <ht-tabs
            v-model={this.activeTab}
            tabs={this.tabList}
            class="tabs-regular"
            style="margin-bottom: 10px;"
            on-change={this.changeTab}
          />
          <ManageFranchiser
            ref="manageFranchiser"
            v-show={this.activeTab === "ManageFranchiser"}
          />
          <AuditFranchiser
            v-show={this.activeTab === "AuditFranchiser"}
            franchiserAuthSettings={this.franchiserAuthSettings}
            on-audit={this.handleAuditChange}
          />
          <div class="authorization-code-container">
            <span>加盟授权码：</span>
            <span class="text-font-primary">
              {this.franchiserAuthSettings.authCode}
            </span>
            <el-button
              v-show={this.franchiserAuthSettings.authCode}
              data-clipboard-text={this.franchiserAuthSettings.authCode}
              class="copy-auth-code"
              type="text"
              size="mini"
              on-click={() => this.copyHandle("copy-auth-code")}
            >
              [复制]
            </el-button>
            <span
              class="text-danger"
              style="cursor:pointer;padding-left:15px;"
              on-click={() => this.openManualDialog()}
            >
              <i class="el-icon-question"></i>如何使用加盟管理
            </span>
          </div>
        </ht-card>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.auto-card {
  position: relative;
}
.authorization-code-container {
  position: absolute;
  top: 4px;
  right: 10px;
}
.copy-auth-code {
  margin-left: 5px;
  margin-top: -3px;
}
</style>
