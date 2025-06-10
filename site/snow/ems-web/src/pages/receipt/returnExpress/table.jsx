import useStores from '@/store';
import Table from '@c/proTable';
import { Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

const ExpressTable = () => {
  const { returnExpress, globalStore } = useStores();
  const { dataSource, loading, pageCurrent, pageSize, total, selectedRowKeys, errorRowKeys } = returnExpress;

  useEffect(() => {
    returnExpress.getList({ userName: globalStore.userInfo.userName });
  }, []);

  const handlePageChange = (page, pageSize) => {
    runInAction(() => {
      returnExpress.pageCurrent = page;
      returnExpress.pageSize = pageSize;
      returnExpress.getList();
    });
  };

  const handleSelect = newSelectedRowKeys => {
    returnExpress.selectedRowKeys = newSelectedRowKeys;
    if (newSelectedRowKeys.length <= 1) {
      returnExpress.errorRowKeys = [];
      return;
    }
    const rows = dataSource.filter(item => newSelectedRowKeys.includes(item.backId));
    const strKeyMap = {};
    rows.forEach(item => {
      const str = item.managerAccount + item.managerPhone + item.defaultAcquirerAddress;
      if (!strKeyMap[str]) {
        strKeyMap[str] = 1;
      } else {
        const count = strKeyMap[str];
        strKeyMap[str] = count + 1;
      }
    });
    const keys = Object.keys(strKeyMap);
    if (keys.length <= 1) {
      returnExpress.errorRowKeys = [];
      return;
    }
    let strKey = keys[0];
    let maxCount = strKeyMap[keys[0]];
    for (var i = 1; i < keys.length; i++) {
      const count = strKeyMap[keys[i]];
      if (count > maxCount) {
        maxCount = count;
        strKey = keys[i];
      }
    }

    returnExpress.errorRowKeys = rows
      .filter(item => {
        const str = item.managerAccount + item.managerPhone + item.defaultAcquirerAddress;
        return strKey !== str;
      })
      .map(item => item.backId);
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
      title: '报账单号',
      width: 180,
      fixed: 'left',
      dataIndex: 'claimNo',
      align: 'center',
    },
    {
      title: '申请人',
      dataIndex: 'applyEmpName',
      width: 100,
      fixed: 'left',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '电话',
      dataIndex: 'applyPhone',
      width: 130,
      align: 'center',
    },
    {
      title: '快递单号',
      width: 180,
      dataIndex: 'expressNo',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '默认收单柜号',
      width: 130,
      dataIndex: 'defaultAcquirerName',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '管理员',
      width: 100,
      dataIndex: 'managerName',
      align: 'center',
    },
    {
      title: '管理员手机号',
      width: 130,
      dataIndex: 'managerPhone',
      align: 'center',
    },
    {
      title: '退单地址',
      dataIndex: 'defaultAcquirerAddress',
      width: 200,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '收单人',
      width: 100,
      dataIndex: 'defaultReceiveUserName',
      align: 'center',
    },
    {
      title: '联系电话',
      width: 130,
      dataIndex: 'defaultReceiveUserPhone',
      align: 'center',
    },
    {
      title: '地址',
      width: 200,
      dataIndex: 'realityReceiveAddress',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      title: '创建时间',
      width: 200,
      dataIndex: 'createTime',
      align: 'center',
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelect,
    getCheckboxProps: record => {
      return {
        disabled: !!record.expressNo,
      };
    },
  };

  const rowClassName = record => {
    if (errorRowKeys.length === 0) {
      return '';
    }
    if (errorRowKeys.includes(record.backId)) {
      return 'error-selected';
    }
    return '';
  };

  return (
    <Table
      columns={Columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={'backId'}
      rowSelection={rowSelection}
      scroll={{ y: 600 }}
      rowClassName={rowClassName}
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

export default observer(ExpressTable);
