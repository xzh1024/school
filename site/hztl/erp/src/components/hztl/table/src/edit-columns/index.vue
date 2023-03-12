<template>
  <ht-dialog
    :visible.sync="passvisible"
    :close-on-click-modal="false"
    width="400px"
    append-to-body
    class="ignore-top-hotkeys"
  >
    <template v-slot:title>
      <div>
        列设置 <span style="font-size: 14px;">(按住列标题上下拖动排序)</span>
      </div>
    </template>
    <div class="tips">* 显示列过多，分页数较大时可能导致列表卡顿！</div>
    <div v-switch-focus="focusData">
      <table class="table fixed-header">
        <thead>
          <tr>
            <th width="40%">
              列标题
            </th>
            <th width="30%">
              列宽
            </th>
            <th width="30%">
              是否显示
            </th>
          </tr>
        </thead>
        <draggable v-model="editList" tag="tbody">
          <tr v-for="(item, index) in editList" :key="item.name">
            <td width="40%">
              {{ item.label }}
            </td>
            <td width="30%">
              <ht-format-number
                v-model="item.width"
                :class="`switch-focus focus-input-${index}`"
                size="mini"
                :max="MAX_WIDTH"
                @intput-enter="debouncedHandleInputEnter"
              />
            </td>
            <td width="30%">
              <el-switch v-model="item.isShow" :disabled="item.cantHide" />
            </td>
          </tr>
        </draggable>
      </table>
      <!-- <el-checkbox
        v-if="hasChangeShowedPaginationBtn"
        v-model="isShowedPagination"
        class="mt-1"
      >
        显示分页
      </el-checkbox> -->

      <div class="dialog-footer-align mt-1">
        <el-button
          v-delay-focus="resetFocus"
          type="primary"
          plain
          size="mini"
          @click="resetData"
        >
          恢复默认
        </el-button>
        <el-button
          type="primary"
          plain
          class="switch-focus focus-bottun"
          size="mini"
          @click="submit"
        >
          保存设置(F3)
        </el-button>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import draggable from "vuedraggable";
import debounce from "throttle-debounce/debounce";
import { getSettingsTables, postSettingsTables } from "@/api/setting";
import hotkeys from "hotkeys-js";
import { formatterColums, getPropValue } from "../until";
import baseDataMixin from "@/mixins/baseDataMixin";

