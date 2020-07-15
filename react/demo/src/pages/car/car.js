/**
 * Created by Admin on 2019/2/11.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import Tabbar from '../../components/tabbar';
import OrderList from './OrderList';

import './style.scss'

class Car extends Component {
    render() {
        return (
            <div className="car">
                <Header title="购物车" />
                <div className="main">
                    <OrderList />
                </div>
            </div>
        )
    }
}

export default Tabbar(Car);

/**
 * Created by Admin on 2019/1/28.
 */
// import React,{ Component } from 'react';
// import Tabbar from '../../components/tabbar';
// // import OrderItem from '../OrderItem';
// import OrderItem from './OrderItem';
//
// // const data = [
// //     {
// //         "id": 1,
// //         "shop": "院落创意菜",
// //         "picture": "http://img.ivsky.com/img/tupian/t/201601/10/baixiangguo-005.jpg",
// //         "product": "百香果（冷饮）1扎",
// //         "price": 19.9,
// //         "ifCommented": false
// //     },
// //     {
// //         "id": 2,
// //         "shop": "院落创意菜",
// //         "picture": "http://img.ivsky.com/img/tupian/t/201601/10/baixiangguo-005.jpg",
// //         "product": "百香果（冷饮）1扎",
// //         "price": 19.9,
// //         "ifCommented": true
// //     }
// // ]
//
// class OrderList extends Component {
//     constructor(props){
//         super(props);
//
//         this.submitComments = this.submitComments.bind(this);
//         this.state = {
//             data: [
//                 {
//                     "id": 1,
//                     "shop": "院落创意菜",
//                     "picture": "http://img.ivsky.com/img/tupian/t/201601/10/baixiangguo-005.jpg",
//                     "product": "百香果（冷饮）1扎",
//                     "price": 19.9,
//                     "ifCommented": false
//                 },
//                 {
//                     "id": 2,
//                     "shop": "院落创意菜",
//                     "picture": "http://img.ivsky.com/img/tupian/t/201601/10/baixiangguo-005.jpg",
//                     "product": "百香果（冷饮）1扎",
//                     "price": 19.9,
//                     "ifCommented": true
//                 }
//             ]
//         };
//         // this.componentDidMount();
//     }
//
//     componentDidMount(){
//         fetch('/mock/orders.json').then(res => {
//             if(res.ok){
//                 // console.log(res);
//                 res.json().then(data => {
//                     this.setState({data});
//                 })
//             }
//         }).catch(err => {
//             console.log('err:');
//             console.log(err);
//         })
//     }
//
//     submitComments(index, comment, stars){
//         const data = [...this.state.data];
//         data[index].ifCommented = true;
//         data[index].comment = comment;
//         data[index].stars = stars;
//         this.setState({data});
//         console.log(this.state.data[index]);
//     }
//
//     render() {
//         return this.state.data.map((item, index) => {
//             return (
//                 <OrderItem
//                     comments={this.submitComments}
//                     key={index}
//                     data={item}
//                     index={index}
//                 />
//             )
//         })
//     }
// }
//
// export default Tabbar(OrderList);