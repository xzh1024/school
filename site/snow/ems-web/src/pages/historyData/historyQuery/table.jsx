import { openClaim } from '@/api/index';
import useStores from '@/store';
import { exportHistoryData } from '@api/historyData';
import Table from '@c/proTable';
import { downloadByBlob } from '@u/tools';
import { Button, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROCESS_STATE } from '../../../utils/constants';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

let exportLoading = false;

function Index() {
  const { historyData } = useStores();
  const navigate = useNavigate();
  const { dataSource, loading, pageCount, pageSize, total } = historyData;

  useEffect(() => {
    return () => {
      historyData.searchParams = {};
      historyData.dataSource = [];
      historyData.pageIndex = 1;
      historyData.total = 0;
    };
  }, []);

  const jumpToClaim = record => {
    openClaim({
      claimId: record.claimId,
    }).then(res => {
      const paramsArr = res.data.split('?')[1].replace('expCategory.', '').split('&');
      const params = {};
      paramsArr.forEach(item => {
        const [objKey, value] = item.split('=');
        params[objKey] = value;
      });
      params.isUnique = window.location.href.includes('/unique');
      params.openMode = 8;
      params.isPaymentApply = record.claimNo.startsWith('FKSQ');

      const newFormId = Object.keys(params).find(key => key.includes('formId_'));
      if (newFormId) {
        params.formId = newFormId;
      }

      console.log(params, 828228);

      runInAction(() => {
        historyData.claimUrlParams = params;
        historyData.currentRecord = record;
      });
      navigate(`/claim-order-detail`);
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
    historyData.pageCount = pageCount;
    historyData.pageSize = pageSize;
    historyData.getList({
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
    if (exportLoading) return;
    exportLoading = true;
    const { ouCode, applyDateStart, applyDateEnd } = historyData.searchParams;

    if (!ouCode || !applyDateStart || !applyDateEnd) {
      window.$message.error('请选择归属公司和申请时间后再导出');
      exportLoading = false;
      return;
    }
    exportHistoryData(historyData.searchParams)
      .then(res => {
        if (res.code === 500) {
          window.$message.error(res.message);
          return;
        }
        downloadByBlob(new Blob([res]), '历史单据.xlsx');
      })
      .finally(() => {
        exportLoading = false;
      });
  };

  return (
    <Table
      columns={columns}
      rowKey="claimId"
      loading={loading}
      toolsLeft={
        <Button type="primary" onClick={handleExport}>
          导出
        </Button>
      }
      onRow={record => ({
        onDoubleClick: () => {
          jumpToClaim(record);
        },
      })}
      onReload={() => historyData.getList({}, 1)}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
