import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { observer } from 'mobx-react';
import CategorySelect from '@c/departmentSelectByTree';
import CategorySelectByTree from '@c/categorySelectByTree';
import ComSelect from '@c/compSelect';
import { runInAction } from 'mobx';
import { useEffect, useState } from 'react';
import useStores from '../../../store';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};

const PROCESS_STATE = {
  0: '是',
  1: '否',
};
const PROCESS_STATEed = {
  0: '核算会计',
  1: '复核会计',
};

function Search() {
  const { groupWork } = useStores();
  const { loading } = groupWork;
  const [backPhysicalBillType, setBackPhysicalBillType] = useState([]);

  useEffect(() => {
    groupWork.getTableList().then(res => {
      // 设置是否退回下拉数据
      setBackPhysicalBillType(res.data.backPhysicalBillTypeList || []);
    });
  }, []);

  const buttons = [
    {
      icon: <SearchOutlined />,
      title: '查询',
      type: 'primary',
      htmlType: 'submit',
    },
    {
      icon: <ReloadOutlined />,
      title: '重置',
      onClick: form => {
        form.resetFields();
        runInAction(() => {
          groupWork.searchParams = {};
          groupWork.getTableList();
        });
      },
    },
  ];
  const [form] = Form.useForm();

  const handleCustomButton = item => {
    if (item.onClick) {
      item.onClick(form);
    }
  };

  const renderButtons = buttons => {
    return buttons.map((item, index) => {
      return (
        <Button
          type={item.type ?? 'default'}
          ghost={item.ghost}
          icon={item.icon || null}
          key={index}
          loading={loading}
          className="search-button"
          onClick={() => handleCustomButton(item)}
          style={{
            marginLeft: '10px',
          }}
          htmlType={item.htmlType ?? 'button'}
        >
          {item.title}
        </Button>
      );
    });
  };

  // 处理搜索
  const handleSearch = params => {
    if (params.deptIdsStr) {
      //组织标识
      params.deptIdsStr = params.deptIdsStr.join(',');
    }

    if (params.expCategoryCode) {
      //费用类别
      params.expCategoryCode = params.expCategoryCode.join(',');
    }

    runInAction(() => {
      groupWork.searchParams = {
        ...params,
      };
      groupWork.getTableList();
    });
  };

  const handleFormChange = () => {
    const params = form.getFieldsValue();
    if (params.deptIdsStr) {
      //组织标识
      params.deptIdsStr = params.deptIdsStr.join(',');
    }

    if (params.expCategoryCode) {
      //费用类别
      params.expCategoryCode = params.expCategoryCode.join(',');
    }

    runInAction(() => {
      groupWork.searchParams = {
        ...params,
      };
    });
  };

  const handleSelectCompany = (value, options) => {
    if (value) {
      form.setFieldValue('ouName', options.title);
    }
  };

  return (
    <ProCard style={{ margin: '0px 0' }}>
      <Form
        {...layout}
        form={form}
        onFinish={handleSearch}
        initialValues={{}}
        onValuesChange={handleFormChange}
        // disabled={tableLoading}
      >
        <Row gutter={20}>
          <Col span={6}>
            <Form.Item label="分组类型：" name="groupType">
              <Select
                placeholder="请选择"
                options={Object.keys(PROCESS_STATEed).map(item => ({
                  label: PROCESS_STATEed[item],
                  value: item,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="小组名称：" name="groupName">
              <Input allowClear />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="是否启用：" name="useFlag">
              <Select
                placeholder="请选择"
                options={Object.keys(PROCESS_STATE).map(item => ({
                  label: PROCESS_STATE[item],
                  value: item,
                }))}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="归属公司" name="ouName">
              <ComSelect onChange={handleSelectCompany} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="申请组织：" name="deptIdsStr">
              <CategorySelect multiple />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="费用类别：" name="expCategoryCode">
              <CategorySelectByTree multiple />
            </Form.Item>
          </Col>

          <Col style={{ textAlign: 'right' }} span={12}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
