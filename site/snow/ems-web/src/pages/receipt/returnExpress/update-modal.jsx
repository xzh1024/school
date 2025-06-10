import useStores from '@/store';
import { expressRegExp } from '@/utils/tools';
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { throttle } from 'lodash';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

const { Item } = Form;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const UpdateModal = props => {
  const [form] = Form.useForm();
  const { onCancel } = props;
  const { returnExpress, globalStore } = useStores();
  const { loading, managerOptions, updateTarget, selectedRowKeys } = returnExpress;
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    returnExpress.getManagerOptions();
  }, []);

  const handleOk = () => {
    form.validateFields().then(params => {
      setModalLoading(true);
      const { defaultReceiveUserAccount } = params;
      const defaultReceiveUserName = managerOptions.find(item => item.value === defaultReceiveUserAccount)?.label;
      returnExpress
        .editMult({
          ...params,
          backIdList: selectedRowKeys,
          defaultReceiveUserName,
          userName: globalStore.userInfo.userName,
        })
        .then(() => {
          if (onCancel) {
            onCancel();
          }
          form.resetFields();
        })
        .finally(() => {
          setModalLoading(false);
        });
    });
  };

  useEffect(() => {
    if (!updateTarget) {
      return window.$message.warning('初始化表单失败，请重试');
    }
    if (selectedRowKeys.length === 1) {
      if (managerOptions.findIndex(item => item.value === updateTarget.defaultReceiveUserAccount) === -1) {
        returnExpress.managerOptions = [
          {
            label: updateTarget.defaultReceiveUserName,
            value: updateTarget.defaultReceiveUserAccount,
          },
          ...managerOptions,
        ];
      }
      return form.setFieldsValue({
        defaultReceiveUserAccount: updateTarget.defaultReceiveUserAccount,
        defaultReceiveUserPhone: updateTarget.defaultReceiveUserPhone,
        realityReceiveAddress: updateTarget.realityReceiveAddress,
        expressNo: updateTarget.expressNo,
      });
    }

    if (managerOptions.findIndex(item => item.value === updateTarget.managerAccount) === -1) {
      returnExpress.managerOptions = [
        {
          label: updateTarget.managerName,
          value: updateTarget.managerAccount,
        },
        ...managerOptions,
      ];
    }
    return form.setFieldsValue({
      defaultReceiveUserAccount: updateTarget.managerAccount,
      defaultReceiveUserPhone: updateTarget.managerPhone,
      realityReceiveAddress: updateTarget.defaultAcquirerAddress,
      expressNo: updateTarget.expressNo,
    });
  }, []);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleChangeManager = value => {
    const selectedManager = managerOptions.find(item => item.value === value);
    form.setFieldValue('managerPhone', selectedManager?.origin?.managerPhone || '');
  };

  const handleSelectSearch = () => {
    return throttle(
      keyword => {
        returnExpress.getManagerOptions(keyword);
      },
      800,
      { trailing: true, leading: false },
    );
  };

  const expressValidator = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        resolve('');
      }
      if (!expressRegExp.test(value)) {
        reject('请输入正确的快递单号');
      }
      resolve(value);
    });
  };

  return (
    <Modal
      title={'退回地址编辑'}
      open
      onOk={handleOk}
      okText="确认"
      cancelText="取消"
      onCancel={handleCancel}
      width={'40%'}
      confirmLoading={modalLoading || loading}
    >
      <Form {...layout} form={form} disabled={modalLoading || loading}>
        <Row>
          <Col span={12}>
            <Item label="收单人" name="defaultReceiveUserAccount" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="请选择收单人"
                filterOption={false}
                onSearch={handleSelectSearch()}
                onChange={handleChangeManager}
              >
                {managerOptions.map(item => (
                  <Select.Option key={item.value}>
                    <div className="receipt-manager-option">
                      <div>{item.label}</div>
                      <div style={{ color: '#999999' }}>{item.value}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Item>
          </Col>
          <Col span={12}>
            <Item label="联系电话" name="defaultReceiveUserPhone" rules={[{ required: true }]}>
              <Input placeholder="请输入联系电话" />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="快递单号" name="expressNo" rules={[{ required: false, validator: expressValidator }]}>
              <Input placeholder="请输入快递单号" />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="地址"
              name="realityReceiveAddress"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="请输入地址" />
            </Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default observer(UpdateModal);
