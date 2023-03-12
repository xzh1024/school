<template>
  <div v-if="page.shopList && page.shopList.length" class="wrapper">
    <a-card class="tab-card">
      <a-select
        :style="{ width: '280px', marginBottom: '10px' }"
        placeholder="请选择营销玩法"
        :default-value="page.shopList[0] && page.shopList[0].value"
      >
        <a-option
          v-for="(item, idx) in page.shopList"
          :key="idx"
          :value="item.value"
          >{{ item.label }}</a-option
        >
      </a-select>
    </a-card>
    <div class="cards-box">
      <div v-for="(item, idx) in cardTypeList" :key="idx" class="each-card">
        <div class="each-left">
          <div class="coupon-title">{{ item.name }}</div>
          <p>{{ item.des }}</p>
        </div>
        <div
          v-permission="['market:coupon:add']"
          class="each-right"
          @click="addCouponByType(item.type)"
          >新增</div
        >
      </div>
    </div>
    <i-table
      v-model:refresh-now="page.refresh"
      v-model="page.search"
      :options="page.options"
      :page="page.pageOptions"
      :api="cbdApiProjectMarketCouponPageGet"
      @reset="handleReset"
    >
      <template #header>
        <a-tabs default-active-key="" @change="changeTab">
          <a-tab-pane key="" title="全部"></a-tab-pane>
          <a-tab-pane key="1" title="进行中"></a-tab-pane>
          <a-tab-pane key="2" title="已结束"></a-tab-pane>
          <a-tab-pane key="3" title="已作废"></a-tab-pane>
        </a-tabs>
      </template>
      <template #statusCell="{ record }">
        {{ couponStatusHash[record.status] || '--' }}
      </template>
      <template #typeCell="{ record }">
        {{ couponTypeHash[record.type] || '--' }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-if="record.status === 1"
          v-permission="['market:coupon:nullify']"
          type="text"
          @click="handleAbandonCoupon(record)"
          >作废</a-button
        >
        <a-button
          v-permission="['market:coupon:info']"
          type="text"
          @click="handleViewDetail(record)"
          >查看</a-button
        >
      </template>
    </i-table>
    <detail
      v-if="page.detailVisible"
      :id="String(page.currentId)"
      v-model="page.detailVisible"
      :type="String(page.type)"
      @refresh="page.refresh = true"
    />
    <edit
      v-if="page.editVisible"
      v-model="page.editVisible"
      :type="String(page.type)"
      @refresh="page.refresh = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    cbdApiProjectMarketCouponNullifyIdGet,
    cbdApiProjectMarketCouponPageGet
  } from '@/api';
  import Detail from './__components__/detail.vue';
  import Edit from './__components__/edit.vue';
  import { Modal } from '@arco-design/web-vue';
  import {
    couponStatusHash,
    couponTypeList,
    couponTypeHash
  } from '@/utils/dic';
  import type { CbdApiProjectMarketCouponPageGetResponse } from '@/api';
  type RowData = Required<CbdApiProjectMarketCouponPageGetResponse>['rows'][0];
  interface PageConfig {
    search: { status: string | number };
    pageOptions: { current: number };
    detailVisible: boolean;
    editVisible: boolean;
    refresh: boolean;
    type: number | undefined;
    currentId: number | undefined;
    shopList: Array<{ label: string; value: number }>;
    options: any;
  }

  const cardTypeList: Array<{ name: string; des: string; type: number }> = [
    {
      name: '满减券',
      des: '例：满100元减10元',
      type: 1
    },
    {
      name: '折扣券',
      des: '例：满100元打8折',
      type: 2
    },
    {
      name: '礼品券',
      des: '例：500元当1000元用需用户购买',
      type: 3
    },
    {
      name: '积分现金券',
      des: '例：1000积分当10元现金用需用户使用积分购买',
      type: 4
    }
  ];
  const page = reactive<PageConfig>({
    search: {
      status: ''
    },
    pageOptions: {
      current: 1
    },
    detailVisible: false,
    editVisible: false,
    refresh: false,
    type: undefined,
    currentId: undefined,
    shopList: [{ label: '优惠券', value: 1 }],
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 12,
      columns: [
        {
          label: '优惠券名称',
          prop: 'name',
          placeholder: '请输入优惠券名称搜索',
          search: true,
          span: 6
        },
        {
          label: '类型',
          prop: 'type',
          search: true,
          type: 'select',
          dic: couponTypeList
        },
        {
          label: '使用门槛',
          prop: 'threshold'
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '发放数量',
          prop: 'stock'
        },
        {
          label: '已领取',
          prop: 'receivedNum'
        },
        {
          label: '已使用',
          prop: 'usedNum'
        }
      ]
    }
  });
  const changeTab = (v: string | number) => {
    page.search.status = v;
    page.pageOptions.current = 1;
    page.refresh = true;
  };
  function handleViewDetail(record: RowData) {
    page.type = record.type;
    page.currentId = record.id;
    page.detailVisible = true;
  }
  function addCouponByType(type: number) {
    page.editVisible = true;
    page.type = type;
  }
  async function handleAbandonCoupon(record: RowData) {
    Modal.open({
      title: '作废',
      content: '请确认是否作废当前优惠券？',
      onOk: async () => {
        await cbdApiProjectMarketCouponNullifyIdGet({
          id: String(record.id)
        });
        page.refresh = true;
      }
    });
  }
  function handleReset() {}
  onMounted(() => {});
</script>

<style scoped lang="less">
  .cards-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 0;

    .each-card {
      display: flex;
      width: 24%;
      height: 120px;
      background-color: #fff;
      border: 2px solid #dde7fe;

      .each-left {
        width: 70%;
        height: 100%;
        padding: 20px;
        color: #285afa;
        background-color: #dde7fe;

        .coupon-title {
          font-weight: bold;
          font-size: 20px;
        }
      }

      .each-right {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
        color: #285afa;
        cursor: pointer;
      }
    }
  }

  .tab-card {
    :deep(.arco-card-body) {
      padding-bottom: 5px;
    }
  }

  :deep(.arco-tabs-nav) {
    padding-bottom: 5px;
    background-color: #fff;
  }

  :deep(.arco-tabs-content) {
    padding-top: 0;
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80vh;
    background-color: #fff;
  }
</style>
