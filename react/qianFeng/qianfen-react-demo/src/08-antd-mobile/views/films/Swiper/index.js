import React from 'react';
import { Swiper, Toast } from 'antd-mobile';
import styles from './index.module.scss';
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac'];
const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className={styles.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`);
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
));
export default () => {
  // const ref = useRef(null);
  return (
    <>
      <Swiper autoplay loop>{items}</Swiper>
      {/* <DemoBlock title="基础用法">
        <Swiper>{items}</Swiper>
      </DemoBlock> */}

      {/* <DemoBlock title="自动播放">
        <Swiper autoplay>{items}</Swiper>
      </DemoBlock>

      <DemoBlock title="循环">
        <Swiper loop>{items}</Swiper>
      </DemoBlock>

      <DemoBlock title="手动控制">
        <Space direction="vertical" block>
          <Swiper allowTouchMove={false} ref={ref} loop>
            {items}
          </Swiper>
          <Space>
            <Button
              onClick={() => {
                var _a;
                (_a = ref.current) === null || _a === void 0
                  ? void 0
                  : _a.swipePrev();
              }}
            >
              上一张
            </Button>
            <Button
              onClick={() => {
                var _a;
                (_a = ref.current) === null || _a === void 0
                  ? void 0
                  : _a.swipeNext();
              }}
            >
              下一张
            </Button>
          </Space>
          <DemoDescription content="在禁用手势拖拽后，可以通过 Ref 进行手动翻页" />
        </Space>
      </DemoBlock>

      <DemoBlock title="自定义样式">
        <Space direction="vertical" block>
          <Swiper
            style={{
              '--border-radius': '8px',
            }}
            defaultIndex={3}
          >
            {items}
          </Swiper>
          <DemoDescription content="通过 CSS 变量可以控制整体的圆角等样式" />
        </Space>
      </DemoBlock> */}
    </>
  );
};
