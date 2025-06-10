import { observer } from 'mobx-react';
import React, { useState } from 'react';
import './index.css';
import ModalCom from './modal';

function Index() {
  const [modalShow, setModalShow] = useState(false);

  const handleMouseOver = () => {
    setModalShow(true);
  };

  const handleOnCancelFunc = () => {
    setModalShow(false);
  };
  return (
    <>
      <div
        className="fixed bottom-1 z-50 cursor-pointer react-draggable feedback_big"
      >
        <div className="feedback" onMouseOver={handleMouseOver}>
          {/* <BulbOutlined style={{ color: '#fff', marginBottom: '4px' }} /> */}
          <span>用户反馈</span>
        </div>
        {modalShow && <ModalCom cancelBack={handleOnCancelFunc} />}
      </div>
    </>
  );
}

export default observer(Index);
