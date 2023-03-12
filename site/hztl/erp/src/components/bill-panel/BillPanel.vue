<template>
  <div class="bill-panel">
    <table>
      <tbody>
        <tr v-for="(item, index) in billEnum" :key="index">
          <td :title="item.label || ''" :style="labelStyle">
            {{ item.label || "" }}
          </td>
          <td :title="setDisplayValue(item)">
            {{ setDisplayValue(item) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { dateFormat, dateFormatFull } from "@/utils/date";

export default {
  name: "BillPanel",
  props: {
    billEnum: {
      type: Array,
      required: true
    },
    billData: {
      type: Object,
      required: true
    },
    labelWidth: {
      type: Number,
      required: false,
      default: 100
    }
  },
  computed: {
    labelStyle() {
      return {
        width: this.labelWidth + "px"
      };
    }
  },
  methods: {
    setDisplayValue(item) {
      let displayValue = "";
      let newValue = this.getPropValue(this.billData, item.value);
      if (item.enum) {
        newValue = item.enum[newValue];
      }
      switch (item.type) {
        case "date":
          displayValue = dateFormat(newValue);
          break;
        case "time":
          displayValue = dateFormatFull(newValue);
          break;
        default:
          displayValue = newValue;
          break;
      }
      return displayValue;
    },
    getPropValue(billData, value) {
      let displayValue = "";
      if (Array.isArray(value)) {
        if (value.length) {
          let newValue = billData;
          value.forEach(key => {
            newValue = newValue && newValue[key];
          });
          displayValue = newValue;
        }
      } else {
        displayValue = billData[value];
      }
      return displayValue;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.bill-panel {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    tr {
      td {
        width: 100%;
        height: 30px;
        padding-left: 10px;
        border: 1px solid #e8eaef;
        @include border_color("border-color-table");
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @include font_color("color-primary");
        &:first-child {
          @include font_color("table-color-primary");
          background-color: #f2f7f9;
          @include background_color("color-primary", 0.1);
        }
      }
    }
  }
}
</style>
