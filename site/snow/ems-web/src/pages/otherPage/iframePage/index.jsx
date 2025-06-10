import Loading from '@c/loading';
import { getParamsByUrl } from '@u/tools';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Index() {
  const ref = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [src, setSrc] = React.useState('');
  const [title, setTitle] = React.useState('');
  const location = useLocation();

  useEffect(() => {
    const { title, url } = getParamsByUrl();
    const userName = JSON.parse(sessionStorage.getItem('ems-current-info') || '{}').userName;
    const ulrLink = decodeURIComponent(url);
    setSrc(`${ulrLink}${ulrLink.indexOf('?') > -1 ? '&' : '?'}SSOUserName=${userName}`);
    setTitle(decodeURIComponent(title));
    setLoading(true);
  }, [location.search]);

  const handleLoad = () => {
    console.log('iframe加载完成');
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div
        className="bg-white px-10 py-4 text-xl leading-8 font-semibold mb-4"
        style={{
          boxShadow:
            'rgba(0, 0, 0, 0.03) 0px 1px 2px 0px, rgba(0, 0, 0, 0.02) 0px 1px 6px -1px, rgba(0, 0, 0, 0.02) 0px 2px 4px 0px',
        }}
      >
        {title}
      </div>
      <div className="flex-1 px-4 pb-4" key={src}>
        <Loading wrapperClassName="h-full flex flex-col" spinning={loading}>
          <iframe ref={ref} src={src} width="100%" height="100%" onLoad={handleLoad}></iframe>
        </Loading>
      </div>
    </div>
  );
}
