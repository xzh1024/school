<template>
  <el-dialog
    class="chats"
    title="通聊"
    :visible.sync="visible"
    :close-on-click-modal="false"
    append-to-body
    width="900px"
    top="0"
    @close="close"
  >
    <template slot="title"><i class="el-icon-chat-dot-round"></i>通聊</template>
    <div class="chats-user">
      <div class="chats-search">
        <div class="input-item">
          <i class="el-icon-search"></i>
          <input
            class="input"
            v-model="keyword"
            size="mini"
            placeholder="搜索"
          />
        </div>
      </div>
      <div class="chats-user-list">
        <div
          class="user-item"
          v-for="(item, index) in contacts"
          :key="index"
          @click="clickContact(item)"
        >
          <i class="el-icon-close"></i>
          <div class="user-avatar"></div>
          <div class="user-content">
            <div class="user-name">{{ item.companyName }}</div>
            <div class="user-news">{{ item.lastMsg.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chats-content" v-resize>
      <div class="chats-top">北京东方思锐科技有限责任公司-S3管理员</div>
      <div class="chats-center" ref="msgList" @scroll="msgListScroll">
        <div class="msg-item" v-for="item in msgs" :key="item.id">
          <div class="msg-time">{{ item.tipsStr }}</div>
          <div class="msg-con" :class="[item.isMe ? 'right' : 'left']">
            <div class="msg-article-box">
              <div class="msg-avatar"></div>
              <div class="msg-article msg-text" v-if="item.type === 1">
                {{ item.content }}
              </div>
              <div class="msg-article msg-img" v-if="item.type === 2">
                <!-- <img :src="item.content" /> -->
                <!-- <img
                  src="https://t7.baidu.com/it/u=1951548898,3927145&fm=193&f=GIF"
                /> -->
                <el-image
                  class="img"
                  :src="
                    'https://t7.baidu.com/it/u=1951548898,3927145&fm=193&f=GIF'
                  "
                  :preview-src-list="[
                    'https://t7.baidu.com/it/u=1951548898,3927145&fm=193&f=GIF'
                  ]"
                  :z-index="3000"
                >
                </el-image>
              </div>
              <div
                class="msg-article msg-audio"
                v-if="item.type === 3"
                :data-time="`3''`"
                @click="playAudio(item)"
              >
                <audio :src="item.content"></audio>
                <i class="el-icon-video-play"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chats-bottom">
        <div class="chats-row-resize"></div>
        <div class="chats-tool">
          <div class="chats-tool-box">
            <div class="chats-tool-buts">
              <input
                id="file"
                class="file"
                type="file"
                name="file"
                @change="handleFileChange"
              />
              <label class="el-icon-picture chat-icon" for="file"></label>
              <i class="el-icon-microphone chat-icon"></i>
            </div>
            <div
              class="chats-tool-key"
              @click="keyShow = true"
              @blur="hideKeySelector"
              tabindex="0"
            >
              {{ keyTypeText }}
            </div>
            <div class="chats-key-selector" v-show="keyShow">
              <div
                class="key-item"
                v-for="(item, index) in keys"
                :key="index"
                :class="{ active: item.type === keyType }"
                @click="changeKey(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div
          ref="chatEdit"
          class="chat-edit"
          contenteditable="true"
          @keydown="handleKeydown"
          @keyup="handleKeyup"
        ></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getContacts, getMessages } from "@/api/notice";
function timeFormat(time, type) {
  if (!time) {
    return "";
  }
  type = (type ? type : "") + "";
  time = new Date(time);
  var year = time.getFullYear(),
    month = time.getMonth() + 1,
    date = time.getDate(),
    hour = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }
  var timeStr = " " + hour + ":" + minute + ":" + second;
  if (type.search("notime") != -1) {
    timeStr = "";
  } else if (type.search("nosecond") != -1) {
    timeStr = " " + hour + ":" + minute;
  }
  var separatorYear = "-";
  var separatorMonth = "-";
  var separatorDay = "";
  if (type.search("zh-cn") != -1) {
    separatorYear = "年";
    separatorMonth = "月";
    separatorDay = "日";
  }
  if (type == 1) {
    separatorYear = ".";
    separatorMonth = ".";
    timeStr = "";
  }
  if (type.search("noyear") != -1) {
    return month + separatorMonth + date + separatorDay + timeStr;
  } else {
    return (
      year +
      separatorYear +
      month +
      separatorMonth +
      date +
      separatorDay +
      timeStr
    );
  }
}

