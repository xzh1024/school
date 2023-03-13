<template>
  <ht-dialog :visible.sync="visible" title="价格查看" width="400px">
    <ht-table
      :index-column="false"
      :show-header="false"
      :columns="columns"
      :data="formatPartData"
    />
    <div class="dialog-footer-align mt-1">
      <el-button
        v-delay-focus="visible"
        type="primary"
        size="mini"
        plain
        @click="closeDialog"
      >
        取消（Esc）
      </el-button>
    </div>
  </ht-dialog>
</template>
<script>
import Vue from "vue";
import eventBus from "@/event";
import hotkeys from "hotkeys-js";
import getNoPricePermTips from "@/utils/getNoPricePermTips";

let oldKeyScope;

export default Vue.extend({
  name: "PartPrice",
  data() {
    return {
      columns: [
        {
          label: "column1",
          prop: "column1"
        },
        {
          label: "column2",
          prop: "column2",
          classNames: "number-font"
        },
        {
          label: "column3",
          prop: "column3"
        },
        {
          label: "column4",
          prop: "column4",
          classNames: "number-font"
        }
      ],
      visible: false,
      formatPartData: []
    };
  },
  watch: {
    visible: {
      handler(val, oldVal) {
        if (val) {
          oldKeyScope = hotkeys.getScope();
          // 未绑定快捷键，设置为全局
          hotkeys.setScope();
        } else if (oldVal) {
          hotkeys.setScope(oldKeyScope);
        }
      }
    }
  },
  mounted() {
    eventBus.$on("global-part-price", this.showPartPrice);
  },
  destroyed() {
    eventBus.$off("global-part-price", this.showPartPrice);
    hotkeys.deleteScope(this.keyScope);
  },
  methods: {
    showPartPrice(partData) {
      this.formatPartData = [
        {
          column1: "零售价",
          column2: getNoPricePermTips(
            partData.salePrices ? partData.salePrices.retail : ""
          ),
          column3: "批发价二",
          column4: getNoPricePermTips(
            partData.salePrices ? partData.salePrices.wholesale2 : ""
          )
        },
        {
          column1: "平台价",
          column2: getNoPricePermTips(
            partData.salePrices ? partData.salePrices.platform : ""
          ),
          column3: "批发价三",
          column4: getNoPricePermTips(
            partData.salePrices ? partData.salePrices.wholesale3 : ""
          )
        },
        {
          column1: "调拨价",
          column2: getNoPricePermTips(
            partData.salePrices ? partData.salePrices.allot : ""
          ),
          column3: "批发价四",
          column4: getNoPricePermTips(
            partData.salePrices ? partData.salePrices.wholesale4 : ""
          )
        },
        {
          column1: "批发价",
          column2: getNoPricePermTips(
            partData.salePrices ? partData.salePrices.wholesale : ""
          ),
          column3: "进价",
          column4: getNoPricePermTips(
            partData.costPrices ? partData.costPrices.taxed : ""
          )
        },
        {
          column1: "批发价一",
          column2: getNoPricePermTips(
            partData.salePrices ? partData.salePrices.wholesale1 : ""
          ),
          column3: "未税进价",
          column4: getNoPricePermTips(
            partData.costPrices ? partData.costPrices.untaxed : ""
          )
        }
      ];
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
    }
  }
});
</script>
