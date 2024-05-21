import axios from 'axios'
import 'element-plus/theme-chalk/index.css'
//创建axios实例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
})
request.interceptors.request.use((config: any) => {
  return config
})
//响应拦截器
request.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error: any) => {
    //处理网络错误
    return error.response.data
  },
)
export default request
