<template>
  <ht-dialog
    v-bind="$attrs"
    title="累计"
    width="672px"
    top="7vh"
    append-to-body
    v-on="$listeners"
  >
    <div class="content">
      <p v-for="item in ACCUMULATION" :key="item.label">
        <span class="label_back">{{ item.label }}</span>
        <span
          >{{ item.prepend }}{{ showData[item.key] ? showData[item.key] : 0
          }}{{ item.append }}</span
        >
      </p>
    </div>
  </ht-dialog>
</template>
<script>
import { ACCUMULATION } from "../../group";
export default {
  name: "AccumulationBox",
  data() {
    return {
      showData: {},
      ACCUMULATION
    };
  },
  watch: {
    "$attrs.visible"(value) {
      if (value) {
        this.showData = JSON.parse(JSON.stringify(this.$attrs.data));
        for (const item of this.ACCUMULATION) {
          if (item.append) {
            this.showData[item.key] = (
              Number(this.showData[item.key] || 0) * 100
            ).toFixed(2);
          } else if (item.prepend) {
            this.showData[item.key] = Number(
              this.showData[item.key] || 0
            ).toFixed(2);
          }
        }
      }
    }
  },
  methods: {
    cancelHandle() {
      this.$emit("update:visible", false);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  overflow: hidden;
  width: 100%;
  p {
    margin: 0;
    float: left;
    width: 50%;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #d6d6d6;
    span {
      display: inline-block;
      width: 50%;
      height: 100%;
      padding-left: 10px;
      border-right: 1px solid #d6d6d6;
    }
  }
  span:nth-child(4n + 1) {
    border-left: 1px solid #d6d6d6;
  }
  p:nth-child(2n) {
    span:nth-child(1) {
      border-left: none;
    }
  }
  p:nth-child(1) {
    border-top: 1px solid #d6d6d6;
  }
  p:nth-child(2) {
    border-top: 1px solid #d6d6d6;
  }
  .label_back {
    background: #f9fdff;
  }
}
</style>
