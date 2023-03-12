<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="page.options"
      :api="cbdApiProjectStoreExtraListGet"
    >
      <template #operatingStatusCell="{ record }">
        <a-switch
          v-model="record.operatingStatus"
          :checked-value="1"
          :unchecked-value="2"
          :disabled="useSwitchPermission('store:updateStatus')"
          @change="handleStatusChange(record.id, record.operatingStatus)"
        />
      </template>
      <template #menu="{ record }">
        <a-button type="text" @click="handleDetail(record)">查看</a-button>
      </template>
    </i-table>
    <detail
      v-if="page.showDetail"
      v-model="page.showDetail"
      :shop-id="page.shopId"
    />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import { Message } from '@arco-design/web-vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import {
    cbdApiProjectStoreExtraListGet,
    cbdApiProjectStoreExtraUpdateStatusIdPut
  } from '@/api';
  import type { CbdApiProjectStoreExtraListGetResponse } from '@/api';
  import useSwitchPermission from '@/hooks/useSwitchPermission';
  import Detail from './__components__/detail.vue';
  type RowData = Required<CbdApiProjectStoreExtraListGetResponse>['rows'][0];

  interface PageConfig {
    search?: object;
    options?: object;
    showConfigModal?: boolean;
    refresh?: boolean;
    showDetail?: boolean;
    modelTitle?: string;
    shopId?: number;
    menuOtherOptions?: any;
    config: any;
  }
  const page = reactive<PageConfig>({
    shopId: undefined,
    search: {},
    showConfigModal: false,
    refresh: false,
    showDetail: false,
    modelTitle: '编辑店铺信息',
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      menuSpan: 12,
      menuOptions: {
        width: 250
      },
      columns: [
        {
          label: '基本资料',
          prop: 'searchKey',
          placeholder: '请输入店铺名称 / 联系人 / 联系电话搜索',
          search: true,
          hide: true
        },
        {
          label: '店铺名称',
          prop: 'name'
        },
        {
          label: '所属商户',
          prop: 'merchantName'
        },
        {
          label: '联系电话',
          prop: 'linkTel'
        },
        {
          label: '营业时间',
          prop: 'openTimeDesc',
          ellipsis: true,
          tooltip: true,
          width: 250,
          formatter: (el: RowData) => el.openTimeDesc || '--'
        },
        {
          label: '特色服务',
          prop: 'feature',
          formatter: (el: RowData) => el.feature || '--'
        },
        {
          label: '地址',
          prop: 'addressDetail',
          formatter: (el: RowData) => el.addressDetail || '--'
        },
        {
          label: '营业状态',
          prop: 'operatingStatus',
          type: 'select',
          width: 100,
          search: true,
          dic: [
            { label: '营业中', value: '1' },
            { label: '打烊', value: '2' }
          ]
        }
      ]
    },
    config: {
      phone: ''
    }
  });
  const handleDetail = (item: RowData): void => {
    page.shopId = item.id;
    page.showDetail = !page.showDetail;
  };
  const params = ref<{ id: string; status: string }>({
    id: '',
    status: ''
  });
  const [updateStatus] = useFuncProxy(async () => {
    try {
      await cbdApiProjectStoreExtraUpdateStatusIdPut({
        ...params.value
      });
      Message.success('操作成功!');
    } catch (e) {
    } finally {
      setTimeout(() => {
        page.refresh = true;
      }, 500);
    }
  });
  const handleStatusChange = async (id: string, status: string) => {
    params.value.id = id;
    params.value.status = status;
    updateStatus();
  };
</script>

<style scoped></style>
