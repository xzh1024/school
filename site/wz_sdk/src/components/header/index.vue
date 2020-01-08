<template>
  <div class='wz-header'>
    <div class="header" :class="type">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="title">{{title}}</div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wz-header',
    props: {
      title: {
        type: String,
        default: () => {
          return '';
        }
      },
      type: {
        type: String,
        default: () => {
          return 'default';
        }
      }
    },
    data () {
      return {
      };
    },
    created(){

    },
    methods: {}
  };
</script>

<style lang='scss' scoped>
  .wz-header {
    .header {
      padding: 0 1em;
      display: flex;
      justify-content: space-between;
      height: 2.8rem;
      line-height: 2.8rem;
      font-size: 0.8rem;
      border-bottom: 1px solid #eee;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.2rem;
      }
      &.primary {
        background: #1BB5F1;
        color:#fff;
        border: 0;
      }
      &.danger {
        background: #ef4f4f;
        color:#fff;
        border: 0;
      }
      .left,.right{
        div{
          height: 100%;display: flex; justify-content: center; align-items: center;
        }
      }
    }
  }
</style>
