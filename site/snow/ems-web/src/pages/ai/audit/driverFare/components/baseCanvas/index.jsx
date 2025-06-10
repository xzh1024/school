import React, { useMemo, useRef, useState } from 'react';
import { RotateRightOutlined } from '@ant-design/icons';

export default function index(props) {
  const { url = '', cosKey = '', defaultWidth = 500, tableData = [], selectedRows = [], scale = 1 } = props;

  const ratio = useRef(1);
  const refImg = useRef(null);
  const refCanvas = useRef(null);
  const refContainer = useRef(null);
  const refCtx = useRef(null);
  const defaultCanvasWidth = useRef(null);
  const defaultCanvasHeight = useRef(null);
  const rotateRef = useRef(0);

  const relTableData = useMemo(() => {
    let list = [];
    tableData.forEach(item => {
      list = [...list, ...item.keyInfos];
    });
    return list;
  }, [tableData]);

  const relSelectedRows = useMemo(() => {
    return selectedRows || [];
  }, [selectedRows]);

  const getPositionArray = position => {
    const ratioValue = ratio.current;
    return [
      position.x * ratioValue,
      position.y * ratioValue,
      position.width * ratioValue,
      position.height * ratioValue,
    ];
  };

  const drawCanvas = () => {
    const imgEl = refImg.current;
    const canvas = refCanvas.current;
    refCtx.current = canvas.getContext('2d');
    ratio.current = defaultWidth / imgEl.width;
    defaultCanvasWidth.current = defaultWidth;
    defaultCanvasHeight.current = Math.floor(imgEl.height * ratio.current);
    drawImg();
  };

  const drawImg = () => {
    const canvas = refCanvas.current;
    const ctx = refCtx.current;
    if (!canvas || !ctx) return;
    const rotateValue = rotateRef.current;
    const width = defaultCanvasWidth.current * scale;
    const height = defaultCanvasHeight.current * scale;
    const img = refImg.current;
    switch (rotateValue) {
      case 90: // 旋转90°
        canvas.width = height;
        canvas.height = width;
        ctx.rotate((90 * Math.PI) / 180);
        ctx.drawImage(img, 0, -height, width, height);
        drawAllCanvasPositions();
        break;
      case 180: // 旋转180°
        canvas.width = width;
        canvas.height = height;
        ctx.rotate((180 * Math.PI) / 180);
        ctx.drawImage(img, -width, -height, width, height);
        drawAllCanvasPositions();
        break;
      case 270: // 旋转270°
        canvas.width = height;
        canvas.height = width;
        ctx.rotate((-90 * Math.PI) / 180);
        ctx.drawImage(img, -width, 0, width, height);
        drawAllCanvasPositions();
        break;
      default:
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        drawAllCanvasPositions();
        break;
    }
    drawAllCanvasPositions();
  };

  const drawAllCanvasPositions = () => {
    if (relTableData.length) {
      relTableData.forEach(item => {
        drawCanvasPosition(item);
      });
    }
  };

  const drawCanvasPosition = drawData => {
    let type = null;
    if (relSelectedRows.find(item => item.cosKey === cosKey && item.x === drawData.x && item.y === drawData.y)) {
      type = 'active';
    }
    const positionArray = getPositionArray(drawData);
    const rectRadius = 5 * scale;
    if (type === 'active') {
      fillRoundRect(positionArray, rectRadius);
    }
  };

  const fillRoundRect = (positionArray, r) => {
    const x = parseFloat(positionArray[0]) * scale;
    const y = parseFloat(positionArray[1]) * scale;
    const w = parseFloat(positionArray[2]) * scale;
    const h = parseFloat(positionArray[3]) * scale;
    const borderRadius = 2;
    const ctx = refCtx.current;
    ctx.strokeStyle = '#F58700'; // 边框颜色
    ctx.fillStyle = 'rgba(243, 204, 53, 0.1)'; // 背景颜色
    ctx.beginPath(); // 起始一条路径，或重置当前路径
    ctx.moveTo(x + r, y); // 创建起始点
    ctx.arcTo(x + w, y, x + w, y + h, borderRadius); // 创建弧
    ctx.arcTo(x + w, y + h, x, y + h, borderRadius);
    ctx.arcTo(x, y + h, x, y, borderRadius);
    ctx.arcTo(x, y, x + w, y, borderRadius);
    ctx.closePath(); // 创建从当前点回到起始点的路径
    ctx.stroke(); // 描边
    ctx.fill(); // 填充
  };

  const scaleHandle = type => {
    // if (type === 'enlarge' && scale < 3) {
    //   setScale(scale + 0.1);
    // } else if (type === 'shrink' && scale > 1) {
    //   setScale(scale - 0.1);
    // }
    drawImg();
  };

  const initCanvas = () => {
    drawCanvas();
  };
  const imageRotate = () => {
    let rotateValue = rotateRef.current;
    if (rotateValue < 270) {
      rotateValue = rotateValue + 90;
    } else {
      rotateValue = 0;
    }
    rotateRef.current = rotateValue;
    drawImg();
  };
  return (
    <div id={cosKey} className="relative">
      <RotateRightOutlined className="absolute z-10 top-2 right-4" onClick={imageRotate} />
      {url ? (
        <div ref={refContainer}>
          <img className="hidden" ref={refImg} src={url} onLoad={initCanvas} />
          <canvas ref={refCanvas}>your browser does not support the canvas tag</canvas>
          <div>
            <i onClick={scaleHandle('enlarge')} />
            <i onClick={scaleHandle('shrink')} />
          </div>
        </div>
      ) : (
        <div>暂无图片</div>
      )}
    </div>
  );
}
