<template>
  <section class="container-box">
    <communion-tab :key-scope="keyScope" />
  </section>
</template>

<script>
import CommunionTab from "./CommunionTab";
import { mapState } from "vuex";
import hotkeys from "hotkeys-js";

export default {
  name: "Communion",
  components: {
    CommunionTab
  },
  data() {
    return {
      keyScope: Symbol("communionCommuniontabList")
    };
  },
  computed: {
    ...mapState("admin/user", {
      openedPlatform: state => state.userInfoMsg.openedPlatform
    })
  },
  activated() {
    hotkeys.setScope(this.keyScope);
  },
  beforeDestroy() {
    hotkeys.deleteScope(this.keyScope);
  }
};
</script>
