import { PageContainer } from '@ant-design/pro-components';
import { doSuction, doSuctionPurchase, getSuctionList, getSuctionListPurchase } from '@api/otherPage/suction';
import CompSelect from '@c/compSelect';
import Table from '@c/proTable';
import { Button, Col, DatePicker, Form, Row, Spin, theme } from 'antd';
import React, { useEffect } from 'react';

export default function Index() {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [isPurchase, setIsPurchase] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const [tableLoading, setTableLoading] = React.useState(false);

  useEffect(() => {
    setIsPurchase(window.location.pathname.includes('purchase'));
    getList(window.location.pathname.includes('purchase'));
  }, []);
  const getList = isPurchase => {
    const func = isPurchase ? getSuctionListPurchase : getSuctionList;
    setTableLoading(true);
    func()
      .then(res => {
        const data = Object.keys(res.data).map(key => {
          return {
            code: key,
            name: res.data[key],
          };
        });

        setDataSource(data);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const handleFinish = async values => {
    if (values.newOuCode === values.oldOuCode) {
      return window.$message.error('关停公司与吸并入新公司不能相同');
    }

    const func = isPurchase ? doSuctionPurchase : doSuction;

    values.glDate = values.glDate.format('YYYY-MM-DD');

    window.$modal.confirm({
      title: '提示',
      content: '吸并业务处理流程不可逆，请确认是否执行',
      onOk: () => {
        setLoading(true);
        func(values)
          .then(res => {
            window.$message.success('操作成功');
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };
  // className="unique-page"
  return (
    <div>
      <PageContainer
        fixedHeader
        header={{
          title: '吸并业务',
          style: {
            backgroundColor: token.colorBgContainer,
            boxShadow: token.boxShadowTertiary,
          },
        }}
      >
        <div className="w-full pt-4">
          <Spin spinning={loading}>
            <div className="bg-white p-4 mb-4 pb-2">
              <Form form={form} onFinish={handleFinish}>
                <Row gutter={20}>
                  <Col span={6}>
                    <Form.Item label="被吸并公司" name="oldOuCode" rules={[{ required: true }]}>
                      <CompSelect />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="吸并入新公司" name="newOuCode" rules={[{ required: true }]}>
                      <CompSelect />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="吸并日期" name="glDate" rules={[{ required: true }]}>
                      <DatePicker allowClear className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <div className="text-right">
                      <Button type="primary" onClick={form.submit}>
                        吸并处理
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </div>
          </Spin>
          <Table
            toolsLeft={'业务处理范围'}
            loading={tableLoading}
            rowKey={record => record.code}
            columns={[
              { title: '业务编码', dataIndex: 'code' },
              { title: '业务编码', dataIndex: 'name' },
            ]}
            dataSource={dataSource}
          />
        </div>
      </PageContainer>
    </div>
  );
}
