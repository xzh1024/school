<template>
  <div style="height: 100%">
    <el-row style="height: 100%">
      <el-col :span="12" style="height: 100%">
        <ht-card title="货位" style="margin: 5px 0 0 5px;height: 100%">
          <div class="search-input">
            <el-input placeholder="输入内容查询" v-model="name">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="loadData"
              ></el-button>
            </el-input>
          </div>
          <ht-table
            :loading="tableLoading"
            :data="tableData"
            :columns="tableColumns"
            :selected-rows.sync="selectedRows"
            :total="tableTotal"
            :pagination="true"
            @pageChange="pageChange"
            :current-page.sync="currentPage"
            style="height: calc(100% - 90px);"
          />
        </ht-card>
      </el-col>
      <el-col :span="12" style="height: 100%">
        <ht-card title="编辑货位" style="margin: 5px 0 0 5px;height: 50%;">
          <div slot="after-title" class="after-title-container">
            <el-button
              @click="save"
              plain
              type="primary"
              size="mini"
              :disabled="!hasAutoPerm('setting.manageChildren')"
            >
              保存
            </el-button>
            <el-button
              @click="Delete"
              plain
              type="primary"
              size="mini"
              :disabled="!hasAutoPerm('setting.manageChildren')"
            >
              删除
            </el-button>
          </div>
          <el-form
            v-loading="updateLoading"
            ref="addFormRef"
            :rules="rules"
            :model="addFormData"
            :show-message="false"
            label-width="71px"
            size="mini"
            class="form-item-small-margin-bottom form"
            style="height: 180px"
          >
            <el-form-item label="货位名称" prop="showName">
              <ht-input
                v-model="addFormData.name"
                placeholder="编码名称（最多20个字符）"
                style="width: 300px;"
                maxlength="20"
              />
            </el-form-item>
          </el-form>
        </ht-card>
        <ht-card title="新增货位" style="margin: 5px 0 0 5px;height: 50%;">
          <div slot="after-title" class="after-title-container">
            <el-button
              @click="Add"
              type="primary"
              plain
              size="mini"
              :disabled="!hasAutoPerm('setting.manageChildren')"
            >
              新增
            </el-button>
          </div>
          <el-form
            v-loading="submitLoading"
            ref="formRef"
            :rules="rules"
            :model="formData"
            :show-message="false"
            label-width="70px"
            size="mini"
            class="form-item-small-margin-bottom form"
            style="height: 180px"
          >
            <div style="display: flex">
              <el-radio
                v-model="editTypeRadio"
                label="batch"
                style="line-height:32px"
                @change="editFormReset"
              >
                批量
              </el-radio>
              <batch-add
                v-show="editTypeRadio === 'batch'"
                v-model="formData.batchPositions"
                :label-name="'货位名称'"
              />
            </div>

            <div style="display: flex">
              <el-radio
                v-model="editTypeRadio"
                label="single"
                style="line-height:32px"
                @change="editFormReset"
              >
                单个
              </el-radio>
              <el-form-item
                v-show="editTypeRadio === 'single'"
                prop="singleAddName"
                label="货位名称"
                label-width="80px"
              >
                <ht-input
                  v-model="formData.singleAddName"
                  autocomplete="off"
                  placeholder="编码名称（最多20个字符）"
                  maxlength="20"
                  style="width: 300px;"
                />
              </el-form-item>
            </div>
          </el-form>
        </ht-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  reqGetStorePosition,
  reqGetStorePositionList,
  reqStorePositionAdd,
  reqStorePositionBatch,
  reqStorePositionDelete,
  reqStorePositionUpdate
} from "@/api/store/settings";
import batchAdd from "@/views/store/storeSettings/settings/components/batchAdd";
import { mapState } from "vuex";
const defaultFormData = {
  batchPositions: {
    type: 0,
    begin: "1",
    end: "1",
    length: 1
  },
  singleAddName: "",
  name: "",
  remark: ""
};
export default {
  name: "easyIndex",
  components: {
    batchAdd
  },
  data() {
    return {
      updateLoading: false,
      submitLoading: false,
      formData: { ...defaultFormData },
      addFormData: {},
      editTypeRadio: "batch",
      rules: {
        name: [{ required: true, message: "请输入货位名称", trigger: "blur" }]
      },
      name: "",
      editId: 0,
      tableLoading: false,
      selectedRows: [],
      tableData: [],
      currentPage: 1,
      tableTotal: 0,
      tableColumns: [{ prop: "showName", label: "货位名称", width: 100 }]
    };
  },
  computed: {
    ...mapState("admin", {
      pageSizes: state => state.table.pageSize
    }),
    ...mapState("admin/warehouseSettings", {
      warehouseId: state => state.warehousesInfo.warehouseId
    })
  },
  created() {
    this.loadData();
  },
  watch: {
    selectedRows() {
      if (this.selectedRows && this.selectedRows[0]) {
        this.editId = this.selectedRows[0].id;
        this.loadDetail();
      }
    },
    warehouseId() {
      if (this.warehouseId) {
        this.loadData();
      }
    }
  },
  methods: {
    editFormReset() {
      this.$refs["formRef"].resetFields();
    },
    clear() {
      this.editId = 0;
      if (this.$refs.formRef) {
        this.$refs.formRef.resetFields();
      }
      if (this.$refs.addFormRef) {
        this.$refs.addFormRef.resetFields();
      }
    },
    reload() {
      this.loadData({ page: this.currentPage });
    },
    pageChange(page) {
      this.currentPage = page;
      this.loadData({ page: page });
    },
    loadData(page) {
      this.tableLoading = true;
      reqGetStorePositionList({
        warehouseId: this.warehouseId,
        name: this.name,
        ...page,
        pageSize: this.pageSizes
      })
        .then(res => {
          this.tableData = res.rows || [];
          this.tableTotal = res.totalSize;
          this.tableLoading = false;
        })
        .catch(() => {
          this.tableData = [];
          this.tableTotal = 0;
          this.tableLoading = false;
        });
    },
    loadDetail() {
      if (this.editId !== 0) {
        reqGetStorePosition(this.editId).then(res => {
          this.addFormData = res;
          this.addFormData.name = res.showName;
        });
      }
    },
    Delete() {
      this.$confirm(
        `确定要删除货位 ${this.selectedRows[0].showName} ？`,
        "提示",
        {
          type: "warning"
        }
      )
        .then(() => {
          reqStorePositionDelete(this.editId)
            .then(() => {
              this.$message.success({
                message: `成功删除货位 ${this.selectedRows[0].showName}`
              });
              this.clear();
              this.loadData();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    save() {
      this.$refs["addFormRef"].validate((valid, err) => {
        if (valid) {
          this.updateLoading = true;
          reqStorePositionUpdate(this.addFormData)
            .then(() => {
              this.updateLoading = false;
              this.$message.success({
                message: "修改货位 " + this.addFormData.showName + " 成功"
              });
              this.reload();
            })
            .catch(() => {
              this.updateLoading = false;
            });
        } else {
          const errTips = err[Object.keys(err)[0]][0].message;
          this.$message.warning({ message: errTips, showClose: true });
          return false;
        }
      });
    },
    Add() {
      const reqData = {};
      reqData.warehouseId = this.warehouseId;
      if (this.editTypeRadio === "single") {
        reqData.name = this.formData.singleAddName;
        this.$refs["formRef"].validate((valid, err) => {
          if (valid) {
            this.submitLoading = true;
            reqStorePositionAdd(reqData)
              .then(() => {
                this.submitLoading = false;
                this.$message.success({
                  message: "新增货位 " + this.formData.singleAddName + " 成功"
                });
                this.$refs.formRef.resetFields();
                this.loadData();
              })
              .catch(() => {
                this.submitLoading = false;
              });
          } else {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
            return false;
          }
        });
      } else {
        this.submitLoading = true;
        reqData.name = this.makeBatchData(this.formData.batchPositions);
        reqData.warehouseId = this.warehouseId;
        reqStorePositionBatch(reqData)
          .then(() => {
            this.submitLoading = false;
            this.$message.success({ message: "新增成功" });
            this.$refs.formRef.resetFields();
            this.loadData();
          })
          .catch(() => {
            this.submitLoading = false;
          });
      }
    },
    makeBatchData(data) {
      const res = {
        type: data.type,
        start: data.begin,
        end: data.end,
        numberDigit: data.length
      };
      return res;
    }
  }
};
</script>
<style lang="stylus" scoped>
.search-input
  padding 5px 10px;
  width 100%;
/deep/ .el-table {
  height: calc(100% - 83px) !important;
}
</style>
