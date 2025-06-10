import { dataDictPUT, groupEdit } from '@api/accountingTreatment/groupWork';

import { Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';

import CategorySelectByTree from '@c/categorySelectByTree';
import ComSelect from '@c/compSelect';
import CategorySelect from '@c/departmentSelectByTree';
import GroupSelectByType from '@c/groupSelectByType';
import React, { useEffect, useState } from 'react';
import useStores from '../../../store';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function Index() {
  const [form] = Form.useForm();
  const { groupWork } = useStores();
  let { currentRecord, modaltitle } = groupWork;
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({});

  useEffect(() => {
    if (modaltitle === '修改数据') {
      groupEdit(currentRecord.workspaceId).then(res => {
        if (res.data.ouCode) {
          form.setFieldValue('ouCodes', [res.data.ouCode]);
        }
        form.setFieldValue('groupId', res.data.groupId);
        form.setFieldValue('useFlag', res.data.useFlag);
        setParams({
          workspaceId: currentRecord.workspaceId,
          groupName: res.data.groupName,
          // groupId: res.data.groupId,
          ouNames: res.data.ouName,
          deptIds: res.data.deptId,
          deptNames: res.data.deptName,
          deptLevels: res.data.deptLevel,
          expCategoryCodes: res.data.expCategoryCode,
          expCategoryNames: res.data.expCategoryName,
          expCategoryLevels: res.data.expCategoryLevel,
        });
        runInAction(() => {
          groupWork.currentRecord = {
            ...groupWork.currentRecord,
            ...res.data,
            ouCodes: res.data.ouCode,
          };
        });
      });
    }
    setLoading(false);
  }, []);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log(params, groupWork.currentRecord, '点击完成时参数');
        console.log(values, 'values');
        let data = {
          // ...values,
          ...groupWork.currentRecord,
          ...params,
        };
        setLoading(true);
        dataDictPUT(data)
          .then(res => {
            message.success('操作成功');
            setLoading(false);
            runInAction(() => {
              groupWork.showModal = false;
              groupWork.currentRecord = {};
              groupWork.getTableList();
            });
          })
          .catch(err => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch(err => {
        console.log('到这里', err);
      });
  };

  const handleCancel = () => {
    runInAction(() => {
      groupWork.showModal = false;
    });
  };

  const handleFormChangeed = () => {
    const params = form.getFieldsValue();
    if (params.expCategoryCodes && typeof params.expCategoryCodes === 'object') {
      params.expCategoryCodes = params.expCategoryCodes.join(',');
    }

    if (params.deptIds && typeof params.deptIds === 'object') {
      params.deptIds = params.deptIds.join(',');
    }

    if (params.ouCodes) {
      params.ouCodes = params.ouCodes.join(',');
    }

    runInAction(() => {
      groupWork.currentRecord = {
        ...groupWork.currentRecord,
        ...params,
      };
    });
  };

  //切换分组类型
  const handleSelectGroupType = () => {
    form.setFieldValue('groupId', '');
    setParams({ ...params, groupName: '' });
  };

  //选中小组名称的回调
  const handleSelectGroup = (value, options) => {
    if (value) {
      setParams({ ...params, groupName: options.title });
    } else {
      setParams({ ...params, groupName: '' });
    }
  };

  //选中归属公司的回调
  const handleSelectCompany = (value, options) => {
    if (value) {
      setParams({ ...params, ouNames: options.map(item => item.title).join(',') });
    } else {
      setParams({ ...params, ouNames: '' });
    }
  };

  //选中申请组织的回调
  const handleSelectOrg = (value, options) => {
    if (value) {
      setParams({
        ...params,
        deptIds: value.join(','),
        deptNames: options.map(item => item.orgName).join(','),
        deptLevels: options.map(item => item.orgLevel).join(','),
      });
    } else {
      setParams({
        ...params,
        deptIds: '',
        deptNames: '',
        deptLevels: '',
      });
    }
  };

  //选中费用类别的回调
  const handleSelectCategory = (value, options) => {
    if (value) {
      setParams({
        ...params,
        expCategoryCodes: value.join(','),
        expCategoryNames: options.map(item => item.name).join(','),
        expCategoryLevels: options.map(item => item.level).join(','),
      });
    } else {
      setParams({ ...params, expCategoryCodes: '', expCategoryNames: '', expCategoryLevels: '' });
    }
  };

  return (
    <Modal
      title={modaltitle}
      open={true}
      onOk={handleOk}
      okText="确定"
      onCancel={handleCancel}
      loading={loading}
      confirmLoading={loading}
      width={1100}
    >
      <Form form={form} {...layout} className="pt-6" initialValues={currentRecord} onValuesChange={handleFormChangeed}>
        <Row gutter={16} justify="space-between">
          <Col span={12}>
            <Form.Item label="分组类型：" name="groupType" rules={[{ required: true, message: '请选择' }]}>
              <Select placeholder="请选择" style={{ width: 260 }} onChange={handleSelectGroupType}>
                <Select.Option value="0">核算会计</Select.Option>
                <Select.Option value="1">复核会计</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="小组名称：" name="groupId" rules={[{ required: true, message: '请输入' }]}>
              <GroupSelectByType grouptype={groupWork?.currentRecord?.groupType || ''} onChange={handleSelectGroup} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="是否启用：" name="useFlag" rules={[{ required: true, message: '请选择' }]}>
              <Select placeholder="请选择" style={{ width: 260 }}>
                <Select.Option value="0">是</Select.Option>
                <Select.Option value="1">否</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="归属公司：" name="ouCodes" rules={[{ required: false, message: '请选择' }]}>
              <ComSelect onChange={handleSelectCompany} mode="multiple" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="申请组织：" name="deptIds" rules={[{ required: false, message: '请选择' }]}>
              <CategorySelect multiple onChange={handleSelectOrg} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="费用类别：" name="expCategoryCodes" rules={[{ required: false, message: '请选择' }]}>
              <CategorySelectByTree multiple onChange={handleSelectCategory} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="默认优先级：" name="rateValue" rules={[{ required: false, message: '请选择' }]}>
              <Input allowClear style={{ width: 260 }} disabled />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="调整后优先级：" name="modifyRateValue" rules={[{ required: false, message: '请输入' }]}>
              <Input allowClear style={{ width: 260 }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default observer(Index);
