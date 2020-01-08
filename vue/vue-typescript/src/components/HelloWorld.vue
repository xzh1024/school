<template>
  <div @click="onChildChanged">
    <p>{{ $t("music") }}</p>
    <p>{{ $t("findMusic") }}</p>
    <p>{{ $t("myMusic") }}</p>
    <p>{{ $t("friend") }}</p>
    <p>{{ $t("musician") }}</p>
    <p>{{ $t("download") }}</p>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  // @Prop() private lang: string = 'zh-CN';
  private lang = 'zh-CN';
  onChildChanged() {
    console.log(this);
    if ( this.lang === 'zh-CN' ) {
        this.lang = 'en-US';
        this.$i18n.locale = this.lang;//关键语句
    } else {
        this.lang = 'zh-CN';
        this.$i18n.locale = this.lang;//关键语句
    }
  }

  created(){
    console.log(this.$i18n && this.$i18n.t);
  }
  mounted(){
    
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
