import { Modal, Tooltip } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Table from '@c/proTable';
import useStores from '../../../store';

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
  let { currentRecord, pageEditIndex, pageEditSize, editTotal, editLoading, dataEditSource, getEditTableList } =
    accountOffSet;
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
      dataIndex: 'modifyRecord',
      title: '修改记录',
      align: 'center',
      fixed: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'modifyUserName',
      title: '修改人',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'modifyTimeStr',
      title: '修改时间',
      width: 150,
      align: 'center',
      ...ellipsisColumn,
    },
  ];

  useEffect(() => {
    getEditTableList({ recordId: currentRecord.recordId });
  }, []);

  const handleCancel = () => {
    accountOffSet.showEditMoadl = false;
  };

  // 分页变化
  const handlePageChange = (index, size) => {
    runInAction(() => {
      accountOffSet.pageEditIndex = index;
      accountOffSet.pageEditSize = size;
      accountOffSet.getEditTableList();
    });
  };

  return (
    <Modal title="会计不在岗设置的修改记录列表" open={true} onCancel={handleCancel} width={1100} footer={null}>
      <Table
        columns={columns}
        rowKey={item => item.id}
        loading={editLoading}
        dataSource={dataEditSource}
        pagination={{
          total: editTotal,
          pageSize: pageEditSize,
          current: pageEditIndex,
          onChange: handlePageChange,
          showTotal: total => `共 ${total} 条`,
        }}
        scroll={{
          x: 'max-content',
        }}
      />
    </Modal>
  );
}

export default observer(Index);
