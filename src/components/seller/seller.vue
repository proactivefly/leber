<template>
	<div class="seller" ref='seller'>
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size='36' :score='seller.score'></star>
					<span class='text'>({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<div class="num">
					<ul>
						<li class='num-item'>
							<h1 class='title'>起送价</h1>
							<p>{{seller.minPrice}}元</p>
						</li>
						<li class='num-item'>
							<h1 class='title'>商家配送</h1>
							<p>{{seller.deliveryPrice}}元</p>
						</li>
						<li class='num-item'>
							<h1 class='title'>平均配送时间</h1>
							<p>{{seller.deliveryTime}}元</p>
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class='title'>公告与活动</h1>
				<p class='text'>{{seller.bulletin}}</p>
			</div>
			<ul class="supports" v-if='seller.supports'>
				<li v-for='(item,index) in seller.supports' class='support-item'>
					<span class='icon' :class='classMap[seller.supports[index].type]'></span>
					<span class='text'>{{seller.supports[index].description}}</span>
				</li>
			</ul>
			<split></split>
			<div class="sellerImg">
				<h1 class='title'>商家实景</h1>
				<div class="imgWrapper" ref='imgWrapper'>
					<ul class='pic-list'ref='picList'>
						<li class='pic-item' v-for="pic in seller.pics">
							<img :src="pic" alt="" width='120' height='90'>
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="sellerInfo">
				<h1 class="title">商家信息</h1>
				<ul class='Infos'>
					<li class='info-item' v-for='info in seller.infos'>{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import star from "@/components/star/star.vue";
	import split from "@/components/split/split.vue";
	import BScroll from "better-scroll";
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee'];
		},
		watch:{
			'seller'(){
				this._initScroll()
			}
		},
		mounted(){
			this._initScroll();
			if(this.seller.pics){
				// 定义图片宽度
				let picWidth=120;
				//定义margin为6px
				let margin=6;
				let width=(picWidth+margin)*this.seller.pics.length-margin;
				console.log(width);
				this.$refs.picList.style.width=width+'px';
				this.$nextTick(()=>{
					this.picScroll=new BScroll(this.$refs.imgWrapper,{
						scrollX:true,//表示横向滚动
						eventPassthrough:'vertical'//竖向滚动时忽略横向滚动
					})
				})
			}
		},
		methods:{
			_initScroll(){
				if(!this.scroll){
					this.scroll=new BScroll(this.$refs.seller,{
						click:true
					})
				}else{
					this.scroll.refresh();
				}
			},
		},
		components:{
			star,split
		}
	}
</script>
<style lang="stylus" rel='stylesheet/stylus'>
	@import "../../common/stylus/mixin"
	.seller
		position:absolute
		top:174px
		left:0px
		bottom:0px
		width:100%
		overflow:hidden
		.overview
			padding:18px
			.title
				font-size:14px
				color:rgb(7,17,27)
				line-height:14px
			.desc
				font-size:0px
				padding:8px 0px 18px 0px
				border-1px(rgba(7,17,27,0.1))
				.star
					display:inline-block
					vertical-align:top
					margin-right:8px
				.text
					display:inline-block
					vertical-align:top
					font-size:10px
					line-height:18px
					color:rgb(77,85,93)
					margin-right:12px
			.num
				ul
					display:flex
					flex-direction: row
					justify-content: space-between
					padding:18px 0
					.num-item
						width:33.3%
						text-align:center
						border-right:1px solid rgba(7,17,27,0.1)
						padding:6px 0
						&:last-child
							border:0px
						.title
							font-size:10px
							line-height:10px
							color:rgb(147,153,159)
							margin-bottom:4px
						p
							font-size:24px
							line-height:24px
							color:rgb(7,17,27)
							font-weight:200
		.bulletin
			padding:18px
			.title
				font-size:14px
				line-height:10px
				color:rgb(7,17,27)
				margin-bottom:8px
			.text
				font-size:12px
				font-weight:200
				color:rgb(240,20,20)
				line-height:24px
		.supports
			padding:0 16px
			.support-item
				padding:16px 12px
				font-size:0px
				border-1px(rgba(7,17,27,0.1))
				font-size:0px
				&:last-child
					border:0
				.icon
					vertical-align:top
					display:inline-block
					width:16px
					height:16px
					margin-right:6px
					background-repeat:no-repeat
					&.decrease
						bg-image("decrease_4")
					&.discount
						bg-image("discount_4")
					&.guarantee
						bg-image('guarantee_4')
					&.invoice
						bg-image('invoice_4')
					&.special
						bg-image('special_4')
					background-size:12px 12px
				.text
					font-size:10px
					line-height:12px
		.sellerImg
			padding:18px
			.title
				font-size:14px
				line-height:10px
				color:rgb(7,17,27)
				margin-bottom:12px
			.imgWrapper
				overflow:hidden
				width:100%
				white-space: nowrap
				.pic-list
					font-size:0px
					.pic-item
						display:inline-block
						margin-right:6px
						width:120px
						height:90px
						&:last-child
							margin-right:0px
		.sellerInfo
			padding:18px
			.title
				font-size:14px
				line-height:10px
				color:rgb(7,17,27)
				margin-bottom:12px
			.info-item
				border-top:1px solid rgba(7,17,27,0.1)
				padding:16px 12px
				font-size:12px
				font-weight:200
				color:rgb(7,17,27)
				line-height:16px
</style>