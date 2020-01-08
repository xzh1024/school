/**
 * Created by Admin on 2019/2/11.
 */
import React, { Component } from 'react';
import Tabbar from '../../components/tabbar';

import './style.scss'

class Category extends Component {
    render(){
        return(
            <div className="category">
                <div className="main">category</div>
                <Tabbar></Tabbar>
            </div>
        )
    }
}

export default Category;