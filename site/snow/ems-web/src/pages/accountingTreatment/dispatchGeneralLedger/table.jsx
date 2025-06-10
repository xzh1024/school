import useStores from '@/store';
import { UploadOutlined } from '@ant-design/icons';
import {
  downloadTemplate,
  glWrestExpCategory,
  importData,
  switchPostStatus,
} from '@api/accountingTreatment/dispatchGeneralLedger';
import Table from '@c/proTable';
import { downloadByBlob } from '@u/tools';
import { Button, Tooltip, Upload } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip align={{ dynamicInset: false }} title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { dispatchGeneralLedger } = useStores();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [priorityCachingStatusLoading, setPriorityCachingStatusLoading] = useState(false);
  const [grabOrdersStatus, setGrabOrdersStatus] = useState(false);
  const [priorityCachingStatus, setPriorityCachingStatus] = useState(true);
  const { dataSource, loading, currentPage, pageSize, total } = dispatchGeneralLedger;

  const getStatusFunc = () => {
    glWrestExpCategory()
      .then(res => {
        setGrabOrdersStatus(res?.data?.rushStatus);
        setPriorityCachingStatus(res?.data?.claimUseCacheFlag);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getStatusFunc();
  }, []);

  const columns = [
    {
      dataIndex: 'userName',
      title: '用户名',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'empCode',
      title: '员工编号',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'empName',
      title: '员工姓名',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'expCategoryCode',
      title: '业务类别编码',
      align: 'center',
      width: 120,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'expCategoryName',
      title: '业务类别名称',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'priorityLevel',
      title: '优先级',
      width: 80,
      align: 'center',
      ...ellipsisColumn,
      render: value => (value < 1 ? '普通' : '优先'),
    },
    {
      dataIndex: 'groupName',
      title: '组别',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'userFlag',
      title: '是否可抢',
      width: 80,
      align: 'center',
      ...ellipsisColumn,
      render: value => (String(value) === '1' ? '是' : '否'),
    },
    {
      dataIndex: 'orgId',
      title: '部门ID',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createUser',
      title: '创建人',
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      align: 'center',
      ...ellipsisColumn,
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    dispatchGeneralLedger.currentPage = pageCount;
    dispatchGeneralLedger.pageSize = pageSize;
    dispatchGeneralLedger.getTableList();
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: currentPage,
    onChange: handlePageChange,
  };

  const handleOpenAndCloseS = () => {
    setPriorityCachingStatusLoading(true);
    switchPostStatus({ openFlag: priorityCachingStatus ? 0 : 1 })
      .then(res => {
        const value = priorityCachingStatus ? 0 : 1;
        setPriorityCachingStatus(value);
      })
      .finally(() => {
        setPriorityCachingStatusLoading(false);
      });
  };

  const leftTools = (
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
      <Button type="primary" loading={priorityCachingStatusLoading} onClick={handleOpenAndCloseS}>
        {priorityCachingStatus ? '关闭优先从缓存池抢单' : '打开优先从缓存池抢单'}
      </Button>
      <span style={{ marginLeft: '8px' }}>
        (抢单开关状态:{grabOrdersStatus ? '打开' : '关闭'}) (优先从缓存池抢单:{priorityCachingStatus ? '打开' : '关闭'})
      </span>
    </div>
  );

  const handleDownload = () => {
    setDownloadLoading(true);
    downloadTemplate()
      .then(res => {
        downloadByBlob(new Blob([res]), '派单(总账)管理模板.xlsx');
      })
      .finally(() => {
        setDownloadLoading(false);
      });
  };

  const handleUpload = info => {
    const file = info.file;
    const formData = new FormData();
    formData.append('file', file);
    dispatchGeneralLedger.loading = true;
    importData(formData)
      .then(res => {
        window.$message.success('导入成功');
        dispatchGeneralLedger.getTableList();
      })
      .catch(() => {
        dispatchGeneralLedger.loading = false;
      });
  };

  const tools = (
    <>
      <Button className="mr-2" type="primary" onClick={handleDownload} loading={downloadLoading}>
        模板下载
      </Button>
      <Upload name="file" customRequest={handleUpload} showUploadList={false}>
        <Button icon={<UploadOutlined />}>导入</Button>
      </Upload>
    </>
  );

  return (
    <Table
      columns={columns}
      rowKey={record => JSON.stringify(record)}
      loading={loading}
      toolsLeft={leftTools}
      tools={tools}
      onReload={() => dispatchGeneralLedger.getTableList()}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
