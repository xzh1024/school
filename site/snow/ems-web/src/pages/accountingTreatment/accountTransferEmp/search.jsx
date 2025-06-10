import { SearchOutlined } from '@ant-design/icons';
import useStores from '@s/index';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const STATUS_OPTIONS = [
  {
    label: '框架核心',
    value: 'FRAMEWORK_CORE',
  },
  {
    label: '用户管理',
    value: 'FRAMEWORK_USERMGR',
  },
  {
    label: '系统管理',
    value: 'FRAMEWORK_SYSMGR',
  },
  {
    label: '流程平台',
    value: 'FRAMEWORK_PROCESS',
  },
 
];

function Search() {
  const [form] = Form.useForm();
  const { accountTransferEmp} = useStores();
  const { loading ,modaltitle} = accountTransferEmp;
  const [modalShow, setModalShow] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const handleAction = (record, isAdd) => {
    setModalShow(true);
    // setIsAdd(isAdd);
    // setCurrentItem(record);
  };

  const handleSearch = value => {
    runInAction(() => {
      accountTransferEmp.pageIndex = 1;
      accountTransferEmp.search = value;
      console.log(value,'handleSearch');
      accountTransferEmp.getTableList(value);
    });
  };
  const handleSend = record => {
    runInAction(() => {
      accountTransferEmp.currentRecord = {};
      accountTransferEmp.modaltitle='新增数据';
      accountTransferEmp.showModal = true;
    });
  };

  return (
    <div className="search-container">
      <Form form={form} {...layout} onFinish={handleSearch}>
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              label="职级编码:"
              name="positionClass"         
            >
              <Input allowClear />
            </Form.Item>
          </Col>
          
         
          <Col span={16} className="text-right">
            <div>
               <Button  loading={loading} onClick={() => {
                  handleSend();
                }} >新增
               </Button>
              <Button icon={<SearchOutlined />} type="primary" htmlType="submit" loading={loading}   className="ml-2">
                查询
              </Button>
              <Button
                loading={loading}
                className="ml-2"
                onClick={() => {
                  form.resetFields();
                  accountTransferEmp.search = {};
                  accountTransferEmp.getTableList();
                }}
              >
                重置
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
   
    </div>
  );
}

export default observer(Search);
