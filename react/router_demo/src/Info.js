import React, { Component } from 'react';
import {withRouter, Link, NavLink} from 'react-router-dom'
import './Info.css'

class Info extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
  }

  componentDidMount() {
    console.log(this.props.children)
  }

  handleClick() {
    // this.props.history.push('/info/man');
    this.props.history.push(
      {
        pathname : '/info/man',
        query : { type: 'sex'}
      }
    );
  }

  goWoman = () => {
    // this.props.history.push('/info/woman');
    this.props.history.push(
      {
        pathname : '/info/woman',
        state : { type: 'sex'}
      }
    );
  }

  render () {
    const man = { pathname: '/info/man', state: { type: 'sex' } };
    const woman = { pathname: '/info/woman', state: { type: 'sex' } };
    return (
      <div>
        <h1>我是详情</h1>
        <h2>以下是可变内容</h2>
        <span onClick={this.handleClick}>嵌套路由1</span>
        <span onClick={this.goWoman}>嵌套路由2</span>
        <Link to={man}>嵌套路由1</Link>
        <Link to={woman}>嵌套路由2</Link>
        <NavLink to="/info/man" activeStyle={{color:'#FFFF00'}}>嵌套路由1</NavLink>
        <NavLink to="/info/woman" activeClassName="yellow">嵌套路由2</NavLink>
        {this.props.children}
      </div>
    )
  }
}

/*
  withRouter的作用就是, 如果我们某个东西不是一个Router, 但是我们要依靠它去跳转一个页面,
  比如点击页面的logo, 返回首页, 这时候就可以使用withRouter来做.
  一定要用withRouter绑定到组件上不然组件上是没有this.props.children.history这个方法的,
  这样就不能通过js的方法this.props.children.history(pathname : '/info')跳转
*/
export default withRouter(Info)