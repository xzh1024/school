<script>
import PermsSetting from "./permsSetting";
import PendingFranchisersList from "./pendingFranchisersList";

export default {
  name: "AuditFranchiser",
  components: {
    PermsSetting,
    PendingFranchisersList
  },
  props: {
    franchiserAuthSettings: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleAuditChange() {
      this.$emit("audit");
    }
  },

  render() {
    return (
      <div class="container-box">
        <el-row gutter={5} class="audit-franchiser-container">
          <el-col span={5} style="height: 100%;">
            <PermsSetting
              franchiserAuthSettings={this.franchiserAuthSettings}
              style="height: 100%;"
            />
          </el-col>
          <el-col span={19} style="height: 100%;">
            <PendingFranchisersList
              style="height: 100%;"
              on-audit={this.handleAuditChange}
            />
          </el-col>
        </el-row>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.audit-franchiser-container {
  margin-top: -10px;
  height: 100%;
  background: inherit;
}
</style>
