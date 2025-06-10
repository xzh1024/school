import { timeFormat } from '@/utils/format';
import { ExportOutlined } from '@ant-design/icons';
import { alreadyExport, editContent, erpExport, fmsExport, importErp, updateStatus } from '@api/newInvoiceMonitoring';
import ProTable from '@c/proTable';
import { downloadByBlob } from '@u/tools';
import { Button, Input, Tooltip } from 'antd';
import { openClaim } from '@api/index';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import useStores from '../../../store';

const EXPORT_FUN = {
  erpFailed: erpExport,
  fmsFailed: fmsExport,
  alreadyFailed: alreadyExport,
};

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

const ellipsisColumnWithTimeFormat = {
  ellipsis: true,
  align: 'center',
  render: value => (
    <Tooltip title={value}>
      <span>{timeFormat(value, 'YYYY-MM-DD HH:mm:ss')}</span>
    </Tooltip>
  ),
};

const COLUMNS_CONFIG = {
  erpFailed: [
    'claimNo',
    'esbNum',
    'logMsg',
    'invoiceNo',
    'invoiceBatchNo',
    'glDate',
    'createDate',
    'ouName',
    'item2Name',
    'summary',
    'accountEmpName',
    'invoiceState',
    'approvedDate',
    'importDayNum',
  ],
  fmsFailed: [
    'claimNo',
    'esbNum',
    'logMsg',
    'invoiceNo',
    'invoiceBatchNo',
    'glDate',
    'createDate',
    'ouName',
    'item2Name',
    'summary',
    'accountEmpName',
  ],
  alreadyFailed: [
    'claimNo',
    'invoiceNo',
    'invoiceBatchNo',
    'glDate',
    'createDate',
    'ouName',
    'item2Name',
    'summary',
    'groupName',
    'accountEmpName',
  ],
};

let processOpinion = '';

