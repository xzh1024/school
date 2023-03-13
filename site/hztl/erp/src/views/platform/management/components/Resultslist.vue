<template>
  <ht-card v-show="isShow" v-loading="tableLoading" style="margin: 0;">
    <ht-tabs
      ref="refHtTabs"
      v-model="activeName"
      :tabs="tabs"
      class="tabs-regular"
      style="margin: 0"
    />
    <ht-table
      v-if="activeName == 0"
      :set-height="false"
      :data="matchPartData"
      :total="matchTotalSize"
      :current-page="currentPage"
      :key-scope="keyScope"
      height="460px"
      selection-type="multiple"
      pagination
      @hotkeysUp="handleHotkeysUp"
      @pageChange="matchPageChange"
      @selectChange="selectionHandle"
      @row-click="rowHandle"
    >
      <el-table-column type="expand" label="明细" width="80">
        <template slot-scope="dataScope">
          <ht-table
            :data="dataScope.row.matches"
            @expand-change="selectChildTable"
          >
            <el-table-column
              v-for="(column, index) in childColumns"
              :key="index"
              :width="column.width"
              :prop="column.prop"
              :label="column.label"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <template v-if="column.prop === 'control'">
                  <el-link
                    :underline="false"
                    type="primary"
                    @click="handleThisOn"
                  >
                    按此上架
                  </el-link>
                </template>
                <template v-else-if="column.prop === 'vehSeries'">
                  <div class="text-glass">
                    <div class="text-ellipsis" style="width: 150px">
                      {{ scope.row[column.prop] }}
                    </div>
                    <el-tooltip
                      v-show="scope.row[column.prop]"
                      :enterable="false"
                      placement="bottom"
                    >
                      <div slot="content" style="width: 200px">
                        {{ scope.row[column.prop] }}
                      </div>
                      <span class="icon operation-icon icon-enlarge-info" />
                    </el-tooltip>
                  </div>
                </template>
                <template v-else>
                  {{ scope.row[column.prop] }}
                </template>
              </template>
            </el-table-column>
          </ht-table>
        </template>
      </el-table-column>
      <template>
        <el-table-column
          v-for="(column, index) in matchPartColumns"
          :key="index"
          :width="column.width"
          :prop="column.prop"
          :label="column.label"
          :label-class-name="column.prop === 'qty' ? 'text-right' : ''"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <template v-if="column.prop === 'control'">
              <el-link
                :underline="false"
                type="primary"
                @click="handleOn(scope.row)"
              >
                未认证上架
              </el-link>
            </template>
            <template v-else-if="column.prop === 'qty'">
              <span class="number-font">{{ scope.row[column.prop] }}</span>
            </template>
            <template v-else>
              {{ scope.row[column.prop] }}
            </template>
          </template>
        </el-table-column>
      </template>
    </ht-table>
    <ht-table
      v-if="activeName == 1"
      :set-height="false"
      :data="unverifiedPartData"
      :total="unverifiedTotalSize"
      :current-page="currentPage"
      :key-scope="keyScope"
      height="460px"
      selection-type="multiple"
      pagination
      @pageChange="unverifiedPageChange"
      @selectChange="selectionHandle"
      @hotkeysUp="handleHotkeysUp"
    >
      <el-table-column
        v-for="(column, index) in unverifiedTypeColumns"
        :key="index"
        :width="column.width"
        :prop="column.prop"
        :label="column.label"
        :label-class-name="column.prop === 'qty' ? 'text-right' : ''"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <template v-if="column.prop === 'control'">
            <el-link
              :underline="false"
              type="primary"
              @click="handleOn(scope.row)"
            >
              未认证上架
            </el-link>
          </template>
          <template v-else-if="column.prop === 'qty'">
            <span class="number-font">{{ scope.row[column.prop] }}</span>
          </template>
          <template v-else>
            {{ scope.row[column.prop] }}
          </template>
        </template>
      </el-table-column>
    </ht-table>
    <div class="result-wrapper">
      <div class="result-text">
        清洗结果：共清洗 {{ displayNmus.totalNum }} 条，成功
        {{ displayNmus.doneNum }} 条，冲突
        {{ displayNmus.conflictsNum }} 条，模糊匹配
        {{ displayNmus.candidatesNum }} 条，未匹配
        {{ displayNmus.unverifiedNum }} 条。
      </div>
      <div>
        <el-button
          :disabled="!canBatchOn"
          type="primary"
          size="mini"
          @click="handleBatchOn"
        >
          选中配件未认证上架
        </el-button>
        <el-button
          :disabled="!canAllOn"
          type="primary"
          size="mini"
          @click="handleUnverifiedAllOn"
        >
          全部配件未认证上架
        </el-button>
      </div>
    </div>
  </ht-card>
