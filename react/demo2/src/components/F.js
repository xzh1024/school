import React, { Component } from 'react';
import D from './D';

class F extends Component {
    render() {
        return (
            <p className="F">
                我是p
            </p>
        );
    }
}



export default D(F);
