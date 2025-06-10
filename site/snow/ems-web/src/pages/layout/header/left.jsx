import Icon from '@c/svgIcon';
import { observer } from 'mobx-react';
import React from 'react';
import useStores from '../../../store';


// hideAction 为true 只展示左侧啤酒图标
function Index({ hideAction }) {
  const { layout } = useStores();

  return (
    <div className="flex items-center">
      {/* Index
      <span className="pl-5 text-main-blue-2">123333</span>
      <Icon name="menu-2" className="text-blue hover:text-red" colorful></Icon> */}
      <Icon name={`system-log-${process.env.REACT_APP_ENV === 'prod' ? 'prod' : 'uat'}`}></Icon>
    </div>
  );
}

export default observer(Index);
