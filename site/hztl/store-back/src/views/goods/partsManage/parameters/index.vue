<template>
  <div class="layout-container bg-color-white">
    <el-table
      class="table-base"
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      size="mini"
    >
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column
        label="授权价格类型"
        min-width="180"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ findPriceTypeName(scope.row.priceTypes) }}
        </template>
      </el-table-column>
      <el-table-column
        label="授权配件性质"
        min-width="180"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.properties ? scope.row.properties.join("、") : "" }}
        </template>
      </el-table-column>
      <el-table-column
        label="授权配件仓库"
        min-width="180"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.storeNames ? scope.row.storeNames.join("、") : "" }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <EditDialog ref="editDialog" @update="getAuthSetting"></EditDialog>
  </div>
</template>

<script>
import { AUTH_PRICE_TYPES } from "@/constants/goods.js";
import { getAuthSetting } from "../services/index.js";
import EditDialog from "./components/editDialog.vue";

export default {
  components: { EditDialog },
  data() {
    return {
      authPriceTypes: AUTH_PRICE_TYPES,
      tableData: [],
      loading: false
    };
  },
  methods: {
    getAuthSetting() {
      this.loading = true;
      getAuthSetting()
        .then(res => {
          const list = [];
          if (res) {
            res.name = "配修社区";
            list.push(res);
          }
          this.tableData = list;
          this.loading = false;
        })
        .catch(() => {
          this.tableData = [];
          this.loading = false;
        });
    },
    findPriceTypeName(typeIds) {
      typeIds = typeIds || [];
      return typeIds
        .map(id => {
          return this.authPriceTypes.find(type => type.id === id)?.name;
        })
        .join("、");
    },
    handleEdit(row) {
      this.$refs.editDialog.show(row);
    }
  },
  created() {
    this.getAuthSetting();
  }
};
</script>

<style lang="less" scoped></style>
