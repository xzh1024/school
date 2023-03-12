<template>
  <ht-card no-padding title="分公司/业务员权限" class="auto-card">
    <div
      slot="after-title"
      class="text-font-primary"
      style="margin-top: -4px; text-align: right;"
    >
      全部公司拥有权限（包括新增公司）：
      <el-switch
        v-model="availableToAll"
        :disabled="!canEdit"
        @change="handleAvailableToAllChange"
        style="margin-right: 10px;"
      />
      <el-popover
        placement="top"
        width="380"
        style="color:#FF5454"
        trigger="click"
      >
        <p>
          用于设置该往来单位各分公司是否有权使用，且各分公司可以设置公司内部员工作为默认采购业务员或销售业务。（注意：如需设置采购业务员或销售业务员，需在员工管理对该员工赋予对应“采购业务员”或“销售业务员”角色）
        </p>
        <span slot="reference" class="text-danger" style="cursor:pointer;">
          <i class="el-icon-question"></i>分公司/业务员权限
        </span>
      </el-popover>
    </div>
    <ht-setting-table
      :tableName="tableName"
      :columns="tableColumns"
      :data="tableData"
      :selected-rows.sync="selectedRows"
      :key-scope="keyScope"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </ht-card>
</template>

<script>
import { searchMixin } from "@/mixins";
import { CELL_WIDTH } from "@/constants";

export default {
  name: "BusinessMenTable",
  mixins: [searchMixin],
  props: {
    isEdit: Boolean,
    defaultData: {
      type: Object,
      default() {
        return {};
      }
    },
    belongs: {
      type: Array,
      default() {
        return [];
      }
    },
    keyScope: {
      type: [Symbol, String],
      default: Symbol("BusinessMenTable")
    }
  },
  data() {
    const enabledColumn = {
      label: "是否有权限",
      prop: "enabled",
      width: 90,
      render: (value, row) => (
        <el-switch
          v-model={row.enabled}
          disabled={!this.canEdit}
          on-change={this.handleRowAvailableChange}
        />
      )
    };
    const purchaseManColumn = {
      label: "采购业务员",
      prop: "purchaseMan",
      width: CELL_WIDTH.personName,
      render: (value, row) => (
        <ht-autoselect
          v-model={row.purchaseMan.id}
          defaultValue={row.purchaseMan.name}
          on={{
            "update:defaultValue": val => (row.purchaseMan.name = val)
          }}
          disabled={!this.canEditMan}
          fetch-suggestions={query =>
            this.searchLoadCompanyPurchaseMen(row.company.id, query)
          }
          trigger-on-focus={false}
          placeholder="请选择"
          remote
          clearable
          highlight-first-item
          size="mini"
          on-change={this.handleFormChange}
        />
      )
    };
    const salesManColumn = {
      label: "销售业务员",
      prop: "salesMan",
      width: CELL_WIDTH.personName,
      render: (value, row) => (
        <ht-autoselect
          v-model={row.salesMan.id}
          defaultValue={row.salesMan.name}
          on={{
            "update:defaultValue": val => (row.salesMan.name = val)
          }}
          disabled={!this.canEditMan}
          fetch-suggestions={query =>
            this.searchLoadCompanySalesMen(row.company.id, query)
          }
          trigger-on-focus={false}
          placeholder="请选择"
          remote
          clearable
          highlight-first-item
          size="mini"
          on-change={this.handleFormChange}
        />
      )
    };

    return {
      selectedRows: [],
      tableData: [],
      tableName: "CommunionInformationBoxBusinessMenTable",
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        { prop: "companyIdent", label: "公司标识", width: 70 },
        {
          prop: "companyName",
          label: "公司名称",
          width: CELL_WIDTH.companyName
        },
        enabledColumn,
        purchaseManColumn,
        salesManColumn
      ],
      availableToAll: false
    };
  },
  computed: {
    canEdit() {
      if (this.isEdit) {
        return this.hasBelongsPerm("updateCompany", this.belongs);
      } else {
        return (
          this.hasAutoPerm("createCustomer") ||
          this.hasAutoPerm("createSupplier") ||
          this.hasAutoPerm("createLogistics")
        );
      }
    },
    canEditMan() {
      if (this.isEdit) {
        return this.hasBelongsPerm("updateBusinessMen", this.belongs);
      } else {
        return (
          this.hasAutoPerm("createCustomer") ||
          this.hasAutoPerm("createSupplier") ||
          this.hasAutoPerm("createLogistics")
        );
      }
    }
  },
  watch: {
    defaultData() {
      this.initData();
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.availableToAll = this.defaultData.availableToAll;
      this.tableData = this.defaultData.rows || [];
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
    },
    setAvailableToAll(value) {
      this.tableData = this.tableData.map(item => {
        return {
          ...item,
          enabled: value
        };
      });
    },
    handleRowAvailableChange() {
      if (this.tableData.some(item => !item.enabled)) {
        this.availableToAll = false;
      } else {
        this.availableToAll = true;
      }
      this.handleFormChange();
    },
    handleAvailableToAllChange(value) {
      this.setAvailableToAll(value);
      this.handleFormChange();
    },
    handleFormChange() {
      this.$emit("update:defaultData", {
        rows: this.tableData,
        availableToAll: this.availableToAll
      });
    }
  }
};
</script>
