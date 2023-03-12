<script>
import { eidtFranchiserAuthSettings } from "@/api/franchiser";

const defaultRuleForm = {
  canViewStorage: true,
  canViewSale: true
};

export default {
  name: "PermsSetting",
  props: {
    franchiserAuthSettings: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ruleForm: { ...defaultRuleForm }
    };
  },
  watch: {
    franchiserAuthSettings() {
      this.initData();
    }
  },
  methods: {
    initData() {
      this.ruleForm = { ...defaultRuleForm, ...this.franchiserAuthSettings };
    },
    saveHandle(e) {
      e.stopPropagation();
      this.$confirm("保存修改后，将通知所有加盟商。是否确认修改？", "提示", {
        type: "warning"
      })
        .then(() => {
          eidtFranchiserAuthSettings(this.ruleForm).then(() => {
            this.$message.success({
              message: "设置权限成功！",
              showClose: true
            });
          });
        })
        .catch(() => {});
    },
    resetHandle(e) {
      e.stopPropagation();
      this.initData();
    }
  },

  render() {
    return (
      <ht-card no-padding title="权限设置" class="perms-container">
        <div slot="after-title" class="help-container">
          <el-popover placement="right" width="290" trigger="hover">
            1、权限设置后将适用于全部加盟店。
            <br />
            2、若修改权限，将通知所有已加盟门店。
            <i slot="reference" class="el-icon-question help-tips" />
          </el-popover>
        </div>
        <el-form
          size="mini"
          label-position="left"
          label-width="150px"
          class="form-item-small-margin-bottom form-container"
        >
          <el-form-item label="查看加盟门店库存数量" style="width: 100%;">
            <el-switch v-model={this.ruleForm.canViewStorage} />
          </el-form-item>
          <el-form-item
            v-show={!this.ruleForm.canViewStorage}
            label-width="0"
            class="tips-container text-font-danger"
            style="width: 100%;"
          >
            关闭此权限，将无法查看其它已授权的加盟店的配件库存数量。
          </el-form-item>
          <el-form-item label="查看加盟门店销售数量" style="width: 100%;">
            <el-switch v-model={this.ruleForm.canViewSale} />
          </el-form-item>
          <el-form-item
            v-show={!this.ruleForm.canViewSale}
            label-width="0"
            class="tips-container text-font-danger"
            style="width: 100%;"
          >
            关闭此权限，将无法查看其它已授权的加盟店的配件日销售数量。
          </el-form-item>
        </el-form>

        <div style="text-align: center;">
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={e => this.saveHandle(e)}
          >
            保存（F3）
          </el-button>
          <el-button
            type="primary"
            size="mini"
            plain
            on-click={e => this.resetHandle(e)}
          >
            重置（F4）
          </el-button>
        </div>
      </ht-card>
    );
  }
};
</script>

<style lang="scss" scoped>
.perms-container {
  margin-top: 5px;
  &::v-deep .el-card__body {
    height: calc(100% - 80px);
  }
}
.help-container {
  height: 20px;
  text-align: right;
}
.help-tips {
  display: inline-block;
  height: 20px;
  line-height: 20px;
}
.form-container {
  margin: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
}
.tips-container {
  font-size: 12px;
}
</style>
