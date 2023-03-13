import * as envConfig from "envConfigPath";

export function JSAPIList(path){
    var jsApis = []
    if (path == '/issueFriendCircle'){
        jsApis.push("chooseImage", "uploadImage", "getLocalImgData");
    }
    if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
        if (path == '/diagnosticReport'){
            jsApis.push("updateAppMessageShareData", "updateTimelineShareData");
        }
        if (path == '/payment'){
            jsApis.push("chooseWXPay");
        }
    }
    return jsApis;
}

export function ToURL(fullPath){
    // return location.origin + fullPath;
    return envConfig.urlPrefix + fullPath;
}
