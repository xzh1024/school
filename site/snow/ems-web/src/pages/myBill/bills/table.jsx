import { openClaim } from '@/api/index';
import { deleteDraft, getExpressInfo, queryHasPhysicalBills, saveAddAfterReal } from '@/api/myBill/bills';
import useStores from '@/store';
import Table from '@c/proTable';
import { Button, Popconfirm, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { PAY_STATE, PROCESS_STATE } from '../../../utils/constants';
import ExpressModal from './expressModal';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

const draftColumnHide = [
  'claimNo',
  'thisTimePayAmount',
  'paymentAmount',
  'stateNameUserName',
  'processState',
  'payState',
  'paymentDate',
];

const voidColumnHide = ['thisTimePayAmount', 'paymentDate'];

function Index() {
  const { bills } = useStores();
  const { dataSource, loading, pageCount, pageSize, total, processState } = bills;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [showExpressModal, setShowExpressModal] = useState(false);
  const [expressInfo, setExpressInfo] = useState({});

  const jumpToClaim = claimId => {
    openClaim({
      claimId: claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [dataSource]);

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
      dataIndex: 'ouName',
      title: '归属公司',
      width: 300,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyDate',
      title: '申请日期',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
      render: value => {
        return dayjs(value).format('YYYY-MM-DD');
      },
    },
    {
      dataIndex: 'item2Name',
      title: '业务类别',
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
      dataIndex: 'thisTimePayAmount',
      title: '本次付款',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'paymentAmount',
      title: processState === 6 ? '付款金额' : '已付款金额',
      width: 130,
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
      dataIndex: 'stateNameUserName',
      title: '当前处理人',
      width: 240,
      align: 'center',
      ...ellipsisColumn,
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
      render: value => {
        return PAY_STATE[value] ? PAY_STATE[value] : '';
      },
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
  ];

  const handleDelete = id => {
    runInAction(() => {
      bills.loading = true;
      deleteDraft(id)
        .then(res => {
          bills.loading = false;
          window.$message.success('操作成功');
          bills.getLists();
        })
        .catch(e => {
          bills.loading = false;
        });
    });
  };

  const getActionsColumn = processState => {
    return {
      dataIndex: 'actions',
      title: '操作',
      width: 160,
      align: 'center',
      fixed: 'right',
      render: (value, record) => {
        return (
          <>
            {![1, 6].includes(processState) ? (
              <Button type="link" onClick={() => queryHasPhysical(record.claimId)}>
                是否事后补充实物
              </Button>
            ) : null}
            {processState === 1 && (
              <Popconfirm
                title="删除"
                description="是否删除？"
                onConfirm={() => handleDelete(record.claimId)}
                okText="确认"
                cancelText="取消"
              >
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>
            )}
          </>
        );
      },
    };
  };

  const queryHasPhysical = id => {
    runInAction(() => {
      bills.loading = true;
      queryHasPhysicalBills(id)
        .then(res => {
          if (res.data === 0) {
            window.$message.warning('无实物报账单无需事后补充实物');
            bills.loading = false;
            return;
          }

          window.$modal
            .confirm({
              title: '温馨提示',
              content: '请确认报账单是否流程审批结束后补充实物',
            })
            .then(res => {
              const data = {
                claimId: id,
                addAfterReal: Number(res),
              };
              saveAddAfterReal(data)
                .then(res => {
                  window.$message.success('操作成功');
                })
                .finally(() => {
                  bills.loading = false;
                });
            })
            .catch(() => {
              bills.loading = false;
            });
        })
        .catch(() => {
          bills.loading = false;
        });
    });
  };

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    bills.pageCount = pageCount;
    bills.pageSize = pageSize;
    bills.getLists({
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

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    getCheckboxProps: record => {
      return {
        disabled: record.hasPhysicalBills !== 1 || !['2', '3'].includes(String(record.processState)),
      };
    },
  };

  const handleExpress = () => {
    bills.loading = true;
    setExpressInfo({});
    getExpressInfo(selectedRowKeys)
      .then(res => {
        res.data.claimNo = selectedRowKeys.join(',');
        setExpressInfo(res.data);
        setShowExpressModal(true);
      })
      .finally(() => {
        bills.loading = false;
      });
  };

  return (
    <>
      <Table
        columns={processState !== 6 ? [...columns, getActionsColumn(processState)] : columns}
        rowKey={record => record.claimNo}
        loading={loading}
        toolsLeft={
          <Button type="primary" onClick={handleExpress} disabled={selectedRowKeys.length === 0}>
            快递邮寄
          </Button>
        }
        rowSelection={rowSelection}
        onRow={record => ({
          onDoubleClick: () => {
            jumpToClaim(record.claimId);
          },
        })}
        onReload={() => bills.getLists({})}
        pagination={pagination}
        dataSource={dataSource}
        columnsHidden={processState === 1 ? draftColumnHide : processState === 6 ? voidColumnHide : undefined}
        scroll={{
          x: 'max-content',
        }}
      />
      {showExpressModal && (
        <ExpressModal onCancel={() => setShowExpressModal(false)} expressInfo={expressInfo}></ExpressModal>
      )}
    </>
  );
}

export default observer(Index);
