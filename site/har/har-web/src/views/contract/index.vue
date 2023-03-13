<template>
  <div class="contract">
    <i-table
      v-model="search"
      v-model:refresh-now="refreshNow"
      :options="options"
    >
      <template #menu="{ record }">
        <a-button
          v-permission="['contract:info']"
          type="text"
          long
          @click="viewHandle(record)"
          >查看</a-button
        >
      </template>
      <template #header>
        <a-button v-permission="['contract:save']" type="primary" @click="add"
          >新建合同
          <template #icon>
            <icon-plus />
          </template>
        </a-button>
      </template>
    </i-table>
    <!--    <i-drawer v-model="drawerVisible" :title="title" :width="1200">-->
    <i-edit
      v-if="drawerVisible"
      :id="currentId"
      v-model="drawerVisible"
      @refresh="editRefresh"
    />
    <!--    </i-drawer>-->
    <!--    <i-drawer v-model="drawerViewVisible">-->
    <contract-detail
      :id="currentId"
      ref="refDetails"
      v-model="drawerViewVisible"
      @refresh="refreshNow = true"
      @edit-change="editHandle"
    ></contract-detail>
    <!--    </i-drawer>-->
  </div>
</template>

<script lang="ts">
  export default {
    name: 'Index'
  };
</script>

<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import { computed, Ref, ref } from 'vue';
  import { contractStatusList } from '@/utils/dic';
  import IEdit from '@/views/contract/__components__/edit.vue';
  // todo 老版的合同,api找不到了,所以注释了
  // import { cbdApiProjectContractListGet } from '@/api';
  import dayjs from 'dayjs';
  import ContractDetail from './__components__/contract-detail.vue';
  import useGetCompanyData from '@/hooks/useGetCompanyData';

  const search: Ref = ref({});
  const refDetails: Ref = ref(null);
  const refreshNow: Ref<boolean> = ref(false);
  const drawerVisible: Ref<boolean> = ref(false);
  const drawerViewVisible: Ref<boolean> = ref(false);
  const currentId: Ref<number | string> = ref('');
  const [companyList] = useGetCompanyData();
  const options = computed(() => {
    return {
      index: true,
      autoLabelWidth: true,
      align: 'center',
      submitText: '搜索',
      menuOptions: {
        width: 90
      },
      columns: [
        {
          label: '基本资料',
          prop: 'baseData',
          search: true,
          hide: true,
          placeholder: '请输入合同编号/承租企业搜索'
        },
        {
          label: '合同甲方',
          prop: 'ascriptionCompanyCode',
          hide: true,
          search: true,
          type: 'treeSelect',
          ellipsis: true,
          tooltip: true,
          dic: companyList.value,
          props: {
            key: 'value',
            title: 'label',
            children: 'children'
          }
        },
        {
          label: '合同编号',
          prop: 'code',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '合同甲方',
          prop: 'ascriptionCompanyName',
          type: 'select',
          ellipsis: true,
          tooltip: true,
          width: 100
        },
        {
          label: '承租企业',
          prop: 'merchantName',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '合同面积(㎡)',
          prop: 'acreage',
          width: 120
        },
        {
          label: '合同金额(￥)',
          prop: 'totalAmount',
          width: 120
        },
        {
          label: '合同开始时间',
          prop: 'periodStart',
          width: 120,
          formatter: (v: any) => {
            return dayjs(v.periodStart).format('YYYY-MM-DD');
          }
        },
        {
          label: '合同结束时间',
          prop: 'periodEnd',
          width: 120,
          formatter: (v: any) => {
            return dayjs(v.periodEnd).format('YYYY-MM-DD');
          }
        },
        {
          label: '状态',
          prop: 'status',
          search: true,
          width: 90,
          type: 'select',
          dic: contractStatusList,
          formatter: (v: any) => {
            return contractStatusList.find((i) => i.value === v.status)?.label;
          }
        }
      ]
    };
  });

  function viewHandle(record: any) {
    // console.log(record);
    currentId.value = record?.id as number;
    // drawerVisible.value = true;
    drawerViewVisible.value = true;
  }

  function add() {
    drawerVisible.value = true;
    currentId.value = '';
  }

  function editHandle() {
    drawerVisible.value = true;
  }

  function editRefresh() {
    refreshNow.value = true;
    if (drawerViewVisible.value) {
      refDetails.value?.getInfo();
    }
  }
</script>

<style scoped></style>
