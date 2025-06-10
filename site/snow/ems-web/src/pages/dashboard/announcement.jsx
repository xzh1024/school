import { getMoreNotice } from '@api/dashboard';
import Icon from '@c/svgIcon';
import { Empty, Skeleton, Timeline } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

const Dot = () => {
  return <div className="rounded-[50%] w-[10px] h-[10px] bg-[#BFD1FF]"></div>;
};

const AnnouncementItem = ({ time, title, id }) => {
  const openViewPage = noticeId => {
    noticeId && window.open(process.env.REACT_APP_MAIN_HOST + '/view?noticeId=' + noticeId, '_blank');
  };
  return (
    <div
      className="flex items-center justify-between bg-[#F7F8FA] p-2 rounded-lg cursor-pointer"
      onClick={() => openViewPage(id)}
    >
      <div className="flex items-center text-sm font-normal leading-[22px]">
        <Icon name="time" className="w-4 mr-2"></Icon>
        <div className="text-[#999999] mr-5 min-w-[150px]">{time}</div>
        <div className="text-[#1A1C27]">{title}</div>
      </div>
      <Icon name="arrow-right"></Icon>
    </div>
  );
};

export default function Index({ showMore }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setLoading(true);
    getMoreNotice({
      pageIndex: 1,
      pageSize: 10,
    })
      .then(res => {
        setData(
          (res.data.records || []).map(item => {
            return {
              dot: <Dot />,
              children: (
                <AnnouncementItem
                  time={dayjs(item.noticePublishDate).format('YYYY-MM-DD HH:mm:ss')}
                  title={item.noticeTitle}
                  id={item.noticeId}
                ></AnnouncementItem>
              ),
            };
          }),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openViewPage = noticeId => {
    noticeId && window.open('/view?noticeId=' + noticeId, '_blank');
  };

  return (
    <div className="dashboard-container mt-5">
      <div className="flex justify-between items-center text-lg font-semibold leading-[26px]">
        <span>信息公告</span>
        {data.length > 0 && (
          <div className="flex items-center text-xs font-normal cursor-pointer text-[#2C68FF]">
            <span onClick={() => showMore && showMore()}>查看更多</span>
            <Icon name="arrow-right"></Icon>
          </div>
        )}
      </div>

      <Skeleton loading={loading} active>
        <div className="mt-5 dashboard-timeline">
          {data.length === 0 ? (
            <Empty
              image={
                <div className="flex justify-center">
                  <Icon name="empty"></Icon>
                </div>
              }
              imageStyle={{
                marginBottom: '16px',
              }}
              description="暂无信息公告"
            ></Empty>
          ) : (
            <Timeline items={data}></Timeline>
          )}
        </div>
      </Skeleton>
    </div>
  );
}
