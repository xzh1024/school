/**
 * Created by Admin on 2019/2/11.
 */
import React, { Component } from 'react';
import Tabbar from '../../components/tabbar';

import './style.scss'

class User extends Component {
    render(){
        return(
            <div className="user">
                <div className="main">user</div>
                <Tabbar></Tabbar>
            </div>
        )
    }
}

export default User;