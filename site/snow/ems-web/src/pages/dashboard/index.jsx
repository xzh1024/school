import { RollbackOutlined } from '@ant-design/icons';
import { getAnnouncement, getCustomMenu, getNum } from '@api/dashboard';
import { jumpOutLink } from '@api/layout';
import PermissionCom from '@c/permissionCom';
import Icon from '@c/svgIcon';
import { Badge, Divider } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStores from '../../store';
import Announcement from './announcement';
import MoreNotice from './moreNotice';

import FeedBackCom from '@/pages/feedback';

import PersonalStandard from './personalStandard';

function Index() {
  const navigate = useNavigate();
  const [num, setNum] = useState({});
  const { globalStore, layout } = useStores();
  const { userInfo } = globalStore;
  const { employeeName, employeeSN, positionName } = userInfo;
  const [announcement, setAnnouncement] = useState([]);
  const [showMoreNotice, setShowMoreNotice] = useState(false);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    getActionsList();
  }, []);

  const getActionsList = () => {
    getCustomMenu().then(res => {
      setActions(
        res.data.map(item => ({ ...item, icon: item.icon2 || '', title: item.menuTitle, path: item.newEmsPath })),
      );
    });
  };

  const getIconActions = num => {
    const { toDoSize = 0, qualityToDoSize = 0 } = num;
    return actions.map(item => {
      if (item.title === '我的待处理') {
        item.badgeCount = toDoSize;
        item.useBadge = true;
      }

      if (item.title === '质量代办') {
        item.badgeCount = qualityToDoSize;
        item.useBadge = true;
      }
      return item;
    });
  };

  const openViewPage = noticeId => {
    noticeId && window.open(process.env.REACT_APP_MAIN_HOST + '/view?noticeId=' + noticeId, '_blank');
  };

  const getAnnouncements = () => {
    getAnnouncement({
      noticeType: 1,
    }).then(res => {
      setAnnouncement(res.data || []);
    });
  };

  useEffect(() => {
    getAmount();
    getAnnouncements();
    document.title = `财务报账系统-首页`;
  }, []);

  // 获取代办数量
  const getAmount = () => {
    getNum().then(res => {
      setNum(res.data);
    });
  };

  const handleActionClick = item => {
    console.log(item, 13444);
    // 埋点
    window._czc &&
      window._czc.push(['_trackEvent', item.menuTitle, '快捷菜单点击', sessionStorage.getItem('ems-current-info'), 0]);

    if (item.isOutLink === 1) {
      if (item.newEmsPath.startsWith('http://') || item.newEmsPath.startsWith('https://')) {
        window.open(item.newEmsPath, '_blank');
        return;
      }
      layout.loading = true;
      jumpOutLink({
        thirdSystemCode: item.newEmsPath,
      })
        .then(res => {
          window.open(res.data, '_blank');
        })
        .finally(() => {
          layout.loading = false;
        });
      return;
    }

    const title = item.menuTitle;
    document.title = `财务报账系统-${title}`;
    if (item.isOutLink === 2) {
      // 内嵌链接
      const title = item.menuTitle;
      const url = item.path;

      navigate(`/iframe-page?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
      return;
    }

    if (item.path) {
      navigate(item.path);

      return;
    }
  };

  return (
    <div className="relative z-0 w-full">
      <Icon name="dashboard" className="w-full absolute z-[1] left-0 top-0"></Icon>
      <div className="relative z-10 pt-5 px-[23px]">
        {/* 首页header用户信息 */}
        <div className="flex items-center justify-between mb-9">
          <div className="flex items-center text-sm font-normal text-[#707B8C]">
            <span className="flex items-center">
              <Icon name="dashboard-user" className="w-4 pr-1"></Icon>
              当前用户：<span className="text-[#333333]">{employeeName || '---'}</span>
            </span>
            <Divider type="vertical" className="mx-5"></Divider>
            <span className="flex items-center">
              <Icon name="dashboard-empno" className="w-4 pr-1"></Icon>
              工号：<span className="text-[#333333]">{employeeSN || '---'}</span>
            </span>
            <Divider type="vertical" className="mx-5"></Divider>
            <span className="flex items-center">
              <Icon name="dashboard-job" className="w-4 pr-1"></Icon>
              岗位：<span className="text-[#333333]">{positionName || '---'}</span>
            </span>
            <div className="flex px-1 items-center cursor-pointer text-xs font-normal text-[#2C68FF] leading-5 rounded-[3px] border-[#1A8CFF] border-[1px] border-solid ml-4">
              <RollbackOutlined />
              <span className="ml-1" onClick={() => window.open(window.location.origin)}>
                返回旧版
              </span>
            </div>
          </div>

          <PermissionCom type="menu" value="ems-admin">
            <div className="flex px-1 items-center cursor-pointer text-xs font-normal text-[#2C68FF] leading-5 rounded-[3px] border-[#1A8CFF] border-[1px] border-solid">
              <span className="mr-1" onClick={() => window.open('/ems-web/ems-admin')}>
                进入配置管理系统
              </span>{' '}
              <Icon name="arrow-right"></Icon>
            </div>
          </PermissionCom>
        </div>

        {/* 最新动态 */}
        {/* <div className="bg-[#2C68FF]/10 rounded-[4px] flex items-center justify-between py-2 mb-5 pl-7 pr-1 text-sm font-medium text-[#2C68FF] leading-5">
          <Row align={'middle'} className="flex-1">
            <Col flex="none">
              <div className="flex items-center">
                <Icon name="ring-icon" className="mr-1"></Icon>
                <span>最新动态：</span>
              </div>
            </Col>

            <Col span={20}>
              <Carousel autoplay dotPosition="left" dots={false} className="h-6 flex-1">
                {announcement.map(item => {
                  return (
                    <div
                      key={item.noticeId}
                      className="flex-1 text-[#333333] font-normal cursor-pointer hover:text-[#2C68FF]"
                    >
                      <span className="mr-5" onClick={() => openViewPage(item.noticeId)}>
                        {item.noticeTitle}
                      </span>
                      <span className="text-[#666666] text-xs">
                        {dayjs(item.noticePublishDate).format('YYYY-MM-DD HH:mm:ss')}
                      </span>
                    </div>
                  );
                })}
              </Carousel>
            </Col>
          </Row>
          <div className="flex items-center text-xs font-normal cursor-pointer">
            <span onClick={() => setShowMoreNotice(true)}>查看更多</span>
            <Icon name="arrow-right"></Icon>
          </div>
        </div> */}

        {/* 8个操作模块 */}
        <div className="grid grid-cols-4 gap-5 mb-6 ">
          {getIconActions(num).map((item, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg flex items-center pl-5 py-3 cursor-pointer"
                style={{
                  boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.06),inset 0px 0px 3px 2px #FFFFFF',
                }}
                onClick={() => handleActionClick(item)}
              >
                {item.useBadge ? (
                  <Badge count={item.badgeCount}>
                    <Icon name={item.icon} className="w-10"></Icon>
                  </Badge>
                ) : (
                  <Icon name={item.icon} className="w-10"></Icon>
                )}
                <div className="ml-2 text-sm leading-[22px] font-semibold">{item.title}</div>
              </div>
            );
          })}
        </div>
        {/* 个人标准 */}
        <PersonalStandard></PersonalStandard>

        <Announcement showMore={() => setShowMoreNotice(true)}></Announcement>
        {showMoreNotice && <MoreNotice onCancel={() => setShowMoreNotice(false)}></MoreNotice>}
      </div>
      <FeedBackCom />
    </div>
  );
}

export default observer(Index);
