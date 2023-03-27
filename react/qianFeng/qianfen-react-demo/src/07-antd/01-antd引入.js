import React from 'react';
import { Button } from 'antd';

export default function App() {
  return (
    <div>
      <Button type="primary">主按钮</Button>
      <Button>次按钮</Button>
      <Button type="ghost">幽灵按钮</Button>
      <Button type="dashed">虚线按钮</Button>
    </div>
  );
}
