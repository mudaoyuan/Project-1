/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
//路由鉴权 项目当真路由能不能被访问的权限的设置(某一个路由在什么条件可以访问)
import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'
let userStore = useUserStore(pinia)

//全局守卫:项目当中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`
  //to:你将要访问的那个路由
  //from:你从哪个路由而来
  //next:路由的放行函数
  //访问某一个路由之前会触发的钩子
  nprogress.start()
  // eslint-disable-next-line prefer-const
  let token = userStore.token
  let username = userStore.username
  if (token) {
    //用户已登录
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //有用户信息
      if (username) {
        next()
      } else {
        //没有用户信息
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          //token过期，获取不到用户信息
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

//全局后置守卫
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done()
})

//1.进度条
//2.路由鉴权
//3.全局路由组件:登录|404|任意路由

//用户未登录，只能访问login
//用户已登录，不能访问login,其余可以访问
