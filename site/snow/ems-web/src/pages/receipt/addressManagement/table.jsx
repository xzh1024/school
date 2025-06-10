import useStores from '@/store';
import Table from '@c/proTable';
import { downloadQrcode } from '@u/qrCode';
import { Button, Popconfirm, Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

const AddressTable = ({ showUpdate }) => {
  const { addressManagement } = useStores();
  const { dataSource, loading, pageCurrent, pageSize, total, selectedRowKeys } = addressManagement;

  const handlePageChange = (page, pageSize) => {
    runInAction(() => {
      addressManagement.pageCurrent = page;
      addressManagement.pageSize = pageSize;
      addressManagement.getList();
    });
  };

  const handleSelect = (newSelectedRowKeys, selectedRows) => {
    addressManagement.selectedRows = selectedRows;
    addressManagement.selectedRowKeys = newSelectedRowKeys;
  };

  const Columns = [
    {
      title: '编号',
      align: 'center',
      dataIndex: 'index',
      fixed: 'left',
      width: 60,
      render: (value, record, index) => index + 1 + (pageCurrent - 1) * pageSize,
    },
    {
      title: '收单柜名称',
      dataIndex: 'acquirerName',
      align: 'center',
      fixed: 'left',
      width: 160,
      ...ellipsisColumn,
    },
    {
      title: '公司名称',
      dataIndex: 'compName',
      align: 'center',
      width: 220,
      ...ellipsisColumn,
    },
    {
      title: '部门名称',
      dataIndex: 'deptName',
      align: 'center',
      width: 180,
      ...ellipsisColumn,
    },
    {
      title: '地址',
      dataIndex: 'acquirerAddress',
      align: 'center',
      width: 240,
      ...ellipsisColumn,
    },
    {
      title: '管理员',
      width: 140,
      dataIndex: 'managerName',
      align: 'center',
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'createTime',
      align: 'center',
    },
    {
      title: '操作',
      width: 260,
      align: 'center',
      key: 'action',
      render: (value, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              downloadQrcode(
                `${process.env.REACT_APP_QRCODE_URL}/?acquirerId=${record.acquirerId}`,
                `${record.acquirerName}.png`,
              );
            }}
          >
            二维码下载
          </Button>
          <Button
            type="link"
            onClick={() => {
              addressManagement.currentId = record.acquirerId;
              showUpdate(true);
            }}
          >
            修改
          </Button>
          <Popconfirm
            title="是否确认删除？"
            okText="确认"
            cancelText="取消"
            okButtonProps={{
              danger: true,
            }}
            onConfirm={() => {
              addressManagement.deleteLine(record);
            }}
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelect,
  };

  return (
    <Table
      columns={Columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={'acquirerId'}
      rowSelection={rowSelection}
      scroll={{ y: 600 }}
      pagination={{
        current: pageCurrent,
        pageSize: pageSize,
        total: total,
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: handlePageChange,
        showSizeChanger: true,
        showTotal: value => `共${value}条数据`,
      }}
    />
  );
};

export default observer(AddressTable);
