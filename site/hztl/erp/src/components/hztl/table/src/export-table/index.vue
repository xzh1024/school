<template>
  <ht-dialog
    :visible.sync="passvisible"
    :close-on-click-modal="false"
    width="600px"
    append-to-body
    class="ignore-top-hotkeys"
  >
    <template v-slot:title>
      <div>
        导出设置
        <span style="font-size: 14px;"
          >(按住列标题左右拖动设置需要导出的列)</span
        >
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3>不需要导出的列</h3>
        <draggable
          :list="noExportList"
          class="list-group"
          group="people"
          animation="300"
        >
          <transition-group tag="div" class="height-full">
            <div
              v-for="item in noExportList"
              :key="item.key || item.prop"
              class="list-group-item"
            >
              {{ item.label }}
            </div>
          </transition-group>
        </draggable>
      </el-col>
      <el-col :span="12">
        <h3>需要导出的列</h3>
        <draggable
          :list="exportList"
          class="list-group"
          group="people"
          @change="setSampleColums"
          animation="300"
        >
          <transition-group tag="div" class="height-full">
            <div
              v-for="item in exportList"
              :key="item.key || getPropValue(item.prop)"
              class="list-group-item"
            >
              {{ item.label }}
            </div>
          </transition-group>
        </draggable>
      </el-col>
    </el-row>

    <h3>导出表格预览（{{ fileName }}）</h3>

    <ht-table
      :index-column="false"
      :set-height="false"
      :data="showData"
      :columns="sampleColums"
      class="mt-1"
      @sort-change="sortChange"
    />

    <div class="dialog-footer-align mt-1">
      <el-button
        type="primary"
        plain
        class="switch-focus focus-bottun"
        size="mini"
        :disabled="!exportList.length"
        @click="sureHandle"
      >
        确定（F3）
      </el-button>
      <el-button type="primary" plain size="mini" @click="close">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import draggable from "vuedraggable";
import { getSettingsExport, postSettingsExport } from "@/api/setting";
import hotkeys from "hotkeys-js";
import XLSX from "xlsx";
import { dateFormat } from "@/utils/date";

import { formatterColums, getRowValue, getPropValue } from "../until";

let lastKeyScope;
const RUN_OUT_EXTRA = 17;

/**
 *  依赖
 *      visible  控制弹框显示隐藏
 *      tableName 全局唯一名（根据路由和功能命名）
 *      baseColumns 默认表格数据
 *
 *  输出
 *      columns-change   页面渲染table使用数据
 *      show-pagination-change   显示分页切换
 *
 *
 */

