<template>
  <section class="container-box">
    <ht-card no-padding style="margin: 5px 5px 0">
      <el-form
        :model="searchForm"
        class="form-item-small-margin-bottom search-part-box"
        label-width="80px"
        size="mini"
      >
        <el-row>
          <el-col :span="20">
            <el-row>
              <el-col :span="8">
                <el-form-item label="配件编码" prop="code">
                  <ht-input v-model="searchForm.code" placeholder="配件编码">
                    <template slot="append">
                      <ht-select
                        v-model="searchForm.codePattern"
                        :options="selectOptions.codePatterns"
                      />
                    </template>
                  </ht-input>
                </el-form-item>
                <el-form-item prop="name" label="配件名称">
                  <ht-autocomplete
                    v-model="searchForm.name"
                    :fetch-suggestions="autocompleteSearchPartName"
                    :trigger-on-focus="false"
                    placeholder="配件名称"
                    highlight-first-item
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="vehModel" label="适用车型">
                  <ht-autocomplete
                    v-model="searchForm.vehModel"
                    :fetch-suggestions="autocompleteSearchVehModel"
                    :trigger-on-focus="false"
                    placeholder="适用车型"
                  />
                </el-form-item>
                <el-form-item prop="brand" label="配件品牌">
                  <ht-autocomplete
                    v-model="searchForm.brand"
                    :fetch-suggestions="autocompleteSearchPartBrand"
                    :trigger-on-focus="false"
                    placeholder="配件品牌"
                    highlight-first-item
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="productionPlace" label="产地">
                  <ht-autocomplete
                    v-model="searchForm.productionPlace"
                    :fetch-suggestions="autocompleteSearchProductionPlace"
                    :trigger-on-focus="false"
                    placeholder="产地"
                    highlight-first-item
                  />
                </el-form-item>
                <el-form-item prop="categoryName" label="配件分类">
                  <ht-autoselect
                    v-model="searchForm.categoryName"
                    :fetch-suggestions="searchLoadCategory"
                    remote
                    filter-zero
                    clearable
                    :trigger-on-focus="false"
                    highlight-first-item
                    placeholder="配件分类"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <div style="padding-top: 34px;" class="ml-1">
              <el-button type="primary" size="mini" @click="goFirstPage">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click="clearSearchFrom">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </ht-card>

    <el-row class="merge-cards-box">
      <el-col :span="12" style="height: 100%;">
        <ht-card no-padding title="配件资料查询结果">
          <ht-table
            v-loading="loading"
            :data="tableData"
            :columns="defaultColumns"
            style="height: calc(100% - 32px)"
            pagination
            :total="totalSize"
            :current-page="page"
            :pager-count="5"
            @row-dblclick="handleMergeAdd"
            @pageChange="loadList"
          >
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-tooltip placement="top" content="添加">
                  <span
                    v-show="!isInMergeList(scope.row)"
                    class="icon operation-icon icon-add-info"
                    @click.stop="handleMergeAdd(scope.row)"
                  />
                </el-tooltip>
              </template>
            </el-table-column>
          </ht-table>
        </ht-card>
      </el-col>
      <el-col :span="12" style="height: 100%;">
        <ht-card no-padding title="待合并配件资料" style="margin-left: 5px;">
          <template v-slot:after-title>
            <el-popover
              placement="top"
              width="500"
              style="float:right;color:#FF5454"
              trigger="click"
            >
              <p>
                为何需要配件合并：当发现配件资料重复时，可将两个配件资料进行合并
                <br />
                操作步骤：<br />
                第一步：查询需要合并的配件资料，在左侧配件资料查询结果中点击“加号”加入右侧待合并配件资料中
                （如果错误添加配件资料进入待合并列表中，可在右侧待合并目录中选择移除待合并项）<br />
                第二步：在右侧待合并配件资料中，选择其中一条作为目标配件（即保留的配件资料）点击合并后，被合并配件将被删除（若有订单已使用此配件资料，将替换成目标配件）
              </p>
              <span slot="reference" class="text-danger" style="cursor:pointer;"
                ><i class="el-icon-question"></i>如何合并配件资料</span
              >
            </el-popover>
          </template>
          <ht-table
            :data="stayTableData"
            :columns="defaultColumns"
            @row-dblclick="handleDelete"
          >
            <el-table-column label="操作" width="80">
              <template slot-scope="scope">
                <el-tooltip :enterable="false" placement="top" content="删除">
                  <span
                    class="icon operation-icon icon-delete-info"
                    @click="handleDelete(scope.row)"
                  />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="目标配件" width="100">
              <template slot-scope="scope">
                <el-radio v-model="mergedTargetId" :label="scope.row.id" />
              </template>
            </el-table-column>
          </ht-table>
        </ht-card>
      </el-col>
    </el-row>
    <div class="footer">
      <el-button
        v-loading="submitLoading"
        :disabled="!isCanSubmit"
        size="mini"
        type="primary"
        @click="handleMergeSubmit"
      >
        合并
      </el-button>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import { CELL_WIDTH, DEFAULT_CURRENT_PAGE } from "@/constants";
