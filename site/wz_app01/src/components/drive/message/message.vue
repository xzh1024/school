<template> <!--消息-->
	<div class="msg">
    <div class="msg_box border_eee">
      <div class="msg_type" @click="popupVisible = true">
        <div class="small1 color_636363" v-text="typeText"></div>
        <i class="icon_down_black" :style="{transform:rotationArrow}"></i>
      </div>
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
        <div class="msg_type_option">
          <div class="msg_type_option_li" style="color: #ff7900;" @click="setType(1, $event);">我的回复</div>
          <div class="msg_type_option_li" @click="setType(2, $event);">被赞/踩的评论</div>
          <div class="msg_type_option_li" @click="setType(3, $event);">被赞/踩的动态</div>
          <i class="msg_type_option_triangle"></i>
        </div>
      </mt-popup>
    </div>
    <div class="msg_main">
      <!--<keep-alive v-if="$parent.user.user_id">	&lt;!&ndash;缓存组件&ndash;&gt;-->
        <!--<ListMsg :msgType="msgType"></ListMsg>-->
      <!--</keep-alive>-->
      <keep-alive v-if="$store.getters.userInfo.id">	<!--缓存组件-->
        <ListMsg :msgType="1" v-if="msgType == 1"></ListMsg>
        <ListMsg2 :msgType="2" v-else-if="msgType == 2"></ListMsg2>
        <ListMsg3 :msgType="3" v-else-if="msgType == 3"></ListMsg3>
      </keep-alive>
      <div class="not" v-else>
        <img class="not_img" src="../../../static/img/31_icon_weidenglu.png">
        <div class="not_text f_s1 color_837f7e">
          您还未登录，请前往个人中心登录
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import ListMsg from '../../list/listMsg.vue'
  import ListMsg2 from '../../list/listMsg.vue'
  import ListMsg3 from '../../list/listMsg.vue'
  export default {
    data: function () {
      return {
        popupVisible: false,
        rotationArrow: 'rotate(0deg)',
        msgType: 1,
        typeText: '我的回复',
      }
    },
    components: { ListMsg, ListMsg2, ListMsg3 },
    watch:{
      popupVisible(val, oldVal){
//        console.log("popupVisible: "+val, oldVal);
        if(val){
          this.rotationArrow = 'rotate(180deg)';
        } else {
          this.rotationArrow = 'rotate(0deg)';
        }
      },
      msgType(val, oldVal){
        if(val == 1){
          this.typeText = '我的回复';
        } else if(val == 2){
          this.typeText = '被赞/踩的评论';
        } else if(val == 3){
          this.typeText = '被赞/踩的动态';
        }
      }
    },
    methods:{
      setType(type, el){
        let e = el || window.event;
        let target = e.target || e.srcElement;
        let types = document.querySelectorAll('.msg_type_option > .msg_type_option_li');
        for(let i=0,len=types.length; i < len; i++){
          types[i].style.color = '#636363';
        }
        target.style.color = '#ff7900';
        this.msgType = type;
        this.popupVisible = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .msg{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .msg_main{
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .msg_box{
      position: relative;
      padding: 0 1rem;
      height: 2rem;
      line-height: 1.4rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .msg_type{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .icon_down_black{
          margin-left: .5rem;
        }
      }
      .mint-popup{
        width: auto;
        position: absolute;
        top: 100%;
        left: auto;
        right: 0;
        padding: .2rem .5rem;
        transform: translate3d(0, 0, 0);
        border-radius: .6rem;
        color: #636363;
        .msg_type_option{
          position: relative;
          .msg_type_option_li{
            height: 1.6rem;
            line-height: 1.6rem;
            text-align: center;
            font-size: .89rem;
          }
          .msg_type_option_triangle{
            display: inline-block;
            width: 0;
            height: 0;
            border: 1rem solid transparent;
            border-bottom: 1rem solid #ffffff;
            position: absolute;
            top: -2rem;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
          }
        }
      }
    }
  }
</style>