export default {
  name: "TableExample",
  components: {
    draggable
  },
  props: {
    fileName: {
      type: String,
      default: "导出列表"
    },
    fileType: {
      type: String,
      default: "xlsx"
    },
    visible: {
      type: Boolean
    },
    defaultData: {
      type: Array
    },
    tableName: {
      type: String,
      required: true
    },
    baseColumns: {
      type: Array,
      required: true
    },
    isEndExport: {
      type: Boolean
    },
    isNoSaveExportColumns: Boolean,
    autoDownload: {
      type: Boolean,
      default: false
    },
    endExportFunc: {
      type: Function
    },
    defaultNoExportList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      noExportList: [],
      exportList: [],
      sampleColums: [],
      keyScope: Symbol("tableExample"),
      backEndColums: []
    };
  },
  computed: {
    useBaseColumns() {
      return this.baseColumns.filter(item => item && !item.cantExport);
    },
    showData() {
      return this.defaultData.slice(0, 1);
    },
    exportName() {
      return `export-${this.tableName}`;
    },
    passvisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    }
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val) {
          this.initExportList();
          lastKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope);
        } else if (oldVal) {
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.bindKeyboard();
    if (this.autoDownload) {
      this.sureHandle();
    } else {
      this.initData();
    }
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    getPropValue,
    sortChange(sort) {
      this.$emit("sortChange", sort);
    },
    close() {
      this.passvisible = false;
    },
    defaultDate() {
      return dateFormat(new Date(), "YYYYMMDDHHmmss");
    },
    sureHandle() {
      if (!this.exportList.length && !this.autoDownload) {
        return;
      }
      // TODO 外部传事件进来支持后端导出
      // 外部导出 sampleColums
      if (this.isEndExport) {
        const sampleColums = this.sampleColums.map(item => {
          return {
            label: item.label,
            prop: item.prop,
            type: item.type,
            width: Math.round(item.width / 8)
          };
        });
        this.endExportFunc(sampleColums).then(fileData => {
          const url = window.URL.createObjectURL(new Blob([fileData]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `${this.fileName}-${this.defaultDate()}.${this.fileType}`
          );
          link.click();
        });
      } else {
        this.erportExcle();
      }
      this.close();

      if (!this.isNoSaveExportColumns) {
        this.saveCurrentColums();
      }
    },
    async initData() {
      let backEndColums = [];
      const res = await getSettingsExport({
        name: this.exportName
      });
      //过滤掉没传入的列,防止服务器多出的列导致出错
      backEndColums = (res.columnsSettings || []).filter(item => {
        return this.useBaseColumns.some(
          useBaseItem => useBaseItem.prop === item.prop
        );
      });
      if (!backEndColums.length) {
        //未保存，使用默认
        backEndColums = [...this.useBaseColumns].filter(
          item => !this.defaultNoExportList.includes(item.prop)
        );
      }
      this.backEndColums = backEndColums;
      this.initExportList();
      this.setSampleColums();
    },
    initExportList() {
      const noExportList = [];
      const exportList = [];

      const useBaseColumnsObj = {};
      this.useBaseColumns.forEach(item => {
        useBaseColumnsObj[item.prop] = { ...item };
      });

      this.backEndColums.forEach(item => {
        exportList.push(useBaseColumnsObj[item.prop]);
      });
      const exportListProps = exportList.map(item => item.prop);
      this.useBaseColumns.forEach(item => {
        if (!exportListProps.includes(item.prop)) {
          noExportList.push(useBaseColumnsObj[item.prop]);
        }
      });

      this.exportList = exportList;
      this.noExportList = noExportList;
    },
    setSampleColums() {
      this.sampleColums = [];
      this.$nextTick(() => {
        this.sampleColums = formatterColums.bind(this)(this.exportList);
      });
    },
    saveCurrentColums() {
      this.backEndColums = this.sampleColums.map(item => ({ ...item }));
      return postSettingsExport({
        name: this.exportName,
        columnsSettings: this.backEndColums
      });
    },
    bindKeyboard() {
      hotkeys("f3", { scope: this.keyScope }, (e, handler) => {
        switch (handler.key) {
          case "f3":
            this.sureHandle();
            break;
          default:
            return;
        }
      });
    },
    erportExcle() {
      const json = [];
      const header = this.sampleColums.map(item => item.label);
      json.push(header);
      this.defaultData.forEach((item, index) => {
        const row = this.sampleColums.map(it => {
          const data = getRowValue(item, it.prop);
          let formattedData = it.formatter
            ? it.formatter(data, item, index)
            : data;
          if ([null, undefined].includes(formattedData)) {
            formattedData = "";
          }
          let relData = formattedData;
          // 如果是数字且未溢出，则转换为数字类型
          if (
            it.type === "number" &&
            (formattedData || formattedData === 0) &&
            !isNaN(Number(formattedData))
          ) {
            const length = formattedData.toString().replace(/\./g, "").length;
            if (length <= RUN_OUT_EXTRA) {
              relData = Number(formattedData);
            }
          }
          return relData;
        });
        json.push(row);
      });

      const ws = XLSX.utils.json_to_sheet(json, { skipHeader: true });
      ws["!cols"] = this.sampleColums.map(item => ({
        wch: item.width / 8
      }));
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "sheel");
      XLSX.writeFile(wb, `${this.fileName}.${this.fileType}`);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

h3 {
  margin: 10px 0;
  font-weight: normal;
}

.list-group {
  height: 300px;
  overflow: auto;
  border: 1px solid $border-color-table;
  @include border_color("border-color-table");
  background: $color-bg-grey;
  @include background_color("color-primary", 0.1);

  .list-group-item {
    cursor: move;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #fff;
    border-bottom: 1px solid $border-color-table;
    @include border_bottom_color("border-color-table");
  }
}
</style>
