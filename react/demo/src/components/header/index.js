/**
 * Created by Admin on 2019/2/28.
 */
import React, { Component } from 'react';
import propTypes from 'prop-types';
import './style.scss'

class Header extends Component {

    //类型检测
    static propTypes = {
        title: propTypes.string.isRequired
    }

    //指定props的默认值，这个方法只有浏览器编译以后才会生效
    // static defaultProps = { 
    //     title: '首页'
    // }

    render(){
        return (
            <div className="header">{this.props.title}</div>
        )
    }

}

//指定props的默认值，这个方法会一直生效
Header.defaultProps = {
    title: '首页'
};

export default Header;
