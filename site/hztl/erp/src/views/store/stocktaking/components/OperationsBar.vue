<template>
  <div class="header">
    <el-button
      :disabled="!canDelete"
      type="primary"
      size="mini"
      @click="doDelete()"
    >
      删除（F4）
    </el-button>
    <el-button
      :disabled="!canSubmit"
      type="primary"
      size="mini"
      @click="doSubmit()"
    >
      提交（F9）
    </el-button>
    <el-button
      :disabled="!canRevoke"
      type="primary"
      size="mini"
      @click="doRevoke()"
    >
      撤回（F9）
    </el-button>
    <el-button
      :disabled="!canWarehouseAudit"
      type="primary"
      size="mini"
      @click="doWarehouseAudit()"
    >
      库房审核（F7）
    </el-button>
    <el-button
      :disabled="!canFinancialAudit"
      type="primary"
      size="mini"
      @click="doFinancialAudit()"
    >
      财务审核（F7）
    </el-button>
    <!-- <el-button type="primary" size="mini">盘点扫描</el-button> -->
    <!-- <el-button type="primary" size="mini">批量打印条形码</el-button> -->
    <!-- <el-button type="primary" size="mini" @click="setCode">设置配件条形码</el-button> -->
    <!-- <el-button type="primary" size="mini" :disabled="!canExport">导出(Alt + D)</el-button> -->
    <!-- <el-button type="primary" size="mini">预览(F10)</el-button> -->
    <el-button
      :disabled="!canExport"
      type="primary"
      size="mini"
      @click="exportExcel"
    >
      导出（Alt+D）
    </el-button>
    <el-button
      :disabled="!canPrint"
      type="primary"
      size="mini"
      @click="doPrint"
    >
      打印（F11）
    </el-button>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CommonOperations from "../mixins/CommonOperations";

export default {
  name: "OperationsBar",
  mixins: [CommonOperations],
  props: {
    header: {
      type: Object,
      required: true
    },
    refreshPage: {
      type: Function,
      required: true
    }
  },
  computed: {
    ...mapState("admin/systemParams", {
      autoSubmitWhenClose: state => state.params.autoSubmitWhenClose
    })
  },
  async deactivated() {
    if (this.autoSubmitWhenClose) {
      await this.doSubmit();
    }
  },
  methods: {
    resetPage() {
      this.$emit("resetPage");
    },
    exportExcel() {
      this.$emit("export");
    }
  }
};
</script>
