import * as qiniu from "qiniu-js";
import axios from 'axios'
import $ from 'jquery'
export function qiniuUploadFiles(files) {
    return new Promise((resolve, reject) =>{
        let resultURLs = [];
        for (let file of files) {
            $.ajax({
                type: "get",
                url: axios.defaults.unitedURL + "/img/upToken",
                async: false,
                xhrFields: {
                  withCredentials: true
                },
                success: function(resp) {
                    if (resp.code == "ok") {
                        let sendData = resp.data;
                        let observer = {
                            error(err) {
                                reject('上传失败'+err);
                            },
                            complete(res) {
                                if (res && res.key) {
                                    resultURLs.push(sendData.url);
                                    if (resultURLs.length == files.length){
                                        resolve(resultURLs);
                                    }
                                } else {
                                    reject('上传失败');
                                }
                            }
                        };
                        let putExtra = {
                            fname: file.name,
                            params: {},
                            mimeType: [file.type]
                        };
                        let observable = qiniu.upload(
                            file,
                            sendData.key,
                            sendData.token,
                            putExtra
                        );
                        observable.subscribe(observer);
                    }else{
                        reject(resp.message);
                    }
                }
            });
        }
    });
}
