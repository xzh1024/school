<template>
  <a-modal
    v-model:visible="modalVisible"
    :mask-closable="false"
    :closable="false"
    title="关联店铺"
    :on-before-ok="onBeforeOk"
    :width="1000"
  >
    <a-divider orientation="left">商户信息</a-divider>

    <i-table
      v-model:selectedKeys="selectedKeys"
      v-model="search"
      :options="options"
      :api="cbdApiProjectIncomingAccStoreListGet"
    ></i-table>
  </a-modal>
</template>

<script lang="ts">
  export default {
    name: 'RelatedShop'
  };
</script>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import {
    cbdApiProjectIncomingAccRelationPut,
    cbdApiProjectIncomingAccStoreListGet
  } from '@/api';
  import ITable from '@/components/i-table/index.vue';
  import areaList from '@/utils/area.json';
  import { getFormatDic } from '@/utils/getDic';

  interface Props {
    merchantSelected: Array<number>;
    dataId: number | null;
    merchantId: number | null;
    modalVisible: boolean;
    checkList: any;
  }
  onMounted(() => {
    initDic();
  });

  const props = withDefaults(defineProps<Props>(), {
    merchantSelected: () => [],
    dataId: null,
    merchantId: null,
    modalVisible: false,
    checkList: []
  });
  const selectedKeys = ref<Array<number>>(props.checkList);
  const search = ref({
    accountId: props.dataId,
    merchantId: props.merchantId
  });
  const emits = defineEmits([
    'confirmMerchantSelect',
    'refresh',
    'update:modalVisible'
  ]);

  const formatList = ref<any>([]);

  const modalVisible = computed({
    get() {
      return props.modalVisible;
    },
    set(data) {
      emits('update:modalVisible', data);
    }
  });

  const options = computed<any>(() => {
    return {
      tableCard: false,
      menuSpan: 24,
      menu: false,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        }
      },
      columns: [
        {
          label: '店铺名称',
          search: true,
          prop: 'key',
          hide: true,
          ellipsis: true,
          tooltip: true,
          span: 8
        },
        {
          label: '店铺名称',
          prop: 'storeName',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '经营业态',
          span: 8,
          ellipsis: true,
          tooltip: true,
          prop: 'manageName'
        },
        {
          label: '经营业态',
          type: 'cascader',
          search: true,
          span: 8,
          hide: true,
          dic: formatList.value,
          prop: 'sceneId',
          props: {
            value: 'id',
            label: 'formatData'
          }
        },
        {
          label: '所属区域',
          span: 8,
          search: true,
          type: 'cascader',
          prop: 'districtCode',
          ellipsis: true,
          tooltip: true,
          dic: areaList,
          formatter: (record: any) => {
            const {
              provinceName = '',
              cityName = '',
              districtName = ''
            } = record;
            return `${provinceName}${cityName}${districtName}`;
          }
        },
        {
          label: '联系人',
          prop: 'contacts'
        },
        {
          label: '联系电话',
          prop: 'contactsPhone'
        }
      ]
    };
  });
  async function initDic() {
    try {
      formatList.value = await getFormatDic();
    } catch (e) {
      console.error(e);
    }
  }

  function onBeforeOk(done: (closed: boolean) => void) {
    async function beforeOk() {
      try {
        await cbdApiProjectIncomingAccRelationPut({
          id: props.dataId as number,
          storeIds: selectedKeys.value
        });
        emits('refresh');
        done(true);
      } catch (e) {
        done(false);
        console.error(e);
      }
    }
    beforeOk();
  }
</script>
