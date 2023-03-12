import { useProgressStore } from '@/store';

const STATUS_DIC = {
  1: '已完成',
  2: '进行中'
} as { [key: number]: string };

const columns = [
  {
    label: '流程编号',
    // search: true,
    width: 100,
    prop: 'code'
  },
  {
    label: '流程名称',
    search: true,
    width: 100,
    prop: 'processName',
    searchProp: 'procDefName',
    options: {
      'max-length': 20
    }
  },
  {
    label: '流程分类',
    // search: true,
    width: 100,
    prop: 'category',
    type: 'select'
  },
  // {
  //   label: '紧急程度',
  //   search: true,
  //   width: 100,
  //   prop: 'category',
  //   type: 'select'
  // },
  {
    label: '流程状态',
    // search: true,
    width: 100,
    prop: 'status',
    type: 'select',
    formatter: function (record: any) {
      return STATUS_DIC[record.status] || '--';
    }
  },
  {
    label: '提交人',
    // search: true,
    width: 90,
    prop: 'startUserName'
  },
  {
    label: '当前节点',
    width: 100,
    prop: 'assigneeName'
  },
  {
    label: '任务耗时',
    width: 100,
    prop: 'duration'
  },
  {
    label: '提交时间',
    // search: true,
    width: 100,
    prop: 'createTime',
    type: 'dateRange'
  },
  {
    label: '完成时间',
    width: 100,
    prop: 'finishTime'
  }
];

export function useColumns(page: string) {
  if (['todo', 'todoSign'].includes(page)) {
    return spliceColumns(['流程状态', '任务耗时', '完成时间', '']);
  } else if (page === 'done') {
    return spliceColumns(['流程状态', '任务耗时', '完成时间']);
  } else {
    return columns;
  }
}

function spliceColumns(arr: string[]) {
  return columns.filter((item) => {
    return !arr.includes(item.label);
  });
}

const progressObj = useProgressStore();
export function openProcessDetail(record: any, action = true) {
  console.log(`打开流程详情drawer`, record);
  const obj = {
    dataType: 1,
    sourceType: 2, //来源类型 1业务方 2流程引擎方
    businessType: 0, //业务类型 1铺位调整2招商计划
    procInsId: record.procInsId, //流程id
    deployId: record.deployId, //部署id
    taskId: record.taskId, // 任务Id
    action
  };
  progressObj.setSearchData(obj);
  progressObj.open();
  progressObj.setTitle('查看');
}
