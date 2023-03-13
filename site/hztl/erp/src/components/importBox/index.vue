<template>
  <ht-dialog
    :title="title"
    v-bind="$attrs"
    :close-on-press-escape="!importLoading"
    :show-close="!importLoading"
    width="1340px"
    top="7vh"
    v-on="$listeners"
  >
    <div v-loading="importLoading">
      <el-form size="mini" label-position="left">
        <el-row>
          <el-col :span="17">
            <el-form-item label-width="74px" label="数据文件：">
              <input
                ref="refExceptInput"
                type="file"
                accept=".xlsx, .xlc, .xlm, .xls, .xlt, .xlw, .csv"
                class="import-file"
                @change="importExcel($event.target.files)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label-width="89px" label="选择工作表：">
              <el-select v-model="curSheet" @change="selectSheet">
                <el-option
                  v-for="(item, index) in excelSheetsName"
                  :key="index"
                  :value="item"
                  :label="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="10" class="import-container">
        <el-col v-show="hasSetting" :span="8" class="import-setting-container">
          <div>
            <el-container>
              <el-header>导入设置</el-header>
              <el-main>
                <slot />
              </el-main>
            </el-container>
          </div>
          <ht-card
            v-show="remakTitle"
            :title="remakTitle"
            no-background
            no-padding
            class="import-remark-container"
          >
            <slot name="remark" />
          </ht-card>
        </el-col>
        <el-col :span="hasSetting ? 16 : 24" style="height: 100%">
          <el-container style="height: calc(100% - 10px)">
            <el-header>数据预览及字段对应</el-header>
            <el-main>
              <import-table
                ref="refImportTable"
                :data="tabJson"
                :selections="selections"
                :total-options="options"
                :keyScope="keyScope"
                v-bind="$attrs"
              />
            </el-main>
            <div class="text-font-danger" style="margin: 5px 10px;">
              *为系统性能考虑，最多显示导入文件信息前 10 条，还有
              {{ unshowCount }} 条未显示。
            </div>
          </el-container>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer-align">
        <el-button
          :disabled="!isCanClickImport"
          type="primary"
          size="mini"
          plain
          @click="importHandle"
        >
          确定（F3）
        </el-button>
        <el-button type="primary" size="mini" plain @click="cancelHandle">
          取消（Esc）
        </el-button>
      </div>
      <import-result
        :visible.sync="completeVisible"
        :title="title"
        :total-errs="errRows"
        :selections="selections"
        :total-count="totalCount"
        :is-all-file-import="isAllFileImport"
        v-bind="$attrs"
      />
    </div>

    <ht-dialog
      :visible.sync="imporProgressVisiable"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      append-to-body
      width="70%"
    >
      <div style="height: 150px; text-align: center;">
        <p>导入中，请耐心等待......</p>
        <el-progress
          :text-inside="true"
          :stroke-width="22"
          :percentage="imporProgress"
        />
      </div>
    </ht-dialog>
  </ht-dialog>
</template>

<script>
import ImportTable from "./components/ImportTable";
import ImportResult from "./components/ImportResult";
import XLSX from "xlsx";
import { sleep } from "@/utils/tool";
import hotkeys from "hotkeys-js";
import { dateFormat, dateFormatToSecond } from "@/utils/date";
import { envConfig } from "envConfigPath";
let excelSheets = {};
let totalData = [];
let localErrRows = [],
  reqRows = [];

