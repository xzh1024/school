import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import {
  Space,
  Table,
  Button,
  message,
  Switch,
  Modal,
  Form,
  Input,
  Radio,
  Select
} from 'antd';
const { confirm } = Modal;

const EditForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const [roles, setRoles] = useState([]);
  useEffect(() => {
    axios.get('/roles').then((res) => {
      console.log(res.data);
      setRoles(
        res.data.map((item) => {
          return {
            value: item.id,
            label: item.roleName
          };
        })
      );
    });
  }, []);
  return (
    <Modal
      open={open}
      title="添加用户"
      okText="确定"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
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
        <Form.Item name="password" label="密码">
          <Input type="password" />
        </Form.Item>
        <Form.Item name="region" label="地区">
          <Input type="text" />
        </Form.Item>
        <Form.Item name="roleId" label="角色">
          <Select
            // defaultValue="lucy"
            // style={{
            //   width: 120
            // }}
            // onChange={handleChange}
            options={roles}
          />
        </Form.Item>
        <Form.Item name="roleState" label="用户状态">
          <Switch></Switch>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  // 删除
  const confirmDelete = (item) => {
    setLoading(true);
    axios
      .delete(`/users/${item.id}`)
      .then(() => {
        message.success('删除成功');
        setLoading(false);
        getList();
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // 确认删除
  const showDeleteConfirm = (item) => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleFilled />,
      content: '确定要删除此任务吗?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        confirmDelete(item);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  // 切换用户状态
  const changeRoleState = (item, value) => {
    axios
      .patch(`/users/${item.id}`, {
        roleState: value
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        getList();
      })
      .catch(() => setLoading(false));
  };
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>;
      }
    },
    {
      title: '角色名称',
      dataIndex: ['role', 'roleName']
      // render: (role) => role.roleName
    },
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return (
          <Switch
            checked={roleState}
            disabled={item.default}
            onChange={(value) => changeRoleState(item, value)}
          ></Switch>
        );
      }
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => setOpen(true)}
          />
        </Space>
      )
    }
  ];

  const getList = () => {
    axios.get('/users?_expand=role').then((res) => {
      console.log(res.data);
      setDataSource(res.data);
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const [open, setOpen] = useState(false);
  const handleEdit = (values) => {
    console.log(values);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 10
        }}
      />
      <EditForm
        open={open}
        onCreate={handleEdit}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </React.Fragment>
  );
}
