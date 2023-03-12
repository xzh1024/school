<template>
  <div>
    <div v-show="!batchData.length" class="batch-box">
      <ht-input
        v-model="batchText"
        :autosize="{ minRows: 7, maxRows: 7 }"
        :placeholder="placeholder"
        v-bind="$attrs"
        type="textarea"
        class="batch-input"
        @paste.native="batchPasteHandle"
        v-on="passListeners"
      />
    </div>
    <div v-show="batchData.length" class="batch-data-box">
      <el-row>
        <span style="line-height:32px">粘贴结果</span>
        <el-button
          type="primary"
          size="mini"
          style="float:right"
          @click="batchCancelhandle"
        >
          重新粘贴
        </el-button>
      </el-row>
      <ht-table
        :data="batchData"
        :index-column="false"
        border
        height="150"
        style="width: 100%;margin-top:10px"
      >
        <template v-for="(column, index) in batchTitle">
          <el-table-column
            :key="index"
            :prop="column.prop"
            :label="column.name"
            :min-width="column.width || ''"
          >
            <template slot-scope="scope">
              <template>{{ scope.row[column.prop] }}</template>
            </template>
          </el-table-column>
        </template>
      </ht-table>
    </div>
  </div>
</template>
<script>
import parsingCodesData from "@/utils/parsingCodesData";

const placeholder = `说明
1、从Excel文件中选择件号、采购数量两列复制。（超过两列，只识别前两列）。
2、也可以只复制一列，数量默认1。
3、选中本框执行「粘贴」操作。
4、查看粘贴结果，做查询前调整。
5、点击「查询」按钮进行查询。`;

const placeholderNoNum = `说明
1、从Excel文件中选择件号，如复制不是件号，不识别。
2、在这里执行「粘贴」操作。
3、查看粘贴结果，做查询前调整。
4、点击「确定」按钮进行查询。`;

export default {
  name: "ParsingCodes",
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default() {
        return [];
      }
    },
    noNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      batchText: "",
      batchTitle: [{ prop: "code", name: "配件编码", width: "70%" }]
    };
    if (this.noNum) {
      data.placeholder = placeholderNoNum;
    } else {
      data.placeholder = placeholder;
      data.batchTitle.push({ prop: "num", name: "数量", width: "30%" });
    }
    return data;
  },
  computed: {
    passListeners() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { change, input, ...others } = this.$listeners;
      return others;
    },
    batchData: {
      get() {
        return this.value;
      },
      set(data) {
        this.$emit("change", data);
      }
    }
  },
  mounted() {},
  methods: {
    batchCancelhandle() {
      this.batchText = "";
      this.batchData = [];
    },
    batchPasteHandle(e) {
      const listArr = parsingCodesData(e.clipboardData.getData("text/plain"));
      if (!listArr.length) {
        this.$message({
          type: "warning",
          message: "未检测到有效的粘贴内容"
        });
        return false;
      }
      this.batchData = listArr;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/base.styl';

.batch-input {
    height: 150px;
}
</style>
