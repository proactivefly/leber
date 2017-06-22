// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import vueResource from 'vue-resource';
// 导入router配置文件
import router from './router';
//加载index.styl文件
import './common/stylus/index.styl';

Vue.config.productionTip = false;
// 使用vue-resource
Vue.use(vueResource);
/* eslint-disable no-new*/
new Vue({
  el: '#app',
  data: {
    eventHub: new Vue()
  },
  router, //导入路由配置
  template: '<App/>', 
  components: { App } //导入模板
})
