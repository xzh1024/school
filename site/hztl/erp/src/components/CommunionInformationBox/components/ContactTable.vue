<template>
  <ht-card no-padding title="联系人" class="auto-card">
    <div slot="after-title" style="margin-top: -4px; text-align: right;">
      <el-tooltip :enterable="false" placement="top" content="添加">
        <span
          v-show="canEdit"
          class="operation-icon icon-add-info"
          @click.stop="addHandle"
        />
      </el-tooltip>
      <el-tooltip :enterable="false" placement="top" content="编辑">
        <span
          v-show="canEdit"
          class="operation-icon icon-edit-info"
          @click.stop="editHandle"
        />
      </el-tooltip>
      <el-tooltip :enterable="false" placement="top" content="删除">
        <span
          v-show="canEdit"
          class="operation-icon icon-delete-info"
          @click.stop="deleteHandle"
        />
      </el-tooltip>
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

    <AddContact
      :visible.sync="showAddContactBox"
      :is-edit-box="isEditBox"
      :information="editData"
      @handleConfirm="handleContact"
    />
  </ht-card>
</template>

<script>
import AddContact from "./AddContact";
import { CELL_WIDTH } from "@/constants";

const SEX = {
  0: "未设置",
  1: "男",
  2: "女"
};

export default {
  name: "ContactTable",
  components: {
    AddContact
  },
  props: {
    isEdit: Boolean,
    belongs: {
      type: Array,
      default() {
        return [];
      }
    },
    defaultData: {
      type: Array,
      default() {
        return [];
      }
    },
    keyScope: {
      type: [Symbol, String],
      default: Symbol("ContactTable")
    }
  },
  data() {
    const isMainColumn = {
      label: "主联系人",
      prop: "main",
      width: CELL_WIDTH.isDefault,
      render: (value, row) => {
        return row.flags.main ? (
          <span class="icon operation-icon icon-selected-info" />
        ) : this.canEdit ? (
          <span
            class="icon operation-icon icon-select-info"
            on-click={e => this.setDefaultContanct(e, row)}
          />
        ) : (
          ""
        );
      }
    };

    return {
      selectedRows: [],
      tableData: [],
      tableName: "CommunionInformationBoxContactTable",
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        isMainColumn,
        { prop: "name", label: "姓名", width: CELL_WIDTH.fullName },
        { prop: "phone", label: "联系电话", width: CELL_WIDTH.phone },
        {
          prop: "sex",
          label: "性别",
          width: CELL_WIDTH.sex,
          formatter: (value, row) => SEX[row.flags.sex]
        },
        { prop: "birthday", label: "出生日期", width: CELL_WIDTH.date },
        { prop: "position", label: "职务", width: CELL_WIDTH.position }
      ],
      showAddContactBox: false,
      isEditBox: false,
      editData: {},
      localId: 0
    };
  },
  computed: {
    canEdit() {
      if (this.isEdit) {
        return this.hasBelongsPerm("updateBasicAndContacts", this.belongs);
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
      this.tableData = this.defaultData.length
        ? this.defaultData.map(item => {
            return {
              ...item,
              localId: ++this.localId
            };
          })
        : [];
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
    updataData() {
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
      this.$emit("update:defaultData", this.tableData);
    },
    setDefaultContanct(e, row) {
      e.stopPropagation();
      this.tableData = this.tableData.map(item => {
        return {
          ...item,
          flags: {
            ...item.flags,
            main: item.localId === row.localId
          }
        };
      });
      this.selectedRows = [row];
      this.updataData();
      this.$message.success({ message: "设置主联系人成功！", showClose: true });
    },
    addHandle() {
      this.isEditBox = false;
      this.showAddContactBox = true;
    },
    editHandle() {
      if (this.selectedRows.length !== 1) {
        this.$message.warning({
          message: "请选择一条联系人明细！",
          showClose: true
        });
        return;
      }
      this.isEditBox = true;
      this.editData = { ...this.selectedRows[0] };
      this.showAddContactBox = true;
    },
    handleContact(row) {
      if (this.isEditBox) {
        this.tableData = this.tableData.map(item => {
          return item.localId === row.localId ? row : item;
        });
        this.updataData();
        this.$message.success({ message: "更新联系人成功！", showClose: true });
      } else {
        row.sex = SEX[row.flags.sex];
        if (!this.tableData.length) {
          row.flags = {
            ...row.flags,
            main: true
          };
        }
        this.tableData.push(row);
        this.updataData();
        this.$message.success({ message: "添加联系人成功！", showClose: true });
      }
    },
    deleteHandle() {
      if (this.selectedRows.length !== 1) {
        this.$message.warning({
          message: "请选择一条联系人明细！",
          showClose: true
        });
        return;
      }
      this.tableData = this.tableData.filter(
        item => item !== this.selectedRows[0]
      );
      this.updataData();
      this.$message.success({ message: "删除联系人成功！", showClose: true });
    }
  }
};
</script>
