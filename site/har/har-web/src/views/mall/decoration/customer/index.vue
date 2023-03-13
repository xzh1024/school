<template>
  <i-table :options="page.options" :data="data">
    <template #phoneCell="{ record }">
      <a-input
        v-model="record.telephone"
        :disabled="useSwitchPermission('customer:service:edit')"
        @blur="onBlur(record)"
      ></a-input>
    </template>
  </i-table>
</template>

<script setup lang="ts">
  import { ref, Ref, reactive, onMounted } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useSwitchPermission from '@/hooks/useSwitchPermission';
  import {
    cbdApiProjectCustomerServiceListGet,
    cbdApiProjectCustomerServiceEditPost
  } from '@/api';
  import type { CbdApiProjectCustomerServiceListGetResponse } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  type RowData = CbdApiProjectCustomerServiceListGetResponse[0];

  const page = reactive<any>({
    options: {
      submitText: '搜索',
      indexTitle: '序号',
      index: true,
      tableCard: true,
      pageShow: false,
      menu: false,
      columns: [
        {
          label: '客服电话',
          prop: 'phone'
        },
        {
          label: '更新时间',
          prop: 'updateTime'
        }
      ]
    }
  });
  const data: Ref = ref([]);
  const [getData] = useFuncProxy(async () => {
    data.value = await cbdApiProjectCustomerServiceListGet({});
  });
  async function onBlur(record: RowData) {
    // const reg = /^1[3456789]\d{9}$/;
    // if (reg.test(record.telephone)) {
    //   await cbdApiProjectCustomerServiceEditPost({
    //     id: record.id,
    //     telephone: record.telephone
    //   });
    //   getData();
    // } else {
    //   Message.error('电话号码有误,请核对');
    // }
    await cbdApiProjectCustomerServiceEditPost({
      id: record.id!,
      telephone: record.telephone!
    });
    getData();
  }
  onMounted(() => {
    getData();
  });
</script>
<style scoped></style>
