<template>
  <div style="height: 100%">
    <ht-setting-table
      v-bind="$attrs"
      v-on="$listeners"
      :table-name="table.name"
      :columns="tableColumns"
      :data="partsList"
      :total="totalSize"
      :current-page.sync="currentPage"
      :loading="loading"
      :selected-rows.sync="selectedRows"
      pagination
      enable-table-setting
      setting-all-column
      height="calc(100% - 33px)"
      @pageChange="handlePaginationChange"
      @rowOperation="handlePartClick"
      @sort-change="handleSortChange"
    />
    <parts-search-dialog
      :visible.sync="dialogVisible"
      @searchParamsChange="searchDialogHandle"
    />
    <AvaVehModels
      :visible.sync="avaVehModelsVisible"
      :part="avaVehModelsPart"
      disInternalHotKeys
    />
  </div>
</template>

<script>
import AvaVehModels from "@/components/AvaVehModels/index.vue";
import PartsSearchDialog from "./PartsSearchDialog";
import { TABLE_STOCKTAKING_PARTS } from "@/constants/table-columns/store/stocktaking-bill";
import { stocktakingStockGroupsQuery } from "@/api/store/stocktaking";
import { mapState } from "vuex";
import { TAG_TOOLTIP } from "@/constants";
import {
  setTableSort,
  setLocalTableSort,
  getLocalTableSort
} from "@/utils/tool";

const PART = "part";

export default {
  name: "PartsSearch",
  components: {
    PartsSearchDialog,
    AvaVehModels
  },
  props: {
    canEdit: Boolean,
    filterNoStock: Boolean,
    type: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      table: TABLE_STOCKTAKING_PARTS,
      partsList: [],
      selectedRows: [],
      totalSize: 0,
      currentPage: 1,
      dialogVisible: false,
      loading: false,
      searchData: null,
      avaVehModelsVisible: false,
      avaVehModelsPart: null,
      sort: ""
    };
  },
  computed: {
    tableColumns() {
      const handlePartDetailChange = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
      };
      const viewAvaVehModels = (row, e) => {
        e.stopPropagation();
        this.selectedRows = [row];
        this.avaVehModelsVisible = true;
        this.avaVehModelsPart = {
          id: row.partId,
          code: row.code
        };
      };
      return this.table.columns.map(item => {
        if (item.type === "controls") {
          return {
            ...item,
            render: (value, row) =>
              this.canEdit && row.status === 3 ? (
                <el-tooltip placement="top" content="添加" enterable={false}>
                  <i
                    class="icon operation-icon icon-add-info"
                    on-click={() => this.handlePartClick(row)}
                  ></i>
                </el-tooltip>
              ) : null
          };
        }
        if (item.type === "avaVehModels") {
          return {
            ...item,
            render: (value, row) => (
              <a onClick={e => viewAvaVehModels(row, e)} class="ht-link">
                查看
              </a>
            )
          };
        }
        if (item.prop === "labels") {
          return {
            ...item,
            render: (value, row) => (
              <div>
                {value && value.length
                  ? value.map(label => (
                      <span style="margin-right: 10px">
                        <el-tooltip placement="top" enterable={false}>
                          <span slot="content">{TAG_TOOLTIP[label]}</span>
                          {label === "图" ? (
                            <el-button
                              type="primary"
                              circle
                              size="mini"
                              on-click={e => handlePartDetailChange(row, e)}
                            >
                              {label}
                            </el-button>
                          ) : (
                            <span class="label-style">{label}</span>
                          )}
                        </el-tooltip>
                      </span>
                    ))
                  : null}
              </div>
            )
          };
        }
        return item;
      });
    },
    ...mapState("admin/table", ["pageSize"])
  },
  watch: {
    selectedRows(val) {
      this.$emit("rows-change", val);
    },
    filterNoStock() {
      this.searchDialogHandle();
    }
  },
  mounted() {
    this.sort = getLocalTableSort(`${this.type}${PART}`);
  },
  methods: {
    showSearchBox() {
      this.dialogVisible = true;
    },
    // 搜索弹窗处理
    searchDialogHandle(searchData = this.searchData) {
      if (!searchData) {
        return;
      }
      this.searchData = searchData;
      this.currentPage = 1;
      this.loadPartsList({ page: this.currentPage });
    },
    // 查询配件列表
    loadPartsList(page) {
      this.loading = true;
      return stocktakingStockGroupsQuery({
        ...this.searchData,
        isNoStock: !this.filterNoStock,
        ...page,
        pageSize: this.pageSize,
        sort: this.sort
      })
        .then(data => {
          this.partsList = data.rows || [];
          this.selectedRows = this.partsList.length ? [this.partsList[0]] : [];
          this.totalSize = data.totalSize;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleSortChange(sort) {
      if (!this.partsList.length) {
        return;
      }
      this.currentPage = 1;
      this.sort = setTableSort(sort);
      setLocalTableSort(this.sort, `${this.type}${PART}`);
      this.loadPartsList({ page: this.currentPage });
    },
    // 配件列表分页
    handlePaginationChange(page) {
      this.currentPage = page;
      this.loadPartsList({ page: page });
    },
    handlePartClick(row) {
      this.selectedRows = [row];
      if (!this.canEdit || row.status !== 3) {
        return;
      }
      this.$emit("detailAdd", {
        ...row,
        lastOptDay:
          this.searchData && this.searchData.lastOptDay
            ? this.searchData.lastOptDay
            : undefined
      });
    }
  }
};
</script>
