<template>
  <div class="list-view">
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="{ active: item[props.active] }"
      class="list-view-item"
      @click="itemClickHandle(item)"
    >
      {{ item[props.name] }}
      <i
        v-if="close"
        class="el-icon el-icon-close"
        @click.stop="deleteClickHandle(item, index)"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "ListView",
  prop: {
    data: {
      type: Array,
      default: []
    },
    props: {
      type: Object,
      default() {
        return {
          active: "active",
          name: "name"
        };
      }
    },
    close: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    itemClickHandle(item) {
      this.$emit("click", item);
    },
    deleteClickHandle(item) {
      this.$emit("delete", item);
    }
  }
};
</script>
<style lang="stylus" scoped>
.list-view-item {
	padding: 0 10px;
	line-height: 36px;

	i {
		display: none;
		float: right;
		line-height: 36px;
		color: #999;

		&:hover {
			color: #F56C6C;
		}
	}

	&:hover {
		background: #f2f2f2;

		i.el-icon-close {
			display: inline-block;
		}
	}
}

.list-view-item.active {
	background: #e8f0ff;
}
</style>
