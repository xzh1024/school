import useStores from '@/store';
import { handPostPool } from '@api/accountingTreatment/taskPoolMonitoring';
import ProTable from '@c/proTable';
import { Button, message, Popconfirm, Tooltip } from 'antd';
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
  // 未指定
  const notSpecified_columns = [
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
      title: '到达日期',
      dataIndex: 'processStateStartTime',
      width: 160,
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD') : text),
    },
  ];

  const { taskPoolMonitoring } = useStores();
  const { activeKey, notSpecifiedTableSource, loading, total, pageIndex, pageSize, selectKey, selectRows } =
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

  //
  const handPostPoolFunc = () => {
    handPostPool({
      claimIdStr: selectKey?.join(',') || '',
      accountType: activeKey === 'accounting_notSpecified' ? 'steppool' : 'steppool2',
    })
      .then(res => {
        const { data } = res;
        message.success(data);
        runInAction(() => {
          taskPoolMonitoring.selectKey = [];
          taskPoolMonitoring.selectRows = [];
        });
        taskPoolMonitoring.getTableList();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 重新分配(小组、组员、紧急)
  const handleRedistributionFunc = () => {
    if (selectKey.length < 1) {
      message.warning('请勾选数据');
      return;
    }
    taskPoolMonitoring.currentRecord = { emergencyLevel: '1' };
    taskPoolMonitoring.showRedistributionModel = true;
  };

  // 分配到人（组员）
  const handleAllocatedToIndividualsFunc = () => {
    if (selectKey.length < 1) {
      message.warning('请勾选数据');
      return;
    }
    runInAction(() => {
      taskPoolMonitoring.currentRecord = selectRows[0];
    });
    taskPoolMonitoring.showAllocatedToIndividualsModal = true;
  };
  // 一键派单
  const handleOneClickDispatchingFunc = () => {
    taskPoolMonitoring.showOneClickDispatchingModal = true;
  };

  const getTools = key => {
    if (key === 'grabOrders_wait') {
      return (
        <>
          <Button type="primary" onClick={handleAllocatedToIndividualsFunc} style={ButtonStyle} loading={loading}>
            分配到人
          </Button>
          <Button type="primary" onClick={handleOneClickDispatchingFunc} style={ButtonStyle} loading={loading}>
            一键派单
          </Button>
        </>
      );
    }
    return (
      <>
        <Popconfirm
          title="手动分配"
          description="确定提交吗？"
          onConfirm={handPostPoolFunc}
          okText="确认"
          cancelText="取消"
        >
          <Button disabled={!selectKey.length} type="primary" loading={loading} style={ButtonStyle}>
            手动分配
          </Button>
        </Popconfirm>

        <Button type="primary" onClick={handleRedistributionFunc} style={ButtonStyle} loading={loading}>
          分配到人
        </Button>
      </>
    );
  };

  const getRowKeyFunc = key => {
    return key === 'review_notSpecified' ? 'claimId' : 'claimId';
  };

  return (
    <ProTable
      resizeAble
      rowKey={getRowKeyFunc(activeKey)}
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
      columns={notSpecified_columns}
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
      dataSource={notSpecifiedTableSource}
    >
      Table
    </ProTable>
  );
}

export default observer(Index);
