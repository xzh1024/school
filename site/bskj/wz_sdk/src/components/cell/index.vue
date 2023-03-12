<template>
  <div class='wz-cell'>
    <div class="cell" :class="type">
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
    name: 'wz-cell',
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
//        console.log(this.title);
    },
    methods: {}
  };
</script>

<style lang='scss' scoped>
  .wz-cell {
    .cell {
      height: 4rem;
      padding: 0 1em;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f3f3f3;
      line-height: 1rem;
      background-color: #fff;
      overflow: hidden;
      .title {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        /*font-size: 1.2rem;*/
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
    }
  }
</style>
