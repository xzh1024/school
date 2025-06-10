import useStores from '@/store';
import { CaretDownFilled, CaretUpFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

const PROCESS_STATE = {
  0: '待处理',
  1: '已处理',
};

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

function Index() {
  const [form] = Form.useForm();
  const { rushBuyOrder } = useStores();
  const { downloadCenterShow } = rushBuyOrder;
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const [style, setStyle] = useState({
    maxHeight: '48px',
  });

  useEffect(() => {
    return () => {
      rushBuyOrder.searchParams = {};
      rushBuyOrder.dataSource = [];
      rushBuyOrder.pageIndex = 1;
      rushBuyOrder.total = 0;
    };
  }, []);

  // 是否展示更多
  const toggleSearch = () => {
    const data = { maxHeight: '48px' };
    if (!showMoreSearch) {
      data.maxHeight = '250px';
    }
    setStyle(data);
    if (showMoreSearch) {
      setTimeout(() => {
        setShowMoreSearch(!showMoreSearch);
      }, 290);
      return;
    }
    setShowMoreSearch(!showMoreSearch);
  };

  // 查询
  const handleSearch = value => {
    value = { ...value };
    if (value.applyDate) {
      value.createDateBegin = dayjs(value.applyDate[0]).format('YYYY-MM-DD');
      value.createDateEnd = dayjs(value.applyDate[1]).format('YYYY-MM-DD');
    }

    rushBuyOrder.searchParams = value;
    rushBuyOrder.pageCount = 1;
    rushBuyOrder.getList(value);
    return value;
  };

  // 校验金额
  const checkAmount = (rule, value) => {
    const { start, end } = form.getFieldValue('applyAmount') || {};
    if (parseFloat(end) < parseFloat(start)) {
      return Promise.reject('结束金额必须大于或等于起始金额');
    }
    return Promise.resolve();
  };

  return (
    <>
      <div className="comprehensive-query-container-search" style={style}>
        <Form
          form={form}
          // size='small'
          onFinish={handleSearch}
          {...layout}
          initialValues={{
            processState: '0',
          }}
        >
          <Row gutter={20}>
            <Col span={6} order={1}>
              <Form.Item label="员工工号" name="empCode">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={6} order={2}>
              <Form.Item label="员工LDAP" name="userName">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={6} order={3}>
              <Form.Item label="报账单号" name="claimNo">
                <Input allowClear />
              </Form.Item>
            </Col>
            <>
              <Col span={6} order={4}>
                <Form.Item label="处理状态" name="processStatus">
                  <Select
                    options={Object.keys(PROCESS_STATE).map(item => ({
                      label: PROCESS_STATE[item],
                      value: item,
                    }))}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={6} order={5 + !showMoreSearch}>
                <Form.Item label="创建日期" name="applyDate">
                  <RangePicker />
                </Form.Item>
              </Col>
            </>

            <Col span={6} order={showMoreSearch ? 6 : 3}>
              <div className="search-btns">
                <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    rushBuyOrder.searchParams = {};
                    rushBuyOrder.pageCount = 1;
                    rushBuyOrder.getList();
                  }}
                >
                  重置
                </Button>
                <Button
                  type="link"
                  icon={showMoreSearch ? <CaretUpFilled /> : <CaretDownFilled />}
                  onClick={toggleSearch}
                  style={{
                    padding: '0 0 0 10px',
                  }}
                >
                  {showMoreSearch ? '收起更多' : '展开更多'}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default observer(Index);
