import useStores from '@/store';
import { SearchOutlined } from '@ant-design/icons';
import CategorySelect from '@c/categorySelectByTree';
import CompSelect from '@c/compSelect';
import MoreSearch from '@c/moreSearch';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

//待审批、待阅、待反馈公共头部
const commonSearch = props => {
  const [form] = Form.useForm();
  const { pendApproval, pendFeedback, pendRead } = useStores();
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const { type, refreshTable } = props;
  const [style, setStyle] = useState({
    maxHeight: '36px',
  });

  useEffect(() => {
    console.log(refreshTable, 388888);
    setMethod().getLists();
  }, [refreshTable]);

  // 是否展示更多
  const toggleSearch = () => {
    const data = { maxHeight: '36px' };
    if (!showMoreSearch) {
      data.maxHeight = '300px';
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
      value.applyDateStart = dayjs(value.applyDate[0]).format('YYYY-MM-DD');
      value.applyDateEnd = dayjs(value.applyDate[1]).format('YYYY-MM-DD');
    }

    value.applyAmountStart = value.applyAmount?.start;
    value.applyAmountEnd = value.applyAmount?.end;

    if (value.processState === '0') {
      delete value.processState;
    }

    delete value.applyAmount;
    delete value.applyDate;

    if (value.item2Code) {
      value.item2Code = value.item2Code.join(',');
    }

    let hasSearchParam = false;

    Object.keys(value).forEach(key => {
      if (value[key]) {
        hasSearchParam = true;
      }
    });

    if (!hasSearchParam) {
      window.$message.warning('请输入至少一项条件再进行查询');
      return;
    }

    const method = setMethod();
    method.searchParams = value;
    method.pageCount = 1;
    method.getLists(value);
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

  const setMethod = () => {
    if (type === 'pendApproval') {
      //待审批
      return pendApproval;
    } else if (type === 'pendRead') {
      //待阅
      return pendRead;
    } else if (type === 'pendFeedback') {
      //待反馈
      return pendFeedback;
    }
  };

  const handleReset = () => {
    form.resetFields();
    const method = setMethod();
    method.pageCount = 1;
    method.searchParams = {};
    method.getLists();
  };

  return (
    <MoreSearch toggle={setShowMoreSearch}>
      <Form form={form} onFinish={handleSearch} {...layout}>
        <Row gutter={20}>
          <Col span={6} order={1}>
            <Form.Item label="业务类别" name="item2Code">
              <CategorySelect multiple />
            </Form.Item>
          </Col>

          <Col span={6} order={2}>
            <Form.Item label="申请日期" name="applyDate">
              <RangePicker disabledDate={currentDate => dayjs(currentDate).isAfter(dayjs())} className="w-full" />
            </Form.Item>
          </Col>

          <Col span={6} order={3}>
            <Form.Item label="报账单号" name="claimNo">
              <Input allowClear />
            </Form.Item>
          </Col>

          <>
            <Col span={6} order={4 + !showMoreSearch}>
              <Form.Item label="供应商名称" name="vendorName">
                <Input allowClear />
              </Form.Item>
            </Col>

            <Col span={6} order={5 + !showMoreSearch}>
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

            <Col span={6} order={6 + !showMoreSearch}>
              <Form.Item label="报账事由" name="remark">
                <Input allowClear />
              </Form.Item>
            </Col>

            <Col span={6} order={7 + !showMoreSearch}>
              <Form.Item label="申请人" name="applyEmpName">
                <Input allowClear />
              </Form.Item>
            </Col>

            <Col span={6} order={8 + !showMoreSearch}>
              <Form.Item label="归属公司" name="ouCode">
                <CompSelect />
              </Form.Item>
            </Col>
          </>

          <Col span={showMoreSearch ? 24 : 6} order={showMoreSearch ? 17 : 4}>
            <div className="text-right">
              <Button icon={<SearchOutlined />} type="primary" className="mr-2" htmlType="submit">
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </MoreSearch>
  );
};

export default observer(commonSearch);
