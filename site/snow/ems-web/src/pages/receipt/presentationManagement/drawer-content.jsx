import useStores from '@/store';
import { CloseOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { observer } from 'mobx-react';

const DrawerContent = () => {
  const { presentationManagement, globalStore } = useStores();
  const { cacheDataSource, cacheSelected } = presentationManagement;

  const handleDel = (e, id) => {
    e.stopPropagation();
    presentationManagement.cancelCache(id, globalStore.userInfo.userName);
  };

  const renderCacheItem = cacheItem => (
    <div
      className={
        cacheSelected.includes(cacheItem.cacheId) ? 'cache-item-container cache-selected' : 'cache-item-container'
      }
      key={cacheItem.cacheId}
    >
      <div className="cache-item-container-close" onClick={e => handleDel(e, cacheItem.cacheId)}>
        <CloseOutlined style={{ color: '#999999' }} />
      </div>
      <div className="cache-item-container-title">{cacheItem.claimNo}</div>
      <div className="cache-item-container-line">
        <div className="cache-item-container-line-label">报账金额：</div>
        <div className="cache-item-container-line-value">{cacheItem.applyAmount}</div>
      </div>
      <div className="cache-item-container-line">
        <div className="cache-item-container-line-label">申请人：</div>
        <div className="cache-item-container-line-value">{cacheItem.applyEmpName}</div>
      </div>
      <div className="cache-item-container-line">
        <div className="cache-item-container-line-label">业务类别：</div>
        <div className="cache-item-container-line-value">{cacheItem.item2Name}</div>
      </div>
      <div className="cache-item-container-line">
        <div className="cache-item-container-line-label">归属公司：</div>
        <div className="cache-item-container-line-value">{cacheItem.applyCompName}</div>
      </div>
    </div>
  );

  return (
    <Spin spinning={presentationManagement.loading}>
      <div className="drawer-content-container">{cacheDataSource.map(item => renderCacheItem(item))}</div>
    </Spin>
  );
};

export default observer(DrawerContent);
