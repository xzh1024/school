<template>
  <div class="search-selected" v-show="list.length">
    <span class="selected-label">{{ label }}</span>
    <span class="selected-value" :title="list.join('、')">
      {{ list.join("、") }}
    </span>
    <i class="el-icon-error" @click="clearSelected"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component({ name: "SearchSelected" })
export default class SearchSelected extends Vue {
  @Prop() protected label!: string;
  @Prop({ default: () => [] }) protected list!: string[];
  @Emit("clearSelected")
  protected clearSelected() {
    return;
  }
}
</script>

<style lang="scss" scoped>
.search-selected {
  max-width: 200px;
  display: inline-block;
  box-sizing: border-box;
  height: 22px;
  line-height: 20px;
  padding: 0 $margin-size-main;
  border: $border-gray;
  border-radius: 2px;
  font-size: $font-size-12;
  display: flex;
  align-items: center;
  .selected-value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-icon-error {
    font-size: $font-size-14;
    margin-left: $margin-size-main;
    color: #a0a0a0;
    cursor: pointer;
  }
}
</style>
