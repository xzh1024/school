import { getAItoken, getAiSession, getInitInfo, getProjectOptions } from '@api/ai';
import SvgIcon from '@c/svgIcon';
import { getEcsbAppToken } from '@u/request';
import { Image, Popover, Modal, Drawer } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import useStores from '@s';
import Main from './main';
import { ExclamationCircleFilled, RightOutlined, CloseOutlined } from '@ant-design/icons';
import PDF from '../../../components/pdfView/index';
import { ReactComponent as IconPdf } from 'public/svg/icon_pdf.svg';
import { ReactComponent as IconVideo } from 'public/svg/icon_video.svg';

function Index() {
  const { aiSubmit } = useStores();
  const [pdfData, setPdfData] = useState({
    visible: false,
    url: '',
  });
  const [videoData, setVideoData] = useState({
    visible: false,
    url: '',
  });

  const get_ai_sessioned = async () => {
    const { data } = await getAItoken();
    sessionStorage.setItem('AI_TOKEN', data);
    const { data: data1 } = await getAiSession(data.data);
    sessionStorage.setItem('aiSession', data1);
    aiSubmit.aiSession = data1;
  };

  const init = async () => {
    await getEcsbAppToken();
    await get_ai_sessioned();
    aiSubmit.getAiVideoUrl();

    aiSubmit.initCos();

    const res = await getInitInfo();
    // aiSubmit.initData = res.data;
    const data = res.data || {};
    const categoryInfos = data.categoryInfos || [];
    categoryInfos.forEach(category => {
      switch (category.categoryCode) {
        // 移动通讯费（新）- 2003015
        case '2003015': {
          if (category.categoryStandards && category.categoryStandards.length) {
            // 过滤标准为0的数据
            const categoryStandards = category.categoryStandards.filter(item => item.standardAmount);
            category.categoryStandards = categoryStandards;
            if (categoryStandards.length && category.isAiEnabled === 'Y') {
              aiSubmit.authData.is2003015 = true;
            }
          }
          break;
        }
        // 事前申请（虚拟）
        case '1000': {
          if (category.isAiEnabled === 'Y') {
            aiSubmit.authData.is1000 = true;
            const childCategoryInfos = category.childCategoryInfos || [];
            childCategoryInfos.forEach(item => {
              if (item.isAiEnabled === 'Y') {
                switch (item.categoryCode) {
                  // 非食堂用餐
                  case '1002': {
                    aiSubmit.authData.is1002 = true;
                    break;
                  }
                  // 出差商旅
                  case '1008': {
                    aiSubmit.authData.is1008 = true;
                    break;
                  }
                  // 公出用车
                  case '1010': {
                    aiSubmit.authData.is1010 = true;
                    break;
                  }
                  // 其他公出事前申请-探亲
                  case '1012': {
                    aiSubmit.authData.is1012 = true;
                    break;
                  }
                  // 辖区内走访事前申请
                  case '1013': {
                    aiSubmit.authData.is1013 = true;
                    break;
                  }
                  default: {
                    break;
                  }
                }
              }
            });
          }
          break;
        }
        default: {
          break;
        }
      }
    });
    aiSubmit.initData = data;
    aiSubmit.getSessionHistoryPage(true);
    initProject(data.companyCode, data.userCode);
    aiSubmit.getMyProjectList({
      ouCode: data.companyCode,
      empCode: data.userCode,
    }); // 查询用户的项目
    aiSubmit.getUserVisitData(); // 获取用户拜访信息
    aiSubmit.getMyMeetingList(); // 获取用户的会议列表
    aiSubmit.getCustomerTypeList(); // 获取业务小类列表
    aiSubmit.getEntertainmentList(); // 获取招待对象列表
  };

  const initProject = (companyCode, userCode) => {
    return getProjectOptions({
      pageIndex: 1,
      pageSize: 999,
      searchKey: '',
      ouCode: companyCode,
      empCode: userCode,
    }).then(res => {
      if (res.code === 200) {
        const data = res.data.records || [];
        aiSubmit.initProjectOptions = data;
      }
      return res;
    });
  };

  const handleGuideItem = item => {
    switch (item.fileType) {
      case 'pdf': {
        setPdfData({
          url: item.url,
          visible: true,
        });
        break;
      }
      case 'video': {
        // selectVideoGuideUrl.current = item.url;
        // setVideoPlayVisible(true);
        setVideoData({
          url: item.url,
          visible: true,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  const onDrawerClose = () => {
    setPdfData({
      visible: false,
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className="w-screen h-screen flex items-center"
      style={{
        background: 'linear-gradient(180deg, rgba(236, 240, 251, 0.6) 0%, rgba(207, 228, 252, 0.6) 56%)',
      }}
    >
      <div className="w-[6%] min-w-[88px] bg-transparent h-full flex flex-col items-center shadow-sm bg-white">
        <div className="flex-1 w-full">
          <div className="py-6 w-full text-center">
            <SvgIcon
              name="eb"
              style={{
                width: '64px',
              }}
            />
            <div className="py-2 text-center font-medium text-[16px] text-[#5A6074]">雪宝</div>
          </div>
          <div className="py-6 bg-[#E9EFFF] w-full text-center ai-select">
            <SvgIcon
              name="talk"
              style={{
                width: '24px',
                fill: '#5A6074',
              }}
            />
            <div className="font-semibold text-[14px] leading-[22px] text-[#2C68FF]">对话</div>
          </div>
        </div>
        <div className="py-6 w-full text-center cursor-pointer">
          <Popover
            placement="rightTop"
            title={''}
            content={
              <div className="w-[240px] overflow-hidden">
                {aiSubmit.aiVideoUrlList.map((item, index) => (
                  <div
                    key={index}
                    className="display flex items-center cursor-pointer leading-[30px]"
                    onClick={() => handleGuideItem(item)}
                  >
                    {item.fileType === 'video' ? <IconVideo className="w-6" /> : ''}
                    {item.fileType === 'pdf' ? <IconPdf className="w-6" /> : ''}
                    <div className="flex-1 text-[#707B8C] overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.fileName}
                    </div>
                    <RightOutlined
                      className="flex-none"
                      style={{
                        marginLeft: '8px',
                        fontSize: '14px',
                        color: '#707B8C',
                      }}
                    />
                  </div>
                ))}
              </div>
            }
          >
            <ExclamationCircleFilled
              style={{
                fontSize: '32px',
                color: '#0074FF',
              }}
            />
            <div className="font-normal text-[14px] leading-[22px] pt-2 text-[#0074FF]">操作指引</div>
          </Popover>
        </div>
        <div className="py-6 w-full text-center">
          <Image
            className="w-12 he-12 rounded-[50%]"
            src="/ReimbursePlatform/resources/styles/claim/images/male.png"
            preview={false}
          />
          <div className="font-normal text-[14px] leading-[22px] pt-2">{aiSubmit.initData.userDesc}</div>
        </div>
      </div>
      <div className="flex-1 h-full w-full">
        <Main />
      </div>

      <Modal
        open={videoData.url}
        width={800}
        footer={''}
        maskClosable={false}
        destroyOnClose={true}
        classNames={{
          content: ['bg-transparent', 'shadow-none'],
        }}
        closeIcon={<CloseOutlined className="text-[#ffffff]" />}
        onCancel={() =>
          setVideoData({
            visible: false,
          })
        }
      >
        <video width="96%" controls>
          <source src={videoData.url} type="video/mp4" />
          <source src={videoData.url} type="video/ogg" />
          您的浏览器不支持 video 标签。
        </video>
      </Modal>

      <Drawer title="预览" placement={'right'} width={500} onClose={onDrawerClose} open={pdfData.visible}>
        {pdfData.visible ? <PDF fileName={pdfData.url} /> : ''}
      </Drawer>
    </div>
  );
}

export default observer(Index);
