import useStores from '@/store';
import { openClaim } from '@api';
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

function Index(props) {
  const { pendFeedback } = useStores();
  const { dataSource, total, pageCount, pageSize, loading } = pendFeedback;
  const { commDicts } = props.data;

  const jumpToClaim = record => {
    openClaim({
      claimId: record.claimId,
      openMode: 9
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
      align: 'center',
      width: 240,
      ...ellipsisColumn,
      render: (value, record) => {
        return value ? (
          <>
            <Button type="link" onClick={() => jumpToClaim(record)}>
              {value}
            </Button>
            <Typography.Text
              copyable={{
                text: value,
              }}
            ></Typography.Text>
          </>
        ) : null;
      },
    },
    // { //后端提出不需要此字段
    //   dataIndex: 'docId',
    //   title: '状态',
    //   align: 'center',
    //   width: 80,
    //   ...ellipsisColumn,
    //   render: value => {
    //     return (
    //       <span>
    //         <Image src={pendProcessImgs[value]} />
    //         {commDicts?.filter(item => item.dictCode === value)[0]?.dictName}
    //       </span>
    //     );
    //   },
    // },
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
    },
    {
      dataIndex: 'applyAmount',
      title: '报账金额',
      align: 'center',
      width: 80,
      ...ellipsisColumn,
      render: value => {
        return value || 0;
      },
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
      dataIndex: 'stateNameUserName',
      title: '上一审批人',
      width: 120,
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
      dataIndex: 'bizTypeStartDate',
      title: '接收日期',
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
      dataIndex: 'processStateName',
      title: '当前环节',
      width: 120,
      ...ellipsisColumn,
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    runInAction(() => {
      pendFeedback.pageCount = pageCount;
      pendFeedback.pageSize = pageSize;
      pendFeedback.getLists();
    });
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageCount,
    onChange: handlePageChange,
    pageSizeOptions: [10, 20, 50, 100],
    showSizeChanger: true,
  };

  return (
    <Table
      loading={loading}
      columns={columns}
      rowKey="claimId"
      onReload={() => {}}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        // x: 'max-content',
        x: 1000,
      }}
    />
  );
}

export default observer(Index);