import { loadCanMergeParts, mergeParts } from "@/api/parts";
import { searchMixin } from "@/mixins";
import * as store from "@/utils/store";

const defaultSearch = {
  codePattern: 0
};
const codePatterns = ["模糊匹配", "左匹配", "右匹配", "全匹配"];

export default {
  name: "MergePart",
  mixins: [searchMixin],
  props: {
    mergePartDialog: Boolean
  },
  data() {
    return {
      page: DEFAULT_CURRENT_PAGE,
      selectOptions: {
        codePatterns
      },
      searchForm: {
        ...defaultSearch
      },
      defaultColumns: [
        { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
        { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
        { prop: "vehModel", label: "车型", width: CELL_WIDTH.vehModel },
        { prop: "avaVehModel", label: "适用车型", width: CELL_WIDTH.vehModel },
        {
          prop: "brand",
          label: "配件品牌",
          width: CELL_WIDTH.brand
        },
        {
          prop: "productionPlace",
          label: "产地",
          width: CELL_WIDTH.productionPlace
        },
        {
          prop: "categoryName",
          label: "配件分类",
          width: CELL_WIDTH.categoryName
        },
        { prop: "model", label: "规格", width: CELL_WIDTH.model },
        { prop: "productionCode", label: "生产码", width: CELL_WIDTH.code },
        { prop: "posCode", label: "部位码", width: CELL_WIDTH.code },
        { prop: "unit", label: "计量单位", width: CELL_WIDTH.unit }
      ],
      tableData: [],
      stayTableData: [],
      loading: false,
      totalSize: null,
      mergedTargetId: null,
      submitLoading: false
    };
  },
  computed: {
    isCanSubmit() {
      return this.stayTableData.length >= 2 && this.mergedTargetId;
    },
    ...mapState("admin/table", ["pageSize"])
  },
  watch: {
    mergePartDialog: {
      handler(val) {
        if (val) {
          this.stayTableData = [];
          this.clearSearchFrom();
        }
      },
      immediate: true
    }
  },
  methods: {
    store() {
      return store;
    },
    //
    isInMergeList(row) {
      return !!this.stayTableData.find(item => item.id === row.id);
    },
    loadList(page) {
      // 加载数据列表
      this.page = page;
      this.loading = true;
      loadCanMergeParts({
        ...this.searchForm,
        page: this.page,
        pageSize: this.pageSize
      })
        .then(data => {
          this.tableData = data.rows || [];
          this.totalSize = data.totalSize;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goFirstPage() {
      this.page = DEFAULT_CURRENT_PAGE;
      this.loadList(this.page);
    },
    clearSearchFrom() {
      this.searchForm = {
        ...defaultSearch
      };
    },
    handleMergeAdd(row) {
      const hasItem = this.stayTableData.find(item => item.id === row.id);
      if (!hasItem) {
        if (row.canMerge) {
          this.stayTableData.push(row);
        } else {
          this.$message.warning({
            message: "该配件不能合并！",
            showClose: true
          });
        }
      }
    },
    handleDelete(row) {
      this.stayTableData = this.stayTableData.filter(it => it.id !== row.id);
      if (this.mergedTargetId === row.id) {
        this.mergedTargetId = null;
      }
    },
    handleMergeSubmit() {
      const mergedTarget = this.stayTableData.find(
        item => item.id === this.mergedTargetId
      );
      this.$confirm(
        `<div style="color: #333333;">
                    <p style=" text-align: center;">您确定要把待合并配件资料都合并到以下目标配件？</p>
                    <div style="
                        width: 320px;
                        margin: auto;
                        border: 1px solid #e6e6e6;
                        padding: 10px;
                    ">
                        <div>配件名称：${mergedTarget.name}</div>
                        <div>配件编码：${mergedTarget.code}</div>
                        <div>配件品牌：${mergedTarget.brand}</div>
                        <div>产地：${mergedTarget.productionPlace}</div>
                    </div>
                </div>`,
        "配件资料合并确认",
        {
          dangerouslyUseHTMLString: true
        }
      ).then(() => {
        const srcIds = this.stayTableData
          .map(item => {
            return item.id;
          })
          .filter(item => item !== this.mergedTargetId);
        this.submitLoading = true;
        mergeParts({ id: this.mergedTargetId, srcIds })
          .then(() => {
            this.$message.success({ message: "合并成功" });
            this.stayTableData = [mergedTarget];
            this.goFirstPage();
            this.submitLoading = false;
          })
          .catch(() => {
            this.submitLoading = false;
          });
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.merge-cards-box
    height 100%
    margin 5px 5px 0 5px
    /deep/.box-card
            height 100%
            .el-card__body
                height 480px

    /deep/.el-radio
                .el-radio__label
                    display none
.footer
    line-height 36px

.search-part-box {
    /deep/ .el-input-group__append {
        width: 80px;
        padding-left: 0px;
        padding-right: 0;

        .el-select {
            margin: -10px 0;

            .el-input__inner {
                padding: 0 5px;
            }
        }
    }
}
</style>
