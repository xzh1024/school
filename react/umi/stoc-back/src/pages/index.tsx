import React from 'react';
import styles from './index.less';
import { Button } from 'antd';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button type="primary">Button</Button>
    </div>
  );
}
