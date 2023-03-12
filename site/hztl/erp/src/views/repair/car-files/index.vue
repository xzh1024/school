<template>
  <div style="height:85%;">
    <!-- 按钮组 -->
    <div class="header-btns">
      <el-button
        type="primary"
        size="small"
        v-if="hasAutoPerm('create')"
        @click="newFile"
        >新增车辆（F2）</el-button
      >
      <el-button
        type="primary"
        size="small"
        v-if="hasAutoPerm('create')"
        :disabled="!currentFile || !currentFile.id"
        @click="customerAddFile"
        >客户追加车辆</el-button
      >
      <el-button
        type="primary"
        size="small"
        v-if="hasAutoPerm('update')"
        :disabled="!currentFile || !currentFile.id"
        @click="editeFile"
        >修改车辆（F3）</el-button
      >
      <el-button
        type="primary"
        size="small"
        v-if="hasAutoPerm('delete')"
        :disabled="!currentFile || !currentFile.id"
        @click="deleteFile"
        >删除车辆（F4）</el-button
      >
      <el-button
        type="primary"
        size="small"
        v-if="hasAutoPerm('update')"
        :disabled="!currentFile || !currentFile.id"
        @click="showTransfer = true"
        >车辆过户</el-button
      >
      <el-button
        type="primary"
        size="small"
        :disabled="!currentFile || !currentFile.id"
        @click="showHis"
        >维修履历</el-button
      >
      <el-button
        type="primary"
        size="small"
        :disabled="!currentFile || !currentFile.id"
        @click="showLog = true"
        >修改日志</el-button
      >
    </div>
    <ht-card padding class="auto-card" style="height:50px;margin:8px;">
      <el-form ref="form" :model="form" size="mini" label-width="70px">
        <el-row>
          <el-col :span="4">
            <el-form-item label="车牌号">
              <el-input
                v-model="form.plateNumber"
                place-holder="车牌号"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="车架号">
              <el-input
                v-model="form.vin"
                place-holder="名称/助记符"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客户名称">
              <ht-autoselect
                v-model="form.cooperatorId"
                :fetch-suggestions="
                  query => searchLoadAllCustromerCooperators(query)
                "
                :trigger-on-focus="false"
                remote
                clearable
                filter-zero
                highlight-first-item
                placeholder="客户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="2">
            <el-button type="primary" size="small" @click="listCarFile()"
              >查询（F5）</el-button
            >
            <el-button type="primary" size="small" @click="reset"
              >重置（F6）</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <ht-card padding class="auto-card" style="margin:8px;">
      <ht-setting-table
        :data="tableData"
        :enable-table-setting="true"
        :columns="tableColumns"
        @row-dblclick="handleEdit"
        pagination
        :total="totalSize"
        @selectChange="selectChange"
        :selected-rows.sync="selectedRows"
        :current-page.sync="currentPage"
        @pageChange="_handleSizeChange"
        table-name="car-files"
      />
    </ht-card>
    <FileEditor
      v-if="showFileEditor"
      :visible="showFileEditor"
      :currentFile="null"
      @update="update"
      @close="close"
    />
    <FileEditor
      :visible="showAddCar"
      :currentFile="customerInfo"
      :isAddFile="isAddFile"
      @update="update"
      @close="close"
    />
    <EditLog :visible="showLog" :currentFile="currentFile" @close="close" />
    <TransferOwner
      :visible="showTransfer"
      :currentFile="currentFile"
      @update="update"
      @close="close"
    />
    <!-- 维修履历 -->
    <RepaireHistory
      :visible="showHistory"
      :orderInfo="currentVehicle"
      @close="showHistory = false"
    />
  </div>
</template>

