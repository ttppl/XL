import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from '%/elComps'
// require('./router/index')

// import '@/mock/index'
process.env.NODE_ENV !== 'production' && require('@/mock/index')

const app = createApp(App)
if (element.components) {
  element.components.forEach(component => {
    app.component(component.name, component)
  })
}

if (element.plugins) {
  (element.plugins.forEach(plugin => {
    app.use(plugin)
  }))
}

app.use(store).use(router).mount('#app')
