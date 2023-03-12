<template>
  <div class="form-wrap">
    <el-form
      ref="form"
      :model="form"
      size="mini"
      label-width="90px"
      label-position="left"
    >
      <el-row :gutter="5">
        <el-col :span="4">
          <el-form-item label="项目编码">
            <el-input v-model="form.code" place-holder="编码" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="项目名称">
            <el-input
              v-model="form.name"
              place-holder="名称/助记符"
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目类型" prop="category">
            <ht-select
              v-model="form.categories"
              multiple
              filterable
              collapse-tags
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="item in repairProjectCategoryList"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              />
            </ht-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="启用状态" prop="category">
            <ht-select v-model="form.status" size="small" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </ht-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="允许打折" prop="category">
            <ht-select
              v-model="form.discount"
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="item in discountOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </ht-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否常用项目" prop="category">
            <ht-select
              v-model="form.commonUse"
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="item in usualOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </ht-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="list()"
            >查询（F5）</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="reset"
            >重置（F6）</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="showServiceNew = true"
            >快速新增项目</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <ht-setting-table
      :data="tableData"
      setting-all-column
      show-table-setting
      :columns="tableColumns"
      style="height:460px;"
      table-name="work-orders-service"
      pagination
      :total="totalSize"
      :current-page.sync="currentPage"
      @pageChange="_handleSizeChange"
    />
    <ServiceEditor
      :visible="showServiceNew"
      :currentItem="{}"
      @update="update"
    />
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import ServiceEditor from "@/components/repair/service/serviceEditor";
import { repairProjectCategoryDictionary } from "@/utils/store";
import { listItems } from "@/api/repairs";
import { mapState } from "vuex";
const defaultForm = {
  categories: [],
  code: "",
  name: "",
  discount: null,
  commonUse: null,
  status: ""
};
export default {
  data() {
    return {
      showServiceNew: false,
      form: { ...defaultForm },
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
        {
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 30,
          cantExport: true,
          render: (_, row) => (
            <div>
              <el-tooltip enterable={false} placement="top" content="添加">
                <span
                  on-click={e => this.handleAdd(row, e)}
                  class="icon operation-icon el-icon-plus"
                />
              </el-tooltip>
            </div>
          )
        },
        {
          prop: "code",
          label: "项目编码",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "name",
          label: "项目名称",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "categoryName",
          label: "项目类型",
          width: CELL_WIDTH.multiple
        },
        {
          label: "常用项目",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { flags } = row;
            const { commonUse } = flags;
            return <span>{commonUse ? "是" : "否"}</span>;
          }
        },
        {
          label: "允许打折",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { flags } = row;
            const { discount } = flags;
            return <span>{discount ? "是" : "否"}</span>;
          }
        },
        {
          label: "是否启用",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { flags } = row;
            const { status } = flags;
            return <span>{status === "disable" ? "否" : "是"}</span>;
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.multiple
        }
      ],
      statusOptions: [
        {
          name: "不限",
          value: ""
        },
        {
          name: "启用",
          value: "enable"
        },
        {
          name: "停用",
          value: "disable"
        }
      ],
      discountOptions: [
        {
          name: "不限",
          value: null
        },
        {
          name: "允许",
          value: true
        },
        {
          name: "不允许",
          value: false
        }
      ],
      usualOptions: [
        {
          name: "不限",
          value: null
        },
        {
          name: "是",
          value: true
        },
        {
          name: "否",
          value: false
        }
      ],
      currentPage: 1,
      totalSize: 0
    };
  },
  components: {
    ServiceEditor
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    repairProjectCategoryList() {
      return repairProjectCategoryDictionary();
    }
  },
  mounted() {
    this.list();
  },
  methods: {
    update() {
      this.showServiceNew = false;
      this.list();
    },
    list() {
      listItems({
        ...this.form,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.tableData = rows || [];
        this.totalSize = totalSize;
      });
    },
    reset() {
      this.form = { ...defaultForm };
    },
    handleAdd(e) {
      this.$emit("addService", {
        ...e
      });
      this.list();
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.list();
    }
  }
};
</script>

<style lang="scss" scoped>
.form-wrap {
  ::v-deep {
    .el-row {
      margin: 10px 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.el-icon-plus {
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
}
</style>
