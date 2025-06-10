import { delFile, downloadFile, getExportFiles } from '@api/comprehensiveQuery';
import { Button, Col, DatePicker, Form, Modal, Row, Table, Tooltip, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

const ellipsisColumn = {
  ellipsis: true,
  render: value => (
    <Tooltip title={value}>
      <span>{value}</span>
    </Tooltip>
  ),
};

export default function FilesDownload({ onCancel }) {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = (data = {}) => {
    setLoading(true);
    getExportFiles(data)
      .then(res => {
        setDataSource(res.data.records);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDel = fileId => {
    setLoading(true);
    delFile(fileId)
      .then(res => {
        message.success('删除成功！');
        getFiles();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const downloadFileFunc = (fileUrl, fileName) => {
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 下载数据
  const handleDown = (fileId, fileName) => {
    setLoading(true);
    downloadFile(fileId)
      .then(res => {
        console.log(res, 222222);
        downloadFileFunc(res.data, fileName);
        // downloadByBlob(new Blob([res]), fileName);
        getFiles();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      dataIndex: 'fileName',
      title: '文件名',
      width: 300,
      ...ellipsisColumn,
    },
    {
      dataIndex: 'createTime',
      title: '导出日期',
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
      dataIndex: 'createUser',
      title: '创建人',
      width: 120,
      align: 'center',
      ...ellipsisColumn,
    },
    {
      dataIndex: 'action',
      title: '操作',
      align: 'center',
      ...ellipsisColumn,
      render: (value, record) => {
        return (
          <div>
            <Button type="link" danger onClick={() => handleDel(record.fileId)}>
              删除
            </Button>
            <Button type="link" onClick={() => handleDown(record.fileId, record.fileName)}>
              下载
            </Button>
          </div>
        );
      },
    },
  ];

  // 查询
  const handleSearch = value => {
    if (value.exportDate) {
      value.exportDateStart = dayjs(value.exportDate[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
      value.exportDateEnd = dayjs(value.exportDate[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
      delete value.exportDate;
    }
    getFiles(value);
  };

  return (
    <Modal width={800} open={true} title="下载" onCancel={onCancel}>
      <div>
        <Form form={form} onFinish={handleSearch}>
          <Row>
            <Col span={16}>
              <Form.Item label="导出时间" name="exportDate">
                <RangePicker disabledDate={currentDate => dayjs(currentDate).isAfter(dayjs())} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <div style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: '10px' }} onClick={() => form.resetFields()}>
                  重置
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
        <div>
          <Table columns={columns} dataSource={dataSource} rowKey="fileId" loading={loading} />
        </div>
      </div>
    </Modal>
  );
}
