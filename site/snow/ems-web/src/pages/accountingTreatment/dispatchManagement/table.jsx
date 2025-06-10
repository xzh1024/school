import { openClaim } from '@/api/index';
import useStores from '@/store';
import { UploadOutlined } from '@ant-design/icons';
import {
  changeClaimUseCacheFlag,
  changeRushFlag,
  downloadTemplate,
  getSwitchStatus,
  importData,
} from '@api/accountingTreatment/dispatchManagement';
import Table from '@c/proTable';
import { downloadByBlob } from '@u/tools';
import { Button, Switch, Tag, Tooltip, Upload } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { dispatchManagement } = useStores();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const { dataSource, loading, currentPage, pageSize, total } = dispatchManagement;
  const [switchStatus, setSwitchStatus] = useState(false);
  const [rushStatus, setRushStatus] = useState(false);

  useEffect(() => {
    getInitStatus();
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
      fixed: 'left',
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: 'userName',
      title: '用户名',
      width: 160,
      align: 'center',
      fixed: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'empCode',
      title: '员工编号',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'empName',
      title: '员工姓名',
      align: 'center',
      width: 130,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'expCategoryCode',
      title: '业务类别编码',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'expCategoryName',
      title: '业务类别名称',
      width: 180,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'priorityLevel',
      title: '优先级',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
      render: value => {
        return value > 0 ? <Tag color="error">优先</Tag> : <Tag color="warning">普通</Tag>;
      },
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
      width: 120,
      align: 'center',
      ...ellipsisColumn,
      render: value => (String(value) === '1' ? '是' : '否'),
    },
    {
      dataIndex: 'orgId',
      title: '部门ID',
      width: 120,
      align: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createUser',
      title: '创建人',
      width: 160,
      align: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createTime',
      title: '创建时间',
      width: 240,
      align: 'left',
      ...ellipsisColumn,
      render: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    dispatchManagement.currentPage = pageCount;
    dispatchManagement.pageSize = pageSize;
    dispatchManagement.getTableList();
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: currentPage,
    onChange: handlePageChange,
  };

  const handleDownload = () => {
    setDownloadLoading(true);
    downloadTemplate()
      .then(res => {
        downloadByBlob(new Blob([res]), '员工抢单大类配置.xlsx');
      })
      .finally(() => {
        setDownloadLoading(false);
      });
  };

  const handleUpload = info => {
    const file = info.file;
    const formData = new FormData();
    formData.append('file', file);
    dispatchManagement.loading = true;
    importData(formData)
      .then(res => {
        window.$message.success('导入成功');
        dispatchManagement.getTableList();
      })
      .catch(() => {
        dispatchManagement.loading = false;
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

  const handleChangeRush = checked => {
    setRushStatus(checked);
    changeRushFlag(checked ? 1 : 0).then(() => {
      getInitStatus();
      window.$message.success('修改成功');
    });
  };

  const getInitStatus = () => {
    getSwitchStatus().then(res => {
      const { claimUseCacheFlag, rushStatus } = res.data;
      setSwitchStatus(!!claimUseCacheFlag);
      setRushStatus(!!rushStatus);
    });
  };

  const handleChangeCache = checked => {
    setSwitchStatus(checked);
    changeClaimUseCacheFlag(checked ? 1 : 0).then(() => {
      getInitStatus();
      window.$message.success('修改成功');
    });
  };

  const toolsLeft = (
    <div className="flex items-center">
      <div className="mr-3">
        <span className="pr-1">抢单开关状态</span>
        <Switch
          checked={rushStatus}
          checkedChildren="打开"
          unCheckedChildren="关闭"
          onChange={handleChangeRush}
        ></Switch>
      </div>
      <div>
        <span className="pr-1">优先从缓存池抢单</span>
        <Switch
          checked={switchStatus}
          checkedChildren="打开"
          unCheckedChildren="关闭"
          onChange={handleChangeCache}
        ></Switch>
      </div>
    </div>
  );

  return (
    <Table
      columns={columns}
      rowKey={record => JSON.stringify(record)}
      loading={loading}
      toolsLeft={toolsLeft}
      tools={tools}
      onRow={record => ({
        onDoubleClick: () => {
          jumpToClaim(record.claimId);
        },
      })}
      onReload={() => dispatchManagement.getTableList()}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
