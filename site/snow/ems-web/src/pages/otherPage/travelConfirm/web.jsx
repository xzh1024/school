import { Layout } from 'antd';
import Table from './table';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const { Content, Footer, Header } = Layout;

export default function Web() {
  const [title, setTitle] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    
    const title = searchParams.get('title');
    if (decodeURIComponent(title)) {
      setTitle(decodeURIComponent(title));
    }
  }, []);

  return (
    <Layout className="travel-confirm-container-web">
      <Header className="travel-confirm-container-web-header">
        <div className="web-header-container">
          <div className="web-header-container-logo"></div>
          <div className="web-header-container-title">{title}</div>
        </div>
      </Header>
      <Content className="travel-confirm-container-web-content">
        <Table date={title ? title.slice(0, 6) : ''}/>
      </Content>
    </Layout>
  );
}
