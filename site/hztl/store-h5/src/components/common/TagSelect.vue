<template>
  <div>
    <van-tag
      v-for="(item, index) in tags"
      :key="index"
      :color="item.isActived ? isActivedBgColor : bgColor"
      round
      size="large"
      :class="item.isActived ? 'tag-item is-actived' : 'tag-item'"
      @click="() => onTagChange(item, tags)"
    >
      <div class="text-font" style="margin: auto;">
        {{ item.text }}
      </div>
    </van-tag>
  </div>
</template>

<script>
import Vue from "vue";
import { Tag } from "vant";

Vue.use(Tag);

export default {
  name: "TagSelect",
  model: {
    event: "change",
    prop: "value"
  },
  props: {
    value: "",
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      bgColor: "#f8f8f8",
			isActivedBgColor: "#00a8ea"
    };
  },
  computed: {
    tags() {
      return this.options.map(item => ({
        ...item,
        isActived: this.value === item.value
      }));
    }
  },
  methods: {
    onTagChange(tag, tags) {
			tags.forEach(item => {
				if (item.value === tag.value) {
					item.isActived = true;
				} else {
					item.isActived = false;
				}
      });
      this.$emit("change", tag.value);
		}
  }
}
</script>

<style lang="less" scoped>
.tag-item {
  margin-right: 10px;
	padding: 10px 10px;
	width: 80px;
  box-sizing: border-box;
  cursor: pointer;

	.text-font {
		color: #171c24;
	}
}
.is-actived {
	.text-font {
		color: #ffffff;
	}
}
</style>