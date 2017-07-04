<template>
  <div id="app">
    <!--header组件,vue父组件传递给header组件数据-->
    <v-header :seller="seller"></v-header>

    <!--内容区块-->
    <div class='tab border-1px'>
      <div class="tab-item">
          <router-link to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
          <router-link to='/ratings'>评论</router-link>
      </div>
      <div class="tab-item">
          <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <!-- 组件内容 -->
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>
  </div>
</template>

<script>
//导入header组件，@代表src
import header from '@/components/header/header.vue';

import {urlParse} from "@/common/js/util.js";
const ERR_OK=0;
export default {
  name: 'app',
  data(){
    return{
      seller:{
        id:(()=>{
          let queryParam=urlParse();
          // console.log(queryParam.id);
          return queryParam.id;
        })()
      }
    }
  },

  created(){ //创建vue后之后
    this.$http.get('/api/seller?id='+this.seller.id).then((response)=>{
        response=response.body;
        // console.log(response);
        if(response.errno===ERR_OK){
          // 三个参数。最终返回的结果，在id的基础上，添加response.data数据，然后赋值给空对象
          this.seller=Object.assign({},this.seller,response.data);
          console.log(this.seller.id);
        }
    })
  },
  components:{
    'v-header':header,
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
/*引入css函数*/
  @import "./common/stylus/mixin.styl"
     #app
      .tab
        display:flex
        width:100%
        height:40px
        line-height:40px
        // border-bottom:1px solid rgba(7,17,27,0.1)
        border-1px(rgba(7,17,27,0.1))
        .tab-item
          flex:1
          text-align:center
          &>a
           display:block
           font-size:14px
           color:rgb(77,85,93)
           &.active
            color:rgb(240,20,20)
</style>
