import { Platform } from 'react-native'

const Config = {
    proxy: {
        host: 'http://api.xiyou7.com',
        oldhost: 'http://boxapi.xiyou7.com'
    },
    // system: (function() {
    //     console.log(navigator);
    //     console.log(navigator.userAgent);
    //     let u = navigator.userAgent;
    //     let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //     return isiOS?2:1;
    // })(),
    system: Platform.OS === 'ios' ? 2 : 1,
    channel: 1,//渠道ID
    key: 'dafb9c0f015a603381c3f574531b53b0'
};

export default Config;