<template>
  <drawer v-model="visible" title="活动详情查询" :footer="false">
    <div class="detail-box">
      <div class="block-title">基本信息</div>
      <a-descriptions
        :column="3"
        layout="vertical"
        style="padding-bottom: 16px"
        :label-style="{ marginBottom: '20px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="项目：">{{
          detail.projectName
        }}</a-descriptions-item>
        <a-descriptions-item label="活动名称："
          >{{ detail.name }}
        </a-descriptions-item>
        <a-descriptions-item label="促销活动编号：">
          {{ detail.code }}</a-descriptions-item
        >
        <a-descriptions-item label="活动时间："
          >{{ detail.startTime }} - {{ detail.endTime }}
        </a-descriptions-item>
      </a-descriptions>
      <div class="split-bg"></div>
      <div class="block-title">活动规则</div>
      <a-descriptions
        :column="4"
        layout="vertical"
        :label-style="{ marginBottom: '10px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="活动场景：">{{
          valueFindLabel(cardActivitySceneList, detail.scene)
        }}</a-descriptions-item>
        <a-descriptions-item label="活动类型：">
          {{
            valueFindLabel(cardActivityTypeList, detail.type)
          }}</a-descriptions-item
        >
        <a-descriptions-item label="活动预算（¥）：">
          {{ formatPrice(detail.budget) }}</a-descriptions-item
        >
        <a-descriptions-item label="剩余预算（¥）：">
          {{ formatPrice(detail.balanceBudget) }}</a-descriptions-item
        >
      </a-descriptions>
      <i-table :options="ruleOptions" :data="detail.rangeList">
        <template #rangeCell="{ record }">
          {{ formatPrice(record.start)
          }}{{ record.end ? '-' + formatPrice(record.end) : ' 以上' }}
        </template>
      </i-table>
      <div class="split-bg" style="margin-top: 20px"></div>
      <div class="block-title">活动明细</div>
      <i-table
        v-model="search"
        :options="options"
        :api="svcWebActivityStatRechargePageGet"
      />
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, Ref, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { valueFindLabel, formatPrice } from '@/utils';
  import { listItemStyle } from '@/utils/dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cardActivitySceneList, cardActivityTypeList } from '@/utils/dic';
  import {
    svcWebActivityStatInfoIdGet,
    svcWebActivityStatRechargePageGet,
    type SvcWebActivityStatInfoIdGetResponse,
    type SvcWebActivityStatRechargePageGetResponse
  } from '@/api/svc-web';

  type RowData = Required<SvcWebActivityStatRechargePageGetResponse>['rows'][0];
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  });
  const emits = defineEmits(['update:modelValue', 'update:refresh', 'edit']);
  const search = ref<{ id?: number }>({ id: Number(props.id) });
  const options = reactive({
    index: true,
    indexTitle: '序号',
    tableCard: false,
    menu: false,
    menuOtherOptions: {
      scroll: {
        x: '140%'
      }
    },
    columns: [
      {
        label: '时间',
        prop: 'createTime',
        width: 200,
        align: 'center',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '流水号/单号',
        prop: 'orderNo',
        width: 200,
        align: 'center',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '卡名',
        prop: 'cardName',
        ellipsis: true,
        width: 120,
        align: 'center',
        tooltip: true
      },
      {
        label: '卡号',
        prop: 'cardCode',
        ellipsis: true,
        width: 180,
        align: 'center',
        tooltip: true
      },
      {
        label: '持卡人姓名',
        prop: 'memberName',
        width: 120,
        align: 'center',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '持卡人电话',
        width: 150,
        align: 'center',
        prop: 'phone'
      },
      {
        label: '收银员/操作员',
        width: 120,
        align: 'center',
        prop: 'createBy'
      },
      {
        label: '交易金额（¥）',
        width: 120,
        align: 'center',
        formatter: (el: RowData) => formatPrice(el.rechargeAmount),
        prop: 'rechargeAmount'
      },
      {
        label: '优惠金额',
        width: 120,
        align: 'center',
        prop: 'discountAmount',
        formatter: (el: RowData) => formatPrice(el.discountAmount)
      },
      {
        label: '卡内余额',
        width: 120,
        align: 'center',
        formatter: (el: RowData) => formatPrice(el.balance),
        prop: 'balance'
      }
    ]
  });

  const visible: Ref<boolean> = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const detail = ref<SvcWebActivityStatInfoIdGetResponse>(
    {} as SvcWebActivityStatInfoIdGetResponse
  );
  const label = computed(() => {
    return detail.value?.type === 'consume_discount'
      ? '消费折扣（折）'
      : detail.value?.type === 'discount'
      ? '折扣（折）'
      : detail.value?.type === 'gift'
      ? '赠送金额（元）'
      : '优惠金额（元）';
  });
  const ruleOptions = computed(() => {
    return {
      index: true,
      indexTitle: '序号',
      tableCard: false,
      menu: false,
      pageShow: false,
      columns: [
        {
          align: 'center',
          label: '购卡金额',
          prop: 'range'
        },
        {
          align: 'center',
          label: label.value,
          prop: 'amount'
        }
      ]
    };
  });
  const [getDetailData] = useFuncProxy(async () => {
    detail.value = await svcWebActivityStatInfoIdGet({
      id: props.id!
    });
  });
  onMounted(() => {
    getDetailData();
  });
</script>
<style scoped lang="less">
  .detail-box {
    width: 100%;
    padding: 0 16px 16px;
    background-color: #fff;
  }
</style>
