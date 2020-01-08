// import React, { Component } from 'react'
//
// Text.prototype.render = _.wrap(Text.prototype.render, function (func, ...args) {
//     let originText = func.apply(this, args);
//     // let newTesxt   = _.cloneDeep(originText);
//     // originText.props.allowFontScaling = false;
//     // originText.props.children = 'hhh';
//     // return cloneElement(originText, {
//     //     style: [
//     //         originText.props.style,
//     //         styles.defaultFontFamily
//     //     ]
//     // });
//     return React.cloneElement(originText, {allowFontScaling: false});
// });