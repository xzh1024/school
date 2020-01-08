import React, { Component } from 'react';

function d(WrappedComponent) {
    return class D extends Component {
        render() {
            return (
                <div className="C">
                  DDD
                  <WrappedComponent />
                </div>
            );
        }
    }
}

export default d;
