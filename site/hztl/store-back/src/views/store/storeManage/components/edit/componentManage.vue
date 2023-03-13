<template>
  <draggable v-model="list">
    <div class="drag-item" v-for="(item, index) in list" :key="index">
      <i class="icon-menu"></i>
      <span class="content">{{ item.name }}</span>
      <i class="icon-Close-Circle-Fill" @click.stop="deleteItem(index)"></i>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "ComponentManage",
  props: {
    data: Object,
    previewList: Array
  },
  components: {
    draggable
  },
  computed: {
    list: {
      get: function() {
        return this.previewList;
      },
      set: function(newValue) {
        const list = JSON.parse(JSON.stringify(newValue));
        list.forEach(item => {
          if (item.detail.id) {
            delete item.detail.id;
          }
        })
        this.$emit("updatePreviewList", list);
      }
    }
  },
  methods: {
    deleteItem(index) {
      this.list.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.drag-item {
  height: 40px;
  margin-bottom: @margin-size-main;
  padding: 0 @padding-size-main;
  border: 1px solid @border-color-base;
  border-radius: 2px;
  display: flex;
  align-items: center;
  cursor: move;
  .icon-menu {
    font-size: 20px;
    color: @text-color-hint;
  }
  .content {
    flex: 1;
    margin-left: @margin-size-main;
  }
  .icon-Close-Circle-Fill {
    font-size: 20px;
    color: @text-color-hint;
    cursor: pointer;
  }
}
</style>
