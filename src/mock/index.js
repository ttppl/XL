import Mock from 'mockjs'
// import 'cache-loader/dist/cjs.js'
// import 'babel-loader/lib/index.js'
// import 'eslint-loader/index.js'
// const mockArrNew = require.context('./modules/*.js')
const mockArrNew = require.context('./modules', true, /.js$/)
mockArrNew.keys().forEach(key => {
  const el = mockArrNew(key).default[0]
  Mock.mock(el.path, el.methods, el.template)
})
// Object.values(mockArrNew).map(el => el.default[0]).forEach(key => {
//   const el = mockArrNew(key).default[0]
//   Mock.mock(el.path, el.methods, el.fn)
// })
