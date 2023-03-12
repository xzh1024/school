<template>
  <div class="container-box" style="background:#fff;height:550px;">
    <div style="overflow-y: scroll;">
      <ConfirmOrder
        :confirmInfo="confirmInfo"
        :hideBtn="true"
        :isQuote="true"
        :enableEdit="false"
      />
    </div>
  </div>
</template>

<script>
import ConfirmOrder from "@/components/repair/confirmOrder/confirmOrder";
import { offersView } from "@/api/repairs/bills";
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
      enableEdit: false,
      confirmInfo: {},
      form: {}
    };
  },
  mounted() {
    if (this.billId) {
      this.getConfirmInfo({ id: this.billId, useBillToParam: true });
    }
  },
  methods: {
    getConfirmInfo(data) {
      offersView(data).then(res => {
        this.confirmInfo = res;
      });
    }
  }
};
</script>
