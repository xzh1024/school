import axios from 'axios';
import {
  makeAutoObservable,
  makeObservable,
  observable,
  action,
  runInAction
} from 'mobx';
// configure({
//   enforceActions: 'always',
// });
// const store = observable(
//   {
//     isTabbarShow: true,
//     list: [],
//     cityName: '北京',
//     changeShow() {
//       this.isTabbarShow = true;
//     },
//     changeHide() {
//       this.isTabbarShow = false;
//     },
//   },
//   {
//     // 标记两个方法是action，专门修改可观察的value
//     changeHide: action,
//     changeShow: action,
//   }
// );

// experimentalDecorators
class Store {
  constructor() {
    // makeAutoObservable(this);
    makeObservable(
      //指向
      this,
      {
        //定义当前mobx类对象中数据类型
        isTabbarShow: observable,
        list: observable,
        changeShow: action,
        changeHide: action,
        getList: action
      }
    );
  }
  isTabbarShow = true;
  list = [];
  changeShow() {
    this.isTabbarShow = true;
  }
  changeHide() {
    this.isTabbarShow = false;
  }
  getList() {
    axios({
      method: 'get',
      url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7964413',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"16551164151371705180160001","bc":"110100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    })
      .then((res) => {
        runInAction(() => {
          this.list = res.data.data.cinemas;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

const store = new Store();

export default store;
