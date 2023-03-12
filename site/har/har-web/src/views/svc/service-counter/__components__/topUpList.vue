<template>
  <div class="margin-top-xl">
    <i-table
      v-model="search"
      v-model:page="page"
      :options="options"
      :api="svcWebServiceCounterRechargeHistoryMemberCardIdGet"
    >
      <template #menu="{ record }">
        <a-button type="text" @click="viewHandle(record)">查看</a-button>
      </template>
    </i-table>
    <i-modal
      v-if="visible"
      v-model="visible"
      :options="{ titleAlign: 'start', bodyStyle: { background: '#f7f7f7' } }"
      title="充值详情"
      :width="960"
      :footer="false"
    >
      <top-up-detail :id="currentId" />
    </i-modal>
  </div>
</template>
<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import { formatPrice } from '@/utils';
  import { computed, reactive, ref } from 'vue';
  import IModal from '@/components/i-modal/index.vue';
  import TopUpDetail from './topUpDetail.vue';
  import { svcWebServiceCounterRechargeHistoryMemberCardIdGet } from '@/api/svc-web';
  import { topUpList } from '@/utils/dic';

  interface listTypeItem {
    memberCardRechargeId?: number;
    type?: number;
    code?: string;
    paymentAmount?: number;
    discountAmount?: number;
    receivedAmount?: number;
    rechargeBy?: string;
    rechargeTime?: string;
  }

  const props = defineProps({
    id: {
      type: [String, Number]
    }
  });
  const visible = ref(false);
  const currentId = ref<string | number>('');
  const search = ref({ memberCardId: props.id });
  const page = reactive({
    pageSize: 10,
    current: 1,
    total: 0
  });
  interface listItemType {
    memberCardRechargeId?: number;
    type?: number;
    code?: string;
    paymentAmount?: number;
    discountAmount?: number;
    receivedAmount?: number;
    rechargeBy?: string;
    rechargeTime?: string;
  }
  const options = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      pageShow: !!page.total,
      menuOptions: {
        fixed: 'right',
        width: 90
      },
      columns: [
        {
          label: '类型',
          prop: 'type',
          width: 90,
          formatter: (record: listItemType) => {
            return topUpList.find((i) => i.value === record.type)?.label;
          }
        },
        {
          prop: 'code',
          label: '单号',
          width: 180
        },
        {
          prop: 'paymentAmount',
          label: '实付金额(￥)',
          width: 120,
          formatter: (received: listTypeItem) => {
            return formatPrice(received.paymentAmount || 0);
          }
        },
        {
          prop: 'discountAmount',
          label: '优惠金额(￥)',
          width: 120,
          formatter: (received: listTypeItem) => {
            return formatPrice(received.discountAmount || 0);
          }
        },
        {
          prop: 'receivedAmount',
          label: '充值到账(￥)',
          width: 120,
          formatter: (received: listTypeItem) => {
            return formatPrice(received.receivedAmount || 0);
          }
        },
        {
          prop: 'rechargeBy',
          label: '充值人',
          width: 90
        },
        {
          prop: 'rechargeTime',
          label: '充值时间',
          width: 170
        },
        {
          prop: 'activity',
          label: '活动',
          width: 120,
          ellipsis: true,
          tooltip: true
        }
      ]
    };
  });

  function viewHandle(record: listTypeItem) {
    // console.log(record);
    currentId.value = record.memberCardRechargeId || '';
    visible.value = true;
  }
</script>