export default {
  name: "ImportBox",
  components: {
    ImportTable,
    ImportResult
  },
  props: {
    keyScope: {
      type: [Symbol, String],
      default: Symbol("ImportBox")
    },
    hasSetting: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true,
      default: ""
    },
    offset: {
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    isCanClickImport: {
      type: Boolean,
      default: true
    },
    isAllFileImport: {
      type: Boolean,
      default: false
    },
    reqHandler: {
      type: Function,
      required: true
    },
    remakTitle: {
      type: String,
      default: ""
    },
    isBill: Boolean,
    toValidIncludeOptions: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      importLoading: false,
      excelSheetsName: [],
      curSheet: "",
      tabJson: [],
      unshowCount: 0,
      selections: {},
      totalCount: 0,
      errRows: [],
      completeVisible: false,
      imporProgress: 0,
      localScope: null
    };
  },
  computed: {
    imporProgressVisiable() {
      return !!this.imporProgress;
    }
  },
  watch: {
    "$attrs.visible"(now) {
      if (now) {
        // this.localScope = hotkeys.getScope();
        // hotkeys.setScope(this.localScope);
        // hotkeys("f3", { scope: this.localScope }, (e, handler) => {
        //   switch (handler.key) {
        //     case "f3":
        //       if (this.isCanClickImport) this.importHandle();
        //       break;
        //     default:
        //       return;
        //   }
        // });
      } else {
        // hotkeys.deleteScope(this.localScope);
        this.clearHandle();
      }
    },
    options: {
      handler(val) {
        if (val) {
          this.getRows();
        }
      }
    }
  },
  destroyed() {
    hotkeys.deleteScope(this.localScope);
  },
  methods: {
    importExcel(files) {
      if (!files.length) {
        this.curSheet = "";
        this.excelSheetsName = [];
        this.tabJson = [];
        return;
      }
      const file = files[0] || {};
      if (!file) {
        this.curSheet = "";
        this.excelSheetsName = [];
        this.tabJson = [];
        return;
      }
      const types = file.name.split(".")[file.name.split(".").length - 1],
        fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
          item => item === types
        );
      if (!fileType) {
        this.$message.warning({
          message: "文件格式错误！请重新选择",
          showClose: true
        });
        return;
      }
      this.file2Xce(file).then(data => {
        this.importLoading = true;
        const worker = new Worker(
          envConfig.routerPrefix
            ? envConfig.routerPrefix + "/worker/parseExcel.js"
            : "./worker/parseExcel.js"
        );
        let wb;
        worker.onmessage = e => {
          switch (e.data.t) {
            case "ready":
              break;
            case "e":
              this.importLoading = false;
              console.error(e.data.d);
              break;
            case "xlsx":
              this.importLoading = false;
              wb = JSON.parse(e.data.d);
              excelSheets = wb.Sheets;
              this.excelSheetsName = wb.SheetNames;
              this.curSheet = this.excelSheetsName[0];
              this.selectSheet(this.curSheet);
              break;
          }
        };
        worker.postMessage({
          d: data,
          b: { type: "binary" },
          t: "xlsx"
        });
      });
    },
    file2Xce(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          resolve(data);
        };
        reader.readAsBinaryString(file);
      });
    },
    selectSheet(sheet) {
      let merges = [];
      merges = excelSheets[sheet]["!merges"] || [];
      if (merges && merges.length > 0) {
        this.$message.warning({
          message: "导入Excel不能包含合并单元格",
          showClose: true
        });
        return;
      }
      const tabJson = XLSX.utils.sheet_to_json(excelSheets[sheet], {
        raw: false,
        defval: ""
      });
      if (tabJson && tabJson.length > 0) {
        this.tabJson = tabJson.slice(0, 10).map(item => ({ ...item }));
        totalData = tabJson.map(item => ({ ...item }));
        this.unshowCount = totalData.length - this.tabJson.length;
        this.selections = {};
      }
    },
    async importHandle() {
      if (!this.curSheet) {
        this.$message.warning({
          message: "请选择导入文件",
          showClose: true
        });
        return;
      }
      if (this.$refs.refImportTable.checkSelections()) {
        this.importLoading = true;
        await this.getRows();
        // console.log(reqRows);
        const rows = reqRows.map(item => {
          return { ...item };
        });
        // console.log(rows);
        this.reqHandle([...rows])
          .then(errors => {
            this.errRows = [
              ...localErrRows,
              ...this.getErrRows({ ...errors }, [...rows])
            ];
            this.totalCount = totalData.length;
            this.$emit("import");
            localErrRows = [];
            reqRows = [];
            this.cancelHandle();
            this.completeVisible = true;
            this.imporProgress = 0;
            this.importLoading = false;
          })
          .catch(() => {
            this.importLoading = false;
            localErrRows = [];
            reqRows = [];
          });
      }
    },
    async getRows() {
      await sleep(100);

      /**
                totalData: [
                    {
                        配件名称: "发动机机油盖",
                        配件编码: "06B103485C",
                        汽车品牌: "奥迪",
                        配件品牌: "爱德克斯",
                        ...
                    }
                    ...
                ];
                this.selections: {
                    配件编码: "code",
                    配件名称: "name",
                    ...
                }
                selectOptions: [
                    {
                        label: "配件编码",
                        required: true,                                                                
                        value: "code",
                        type: "number",                                   
                        checkValue: ƒ checkValue(value)              校验数据问题  输出错误字符串
                    }
                    ...
                ]
            * */
      const selectOptions = [];
      const keys = Object.keys(this.selections) || [];
      if (keys && keys.length && this.options && this.options.length) {
        this.options.forEach(item => {
          keys.forEach(key => {
            if (this.selections[key] == item.value) {
              selectOptions.push({ ...item, importLabel: key });
            }
          });
        });
      }
      // console.log(totalData);
      reqRows = [];
      if (totalData.length && selectOptions.length) {
        totalData.forEach((item, index) => {
          const row = {},
            errors = [];
          const keys = Object.keys(item) || [];
          if (keys.length) {
            keys.forEach(key => {
              selectOptions.forEach(option => {
                if (option.importLabel == key) {
                  let data = item[key];
                  if (option.formate) {
                    data = option.formate(item[key]);
                  } else {
                    switch (option.type) {
                      case "number":
                        data = Number.isNaN(
                          Number(String(data).replace(/,/g, ""))
                        )
                          ? data
                          : Number(String(data).replace(/,/g, ""));
                        break;
                      case "date":
                        data = data ? dateFormat(data) : "";
                        break;
                      case "time":
                        data = data ? dateFormatToSecond(data) : "";
                        break;
                      case "string":
                      default:
                        data = data ? String(data).trim() : "";
                        break;
                    }
                  }
                  row[option.value] = data;
                  if (this.toValidIncludeOptions) {
                    const optionErrors =
                      option.checkValue &&
                      option.checkValue(
                        data,
                        option,
                        this.toValidIncludeOptions[option.value]
                      );

                    if (optionErrors?.length) {
                      errors.push(optionErrors.join(","));
                    }
                  }
                }
              });
            });
          }
          row.rowNumber = index + 1;
          if (errors.length) {
            row.errors = errors.join(",");
            localErrRows.push(row);
          } else {
            // console.log("push", row);
            reqRows.push(row);
          }
        });
      }
    },
    async reqHandle(rows) {
      if (this.isBill && this.offset) {
        const resData = [];
        const count = Math.ceil(rows.length / this.offset);
        const offset = Math.floor(100 / count);
        if (count > 1) {
          const res1 = await this.reqHandler(rows.slice(0, this.offset));
          resData.push(res1.errors);
          for (let i = 0; i < count; i++) {
            const params = rows.slice(
              (i + 1) * this.offset,
              (i + 2) * this.offset
            );
            const res = await this.reqHandler(params);
            this.imporProgress += offset;
            resData.push(res.errors);
          }
        } else {
          const res1 = await this.reqHandler(rows);
          resData.push(res1.errors);
        }
        let errors = {};
        resData.forEach(item => {
          errors = { ...errors, ...item };
        });
        return errors;
      } else if (this.offset) {
        const resData = [];
        const count = Math.ceil(rows.length / this.offset);
        const offset = Math.floor(100 / count);
        for (let i = 0; i < count; i++) {
          const params = rows.slice(i * this.offset, (i + 1) * this.offset);
          const res = await this.reqHandler(params);
          this.imporProgress += offset;
          resData.push(res.errors);
        }
        let errors = {};
        resData.forEach(item => {
          errors = { ...errors, ...item };
        });
        return errors;
      } else {
        const res = await this.reqHandler(rows);
        return res.errors;
      }
    },
    getErrRows(errors, rows) {
      const errRows = [];
      if (rows && rows.length) {
        rows.forEach(item => {
          const newItem = {
            ...item,
            errors: errors[item.rowNumber]
          };
          if (newItem.errors) {
            newItem.errors = newItem.errors.join(",");
            errRows.push(newItem);
          }
        });
      }
      return errRows;
    },
    cancelHandle() {
      this.$emit("update:visible", false);
    },
    clearHandle() {
      this.$refs.refExceptInput.value = "";
      this.curSheet = "";
      this.tabJson = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.import-file {
  cursor: pointer;
}
.import-container {
  height: 482px;
  &::v-deep .el-main {
    margin: 0;
    padding: 5px;
  }
  &::v-deep .el-container {
    margin-bottom: 10px;
    border: 1px solid #edf2f5;
  }
  &::v-deep .el-header {
    height: 30px !important;
    background-color: #fbfbfb;
    line-height: 30px;
    font-size: 14px;
  }
}
.import-setting-container {
  display: flex;
  flex-direction: column;
  height: calc(100% - 10px);

  .import-remark-container {
    flex: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;

    &::v-deep .el-card__body {
      flex: auto;
      overflow: auto;
    }
  }
}
</style>
