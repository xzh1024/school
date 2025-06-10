import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import CategorySelect from '@c/departmentSelectByTree';
import { runInAction } from 'mobx';
import { useEffect, useState } from 'react';
import OuSelect from '../../../components/compSelect';
import useStores from '../../../store';

const Item = Form.Item;
const { RangePicker } = DatePicker;
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
  const { groupInfo } = useStores();
  const { loading } = groupInfo;
  const [backPhysicalBillType, setBackPhysicalBillType] = useState([]);

  useEffect(() => {
    groupInfo.getTableList().then(res => {
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
          groupInfo.searchParams = {
            scanNumLen: 20,
          };
          groupInfo.getTableList();
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

  // 数字格式化函数
  const numFormatter = number => {
    return ('' + number).split('.')[0];
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
    console.log(params);
    if (params.date) {
      params['start_date'] = dayjs(params.date[0]).format('YYYY-MM-DD');
      params['end_date'] = dayjs(params.date[1]).format('YYYY-MM-DD');
    }

    // if (typeof params.hasPhysicalBills === 'boolean') {
    //   params.hasPhysicalBills = params.hasPhysicalBills ? 1 : 0;
    // }
    // if (typeof params.addAfterReal === 'boolean') {
    //   params.addAfterReal = params.addAfterReal ? 1 : 0;
    // }
    // if (typeof params.processBack === 'boolean') {
    //   params.processBack = params.processBack ? 'Y' : 'N';
    // }

    params.scanNumLen = 20;
    runInAction(() => {
      groupInfo.searchParams = {
        ...params,
      };
      groupInfo.getTableList();
    });
  };

  const handleFormChange = () => {
    const params = form.getFieldsValue();
    if (params.date) {
      params['start_date'] = dayjs(params.date[0]).format('YYYY-MM-DD');
      params['end_date'] = dayjs(params.date[1]).format('YYYY-MM-DD');
    }

    // if (typeof params.hasPhysicalBills === 'boolean') {
    //   params.hasPhysicalBills = params.hasPhysicalBills ? 1 : 0;
    // }
    // if (typeof params.addAfterReal === 'boolean') {
    //   params.addAfterReal = params.addAfterReal ? 1 : 0;
    // }
    // if (typeof params.processBack === 'boolean') {
    //   params.processBack = params.processBack ? 'Y' : 'N';
    // }

    params.scanNumLen = 20;

    runInAction(() => {
      groupInfo.searchParams = {
        ...params,
      };
    });
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
          {/* <Col span={6}>
            <Form.Item label="报账单号" name="claimNo">
              <Input allowClear />
            </Form.Item>
          </Col> */}

          <Col span={6}>
            <Form.Item label="所属部门：" name="groupDeptIds">
              <CategorySelect multiple />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="是否启用：" name="delFlg">
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
            <Form.Item label="组长/组员：" name="groupLeaderName">
              <Input allowClear />
            </Form.Item>
          </Col>

          <Col style={{ textAlign: 'right' }} span={18}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
