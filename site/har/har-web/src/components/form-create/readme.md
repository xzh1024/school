# form create designer

组件实现设计参考 [form create](http://form-create.com/v3/arco-design/)

# 使用

因为组件中所使用的 acro-design 相关组件需要提前引入(非自动按需引入),所以需要提前引入
引入方法如下:
<code>
import AcroUI from './utils/components';
import { install } from '@/components/form-create';
Vue.use(AcroUI);
</code>

使用方法如下:
<code>
<template>
<fc-designer ref="designer" @save="onSave" />
</template>

<script lang="ts" setup>
  function onSave(params) {
    console.log(params);
  }
</script>
</code>

# 如何使用设计表单

<code>
<template>
  <ViewForm :rule="params.rule" :option="params.option" />
</template>

<script lang="ts" setup>
  import formCreate from '@/components/form-create';
  const ViewForm = viewForm.$form();
</script>
</code>

# 数据结构

<code>
{
  form: {
    form: {
      // arco design form 相关配置
    },
    resetBtn: boolean, // 是否显示重置按钮
    submitBtn: boolean // 是否显示提交按钮
  },
  rule: [
    {
     type: 'a-input', // 组件名
     field: '', // 表单字段名
     title: '', // 表单label 显示名称
     value: '', // 值,
     props: {
      // 组件相关配置
     }
    }
  ]
}
</code>
