import useStores from '@/store';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import Table from '@c/proTable';
import { Button, Tooltip, Popconfirm, Space, message } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { dataDictDELETE } from '@api/accountingTreatment/accountOffSet';
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
  const { accountOnSet } = useStores();
  const { dataSource, loading, pageIndex, pageSize, total, selectKey } = accountOnSet;

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
      title: '组类型',
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
      title: '小组',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'crewEmpName',
      title: '组员',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'startTime',
      title: '在岗开始时间',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'endTime',
      title: '在岗结束时间',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createUserStr',
      title: '创建人',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'modifyUserStr',
      title: '修改人',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'modifyTime',
      title: '修改时间',
      width: 160,
      align: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'status',
      title: '操作',
      fixed: 'right',
      width: 250,
      align: 'center',
      render: (text, record) => {
        return (
          <div className="text-center">
            <Button type="link" onClick={() => handleEdit(record)}>
              修改
            </Button>

            <Popconfirm description="确认删除该条数据嘛？" onConfirm={() => handleDelte(record)}>
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>

            <Button type="link" onClick={() => handleEditList(record)}>
              修改记录
            </Button>
          </div>
        );
      },
    },
  ];

  // 分页变化
  const handlePageChange = (index, size) => {
    runInAction(() => {
      accountOnSet.pageIndex = index;
      accountOnSet.pageSize = size;
      accountOnSet.getTableList();
    });
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageIndex,
    onChange: handlePageChange,
  };

  const handleAdd = () => {
    accountOnSet.currentRecord = {};
    accountOnSet.modaltitle = '新增数据';
    accountOnSet.showModal = true;
  };

  const handleEdit = record => {
    runInAction(() => {
      accountOnSet.currentRecord = { ...record, staff: record.crewEmpName };
      accountOnSet.modaltitle = '修改数据';
      accountOnSet.showModal = true;
    });
  };

  //批量修改
  const handleBatchEdit = () => {
    console.log(accountOnSet.selectKey, 'accountOnSet.selectKey');
    if (accountOnSet.selectKey.length === 0) {
      message.warning('请选择在岗组员！');
    } else {
      runInAction(() => {
        accountOnSet.currentRecord = {
          staff: Array.from(new Set(accountOnSet.selectKey.map(item => item.crewEmpName))).join('、'),
        };
        accountOnSet.currentList = accountOnSet.selectKey;
        accountOnSet.modaltitle = '批量修改数据';
        accountOnSet.showModal = true;
      });
    }
  };

  //删除
  const handleDelte = record => {
    accountOnSet.loading = true;
    let data = {
      recordId: record.recordId,
      operType: '-1',
      orgId: record.orgId,
      settingDiff: '1',
    };
    dataDictDELETE(data)
      .then(res => {
        window.$message.success('操作成功');
        accountOnSet.loading = false;
        accountOnSet.getTableList();
      })
      .catch(() => {
        accountOnSet.loading = false;
      });
  };

  //记录列表
  const handleEditList = record => {
    accountOnSet.currentRecord = record;
    accountOnSet.showEditMoadl = true;
  };

  //批量筛选
  const handleChangeSelect = (selectedRowKeys, selectedRows) => {
    runInAction(() => {
      accountOnSet.selectKey = selectedRows;
    });
  };

  const toolsLeft = (
    <Space>
      <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
        新增
      </Button>

      <Button icon={<EditOutlined />} type="primary" onClick={handleBatchEdit}>
        批量修改
      </Button>
    </Space>
  );

  return (
    <Table
      columns={columns}
      toolsLeft={toolsLeft}
      rowSelection={{
        selectedRowKeys: selectKey.map(item => item.recordId),
        type: 'checkbox',
        onChange: handleChangeSelect,
      }}
      rowKey={item => item.recordId}
      loading={loading}
      dataSource={dataSource}
      pagination={{ ...pagination, showTotal: total => `共 ${total} 条` }}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
