import { downLoadAllAttach, downLoadAttach, getAttach } from '@/api/historyData';
import { DownloadOutlined } from '@ant-design/icons';
import Table from '@c/proTable';
import { downloadByBlob } from '@u/tools';
import { Button, Spin } from 'antd';
import React from 'react';

export default function Index(props) {
  const { claimId = 292828 } = props;
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);

  React.useEffect(() => {
    getList(claimId);
  }, []);

  const getList = data => {
    setLoading(true);
    getAttach(data)
      .then(res => {
        setDataSource(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownload = data => {
    downLoadAttach({
      claimAttach: {
        claimId: data.claimId,
        attachId: data.attachId,
      },
      claimImageAttach: {},
    }).then(res => {
      downloadByBlob(new Blob([res]), data.attachName);
    });
  };

  const handleDownloadAll = () => {
    downLoadAllAttach({
      claimId,
      claimAttachIds: dataSource.map(item => item.attachId).join(','),
    }).then(res => {
      downloadByBlob(new Blob([res]), 'attach.zip');
    });
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 120,
      align: 'center',
      render: (value, record, index) => index + 1,
    },
    {
      title: '附件名称',
      dataIndex: 'attachName',
      render: (value, record) => {
        return (
          <div className="flex items-center hover:text-blue-500 cursor-pointer" onClick={() => handleDownload(record)}>
            <span className="mr-2">{value}</span>
            <DownloadOutlined />
          </div>
        );
      },
    },
    {
      title: '上传时间',
      dataIndex: 'uploadDate',
    },
    {
      title: '上传人',
      dataIndex: 'createUser',
    },
  ];

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={dataSource}
        toolsLeft={
          <Button type="primary" onClick={handleDownloadAll}>
            下载全部附件
          </Button>
        }
        scroll={{
          x: 'max-content',
        }}
        pagination={false}
      ></Table>
    </Spin>
  );
}
