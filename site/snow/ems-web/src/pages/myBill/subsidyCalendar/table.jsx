import useStores from '@/store';
import Table from '@c/proTable';
import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

const ellipsisColumn = {
  ellipsis: true,
  align: 'center',
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

const status = {
  1: '草稿',
  2: '审批中',
  3: '已锁定',
  4: '待确认',
  5: '已确认',
  6: '已结束',
};

function Index() {
  const { subsidyCalendar } = useStores();
  const { dataSource, total, pageCount, pageSize, loading } = subsidyCalendar;

  const columns = [
    {
      dataIndex: 'index',
      title: '序号',
      align: 'center',
      width: 80,
      fixed: 'left',
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: 'subsidyDate',
      title: '日期',
      align: 'center',
      width: 180,
      ...ellipsisColumn,
      render: value => {
        return value ? (
          <Tooltip title={dayjs(value).format('YYYY-MM-DD')}>
            <span>{dayjs(value).format('YYYY-MM-DD')}</span>
          </Tooltip>
        ) : (
          value
        );
      },
    },
    {
      dataIndex: 'subsidyCity',
      title: '补贴城市',
      align: 'center',
      width: 140,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'subsidyStandard',
      title: '补贴标准',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'status',
      title: '状态',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
      render(value) {
        return status[value];
      },
    },
    
    {
      dataIndex: 'claimNo',
      title: '报账单号',
      width: 240,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'travelApplyNo',
      title: '商旅订单号',
      width: 240,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'dataSources',
      title: '补贴类型',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
      render: value => {
        return value === 3 ? '辖区内补贴' : '出差补贴';
      },
    },
    {
      dataIndex: 'payDate',
      title: '付款日期',
      width: 240,
      ...ellipsisColumn,
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    runInAction(() => {
      subsidyCalendar.pageCount = pageCount;
      subsidyCalendar.pageSize = pageSize;
      subsidyCalendar.getLists();
    });
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageCount,
    onChange: handlePageChange,
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      rowKey="calendarId"
      // loading={loading}
      onReload={() => {}}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
