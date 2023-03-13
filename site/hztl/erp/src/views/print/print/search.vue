<script>
import { mapState, mapActions } from "vuex";
import hotkeys from "hotkeys-js";
import { BASE_FILES_LIST } from "../constants";
import { ORIGINAL_THEME, THEMES } from "@/layout/navbar/constant";

/**
 *
 * 根据type值配置，一种单据一个type值，
 * type 需要映射
 *      1、备选字段 BASE_FILES_LIST
 *      2、路由
 *
 */

function keyForSavingSearchFilter(template) {
  const type = template?.type,
    id = template?.id;
  if (type && Number.isInteger(id)) {
    return "printSearchFilter-" + template?.type + "-" + template?.id;
  }
  return "";
}

function saveSearchFilter(template, value) {
  const key = keyForSavingSearchFilter(template);
  if (!key) return;
  for (const k in value) {
    if (typeof value[k] === "object" && !(value[k].key && value[k].type)) {
      delete value[k];
    }
  }
  localStorage[key] = JSON.stringify(value);
}

function getDefaultSearchFilter(template) {
  let saved;
  const key = keyForSavingSearchFilter(template);
  if (key && localStorage[key]) {
    saved = JSON.parse(localStorage[key]);
  }
  return {
    sort1: saved?.sort1 || { key: "", type: "asc" },
    sort2: saved?.sort2 || { key: "", type: "asc" },
    sort3: saved?.sort3 || { key: "", type: "asc" },
    neg: saved?.neg || false
  };
}

