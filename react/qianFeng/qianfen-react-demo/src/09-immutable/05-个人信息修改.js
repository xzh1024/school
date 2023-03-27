import React, { Component } from 'react';
import { Map, List } from 'immutable';
export default class App extends Component {
  state = {
    info: Map({
      name: '张三',
      location: Map({
        province: '辽宁',
        city: '大连',
      }),
      favor: List(['读书', '看报', '写代码']),
    }),
  };
  render() {
    console.log(this.state.info.get('favor').toJS());
    return (
      <div>
        <h3>个人信息修改</h3>
        <button
          onClick={() => {
            this.setState({
              info: this.state.info
                .set('name', '张三疯')
                .set(
                  'location',
                  this.state.info.get('location').set('city', '沈阳')
                ),
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
                      info: this.state.info.set(
                        'favor',
                        this.state.info.get('favor').splice(index, 1)
                      ),
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
