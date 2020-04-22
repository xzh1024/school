/**
 * Created by Admin on 2019/2/11.
 */
import React, { Component } from 'react';
import Header from '../../components/header';
import Tabbar from '../../components/tabbar';

import './style.scss'

class User extends Component {
    render(){
        return(
            <div className="user">
                <Header title="用户中心" />
                <div className="main">user</div>
            </div>
        )
    }
}

export default Tabbar(User);