export default {
  name: "printSearch",
  props: ["template", "billType", "isLabel"],
  data() {
    return {
      keyScope: Symbol("printSearch"),
      ...getDefaultSearchFilter(this.template),
      sortKeyOptions: [],
      sortTypes: [
        {
          id: "asc",
          name: "升序"
        },
        {
          id: "desc",
          name: "降序"
        }
      ]
    };
  },
  computed: {
    ...mapState("admin/themeStyle", {
      themeColor: state => state.themeColor
    }),
    showNegSwitch() {
      return [
        "orderReturn",
        "saleReturn",
        "transferOutReturn",
        "transferStorageReturn"
      ].includes(this.billType);
    }
  },
  watch: {
    template: {
      handler: function() {
        this.init();
        if (this.template) this.handleSearch();
      }
    },
    themeColor: {
      handler: function(val) {
        const theme = val || ORIGINAL_THEME;
        THEMES.some(item => {
          const result = item.id === theme;
          if (result) {
            document.body.setAttribute("data-theme", item.theme);
          }
          return result;
        });
      }
    }
  },
  created() {
    this.loadThemeColor();
  },
  mounted() {
    this.bindKeyboard();
    hotkeys.setScope(this.keyScope);
  },
  methods: {
    ...mapActions("admin/themeStyle", ["loadThemeColor"]),
    bindKeyboard() {
      hotkeys("f5, f6", { scope: this.keyScope }, (e, handler) => {
        switch (handler.key) {
          case "f5":
            this.handleSearch();
            break;
          case "f6":
            this.handleReset();
            break;
          default:
        }
      });
    },
    init() {
      this.resetSearchFilter();

      const keys = [];
      if (this.template.content) {
        const content = JSON.parse(this.template.content);
        if (content && content.templateBody && content.templateBody.length) {
          const templateBody = content.templateBody[0];
          if (templateBody && templateBody.content) {
            templateBody.content.forEach(row => {
              const key = row.key.substring(14);
              if (key !== "_index") {
                keys.push(key);
              }
            });
          }
        }
      }

      let tableColumns = [];
      BASE_FILES_LIST.some(item => {
        const mark = item.type === window.printData.type;
        if (mark) {
          tableColumns = item.baseTableFiles;
        }
        return mark;
      });

      const sortKeyOptions = [];
      keys.forEach(key => {
        tableColumns.some(column => {
          let mark = false;
          let file = "";
          if (column.file) {
            file = column.file;
            if (Array.isArray(column.file)) {
              file = column.file.join(".");
            }
          }
          if (column.key) {
            mark = column.key === key;
          } else if (file) {
            mark = file === key;
          }
          if (mark) {
            sortKeyOptions.push({
              id: file,
              name: column.name,
              disabled: false
            });
          }
          return mark;
        });
      });
      this.sortKeyOptions = sortKeyOptions;
    },
    sortKeyChange() {
      const keys = [];
      if (this.sort1.key) {
        keys.push(this.sort1.key);
      } else {
        this.sort2.key = "";
        this.sort3.key = "";
      }
      if (this.sort2.key) {
        keys.push(this.sort2.key);
      } else {
        this.sort3.key = "";
      }
      if (this.sort3.key) {
        keys.push(this.sort3.key);
      }
      this.sortKeyOptions.forEach(item => {
        item.disabled = keys.includes(item.id);
      });
    },
    handleSearch() {
      let sorts = "";
      const sort1 = this.sort1;
      const keyReg = /[0-9a-zA-Z_]+\./;
      if (sort1.key) {
        sorts += `${sort1.key.replace(keyReg, "")}-${sort1.type}`;
        const sort2 = this.sort2;
        if (sort2.key) {
          sorts += `,${sort2.key.replace(keyReg, "")}-${sort2.type}`;
          const sort3 = this.sort3;
          if (sort3.key) {
            sorts += `,${sort3.key.replace(keyReg, "")}-${sort3.type}`;
          }
        }
      }
      this.$emit("loadData", sorts, this.neg);
      saveSearchFilter(this.template, {
        sort1: this.sort1,
        sort2: this.sort2,
        sort3: this.sort3,
        neg: this.neg
      });
    },
    resetSearchFilter() {
      const searchFilter = getDefaultSearchFilter(this.template);
      this.sort1 = searchFilter.sort1;
      this.sort2 = searchFilter.sort2;
      this.sort3 = searchFilter.sort3;
      this.neg = searchFilter.neg;
    },
    handleReset() {
      this.resetSearchFilter();
      this.sortKeyOptions.forEach(item => {
        item.disabled = false;
      });
    }
  },
  render() {
    return (
      this.isLabel || (
        <div class="border-container">
          <div class="border-title">
            <span class="border-title-text">打印内容设置</span>
          </div>

          <el-form
            label-position="right"
            size="mini"
            label-width="70px"
            class="form-item-small-margin-bottom"
          >
            <el-form-item label="" label-width="0">
              <div class="flex-container">
                <div class="item-title1">表格数据排序</div>
                <el-row gutter={10}>
                  <el-col span={6}>
                    <el-row>
                      <el-form-item label="一级排序">
                        <el-col span={13}>
                          <el-select
                            v-model={this.sort1.key}
                            on-change={this.sortKeyChange}
                            clearable
                            placeholder=""
                          >
                            {this.sortKeyOptions.map(sortKeyOption => {
                              return (
                                <el-option
                                  label={sortKeyOption.name}
                                  value={sortKeyOption.id}
                                  disabled={sortKeyOption.disabled}
                                ></el-option>
                              );
                            })}
                          </el-select>
                        </el-col>
                        <el-col span={11}>
                          <ht-select
                            class="select-sort-type"
                            v-model={this.sort1.type}
                            options={this.sortTypes}
                            clearable={false}
                          />
                        </el-col>
                      </el-form-item>
                    </el-row>
                  </el-col>
                  <el-col span={6}>
                    <el-row>
                      <el-form-item label="二级排序">
                        <el-col span={13}>
                          <el-select
                            v-model={this.sort2.key}
                            on-change={this.sortKeyChange}
                            clearable
                            placeholder=""
                            disabled={
                              !(
                                this.sort1.key && this.sortKeyOptions.length > 1
                              )
                            }
                          >
                            {this.sortKeyOptions.map(sortKeyOption => {
                              return (
                                <el-option
                                  label={sortKeyOption.name}
                                  value={sortKeyOption.id}
                                  disabled={sortKeyOption.disabled}
                                ></el-option>
                              );
                            })}
                          </el-select>
                        </el-col>
                        <el-col span={11}>
                          <ht-select
                            class="select-sort-type"
                            v-model={this.sort2.type}
                            options={this.sortTypes}
                            clearable={false}
                            disabled={
                              !(
                                this.sort1.key && this.sortKeyOptions.length > 1
                              )
                            }
                          />
                        </el-col>
                      </el-form-item>
                    </el-row>
                  </el-col>
                  <el-col span={6}>
                    <el-row>
                      <el-form-item label="三级排序">
                        <el-col span={13}>
                          <el-select
                            v-model={this.sort3.key}
                            on-change={this.sortKeyChange}
                            clearable
                            placeholder=""
                            disabled={
                              !(
                                this.sort1.key &&
                                this.sort2.key &&
                                this.sortKeyOptions.length > 2
                              )
                            }
                          >
                            {this.sortKeyOptions.map(sortKeyOption => {
                              return (
                                <el-option
                                  label={sortKeyOption.name}
                                  value={sortKeyOption.id}
                                  disabled={sortKeyOption.disabled}
                                ></el-option>
                              );
                            })}
                          </el-select>
                        </el-col>
                        <el-col span={11}>
                          <ht-select
                            class="select-sort-type"
                            v-model={this.sort3.type}
                            options={this.sortTypes}
                            clearable={false}
                            disabled={
                              !(
                                this.sort1.key &&
                                this.sort2.key &&
                                this.sortKeyOptions.length > 2
                              )
                            }
                          />
                        </el-col>
                      </el-form-item>
                    </el-row>
                  </el-col>
                  {this.showNegSwitch || (
                    <el-col span={6}>
                      <div style="text-align: right;">
                        <el-button
                          type="primary"
                          size="mini"
                          on-click={this.handleSearch}
                        >
                          确定（F5）
                        </el-button>
                        <el-button
                          type="primary"
                          size="mini"
                          on-click={this.handleReset}
                        >
                          重置（F6）
                        </el-button>
                      </div>
                    </el-col>
                  )}
                </el-row>
              </div>
            </el-form-item>

            {this.showNegSwitch && (
              <el-row>
                <el-col span={19}>
                  <el-form-item label="" label-width="0">
                    <span class="item-title2">数量/金额负数显示</span>
                    <el-switch v-model={this.neg} />
                  </el-form-item>
                </el-col>
                <el-col span={5}>
                  <div style="text-align: right;">
                    <el-button
                      type="primary"
                      size="mini"
                      on-click={this.handleSearch}
                    >
                      确定（F5）
                    </el-button>
                    <el-button
                      type="primary"
                      size="mini"
                      on-click={this.handleReset}
                    >
                      重置（F6）
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            )}
          </el-form>
        </div>
      )
    );
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.border-container {
  margin: 5px;
  padding: 10px;
  height: 100%;
  width: calc(100% - 10px);
  border: 1px solid #dcdfe6;
  border-radius: 5px;

  .border-title {
    margin: -20px 0 10px 20px;

    .border-title-text {
      display: inline-block;
      padding: 0 5px;
      background-color: $color-content-bg;
      @include background_color("color-content-bg");

      font-size: 13px;
    }
  }

  .form-item-small-margin-bottom {
    .placeholder-form-item {
      line-height: 29px;
    }
    .el-form-item {
      margin-bottom: 3px;

      .el-form-item__label {
        padding-right: 3px;
      }
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 3px;
    }

    &.space-indent {
      .el-form-item__label {
        text-indent: 0.5em;
      }
    }
    .form-search-btn-group {
      text-align: right;
    }
  }

  .item-title1,
  .item-title2 {
    margin-right: 10px;
  }

  .item-title1 {
    flex: none;
    width: 119px;
  }
}
</style>
