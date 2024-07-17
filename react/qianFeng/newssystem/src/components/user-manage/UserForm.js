import React, { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Switch, Modal, Form, Input, Select } from 'antd';

const UserForm = forwardRef((porps, ref) => {
  const [form] = Form.useForm();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (porps.rowData) {
      form.setFieldsValue({
        username: porps.rowData.username,
        password: porps.rowData.password,
        region: porps.rowData.region,
        roleId: porps.rowData.roleId,
        roleState: porps.rowData.roleState
      });
      setIsDisabled(porps.rowData.roleId === 1);
    }

    return () => {
      form.resetFields();
    };
  }, []);
  return (
    <Form
      ref={ref}
      form={form}
      layout="vertical"
      name="form_in_modal"
      initialValues={{
        modifier: 'public'
      }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          {
            required: true,
            message: '请输入用户名!'
          }
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码!'
          }
        ]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item
        name="region"
        label="地区"
        rules={[
          {
            required: !isDisabled,
            message: '请选择地区!'
          }
        ]}
      >
        <Select disabled={isDisabled} options={porps.regionList} />
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[
          {
            required: true,
            message: '请选择角色!'
          }
        ]}
      >
        <Select
          options={porps.roleList}
          onChange={(value) => {
            console.log(value);
            if (value === 1) {
              form.setFieldsValue({
                region: ''
              });
              setIsDisabled(true);
            } else {
              setIsDisabled(false);
            }
          }}
        />
      </Form.Item>
      <Form.Item name="roleState" label="用户状态">
        <Switch
          defaultChecked={porps.rowData ? porps.rowData.roleState : false}
        ></Switch>
      </Form.Item>
    </Form>
  );
});

export default UserForm;
