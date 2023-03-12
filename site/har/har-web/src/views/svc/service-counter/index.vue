<template>
  <div>
    <i-table
      ref="tableRef"
      v-model:selectedKeys="selectedKeys"
      v-model="search"
      v-model:page="page"
      :options="options"
      :table-loading="loading"
      :data="data"
      @page-change="getList"
      @page-size-change="getList"
    >
      <template #menuForm>
        <a-button type="primary" class="btn" @click="searchHandle"
          >查询</a-button
        >
        <a-button type="primary" class="btn" @click="resetSearch"
          >重置</a-button
        >
        <a-button type="dashed" class="btn export" @click="exportHandle"
          >导出</a-button
        >
      </template>
      <template #header>
        <a-space>
          <a-button
            class="btn"
            type="primary"
            :disabled="
              !currentChecked.memberCardId || currentChecked.status !== 1
            "
            @click="topUpAddVisible = true"
            >充值</a-button
          >
          <a-button
            type="primary"
            :disabled="
              !currentChecked.memberCardId || currentChecked.status === 3
            "
            class="btn"
            @click="freezeVisible = true"
            >{{ checkedFreezeText }}</a-button
          >
          <a-button
            type="primary"
            :disabled="
              !currentChecked.memberCardId || currentChecked.status !== 1
            "
            class="btn"
            @click="refundCardVisible = true"
            >退卡</a-button
          >
        </a-space>
      </template>
      <template #menu="{ record }">
        <a-button type="text" @click="viewHandle(record)">查看</a-button>
      </template>
    </i-table>

    <i-drawer
      v-if="viewVisible"
      v-model="viewVisible"
      title="详情"
      :footer="false"
    >
      <i-view :id="currentViewId" />
    </i-drawer>
    <unfreeze-add
      v-if="freezeVisible"
      :id="currentChecked.memberCardId"
      v-model="freezeVisible"
      @update="getList"
    />
    <top-up-add
      v-if="topUpAddVisible"
      :id="currentChecked.memberCardId"
      v-model="topUpAddVisible"
      :project-id="search.projectId"
      @success="getList"
    />
    <refund-card-add
      v-if="refundCardVisible"
      :id="currentChecked.memberCardId"
      v-model="refundCardVisible"
      @update="getList"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import { valueCardStatusList } from '@/utils/dic';
  import IDrawer from '@/components/drawer/drawer.vue';
  import IView from './__components__/view.vue';
  import UnfreezeAdd from './__components__/freeze-operate.vue';
  import {
    svcWebCommonCardSelectListGet,
    SvcWebCommonCardSelectListGetResponse,
    svcWebCommonProjectSelectPost,
    SvcWebCommonProjectSelectPostResponse,
    svcWebServiceCounterExportGet,
    svcWebServiceCounterPageGet
  } from '@/api/svc-web';
  import { exportDownload, formatPrice } from '@/utils';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import RefundCardAdd from './__components__/refund-operate.vue';
  import TopUpAdd from '@/views/svc/service-counter/__components__/topUpAdd.vue';
  import { useRequest } from '@har/use';
  // import lsStore from '@/utils/ls-store';

  interface pageType {
    current: number;
    pageSize: number;
    total: number;
  }

  type listItemType = {
    memberCardId?: number;
    projectName?: string;
    cardName?: string;
    cardCode?: string;
    status?: number;
    memberName?: string;
    memberPhone?: string;
    rechargeAmount?: number;
    consumeAmount?: number;
    balance?: number;
    cardSoldDate?: string;
  };

  interface projectItemType {
    projectId?: number;
    cardId?: string;
    cardCode?: string;
    status?: string;
    memberInfo?: string;
    memberPhone?: string;
    cardSoldDateStart?: string;
    cardSoldDateEnd?: string;
    pageNum?: string;
    pageSize?: string;
    cardSoldDate?: string[];
  }

  const topUpAddVisible = ref(false);
  const refundCardVisible = ref(false);
  const freezeVisible = ref(false);
  const viewVisible = ref(false);
  const currentChecked = ref<any>({});
  const search = ref<projectItemType>({});
  const data = ref<listItemType[]>([]);
  const selectedKeys = ref([]);
  const page = reactive<pageType>({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const currentViewId = ref<number | string>('');

  onMounted(() => {});

  const [getList, loading] = useFuncProxy(async () => {
    const { pageSize, current } = page;
    const { cardSoldDate = [], projectId } = search.value;
    const [cardSoldDateStart, cardSoldDateEnd] = cardSoldDate;
    const res = await svcWebServiceCounterPageGet({
      ...search.value,
      projectId: projectId ? projectId + '' : undefined,
      cardSoldDateStart,
      cardSoldDateEnd,
      pageSize: pageSize + '',
      pageNum: current + ''
    });
    data.value = res?.rows || [];
    page.total = res?.total || 0;
    selectedKeys.value = [];
    currentChecked.value = {};
  });
  const projectList = ref<SvcWebCommonProjectSelectPostResponse>([]);
  useRequest(svcWebCommonProjectSelectPost, {
    onSuccess: (data) => {
      projectList.value = data;
      getList();
      getCardList({});
    }
  });

  // function setProjectId(v?: SvcWebCommonProjectSelectPostResponse) {
  //   const data = v || projectList.value;
  //   const projectId = lsStore.getItem('svcServiceProjectId');
  //   const item = data.find((i) => i.value === Number(projectId));
  //   if (projectId && item) {
  //     search.value.projectId = projectId;
  //   } else {
  //     const res = data[0].value;
  //     search.value.projectId = res;
  //   }
  // }

  const cardList = ref<SvcWebCommonCardSelectListGetResponse>([]);

  const { run: getCardList } = useRequest(svcWebCommonCardSelectListGet, {
    onSuccess(data) {
      cardList.value = data;
    }
  });

  const options = computed(() => {
    return {
      menuSpan: 6,
      index: true,
      indexTitle: '序号',
      menuOtherOptions: {
        rowKey: 'memberCardId',
        rowSelection: {
          type: 'checkbox'
        },
        onSelect: (e: number[]) => {
          const [v] = e;
          currentChecked.value =
            data.value?.find((i) => i.memberCardId === v) || {};
          rowCheckSelection(data.value);
        }
      },
      menuOptions: {
        fixed: 'right',
        width: 90
      },
      columns: [
        {
          prop: 'projectName',
          label: '项目',
          width: 120,
          ellipsis: true,
          tooltip: true
        },
        {
          label: '项目',
          prop: 'projectId',
          dic: projectList.value,
          type: 'select',
          hide: true,
          search: true,
          options: {
            allowSearch: true
          }
        },
        {
          prop: 'cardName',
          label: '卡名',
          ellipsis: true,
          tooltip: true,
          width: 120
        },
        {
          label: '卡名',
          prop: 'cardId',
          type: 'select',
          dic: cardList.value,
          search: true,
          hide: true,
          options: {
            allowSearch: true
          }
        },
        {
          prop: 'memberCardCode',
          label: '卡号',
          search: true,
          ellipsis: true,
          tooltip: true,
          width: 160,
          options: {
            maxLength: 20
          }
        },
        {
          prop: 'status',
          label: '当前状态',
          type: 'select',
          width: 90,
          options: {
            allowSearch: true
          },
          search: true,
          dic: valueCardStatusList,
          formatter: (record: listItemType) => {
            return valueCardStatusList.find((i) => i.value === record.status)
              ?.label;
          }
        },
        {
          prop: 'memberInfo',
          label: '会员名称/会员号',
          search: true,
          hide: true,
          options: {
            maxLength: 20
          }
        },
        {
          prop: 'memberPhone',
          label: '会员手机号',
          search: true,
          hide: true,
          options: {
            maxLength: 11
          }
        },
        {
          prop: 'cardSoldDate',
          label: '售卡时间',
          type: 'dateRange',
          search: true,
          hide: true
        },
        {
          prop: 'memberCode',
          label: '持卡人编号',
          width: 160,
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'memberName',
          label: '持卡人姓名',
          width: 130,
          ellipsis: true,
          tooltip: true
        },
        {
          prop: 'memberPhone',
          label: '持卡人电话',
          width: 130
        },
        {
          prop: 'rechargeAmount',
          label: '累计充值(￥)',
          width: 120,
          formatter: (record: listItemType) => {
            return formatPrice(record.rechargeAmount || 0);
          }
        },
        {
          prop: 'consumeAmount',
          label: '累计消费(￥)',
          width: 120,
          formatter: (record: listItemType) => {
            return formatPrice(record.consumeAmount || 0);
          }
        },
        {
          prop: 'balance',
          label: '当前余额(￥)',
          width: 120,
          formatter: (record: listItemType) => {
            return formatPrice(record.balance || 0);
          }
        },
        {
          prop: 'cardSoldDate',
          label: '售卡时间',
          width: 180
        }
      ]
    };
  });

  const checkedFreezeText = computed(() => {
    const { memberCardId, status } = currentChecked.value;
    if (!memberCardId || status === 3) return '冻结/解冻';
    if (status === 1) {
      return '冻结';
    }
    return '解冻';
  });
  function viewHandle(record: listItemType) {
    console.log(record);
    currentViewId.value = record.memberCardId || '';
    viewVisible.value = true;
  }
  function searchHandle() {
    page.current = 1;
    selectedKeys.value = [];
    currentChecked.value = {};
    getList();
  }
  function rowCheckSelection(v?: listItemType[]) {
    const res = v || data.value;
    const { memberCardId } = currentChecked.value;
    data.value = res.map((i) => {
      return {
        ...i,
        disabled: memberCardId ? memberCardId !== i.memberCardId : false
      };
    });
  }

  function resetSearch() {
    currentChecked.value = {};
    search.value = {};
    getList();
  }
  function exportHandle() {
    const url = svcWebServiceCounterExportGet.requestConfig.path;
    const { cardSoldDate = [] } = search.value;
    const [cardSoldDateStart, cardSoldDateEnd] = cardSoldDate;
    const p = {
      ...search.value,
      cardSoldDateStart,
      cardSoldDateEnd
    };
    exportDownload(url, p, '储值卡服务台');
  }

  watch(
    () => search.value.projectId,
    (i) => {
      getCardList({ projectId: i ? i + '' : undefined });
      // lsStore.setItem('svcServiceProjectId', i);
    }
  );
</script>

<style lang="less" scoped>
  .btn {
    width: 88px;
    border-radius: 4px;
  }
  .export {
    background-color: #cbe3ff;
    color: #4c8af7;
  }
</style>
