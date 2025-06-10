import {
  getOptions,
  getPoolOptions,
  save,
} from '@api/paymentDesk/capitalPool';
import { Col, Form, Modal, Row, Select } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function Index() {
  const [form] = Form.useForm();
  const { capitalPool } = useStores();
  const [loading, setLoading] = useState(false);
  const [poolOptions, setPoolOptions] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    getOptions().then((res) => {
      setOptions(
        (res.data || []).map((item) => {
          return {
            label: item.compName,
            value: item.compCode,
            option: item,
          };
        }),
      );
    });
    getPoolOptions().then((res) => {
      setPoolOptions(
        (res.data || []).map((item) => {
          return {
            label: item.dictName,
            value: item.dictCode,
            option: item,
          };
        }),
      );
    });
  }, []);

  const handleOk = () => {
    const values = form.getFieldsValue();
    const data = {
      ...values,
      fundPoolAccountName: poolOptions.find(
        (item) => item.value === values.fundPoolAccountCode,
      )?.label,
      fundAccountName: options.find(
        (item) => item.value === values.fundAccountCode,
      )?.label,
    };
    setLoading(true);
    save(data)
      .then((res) => {
        window.$message.success('操作成功');
        capitalPool.showModal = false;
        capitalPool.getTableList();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    runInAction(() => {
      capitalPool.showModal = false;
    });
  };

  return (
    <Modal
      title="新增"
      open={true}
      onOk={handleOk}
      okText="确定"
      onCancel={handleCancel}
      loading={loading}
      confirmLoading={loading}
      width={1200}
    >
      <Form form={form} {...layout} className="pt-6">
        <Row gutter={16} justify="space-between">
          <Col span={12}>
            <Form.Item
              label="资金内部账户池："
              name="fundPoolAccountCode"
              rules={[{ required: false, message: '请选择资金内部账户池' }]}
            >
              <Select
                allowClear
                showSearch
                options={poolOptions}
                filterOption={(input, option) => {
                  const labelHas = (option?.label ?? '').includes(input);
                  const valueHas = (option?.value ?? '').includes(
                    input.toUpperCase(),
                  );
                  return labelHas || valueHas;
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="内部账户："
              name="fundAccountCode"
              rules={[{ required: false, message: '请选择内部账户' }]}
            >
              <Select
                allowClear
                showSearch
                filterOption={(input, option) => {
                  const labelHas = (option?.label ?? '').includes(input);
                  const valueHas = (option?.value ?? '').includes(
                    input.toUpperCase(),
                  );
                  return labelHas || valueHas;
                }}
              >
                {options.map((item) => (
                  <Select.Option
                    value={item.value}
                    key={JSON.stringify(item)}
                    label={item.label}
                  >
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default observer(Index);
