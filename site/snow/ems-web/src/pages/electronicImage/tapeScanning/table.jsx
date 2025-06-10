import { openClaim } from '@/api/index';
import useStores from '@/store';
import Table from '@c/proTable';
import { Button, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

const ellipsisColumn = {
  ellipsis: true,
  align: 'center',
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { tapeScanning } = useStores();
  const { dataSource, total, pageCount, pageSize, loading } = tapeScanning;

  const jumpToClaim = claimNo => {
    openClaim({
      claimNo: claimNo,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

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
      dataIndex: 'claimNo',
      title: '报账单号',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
      render: (value, record) => {
        return (
          <>
            <Button type="link" onClick={() => jumpToClaim(record.claimNo)}>
              {value}
            </Button>
            <Typography.Text
              copyable={{
                text: value,
              }}
            ></Typography.Text>
          </>
        );
      },
    },
    {
      dataIndex: 'item2Name',
      title: '业务类别',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyEmpName',
      title: '申请人',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyCompName',
      title: '所属公司',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyDeptName',
      title: '申请人部门',
      width: 240,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyDate',
      title: '申请日期',
      width: 180,
      ...ellipsisColumn,
      render: value => {
        return value ? (
          <Tooltip title={dayjs(value).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</span>
          </Tooltip>
        ) : (
          value
        );
      },
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    runInAction(() => {
      tapeScanning.pageCount = pageCount;
      tapeScanning.pageSize = pageSize;
      tapeScanning.getLists();
    });
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageCount,
    pageSizeOptions: ['10', '20', '50', '100'],
    showSizeChanger: true,
    onChange: handlePageChange,
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      rowKey="claimNo"
      // loading={loading}
      onReload={() => {}}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
