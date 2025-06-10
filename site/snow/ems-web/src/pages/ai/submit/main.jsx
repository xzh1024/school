import SvgIcon from '@c/svgIcon';
import { Button, Divider } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';
import React from 'react';
import eb_svga from 'public/svg/eb.svga';
import useStores from '@s';
import ImgList from './ImgList';
import InvoiceError from './invoiceError';
import InvoiceSuccess from './invoiceSuccess';
import Message from './message';
import ProcessList from './processList';
import PublicVehicle from './publicVehicle';
import BusinessTrip from './businessTrip';
import NonCanteenDining from './nonCanteenDining';
import NonCanteenDiningProhibit from './nonCanteenDiningProhibit';
import ScrollPage from './scrollPage';
import SvgaEl from './svgaEl';
import { marked } from 'marked';

// 创建自定义渲染器
class CustomRenderer extends marked.Renderer {
  link(href, title, text) {
    // 调用父类的方法来正常渲染链接
    const link = super.link(href, title, text);
    // 添加target属性
    return link.replace('<a', '<a target="_blank"');
  }
}
const renderer = new CustomRenderer();

marked.setOptions({
  renderer: renderer,
  // highlight: function (code) {
  //   return hljs.highlightAuto(code).value
  // },
  gfm: true, // 允许 Git Hub标准的markdown.
  pedantic: true, // 不纠正原始模型任何的不良行为和错误（默认为false）
  sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  tables: true, // 允许支持表格语法（该选项要求 gfm 为true）
  breaks: false, // 允许回车换行（该选项要求 gfm 为true）
  smartLists: true, // 使用比原生markdown更时髦的列表
  smartypants: false, // 使用更为时髦的标点
});

