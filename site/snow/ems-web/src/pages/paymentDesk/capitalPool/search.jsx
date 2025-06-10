import { SearchOutlined } from '@ant-design/icons';
import { getPoolOptions } from '@api/paymentDesk/capitalPool';
import useStores from '@s/index';
import { Button, Col, Form, Row, Select } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function Search() {
  const [form] = Form.useForm();
  const { capitalPool } = useStores();
  const { loading } = capitalPool;

  const [poolOptions, setPoolOptions] = useState([]);
  const [options, setOptions] = useState([]);

  const handleSearch = value => {
    runInAction(() => {
      capitalPool.search = value;
      capitalPool.pageIndex = 1;
      capitalPool.getTableList();
    });
  };

  useEffect(() => {
    getPoolOptions().then(res => {
      console.log(res, 111);
      setPoolOptions(
        (res.data || []).map(item => {
          return {
            label: item.dictName,
            value: item.dictCode,
            option: item,
          };
        }),
      );
    });
  }, []);

  return (
    <div className="comprehensive-query-container-search bg-white mb-3 pt-4 px-2">
      <Form form={form} {...layout} onFinish={handleSearch}>
        <Row gutter={24}>
          <Col span={6}>
            <Form.Item
              label="资金内部账户池"
              name="fundPoolAccountCode"
              // labelCol={{ span: 12 }}
            >
              <Select
                showSearch
                allowClear
                filterOption={(input, option) => {
                  const labelHas = (option?.label ?? '').includes(input);
                  const valueHas = (option?.value ?? '').includes(input.toUpperCase());
                  return labelHas || valueHas;
                }}
              >
                {poolOptions.map(item => {
                  return (
                    <Select.Option key={JSON.stringify(item)} value={item.value}>
                      {item.label}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={18} className="text-right">
            <div style={{ marginBottom: '16px' }}>
              <Button icon={<SearchOutlined />} type="primary" htmlType="submit" loading={loading} className="ml-2">
                查询
              </Button>
              <Button
                loading={loading}
                className="ml-2"
                onClick={() => {
                  form.resetFields();
                  capitalPool.search = {};
                  capitalPool.getTableList();
                }}
              >
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default observer(Search);
