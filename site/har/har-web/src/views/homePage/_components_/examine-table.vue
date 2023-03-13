<template>
  <div class="table-container">
    <div class="tab-box">
      <div
        v-for="(item, index) in tabArr"
        :key="index"
        class="i-tab"
        :class="active === item.value ? 'i-active' : ''"
        @click="onActive(item.value)"
      >
        <div class="title-box">
          <div class="num">{{ item.num }}</div>
          <div class="label" :class="active === item.value ? 'i-active' : ''">{{
            item.label
          }}</div>
          <div
            :class="active === item.value ? 'i-solid' : 'i-solid-transparent'"
          ></div>
        </div>
      </div>
    </div>
    <slot name="searchBox">
      <div v-if="showSearch" class="search-box flex">
        <div class="flex align-center flex-1">
          <!-- <a-dropdown @select="onSelect">
            <a-button style="color: #333" type="text"
              >{{ name }} <icon-caret-down
            /></a-button>
            <template #content>
              <a-doption
                v-for="item in nameArr"
                :key="item.value"
                :value="item"
                >{{ item.label }}</a-doption
              >
            </template>
          </a-dropdown> -->
          <div>
            <div class="flex align-center margin-right-16">
              <a-button style="color: #333" type="text" @click="onNameSort"
                >流程名称 <icon-caret-down v-if="nameSort === 1" />
                <icon-caret-up v-else
              /></a-button>
            </div>
          </div>
          <div class="margin-right-16">
            <div class="flex align-center margin-right-16">
              <a-button style="color: #333" type="text" @click="onTimeSort"
                >发起时间 <icon-caret-down v-if="timeSort === 1" />
                <icon-caret-up v-else
              /></a-button>
            </div>
          </div>
          <div class="flex-1 margin-right-16">
            <a-input-search
              :style="{ width: '440px' }"
              placeholder="请输入搜索内容"
              allow-clear
              @search="onSearch"
            />
          </div>
        </div>
        <a-button
          v-if="active === 1"
          :disabled="selectedKeys.length < 1"
          type="primary"
          @click="onBitchExamine"
          >批量审核</a-button
        >
      </div>
    </slot>
    <a-table
      v-model:selected-keys="selectedKeys"
      :row-selection="rowSelection"
      :columns="columns"
      :row-key="'processIdAndTaskId'"
      :data="newTableData"
      :pagination="false"
      :scroll="scroll"
    >
      <template #username="{ record }">
        <div class="flex align-center man-info-box">
          <a-avatar :size="34" style="overflow: hidden">
            <img v-if="record.avatar" :src="record.avatar" />
            <IconUser v-else />
          </a-avatar>
          <div class="userInfo-box margin-left-xs">
            <div class="name">{{ record.username }}</div>
            <div v-if="record?.roleNames?.length" class="position">{{
              record?.roleNames.join(',')
            }}</div>
          </div>
        </div>
      </template>
      <template #status="{ record }">
        <div>{{
          record.status && active === 2
            ? valueFindLabel(examStatusList, record.status)
            : '--'
        }}</div>
      </template>
      <!-- <template #approvalType="{ record }">
        <div>{{ newProcess(record.approvalType) }}</div>
      </template> -->
      <template #optional="{ record }">
        <a-space>
          <a-button
            v-if="active === 1"
            class="i-btn i-btn-active"
            type="text"
            @click="onExamine(record)"
            >处理</a-button
          >
          <!-- <div v-if="active === 2">
            {{
              record.status
                ? valueFindLabel(examStatusList, record.status)
                : '--'
            }}
          </div> -->
          <!-- <a-button v-if="active === 2" class="i-btn" type="outline"
            >审批中</a-button
          > -->
          <a-button
            v-if="active !== 1"
            type="primary"
            class="i-btn i-btn-active"
            @click="onSee(record)"
            >查看</a-button
          >
        </a-space>
      </template>
    </a-table>
    <div v-if="showPage" class="pagination-box flex justify-end">
      <a-pagination
        v-model:current="pageNum"
        v-model:page-size="pageSize"
        :total="totalPage"
        show-page-size
        show-total
        :active-page-item-style="{ background: '#4C8AF7', color: '#ffffff' }"
      />
    </div>
    <a-modal
      v-model:visible="bitchVisible"
      title="批量审批"
      :footer="false"
      unmount-on-close
    >
      <div class="textarea-box">
        <div class="prompt-title">备注</div>
        <a-textarea
          v-model="remarks"
          show-word-limit
          :max-length="200"
          allow-clear
        />
      </div>
      <div class="prompt-title">转签/加签人</div>
      <a-select
        v-model:model-value="selectArr"
        :options="selectOptions"
        placeholder="请选择"
        :field-names="{ value: 'userCode', label: 'username' }"
        allow-search
      >
        <template #option="{ data }">
          <div class="select-cell flex align-center">
            <a-avatar v-if="data.avatar" class="margin-right-16">
              {{ data.avatar }}
            </a-avatar>
            <div class="margin-right-16">
              {{ data.username || data.userName }}
            </div>
            <div class="margin-right-16">{{ data.phoneNumber }}</div>
            <div class="margin-right-16">{{ data.deptName }}</div>
            <div>{{ data.roleName }}</div>
          </div>
        </template>
      </a-select>
      <div class="btn-box">
        <a-button
          class="h-btn h-disabled"
          type="primary"
          :loading="btnLoading"
          @click="onBitchReject"
          >驳回</a-button
        >
        <a-button
          class="h-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="selectArr.length < 1"
          @click="onBitchTurn"
          >转签</a-button
        >
        <a-button
          class="h-btn"
          type="primary"
          :loading="btnLoading"
          :disabled="selectArr.length < 1"
          @click="onBitchPlus"
          >加签</a-button
        >
        <a-button
          class="h-btn"
          type="primary"
          :loading="btnLoading"
          @click="onBitchAgree"
          >同意</a-button
        >
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { IconUser } from '@arco-design/web-vue/es/icon';
  import { computed, PropType, reactive, ref } from 'vue';
  import {
    cbdApiProjectPageApprovalUserGet,
    CbdApiProjectPageApprovalUserGetResponse,
    cbdApiProjectPageApprovalBatchPost
  } from '@/api';
  import { useRequest } from '@har/use';
  import { Message } from '@arco-design/web-vue';
  import { examStatusList } from '@/utils/dic';
  import { valueFindLabel } from '@/utils';

  const nameArr = [
    {
      label: '全部流程',
      value: ''
    },
    {
      label: '铺位调整',
      value: 1
    },
    {
      label: '招商计划',
      value: 2
    }
  ];

  const newProcess = computed(() => (val: number) => {
    return nameArr.find((item) => item.value === val)?.label;
  });

  const emits = defineEmits([
    'tabChange',
    'update:tabActive',
    'update:nameValue',
    'update:nameSort',
    'update:timeSort',
    'update:searchValue',
    'update:pageNum',
    'update:pageSize',
    'doExamine',
    'doSee',
    'doUpdate'
  ]);

  const props = defineProps({
    tabArr: {
      type: Array as PropType<any>,
      default: () => []
    },
    tableData: {
      type: Array as PropType<any>,
      default: () => []
    },
    tabActive: {
      type: Number,
      required: true
    },
    nameValue: {
      type: [String, Number]
    },
    //流程名称排序 升序|降序
    nameSort: {
      type: Number,
      default: 1
    },
    //发起时间排序 升序|降序
    timeSort: {
      type: Number,
      default: 1
    },
    searchValue: {
      type: String,
      default: ''
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalPage: {
      type: Number,
      default: 0
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showPage: {
      type: Boolean,
      default: true
    }
  });

  const scroll = computed(() => {
    return props.tableData.length > 0 ? { x: 1000 } : {};
  });

  const newTableData = computed(() => {
    return props.tableData.map((item: any) => {
      return {
        ...item,
        processIdAndTaskId: `${item.processInstanceId}&${item.taskId}`
      };
    });
  });

  const active = computed({
    get() {
      return props.tabActive;
    },
    set(v) {
      emits('update:tabActive', v);
    }
  });

  const nameValue = computed({
    get() {
      return props.nameValue;
    },
    set(v) {
      emits('update:nameValue', v);
    }
  });

  const nameSort = computed({
    get() {
      return props.nameSort;
    },
    set(v) {
      emits('update:nameSort', v);
    }
  });

  const timeSort = computed({
    get() {
      return props.timeSort;
    },
    set(v) {
      emits('update:timeSort', v);
    }
  });

  const searchValue = computed({
    get() {
      return props.searchValue;
    },
    set(v) {
      emits('update:searchValue', v);
    }
  });

  const pageNum = computed({
    get() {
      return props.pageNum;
    },
    set(v) {
      emits('update:pageNum', v);
    }
  });

  const pageSize = computed({
    get() {
      return props.pageSize;
    },
    set(v) {
      emits('update:pageSize', v);
    }
  });

  const onActive = (value: any) => {
    if (value === active.value) return;
    active.value = value;
    emits('update:pageNum', 1);
  };

  const rowSelection = computed<any>(() => {
    return Number(props.tabActive) === 1 && props.showSearch
      ? { type: 'checkbox', showCheckedAll: true }
      : undefined;
  });

  const name = ref('流程名称');
  const onSelect = (data: any) => {
    console.log(data, '--*--');
    name.value = data.label;
    nameValue.value = data.value;
  };

  const onNameSort = () => {
    nameSort.value === 1 ? (nameSort.value = 2) : (nameSort.value = 1);
  };

  const onTimeSort = () => {
    timeSort.value === 1 ? (timeSort.value = 2) : (timeSort.value = 1);
  };

  const onSearch = (val: string) => {
    console.log(val, '-*-');
    searchValue.value = val;
  };

  type ProcessList = {
    processInstanceId: string;
    taskId: string;
  };
  const selectedKeys = ref([]);
  const processList = ref<Array<ProcessList>>([]);
  const bitchVisible = ref(false);
  const btnLoading = ref(false);
  const onBitchExamine = () => {
    console.log(selectedKeys.value, '----*----');
    processList.value = selectedKeys.value.map((item: string) => {
      const [processInstanceId, taskId] = item.split('&');
      return {
        processInstanceId,
        taskId
      };
    });
    bitchVisible.value = true;
    getApprovalUser({ processInstanceId: '' });
  };
  const selectOptions = ref<CbdApiProjectPageApprovalUserGetResponse>([]);
  const selectArr = ref([]);
  const { run: getApprovalUser } = useRequest(
    cbdApiProjectPageApprovalUserGet,
    {
      manual: true,
      onSuccess(e) {
        selectOptions.value = e;
      }
    }
  );

  const remarks = ref('');
  const onBitchReject = () => {
    console.log('驳回');
    console.log(processList.value);
    console.log(remarks.value);
    doBitch({
      processList: processList.value,
      remarks: remarks.value,
      auditType: 3,
      otherUserCode: ''
    });
  };
  const onBitchAgree = () => {
    console.log('同意');
    doBitch({
      processList: processList.value,
      remarks: remarks.value,
      auditType: 2,
      otherUserCode: ''
    });
  };
  const onBitchTurn = () => {
    console.log('转签');
    doBitch({
      processList: processList.value,
      remarks: remarks.value,
      auditType: 1,
      otherUserCode: selectArr.value.toString()
    });
  };
  const onBitchPlus = () => {
    console.log('加签');
    doBitch({
      processList: processList.value,
      remarks: remarks.value,
      auditType: 4,
      otherUserCode: selectArr.value.toString()
    });
  };
  const { run: doBitch } = useRequest(cbdApiProjectPageApprovalBatchPost, {
    manual: true,
    onBefore() {
      btnLoading.value = true;
    },
    onSuccess() {
      Message.success({ content: '审批成功' });
      bitchVisible.value = false;
      selectedKeys.value = [];
      processList.value = [];
      emits('doUpdate');
    },
    onFinally() {
      btnLoading.value = false;
    }
  });

  const onExamine = (data: any) => {
    emits('doExamine', { ...data, dataType: active.value });
  };

  const onSee = (data: any) => {
    emits('doSee', { ...data, dataType: active.value });
  };

  const columns = reactive<any>([
    {
      title: '发起人',
      dataIndex: 'username',
      slotName: 'username',
      align: 'left',
      width: 180
    },
    {
      title: '流程编号',
      dataIndex: 'code',
      ellipsis: true,
      tooltip: true,
      align: 'left',
      width: 200
    },
    {
      title: '流程名称',
      dataIndex: 'approvalName',
      // slotName: 'approvalType',
      align: 'left',
      width: 150
    },
    {
      title: '发起时间',
      dataIndex: 'createTime',
      align: 'left',
      width: 180
    },
    {
      title: '内容',
      dataIndex: 'dataSimpleJson',
      align: 'left',
      ellipsis: true,
      tooltip: true
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      slotName: 'status',
      width: 120,
      align: 'left'
    },
    {
      title: '操作',
      slotName: 'optional',
      align: 'left',
      width: 120,
      fixed: 'right'
    }
  ]);
</script>

<style scoped lang="less">
  .margin-right-16 {
    margin-right: 16px;
  }
  .i-btn-active {
    color: #fff !important;
    background: #4c8af7 !important;
  }
  .i-btn {
    //width: 66px;
    //height: 30px;
    //color: #4c8af7;
    font-size: 14px;
    //background: #fff;
    //border: 1px solid #4c8af7;
    //border-radius: 8px;
  }
  .table-container {
    padding: 16px;
    background: #fff;
    user-select: none;
    .tab-box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      .i-tab {
        margin-right: 90px;
        cursor: pointer;
        &:last-child {
          margin-right: 0;
        }
        .title-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          .num {
            font-weight: bold;
            font-size: 23px;
          }
          .label {
            margin-top: 4px;
            color: #999;
            font-size: 12px;
          }
          .i-solid-transparent {
            width: 16px;
            height: 2px;
            margin-top: 4px;
            background: transparent;
          }
          .i-solid {
            width: 16px;
            height: 2px;
            margin-top: 4px;
            background: #4c8af7;
          }
        }
      }
      .i-active {
        color: #4c8af7 !important;
      }
    }
    .search-box {
      align-items: center;
      justify-content: space-between;
      height: 54px;
    }
    .man-info-box {
      justify-content: flex-start;
      .userInfo-box {
        display: flex;
        flex-direction: column;
      }
      .name {
        width: 80px;
        overflow: hidden;
        color: #333;
        font-size: 14px;
        white-space: nowrap;
        text-align: left;
        text-overflow: ellipsis;
      }
      .position {
        width: 80px;
        overflow: hidden;
        color: #999;
        font-size: 12px;
        white-space: nowrap;
        text-align: left;
        text-overflow: ellipsis;
      }
    }
  }
  .pagination-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }
  .textarea-box {
    margin-bottom: 12px;
  }
  .prompt-title {
    margin-bottom: 12px;
  }
  .btn-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
    .h-disabled {
      background: #dbe8fd;
      color: #4c8af7;
    }
    .h-btn {
      width: 104px;
      height: 40px;
      border-radius: 4px;
    }
  }
</style>
