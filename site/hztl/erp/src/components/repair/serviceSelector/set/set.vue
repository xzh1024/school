<template>
  <div class="form-wrap">
    <el-form
      ref="form"
      :model="form"
      size="mini"
      label-width="90px"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="套餐编码">
            <el-input v-model="form.code" place-holder="编码" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="套餐名称">
            <el-input
              v-model="form.name"
              place-holder="名称/助记符"
              size="small"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="适用车辆级别" prop="category">
            <ht-select
              v-model="form.vehicleLevels"
              multiple
              filterable
              collapse-tags
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              />
            </ht-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="list()"
            >查询（F5）</el-button
          >
          <el-button type="primary" size="small" @click="reset"
            >重置（F6）</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <div class="content-wrap">
      <div class="left">
        <ht-setting-table
          :data="tableData"
          setting-all-column
          show-table-setting
          :columns="tableColumns"
          :selected-rows.sync="selectedRows"
          @row-dblclick="selectChange"
          style="height:500px;"
          table-name="work-orders-service"
          pagination
          :total="totalSize"
          :current-page.sync="currentPage"
          @pageChange="_handleSizeChange"
        />
      </div>
      <div class="right">
        <ht-card title="套餐内项目">
          <ht-setting-table
            :data="basePriceData"
            :enable-table-setting="false"
            :columns="basePriceColumns"
            show-summary
            :summary-method="getServiceSummaries"
            height="200px"
            table-name="basePrice"
          />
        </ht-card>
        <ht-card title="套餐内配件">
          <ht-setting-table
            :data="partData"
            :enable-table-setting="false"
            :columns="partColumns"
            show-summary
            :summary-method="getPartSummaries"
            height="200px"
            table-name="level"
          />
        </ht-card>
      </div>
    </div>
  </div>
</template>

<script>
import tableMixIn from "../mixIn/table";
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import {
  repairProjectCategoryDictionary,
  vehicleLevelDictionary
} from "@/utils/store";
import { listSets } from "@/api/repairs/sets";
import { mapState } from "vuex";
const defaultForm = {
  code: "",
  name: ""
};
export default {
  data() {
    return {
      showAddItemDiaglog: false,
      form: { ...defaultForm },
      selectedRows: [],
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
        },
        {
          prop: "code",
          label: "套餐编码",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "name",
          label: "套餐名称",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "amount",
          label: "套餐价",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "remark",
          label: "备注",
          width: CELL_WIDTH.multiple
        }
      ],
      currentPage: 1,
      totalSize: 0
    };
  },
  mixins: [tableMixIn],
  computed: {
    ...mapState("admin/table", ["pageSize"]),
    repairProjectCategoryList() {
      return repairProjectCategoryDictionary();
    },
    levels() {
      const levelList = vehicleLevelDictionary();
      console.log(levelList);
      return levelList;
    }
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      listSets({
        ...this.form,
        page: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        const { rows, totalSize } = res;
        this.tableData = rows || [];
        if (rows && rows.length) {
          this.selectedRows = [rows[0]];
          this.selectChange(rows[0]);
        }
        this.totalSize = totalSize;
      });
    },
    reset() {
      this.form = { ...defaultForm };
    },
    getServiceSummaries(param) {
      const { columns, data } = param;
      let totalChargeManHour = 0;
      let totalCheckManHour = 0;
      let totalManHourPrice = 0;
      let total = 0;
      data.forEach(item => {
        totalChargeManHour += +item.chargeManHour;
        totalCheckManHour += +item.checkManHour;
        totalManHourPrice += +item.manHourPrice;
        total += +Number(item.chargeManHour * item.manHourPrice).toFixed(2);
      });
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "chargeManHour":
            sums[index] = totalChargeManHour;
            break;
          case "checkManHour":
            sums[index] = totalCheckManHour;
            break;
          case "manHourPrice":
            sums[index] = Number(totalManHourPrice).toFixed(2);
            break;
          case "total":
            sums[index] = Number(total).toFixed(2);
            break;
          default:
            break;
        }
      });
      return sums;
    },
    getPartSummaries(param) {
      const { columns, data } = param;
      let total = 0;
      let qty = 0;
      data.forEach(item => {
        qty += +item.qty;
        total += +Number(item.qty * item.price).toFixed(2);
      });
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        switch (column.property) {
          case "qty":
            sums[index] = qty;
            break;
          case "total":
            sums[index] = Number(total).toFixed(2);
            break;
          default:
            break;
        }
      });
      return sums;
    },
    selectChange(e) {
      const { setItemDetails, setPartDetails } = e;
      if (setItemDetails) {
        const newArr = [];
        setItemDetails.forEach(subItem => {
          const itemInfp = subItem.item;
          const tem = { ...subItem, ...itemInfp };
          newArr.push(tem);
        });
        this.basePriceData = setItemDetails;
      } else {
        this.basePriceData = [];
      }
      if (setPartDetails) {
        const newArr = [];
        setPartDetails.forEach(item => {
          const partInfo = item.part;
          const tem = { ...item, ...partInfo };
          newArr.push(tem);
        });
        this.partData = newArr;
      } else {
        this.partData = [];
      }
      this.$forceUpdate();
    },
    handleAdd(e) {
      this.$emit("addSet", {
        ...e
      });
    },
    _handleSizeChange(page) {
      this.currentPage = page;
      this.list();
    }
  }
};
</script>
