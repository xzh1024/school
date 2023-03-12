<template>
  <div class='wz-field'>
    <!--<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>-->
    <div class="field">
      <!--<div class="left">-->
        <!--<slot name="left"></slot>-->
      <!--</div>-->
      <!--<div class="title">{{title}}</div>-->
      <!--<div class="right">-->
        <!--<slot name="right"></slot>-->
      <!--</div>-->

      <div class="field-item">
        <!--<label class="field-label">{{label}}</label>-->
        <div class="left">
          <slot name="left"></slot>
        </div>
        <div class="field-input-inline">
          <input class="field-input"
                 :type="type"
                 :placeholder=placeholder
                 :value="value"
                 :disabled="disabled"
                 ref="input"
                 @input="$emit('input', $event.target.value)">
          <!--@input="$emit('update', $event.target.value)"-->
          <i class="icon-clear" v-show="value && !disabled" @click="$emit('input', '')"></i>
        </div>
        <div class="left">
          <slot name="right"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wz-field',
    props: {
      placeholder: {
        type: String,
        default: () => {
          return '';
        }
      },
      value: {
        type: String,
        default: () => {
          return '';
        }
      },
      type: {
        type: String,
        default: () => {
          return 'text';
        }
      },
      disabled: {
        type: Boolean,
        default: () => {
          return false;
        }
      }
    },
    data () {
      return {
      };
    },
    created(){
//        console.log(this.placeholder);
    },
    methods: {
      handleInput(e) {
        this.$emit('input', e.target.value);
      }
    }
  };
</script>

<style lang='scss' scoped>
  .wz-field {
    .field {
      /*height: 3.5rem;*/
      /*display: flex;*/
      /*align-items: center;*/
      /*border-bottom: 1px solid #f3f3f3;*/
      /*line-height: 1rem;*/
      /*background-color: #fff;*/

      .field-item{
        height: 3.5rem;
        /*padding: 0 1em;*/
        display: flex;
        align-items: center;
        background-color: #fff;
        line-height: 2.5rem;
        .field-label{
          width: 5rem;
        }
        .field-input-inline{
          flex: 1;
          display: flex;
          align-items: center;
          .field-input{
            flex: 1;
            height: 2.5rem;
            border: none;
          }
        }
      }
    }
  }
</style>
