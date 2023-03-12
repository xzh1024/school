# har-cbd-project-web

商圈后台管理web端


### 目录结构
```
├─config                  // vite配置文件目录
├─fileTemplate            // 业务静态模板文件资源目录
├─settings                // 自定义虚拟路径配置目录
├─mock                    // mock 目录
│  ├─pcs                  // mock  pcs(流程引擎)平台
│  ├─platform             // mock  platform(统一)平台
│  ├─project              // mock  project(商圈)平台
│  └─svc                  // mock  svc(储值卡)平台
└─src                     // 业务开发目录
    ├─api                 // 请求api相关配置目录
    ├─assets              // 图片类静态资源目录
    ├─components          // 公共组件目录
    ├─composables         // hooks目录
    ├─config              // 字典内容目录
    ├─directive           // 自定义指令目录
    ├─hooks               // hooks目录
    ├─layout              // layout布局目录
    ├─router              // router相关目录
    ├─store               // 数据存储库
    │  ├─modules          // 基础库
    │  ├─pcs              // pcs平台
    │  ├─platform         // platform平台
    │  ├─project          // project平台
    │  └─svc              // svc平台
    ├─styles              // 样式目录
    ├─types               // ts类型声明目录
    ├─utils               // 工具类
    └─views               // 页面开发目录
        ├─not-found       // 未找到页面
        ├─pcs             // pcs平台页面
        ├─platform        // platform平台页面
        ├─svc             // svc平台页面
        └ ....            // project 平台页面目录
```

### settings

##### 以下规范目录 请遵守

```
├─cube                //体投平台配置内容
│  ├─index.json       //平台文字及展示配置
│  └─images           //平台图片目录
│      ├─home         //统一平台home 展示图片集合
│      ├─login        //统一平台登录 展示图片集合
│      ├─logo.png     //统一平台登录 展示图片集合
│      └─nav-logo.png
└─demo                //har演示demo平台配置内容
   ├─index.json       //平台文字及展示配置
   └─images           //平台图片目录
      ├─home          //统一平台home 展示图片集合
      ├─login         //统一平台登录 展示图片集合
      ├─logo.png      //统一平台登录 展示图片集合
      └─nav-logo.png  //统一平台登录 展示图片集合
```

> 警告： 多平台目录下 字段名、目录结构、文件名、图片名 请保持一致，否则会出现访问报错！！！
