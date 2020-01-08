/*
 * 模块
 * */
import types from '../types.js'
// import axios from 'axios';
//定义属性（数据）
var state = {
  traUser:null,
}
//定义getters，用来获取属性
var getters = {
  traUserInfo(state){
    return state.traUser;
  },
}
//定义actions，要执行的操作，如流程判断、异步请求等
const actions = {
  getTraUser({commit}){
    if(localStorage.getItem('sy185_tra_user') != null){
      let str = Base64.decode(localStorage.getItem('sy185_tra_user'));  //解密
      let data = JSON.parse(str);
      commit(types.GET_TRA_USER, data);
    } else {
      console.log('未设置交易用户信息');
    }
  },
  removeTraUser({commit}){
    // document.cookie = "sy185_tra_user=" + encodeURIComponent('') + ";path=/";
    // if(localStorage.getItem('sy185_tra_user') != null){
    //   localStorage.removeItem('sy185_tra_user');
    //   commit(types.REMOVE_TRA_USER);
    // }
    commit(types.REMOVE_USER);
  },
}
//定义mutations，处理状态（数据）的改变
const mutations = {
  [types.GET_TRA_USER](state,data){
    state.traUser = data;
  },
  [types.REMOVE_TRA_USER](state){
    state.traUser = null;
  }
}

//导出store对象
export default {
	state,
	getters,
	actions,
	mutations
}
