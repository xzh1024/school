<template>
  <div class="hello">
    <h1>Hello</h1>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
  import Api from '../utils/Api'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    console.log(Api);
    this.axiosData();
  },
  methods: {
    async axiosData(){
      const data = await Api.OldGet('/api-game-newIndex', {page: 1, platform: 1, system: 1, uid: 0});
      console.log(data);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
