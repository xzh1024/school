<template>
  <el-form
    class="form-label-top"
    size="small"
    label-position="top"
    label-suffix="："
    :model="data"
  >
    <el-form-item>
      <el-checkbox v-model="data.h5">在手机端展示此组件</el-checkbox>
    </el-form-item>
    <el-form-item label="搜索方式">
      <el-checkbox
        v-for="(item, index) in typeList"
        :key="index"
        v-model="item.checked"
        :label="item.content"
      ></el-checkbox>
    </el-form-item>

    <el-form-item
      v-for="(item, index) in typeList"
      :key="index"
      :label="item.content"
      v-show="item.checked"
    >
      <el-input
        class="name-input"
        v-model.trim="item.content1"
        maxlength="8"
        placeholder="搜索方式名称"
      ></el-input>
      <el-input
        class="des-input"
        v-model.trim="item.content2"
        maxlength="20"
        placeholder="搜索框中的提醒文字"
      ></el-input>
      <div class="input-explain">{{ item.explain }}</div>
    </el-form-item>

    <el-form-item
      label="选择置顶的搜索方式"
      v-show="typeList.filter(item => item.checked).length"
    >
      <el-radio-group v-model="radio">
        <el-radio
          v-for="item in typeList"
          :key="item.content"
          :label="item.content"
          v-show="item.checked"
        >
          {{ item.content }}
        </el-radio>
      </el-radio-group>
      <div class="input-explain">
        说明：您选择的指定的搜索方式将展示在查询方式的第一个，请尽量选择您的客户最常用的查询方式
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SearchSetting",
  props: {
    data: Object
  },
  watch: {
    typeList: {
      handler: function(newValue) {
        let flag = false;
        const list = newValue.filter(item => {
          if (item.checked && !flag) {
            flag = this.radio === item.content;
          }
          return item.checked;
        });
        if (!flag) {
          if (list.length) {
            this.radio = list[0].content;
          } else {
            this.radio = "";
          }
        }
      },
      deep: true
    }
  },
  data() {
    return {
      radio: "",
      typeList: [
        {
          checked: false,
          // disabled: false,
          content: "VIN码",
          content1: "VIN码",
          content2: "请输入17位车架号",
          explain: "说明：用户输入17车架号自动解析出车型并通过车型查询商品"
        },
        {
          checked: false,
          // disabled: false,
          content: "OE号",
          content1: "OE号",
          content2: "请输入5位及以上的件号",
          explain: "说明：用户输入5位及以上的OE号或生产码查询商品"
        },
        {
          checked: false,
          // disabled: false,
          content: "关键字",
          content1: "关键字",
          content2: "请输入品牌\名称等关键字",
          explain: "说明：用户输入品牌或名称或车型或规格关键字查询商品"
        },
        {
          checked: false,
          // disabled: false,
          content: "车型",
          content1: "车型",
          content2: "请选择车型",
          explain: "说明：用户通过点选车型确定车型并通过车型查询商品"
        }
      ]
    };
  },
  updated() {
    this.changeData();
  },
  created() {
    let flag = true;
    this.data.content.forEach(item => {
      const nowType = this.typeList.find(type => type.content == item.content);
      if (nowType) {
        if (flag) {
          flag = false;
          this.radio = item.content;
        }
        nowType.checked = true;
        nowType.content1 = item.content1;
        nowType.content2 = item.content2;
      }
    });
  },
  methods: {
    changeData() {
      const list = new Array(1).fill("");
      this.typeList.forEach(item => {
        if (item.checked) {
          if (item.content === this.radio) {
            list[0] = {
              content: item.content,
              content1: item.content1,
              content2: item.content2
            };
          } else {
            list.push({
              content: item.content,
              content1: item.content1,
              content2: item.content2
            });
          }
        }
      });
      this.data.content = list;
    }
  }
};
</script>

<style lang="less" scoped>
.form-label-top {
  .el-form-item {
    .name-input {
      width: 126px;
    }
    .des-input {
      width: 274px;
      margin-left: @margin-size-secondary;
    }
  }
}
</style>
