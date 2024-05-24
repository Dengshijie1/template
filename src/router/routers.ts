export const constantRoute = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: '',
      hidden: false,
    },
    // redirect: '/home',
    children: [

    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
]
export const asyncRouter = {}
export const anyRouter = {
  path: '/:pathMathch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '/404',
    hidden: true,
  },
}
