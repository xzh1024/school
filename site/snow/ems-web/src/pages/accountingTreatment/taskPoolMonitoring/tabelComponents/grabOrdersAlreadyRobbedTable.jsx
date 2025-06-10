import useStores from '@/store';
import { erpExport } from '@api/accountingTreatment/taskPoolMonitoring';
import ProTable from '@c/proTable';
import { downloadByBlob } from '@u/tools';
import { Button, message, Tooltip } from 'antd';
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
      dataIndex: 'arrivalTime',
      width: 160,
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD') : text),
    },
  ];

  const { taskPoolMonitoring } = useStores();
  const {
    activeKey,
    grabOrdersAlreadyRobbedTableDataSource,
    loading,
    total,
    pageIndex,
    pageSize,
    selectKey,
    selectRows,
  } = taskPoolMonitoring;
  const [exportLoading, setExportLoading] = useState(false);

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

  const getTools = key => {
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
      columns={grabOrders_alreadyRobbed_columns}
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
      dataSource={grabOrdersAlreadyRobbedTableDataSource}
    >
      Table
    </ProTable>
  );
}

export default observer(Index);
