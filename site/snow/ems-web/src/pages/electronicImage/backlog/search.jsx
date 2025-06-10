import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';

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

const IMAGE_STATUS = {
  0: '待扫描',
  1: '待提交',
  11: '待重扫',
  12: '待复核',
};

const backPhysicalBillType = {
  0: '无需退实物',
  1: '退实物',
  2: '补充实物',
};

function Search() {
  const { backlog } = useStores();
  const { loading } = backlog;
  const [backPhysicalBillType, setBackPhysicalBillType] = useState([]);

  useEffect(() => {
    backlog.getLists().then(res => {
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
          backlog.searchParams = {
            scanNumLen: 20,
          };
          backlog.getLists();
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
      backlog.searchParams = {
        ...params,
      };
      backlog.getLists();
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
      backlog.searchParams = {
        ...params,
      };
    });
  };

  return (
    <ProCard className='mb-4'>
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
            <Item label="报账单号" name="documentNum">
              <Input placeholder="请输入报账单号" allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="业务类别" name="expCategoryName">
              <Input placeholder="请输入业务类别" allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="扫描号起" name="scanNumStart">
              <Input placeholder="请输入扫描号起" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="扫描号止" name="scanNumEnd">
              <Input placeholder="请输入扫描号止" allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="归属公司" name="ouCode">
              <OuSelect />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="申请人" name="proposer">
              <Input placeholder="请输入申请人" allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="申请部门" name="proposerDept">
              <Input placeholder="请输入申请部门" allowClear />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="附件数量" name="attachNum">
              <InputNumber
                placeholder="请输入附件数量"
                min={0}
                step={1}
                style={{ width: '100%' }}
                formatter={numFormatter}
              />
            </Item>
          </Col>

          <Col span={6}>
            <Item label="供应商名称" name="vendorName">
              <Input placeholder="请输入供应商名称" allowClear />
            </Item>
          </Col>
          <Col span={6}>
            <Item label="影像状态" name="imageStatus">
              <Select
                options={Object.keys(IMAGE_STATUS).map(key => {
                  return {
                    value: key,
                    label: IMAGE_STATUS[key],
                  };
                })}
              ></Select>
            </Item>
          </Col>

          <Col span={6}>
            <Item label="是否退实物" name="backPhysicalBillType">
              <Select
                options={backPhysicalBillType.map(item => {
                  return {
                    value: item.dictCode,
                    label: item.dictName,
                  };
                })}
              ></Select>
            </Item>
          </Col>

          <Col span={6}>
            <Item label="接收日期" name="date">
              <RangePicker style={{ width: '100%' }} allowClear />
            </Item>
          </Col>
          <Col span={6}>
            {/* Y 和 N */}
            <Item label="是否退回" name="processBack">
              {/* <Switch checkedChildren="是" unCheckedChildren="否"></Switch> */}

              <Select placeholder="请选择" allowClear>
                <Select.Option value="Y">是</Select.Option>
                <Select.Option value="N">否</Select.Option>
              </Select>
            </Item>
          </Col>
          <Col span={6}>
            {/* 1 和 0 */}
            <Item label="有无实物" name="hasPhysicalBills">
              {/* <Switch checkedChildren="有" unCheckedChildren="无"></Switch>
               */}
              <Select placeholder="请选择" allowClear>
                <Select.Option value="1">有</Select.Option>
                <Select.Option value="0">无</Select.Option>
              </Select>
            </Item>
          </Col>
          <Col span={6}>
            {/* 1 和 0 */}
            <Item label="来源标识" name="sourceFlag">
              {/* <Switch checkedChildren="有" unCheckedChildren="无"></Switch>
               */}
              <Select placeholder="请选择" allowClear>
                <Select.Option value="SDG">智能收单柜</Select.Option>
                <Select.Option value="NOT_SDG">非智能收单柜</Select.Option>
              </Select>
            </Item>
          </Col>
          {/* 1 和 0 */}
          <Col span={6}>
            <Item label="是否急单" name="addAfterReal">
              {/* <Switch checkedChildren="是" unCheckedChildren="否"></Switch> */}
              <Select placeholder="请选择" allowClear>
                <Select.Option value="1">是</Select.Option>
                <Select.Option value="0">否</Select.Option>
              </Select>
            </Item>
          </Col>

          <Col style={{ textAlign: 'right' }} span={24}>
            {renderButtons(buttons)}
          </Col>
        </Row>
      </Form>
    </ProCard>
  );
}

export default observer(Search);
