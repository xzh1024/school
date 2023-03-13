<template>
  <section class="container-box">
    <div class="header flex-container">
      <div>
        <el-button type="primary" size="mini" @click="showSearchBox">
          查询（Ins）
        </el-button>
        <el-button
          :disabled="!canCreate"
          type="primary"
          size="mini"
          @click="addNewUint"
        >
          新增（F2）
        </el-button>
        <el-button
          :disabled="!canUpdate"
          type="primary"
          size="mini"
          @click="editUint"
        >
          编辑（F3）
        </el-button>
        <!-- <el-button
                type="primary"
                size="mini"
                @click="custromersInvitationCode"
            >
                邀请码
            </el-button>
            <el-button
                :disabled="!canCreate"
                type="primary"
                size="mini"
                @click="handleAddSuppliers"
            >
                添加平台供应商
            </el-button> -->
        <el-button
          :disabled="!canMerge"
          type="primary"
          size="mini"
          @click="handleMergeCooperators"
        >
          往来单位合并
        </el-button>
        <el-button
          :disabled="!canImport"
          type="primary"
          size="mini"
          @click="importVisible = true"
        >
          导入(Alt+I)
        </el-button>
      </div>

      <VideoPopover :videoUrl="videoUrl" :remark="videoPopoverRemark" />
    </div>
    <ht-card no-padding class="auto-card">
      <ht-table
        :loading="loading"
        :data="tableData"
        :columns="tableColumns"
        :selected-rows.sync="selectedRows"
        :total="totalSize"
        :pagination="isShowPagination"
        :current-page.sync="currentPage"
        :key-scope="keyScope"
        setting-all-column
        show-table-setting
        @hotkeysUp="handleKeyCode"
        @pageChange="_handleSizeChange"
        @rowOperation="handleRowEdit"
        @table-setting="handleTableSetting"
      />
    </ht-card>

    <edit-columns
      :base-columns="baseTableColumns"
      :table-name="tableName"
      :visible.sync="editColumnsVisible"
      @columns-change="tableColumnsChange"
      @show-pagination-change="value => (isShowPagination = value)"
    />
    <SearchSupplierBox
      :visible.sync="showSearchSupplierBox"
      @on-search="handleSearchForm"
    />
    <invitation-code
      :visible.sync="showInvitationCodeBox"
      :invite-codes="inviteCodes"
    />
    <add-suppliers :visible.sync="showAddSuppliersBox" />
    <ImportCooperatorBox
      :visible.sync="importVisible"
      :importInfo="importInfo"
      @import="handleSearch"
    />
    <merge-company
      :visible.sync="showMergeCooperatorBox"
      @success="handleSearch"
    />
    <CommunionInformationBox
      :id="cooperatorId"
      :visible.sync="showCommunionInformationBox"
      @on-save="handleCooperatorSave"
    />
  </section>
</template>
<script>
import {
  enableContacts,
  searchCooperators,
  stopContacts
} from "@/api/communion/communion";
import SearchSupplierBox from "./components/SearchSupplierBox";
import AddSuppliers from "./components/AddSuppliers";
import InvitationCode from "./components/InvitationCode";
import MergeCompany from "./components/MergeCompany";
import ImportCooperatorBox from "@/components/importBox/ImportCooperatorBox";
import CommunionInformationBox from "@/components/CommunionInformationBox";
import { mapActions, mapState } from "vuex";
import { cooperatorOptions } from "@/components/importBox/options";
import { CELL_WIDTH, UNIT_COUNT } from "@/constants";
import { reqImportCooperators } from "@/api/importBox";
import convertObjects from "@/utils/convertObjects";
import { EditColumns } from "@/components/table";
import { userMsg } from "@/utils/store";
import VideoPopover from "@/components/VideoPopover";

