<template>
  <el-table
    class="table-base"
    size="small"
    :data="projects"
    stripe
    border
    style="width: 1020px"
    max-height="482"
  >
    <el-table-column type="index" width="50"> </el-table-column>
    <el-table-column label="项目名称" show-overflow-tooltip min-width="180">
      <template slot-scope="scope">
        <div v-if="scope.row.goodsId">
          {{ scope.row.goodsName }}
        </div>
        <el-select
          v-else
          v-model="scope.row.goodsId"
          size="small"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="queryExcludeProjectGoods"
          :loading="selectLoading"
          @change="
            id => {
              selectChange(id, scope.row);
            }
          "
        >
          <el-option
            v-for="item in projectOptions"
            :key="item.goodsId"
            :label="item.goodsName"
            :value="item.goodsId"
          >
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="项目分类" show-overflow-tooltip min-width="100">
      <template slot-scope="scope">
        <span v-if="scope.row.goodsId">{{ scope.row.goodsCategory }}</span>
      </template>
    </el-table-column>
    <el-table-column label="数量" show-overflow-tooltip min-width="100">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.goodsId"
          v-model.trim="scope.row.qty"
          size="small"
          @input="scope.row.qty = integerValidate(scope.row.qty)"
        ></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="60">
      <template slot-scope="scope">
        <el-button
          type="text"
          size="mini"
          @click="handleDelete(scope.row)"
          v-if="scope.row.goodsId"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getProjectGoods } from "../../services";

export default {
  name: "ProjectTable",
  props: {
    projects: {
      type: Array,
      require: true
    }
  },
  computed: {
    selectedIds() {
      return this.projects
        .filter(item => item.goodsId)
        .map(item => item.goodsId);
    }
  },
  watch: {
    projects: {
      handler: function(newValue) {
        const data = newValue.find(item => item.goodsId === "");
        if (!data) {
          newValue.push({
            goodsId: "", // 商品ID
            goodsName: "", // 商品名称
            goodsType: 1, // 商品类型,1:服务项目;2:项目套餐
            goodsCategory: "", // 商品分类
            qty: "" // 商品数量
          });
        }
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      selectLoading: false,
      projectOptions: [],
      selectedDatas: []
    };
  },
  methods: {
    integerValidate(value) {
      value = value.replace(/[^\d]/g, "");
      value = value.replace(/^0/g, "");
      if (value.length > 10) {
        value = value.substring(0, 10);
      }
      return String(value);
    },
    queryIncludeProjectGoods(includeIds) {
      if (!(includeIds && includeIds.length)) {
        this.selectedDatas = [];
        this.queryExcludeProjectGoods("");
        return;
      }
      const params = {
        type: 1, // 0:零配件;1:服务项目;2:项目套餐
        includeIds
      };
      return getProjectGoods(params);
    },
    queryExcludeProjectGoods(query = "") {
      const params = {
        type: 1, // 0:零配件;1:服务项目;2:项目套餐
        keyword: query,
        excludeIds: this.selectedIds
      };
      getProjectGoods(params)
        .then(res => {
          this.projectOptions = res || [];
        })
        .catch(() => {
          this.projectOptions = [];
        });
    },
    async selectChange(id, row) {
      if (!id) return;
      const selectedDatas = await this.queryIncludeProjectGoods([id]);
      if (selectedDatas && selectedDatas.length) {
        const findData = selectedDatas[0];
        // row.goodsId = findData.goodsId;
        row.goodsName = findData.goodsName;
        row.goodsType = findData.goodsType;
        row.goodsCategory = findData.goodsCategory;
      }
      this.queryExcludeProjectGoods();
    },
    handleDelete(row) {
      const index = this.projects.findIndex(
        item => item.goodsId === row.goodsId
      );
      this.projects.splice(index, 1);
      this.queryExcludeProjectGoods();
    }
  },
  created() {
    this.queryExcludeProjectGoods();
  }
};
</script>
