<template>
  <div class="text-font-copyright">
    <span>{{ copyrightOwner }} </span>
    <a
      :href="recordSystemWebsite"
      target="_blank"
      class="text-font-copyright"
      style="text-decoration: none;"
      >{{ recordNumber }}</a
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CopyrightLine",
  computed: {
    ...mapState("admin/user", [
      "copyrightOwner",
      "recordNumber",
      "recordSystemWebsite"
    ])
  }
};
</script>
