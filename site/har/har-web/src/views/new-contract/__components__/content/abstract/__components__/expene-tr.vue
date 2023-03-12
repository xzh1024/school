<template>
  <!--租金及费用（本合同签订费用项目共计-->
  <template v-if="1">
    <tr>
      <template v-for="(item, idx) of mergeColumns" :key="idx">
        <th :style="labelStyle">
          <span>{{ item.label }}</span>
        </th>
      </template>
    </tr>
    <template v-if="mergeData.length > 0">
      <template v-for="({ item1, item2 }, index) of mergeData" :key="index">
        <tr>
          <template v-for="(itm, idx) of mergeColumns" :key="idx">
            <td :style="labelStyle">
              <span>
                <template v-if="itm.form === 'columns'">
                  <template v-if="item1">
                    <component
                      :is="itm.render({ record: item1, rowIndex: index })"
                      v-if="itm.render"
                    />
                    <template v-else-if="itm.prop">{{
                      // @ts-ignore
                      item1[itm.prop]
                    }}</template>
                  </template>
                </template>
                <template v-else>
                  <template v-if="item2">
                    <component
                      :is="itm.render({ record: item2, rowIndex: index })"
                      v-if="itm.render"
                    />
                    <template v-else-if="itm.prop">{{
                      // @ts-ignore
                      item2[itm.prop]
                    }}</template>
                  </template>
                </template>
              </span>
            </td>
          </template>
        </tr>
      </template>
    </template>
    <template v-else>
      <template v-for="(itm, idx) of mergeColumns" :key="idx">
        <td :style="labelStyle">
          <span></span>
        </td>
      </template>
    </template>
  </template>
</template>

<script lang="ts">
  export default {
    name: 'AbstractExpenseTr'
  };
</script>

<script setup lang="ts">
  import { PropType, computed } from 'vue';
  import { Columns, ExpenseList } from '../interface';

  const emit = defineEmits(['update:columnNum']);
  const props = defineProps({
    labelStyle: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array as PropType<Columns>,
      default: () => []
    },
    columns2: {
      type: Array as PropType<Columns>,
      default: () => []
    },
    data: {
      type: Array as PropType<ExpenseList>,
      default: () => []
    },
    data2: {
      type: Array as PropType<ExpenseList>,
      default: () => []
    }
  });

  const mergeColumns = computed(() => {
    const columns: Columns = [];
    props.columns?.forEach((column) => {
      column.form = 'columns';
      columns.push(column);
    });
    props.columns2?.forEach((column) => {
      column.form = 'columns2';
      columns.push(column);
    });
    return columns;
  });

  const mergeData = computed(() => {
    const expenseList1: ExpenseList = props.data;
    const expenseList2: ExpenseList = props.data2;
    const res: Array<{
      item1: ExpenseList[number];
      item2: ExpenseList[number];
    }> = [];
    if (expenseList1 && expenseList2) {
      const idx = Math.max(expenseList1.length, expenseList2.length);
      for (let i = 0; i < idx; i++) {
        const item1 = expenseList1[i];
        const item2 = expenseList2[i];
        res.push({
          item1,
          item2
        });
      }
    }
    return res;
  });
</script>

<style lang="less" scoped></style>
