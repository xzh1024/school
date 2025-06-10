import React, { useState, useRef, forwardRef } from 'react';
import { Spin } from 'antd';
import { observer } from 'mobx-react';
import useStores from '@s';

const PullToRefresh = (props, ref) => {
  const { aiDriverFare: aiStore } = useStores();

  const [isDragging, setIsDragging] = useState(false);

  const startY = useRef(0);

  const boxScrollTop = useRef(0);

  const getMore = () => {
    aiStore.getSessionHistoryPage();
  };

  const handleMouseDown = e => {
    setIsDragging(true);
    startY.current = e.pageY;
  };

  const handleMouseUp = e => {
    // 执行刷新数据的操作
    if (isDragging) {
      if (!boxScrollTop.current && e.pageY - startY.current > 50 && aiStore.page.num === 0) {
        getMore();
      }
    }
    setIsDragging(false);
  };

  const handleScroll = e => {
    const scrollTop = e.target.scrollTop;
    boxScrollTop.current = scrollTop;
    if (scrollTop <= 10 && aiStore.page.num > 0) {
      getMore();
    }
  };

  return (
    <div
      ref={ref}
      className="h-full relative overflow-scroll no-scrollbar"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onScroll={handleScroll}
    >
      {aiStore.page.loading ? (
        <div className="text-sm font-normal text-[#999999] p-4 flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        ''
      )}
      {props.children}
    </div>
  );
};

export default observer(forwardRef(PullToRefresh));