</template>

<script>
import { handlePartsOnShelves } from "@/api/bussiness/partsOnShelves";
import { mapState } from "vuex";
import { CELL_WIDTH, UNVERIFIED_ON_COUNT } from "@/constants";
import hotkeys from "hotkeys-js";

let oldKeyScope;

export default {
  name: "Resultslist",
  props: {
    platformKey: String,
    isShow: {
      type: Boolean,
      default: false
    },
    matchPartTotalData: {
      type: Array,
      default() {
        return [];
      }
    },
    unverifiedPartTotalData: {
      type: Array,
      default() {
        return [];
      }
    },
    displayNmus: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      keyScope: "Resultslist",
      tabs: [
        { id: 0, name: "模糊匹配" },
        { id: 1, name: "未认证" }
      ],
      activeName: 0,
      currentPage: 1,
      matchPage: 1,
      matchPageSize: 0,
      matchTotalSize: 0,
      unverifiePage: 1,
      unverifiedPageSize: 0,
      unverifiedTotalSize: 0,

      tableLoading: false,
      relMatchPartTotalData: [],
      matchPartData: [],
      relUnverifiedPartTotalData: [],
      unverifiedPartData: [],
      selection: [],
      selectRow: {},
      matchPartColumns: [
        { prop: "control", label: "操作", width: "100", cantExport: true },
        { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
        { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
        { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
        { prop: "cleantBrand", label: "清洗品牌", width: CELL_WIDTH.brand },
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
        { prop: "productionCode", label: "生产码", width: CELL_WIDTH.code },
        { prop: "posCode", label: "部位码", width: CELL_WIDTH.code },
        { prop: "unit", label: "计量单位", width: CELL_WIDTH.unit },
        { prop: "qty", label: "库存数量", width: CELL_WIDTH.qty }
      ],
      unverifiedTypeColumns: [
        { prop: "control", label: "操作", width: "100", cantExport: true },
        { prop: "code", label: "配件编码", width: CELL_WIDTH.code },
        { prop: "name", label: "配件名称", width: CELL_WIDTH.name },
        { prop: "brand", label: "配件品牌", width: CELL_WIDTH.brand },
        { prop: "cleantBrand", label: "清洗品牌", width: CELL_WIDTH.brand },
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
        { prop: "productionCode", label: "生产码", width: CELL_WIDTH.code },
        { prop: "posCode", label: "部位码", width: CELL_WIDTH.code },
        { prop: "qty", label: "库存数量", width: CELL_WIDTH.qty }
      ],
      childColumns: [
        { prop: "control", label: "操作", width: "100", cantExport: true },
        { prop: "oeCode", label: "原厂/品牌件号", width: CELL_WIDTH.code },
        { prop: "oeName", label: "原厂名称", width: CELL_WIDTH.name },
        { prop: "stdName", label: "标准名称", width: CELL_WIDTH.name },
        // { prop: "productionPlace", label: "相似度", width: "120" },
        { prop: "vehSeries", label: "适用车型", width: CELL_WIDTH.vehSeries }
      ],
      activeChaildTable: false,
      offset: UNVERIFIED_ON_COUNT
    };
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    canBatchOn() {
      return !!this.selection.length;
    },
    canAllOn() {
      if (this.activeName === 0) {
        return !!this.relMatchPartTotalData.length;
      } else if (this.activeName === 1) {
        return !!this.unverifiedPartData.length;
      } else {
        return false;
      }
    }
  },
  watch: {
    isShow: {
      handler(value, oldVale) {
        if (value) {
          setTimeout(() => {
            oldKeyScope = hotkeys.getScope();
            hotkeys.setScope(this.keyScope);
          }, 100);
        } else if (oldVale) {
          hotkeys.setScope(oldKeyScope);
          this.matchPartData = [];
          this.unverifiedPartData = [];
          this.selection = [];
          this.selectRow = {};
          this.activeName = 0;
        }
      },
      immediate: true
    },
    matchPartTotalData(value) {
      this.relMatchPartTotalData = [...value];
      this.matchTotalSize = 0;
      if (!value.length) return;
      this.matchPageChange(1);
      this.activeName = 0;
    },
    unverifiedPartTotalData(value) {
      this.relUnverifiedPartTotalData = [...value];
      this.unverifiedTotalSize = 0;
      if (!value.length) return;
      this.unverifiedPageChange(1);
      if (!this.matchPartTotalData.length) {
        this.activeName = 1;
      }
    }
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    handleHotkeysUp(e) {
      switch (e.code) {
        case "ArrowRight":
        case "ArrowLeft":
          e.preventDefault();
          this.$refs.refHtTabs.listenKeyboard(e);
          break;
        default:
          return;
      }
    },
    selectChildTable() {
      this.activeChaildTable = !this.activeChaildTable;
    },
    _msgbox(mes) {
      this.$message.warning({
        message: mes,
        showClose: true
      });
      this.matchPage = 1;
      this.unverifiePage = 1;
      this.matchPageChange(this.matchPage);
      this.unverifiedPageChange(this.unverifiePage);
    },
    matchPageChange(page) {
      this.tableLoading = true;
      this.currentPage = page;
      this.matchPage = this.currentPage;
      this.matchPageSize = this.pageSize;
      this.matchTotalSize = 0;
      const list = [];
      if (this.relMatchPartTotalData.length) {
        this.matchTotalSize = this.relMatchPartTotalData.length;
        for (let i = 0; i < this.relMatchPartTotalData.length; i++) {
          if (
            (this.matchPage - 1) * this.matchPageSize <= i &&
            i < this.matchPage * this.matchPageSize
          ) {
            list.push(this.relMatchPartTotalData[i]);
          }
        }
      }
      this.matchPartData = list;
      this.tableLoading = false;
    },
    unverifiedPageChange(page) {
      this.tableLoading = true;
      this.currentPage = page;
      this.unverifiePage = this.currentPage;
      this.unverifiedPageSize = this.pageSize;
      this.unverifiedTotalSize = 0;
      const list = [];
      if (this.relUnverifiedPartTotalData.length) {
        this.unverifiedTotalSize = this.relUnverifiedPartTotalData.length;
        for (let i = 0; i < this.relUnverifiedPartTotalData.length; i++) {
          if (
            (this.unverifiePage - 1) * this.unverifiedPageSize <= i &&
            i < this.unverifiePage * this.unverifiedPageSize
          ) {
            list.push(this.relUnverifiedPartTotalData[i]);
          }
        }
      }
      this.unverifiedPartData = list;
      this.tableLoading = false;
    },
    selectionHandle(selection) {
      this.selection = selection || [];
    },
    rowHandle(row) {
      this.selectRow = row;
    },
    handleUnverifiedAllOn() {
      this.$confirm("确认上架配件？", "上架配件", { type: "warning" })
        .then(() => {
          this.tableLoading = true;
          if (this.activeName === 0) {
            this.handleaAllOnShelves(true, this.relMatchPartTotalData)
              .then(data => {
                const failedIds = data.failedIds || [];
                const successIds = data.successIds || [];
                this.handleResData(failedIds, successIds);
              })
              .catch(() => {
                this.matchPageChange(this.matchPage);
                this.unverifiedPageChange(this.unverifiePage);
              });
          } else if (this.activeName === 1) {
            this.handleaAllOnShelves(true, this.relUnverifiedPartTotalData)
              .then(data => {
                const failedIds = data.failedIds || [];
                const successIds = data.successIds || [];
                this.handleResData(failedIds, successIds);
              })
              .catch(() => {
                this.matchPageChange(this.matchPage);
                this.unverifiedPageChange(this.unverifiePage);
              });
          }
        })
        .catch(() => {});
    },
    async handleaAllOnShelves(isUnverified, unverifiedOnData) {
      unverifiedOnData =
        unverifiedOnData.map(item => {
          return { id: item.swPartId, brand: item.cleantBrand };
        }) || [];
      const count = Math.ceil(unverifiedOnData.length / this.offset);
      const failedIds = [];
      const successIds = [];
      for (let i = 0; i < count; i++) {
        const unverifiedParts = unverifiedOnData.slice(
          i * this.offset,
          (i + 1) * this.offset
        );
        const res = await handlePartsOnShelves({
          isUnverified,
          unverifiedParts,
          key: this.platformKey
        });
        if (res.failedIds && res.failedIds.length) {
          failedIds.push(...res.failedIds);
        }
        if (res.successIds && res.successIds.length) {
          successIds.push(...res.successIds);
        }
      }
      return { failedIds, successIds };
    },
    handleBatchOn() {
      this.$confirm("确认上架配件？", "上架配件", { type: "warning" })
        .then(() => {
          this.handleSelectionsOnShelves(true, this.selection);
        })
        .catch(() => {});
    },
    handleOn(row) {
      this.$confirm("确认上架配件？", "上架配件", { type: "warning" })
        .then(() => {
          this.handleSelectionsOnShelves(true, [row]);
        })
        .catch(() => {});
    },
    handleThisOn() {
      this.$confirm("确认上架配件？", "上架配件", { type: "warning" })
        .then(() => {
          this.handleSelectionsOnShelves(false, [this.selectRow]);
        })
        .catch(() => {});
    },
    handleSelectionsOnShelves(isUnverified, unverifiedOnData) {
      this.tableLoading = true;
      const unverifiedParts =
        unverifiedOnData.map(item => {
          return { id: item.swPartId, brand: item.cleantBrand };
        }) || [];
      handlePartsOnShelves({
        isUnverified,
        unverifiedParts,
        key: this.platformKey
      })
        .then(data => {
          const failedIds = data.failedIds || [];
          const successIds = data.successIds || [];
          this.handleResData(failedIds, successIds);
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    handleResData(failedIds, successIds) {
      if (this.relMatchPartTotalData.length) {
        this.relMatchPartTotalData = this.relMatchPartTotalData.filter(item => {
          return !successIds.includes(item.swPartId);
        });
      }
      if (this.relUnverifiedPartTotalData.length) {
        this.relUnverifiedPartTotalData = this.relUnverifiedPartTotalData.filter(
          item => {
            return !successIds.includes(item.swPartId);
          }
        );
      }
      if (failedIds.length) {
        this.$msgbox({
          message: `${successIds.length}条配件上架成功，${failedIds.length}条配件上架失败！`,
          showClose: true
        });
        this.matchPage = 1;
        this.unverifiePage = 1;
        this.matchPageChange(this.matchPage);
        this.unverifiedPageChange(this.unverifiePage);
      } else {
        this._msgbox("配件上架成功！");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.text-glass
    display: flex
.result-wrapper
    display: flex
    justify-content: space-between
    margin-top: 10px
    .result-text
        height: 28px
        line-height: 28px
</style>
