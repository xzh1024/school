/**
 * Created by Admin on 2019/2/28.
 */
import React, { Component } from 'react';
import './style.scss'

class Header extends Component {

    render(){
        return (
            <div className="header">{this.props.title}</div>
        )
    }

}

export default Header;
