<!--我的收藏-->
<template>
  <div class="collect">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        我的收藏
      </div>
      <div class="head_right"><span @click="messageBox">全部取消</span></div>
    </div>
    <div class="collect_list"
         v-infinite-scroll="getUserCollect"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <div class="sole" v-for="v in collectList"  @click="router(v.id)">
        <img class="sole-logo" :src="myType.domainName + v.logo"></img>
        <div class="sole-cont">
          <p class="sole-cont-gamename" v-text="v.gamename">魔兽世界</p>
          <p class="sole-cont-num">
            <i class="icon_xx"></i>
            <i class="icon_xx"></i>
            <i class="icon_xx"></i>
            <i class="icon_xx"></i>
            <i class="icon_xx"></i>
          </p>
          <p class="">
            <span class="download small">{{ v.download|download }}</span>
            <span class="small">&emsp;{{ v.size }}M</span>
          </p>
        </div>
        <a class="btn_blue_not" :download="v.web_pack" @click.stop="download(v.web_url)">
          下载
        </a>
      </div>
      <!--加载动画-->
      <div v-show="loadAnimation">
        <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
      </div>
    </div>
	</div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import { mapGetters } from 'vuex'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        page: 1,
        collectList: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation: false,//标记加载动画,false为隐藏
        cancelList: "" //要取消收藏的游戏ID
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getUserCollect();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      messageBox () {
        MessageBox.confirm('是否全部取消收藏?').then(action => {
          this.allCancel();
        });
      },
      goRouter(){//返回上一个页面
        this.$router.go(-1);
      },
      router(id) {   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      },
      getUserCollect() {
        //我的收藏
        if(this.status){
          this.loadAnimation = true;
          this.loading = true;
          this.$http.get('/www/api-game-myCollect', {
            params: {
              system: this.myType.system,
              username: this.userInfo.username,
              page: this.page
            }
          })
            .then(response => {
              var datas = response.data;
              if (datas.status == 0) {//0成功
                if(datas.data.length){
                  var data = datas.data;
                  if (this.myType.system == 1) {//1为安卓
                    for (let i = 0, len = data.length; i < len; i++) {
                      data[i].web_url = data[i].android_url;
                      data[i].web_pack = data[i].android_pack;
                      this.collectList.push(data[i]);
                      this.cancelList += data[i].id + ',';
                    }
                  }
                  if (this.myType.system == 2) {//2为IOS
                    for (let i = 0, len = data.length; i < len; i++) {
                      data[i].web_url = data[i].ios_url;
                      data[i].web_pack = data[i].ios_pack;
                      this.collectList.push(data[i]);
                      this.cancelList += data[i].id + ',';
                    }
                  }
                  this.page++;
                } else {
                  this.status = false;
                }
                setTimeout(() => {//保证1s的动画效果
                  this.loadAnimation = false;
                  this.loading = false;
                },1000);
              }
              if (datas.status == 1) {//1失败
                console.log('请求失败：' + datas.msg);
              }
              setTimeout(() => {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              },1000);
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        } else {
          this.loading = true;
          this.loadAnimation = false;
        }
      },
      //全部取消
      allCancel() { //收藏、取消游戏
        var cancelList = this.cancelList;
        if(cancelList){
          cancelList = cancelList.substring(0, cancelList.length - 1);
          this.$http.get('/www/api-game-collect', {
            params:{
              gid: cancelList,
              username: this.userInfo.username,
              system: this.myType.system,
              type: 2 // 1收藏，2取消
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){//0成功
                if(datas.msg == 'success'){
                  this.collectList = []; //清空列表
                  this.cancelList = '';
                } else {

                }
              }
              if(datas.status == 1){//1失败
                console.log('status == 1 ：'+ datas.msg);
              }
            })
            .catch(error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            });
        }
      },
      download(url){
          window.location.href = url;
      }
    },
    filters: {	//自定义局部过滤器
      download: (downloads) => {//过滤显示下载量
        let data = parseInt(downloads);
        if(data >= 10000) {
          data = parseInt(data/10000) + '万+';
        }
        return data + '下载'
      }
    }
  }
</script>

<style scoped lang="less">
  .collect{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .collect_list{
      flex: 1;
      overflow-y: auto;
      .sole{
        .sole-cont{
          .sole-cont-num{
            height: 1rem;
            display: flex;
            align-items: center;
          }
        }
        .collect_download{
          color: #f89d19;
          background-color: #fff;
          padding: .2rem 1.1rem;
          border-radius: .2rem;
          border: 1px solid;
        }
        .collect_download:link{ color: #f89d19; background-color: #fff; }
        .collect_download:visited{ color: #f89d19; background-color: #fff; }
        .collect_download:active{ color: #fff; background-color: #f89d19;}
      }
    }
  }
</style>
