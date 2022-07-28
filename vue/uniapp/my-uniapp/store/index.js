import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		// userName: "未登录用户"
		userName: uni.getStorageSync("userName") ? uni.getStorageSync("userName") : '未登录用户'
	},
	mutations: {
		MLOGIN(state, value) {
			uni.setStorageSync("userName", value);
			state.userName = value;
		},
		MLOGOUT(state) {
			// uni.removeStorageSync("userName");
			uni.clearStorageSync();
			state.userName = "退出状态用户";
		}
	},
	actions: {
		login(context, value) {
			context.commit('MLOGIN', value);
		},
		logout(context) {
			context.commit('MLOGOUT');
		}
	}
})

export default store;
