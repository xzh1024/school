<template>
  <div class="systemNews">
    <div v-if="messageList.length > 0">
      <div class="sn border_eee" v-for="v in messageList">
        <div class="sn_l" @click="newsInfoRouter(v.id, v.action)" @touchstart="gtouchstart(v.id)" @touchmove="gtouchmove()" @touchend="gtouchend()">
          <div class="sn_t color_837f7e" v-text="v.create_time"></div>
          <div class="sn_c"><i class="unread" v-if="v.is_read == 0"></i><p>{{ v.title }}</p></div>
          <div class="sn_b color_837f7e" v-text="v.desc"></div>
        </div>
        <i class="sn_r"></i>
      </div>
      <div class="screen" v-show="screenFlag" @click.self="screenFlag = false" onselectstart="return false;">
        <div class="frame" @click.stop="deleteMessage">删除该消息</div>
      </div>
    </div>
    <div class="zero" v-else>
      <img src="../../../../static/img/wz/bg/a_icon_wuxiaoxi.png">
    </div>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  var timeOutEvent=0;//定时器
  export default {
    data: function () {
      return {
        messageList: [],
        screenFlag: false,
        mid: 0,
        messageType: 2, //消息类型1 收益消息 2 其他消息
        messagePage: 1,
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getMessageList();
    },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {

      });
    },
    methods: {
      //消息列表
      getMessageList() {
        var url = this.jointUrl({
          uid: this.userInfo.uid,
          message_type: this.messageType,
          page: this.messagePage
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=message&a=get_message_list',{
          params: {
            uid: this.userInfo.uid,
            message_type: this.messageType,
            page: this.messagePage,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            console.log(datas);
            if(datas.status == 1){//1成功
              if(datas.data.count > 0 && datas.data.count >= this.messagePage){
                var list = datas.data.list;
                for(let i=0,len=list.length; i < len; i++){
                  list[i].create_time = this.myType.formatTimeS(list[i].create_time);
                }
                this.messageList = data;
                this.messagePage++;
              }
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      //删除消息
      deleteMessage() {
        var url = this.jointUrl({
          uid: this.userInfo.id,
          channel: this.myType.channel,
          user_message_id: this.mid
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=message&a=delete_message',{
          params: {
            uid: this.userInfo.id,
            channel: this.myType.channel,
            user_message_id: this.mid,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            if(datas.status == 1){//1成功
              this.getMessageList();
              this.screenFlag = false;
            }
            if(datas.status == 0){//0失败
              console.log('请求失败：' + datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      },
      newsInfoRouter(mid, action) {
        this.$router.push({path:'/news_info/'+mid+'/'+action});
      },
      //开始按
      gtouchstart(mid){
        timeOutEvent = setTimeout(()=>{
          this.mid = mid;
          this.screenFlag = true;
        },500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适
        return false;
      },
      //手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件
      gtouchend(){
        clearTimeout(timeOutEvent);//清除定时器
        if(timeOutEvent!=0){
          //这里写要执行的内容（尤如onclick事件）
//          vm.goChat(item);
        }
        return false;
      },
      //如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
      gtouchmove(){
        clearTimeout(timeOutEvent);//清除定时器
        timeOutEvent = 0;

      },
      //真正长按后应该执行的内容
      longPress(item){
        timeOutEvent = 0;
        //执行长按要执行的内容，如弹出菜单
        $api.css($api.dom('.Popup'), 'display:block');
      }
    }
  }
</script>

<style scoped lang="less">
  .systemNews{
    flex: 1;
    overflow-y: auto;
    .zero{
      flex: 1;
      img{
        width: 100%;
      }
    }
    .sn{
      height: 6rem;
      padding: 0 .8rem;
      display: flex;
      align-items: center;
      .sn_l{
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        .sn_t{
          font-size: .88rem;
        }
        .sn_c{
          line-height: 1.4rem;
          display: flex;
          align-items: center;
          .unread{
            display: inline-block;
            width: .5rem;
            height: .5rem;
            border-radius: 50%;
            background-color: #ff3e3e;
            /*margin-bottom: .15rem;*/
            margin-right: .5rem;
          }
          p{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .sn_b{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .sn_r{
        display: inline-block;
        width: 1rem;
        height: 1.3rem;
        background: url("../../../../static/img/youjiantou.png") no-repeat;
        background-size: contain;
      }
    }
  }
  .screen{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: center;
    align-items: center;
    .frame{
      width: 12rem;
      height: 2.5rem;
      line-height: 2.5rem;
      text-align: center;
      font-size: 1.1rem;
      background-color: #fff;
      border-radius: .2rem;
    }
  }
</style>
