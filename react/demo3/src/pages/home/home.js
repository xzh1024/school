/**
 * Created by Admin on 2019/2/11.
 */
import React, { Component } from 'react';
import Tabbar from '../../components/tabbar';

import './style.scss'

class Home extends Component {
    render(){
        return(
            <div className="home">
                <div className="main">home</div>
                <Tabbar></Tabbar>
            </div>
        )
    }
}

export default Home;