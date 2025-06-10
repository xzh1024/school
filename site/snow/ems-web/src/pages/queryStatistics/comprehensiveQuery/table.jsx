import { openClaim } from '@/api/index';
import useStores from '@/store';
import { DownloadOutlined, ToTopOutlined } from '@ant-design/icons';
import Table from '@c/proTable';
import { Button, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { PROCESS_STATE } from '../../../utils/constants';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { comprehensiveQuery } = useStores();
  const { dataSource, loading, pageCount, pageSize, total } = comprehensiveQuery;

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
      fixed: 'left',
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
      dataIndex: 'scanNum',
      title: '扫描单号',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyEmpName',
      title: '申请人',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyDeptName',
      title: '申请部门',
      width: 240,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'item2Name',
      title: '业务类型',
      width: 180,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'vendorName',
      title: '供应商名称',
      width: 240,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyAmount',
      title: '报账金额',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'payAmount',
      title: '申请付款金额',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'paymentAmount',
      title: '已付款金额',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'remark',
      title: '报账事由',
      width: 320,
      align: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'ouName',
      title: '归属公司',
      width: 300,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'glDate',
      title: '总账期间',
      width: 180,
      align: 'center',
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
      dataIndex: 'processState',
      title: '流程状态',
      width: 140,
      align: 'center',
      ...ellipsisColumn,
      render: value => {
        return (
          <Tooltip title={PROCESS_STATE[value]}>
            <span>{PROCESS_STATE[value]}</span>
          </Tooltip>
        );
      },
    },
    {
      dataIndex: 'payState',
      title: '付款状态',
      width: 160,
      align: 'center',
    },
    {
      dataIndex: 'paymentDate',
      title: '付款日期',
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
    {
      dataIndex: 'stateNameUserName',
      title: '当前处理人',
      width: 180,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'reachTime',
      title: '到达日期',
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
    comprehensiveQuery.pageCount = pageCount;
    comprehensiveQuery.pageSize = pageSize;
    comprehensiveQuery.getList({
      currentPage: pageCount,
      pageSize: pageSize,
    });
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageCount,
    onChange: handlePageChange,
  };

  // 导出
  const handleExport = () => {
    comprehensiveQuery.getList({}, 2);
  };

  const tools = (
    <>
      <Button icon={<ToTopOutlined />} type="primary" onClick={handleExport}>
        导出
      </Button>
      <Button
        icon={<DownloadOutlined />}
        type="primary"
        style={{
          marginLeft: '10px',
        }}
        onClick={() => runInAction(() => (comprehensiveQuery.downloadCenterShow = true))}
      >
        下载
      </Button>
    </>
  );

  return (
    <Table
      columns={columns}
      rowKey="claimId"
      loading={loading}
      onReload={() => comprehensiveQuery.getList({}, 1)}
      pagination={pagination}
      dataSource={dataSource}
      tools={tools}
      scroll={{
        x: 'max-content',
        y: 500
      }}
    />
  );
}

export default observer(Index);
