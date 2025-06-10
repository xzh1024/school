import useStores from '@/store';
import { CloseOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { observer } from 'mobx-react';

const DrawerContent = () => {
  const { receiptManagement } = useStores();
  const { cacheDataSource, loading } = receiptManagement;

  const handleDel = (e, id) => {
    e.stopPropagation();
    const cache = [...cacheDataSource];
    const index = cache.findIndex(item => item.acquiringId === id);
    cache.splice(index, 1);
    receiptManagement.cacheDataSource = cache;
  };

  const renderCacheItem = cacheItem => (
    <div
      className="cache-item-container cache-item-container-receipt"
      key={cacheItem.claimId + `${cacheItem.acquiringId}`}
    >
      <div className="cache-item-container-title">{cacheItem.claimNo}</div>
      <div className="cache-item-container-close" onClick={e => handleDel(e, cacheItem.acquiringId)}>
        <CloseOutlined style={{ color: '#999999' }} />
      </div>
    </div>
  );

  return (
    <Spin spinning={loading}>
      <div className="drawer-content-container">{cacheDataSource.map(item => renderCacheItem(item))}</div>
    </Spin>
  );
};

export default observer(DrawerContent);
