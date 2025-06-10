import SvgIcon from '@c/svgIcon';
import { Divider } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';
import React, { useEffect } from 'react';
import useStores from '@s';
import Message from './message';
import ScrollPage from './components/scrollPage';
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
  const { aiDriverFare: aiStore } = useStores();
  const ref = React.useRef(null);
  const inputRef = React.useRef(null);
  // const [inputContent, setInputContent] = React.useState('');
  // const [showTongXun, setShowTongXun] = React.useState(false);
  // const [showShiQian, setShowShiQian] = React.useState(false);
  let {
    messageList,
    initData,
    // aiSession,
    historyList,
    // toggleScroll,
    inputVisible,
  } = aiStore;

  // const [inputVisible, setInputVisible] = useState(true);
  // const [historyList, setHistoryList] = useState([]);

  // 可视区域滚动到最底部
  const scrollToBottom = () => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
      }, 30);
    }
  };

  // React.useEffect(() => {
  //   console.log(initData, 1238888);
  // }, [initData]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    if (aiStore.page.num === 1) {
      scrollToBottom();
    } else {
      if (aiStore.lastId) {
        setTimeout(() => {
          const el = document.getElementById(`ai-history-${aiStore.lastId}`);
          if (el) {
            ref.current.scrollTop = el.offsetTop;
          }
        }, 30);
      }
    }
  }, [historyList]);

  const aiChat = value => {
    // setMessageList([...messageList, { question: value, answer: '回答回答' }]);
    aiStore.aiChat(value).then(res => {
      console.log('aiChat--res');
      console.log(res);
      // if (res && res.result) {
      //   aiStore.setMessage({ question: value, answer: res.result });
      // }
      // setMessageList([...messageList, { question: value, answer: '回答回答' }]);
    });
  };

  const handleSend = () => {
    const value = (inputRef.current.value || '').trim();
    inputRef.current.value = '';
    // 发送消息
    if (!value) {
      return;
    }
    aiChat(value);
  };

  const getDomList = (list, isHistory = false) => {
    return list.map((item, index) => {
      return (
        <div key={(isHistory ? 'history_' : '_') + index}>
          {/**  问  **/}
          {item.question ? <Message {...item} isQuest={true} content={item.question} /> : null}
          {/**  答  **/}
          {item.answer ? (
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
          {!item.answer && item.loading ? <Message {...item} /> : null}
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
    <div className="h-full w-full">
      <div className="h-full flex flex-col w-full">
        <div className="flex-1 w-full overflow-hidden">
          <ScrollPage ref={ref} className="overflow-y-auto h-full">
            <React.Fragment>
              {getDomList(historyList, true)}
              {historyList.length > 0 && (
                <Divider>
                  {/* <span className="text-[#576675] text-xs">以上为历史对话</span> */}
                  <span className="text-[#999999] text-xs">{moment().format('MM-DD HH:mm')}</span>
                </Divider>
              )}
              {getDomList(messageList)}
            </React.Fragment>
          </ScrollPage>
          {/* <Message type="0" content={<Invoice></Invoice>} fullWidth/> */}
        </div>
        <div className={`bg-transparent w-full mt-5 ${inputVisible ? 'block' : 'hidden'} `}>
          <div className="bg-white rounded-lg w-full flex items-center border border-solid border-[#D3D9E6] h-[50px] box-border p-3.5">
            <textarea
              className="flex-1 border-none outline-none p-0 m-0 shadow-none font-normal placeholder:text-[#C7CBD4] text-[#0B0D0F] h-[24px] leading-[22px]"
              ref={inputRef}
              placeholder="可识别影像信息和附件，按回车即可发送消息"
              onKeyDown={handleKeyDown}
              style={{
                resize: 'none',
              }}
            />
            <div className="flex-none flex justify-end">
              <div
                className="w-[26px] h-[26px] flex items-center justify-center rounded-full bg-[#2A61FF] text-white cursor-pointer"
                onClick={handleSend}
              >
                <SvgIcon name="send" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(Index);
