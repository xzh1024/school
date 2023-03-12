<template>
  <div>
    <i-table
      v-model="searchFrom"
      v-model:refresh-now="refreshNow"
      :options="options"
      :api="groundPcApiVenueClassifyListGet"
      :data="list"
      @data-after="dataChange"
    >
      <template #header>
        <!-- v-permission="['venue-classify:add']"  -->
        <a-button @click="addEditChildrenType({})">新增分类</a-button>
      </template>
      <template #menu="{ record }">
        <div class="text-right">
          <!-- v-permission="['venue-classify:update']" -->
          <a-button type="text" @click="addEditChildrenType(record)"
            >编辑</a-button
          >
          <!-- v-permission="['venue-classify:delete']" -->
          <a-button type="text" @click="deleteConfirmCurrent(record)"
            >删除</a-button
          >
        </div>
      </template>
    </i-table>
    <edit
      v-if="addVisible"
      :id="currentItem.id"
      v-model="addVisible"
      :refresh="refresh"
    />
  </div>
</template>

<script lang="ts">
  export default {
    name: 'SiteType'
  };
</script>

<script setup lang="ts">
  import { ref, Ref } from 'vue';
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiVenueClassifyListGet,
    GroundPcApiVenueClassifyListGetResponse,
    groundPcApiVenueClassifyDeletePost,
    groundPcApiVenueClassifyMakeUseIdGet
  } from '@/api/ground-pc-api';
  import { Message, Modal } from '@arco-design/web-vue';

  import Edit from './__components__/edit.vue';
  const searchFrom = ref({
    projectId: '',
    buildingId: '',
    buildingFloorId: '',
    deviceType: '',
    meterReading: [],
    meterReadingStartDate: '',
    meterReadingEndDate: '',
    status: '',
    deviceSearch: ''
  });
  const list: Ref<GroundPcApiVenueClassifyListGetResponse> = ref([]);
  const refreshNow: Ref<boolean> = ref(false);
  const addVisible: Ref<boolean> = ref(false);
  type siteTypeItem = {
    id?: number;
    name?: string; // 名称
    projectName?: string;
    storeName?: string;
    sort?: string | number; // 序号
    remark?: string | undefined; // 备注
  };
  const currentItem: Ref<siteTypeItem> = ref({});
  const options: Ref = ref({
    menuOtherOptions: {
      rowKey: 'id'
    },
    menuOptions: {
      width: 200
    },
    index: true,
    pageShow: true,
    columns: [
      {
        label: '分类名称',
        prop: 'name'
      },
      {
        label: '项目名称',
        prop: 'projectName',
        ellipsis: true,
        tooltip: true
      },
      {
        label: '店铺',
        prop: 'storeName',
        ellipsis: true,
        tooltip: true
      }
    ]
  });

  function dataChange(data: any) {
    list.value = data;
  }

  // 新增编辑
  function addEditChildrenType(record: siteTypeItem) {
    currentItem.value = record;
    addVisible.value = true;
  }

  async function deleteConfirmCurrent(record: siteTypeItem) {
    const isOnUse = await groundPcApiVenueClassifyMakeUseIdGet({
      id: `${record.id}`
    });
    if (isOnUse) {
      Modal.warning({
        title: '提示',
        content: '当前分类已有场地使用，不可删除',
        simple: false,
        titleAlign: 'start',
        width: 400
      });
    } else {
      Modal.warning({
        title: '提示',
        content: '请确认是否作删除当前分类？',
        simple: false,
        titleAlign: 'start',
        width: 400,
        hideCancel: false,
        onBeforeOk(done) {
          deleteCurrent(record, done);
        }
      });
    }
  }
  async function deleteCurrent(
    record: siteTypeItem,
    done: (closed: boolean) => void
  ) {
    try {
      await groundPcApiVenueClassifyDeletePost({
        id: record.id as number
      });
      done(true);
      Message.success('删除成功');
      refreshNow.value = true;
    } catch (e) {
      done(false);
      console.error(e);
    }
  }
  function refresh() {
    refreshNow.value = true;
  }
</script>
