/*
 * 模块
 * */
import types from '../types.js'
// import $ from 'jquery'
import axios from 'axios';
//定义属性（数据）
var state = {
	seller:{},
	detailShow:false
}
//定义getters，用来获取属性
var getters = {
	seller(state){
		return state.seller;
	},
	detailShow(state){
		return state.detailShow;
	}
}
//定义actions，要执行的操作，如流程判断、异步请求等
const actions = {
    getSeller({commit, state}){
//     	$.ajax({
// 	  		url:'https://api.douban.com/v2/book/1220562',
// 	  		type:'GET',
// 	  		dataType:'JSONP',
// 	  		success: function(req){
// 	  			console.log(req);
// //	  			state.seller = req.tags
// //	  			console.log(state.seller);
// 	  			if(req.tags){
// 	  				commit(types.GET_SELLER, req.tags);
// 	  			}
// 	  		}
// 	  	});
      axios.get('https://api.douban.com/v2/book/1220562')
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
    },
    showDetail({commit}){
    	commit(types.SHOW_DETAIL)
    },
    hideDetail({commit}){
    	commit(types.HIDE_DETAIL)
    }
}
//定义mutations，处理状态（数据）的改变
const mutations = {
    [types.GET_SELLER](state, data){
    	state.seller = data
    },
    [types.SHOW_DETAIL](state){
    	state.detailShow = true;
    },
    [types.HIDE_DETAIL](state){
    	state.detailShow = false;
    }
}

//导出store对象
export default {
	state,
	getters,
	actions,
	mutations
}
