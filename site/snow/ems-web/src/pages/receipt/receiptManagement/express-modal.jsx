import useStores from '@/store';
import { Form, Input, Modal } from 'antd';
import { useState } from 'react';

const Express = ({ onCancel, isCache = false }) => {
  const [expressNo, setExpressNo] = useState();
  const [loading, setLoading] = useState(false);
  const { receiptManagement, globalStore } = useStores();

  const handleOk = () => {
    setLoading(true);
    if (!expressNo) {
      window.$message.warning('请填写快递单号');
      return setLoading(false);
    }
    const data = { userName: globalStore.userInfo.userName, expressNo };
    if (isCache) {
      data.acquiringIdList = receiptManagement.cacheDataSource.map(item => item.acquiringId);
    }
    receiptManagement
      .postByExpress(data)
      .then(() => {
        setLoading(false);
        if (isCache) {
          receiptManagement.cacheDataSource = [];
        }
        handleCancel();
      })
      .catch(e => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    onCancel();
    setExpressNo('');
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
      maskClosable={false}
    >
      <Form.Item label="快递单号" style={{ paddingTop: '10px' }}>
        <Input value={expressNo} onChange={e => setExpressNo(e.target.value)} />
      </Form.Item>
    </Modal>
  );
};

export default Express;
