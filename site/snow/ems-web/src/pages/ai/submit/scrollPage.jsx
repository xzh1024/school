import React, { useState, useRef, forwardRef } from 'react';
import { Spin } from 'antd';
import useStores from '@s';
import { observer } from 'mobx-react';

const PullToRefresh = (props, ref) => {
  const { aiSubmit } = useStores();

  const [isDragging, setIsDragging] = useState(false);

  const boxScrollTop = useRef(0);

  const getMore = () => {
    aiSubmit.getSessionHistoryPage();
  };

  const startY = useRef(0);
  const handleMouseDown = e => {
    setIsDragging(true);
    startY.current = e.pageY;
  };

  // const handleMouseMove = e => {
  //   if (isDragging && e.buttons === 1) {
  //     if (!boxScrollTop.current && e.pageY - startY.current > 50) {
  //       // 滚动到顶部时可以进行下拉刷新
  //       // setIsRefreshing(true);
  //       getMore();
  //     }
  //   }
  // };

  const handleMouseUp = e => {
    // 执行刷新数据的操作
    if (isDragging) {
      if (!boxScrollTop.current && e.pageY - startY.current > 50 && aiSubmit.page.num === 0) {
        getMore();
      }
    }
    setIsDragging(false);
  };

  const handleScroll = e => {
    const scrollTop = e.target.scrollTop;
    boxScrollTop.current = scrollTop;
    if (scrollTop <= 10 && aiSubmit.page.num > 0) {
      getMore();
    }
  };

  return (
    <div
      ref={ref}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      // onMouseMove={handleMouseMove}
      // onTouchMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onScroll={handleScroll}
      style={
        {
          // border: '1px solid red',
        }
      }
      className="h-full relative overflow-scroll no-scrollbar"
    >
      {aiSubmit.page.loading ? (
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
