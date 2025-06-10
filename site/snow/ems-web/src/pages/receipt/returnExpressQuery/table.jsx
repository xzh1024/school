import useStores from '@/store';
import Table from '@c/proTable';
import { Tooltip } from 'antd';
import { runInAction } from 'mobx';
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

const ExpressTable = () => {
  const { returnExpressWithoutEdit, globalStore } = useStores();
  const { dataSource, loading, pageCurrent, pageSize, total } = returnExpressWithoutEdit;

  useEffect(() => {
    returnExpressWithoutEdit.getList({ userName: globalStore.userInfo.userName });
  }, []);

  const handlePageChange = (page, pageSize) => {
    runInAction(() => {
      returnExpressWithoutEdit.pageCurrent = page;
      returnExpressWithoutEdit.pageSize = pageSize;
      returnExpressWithoutEdit.getList({ userName: globalStore.userInfo.userName });
    });
  };

  const Columns = [
    {
      title: '编号',
      align: 'center',
      dataIndex: 'index',
      fixed: 'left',
      width: 60,
      render: (value, record, index) => index + 1 + (pageCurrent - 1) * pageSize,
    },
    {
      title: '报账单号',
      width: 180,
      fixed: 'left',
      dataIndex: 'claimNo',
      align: 'center',
    },
    {
      title: '申请人',
      dataIndex: 'applyEmpName',
      width: 100,
      fixed: 'left',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '电话',
      dataIndex: 'applyPhone',
      width: 130,
      align: 'center',
    },
    {
      title: '快递单号',
      width: 180,
      dataIndex: 'expressNo',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '默认收单柜号',
      width: 130,
      dataIndex: 'defaultAcquirerName',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '管理员',
      width: 100,
      dataIndex: 'managerName',
      align: 'center',
    },
    {
      title: '管理员手机号',
      width: 130,
      dataIndex: 'managerPhone',
      align: 'center',
    },
    {
      title: '退单地址',
      dataIndex: 'defaultAcquirerAddress',
      width: 200,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '收单人',
      width: 100,
      dataIndex: 'defaultReceiveUserName',
      align: 'center',
    },
    {
      title: '联系电话',
      width: 130,
      dataIndex: 'defaultReceiveUserPhone',
      align: 'center',
    },
    {
      title: '地址',
      width: 200,
      dataIndex: 'realityReceiveAddress',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'createTime',
      align: 'center',
    },
  ];

  return (
    <Table
      columns={Columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={'backId'}
      scroll={{ y: 600 }}
      pagination={{
        current: pageCurrent,
        pageSize: pageSize,
        total: total,
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: handlePageChange,
        showSizeChanger: true,
        showTotal: value => `共${value}条数据`,
      }}
    />
  );
};

export default observer(ExpressTable);
