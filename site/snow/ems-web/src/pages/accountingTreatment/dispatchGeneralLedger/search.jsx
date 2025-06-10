import useStores from '@/store';
import { SearchOutlined } from '@ant-design/icons';
import CategorySelect from '@c/categorySelectByTree';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

function Index() {
  const [form] = Form.useForm();
  const { dispatchGeneralLedger } = useStores();
  const [options, setOptions] = useState([
    {
      dictName: '核算会计',
      dictCode: '核算会计',
    },
    {
      dictName: '复核会计',
      dictCode: '复核会计',
    },
  ]);

  useEffect(() => {
    handleSearch(form.getFieldValue());

    // getBusinessTypeList().then(res => {
    //   setOptions(res.data);
    // });

    dispatchGeneralLedger.getTableList();
  }, []);

  // 查询
  const handleSearch = value => {
    if (value.expCategoryCode) {
      value.expCategoryCode = value.expCategoryCode[0];
    }
    dispatchGeneralLedger.currentPage = 1;
    dispatchGeneralLedger.searchParams = value;
    dispatchGeneralLedger.getTableList(value);
  };

  const reset = () => {
    form.resetFields();
    dispatchGeneralLedger.searchParams = {};
    dispatchGeneralLedger.getTableList();
  };

  return (
    <div className="bg-white">
      <Form
        form={form}
        // size='small'
        onFinish={handleSearch}
        {...layout}
      >
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="员工姓名" name="empName">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="业务大类" name="expCategoryCode">
              <CategorySelect />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="组别" name="groupName">
              <Select
                options={options}
                fieldNames={{
                  label: 'dictName',
                  value: 'dictCode',
                }}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <div className="text-right pb-2">
              <Button icon={<SearchOutlined />} type="primary" htmlType="submit" className="mr-2">
                查询
              </Button>
              <Button onClick={reset}>重置</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default observer(Index);
