<template>
	<div class="shopCart">
		<div class='content'>
		<div class="content-left">
			<div class="logo-wrapper">
				<div class="logo">
					<i class='icon-shopping_cart'></i>
				</div>
			</div>
			<div class="price">￥23</div>
			<div class="desc">另需配送费{{deliveryPrice}}元</div>
		</div>
		<div class="content-right">
			
		</div>
	</div>
	</div>
	
</template>

<script>
	export default{
		props:{
			deliveryPrice:{
				type:Number
			},
			minPrice:{
				type:Number
			}
		}
	}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
     .shopCart
        position:fixed
        bottom:0
        left:0
        z-index:50
        width:100%
        height:48px
        .content
           display:flex
           background:#141d27
           .content-left
              flex:1
              padding-right:12px
              .logo-wrapper
                 display:inline-block
                 position:relative
                 top:-10px
                 padding:6px
                 border-radius:50%
                 margin:0 12px
                 background:#141d27
                 width:56px
                 height:56px
                 box-sizing: border-box
                 vertical-align:top
                 .logo
                   width:100%
                   height:100%
                   background:#2b343c
                   border-radius:50%
                   text-align:center
                   .icon-shopping_cart
                     font-size:24px
                     color:rgba(255,255,255,0.4)
                     line-height:44px
              .price
                 display:inline-block
                 font-size:16px
                 line-height:24px
                 color:#80858A
                 font-weight:700
                 vertical-align:top
                 box-sizing:border-box
                 padding-right:12px
                 border-right:1px solid rgba(255,255,255,0.1)
                 margin-top:12px
              .desc
                 display:inline-block
                 vertical-align:top
                 margin:12px 0 0 12px
                 font-size:10px
                 line-height:24px
                 color:#80858A
           .content-right
              flex:0 0 105px
              width:105px
</style>