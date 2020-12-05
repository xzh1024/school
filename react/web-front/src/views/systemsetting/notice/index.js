import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Menu } from 'element-react';
import './style.scss'

// export default class Index extends Component {
const MenuWrap = (WrappedComponent) => class MenuWrap extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="notice-title clearfix">
                    <div className="notice-title-icon">
                        后台管理系统
                    </div>
                    <div className="notice-title-menu">
                        <Menu defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                            <Menu.Item index="1">处理中心</Menu.Item>
                            <Menu.SubMenu index="2" title="我的工作台">
                                <Menu.Item index="2-1">选项1</Menu.Item>
                                <Menu.Item index="2-2">选项2</Menu.Item>
                                <Menu.Item index="2-3">选项3</Menu.Item>
                            </Menu.SubMenu>
                            <Menu.Item index="3">订单管理</Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className="notice-template clearfix">
                    <div className="notice-menu">
                        <Menu theme="dark" defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                            <Menu.SubMenu index="1" title={<span><i className="el-icon-message"></i>导航一</span>}>
                                <Menu.ItemGroup title="分组一">
                                    <Menu.Item index="1-1">选项1</Menu.Item>
                                    <Menu.Item index="1-2">选项2</Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup title="分组2">
                                    <Menu.Item index="1-3">选项3</Menu.Item>
                                </Menu.ItemGroup>
                            </Menu.SubMenu>
                            <Link to="/home" style={{color:'#bfcbd9'}}><Menu.Item index="2"><i className="el-icon-menu"></i>首页</Menu.Item></Link>
                            <Link to="/list" style={{color:'#bfcbd9'}}><Menu.Item index="3"><i className="el-icon-setting"></i>产品</Menu.Item></Link>
                        </Menu>
                    </div>
                    <div className="notice-content">
                        <WrappedComponent></WrappedComponent>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    onSelect() {

    }

    onOpen() {

    }

    onClose() {

    }

    componentDidMount() {
        //当组件输出到 DOM 后会执行 componentDidMount() 钩子
        console.log('创建后');
        console.log(this);
    }
}

export default MenuWrap;
