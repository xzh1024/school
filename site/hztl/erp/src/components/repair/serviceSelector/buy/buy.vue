<template>
  <div class="form-wrap">
    <el-form ref="form" :model="form" size="mini" label-width="90px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="来源类型" prop="category">
            <ht-select
              v-model="form.sourceTypes"
              has-selecte-all-val
              multiple
              filterable
              size="small"
              placeholder="请选择"
              :options="sourceTypesList"
            >
            </ht-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="排序" prop="category">
            <ht-select
              v-model="form.sortField"
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="item in sortFieldOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </ht-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="list()"
            >筛选（F5）</el-button
          >
        </el-col>
        <el-col :span="2">
          <el-button type="primary" size="small" @click="reset"
            >重置（F6）</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <ht-setting-table
      :data="tableData"
      setting-all-column
      show-table-setting
      :columns="tableColumns"
      style="height:470px;"
      table-name="work-orders-service-paid"
    />
  </div>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { getPaidGoods } from "@/api/platform";

const defaultForm = {
  types: [1, 2],
  sourceTypes: [1, 2, 3],
  sortField: 1,
  sortType: 1
};
export default {
  props: {
    vehicle: {
      type: Object,
      default: () => {}
    }
  },
  vehicle: {
    handler(value) {
      if (value) {
        console.log(value);
      }
    },
    immediate: true
  },
  data() {
    return {
      showServiceNew: false,
      form: { ...defaultForm },
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
          prop: "controls",
          type: "controls",
          label: "操作",
          width: 30,
          cantExport: true,
          render: (_, row) => {
            return row.qty > 0 ? (
              <el-tooltip
                v-if={row.qty > 0}
                enterable={false}
                placement="top"
                content="添加"
              >
                <span
                  on-click={e => this.handleAdd(row, e)}
                  class="icon operation-icon el-icon-plus"
                />
              </el-tooltip>
            ) : (
              ""
            );
          }
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
          prop: "qty",
          label: "剩余次数",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "sourceType",
          label: "来源类型",
          width: CELL_WIDTH.multiple,
          formatter: value => {
            const type = { 1: "会员卡", 2: "购买", 3: "赠品" };
            return type[value] || "";
          }
        },
        {
          prop: "endDate",
          label: "有效期至",
          width: CELL_WIDTH.multiple,
          formatter: value => {
            return value ? value : "永久有效";
          }
        },
        {
          prop: "createdAt",
          label: "购买时间",
          width: CELL_WIDTH.time
        }
      ],
      sortFieldOptions: [
        {
          name: "按有效期排序",
          value: 1
        },
        {
          name: "按购买日期排序",
          value: 2
        }
      ],
      sourceTypesList: [
        // 请求参数和返回参数的值不一样，就很奇怪
        {
          name: "会员卡",
          id: 1
        },
        {
          name: "购买",
          id: 2
        },
        {
          name: "赠品",
          id: 3
        }
      ]
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      const { vehicleId } = this.vehicle;
      getPaidGoods({
        vehicleId,
        ...this.form
      }).then(res => {
        this.tableData = res || [];
      });
    },
    reset() {
      this.form = { ...defaultForm };
    },
    formTypeToLable(key, row) {
      if (!row) return;
      console.log(row);
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
    },
    minusGoodsAmount(platformGoodsId) {
      this.tableData = this.tableData.map(item => {
        return {
          ...item,
          qty:
            item.platformGoodsId == platformGoodsId
              ? Number(item.qty) - 1
              : item.qty
        };
      });
    },
    handleAdd(e) {
      const type = {
        1: "addPaidService",
        2: "addPaidSet",
        3: "addPaidPart"
      };
      this.$emit(type[e.type], {
        ...e
      });
      // 手动去减数量
      this.minusGoodsAmount(e.platformGoodsId);
      //  else {
      //   this.tableData = this.tableData.filter(
      //     item => item.platformGoodsId != e.platformGoodsId
      //   );
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-wrap {
  ::v-deep {
    .el-row {
      margin: 10px 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
.el-icon-plus {
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
}
</style>
