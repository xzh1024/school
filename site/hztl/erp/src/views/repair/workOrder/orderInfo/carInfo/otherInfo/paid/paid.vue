<template>
  <div class="dialog-wrap">
    <ht-dialog
      v-bind="$attrs"
      title="已购详情"
      width="1200px"
      v-on="$listeners"
    >
      <div class="wrap">
        <ht-tabs v-model="activeTab" :tabs="tabs" class="tabs-regular" />
        <ht-setting-table
          v-show="activeTab == 'set'"
          :data="tableData"
          setting-all-column
          show-table-setting
          :columns="tableColumns"
          style="height:370px;"
          table-name="work-orders-service-paid"
        />
      </div>
    </ht-dialog>
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { getPaidGoods } from "@/api/platform";
export default {
  name: "dialog-name",
  props: {
    vehicleId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "$attrs.visible": {
      handler() {
        this.listSet();
      },
      immediate: true
    }
  },
  data() {
    return {
      activeTab: "set",
      tabs: [
        { name: "已购项目/套餐", id: "set" }
        // { name: "已购配件", id: "part" }
      ],
      setQuery: {
        types: [1, 2],
        sourceTypes: [1, 2],
        sortField: 1,
        sortType: 1
      },
      tableData: [],
      tableColumns: [
        {
          prop: "index",
          label: "序号",
          type: "index",
          width: CELL_WIDTH.index,
          cantHide: true,
          cantExport: true
        },
        {
          prop: "code",
          label: "项目/套餐编码",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            return this.formTypeToLable("code", row);
          }
        },
        {
          prop: "name",
          label: "项目/套餐名称",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            return this.formTypeToLable("name", row);
          }
        },
        {
          prop: "sourceType",
          label: "来源类型",
          width: CELL_WIDTH.multiple,
          formatter: value => {
            return value == 1 ? "会员卡服务" : "商品购买";
          }
        },
        {
          prop: "endDate",
          label: "有效期至",
          width: CELL_WIDTH.multiple,
          formatter: value => {
            if (!value) return "长期有效";
            return value;
          }
        },
        {
          prop: "qty",
          label: "剩余次数",
          width: CELL_WIDTH.multiple
        }
      ]
    };
  },
  methods: {
    listSet() {
      getPaidGoods({ vehicleId: this.vehicleId, ...this.setQuery }).then(
        res => {
          this.tableData = res || [];
        }
      );
    },
    cancelHandle() {
      this.$emit("close");
    },
    formTypeToLable(key, row) {
      if (!row) return;
      const { type, item, part, set, washing } = row;
      if (type == 1) {
        return item[key];
      }
      if (type == 2) {
        return set[key];
      }
      if (type == 3) {
        return part[key];
      }
      if (type == 4) {
        return washing[key];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .dialog-wrap {
//   ::v-deep {
//     .el-dialog {
//       top: 7vh !important;
//     }
//   }
// }
.wrap {
  height: 400px;
}
</style>
