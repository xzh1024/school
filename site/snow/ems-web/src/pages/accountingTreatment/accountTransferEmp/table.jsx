import useStores from '@/store';
import { dataDictDELETE } from '@api/accountingTreatment/accountTransferEmp';
import ProTable from '@c/proTable';
import { Button, Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

const ellipsisColumn = {
  ellipsis: true,
  align: 'center',
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

const ellipsisColumnTime = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : value}</span>
    </Tooltip>
  ),
};

const SEND = ['已完成', '已关闭'];
const CLOSE = ['编辑中', '已完成', '已关闭'];

function MyTable() {
  const { accountTransferEmp } = useStores();

  const { total, pageIndex, pageSize, loading, dataSource } = accountTransferEmp;

  React.useEffect(() => {
    accountTransferEmp.getTableList();
  }, []);

  const columns = [
    {
      dataIndex: 'empCode',
      title: '员工编号',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'empName',
      title: '员工姓名',
      align: 'center',
    },
    {
      dataIndex: 'businessTypeCode',
      title: '业务循环编码',
      align: 'center',
    },
    {
      dataIndex: 'businessTypeName',
      title: '业务循环名称',
      align: 'center',
    },
    {
      dataIndex: 'transferStatus',
      title: '顶岗状态',
      align: 'center',
      render: text => {
        return text === 'OPEN' ? '打开' : '关闭';
      },
    },

    {
      dataIndex: 'status',
      title: '操作',
      fixed: 'right',
      width: 210,
      align: 'center',
      render: (text, record) => {
        return (
          <div className="text-center">
            <Button type="link" onClick={() => handleSend(record, 1)} disabled={SEND.includes(record.status)}>
              修改
            </Button>
            <Button type="link" onClick={() => handleSend(record)} disabled={SEND.includes(record.status)}>
              详情
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSend = (record, type) => {
    runInAction(() => {
      if (type === 1) {
        accountTransferEmp.currentRecord = record;
        accountTransferEmp.modaltitle = '修改数据';
        accountTransferEmp.showModal = true;
      } else {
        accountTransferEmp.currentRecord = record;
        accountTransferEmp.modaltitle = '详细描述';
        accountTransferEmp.showModal = true;
      }
    });
  };

  const handleCloseInstance = id => {
    accountTransferEmp.loading = true;
    dataDictDELETE(id)
      .then(res => {
        window.$message.success('操作成功');
        accountTransferEmp.loading = false;
        accountTransferEmp.getTableList();
      })
      .catch(() => {
        accountTransferEmp.loading = false;
      });
  };

  const handleUpdate = record => {};

  const handlePageChange = (page, size) => {
    accountTransferEmp.pageIndex = page;
    accountTransferEmp.pageSize = size;
    accountTransferEmp.getTableList(page, size);
  };

  return (
    <div className="table-container">
      <ProTable
        loading={loading}
        columns={columns}
        key="table"
        dataSource={dataSource}
        rowKey="processInstanceId"
        scroll={{
          x: 300,
        }}
        pagination={{
          current: pageIndex,
          pageSize: pageSize,
          total: total,
          onChange: handlePageChange,
          pageSizeOptions: ['10', '20', '50', '100'],
          showSizeChanger: true,
          showTotal: value => `共${value}条数据`,
        }}
      />
    </div>
  );
}

export default observer(MyTable);
