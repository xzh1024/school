<template>
  <div>
    <InsuranceInfo :encryptdData="encryptdData" :showHeader="false" />
  </div>
</template>
<script>
import qs from "qs";
import InsuranceInfo from "@/components/repair/insuranceInfo";
export default {
  name: "share-insurance",
  data() {
    return {
      encryptdData: ""
    };
  },
  components: {
    InsuranceInfo
  },
  created() {},
  mounted() {
    const query = qs.parse(location.search.substring(1));
    console.log(query);
    this.encryptdData = query.encryptdData;
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  background: #fff;
}

// // 手机
// @media screen and (max-width: 960px) {

// }
// // pc
// @media screen and (min-width: 959px) {

// }
.confirm-order-wrap {
  background: #fff;
  padding: 0 10px 10px;
  .confirm-table {
    .confirm-table-title {
      padding: 5px 10px;
      background: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .input-wrap {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          display: inline-block;
          width: 130px;
        }
      }
    }
    .confirm-table-content {
      .line {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        border-bottom: 1px dotted #333;

        .line-title {
          width: 120px;
        }
        .line-colums {
          text-align: right;
          width: 200px;
        }
      }
      .line:last-child {
        border-bottom: none;
      }
    }
    .sub-header {
      .line {
        border-bottom: 2px solid #333 !important;
      }
    }
  }
  .co-line {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    min-height: 25px;
    line-height: 25px;
    .co-label {
      width: 120px;
      font-weight: bold;
    }
  }
}
</style>
