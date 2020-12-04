import React from 'react';
import styles from './index.less';
import TableBasic from './TableBasic';

export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <TableBasic />
    </div>
  );
};
