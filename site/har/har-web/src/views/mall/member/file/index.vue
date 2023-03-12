<template>
  <div>
    <i-table
      v-model="page.search"
      v-model:refresh-now="page.refresh"
      :options="tableOptions"
      :api="cbdApiProjectMembersListGet"
      @reset="handleReset"
    >
      <template #avatarUrlCell="{ record }">
        <a-image
          v-if="record.avatarUrl"
          :src="record.avatarUrl"
          width="45"
        ></a-image>
      </template>
      <template #menu="{ record }">
        <a-button
          v-permission="['members:detail']"
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
      @refresh="page.refresh = true"
    />
  </div>
</template>

<script setup lang="ts">
  import { Ref, ref, onMounted, reactive, computed } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import Detail from './__components__/detail.vue';

  import {
    cbdApiProjectCommonMembersLevelSelectGet,
    cbdApiProjectMembersListGet
  } from '@/api';
  import type { CbdApiProjectMembersListGetResponse } from '@/api';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import type { MembersLevel } from '@/utils/dic';
  type RowData = Required<CbdApiProjectMembersListGetResponse>['rows'][0];
  type PageConfig = {
    search: { startDate?: string; endDate?: string };
    currentId: number | undefined;
    detailVisible: boolean;
    refresh: boolean;
  };

  const memberLevelList = ref<Array<MembersLevel>>([]);
  const page = reactive<PageConfig>({
    search: {
      startDate: '',
      endDate: ''
    },
    currentId: undefined,
    detailVisible: false,
    refresh: false
  });
  const tableOptions: Ref = computed(() => {
    return {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      columns: [
        {
          label: '用户筛选',
          prop: 'key',
          placeholder: '请输入用户编号/昵称/电话搜索',
          search: true,
          hide: true,
          span: 6
        },
        {
          label: '用户编号',
          prop: 'code'
        },
        {
          label: '用户昵称',
          prop: 'nickName'
        },
        {
          label: '用户头像',
          prop: 'avatarUrl'
        },
        {
          label: '会员等级',
          prop: 'levelId',
          type: 'select',
          search: true,
          hide: true,
          dic: memberLevelList.value
        },
        {
          label: '会员等级',
          prop: 'levelName'
        },
        {
          label: '用户电话',
          prop: 'phone'
        },
        {
          label: '注册时间',
          prop: 'createTime'
        },
        {
          label: '注册时间',
          prop: 'time',
          type: 'dateRange',
          placeholder: ['请选择开始时间', '请选择结束时间'],
          search: true,
          hide: true,
          span: 6,
          on: {
            change(v: string[]) {
              page.search = {
                ...page.search,
                startDate: v[0] || '',
                endDate: v[1] || ''
              };
            }
          }
        }
      ]
    };
  });
  function handleViewDetail(record: RowData) {
    page.currentId = record.id;
    page.detailVisible = true;
  }
  function handleReset() {
    delete page.search.startDate;
    delete page.search.endDate;
  }
  const [getMemberListData] = useFuncProxy(async () => {
    memberLevelList.value = await cbdApiProjectCommonMembersLevelSelectGet({});
  });
  onMounted(() => {
    getMemberListData();
  });
</script>
