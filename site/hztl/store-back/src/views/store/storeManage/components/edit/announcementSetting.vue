<template>
  <el-form
    class="form-label-top"
    size="small"
    label-position="top"
    :model="data"
  >
    <el-form-item
      label="公告内容："
      v-for="(item, index) in data.content"
      :key="index"
    >
      <el-input
        v-model.trim="item.content"
        maxlength="50"
        show-word-limit
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AnnouncementSetting",
  props: {
    data: Object
  }
};
</script>
