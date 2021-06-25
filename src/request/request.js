import baseAoxiosRequest from './config'

const request = {
  /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
  // 目前只有post方式，后续新增新的请求方法再添加
  post (url, params) {
    const config = {
      method: 'post',
      url: url
    }
    if (params) config.data = params
    return new Promise((resolve, reject) => {
      baseAoxiosRequest(config).then((response) => {
        resolve(response.data)
      }).catch(function (err) {
        reject(err)
      })
    })
  }
}
// 导出
export default request
