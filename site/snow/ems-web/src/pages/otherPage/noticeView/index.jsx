import { getNoticeById, noticeAttachDownload } from '@api/dashboard';
import Loading from '@c/loading';
import { getParamsByUrl } from '@u/tools';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Header from '../../layout/header';
export default function Index() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const noticeId = getParamsByUrl('noticeId');
    if (noticeId) {
      setLoading(true);
      getNoticeById(noticeId)
        .then(res => {
          setData(res.data);
        })
        .catch(() => {
          window.$message.error('获取公告失败，请重试.....');
        })
        .finally(() => setLoading(false));
    } else {
      window.$message.error('未获取到公告ID,请重试.....');
    }
  }, []);

  const download = item => {
    noticeAttachDownload(item).then(res => {
      window.open(res.data);
    });
  };
  return (
    <Loading spinning={loading}>
      <div className="bg-[#F7F5F4] h-screen w-screen flex flex-col items-center">
        <Header hideAction></Header>
        <div className="min-w-[50%] max-w-[65%] h-full overflow-y-scroll bg-white p-8 flex flex-col no-scrollbar">
          <div className="text-xl text-[#333333] font-bold text-center">{data.noticeVo?.noticeTitle}</div>
          <div className="text-center font-normal text-xs text-[#999999] mt-8 border-dotted border-t-2 border-b-2 py-2 border-[#f1f1f1]">
            <span className="mr-6">作者：{data.noticeVo?.noticeAuthor}</span>
            <span>
              发布日期：
              {data.noticeVo?.noticePublishDate ? dayjs(data.noticeVo?.noticePublishDate).format('YYYY-MM-DD') : '----'}
            </span>
          </div>

          <div
            className="mt-8 flex-1 overflow-scroll no-scrollbar"
            dangerouslySetInnerHTML={{
              __html: data.noticeVo?.noticeContent || '',
            }}
          ></div>

          {(data.noticeAttachList || []).length > 0 && (
            <div className="">
              <div className="text-sm text-[#666666] font-normal mt-8">相关附件：</div>
              {(data.noticeAttachList || []).map(item => {
                return (
                  <div className="mt-2 pl-4 text-sm " key={item.attachId}>
                    <span className="cursor-pointer hover:text-[#1890ff]" onClick={() => download(item)}>
                      {item.fileName}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Loading>
  );
}
