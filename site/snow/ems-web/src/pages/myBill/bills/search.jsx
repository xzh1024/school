import useStores from '@/store';
import { SearchOutlined } from '@ant-design/icons';
import CategorySelect from '@c/categorySelectByTree';
import CompSelect from '@c/compSelect';
import MoreSearch from '@c/moreSearch';
import PriceRangeInput from '@c/priceRangeInput';
import { getProcessState } from '@u/constants';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const PROCESS_STATE = getProcessState([1, 2, 3, 6, 51]);

function Index() {
  const [form] = Form.useForm();
  const { bills } = useStores();
  const [showMore, setShowMore] = useState(false);
  const { searchParams } = bills;

  useEffect(() => {
    handleSearch(form.getFieldValue());

    // if (Object.keys(searchParams).length > 0) {
    //   form.setFieldsValue(searchParams);
    // }
  }, []);

  // 查询
  const handleSearch = value => {
    value = { ...value };
    if (value.applyDate) {
      value.applyDateStart = dayjs(value.applyDate[0]).format('YYYY-MM-DD');
      value.applyDateEnd = dayjs(value.applyDate[1]).format('YYYY-MM-DD');
    }
    if (value.applyAmount) {
      value.applyAmountStart = value.applyAmount[0];
      value.applyAmountEnd = value.applyAmount[1];
    }

    if (value.item2Code) {
      value.item2Code = value.item2Code.join(',');
    }

    if (!value.processState) {
      value.processState = 0;
    }

    bills.searchParams = value;
    bills.getLists(value);

    return value;
  };

  const handleCleanFunc = () => {
    form.resetFields();
    runInAction(() => {
      bills.searchParams = {};
      bills.processState = 0;
      bills.searchParams.processState = 0;
      bills.getLists();
    });
  };

  const handleStateChange = value => {
    console.log(value);
    runInAction(() => {
      bills.processState = value || 0;
      bills.searchParams.processState = value || 0;
      bills.getLists();
    });
  };

  return (
    <>
      <MoreSearch toggle={setShowMore}>
        <Form
          form={form}
          // size='small'
          onFinish={handleSearch}
          {...layout}
          initialValues={{
            applyDate: [dayjs().subtract(60, 'days'), dayjs()],
          }}
        >
          <Row gutter={20}>
            <Col span={6} order={1}>
              <Form.Item className="mb-3" label="流程状态" name="processState">
                <Select options={PROCESS_STATE} allowClear onChange={handleStateChange} />
              </Form.Item>
            </Col>
            <Col span={6} order={2}>
              <Form.Item className="mb-3" label="业务类别" name="item2Code">
                <CategorySelect multiple />
              </Form.Item>
            </Col>

            <Col span={6} order={3}>
              <Form.Item className="mb-3" label="报账单号" name="claimNo">
                <Input allowClear />
              </Form.Item>
            </Col>
            <>
              <Col span={6} order={4 + !showMore}>
                <Form.Item className="mb-3" label="所属公司" name="ouCode">
                  <CompSelect />
                </Form.Item>
              </Col>
              <Col span={6} order={5 + !showMore}>
                <Form.Item className="mb-3" label="申请日期" name="applyDate">
                  <RangePicker disabledDate={currentDate => dayjs(currentDate).isAfter(dayjs())} />
                </Form.Item>
              </Col>

              <Col span={6} order={6 + !showMore}>
                <Form.Item
                  className="mb-3"
                  label="报账金额"
                  name="applyAmount"
                  rules={[
                    {
                      validateTrigger: 'onChange',
                      validator: (rule, value) => {
                        if (value && value.length === 2 && value[1] < value[0]) {
                          return Promise.reject('目标金额不能小于起始金额');
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <PriceRangeInput />
                </Form.Item>
              </Col>
              <Col span={6} order={7 + !showMore}>
                <Form.Item className="mb-3" label="供应商名称" name="vendorName">
                  <Input allowClear />
                </Form.Item>
              </Col>
              <Col span={6} order={8 + !showMore}>
                <Form.Item className="mb-3" label="报账事由" name="remark">
                  <Input allowClear />
                </Form.Item>
              </Col>
            </>

            <Col span={showMore ? 24 : 6} order={showMore ? 9 : 4}>
              <div className="text-right pb-2">
                <Button icon={<SearchOutlined />} type="primary" htmlType="submit" className="mr-2">
                  查询
                </Button>
                <Button onClick={handleCleanFunc}>重置</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </MoreSearch>
    </>
  );
}

export default observer(Index);
