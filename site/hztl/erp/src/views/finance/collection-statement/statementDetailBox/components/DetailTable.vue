<template>
  <ht-setting-table
    :data="tableData"
    :columns="fomatterTableColumns"
    :table-name="tableName"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import { FINANCE_PAYMENT_STATEMENT_DETAIL } from "@/constants";

export default {
  name: "DetailTable",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    canEdit: Boolean
  },
  data() {
    return {
      tableName: `${FINANCE_PAYMENT_STATEMENT_DETAIL.name}.collection`,
      tableColumns: FINANCE_PAYMENT_STATEMENT_DETAIL.columns
    };
  },
  computed: {
    fomatterTableColumns() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function remove(row, e) {
        e.stopPropagation();
        self.remove(row);
      }
      return this.tableColumns
        .filter(item => this.canEdit || item.type !== "controls")
        .map(item => {
          if (item.type === "controls") {
            return {
              ...item,
              render: (value, row) => (
                <span
                  on-click={e => remove(row, e)}
                  class="icon operation-icon icon-delete-info"
                />
              )
            };
          }
          return item;
        });
    }
  },
  methods: {
    remove(row) {
      this.$emit("remove-row", row.id);
    }
  }
};
</script>
