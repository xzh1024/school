// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/guanli/Desktop/work/code/erp-app1/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__LangLayout' */'/Users/guanli/Desktop/work/code/erp-app1/src/layouts/LangLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'/Users/guanli/Desktop/work/code/erp-app1/src/layouts/BlankLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/app1",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__PositionLayout' */'/Users/guanli/Desktop/work/code/erp-app1/src/layouts/PositionLayout'), loading: LoadingComponent}),
            "routes": [
              {
                "path": "/app1/welcome",
                "name": "welcome",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/guanli/Desktop/work/code/erp-app1/src/pages/Welcome'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "列表",
                "icon": "table",
                "path": "/app1/list",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableBasic' */'/Users/guanli/Desktop/work/code/erp-app1/src/pages/TableBasic'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/main",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/guanli/Desktop/work/code/erp-app1/src/layouts/BasicLayout'), loading: LoadingComponent}),
            "routes": [
              {
                "path": "/main/welcome",
                "name": "welcome",
                "icon": "smile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Welcome' */'/Users/guanli/Desktop/work/code/erp-app1/src/pages/Welcome'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "列表",
                "icon": "table",
                "path": "/main/list",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TableBasic' */'/Users/guanli/Desktop/work/code/erp-app1/src/pages/TableBasic'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
