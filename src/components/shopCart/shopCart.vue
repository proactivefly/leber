<template>
	<div class="shopCart">
		<div class='content'>
		<div class="content-left">
			<div class="logo-wrapper">
				<div class="logo" :class="{'highLight':totalCount>0}">
					<i class='icon-shopping_cart' :class="{'highLight':totalCount>0}"></i>
				</div>
				<span class="num" v-show="totalCount>0">{{totalCount}}</span>
			</div>
			<div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}</div>
			<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
		</div>
		<div class="content-right">
			<div class="pay" :class="payClass">{{payDesc}}</div>
		</div> 
	</div>
	</div>
	
</template>

<script>
	export default{
		props:{
			deliveryPrice:{
				type:Number,
				deflaut:0
			},
			minPrice:{
				type:Number,
				defalut:0
			},
			selectFoods:{ //父组件传入的数据
				type:Array,
				default(){ //数组的defalut值为函数
					return []
				}
			}
		},
		computed:{
			totalPrice(){
				let total=0;
				this.selectFoods.forEach((food)=>{
					total+=food.price*food.count
				})
				return total
			},
			totalCount(){
				let count=0;
				this.selectFoods.forEach((food)=>{
					count+=food.count;
				});
				return count
			},
			payDesc(){
				if(this.totalPrice===0){
					return `满${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let diff =this.minPrice-this.totalPrice;
					return `还差${diff}元起送`
				}else{
					return "去结算"
				}
			},
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
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
                   &.highLight
                    background:rgb(0,160,220)
                   .icon-shopping_cart
                     font-size:24px
                     color:rgba(255,255,255,0.4)
                     line-height:44px
                     &.highLight
                       color:#fff
                 .num
                    position:absolute
                    top:0px
                    right:0px
                    display:inline-block
                    background:#F01414
                    color:#fff
                    border-radius:16px
                    width:24px
                    height:16px
                    line-height:16px
                    text-align:center
                    font-size:9px
                    font-weight:700
                    box-shadow:0 4px 8px 0 rgba(0,0,0,0.4)
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
                 &.highLight
                    color:#fff
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
              .pay
                  padding:0 8px
                  color:#80858A
                  line-height:48px
                  text-align: center
                  font-size:12px
                  font-weight:700
                  &.not-enough
                    background:#2B333B
                  &.enough
                    background:#00b43c
                    color:#fff
</style>