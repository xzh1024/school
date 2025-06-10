import { openClaim } from '@/api/index';
import useStores from '@/store';
import Table from '@c/proTable';
import { Button, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

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
  const { billsProcessed } = useStores();
  const { dataSource, total, pageCount, pageSize, loading } = billsProcessed;

  useEffect(() => {
    billsProcessed.getApproveLists();
  }, []);

  const jumpToClaim = claimId => {
    openClaim({
      claimId: claimId,
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
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: 'claimNo',
      title: '报账单号',
      width: 240,
      align: 'center',
      fixed: 'left',
      ...ellipsisColumn,
      render: (value, record) => {
        return (
          <>
            <Button type="link" onClick={() => jumpToClaim(record.claimId)}>
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
      dataIndex: 'applyEmpName',
      title: '申请人',
      align: 'center',
      width: 80,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'item2Name',
      title: '业务类别',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'vendorName',
      title: '供应商名称',
      align: 'center',
      width: 150,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyAmount',
      title: '报账金额',
      align: 'center',
      width: 80,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'remark',
      title: '报账事由',
      align: 'center',
      width: 140,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyCompName',
      title: '归属公司',
      align: 'center',
      width: 240,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'glDate',
      title: '会计期间',
      align: 'center',
      width: 240,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyDate',
      title: '申请日期',
      width: 100,
      ...ellipsisColumn,
      render: value => {
        return value ? (
          <Tooltip title={dayjs(value).format('YYYY-MM-DD')}>
            <span>{dayjs(value).format('YYYY-MM-DD')}</span>
          </Tooltip>
        ) : (
          value
        );
      },
    },
    {
      dataIndex: 'bizTypeEndDate',
      title: '处理日期',
      width: 100,
      ...ellipsisColumn,
      render: value => {
        return value ? (
          <Tooltip title={dayjs(value).format('YYYY-MM-DD')}>
            <span>{dayjs(value).format('YYYY-MM-DD')}</span>
          </Tooltip>
        ) : (
          value
        );
      },
    },
    {
      dataIndex: 'stateNameUserName',
      title: '当前处理人',
      width: 120,
      ...ellipsisColumn,
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    runInAction(() => {
      billsProcessed.pageCount = pageCount;
      billsProcessed.pageSize = pageSize;
      billsProcessed.getApproveLists();
    });
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageCount,
    onChange: handlePageChange,
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      // rowKey={'claimId'+'index'}
      rowKey={(item, index) => item.claimNo + index}
      onReload={() => billsProcessed.getApproveLists()}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        // x: 'max-content',
        x: 1100,
      }}
    />
  );
}

export default observer(Index);
