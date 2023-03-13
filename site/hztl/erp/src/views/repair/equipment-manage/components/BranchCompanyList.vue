<template>
  <ul ref="refUl" class="company-info-list">
    <li v-for="(item, index) in list" ref="refList" :key="index">
      <div :class="{ 'is-active': item.id === 9999 }" class="item-box">
        <div class="company-name ellipsis-text">
          {{ item.name }}{{ `(${tableLength})` }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BranchCompanyList",
  props: {
    tableLength: Number
  },
  data() {
    return {
      list: [
        {
          id: 9999,
          isOpened: true,
          name: "云诊车诊断仪"
        }
      ],
      num: this.tableLength
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/var";

.company-info-list {
  margin: 0;
  padding: 0;
  color: #778087;
  font-size: 14px;
  height: calc(100% - 10px);
  overflow: auto;

  li {
    position: relative;
    margin: 0;
    padding: 0;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background: #e8eaef;
    }

    .item-box {
      margin: 0;
      width: 100%;
      padding: 12px 10px;
      cursor: pointer;

      .company-name {
        text-align: left;
        max-width: 100%;
      }
    }

    .item-box.is-active {
      position: relative;
      color: #3aa7ff;
      @include font_color("color-primary");
      background: #c0e3ff;
      @include background_color("color-primary", 0.16);

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        background: #3aa7ff;
        @include background_color("color-primary");
      }
    }
  }
}
</style>
