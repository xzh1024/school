const BASE_URL = process.env.NODE_ENV === 'production' ? '/ems-web' : '';

// 微应用都配置在这里
// name 与子应用package.json中的name和output.library 想通
const config = [
  {
    name: 'snow-beer-faweb',
    entry: process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_QIANKUN_HOST}/fa-web` : '//localhost:3000',
    container: '#faWeb-container',
    activeRule: `${BASE_URL}/fa-web`,
  },
  {
    name: 'receipt',
    entry: process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_QIANKUN_HOST}/receipt` : 'http://localhost:9527',
    container: '#receipt-container',
    activeRule: `${BASE_URL}/receipt`,
  },
  {
    name: 'ems-admin',
    entry: process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_QIANKUN_HOST}/ems-admin` : '//localhost:3000',
    container: '#ems-admin-container',
    activeRule: `${BASE_URL}/ems-admin`,
  },
  {
    name: 'image',
    entry: process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_QIANKUN_HOST}/image` : '//localhost:3000',
    container: '#image-container-root',
    activeRule: `${BASE_URL}/image`,
  },
];

export default config;
