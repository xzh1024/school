import { openClaim } from '@/api/index';
import { exportData, getPrintData, updateHasPhysicalBills ,getOcrImageUrlByClaimId} from '@api/electronicImage/backlog';
import useStores from '@/store';
import { DownloadOutlined, ToTopOutlined, PrinterOutlined } from '@ant-design/icons';
import Table from '@c/proTable';
import { Button, Tooltip,Typography } from 'antd';
import dayjs from 'dayjs';
import { downloadByBlob } from '@u/tools';
import { runInAction } from 'mobx';
import { observer} from 'mobx-react';
import SvgIcon from '@c/svgIcon';
import { PROCESS_STATE } from '../../../utils/constants';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { submitImage } from '@api/electronicImage/index';
import FlowModal from '../components/flowModal';

const ellipsisColumn = {
  ellipsis: true,
  align: 'center',
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

const IMAGE_STATUS = {
  0: '待扫描',
  1: '待提交',
  2: '已提交',
  3: '待补扫',
  4: '扫描中',
  5: '验证失败',
  6: '提交失败',
  7: '已扫描',
  8: '重扫中',
  9: '已重扫',
  10: '已撤回',
  11: '待重扫',
  12: '待复核'
};

function Index() {
  const { backlog } = useStores();
  const { processed } = useStores();
  const { dataSource, total, pageCount, pageSize, loading,searchParams } = processed;
  const location = useLocation();
  const [paramsObject, setParamsObject] = useState({});  
  const [rowSelect, setRowSelect] = useState([]);
  const [modalCurrent, setModalCurrent] = useState({});
  const [isTH, setIsTH] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [showModal, setShowModal] = useState(false);
 

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let paramsObjected = Object.fromEntries(queryParams.entries());
    setParamsObject(paramsObjected);
  },[]);
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
      dataIndex: 'imageStatus',
      title: '影像状态',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
      render: (value) => {
        return IMAGE_STATUS[value];
      }
    },
    {
      dataIndex: 'billSource',
      title: '单据来源',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
      render: value => {
        let name = 'pc';
        if (value) {
          name = 'mobile';
        }

        return <SvgIcon name={name} style={{ height: '20px', width: '20px', verticalAlign: 'bottom' }}></SvgIcon>;
      },
    },
    {
      dataIndex: 'imageMode',
      title: '新旧单据',
      align: 'center',
      width: 120,
      render: (value) => {
        return value === 'O' ? '新单据' : '旧单据';
      }
    },
    {
      dataIndex: 'hasPhysicalBills',
      title: '有无实物',
      align: 'center',
      width: 120,
      render: (value) => {
        return value === 1 ? '有' : '无';
      }
    },
    {
      dataIndex: 'documentNum',
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
      title: '扫描号',
      align: 'center',
      width: 200,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'expCategoryName',
      title: '业务类别',
      align: 'center',
      width: 180,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'proposer',
      title: '申请人',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'descript',
      title: '提示信息',
      width: 240,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'proposerDept',
      title: '申请人部门',
      width: 240,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'ouName',
      title: '申请人公司',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'sjApplyOrgName',
      title: '归属公司',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'imageAmount',
      title: '影像张数',
      width: 80,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'attachmentAmount',
      title: '附件张数',
      width: 80,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'applyAmount',
      title: '报账金额',
      width: 80,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'submitTime',
      title: '处理日期',
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
      dataIndex: 'processState',
      title: '流程状态',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'glDate',
      title: '总账期间',
      width: 140,
      align: 'center',
      ...ellipsisColumn,
      render: value => {
        return value ? (
          <Tooltip title={dayjs(value).format('YYYY-MM')}>
            <span>{dayjs(value).format('YYYY-MM')}</span>
          </Tooltip>
        ) : (
          value
        );
      },
    },
    {
      dataIndex: 'currentTransactor',
      title: '当前处理人',
      width: 300,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'actions',
      title: '操作',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (value, record) => {
        return (
          <>
            <Button type='link' className="!px-1" onClick={() => handleMenuClick({...record, menuKey: '1'})}>
              查看
              </Button>
            {/* <Button type="link" className="!px-1" onClick={() => handleFlowModal(record)}>
              提交
            </Button>
            <Button type="link" className="!px-1" danger onClick={() => handleFlowModal(record, true)}>
              退回
            </Button> */}
          </>
        );
      }
    },
    
  ];
  const handleFlowModal = (record, flag, isTransfer) => {
    const data = {
      id: record.id,
    };
    if (flag) {
      data.cancelStatus = 1;
    }
    if (isTransfer) {
      setIsTH(!!flag);
      setModalCurrent(record);
      setShowModal(true);
      setIsTransfer(!!isTransfer);
      return;
    }
    backlog.loading = true;
    submitImage(data)
      .then(res => {
        console.log(res, 33333);    
        setIsTH(!!flag);
        setModalCurrent(record);
        setShowModal(true);
        setIsTransfer(!!isTransfer);
      })
      .finally(() => {
        backlog.loading = false;
      });
  };
  const handleMenuClick = ({ menuKey, ...record }) => {
    if (menuKey === '2') {
      console.log(record, 33333, Number(!record.hasPhysicalBills), record.hasPhysicalBills);
      handleUpdatePhysical(record);
    }else if(menuKey === '1'){
      console.log(record, 33333, Number(!record.hasPhysicalBills), record.hasPhysicalBills);
      handlEcheck(record);
    }
  };
  const handlEcheck = record => { 
    console.log(location);
    runInAction(() => {
      backlog.loading = true;
      getOcrImageUrlByClaimId({
        "claimId":record.claimId,
       ...paramsObject,
        "isAudit": "",
        "isDel": "0",
        "isDisPlayDelBtn": ""
      })
        .then(res => {
          if (res.data.imageToken) {
            sessionStorage.setItem('imageToken', res.data.imageToken);
            sessionStorage.setItem('claimId', record.claimId);
            sessionStorage.setItem('claimNo', record.documentNum);
          }
          window.open(res.data.url);
          // backlog.loading = false;
          backlog.getLists();
        })
        .catch(() => {
          backlog.loading = false;
        });
    });
  };
  const handleUpdatePhysical = record => {
    runInAction(() => {
      backlog.loading = true;
      updateHasPhysicalBills({
        claimId: record.claimId,
        hasPhysicalBill: Number(!record.hasPhysicalBills),
      })
        .then(res => {
          window.$message.success('操作成功');
          backlog.getLists();
        })
        .catch(() => {
          backlog.loading = false;
        });
    });
  };

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    runInAction(() => {
      processed.pageCount = pageCount;
      processed.pageSize = pageSize;
      processed.getLists();
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


  const tools = (
    <>
      <Button icon={<ToTopOutlined />} disabled={loading} type="primary">
        批量扫描
      </Button>
    </>
  );

  // 打印首页
  const handlePrint = () => {
    if (rowSelect.length === 0) {
      return window.$message.warning('请选择需要打印的报账单');
    }
    backlog.loading = true;
    getPrintData({
      claimIdsStr: rowSelect.join(','),
      printConfig: {
        tax: 'Y',
      },
    })
      .then(res => {
        var a = window.open(process.env.REACT_APP_MAIN_HOST + '/electronic-image/backlog/print');
        a.window.printData = res.data || {};
      })
      .finally(() => (backlog.loading = false));
  };
  //导出
  let exportLoading = false;
  const handleExport = () => {
    if (exportLoading) return;
    exportLoading = true;
    console.log(searchParams,999);
    exportData(searchParams)
      .then(res => {
        console.log(res);
        const blob = new Blob([res]);
        downloadByBlob(blob, `影像已办-${dayjs().format('YYYYMMDDHHmmss')}.xls`);
        exportLoading = false;
      })
      .catch(() => (exportLoading = false));
  };

  const toolsLeft = (
    <>
      <Button icon={<PrinterOutlined />} disabled={loading} type="primary" onClick={handlePrint}>
        打印首页
      </Button>
      <Button
        icon={<DownloadOutlined />}
        disabled={loading}
        type="primary"
        onClick={handleExport}
        style={{
          marginLeft: '10px',
        }}
      >
        导出excel
      </Button>
      {/* <Button
        disabled={loading}
        type="primary"
        style={{
          marginLeft: '10px',
        }}
      >
        提交流程
      </Button>
      <Button
        disabled={loading}
        type="primary"
        style={{
          marginLeft: '10px',
        }}
      >
        退回流程
      </Button> */}
    </>
  );
 
  const handleRowChange = (keys, rows) => {
    setRowSelect(keys);
  };
  return (
    <>
    <Table
      loading={loading}
      columns={columns}
      toolsLeft={toolsLeft}
      rowKey="claimId"
      // loading={loading}
      onReload={() => {}}
      pagination={pagination}
      rowSelection={{
        onChange: handleRowChange,
      }}
      dataSource={dataSource}
      // tools={tools}
      scroll={{
        x: 'max-content',
      }}
    />
    {showModal && (
      <FlowModal
        record={modalCurrent}
        done={() => backlog.getLists()}
        cancel={() => setShowModal(false)}
        isTH={isTH}
        isTransfer={isTransfer}
      />
    )}
      </>
  );
}

export default observer(Index);
