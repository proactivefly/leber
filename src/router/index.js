//路由配置js文件
import Vue from 'vue' //导入vue主组件
import Router from 'vue-router' //导入vue-router
import goods from '@/components/goods/goods.vue'
import ratings from '@/components/ratings/ratings.vue'
import seller from '@/components/seller/seller.vue'
/*使用vue-router*/
Vue.use(Router)
/*导出路由配置文件*/
export default new Router({
  linkActiveClass:'active', //修改默认的router-link-active
  routes: [
    {
      path: '/',
      name: 'goods',
      component: goods
    },
    {
    	path:'/goods',
    	name:'goods',
    	component:goods
    },
    {
    	path:'/ratings',
    	name:'ratings',
    	component:ratings
    },
    {
    	path:'/seller',
    	name:'seller',
    	component:seller
    }
  ]
})
