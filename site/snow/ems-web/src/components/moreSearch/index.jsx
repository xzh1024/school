import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';

export default function Index({ children, showMore, toggle }) {
  const ref = React.createRef(null);
  const [style, setStyle] = useState({ maxHeight: '36px' });
  const [showMoreSearch, setShowMoreSearch] = useState(!!showMore);

  const toggleSearch = () => {
    const data = { maxHeight: '36px' };
    if (!showMoreSearch && ref.current) {
      data.maxHeight = ref.current.clientHeight + 36 + 'px';
    }
    setStyle(data);
    if (showMoreSearch) {
      setTimeout(() => {
        setShowMoreSearch(!showMoreSearch);
        toggle && toggle(!showMoreSearch);
      }, 290);
      return;
    }
    setShowMoreSearch(!showMoreSearch);
    toggle && toggle(!showMoreSearch);
  };

  return (
    <div className="bg-white mb-4 relative p-6 pb-8 w-full box-border">
      <div className="absolute bottom-0 left-1/2 z-50">
        <Button
          type="link"
          icon={showMoreSearch ? <CaretUpFilled /> : <CaretDownFilled />}
          onClick={toggleSearch}
          style={{
            padding: '0 0 0 0',
          }}
        >
          {showMoreSearch ? '收起更多' : '展开更多'}
        </Button>
      </div>
      <div className="show-more-search" style={style}>
        <div ref={ref}>{children}</div>
      </div>
    </div>
  );
}
