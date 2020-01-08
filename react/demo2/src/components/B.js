import React, { Component } from 'react';
// import d from './D'
import A from './A'

// @d
class B extends Component {
  // constructor(props){
  //   super(props);
  //
  //   this.state = {
  //     value: '1'
  //   }
  // }
  //
  // changeInput = (event) => {
  //   console.log(event.target.value);
  //   this.setState({
  //       value: event.target.value
  //   })
  // }

  render() {
    console.log(this.props);
    return (
      <div className="B">
        {/*<input type="text" value={this.state.value} onChange={this.changeInput} />*/}
        <input type="text" {...this.props} />
        <div>{this.props.value}</div>
        <div>姓名：{this.props.name}</div>
        <div>性别：{this.props.sex}</div>
        <div>年龄：{this.props.age}</div>
      </div>
    );
  }
}

// export default d(B);
export default A('提示')(B);
