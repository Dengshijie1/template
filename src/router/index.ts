import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routers'
import { history } from './helper'
const router = createRouter({
  history,
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
