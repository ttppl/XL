var entryConfig = require('./config/mutiPageConfig')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

var isProduct = process.env.NODE_ENV === 'production'
console.log('变量测试:' + process.env.NODE_ENV)
module.exports = {
  // 应用包基本 URL
  publicPath: isProduct ? './' : './',

  // 打包目录
  outputDir: process.env.OUTDIR,

  // 放置生成的静态资源
  assetsDir: 'assets',

  // 生成的 index.html 的输出路径
  indexPath: 'index.html',

  // 静态资源文件名中包含 hash
  filenameHashing: true,

  // multi-page 模式
  // pages: entryConfig.createEntryConfig_dev(),
  pages: Object.assign(entryConfig.createEntryConfig_dev(), {
    index: './src/main.js' // 配置主入口文件（会生成 app.html，vue cli3并没有提供直接配置入口文件的选项）
    // logAndSign: './src/views/logAndSign/main.js'
  }),

  // 使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // babel-loader 加载的 node_modules 中的文件
  transpileDependencies: [],

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  //   crossorigin:''
  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // integrity: 'true',
  // webpack配置
  configureWebpack: (config) => {
    if (isProduct) {
      // 生产环境
      config.mode = 'production'
    } else {
      // 开发环境
      config.mode = 'development'
    }
  },

  chainWebpack: (config) => {
    config.resolve.alias
      // .set('vue$', 'vue/dist/vue.esm.js')//含 编译器 的 vue 版本时
      .set('@', resolve('src'))
      .set('%', resolve('config'))
      .set('?', resolve('src/components'))
  },

  // css相关配置
  css: {
    // 分离css（插件ExtractTextPlugin）
    extract: true,
    // 开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: false
  },

  // 使用 thread-loader
  parallel: require('os').cpus().length > 1,

  // PWA 插件相关配置
  pwa: {},

  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    // http 代理配置
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: (app) => {}
  },

  // 第三方插件配置
  pluginOptions: {

  }
}
