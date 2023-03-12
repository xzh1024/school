<template>
  <a-card :body-style="{ padding: '20px 20px 10px' }">
    <h3>{{ t }} 至 {{ t2 }} </h3>
    <a-row style="margin-bottom: 50px" :gutter="30" justify="space-around">
      <a-col :span="4">
        <h4 class="title">销售统计</h4>
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #d9eafe">
              <a-image
                src="~@/assets/images/home/icon1.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div>订单金额</div>
            <div class="textItem">¥：{{ topCommon.orderMoney || 0 }}</div>
            <div>订单数量：{{ topCommon.orderNum }}</div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="4" :offset="1">
        <h4 class="title">退货统计</h4>
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #d9eafe">
              <a-image
                src="~@/assets/images/home/icon1.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div>退货金额</div>
            <div class="textItem">¥：{{ topCommon.returnOrderMoney || 0 }}</div>
            <div>订单数量：{{ topCommon.returnOrderNum || 0 }}</div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="4" :offset="1">
        <h4 class="title">优惠统计</h4>
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #d9eafe">
              <a-image
                src="~@/assets/images/home/icon1.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div>优惠金额</div>
            <div class="textItem"
              >¥：{{ topCommon.discountOrderMoney || 0 }}</div
            >
            <div>订单数量：{{ topCommon.discountOrderNum || 0 }}</div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="4" :offset="1">
        <h4 class="title">卡券核销统计</h4>
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #d9eafe">
              <a-image
                src="~@/assets/images/home/icon1.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div>卡券核销金额</div>
            <div class="textItem"
              >¥：{{ topCommon.verificationCouponMoney || 0 }}</div
            >
            <div>卡券核销单数：{{ topCommon.verificationCouponNum || 0 }}</div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="4" :offset="1">
        <h4 class="title">活动统计</h4>
        <a-row div style="display: flex; align-items: center">
          <a-col>
            <div class="iconItem" style="background-color: #d9eafe">
              <a-image
                src="~@/assets/images/home/icon1.png"
                :preview="false"
                width="26px"
              />
            </div>
          </a-col>
          <a-col class="rightItem">
            <div>活动核销金额</div>
            <div class="textItem"
              >¥：{{ topCommon.verificationActivityMoney || 0 }}</div
            >
            <div
              >活动核销单数：{{ topCommon.verificationActivityNum || 0 }}</div
            >
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="17">
        <sort-tab title="店铺销售排行" :btn-list="btnRange" @tab="onShopTab" />
        <i-table :options="shopOptions" :data="shopData" />
        <sort-tab title="场地排行" :btn-list="btnRange" @tab="onVenueTab" />
        <i-table :options="venueOptions" :data="venueData" />
        <sort-tab title="销量排行" :btn-list="btnRange" @tab="onGoodsTab" />
        <i-table :options="goodsOptions" :data="goodsData" />
      </a-col>
      <a-col :span="7">
        <sort-tab :sort="false" title="销售额业态占比" />
        <div style="width: 100%; height: 350px">
          <pie :options="chartData" />
        </div>
        <sort-tab :sort="false" title="合同到期预警" />
        <div class="warning">
          <div
            v-for="(item, idx) in list"
            :key="idx"
            class="flex justify-between align-center each"
          >
            <div class="type flex align-center">
              <span
                class="icon"
                :class="{
                  lessHalfYear: item.dataType === 4,
                  less15: item.dataType === 3,
                  less30: item.dataType === 2,
                  urgent: item.dataType === 1
                }"
              ></span>
              <h4 class="type">{{ contractExpireHash[item.dataType] }}</h4>
            </div>
            <h4
              v-if="item.num"
              class="number"
              @click="toDetail(item.dataType, item.num)"
              >{{ item.num }}份</h4
            >
            <h4 v-else>暂无</h4>
            <h4>{{ item.statisticsDate }}</h4>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { useRouter } from 'vue-router';
  import dayjs from 'dayjs';
  import type { BtnType } from '@/components/sort-tab/sort-type';
  import SortTab from '@/components/sort-tab/index.vue';
  import Pie from '@/components/i-chart/pie/index.vue';
  import { contractExpireHash } from '@/utils/dic';
  import {
    cbdApiProjectReportDayTotalGet,
    cbdApiProjectReportDayChartGet,
    cbdApiProjectReportStoreTopListSortGet,
    cbdApiProjectReportProductTopListSortGet,
    cbdApiProjectReportVenueTopListSortGet,
    type CbdApiProjectReportDayTotalGetResponse,
    type CbdApiProjectReportStoreTopListSortGetResponse,
    type CbdApiProjectReportVenueTopListSortGetResponse,
    type CbdApiProjectReportProductTopListSortGetResponse,
    type CbdApiProjectReportContractExpireGetResponse,
    type CbdApiProjectReportDayChartGetResponse,
    cbdApiProjectReportContractExpireGet
  } from '@/api';
  type ContractList = CbdApiProjectReportContractExpireGetResponse['datas'];
  /* 顶部数据 */
  const t = dayjs(Date.now()).format('YYYY-MM-DD') + ' 00:00:00';
  const t2 = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  const topCommon = ref<CbdApiProjectReportDayTotalGetResponse>({});
  const [getData] = useFuncProxy(async () => {
    topCommon.value = await cbdApiProjectReportDayTotalGet({});
  });
  const btnRange: BtnType = [
    { label: '按金额排行', value: '1' },
    { label: '按销量排行', value: '2' }
  ];
  const search = ref<{ sort: string }>({ sort: '1' });
  /* 店铺销售 */
  const shopOptions = ref<Recordable>({
    index: true,
    indexTitle: '序号',
    menu: false,
    pageShow: false,
    menuOtherOptions: {
      stripe: true
    },
    columns: [
      {
        label: '店铺名称',
        prop: 'storeName'
      },
      {
        label: '店铺号',
        prop: 'storeCode'
      },
      {
        label: '销售数量（sku数）',
        prop: 'sellNum'
      },
      {
        label: '销售金额（¥）',
        prop: 'sellMoney'
      }
    ]
  });
  const shopData = ref<CbdApiProjectReportStoreTopListSortGetResponse>([]);
  const [getShopData] = useFuncProxy(async () => {
    shopData.value = await cbdApiProjectReportStoreTopListSortGet(search.value);
  });
  const onShopTab = (e: string) => {
    search.value.sort = e;
    getShopData();
  };
  // 场地
  const venueOptions = ref<Recordable>({
    index: true,
    indexTitle: '序号',
    menu: false,
    pageShow: false,
    menuOtherOptions: {
      stripe: true
    },
    columns: [
      {
        label: '场地',
        prop: 'venueName'
      },
      {
        label: '时间',
        prop: 'week'
      },
      {
        label: '商品',
        prop: 'sku'
      },
      {
        label: '销售数量（sku数）',
        prop: 'totalNum'
      },
      {
        label: '销售金额（¥）',
        prop: 'totalMoney'
      }
    ]
  });
  const venueData = ref<CbdApiProjectReportVenueTopListSortGetResponse>([]);
  const [getVenueData] = useFuncProxy(async () => {
    venueData.value = await cbdApiProjectReportVenueTopListSortGet(
      search.value
    );
  });
  const onVenueTab = (e: string) => {
    search.value.sort = e;
    getVenueData();
  };
  // 商品
  const goodsOptions = ref<Recordable>({
    index: true,
    indexTitle: '序号',
    menu: false,
    pageShow: false,
    menuOtherOptions: {
      stripe: true
    },
    columns: [
      {
        label: '商品',
        prop: 'productName'
      },
      {
        label: '规格',
        prop: 'sku'
      },
      {
        label: '商品条码',
        prop: 'barcode'
      },
      {
        label: '销售数量（sku数）',
        prop: 'totalNum'
      },
      {
        label: '销售金额（¥）',
        prop: 'totalMoney'
      }
    ]
  });
  const goodsData = ref<CbdApiProjectReportProductTopListSortGetResponse>([]);
  const [getGoodsData] = useFuncProxy(async () => {
    goodsData.value = await cbdApiProjectReportProductTopListSortGet(
      search.value
    );
  });
  const onGoodsTab = (e: string) => {
    search.value.sort = e;
    getGoodsData();
  };
  // chart
  const chartData = ref<any>({});
  type ItemType = Required<CbdApiProjectReportDayChartGetResponse>['chart'][0];
  const [getChartData] = useFuncProxy(async () => {
    const { chart = [] } = await cbdApiProjectReportDayChartGet({});
    const formatData = chart.map((it: ItemType) => {
      return {
        name: it.name,
        value: it.value
      };
    });
    chartData.value = {
      grid: {
        top: '10%',
        left: '2%',
        bottom: '10%'
      },
      legend: {
        orient: 'vertical',
        right: '2%',
        bottom: 'center',
        itemGap: 15,
        formatter(name: string) {
          const item = formatData.find((el: any) => el.name === name);
          return name + '  ' + (item?.value || 0);
        },
        data: formatData
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['25%', '55%'],
          center: ['40%', '50%'],
          labelLine: {
            normal: {
              show: true,
              length: 15
            }
          },
          label: {
            normal: {
              position: 'outer',
              formatter: (data: any) => {
                const a = data.name;
                const b = data.percent.toFixed(0) + '%';
                return a + ':' + b;
              }
            }
          },
          data: formatData
        }
      ]
    };
  });
  // 合同到期
  const list = ref<ContractList>([]);
  const [getContractExpire] = useFuncProxy(async () => {
    const { datas = [] } = await cbdApiProjectReportContractExpireGet({});
    list.value = datas;
  });
  const router = useRouter();
  const toDetail = (type: number, num: number) => {
    router.push({ path: './home/expire-contract', query: { type, num } });
  };
  onMounted(() => {
    getData();
    getShopData();
    getVenueData();
    getGoodsData();
    getChartData();
    getContractExpire();
  });
</script>
<style scoped lang="less">
  .title {
    font-size: 18px;
    margin: 10px 0;
    font-weight: 600;
    color: #000000;
  }
  .iconItem {
    width: 66px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    border-radius: 50%;
  }

  .rightItem {
    min-width: 140px;
    margin-left: 12px;
    color: #666;
    font-size: 14px;

    .textItem {
      color: #0a7bff;
      font-size: 24px;
      margin: 10px 0;
    }

    .text {
      padding-top: 5px;
      color: #0a7bff;
      font-size: 16px;
    }
  }

  .warning {
    padding: 20px;
    .each {
      h4 {
        margin: 10px 0;
      }
      .type {
        width: 50%;
        white-space: nowrap;
      }
      .icon {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
        &.urgent {
          background-color: #ff0000;
        }
        &.less30 {
          background-color: #f8906c;
        }
        &.less15 {
          background-color: #ffa630;
        }
        &.lessHalfYear {
          background-color: #fbb6a7;
        }
      }
      .number {
        color: #0076f1;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
</style>
