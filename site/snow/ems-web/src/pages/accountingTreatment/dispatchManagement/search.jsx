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
  const { dispatchManagement } = useStores();
  const [options, setOptions] = useState();

  useEffect(() => {
    handleSearch(form.getFieldValue());
  }, []);

  // 查询
  const handleSearch = value => {
    if (value.expCategoryCode) {
      value.expCategoryCode = value.expCategoryCode[0];
    }
    dispatchManagement.currentPage = 1;
    dispatchManagement.searchParams = value;
    dispatchManagement.getTableList(value);
  };

  const reset = () => {
    form.resetFields();
    dispatchManagement.searchParams = {};
    dispatchManagement.getTableList();
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
            <Form.Item label="业务类别" name="expCategoryCode">
              <CategorySelect />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="组别" name="groupName">
              <Select
                options={[
                  {
                    value: '核算会计',
                    label: '核算会计',
                  },
                  {
                    value: '复核会计',
                    label: '复核会计',
                  },
                ]}
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
