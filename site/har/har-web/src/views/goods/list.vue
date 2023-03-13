<template>
  <div>
    <i-table
      v-model="search"
      :options="options"
      :api="cbdApiProjectStoreProductListGet"
    >
      <template #statusCell="{ record }">
        {{ shopGoodsStatusHash[record.status] }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['store:product:info']"
          type="text"
          @click="onViewDetail(record.id)"
          >查看</a-button
        >
      </template>
    </i-table>
    <detail :id="goodsId" v-model="show" />
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';
  import { shopGoodsStatusHash } from '@/utils/dic';
  import { useRoute } from 'vue-router';
  import {
    cbdApiProjectCommonProductAttributeBrandGet,
    cbdApiProjectCommonProductAttributeClassifyGet,
    cbdApiProjectStoreProductListGet
  } from '@/api';
  const route = useRoute();
  const search = ref<{
    retrievalStr?: string;
    classifyId?: number;
    brandId?: number;
    status?: number;
    storeId: string;
  }>({
    storeId: route.query.id as string
  });
  const options = reactive({
    menuSpan: 24,
    index: true,
    columns: [
      {
        label: '商品搜索',
        prop: 'retrievalStr',
        search: true,
        hide: true
      },
      {
        label: '商品名称',
        prop: 'name'
      },
      {
        label: '商品分类',
        prop: 'classifyId',
        type: 'select',
        search: true,
        hide: true,
        dicRequest: () => {
          return cbdApiProjectCommonProductAttributeClassifyGet({
            storeId: route.query.id as string
          });
        },
        props: {
          value: 'id',
          label: 'name'
        },
        options: {
          checkStrictly: true
        }
      },
      {
        label: '商品品牌',
        prop: 'brandId',
        type: 'select',
        search: true,
        hide: true,
        props: {
          value: 'id',
          label: 'name'
        },
        dicRequest: () => {
          return cbdApiProjectCommonProductAttributeBrandGet({
            storeId: route.query.id as string
          });
        }
      },
      {
        label: '商品分类',
        prop: 'classifyName'
      },
      {
        label: '商品规格数',
        prop: 'skuNum'
      },
      {
        label: '总销量',
        prop: 'salesVolume'
      },
      {
        label: '可售库存',
        prop: 'stockNum'
      },
      {
        label: '商品状态',
        prop: 'status',
        type: 'select',
        search: true,
        dic: [
          {
            label: '全部',
            value: ''
          },
          {
            label: '销售中',
            value: '1'
          },
          {
            label: '已售罄',
            value: '2'
          },
          {
            label: '已下架',
            value: '3'
          }
        ]
      },
      {
        label: '更新时间',
        prop: 'updateTime'
      }
    ]
  });
  const show = ref<boolean>(false);
  const goodsId = ref<number | undefined>(undefined);
  const onViewDetail = (id: number) => {
    show.value = true;
    goodsId.value = id;
  };
</script>
<style scoped lang="less"></style>
