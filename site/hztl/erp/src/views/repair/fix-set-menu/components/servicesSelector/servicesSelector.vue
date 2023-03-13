<template>
  <ht-dialog
    v-bind="$attrs"
    title="新增服务项目"
    width="1200px"
    v-on="$listeners"
  >
    <ht-card padding style="margin:5px;background:#fff;" class="form-wrap">
      <el-form ref="form" :model="form" size="mini" label-width="70px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="项目类型" prop="category">
              <ht-select
                v-model="form.categories"
                multiple
                collapse-tags
                :options="repairProjectCategoryList"
                filterable
                size="small"
                placeholder="请选择"
              >
              </ht-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="项目编码">
              <el-input v-model="form.code" placeholder="编码" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="项目名称">
              <el-input
                v-model="form.name"
                placeholder="名称/助记符"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-button type="primary" size="small" @click="listItems()"
              >查询（F5）</el-button
            >
            <el-button type="primary" size="small" @click="reset"
              >重置（F6）</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </ht-card>
    <div class="content-wrap">
      <div class="item-list">
        <ht-card class="auto-card" style="background: #fff;" title="项目列表">
          <ht-setting-table
            :data="tableData"
            @selectChange="selectChange"
            :enable-table-setting="true"
            :columns="tableColumns"
            pagination
            :total="totalSize"
            :current-page.sync="currentPage"
            @pageChange="_handleSizeChange"
            class="list-wrap"
            @row-dblclick="dbClik"
            table-name="kpi"
          />
        </ht-card>
      </div>
      <div class="item-price">
        <ht-card class="auto-card" style="background: #fff;" title="添加信息">
          <el-form
            ref="detailForm"
            :model="detailForm"
            :rules="rules"
            size="mini"
            label-width="130px"
          >
            <el-row :gutter="20">
              <el-form-item label="套餐内收费工时" prop="chargeManHour">
                <HtFormatNumber
                  v-model="detailForm.chargeManHour"
                  :min="1"
                  place-holder="套餐内收费工时"
                  precisionType="qty"
                  @change="qtyChange('chargeManHour', detailForm.chargeManHour)"
                />
              </el-form-item>
              <el-form-item label="套餐内考核工时" prop="checkManHour">
                <HtFormatNumber
                  v-model="detailForm.checkManHour"
                  :min="1"
                  place-holder="套餐内考核工时"
                  precisionType="qty"
                  @change="qtyChange('checkManHour', detailForm.checkManHour)"
                />
              </el-form-item>
              <el-form-item label="套餐内工时单价" prop="manHourPrice">
                <HtFormatNumber
                  v-model="detailForm.manHourPrice"
                  place-holder="套餐内工时单价"
                  :min="0"
                  precision-type="price"
                  @change="qtyChange('manHourPrice', detailForm.manHourPrice)"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="套餐内工时费用" prop="category">
                <el-input
                  disabled
                  v-model="fee"
                  place-holder="套餐内工时费用"
                  size="small"
                />
              </el-form-item>
              <el-form-item label="备注" prop="category">
                <el-input
                  v-model="detailForm.remark"
                  place-holder="备注"
                  size="small"
                />
              </el-form-item>
            </el-row>
          </el-form>
        </ht-card>
      </div>
    </div>
  </ht-dialog>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { repairProjectCategoryDictionary } from "@/utils/store";
