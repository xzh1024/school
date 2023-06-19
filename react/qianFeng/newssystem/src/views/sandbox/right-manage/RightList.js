import React, { useEffect, useState } from 'react';
import {
  Space,
  Table,
  Tag,
  Button,
  message,
  // Popconfirm,
  Popover,
  Switch,
  Modal
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer']
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser']
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher']
//   }
// ];

export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const confirmDelete = (item) => {
    message.success('确认删除');
    console.log(item.id);
    setLoading(true);
    // const list = dataSource.filter((i) => i.id !== item.id);
    // console.log(list);
    // setDataSource(list);
    if (item.grade === 1) {
      axios
        .delete(`/rights/${item.id}`)
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      console.log(item);
      axios
        .delete(`/children/${item.id}`)
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };
  const showDeleteConfirm = (item) => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleFilled />,
      content: '确定要删除此任务吗?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        console.log('OK');
        console.log(item);
        confirmDelete(item);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const onChangeSwitch = (item, value) => {
    console.log(value);
    console.log(item);
    if (item.grade === 1) {
      axios
        .patch(`/rights/${item.id}`, {
          pagePermission: value ? 1 : 0
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      console.log(item);
      axios
        .patch(`/children/${item.id}`, {
          pagePermission: value ? 1 : 0
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      key: 'key',
      render: (_) => <Tag color="orange">{_}</Tag>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popover
            content={
              <div>
                <Switch
                  defaultChecked={!!record.pagePermission}
                  onChange={(value) => onChangeSwitch(record, value)}
                />
              </div>
            }
            title="页面配置项"
            trigger={record.pagePermission === undefined ? '' : 'click'}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={record.pagePermission === undefined}
            />
          </Popover>
          {/*<Popconfirm
            title="提示"
            description="确定要删除此任务吗?"
            onConfirm={() => confirmDelete(record)}
            onCancel={() => cancelDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>*/}
          <Button
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record)}
          />
        </Space>
      )
    }
  ];

  useEffect(() => {
    axios.get('/rights?_embed=children').then((res) => {
      console.log(res.data);
      setDataSource(
        res.data.map((item) => {
          return {
            ...item,
            children: item.children.length ? item.children : null
          };
        })
      );
    });
  }, []);

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: 10
      }}
    />
  );
}
