import { useState } from 'react';
import Comingsoon from './Comingsoon';
import Nowplaying from './Nowplaying';
import './index.less';

export default function Cinema() {
  const [type, setType] = useState(0);
  const [tabs, setTabs] = useState(['正在热映', '即将上映']);
  return (
    <div>
      <div style={{ height: '200px', background: 'yellow' }}>大轮播</div>
      <div className="tabs">
        {tabs.map((item, index) => (
          <div
            key={index}
            className={index === type ? 'tab-item active' : 'tab-item'}
            onClick={() => setType(index)}
          >
            {item}
          </div>
        ))}
      </div>
      {type === 0 ? <Nowplaying /> : <Comingsoon />}
    </div>
  );
}
