export enum CartLoginTypeEnum {
    default = 1,
    socket = 2,
    http = 3
}

export interface IConfig {
    /**
     * 全局超时时间 单位为毫秒
     * @type {string}
     */
    GLOBAL_TIME_OUT: number; // 设置为10秒

    /**
     * 文本检索超时时间 单位为毫秒
     * @type {string}
     */
    TEXT_RETRIEVAL_TIME_OUT: number; // 设置为10秒

    /**
     * 文件上传超时 单位为毫秒
     * @type {string}
     */
    FILE_TIME_OUT: number; // 设置为10秒

    CURRENT_MAP_CONFIG_PATH: string;

    IS_CORE_NET: boolean;// 是否为核心网： true---> 是否过网闸 false--->是否下发下级中心 (新增人脸库时)

    DYNAMICCONTROL_DEFAULT_MAP: boolean; // 初始化【动态布控页】时，是否默认进入“地图模式”

    /**
     * 图片是否可人脸标定
     * true:可标定  false:无标定
     * @type {boolean}
     */
    IS_HAND_DEMARCATE: boolean;

    /**
     * 南京单独需求
     * 是否启用图片延迟加载：报警推送、抓拍推送
     * 重复请求图片次数
     * 重复请求图片间隔
     * 重复请求图片的队列数
     * 是否启用南京定制单独功能或样式需求
     */
    DELAY_LOAD_IMG: boolean;
    DELAY_RELOAD_COUNT: number;
    DELAY_LOAD_SLEEPTIME: number;
    DELAY_LOAD_MAXLENGTH: number;
    IS_NANJIN_CUSTOM_MADE: boolean;

    /**
     * 上海单独需求
     * 重新获取专网图片接口路径
     *
     */
    GET_IMG_URL: string;

    /**
     * 绵阳单独需求
     * KPI证书登录
     */

    GET_KPI_EXE_URL: string;
    OPEN_CERT_LOGIN: boolean;
    DESIGN_SUBJECT: string;// 颁发者DN
    /**
     * KPI证书登录通过socket
     */
    CERT_LOGIN_TYPE: CartLoginTypeEnum;
    /**
     *  绵阳
     * 是否显示动态布控左侧资源列表树，默认显示
     */
    DYNAMIC_CONTROL_LEFT_TREE_ONLY_TASK: boolean;
    /**
     * 动态布控左侧列表模式展示资源树 true,  false 展示 任务树
     * @type {boolean}
     */
    DYNAMIC_CONTROL_LEFT_TREE_DEFAULT_RESOURCES: boolean;

    /**
     * 用于基础配置添加弹窗中，编码和名称默认值 后缀位数
     * 如添加区域弹窗中 Area_000009 控制后缀000009位数
     * */
    SUFFIX_DIGIT: number;

    /**
     * 南海单独需求
     * 隐藏一些不需要的人员新增选项
     * 南海项目就设置为true
     */
    IS_HIDE_ADD_PERSON_OPTION: boolean;

    /**
     * 是否虚拟本部节点
     */
    IS_VIRTUAL_TREE_NODE: boolean;

    /**
     *  树是否有分页
     *  5-26 暂不支持 不包含分页
     */
    IS_TREE_HAS_PAGE: boolean;
    /**
     * 是否开启无动作超时检测(true为启用, false为禁用)
     */
    IS_NO_ACTION_OUT: boolean;
    /**
     * 智能检索轨迹分析和报警检索默认排序设置
     * 0:按时间排序;1:按相似度排序
     */
    TRAIL_SORT_INDEX: number;
    ALARM_SORT_INDEX: number;
    /**
     * 是否需要临控库(蚌埠不需要)
     */
    IS_NEED_OCCASIONAL_LIB: boolean;
    /**
     * 轨迹分析是否需要身份证检索(蚌埠不需要)
     */
    IS_NEED_CARDID_SEARCH: boolean;
    /**
     * 用于配置图片服务器映射,
     * 如："/bimg_upload/aLOC"映射成某个图片服务器地址
     */
    ImgServerMap: { [key: string]: string }
    /**
     *  异步分页每页条数
     * @time: 2018-07-20 09:46:23
     */
    ASYNC_PAGE_NUM: number;

    /**
     * 界面全局展示的水印属性
     */
    // 是否展示水印 true展示
    IS_SHOW_WATERMARK: boolean;
    // 单个水印宽度
    WATERMARK_WIDTH: number;
    // 单个水印高度
    WATERMARK_HEIGHT: number;
    // 单个水印字体大小
    WATERMARK_FONT_SIZE: number;
    // 单个水印倾斜角度
    WATERMARK_ROTATE: number;

