import { SearchOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { getCrewsByGroup } from '@api/accountingTreatment/taskPoolMonitoring';
import CategorySelectByTree from '@c/categorySelectByTree';
import ComSelect from '@c/compSelect';
import MoreSearch from '@c/moreSearch';
import useStores from '@s/index';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const timeOptions = [
  {
    label: '15天',
    value: 15,
  },
  {
    label: '30天',
    value: 30,
  },
  {
    label: '45天',
    value: 45,
  },
  {
    label: '60天',
    value: 60,
  },
  {
    label: '全部',
    value: '',
  },
];
const specialOption = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  },
];

function Search() {
  const [form] = Form.useForm();
  const { taskPoolMonitoring } = useStores();
  const [crewsOptions, setCrewsOptions] = useState([]);
  const { allGroupOptions } = taskPoolMonitoring;
  const [showMore, setShowMore] = useState(false);

  const handleSearch = value => {
    if (value.processStateStartTimeMin) {
      value.processStateStartTimeMin = dayjs(value.processStateStartTimeMin).format('YYYY-MM-DD');
    }
    if (value.processStateStartTimeMax) {
      value.processStateStartTimeMax = dayjs(value.processStateStartTimeMax).format('YYYY-MM-DD');
    }
    if (value.item2Code) {
      value.item2Code = value.item2Code.join(',');
    }
    runInAction(() => {
      taskPoolMonitoring.pageIndex = 1;
      taskPoolMonitoring.search = value;
      taskPoolMonitoring.getTableList(value);
    });
  };

  //选小组
  const handleSelectGroupType = (value, options) => {
    form.setFieldValue('crewEmpId', null);
    getCrewsByGroup({ groupId: value })
      .then(res => {
        setCrewsOptions(res.data.crews);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    form.setFieldValue('dateRange', '15');
  }, []);

  return (
    <ProCard className="my-4" bodyStyle={{ padding: '0' }}>
      <MoreSearch toggle={setShowMore}>
        <Form form={form} {...layout} onFinish={handleSearch}>
          <Row gutter={20}>
            <Col span={6} order={1}>
              <Form.Item label="小组名称" className="form-item-label-warp mb-3" name="groupId">
                <Select
                  placeholder="请选择小组名称"
                  fieldNames={{ label: 'groupName', value: 'groupId' }}
                  options={allGroupOptions || []}
                  onChange={handleSelectGroupType}
                />
              </Form.Item>
            </Col>
            <Col span={6} order={2}>
              <Form.Item label="组员名称" className="form-item-label-warp mb-3" name="crewEmpId">
                <Select
                  placeholder="请选择组员名称"
                  fieldNames={{ label: 'crewEmpName', value: 'crewEmpId' }}
                  options={crewsOptions || []}
                />
              </Form.Item>
            </Col>
            <Col span={6} order={3}>
              <Form.Item label="单据编号" className="form-item-label-warp mb-3" name="claimNo">
                <Input allowClear />
              </Form.Item>
            </Col>
            <>
              <Col span={6} order={4 + !showMore}>
                <Form.Item label="归属公司" className="form-item-label-warp mb-3" name="ouCode">
                  <ComSelect />
                </Form.Item>
              </Col>
              <Col span={6} order={5 + !showMore}>
                <Form.Item label="业务类别" className="form-item-label-warp mb-3" name="item2Code">
                  <CategorySelectByTree multiple />
                </Form.Item>
              </Col>
              <Col span={6} order={6 + !showMore}>
                <Form.Item label="时间跨度" className="form-item-label-warp mb-3" name="dateRange">
                  <Select placeholder="请选择时间跨度" options={timeOptions} />
                </Form.Item>
              </Col>
              <Col span={6} order={7 + !showMore}>
                <Form.Item label="到达日期自" className="form-item-label-warp mb-3" name="processStateStartTimeMin">
                  <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6} order={8 + !showMore}>
                <Form.Item label="到达日期至" className="form-item-label-warp mb-3" name="processStateStartTimeMax">
                  <DatePicker format={'YYYY-MM-DD'} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6} order={9 + !showMore}>
                <Form.Item label="在途单据" className="form-item-label-warp mb-3" name="isSpecial">
                  <Select placeholder="请选择在途单据" options={specialOption} />
                </Form.Item>
              </Col>
            </>

            <Col span={showMore ? 18 : 6} order={showMore ? 10 : 4}>
              <div className="text-right pb-2 flex justify-end">
                <Button icon={<SearchOutlined />} type="primary" htmlType="submit" className="mr-2">
                  查询
                </Button>
                <Button
                  onClick={() => {
                    form.resetFields();
                    runInAction(() => {
                      taskPoolMonitoring.pageIndex = 1;
                      taskPoolMonitoring.search = {};
                      taskPoolMonitoring.getTableList();
                    });
                  }}
                >
                  重置
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </MoreSearch>
    </ProCard>
  );
}

export default observer(Search);
