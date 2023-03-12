<template>
  <div id="app" @click.once="setAudioMuted">
    <router-view />
  </div>
</template>
<script>
import { tokenLogin } from '@/api/commonService';
export default {
  mounted() {
    this.init();
  },
  destroyed() {
    sessionStorage.removeItem('Token');
    sessionStorage.removeItem('customerQueryObj');
  },
  methods: {
		async init() {
			let loginUrl = decodeURIComponent(location.href);

			let hasToken = loginUrl.indexOf('?token=') > -1 ? true : false;
			if (hasToken) {
				let Token = loginUrl.split("?token=")[1].split('&next=')[0];
				let params = {
					token: Token
				}
				let res = await tokenLogin(params);
				if (res) {
					let oldPath = sessionStorage.getItem('oldPath');
					let toPath = oldPath ? oldPath : '/workbench/initGuide';
					this.$store.dispatch('getBase');
					this.$store.dispatch('getShareInfo');
					this.$router.push(toPath);
				}
			}
			else {
				this.$store.dispatch('getBase');
				this.$store.dispatch('getShareInfo');
			}

		},
		setAudioMuted() {
      this.$store.commit('setAudioMuted');
    },
	}
}
</script>

<style lang="less">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: PingFangSC-Regular;
  // text-align: center;
  font-size: 14px;
  color: #333333;
  width: 100%;
  height: 100%;
}
</style>
