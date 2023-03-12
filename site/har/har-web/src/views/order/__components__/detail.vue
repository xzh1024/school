<template>
  <drawer v-model="visible" title="查看订单" :footer="false">
    <div class="white-detail-box">
      <a-divider orientation="left">店铺信息</a-divider>
      <a-descriptions
        :column="4"
        layout="inline-horizontal"
        :label-style="{ marginBottom: '15px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="项目名称：">{{
            orderData.projectName
          }}</a-descriptions-item>
        <a-descriptions-item label="店铺名称：">{{
            orderData.storeName
          }}</a-descriptions-item>
        <a-descriptions-item label="店铺编号：" :span="2">{{
            orderData.storeCode
          }}</a-descriptions-item>
        <a-descriptions-item label="详细地址：">{{
            orderData.address
          }}</a-descriptions-item>
      </a-descriptions>
      <a-divider orientation="left">订单信息</a-divider>
      <a-descriptions
        :column="4"
        :label-style="{ marginBottom: '15px' }"
        :value-style="listItemStyle"
        layout="inline-horizontal"
      >
        <a-descriptions-item label="订单编号：">{{
            orderData.orderNo
          }}</a-descriptions-item>
        <a-descriptions-item label=" 订单金额（¥）：">{{
            orderData.orderTotalPrice
          }}</a-descriptions-item>
        <a-descriptions-item label="下单时间：">{{
            orderData.createTime
          }}</a-descriptions-item>
        <a-descriptions-item label="订单类型：">{{
            orderTypeHash[orderData.orderType]
          }}</a-descriptions-item>
      </a-descriptions>
      <a-divider orientation="left">订单收银信息</a-divider>
      <a-descriptions
        :column="4"
        layout="inline-horizontal"
        :label-style="{ marginBottom: '15px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="订单原价（¥）：">{{
            orderData.orderTotalPrice
          }}</a-descriptions-item>
        <a-descriptions-item label=" 小计（¥）：">{{
            orderData.payAmount
          }}</a-descriptions-item>
        <a-descriptions-item label="手动优惠（¥）：">{{
            orderData.discountAmount
          }}</a-descriptions-item>
        <a-descriptions-item label="支付通道费（¥）：">{{
            orderData.channelFee
          }}</a-descriptions-item>
      </a-descriptions>
      <a-divider orientation="left">支付方式信息</a-divider>
      <a-descriptions
        :column="4"
        layout="inline-horizontal"
        :label-style="{ marginBottom: '15px' }"
        :value-style="listItemStyle"
      >
        <a-descriptions-item label="现金支付（¥）：">{{
            orderData.cashAmt || '--'
          }}</a-descriptions-item>
        <a-descriptions-item label="微信支付（¥）：">{{
            orderData.wxAmt || '--'
          }}</a-descriptions-item>
        <a-descriptions-item label="支付宝支付（¥）：">{{
            orderData.alipayAmt || '--'
          }}</a-descriptions-item>
      </a-descriptions>
      <template v-if="orderData.orderType === 1">
        <a-divider orientation="left">订单商品信息</a-divider>
        <i-table :options="data.options" :data="orderData.prdList">
          <template #picCodeCell="{ record }">
            <a-image :src="record.prdPic" width="70"></a-image>
          </template>
          <template #prdNameCell="{ record }">
            {{ record.prdName }}
          </template>
        </i-table>
      </template>
      <template v-else>
        <a-divider orientation="left">订单场馆信息</a-divider>
        <i-table :options="data.optionsGym" :data="orderData.prdList"> </i-table>
      </template>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, computed, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { listItemStyle } from '@/utils/dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { cbdApiProjectOrderInfoGet } from '@/api';
  const orderTypeHash: Recordable = { 1: '商品订单', 2: '场馆订单' };
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    orderNo: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: 'goods'
    }
  });
  const emits = defineEmits(['update:modelValue']);
  const data = reactive<{ options: Recordable; optionsGym: Recordable }>({
    options: {
      indexTitle: '序号',
      index: true,
      menu: false,
      submitText: '搜索',
      tableCard: false,
      pageShow: false,
      columns: [
        {
          label: '商品名称',
          prop: 'prdName'
        },
        {
          label: '商品分类',
          prop: 'prdClassifyName'
        },
        {
          label: '品牌',
          prop: 'prdBrandName'
        },
        {
          label: '单位',
          prop: 'prdUnitName'
        },
        {
          label: '规格',
          prop: 'prdSpecNames'
        },
        {
          label: '图片',
          prop: 'picCode'
        },
        {
          label: '数量',
          prop: 'prdNum'
        },
        {
          label: '单价（¥）',
          prop: 'prdPrice'
        },
        {
          label: '销售金额（¥）',
          prop: 'prdTotalPrice'
        }
      ]
    },
    optionsGym: {
      indexTitle: '序号',
      index: true,
      menu: false,
      submitText: '搜索',
      tableCard: false,
      pageShow: false,
      columns: [
        {
          label: '场馆',
          prop: 'venueName'
        },
        {
          label: '销售商品',
          prop: 'prdName'
        },
        {
          label: '数量',
          prop: 'prdNum'
        },
        {
          label: '单价（¥）',
          prop: 'prdPrice'
        },
        {
          label: '销售金额（¥）',
          prop: 'prdTotalPrice'
        }
      ]
    }
  });
  const orderData: Ref = ref({});
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const [getData] = useFuncProxy(async () => {
    orderData.value = await cbdApiProjectOrderInfoGet({
      orderNo: props.orderNo
    });
  });
  onMounted(() => {
    if (props.orderNo) {
      getData();
    }
  });
</script>
