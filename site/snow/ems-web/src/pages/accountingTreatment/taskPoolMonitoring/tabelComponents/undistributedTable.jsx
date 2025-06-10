import useStores from '@/store';
import ProTable from '@c/proTable';
import { Button, Tooltip, message } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

const ButtonStyle = { marginLeft: '10px' };

const ellipsisColumn = {
  ellipsis: true,
  align: 'center',
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  // 未分配
  const undistributed_columns = [
    {
      title: '当前小组',
      dataIndex: 'groupName',
      width: 160,
      ...ellipsisColumn,
    },
    {
      title: '单据编号',
      dataIndex: 'claimNo',
      width: 160,
      ...ellipsisColumn,
    },
    {
      title: '归属公司',
      dataIndex: 'ouName',
      width: 140,
      ...ellipsisColumn,
    },
    {
      title: '申请人',
      dataIndex: 'applyEmpName',
      width: 140,
      ...ellipsisColumn,
    },
    {
      title: '费用大类',
      dataIndex: 'item2Name',
      width: 140,
      ...ellipsisColumn,
    },
    {
      title: '报账金额',
      dataIndex: 'applyAmount',
      width: 140,
      ...ellipsisColumn,
    },
    {
      title: '申请日期',
      dataIndex: 'applyDate',
      width: 160,
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD') : text),
    },
    {
      title: '到达任务池日期',
      dataIndex: 'arrivalTime',
      width: 160,
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD') : text),
    },
  ];

  const { taskPoolMonitoring } = useStores();
  const { activeKey, undistributedTableSource, loading, total, pageIndex, pageSize, selectKey, selectRows } =
    taskPoolMonitoring;

  const handlePaginationChange = (index, size) => {
    runInAction(() => {
      taskPoolMonitoring.pageIndex = index;
      taskPoolMonitoring.pageSize = size;
      taskPoolMonitoring.getTableList();
    });
  };

  const handleChange = (selectedRowKeys, selectedRows) => {
    runInAction(() => {
      taskPoolMonitoring.selectKey = selectedRowKeys;
      taskPoolMonitoring.selectRows = selectedRows;
    });
  };

  // 重新分配(小组、组员、紧急)
  const handleRedistributionFunc = type => {
    if (selectKey.length < 1) {
      message.warning('请勾选数据');
      return;
    }
    taskPoolMonitoring.currentRecord = { emergencyLevel: '1' };
    taskPoolMonitoring.showRedistributionModel = true;
  };

  const getTools = () => {
    return (
      <>
        <Button type="primary" onClick={handleRedistributionFunc} style={ButtonStyle} loading={loading}>
          分配
        </Button>
      </>
    );
  };

  return (
    <ProTable
      resizeAble
      rowKey="claimId"
      toolsLeft={getTools(activeKey)}
      loading={loading}
      rowSelection={{
        selectedRowKeys: selectKey,
        type: 'checkbox',
        onChange: handleChange,
      }}
      onReload={() => {
        taskPoolMonitoring.getTableData();
      }}
      columns={undistributed_columns}
      pagination={{
        current: pageIndex,
        pageSize,
        total,
        showSizeChanger: true,
        showTotal: total => `共有 ${total} 条`,
        onChange: handlePaginationChange,
      }}
      scroll={{
        x: '700px',
      }}
      dataSource={undistributedTableSource}
    >
      Table
    </ProTable>
  );
}

export default observer(Index);
