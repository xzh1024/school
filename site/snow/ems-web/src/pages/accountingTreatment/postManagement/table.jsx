import { openClaim } from '@/api/index';
import useStores from '@/store';
import { UploadOutlined } from '@ant-design/icons';
import { downloadTemplate, importData } from '@api/accountingTreatment/postManagement';
import Table from '@c/proTable';
import { downloadByBlob } from '@u/tools';
import { Button, Tooltip, Upload } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

function Index() {
  const { postManagement } = useStores();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const { dataSource, loading, currentPage, pageSize, total } = postManagement;

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
      dataIndex: 'empCode',
      title: '员工编号',
      width: 160,
      align: 'center',
      fixed: 'left',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'empName',
      title: '员工姓名',
      width: 300,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'expCategoryCode',
      title: '业务类别编码',
      align: 'center',
      width: 200,
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
      width: 240,
      align: 'center',
      ...ellipsisColumn,
      render: value => {
        return parseInt(value) < 1 ? '普通' : '优先';
      },
    },
    {
      dataIndex: 'businessTypeCode',
      title: '业务循环编码',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'businessTypeName',
      title: '业务循环名称',
      width: 160,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'coverStatus',
      title: '顶岗状态',
      width: 130,
      align: 'center',
      ...ellipsisColumn,
      render: value => (value === 'OPEN' ? '打开' : '关闭'),
    },
    {
      dataIndex: 'coverStatusCache',
      title: '顶岗状态缓存',
      width: 320,
      align: 'left',
      ...ellipsisColumn,
    },
  ];

  // 分页变化
  const handlePageChange = (pageCount, pageSize) => {
    postManagement.currentPage = pageCount;
    postManagement.pageSize = pageSize;
    postManagement.getTableList();
  };

  const pagination = {
    total: total,
    pageSize: pageSize,
    current: currentPage,
    onChange: handlePageChange,
  };

  const leftTools = (
    <>
      <Button type="primary" onClick={() => (postManagement.showPostStatus = true)}>
        顶岗状态管理
      </Button>
    </>
  );

  const handleDownload = () => {
    setDownloadLoading(true);
    downloadTemplate()
      .then(res => {
        downloadByBlob(new Blob([res]), '顶岗抢单大类配置.xlsx');
      })
      .finally(() => {
        setDownloadLoading(false);
      });
  };

  const handleUpload = info => {
    const file = info.file;
    const formData = new FormData();
    formData.append('file', file);
    postManagement.loading = true;
    importData(formData)
      .then(res => {
        window.$message.success('导入成功');
        postManagement.getTableList();
      })
      .catch(() => {
        postManagement.loading = false;
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
      onRow={record => ({
        onDoubleClick: () => {
          jumpToClaim(record.claimId);
        },
      })}
      onReload={() => postManagement.getTableList()}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{
        x: 'max-content',
      }}
    />
  );
}

export default observer(Index);
