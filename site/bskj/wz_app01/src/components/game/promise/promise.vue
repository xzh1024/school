<!--承诺-->
<template>
  <div class="promise">
    <div>
      <img :src="pic" alt="" width="100%">
    </div>
    <div class="promise_list">
      <div class="promise_one" v-for="v in list">
        <div class="promise_one_title color_636363">{{ v.title }}</div>
        <div class="promise_one_cont">
          <span class="color_999999" v-html="v.content"></span>
          <a target="_blank" @click="openQQ(v.qq)">{{ v.qq }}</a>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  export default {
  	data: function () {
      return {
        pic: '',
        list: []
      }
    },
    created() {
      this.getPromise();
		},
		mounted(){
			this.$nextTick(function () {

			});
		},
    methods: {
      openQQ(qq){
        let kefu101 = 'http://wpa.qq.com/msgrd?v=3&uin='+qq+'&site=oicqzone.com&menu=yes';
        let kefu102 = 'mqqwpa://im/chat?chat_type=wpa&uin='+qq+'&version=1&src_type=web&web_src=oicqzone.com';
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) || /(Android)/i.test(navigator.userAgent)) {
          window.open(kefu102);
        }else {
          window.open(kefu101);
        }
      },
      //App承诺
      getPromise() {
        var url = this.jointUrl({
          channel: this.myType.channel
        });
        var mySign = md5(url + this.myType.key1).toLowerCase();
        this.$http.get('/api/index.php?g=api&m=userbox&a=app_promise', {
          params:{
            channel: this.myType.channel,
            sign: mySign
          }
        })
          .then(response => {
            var datas = response.data;
            console.log(datas)
            if(datas.status == 1){//1成功
              let list = datas.data.list;
              for(let i=0,len=list.length; i < len; i++){
                list[i].content = list[i].content.replace("|||", '<br /><span class=color_636363>');
                list[i].content += '</span>';
//                console.log(list[i].content)
              }
              this.list = list;
              this.pic = datas.data.pic;
            }
            if(datas.status == 0){//0失败
              console.log('status == 1 ：'+ datas.msg);
            }
          })
          .catch(error => {
            console.log('请求失败：' + error.status + '，' + error.statusText);
          });
      }
    }
  }
</script>

<style scoped lang="less">
  .promise{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .promise_list{
      padding: 1.5rem 1rem;
      .promise_one{
        padding-bottom: 1.5rem;
        .promise_one_title{
          font-size: 1.2rem;
          height: 1.6rem;
          line-height: 1.6rem;
        }
        .promise_one_cont{
          line-height: 1.4rem;
          margin: .2rem 0;
          a{ color: #29a1f7;}
          a:link{ color: #29a1f7;}
          a:visited{ color: #29a1f7;}
          a:hover{ color: #29a1f7;}
        }
      }
    }
  }
</style>
