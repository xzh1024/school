export default {
  path: '/goods',
  name: '商品',
  iCons: 'icon-commodity-menu',
  redirect: '/goodsManage',
  component: () => import('@/views/ManageCenter'),
  children: [
    {
      path: '/goodsManage',
      name: '商品管理',
      meta: {
        keepAlive: false,
        level: 2,
      },
      component: {
        render(h) {
          return h('router-view');
        },
      },
      redirect: '/goodsManage/list',
      children: [
        {
          path: '/goodsManage/list',
          name: '商品列表',
          // component: () => import("@/views/goods/goodsManage/goodsManageIndex.vue"),
          component: () => import('@/views/goods/goodsManage/index.vue'),
        },
        {
          path: '/goodsManage/goodsEdit',
          name: '商品编辑',
          isHide: true, //隐藏不显示
          component: () => import('@/views/goods/goodsEdit/goodsEditIndex.vue'),
        },
        {
          path: '/goodsManage/projectEdit',
          name: '商品编辑',
          isHide: true,
          component: () =>
            import('@/views/goods/goodsManage/project/edit/index.vue'),
        },
        {
          path: '/goodsManage/packageEdit',
          name: '商品编辑',
          isHide: true,
          component: () =>
            import('@/views/goods/goodsManage/package/edit/index.vue'),
        },
      ],
    },
    {
      path: '/goodsManage/stockGroup',
      name: '库存分组',
      // isHide:true,//隐藏不显示
      component: () => import('@/views/goods/stockGroup/stockGroupIndex.vue'),
    },
  ],
};
