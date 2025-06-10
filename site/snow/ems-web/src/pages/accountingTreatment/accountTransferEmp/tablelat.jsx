import useStores from '@/store';
import { attendancelistPage } from '@api/accountingTreatment/accountTransferEmp';
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

  const { totallat, pageCountlat, pageSizelat, loading, dataSourcelat } = accountTransferEmp;

  React.useEffect(() => {
    accountTransferEmp.attendancelist();
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
      dataIndex: 'userName',
      title: '员工账号',
      align: 'center',
    },
    {
      dataIndex: 'businessStatus',
      title: '营业状态',
      align: 'center',
    },
    {
      dataIndex: 'createUser',
      title: '创建人',
      align: 'center',
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      align: 'center',
    },
    {
      dataIndex: 'businessStatusCache',
      title: '营业状态缓存',
      align: 'center',
      render: text => {
        return text === 'Y' ? '正在营业' : '暂停营业';
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

  const handlePageChange = (page, size) => {
    accountTransferEmp.pageIndexlat = page;
    accountTransferEmp.pageSizelat = size;
    accountTransferEmp.attendancelist(page, size);
  };

  return (
    <div className="table-container">
      <ProTable
        loading={loading}
        columns={columns}
        key="table"
        dataSource={dataSourcelat}
        rowKey="processInstanceId"
        scroll={{
          x: 300,
        }}
        pagination={{
          current: pageCountlat,
          pageSize: pageSizelat,
          total: totallat,
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
