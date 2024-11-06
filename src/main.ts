// core
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/router/permission'
import App from '@/App.vue'
import router from '@/router'
//css
import 'uno.css'
import '@/style/index.scss'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
