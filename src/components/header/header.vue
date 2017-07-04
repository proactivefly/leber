<template>
  <div class='header'>
  	<div class='content-wrapper'>
  		<div class='avatar'>
  			<img :src="seller.avatar" width="64" height="64">
  		</div>
  		<div class='content'>
  		   <div class='title'>
  		   	  <span class='brand'></span>
  		   	  <span class='name'>{{seller.name}}</span>
  		   </div>
  		   <div class='description'>
  		   	{{seller.description}}/{{seller.deliveryTime}}分钟送达
  		   </div>
  		   <div v-if='seller.supports' class='supports'>
  		   	  <span class='icon' :class='classMap[seller.supports[0].type]'></span>
  		   	  <span class='text'>{{seller.supports[0].description}}</span>
  		   </div>
  		</div>
     <div v-if='seller.supports' class="support-count" @click='showDetail'>
       <span class='count'>{{seller.supports.length}}个</span>
       <i class='icon-keyboard_arrow_right'></i>
     </div>
  	</div>
  	<!-- 横幅公告 -->
  	<div class='bulletin-wrapper' @click='showDetail'>
      <span class='bulletin-title'></span><span class='bulletin-text'>{{seller.bulletin}}</span>
      <i class='icon-keyboard_arrow_right'></i>
    </div>
    <!-- 背景图 -->
    <div class='background'>
      <img :src="seller.avatar" width='100%' height='100%'>
    </div>
    <!-- 商家详情 -->
    <transition name='fade'>
      <div class='detail' v-show='detailShow'>
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class='name'>{{seller.name}}</h1>
            <div class='star-wrapper'>
              <star :size='48' :score="seller.score"></star>
            </div>
            <div class='title'>
              <div class='line'></div>
              <div class="text">优惠信息</div>
              <div class='line'></div>
            </div>
            <ul class="supports" v-if='seller.supports'>
              <li v-for='(item,index) in seller.supports' class='support-item'>
                <span class='icon' :class='classMap[seller.supports[index].type]'></span>
                <span class='text'>{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class='title'>
              <div class='line'></div>
              <div class="text">商家公告</div>
              <div class='line'></div>
            </div>
            <div class='bulletin'>
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class='detail-close'>
          <i class='icon-close' @click='closeDetail'></i>
        </div>
      </div>
    </transition>  
  </div>
</template>

<script>
import star from '@/components/star/star';
export default {
  props:{ //接收父组件数据
  	seller:{
  		type:Object,
  	}
  },
  created(){
  	// console.log(this.seller)
  	this.classMap=['decrease','discount','special','invoice','guarantee'];
  },

  name: 'v-header',

  data(){
    return {
      detailShow:false
    }
  },
  methods:{
    showDetail(){
      this.detailShow=true
    },
    closeDetail(){
      this.detailShow=false
    }
  },
  components:{ //注册组件
    star
  }
}
</script>

<!-- scoped该样式只作用于该组件 -->
<style scoped lang="stylus" rel="stylesheet/stylus">

   @import "../../common/stylus/mixin";
   
   .header
      color:#fff
      position:relative
      background:rgba(7,17,27,0.5)
      overflow:hidden
      .content-wrapper
        padding:24px 12px 18px 24px
        font-size:0px
        position:relative
      .avatar
        display:inline-block
        vertical-align:top
        img
        border-radius:2px
      .content
        display:inline-block
        margin-left:16px
        .title
          margin:2px 0 8px 0
          .brand
            display:inline-block
            width:30px
            height:18px
            bg-image("brand")
            /* 把背景设置成容器大小 */
            background-size:30px 18px
            background-repeat:no-repeat
            vertical-align:top
          .name
            margin-left:6px
            font-size:16px
            line-height:18px
            font-weight:bold
        .description
          margin-bottom:10px
          line-height:12px
          font-size:12px
        .supports
          .icon
            vertical-align:top
            display:inline-block
            width:12px
            height:12px
            margin-right:4px
            background-repeat:no-repeat
            &.decrease
              bg-image("decrease_1")
            &.discount
              bg-image("discount_1")
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
            background-size:12px 12px
          .text
            font-size:10px
            line-height:12px
      .support-count
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px
        height:24px
        line-height:24px
        border-radius:14px
        background:rgba(0,0,0,0.2)
        text-align:center
        .count
          font-size:10px
          vertical-align:top
        .icon-keyboard_arrow_right
          font-size:10px
          line-height:27px
          margin-left:2px
      .bulletin-wrapper
        height:28px
        line-height:28px
        padding:0 22px 0 12px
        position:relative
        background-color:rgba(7,17,27,0.2)
        /* 超出部分。。。表示 */
        white-space:nowrap
        overflow:hidden
        text-overflow:ellipsis
        .bulletin-title
          display:inline-block
          width:22px
          height:12px
          bg-image:('bulletin')
          background-size:22px 12px
          background-repeat:no-repeat
          vertical-align:top
          margin-top:8px
        .bulletin-text
          font-size:10px
          margin:0 4px
          vertical-align:top
        .icon-keyboard_arrow_right
          font-size:10px
          position:absolute
          right:12px
          top:10px
      .background
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
        z-index:-1
        filter:blur(10px)
      /* sticky-footer */
      .detail
        position:fixed
        top:0px
        left:0px
        z-index:100
        width:100%
        height:100%
        overflow:auto
        background:rgba(7,17,27,0.8)
        /* 定义动画 */
        transition:all 0.5s
        &.fade-enter,&.fade-leave-active
          opacity:0
        .detail-wrapper
          min-height:100%
          width:100%
          .detail-main
            margin-top:64px
            padding-bottom:64px
            .name
              font-size:18px
              font-weight:700
              color:rgb(255,255,255)
              line-height:18px
              text-align:center
            .star-wrapper
              text-align:center
              margin-top:16px
              padding:2px 0px
            .title
               display:flex
               width:80%
               margin:28px auto 24px auto
               .line
                  flex:1
                  position:relative
                  top:-6px
                  border-bottom:1px solid rgba(255,255,255,0.2)
               .text
                  padding:0px 12px
                  font-size:14px
                  font-weight:700
            .supports
                width:80%
                margin:0 auto
                font-size:12px
                line-height:12px
                .supports-item
                    padding:0 12px
                    margin-bottom:12px
                    font-size:0
                    &:last-child
                      margin-bottom:0
                  .icon
                      display:inline-block
                      width:16px
                      height:16px
                      background-size:16px 16px
                      background-repeat:no-repeat
                      margin-right:6px
                      margin-bottom:12px
                      vertical-align:top
                      &.decrease
                        bg-image("decrease_2")
                      &.discount
                        bg-image("discount_2")
                      &.guarantee
                        bg-image('guarantee_2')
                      &.invoice
                        bg-image('invoice_2')
                      &.special
                        bg-image('special_2')
                  .text
                     font-size:12px
                     line-height:16px
                     vertical-align:top
            .bulletin
               width:80%
               margin:0 auto
               p
                  padding:0 12px
                  line-height:24px
                  font-size:12px
        .detail-close
          position:relative
          width:32px
          height:32px
          margin:-64px auto 0 auto
          font-size:32px
          clear:both
</style>
