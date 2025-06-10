import useStores from '@/store';
import { CaretDownFilled, CaretUpFilled, SearchOutlined } from '@ant-design/icons';
import CategorySelect from '@c/categorySelectByTree';
import CompSelect from '@c/compSelect';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { PROCESS_STATE } from '../../../utils/constants';

const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

function Index() {
  const [form] = Form.useForm();
  const { historyData } = useStores();
  const [showMoreSearch, setShowMoreSearch] = useState(false);
  const [style, setStyle] = useState({
    maxHeight: '48px',
  });

  // 是否展示更多
  const toggleSearch = () => {
    const data = { maxHeight: '48px' };
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

  const handleFormChange = (_, value) => {
    value = { ...value };
    if (value.applyDate) {
      value.applyDateStart = dayjs(value.applyDate[0]).format('YYYY-MM-DD');
      value.applyDateEnd = dayjs(value.applyDate[1]).format('YYYY-MM-DD');
    }
    if (value.glDate) {
      value.glDateStart = dayjs(value.glDate[0]).format('YYYY-MM-DD');
      value.glDateEnd = dayjs(value.glDate[1]).format('YYYY-MM-DD');
    }
    if (value.importErpDate) {
      value.importErpDateStart = dayjs(value.importErpDate[0]).format('YYYY-MM-DD');
      value.importErpDateEnd = dayjs(value.importErpDate[1]).format('YYYY-MM-DD');
    }
    value.applyAmountStart = value.applyAmount?.start;
    value.applyAmountEnd = value.applyAmount?.end;

    if (value.processState === '0') {
      delete value.processState;
    }

    delete value.applyAmount;
    delete value.applyDate;
    delete value.glDate;
    delete value.importErpDate;

    if (value.item2Code) {
      value.item2Code = value.item2Code.join(',');
    }
    console.log(value, 3333311111);
    historyData.searchParams = value;
  };
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
    if (value.importErpDate) {
      value.importErpDateStart = dayjs(value.importErpDate[0]).format('YYYY-MM-DD');
      value.importErpDateEnd = dayjs(value.importErpDate[1]).format('YYYY-MM-DD');
    }
    value.applyAmountStart = value.applyAmount?.start;
    value.applyAmountEnd = value.applyAmount?.end;

    if (value.processState === '0') {
      delete value.processState;
    }

    delete value.applyAmount;
    delete value.applyDate;
    delete value.glDate;
    delete value.importErpDate;

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

    historyData.searchParams = value;
    historyData.pageCount = 1;
    historyData.getList(value);
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
          onValuesChange={handleFormChange}
          onFinish={handleSearch}
          {...layout}
          initialValues={{
            processState: '0',
          }}
        >
          <Row gutter={20}>
            <Col span={6} order={1}>
              <Form.Item label="业务类别" name="item2Code">
                <CategorySelect multiple />
              </Form.Item>
            </Col>
            <Col span={6} order={2}>
              <Form.Item label="所属公司" name="ouCode">
                <CompSelect />
              </Form.Item>
            </Col>
            <Col span={6} order={3}>
              <Form.Item label="报账单号" name="claimNo">
                <Input allowClear />
              </Form.Item>
            </Col>
            <>
              <Col span={6} order={4 + !showMoreSearch}>
                <Form.Item label="报账id" name="claimId">
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={5 + !showMoreSearch}>
                <Form.Item label="供应商名称" name="vendorName">
                  <Input allowClear />
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
                <Form.Item label="申请人" name="applyEmpName">
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={8 + !showMoreSearch}>
                <Form.Item label="申请部门" name="applyDeptName">
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={9 + !showMoreSearch}>
                <Form.Item label="扫描号起" name="scanNumStart">
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={10 + !showMoreSearch}>
                <Form.Item label="扫描号止" name="scanNumEnd">
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={11 + !showMoreSearch}>
                <Form.Item label="申请日期" name="applyDate">
                  <RangePicker disabledDate={currentDate => dayjs(currentDate).isAfter(dayjs())} />
                </Form.Item>
              </Col>
              <Col span={6} order={12 + !showMoreSearch}>
                <Form.Item label="总账期间" name="glDate">
                  <RangePicker allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={13 + !showMoreSearch}>
                <Form.Item label="导入ERP日期" name="importErpDate">
                  <RangePicker disabledDate={currentDate => dayjs(currentDate).isAfter(dayjs())} allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={14 + !showMoreSearch}>
                <Form.Item label="流程状态" name="processState">
                  <Select
                    options={Object.keys(PROCESS_STATE).map(item => ({
                      label: PROCESS_STATE[item],
                      value: item,
                    }))}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={6} order={15 + !showMoreSearch}>
                <Form.Item label="当前处理人" name="stateUserName">
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={16 + !showMoreSearch}>
                <Form.Item label="报账事由" name="remark">
                  <Input allowClear />
                </Form.Item>
              </Col>
            </>

            <Col span={showMoreSearch ? 24 : 6} order={showMoreSearch ? 17 : 4}>
              <div className="search-btns">
                <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                  查询
                </Button>
                <Button onClick={() => form.resetFields()}>重置</Button>
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
