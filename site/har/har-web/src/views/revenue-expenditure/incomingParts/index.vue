<template>
  <div class="incomingParts">
    <i-table
      v-model="search"
      v-model:refresh-now="refresh"
      :api="cbdApiProjectIncomingAccListGet"
      :options="options"
    >
      <template #header>
        <a-button
          v-permission="['incoming:acc:save']"
          type="primary"
          @click="accountAdd"
          >新增账户</a-button
        >
      </template>
      <template #statusCell="{ record }">
        {{ record.status }}
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['incoming:acc:detail']"
          type="text"
          @click="accountView(record.id)"
          >查看</a-button
        >
      </template>
    </i-table>

    <incoming-edit
      :id="currentId"
      v-model="incomingVisible"
      @refresh="refreshChange"
    />
    <incoming-detail
      :id="currentId"
      ref="refDetail"
      v-model="detailVisible"
      @edit-change="editChange"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref, Ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';

  import { cbdApiProjectIncomingAccListGet } from '@/api';
  import { accStatusList, cardTypeList, StatusListType } from '@/utils/dic';
  import IncomingEdit from '@/views/revenue-expenditure/incomingParts/__components__/incoming-edit.vue';
  import IncomingDetail from '@/views/revenue-expenditure/incomingParts/__components__/incoming-detail.vue';
  import { getBusinessListDic } from '@/utils/getDic';

  const search: Ref = ref({});
  const incomingVisible = ref<boolean>(false);
  const refresh = ref(false);
  const refDetail = ref<any>(null);

  const options = computed(() => {
    return {
      submitText: '搜索',
      tableCard: true,
      index: true,
      align: 'center',
      menuSpan: 24,
      columns: [
        {
          label: '账户名称',
          prop: 'accountName',
          search: true
        },
        {
          label: '入账卡号',
          prop: 'bankCardNo'
        },
        {
          label: '入账卡类型',
          prop: 'cardType',
          search: true,
          type: 'select',
          dic: cardTypeList,
          formatter: (record: any) => {
            return cardTypeList.find(
              (i: StatusListType) => i.value === record.cardType
            )?.label;
          }
        },
        {
          label: '商户全称',
          prop: 'merName'
        },
        {
          label: '法人姓名',
          prop: 'legalName'
        },
        {
          label: '经营范围',
          prop: 'categoryName'
        },
        {
          label: '经营范围',
          prop: 'categoryId',
          search: true,
          type: 'cascader',
          dic: businessList.value,
          hide: true
        },
        {
          label: '状态',
          prop: 'status',
          search: true,
          type: 'select',
          dic: accStatusList,
          formatter: (record: any) => {
            return accStatusList.find(
              (i: StatusListType) => i.value === record.status
            )?.label;
          }
        }
      ]
    };
  });
  onMounted(() => {
    initDic();
  });
  const currentId: Ref = ref();
  const detailVisible = ref<boolean>(false);
  const businessList = ref([]);

  async function accountAdd() {
    currentId.value = null;
    incomingVisible.value = true;
  }
  async function initDic() {
    try {
      businessList.value = await getBusinessListDic();
    } catch (e) {
      console.error(e);
    }
  }

  function accountView(val: number) {
    currentId.value = val;
    detailVisible.value = true;
  }
  function editChange() {
    incomingVisible.value = true;
  }
  function refreshChange() {
    refresh.value = true;
    if (detailVisible.value) refDetail.value?.getInfo();
  }
</script>
