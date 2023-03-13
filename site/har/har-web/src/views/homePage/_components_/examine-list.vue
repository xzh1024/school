<template>
  <div class="page-container">
    <examine-table
      v-model:tab-active="form.tabActive"
      v-model:name-value="form.nameValue"
      v-model:name-sort="form.nameSort"
      v-model:time-sort="form.timeSort"
      v-model:search-value="form.searchValue"
      v-model:page-num="form.pageNum"
      v-model:page-size="form.pageSize"
      :table-data="tableData"
      :total-page="totalPage"
      :show-page="needPage"
      :show-search="needSearch"
      :tab-arr="tabList"
      @do-examine="doExamine"
      @do-see="doSee"
      @do-update="doUpdate"
    />
  </div>
</template>

<script setup lang="ts">
  import ExamineTable from './examine-table.vue';
  import { computed, onMounted, reactive, ref, watch } from 'vue';
  import {
    cbdApiProjectPageApprovalDataGet,
    cbdApiProjectPageApprovalListGet
  } from '@/api';
  import { useProgressStore } from '@/store';

  const emits = defineEmits(['update:tabActive']);

  const props = defineProps({
    tabActive: {
      type: Number,
      default: 0
    },
    needPage: {
      type: Boolean,
      default: true
    },
    needSearch: {
      type: Boolean,
      default: true
    },
    pageSize: {
      type: Number,
      default: 10
    }
  });

  const form = reactive({
    tabActive: 0,
    nameValue: '',
    nameSort: 1,
    timeSort: 1,
    searchValue: '',
    pageNum: 1,
    pageSize: props.pageSize || 5
  });

  onMounted(() => {
    getTab();
  });

  const tabList: any = ref([]);
  const getTab = () => {
    tabList.value = [
      {
        label: '待办',
        value: 1,
        num: 0
      },
      {
        label: '发起',
        value: 2,
        num: 0
      },
      {
        label: '已办',
        value: 3,
        num: 0
      },
      {
        label: '抄送',
        value: 4,
        num: 0
      }
    ];
    getDataNum();
    console.log('-------getTab------', props.tabActive);
    form.tabActive = props.tabActive || tabList.value[0].value;
  };
  const getDataNum = async () => {
    try {
      const d = await cbdApiProjectPageApprovalDataGet();
      tabList.value[0].num = d.todoNum;
      tabList.value[1].num = d.ownNum;
      tabList.value[2].num = d.doNum;
      tabList.value[3].num = d.copyNum;
    } catch (e) {
      console.error(e);
    }
  };

  watch(
    () => form,
    (val) => {
      console.log(val, '---form---');
      console.log('--重新请求列表--');
      emits('update:tabActive', val.tabActive);
      getList();
      getDataNum();
    },
    { deep: true }
  );

  const examineStore = useProgressStore();

  const showBusiness = computed(() => {
    return examineStore.showBusiness;
  });
  watch(
    () => showBusiness.value,
    (val) => {
      if (!val) {
        getList();
        getDataNum();
      }
    }
  );

  const tableData: any = ref([]);
  const totalPage = ref(0);
  const getList = async () => {
    try {
      const d = await cbdApiProjectPageApprovalListGet({
        type: String(form.tabActive),
        pageNum: String(form.pageNum),
        pageSize: String(form.pageSize)
      });
      console.log(d, '---d---');
      totalPage.value = d?.total || 0;
      tableData.value = d?.rows || [];
    } catch (e) {
      console.error(e);
    }
  };

  const doExamine = (data: any) => {
    console.log(data, '---data---');
    const obj = {
      dataType: data.dataType, //1待办 2发起 3已办 4抄送
      sourceType: 1, //来源类型 1业务方 2流程引擎方
      businessType: data.approvalType, //业务类型 1铺位调整2招商计划
      procInsId: data.processInstanceId, //流程id
      deployId: '', //部署id
      taskId: data.taskId // 任务Id
    };
    examineStore.setSearchData(obj);
    examineStore.open();
    examineStore.setTitle('审批');
  };

  const doSee = (data: any) => {
    console.log(data, '---data---');
    const obj = {
      dataType: data.dataType, //1待办 2发起 3已办 4抄送
      sourceType: 1, //来源类型 1业务方 2流程引擎方
      businessType: data.approvalType, //业务类型 1铺位调整2招商计划
      procInsId: data.processInstanceId, //流程id
      deployId: '', //部署id
      taskId: data.taskId // 任务Id
    };
    examineStore.setSearchData(obj);
    examineStore.open();
    examineStore.setTitle('查看');
  };

  const doUpdate = () => {
    getList();
    getDataNum();
  };
</script>

<style scoped lang="less">
  .margin-right-8 {
    margin-right: 8px;
  }
  .bg-blue-dark {
    color: #4c8af7;
    background: #dbe8fd !important;
  }
  .i-btn {
    //width: 104px;
    //height: 40px;
    //background: #4c8af7;
    //border-radius: 4px;
  }
  .page-container {
  }
  .content-container {
    width: 100%;
  }
  .content-box {
    width: 100%;
    margin-bottom: 60px;
  }
  .tab-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  .i-tab {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 16px;
    color: #999;
    cursor: pointer;
  }
  .i-active {
    color: #4c8af7;
  }
  .i-solid {
    position: absolute;
    bottom: 0;
    width: 64px;
    height: 2px;
    background: transparent;
  }
  .bg-blue {
    background: #4c8af7 !important;
  }
  .no-box {
    padding: 16px;
    background: #fff;
  }
  .i-pass {
    color: #999;
    background: #fff;
    border: 1px solid #999;
  }
  .i-tag {
    margin-left: 16px;
    padding: 4px 12px;
    font-size: 14px;
    line-height: 1.2;
    border-radius: 8px;
  }
  .footer-box {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    width: 60vw;
    padding: 12px 25px;
    background: #fff;
  }
</style>