function Index() {
  const { aiSubmit } = useStores();
  const ref = React.useRef(null);
  const inputRef = React.useRef(null);
  // const [inputContent, setInputContent] = React.useState('');
  const [showTongXun, setShowTongXun] = React.useState(false);
  const [showShiQian, setShowShiQian] = React.useState(false);
  let { contentList, initData, historyList, toggleScroll, inputVisible } = aiSubmit;

  // 可视区域滚动到最底部
  const scrollToBottom = () => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
      }, 30);
    }
  };

  React.useEffect(() => {
    const { categoryInfos = [] } = initData;
    categoryInfos.forEach(item => {
      if (item.categoryCode === '2003015') {
        setShowTongXun(true);
      }
      if (item.categoryCode === '1000') {
        setShowShiQian(true);
      }
    });
  }, [initData]);

  React.useEffect(() => {
    scrollToBottom();
  }, [contentList, toggleScroll]);
  // }, [contentList, historyList, toggleScroll]);

  React.useEffect(() => {
    if (aiSubmit.page.num === 1) {
      scrollToBottom();
    } else {
      if (aiSubmit.lastId) {
        setTimeout(() => {
          const el = document.getElementById(`ai-history-${aiSubmit.lastId}`);
          if (el) {
            ref.current.scrollTop = el.offsetTop;
          }
        }, 30);
      }
    }
  }, [historyList]);

  React.useEffect(() => {
    // if (!aiSession) {
    // get_ai_sessioned();
    // }
    // setInputContent('移动通讯费');
    // inputRef.current.value = '移动通讯费';
  }, []);

  // const handleInput = e => {
  //   setInputContent(e.target.value);
  // };

  const handleSendCategory = value => {
    aiSubmit.aiChat(value);
  };

  const handleSend = () => {
    const value = (inputRef.current.value || '').trim();
    inputRef.current.value = '';
    // 发送消息
    if (!value) {
      return;
    }
    aiSubmit.aiChat(value);
  };

  const getDomList = (list, isHistory = false) => {
    return list.map((item, index) => {
      return (
        <div key={(isHistory ? 'history_' : '_') + index}>
          {/**  问  **/}
          {item.question && item.question !== '_notRender' ? (
            <Message {...item} isQuest={true} content={item.question} />
          ) : null}
          {/**  上传的文件  **/}
          {item.fileList && item.fileList.length ? (
            <Message {...item} content={<ImgList {...item} />} fullWidth isQuest={true} />
          ) : null}
          {/**  答  **/}
          {item.answer &&
          (!item.answerContentType ||
            item.answerContentType === 'text' ||
            item.answerContentType === 'application/json') ? (
            // <Message {...item} content={item.answer} />
            <Message
              {...item}
              content={
                <div
                  className="ai-text-markdown"
                  dangerouslySetInnerHTML={{
                    __html: marked(item.answer),
                  }}
                ></div>
              }
            />
          ) : null}
          {/**  空加载  **/}
          {!(
            item.answer &&
            (!item.answerContentType ||
              item.answerContentType === 'text' ||
              item.answerContentType === 'application/json')
          ) && item.loading ? (
            <Message {...item} />
          ) : null}
          {/**  发票上传  **/}
          {item.answerContentType === 'templateType_reimburseDetail' && item.showUpload ? (
            <Message {...item} content={item.answer} fullWidth />
          ) : null}
          {/**  发票识别或校验异常  **/}
          {item.answerContentType === 'templateType_reimburseDetail' &&
          item.errorBillList &&
          item.errorBillList.length ? (
            <Message {...item} content={<InvoiceError {...item}></InvoiceError>} fullWidth />
          ) : null}
          {item.answerContentType === 'templateType_reimburseDetail' &&
          item.successBillList &&
          item.successBillList.length ? (
            <Message
              {...item}
              content={
                /** <InvoiceSuccess {...item}></InvoiceSuccess> **/
                <InvoiceSuccess
                  {...item}
                  answer={{
                    ...JSON.parse(item.answer),
                    answerContentType: item.answerContentType,
                    successBillList: item.successBillList,
                  }}
                ></InvoiceSuccess>
              }
              fullWidth
            />
          ) : null}

          {/* 卡片化展示进程 */}
          {/** item.answerContentType === 'templateType_processCard' && item.answer?.question && isHistory && (
            <Message {...item} isQuest={true} content={item.answer?.question} fullWidth={false} />
          )  **/}
          {item.answerContentType === 'templateType_processCard' && (
            <Message
              {...item}
              content={
                /**  发票重复报销、帐期重复报销、报销成功  **/
                <ProcessList
                  isHistory={isHistory}
                  list={item.answer?.processList}
                  answer={item.answer}
                  slot={
                    ['templateType_billRepeat', 'templateType_periodRepeat', 'templateType_reimburseSuccess'].includes(
                      item.answer?.answerContentType,
                    ) ? (
                      <InvoiceSuccess {...item}></InvoiceSuccess>
                    ) : (
                      ''
                    )
                  }
                ></ProcessList>
              }
              fullWidth={false}
            />
          )}
          {/* 事前申请-公出用车 */}
          {item.answerContentType === 'templateType_publicVehicle' && <PublicVehicle item={item}></PublicVehicle>}
          {/* 事前申请-出差商旅 */}
          {item.answerContentType === 'templateType_businessTrip' && <BusinessTrip item={item}></BusinessTrip>}
          {/* 事前申请-非食堂用餐 */}
          {item.answerContentType === 'templateType_nonCanteenDining' && (
            <NonCanteenDining item={item} isHistory={isHistory}></NonCanteenDining>
          )}
          {/* 事前申请-非食堂用餐-提报询问 */}
          {item.showNonCanteenDiningButton && (
            <Message
              {...item}
              content={
                <NonCanteenDiningProhibit type={1} item={item} isHistory={isHistory} isDisabled={item.isDisabled} />
              }
            ></Message>
          )}
        </div>
      );
    });
  };
  const handleKeyDown = event => {
    // 监听回车键
    if (event.key === 'Enter') {
      handleSend();
      event.preventDefault();
    }
  };

  return (
    <div className="px-[200px] py-[60px] h-full w-full">
      <div className="h-full flex flex-col w-full">
        <div className="flex-1 w-full overflow-hidden">
          <ScrollPage ref={ref}>
            {contentList.length + historyList.length === 0 && !aiSubmit.page.loading ? (
              <div className="w-full h-full flex flex-col">
                {aiSubmit.page.moreHint ? (
                  <Divider>
                    <span className="text-[#999999] text-xs">下拉查看历史对话</span>
                  </Divider>
                ) : (
                  ''
                )}
                <div className="w-full flex-1 flex items-center pl-6">
                  <div className="flex items-center">
                    <SvgaEl elid="voiceSvga" svgaImg={eb_svga} width={'145px'} height={'180px'} loop={1} />
                    <div className="flex flex-col pl-4">
                      <p className="mb-[6px] font-medium text-[24px] text-[#1A1C27] leading-normal">
                        您好！我是您的财务小助手雪宝。
                      </p>
                      <p className="font-medium text-[24px] text-[#1A1C27] leading-normal">
                        聊天、报销都可以找全能的雪宝哦~
                      </p>
                      <div className="flex items-center text-[14px] pt-8">
                        {showTongXun && (
                          <div
                            className="w-[240px] mr-[20px] cursor-pointer flex items-center px-4 py-2 rounded-lg border-[#9EA5BB] border border-solid"
                            onClick={() => handleSendCategory('移动通讯费报销')}
                          >
                            <SvgIcon name="tongxunfei"></SvgIcon>
                            <div className="pl-[2px]">移动通讯费报销</div>
                          </div>
                        )}
                        {showShiQian && (
                          <div
                            className="w-[240px] flex cursor-pointer items-center px-4 py-2 rounded-lg border-[#9EA5BB] border border-solid"
                            onClick={() => handleSendCategory('事前申请')}
                          >
                            <SvgIcon name="shiqianshenqing"></SvgIcon>
                            <div className="pl-[2px]">事前申请</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div
                    className="rounded-[32px] px-[43px] py-[27px] h-[280px] w-[308px] relative"
                    style={{
                      background: 'linear-gradient(180deg, #F6FAFF 35%, #DFECFF 100%)',
                      boxShadow: '0px 0px 16px 0px rgba(255, 255, 255, 0.4)',
                    }}
                  >
                    <div className="text-center relative w-full top-[-80px]">
                      <SvgaEl elid="voiceSvga" svgaImg={eb_svga} width={'145px'} height={'180px'} loop={1} />
                    </div>
                    <div className="text-center relative top-[-80px] leading-[22px]">
                      <p className="mb-[6px] font-medium text-[17px] text-[#0B0D0F] leading-6">
                        {initData.userDesc}，您好！
                        <br />
                        我是您的财务小助手雪宝。
                      </p>
                      <p className="text-sm font-normal text-[#576675] leading-[22px]">
                        聊天、报销都可以找全能的雪宝哦~
                      </p>
                      <p className="text-sm font-normal text-[#576675] leading-[22px]">您可以说：报销移动通讯费。</p>
                      <p className="text-sm font-normal text-[#576675] leading-[22px]">快来试试看！</p>
                    </div>
                  </div> */}
                </div>
              </div>
            ) : (
              <React.Fragment>
                {getDomList(historyList, true)}
                {historyList.length > 0 && (
                  <Divider>
                    {/* <span className="text-[#576675] text-xs">以上为历史对话</span> */}
                    <span className="text-[#999999] text-xs">{moment().format('MM-DD HH:mm')}</span>
                  </Divider>
                )}
                {getDomList(contentList)}
              </React.Fragment>
            )}
          </ScrollPage>
          {/* <Message type="0" content={<Invoice></Invoice>} fullWidth/> */}
        </div>
        <div className={`bg-transparent w-full mt-5 ${inputVisible ? 'block' : 'hidden'} `}>
          <div className="bg-white rounded-2xl w-full flex flex-col p-4 border border-solid border-[#D3D9E6] h-[140px]">
            <textarea
              className="w-full flex-1 border-none outline-none p-0 m-0 shadow-none text-lg font-normal placeholder:text-[#C7CBD4] placeholder:text-lg text-[#0B0D0F]"
              ref={inputRef}
              placeholder="请在此输入您的提问"
              onKeyDown={handleKeyDown}
              style={{
                resize: 'none',
              }}
            />
            <div className="w-full flex justify-end">
              <Button
                className="flex items-center px-[10px] rounded-lg bg-[#2C68FF] text-[#fff]"
                icon={<SvgIcon name="send" className="w-4 h-4" />}
                onClick={handleSend}
              >
                发送
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Index);
