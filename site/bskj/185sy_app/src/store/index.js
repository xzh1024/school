import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters.js'
import actions from './actions.js'
import seller from './modules/seller.js'
import goods from './modules/goods.js'
import user from './modules/user.js'
import traUser from './modules/traUser.js'
import gameH5 from './modules/gameH5.js'

Vue.use(Vuex)

export default new Vuex.Store({
	getters,
	actions,
	modules: {
		seller,
		goods,
    user,
    traUser,
    gameH5
	}
})
