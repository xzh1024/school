<template>
  <div class='wz-panel'>
    <div class="panel" :class="type">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wz-panel',
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
  .wz-panel {
    .panel {
      /*height: 4rem;*/
      padding: 1em;
      display: flex;
      align-items: center;
      line-height: 1rem;
      border-bottom: 1px solid #f0f0f0;
      background-color: #fff;
      overflow: hidden;
      .content {
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
