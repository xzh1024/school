<template>
  <a class="icon-phone-gradient" :href="`tel:${storeInfo.phone}`"></a>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'IconPhone',
  computed: {
    ...mapState({
      storeInfo: state => state.storeInfo,
    }),
  },
};
</script>

<style lang="less" scoped>
.icon-phone-gradient {
  display: inline-block;
  width: 27px;
  height: 27px;
  background: url('../../img/icon-phone-gradient.png') no-repeat;
  background-size: 100% 100%;
  margin-right: 8px;
}
</style>
