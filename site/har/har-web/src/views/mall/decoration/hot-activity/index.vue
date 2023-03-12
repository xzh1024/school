<template>
  <div class="wrapper">
    <i-table :options="page.options" :data="data">
      <template #nameCell="{ record }">
        <a-input
          v-model="record.name"
          @input="onKeyUp($event, record)"
        ></a-input>
      </template>
      <!--      <template #nameCell="{ record }"> {{ typeHash[record.type] }} </template>-->
      <template #statusCell="{ record }">
        <a-switch
          v-model="record.status"
          :checked-value="1"
          :unchecked-value="2"
          :disabled="useSwitchPermission('hot:edit')"
          @change="handleStatusChange(record)"
        ></a-switch>
      </template>
      <template #menu="{ record }">
        <div class="flex" style="margin-left: -15px;">
          <a-button
            v-permission="['hot:edit']"
            type="text"
            @click="handleConfig(record)"
          >配置</a-button
          >
          <a-button
            v-permission="['hot:info']"
            type="text"
            @click="handleViewDetail(record)"
          >查看</a-button
          >
        </div>
      </template>
    </i-table>
    <detail
      v-if="page.detailVisible"
      v-model="page.detailVisible"
      :category="page.category"
      :hot-id="String(page.hotId)"
      @edit="showEdit"
    ></detail>
    <edit
      v-if="page.configModalVisible"
      v-model="page.configModalVisible"
      :hot-id="String(page.hotId)"
      :project-id="String(page.projectId)"
      :category="page.category"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, reactive } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import useSwitchPermission from '@/hooks/useSwitchPermission';
  import {
    cbdApiProjectHotListGet,
    cbdApiProjectHotOpenCloseIdPost,
    cbdApiProjectHotUpdatePost,
    cbdApiProjectCommonProjectSelectListGet
  } from '@/api';
  import type { CbdApiProjectHotListGetResponse } from '@/api';
  import Detail from './__components__/detail.vue';
  import Edit from './__components__/edit.vue';
  import { ProjectSelectItem } from '@/utils/dic';

  type RowData = CbdApiProjectHotListGetResponse[0];
  interface PageConfig {
    options: any;
    projectId: number | undefined;
    category: string;
    hotId: number;
    detailVisible: boolean;
    configModalVisible: boolean;
    refresh: boolean;
    projectList: Array<ProjectSelectItem>;
  }
  // const typeHash: { [key: string]: string } = {
  //   1: '热门优惠',
  //   2: '商家福利',
  //   3: '品类卷'
  // };
  // const currentTab = ref<string | number>('');
  const data = ref<Array<RowData>>([]);
  const page = reactive<PageConfig>({
    projectId: undefined,
    category: '',
    hotId: 0,
    detailVisible: false,
    configModalVisible: false,
    refresh: false,
    projectList: [],
    options: {
      indexTitle: '序号',
      index: true,
      submitText: '搜索',
      tableCard: true,
      pageShow: false,
      columns: [
        {
          label: '活动项',
          prop: 'name'
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '更新时间',
          prop: 'updateTime'
        }
      ]
    }
  });
  // const handleChangeShop = (idx: SelectChangeValueType): void => {
  //   page.projectId = Number(idx!);
  //   getData();
  // };
  function handleViewDetail(record: RowData) {
    page.hotId = record.id!;
    if (record.type === 1) {
      page.category = 'activity';
    } else if (record.type === 2) {
      page.category = 'welfare';
    } else if (record.type === 3) {
      page.category = 'coupon';
    }
    page.detailVisible = true;
  }
  function handleConfig(record: RowData) {
    page.hotId = record.id!;
    if (record.type === 1) {
      page.category = 'activity';
    } else if (record.type === 2) {
      page.category = 'welfare';
    } else if (record.type === 3) {
      page.category = 'coupon';
    }
    page.configModalVisible = true;
  }
  async function handleStatusChange(record: RowData) {
    try {
      await cbdApiProjectHotOpenCloseIdPost({
        id: String(record.id)
      });
    } catch (e) {
    } finally {
      getData();
    }
  }
  async function onKeyUp(name: string, v: RowData) {
    await cbdApiProjectHotUpdatePost({
      name,
      id: v.id!
    });
  }
  function showEdit() {
    page.configModalVisible = true;
  }
  const [getProjectList] = useFuncProxy(async () => {
    page.projectList = await cbdApiProjectCommonProjectSelectListGet({});
    if (page.projectList && page.projectList.length) {
      page.projectId = page.projectList[0].value;
      getData();
    }
  });
  const [getData] = useFuncProxy(async () => {
    data.value = await cbdApiProjectHotListGet({
      projectId: String(page.projectId!)
    });
  });
  onMounted(() => {
    getProjectList();
  });
</script>
