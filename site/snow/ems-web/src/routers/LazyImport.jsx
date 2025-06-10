import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = ({ to }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, []);
  return null;
};

const LazyImportComponent = props => {
  const { route } = props;

  useEffect(() => {
    const title = props.title || route.meat?.title || route.name || process.env.REACT_APP_DEFAULT_TITLE || '';
    document.title = `财务报账系统-${title}`;
  }, []);

  return (
    <React.Suspense fallback={<Spin />}>
      {route.redirect ? (
        <Redirect to={route.redirect} />
      ) : route.path.includes('/unique') ? (
        <div className="unique-page">
          <props.lazyChildren />
        </div>
      ) : (
        <props.lazyChildren />
      )}
    </React.Suspense>
  );
};

export default LazyImportComponent;
