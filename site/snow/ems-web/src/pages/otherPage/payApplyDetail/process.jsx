import { Steps } from 'antd';
import React from 'react';
const description = 'This is a description.';
const App = () => (
  <Steps
    current={100}
    className="py-4"
    items={[
      {
        title: '经办人',
        subTitle: '[王小军]',
      },
      {
        title: '共享支持专员',
      },
      {
        title: '共享中心初审池 ',
      },
      {
        title: '共享初审岗',
      },
      {
        title: '导入ERP',
      },
      {
        title: '流程结束',
      },
    ]}
  />
);
export default App;