import { listItems } from "@/api/repairs";
import { precisionsFixed } from "@/mixins";
import { mapState } from "vuex";
const defaultForm = {
  categories: [],
  code: "",
  name: "",
  commonUse: null,
  status: "enable"
};
export default {
  name: "ServicesSelector",
  data() {
    const controlsColumn = {
      prop: "controls",
      type: "controls",
      label: "操作",
      width: 30,
      cantExport: true,
      render: (_, row) => (
        <div>
          <el-tooltip enterable={false} placement="top" content="添加">
            <span
              on-click={e => this.handleAdd(row, e)}
              class="icon operation-icon el-icon-plus"
            />
          </el-tooltip>
        </div>
      )
    };
    return {
      currentItem: {},
      detailForm: {},
      form: {
        ...defaultForm
      },
      rules: {
        chargeManHour: [
          { required: true, message: "请输入套餐内收费工时", trigger: "blur" }
        ],
        checkManHour: [
          { required: true, message: "请输入套餐内考核工时", trigger: "blur" }
        ],
        manHourPrice: [
          { required: true, message: "请输入套餐内工时单价", trigger: "blur" }
        ]
      },
      showServiceEditor: false,
      currentPage: 1,
      totalSize: 0,
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
        controlsColumn,
        {
          prop: "code",
          label: "项目编码",
          width: CELL_WIDTH.date
        },
        {
          prop: "name",
          label: "项目名称",
          width: CELL_WIDTH.date
        },
        {
          prop: "categoryName",
          label: "项目类型",
          width: CELL_WIDTH.date
        },
        {
          label: "收费工时",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { prices } = row;
            if (!prices || !prices.length) return "";
            const { chargeManHour } = prices[0];
            return <span>{chargeManHour}</span>;
          }
        },
        {
          label: "考核工时",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { prices } = row;
            if (!prices || !prices.length) return "";
            const { checkManHour } = prices[0];
            return <span>{checkManHour}</span>;
          }
        },
        {
          label: "工时单价",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { prices } = row;
            if (!prices || !prices.length) return "";
            const { manHourPrice } = prices[0];
            return <span>{manHourPrice}</span>;
          }
        },
        {
          label: "工时成本价",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { prices } = row;
            if (!prices || !prices.length) return "";
            const { manHourCostPrice } = prices[0];
            return <span>{manHourCostPrice}</span>;
          }
        },
        {
          label: "收费金额",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { prices } = row;
            if (!prices || !prices.length) return "";
            const { chargeManHour, manHourPrice } = prices[0];
            const price = chargeManHour * manHourPrice;
            return <span>{price}</span>;
          }
        },
        {
          label: "成本金额",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { prices } = row;
            if (!prices || !prices.length) return "";
            const { chargeManHour, manHourCostPrice } = prices[0];
            const price = chargeManHour * manHourCostPrice;
            return <span>{price}</span>;
          }
        },
        {
          label: "常用项目",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { flags } = row;
            const { commonUse } = flags;
            return <span>{commonUse ? "是" : "否"}</span>;
          }
        },
        {
          label: "允许打折",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { flags } = row;
            const { discount } = flags;
            return <span>{discount ? "是" : "否"}</span>;
          }
        },
        {
          label: "是否停用",
          width: CELL_WIDTH.date,
          render: (_, row) => {
            const { flags } = row;
            const { status } = flags;
            return <span>{status === "disable" ? "是" : "否"}</span>;
          }
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.date
        }
      ]
    };
  },
  mixins: [precisionsFixed],
  watch: {
    "$attrs.visible": {
      handler() {
        this.listItems();
      },
      immediate: true
    }
  },
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    repairProjectCategoryList() {
      return repairProjectCategoryDictionary();
    },
    fee() {
      return this.detailForm.chargeManHour && this.detailForm.manHourPrice
        ? Number(
            this.detailForm.chargeManHour * this.detailForm.manHourPrice
          ).toFixed(2)
        : "";
    }
  },
  methods: {
    select(e) {
      this.currentItem = { ...e };
    },
    qtyChange(key, e) {
      const value = this.precisionFormat(e, "money");
      this.detailForm[key] = value;
      // this.$forceUpdate();
    },
    reset() {
      this.form = { ...defaultForm };
      this.listItems();
    },
    listItems() {
      listItems({
        ...this.form,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.tableData = rows || [];
        this.totalSize = totalSize;
      });
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.listItems();
    },
    dbClik(e) {
      this.handleAdd(e);
    },
    selectChange(e) {
      this.setDetailForm(e[0]);
    },
    setDetailForm(data) {
      if (!data) return;
      const { id, code, name, categoryName, prices, remark } = data;
      const {
        chargeManHour,
        checkManHour,
        manHourCostPrice,
        manHourPrice
      } = prices[0];
      this.detailForm = {
        code,
        name,
        categoryName,
        chargeManHour,
        checkManHour,
        manHourCostPrice,
        manHourPrice,
        id,
        remark
      };
    },
    handleAdd(row, e) {
      if (row.id !== this.detailForm.id) {
        this.setDetailForm(row);
      }
      if (e) {
        e.stopPropagation();
      }
      this.$nextTick(() => {
        this.$refs.detailForm.validate((valid, err) => {
          if (!valid) {
            const errTips = err[Object.keys(err)[0]][0].message;
            this.$message.warning({ message: errTips, showClose: true });
          } else {
            this.$emit("addService", {
              ...this.detailForm,
              itemId: this.detailForm.id,
              item: { ...row }
            });
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-icon-plus {
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
}
.form-wrap {
  overflow: hidden;
  ::v-deep {
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .pagination {
      padding: 3px 0 5px 0 !important;
    }
  }
}
.list-wrap {
  ::v-deep {
    .pagination {
      padding: 3px 0 5px 0 !important;
    }
  }
}
.content-wrap {
  height: 60vh;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  background: #fff;
  .item-list {
    width: 60%;
    margin-right: 8px;
  }
  .item-price {
    width: 40%;
  }
}
</style>
