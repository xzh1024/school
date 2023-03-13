<template>
  <div>
    <div class="header-btns">
      <el-button
        type="primary"
        size="small"
        @click="newService"
        v-if="canCreate"
        >新增项目（F2）</el-button
      >
      <el-button
        v-if="canEdit"
        type="primary"
        size="small"
        :disabled="!currentItem.code"
        @click="showServiceEditor = true"
        >编辑项目（F3）</el-button
      >
      <el-button
        v-if="canDelete"
        type="primary"
        size="small"
        :disabled="!currentItem.code"
        @click="deleteService"
        >删除项目（F4）</el-button
      >
      <el-button
        type="primary"
        v-if="canExport"
        size="small"
        @click="exportTable"
        >导出（Alt+D）</el-button
      >
    </div>
    <ht-card padding style="margin:5px;" class="form-wrap">
      <el-form ref="form" :model="form" size="mini" label-width="70px">
        <el-row>
          <el-col :span="3">
            <el-form-item label="项目类型" prop="category">
              <ht-select
                v-model="form.categories"
                :options="repairProjectCategoryList"
                filterable
                multiple
                has-selecte-all-val
                collapse-tags
                size="small"
                placeholder="请选择"
              >
              </ht-select>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="项目编码">
              <el-input v-model="form.code" placeholder="编码" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="项目名称">
              <el-input
                v-model="form.name"
                placeholder="名称/助记符"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-checkbox v-model="form.commonUse">只查常用项目</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="8" :offset="4">
            <el-button type="primary" size="small" @click="search"
              >查询（F5）</el-button
            >
            <el-button type="primary" size="small" @click="reset"
              >重置（F6）</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <div class="content-wrap">
      <div class="item-list">
        <ItemList
          ref="list"
          @select="select"
          @edit="edit"
          @delete="deleteItem"
          @pageChange="search"
        />
      </div>
      <div class="item-price">
        <ItemPrice :currentItem="currentItem" />
      </div>
    </div>
    <ServiceEditor
      :visible="showServiceNew"
      :currentItem="defaultInfo"
      @update="update"
      @close="close"
    />
    <ServiceEditor
      :visible="showServiceEditor"
      :currentItem="currentItem"
      @update="update"
      @close="close"
    />
  </div>
</template>

<script>
import ItemList from "./components/itemList";
import ItemPrice from "./components/itemPrice";
import ServiceEditor from "@/components/repair/service/serviceEditor";
import { hotkeyMixin } from "@/mixins";
import { repairProjectCategoryDictionary } from "@/utils/store";
import { deleteItems } from "@/api/repairs";
const defaultForm = {
  categories: [],
  code: "",
  name: "",
  commonUse: null
};
export default {
  name: "FixService",
  data() {
    return {
      defaultInfo: {},
      currentItem: {},
      form: { ...defaultForm },
      showServiceNew: false,
      showServiceEditor: false,
      showConfirm: false
    };
  },
  components: {
    ItemList,
    ItemPrice,
    ServiceEditor
  },
  mixins: [hotkeyMixin],
  computed: {
    canCreate() {
      return this.hasAutoPerm("create");
    },
    canEdit() {
      return this.hasAutoPerm("update");
    },
    canDelete() {
      return this.hasAutoPerm("delete");
    },
    canExport() {
      return this.hasAutoPerm("export");
    },
    repairProjectCategoryList() {
      return repairProjectCategoryDictionary();
    }
  },
  created() {
    document.onkeydown = () => {
      const key = window.event.keyCode;
      if (key === 13 && this.showConfirm) {
        const { id } = this.currentItem;
        this.showConfirm = false;
        deleteItems({ id }).then(() => {
          this.$message.success({ message: "删除服务项目成功!" });
          this.$refs.list.listItems(this.form);
          this.$msgbox.close();
        });
      }
    };
  },
  mounted() {
    if (this.repairProjectCategoryList) {
      const arr = [];
      this.repairProjectCategoryList.forEach(item => {
        arr.push(item.id);
      });
      this.form.categories = arr;
    }
    this.search();
  },
  methods: {
    search() {
      this.$refs.list.listItems(this.form);
    },
    exportTable() {
      this.$refs.list.showExport();
    },
    reset() {
      this.form = { ...defaultForm };
    },
    select(e) {
      this.currentItem = { ...e };
    },
    newService() {
      this.defaultInfo = {};
      this.showServiceNew = true;
    },
    edit(e) {
      this.currentItem = { ...e };
      this.showServiceEditor = true;
    },
    deleteItem(e) {
      this.currentItem = { ...e };
      this.deleteService();
    },
    deleteService() {
      this.showConfirm = true;
      const { id, name, hasStore } = this.currentItem;
      if (hasStore) {
        this.$confirm(
          `删除该项目后，会导致店铺中该项目无法正常使用，请谨慎操作！`,
          "提示",
          {
            confirmButtonText: "确认删除（Enter）",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          this.showConfirm = false;
          deleteItems({ id }).then(() => {
            this.$message.success({ message: "删除服务项目成功!" });
            this.$refs.list.listItems(this.form);
          });
        });
      } else {
        this.$confirm(`确定要删除: ${name}吗？`, "提示", {
          confirmButtonText: "确定（Enter）",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.showConfirm = false;
          deleteItems({ id }).then(() => {
            this.$message.success({ message: "删除服务项目成功!" });
            this.$refs.list.listItems(this.form);
          });
        });
      }
    },
    update(name) {
      this.showServiceEditor = false;
      this.showServiceNew = false;
      this.$refs.list.listItems(this.form, name);
    },
    close() {
      this.showServiceNew = false;
      this.showServiceEditor = false;
      this.$refs.list.selecteFirstRow("");
    }
  }
};
</script>

<style lang="scss" scoped>
.header-btns {
  display: flex;
  justify-content: flex-start;
  padding: 5px 10px;
  background: #fff;
  margin-top: 5px;
}
.form-wrap {
  ::v-deep {
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
  }
}
.content-wrap {
  height: 78vh;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  .item-list {
    width: 51%;
    margin-right: 8px;
  }
  .item-price {
    width: 49%;
  }
}
</style>
