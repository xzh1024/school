<template>
  <div class="container-box" style="background:#fff;height:550px;">
    <div style="overflow-y: scroll;">
      <ConfirmOrder
        :confirmInfo="confirmInfo"
        :hideBtn="true"
        :isQuote="false"
        :enableEdit="false"
      />
    </div>
  </div>
</template>

<script>
import ConfirmOrder from "@/components/repair/confirmOrder/confirmOrder";
import { settlesView } from "@/api/repairs/bills";
export default {
  props: {
    billId: {
      type: Number,
      default: 0
    }
  },
  components: {
    ConfirmOrder
  },
  watch: {
    billId: {
      handler(value) {
        if (value) {
          this.getConfirmInfo({ id: this.billId, useBillToParam: true });
        }
      },
      deep: true
    }
  },
  data() {
    return {
      confirmInfo: {}
    };
  },
  mounted() {
    if (this.billId) {
      this.getConfirmInfo({ id: this.billId, useBillToParam: true });
    }
  },
  methods: {
    getConfirmInfo(data) {
      settlesView(data).then(res => {
        this.confirmInfo = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.btns {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  margin-bottom: 10px 0;
  padding: 5px;
  border-radius: 2px;
  border-bottom: solid 1px #eee;
}
</style>
