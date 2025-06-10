import useStores from '@/store';
import Table from '@c/proTable';
import { formatAcquiringStatus } from '@u/format';
import { Button, Tooltip } from 'antd';
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

const AddressTable = () => {
  const { receiptManagement, globalStore } = useStores();
  const { dataSource, loading, pageCurrent, pageSize, total, selectedRowKeys, cacheDataSource } = receiptManagement;

  useEffect(() => {
    receiptManagement.getList({ userName: globalStore.userInfo.userName });
  }, []);

  const handlePageChange = (page, pageSize) => {
    runInAction(() => {
      receiptManagement.pageCurrent = page;
      receiptManagement.pageSize = pageSize;
      receiptManagement.getList({ userName: globalStore.userInfo.userName });
    });
  };

  const handleSelect = newSelectedRowKeys => {
    receiptManagement.selectedRowKeys = newSelectedRowKeys;
  };

  const cacheSave = cacheItem => {
    const cache = [...cacheDataSource];
    cache.push(cacheItem);
    receiptManagement.cacheDataSource = cache;
    window.$message.success('暂存成功');
  };

  const Columns = [
    {
      title: '编号',
      align: 'center',
      dataIndex: 'index',
      width: 60,
      fixed: 'left',
      render: (value, record, index) => index + 1 + (pageCurrent - 1) * pageSize,
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      fixed: 'left',
      dataIndex: 'claimId',
      width: 160,
      render: (value, record) => (
        <>
          <Button
            type="link"
            disabled={
              cacheDataSource.map(item => item.acquiringId).includes(record.acquiringId) || record.acquiringStatus !== 1
            }
            onClick={() => cacheSave(record)}
          >
            暂存
          </Button>
        </>
      ),
    },
    {
      title: '报账单号',
      dataIndex: 'claimNo',
      align: 'center',
      fixed: 'left',
      width: 180,
    },
    {
      title: '申请人',
      dataIndex: 'applyEmpName',
      align: 'center',
      width: 80,
    },
    {
      title: '申请部门',
      dataIndex: 'applyDeptName',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
    },
    {
      title: '归属公司',
      dataIndex: 'applyCompName',
      align: 'center',
      width: 240,
      ...ellipsisColumn,
    },
    {
      title: '业务类别',
      dataIndex: 'item2Name',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
    },
    {
      title: '报账金额',
      dataIndex: 'applyAmount',
      align: 'center',
      width: 160,
      ...ellipsisColumn,
    },
    {
      title: '单据状态',
      dataIndex: 'acquiringStatus',
      align: 'center',
      render: value => <div>{formatAcquiringStatus(value)}</div>,
      width: 100,
    },
    {
      title: '交单柜号',
      dataIndex: 'acquirerName',
      align: 'center',
      width: 160,
      ...ellipsisColumn,
    },
    {
      title: '交单时间',
      dataIndex: 'acquiringTime',
      align: 'center',
      width: 160,
      ...ellipsisColumn,
    },
    {
      title: '快递单号',
      dataIndex: 'expressNo',
      align: 'center',
      width: 160,
    },
    {
      title: '邮寄人',
      dataIndex: 'sendUserName',
      align: 'center',
      width: 160,
    },
    {
      title: '邮寄时间',
      dataIndex: 'sendTime',
      align: 'center',
      width: 160,
      ...ellipsisColumn,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelect,
    getCheckboxProps: record => {
      return {
        disabled: [0, 3, 4].includes(record.acquiringStatus),
      };
    },
  };

  return (
    <Table
      columns={Columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={'acquiringId'}
      rowSelection={rowSelection}
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

export default observer(AddressTable);
