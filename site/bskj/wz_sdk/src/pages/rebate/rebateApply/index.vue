<template>
  <div class="container">
    <Header title="返利申请">
      <div slot="left">
        <span class="icon-left" @click="$router.go(-1);"></span>
      </div>
    </Header>
    <div class="main">
      <Field class="field" label="游戏名" placeholder="像素大厨" v-model="username" @update="updateUsername">
        <div slot="left" class="slot-left"><span class="icon icon-coin"></span></div>
        <!--<div slot="right" class="slot-right">-->
        <!--<span class="gray">充值</span>-->
        <!--<span class="icon-right"></span>-->
        <!--</div>-->
      </Field>
      <Field class="field" label="充值小号" placeholder="S7iu47589" v-model="phone" @update="updatePhone">
        <div slot="left" class="slot-left"><span class="icon icon-coin"></span></div>
      </Field>
      <Field class="field" label="充值时间" placeholder="2018-06-21">
        <div slot="left" class="slot-left"><span class="icon icon-coin"></span></div>
      </Field>
      <Field class="field" label="充值金额" placeholder="1896.3">
        <div slot="word-aux">&nbsp;元</div>
      </Field>

      <div class="">可申请金额：1144558元</div>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/header'
  import Field from '@/components/field'
export default {
  data () {
    return {
      username: '',
      phone: ''
    }
  },
  components:{ Header, Field },
  methods: {
    updateUsername(value){
      this.username = value;
    },
    updatePhone(value){
      this.username = value;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container{
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
      overflow-y: auto;
      background-color: #f3f3f3;
      .field{
        overflow: hidden;
        margin: 1em 1em 0;
        border-radius: .5rem;
      }
    }
  }
</style>
