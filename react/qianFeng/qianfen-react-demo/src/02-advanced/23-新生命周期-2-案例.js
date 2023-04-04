import React, { Component } from 'react';

export default class App extends Component {
  state = {
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  };

  myRef = React.createRef();

  getSnapshotBeforeUpdate() {
    console.dir(this.myRef.current);
    console.log('scrollHeight:', this.myRef.current.scrollHeight); // 网页正文全文高
    console.log('clientHeight:', this.myRef.current.clientHeight); // 网页可见区域高
    console.log("offsetHeight:" , this.myRef.current.offsetHeight); // 网页可见区域高（包括边线的高）
    console.log('scrollTop:', this.myRef.current.scrollTop); // 网页被卷去的高
    return this.myRef.current.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, value) {
    this.myRef.current.scrollTop += this.myRef.current.scrollHeight - value;
  }

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              // list: [...new Array(10).fill(7), ...this.state.list],
              list: [
                20,
                19,
                18,
                17,
                16,
                15,
                14,
                13,
                12,
                11,
                10,
                ...this.state.list,
              ],
            })
          }
        >
          来邮件
        </button>
        <h3>邮箱应用</h3>
        <div
          ref={this.myRef}
          id="box"
          style={{
            height: '200px',
            padding: '10px',
            border: '1px solid red',
            overflow: 'auto',
          }}
        >
          <ul>
            {this.state.list.map((item, index) => (
              <li
                key={index}
                style={{ height: '100px', backgroundColor: 'yellow' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
