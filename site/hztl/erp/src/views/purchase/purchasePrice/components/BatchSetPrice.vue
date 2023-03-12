<template>
  <ht-dialog
    v-bind="$attrs"
    title="库存售价批量调整"
    width="800px"
    v-on="$listeners"
  >
    <p class="stock-number-tips">当前选中库存记录 <span>300</span> 条</p>
    <ht-card title="价格调整" no-padding>
      <div slot="after-title" style="text-align: right">
        <el-checkbox v-model="isFilterNumber">
          取整(四舍五入)
        </el-checkbox>
      </div>
      <ht-table :loading="priceLoading" :data="priceList">
        <el-table-column prop="type" label="售价类型" min-width="100" />
        <el-table-column label="参考价格类型">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.priceType"
              placeholder="请选择"
              filterable
              size="mini"
            >
              <el-option
                v-for="item in SharePriceList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="加价比例(保留2位小数)">
          <template slot-scope="scope">
            <ht-input v-model="scope.row.price" size="mini" />
          </template>
        </el-table-column>
      </ht-table>
    </ht-card>

    <div style="margin-top: 10px; text-align: center;">
      <el-button type="primary" size="small" @click.stop="sureHandle">
        确定（F3）
      </el-button>
      <el-button size="small" @click.stop="hideBox">
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>

<script>
import { baseDictionary } from "@/api/base/base";

export default {
  name: "BatchSetPrice",
  data() {
    return {
      priceLoading: false,
      priceList: [
        { type: "零售价", priceType: "进价", price: "0.2" },
        { type: "平台价", priceType: "进价", price: "0.2" },
        { type: "调拨价", priceType: "进价", price: "0.2" },
        { type: "批发价", priceType: "进价", price: "0.2" },
        { type: "批发价一", priceType: "进价", price: "0.2" },
        { type: "批发价二", priceType: "进价", price: "0.2" },
        { type: "批发价三", priceType: "进价", price: "0.2" },
        { type: "批发价四", priceType: "进价", price: "0.2" }
      ],
      SharePriceList: [],
      isFilterNumber: true
    };
  },
  mounted() {
    baseDictionary({ type: "priceType" })
      .then(data => {
        this.SharePriceList = data.options;
      })
      .catch(() => {});
  },
  methods: {
    sureHandle() {
      this.hideBox();
    },
    hideBox() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="stylus" scoped>
.stock-number-tips
    background #e7ebed
    padding 6px 4px
    border-radius 4px
    span
        color #3aa7ff

/deep/.el-dialog__body
        padding 0 20px
</style>
