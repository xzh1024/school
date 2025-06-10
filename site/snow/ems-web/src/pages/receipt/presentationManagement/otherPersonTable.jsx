import useStores from '@/store';
import { queryAcquiringClaimBaseUri } from '@api/Receipt';
import Table from '@c/proTable';
import { formatAcquiringStatus } from '@u/format';
import { Button, Empty, Tooltip } from 'antd';
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

const OtherTable = () => {
  const { presentationManagement, globalStore } = useStores();
  const { dataSource, loading, pageCurrent, pageSize, total, selectedRowKeys, activeKey, formSearch } =
    presentationManagement;

  useEffect(() => {
    presentationManagement.getList({ userName: globalStore.userInfo.userName });
    presentationManagement.getCacheList({ userName: globalStore.userInfo.userName });
  }, []);

  const handlePageChange = (page, pageSize) => {
    runInAction(() => {
      presentationManagement.pageCurrent = page;
      presentationManagement.pageSize = pageSize;
      presentationManagement.getList({ userName: globalStore.userInfo.userName });
    });
  };

  const handleSelect = newSelectedRowKeys => {
    presentationManagement.selectedRowKeys = newSelectedRowKeys;
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
          <Button type="link" disabled={record.operateStatus !== 1} onClick={() => cacheSave(record.claimId)}>
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
      width: 220,
      render: (value, record) => (
        <>
          <Button
            disabled={activeKey === 'otherPerson'}
            type="link"
            onClick={() => redirectToFormDetail(record.cacheId)}
          >
            {value}
          </Button>
        </>
      ),
    },
    {
      title: '业务类别',
      dataIndex: 'item2Name',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
    },
    {
      title: '申请人',
      dataIndex: 'applyEmpName',
      align: 'center',
      width: 80,
    },
    {
      title: '归属公司',
      dataIndex: 'applyCompName',
      align: 'center',
      width: 240,
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
      title: '邮寄人',
      dataIndex: 'sendUserName',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
    },
  ];

  const getTableColumns = status => {
    if (status === 2) {
      return [
        ...Columns,
        {
          title: '单据状态',
          dataIndex: 'acquiringStatus',
          align: 'center',
          render: value => <div>{formatAcquiringStatus(value)}</div>,
          width: 100,
        },
        {
          title: '快递单号',
          dataIndex: 'expressNo',
          align: 'center',
          width: 160,
        },
        {
          title: '邮寄时间',
          dataIndex: 'sendTime',
          align: 'center',
          width: 200,
          ...ellipsisColumn,
        },
      ];
    }

    if (status === 3) {
      return [
        ...Columns,
        {
          title: '单据状态',
          dataIndex: 'acquiringStatus',
          align: 'center',
          render: value => <div>{formatAcquiringStatus(value)}</div>,
          width: 100,
        },
        {
          title: '快递单号',
          dataIndex: 'expressNo',
          align: 'center',
          width: 160,
        },
        {
          title: '邮寄时间',
          dataIndex: 'sendTime',
          align: 'center',
          width: 200,
          ...ellipsisColumn,
        },
        {
          title: '接收时间',
          dataIndex: 'receiveTime',
          align: 'center',
          width: 200,
          ...ellipsisColumn,
        },
      ];
    }
    return [
      ...Columns,
      {
        title: '是否已邮寄',
        dataIndex: 'acquiringTotal',
        align: 'center',
        width: 160,
        render: value => {
          return value ? '已邮寄' : '未邮寄';
        },
      },
    ];
  };

  const cacheSave = id => {
    if (presentationManagement.cacheDataSource.map(item => item.claimId).includes(id)) {
      return window.$message.warning('该单据已在暂存中');
    }
    presentationManagement.cacheSave({
      claimId: id,
      userName: globalStore.userInfo.userName,
    });
  };

  const redirectToFormDetail = claimId => {
    presentationManagement.loading = true;
    queryAcquiringClaimBaseUri({ claimId, userName: globalStore.userInfo.userName })
      .then(res => {
        const detailUrl = process.env.REACT_APP_DETAIL_URL + res.data;
        window.open(detailUrl);
      })
      .finally(() => {
        presentationManagement.loading = false;
      });
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelect,
  };

  return (
    <Table
      columns={getTableColumns(formSearch.acquiringStatus)}
      dataSource={dataSource}
      loading={loading}
      rowKey={row => `${row.claimId}&&${row.acquiringId}`}
      rowSelection={rowSelection}
      scroll={{ y: 530 }}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={activeKey === 'otherPerson' ? '暂无数据，请输入搜索条件进行查询' : '暂无搜索报账单数据'}
          />
        ),
      }}
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

export default observer(OtherTable);
