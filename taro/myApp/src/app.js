import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/movie/movie',
      'pages/cart/cart',
      'pages/aboutUs/aboutUs',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      "selectedColor": "#333",
      "list": [
        {
          "pagePath": "pages/index/index",
          "text": "首页",
          "iconPath": "./images/07_icon_youxi.png",
          "selectedIconPath": "./images/07_icon_youxi_liang.png"
        },
        {
          "pagePath": "pages/movie/movie",
          "text": "影与评",
          "iconPath": "./images/08_icon_kaifubiao.png",
          "selectedIconPath": "./images/08_icon_kaifubiao_liang.png"
        },
        {
          "pagePath": "pages/cart/cart",
          "text": "购物车",
          "iconPath": "./images/07_icon_youxi.png",
          "selectedIconPath": "./images/07_icon_youxi_liang.png"
        },
        {
          "pagePath": "pages/aboutUs/aboutUs",
          "text": "关于我们",
          "iconPath": "./images/08_icon_kaifubiao.png",
          "selectedIconPath": "./images/08_icon_kaifubiao_liang.png"
        }
      ]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
