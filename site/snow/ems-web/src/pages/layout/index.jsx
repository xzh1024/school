import Loading from '@c/loading';
import { Flex, Layout } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import useStores from '../../store/index.jsx';
import Head from './header';
import Main from './main';
import Menu from './menu.jsx';
const { Header, Sider, Content } = Layout;
let time = null;

function Index() {
  const navigate = useNavigate();
  const { globalStore, configStore, layout } = useStores();
  const { loading, menuList, hideMenu } = layout;
  const [scrollTop, setScrollTop] = React.useState(0);

  const handleScroll = e => {
    setScrollTop(e.target.scrollTop);
  };

  const handleJumpToAi = (down = false) => {
    if (down) {
      time = new Date().getTime();
      return;
    }

    const times = new Date().getTime() - time;
    if (times < 200) {
      window.open('/ems-web/ai-submit');
    }
  };

  return (
    <Flex gap="middle" wrap="wrap" className="w-screen h-screen overflow-hidden relative">
      <Loading spinning={loading} wrapperClassName="w-full h-full">
        <Layout>
          <Header className="h-[56px] p-0 relative z-50">
            <Head />
          </Header>
          <Layout className=" h-full overflow-hidden box-border">
            {!hideMenu && (
              <Sider width="232px" className="bg-white border-r-[1px] ">
                <Menu />
              </Sider>
            )}
            <Content
              className="bg-[#F0F4F4] overflow-scroll"
              onScroll={handleScroll}
              style={{
                height: 'calc(100vh - 64px)',
              }}
            >
              <Main />
            </Content>
          </Layout>
        </Layout>
        {menuList.map(item => item.newEmsPath).includes('/ai-submit') && (
          <Draggable>
            <div className="fixed left-8 bottom-1 z-50 cursor-pointer">
              <img
                onMouseDown={() => handleJumpToAi(true)}
                onMouseUp={() => handleJumpToAi()}
                draggable={false}
                src={
                  (['uat', 'prod'].includes(process.env.REACT_APP_ENV || '') ? '/ems-web' : '') +
                  '/images/ai/img_ai.gif'
                }
                width={160}
              ></img>
            </div>
          </Draggable>
        )}
      </Loading>
    </Flex>
  );
}

export default observer(Index);