export default {
  name: "Communiontab",
  components: {
    EditColumns,
    InvitationCode,
    AddSuppliers,
    ImportCooperatorBox,
    MergeCompany,
    SearchSupplierBox,
    CommunionInformationBox,
    VideoPopover
  },
  props: {
    keyScope: {
      type: [Symbol, String],
      default() {
        Symbol("CustromList");
      }
    }
  },
  data() {
    const handleEdit = (row, e) => {
      e.stopPropagation();
      this.selectedRows = [row];
      this.handleEdit(row);
    };
    const storeEnable = (row, e) => {
      e.stopPropagation();
      this.selectedRows = [row];
      this.storeEnable(row);
    };
    const storeDisable = (row, e) => {
      e.stopPropagation();
      this.selectedRows = [row];
      this.storeDisable(row);
    };
    // const handleRowCodeInvite = (row, e) => {
    //     e.stopPropagation();
    //     this.handleRowCodeInvite(row);
    // };
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 100,
      cantExport: true,
      render: (value, row) => (
        <div>
          {this.hasBelongsPerm("updateBasicAndContacts", row.belongs) ||
          this.hasBelongsPerm("updateCompany", row.belongs) ||
          this.hasBelongsPerm("updateBusinessMen", row.belongs) ||
          this.hasBelongsPerm("updateCustomer", row.belongs) ||
          this.hasBelongsPerm("updateSupplier", row.belongs) ||
          this.hasBelongsPerm("updateLogistics", row.belongs) ||
          this.hasBelongsPerm("updateInsurance", row.belongs) ? (
            <el-tooltip enterable={false} placement="top" content="编辑">
              <span
                on-click={e => handleEdit(row, e)}
                class="icon operation-icon icon-edit-info"
              />
            </el-tooltip>
          ) : null}
          <el-tooltip enterable={false} placement="top" content="启用">
            <span
              v-show={row.flags.isDisabled && this.canEnableDisable}
              on-click={e => storeEnable(row, e)}
              class="icon operation-icon icon-enable-info"
            />
          </el-tooltip>
          <el-tooltip enterable={false} placement="top" content="停用">
            <span
              v-show={!row.flags.isDisabled && this.canEnableDisable}
              on-click={e => storeDisable(row, e)}
              class="icon operation-icon icon-disable-info"
            />
          </el-tooltip>
        </div>
      )
    };
    const customerColumn = {
      prop: "customer",
      label: "客户",
      width: CELL_WIDTH.type,
      render: (value, row) =>
        this.hasBelongsPerm("readCustomer", row.belongs) ? (
          row.flags.isCustomer ? (
            <div>
              <span class="icon operation-icon icon-selected-info" />
              {/*<el-button
                              v-show={row.source === "线下"}
                              on-click={e => handleRowCodeInvite(row, e)}
                              type="text"
                              size="mini"
                              style="margin-left: 10px;"
                          >
                              （邀请）
                          </el-button>*/}
            </div>
          ) : (
            ""
          )
        ) : (
          "-"
        )
    };
    const supplierColumn = {
      prop: "supplier",
      label: "供应商",
      width: CELL_WIDTH.type,
      render: (value, row) =>
        this.hasBelongsPerm("readSupplier", row.belongs) ? (
          row.flags.isSupplier ? (
            <span class="icon operation-icon icon-selected-info" />
          ) : (
            ""
          )
        ) : (
          "-"
        )
    };
    const logisticsColumn = {
      prop: "logistics",
      label: "物流公司",
      width: CELL_WIDTH.type,
      render: (value, row) =>
        this.hasBelongsPerm("readLogistics", row.belongs) ? (
          row.flags.isLogistics ? (
            <span class="icon operation-icon icon-selected-info" />
          ) : (
            ""
          )
        ) : (
          "-"
        )
    };
    const insuranceColumn = {
      prop: "insuranca",
      label: "保险公司",
      width: CELL_WIDTH.type,
      render: (value, row) =>
        this.hasBelongsPerm("readInsuranca", row.belongs) ? (
          row.flags.isInsuranceCompany ? (
            <span class="icon operation-icon icon-selected-info" />
          ) : (
            ""
          )
        ) : (
          "-"
        )
    };
    // eslint-disable-next-line prettier/prettier
    const listColumn = [customerColumn, supplierColumn, logisticsColumn];
    if (userMsg().hasYx) {
      listColumn.push(insuranceColumn);
    }
    return {
      showSearchSupplierBox: false,
      searchForm: {},
      showInvitationCodeBox: false,
      inviteCodes: [],
      showAddSuppliersBox: false,
      showMergeCooperatorBox: false,
      importVisible: false,
      header: {
        checkList: ["isCustomer"]
      },
      importInfo: {
        hasSetting: true,
        options: cooperatorOptions,
        offset: UNIT_COUNT
      },
      showCommunionInformationBox: false,
      isEdit: false,
      cooperatorId: null,
      currentPage: 1,
      totalSize: 0,
      loading: false,
      selectedRows: [],
      tableData: [],
      isShowPagination: true,
      editColumnsVisible: false,
      tableColumns: [],
      tableName: "BaseCommunionCommuniontabList",
      baseTableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        controlsColumn,
        { prop: "number", label: "单位编号", width: CELL_WIDTH.number },
        { prop: "name", label: "单位名称", width: CELL_WIDTH.companyName },
        ...listColumn,
        { prop: "source", label: "单位来源", width: CELL_WIDTH.type },
        {
          prop: "isGroup",
          label: "是否集团",
          width: CELL_WIDTH.type,
          formatter: (value, row) =>
            row.flags && row.flags.isGroup ? "是" : "否"
        },
        { prop: "groupName", label: "归属集团", width: CELL_WIDTH.companyName },
        { prop: "contactsName", label: "主联系人", width: CELL_WIDTH.fullName },
        {
          prop: "contactsPhone",
          label: "主联系人电话",
          width: CELL_WIDTH.phone
        },
        {
          prop: "arears",
          label: "所属区域",
          width: CELL_WIDTH.address,
          formatter: (value, row) => {
            if (row.area && row.area.names && row.area.names.length) {
              let arears = "";
              row.area.names.forEach(item => {
                arears += item;
              });
              return arears;
            } else {
              return "";
            }
          }
        },
        {
          prop: "createdByName",
          label: "登记人",
          width: CELL_WIDTH.personName,
          formatter: (value, row) =>
            row.createdBy && row.createdBy.name ? row.createdBy.name : ""
        },
        {
          prop: "createdByCompanyName",
          label: "登记公司",
          width: CELL_WIDTH.companyName,
          formatter: (value, row) =>
            row.createdByCompany && row.createdByCompany.name
              ? row.createdByCompany.name
              : ""
        },
        {
          prop: "createdAt",
          label: "登记日期",
          width: CELL_WIDTH.time,
          type: "time"
        }
      ],
      videoUrl: "https://dl.hztl3.com/videos/yp_videos/make_cooperators.mp4",
      videoPopoverRemark:
        "往来单位管理页面，用户管理账套内业务往来单位，包括供应商、客户、物流公司，每个类型的往来单位都有自己的一些特有属性，用来控制在业务中的一些功能限制，比如：客户允许挂账开关关闭，那么在开销售单的时候，该客户不能选择「挂账」结算方式。"
    };
  },
  computed: {
    ...mapState("admin/user", {
      openedPlatform: state => state.userInfoMsg.openedPlatform
    }),
    ...mapState("admin/units", {
      types: state => state.type
    }),
    ...mapState("admin/table", ["pageSize"]),
    canCreate() {
      return (
        this.hasAutoPerm("createCustomer") ||
        this.hasAutoPerm("createSupplier") ||
        this.hasAutoPerm("createLogistics") ||
        this.hasAutoPerm("createInsurance")
      );
    },
    canUpdate() {
      return (
        !!this.selectedRows.length &&
        (this.hasBelongsPerm(
          "updateBasicAndContacts",
          this.selectedRows[0].belongs
        ) ||
          this.hasBelongsPerm("updateCompany", this.selectedRows[0].belongs) ||
          this.hasBelongsPerm(
            "updateBusinessMen",
            this.selectedRows[0].belongs
          ) ||
          this.hasBelongsPerm("updateCustomer", this.selectedRows[0].belongs) ||
          this.hasBelongsPerm("updateSupplier", this.selectedRows[0].belongs) ||
          this.hasBelongsPerm(
            "updateLogistics",
            this.selectedRows[0].belongs
          ) ||
          this.hasBelongsPerm("updateInsurance", this.selectedRows[0].belongs))
      );
    },
    canEnableDisable() {
      return (
        this.selectedRows.length &&
        this.hasBelongsPerm("enableDisable", this.selectedRows[0].belongs)
      );
    },
    canDelete() {
      return (
        this.selectedRows.length &&
        this.hasBelongsPerm("delete", this.selectedRows[0].belongs)
      );
    },
    canMerge() {
      return (
        this.hasCompletePerm("basics.cooperators.our.merge") ||
        this.hasCompletePerm("basics.cooperators.toOur.merge") ||
        this.hasCompletePerm("basics.cooperators.rests.merge")
      );
    },
    canImport() {
      return this.hasAutoPerm("import");
    }
  },
  mounted() {
    this.handleSearchForm();
  },
  methods: {
    ...mapActions("admin/units", ["resetCooperatorsTabs", "toCooperatorsType"]),
    ...mapActions("admin/communionCompany", ["loadAll"]),
    handleKeyCode(e) {
      switch (e.code) {
        case "F2":
          this.addNewUint();
          break;
        case "F3":
          this.editUint();
          break;
        case "KeyI":
          if (e.altKey && this.hasAutoPerm("import")) {
            this.importVisible = true;
          }
          break;
        case "Insert":
          this.showSearchBox();
          break;
        case "Numpad0":
          if (e.key == "Insert") this.showSearchBox();
          break;
        default:
          break;
      }
    },
    handleTableSetting() {
      this.editColumnsVisible = true;
    },
    tableColumnsChange(columns) {
      this.tableColumns = [];
      this.$nextTick(() => {
        this.tableColumns = columns;
      });
    },
    showSearchBox() {
      this.showSearchSupplierBox = true;
    },
    handleSearchForm(params) {
      this.searchForm = { ...params };
      this.handleSearch();
    },
    handleSearch() {
      this.currentPage = 1;
      this.laodData(this.currentPage);
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.laodData(this.currentPage);
    },
    laodData(page) {
      this.loading = true;
      searchCooperators({
        ...this.searchForm,
        page,
        pageSize: this.pageSize
      })
        .then(data => {
          this.totalSize = data.totalSize;
          this.tableData = data.rows || [];
          let selectedRow;
          if (this.selectedRows.length) {
            selectedRow = this.tableData.find(
              item => item.id === this.selectedRows[0].id
            );
          }
          this.selectedRows = selectedRow
            ? [selectedRow]
            : this.tableData.length
            ? [this.tableData[0]]
            : [];
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleRowEdit(row) {
      this.handleEdit(row);
    },
    addNewUint() {
      if (!this.canCreate) return;
      const row = {
        flags: { isCustomer: false, isSupplier: false, isLogistics: false }
      };
      this.toCooperatorsType(row);
      this.cooperatorId = null;
      this.showCommunionInformationBox = true;
    },
    editUint() {
      this.handleEdit(this.selectedRows[0]);
    },
    handleEdit(row) {
      if (!this.canUpdate) return;
      this.toCooperatorsType(row);
      this.cooperatorId = row.id;
      this.showCommunionInformationBox = true;
    },
    handleCooperatorSave() {
      const msg = this.cooperatorId ? "更新成功！" : "新增成功！";
      this.$message.success({ message: msg, showClose: true });
      this.selectedRows = this.cooperatorId ? this.selectedRows : [];
      this.currentPage = this.cooperatorId ? this.currentPage : 1;
      this.laodData(this.currentPage);
    },
    // handleDelete(row, index) {
    //     if (!this.canDelete) return;
    //     this.$confirm(`此操作将删除 ${row.name}, 是否继续?`, "提示", { type: "warning" })
    //         .then(() => {
    //             deleteContacts(row.id)
    //                 .then(() => {
    //                     this.$message.success({ message: "删除成功", showClose: true });
    //                     this.tableData.splice(index, 1);
    //                     if (this.totalSize > 1) {
    //                         --this.totalSize;
    //                     } else {
    //                         this.totalSize = 0;
    //                     }
    //                     this.loadAll(true);
    //                 })
    //                 .catch(() => {});
    //         })
    //         .catch(() => {});
    // },
    storeEnable(row) {
      if (!this.canEnableDisable) return;
      this.$confirm(`确定要启用 ${row.name} 单位？`, "提示", {
        type: "warning"
      })
        .then(() => {
          enableContacts(row.id)
            .then(() => {
              this.$message.success({ message: "启用成功", showClose: true });
              this.handleSearch();
              this.loadAll(true);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    storeDisable(row) {
      if (!this.canEnableDisable) return;
      this.$prompt("请输入停用原因", "提示", {
        inputType: "textarea",
        inputValidator: val => {
          if (!val) {
            return "请输入停用原因";
          } else {
            return true;
          }
        }
      })
        .then(({ value }) => {
          stopContacts({ reason: value }, row.id)
            .then(() => {
              this.handleSearch();
              this.$message.success({ message: "停用成功", showClose: true });
              this.loadAll(true);
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    handleMergeCooperators() {
      if (!this.canMerge) return;
      this.showMergeCooperatorBox = true;
    },
    importUnits(params) {
      return new Promise((resolve, reject) => {
        const reqParams = params.map(item => {
          return { ...item };
        });
        reqImportCooperators({
          types: {
            isCustomer: this.header.checkList.includes("isCustomer"),
            isSupplier: this.header.checkList.includes("isSupplier"),
            isLogistics: false,
            isStorage: false
          },
          rows: convertObjects(reqParams)
        })
          .then(data => {
            resolve(data);
          })
          .catch(() => {
            reject();
          });
      });
    }
  }
};
</script>
