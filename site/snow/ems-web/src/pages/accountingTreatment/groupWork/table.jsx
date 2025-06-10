import useStores from '@/store';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { dataDictDELETE } from '@api/accountingTreatment/groupWork';
import ProTable from '@c/proTable';
import { Button, Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { groupWork } = useStores();
  const { dataSource, loading, pageCount, pageSize, pageIndex, total, selectKey } = groupWork;

  // React.useEffect(() => {
  //   groupWork.getTableList();
  // }, []);

  useEffect(() => {
    return () => {
      groupWork.searchParams = {};
      groupWork.dataSource = [];
      groupWork.pageIndex = 1;
      groupWork.total = 0;
    };
  }, []);

  const columns = [
    {
      dataIndex: 'index',
      title: '序号',
      align: 'center',
      width: 80,
      fixed: 'left',
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: 'groupType',
      title: '分组类型',
      width: 130,
      align: 'center',
      fixed: 'left',
      ...ellipsisColumn,
      render: (text, record) => {
        return <span>{text === '1' ? '复核会计' : '核算会计'}</span>;
      },
    },
    {
      dataIndex: 'groupName',
      title: '小组名称',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'ouName',
      title: '归属公司',
      align: 'center',
      width: 160,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'deptName',
      title: '申请组织	',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'expCategoryName',
      title: '费用类别	',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'rateValue',
      title: '优先级',
      align: 'center',
      width: 90,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'modifyRateValue',
      title: '调整值',
      align: 'center',
      width: 90,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'useFlag',
      title: '是否启用',
      width: 90,
      align: 'center',
      ...ellipsisColumn,
      render: (text, record) => {
        return <span>{text === '1' ? '否' : text === '0' ? '是' : '_'}</span>;
      },
    },
    {
      dataIndex: 'createUser',
      title: '创建人',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createTimeStr',
      title: '创建时间',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : text),
    },
    {
      dataIndex: 'modifyUser',
      title: '修改人',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'modifyTimeStr',
      title: '修改时间',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : text),
    },
    {
      dataIndex: 'status',
      title: '操作',
      fixed: 'right',
      width: 90,
      align: 'center',
      render: (text, record) => {
        return (
          <div className="text-center">
            <Button type="link" onClick={() => handleSend(record)}>
              修改
            </Button>
          </div>
        );
      },
    },
  ];

  const handleSend = record => {
    runInAction(() => {
      groupWork.currentRecord = { ...record, deptIds: record.deptName, expCategoryCodes: record.expCategoryName };
      groupWork.modaltitle = '修改数据';
      groupWork.showModal = true;
    });
  };

  const handleChange = (selectedRowKeys, selectedRows) => {
    runInAction(() => {
      groupWork.selectKey = selectedRowKeys;
    });
  };

  const handlePaginationChange = (index, size) => {
    runInAction(() => {
      groupWork.pageIndex = index;
      groupWork.pageSize = size;
      groupWork.getTableList();
    });
  };

  const handleadd = () => {
    groupWork.currentRecord = {};
    groupWork.modaltitle = '新增数据';
    groupWork.showModal = true;
  };

  //删除
  const handleDelete = async () => {
    const res = await dataDictDELETE(groupWork.selectKey);
    if (res.code === 200) {
      runInAction(() => {
        groupWork.selectKey = [];
        groupWork.getTableList();
      });
    }
  };

  const ButtonStyle = { marginLeft: '10px' };
  const toolsLeft = (
    <>
      <Button icon={<PlusOutlined />} type="primary" style={ButtonStyle} onClick={handleadd}>
        新增
      </Button>
      <Popconfirm description="确认删除选中数据吗？" onConfirm={handleDelete}>
        <Button icon={<DeleteOutlined />} danger type="primary" style={ButtonStyle}>
          删除
        </Button>
      </Popconfirm>
    </>
  );

  return (
    <ProTable
      resizeAble
      rowKey={item => item.workspaceId}
      loading={loading}
      toolsLeft={toolsLeft}
      rowSelection={{
        selectedRowKeys: selectKey,
        type: 'checkbox',
        onChange: handleChange,
      }}
      onReload={() => {
        groupWork.getTableData();
      }}
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
