import React, { Component } from 'react';
import D from './D';

class E extends Component {

    componentWillMount(){
        console.log('我是原始生命周期');
    }

    render() {
        return (
            <div className="E">
                我是DIV
            </div>
        );
    }
}



export default D(E);
