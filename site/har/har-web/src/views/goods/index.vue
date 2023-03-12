<template>
  <a-card>
    <i-form v-model="search" :options="options">
      <template #menuForm>
        <a-button type="primary" @click="onSubmit">
          <template #icon>
            <slot name="submitIcon"><icon-search /></slot> </template
          >搜索
        </a-button>
        <a-button type="primary" @click="onReset">
          <template #icon>
            <slot name="resetIcon"><icon-refresh /></slot> </template
          >重置
        </a-button>
      </template>
    </i-form>
    <div class="flex align-center box">
      <a-card
        v-for="item in shopList"
        :key="item.id"
        class="each-shop"
        @click="onShopSelect(item)"
      >
        <template #title>{{ item.name }}</template>
        <div>
          <p>业态：{{ item.sceneNames }}</p>
          <p>店铺号：{{ item.code }}</p>
          <p class="address">{{ item.addressDetail }}</p>
        </div>
      </a-card>
    </div>
  </a-card>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import IForm from '@/components/i-form/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectStoreExtraListGet,
    type CbdApiProjectStoreExtraListGetResponse
  } from '@/api';
  type ShopItem = Required<CbdApiProjectStoreExtraListGetResponse>['rows'][0];
  const router = useRouter();
  const shopList = ref<ShopItem[]>([]);
  const options = ref({
    menuSpan: 18,
    formCard: false,
    submitText: '搜索',
    columns: [
      {
        label: '店铺搜索',
        prop: 'searchKey'
      }
    ]
  });
  const search = ref<{ searchKey: string }>({
    searchKey: ''
  });
  const [getData] = useFuncProxy(async () => {
    const res = await cbdApiProjectStoreExtraListGet({
      ...search.value
    });
    shopList.value = res.rows!;
  });
  function onSubmit() {
    getData();
  }
  function onReset() {
    search.value.searchKey = '';
    getData();
  }
  const onShopSelect = (shop: ShopItem) => {
    router.push({ path: '/goods/list', query: { id: shop.id } });
  };
  onMounted(() => {
    getData();
  });
</script>
<style scoped lang="less">
  .box {
    flex-wrap: wrap;
  }
  .each-shop {
    width: 24%;
    margin-right: 1.333%;
    margin-bottom: 20px;
    border-radius: 10px;
    cursor: pointer;
    filter: drop-shadow(0 0 3px #dddddd);
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover {
      transform: scale(1.02);
      transition: all 0.1s;
      filter: brightness(105%) drop-shadow(1px 1px 5px #dddddd);
    }
    .address {
      height: 20px;
    }
  }
</style>
