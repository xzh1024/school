<!--满 V 游戏-->
<template>
  <div class="fullV"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loading"
       infinite-scroll-distance="3">
    <!--页头-->
    <Head :head="head"></Head>
    <!--列表-->
    <div class="list">
      <VList :list="list"></VList>
      <!--加载动画-->
      <div v-show="loadAnimation">
        <mt-spinner type="triple-bounce" color="#888" style="height: 3rem; line-height: 3rem; text-align: center"></mt-spinner>
      </div>
    </div>
  </div>
</template>

<script>
  import Head from '../../../header/head.vue'
  import VList from '../../../list/list.vue'
  export default {
    data: function () {
      return {
        head: {
          title:"满V游戏",
          title_but: true
        },
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        loadAnimation : false//标记加载动画,false为隐藏
      }
    },
    components:{ Head, VList },
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path:'game_info/'+id})
      },
      loadMore() {
        if(this.status){
          this.loadAnimation = true;
          this.loading = true;
          this.$http.get("/www/api-game-gameType", {
            params: {
              page : this.page,
              channel : 185,
              system : this.myType.system,
              type : 4
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
                if(datas.data.length){
                  let data = datas.data;
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
                } else {
                  this.status = false;
                }
              }
              setTimeout(function () {//保证1s的动画效果
                this.loadAnimation = false;
                this.loading = false;
              }.bind(this),1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
          this.loading = true;
          this.loadAnimation = false;
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
    flex: 1;
    display: flex;
    flex-direction: column;
    .list{
      flex: 1;
      overflow-y: auto;
    }
  }
</style>


