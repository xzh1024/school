import { openClaim } from '@/api/index';
import useStores from '@/store';
import { DownOutlined, DownloadOutlined, PrinterOutlined } from '@ant-design/icons';
import {
  exportData,
  getImageToken,
  getOcrImageUrlByClaimId,
  getPrintData,
  imageHandleOcr,
  updateHasPhysicalBills,
} from '@api/electronicImage/backlog';
import { submitImage } from '@api/electronicImage/index';
import Table from '@c/proTable';
import SvgIcon from '@c/svgIcon';
import { downloadByBlob } from '@u/tools';
import { Button, Dropdown, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { process } from 'qiankun/es/sandbox/patchers/css';
import { useEffect, useState } from 'react';
import FlowModal from '../components/flowModal';

import { useLocation } from 'react-router-dom';

const ellipsisColumn = {
  ellipsis: true,
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
  12: '待复核',
};

let exportLoading = false;

function Index() {
  const { backlog } = useStores();
  const { dataSource, total, pageCount, pageSize, loading, searchParams } = backlog;
  const [showModal, setShowModal] = useState(false);
  const [modalCurrent, setModalCurrent] = useState({});
  const [isTH, setIsTH] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);

  const location = useLocation();

  // const orgId = queryParams.get('orgId'); // 获取orgId参数的值
  // const positionId = queryParams.get('positionId'); // 获取positionId参数的值

  const [paramsObject, setParamsObject] = useState({});
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let paramsObjected = Object.fromEntries(queryParams.entries());
    setParamsObject(paramsObjected);
  }, []);

  const jumpToClaim = claimId => {
    openClaim({
      claimId: claimId,
    }).then(res => {
      const openPage = window.open('', '_blank');
      openPage.location.href = res.data;
    });
  };

  const checkPhy = record => {
    backlog.loading = true;
    getImageToken(record.documentNum)
      .then(res => {
        const imageToken = res.data;
        sessionStorage.setItem('imageToken', imageToken);
        sessionStorage.setItem('claimId', `-${record.claimId}`);
        sessionStorage.setItem('claimNo', record.documentNum);
        window.open(process.env.REACT_APP_MAIN_HOST + '/image');
      })
      .finally(() => {
        backlog.loading = false;
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
      dataIndex: 'actions',
      title: '操作',
      width: 380,
      align: 'center',
      fixed: 'left',
      render: (value, record) => {
        const btnList = [
          {
            key: '1',
            label: '提交',
          },
          {
            key: '2',
            label: '退回',
          },
        ];

        if (record.sourceFlag === 'SDG') {
          btnList.unshift({
            key: '3',
            label: '实物更新',
          });
        }

        return (
          <>
            <Button type="link" className="px-1" onClick={() => handleScan(record)}>
              扫描
            </Button>
            {/* <Button type="link" className="px-1">
              实物更新
            </Button> */}
            <Button type="link" className="!px-1" onClick={() => handleFlowModal(record, undefined, true)}>
              转办
            </Button>
            <Button type="link" className="!px-1" onClick={() => handlEcheck(record)}>
              影像查看
            </Button>
            {record.sourceFlag !== 'SDG' ? (
              <Button type="link" className="!px-1" onClick={() => handleUpdatePhysical(record)}>
                实物更新
              </Button>
            ) : (
              <Button
                type="link"
                className="!px-1"
                onClick={() => checkPhy(record)}
                disabled={record.sourceFlag !== 'SDG'}
              >
                实物查看
              </Button>
            )}

            <Dropdown
              className="px-1"
              arrow
              trigger="click"
              onChange
              menu={{
                items: btnList,
                onClick: ({ key }) => handleMenuClick({ ...record, menuKey: key }),
              }}
            >
              <Typography.Link>
                更多
                <DownOutlined />
              </Typography.Link>
            </Dropdown>
          </>
        );
      },
    },
    {
      dataIndex: 'imageStatus',
      title: '影像状态',
      align: 'center',
      width: 110,
      ...ellipsisColumn,
      render: value => {
        switch (value) {
          case 0:
            return '待扫描';
          case 1:
            return '待提交';
          case 2:
            return '已提交';
          case 3:
            return '待补扫';
          case 4:
            return '扫描中';
          case 5:
            return '验证失败';
          case 6:
            return '提交失败';
          case 7:
            return '已扫描';
          case 8:
            return '重扫中';
          case 9:
            return '已重扫';
          case 10:
            return '已撤回';
          case 11:
            return '待重扫';
          case 12:
            return '待复核';
          default:
            return '';
        }
      },
    },
    {
      dataIndex: 'billSource',
      title: '单据来源',
      align: 'center',
      width: 80,
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
      width: 80,
      render: value => {
        return value === 'O' ? '新单据' : '旧单据';
      },
    },
    {
      dataIndex: 'processBackFlag',
      title: '是否退回',
      align: 'center',
      width: 80,
      render: value => {
        return value === 'Y' ? '是' : '否';
      },
    },
    {
      dataIndex: 'hasPhysicalBills',
      title: '有无实物',
      align: 'center',
      width: 80,
      render: value => {
        return value === 1 ? '有' : '无';
      },
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
      width: 200,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'proposer',
      title: '申请人',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'descript',
      title: '提示信息',
      width: 200,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'vendorName',
      title: `员工/供应商`,
      width: 180,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'proposerDept',
      title: '申请人部门',
      width: 240,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'ouName',
      title: '申请人公司',
      width: 160,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'sjApplyOrgName',
      title: '归属公司',
      width: 160,
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
      dataIndex: 'processBackReason',
      title: '退回原因',
      width: 300,
      align: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createTime',
      title: '接收日期',
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
      dataIndex: 'remark',
      title: '备注',
      width: 300,
      align: 'left',
      ...ellipsisColumn,
    },
  ];

  const handleScan = (record, flag, isTransfer) => {
    console.log(record);
    let data = {
      id: record.id,
    };
    submitImage(data)
      .then(res => {
        // console.log(res, 33333);
        // setIsTH(!!flag);
        // setModalCurrent(record);
        // setShowModal(true);
        // setIsTransfer(!!isTransfer);
        console.log(record);
        const params = {
          claimNo: record.documentNum,
          orgId: paramsObject.orgId,
          positionId: paramsObject.positionId,
          imageId: record.id,
        };
        backlog.loading = true;
        imageHandleOcr(params)
          .then(res => {
            // window.location.href = res.data;
            if (res.data.imageToken) {
              sessionStorage.setItem('imageToken', res.data.imageToken);
              sessionStorage.setItem('claimId', `-${record.claimId}`);
              sessionStorage.setItem('claimNo', record.documentNum);
            }
            window.open(res.data.url);
          })
          .finally(() => {
            backlog.loading = false;
          });
      })
      .finally(() => {
        backlog.loading = false;
      });
  };
  const handleMenuClick = ({ menuKey, ...record }) => {
    switch (menuKey) {
      case '1':
        handleFlowModal(record);
        break;
      case '2':
        handleFlowModal(record, true);
        break;
      case '3':
        handleUpdatePhysical(record);
        break;
    }
  };

  const handlEcheck = record => {
    console.log(record, 381283);
    runInAction(() => {
      backlog.loading = true;
      // imageUrl({
      //   btnType: 'view',
      //   SSOUserName: claimUrlParams.SSOUserName,
      //   claimId: record.claimId,
      //   orgId: currentRecord.orgId,
      //   positionId: currentRecord.positionId,
      //   stateType: 10,
      //   openMode: 4,
      // });
      getOcrImageUrlByClaimId({
        claimId: record.claimId,
        ...paramsObject,
        isAudit: '',
        isDel: '0',
        isDisPlayDelBtn: '1',
        isAudit2: '1',
      })
        .then(res => {
          console.log(res);
          // window.$message.success('操作成功');
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

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    runInAction(() => {
      backlog.pageCount = pageCount;
      backlog.pageSize = pageSize;
      backlog.getLists();
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

  const handleExport = () => {
    if (exportLoading) return;
    exportLoading = true;
    console.log(searchParams, 999);
    exportData(searchParams)
      .then(res => {
        console.log(res);
        const blob = new Blob([res]);
        downloadByBlob(blob, `影像代办-${dayjs().format('YYYYMMDDHHmmss')}.xls`);
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
        style={{
          marginLeft: '10px',
        }}
        onClick={handleExport}
      >
        导出Excel
      </Button>
    </>
  );

  const [rowSelect, setRowSelect] = useState([]);
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
