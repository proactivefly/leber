//路由配置js文件
import Vue from 'vue' //导入vue主组件
import Router from 'vue-router' //导入vue-router
import Header from '@/components/header/header.vue' //导入header组件，@代表src
/*使用vue-router*/
Vue.use(Router)
/*导出路由配置文件*/
export default new Router({
  routes: [
    {
      path: '/',
      name: 'header',
      component: Header
    }
  ]
})
