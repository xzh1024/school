<template>
  <div class="container-box">
    <ht-card padding class="auto-card">
      <el-form
        :model="searchData"
        label-position="left"
        label-width="60px"
        size="mini"
        class="form-item-small-margin-bottom"
      >
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="收支类目">
              <ht-input
                v-model="searchData.name"
                placeholder="请输入收支类目/项目代码"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="类目状态">
              <ht-select
                v-model="searchData.status"
                :options="CATE_STATUS"
                has-selecte-all-val
                placeholder="类目状态"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="是否内置">
              <ht-select
                v-model="searchData.isBuiltin"
                has-selecte-all-val
                :options="BUILT_IN"
                placeholder="是否内置"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="收支方向">
              <el-checkbox-group v-model="searchData.type">
                <el-checkbox :label="'in'">收入</el-checkbox>
                <el-checkbox :label="'out'">支出</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <div style="text-align: right;">
              <el-button type="primary" size="mini" @click.stop="searchHandle">
                查询（F5）
              </el-button>
              <el-button type="primary" size="mini" @click.stop="resetHandle">
                重置（F6）
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <resize-box :default-len="550" is-column>
        <template v-slot:block1>
          <ht-card no-padding class="auto-card">
            <ht-setting-table
              ref="datatable"
              row-key="id"
              :indent="20"
              default-expand-all
              highlight-current
              :selected-rows.sync="multipleSelections"
              v-loading="loading"
              :data="tableData"
              :columns="columns"
              @selectChange="selectChange"
              setting-all-column
              show-table-setting
              :enableTableSetting="true"
              :table-name="'fund-cate'"
            />
          </ht-card>
        </template>
        <template v-slot:block2>
          <Editor
            :currentRow="currentRow"
            :maxLevel="4"
            :enableAdd="enableAdd"
            :maxCode="maxCode"
            @needUpdateList="needUpdateList"
          />
        </template>
      </resize-box>
    </ht-card>
  </div>
</template>

<script>
import ResizeBox from "@/components/resizeBox";
import { mapState } from "vuex";
import { hotkeyMixin } from "@/mixins";
import { CATE_STATUS, BUILT_IN } from "../constans/stroe";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { tree } from "@/api/finance/fundCategory";
import Editor from "./editor";
import { cloneDeep } from "lodash";

const defaultQuery = {
  name: "",
  status: "enable",
  isBuiltin: "all",
  type: ["in", "out"]
};

