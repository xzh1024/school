<template>
  <div>
    <i-table
      v-model="search"
      v-model:refresh-now="refresh"
      v-model:selected-keys="checkList"
      :options="options"
      :api="groundPcApiVenueListGet"
    >
      <template #header>
        <div class="header-tabs">
          <!-- <a-tabs v-model:active-key="search.status">
            <a-tab-pane key="" title="全部"></a-tab-pane>
            <a-tab-pane key="1" title="已启用"></a-tab-pane>
            <a-tab-pane key="2" title="已禁用"></a-tab-pane>
          </a-tabs> -->
          <div class="tab_box">
            <div
              v-for="(item, index) in tabList"
              :key="index"
              class="tab_li"
              :class="{ selected: search.status == item.value }"
              @click="onSelect(item.value)"
              >{{ item.label }}</div
            >
          </div>
          <!-- v-permission="['venue:update']" -->
          <div class="header-operation">
            <a-space>
              <div class="selectNum"
                >已选：<span>{{ checkList.length }}</span></div
              >
              <a-button
                type="primary"
                :loading="statusLoading"
                @click="setStatus(1)"
                >启用</a-button
              >
              <a-button
                type="primary"
                :loading="statusLoading"
                @click="setStatus(2)"
                >禁用</a-button
              >
              <!-- v-permission="['venue:add']" -->
              <a-button style="width: 80px" @click="addPlace"
                >新增场地</a-button
              >
            </a-space>
          </div>
        </div>
      </template>
      <template #statusCell="{ record }">
        <a-switch
          v-model="record.status"
          :checked-value="1"
          :unchecked-value="2"
          @click="statusChange({ id: record.id, status: record.status })"
        ></a-switch>
      </template>
      <template #optionalCell="{ record }">
        <a-space>
          <!-- v-permission="['venue:update']" -->
          <div class="s-btn" @click="editItem(record.id)">编辑</div>
          <!-- \v-permission="['venue:list']" -->
          <div class="s-btn" @click="viewDetail(record.id)">查看</div>
        </a-space>
      </template>
    </i-table>
    <edit-specs
      v-if="editVisible"
      :id="currentId"
      v-model="editVisible"
      :store-id="search.storeId"
      @refresh="refresh = true"
    />
    <view-details
      v-if="viewVisible"
      :id="currentId"
      v-model="viewVisible"
    ></view-details>
  </div>
</template>

