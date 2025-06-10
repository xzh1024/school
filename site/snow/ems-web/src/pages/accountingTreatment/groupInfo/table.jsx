import useStores from '@/store';
import { dataDictDELETE } from '@api/accountingTreatment/groupInfo';
import ProTable from '@c/proTable';
import { Button, Popconfirm, Tooltip } from 'antd';
import dayjs from 'dayjs';
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
  const { groupInfo } = useStores();
  const { dataSource, loading, pageCount, pageSize, pageIndex, total, selectKey } = groupInfo;
  // React.useEffect(() => {
  //   groupInfo.getTableList();
  // }, []);
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
      dataIndex: 'groupDeptName',
      title: '所属部门',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'groupName',
      title: '小组名称',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'groupLeaderName',
      title: '组长',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'groupCrewcount',
      title: '人数',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'crewEmpNamesStr',
      title: '组员',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
      render: value => {
        return (
          <Tooltip title={value} placement="topLeft">
            <span>{value}</span>
          </Tooltip>
        );
      },
    },
    {
      dataIndex: 'memberTasks',
      title: '组员分工上限',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'delFlg',
      title: '是否启用',
      width: 110,
      align: 'center',
      ...ellipsisColumn,
      render: (text, record) => {
        return <span>{text === '1' ? '否' : '是'}</span>;
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
      dataIndex: 'createTime',
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
      align: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'modifyTime',
      title: '修改时间',
      width: 160,
      align: 'left',
      ...ellipsisColumn,
      render: text => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : text),
    },
    {
      dataIndex: 'status',
      title: '操作',
      fixed: 'right',
      width: 180,
      align: 'center',
      render: (text, record) => {
        return (
          <div className="text-center">
            <Button type="link" onClick={() => handleSend(record)}>
              修改
            </Button>
            <Popconfirm description="确认删除该条数据嘛？" onConfirm={() => handleCloseInstance(record.groupId)}>
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const handleSend = record => {
    groupInfo.showModal = true;
    console.log(record, groupInfo.showModal);

    runInAction(() => {
      groupInfo.currentRecord = record;
      groupInfo.modaltitle = '修改数据';
      groupInfo.showModal = true;
    });
  };

  const handleCloseInstance = id => {
    groupInfo.loading = true;
    let data = {
      deleteGroupIds: [id],
    };
    dataDictDELETE(data)
      .then(res => {
        window.$message.success('操作成功');
        groupInfo.loading = false;
        groupInfo.getTableList();
      })
      .catch(() => {
        groupInfo.loading = false;
      });
  };
  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    groupInfo.pageCount = pageCount;
    groupInfo.pageSize = pageSize;
    groupInfo.getTableList({
      currentPage: pageCount,
      pageSize: pageSize,
    });
  };
  const handleChange = (selectedRowKeys, selectedRows) => {
    runInAction(() => {
      groupInfo.selectKey = selectedRowKeys;
    });
  };
  const handlePaginationChange = (index, size) => {
    runInAction(() => {
      groupInfo.pageIndex = index;
      groupInfo.pageSize = size;
      groupInfo.getTableList();
    });
  };
  const pagination = {
    total: 100,
    pageSize: pageSize,
    current: pageCount,
    onChange: handlePageChange,
  };

  // 导出
  const handleExport = () => {
    groupInfo.getTableList({}, 2);
  };
  const handleadd = () => {
    groupInfo.currentRecord = {};
    groupInfo.modaltitle = '新增数据';
    groupInfo.showModal = true;
  };
  const ButtonStyle = { marginLeft: '10px' };
  const tools = (
    <>
      <Button type="primary" style={ButtonStyle} onClick={handleadd}>
        新增
      </Button>
      {/* <Button icon={<ToTopOutlined />} type="primary" onClick={handleExport}>
        导出
      </Button>
      <Button
        icon={<DownloadOutlined />}
        type="primary"
        style={{
          marginLeft: '10px',
        }}
        onClick={() => runInAction(() => (groupInfo.downloadCenterShow = true))}
      >
        下载
      </Button> */}
    </>
  );

  return (
    <ProTable
      resizeAble
      rowKey="groupId"
      loading={loading}
      tools={tools}
      rowSelection={{
        selectedRowKeys: selectKey,
        type: 'checkbox',
        onChange: handleChange,
      }}
      onReload={() => {
        groupInfo.getTableData();
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
