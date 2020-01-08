
// import axios from 'axios'
import md5 from 'js-md5'

// const host = 'http://api.xiyou7.com';
// const oldhost = 'http://boxapi.xiyou7.com';
const host = 'http://api.xiyou7.com';
const oldhost = 'http://boxapi.xiyou7.com';

// const util = {
//     jointStr(data){
//         let params = '';
//         for(let key in data){
//             params += key + '=' + data[key] + '&';
//         }
//         params = params.replace(/&{1}$/,'');
//         return params;
//     },
//     md5Sign(options, key = global.Config.key){
//         // let key = appkey || config.key;
//         return md5(util.jointStr(options) + key).toLowerCase();
//     }
// }

const Api = {
    async oldGet(url, params) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        return new Promise((resolve, reject) => {
            fetch(oldhost + url)
                .then((response) => {
                    // console.log('1');
                    // console.log(response)
                    //Fetch不会关心AJAX是否成功，他只关心从服务器发送请求和接收响应，如果响应失败我们需要抛出异常
                    if (response.ok) {
                        return response.json()
                    } else {
                        // throw new Error('something went wrong!')
                        return Promise.reject(response); //这样错误就会进入catch语句中
                    }
                })
                .then((responseJson) => {
                    // return responseJson.movies;
                    // console.log('2');
                    // console.log(responseJson);
                    resolve(responseJson);
                })
                .catch((error) => {
                    // console.log('3');
                    // console.log(error);
                    reject(error);
                });
        })

        // return new Promise((resolve, reject) => {
        //     fetch(oldhost + url)
        //         .then((response) => response.json())
        //         .then((responseJson) => {
        //             // return responseJson.movies;
        //             console.log(responseJson);
        //             return resolve(responseJson);
        //         })
        //         .catch((error) => {
        //             console.error(error);
        //             reject(error);
        //         });
        // })
    },
    oldPost(url, params) {
        return new Promise((resolve, reject) => {
            fetch(oldhost + url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // return responseJson.movies;
                    console.log(responseJson);
                    return resolve(responseJson);
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        })
    }
}

export default Api;
// export default class Api {

    // static async Get(url, params) {
    //     params.sign = util.md5Sign(params);
    //     return new Promise((resolve, reject) => {
    //         let request = axios({
    //             method: 'get',
    //             url: host + url,
    //             params: params,
    //             // headers: {
    //             //     'openId': 1,
    //             // },
    //         })
    //             .then((response) => {
    //                 resolve(response.data);
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });
    //     })
    // }

    // async OldGet(url, params) {
    //     try {
    //         // 注意这里的await语句，其所在的函数必须有async关键字声明
    //         let response = await fetch(url, {
    //             body: JSON.stringify(params)
    //         });
    //         let responseJson = await response.json();
    //         console.log(123456);
    //         console.log(responseJson);
    //         return responseJson;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    // static async OldGet(url, params) {
    //     // return new Promise((resolve, reject) => {
    //     //     let request = axios({
    //     //         method: 'get',
    //     //         url: oldhost + url,
    //     //         params: params,
    //     //     })
    //     //         .then((response) => {
    //     //             resolve(response.data);
    //     //         })
    //     //         .catch((error) => {
    //     //             reject(error);
    //     //         });
    //     // })
    //     return new Promise((resolve, reject) => {
    //         fetch(url,{
    //             body: JSON.stringify(params)
    //         })
    //             .then((response) => response.json())
    //             .then((datas) => {
    //
    //                 console.log('-------------------');
    //                 console.log(datas);
    //                 resolve(datas);
    //                 // this.setState({
    //                 //     isLoading: false,
    //                 //     dataSource: responseJson.data.gamelist,
    //                 // }, function(){
    //                 //
    //                 // });
    //
    //             })
    //             .catch((error) =>{
    //                 // console.error(error);
    //                 reject(error);
    //             });
    //     })
    // }

    // static async Post(url, params) {
    //     return new Promise((resolve, reject) => {
    //         let request = axios({
    //             method: 'Post',
    //             url: host + url,
    //             data: params,
    //             // headers: {
    //             //     'openId': 1,
    //             // },
    //         })
    //             .then((response) => {
    //                 resolve(response.data);
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });
    //     })
    // }
    //
    // static async OldPost(url, params) {
    //     return new Promise((resolve, reject) => {
    //         let request = axios({
    //             method: 'Post',
    //             url: oldhost + url,
    //             data: params,
    //             // headers: {
    //             //     'openId': 1,
    //             // },
    //         })
    //             .then((response) => {
    //                 resolve(response.data);
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });
    //     })
    // }
    //
    // static async Upload(formData) {
    //     let request = axios.post(host + '/mmyp/file/uploadImg', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    //     try {
    //         let response = await request;
    //         if (response.data.code === 200) {
    //             return response;
    //         } else {
    //             throw new Error('上传文件失败！');
    //         }
    //     } catch (e) {
    //         alert('上传文件失败！');
    //         throw new Error(e);
    //     }
    // }
// }
//let datas = await Api.OldGet('/api-game-newIndex', {page: 1, platform: 1, system: 1, uid: 0});
