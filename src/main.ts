import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:svg-icons-register'
import pinia from './store'
import gloalComponent from '@/components'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router'
//引入自定义指令文件
import { isHasButton } from '@/directive/has'
const app = createApp(App)
app.use(pinia)
app.use(gloalComponent)
isHasButton(app)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
import './permisstion'
app.mount('#app')
