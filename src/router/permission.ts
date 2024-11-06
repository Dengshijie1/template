import router from '@/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  document.title = to.meta.title || ''
  next()
})

router.afterEach((to) => {
  NProgress.done()
})
