import useStores from '@/store';
import { timeFormat } from '@/utils/format';
import { ExportOutlined } from '@ant-design/icons';
import { openClaim } from '@api/index';
import { importErp, updateStatus } from '@api/snowBeerMonitoring';
import ProTable from '@c/proTable';
import { Button, Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

const formatState = value => {
  if (!value) return '';
  value = parseInt(value);
  if (value === 1) {
    return '未导入';
  }
  if (value === 2) {
    return '已导入';
  }
  if (value === 3) {
    return '导入失败';
  }

  if (value === 4) {
    return '已生成发票';
  }

  if (value === 5) {
    return '导入中';
  }

  return '生成发票失败';
};

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

const ellipsisColumnWithTimeFormat = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value ? timeFormat(value, 'YYYY-MM-DD HH:mm:ss') : value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { snowBeerMonitoring } = useStores();
  const { tableLoading, pageIndex, pageSize, total, dataSource, selectRowKeys, activeKey } = snowBeerMonitoring;
  const [importLoading, setImportLoading] = useState(false);

  const jumpToClaim = claimId => {
    openClaim({
      claimNo: claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  const columns = [
    {
      title: '报账单号',
      dataIndex: 'claimNo',
      width: 240,
      fixed: 'left',
      ...ellipsisColumn,
      render: (value, record) => {
        return (
          <Button type="link" onClick={() => jumpToClaim(record.claimNo)}>
            {value}
          </Button>
        );
      },
    },
    {
      title: '业务类别',
      dataIndex: 'expCategoryName',
      width: 140,
      ...ellipsisColumn,
    },
    {
      title: '发票状态',
      dataIndex: 'invoiceState',
      width: 120,
      ellipsis: true,
      align: 'center',
      render: value => (
        <Tooltip title={value}>
          <span>{formatState(value)}</span>
        </Tooltip>
      ),
    },
    {
      title: '流水号',
      dataIndex: 'esbNum',
      width: 240,
      ...ellipsisColumn,
    },
    {
      title: '失败信息',
      dataIndex: 'logMsg',
      width: 670,
      align: 'left',
      render: value => (
        <Tooltip title={value}>
          <div style={{ whiteSpace: 'pre-wrap', width: '100%' }}>{value}</div>
        </Tooltip>
      ),
    },
    {
      title: '发票编号',
      dataIndex: 'invoiceNo',
      width: 240,
      ...ellipsisColumn,
    },
    {
      title: '发票批号',
      dataIndex: 'invoiceBatchNo',
      width: 240,
      ...ellipsisColumn,
    },
    {
      title: '总账时间',
      dataIndex: 'glDate',
      width: 240,
      ...ellipsisColumnWithTimeFormat,
    },
    {
      title: 'ERP导入时间',
      dataIndex: 'erpDate',
      width: 240,
      ...ellipsisColumnWithTimeFormat,
    },
    {
      title: '归属公司',
      dataIndex: 'ouName',
      width: 240,
      ...ellipsisColumn,
    },
  ];

  const handleChange = selectedRowKeys => {
    runInAction(() => {
      snowBeerMonitoring.selectRowKeys = selectedRowKeys;
    });
  };

  const handleImportErp = () => {
    if (selectRowKeys.length === 0) {
      return window.$message.warning('请选择需要导入的数据');
    }
    setImportLoading(true);
    window.$notify.loading({
      key: 'importErp',
      message: '后台导入中',
      duration: 0,
    });

    runInAction(() => {
      importErp({ ids: [...selectRowKeys] })
        .then(res => {
          // 导入成功以后刷新number
          snowBeerMonitoring
            .getStatisticNumber()
            .then(() => {
              setImportLoading(false);
              window.$notify.destroy('importErp');
              window.$notify.success({
                message: '操作成功',
                description: (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: res.data,
                    }}
                  ></div>
                ),
              });
              snowBeerMonitoring.getTableData();
            })
            .catch(() => {
              window.$notify.destroy('importErp');
              window.$notify.warning({
                message: '数据刷新失败',
                description: '数据刷新失败，请刷新页面获取最新数据',
                duration: 0,
              });
              window.$notify.success({
                message: '导入操作成功',
                description: (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: res.data,
                    }}
                  ></div>
                ),
              });
            });
        })
        .catch(() => {
          window.$notify.destroy('importErp');
          setImportLoading(false);
        });
    });
  };

  const handleUpdateStatus = () => {
    if (selectRowKeys.length === 0) {
      return window.$message.warning('请选择需要导入的数据');
    }
    setImportLoading(true);
    runInAction(() => {
      snowBeerMonitoring.tableLoading = true;
      updateStatus({ ids: [...selectRowKeys] })
        .then(res => {
          // 刷新统计数据
          snowBeerMonitoring
            .getStatisticNumber()
            .then(() => {
              setImportLoading(false);
              window.$notify.success({
                message: '操作成功',
                description: res.data || '状态更新成功',
                duration: 5000,
              });
              snowBeerMonitoring.tableLoading = false;
              snowBeerMonitoring.getTableData();
            })
            .catch(() => {
              window.$notify.warning({
                message: '操作成功',
                description: '状态更新成功，数据刷新失败，请刷新页面获取最新数据。',
                duration: 0,
              });
            });
        })
        .catch(() => {
          setImportLoading(false);
          snowBeerMonitoring.tableLoading = false;
        });
    });
  };

  const tools =
    activeKey !== 'C3' ? (
      <Button
        type="primary"
        icon={activeKey === 'C1' ? <ExportOutlined /> : null}
        onClick={() => (activeKey === 'C1' ? handleImportErp() : handleUpdateStatus())}
        loading={importLoading}
        disabled={tableLoading}
      >
        {activeKey === 'C1' ? '导入ERP' : '更新状态'}
      </Button>
    ) : null;

  const handlePaginationChange = (index, size) => {
    runInAction(() => {
      snowBeerMonitoring.pageIndex = index;
      snowBeerMonitoring.pageSize = size;
      snowBeerMonitoring.getTableData();
    });
  };

  const handleReload = () => {
    snowBeerMonitoring.getTableData();
  };

  return (
    <ProTable
      resizeAble
      rowKey="erpId"
      tools={tools}
      loading={tableLoading}
      pagination={{
        current: pageIndex,
        pageSize,
        total,
        showSizeChanger: true,
        showTotal: total => `共有 ${total} 条`,
        onChange: handlePaginationChange,
      }}
      rowSelection={{
        selectedRowKeys: selectRowKeys,
        type: 'checkbox',
        onChange: handleChange,
      }}
      onReload={handleReload}
      columns={columns}
      scroll={{
        x: 'max-content',
      }}
      dataSource={dataSource}
    ></ProTable>
  );
}

export default observer(Index);
