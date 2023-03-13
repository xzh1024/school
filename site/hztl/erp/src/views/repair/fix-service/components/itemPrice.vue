<template>
  <ht-card class="auto-card" title="项目定价">
    <div class="table-row" v-if="basePriceData.length">
      <div class="row-title">基础价格</div>
      <div class="row-table">
        <ht-setting-table
          :data="basePriceData"
          :enable-table-setting="false"
          :indexColumn="false"
          :columns="basePriceColumns"
          table-name="basePrice-table"
          style="height:58px;"
        />
      </div>
    </div>
    <div class="table-row" v-if="levelData.length">
      <div class="row-title">
        按车辆级别设置{{ useLevel ? "" : "（未启用）" }}
      </div>
      <div class="row-table">
        <ht-setting-table
          :data="levelData"
          :enable-table-setting="false"
          :columns="levelColumns"
          table-name="level-price"
          style="height:560px;over-flow-y:scroll;"
        />
      </div>
    </div>
  </ht-card>
</template>

<script>
import { CELL_WIDTH } from "@/constants/table-columns/cell-width";
import { baseDictionary } from "@/api/base/base";
export default {
  props: {
    currentItem: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    currentItem: {
      handler(val) {
        this.updateLevels();
        const { flags, prices } = val;
        let useLevel = false;
        if (flags) {
          useLevel = flags.useLevel;
        }
        const basePriceData = [];
        const levelData = [];
        if (prices) {
          prices.forEach(item => {
            if (item.vehicleLevel) {
              levelData.push(item);
            } else {
              basePriceData.push(item);
            }
          });
        }
        this.useLevel = useLevel;
        this.basePriceData = basePriceData;
        this.levelData = levelData;
      },
      deep: true
    }
  },
  data() {
    return {
      levelList: [],
      useLevel: false,
      basePriceData: [],
      basePriceColumns: [
        {
          prop: "chargeManHour",
          label: "收费工时",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "checkManHour",
          label: "考核工时",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "manHourPrice",
          label: "工时单价",
          width: CELL_WIDTH.multiple
        },
        {
          prop: "manHourCostPrice",
          label: "工时成本价",
          width: CELL_WIDTH.sex
        },
        {
          label: "收费金额",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { chargeManHour, manHourPrice } = row;
            const price = Number(chargeManHour * manHourPrice).toFixed(2);
            return <span>{price}</span>;
          }
        },
        {
          label: "成本金额",
          width: CELL_WIDTH.multiple,
          render: (_, row) => {
            const { chargeManHour, manHourCostPrice } = row;
            const price = Number(chargeManHour * manHourCostPrice).toFixed(2);
            return <span>{price}</span>;
          }
        }
      ],
      levelData: []
    };
  },
  computed: {
    levelColumns() {
      return [
        {
          prop: "vehicleLevel",
          label: "车辆级别",
          width: CELL_WIDTH.multiple,
          render: value => {
            return this.levelList.find(item => item.id === value)
              ? this.levelList.find(item => item.id === value).name
              : "-";
          }
        },
        ...this.basePriceColumns
      ];
    }
  },
  mounted() {
    this.updateLevels();
  },
  methods: {
    updateLevels() {
      baseDictionary({ type: "vehicleLevel" }).then(res => {
        this.levelList = res.options;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.auto-card {
  ::v-deep {
    .cell {
      text-align: right;
    }
  }
}
.table-row {
  margin-bottom: 10px;
  .row-title {
    margin-bottom: 5px;
  }
  .row-table {
    max-height: 300px;
  }
}
</style>
