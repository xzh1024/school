import useStores from '@/store';
import { SearchOutlined } from '@ant-design/icons';
import CategorySelect from '@c/categorySelectByTree';
import CompSelect from '@c/compSelect';
import MoreSearch from '@c/moreSearch';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const RangePicker = DatePicker.RangePicker;
const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
function Index({ activeKey }) {
  const [form] = Form.useForm();
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const { billsProcessed } = useStores();
  const { loading } = billsProcessed;

  useEffect(() => {
    form.resetFields();

    if (activeKey === '1') {
      form.setFieldsValue({
        dateRange: '30',
      });
    }
  }, [activeKey]);

  // 校验金额
  const checkAmount = (rule, value) => {
    const { start, end } = form.getFieldValue('applyAmount') || {};
    if (parseFloat(end) < parseFloat(start)) {
      return Promise.reject('结束金额必须大于或等于起始金额');
    }
    return Promise.resolve();
  };

  const handleSearch = value => {
    const params = value;
    if (params.handerDate) {
      params.handerDateStart = dayjs(params.handerDate[0]).format('YYYY-MM-DD');
      params.handerDateEnd = dayjs(params.handerDate[1]).format('YYYY-MM-DD');
    }

    if (params.applyDate) {
      params.applyDateStart = dayjs(params.applyDate[0]).format('YYYY-MM-DD');
      params.applyDateEnd = dayjs(params.applyDate[1]).format('YYYY-MM-DD');
    }

    if (params.glDateEnd) {
      params.glDateStart = dayjs(params.glDateEnd).format('YYYY-MM-DD');
      params.glDateEnd = dayjs(params.glDateEnd).format('YYYY-MM-DD');
    }

    if (params.item2Code) {
      params.item2Code = params.item2Code.join(',');
    }

    if (params.dateRange === 'all') {
      params.dateRange = '';
    }

    params.applyAmountStart = params.applyAmount?.start;
    params.applyAmountEnd = params.applyAmount?.end;

    delete params.applyAmount;
    delete params.applyDate;
    delete params.handerDate;

    billsProcessed.searchParams = params;
    if (activeKey === '1') {
      billsProcessed.getApproveLists();
      return;
    }
    if (activeKey === '2') {
      billsProcessed.getHaveReadLists();
      return;
    }
    if (activeKey === '3') {
      billsProcessed.getFeedbackLists();
      return;
    }
  };

  const handleReset = () => {
    form.resetFields();
    billsProcessed.searchParams = {};
    if (activeKey === '1') {
      billsProcessed.getApproveLists();
      return;
    }
    if (activeKey === '2') {
      billsProcessed.getHaveReadLists();
      return;
    }
    if (activeKey === '3') {
      billsProcessed.getFeedbackLists();
      return;
    }
  };

  return (
    <MoreSearch toggle={setShowMoreSearch}>
      <Form form={form} onFinish={handleSearch} {...layout}>
        <Row gutter={20}>
          <Col span={6} order={1}>
            <Form.Item label="归属公司" name="ouCode">
              <CompSelect />
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="报账单号" name="claimNo">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item label="业务类别" name="item2Code">
              <CategorySelect multiple />
            </Form.Item>
          </Col>

          <Col span={6} order={4 + !showMoreSearch}>
            <Form.Item label="供应商名称" name="vendorName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} order={5 + !showMoreSearch}>
            <Form.Item label="申请人" name="applyEmpName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6} order={6 + !showMoreSearch}>
            <Form.Item
              label="报账金额"
              name="applyAmount1"
              rules={[{ validator: checkAmount, validateTrigger: 'onChange' }]}
            >
              <Space.Compact>
                <Form.Item noStyle name={['applyAmount', 'start']}>
                  <InputNumber min="0" precision={2} stringMode controls={false} style={{ width: '100%' }} />
                </Form.Item>
                <span style={{ margin: '0 6px' }}>~</span>
                <Form.Item noStyle name={['applyAmount', 'end']}>
                  <InputNumber min="0" precision={2} stringMode controls={false} style={{ width: '100%' }} />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </Col>
          <Col span={6} order={7 + !showMoreSearch}>
            <Form.Item label="会计期间" name="glDateEnd">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6} order={8 + !showMoreSearch}>
            <Form.Item label="申请日期" name="applyDate">
              <RangePicker className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6} order={9 + !showMoreSearch}>
            <Form.Item label="处理日期" name="handerDate">
              <RangePicker className="w-full" />
            </Form.Item>
          </Col>
          {activeKey === '1' && (
            <Col span={6} order={10 + !showMoreSearch}>
              <Form.Item label="时间跨度" name="dateRange">
                <Select
                  options={[
                    {
                      label: '全部',
                      value: 'all',
                    },
                    {
                      label: '15天',
                      value: '15',
                    },
                    {
                      label: '30天',
                      value: '30',
                    },
                    {
                      label: '45天',
                      value: '45',
                    },
                    {
                      label: '60天',
                      value: '60',
                    },
                    {
                      label: '90天',
                      value: '90',
                    },
                  ]}
                  allowClear
                />
              </Form.Item>
            </Col>
          )}

          <Col
            span={showMoreSearch ? (activeKey === '1' ? 12 : 18) : 6}
            order={showMoreSearch ? (activeKey === '1' ? 11 : 10) : 4}
          >
            <div className="text-right">
              <Button loading={loading} icon={<SearchOutlined />} type="primary" className="mr-2" htmlType="submit">
                查询
              </Button>
              <Button disabled={loading} onClick={handleReset}>
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </MoreSearch>
  );
}

export default observer(Index);
