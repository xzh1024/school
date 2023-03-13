<template>
  <ht-dialog
    v-bind="$attrs"
    title="合并往来单位"
    width="1350px"
    top="7vh"
    class="merge-coopertaor-box"
    v-on="$listeners"
  >
    <section class="container-box" style="height: 580px;">
      <div class="header">
        <el-form
          :model="ruleForm"
          label-width="60px"
          label-position="left"
          size="mini"
          @click.native.stop="handleSetFormScoped"
        >
          <el-row :gutter="5">
            <el-col :span="5">
              <el-form-item
                label="往来单位"
                prop="nameOrNumber"
                style="margin-top: 4px;"
              >
                <ht-input
                  v-model="ruleForm.nameOrNumber"
                  placeholder="编号/名称"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                label="主联系人"
                prop="contactsPhoneOrName"
                style="margin-top: 4px;"
              >
                <ht-input
                  v-model="ruleForm.contactsPhoneOrName"
                  placeholder="姓名/电话"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item
                label="单位类型"
                prop="type"
                style="margin-top: 4px;"
                label-width="60px"
              >
                <ht-autoselect
                  v-model="ruleForm.type"
                  :options="typeOptions"
                  :trigger-on-focus="false"
                  clearable
                  highlight-first-item
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" size="mini" @click="searchHandle">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click="resetHandle">
                重置（F6）
              </el-button>
            </el-col>
            <el-popover
              placement="top"
              width="500"
              style="float:right;color:#FF5454"
              trigger="click"
            >
              <p>
                为何需要往来单位合并：当发现往来单位重复时，可将两个往来单位资料进行合并<br />
                操作步骤：<br />
                第一步：查询需要合并的往来单位，在左侧查询结果中点击“加号”加入右侧待合并往来单位中<br />
                （如果错误添加往来单位进入待合并列表中，可在右侧待合并目录中选择移除待合并项）<br />
                第二步：在右侧待合并往来单位中，选择其中一条作为目标往来单位（即保留的往来单位）点击合并后，被合并往来单位将被删除（若有订单已使用此往来单位资料，将替换成目标往来单位）<br />
                注：若选择合并往来单位包含平台往来单位，则只能选择该平台往来单位作为目标往来单位。
              </p>
              <span slot="reference" class="text-danger" style="cursor:pointer;"
                ><i class="el-icon-question"></i>如何合并往来单位</span
              >
            </el-popover>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="5" style="margin: 5px 5px 0 5px; height: 100%;">
        <el-col :span="12" style="display: flex; height: 100%;">
          <ht-card title="往来单位查询结果" class="auto-card" no-padding>
            <ht-setting-table
              :data="tableData"
              :columns="tableColumns"
              :table-name="tableName"
              :loading="loading"
              :total="totalSize"
              :current-page="currentPage"
              :key-scope="keyScope.searchTable"
              pagination
              @pageChange="_handleSizeChange"
              @row-dblclick="handleMergeAdd"
              @rowOperation="handleRowEdit"
              @hotkeysUp="handleKeyCode"
              @click.native.stop="handleSetSearchTableScoped"
            />
          </ht-card>
        </el-col>
        <el-col :span="12" style="display: flex; height: 100%;">
          <ht-card title="待合并往来单位" class="auto-card" no-padding>
            <template v-slot:after-title>
              <span class="text-font-warning">
                （待合并往来单位中只允许存在一个平台客户，且只能是目标单位）
              </span>
            </template>
            <ht-setting-table
              :data="stayTableData"
              :columns="stayTableColumns"
              :table-name="stayTableName"
              :key-scope="keyScope.mergeCoopertaorTable"
              @hotkeysUp="handleKeyCode"
              @row-dblclick="handleDelete"
              @click.native.stop="handleSetMergeCoopertaorTableScoped"
            />
          </ht-card>
        </el-col>
      </el-row>
      <div class="footer">
        <el-button
          v-loading="submitLoading"
          :disabled="!isCanSubmit"
          type="primary"
          size="mini"
          plain
          @click="sureHandle"
        >
          确定（F3）
        </el-button>
        <el-button
          :disabled="submitLoading"
          type="primary"
          plain
          size="mini"
          @click="cancelHandle"
        >
          取消（Esc）
        </el-button>
      </div>
    </section>
  </ht-dialog>
