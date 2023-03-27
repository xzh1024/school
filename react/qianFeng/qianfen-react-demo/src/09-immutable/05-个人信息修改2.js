import React, { Component } from 'react';
import { fromJS } from 'immutable';
/**
 * 
 * Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。
 * Immutable 实现的原理是 Persistent Data Structure（持久化数据结构），也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。
 * 同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了Structural Sharing（结构共享），即如果对象树中一个
 * 节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。
 * 
 * **/
export default class App extends Component {
  state = {
    info: fromJS({
      name: '张三',
      location: {
        province: '辽宁',
        city: '大连',
      },
      favor: ['读书', '看报', '写代码'],
    }),
  };
  componentDidMount() {
    console.log(this.state.info);
  }
  render() {
    return (
      <div>
        <h3>个人信息修改</h3>
        <button
          onClick={() => {
            this.setState({
              info: this.state.info
                .setIn(['name'], '张三疯')
                .setIn(['location', 'city'], '沈阳'),
            });
          }}
        >
          修改
        </button>
        <div>
          {this.state.info.get('name')}
          <br />
          {this.state.info.get('location').get('province') +
            '-' +
            this.state.info.get('location').get('city')}
          <br />
          <ul>
            {this.state.info.get('favor').map((item, index) => (
              <li key={index}>
                *{item}
                <button
                  onClick={() => {
                    this.setState({
                      info: this.state.info.updateIn(['favor'], (list) => {
                        return list.splice(index, 1);
                      }),
                    });
                  }}
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
