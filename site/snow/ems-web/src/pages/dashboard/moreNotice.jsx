import { getMoreNotice } from '@api/dashboard';
import Loading from '@c/loading';
import Table from '@c/proTable';
import { Button, Col, Form, Input, Modal, Row, Select, Tooltip } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
export default function Index({ onCancel }) {
  const [form] = Form.useForm();
  const [data, setData] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const openViewPage = noticeId => {
    noticeId && window.open(process.env.REACT_APP_MAIN_HOST + '/view?noticeId=' + noticeId, '_blank');
  };

  const columns = [
    {
      title: '公告标题',
      dataIndex: 'noticeTitle',
      ellipsis: true,
      render: (value, record) => {
        return (
          <Tooltip title={value}>
            <Button type="link" onClick={() => openViewPage(record.noticeId)}>
              {value}
            </Button>
          </Tooltip>
        );
      },
    },
    {
      title: '公告类型',
      dataIndex: 'noticeType',
      width: 120,
      render: value => {
        if (value === '1') {
          return '新闻';
        }
        if (value === '2') {
          return '知识文档';
        }
        return '';
      },
    },
    {
      title: '作者',
      width: 120,
      dataIndex: 'noticeAuthor',
    },
    {
      title: '是否置顶',
      width: 120,
      dataIndex: 'noticeTop',
      render: value => {
        return value === 'Y' ? '是' : '否';
      },
    },
    {
      title: '截止日期',
      width: 170,
      dataIndex: 'noticeEndDate',
      render: value => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  useEffect(() => {
    getList(1, 10);
  }, []);

  const getList = (page = 1, pageSize = 10) => {
    setLoading(true);
    getMoreNotice({
      ...form.getFieldsValue(),
      pageIndex: page,
      pageSize: pageSize,
    })
      .then(res => {
        const { records, total } = res.data;
        setData(records);
        setTotal(total);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal width={'75%'} title="公告信息列表" open onCancel={onCancel} footer={null}>
      <Loading spinning={loading}>
        <Form form={form} {...layout}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="标题公告" name="noticeTitle">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="类型" name="noticeType">
                <Select
                  options={[
                    {
                      label: '新闻',
                      value: '1',
                    },
                    {
                      label: '知识文档',
                      value: '2',
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <div className="text-right">
                <Button type="primary" className="mr-2" onClick={() => getList(1, 10)}>
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    getList(1, 10);
                  }}
                >
                  重置
                </Button>
              </div>
            </Col>
          </Row>
        </Form>

        <Table
          key="noticeId"
          columns={columns}
          dataSource={data}
          pagination={{
            total,
            onChange: getList,
          }}
        ></Table>
      </Loading>
    </Modal>
  );
}
