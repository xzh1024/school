import { openClaim } from '@/api/index';
import useStores from '@/store';
import Table from '@c/proTable';
import { Button, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { rushBuyOrder } = useStores();
  const { dataSource, loading, pageCount, pageSize, total } = rushBuyOrder;

  useEffect(() => {
    rushBuyOrder.getList();
  }, []);

  const jumpToClaim = claimId => {
    openClaim({
      claimId: claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

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
      dataIndex: 'empCode',
      title: '员工编号',
      width: 140,
      align: 'center',
      fixed: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'userName',
      title: '员工账号',
      align: 'center',
      width: 180,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'claimNo',
      title: '报账单号',
      width: 140,
      align: 'center',
      ...ellipsisColumn,
      render: (value, record) => {
        return (
          <Button type="link" onClick={() => jumpToClaim(record.claimId)}>
            {value}
          </Button>
        );
      },
    },
    {
      dataIndex: 'item2Code',
      title: '业务编码',
      width: 240,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'item2Name',
      title: '业务名称',
      width: 180,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'workitemId',
      title: '审批记录ID',
      width: 240,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'processStatus',
      title: '处理状态',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
      render: value => {
        return value === 1 ? '已处理' : '待处理';
      },
    },
    {
      dataIndex: 'createUser',
      title: '创建人',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'updateTime',
      title: '最后更新时间',
      width: 320,
      align: 'left',
      ...ellipsisColumn,
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    rushBuyOrder.pageCount = pageCount;
    rushBuyOrder.pageSize = pageSize;
    rushBuyOrder.getList({
      pageIndex: pageCount,
      pageSize: pageSize,
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
      columns={columns}
      rowKey="claimId"
      loading={loading}
      onReload={() => rushBuyOrder.getList({})}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