    /**
     * add by db
     * 当前使用哪个版本的OCX，

     * 1 指的是人像一直在用的ocx播放视频插件，SN_CROWD
     * 2 指代的是网力新开发的ocx插件，支持播放PVG+，支持逐帧播放 NP_VIDEO
     * 3 指代h5Player播放器（目前支持ie11+ chrom31+） H5_PLAYER
     */
    USER_WHITCH_OCX: number;
    /**
     * ocx水印
     */
    WaterMarkOpt: {
        enablewatermark: {
            enable: boolean // 是否启用水印
        },
        addwatermark: {
            text: string, // 显示文本内容
            autocolor: number, // e.g. 0 1自动颜色， 0 使用textcolor颜色
            textcolor: 0x0FF5F500,// e.g. 0x0FF5F500 文本颜色，31~24位为透明度 23~16位为蓝色 15~8位为绿色 8~0位为红色，自动颜色时透明度仍有效
            font: string,// e.g.微软雅黑    文本字体
            fontsize: number, // e.g. 文字大小[0~4]
            timeinterval: number // e.g. 2000 随机时间间隔
        };
    }
    /**
     * 是否启用地图额外配置
     * true 启用 false 不启用
     * 此配置用于兼容changzhou neiwang gis地图定制化接入需求, 是此项目则设置为true
     */
    INIT_MAP_EX_CONFIG: boolean;
    /**
     * 是否支持按区域布控
     * true 支持 false 不支持
     */
    IS_TASK_CAN_MONITOR_BY_AREA: boolean;
    /**
     * 临控库是否展示临控期限和展示处置要求
     * true 展示 false 不展示
     */
    IS_SHOW_PERIOD_AND_CASE_TYPE: boolean;
    /**
     * 是否按照相机权限将地图点位进行过滤
     * true 是 false 否
     */
    IS_FILTER_MAP_POINT_IN_PERMISSION: boolean;
    /**
     * 是否启用自定义系统标题配置
     */
    IS_CUSTOM_SYSTEM_TITLE: boolean;
    /**
     * 人像库人员界面是否按缩略图来展示(默认false)
     */
    IS_FACELIBPERSON_SHOW_THUMBNAIL: boolean;

    /** 首页类型 */
    HOME_PAGE_TYPE: number;

    /** 人像首页 true:展示 false:不展示 */
    IS_SHOW_OVERVIEW: boolean;

    /** 导航页 true:展示  false:不展示 */
    IS_SHOW_NAVIGATION: boolean;

    /**
     * 抓拍配置中抓拍监控区域配置是否是百分比(浮点数)
     */
    IS_TASK_CAPTURE_CONFIG_AREA_PERCENTAGE: boolean;

    /**
     *  是否包含 vid 模块
     * @time: 2018-12-19 11:49:30
     */
    HAS_VID_MODULE: boolean;
    /**
     *  VID_URI ，HAS_VID_MODULE === true 为必填
     * @time: 2018-12-19 11:49:30
     */
    VID_URI: string;
    /**
     * 录像回放的前后间隔, 必须设置为正数
     * 默认值: 15, 表示前后15秒
     */
    VIDEO_PLAY_BACK_TIME: number;
    /**
     * 是否接入人体相关功能
     * true：接入,fasle: 屏蔽
     */
    IS_ACCESS_BODY:boolean;
    /**
     * 碰撞任务-碰撞库人员限制 小值
     *
     */
    Collide_Task_Lib_Count_Small: number;
        /**
     * 碰撞任务-碰撞库人员最大值
     *
     */
    Collide_Task_Lib_Count_Big: number;

    /**
     * 是否屏蔽临控库新增人员临控期限的“永久”选项
     * true：显示,fasle: 屏蔽
     */
    IS_SHOW_FOREVER_OPTION: boolean;
    /**
     * 临控库弹窗接收报警人的数量
     */
    REC_ALARM_PERSON_NUM: number;

    /**
     * 是否屏蔽地图的展示
     * true表示屏蔽，false表示显示
     * @default: false
     */
    IS_HIDE_GIS_MAP: boolean;
    /**
     * 是否开启数据转换
     * @type {boolean}
     */
    IS_OPEN_CONVERT_DATA: boolean;
    /**
     * 运维管理,摄像机状态页是否显示抓拍状态字段
     * @type {boolean}
     * 默认为true 显示
     */
    IS_SHOW_CAPTURE_STATUS: boolean;
}
