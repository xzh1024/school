import React from 'react';
import styles from './PositionLayout.less';

const Layout: React.FC = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export default Layout;
