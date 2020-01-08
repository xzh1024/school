require('normalize.css/normalize.css');
// require('styles/App.css');
require('styles/App.scss');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');

//获取图片相关得数据
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
  for(let i = 0, len = imageDatasArr.length; i < len; i++){
    var singleImageData = imageDatasArr[i];

    singleImageData.imageURL = require("../images/" + singleImageData.fileName);

    imageDatasArr[i] = singleImageData;
  }

  console.log('-------------------------------imageDatasArr------------------------------');
  console.log(imageDatasArr);
  return imageDatasArr;
})(imageDatas);

class ImgFigure extends React.Component{
  render() {
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    );
  }
}

class AppComponent extends React.Component {
  doStuff() {
    console.log('stuff');
  }
  render() {

    var controllerUnits = [],
      imgFigures =[];

    imageDatas.forEach(function (value, index) {
      imgFigures.push(<ImgFigure data={value} key={index}/>);
    });

    return (
      <sevtion className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </sevtion>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
