/**
 * Created by Admin on 2019/2/11.
 */
import React, { Component } from 'react';
import Tabbar from '../../components/tabbar';

import './style.scss'

class Car extends Component {
    render(){
        return(
            <div className="car">
                <div className="main">car</div>
                <Tabbar></Tabbar>
            </div>
        )
    }
}

export default Car;