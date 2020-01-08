/**
 * Created by Admin on 2019/1/30.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../../static/iconfont/iconfont.css';
import './style.scss'

const tarbarArr = [
    {
        img: 'icon-home',
        text: '首页',
        link: '/home'
    },
    {
        img: 'icon-fenlei',
        text: '分类',
        link: '/category'
    },
    {
        img: 'icon-buoumaotubiao40',
        text: '购物车',
        link: '/car'
    },
    {
        img: 'icon-yonghu',
        text: '我的',
        link: '/user'
    }
]

class Tabbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0
        }
    }

    itemChange = (index) => {
        this.setState({
            index: index
        })
    }

// <Link to={v.link} key={i} className={'tarbar-item' + (this.state.index === i ? ' active' : '')} onClick={() => this.itemChange(i)}>
    render(){
        const url = window.location.href;
        return(
            <div className="tabbar">
                <div className="tabbar-content">
                    {
                        tarbarArr.map((v, i) => (
                                <Link to={v.link} key={i} className={'tarbar-item' + (url.indexOf(v.link) > -1 ? ' active' : '')} onClick={() => this.itemChange(i)}>
                                    <div className={'iconfont ' + v.img}></div>
                                    <div>{v.text}</div>
                                </Link>
                            )
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Tabbar;