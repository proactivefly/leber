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
     <div v-if='seller.supports' class="support-count">
       <span class='count'>{{seller.supports.length}}个</span>
       <i class='icon-keyboard_arrow_right'></i>
     </div>
  	</div>
  	<!-- 公告 -->
  	<div class='bulletin-wrapper'>
      <span class='bulletin-title'></span><span class='bulletin-text'>{{seller.bulletin}}</span>
      <i class='icon-keyboard_arrow_right'></i>
    </div>
    <!-- 背景图 -->
    <div class='background'>
      <img :src="seller.avatar" width='100%' height='100%'>
    </div>
  </div>
</template>

<script>
export default {
  props:{ //接收父组件数据
  	seller:{
  		type:Object,
  	}
  },
  created(){
  	// console.log(this.seller)
  	this.classMap=['decrease','discount','special','invoice','guatantee'];
  },

  name: 'v-header',

  data(){
    return {

    }
  }
}
</script>

<!-- scoped该样式只作用于该组件 -->
<style scoped lang='stylus' rel='stylusheet/stylus'>

   @import "../../common/stylus/mixin";
   
   .header
      color:#fff
      position:relative
      background:rgba(7,17,27,0.5)
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
            &.decount
              bg-image("discount_1")
            &.guatantee
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
          margin-top:7px
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

</style>
