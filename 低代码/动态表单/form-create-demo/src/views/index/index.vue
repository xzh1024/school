<template>
  <div>
    <form-create
      v-model="value"
      v-model:api="fApi"
      :rule="rule"
      :option="option"
    ></form-create>
  </div>
</template>

<script setup>
import { ref } from "vue";
//实例对象
const fApi = ref({});
//表单数据
const value = ref({});
//表单生成规则
const rule = ref([
  // {
  //   type: "input",
  //   field: "goods_name",
  //   title: "商品名称",
  // },
  {
    type: "datePicker",
    field: "created_at",
    title: "创建时间",
  },
  {
    type: "input",
    title: "商品名称",
    field: "goods_name",
    value: "",
    col: {
      span: 12,
      labelWidth: 150,
    },
    props: {
      type: "text",
    },
    validate: [
      { required: true, message: "请输入goods_name", trigger: "blur" },
      { max: 5, message: "最大长度5", trigger: "input" },
    ],
  },
]);
//组件参数配置
const option = ref({
  //表单提交事件
  onSubmit: function (formData) {
    alert(JSON.stringify(formData));
  },
});
</script>

<style lang="scss" scoped></style>
