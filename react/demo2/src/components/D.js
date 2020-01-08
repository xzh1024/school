import React, { Component } from 'react';
const modifyPropsHOC = (WrappedComponent) => class NewComponent extends WrappedComponent{

    componentWillMount(){
        console.log('我是修改后的生命周期');
    }

    render(){
        const element = super.render();
        const newStyle = {
            color: element.type === 'div' ? 'red' : 'blue'
        };
        const newProps = { ...this.props, style: newStyle };
        return React.cloneElement(element, newProps, element.props.children);
    }
}
export default modifyPropsHOC