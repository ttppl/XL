var glob = require('glob')
// 生成入口文件配置
const entryConfig = {
  moduleList: [],
  // 开发的页面配置  默认是编译views下所有的子项目
  createEntryConfig_dev () {
    const entryList = {}
    // 获取所有的moduleList
    glob.sync('./src/views/**/*.html').forEach(item => {
      const projectName = item.split('/')[3]
      if (!this.moduleList.includes(projectName)) {
        this.moduleList.push(projectName)
      }
    })
    for (const name of this.moduleList) {
      entryList[name] = {
        entry: `./src/views/${name}/main.js`,
        template: `./src/views/${name}/index.html`,
        filename: `${name}.html`,
        title: `${name}`,
        chunks: `['chunk-vendors', 'chunk-common', '${name}']`
      }
    }
    console.log('result', entryList)
    return entryList
  },
  // 根据传入的参数来决定要打包哪个页面/项目
  createEntryConfig_build (projectName) {
    console.log(projectName, 'projectname')
    const entryList = {}
    entryList[projectName] = {
      entry: `./src/views/${projectName}/main.js`,
      template: `./src/views/${projectName}/index.html`,
      filename: `${projectName}.html`,
      title: `${projectName}`,
      chunks: `['chunk-vendors', 'chunk-common', '${projectName}']`
    }
    return entryList
  }

}
module.exports = entryConfig
