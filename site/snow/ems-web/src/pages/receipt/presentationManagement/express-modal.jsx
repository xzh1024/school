import useStores from '@/store';
import { expressRegExp } from '@u/tools';
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';

const Express = () => {
  const [expressNo, setExpressNo] = useState();
  const [loading, setLoading] = useState(false);
  const { presentationManagement, globalStore } = useStores();

  const handleOk = () => {
    setLoading(true);

    expressValidator(expressNo)
      .then(value => {
        presentationManagement
          .sendPost({ userName: globalStore.userInfo.userName, expressNo: value })
          .then(() => {
            handleCancel();
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch(e => {
        window.$message.warning(e);
        return setLoading(false);
      });
  };

  const handleCancel = () => {
    presentationManagement.showExpressModal = false;
    setExpressNo('');
  };

  const expressValidator = value => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject('请填写快递单号');
      }
      if (!expressRegExp.test(value)) {
        reject('请输入正确的快递单号');
      }
      resolve(value);
    });
  };

  return (
    <Modal
      title="快递单号填写"
      width={'500px'}
      open
      onOk={handleOk}
      okText="确认"
      cancelText="取消"
      onCancel={handleCancel}
      confirmLoading={loading}
    >
      <Form.Item label="快递单号" style={{ paddingTop: '10px' }}>
        <Input value={expressNo} onChange={e => setExpressNo(e.target.value)} />
      </Form.Item>
    </Modal>
  );
};

export default Express;
