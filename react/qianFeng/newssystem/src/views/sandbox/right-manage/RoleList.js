import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Space,
  Table,
  Button,
  Popover,
  Switch,
  Modal,
  Popconfirm,
  Tree
} from 'antd';
import {
  UnorderedListOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';

const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setDataSource] = useState([]);
  const [rightList, setRightList] = useState([]);

  const confirmDelete = (item) => {
    console.log(item);
  };
  const showConfirm = (item) => {
    confirm({
      title: '菜单权限配置',
      icon: null,
      content: 'content?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        console.log('OK');
        console.log(item);
        // confirmDelete(item);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (item) => {
    console.log(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
      // key: 'id'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName'
      // key: 'roleName'
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<UnorderedListOutlined />}
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="提示"
            description="确定要删除此任务吗?"
            onConfirm={() => confirmDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];
  useEffect(() => {
    axios
      .get('/roles')
      .then((res) => {
        console.log(res.data);
        setDataSource(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('/rights?_embed=children')
      .then((res) => {
        console.log(res.data);
        setRightList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <React.Fragment>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />

      <Modal
        title="菜单权限配置"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          defaultExpandedKeys={[]}
          defaultSelectedKeys={[]}
          defaultCheckedKeys={[]}
          onSelect={onSelect}
          onCheck={onCheck}
          treeData={rightList}
        />
      </Modal>
    </React.Fragment>
  );
}
