import useStores from '@/store';
import { ToTopOutlined, PlusOutlined } from '@ant-design/icons';
import Table from '@c/proTable';
import { Button, Tooltip, Popconfirm } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { dataDictDELETE, exportDic } from '@api/accountingTreatment/accountOffSet';
import { downloadByBlob } from '@u/tools';
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
  const { accountOffSet } = useStores();
  const { dataSource, loading, pageIndex, pageSize, total, exportLoading, searchParams } = accountOffSet;
  // React.useEffect(() => {
  //   accountOffSet.getTableList();
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
      dataIndex: 'orgName',
      title: '部门',
      width: 130,
      align: 'center',
      fixed: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'crewEmpName',
      title: '员工',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'startTime',
      title: '不在岗开始时间',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'endTime',
      title: '不在岗结束时间',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'reason',
      title: '不在岗原因',
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
      accountOffSet.pageIndex = index;
      accountOffSet.pageSize = size;
      accountOffSet.getTableList();
    });
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageIndex,
    onChange: handlePageChange,
  };

  // 导出
  const handleExport = () => {
    if (exportLoading) return;
    accountOffSet.exportLoading = true;
    exportDic({ ...searchParams })
      .then(res => {
        downloadByBlob(new Blob([res]), '会计不在岗设置' + new Date().getTime() + '.xls');
      })
      .finally(() => {
        accountOffSet.exportLoading = false;
      });
  };

  const handleAdd = () => {
    accountOffSet.currentRecord = {};
    accountOffSet.modaltitle = '新增数据';
    accountOffSet.showModal = true;
  };

  const handleEdit = record => {
    runInAction(() => {
      accountOffSet.currentRecord = { ...record, staff: record.crewEmpName };
      accountOffSet.modaltitle = '修改数据';
      accountOffSet.showModal = true;
    });
  };

  //删除
  const handleDelte = record => {
    accountOffSet.loading = true;
    let data = {
      recordId: record.recordId,
      operType: '-1',
      orgId: record.orgId,
      settingDiff: '0',
    };
    dataDictDELETE(data)
      .then(res => {
        window.$message.success('操作成功');
        accountOffSet.loading = false;
        accountOffSet.getTableList();
      })
      .catch(() => {
        accountOffSet.loading = false;
      });
  };

  //记录列表
  const handleEditList = record => {
    accountOffSet.currentRecord = record;
    accountOffSet.showEditMoadl = true;
  };

  const tools = (
    <>
      <Button icon={<ToTopOutlined />} type="primary" onClick={handleExport} loading={exportLoading || loading}>
        导出
      </Button>
    </>
  );

  const toolsLeft = (
    <>
      <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
        新增
      </Button>
    </>
  );

  return (
    <Table
      columns={columns}
      toolsLeft={toolsLeft}
      tools={tools}
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
