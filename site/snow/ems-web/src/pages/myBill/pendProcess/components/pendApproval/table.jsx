import { createWdCode, getWdCode } from '@/api/myBill/pendProcess';
import useStores from '@/store';
import { openClaim } from '@api';
import Table from '@c/proTable';
import { Button, Image, message, Modal, notification, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import pendProcessImgs from 'public/images/pendProcess/index';

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
  const { pendApproval } = useStores();
  const { dataSource, total, pageCount, pageSize, loading } = pendApproval;
  const [api, contextHolder] = notification.useNotification();
  const [modal, modalContextHolder] = Modal.useModal();
  const { commDicts } = props.data;

  const jumpToClaim = record => {
    openClaim({
      claimId: record.claimId,
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
    // {
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
    {
      dataIndex: 'status',
      title: '操作',
      fixed: 'right',
      width: 120,
      align: 'center',
      render: (text, record) => {
        return record?.sourceFlag && record.sourceFlag === 'SDG' ? (
          <div className="text-center">
            {contextHolder}
            {modalContextHolder}
            <Button type="link" onClick={() => handleGetCode(record)}>
              取件码
            </Button>
          </div>
        ) : (
          ''
        );
      },
    },
  ];

  //获取取件码
  const handleGetCode = async record => {
    const res = await getWdCode({ claimNo: record.claimNo });
    if (res.code === 200) {
      if (res.data) {
        //成功返回取件码
        api.open({
          message: `取件码为：${res.data}`,
          duration: 0,
          placement: 'top',
        });
      } else {
        modal.confirm({
          content: '请确认是否从智能收单柜取回实物单据？',
          okText: '确认',
          cancelText: '取消',
          onOk: async () => {
            //成功但无取件码，需要调用生成取件码接口
            const resData = await createWdCode({ claimNo: record.claimNo });
            if (resData.code === 200) {
              api.open({
                message: `取件码为：${resData.data}`,
                duration: 0,
                placement: 'top',
              });
            }
          },
        });
      }
    } else {
      //失败情况
      message.warning(res.message);
    }
  };

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    runInAction(() => {
      pendApproval.pageCount = pageCount;
      pendApproval.pageSize = pageSize;
      pendApproval.getLists();
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
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
