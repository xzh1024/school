import Vue from 'vue'
import Vuex from 'vuex'
import request from "@/request";
import { getBase, getStoreInfo } from '@/api/common';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isCurCustomer: false,
    storeTel: "",
		base: {},
		storeInfo: {
			type: ""
		},
		mallUser: {
			theExCompany: false // 当前登录账号为B版本商城的主体公司
		}
	},
	actions: {
		async checkIsCurCustomer({ state }) {
			const res = await request({url: "/customers/store-check"});
			if (["not-agree", "not-exists"].includes(res.code)) {
				state.isCurCustomer = false;
			} else {
				state.isCurCustomer = true;
			}
			return res;
		},
		async getBase({ commit }) {
			const res = await getBase();
      if(res) {
        commit("setBase", res);
      }
		},
		// 商家信息
		async getStoreInfo({ commit }) {
			const res = await getStoreInfo();
      if(res) {
        commit("setStoreInfo", res);
      }
		},
		// 公众号H5商城/线上商城用户详情
		async getForMall({ commit }) {
			const res = await request({url: "/for-mall"});
			if(res) {
        commit("setForMall", res);
      }
		}
	},
	mutations: {
		getStoreTel(state, tel) {
			state.storeTel = tel;
		},
		getIsCurCurstomer(state, data){
			state.isCurCustomer = data;
		},
		setBase(state, data) {
      Object.assign(state.base, data);
    },
		setStoreInfo(state, data) {
      Object.assign(state.storeInfo, data);
    },
		setForMall(state, data) {
			Object.assign(state.mallUser, data);
		}
	}
})
