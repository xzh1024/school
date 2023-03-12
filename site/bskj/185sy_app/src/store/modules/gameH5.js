/*
 * 模块
 * */
import types from '../types.js'
// import axios from 'axios';
//定义属性（数据）
var state = {
  gameH5:'',
}
//定义getters，用来获取属性
var getters = {
  gameH5(state){
    return state.gameH5;
  },
}
//定义actions，要执行的操作，如流程判断、异步请求等
const actions = {
  // setGameUrl({commit, state},msg){
  //   commit(types.SET_GAME_URL, msg);
  // },
  getGameUrl({commit}){
    if(localStorage.getItem('sy185_h5game') != null){
      let str = Base64.decode(localStorage.getItem('sy185_h5game'));  //解密
      let data = JSON.parse(str);
      commit(types.GET_GAME_URL, data);
    } else {
      console.log('未设置h5信息');
    }
  },
}
//定义mutations，处理状态（数据）的改变
const mutations = {
  [types.GET_GAME_URL](state,data){
    state.gameH5 = data;
    // state.gameH5.appid = 1000;  //测试数据
    // state.gameH5.key = 'ce9660948c245bd6027153288ee12c13';  //测试数据
  },
}

//导出store对象
export default {
	state,
	getters,
	actions,
	mutations
}
