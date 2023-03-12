<template>
  <div v-show="isShowPriority">
    售价取值优先级：
    <span>{{ priorityTxt }}</span>
    <span
      v-show="canUpdatePriority"
      style="padding-left: 5px; cursor: pointer;"
      @click.stop="toSort"
    >
      [修改优先级]
    </span>
    <ht-dialog
      :visible.sync="scopesSettingVisible"
      title="修改优先级"
      style="text-align: left;"
      width="700px"
    >
      <el-form>
        <div>当公式策略作用范围互斥时，作用范围优先级：</div>
        <el-row
          :gutter="5"
          type="flex"
          justify="space-between"
          align="middle"
          style="margin: 10px 0;"
        >
          <template v-for="(option, index) in formulaScopes">
            <el-col :key="index">
              <el-select
                v-model="scopesSelectData[index]"
                size="mini"
                placeholder="请选择"
                @change="val => changeHandle(val, index)"
              >
                <el-option
                  v-for="item in formulaScopes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col
              v-if="formulaScopes.length - 1 != index"
              :key="'place' + index"
              align="center"
              style="width:55px"
              class="text-grey"
            >
              >
            </el-col>
          </template>
        </el-row>
      </el-form>

      <div class="dialog-footer-align">
        <el-button
          :loading="scopesSubmitLoading"
          :disabled="!canUpdatePriority"
          size="mini"
          type="primary"
          plain
          @click.stop="sureHandle"
        >
          确定（F3）
        </el-button>
        <el-button
          :disabled="scopesSubmitLoading"
          type="primary"
          size="mini"
          plain
          @click.stop="cancelHandle"
        >
          取消（Esc）
        </el-button>
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import {
  getSystemParamsDetail,
  updateSystemParamsDetail
} from "@/api/base/base";

export default {
  name: "PrioritySetting",
  data() {
    return {
      isShowPriority: true,
      formulaScopes: [
        { label: "固定价格", value: 0 },
        { label: "按品牌", value: 2 },
        { label: "指定配件", value: 1 },
        { label: "库存售价", value: 5 },
        { label: "按分类", value: 3 },
        { label: "全部配件", value: 4 },
        { label: "客户享受价格", value: 7 }
      ],
      scopesSelectData: [],
      scopesSelectDataOld: [],
      priorityTxtData: [],
      scopesSettingVisible: false,
      scopesSubmitLoading: false
    };
  },
  computed: {
    priorityTxt() {
      return this.priorityTxtData
        .map(val => this.formulaScopes.find(item => item.value == val).label)
        .join(" > ");
    },
    canUpdatePriority() {
      return this.hasAutoPerm("updatePriority");
    }
  },
  activated() {
    getSystemParamsDetail({ module: "purchase", type: "purchasePriority" })
      .then(res => {
        this.isShowPriority = true;
        this.priorityTxtData = res.value.slice();
        this.scopesSelectData = this.priorityTxtData.slice();
        this.scopesSelectDataOld = this.priorityTxtData.slice();
      })
      .catch(() => {});
  },
  methods: {
    refreshData(value) {
      this.priorityTxtData = value;
    },
    changeHandle(val, index) {
      this.scopesSelectData[
        this.scopesSelectDataOld.indexOf(val)
      ] = this.scopesSelectDataOld[index];
      this.scopesSelectDataOld = this.scopesSelectData.slice();
    },
    sureHandle() {
      if (!this.canUpdatePriority) {
        this.$message.error({
          message: "您没有权限修改优先级！",
          showClose: true
        });
        return;
      }
      this.scopesSubmitLoading = true;
      updateSystemParamsDetail({
        module: "purchase",
        type: "purchasePriority",
        value: this.scopesSelectData
      })
        .then(() => {
          this.scopesSubmitLoading = false;
          this.scopesSettingVisible = false;
          this.priorityTxtData = this.scopesSelectData.slice();
          this.$message({
            type: "success",
            message: "修改成功",
            showClose: true
          });
          this.cancelHandle();
        })
        .catch(() => {
          this.scopesSubmitLoading = false;
        });
    },
    cancelHandle() {
      this.scopesSettingVisible = false;
    },
    toSort() {
      this.$emit("toSort");
    }
  }
};
</script>
