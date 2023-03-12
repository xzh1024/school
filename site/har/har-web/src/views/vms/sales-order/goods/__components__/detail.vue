<template>
  <drawer v-model="visible" title="查看订单" :footer="false">
    <div class="detail">
      <div class="i-card">
        <div class="block-title">店铺信息</div>
        <a-descriptions
          :column="4"
          table-layout="fixed"
          layout="vertical"
          :value-style="{ ...listItemStyle, marginBottom: '20px' }"
        >
          <a-descriptions-item label="项目名称：">{{
            orderData.projectName || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="店铺名称：">{{
            orderData.storeName || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="店铺编号：" :span="2">{{
            orderData.storeCode || '--'
          }}</a-descriptions-item>
          <a-descriptions-item label="详细地址：">{{
            orderData.address || '--'
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <div class="block-title">订单信息</div>
        <a-descriptions
          :column="4"
          table-layout="fixed"
          :label-style="{ marginBottom: '15px' }"
          :value-style="listItemStyle"
          layout="vertical"
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
            orderData.orderType === 1 ? '商品订单' : '场馆订单'
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <div class="block-title">订单收银信息</div>
        <a-descriptions
          table-layout="fixed"
          :column="4"
          layout="vertical"
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
            orderData.discountAmount || 0
          }}</a-descriptions-item>
          <a-descriptions-item label="支付通道费（¥）：">{{
            orderData.channelFee || 0
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <div class="i-card">
        <div class="block-title">支付方式信息</div>
        <a-descriptions
          table-layout="fixed"
          :column="4"
          layout="vertical"
          :label-style="{ marginBottom: '15px' }"
          :value-style="listItemStyle"
        >
          <a-descriptions-item label="现金支付（¥）：">{{
            orderData.cashAmt || 0
          }}</a-descriptions-item>
          <a-descriptions-item label="微信支付（¥）：">{{
            orderData.wxAmt || 0
          }}</a-descriptions-item>
          <a-descriptions-item label="支付宝支付（¥）：">{{
            orderData.alipayAmt || 0
          }}</a-descriptions-item>
          <!--      <a-descriptions-item label="pos刷卡支付（¥）：">{{-->
          <!--        orderData.posAmt || 0-->
          <!--      }}</a-descriptions-item>-->
          <!--      <a-descriptions-item label="其他支付（¥）：">{{-->
          <!--        orderData.otherAmt || 0-->
          <!--      }}</a-descriptions-item>-->
        </a-descriptions>
      </div>
      <div class="i-card">
        <template v-if="orderData.orderType === 1">
          <div class="block-title">订单商品信息</div>
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
          <div class="block-title">订单场馆信息</div>
          <i-table :options="data.optionsGym" :data="orderData.prdList" />
        </template>
      </div>
    </div>
  </drawer>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Drawer from '@/components/drawer/drawer.vue';
  import { listItemStyle } from '@/utils/dic';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    groundPcApiOrderInfoGet,
    type GroundPcApiOrderInfoGetResponse
  } from '@/api/ground-pc-api';
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
  const orderData = ref<GroundPcApiOrderInfoGetResponse>(
    {} as GroundPcApiOrderInfoGetResponse
  );
  const visible = computed({
    get() {
      return props.modelValue;
    },
    set(v) {
      emits('update:modelValue', v);
    }
  });
  const [getData] = useFuncProxy(async () => {
    orderData.value = await groundPcApiOrderInfoGet({
      orderNo: props.orderNo
    });
  });
  onMounted(() => {
    if (props.orderNo) {
      getData();
    }
  });
</script>
<style lang="less" scoped>
  .detail {
    padding-top: 4px;
    width: 100%;
    height: 100%;
    background-color: #efefef;
    .i-card {
      padding-top: 0;
    }
  }
</style>
