<!--分类详情-->
<template>
  <div class="classInfo">
    <!--页头-->
    <div class="head border_eee">
      <div class="head_left">
        <a class="icon_left_black" @click="$router.go(-1);"></a>
      </div>
      <div class="head_center">
        <span v-text="title"></span>
      </div>
      <div class="head_right"></div>
    </div>
    <!--列表-->
    <div class="list"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="3">
      <ListClassInfo :list="list" :type="$route.params.type"></ListClassInfo>
      <!--加载动画-->
      <div v-show="loading">
        <mt-spinner type="triple-bounce" class="loadAnimation"></mt-spinner>
      </div>
    </div>
	</div>
</template>
<script>
	import ListClassInfo from '../../../list/list.vue'
  export default {
    name: 'no_keep',
  	data: function () {
      return {
        page: 1,
        list: [],
        status: true,//标记是否继续请求数据 true为继续
        loading: true,//若为真，则无限滚动不会被触发
        title: ''
      }
    },
    created() {
      this.title = this.$route.params.name;
		},
    components: { ListClassInfo },
		mounted(){//mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
			this.$nextTick(function () {//在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
				this.loadMore();
			});
		},
    methods: {
      router(id) {   //跳转路由
        this.$router.push({path:'/game_info/'+id})
      },
      loadMore() {
        if(this.status){
          this.loading = true;
          this.$http.get("/www/api-game-gameClassInfo", {
            params: {
              page : this.page,
              channel : 185,
              system : this.myType.system,
              platform: this.$route.params.type,  //游戏平台,1BT服，2折扣服
              classId : this.$route.params.id
            }
          })
            .then(response => {
              var datas = response.data;
              if(datas.status == 0){
                if(datas.data.length){
                  var data = datas.data;
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
              setTimeout(() => {//保证1s的动画效果
                this.loading = false;
              },1000);
            }, error => {
              console.log('请求失败：' + error.status + '，' + error.statusText);
            })
        } else {
          this.loading = true;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .classInfo{
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .list{
      flex: 1;
      overflow-y: auto;
    }
  }
</style>
