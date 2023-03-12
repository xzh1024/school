<template>
  <ht-dialog
    :title="page.title"
    :visible.sync="dialogVisible"
    width="80%"
    top="8vh"
    class="dialog-body"
  >
    <div class="container" ref="container" v-html="page.content"></div>
  </ht-dialog>
</template>

<script>
import axios from "axios";
import eventBus from "@/event";
import { envConfig } from "envConfigPath";

export default {
  name: "ManualDialog",
  data() {
    return {
      page: "",
      modalShowContent: "",
      dialogVisible: false
    };
  },
  computed: {
    containerRef() {
      return this.$refs.container;
    }
  },
  created() {
    eventBus.$on("open-manual-dialog", id => {
      this.loadManual(id);
    });
  },
  methods: {
    loadManual(id) {
      this.modalShowContent = "";
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //直接调用线上接口展示手册对应章节
      axios({
        method: "get",
        url: envConfig.CrmApiUrl + "/manual/article-detail",
        params: {
          id
        }
      })
        .then(res => {
          loading.close();
          this.dialogVisible = true;
          this.$nextTick(() => {
            this.page = res.data.data;
            setTimeout(() => {
              this.containerRef.scrollTop = 0;
            }, 100);
          });
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>
<style scoped>
.container {
  height: 80vh;
  overflow-y: scroll;
}
</style>
