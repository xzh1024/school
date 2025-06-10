import useStores from '@/store';
import { certificationPackageChange, oneClickDispatchingSave } from '@api/accountingTreatment/taskPoolMonitoring';
import { Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function Index() {
  const [form] = Form.useForm();
  const { taskPoolMonitoring } = useStores();
  let { currentRecord, certificationPackageOptions } = taskPoolMonitoring;
  const [loading, setLoading] = useState(false);
  const [certificationPackage, setCertificationPackage] = useState(null);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        let data = {
          ...certificationPackage,
          allocateLimit: values.allocateLimit,
        };
        setLoading(true);
        oneClickDispatchingSave(data)
          .then(res => {
            message.success('操作成功');
            setLoading(false);
            runInAction(() => {
              taskPoolMonitoring.showOneClickDispatchingModal = false;
              taskPoolMonitoring.currentRecord = {};
              taskPoolMonitoring.getTableList();
            });
          })
          .catch(err => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch(err => {
        console.log('到这里', err);
      });
  };

  const handleCancel = () => {
    runInAction(() => {
      taskPoolMonitoring.showOneClickDispatchingModal = false;
    });
  };

  const getCertificationPackageFunc = value => {
    setLoading(true);
    certificationPackageChange({ authenticationCode: value })
      .then(res => {
        setLoading(false);
        if (res.data) {
          setCertificationPackage(res.data[0]);
          form.setFieldsValue(res.data[0]);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Modal
      title="一键派单"
      open={true}
      onOk={handleOk}
      okText="确定"
      onCancel={handleCancel}
      loading={loading}
      confirmLoading={loading}
      width="50%"
    >
      <Form form={form} {...layout} className="pt-6" initialValues={currentRecord}>
        <Row gutter={16} justify="space-between">
          <Col span={12}>
            <Form.Item
              label="认证包"
              className="form-item-label-warp"
              name="authenticationCode"
              rules={[{ required: true, message: '请选择' }]}
            >
              <Select
                placeholder="请选择"
                options={certificationPackageOptions || []}
                fieldNames={{ label: 'authenticationName', value: 'authenticationCode' }}
                onChange={getCertificationPackageFunc}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="待办数量"
              className="form-item-label-warp"
              name="toDoCount"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input allowClear disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="认证人数"
              rules={[{ required: true, message: '请输入' }]}
              className="form-item-label-warp"
              name="empCount"
            >
              <Input allowClear disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="指派单量(人/次)"
              rules={[{ required: true, message: '请输入' }]}
              className="form-item-label-warp"
              name="allocateLimit"
            >
              <Input allowClear />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default observer(Index);
