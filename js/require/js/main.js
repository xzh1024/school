(function () {
    //配置
    requirejs.config({
        //基本路径
        baseUrl: "js/",
        //模块标识名与模块路径映射
        paths: {
            'jquery': 'libs/jquery',
            "alerter": "modules/alerter",
            "dataService": "modules/dataService",
        }
    })

    //引入使用模块
    requirejs(['alerter', 'jquery'], function (alerter, $) {
        alerter.showMsg();
    })
})()