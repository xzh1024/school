<template>
  <div id="syapp">
    <div class="main-cont">
      <transition :name="transitionName">
        <keep-alive exclude="no_keep">
          <router-view v-if="isRouterAlive"></router-view>
        </keep-alive>
      </transition>
      <!--<img src="./static/img/c_icon_lianxikefu2.png" id="serviceFloat" v-onDrag v-show="floatCustomerFlag" @click="$router.push({path:'/service'})">-->
    </div>
  </div>
</template>

<script>
  export default {
    provide(){
      return {
        reload: this.reload
      }
    },
    data(){
      return {
				transitionName: '',
        isRouterAlive: true,
        floatCustomerFlag: true,
      }
    },
    watch: {//使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
//        console.log(to.meta)
        console.log(to.meta.index +'：'+ from.meta.index)
        if(to.meta.index < from.meta.index){
          //设置动画名称
          this.transitionName = 'slide-right';
        }else{
          this.transitionName = 'slide-left';
        }
        if(to.meta.customer){
          this.floatCustomerFlag = false;
        } else {
          this.floatCustomerFlag = true;
        }
      }
    },
    directives: {
      onDrag: {
        // 指令的定义
        inserted: function (el,binding,vnode) {//被绑定元素插入到DOM中时调用
          var flag = 0; //标记是拖曳还是点击
          var icon = document.getElementById('serviceFloat');
          var disX, disY, moveX, moveY, L, T, starX, starY, starXEnd, starYEnd;
          icon.addEventListener('touchstart', function(e) {
            icon.className = '';
            icon.style.opacity = 1;
            var e = e || window.event;
            flag = 0;
//            e.preventDefault(); //阻止触摸时页面的滚动，缩放
            disX = e.touches[0].clientX - this.offsetLeft;
            disY = e.touches[0].clientY - this.offsetTop;
            //手指按下时的坐标
            starX = e.touches[0].clientX;
            starY = e.touches[0].clientY;
            //console.log(disX);
          });
          icon.addEventListener('touchmove', function(e) {
            var e = e || window.event;
            flag = 1;
            L = e.touches[0].clientX - disX;
            T = e.touches[0].clientY - disY;
            //移动时 当前位置与起始位置之间的差值
            starXEnd = e.touches[0].clientX - starX;
            starYEnd = e.touches[0].clientY - starY;

            if(L<0){//限制拖拽的X范围，不能拖出屏幕
              L = 0;
            }else if(L > document.documentElement.clientWidth - this.offsetWidth){
              L=document.documentElement.clientWidth - this.offsetWidth;
            }
            if(T<0){//限制拖拽的Y范围，不能拖出屏幕
              T=0;
            }else if(T > document.documentElement.clientHeight - this.offsetHeight){
              T = document.documentElement.clientHeight - this.offsetHeight;
            }

            moveX = L + 'px';
            moveY = T + 'px';
            //console.log(moveX);
            this.style.left = moveX;
            this.style.top = moveY;
          });
          window.addEventListener('touchend', function(e) {
            if(flag === 0) { //点击
              return
            }
          });
        }
      },
    },
    created() {
//      console.log(window.location.search);
      if(location.search){
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
          let str = url.substr(1);
          let strs = str.split("&");
          for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);
          }
        }
        if(theRequest.channel){
          this.myType.channel = theRequest.channel;
          sessionStorage.setItem("sy185_channel", Base64.encode(theRequest.channel));
        } else if(sessionStorage.getItem('sy185_channel')){
          this.myType.channel = Base64.decode(sessionStorage.getItem('sy185_channel'));
        } else {
          this.myType.channel = 185;
        }
      } else if(sessionStorage.getItem('sy185_channel')){
        this.myType.channel = Base64.decode(sessionStorage.getItem('sy185_channel'));
      } else {
        this.myType.channel = 185;
      }
      this.getUser();
    },
    methods: {
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
      getUser(){
//        if(this.myType.getCookie('sy185_user_token') != 0){
//          if(window.Base64.decode(this.myType.getCookie('sy185_user_token')) == this.myType.sy185_user_token){
//            this.$store.dispatch('getUser');
//          }
//        }
//        console.log(this.$store.getters.userInfo);
//        //交易账号
//        if(this.myType.getCookie('sy185_tra_user_token') != 0){
//          if(window.Base64.decode(this.myType.getCookie('sy185_tra_user_token')) == this.myType.sy185_tra_user_token){
//            this.$store.dispatch('getTraUser');
//          }
//        }
        if(sessionStorage.getItem('wz_user') != null){
          let userData = JSON.parse(Base64.decode(sessionStorage.getItem('wz_user')));
          console.log(userData);
          if(userData.uid){
            this.$store.dispatch('getUser',userData);
          }
        }
      },
    },
  }
</script>

<style scoped lang="less">
  #syapp{

  }
	#syapp {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    /*开启伸缩盒*/
    display: flex;
    flex-direction: column;
    .main-cont {
      /*flex: 1;*/
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  #serviceFloat{
    width: 4rem;
    border-radius: 50% 50%;
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 10;
  }
</style>
