/*
 * 模块
 * */
import Vue from 'vue'
import { Base64 } from 'js-base64';
import types from '../types.js'

// import axios from 'axios';
//定义属性（数据）
var state = {
  user:{ id:0 },
}
//定义getters，用来获取属性
var getters = {
  userInfo(state){
    return state.user;
  },
}
//定义actions，要执行的操作，如流程判断、异步请求等
const actions = {
  getUser({commit}){
    if(localStorage.getItem('sy185_user') != null){
      // let userStr = window.unescape(JSON.parse(localStorage.getItem('sy185_user')));
      let str = Base64.decode(localStorage.getItem('sy185_user'));  //解密
      // let userArr = userStr.split('&');
      // let user = {};
      // for(let i = 0; i < userArr.length; i++){
      //   let arr = userArr[i].split('=');
      //   user[arr[0]] = arr[1];
      // }
      let data = JSON.parse(str);
      // console.log(user);
      commit(types.GET_USER, data);
    } else {
      console.log('未设置用户信息');
    }
  },
  removeUser({commit}){
    commit(types.REMOVE_USER);
  },
  setUserMoney({commit, state}, data){
    commit(types.SET_USER_MONEY, data);
    // console.log(this.getters.userInfo.id);
  }
}
//定义mutations，处理状态（数据）的改变
const mutations = {
  [types.GET_USER](state,data){
    state.user = data;
  },
  [types.REMOVE_USER](state){
    state.user = { id:0 };
  },
  [types.SET_USER_MONEY](state,data){
    let str = Base64.decode(localStorage.getItem('sy185_user'));  //解密
    let userData = JSON.parse(str);
    for(let key in data){
      userData[key] = data[key];
    }
    console.log(userData)
    localStorage.setItem("sy185_user", Base64.encode(JSON.stringify(userData)));
    for(let key in data){
      console.log(state.user[key])
      console.log(data[key])
      state.user[key] = data[key];
      console.log(state.user)
    }
  }
}

//导出store对象
export default {
	state,
	getters,
	actions,
	mutations
}
