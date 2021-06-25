import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
// import Cookies from 'js-cookie'
const config = axios.create({
  // 公共接口
  baseURL: process.env.VUE_APP_AX_BASE_URL,
  // 超时时间
  timeout: 3 * 1000
})
// 请求拦截器
config.interceptors.request.use(config => {
  // 数据转换
  config.data = qs.stringify(config.data)
  config.headers = {
    // 配置请求头，json格式
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'applicaltion/json'
  }
  // 设置token（目前未使用，后续如果有需求再配置）
  //   const token = Cookies.get('token')
  //   if (token) {
  //     config.params = { token: token } // 如果要求携带在参数中
  //     config.headers.token = token // 如果要求携带在请求头中
  //   }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
config.interceptors.response.use(response => {
  // 成功
  if (response.data.code < 0) {
    // ElMessage.error(response.data.message)
    ElMessage({
      showClose: true,
      message: response.data.message,
      type: 'error'
    })
    return Promise.reject(response)
  } else { return response }
}, error => {
  if (error && error.response) {
    // 系统错误处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break
      case 401:
        error.message = '未授权，请重新登录'
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误,未找到该资源'
        // window.location.href = '/NotFound'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    if (JSON.stringify(error).includes('timeout')) {
      ElMessage.error('服务器响应超时，请刷新当前页')
    }
    error.message = '连接服务器失败'
  }

  // ElMessage.error(error.message)
  ElMessage({
    showClose: true,
    message: error.message,
    type: 'error'
  })
  return Promise.resolve(error.response)
})

export default config
