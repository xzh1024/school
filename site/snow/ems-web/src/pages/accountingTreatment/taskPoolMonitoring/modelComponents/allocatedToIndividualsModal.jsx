import useStores from '@/store';
import { allocateClaimByWrestSave, getSelectCrewByItem2Code } from '@api/accountingTreatment/taskPoolMonitoring';
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
  let { currentRecord, selectKey, activeKey } = taskPoolMonitoring;
  const [loading, setLoading] = useState(false);
  const [crewsOptions, setCrewsOptions] = useState([]);
  const [userNameOj, setUserNameOj] = useState(null);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        let data = {
          ...values,
          currentStepId: activeKey === 'grabOrders_wait' ? 'wreststeppool' : 'steppool',
          claimIdStr: selectKey.join(','),
          isHandOver: '',
          userName: userNameOj.userName,
        };
        setLoading(true);
        allocateClaimByWrestSave(data)
          .then(res => {
            message.success(res.data[0]);
            setLoading(false);
            runInAction(() => {
              taskPoolMonitoring.showAllocatedToIndividualsModal = false;
              taskPoolMonitoring.currentRecord = {};
              taskPoolMonitoring.getTableList();
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

  useEffect(() => {
    if (currentRecord.item2Code) {
      getCrewsByGroupFunc(currentRecord.item2Code);
    }
  }, [currentRecord.item2Code]);

  const getCrewsByGroupFunc = value => {
    getSelectCrewByItem2Code({ item2Code: value })
      .then(res => {
        setCrewsOptions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    runInAction(() => {
      taskPoolMonitoring.showAllocatedToIndividualsModal = false;
    });
  };

  const handleChangeFunc = (value, options) => {
    setUserNameOj(options);
  };

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
              label="组员"
              className="form-item-label-warp"
              name="crewEmpId"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Select
                placeholder="请选择"
                fieldNames={{ label: 'empName', value: 'empCode' }}
                options={crewsOptions || []}
                onChange={handleChangeFunc}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default observer(Index);