function Index() {
  const columns = [
    {
      title: '报账单号',
      dataIndex: 'claimNo',
      width: 240,
      fixed: 'left',
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
      title: '会计',
      dataIndex: 'accountEmpName',
      width: 140,
      ...ellipsisColumn,
    },
    {
      title: '核算小组',
      dataIndex: 'groupName',
      width: 140,
      ...ellipsisColumn,
    },
    {
      title: '未导天数',
      dataIndex: 'importDayNum',
      width: 140,
      ...ellipsisColumn,
    },
    {
      title: '摘要',
      dataIndex: 'summary',
      width: 160,
      ...ellipsisColumn,
    },
    {
      title: '业务大类',
      dataIndex: 'item2Name',
      width: 160,
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
      dataIndex: 'createDate',
      width: 240,
      ...ellipsisColumnWithTimeFormat,
    },
    {
      title: '审批结束时间',
      dataIndex: 'approvedDate',
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

  const { newInvoiceMonitoring } = useStores();
  const { activeKey, dataSource, loading, total, pageIndex, pageSize, selectKey, searchParams } = newInvoiceMonitoring;
  const [importLoading, setImportLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const jumpToClaim = claimId => {
    openClaim({
      claimNo: claimId
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  const getColumns = key => {
    const columnsRes = [...COLUMNS_CONFIG[key]];

    columns.forEach(item => {
      const columnKey = item.dataIndex;
      const index = columnsRes.indexOf(columnKey);
      if (index > -1) {
        if (columnKey === 'createDate' && key === 'alreadyFailed') {
          item.title = '生成发票日期';
        }
        columnsRes.splice(index, 1, item);
      }
    });

    return columnsRes;
  };

  const handlePaginationChange = (index, size) => {
    runInAction(() => {
      newInvoiceMonitoring.pageIndex = index;
      newInvoiceMonitoring.pageSize = size;
      newInvoiceMonitoring.getTableData();
    });
  };

  const handleChange = (selectedRowKeys, selectedRows) => {
    runInAction(() => {
      newInvoiceMonitoring.selectKey = selectedRowKeys;
    });
  };

  const handleEdit = () => {
    if (selectKey.length < 1) {
      return window.$message.warning('请先选择一条记录后再进行操作');
    }
    window.$modal.confirm({
      title: '请填写审批意见',
      content: (
        <Input
          allowClear
          onChange={e => {
            console.log(3333, e.target.value);
            processOpinion = e.target.value;
          }}
        />
      ),
      icon: null,
      onOk: () => {
        if (!processOpinion) return window.$message.warning('请填写审批意见');
        return editContent({
          ids: selectKey,
          processOpinion,
        }).then(res => {
          window.$message.success('操作成功');
          newInvoiceMonitoring.getTableData();
        });
      },
      onCancel: () => {
        processOpinion = '';
      },
    });
  };

  // 导入ERP
  const handleImportErp = () => {
    if (selectKey.length < 1) {
      return window.$message.warning('请先选择一条记录后再进行操作');
    }
    setImportLoading(true);
    window.$notify.loading({
      key: 'importErp',
      message: '后台导入中',
      duration: 0,
    });

    runInAction(() => {
      importErp({ ids: [...selectKey] })
        .then(res => {
          newInvoiceMonitoring.getStatisticNumber();
          newInvoiceMonitoring
            .getTableData()
            .then(() => {
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
            })
            .finally(() => {
              window.$notify.destroy('importErp');
              setImportLoading(false);
            });
        })
        .catch(() => {
          window.$notify.destroy('importErp');
          setImportLoading(false);
        });
    });
  };

  // 导出
  const handleExport = fileName => {
    if (exportLoading) return;
    setExportLoading(true);
    const fun = EXPORT_FUN[activeKey];
    fun({ ...searchParams }).then(res => {
      downloadByBlob(new Blob([res]), fileName + new Date().getTime() + '.xls');
    }).finally(() => {
      setExportLoading(false);
    });
  };


  // 状态更新
  const handleUpdateStatus = () => {
    if (selectKey.length < 1) {
      return window.$message.warning('请先选择一条记录后再进行操作');
    }
    runInAction(() => {
      newInvoiceMonitoring.loading = true;
      updateStatus({ids: [...selectKey]}).then(res => {
        window.$message.success(res.data);
        newInvoiceMonitoring.getStatisticNumber();
        newInvoiceMonitoring.getTableData();
      }).finally(() => {
        newInvoiceMonitoring.loading = false;
      });
    });
  };

  const getTools = key => {
    if (key === 'erpFailed') {
      return (
        <>
          <Button type="primary" style={ButtonStyle} onClick={handleEdit}>
            编辑内容
          </Button>
          <Button
            type="primary"
            style={ButtonStyle}
            icon={<ExportOutlined />}
            onClick={handleImportErp}
            loading={importLoading}
          >
            导入ERP
          </Button>
          <Button type="primary" style={ButtonStyle} onClick={() => handleExport('待导入ERP-')} loading={exportLoading || loading}>
            导出
          </Button>
        </>
      );
    }
    if (key === 'fmsFailed') {
      return (
        <>
          <Button type="primary" style={ButtonStyle} onClick={handleUpdateStatus} loading={loading}>
            更新状态
          </Button>
          <Button type="primary" style={ButtonStyle} onClick={() => handleExport('待ERP生成发票-')} loading={exportLoading || loading}>
            导出
          </Button>
        </>
      );
    }

    return (
      <Button type="primary" onClick={() => handleExport('已生成发票-')} loading={exportLoading || loading}>
        导出
      </Button>
    );
  };

  return (
    <ProTable
      resizeAble
      rowKey="claimId"
      tools={getTools(activeKey)}
      loading={loading}
      rowSelection={{
        selectedRowKeys: selectKey,
        type: 'checkbox',
        onChange: handleChange,
      }}
      onReload={() => {
        newInvoiceMonitoring.getTableData();
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
