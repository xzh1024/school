import { Form, Input, Modal, Radio, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { getApproveInfo, getTransferPersonList, submitApprove, transferFlow } from '../../../api/electronicImage/index';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

let approveInfo = null;

export default function Index(props) {
  const [form] = Form.useForm();
  const { record, done, cancel, isTH, isTransfer } = props;
  const [loading, setLoading] = useState(false);
  const [pathOptions, setPathOptions] = useState([]);
  const [peopleOptions, setPeopleOptions] = useState([]);
  const [personOptions, setPersonOptions] = useState([]);

  // 转办逻辑
  useEffect(() => {
    if (isTransfer) {
      setLoading(true);
      getTransferPersonList()
        .then(res => {
          const data = (res.data || []).map(item => ({
            option: item,
            label: item.employeeName,
            value: `${item.orgId}/${item.userId}`,
          }));
          setPersonOptions(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isTransfer]);

  // 提交逻辑
  useEffect(() => {
    if (isTransfer) {
      return;
    }
    if (record && record.claimId) {
      const data = {
        claimId: record.claimId,
        claimBase: {
          expCategoryId: record.expCategoryId,
          claimId: record.claimId,
          claimNo: record.documentNum,
        },
        nextStepId: isTH ? 'TH' : 'TJ',
        source: 'emsImage',
        isCache: 'N',
        pathCandidateModels: null,
        orgPathCandidateModels: null,
      };
      setLoading(true);
      getApproveInfo(data)
        .then(res => {
          const { pathCandidateModels } = res.data;
          approveInfo = res.data;
          let nextStepId, candidateUsers;

          if (pathCandidateModels && pathCandidateModels.length === 1) {
            const candidates = (pathCandidateModels[0].candidates || []).map(item => ({
              ...item,
              value: `${item.userId}/${item.orgId}`,
              orgOption: item,
            }));
            setPeopleOptions(candidates || []);
            nextStepId = pathCandidateModels[0].stateId;
            candidateUsers = `${candidates[0].userId}/${candidates[0].orgId}`;
          }
          form.setFieldsValue({
            nextStepId,
            candidateUsers,
            processOpinion: isTH ? '退回纸质附件修改' : '同意，附件原件清晰无误，与影像件一致.',
          });
          setPathOptions(pathCandidateModels || []);
        })
        .catch(() => {
          cancel && cancel();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const transferSubmit = params => {
    transferFlow({
      ...params,
      claimId: record.claimId,
    })
      .then(res => {
        window.$message.success('操作成功');
        cancel && cancel();
        done && done(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = value => {
    setLoading(true);
    if (isTransfer) {
      return transferSubmit(value);
    }
    return submit(value);
  };

  const submit = value => {
    const data = {
      ...value,
      backAcquiringBase: !!parseInt(value.backAcquiringBase),
      workItemId: approveInfo.workItemId,
      currentStepId: approveInfo.currentStepId,
      source: 'emsPc',
      claimId: record.claimId,
      path_stateId: value.nextStepId,
      claimBase: {
        claimId: record.claimId,
        expCategoryId: approveInfo.claimBase.expCategoryId,
      },
    };
    submitApprove(data)
      .then(res => {
        window.$message.success('操作成功');
        cancel && cancel();
        done && done();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePathChange = (value, option) => {
    const { candidates } = option;
    const candidatesOption = (candidates || []).map(item => ({
      ...item,
      value: `${item.userId}/${item.orgId}`,
      orgOption: item,
    }));
    setPeopleOptions(candidatesOption || []);
    if (candidates && candidates.length === 1) {
      form.setFieldsValue({
        candidateUsers: candidatesOption[0].value,
      });
    }
  };

  const handleFilerUser = (inputValue, option) => {
    const keyStr = `${option.option.label}/${option.option.option.employeeName}/${option.option.option.orgName}/${option.option.option.positionName}`;
    return keyStr.includes(inputValue) || option.key.includes(inputValue);
  };

  return (
    <Modal
      title={isTransfer ? '流程转办' : isTH ? '退回流程' : '提交流程'}
      okText="提交"
      onCancel={() => cancel && cancel()}
      open
      onOk={() => form.submit()}
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        <Form
          {...layout}
          form={form}
          onFinish={handleSubmit}
          initialValues={
            isTransfer
              ? {}
              : {
                  backAcquiringBase: '1',
                }
          }
        >
          {isTransfer && (
            <Form.Item
              label="转办人员"
              name="candidateUsers"
              rules={[{ required: true, message: '请选择转办人员' }]}
              required
            >
              <Select showSearch filterOption={handleFilerUser}>
                {personOptions.map(item => {
                  return (
                    <Select.Option value={item.value} key={item.value} option={item} className="self-auto">
                      <div>{item.label}</div>
                      <div className="opacity-45">{`${item.option.orgName}/${item.option.positionName}`}</div>
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          )}
          {!isTransfer && (
            <>
              <Form.Item
                label="路径选择"
                name="nextStepId"
                rules={[{ required: true, message: '请选择路径' }]}
                required
              >
                <Select
                  options={pathOptions}
                  onChange={handlePathChange}
                  fieldNames={{
                    label: 'stateName',
                    value: 'stateId',
                  }}
                />
              </Form.Item>
              <Form.Item
                label="人员选择"
                name="candidateUsers"
                rules={[{ required: true, message: '请选择人员' }]}
                required
              >
                <Select
                  options={peopleOptions}
                  fieldNames={{
                    label: 'userName',
                  }}
                />
              </Form.Item>
              <Form.Item
                label="是否邮寄"
                name="backAcquiringBase"
                rules={[{ required: true, message: '请选择是否邮寄' }]}
                required
              >
                <Radio.Group>
                  <Radio value="1"> 是 </Radio>
                  <Radio value="0"> 否 </Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}
          <Form.Item label="意见" name="processOpinion" rules={[{ required: true, message: '请输入意见' }]} required>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}