let lastKeyScope;
const MAX_WIDTH = 500;
const MIN_WIDTH = 50;

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
  mixins: [baseDataMixin],
  props: {
    visible: {
      type: Boolean
    },
    tableName: {
      type: String,
      required: true
    },
    baseColumns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      MAX_WIDTH,
      MIN_WIDTH,
      formatterColums: formatterColums.bind(this),
      debouncedHandleInputEnter: debounce(100, this.handleInputEnter),
      focusData: {
        updateIndex: 0,
        initial: "focus-input-0",
        type: null
      },
      resetFocus: false,
      keyScope: Symbol("editColumns"),
      backEndColums: [],
      isShowedPagination: true,
      editList: [],
      dragging: false
    };
  },
  computed: {
    passvisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      }
    },
    hasChangeShowedPaginationBtn() {
      return !!this.$listeners["show-pagination-change"];
    }
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val) {
          this.changeEditList();
          lastKeyScope = hotkeys.getScope();
          hotkeys.setScope(this.keyScope);
          this.updateFocusData({
            initial: "focus-input-0"
          });
        } else if (oldVal) {
          hotkeys.setScope(lastKeyScope);
        }
      },
      immediate: true
    },
    baseColumns(val, old = {}) {
      if (val && JSON.stringify(val) !== JSON.stringify(old)) {
        this.initData();
      }
    }
  },
  mounted() {
    this.bindKeyboard();
    this.initData();
  },
  destroyed() {
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    close() {
      this.passvisible = false;
    },
    submit() {
      this.saveCurrentColums().then(() => {
        this.setCurrentColums();
        this.close();
      });
    },
    resetData() {
      this.isShowedPagination = true;
      this.changeEditList(this.baseColumns);
    },
    initData() {
      return getSettingsTables({
        name: this.tableName
      }).then(res => {
        if (res) {
          this.backEndColums = res.columnsSettings;
          this.isShowedPagination = res.isShowedPagination;
          this.$emit("show-pagination-change", true);
        }

        if (this.editList.length) {
          // 显示列发生变化后再更新
          const props = this.baseColumns
            .filter(item => !item.forcedHide)
            .map(item => item.prop);
          const oldProps = this.editList
            .filter(item => !item.forcedHide)
            .map(item => item.prop);
          if (JSON.stringify(props) !== JSON.stringify(oldProps)) {
            this.changeEditList();
            this.setCurrentColums();
          }
        } else {
          this.changeEditList();
          this.setCurrentColums();
        }
      });
    },
    changeEditList(backEndColums = this.backEndColums || this.baseColumns) {
      this.editList = this.baseColumns
        .map(item => {
          const index = backEndColums.findIndex(
            it => it && getPropValue(it.prop) === getPropValue(item.prop)
          );
          const column = backEndColums[index];
          if (column) {
            let width = column.width;
            if (column.width <= MIN_WIDTH) {
              width = MIN_WIDTH;
            }
            if (column.width > MAX_WIDTH) {
              width = MAX_WIDTH;
            }
            return {
              ...item,
              width: width,
              isShow: !column.isHide || column.cantHide,
              index
            };
          } else {
            return {
              ...item,
              isShow: true,
              index: 999
            };
          }
        })
        .sort((a, b) => a.index - b.index);
    },
    setCurrentColums() {
      this.editList = this.editList.map(item => ({
        ...item,
        width: item.width > MIN_WIDTH ? item.width : MIN_WIDTH
      }));
      this.$emit(
        "columns-change",
        this.formatterColums(
          this.editList.filter(
            item => !item.forcedHide && (item.isShow || item.cantHide)
          )
        )
      );
    },
    async saveCurrentColums() {
      this.backEndColums = this.editList.map((item, index) => ({
        prop: getPropValue(item.prop),
        width: item.width > MIN_WIDTH ? item.width : MIN_WIDTH,
        isHide: !item.isShow,
        index
      }));
      await postSettingsTables({
        name: this.tableName,
        columnsSettings: this.backEndColums,
        isShowedPagination: this.isShowedPagination
      });
      this.$emit("show-pagination-change", true);
    },
    bindKeyboard() {
      hotkeys("f3,up,down", { scope: this.keyScope }, (e, handler) => {
        switch (handler.key) {
          case "f3":
            this.submit();
            break;
          case "up":
          case "down":
            e.preventDefault();
            this.updateFocusData({ type: handler.key });
            break;
          default:
            return;
        }
      });
    },
    handleInputEnter() {
      this.updateFocusData({ type: "down" });
    },
    updateFocusData({ type, initial }) {
      const updateIndex = this.focusData.updateIndex++;
      this.focusData = {
        updateIndex,
        initial,
        type
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var";

.tips {
  font-size: 12px;
  color: $color-danger;
  margin-top: 10px;
  padding: 0;
}

.table {
  border-collapse: collapse;
  font-size: 12px;
  width: 100%;

  thead {
    th {
      height: 28px;
      line-height: 28px;
      text-align: left;
      padding: 0 5px;
      background: #f9fdff;
    }
  }

  tbody {
    tr {
      cursor: move;

      &:nth-child(2n) {
        background: #f9fdff;
      }

      &:nth-child(2n + 1) {
        background: #fff;
      }
    }

    td {
      text-align: left;
      padding: 0 5px;
    }
  }
}

.fixed-header {
  tr {
    display: block;

    th {
      display: block;
      float: left;
    }
  }

  tbody {
    display: block;
    overflow: auto;
    height: 55vh;
    width: 100%;
  }
}

table,
table tr th,
table tr td {
  border: 1px solid $border-color-table;
  @include border_color("border-color-table");
}
</style>
