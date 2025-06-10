# EMS-WEB

## 财务报账系统 PC 端

### 特别说明

1. 请仔细阅读下方项目结构目录
2. 严格要求代码书写, 请处理完成所有eslint的error后再提交代码。
3. 注释代码或未使用代码，及时删除。
4. 本项目所有命名请严格遵循驼峰命名规则 （常量尽量使用全大写的下划线命名法  即: USER_MAP）
5. 公共组件开发时请考虑一致性（复制到其他项目只需修改引用路径后依旧可以运行）
6. 开发时所有配色样式请通过使用antd的theme的useToken方法获取token后设置（项目区分黑白主题）
7. 所有文字绝对不能单独写在标签当中，应当使用antd的Typography.Text组件包裹 (原因：适配黑白主题切换)
    错误示例
    ```
    <div>
      张三
    <div/>
    ```

    正确示例
  
    ```
    import { Typography } from 'antd';
    const { Text } = Typography;

    <div>
      <Text>
        张三
      </Text>
    <div/>
    ```
8. antd中的题型或弹出框的静态方法均已挂载到windows上, 需使用时请务必通过windows[`message` | `modal` | `notify`] (原因：适配主题以及动态调整)
9. 项目已经载入AOS 移入动画   使用方法：https://michalsnik.github.io/aos/
10. 当分支需要合并到fssc-prod分支时   请使用命令 git merge --squash xxxx(分支名称)

## 技术栈

```
React: 18.2
UI框架： antd V5
style: scss
store： mobx
router: react-router-dom  V6
```

## 启动

```
npm i

npm start

```

## 打包

```

npm run build:uat
npm run build:prod

```

## 代码检测

```

npm run lint

```

## 目录结构

```
├── public                                                        公共文件
│   ├── images                                                    图片资源
│   ├── svg                                                       svg图标资源 （通过SvgIcon使用）
│   ├── favicon.ico
│   └── index.html
├── src                                                                             alias  -> @
│   ├── components                                                公共组件            alias  -> @c
│   ├── api                                                       api接口            alias  -> @api
│   ├── index.jsx                                                 入口文件
│   ├── router                                                    路由文件夹          alias  -> @r
│   │   ├── index.js                                              路由组件
│   │   ├── LazyImportComponent.jsx                               路由懒加载组件
│   │   └── router.js                                             路由配置
│   │
│   ├── store                                                     store文件夹         alias  -> @s
│   │   ├── index.js                                              仓库导出
│   │   ├── globalStore.js                                        全局共用数据仓库
│   │   └── configStore.js                                        首页配置仓库（数据会本地持久化）
│   │
│   ├── style                                                     样式库              alias  -> style
│   │   ├── components                                            公共组件的样式（一个公共组件一个文件  方便后期其他项目使用）
│   │   │   └── index.scss                                        统一在此文件中引用
│   │   └── index.scss                                            公共样式或变量
│   │
│   ├── utils                                                     公共工具文件夹        alias  -> @u
│   │   ├── hooks                                                 自定义hooks文件夹
│   │   |   └──index.js                                           所有自定义hooks的出口
│   │   ├── format.js                                             关于格式化的公共方法
│   │   ├── qrCode.js                                             关于二维码的公共方法
│   │   ├── storage.js                                            关于storage操作的公共方法
│   │   ├── tools.js                                              一般公共方法 （写入公共方法后请添加好 出入参数的类型注释）
|   |   └── request.js                                            Axios请求封装
│   │
│   └── pages                                                     页面文件夹     alias  -> pages
|       ├── dashboard                                             页面基础layout
|       ├── warningMessage                                        表单消息中心页面（变单页面右上角铃铛）
|       ├── travelConfirm                                         差旅补贴PC端确认页面
│       └── example
├── autoStorePlugin.js                                            自动加载store仓库的webpackPlugin
├── README.md                                                     项目说明
├── .env.dev                                                      开发环境配置文件
├── .env.prod                                                     生产环境配置文件
├── .env.uat                                                      测试环境配置文件
├── .eslintrc.json                                                eslint 配置
├── .prettierrc.js
├── package.json                                                  项目包文件
└── .rescriptsrc.js                                               webpack等配置
```
