<template>
  <ht-dialog v-bind="$attrs" title="操作提示" width="582px" v-on="$listeners">
    <span
      >当前部门有员工存在，删除后员工将直属公司管理，或者为员工重新设置部门。</span
    >
    <ht-table :data="staffData" :selection-type="null">
      <template v-for="column in staffColumns">
        <el-table-column :key="column.prop" v-bind="column">
          <template slot-scope="scope">
            <template v-if="column.prop === 'nowDepartmentName'">
              <ht-autoselect
                v-model="scope.row.departmentId"
                :options="departmentOptions"
                :trigger-on-focus="false"
                size="mini"
                placeholder="请选择部门"
                highlight-first-item
              />
            </template>
            <template v-else>
              {{ scope.row[column.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
    </ht-table>
    <div slot="footer" class="dialog-footer-align">
      <el-button type="primary" plain size="mini" @click="handleCancel">
        取 消
      </el-button>
      <el-button type="primary" plain size="mini" @click="handleSure">
        确 定
      </el-button>
    </div>
  </ht-dialog>
</template>
<script>
import { loadComapnyDepartments } from "@/api/company/company";

export default {
  name: "EditDepartment",
  props: {
    list: {
      type: Array
    },
    companyId: {
      type: [Number, String]
    },
    departmentsInfo: Object
  },
  data() {
    return {
      staffColumns: [
        { prop: "name", label: "员工名称", width: "200" },
        { prop: "oldDepartmentName", label: "当前部门", width: "100" },
        { prop: "nowDepartmentName", label: "更换部门", width: "200" }
      ],
      departmentOptions: []
    };
  },
  computed: {
    staffData() {
      return this.list;
    }
  },
  watch: {
    "$attrs.visible": {
      handler(value) {
        if (value && this.companyId) {
          loadComapnyDepartments(this.companyId).then(data => {
            this.departmentOptions = data
              .filter(item => item.id !== this.departmentsInfo.id)
              .map(item => {
                return item;
              });
          });
        }
      }
    }
  },
  methods: {
    // async loadDepartmentOptions(val) {
    //     const res = await loadComapnyDepartments(val);
    //     return res
    // },
    handleCancel() {
      this.$emit("update:visible", false);
    },
    filterStaffsDepartments(arr) {
      if (arr && arr.length) {
        const _arr = [];
        arr.forEach(item => {
          if (item.departmentId) {
            delete item.oldDepartmentName;
            _arr.push({ ...item, staffId: item.id });
          }
        });
        if (_arr && _arr.length) {
          return { staffs: _arr };
        } else {
          return {};
        }
      } else {
        return {};
      }
    },
    handleSure() {
      this.$emit(
        "handleDeleteDepartments",
        this.filterStaffsDepartments(this.staffData)
      );
    }
  }
};
</script>
