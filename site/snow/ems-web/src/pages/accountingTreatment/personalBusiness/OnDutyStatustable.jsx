import useStores from '@/store';
import { changeStatus } from '@api/accountingTreatment/personalBusiness';
import ProTable from '@c/proTable';
import { Button, Popconfirm, Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { personalBusiness } = useStores();
  const { dataSource, loading, pageSize, pageIndex, total } = personalBusiness;

  React.useEffect(() => {
    personalBusiness.getTableList();
  }, []);

  const columns = [
    {
      dataIndex: 'empCode',
      title: '员工编号',
      align: 'center',
      width: 80,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'empName',
      title: '员工名称',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'businessTypeCode',
      title: '业务循环编号',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'businessTypeName',
      title: '业务循环名称',
      align: 'center',
      width: 160,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'transferStatus',
      title: '顶岗状态',
      width: 90,
      align: 'center',
      ...ellipsisColumn,
      render: (text, record) => {
        return <span>{text === 'CLOSE' ? '关闭' : '打开'}</span>;
      },
    },
    {
      dataIndex: 'status',
      title: '操作',
      fixed: 'right',
      width: 90,
      align: 'center',
      render: (text, record) => {
        return (
          <Popconfirm
            description={record.transferStatus === 'OPEN' ? '确认关闭该条数据嘛？' : '确认打开该条数据嘛？'}
            onConfirm={() => handleCloseInstanceed(record)}
          >
            <Button type="link" style={{ padding: '4px 7px' }}>
              {record.transferStatus === 'OPEN' ? '关闭' : '打开'}
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  const handleCloseInstanceed = data => {
    personalBusiness.loading = true;
    const obj = {
      transferStatus: data.transferStatus === 'OPEN' ? 'CLOSE' : 'OPEN',
      businessTypeCode: data.businessTypeCode,
    };
    changeStatus(obj)
      .then(res => {
        window.$message.success('操作成功');
        personalBusiness.getTableList();
      })
      .finally(() => {
        personalBusiness.loading = false;
      });
  };

  const handlePaginationChange = (index, size) => {
    runInAction(() => {
      personalBusiness.pageIndex = index;
      personalBusiness.pageSize = size;
      personalBusiness.getTableList();
    });
  };

  const toolsLeft = (
    <>
      <Button
        type="primary"
        loading={loading}
        onClick={() => {
          personalBusiness.getTableList();
        }}
      >
        刷新
      </Button>
    </>
  );

  return (
    <ProTable
      // title={() => '顶岗状态'}
      // showHeader
      resizeAble
      rowKey={item => item.workspaceId}
      loading={loading}
      toolsLeft={toolsLeft}
      columns={columns}
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
