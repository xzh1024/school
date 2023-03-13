<!--满 V 游戏-->
<template>
  <div class="fullV"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        满V游戏
      </div>
      <div class="head_right"></div>
    </div>
    <!--列表-->
    <div class="list">
      <List :list="list" :type="1"></List>
      <!--加载动画-->
      <div v-show="loading">
        <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
      </div>
    </div>
  </div>
</template>

<script>
  import List from '../../../list/list.vue'
  export default {
    data: function () {
      return {
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
      }
    },
    components:{ List },
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path:'game_info/'+id})
      },
      loadMore() {
        if(this.status){
          this.loading = true;
          this.$http.get("/www/api-game-newGameType", {
            params: {
              page : this.page,
              channel : this.myType.channel,
              system : this.myType.system,
              platform : 1, //游戏平台,1BT服，2折扣服
              type : 4  //1新游,2热门,3排行,4满V,5最低折扣
            }
          })
            .then(response => {
              var datas = response.data;
              console.log(datas)
              if(datas.status == 0){
                if(datas.data.list.length){
                  let data = datas.data.list;
                  if(this.myType.system == 1){//1为Android
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].android_url;//下载地址
                      data[i].web_pack = data[i].android_pack;//包名
                      data[i].label = data[i].label.split(",");
                      this.list.push(data[i]);
                    }
                  }
                  if(this.myType.system == 2){//2为IOS
                    for(let i=0,len=data.length; i < len; i++) {
                      data[i].web_url = data[i].ios_url;
                      data[i].web_pack = data[i].ios_pack;
                      data[i].label = data[i].label.split(",");
                      this.list.push(data[i]);
                    }
                  }
                  this.page++;
                  console.log(this.list);
                } else {
                  this.status = false;
                }
              }
              setTimeout(() => this.loading = false,1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        }
      }
    },
    mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
      this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
        this.loadMore();
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .fullV{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .list{
      flex: 1;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>