</template>
<script>
import {
  mergeCheckedCooperators,
  mergeCooperatorsList,
  checkCooperators
} from "@/api/communion/communion";
import { CELL_WIDTH } from "@/constants";
import { mapActions, mapState } from "vuex";
import hotkeys from "hotkeys-js";
import { userMsg } from "@/utils/store";

let oldKeyScope;
const defaultRuleFormData = {
  nameOrNumber: "",
  contactsPhoneOrName: "",
  type: ""
};

export default {
  name: "MergeCompany",
  props: {
    mergeCooperatorDialog: Boolean
  },
  data() {
    const handleMergeAdd = (row, e) => {
      e.stopPropagation();
      this.handleMergeAdd(row);
    };
    const handleDelete = (row, e) => {
      e.stopPropagation();
      this.handleDelete(row);
    };
    const indexColumn = {
      prop: "index",
      label: "序号",
      type: "index",
      width: CELL_WIDTH.index,
      cantHide: true,
      cantExport: true
    };
    const controlsAddColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 60,
      cantExport: true,
      render: (value, row) => (
        <el-tooltip enterable={false} placement="top" content="添加">
          <span
            v-show={!this.isInMergeList(row)}
            on-click={e => handleMergeAdd(row, e)}
            class="icon operation-icon icon-add-info"
          />
        </el-tooltip>
      )
    };
    const controlsDeleteColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 60,
      cantExport: true,
      render: (value, row) => (
        <el-tooltip enterable={false} placement="top" content="删除">
          <span
            on-click={e => handleDelete(row, e)}
            class="icon operation-icon icon-delete-info"
          />
        </el-tooltip>
      )
    };
    const selectColumn = {
      prop: "id",
      label: "目标",
      width: 60,
      render: value => (
        <el-radio
          v-model={this.singleRadioRow}
          label={value}
          disabled={this.isDisabled}
        />
      )
    };
    const nameColumn = {
      prop: "name",
      label: "单位名称",
      width: CELL_WIDTH.companyName,
      render: (value, row) => (
        <div>
          <span>{value}</span>
          <span class="text-primary">{row.isPlatform ? "（平台）" : ""}</span>
        </div>
      )
    };
    const customerColumn = {
      prop: "isCustomer",
      label: "客户",
      width: CELL_WIDTH.type,
      render: value =>
        value ? <span class="icon operation-icon icon-selected-info" /> : ""
    };
    const supplierColumn = {
      prop: "isSupplier",
      label: "供应商",
      width: CELL_WIDTH.type,
      render: value =>
        value ? <span class="icon operation-icon icon-selected-info" /> : ""
    };
    const logisticsColumn = {
      prop: "isLogistics",
      label: "物流公司",
      width: CELL_WIDTH.type,
      render: value =>
        value ? <span class="icon operation-icon icon-selected-info" /> : ""
    };
    const insuranceColumn = {
      prop: "isInsuranceCompany",
      label: "保险公司",
      width: CELL_WIDTH.type,
      render: value =>
        value ? <span class="icon operation-icon icon-selected-info" /> : ""
    };
    // eslint-disable-next-line prettier/prettier
    const listColumn = [ customerColumn, supplierColumn, logisticsColumn];
    const options = [
      { id: "", name: "全部" },
      { id: "customer", name: "客户" },
      { id: "supplier", name: "供应商" },
      { id: "logistics", name: "物流公司" }
    ];
    if (userMsg().hasYx) {
      listColumn.push(insuranceColumn);
      options.push({ id: "insuranceCompany", name: "保险公司" });
    }
    return {
      keyScope: {
        form: Symbol("mergeCooperators"),
        searchTable: Symbol("searchCooperatorsTable"),
        mergeCoopertaorTable: Symbol("mergeCooperatorsTable")
      },
      ruleForm: { ...defaultRuleFormData },
      typeOptions: [...options],
      tableColumns: [
        indexColumn,
        controlsAddColumn,
        nameColumn,
        {
          prop: "creditCode",
          label: "统一社会信用代码",
          width: CELL_WIDTH.creditCode
        },
        { prop: "contactsName", label: "主联系人", width: CELL_WIDTH.fullName },
        { prop: "contactsPhone", label: "主联系电话", width: CELL_WIDTH.phone },
        ...listColumn
      ],
      stayTableColumns: [
        indexColumn,
        controlsDeleteColumn,
        selectColumn,
        nameColumn,
        {
          prop: "creditCode",
          label: "统一社会信用代码",
          width: CELL_WIDTH.creditCode
        },
        { prop: "contactsName", label: "主联系人", width: CELL_WIDTH.fullName },
        { prop: "contactsPhone", label: "主联系电话", width: CELL_WIDTH.phone },
        ...listColumn
      ],
      tableData: [],
      tableName: "BaseCommunionMergeCompanyTable",
      stayTableData: [],
      stayTableName: "BaseCommunionMergeCompanyStayTable",
      loading: false,
      totalSize: null,
      singleRadioRow: null,
      isDisabled: false,
      submitLoading: false,
      currentPage: 1
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    isCanSubmit() {
      return this.stayTableData.length >= 2 && this.singleRadioRow !== null;
    }
  },
  watch: {
    "$attrs.visible": {
      handler(val, oldVal) {
        if (val) {
          oldKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope.searchTable);
          this.stayTableData = [];
          this.isDisabled = false;
          this.singleRadioRow = null;
          this.resetHandle();
          this.searchHandle();
        } else if (oldVal) {
          if (oldKeyScope) {
            hotkeys.setScope(oldKeyScope);
          }
        }
      },
      immediate: true
    }
  },
  mounted() {
    hotkeys("f3", { scope: this.keyScope.searchTable }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
          break;
      }
    });
    hotkeys(
      "f3",
      { scope: this.keyScope.mergeCoopertaorTable },
      (e, handler) => {
        switch (handler.key) {
          case "f3":
            this.sureHandle();
            break;
        }
      }
    );
    hotkeys("f3,f5,f6", { scope: this.keyScope.form }, (e, handler) => {
      switch (handler.key) {
        case "f3":
          this.sureHandle();
          break;
        case "f5":
          this.searchHandle();
          break;
        case "f6":
          this.resetHandle();
          break;
        default:
          break;
      }
    });
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope.form);
    hotkeys.deleteScope(this.keyScope.searchTable);
    hotkeys.deleteScope(this.keyScope.mergeCoopertaorTable);
  },
  methods: {
    handleSetFormScoped() {
      hotkeys.setScope(this.keyScope.form);
    },
    handleSetSearchTableScoped() {
      hotkeys.setScope(this.keyScope.searchTable);
    },
    handleSetMergeCoopertaorTableScoped() {
      hotkeys.setScope(this.keyScope.mergeCoopertaorTable);
    },
    ...mapActions("admin/communionCompany", ["loadAll"]),
    isInMergeList(row) {
      return !!this.stayTableData.find(item => item.id === row.id);
    },
    loadList(page) {
      // 加载数据列表
      this.loading = true;
      mergeCooperatorsList({
        ...page,
        pageSize: this.pageSize,
        ...this.ruleForm
      })
        .then(data => {
          this.totalSize = data.totalSize;
          this.tableData = data.rows || [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    searchHandle() {
      // 搜索操作
      this.loadList({ page: this.currentPage });
    },
    resetHandle() {
      this.ruleForm = { ...defaultRuleFormData };
    },
    _handleSizeChange(page) {
      // 分页操作
      this.currentPage = page;
      this.loadList({ page: page });
    },
    handleMergeAdd(row) {
      // 添加待合并往来单位
      const flag = this.stayTableData.find(
        item => item.isPlatform === row.isPlatform
      );
      if (flag && flag.isPlatform) {
        this.$message.warning({
          message: "待合并往来单位中已存在一个平台单位，若需替换请先删除！",
          showClose: true
        });
        return;
      }
      const hasItem = this.stayTableData.find(item => item.id === row.id);
      if (!hasItem) {
        this.stayTableData.push(row);
        this.$message.success({
          message: `${row.name}已加入到待合并往来单位列表中`,
          showClose: true
        });
      }
      if (row.isPlatform) {
        this.singleRadioRow = row.id;
        this.isDisabled = true;
      }
    },
    handleDelete(row) {
      // 待合并往来单位删除
      this.$confirm(`确认删除往来单位【${row.name}】？`, "提示", {
        type: "warning"
      })
        .then(() => {
          const index = this.stayTableData.findIndex(
            item => item.id === row.id
          );
          if (this.singleRadioRow === row.id) {
            this.singleRadioRow = null;
            this.isDisabled = false;
          }
          this.stayTableData.splice(index, 1);
        })
        .catch(() => {});
    },
    submitHandle(old) {
      this.submitLoading = true;
      mergeCheckedCooperators({ old: old, new: this.singleRadioRow })
        .then(() => {
          this.$message.success({ message: "合并成功！", showClose: true });
          this.stayTableData = [];
          this.singleRadioRow = null;
          this.isDisabled = false;
          this.submitLoading = false;
          this.$emit("success");
          this.searchHandle();
          this.loadAll(true);
        })
        .catch(() => {
          this.submitLoading = false;
        });
    },
    sureHandle() {
      // 待合并单位合并操作
      if (!this.isCanSubmit) {
        return;
      }
      const _item = this.stayTableData.find(
        item => item.id === this.singleRadioRow
      );
      const old = this.stayTableData.map(item => {
        return item.id;
      });
      const index = old.findIndex(item => item === this.singleRadioRow);
      old.splice(index, 1);
      this.submitLoading = true;
      checkCooperators({ coopIds: old })
        .then(res => {
          if (res && res.length) {
            this.$msgbox({
              title: "提示",
              customClass: "check-tips",
              message: this.checkTips(res, _item.name),
              showCancelButton: true,
              closeOnClickModal: false,
              closeOnPressEscape: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消"
            })
              .then(() => {
                this.submitHandle(old);
              })
              .catch(() => {});
          } else {
            this.$confirm(
              `您确定要把待合并单位都合并到【${_item.name}` + "】？",
              "提示",
              { type: "warning" }
            )
              .then(() => {
                this.submitHandle(old);
              })
              .catch(() => {});
          }
        })
        .finally(() => {
          this.submitLoading = false;
        });
    },
    checkTips(data, name) {
      const columns = [
        {
          prop: "cooperatorName",
          label: "往来单位名称",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "companyName",
          label: "分公司",
          width: CELL_WIDTH.companyName
        },
        {
          prop: "billTypes",
          label: "未完成单据类别",
          width: 500,
          formatter: value => {
            return value && value.length ? value.join("，") : "";
          }
        }
      ];
      return (
        <div>
          <div class="tips-header">
            <i
              class="el-icon-warning text-font-warning"
              style="font-size: 20px; margin-right: 10px;"
            />
            <span>
              以下往来单位正在使用过程中，确认合并将刷新所有待完成单据中往来单位信息。在合并过程中选中往来单位相关操作可能无法正常进行。是否确认合并到目标往来单位【
              {name}】？
            </span>
          </div>
          <ht-table
            tableName="mergeCompanyCheckTipsTable"
            columns={columns}
            data={data}
            selection-type={null}
            disabled-hotkeys
            style="margin-top: 10px; height: 333px;"
          />
        </div>
      );
    },
    cancelHandle() {
      if (this.submitLoading) return;
      this.$emit("update:visible", false);
    },
    handleRowEdit(row) {
      this.handleMergeAdd(row);
    },
    handleKeyCode(event) {
      switch (event.code) {
        case "F5":
          this.searchHandle();
          break;
        case "F6":
          this.resetHandle();
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.merge-coopertaor-box {
  .ht-dialog {
    ::v-deep .el-dialog__body {
      padding: 0px;
    }
  }
  .el-radio {
    ::v-deep .el-radio__label {
      display: none;
    }
  }
  .footer {
    line-height: 36px;
  }
}
</style>

<style lang="scss">
.check-tips {
  margin: 0;
  padding: 0;
  width: 900px !important;

  .el-message-box__header {
    padding: 20px 0;
    background: #f6fafd;

    .el-message-box__title {
      margin-left: 20px;
      width: 200px;
    }
  }

  .el-message-box__btns {
    margin: 10px;
    padding: 0;
  }
}
.tips-header {
  display: flex;
  align-items: center;
  text-align: left;
}
</style>
