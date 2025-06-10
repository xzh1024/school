import { feedbackSubmit } from '@api/dashboard';
import { Button, Form, Input, Modal, Select, Upload, message } from 'antd';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import './index.css';

const { useForm, Item } = Form;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const { TextArea } = Input;
const AND_OPTIONS = [
  {
    value: '1',
    label: '普通用户',
  },
  {
    value: '2',
    label: '总部财务',
  },
  {
    value: '3',
    label: '共享财务',
  },
  {
    value: '4',
    label: '工厂财务',
  },
  {
    value: '5',
    label: '运维管理',
  },
];
const TYPE_OPTIONS = [
  {
    value: '1',
    label: '建议',
  },
  {
    value: '2',
    label: '投诉',
  },
];

function Index({ cancelBack }) {
  const [form] = useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCommit = () => {
    form.validateFields().then(res => {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', fileList[0]);
      formData.append('role', res.role);
      formData.append('feedbackType', res.feedbackType);
      formData.append('description', res.description);
      formData.append('processFlag', 1);

      feedbackSubmit(formData)
        .then(res => {
          setLoading(true);
          cancelBack();
          if (res.ok) {
            message.success('反馈成功');
          }
        })
        .catch(err => {
          setLoading(true);
          cancelBack();
          message.error(err);
        });
    });
  };

  const UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([file]);
      return false;
    },
    fileList,
    maxCount: 1,
    multiple: false,
    listType: 'picture',
  };

  return (
    <Modal
      title={'意见反馈'}
      open={true}
      onOk={handleCommit}
      okText="提交"
      onCancel={() => cancelBack()}
      loading={loading}
      cancelText={false}
      confirmLoading={loading}
      width={550}
      mask={false}
      style={{ position: 'absolute', top: 'auto', bottom: '10px', right: '40px' }}
    >
      <Form form={form} style={{ padding: '16px' }} {...layout}>
        <Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
          <Select options={AND_OPTIONS} allowClear onClick={event => event.stopPropagation()} />
        </Item>
        <Item label="类型" name="feedbackType" rules={[{ required: true, message: '请选择类型' }]}>
          <Select options={TYPE_OPTIONS} allowClear onClick={event => event.stopPropagation()} />
        </Item>
        <Item label="详细描述" name="description">
          <TextArea showCount maxLength={2000} autoSize={{ minRows: 5, maxRows: 7 }} />
        </Item>
        <Item label="截图" name="file">
          <Upload {...UploadProps}>
            <Button>反馈文件</Button>
          </Upload>
        </Item>
      </Form>
    </Modal>
  );
}

export default observer(Index);
