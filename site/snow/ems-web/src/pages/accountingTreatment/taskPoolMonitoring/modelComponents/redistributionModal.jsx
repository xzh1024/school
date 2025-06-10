import useStores from '@/store';
import { allocateTaskSave, getCrewsByGroup } from '@api/accountingTreatment/taskPoolMonitoring';
import { Col, Form, message, Modal, Row, Select } from 'antd';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

function Index() {
  const [form] = Form.useForm();
  const { taskPoolMonitoring } = useStores();
  let { currentRecord, allGroupOptions, selectRows, activeKey } = taskPoolMonitoring;
  const [loading, setLoading] = useState(false);
  const [groupObj, setGroupObj] = useState(null);
  const [crewsOptions, setCrewsOptions] = useState([]);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        let claimIdStrList = [];

        if (
          [
            'accounting_notSpecified',
            'review_notSpecified',
            'accounting_undistributed',
            'review_undistributed',
          ].includes(activeKey)
        ) {
          selectRows.forEach(element => {
            const str = element.claimId + '|' + element.processWorkItemId + '|' + '0';
            claimIdStrList.push(str);
          });
        } else if (['accounting_untreated', 'review_untreated'].includes(activeKey)) {
          selectRows.forEach(element => {
            const str =
              element.claimId +
              '|' +
              element.processWorkItemId +
              '|' +
              values.crewEmpId +
              '|' +
              element.processWorkItemId;
            claimIdStrList.push(str);
          });
        }

        const accountType = ['accounting_notSpecified', 'accounting_undistributed', 'accounting_untreated'].includes(
          activeKey,
        )
          ? 'steppool'
          : ['grabOrders_wait', 'grabOrders_alreadyRobbed'].includes(activeKey)
          ? 'wreststeppool'
          : 'steppool2';
        let data = {
          ...values,
          claimIdStr: claimIdStrList.join(','),
          isTransfer: '0',
          accountType,
        };
        if (groupObj) {
          data.groupId = groupObj.groupId;
          data.groupName = groupObj.groupName;
        } else {
          data.groupId = currentRecord.groupId;
          data.groupName = currentRecord.groupName;
        }
        setLoading(true);
        allocateTaskSave(data)
          .then(res => {
            message.success('操作成功');
            setLoading(false);
            runInAction(() => {
              taskPoolMonitoring.showRedistributionModel = false;
              taskPoolMonitoring.currentRecord = {};
              taskPoolMonitoring.getTableList();
              taskPoolMonitoring.selectKey = [];
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
      taskPoolMonitoring.showRedistributionModel = false;
    });
  };

  useEffect(() => {
    if (activeKey === 'accounting_untreated' && currentRecord.groupId) {
      // 反写数据  所以需要查询一下组员
      getCrewsByGroupFunc(currentRecord.groupId);
    }
  }, [currentRecord]);

  const getCrewsByGroupFunc = groupIdValue => {
    getCrewsByGroup({ groupId: groupIdValue })
      .then(res => {
        setCrewsOptions(res.data.crews);
      })
      .catch(err => {
        console.log(err);
      });
  };

  //选小组
  const handleSelectGroupType = (value, options) => {
    form.setFieldValue('crewEmpId', null);
    getCrewsByGroupFunc(value);

    setGroupObj(options);
  };

  useEffect(() => {
    if (!currentRecord.emergencyLevel) {
      form.setFieldValue('emergencyLevel', '1');
    }
  }, []);

  return (
    <Modal
      title="单据分配至个人（重新分配）"
      open={true}
      onOk={handleOk}
      okText="确定"
      onCancel={handleCancel}
      loading={loading}
      confirmLoading={loading}
      width="50%"
    >
      <Form form={form} {...layout} className="pt-6" initialValues={{ ...currentRecord, crewEmpId: '' }}>
        <Row gutter={16} justify="space-between">
          <Col span={12}>
            <Form.Item
              label="小组"
              className="form-item-label-warp"
              name="groupId"
              rules={[{ required: true, message: '请选择' }]}
            >
              <Select
                showSearch
                placeholder="请选择"
                fieldNames={{ label: 'groupName', value: 'groupId' }}
                options={allGroupOptions || []}
                onChange={handleSelectGroupType}
                filterOption={(input, option) => {
                  return option.groupName?.indexOf(input) > -1 || option.groupCode?.indexOf(input) > -1;
                }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="组员"
              className="form-item-label-warp"
              name="crewEmpId"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Select
                placeholder="请选择"
                fieldNames={{ label: 'crewEmpName', value: 'crewEmpId' }}
                options={crewsOptions || []}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="单据紧急程度" className="form-item-label-warp" name="emergencyLevel">
              <Select placeholder="请选择">
                <Select.Option value="1">普通</Select.Option>
                <Select.Option value="2">紧急</Select.Option>
                <Select.Option value="3">特急</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default observer(Index);
