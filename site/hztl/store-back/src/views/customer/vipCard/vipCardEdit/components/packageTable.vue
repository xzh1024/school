<template>
  <el-table
    class="table-base"
    size="small"
    :data="packages"
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
          :remote-method="queryExcludePackageGoods"
          :loading="selectLoading"
          @change="
            id => {
              selectChange(id, scope.row);
            }
          "
        >
          <el-option
            v-for="item in packageOptions"
            :key="item.goodsId"
            :label="item.goodsName"
            :value="item.goodsId"
          >
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="套餐类型" show-overflow-tooltip min-width="100">
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
import { integerValidate } from "@/utils/validate";

export default {
  name: "PackageTable",
  props: {
    packages: {
      type: Array,
      require: true
    }
  },
  computed: {
    selectedIds() {
      return this.packages
        .filter(item => item.goodsId)
        .map(item => item.goodsId);
    }
  },
  watch: {
    packages: {
      handler: function(newValue) {
        const data = newValue.find(item => item.goodsId === "");
        if (!data) {
          newValue.push({
            goodsId: "", // 商品ID
            goodsName: "", // 商品名称
            goodsType: 2, // 商品类型,1:服务项目;2:项目套餐
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
      selectedDatas: [],
      packageOptions: []
    };
  },
  methods: {
    integerValidate: integerValidate,
    queryIncludePackageGoods(includeIds) {
      if (!(includeIds && includeIds.length)) {
        this.selectedDatas = [];
        this.queryExcludePackageGoods("");
        return;
      }
      const params = {
        type: 2, // 0:零配件;1:服务项目;2:项目套餐
        includeIds
      };
      return getProjectGoods(params);
    },
    queryExcludePackageGoods(query = "") {
      const params = {
        type: 2, // 0:零配件;1:服务项目;2:项目套餐
        keyword: query,
        excludeIds: this.selectedIds
      };
      getProjectGoods(params)
        .then(res => {
          this.packageOptions = res || [];
        })
        .catch(() => {
          this.packageOptions = [];
        });
    },
    async selectChange(id, row) {
      if (!id) return;
      const selectedDatas = await this.queryIncludePackageGoods([id]);
      if (selectedDatas && selectedDatas.length) {
        const findData = selectedDatas[0];
        row.goodsName = findData.goodsName;
        row.goodsType = findData.goodsType;
        row.goodsCategory = findData.goodsCategory;
      }
      this.queryExcludePackageGoods();
    },
    handleDelete(row) {
      const index = this.packages.findIndex(
        item => item.goodsId === row.goodsId
      );
      this.packages.splice(index, 1);
      this.queryExcludePackageGoods();
    }
  },
  created() {
    this.queryExcludePackageGoods();
  }
};
</script>