<script>
import FileEditor from "@/components/repair/carFile/fileEditor";
import EditLog from "./components/editLog";
import TransferOwner from "./components/transferOwner";
import { listCarFile, deleteCarFile } from "@/api/repairs";
import { mapState } from "vuex";
import { columns } from "./const/columns";
import { searchAllCooperators } from "@/api/communion/communion";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { hotkeyMixin } from "@/mixins";
import RepaireHistory from "@/components/repair/repairHistory/repairHistory";
import { baseDictionary } from "@/api/base/base";
const defaultForm = {
  plateNumber: "",
  vin: ""
};
export default {
  name: "CarFiles",
  data() {
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 70,
      cantExport: true,
      render: (value, row) => (
        <div>
          {this.hasUpdatePerm ? (
            <el-tooltip enterable={false} placement="top" content="编辑">
              <span
                on-click={e => this.handleEdit(row, e)}
                class="icon operation-icon icon-edit-info"
              />
            </el-tooltip>
          ) : (
            ""
          )}

          {this.hasDeletePerm ? (
            <el-tooltip enterable={false} placement="top" content="删除">
              <span
                on-click={e => this.handleDelete(row, e)}
                class="icon operation-icon icon-delete-info"
              />
            </el-tooltip>
          ) : (
            ""
          )}
        </div>
      )
    };
    return {
      showHistory: false,
      showFileEditor: false,
      showAddCar: false,
      showLog: false,
      showTransfer: false,
      isAddFile: false,
      currentVehicle: null,
      selectedRows: [],
      customerInfo: {},
      currentFile: {},
      form: { ...defaultForm },
      currentPage: 1,
      totalSize: 0,
      tableData: [],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        controlsColumn,
        ...columns
      ],
      vehicleLevelList: []
    };
  },
  components: {
    FileEditor,
    EditLog,
    TransferOwner,
    RepaireHistory
  },
  mixins: [hotkeyMixin],
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    hasUpdatePerm() {
      return this.hasAutoPerm("update");
    },
    hasDeletePerm() {
      return this.hasAutoPerm("delete");
    }
  },
  mounted() {
    this.listCarFile(this.currentPage);
  },
  methods: {
    newFile() {
      this.isAddFile = false;
      this.showFileEditor = true;
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.listCarFile(this.currentPage);
    },
    reset() {
      this.form = { ...defaultForm };
      this.currentPage = 1;
      this.listCarFile(1);
    },
    listCarFile(page) {
      baseDictionary({ type: "vehicleLevel" })
        .then(res => {
          this.vehicleLevelList = res.options;
          this.queryList(page);
        })
        .catch(() => {
          this.queryList(page);
        });
    },
    queryList(page) {
      listCarFile({
        ...this.form,
        currentPage: page,
        pageSize: this.pageSize
      }).then(res2 => {
        const { rows, totalSize } = res2;
        this.totalSize = totalSize;
        this.tableData = rows || [];
        if (rows.length) {
          this.selectedRows = [rows[0]];
          this.selectChange(rows);
        }
      });
    },
    async searchLoadAllCustromerCooperators(query) {
      return (
        (await searchAllCooperators({
          type: "customer",
          keyword: query
        })) || []
      );
    },
    selectChange(e) {
      this.currentFile = { ...e[0] };
    },
    editeFile() {
      this.customerInfo = { ...this.currentFile };
      this.isAddFile = false;
      this.showAddCar = true;
    },
    customerAddFile() {
      // 追加车辆只需要客户信息
      // 这里用一个相同的组建是为了避免重复操作currentFile而增加不必要的复杂程度
      this.customerInfo = {
        id: this.currentFile.id,
        cooperatorId: this.currentFile.cooperatorId,
        customerName: this.currentFile.customerName,
        plateNumber: this.currentFile.plateNumber
      };
      this.isAddFile = true;
      this.showAddCar = true;
    },
    handleEdit(row) {
      this.currentFile = { ...row };
      this.customerInfo = { ...row };
      this.isAddFile = false;
      this.showAddCar = true;
    },
    deleteFile() {
      if (!this.currentFile) return;
      this.handleDelete(this.currentFile);
    },
    handleDelete(row) {
      const { id } = row;
      this.$confirm(`确定要删除该车辆档案吗？`, "提示", {
        type: "warning"
      }).then(() => {
        deleteCarFile({ vehicleId: id }).then(() => {
          this.listCarFile();
          this.$message.success({ message: "删除档案成功!" });
        });
      });
    },
    showHis() {
      const { id, plateNumber } = this.currentFile;
      this.currentVehicle = {
        id,
        vehicle: {
          vehicleId: id,
          plateNumber: plateNumber
        }
      };
      this.$nextTick(() => {
        this.showHistory = true;
      });
    },
    close() {
      this.showFileEditor = false;
      this.showAddCar = false;
      this.showLog = false;
      this.showTransfer = false;
    },
    update() {
      this.listCarFile(this.currentPage);
      this.showFileEditor = false;
      this.showAddCar = false;
      this.showTransfer = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.header-btns {
  padding: 5px 10px;
  margin: 8px 0;
  background: #fff;
}
.auto-card {
  ::v-deep {
    .selected-row {
      color: #3aa7ff;
      background-color: #e0f1ff;
    }
  }
}
</style>
