<template>
  <!--<div id="app">-->
  <!--<img src="./assets/logo.png">-->
  <!--<div>-->
  <!--<p>-->
  <!--If Element is successfully added to this project, you'll see an-->
  <!--<code v-text="'<el-button>'"></code>-->
  <!--below-->
  <!--</p>-->
  <!--<el-button>el-button</el-button>-->
  <!--</div>-->
  <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--</div>-->
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!--<router-view></router-view>-->
    <keep-alive exclude="no_keep">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  // import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'app',
    // components: {
    //   HelloWorld
    // }
  }
</script>

<style>
  *{ margin: 0; padding: 0;}
  html, body{
    width: 100%;
    height: 100%;
  }
  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/

    width: 100%;
    height: 100%;
  }
</style>
