import useStores from '@/store';
import { checkAcquirerNameIsExist, checkMdOuAndOrgHasAcquirerStorage } from '@api/Receipt/index';
import { phoneRegExp } from '@u/tools';
import { Col, Form, Input, Modal, Row, Select } from 'antd';
import { throttle } from 'lodash';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const { Item } = Form;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AddModal = props => {
  const [form] = Form.useForm();
  const { onCancel } = props;
  const { addressManagement, globalStore } = useStores();
  const { loading, ouOptions, departmentOptions, managerOptions } = addressManagement;

  useEffect(() => {
    addressManagement.getManagerOptions();
    console.log(JSON.parse(JSON.stringify(departmentOptions)));
  }, []);

  const handleOk = () => {
    form.validateFields().then(params => {
      checkMdOuAndOrgHasAcquirerStorage(params.compCode, params.deptId).then(res => {
        params.userName = globalStore.userInfo.userName;
        if (res.data === 0) {
          return addressManagement.addList(params).then(res => {
            handleCancel();
          });
        }
        Modal.confirm({
          title: '确认提交',
          content: '当前公司和部门下已设置收单柜是否继续提交？',
          okText: '提交',
          cancelText: '取消',
          onOk: close => {
            close();
            addressManagement.addList(params).then(res => {
              handleCancel();
            });
          },
          onCancel: close => {
            close();
          },
        });
      });
    });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const handleSelectSearch = funcName => {
    return throttle(
      keyword => {
        addressManagement[funcName](keyword);
      },
      900,
      { trailing: true, leading: false },
    );
  };

  const acquirerNameValidator = (rule, value) => {
    return new Promise((resolve, reject) => {
      checkAcquirerNameIsExist(value)
        .then(res => {
          if (res.data === 0) {
            resolve(true);
          }
          reject('收单柜名称已存在');
        })
        .catch(() => {
          reject('收单柜名称已存在');
        });
    });
  };

  const phoneValidator = (rule, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请填写管理员手机号');
      }
      if (!phoneRegExp.test(value)) {
        reject('请输入正确的管理员手机号');
      }
      resolve(value);
    });
  };

  const handleChangeManager = value => {
    const selectedManager = managerOptions.find(item => item.value === value);
    form.setFieldValue('managerPhone', selectedManager?.origin?.managerPhone || '');
  };

  return (
    <Modal
      title={'新增'}
      open
      onOk={handleOk}
      okText="确认"
      cancelText="取消"
      onCancel={handleCancel}
      width={'60%'}
      maskClosable={false}
      confirmLoading={loading}
    >
      <Form {...layout} form={form} disabled={loading}>
        <Row>
          <Col span={12}>
            <Item
              label="收单柜名称"
              name="acquirerName"
              validateTrigger={['onBlur']}
              rules={[{ required: true, validator: acquirerNameValidator }]}
            >
              <Input placeholder="请输入收单柜名称" />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="公司" name="compCode" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="请选择公司"
                options={ouOptions}
                filterOption={false}
                onSearch={handleSelectSearch('getOuOptions')}
                allowClear
              />
            </Item>
          </Col>

          <Col span={12}>
            <Item label="部门" name="deptId" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="请选择部门"
                options={departmentOptions}
                filterOption={false}
                onSearch={handleSelectSearch('getDepartmentOptions')}
              />
            </Item>
          </Col>

          <Col span={12}>
            <Item label="管理员" name="managerAccount" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="请选择管理员"
                filterOption={false}
                onSearch={handleSelectSearch('getManagerOptions')}
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
            <Item label="管理员手机号" name="managerPhone" rules={[{ required: true, validator: phoneValidator }]}>
              <Input placeholder="请输入管理员手机号" />
            </Item>
          </Col>
          <Col span={24}>
            <Item
              label="地址"
              name="acquirerAddress"
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

export default observer(AddModal);
