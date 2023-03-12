<template>
  <div class="margin-top-xl">
    <i-table
      v-model="search"
      v-model:page="page"
      :options="options"
      :api="svcWebServiceCounterReturnHistoryMemberCardIdGet"
    ></i-table>
  </div>
</template>
<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import { computed, reactive, ref } from 'vue';
  import { svcWebServiceCounterReturnHistoryMemberCardIdGet } from '@/api/svc-web';
  import { formatPrice } from '@/utils';

  const props = defineProps({
    id: {
      type: [String, Number]
    }
  });

  interface listItemType {
    /**
     * 支付方式:1现金
     */
    payWay?: number;
    /**
     * 金额
     */
    amount?: number;
  }
  const page = reactive({
    pageSize: 10,
    current: 1,
    total: 0
  });
  const search = ref({ memberCardId: props.id });
  const options = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      pageShow: !!page.total,
      menu: false,
      columns: [
        {
          prop: 'payWay',
          label: '退款方式',
          formatter: () => {
            return '现金';
          }
        },
        {
          prop: 'amount',
          label: '退款金额（¥）',
          formatter: (record: listItemType) => {
            return formatPrice(record.amount || 0);
          }
        }
      ]
    };
  });
</script>