<script setup lang="ts">
  import ITable from '@/components/i-table/index.vue';
  import {
    groundPcApiVenueListGet,
    groundPcApiVenueBatchUpdateStatusPost,
    groundPcApiVenueUpdateStatusPost,
    groundPcApiVenueClassifyListGet,
    GroundPcApiVenueClassifyListGetResponse
  } from '@/api/ground-pc-api';
  import { useProjectOptions } from '@/views/vms/hooks/usePorject';
  import { useStoreOptions } from '@/views/vms/hooks/useStore';
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import useFuncProxy from '@/hooks/useFuncProxy';
  import { Message } from '@arco-design/web-vue';
  import dayjs from 'dayjs';
  import ViewDetails from './__components__/viewDetails.vue';
  import EditSpecs from './__components__/editSpace.vue';

  const search = reactive<{
    storeId?: number;
    status: string;
  }>({ storeId: undefined, status: '' });
  const refresh = ref(false);
  watch(
    () => search.status,
    () => {
      refresh.value = true;
    }
  );
  const tabList = ref([
    {
      label: '全部',
      value: ''
    },
    {
      label: '已启用',
      value: '1'
    },
    {
      label: '已禁用',
      value: '2'
    }
  ]);
  const onSelect = (status: string) => {
    search.status = status;
  };
  // 项目下拉列表
  const { getProjectOptions, projectOptions } = useProjectOptions();
  // 店铺下拉列表
  const { getStoreOptions, storeOptions } = useStoreOptions();
  // 场馆分类下拉
  const classList = ref<GroundPcApiVenueClassifyListGetResponse>([]);
  const [getClassifyDic] = useFuncProxy(async () => {
    classList.value = await groundPcApiVenueClassifyListGet({});
  });

  const [setStatus, statusLoading] = useFuncProxy(async (status: number) => {
    if (!checkList.value.length) {
      Message.error('请您先勾选要操作的场地');
      return false;
    }
    // 批量启用 禁用
    await groundPcApiVenueBatchUpdateStatusPost({
      ids: checkList.value,
      status
    });
    Message.success('操作成功');
    refresh.value = true;
  });

  const [statusChange] = useFuncProxy(
    async ({ id, status }: { id: number; status: number }) => {
      await groundPcApiVenueUpdateStatusPost({
        id,
        status: status === 1 ? 1 : 2
      });
      Message.success('操作成功');
    }
  );

  const checkList = ref([]);
  const currentId = ref();
  const editVisible = ref(false);
  const viewVisible = ref(false);

  const options = computed(() => {
    return {
      align: 'center',
      layout: 'vertical',
      indexTitle: '序号',
      index: true,
      menu: false,
      menuSpan: 24,
      menuOtherOptions: {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          showCheckedAll: true
        }
      },
      columns: [
        {
          label: '项目名称',
          prop: 'projectId',
          search: true,
          hide: true,
          type: 'select',
          dic: projectOptions,
          options: {
            allowSearch: true,
            onChange: (val: string) => {
              console.log('getStoreOptions', val);
              getStoreOptions({ projectId: val });
            }
          }
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
        },
        {
          label: '店铺',
          prop: 'storeId',
          search: true,
          hide: true,
          type: 'select',
          dic: storeOptions,
          options: {
            allowSearch: true,
            maxLength: 20
          }
        },
        {
          label: '场地编码',
          prop: 'code',
          width: 140
        },
        {
          label: '场地名称',
          prop: 'name',
          ellipsis: true,
          tooltip: true
        },
        {
          label: '场地分类',
          prop: 'venueClassifyId',
          search: true,
          type: 'select',
          formatter: (record: any) => {
            return record?.venueClassifyName;
          },
          dic: classList,
          props: {
            label: 'name',
            value: 'id'
          }
        },
        {
          label: '场地筛选',
          placeholder: '请输入场地名称/编码搜索',
          prop: 'keyWord',
          search: true,
          hide: true
        },
        {
          label: '场地状态',
          prop: 'status'
        },
        {
          label: '总销量',
          prop: 'sales'
        },
        {
          label: '更新人',
          prop: 'updateBy'
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          width: 150
        },
        {
          label: '操作',
          prop: 'optional',
          width: 140,
          fixed: 'right'
        }
      ]
    };
  });
  function editItem(id: number) {
    currentId.value = id;
    editVisible.value = true;
  }
  function viewDetail(id: number) {
    currentId.value = id;
    viewVisible.value = true;
  }
  function addPlace() {
    currentId.value = null;
    editVisible.value = true;
  }
  onMounted(() => {
    getProjectOptions();
    getClassifyDic('');
    getStoreOptions('');
  });
</script>

<style lang="less" scoped>
  .tab_box {
    width: 256px;
    height: 38px;
    background: #f7f7f7;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px;
    box-sizing: border-box;
    cursor: pointer;
    .tab_li {
      width: 80px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #333333;
    }
    .selected {
      background: #4c8af7;
      border-radius: 4px;
      color: #ffffff;
    }
    .tab_li:nth-child(2) {
      margin: 0 4rpx;
    }
  }
  .header-tabs {
    position: relative;

    .header-operation {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      color: #999;
      .selectNum {
        color: #999999;
        font-size: 14px;
        & > span {
          color: #333333;
        }
      }
    }
  }
  .s-btn {
    color: #4c8af7;
    font-size: 14px;
    cursor: pointer;
  }
</style>
