<template>
  <el-table
    ref="mytable2"
    :data="formatData"
    :row-style="showRow"
    v-bind="$attrs"
    @selection-change="handleSelectionChange"
  >
    <slot />
    <!--<el-table-column type="index" width="60"></el-table-column>-->
    <!---->
    <!--<el-table-column type="selection" width="60" ></el-table-column>-->
    <el-table-column v-if="columns.length === 0" width="150">
      <template slot-scope="scope">
        <span
          v-for="space in scope.row._level"
          :key="space"
          class="ms-tree-space"
        />
        <span
          v-if="iconShow(0, scope.row)"
          class="tree-ctrl"
          @click="toggleExpanded(scope.$index)"
        >
          <i v-if="!scope.row._expanded" class="el-icon-caret-bottom" />
          <i v-else class="el-icon-caret-top" />
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column
      v-for="(column, index) in columns"
      v-else
      :key="column.value"
      :label="column.text"
      :width="column.width"
    >
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <div v-if="index === 0">
          <span
            v-for="space in scope.row._level"
            :key="space"
            class="ms-tree-space"
          />
          <span
            v-if="iconShow(index, scope.row)"
            class="tree-ctrl"
            @click="toggleExpanded(scope.$index)"
          >
            <i v-if="!scope.row._expanded" class="el-icon-caret-top" />
            <i v-else class="el-icon-caret-bottom" />
          </span>
          <el-button
            type="text"
            size="mini"
            style="padding: 3px 0"
            @click="treeNodeClick(scope)"
          >
            {{ scope.row[column.value] }}
          </el-button>
        </div>
        <div v-else>
          {{ scope.row[column.value] }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from "./eval";
export default {
  name: "TreeTable",
  props: {
    // eslint-disable-next-line vue/require-prop-types
    selectList: {},
    /* eslint-disable */
		data: {
			type: [Array, Object],
			required: true
		},
		columns: {
			type: Array,
			default: () => []
		},
		evalFunc: Function,
		evalArgs: Array,
		expandAll: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		// 格式化数据源
		formatData: function() {
			let tmp;
			if (!Array.isArray(this.data)) {
				tmp = [this.data];
			} else {
				tmp = this.data;
			}
			const func = this.evalFunc || treeToArray;
			const args = this.evalArgs
				? Array.concat([tmp, this.expandAll], this.evalArgs)
				: [tmp, this.expandAll];
			return func.apply(null, args);
		}
	},
	methods: {
		handleSelectionChange: function(val) {
			this.$emit("selection", val);
		},
		showRow: function(row) {
			const show = row.row.parent
				? row.row.parent._expanded && row.row.parent._show
				: true;
			row.row._show = show;
			return show
				? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
				: "display:none;";
		},
		// 切换下级是否展开
		toggleExpanded: function(trIndex) {
			const record = this.formatData[trIndex];
			record._expanded = !record._expanded;
		},
		// 图标显示
		iconShow(index, record) {
			return index === 0 && record.children && record.children.length > 0;
		},
		treeNodeClick(scope) {
			this.$emit("tree-node-click", scope);
		}
	},
	mounted() {
		this.$refs.mytable2.toggleRowSelection(this.selectList);
	}
};
</script>
<style rel="stylesheet/css">
@keyframes treeTableShow {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@-webkit-keyframes treeTableShow {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>

<style lang="stylus" scoped>
$color-blue = #2196F3;
$space-width = 18px;

.ms-tree-space {
	position: relative;
	top: 1px;
	display: inline-block;
	font-style: normal;
	font-weight: 400;
	line-height: 1;
	width: $space-width;
	height: 14px;

	&::before {
		content: '';
	}
}

.processContainer {
	width: 100%;
	height: 100%;
}

table td {
	line-height: 26px;
}

.tree-ctrl {
	position: relative;
	cursor: pointer;
	color: $color-blue;
	margin-left: -$space-width;
}
</style>
