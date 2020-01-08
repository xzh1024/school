import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  //构造函数，是一个默认方法，通过 new 命令创建对象实例时，自动调用该方法
  constructor(props){
    /*
    *   ES6 要求，子类的构造函数必须执行一次 super 函数，否则会报错。
    *
    *   在 constructor 中必须调用 super 方法，因为子类没有自己的 this 对象，而是继承父类的 this 对象，
    *   然后对其进行加工,而 super 就代表了父类的构造函数。
    *   super 虽然代表了父类 A 的构造函数，但是返回的是子类 B 的实例，即 super 内部的 this 指的是 B，
    *   因此 super() 在这里相当于 ```A.prototype.constructor.call(this, props)``。
    *
    *   通过 super 调用父类的方法时，super 会绑定子类的 this。
    * */
    super(props);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.state = {
      inputValue: '',
      list: [
          'learn react',
          'learn english',
          'learn vue'
      ]
    };
  }

  handleBtnClick(){
    // alert('click');
    // let list = this.state.list;
    // list.push(this.state.value);

    // ... 展开运算符
    this.setState({
        list: [...this.state.list, this.state.inputValue],
        inputValue: ''
    });
  }

  handleInputChange(e){
    // console.log(e.target.value);
    this.setState({
        inputValue: e.target.value
    });
  }

  handleItemClick(index){
    const list = [...this.state.list];
    list.splice(index, 1);
    // this.setState({
    //     list: list
    // });
    this.setState({list});
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" value={this.state.inputValue} onChange={this.handleInputChange.bind(this)}/>
          <button onClick={this.handleBtnClick}>add</button>
        </div>
        <ul>
            {
              this.state.list.map((item, index) => {
                return <li key={index} onClick={this.handleItemClick.bind(this, index)}>{index}:{item}</li>
              })
            }
        </ul>
      </div>
    );
  }
}

export default TodoList;
