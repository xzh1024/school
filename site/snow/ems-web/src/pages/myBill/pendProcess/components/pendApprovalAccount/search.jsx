import useStores from '@/store';
import { SearchOutlined } from '@ant-design/icons';
import CategorySelect from '@c/categorySelectByTree';
import MoreSearch from '@c/moreSearch';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const searchFirstTab = props => {
  const { commDicts, accountDicts, refreshTable } = props.data;
  const [form] = Form.useForm();
  const { pendProcess } = useStores();
  const [showMoreSearch, setShowMoreSearch] = useState(false);

  useEffect(() => {
    pendProcess.getLists();
  }, [refreshTable]);
  // 查询
  const handleSearch = value => {
    value = { ...value };
    if (value.applyDate) {
      value.applyDateStart = dayjs(value.applyDate[0]).format('YYYY-MM-DD');
      value.applyDateEnd = dayjs(value.applyDate[1]).format('YYYY-MM-DD');
    }
    if (value.glDate) {
      value.glDateStart = dayjs(value.glDate[0]).format('YYYY-MM-DD');
      value.glDateEnd = dayjs(value.glDate[1]).format('YYYY-MM-DD');
    }

    value.applyAmountStart = value.applyAmount?.start;
    value.applyAmountEnd = value.applyAmount?.end;

    if (value.processState === '0') {
      delete value.processState;
    }

    delete value.applyAmount;
    delete value.applyDate;
    delete value.glDate;

    if (value.item2Code) {
      value.item2Code = value.item2Code.join(',');
    }

    let hasSearchParam = false;

    Object.keys(value).forEach(key => {
      if (value[key]) {
        hasSearchParam = true;
      }
    });

    // if (!hasSearchParam) {
    //   window.$message.warning('请输入至少一项条件再进行查询');
    //   return;
    // }

    pendProcess.searchParams = value;
    pendProcess.pageCount = 1;
    pendProcess.getLists(value);
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

  const handleReset = () => {
    form.resetFields();
    pendProcess.pageCount = 1;
    // pendProcess.pageSize = 10;
    pendProcess.searchParams = {};
    pendProcess.getLists();
  };

  return (
    <MoreSearch
      toggle={flag => {
        console.log(flag, 12333);
        setShowMoreSearch(flag);
      }}
    >
      <Form form={form} onFinish={handleSearch} {...layout}>
        <Row gutter={20}>
          <Col span={6} order={1}>
            <Form.Item label="总账期间" name="glDate">
              <RangePicker allowClear className="w-full" />
            </Form.Item>
          </Col>
          <Col span={6} order={2}>
            <Form.Item label="报账单号" name="claimNo">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={6} order={3}>
            <Form.Item label="业务类别" name="item2Code">
              <CategorySelect multiple />
            </Form.Item>
          </Col>

          <>
            <Col span={6} order={4 + !showMoreSearch}>
              <Form.Item label="审核状态" name="processState">
                <Select options={commDicts.map(item => ({ value: item.dictCode, label: item.dictName }))} />
              </Form.Item>
            </Col>
            <Col span={6} order={5 + !showMoreSearch}>
              <Form.Item label="申请日期" name="applyDate">
                <RangePicker disabledDate={currentDate => dayjs(currentDate).isAfter(dayjs())} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={6} order={6 + !showMoreSearch}>
              <Form.Item label="供应商名称" name="vendorName">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={6} order={7 + !showMoreSearch}>
              <Form.Item label="申请人" name="applyEmpName">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={6} order={8 + !showMoreSearch}>
              <Form.Item label="当前环节" name="currentStateId">
                <Select options={accountDicts.map(item => ({ value: item.dictCode, label: item.dictName }))} />
              </Form.Item>
            </Col>

            <Col span={6} order={9 + !showMoreSearch}>
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

            <Col span={6} order={10 + !showMoreSearch}>
              <Form.Item label="归属公司" name="ouName">
                <Input allowClear />
              </Form.Item>
            </Col>
            <Col span={6} order={11 + !showMoreSearch}>
              <Form.Item label="上一审批人" name="stateUserName">
                <Input allowClear />
              </Form.Item>
            </Col>
          </>

          <Col span={showMoreSearch ? 24 : 6} order={showMoreSearch ? 17 : 4}>
            <div className="text-right">
              <Button icon={<SearchOutlined />} className="mr-2" type="primary" htmlType="submit">
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

export default observer(searchFirstTab);