export default {
  name: "FundCategory",
  data() {
    return {
      CATE_STATUS,
      BUILT_IN,
      multipleSelections: [],
      isShowTable: true,
      searchData: {
        ...defaultQuery
      },
      enableAdd: true,
      loading: false,
      totalSize: 0,
      pageSize: 20,
      tableData: [],
      currentRow: {},
      currentPage: 1,
      isExpand: false,
      rawData: [],
      maxCode: 0,
      columns: [
        {
          prop: "index",
          label: "序号",
          width: CELL_WIDTH.index,
          cantHide: false,
          cantExport: true
        },
        {
          prop: "showCode",
          label: "收支类目代码",
          width: CELL_WIDTH.index,
          render: (_, row) => {
            const { level, showCode } = row;
            const currentIndent = 8 * (level - 1) + "px";
            return (
              <span style={{ "padding-left": currentIndent }}>
                {showCode || "-"}
              </span>
            );
          }
        },
        {
          prop: "name",
          label: "收支类目名称",
          width: CELL_WIDTH.personName
        },
        {
          prop: "mnemonic",
          label: "助记符",
          width: CELL_WIDTH.personName
        },
        {
          prop: "level",
          label: "类目级别",
          width: CELL_WIDTH.index
        },
        {
          prop: "d",
          label: "状态",
          width: CELL_WIDTH.personName,
          formatter: (_, row) => {
            const { flags } = row;
            const cate = CATE_STATUS.find(item => item.id === flags.status);
            return cate.name || "-";
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.personName
        }
      ]
    };
  },
  components: {
    ResizeBox,
    Editor
  },
  mixins: [hotkeyMixin],
  computed: {
    ...mapState("admin/user", ["userInfoMsg", "perm"])
  },
  mounted() {
    this.resetHandle();
    this.loadData();
  },
  methods: {
    resetHandle() {
      this.searchData = { ...defaultQuery };
    },
    searchHandle() {
      this.loadData();
    },
    handleExpand() {
      this.isExpand = true;
    },
    selectChange(data) {
      if (!data) return;
      this.rowSelected(data[0]);
    },
    rowSelected(row) {
      if (!row) return;
      this.currentRow = {
        ...row
      };
      this.currentRow = cloneDeep(this.currentRow);
      // 获取点击行当前同等级的code的最大值
      this.maxCode = this.recurFindMax(this.rawData, this.currentRow).max;
      const result = this.recurFindFather(this.rawData, this.currentRow);
      const { flags } = result.father;
      // 没有flags表示是第一层
      if (!flags) {
        this.enableAdd = false;
      } else {
        this.enableAdd = !flags.notAppend;
      }
    },
    recurFindMax(arr, data) {
      let max = 0;
      let isCurrentArr = false; // 当前数组是否匹配到了目标数据
      arr.forEach(item => {
        max = +item.code > max ? +item.code : max;
        if (item.id === data.id) {
          isCurrentArr = true;
        }
        // 当前数组没有匹配时，去当前的children中去匹配
        if (!isCurrentArr && item.children && item.children.length) {
          const result = this.recurFindMax(item.children, data);
          if (result.isFit) {
            max = result.max;
          }
        }
      });
      return {
        isFit: isCurrentArr,
        max
      };
    },
    recurFindFather(arr, data) {
      let father = {};
      let gotIt = false;
      arr.forEach(item => {
        if (item.id === data.parentId) {
          gotIt = true;
          father = { ...item };
        } else {
          if (item.children && item.children.length) {
            const result = this.recurFindFather(item.children, data);
            if (result.gotIt) {
              gotIt = true;
              father = { ...result.father };
            }
          }
        }
      });
      return {
        gotIt,
        father
      };
    },
    loadData(path, remove) {
      this.loading = false;
      tree().then(res => {
        if (!res) return;
        this.rawData = this.generateTree(res);
        this.filterData();
        if (!path) return;
        this.$nextTick(() => {
          this.expandTarget(path, remove);
        });
      });
    },
    generateTree(arr, fatherCode, parentPath) {
      if (!arr) return [];
      const newArr = [...arr];
      newArr.forEach(item => {
        item.showCode = fatherCode ? fatherCode + item.code : item.code;
        item.showParentCode = fatherCode ? fatherCode : item.parentCode;
        item.path = parentPath ? parentPath + "-" + item.id : item.id;
        if (item.children && item.children.length) {
          item.children = this.generateTree(
            item.children,
            item.showCode,
            item.path
          );
        }
      });
      return newArr;
    },
    filterData() {
      // 先用输入的内容去匹配数据，为所有被匹配到的数据添加isFit = true
      const filteredArr = this.recurFilter(this.rawData);
      // 去递归被标识过isFit的数组
      this.tableData = this.filtereFit(filteredArr);
      // 设置默认选中
      this.multipleSelections = this.tableData && [this.tableData[0]];
      // this.currentRow = this.tableData && this.tableData[0];
      if (!this.currentRow.name) {
        this.currentRow = this.tableData && this.tableData[0];
        this.rowSelected(this.tableData[0]);
      }
    },
    // 递归，返回被标识的元素，或者没被标识的元素但子集中有被标识的元素
    filtereFit(arr) {
      const newArr = [];
      arr.forEach(item => {
        // 如果本身被匹配到，就把自己推进去
        if (item.isFit) {
          newArr.push(item);
        } else if (
          item.children &&
          item.children.length &&
          this.isChildrenContainFit(item.children)
        ) {
          // 如果自己没被匹配到，但子集中有元素被匹配到，就把自己的childern筛选一遍然后再把自己推进去
          item.children = this.filtereFit(item.children);
          newArr.push(item);
        }
      });
      return newArr;
    },
    // 返回子集中是否有元素被标识
    isChildrenContainFit(children) {
      let containFit = false;
      children.forEach(item => {
        if (item.isFit) {
          containFit = true;
          return;
        } else if (
          item.children &&
          item.children.length &&
          this.isChildrenContainFit(item.children)
        ) {
          containFit = true;
          return;
        }
      });
      return containFit;
    },
    setSelectRow(row) {
      const { level, mnemonic } = row;
      const className = "el-table__row--level-" + (level - 1);
      const els = document.getElementsByClassName(className);
      for (let i = 0; i < els.length; i++) {
        if (els[i].innerText.indexOf(mnemonic) > -1) {
          els[i].click();
        }
      }
    },
    recurFilter(arr) {
      if (!arr) return false;
      const newArr = cloneDeep(arr);
      const { isBuiltin, name, status, type } = this.searchData;
      newArr.forEach(item => {
        // 选择全部或者数据的isBuiltin跟查询的isBuiltin一致才通过
        const isBuiltinOk =
          isBuiltin === "all" || item.flags.isBuiltin === isBuiltin;
        // 没有输入编号或者编号和查询编号模糊匹配
        const codeOk = name == "" || item.code.indexOf(name) > -1;
        // 没有输入类目名称或者类目名称和查询类目名称模糊匹配
        const nameOk = name == "" || item.name.indexOf(name) > -1;
        // 没有输入助记符或者助记符和查询类目名称模糊匹配
        const mnemonicOk = name == "" || item.mnemonic.indexOf(name) > -1;
        // 自己拼装的showCode也去参加匹配
        const showCodeOk =
          name == "" || (item.showCode && item.showCode.indexOf(name) > -1);
        // status匹配
        const statusOk = status === "all" || item.flags.status == status;
        // type要在查询的type内
        const typeOk = type.indexOf(item.type) > -1;
        // 计算当前数据是否通过筛选
        const isPass =
          isBuiltinOk &&
          statusOk &&
          typeOk &&
          (nameOk || codeOk || mnemonicOk || showCodeOk);
        item.children = this.recurFilter(item.children);
        item.isFit = isPass;
      });
      return newArr;
    },
    needUpdateList(path, remove = false) {
      this.loadData(path, remove);
      // this.multipleSelections = [this.currentRow];
    },
    expandAll() {
      // 获取点击的箭头元素
      const els = document.getElementsByClassName("el-table__expand-icon");
      for (let i = 0; i < els.length; i++) {
        els[i].click();
      }
    },
    async expandTarget(path, remove) {
      let pathArr = String(path.path).split("-");
      if (remove) {
        pathArr = pathArr.slice(0, pathArr.length - 1);
      }
      const delyCall = (fn, dely = 200) => {
        return new Promise(resolve => {
          setTimeout(() => {
            fn();
            resolve();
          }, dely);
        });
      };
      for (let i = 0, l = pathArr.length; i < l; i++) {
        //const currPath = pathArr[i];
        (async function(I) {
          await delyCall(() => {
            const span = document.querySelector(
              `span[data-id="${pathArr[I]}"]`
            );
            span?.previousSibling?.click();
          });
        })(i);
        //const currEle = document.querySelector("");
      }
      //点击当前行
      await delyCall(() => {
        const span = path.code
          ? Array.prototype.slice
              .apply(document.querySelectorAll(`td`))
              .filter(td => {
                const pattern = new RegExp(`${path.code}`);
                return pattern.test(td.innerText);
              })[0]
          : document.querySelector(
              `span[data-id="${pathArr[pathArr.length - 1]}"]`
            );
        const targetRow = path.code
          ? span?.parentNode
          : span?.parentNode?.parentNode?.parentNode;
        targetRow.click();
        targetRow.scrollIntoView();
      }, (pathArr.length + 1) * 200);
    },
    /**
     * 展开所有下级
     */
    unFoldAll() {
      this.isShowTable = false;
      this.$nextTick(function() {
        this.isShowTable = true;
        window.setTimeout(function() {
          this.expandAll();
        }, 300);
      });
    },
    /**
     * 收起所有下级
     */
    foldAll() {
      this.isShowTable = false;
      this.$nextTick(function() {
        this.isShowTable = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.auto-card {
  ::v-deep {
    .el-table__body-wrapper {
      overflow-y: scroll;
    }
  }
}
</style>
