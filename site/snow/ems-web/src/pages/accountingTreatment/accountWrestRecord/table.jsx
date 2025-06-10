import useStores from '@/store';
import { DownloadOutlined, ToTopOutlined } from '@ant-design/icons';
import Table from '@c/proTable';
import { Button, Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { accountWrestRecord } = useStores();
  const { dataSource, loading, pageCount, pageSize, total } = accountWrestRecord;
  React.useEffect(() => {
    accountWrestRecord.getTableList();
    return () => {
      accountWrestRecord.searchParams = {};
      accountWrestRecord.pageCount = 1;
    };
  }, []);
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
      width: 130,
      align: 'center',
      fixed: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'userName',
      title: '员工账号',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'claimNo',
      title: '报账单号',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'item2Code',
      title: '业务编码',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'item2Name',
      title: '业务名称',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'workitemId',
      title: '审批记录ID',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'processStatus',
      title: '处理状态',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
      render: (text, record) => {
        return <span>{String(text).trim() === '1' ? '完成' : '待办'}</span>;
      },
    },
    {
      dataIndex: 'timeInterval',
      title: '时段',
      width: 110,
      align: 'center',
      ...ellipsisColumn,
      render: (text, record) => {
        return <span>{text === 'HIGH' ? '高峰' : '低峰'}</span>;
      },
    },
    {
      dataIndex: 'createUser',
      title: '创建人',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'updateTime',
      title: '最后更新时间',
      width: 160,
      align: 'left',
      ...ellipsisColumn,
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    accountWrestRecord.pageCount = pageCount;
    accountWrestRecord.pageSize = pageSize;
    accountWrestRecord.getTableList({
      currentPage: pageCount,
      pageSize: pageSize,
    });
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageCount,
    onChange: handlePageChange,
  };

  // 导出
  const handleExport = () => {
    accountWrestRecord.getTableList({}, 2);
  };

  const tools = (
    <>
      <Button icon={<ToTopOutlined />} type="primary" onClick={handleExport}>
        导出
      </Button>
      <Button
        icon={<DownloadOutlined />}
        type="primary"
        style={{
          marginLeft: '10px',
        }}
        onClick={() => runInAction(() => (accountWrestRecord.downloadCenterShow = true))}
      >
        下载
      </Button>
    </>
  );

  return (
    <Table
      columns={columns}
      rowKey="claimId"
      loading={loading}
      dataSource={dataSource}
      pagination={{ ...pagination, showTotal: total => `共 ${total} 条` }}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
