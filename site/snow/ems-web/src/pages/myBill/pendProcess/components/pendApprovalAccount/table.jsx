import useStores from '@/store';
import { Button, DatePicker, Image, message, Modal, Select, Space, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
// import { runInAction } from 'mobx';
import {
  allOrderGrab,
  initialOrderGrab,
  noteClaimApproveFlag,
  noteClaimPendingRecord,
  reviewOrderGrab,
  updateAccountGldate,
} from '@/api/myBill/pendProcess';
import { openClaim } from '@api';
import ProTable from '@c/proTable';
import SvgIcon from '@c/svgIcon';
import { observer } from 'mobx-react';
import pendProcessImgs from 'public/images/pendProcess/index';
import React, { useState } from 'react';

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
  const { urgencyDicts, commDicts, accountPool1WrestFlag, accountCoverWrestFlag, glWrestFlag } = props.data;
  const { pendProcess } = useStores();
  const { dataSource, total, pageCount, pageSize, loading, selectKey } = pendProcess;
  const [show, setShow] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [btnTxt, setBtnTxt] = useState('初审池抢单');
  const [btnLoading, setBtnLoading] = useState(false);
  /*****************************************************************触发事件*/
  //选中暂挂/取消
  const handleSelectStatus = (value, options, record) => {
    const params = {
      claimId: record.claimId,
      claimNo: record.claimNo,
      stateCode: record.currentStepId,
      pendingFlag: value,
    };
    noteClaimPendingRecord(params)
      .then(() => {
        initList();
      })
      .catch(() => {});
  };

  //选中标记
  const handleSelectMark = (value, options, record) => {
    const chooseData = urgencyDicts?.filter(item => item.dictCode === value)[0];
    const params = {
      claimId: record.claimId,
      claimNo: record.claimNo,
      stateCode: record.currentStepId,
      flagCode: chooseData.dictCode,
      flagDesc: chooseData.dictName,
    };
    if (record.extend2) params.flagId = record.extend2; //编辑时必传
    noteClaimApproveFlag(params)
      .then(() => {
        initList();
      })
      .catch(() => {});
  };

  //选中
  const handleSelectChange = (selectedRowKeys, selectedRow) => {
    pendProcess.selectKey = selectedRow;
  };

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    pendProcess.pageCount = pageCount;
    pendProcess.pageSize = pageSize;
    pendProcess.getLists();
  };

  //批量修改会计期间
  const handleEditDate = () => {
    if (pendProcess.selectKey.length === 0) {
      message.warning('请选择报账单！');
      return;
    }
    setShow(true);
  };

  //初审池抢单
  const handleInitialOrderGrab = () => {
    setBtnLoading(true);
    disabledByClick();
    initialOrderGrab()
      .then(res => {
        initList();
        window.$notify.success({
          message: '抢单成功',
          description: `成功抢到${(res.data || []).length}单据：${(res.data || []).join(',')}`,
          placement: 'topRight',
          showProgress: true,
        });
      })
      .catch(() => {});
  };

  //顶岗抢单
  const handleReviewOrderGrab = () => {
    reviewOrderGrab()
      .then(res => {
        window.$notify.success({
          message: '抢单成功',
          description: `成功抢到${(res.data || []).length}单据：${(res.data || []).join(',')}`,
          placement: 'topRight',
          showProgress: true,
        });
        initList();
      })
      .catch(err => {});
  };

  //总账业务抢单
  const handleAllOrderGrab = () => {
    allOrderGrab()
      .then(res => {
        window.$notify.success({
          message: '抢单成功',
          description: `成功抢到${(res.data || []).length}单据：${(res.data || []).join(',')}`,
          placement: 'topRight',
          showProgress: true,
        });
        initList();
      })
      .catch(err => {});
  };

  const handleChangeDate = (date, dateString) => {
    setDateValue(date);
  };

  //弹出框点击确认
  const handleOk = () => {
    const params = {
      glDate: dayjs(dateValue).format('YYYY-MM-DD'),
      claimIds: pendProcess.selectKey.map(item => item.claimId).join(','),
    };
    updateAccountGldate(params)
      .then(() => {
        initList();
        setDateValue('');
        setShow(false);
        pendProcess.selectKey = [];
      })
      .catch(() => {});
  };

  //弹出框点击取消
  const handleCancel = () => {
    setDateValue('');
    setShow(false);
  };

  const initList = () => {
    pendProcess.pageCount = 1;
    pendProcess.pageSize = 10;
    pendProcess.getLists();
  };
  /*****************************************************************固定配置*/
  const columns = [
    {
      dataIndex: 'index',
      title: '序号',
      align: 'center',
      width: 50,
      fixed: 'left',
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: 'extend1', //0=>取消，1=>暂挂
      title: '暂挂/取消',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: (value, record) => {
        return (
          <Select
            value={value}
            style={{ width: '100%' }}
            onSelect={(value, options) => handleSelectStatus(value, options, record)}
            options={[
              { value: 1, label: '暂挂' },
              { value: 0, label: '取消' },
            ]}
          />
        );
      },
    },
    {
      dataIndex: 'claimNo',
      title: '报账单号',
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
    {
      dataIndex: 'item2Name', //emergencyLevel==='3'，显示红色，整行标红
      title: '业务类别',
      width: 160,
      ...ellipsisColumn,
      align: 'left',
    },
    {
      dataIndex: 'glDate',
      title: '总账期间',
      align: 'center',
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
      dataIndex: 'remark', //emergencyLevel==='3'，显示红色
      title: '报账事由',
      width: 240,
      ...ellipsisColumn,
      align: 'left',
    },
    {
      dataIndex: 'applyAmount', //可能无返回=>测试数据，
      title: '报账金额',
      align: 'center',
      width: 80,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyCompName',
      title: '归属公司',
      width: 240,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'vendorName',
      title: '供应商名称',
      width: 150,
      align: 'center',
      ...ellipsisColumn,
    },

    {
      dataIndex: 'applyEmpName',
      title: '申请人',
      align: 'center',
      width: 100,
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
      dataIndex: 'stateNameUserName',
      title: '上一审批人',
      width: 120,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'srmDes',
      title: '审核批注',
      align: 'center',
      width: 100,
    },
    {
      dataIndex: 'docId',
      title: '审核状态',
      align: 'center',
      width: 80,
      ...ellipsisColumn,
      render: value => {
        return (
          <span>
            <Image src={pendProcessImgs[value]} />
            {commDicts?.filter(item => item.dictCode === value)[0]?.dictName}
          </span>
        );
      },
    },
    {
      dataIndex: 'billSource', //Y=>移动端，空为PC，自动生成的也是默认为PC端
      title: '单据来源',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
      render: value => {
        if (value) {
          return (
            <span>
              <SvgIcon
                name={'mobile'}
                style={{ height: '20px', width: '20px', verticalAlign: 'bottom', marginRight: '4px' }}
              ></SvgIcon>
              移动端
            </span>
          );
        } else {
          return (
            <span>
              <SvgIcon
                name={'pc'}
                style={{ height: '20px', width: '20px', verticalAlign: 'bottom', marginRight: '4px' }}
              ></SvgIcon>
              PC端
            </span>
          );
        }
      },
    },
    {
      dataIndex: 'extend22', //用于显示， extend2用于编辑标记必传，新增后会返回
      title: '标记',
      align: 'center',
      width: 160,
      render: (value, record) => {
        return (
          <Select
            value={value}
            style={{ width: '100%' }}
            onSelect={(value, options) => handleSelectMark(value, options, record)}
            options={urgencyDicts?.map(item => ({ value: item.dictCode, label: item.dictName }))}
            placeholder="请选择"
          />
        );
      },
    },
  ];

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: pageCount,
    onChange: handlePageChange,
    pageSizeOptions: [10, 20, 50, 100],
    showSizeChanger: true,
  };

  const disabledByClick = () => {
    let content = '秒后再进行操作..';
    let count = 5;
    setBtnTxt(count + content);
    let timer = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearTimeout(timer);
        setBtnLoading(false);
        setBtnTxt('初审池抢单');
        return;
      }
      setBtnTxt(count + content);
    }, 1000);
  };

  const toolsLeft = (
    <Space>
      {/* <Button disabled={loading} type="primary" onClick={handleEditApproval}>
        批量修改审批
      </Button> */}
      <Button disabled={loading} type="primary" onClick={handleEditDate}>
        批量修改会计期间
      </Button>

      {accountPool1WrestFlag && (
        <Button disabled={btnLoading} type="primary" onClick={handleInitialOrderGrab}>
          {btnTxt}
        </Button>
      )}

      {accountCoverWrestFlag && (
        <Button disabled={loading} type="primary" onClick={handleReviewOrderGrab}>
          顶岗抢单
        </Button>
      )}

      {glWrestFlag && (
        <Button disabled={loading} type="primary" onClick={handleAllOrderGrab}>
          总账业务抢单
        </Button>
      )}
    </Space>
  );

  const jumpToClaim = record => {
    openClaim({
      claimId: record.claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  return (
    <>
      <ProTable
        resizeAble
        loading={loading}
        columns={columns}
        rowKey="claimId"
        onRow={record => {
          return {
            onDoubleClick: e => {
              jumpToClaim(record);
            },
          };
        }}
        rowSelection={{
          selectedRowKeys: selectKey.map(item => item.claimId),
          type: 'checkbox',
          onChange: handleSelectChange,
        }}
        toolsLeft={toolsLeft}
        onReload={() => {
          pendProcess.getLists();
        }}
        scroll={{
          x: 900,
        }}
        pagination={pagination}
        dataSource={dataSource}
      />

      <Modal title="总帐期间批量修改" open={show} onOk={handleOk} onCancel={handleCancel}>
        修改期间至： <DatePicker value={dateValue} allowClear onChange={handleChangeDate} />
      </Modal>
    </>
  );
}

export default observer(Index);
