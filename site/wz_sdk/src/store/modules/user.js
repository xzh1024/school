/*
 * 模块
 * */
import types from '../types.js'

//定义属性（数据）
var state = {
  user: { id:0 },
}
//定义getters，用来获取属性
var getters = {
  userData(state){
    return state.user;
  },
}
//定义actions，要执行的操作，如流程判断、异步请求等
const actions = {
  getUser({commit},data){
    if(data && (typeof data) === 'object'){
      commit(types.GET_USER, data);
    } else if(sessionStorage.getItem('wz_user_data') != null){
      let data = sessionStorage.getItem('wz_user_data');
      commit(types.GET_USER, JSON.parse(data));
    } else {
      console.log('getUser：no data');
    }
  },
  removeUser({commit}){
    commit(types.REMOVE_USER);
  },
  // setUser({commit},data){
    // if(sessionStorage.getItem('wz_user') != null){
    //   console.log('22222222');
    //   let userdata = JSON.parse(Base64.decode(sessionStorage.getItem('wz_user')));  //解密
    //
    //   for(let key in data){
    //     userdata[key] = data[key];
    //   }
    //   sessionStorage.setItem("wz_user", Base64.encode(JSON.stringify(userdata)));
    //   commit(types.SET_USER, userdata);
    // } else {
    //   console.log('setUser：no data');
    // }
  // }
}
//定义mutations，处理状态（数据）的改变
const mutations = {
  [types.GET_USER](state, data){
    state.user = data;
    sessionStorage.setItem("wz_user_data", JSON.stringify(data));
  },
  [types.REMOVE_USER](state){
    sessionStorage.removeItem('wz_user_data');
    state.user = { id:0 };
  },
  [types.SET_USER](state, data){
    state.user = data;
  }
}

//导出store对象
export default {
	state,
	getters,
	actions,
	mutations
}
