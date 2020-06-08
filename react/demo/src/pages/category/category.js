/**
 * Created by Admin on 2019/2/11.
 */
import React, { Component } from 'react';
import Tabbar from '../../components/tabbar';
import Header from '../../components/header';

import './style.scss'

class Category extends Component {
    render() {
        return (
            <div className="category">
                <Header title="分类" />
                <div className="main">category</div>
            </div>
        )
    }
}

export default Tabbar(Category);