<template>
	<div class="ratings" ref='ratings'>
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class='score'>{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					 <div class="starWrapper">
					 	<span class='title'>商品得分</span>
					 	<star :size='36' :score="seller.foodScore" class='star'></star>
					 	<span class="score">{{seller.foodScore}}</span>
					 </div>
					 <div class="starWrapper">
					 	<span class='title'>服务态度</span>
					 	<star :size='36' :score="seller.serviceScore" class='star'></star>
					 	<span class="score">{{seller.serviceScore}}</span>
					 </div>
					 <div class="deliveryTime">
					 	<span class='title'>送达时间</span>
					 	<span class='time'>{{seller.deliveryTime}}分钟</span>
					 </div>
				</div>
			</div>
			<split></split>
			<ratingSelect :selectType='selectType' :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingSelect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class='rating-item' v-show="needShow(rating.rateType,rating.text)">
						<!-- 头像左兰 -->
						<div class="avatar">
							<img :src="rating.avatar" alt="" width="28" height='28'>
						</div>
						<!--  内容-->
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size='24' :score='rating.score' class='star'></star>
								<span class='deliveryTime' v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟</span>
							</div>
							<p class='text'>{{rating.text}}</p>

							<div class="recommend" v-show='rating.recommend && rating.recommend.length'>
								<span class='icon-thumb_up'></span>
								<span v-for='item in rating.recommend' class='item'>{{item}}</span>
							</div>
							<!-- 绝对定位事件 -->
							<div class="time">{{rating.rateTime|formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import star from "@/components/star/star";
import split from "@/components/split/split";
import ratingSelect from "@/components/ratingSelect/ratingSelect";
import {formatDate} from "@/common/js/date.js";
import BScroll from 'better-scroll';
	const ERR_OK=0;
	const POSITIVE=0; //好的评价
	const NEGATIVE=1; //差评
	const ALL=2; //所有评价

	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				selectType:ALL, //控制评价选项切换
				onlyContent:false, //控制评价内容显示隐藏
				desc:{ //为了不写死内容
					all:'全部',
					positive:'满意',
					negative:'不满意'
				},
				ratings:[]
			}
		},
		created(){
			this.$http.get('/api/ratings').then((response)=>{
				response=response.body;
				if(response.errno===ERR_OK){
					this.ratings=response.data;
					// console.log(this.ratings);
					// dom数据更新之后
					this.$nextTick(()=>{
						// 初始化better scroll
						this.scroll=new BScroll(this.$refs.ratings,{
							click:true,
						});
					})
					
				}
			});
			// 接受子组件传递的消息
			this.$root.eventHub.$on('updateSelectType',this.updateSelectType);
			this.$root.eventHub.$on('updateOnlyContent',this.updateOnlyContent);
		},
		methods:{
			// 更改状态----------------------------------
			updateSelectType(newType){
				this.selectType=newType;
			},
			updateOnlyContent(newContent){
				this.onlyContent=newContent;
			},
			needShow(type,text){
				// 如果只有要显示有内容的，且 该条没有文本时就隐藏
				if(this.onlyContent && !text){
					return false
				};
				// 过了上一条，且选择的全部显示
				if(this.selectType===ALL){
					return true;
				}else{ //否则判断当前条评价  是否  和用户选的评级类型相等，相等为true显示，不相等false不显示
					return type===this.selectType;
				}
			},
		},
		components:{
			star,
			split,
			ratingSelect
		},
		filters:{
			formatDate(time){
				//把毫秒数——>中国标准时间  形如Thu Jun 29 2017 21:23:54 GMT+0800 (中国标准时间)
				let date=new Date(time);
				// 定义通用方法
				return formatDate(date,'yyyy-MM-dd hh:mm');
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
	.ratings
		position:absolute
		top:174px
		left:0px
		bottom:0px
		width:100%
		overflow:hidden
		.overview
			display:flex
			padding:18px 0
			.overview-left
				flex:0 0 137px
				width:137px
				border-right:1px solid rgba(7,17,27,0.1)
				text-align: center
				padding:6px 0
				@media only screen and (max-width:320px)
					flex:0 0 120px
					width:120px
				.score
					font-size:24px
					color:rgb(255,153,0)
					line-height:28px
					margin-bottom:6px
				.title
					font-size:12px
					line-height:12px
					color:rgb(7,17,27)
					margin-bottom:8px
				.rank
					font-size:10px
					line-height:10px
					color:rgb(147,153,159)
			.overview-right
				flex:1
				padding:6px 0 6px 24px
				@media only screen and (max-width:320px)
					padding-left:6px
				.starWrapper
					margin-bottom:8px
					line-height:18px
					font-size:0
					.title
						font-size:12px
						line-height:18px
						color:rgb(7,17,27)
						vertical-align:top
					.star
						display:inline-block
						vertical-align:top
						margin:0 6px
					.score
						display:inline-block
						vertical-align:top
						font-size:12px
						color:rgb(255,153,0)
				.deliveryTime
					.title
						font-size:12px
						line-height:18px
						color:rgb(7,17,27)
						margin-right:12px
					.time
						font-size:12px
						line-height:18px
						color:rgb(147,153,159)
		.ratingselect
			padding:18px
		.rating-wrapper
			padding: 0 18px
			.rating-item
				display:flex
				padding:18px 0
				border-1px(rgba(7,17,27,0.1))
			.avatar
				flex:0 0 40px
				img
					border-radius:50%
			.content
				flex 1
				position:relative
				.name
					font-size:10px
					line-height:12px
					color:rgb(7,17,27)
					margin-bottom:4px
				.star-wrapper
					margin-bottom:6px
					font-size:0px
					.star
						display:inline-block
						vertical-align:top
						margin-right:6px
					.deliveryTime
						display:inline-block
						vertical-align:top
						font-size:10px
						line-height:12px
						color:rgb(147,153,159)
				.text
					font-size:12px
					color:rgb(7,17,27)
					line-height:18px
					margin-bottom:8px
				.recommend
					line-height:16px
					font-size:0px
					.icon-thumb_up,.item
						display:inline-block
						margin:0px 8px 4px 0px
						font-size:9px
					.icon-thumb_up
						color:rgb(0,160,220)
					.item
						padding:0px 6px
						border:1px solid rgba(7,17,27,0.1)
						border-radius:1px
						color:rgb(147,153,159)
						background:#fff
				.time
					position:absolute
					right:0px
					top:-9px
					font-size:10px
					font-weight:200
					color:rgb(147,153,159)
					line-height:24px
</style>
