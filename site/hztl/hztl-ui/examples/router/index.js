import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);


export const maninRouters = [
    {
        path: "/", 
        redirect: "/print",
        hidden: true
    },
    {
        path: "/dialog",
        name: "dialog",
        icon: "el-icon-picture-outline",
        component: () => import("../views/Base"),
        meta: {
            title: "弹框"
        },
        children: [
            {
                path: "",
                redirect: "dialog",
                hidden: true
            },
            {
                path: "dialog",
                name: "dialog",
                component: () => import("../views/Dialog"),
                meta: {
                    title: "弹框"
                },
            },
        ]
    },
    {
        path: "/print",
        name: "打印",
        icon: "el-icon-picture-outline",
        component: () => import("../views/Base"),
        meta: {
            title: "打印"
        },
        children: [
            {
                path: "",
                name: "print",
                component: () => import("../views/Print"),
                meta: {
                    title: "打印"
                },
            },
        ]
    },
    {
        path: "/select",
        name: "test",
        icon: "el-icon-picture-outline",
        component: () => import("../views/Base"),
        meta: {
            title: "选择"
        },
        children: [
            {
                path: "",
                redirect: "baseSelect",
                hidden: true
            },
            {
                path: "select",
                name: "select",
                component: () => import("../views/select/select"),
                meta: {
                    title: "基础选择"
                },
            },
            {
                path: "autoselect",
                name: "autoselect",
                component: () => import("../views/select/autoselect"),
                meta: {
                    title: "支持快捷选择"
                },
            },
            {
                path: "form",
                name: "form",
                component: () => import("../views/form"),
                meta: {
                    title: "基本表单"
                },
            },
            {
                path: "baseTable",
                name: "Basetable",
                component: () => import("../views/Table"),
                meta: {
                    title: "基础表格"
                },
            }
        ]
    }
]


export default new Router({ routes: maninRouters });
