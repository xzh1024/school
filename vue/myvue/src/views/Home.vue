<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <base-tab
      v-model="activeTabKey"
      align="center"
      @tab-click="handleTabClick"
      :beforeClick="beforeClick"
    >
      <base-tab-pane label="精选商品" :name="1">
        精选商品精选商品
      </base-tab-pane>
      <base-tab-pane label="全部商品" :name="2">
        全部商品全部商品
      </base-tab-pane>
    </base-tab>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import BaseTab from "@/components/base-tab/base-tab.vue";
import BaseTabPane from "@/components/base-tab/base-tab-pane.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    BaseTab,
    BaseTabPane,
  },
  data() {
    return {
      activeTabKey: 1,
    };
  },
  methods: {
    handleTabClick() {},
    beforeClick(key) {
      console.log(key);
      this.activeTabKey = key;
    },
  },
};
</script>
