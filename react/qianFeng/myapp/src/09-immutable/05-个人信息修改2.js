import React, { Component } from 'react';
import { fromJS } from 'immutable';
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
