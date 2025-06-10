import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import BaseCanvas from './components/baseCanvas';
function Index(props) {
  const { resourceList, resultList, selectedRows, setSelectedRows } = props;
  const canvasDefaultWidth = 500;
  const [scale, setScale] = useState(1);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (selectedRows.length) {
      // 将滚动条调整到对应的文件
      const nodeEl = document.getElementById(selectedRows[0].cosKey);
      if (nodeEl) {
        scrollRef.current.scrollTop = nodeEl.offsetTop;
      }
    }
  }, [selectedRows]);

  const canvasData = useMemo(() => {
    const dataMap = {};
    resultList.forEach(resultItem => {
      resultItem.data.forEach(item => {
        const calculatePosition = item.calculatePosition;
        if (calculatePosition) {
          const imageInfoMap = calculatePosition.imageInfoMap || {};
          Object.keys(imageInfoMap).forEach(key => {
            (dataMap[key] || (dataMap[key] = [])).push(imageInfoMap[key]);
          });
        }
      });
    });
    return dataMap;
  }, [resultList]);

  // 预览放大、缩小
  const scaleHandle = type => {
    if (type === 'enlarge' && scale < 3) {
      setScale(scale + 0.1);
    } else if (type === 'shrink' && scale > 1) {
      setScale(scale - 0.1);
    }
  };

  return (
    <div
      className="flex-none h-[500px] relative z-[2] rounded-lg overflow-hidden border border-solid border-[#EDEDED]"
      style={{
        width: `${canvasDefaultWidth + 2}px`,
      }}
    >
      <div className="full-screen-button box-border px-3 absolute top-0 left-0 z-10 h-[24px] bg-black bg-opacity-30 text-[#fff] flex items-center text-[12px] rounded-ss-lg rounded-ee-lg">
        <div className="flex-1">原文件预览</div>
      </div>
      <div className="full-screen-button box-border absolute bottom-3.5 right-3.5 z-10 text-[#fff] flex items-center select-none">
        <div
          className="w-[20px] h-[20px] rounded cursor-pointer bg-black bg-opacity-70 flex justify-center items-center"
          onClick={event => {
            scaleHandle('shrink');
            event.stopPropagation();
          }}
        >
          <MinusOutlined className="text-[10px]" />
        </div>
        <div className="w-[42px] h-[20px] ml-1.5 text-[12px] bg-black rounded bg-opacity-70 flex justify-center items-center">
          {Math.floor(scale * 100)}%
        </div>
        <div
          className="w-[20px] h-[20px] ml-1.5 rounded cursor-pointer bg-black bg-opacity-70 flex justify-center items-center"
          onClick={event => {
            scaleHandle('enlarge');
            event.stopPropagation();
          }}
        >
          <PlusOutlined className="text-[10px]" />
        </div>
      </div>
      <div ref={scrollRef} className="w-full h-full overflow-auto">
        {/* <div className="w-full h-full origin-top-left" style={{ transform: `scale(${scale})` }}> */}
        <div className="w-full h-full">
          {resourceList.map(item => (
            <BaseCanvas
              key={item.cosKey}
              cosKey={item.cosKey}
              url={item.url}
              defaultWidth={canvasDefaultWidth}
              isShowCanvas={true}
              tableData={canvasData[item.cosKey] || []}
              selectedRows={selectedRows}
              onSelectedRows={setSelectedRows}
              changeSelectedRows={setSelectedRows}
              scale={scale}
              setScale={setScale}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default observer(Index);
