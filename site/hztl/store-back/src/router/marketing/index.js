export default {
  path: '/marketing',
  name: '营销',
  iCons: 'icon-marketing-menu',
  isLeaf: true,
  redirect: '/marketing/marketingManage',
  component: () => import('@/views/ManageCenter'),
  meta: {
    level: 1,
  },
  children: [
    {
      path: '/marketing/marketingManage',
      name: '营销中心',
      component: () => import('@/views/marketing/index.vue'),
    },
    {
      path: '/marketing/coupon',
      name: '优惠券',
      // component: () => import("@/views/marketing/coupon/index.vue"),
      component: {
        render(h) {
          return h('router-view');
        },
      },
      redirect: '/marketing/coupon/list',
      children: [
        {
          path: '/marketing/coupon/list',
          name: '优惠券列表',
          component: () => import('@/views/marketing/coupon/index.vue'),
        },
        {
          path: '/marketing/coupon/add',
          name: '新建优惠券',
          component: () => import('@/views/marketing/coupon/add/index.vue'),
        },
        {
          path: '/marketing/coupon/edit',
          name: '编辑优惠券',
          component: () => import('@/views/marketing/coupon/edit/index.vue'),
        },
        {
          path: '/marketing/coupon/info',
          name: '优惠券详情',
          component: () => import('@/views/marketing/coupon/info/index.vue'),
        },
      ],
    },
    {
      path: '/marketing/points',
      name: '积分',
      component: () => import('@/views/marketing/points/index.vue'),
    },
  ],
};
