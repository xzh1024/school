import useStores from '@/store';
import { queryAcquiringClaimBaseUri } from '@api/Receipt/index';
import Table from '@c/proTable';
import { formatAcquiringStatus } from '@u/format';
import { Button, Popconfirm, Tooltip } from 'antd';
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
  const { physicalReception, globalStore } = useStores();
  const { dataSource, loading, pageCurrent, pageSize, total, selectedRowKeys } = physicalReception;

  const handlePageChange = (page, pageSize) => {
    runInAction(() => {
      physicalReception.pageCurrent = page;
      physicalReception.pageSize = pageSize;
      physicalReception.getList({ userName: globalStore.userInfo.userName });
    });
  };

  const redirectToFormDetail = claimId => {
    queryAcquiringClaimBaseUri({ claimId, userName: globalStore.userInfo.userName }).then(res => {
      const detailUrl = process.env.REACT_APP_DETAIL_URL + res.data;
      window.open(detailUrl);
    });
  };

  useEffect(() => {
    physicalReception.getList({ userName: globalStore.userInfo.userName });
  }, []);

  const handleSelect = newSelectedRowKeys => {
    physicalReception.selectedRowKeys = newSelectedRowKeys;
  };

  const handleRecipe = (id, isConfirm) => {
    physicalReception.receiveList(globalStore.userInfo.userName, isConfirm, id);
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
      title: '快递单号',
      dataIndex: 'expressNo',
      fixed: 'left',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
    },
    {
      title: '报账单号',
      dataIndex: 'claimNo',
      align: 'center',
      fixed: 'left',
      width: 240,
      render: (value, record) => (
        <Button type="link" onClick={() => redirectToFormDetail(record.claimId)}>
          {value}
        </Button>
      ),
    },
    {
      title: '单据状态',
      dataIndex: 'acquiringStatus',
      align: 'center',
      width: 100,
      render: value => <div>{formatAcquiringStatus(value)}</div>,
    },
    {
      title: '申请人',
      dataIndex: 'applyEmpName',
      align: 'center',
      width: 100,
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
      width: 170,
      ...ellipsisColumn,
    },
    {
      title: '报账金额',
      dataIndex: 'applyAmount',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
    },
    {
      title: '接收人',
      dataIndex: 'receiveUserName',
      align: 'center',
      width: 100,
      ...ellipsisColumn,
    },
    {
      title: '交单时间',
      dataIndex: 'acquiringTime',
      align: 'center',
      width: 180,
      ...ellipsisColumn,
    },
    {
      title: '邮寄时间',
      dataIndex: 'sendTime',
      align: 'center',
      width: 180,
      ...ellipsisColumn,
    },
    {
      title: '接收时间',
      dataIndex: 'receiveTime',
      align: 'center',
      width: 180,
      ...ellipsisColumn,
    },
    {
      title: '操作',
      dataIndex: 'createTime3',
      align: 'center',
      width: 180,
      render: (value, record) => (
        <>
          {record.acquiringStatus === 2 ? (
            <Popconfirm
              title="是否确认接收？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => {
                if (record.acquiringStatus !== 2) {
                  return;
                }
                handleRecipe(record.acquiringId, 1);
              }}
            >
              <Button type="link">接收</Button>
            </Popconfirm>
          ) : null}
          {record.acquiringStatus === 3 ? (
            <Popconfirm
              title="是否确认撤销接收？"
              okText="确认"
              cancelText="取消"
              okButtonProps={{
                danger: true,
              }}
              onConfirm={() => {
                if (record.acquiringStatus !== 3) {
                  return;
                }
                handleRecipe(record.acquiringId, 0);
              }}
            >
              <Button type="link">撤销接收</Button>
            </Popconfirm>
          ) : null}
        </>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelect,
    getCheckboxProps: record => {
      return {
        disabled: [0, 1, 3, 4].includes(record.acquiringStatus),
      };
    },
  };

  return (
    <>
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
    </>
  );
};

export default observer(AddressTable);
