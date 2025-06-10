import useStores from '@/store';
import { EditOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';
import { observer } from 'mobx-react';
import { useState } from 'react';
import EditModal from './update-modal';

const { Item } = Form;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Search = () => {
  const { returnExpress, globalStore } = useStores();
  const { loading, selectedRowKeys, dataSource, errorRowKeys } = returnExpress;
  const [showEditModal, setShowEditModal] = useState(false);
  const [form] = Form.useForm();

  const baseButton = [
    {
      icon: <EditOutlined />,
      title: '地址编辑',
      type: 'primary',
      disabled: errorRowKeys.length > 0,
      onClick: () => {
        if (selectedRowKeys.length === 0) {
          return window.$message.warning('请选择需要修改的数据');
        }

        returnExpress.updateTarget = dataSource.find(item => item.backId === selectedRowKeys[0]);

        setShowEditModal(true);
      },
    },
    {
      icon: <SearchOutlined />,
      title: '查询',
      onClick: form => {
        const params = form.getFieldsValue(true);

        returnExpress.formSearch = params;
        returnExpress.pageCurrent = 1;
        returnExpress.getList({ userName: globalStore.userInfo.userName });
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        returnExpress.formSearch = {};
        returnExpress.pageCurrent = 1;
        returnExpress.getList({ userName: globalStore.userInfo.userName });
      },
    },
  ];

  const handleCustomButton = item => {
    if (item.onClick) {
      item.onClick(form);
    }
  };

  const renderButtons = () => {
    return baseButton.map((item, index) => {
      return (
        <Button
          type={item.type ?? 'default'}
          ghost={item.ghost}
          icon={item.icon || null}
          key={index}
          className="ml-2"
          onClick={() => handleCustomButton(item)}
          disabled={item.disabled}
          loading={loading}
        >
          {item.title}
        </Button>
      );
    });
  };

  return (
    <>
      <Form {...layout} form={form} disabled={loading}>
        <Row gutter={20}>
          <Col span={6}>
            <Item label="报账单号" name="claimNo">
              <Input allowClear />
            </Item>
          </Col>

          <Col span={18} style={{ textAlign: 'right' }}>
            {renderButtons()}
          </Col>
        </Row>
      </Form>
      {showEditModal && <EditModal onCancel={() => setShowEditModal(false)} />}
    </>
  );
};

export default observer(Search);
