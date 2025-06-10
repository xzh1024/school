import useStores from '@/store';
import { EditOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const { Item } = Form;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const Search = () => {
  const { defaultAddress, globalStore } = useStores();
  const { loading, selectedRowKeys, defaultAddress: address, selectedRow } = defaultAddress;
  const [form] = Form.useForm();

  useEffect(() => {
    defaultAddress.getList();
    defaultAddress.getDefaultAddress(globalStore.userInfo.userName);
  }, []);

  const baseButton = [
    {
      icon: <EditOutlined />,
      title: '修改',
      type: 'primary',
      disabled: selectedRowKeys.length === 0,
      onClick: () => {
        Modal.confirm({
          title: '确认修改',
          content: `您的收件地址将修改为：${selectedRow?.acquirerAddress}`,
          okText: '确认',
          cancelText: '取消',
          onOk: close => {
            close();
            defaultAddress.updateDefaultAddress(globalStore.userInfo.userName).then(() => {
              form.resetFields();
            });
          },
          onCancel: close => {
            close();
          },
        });
      },
    },
    {
      icon: <SearchOutlined />,
      title: '查询',
      onClick: form => {
        const params = form.getFieldsValue(true);
        defaultAddress.formSearch = params;
        defaultAddress.getList();
      },
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        defaultAddress.formSearch = {};
        defaultAddress.pageCurrent = 1;
        defaultAddress.getList();
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
      <Form form={form} disabled={loading}>
        <Row gutter={20} style={{ paddingLeft: '20px' }}>
          <Col span={24}>
            <div className="default-address-my-address">{`我的收件地址：${address}`}</div>
          </Col>
          <Col span={24}>
            <div style={{ marginBottom: '20px', color: '#000000' }}>
              如需修改我的收件地址，请在以下地址选择进行修改。
            </div>
          </Col>
          <Col span={6}>
            <Item label="地址" name="acquirerAddress">
              <Input placeholder="地址" />
            </Item>
          </Col>

          <Col span={18} style={{ textAlign: 'right' }}>
            {renderButtons()}
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default observer(Search);
