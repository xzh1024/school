/**
 * Created by Admin on 2019/3/12.
 */
import axios from 'axios'
import qs from 'query-string';
import md5 from 'js-md5'

// let host = 'http://wx.mmyoupin.com';
let host = '/api';
let oldhost = '/www';


const config = {
    // system: (function() {
    //     let u = navigator.userAgent;
    //     let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    //     let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //     return isiOS?2:1;
    // })(),
    channel: 1,//渠道ID
    key: 'dafb9c0f015a603381c3f574531b53b0'
};

const util = {
    jointStr(data){
        let params = '';
        for(let key in data){
            params += key + '=' + data[key] + '&';
        }
        params = params.replace(/&{1}$/,'');
        return params;
    },
    md5Sign(options, key = config.key){
        // let key = appkey || config.key;
        return md5(util.jointStr(options) + key).toLowerCase();
    }
}

// class Response {
//     constructor(promise) {
//         console.log(promise);
//         this.promise = promise;
//     }
//
//     async response() {
//         let response = await this.promise;
//         // console.log(response);
//         return response.data;
//     }
// }

export default class Api {

    static async Get(url, params, appkey) {
        if(appkey){
            params.sign = util.md5Sign(params, appkey);
        } else {
            params.sign = util.md5Sign(params);
        }
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: host + url,
                params: params,
                // headers: {
                //     'openId': 1,
                // },
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    static async OldGet(url, params) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: oldhost + url,
                params: params,
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    static async Post(url, params, appkey) {
        if(appkey){
            params.sign = util.md5Sign(params, appkey);
        } else {
            params.sign = util.md5Sign(params);
        }
        return new Promise((resolve, reject) => {
            let request = axios({
                method: 'post',
                url: host + url,
                data: qs.stringify(params),
                // headers: {
                //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                // }
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    static async OldPost(url, params) {
        return new Promise((resolve, reject) => {
            let request = axios({
                method: 'post',
                url: oldhost + url,
                data: qs.stringify(params),
                // headers: {
                //     'openId': 1,
                // },
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }

    static async Upload(formData) {
        let request = axios.post(host + '/mmyp/file/uploadImg', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        try {
            let response = await request;
            if (response.data.code === 200) {
                return response;
            } else {
                throw new Error('上传文件失败！');
            }
        } catch (e) {
            alert('上传文件失败！');
            throw new Error(e);
        }
    }
}
//let datas = await Api.OldGet('/api-game-newIndex', {page: 1, platform: 1, system: 1, uid: 0});
