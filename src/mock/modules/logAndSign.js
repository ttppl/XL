// const Mock = require('mockjs')
// const util = require('../utils')
const mock = {
  path: 'test/login',
  methods: 'post',
  template: {
    code: '1',
    message: '用户不存在',
    data: { 'name|1': '@string' }

  }
  // fn: function (option) {
  //   return {}
  // }
}
export default [mock] // 这里注意一下
