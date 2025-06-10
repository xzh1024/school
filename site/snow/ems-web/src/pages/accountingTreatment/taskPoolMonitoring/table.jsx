import useStores from '@/store';
import { erpExport, handPostPool } from '@api/accountingTreatment/taskPoolMonitoring';
import ProTable from '@c/proTable';
import { downloadByBlob } from '@u/tools';
import { Button, message, Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

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
  // 未处理
  const untreated_columns = [
    {
      title: '当前小组',
      dataIndex: 'groupName',
      width: 160,
      ...ellipsisColumn,
    },
    {
      title: '当前组员',
      dataIndex: 'crewEmpName',
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
      dataIndex: 'item2Name',
      width: 160,
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD') : text),
    },
    {
      title: '到达小组日期',
      dataIndex: 'item2Name',
      width: 160,
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD') : text),
    },
  ];
  // 已抢-未处理
  const grabOrders_alreadyRobbed_columns = [
    {
      title: '当前处理人',
      dataIndex: 'crewEmpName',
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
      dataIndex: 'item2Name',
      width: 160,
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD') : text),
    },
  ];

  const { taskPoolMonitoring } = useStores();
  const { activeKey, dataSource, loading, total, pageIndex, pageSize, selectKey, selectRows } = taskPoolMonitoring;
  const [exportLoading, setExportLoading] = useState(false);

  const getColumns = key => {
    if (['accounting_notSpecified', 'grabOrders_wait', 'review_notSpecified'].includes(key)) {
      return notSpecified_columns;
    } else if (['accounting_undistributed', 'review_undistributed'].includes(key)) {
      return undistributed_columns;
    } else if (['accounting_untreated', 'review_untreated'].includes(key)) {
      return untreated_columns;
    } else {
      return grabOrders_alreadyRobbed_columns;
    }
  };

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
    handPostPool({ claimIdStr: selectKey?.join(',') || '' })
      .then(res => {
        const { result } = res;
        message.success(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 导出
  const handleExport = (type, fileName) => {
    if (exportLoading) return;
    setExportLoading(true);
    erpExport({ exportType: type })
      .then(res => {
        downloadByBlob(new Blob([res]), fileName + new Date().getTime() + '.xls');
      })
      .finally(() => {
        setExportLoading(false);
      });
  };

  // 重新分配(小组、组员、紧急)
  const handleRedistributionFunc = type => {
    if (selectKey.length < 1) {
      message.warning('请勾选数据');
      return;
    }
    if (['review_untreated', 'accounting_untreated'].includes(type)) {
      const firstData = selectRows[0];
      const flag = selectRows.every(item => item.groupId === firstData.groupId);
      if (!flag) {
        message.warning('必须选择相同小组的单据进行转办！');
        return;
      }
      taskPoolMonitoring.currentRecord = firstData;
    } else {
      taskPoolMonitoring.currentRecord = { emergencyLevel: '1' };
    }
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
    if (['accounting_notSpecified'].includes(key)) {
      return (
        <>
          <Popconfirm
            title="手动分配"
            description="确定提交吗？"
            onConfirm={handPostPoolFunc}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" loading={loading} style={ButtonStyle}>
              手动分配
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            onClick={() => handleRedistributionFunc('accounting_notSpecified')}
            style={ButtonStyle}
            loading={loading}
          >
            分配到人
          </Button>
        </>
      );
    }
    if (['accounting_undistributed'].includes(key)) {
      return (
        <>
          <Button type="primary" style={ButtonStyle} loading={loading}>
            分配11
          </Button>
        </>
      );
    }
    if (['accounting_untreated'].includes(key)) {
      return (
        <>
          <Button
            type="primary"
            onClick={() => handleRedistributionFunc('accounting_untreated')}
            style={ButtonStyle}
            loading={loading}
          >
            重新分配
          </Button>
          <Button
            type="primary"
            style={ButtonStyle}
            onClick={() => handleExport('accounting_untreated', '会计任务池-小组未处理任务-')}
            loading={exportLoading || loading}
          >
            导出
          </Button>
        </>
      );
    }

    if (key === 'grabOrders_wait') {
      return (
        <>
          <Button type="primary" onClick={handleAllocatedToIndividualsFunc} style={ButtonStyle} loading={loading}>
            分配到人
          </Button>
          <Button type="primary" onClick={handleOneClickDispatchingFunc} style={ButtonStyle} loading={loading}>
            一键派单11
          </Button>
        </>
      );
    }
    if (['grabOrders_alreadyRobbed'].includes(key)) {
      return (
        <>
          <Button type="primary" onClick={handleAllocatedToIndividualsFunc} style={ButtonStyle} loading={loading}>
            重新分配
          </Button>
          <Button
            type="primary"
            style={ButtonStyle}
            onClick={() => handleExport('grabOrders_alreadyRobbed', '抢单任务池-已抢未处理-')}
            loading={exportLoading || loading}
          >
            导出
          </Button>
        </>
      );
    }

    if (['review_notSpecified'].includes(key)) {
      return (
        <>
          <Popconfirm
            title="手动分配"
            description="确定提交吗？"
            onConfirm={handPostPoolFunc}
            okText="确认"
            cancelText="取消"
          >
            <Button type="primary" style={ButtonStyle}>
              手动分配
            </Button>
          </Popconfirm>

          <Button
            type="primary"
            onClick={() => handleRedistributionFunc('review_notSpecified')}
            style={ButtonStyle}
            loading={loading}
          >
            分配到人
          </Button>
        </>
      );
    }
    if (['review_undistributed'].includes(key)) {
      return (
        <>
          <Button type="primary" style={ButtonStyle} loading={loading}>
            分配
          </Button>
        </>
      );
    }
    if (['review_untreated'].includes(key)) {
      return (
        <>
          <Button
            type="primary"
            onClick={() => handleRedistributionFunc('review_untreated')}
            style={ButtonStyle}
            loading={loading}
          >
            重新分配
          </Button>
          <Button
            type="primary"
            style={ButtonStyle}
            onClick={() => handleExport('review_untreated', '复核任务池-小组未处理任务-')}
            loading={exportLoading || loading}
          >
            导出
          </Button>
        </>
      );
    }
    return null;
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
      columns={getColumns(activeKey)}
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
      dataSource={dataSource}
    >
      Table
    </ProTable>
  );
}

export default observer(Index);
