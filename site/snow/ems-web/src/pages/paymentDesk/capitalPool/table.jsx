import useStores from '@/store';
import { del } from '@api/paymentDesk/capitalPool';
import ProTable from '@c/proTable';
import { Button, Popconfirm, Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

const ellipsisColumn = {
  ellipsis: true,
  align: 'center',
  render: (value) => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function MyTable() {
  const { capitalPool } = useStores();

  const { total, pageIndex, pageSize, loading, dataSource } = capitalPool;

  React.useEffect(() => {
    capitalPool.getTableList();
  }, []);

  const handleDel = (id) => {
    capitalPool.loading = true;
    del(id)
      .then(() => {
        capitalPool.loading = false;
        window.$message.success('删除成功');
        capitalPool.getTableList();
      })
      .finally(() => {
        capitalPool.loading = false;
      });
  };

  const columns = [
    {
      dataIndex: 'dataIndex',
      title: '序号',
      width: 110,
      ...ellipsisColumn,
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: 'fundPoolAccountCode',
      title: '内部账户池编码',
      width: 110,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'fundPoolAccountName',
      title: '内部账户池名称',
      width: 110,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'fundAccountCode',
      title: '内部账户编码',
      width: 110,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'fundAccountName',
      title: '内部账户名称',
      width: 130,
      ...ellipsisColumn,
    },

    {
      dataIndex: 'actions',
      title: '操作',
      width: 130,
      ...ellipsisColumn,
      render: (text, record) => {
        return (
          <Popconfirm
            title="确认删除?"
            onConfirm={() => handleDel(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  const handlePageChange = (page, size) => {
    capitalPool.pageIndex = page;
    capitalPool.pageSize = size;
    capitalPool.getTableList();
  };

  return (
    <div className="table-container">
      <ProTable
        loading={loading}
        columns={columns}
        key={(record) => JSON.stringify(record)}
        dataSource={dataSource}
        rowKey="processInstanceId"
        toolsLeft={
          <Button
            type="primary"
            onClick={() =>
              runInAction(() => {
                capitalPool.showModal = true;
              })
            }
          >
            新增
          </Button>
        }
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
          showTotal: (value) => `共${value}条数据`,
        }}
      />
    </div>
  );
}

export default observer(MyTable);
