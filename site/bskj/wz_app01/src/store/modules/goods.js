/*
 * 模块
 * */
import types from '../types.js'
// import $ from 'jquery'
import axios from 'axios';
// Vue.prototype.$http = axios;
//定义属性（数据）
var state = {
	goods:[]
}
//定义getters，用来获取属性
var getters = {
	goods(state){
		return state.goods;
	}
}
//定义actions，要执行的操作，如流程判断、异步请求等
const actions = {
    getGoods({commit, state}){
      axios.get('/api/index.php?g=api&m=userbox&a=get_user_info')
        .then(response => {
          var datas = response.data;
          console.log(datas);
          if(datas.tags){
	  				commit(types.GET_GOODS, datas.tags);
	  			}
        })
        .catch(error => {
          console.log('请求失败：' + error.status + '，' + error.statusText);
        });
    }
}
//定义mutations，处理状态（数据）的改变
const mutations = {
    [types.GET_GOODS](state,data){
    	state.goods = data;
    }
}

//导出store对象
export default {
	state,
	getters,
	actions,
	mutations
}
