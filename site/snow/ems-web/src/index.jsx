import 'animate.css';
import 'antd/dist/reset.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { registerMicroApps, start } from 'qiankun';
import ReactDOM from 'react-dom/client';
import 'sal.js/dist/sal.css';
import 'style/index.scss';
import HomePage from './HomePage';
import microAppsConfig from './microAppsConfig';
import reportWebVitals from './reportWebVitals';

const getYouMeng = () => {
  var el = document.createElement('script');
  el.type = 'text/javascript';
  el.charset = 'utf-8';
  el.async = true;
  var ref = document.getElementsByTagName('script')[0];
  ref.parentNode.insertBefore(el, ref);
  el.src = `https://w.cnzz.com/c.php?id=${process.env.REACT_APP_YOUMENG_ID}&async=1`;
};

// 注册乾坤微任务
registerMicroApps(microAppsConfig);

AOS.init({
  mirror: true,
  duration: 800,
});

getYouMeng();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<HomePage></HomePage>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// 启动乾坤
start({
  getPublicPath: entry => {
    return `${entry}/`;
  },
  // 当直接访问档案管理时，关闭沙盒隔离，以使用二维码批量下载功能
  sandbox: !window.location.href.includes(`${process.env.REACT_APP_ENTRY_URL}/ems-web/receipt`),
});
