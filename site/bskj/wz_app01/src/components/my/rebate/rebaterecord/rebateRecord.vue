<!--返利记录-->
<template>
  <div class="rebateRecord">
    <!--<div>-->
      <!--<div class="re_time color_757575 border_f0f0f0">2017-10-24 10:48</div>-->
      <!--<div class="re_c border_dcdcdc">-->
        <!--<div class="re_li flex3">武侠大宗师</div>-->
        <!--<div class="re_li flex2">1区</div>-->
        <!--<div class="re_li flex3">成王败寇A</div>-->
        <!--<div class="re_li flex2">105</div>-->
        <!--&lt;!&ndash;<div class="re_li flex2 color_757575">10:48</div>&ndash;&gt;-->
        <!--<img class="TR_audit" src="../../../../../static/img/63_icon_dsh.png" alt="" alt="">-->
      <!--</div>-->
    <!--</div>-->
    <!--<div>-->
      <!--<div class="re_time color_757575 border_f0f0f0">2017-10-24 10:48</div>-->
      <!--<div class="re_c border_dcdcdc">-->
        <!--<div class="re_li flex3">群英传</div>-->
        <!--<div class="re_li flex2">1区</div>-->
        <!--<div class="re_li flex3">成王败寇A</div>-->
        <!--<div class="re_li flex2">105</div>-->
      <!--</div>-->
    <!--</div>-->
    <div v-for="v in rebateList">
      <div class="re_time color_757575 border_f0f0f0" v-text="v.create_time"></div>
      <div class="re_c border_dcdcdc">
        <div class="re_li flex3" v-text="v.gamename"></div>
        <div class="re_li flex2" v-text="v.servername"></div>
        <div class="re_li flex3" v-text="v.rolename"></div>
        <div class="re_li flex2" v-text="v.game_coin"></div>
        <img class="TR_audit" :src="v.statusImg" alt="">
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
        page: 1,
        rebateList:[],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation: false//标记加载动画,false为隐藏
      }
    },
    computed: { //计算属性
      ...mapGetters([
        'userInfo'
      ])
    },
    created() {
      this.getRebateRecord();
		},
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {

			});
		},
    methods: {
      //返利记录
      getRebateRecord(){
        if(this.status) {
          this.loadAnimation = true;
          this.loading = true;
          var url = this.jointUrl({
            uid: this.userInfo.id,
            page: this.page
          });
          var mySign = md5(url + this.myType.key1).toLowerCase();
          this.$http.get('/api/index.php?g=api&m=selfRebate&a=rebateRecord',{
            params: {
              uid: this.userInfo.id,
              page: this.page,
              sign: mySign
            }
          })
            .then(response => {
              var datas = response.data;
              if(this.page >= datas.count){
                this.status = false;
              }
              this.page++;
              if(datas.status == 1){//1成功
                if(datas.rebate){
                  let rebate = datas.rebate;
                  for(let i=0,len=rebate.length; i < len; i++){
                    rebate[i].create_time = this.myType.formatTimeS(rebate[i].create_time);
                    if (rebate[i].status == 1){//状态，1完成2未处理3失败
                      rebate[i].statusImg = '../../../../../static/img/62_icon_chenggong.png'
                    } else if(list[i].status == 2){
                      rebate[i].statusImg = '../../../../../static/img/63_icon_dsh.png'
                    } else if(list[i].status == 3){
                      rebate[i].statusImg = '../../../../../static/img/61_icon_shibai.png'
                    }
                    this.rebateList.push(rebate[i]);
                  }
                } else {//没有返利记录

                }
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
  .rebateRecord{
    flex: 1;
    overflow-y: auto;
    .TR_audit{
      position: absolute;
      right: 3rem;
      z-index: 10;
      width: 4rem;
      -webkit-transform: rotateZ(-30deg);
      -moz-transform: rotateZ(-30deg);
      -ms-transform: rotateZ(-30deg);
      -o-transform: rotateZ(-30deg);
      transform: rotateZ(-30deg);
    }
    .re_t{
      background-color: #fff;
      height: 2.8rem;
      padding: 0 4.8rem 0 .8rem;
      display: flex;
      align-items: center;
      .re_th{
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        font-weight: bold;
        /*display: flex;*/
        /*text-align: center;*/
        /*justify-content: center;*/
      }
    }
    .re_c{
      background-color: #fff;
      height: 4rem;
      padding: 0 .8rem;
      display: flex;
      align-items: center;
      position: relative;
      .re_li{
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
      .btn_apply{
        width: 4rem;
        height: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        color: #29a1f7;
        border: 1px solid #29a1f7;
        border-radius: .9rem;
      }
    }
    .re_time{
      padding: 0 .8rem;
      height: 2.2rem;
      line-height: 2.2rem;
    }
  }
</style>
