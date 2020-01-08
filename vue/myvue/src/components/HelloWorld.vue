<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
  import Api from "../../utils/axios";
  export default {
      data () {
          return {
              data: ''
          }
      },
      name: 'HelloWorld',
      props: {
        msg: String
      },
      methods: {
          newIndex(data){
            console.log(data);
          },
          setJobs(response, target) {
              if (response && response.data.data.list) {
                  response.data.data.list.forEach(item => target.push(item));
              }
          },
          async setInfo(response) {
              if (response) {
                  let data = response.data.data;
                  this.info = data;
                  data.shopMap.shopInfo.forEach(v => {
                      let t = {
                          image: v.headPath,
                          name: v.nickName,
                          id: v.shopId,
                      };
                      this.sellers.list.push(t);
                  });
                  this.sellers.join.count = data.shopMap.shopNum;
                  this.sellers.join.has = data.shopMap.hasShop === 'YES';
                  this.sellers.join.description = data.shopMap.hasShop === 'YES' ? "我的商家" : "成为商家";
                  data.teamMap.teamInfo.forEach(v => {
                      let t = {
                          image: v.headPath,
                          name: v.nickName,
                          id: v.teamId,
                      };
                      this.leaders.list.push(t);
                  });
//                    debugger
                  this.leaders.join.count = data.teamMap.teamNum;
                  this.leaders.join.has = data.teamMap.hasTeam === 'YES';
                  this.leaders.join.description = data.teamMap.hasTeam === 'YES' ? "我的领队" : "成为领队";

              }
          },
      },
      async beforeRouteEnter(to, from, next) {
//          let p0 = Api.Index.recruit({city: "成都", page: 1, limit: 5, type: 'NEWEST'}).response();
//          let p1 = Api.Index.recruit({city: "成都", page: 1, limit: 5, type: 'HOTTEST'}).response();
//          let p2 = Api.Index.recruit({city: "成都", page: 1, limit: 5, type: 'RED_RESUME'}).response();
//          let p3 = Api.Index.recruit({city: "成都", page: 1, limit: 5, type: 'CX'}).response();
//          let p4 = Api.Index.Info().response();
//          let r = [];
//          r[0] = await p0;
//          console.log('---------------------');
//          console.log(r[0]);
//          r[1] = await p1;
//          r[2] = await p2;
//          r[3] = await p3;
//          r[4] = await p4;

          let data = Api.Index.data({page: 1, platform: 1, system: 1, uid: 0}).response();
          let datas = await data;

          next(vm => {
//              vm.setJobs(r[0], vm.jobs.newest);
//              vm.setJobs(r[1], vm.jobs.hottest);
//              vm.setJobs(r[2], vm.jobs.redBag);
//              vm.setJobs(r[3], vm.jobs.cx);
//              vm.setInfo(r[4]);
              vm.newIndex(datas);
          });
      },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
