<!--转游记录-->
<template>
  <div class="turnRecord"
       v-infinite-scroll="getRurnRecord"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <div v-for="v in turnList">
      <div class="TR_title border_f0f0f0">2018-02-27 16:26</div>
      <div class="TR_info">
        <div class="TR_one">
          <div class="TR_one_t" v-text="v.origin_appname"></div>
          <div class="TR_one_t"><i class="icon_arrow_d"></i></div>
          <div class="TR_one_t" v-text="v.new_appname"></div>
        </div>
        <div class="TR_one">
          <div class="TR_one_t" v-text="v.origin_servername"></div>
          <div class="TR_one_t"></div>
          <div class="TR_one_t" v-text="v.new_servername"></div>
        </div>
        <div class="TR_one TR_i">
          <div class="TR_one_t" v-text="v.origin_rolename"></div>
          <div class="TR_one_t"></div>
          <div class="TR_one_t" v-text="v.new_rolename"></div>
          <!--<img class="TR_audit" src="../../../../../static/img/64_icon_shz.png" alt="">-->

          <div class="TR_a">
            <img class="TR_audit" :src="v.statusImg" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--加载动画-->
    <div v-show="loadAnimation">
      <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
    </div>
	</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
  	data: function () {
      return {
        user: {
          icon_url: "",
          nick_name: "",
          user_id: 0
        },
        page: 1,
        turnList: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation: false//标记加载动画,false为隐藏
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ]),
    },
    created() {
      this.getRurnRecord();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {

			});
		},
    methods: {
      getRurnRecord() {
        if(this.status){
          this.loadAnimation = true;
          this.loading = true;
          var url = this.jointUrl({
            uid: this.userInfo.id,
            channel: this.myType.channel,
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          //申请转游记录
          this.$http.get('/api/index.php?g=api&m=changegame&a=log',{
            params: {
              uid: this.userInfo.id,
              channel: this.myType.channel,
              page: this.page,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(this.page >= datas.data.count){
                this.status = false;
              }
              if(datas.status == 1){//1成功
                let list = datas.data.list;
                for(let i=0,len=list.length; i < len; i++){
                  if (list[i].status == 1){//审核状态：1 审核成功 2审核中  3 失败
                    list[i].statusImg = '../../../../../static/img/62_icon_chenggong.png'
                  } else if(list[i].status == 2){
                    list[i].statusImg = '../../../../../static/img/64_icon_shz.png'
                  } else if(list[i].status == 3){
                    list[i].statusImg = '../../../../../static/img/61_icon_shibai.png'
                  } else {
                    return
                  }
                  this.turnList.push(list[i]);
                }
                this.page++;
              }
              if(datas.status == 0){//0失败
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
      }
    }
  }
</script>

<style scoped lang="less">
  .turnRecord{
    flex: 1;
    overflow-y: auto;
    .TR_title{
      padding: 0 .6rem;
      height: 2.5rem;
      line-height: 2.5rem;
    }
    .TR_info{
      border-bottom: 2px solid #f0f0f0;
      display: flex;
      .TR_one{
        flex: 1;
        /*height: 1.8rem;*/
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .TR_one_t{
          flex: 1;
          width: 100%;
          height: 1.6rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .TR_i{
        position: relative;
        .TR_a{
          position: absolute;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .TR_audit{
          width: 4rem;
          -webkit-transform: rotateZ(-30deg);
          -moz-transform: rotateZ(-30deg);
          -ms-transform: rotateZ(-30deg);
          -o-transform: rotateZ(-30deg);
          transform: rotateZ(-30deg);
        }
      }
    }
  }
</style>