const datas = {
  0: {
    totalUnreadCount: 0,
    conversations: {
      5: {
        lastReadMaxId: 4991,
        unreadCount: 0,
        messages: [
          {
            content: "hh\n",
            createdAt: 1554361914,
            from: 5,
            id: 2145,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "hl\n",
            createdAt: 1554361925,
            from: 5,
            id: 2146,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "；‘’；",
            createdAt: 1554361938,
            from: 5,
            id: 2147,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "kkl",
            createdAt: 1554361940,
            from: 5,
            id: 2148,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "jj\n",
            createdAt: 1554361942,
            from: 5,
            id: 2149,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "hj\n",
            createdAt: 1554361943,
            from: 5,
            id: 2150,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "j\n",
            createdAt: 1554361945,
            from: 5,
            id: 2151,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "h'\n",
            createdAt: 1554361946,
            from: 5,
            id: 2152,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "hh\n",
            createdAt: 1554361954,
            from: 5,
            id: 2153,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "；kk",
            createdAt: 1554361994,
            from: 5,
            id: 2154,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "看看",
            createdAt: 1554361996,
            from: 5,
            id: 2155,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "jl\n",
            createdAt: 1554361998,
            from: 5,
            id: 2156,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "dslmdl;s\n\n",
            createdAt: 1554362301,
            from: 5,
            id: 2157,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "fgbgfb",
            createdAt: 1554362309,
            from: 5,
            id: 2158,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "fgbb",
            createdAt: 1554362311,
            from: 5,
            id: 2159,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "fgb",
            createdAt: 1554362314,
            from: 5,
            id: 2160,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "fbgfgb",
            createdAt: 1554362318,
            from: 5,
            id: 2161,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "是程序程序许 \n",
            createdAt: 1554362555,
            from: 5,
            id: 2162,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "lkd",
            createdAt: 1554362559,
            from: 5,
            id: 2163,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "djsj\n",
            createdAt: 1554362580,
            from: 5,
            id: 2164,
            talker: 1,
            to: 10,
            type: 1
          },
          {
            content: "dlld",
            createdAt: 1554362582,
            from: 5,
            id: 2165,
            talker: 1,
            to: 10,
            type: 1
          }
        ]
      }
    }
  },
  2145: {
    totalUnreadCount: 0,
    conversations: {
      5: {
        lastReadMaxId: 4991,
        unreadCount: 0,
        messages: [
          {
            content: "2",
            createdAt: 1554358834,
            from: 10,
            id: 2088,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "2",
            createdAt: 1554358834,
            from: 10,
            id: 2089,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "2",
            createdAt: 1554358835,
            from: 10,
            id: 2090,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "\n2",
            createdAt: 1554358835,
            from: 10,
            id: 2091,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "2",
            createdAt: 1554358836,
            from: 10,
            id: 2092,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "2",
            createdAt: 1554358836,
            from: 10,
            id: 2093,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "\n2",
            createdAt: 1554358836,
            from: 10,
            id: 2094,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "2",
            createdAt: 1554358837,
            from: 10,
            id: 2095,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "22",
            createdAt: 1554358837,
            from: 10,
            id: 2096,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "\n2",
            createdAt: 1554358837,
            from: 10,
            id: 2097,
            talker: 2,
            to: 5,
            type: 1
          },
          {
            content: "2",
            createdAt: 1554358838,
            from: 10,
            id: 2098,
            talker: 2,
            to: 5,
            type: 1
          }
        ]
      }
    }
  }
};

