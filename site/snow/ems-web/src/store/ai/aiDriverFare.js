import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { aiChat, getAiSessionHistoryPage } from '../../api/ai';

export default class Store {
  constructor() {
    makeAutoObservable(this);
    this.aiSession = sessionStorage.getItem('aiSession');
    try {
      this.aiApprove = JSON.parse(sessionStorage.getItem('aiApprove') || '{}');
    } catch (error) {
      console.log(error);
    }
  }

  loading = false;

  inputVisible = true;

  // 初始化信息
  initData = {};

  aiApprove = {};

  // 历史分页信息
  page = {
    num: 0,
    size: 20,
    loading: true,
    hasMore: true,
  };

  // 历史列表
  historyList = [];

  // 当前会话列表
  messageList = [];

  addMessage = data => {
    this.messageList = [
      ...this.messageList,
      {
        question: '',
        ...data,
      },
    ];
  };

  setMessage = (id, options) => {
    const data = this.messageList.map(item => {
      if (item.id === id) {
        Object.keys(options).forEach(key => {
          item[key] = options[key];
        });
      }
      return item;
    });
    this.messageList = [...data]; // 强制更新，滚动条到底部
  };

  // 历史
  getSessionHistoryPage = async once => {
    if (!this.page.hasMore) return;
    if (this.page.loading && !once) return;
    this.page.loading = true;
    getAiSessionHistoryPage({
      businessType: 'ems',
      businessSubType: 'audit_chat',
      hour: 0,
      uid: this.initData.userName,
      businessCode: this.aiApprove.claimNo,
      pageNum: ++this.page.num,
      pageSize: this.page.size,
    })
      .then(res => {
        this.page.loading = false;
        if (res.code === 200 && res.data) {
          const data = res.data;
          let list = data.records || [];
          if (list.length) {
            if (once && this.page.num === 1) {
              // 第一次时清除历史列表的数据
              this.historyList = [];
            }
            // 反转顺序
            list.reverse();
            this.lastId = ''; // 滚动条定位处理
            if (this.historyList.length) {
              this.lastId = this.historyList[0].id;
            }
            this.historyList = [...list, ...this.historyList];
          } else {
            this.page.hasMore = false;
          }
          if (this.page.num >= data.pages) {
            this.page.hasMore = false;
          }
        }
        if (once) {
          this.messageList.push({ id: uuid(), answer: '您好，可以输入要抽取的关键信息，雪宝将为您查询' });
        }
      })
      .catch(() => (this.page.loading = false));
  };

  // 与AI对话
  aiChat = value => {
    if (this.loading) {
      window.$message.warning('等机器人回复之后再提问哦！');
      return Promise.reject('等机器人回复之后再提问哦！');
    }
    let content = (value || '').trim();
    if (!content) {
      window.$message.warning('请输入内容');
      return Promise.reject('请输入内容');
    }
    const id = uuid();
    this.addMessage({
      id,
      question: content,
      loading: true,
    });
    this.loading = true;
    return new Promise((resolve, reject) => {
      aiChat(
        {
          content,
          business: { financeNum: this.aiApprove.claimNo },
        },
        {
          type: 'ems_audit_chat',
          sessionId: this.aiSession,
        },
      )
        .then(res => {
          this.loading = false;
          try {
            const { data } = res;
            const resData = JSON.parse(data);
            let answer = '';
            if (resData.result) {
              answer = resData.result;
              resolve(resData);
            } else {
              answer = resData.message || '当前使用人数较多，请稍后再试';
              reject(resData);
            }
            this.setMessage(id, {
              answer,
              loading: false,
            });
          } catch (error) {
            this.setMessage(id, {
              answer: '当前使用人数较多，请稍后再试',
              loading: false,
            });
            reject(error);
          }
        })
        .catch(() => {
          this.loading = false;
          this.setMessage(id, {
            answer: '当前使用人数较多，请稍后再试',
            loading: false,
          });
        });
    });
  };
}
