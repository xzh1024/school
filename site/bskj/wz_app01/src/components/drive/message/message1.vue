<template> <!--消息-->
	<div class="hot">
    <div class="content" :style="{height: contentH + 'px'}" ref="wrapper" @scroll="scrollEvent()">
      <mt-loadmore class="LoadMore" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
        <div class="item" v-for="(index, elem) in dataArray" @click="itemClick(index, elem)">
          <p class="itemP">item_{{index}}</p>
        </div>
      </mt-loadmore>
    </div>
	</div>
</template>

<script>
  export default {
    data: function () {
        return {
          contentH: '',
          dataArray: [0, 1, 2, 3, 4, 5]
        }
    },
    mounted() {
      // mint-ui loadmore组件需要包裹，且内容高度要高于包裹才可加载更多，所以这时给包裹层 一个指定的高度
      this.contentH = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    methods:{
      // 下拉刷新
      loadTop() {
        let that = this;
        setTimeout(function() {
          that.dataArray = [0, 1, 2, 3, 4, 5];
          that.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
      // 上拉加载更多
      loadBottom() {
        let that = this;
        setTimeout(function() {
          let tempArray = [];
          let lastItem = that.dataArray[that.dataArray.length - 1];
          for (let i = 0; i < 6; i ++) {
            that.dataArray.push(i + lastItem + 1);
          }
          that.$refs.loadmore.onBottomLoaded();
        }, 1500);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hot{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>