export default {
  name: "NewsDialog",
  data() {
    return {
      visible: false,
      loading: false,
      keyword: "",
      contacts: [
        {
          companyId: 0,
          companyName: "",
          contact: 2665,
          lastMsg: {
            content: "111",
            type: 1,
            time: 1577531102,
            id: 4793,
            talker: 693
          },
          content: "111",
          id: 4793,
          talker: 693,
          time: 1577531102,
          type: 1,
          nickname: "",
          tel: "",
          unreadNum: 0
        },
        {
          companyId: 3,
          companyName: "北京东方思锐科技有限责任公司",
          contact: 5,
          lastMsg: {
            content: "aaa",
            type: 1,
            time: 1575265849,
            id: 4714,
            talker: 5
          },
          content: "aaa",
          id: 4714,
          talker: 5,
          time: 1575265849,
          type: 1,
          nickname: "S3管理员",
          tel: "15011021604",
          unreadNum: 0
        },
        {
          companyId: 0,
          companyName: "",
          contact: 2420,
          lastMsg: {
            content: "按数据库煽风点火尽快送到",
            type: 1,
            time: 1570762287,
            id: 2797,
            talker: 2420
          },
          content: "按数据库煽风点火尽快送到",
          id: 2797,
          talker: 2420,
          time: 1570762287,
          type: 1,
          nickname: "",
          tel: "",
          unreadNum: 0
        }
      ],
      msgs: [],
      keyShow: false,
      keyType: "1",
      keys: [
        {
          type: "1",
          name: "按Enter键发送"
        },
        {
          type: "2",
          name: "按Ctrl+Enter键发送"
        }
      ],
      contact: 0,
      flag: true
    };
  },
  computed: {
    keyTypeText() {
      return this.keys.find(item => item.type === this.keyType).name;
    }
  },
  created() {
    this.keyType = localStorage.keyType || "1";
    // if (localStorage.keyType) {
    //   this.keys = KEYS.map(item => {
    //     return {
    //       ...item,
    //       active: item.id === localStorage.keyType
    //     };
    //   });
    // } else {
    //   this.keys = KEYS.map((item, index) => {
    //     return {
    //       ...item,
    //       active: index === 0
    //     };
    //   });
    // }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    close() {
      console.log("关闭");
      this.hideKeySelector();
    },
    // 联系人列表
    getContacts() {
      getContacts()
        .then(res => {
          console.log(res);
          this.contacts = res.contacts || [];
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    clickContact(item) {
      if(this.contact !== item.contact) {
        this.contact = item.contact;
        this.msgs = [];
        this.getMessages();
      }
    },
    // 根据联系人id获取消息列表
    getMessages() {
      this.flag = false;
      const msgs = this.msgs;
      const params = {
        contact: this.contact,
        offset: msgs.length ? msgs[0].id : 0
      };
      getMessages(params)
        .then(res => {
          console.log(res);
          this.flag = true;
        })
        .catch(err => {
          console.log(err);
          const res = datas[msgs.length ? msgs[0].id : 0];
          console.log(res);
          console.log(this.contact);
          const conversations = res.conversations || {};
          for (const key in conversations) {
            if (Object.hasOwnProperty.call(conversations, key)) {
              if (key == this.contact) {
                this.filterConversation(conversations[key]);
              }
            }
          }
          this.flag = true;
        });
    },
    filterConversation(data) {
      console.log(list);
      const list = data.messages || [];
      if (list && list.length) {
        const tempList = [];
        const first = this.msgs.length ? this.msgs[0] : {};
        const msgIds = this.msgs.map(item => item.id);
        let initViewTime = first.initViewTime;
        let beforeViewTime = first.beforeViewTime;
        let afterViewTime = first.afterViewTime;
        let chatsRange = 0;
        // list.map(item => {
        for (let index = 0; index < list.length; index++) {
          const item = list[index];
          console.log(111);
          if (msgIds.filter(msgId => msgId === item.id).length) {
            console.log(222);
            continue;
          }
          ++chatsRange;

          let tipsStr = "";
          let msgTime = item.createdAt * 1000;
          let viewTime = null;
          if (!initViewTime) {
            initViewTime = list[0].createdAt * 1000;
            first.initViewTime = initViewTime;
            viewTime = initViewTime;
            beforeViewTime = first.beforeViewTime = initViewTime;
            afterViewTime = first.afterViewTime = initViewTime;
          }

          if (msgTime - initViewTime >= 0) {
            if (msgTime - afterViewTime > 600000 || chatsRange > 9) {
              chatsRange = 0;
              first.afterViewTime = afterViewTime = msgTime;
              viewTime = msgTime;
            }
          } else {
            if (beforeViewTime - msgTime > 600000 || chatsRange > 9) {
              chatsRange = 0;
              first.beforeViewTime = beforeViewTime = msgTime;
              viewTime = msgTime;
            }
          }

          if (viewTime) {
            //大于100天显示年
            if (initViewTime - viewTime > 604800000) {
              tipsStr = timeFormat(viewTime, "zh-cn nosecond");
            } else {
              tipsStr = timeFormat(viewTime, "zh-cn noyear nosecond");
            }
          }
          tempList.push({
            ...item,
            initViewTime,
            beforeViewTime,
            afterViewTime,
            tipsStr,
            isMe: item.from !== this.contact
          });
        }
        console.log(tempList);
        this.msgs = [...tempList, ...this.msgs];
        this.$nextTick(() => {
          // 滚动条滚动到底部
          const msgList = this.$refs.msgList;
          msgList.scrollTop = msgList.scrollHeight;
        });
      }
    },
    hideKeySelector() {
      setTimeout(() => {
        this.keyShow = false;
      }, 150);
    },
    changeKey(now) {
      this.hideKeySelector();
      if (now.type === this.keyType) return;
      localStorage.keyType = now.type;
      this.keyType = now.type;
    },
    // changeText(e) {
    //   const target = e.target;
    //   console.log(target);
    // },
    // descImgPaste(e) {
    //   console.log(e);
    // },
    // edit
    handleKeydown(e) {
      switch (this.keyType) {
        case "1": {
          if (e.keyCode === 17) {
            e.target.downControl = true;
          } else if (e.keyCode === 13) {
            e.cancelBubble = true;
            e.preventDefault();
            e.stopPropagation();
          }
          break;
        }
        case "2": {
          if (e.keyCode === 17) {
            e.target.downControl = true;
          }
          break;
        }
        default:
          break;
      }
    },
    handleKeyup(e) {
      const { target, keyCode } = e;
      switch (this.keyType) {
        case "1": {
          if (keyCode === 17) {
            target.downControl = false;
          } else if (keyCode === 13) {
            if (target.downControl) {
              e.stopPropagation();
              target.innerHTML = target.innerHTML + "<div><br></div>";
              this.keepEditLastIndex(target);
            } else {
              this.submit(target);
            }
          }
          break;
        }
        case "2": {
          if (keyCode === 17) {
            target.downControl = false;
          } else if (keyCode === 13 && target.downControl) {
            e.stopPropagation();
            this.submit(target);
          }
          break;
        }
        default:
          break;
      }
    },
    submit(el) {
      if (el.innerHTML) {
        console.log(el.innerHTML);
        el.innerHTML = "";
      }
    },
    // 插入图片
    handleFileChange(e) {
      console.log(e);
      const target = e.target;
      const file = target.files[0];
      const reader = new FileReader();
      const chatEdit = this.$refs.chatEdit;
      reader.addEventListener("load", () => {
        const img = document.createElement("img");
        img.src = reader.result;
        chatEdit.append(img);
        target.value = "";

        this.keepEditLastIndex(chatEdit);
      });

      if (file) {
        reader.readAsDataURL(file);
      }
    },
    keepEditLastIndex(chatEdit) {
      // 光标定位到最后
      if (window.getSelection) {
        chatEdit.focus();
        const range = window.getSelection();
        range.selectAllChildren(chatEdit);
        range.collapseToEnd();
      } else if (document.selection) {
        const range = document.selection.createRange();
        range.moveToElementText(chatEdit);
        range.collapse(false);
        range.select();
      }
      this.$nextTick(() => {
        // 滚动条滚动到底部
        chatEdit.scrollTo(0, chatEdit.scrollHeight + "px");
        chatEdit.scrollTop = chatEdit.scrollHeight;
      });
    },
    // 播放语音
    playAudio(item) {
      console.log(item);
      if (!item.content) return;
      const audio = document.createElement("audio");
      audio.src = item.content;
      document.body.append(audio);
      audio.play();
    },
    // 滚动
    msgListScroll(e) {
      if(!this.flag) return;
      console.log(e.target.scrollTop);
      const target = e.target;
      if(target.scrollTop <= 50 && this.contacts) {
        this.getMessages();
      }
    }
  },
  directives: {
    // 拖拽编辑框高度
    resize: {
      bind: function(chat) {
        chat.onmousedown = function(event) {
          chat.style.cursor = "auto";
          const target = event.target || event.srcElement;
          if (target.className === "chats-row-resize") {
            const chatFooter = target.parentNode;
            const chatHeight = chat.clientHeight; // clientHeight、offsetHeight
            let resizeY = event.clientY;
            document.onmousemove = function(e) {
              e.stopPropagation();
              chat.style.cursor = "row-resize";
              let newHeight = chatFooter.clientHeight - e.clientY + resizeY;
              if (newHeight > chatHeight * 0.62) {
                newHeight = chatHeight * 0.62;
              } else if (newHeight < 100) {
                newHeight = 100;
              }
              chatFooter.style.height = newHeight + "px";
              resizeY = e.clientY;
              return false;
            };
            document.onmouseup = function(e) {
              e.stopPropagation();
              chat.style.cursor = "auto";
              document.onmousemove = null;
            };
          }
        };
      }
    }
  }
};
</script>

<style lang="less" scoped>
.chats {
  /deep/ .el-dialog {
    top: 7%;
    height: 86%;
    max-height: 800px;
    display: flex;
    flex-direction: column;
    .el-dialog__header {
      padding: 10px 20px;
      line-height: 30px;
      font-size: 20px;
      font-weight: 700;
      border-bottom: 1px solid #007bff;
      .el-icon-chat-dot-round {
        font-size: 22px;
        color: #5784fe;
        margin-right: 5px;
      }
    }
    .el-dialog__body {
      flex: 1;
      padding: 0;
      display: flex;
      overflow: hidden;
      .chats-user {
        width: 266px;
        height: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .chats-search {
          width: 100%;
          height: 40px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          .input-item {
            position: relative;
            box-sizing: border-box;
            width: 165px;
            height: 26px;
            padding: 0 0 0 30px;
            border: 1px solid #eee;
            border-radius: 15px;
            .el-icon-search {
              position: absolute;
              left: 10px;
              top: 50%;
              transform: translateY(-50%);
              font-size: 16px;
              color: #999999;
            }
            .input {
              background: none;
              outline: none;
              border: none;
              height: 22px;
              line-height: 22px;
              font-size: 14px;
              &::-webkit-input-placeholder {
                color: #aaa;
                font-weight: 300;
              }
              &::-moz-placeholder {
                color: #aaa;
                font-weight: 300;
              } /* firefox 19+ */
              &:-ms-input-placeholder {
                color: #aaa;
                font-weight: 300;
              } /* ie */
              &:-moz-placeholder {
                color: #aaa;
                font-weight: 300;
              }
            }
          }
        }
        .chats-user-list {
          flex: 1;
          overflow-y: auto;
          .user-item {
            height: 61px;
            border-bottom: 1px solid #eee;
            position: relative;
            padding: 1px 30px 1px 65px;
            .el-icon-close {
              position: absolute;
              line-height: 10px;
              font-size: 10px;
              left: 3px;
              top: 25px;
              cursor: pointer;
              color: @text-color-hint;
              display: none;
              &:hover {
                color: @color-error;
              }
            }
            &:hover .el-icon-close {
              display: block;
            }
            .user-avatar {
              position: absolute;
              top: 10px;
              left: 18px;
              width: 40px;
              height: 40px;
              border-radius: 40px;
              border: 1px solid #eee;
              background: #f0f2ff url("~@/assets/img/news/default_avatar.png")
                no-repeat;
              background-size: 100% 100%;
            }
            .user-content {
              .user-name {
                margin-top: 10px;
                height: 20px;
                line-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .user-news {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                color: @text-color-hint;
              }
            }
          }
        }
      }
      .chats-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        .chats-top {
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding: 0 15px;
          border-bottom: 1px solid #ddd;
        }
        .chats-center {
          flex: 1;
          border-bottom: 1px solid #ddd;
          overflow-y: auto;
          .msg-item {
            padding: 6px 0;
            &:last-child {
              padding-bottom: 20px;
            }
            .msg-time {
              padding: 0 10px;
              color: #999;
              font-size: 12px;
              text-align: center;
            }
            .msg-con {
              padding: 0 10px;
              margin-top: 5px;
              .msg-article-box {
                position: relative;
                box-sizing: border-box;
                padding: 0 50px;
                .msg-avatar {
                  display: inline-block;
                  width: 30px;
                  height: 30px;
                  border-radius: 30px;
                  border: 1px solid #eee;
                  background: #f0f2ff
                    url("~@/assets/img/news/default_avatar.png") no-repeat;
                  background-size: 100% 100%;

                  position: absolute;
                  top: 4px;
                }
                .msg-article {
                  position: relative;
                  display: inline-block;
                  box-sizing: border-box;
                  // border: 1px solid #fff;
                  padding: 10px;
                  // border-radius: 4px;
                  // background: #fff;
                  min-height: 40px;
                  max-width: 62%;
                  &.msg-text {
                    border: 1px solid #fff;
                    border-radius: 4px;
                    background: #fff;
                  }
                  &.msg-audio {
                    min-width: 70px;
                    border: 1px solid #fff;
                    border-radius: 4px;
                    background: #fff;
                    cursor: pointer;
                    &::after {
                      content: attr(data-time);
                      position: absolute;
                    }
                  }
                  &.msg-img {
                    .img {
                      max-width: 100%;
                      max-height: 100%;
                      border: 1px solid #e9e9e9;
                      border-radius: 5px;
                    }
                  }
                  &::before {
                    content: " ";
                    width: 0;
                    height: 0;
                    border: 10px solid transparent;
                    position: absolute;
                  }
                }
              }
              &.left {
                .msg-avatar {
                  left: 0;
                }
                .msg-article-box {
                  .msg-article {
                    &.msg-text::before,
                    &.msg-audio::before {
                      border-right-color: #fff;
                      right: 100%;
                    }
                    &.msg-audio {
                      &::after {
                        content: attr(data-time);
                        position: absolute;
                        left: 100%;
                        margin-left: 5px;
                        color: #999;
                      }
                    }
                  }
                }
              }
              &.right {
                .msg-avatar {
                  right: 0;
                }
                .msg-article-box {
                  text-align: right;
                  .msg-article {
                    &.msg-text,
                    &.msg-audio {
                      background: #5784fe;
                      color: #fff;
                      border-color: #5784fe;
                      text-align: left;
                    }
                    &.msg-text::before,
                    &.msg-audio::before {
                      border-left-color: #5784fe;
                      left: 100%;
                    }
                    &.msg-audio {
                      &::after {
                        content: attr(data-time);
                        position: absolute;
                        right: 100%;
                        margin-right: 5px;
                        color: #999;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .chats-bottom {
          position: relative;
          box-sizing: border-box;
          height: 150px;
          padding-top: 30px;
          .chats-row-resize {
            position: absolute;
            width: 100%;
            height: 3px;
            top: -2px;
            left: 0;
            z-index: 2;
            cursor: row-resize;
          }
          .chats-tool {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 30px;
            .chats-tool-box {
              position: relative;
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              padding-right: 150px;
              line-height: 30px;
              .chats-tool-buts {
                width: 100%;
                .chat-icon {
                  font-size: 18px;
                  margin-left: 10px;
                  cursor: pointer;
                  color: @text-color-secondary;
                }
                .file {
                  opacity: 0;
                  width: 0;
                  height: 0;
                }
              }
              .chats-tool-key {
                position: absolute;
                top: 0;
                right: 10px;
                color: @text-color-secondary;
                cursor: pointer;
              }
              .chats-key-selector {
                position: absolute;
                top: 30px;
                right: 10px;
                line-height: 30px;
                color: #999;
                background: #fff;
                box-shadow: 0 0 5px #aaa;
                // display: none;
                .key-item {
                  line-height: 25px;
                  padding: 0 10px;
                  cursor: pointer;
                  &:hover {
                    background: #f0f2ff;
                    color: #666;
                  }
                  &.active {
                    color: #666;
                  }
                }
              }
            }
          }
          .chat-edit {
            box-sizing: border-box;
            height: 100%;
            padding: 10px;
            overflow-x: hidden;
            overflow-y: auto;
            outline: 0;
            img {
              max-width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
