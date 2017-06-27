<template>
	<transition name='move'>
		<div v-show="showFlag" class='food' ref='food'>
			<div class="food-content">
				<div class="img-header">
					<img :src="food.image"/>
					<div class='back' @click='hide'>
						<i class='icon-arrow_lift'></i>
					</div>
				</div>
				<div class="content">
					<h1 class='title'>{{food.name}}</h1>
					<div class="detail">
						<span class='sell-count'>月售{{food.sellCount}}份</span>
						<span class='rating'>好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class='now'>￥{{food.price}}</span>
						<span class='old' v-show='food.oldPrice'>{{food.oldPrice}}</span>
					</div>
					<div class="cartControl-wrapper">
						<cartControl :food='food'></cartControl>
					</div>
					<div class="buy" v-show='!food.count||food.count===0' 
					@click.stop.prevent='addFirst($event)'>加入购物车
					</div>
				</div>
				<split v-show='food.info'></split>
				<div class="introduce" v-show='food.info'>
					<h1 class='title'>商品介绍</h1>
					<div class="info">{{food.info}}</div>
				</div>
				<split></split>
				<div class="rating">
					<h1 class='title'>商品评价</h1>
					<ratingSelect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
					<div class="ratingWrapper">
						<!-- 评论列表 -->
						<ul v-show='food.ratings && food.ratings.length'>
							<!-- 循环评论列表 -->
							<li v-for='rating in food.ratings' class='rating-item' v-show="needShow(rating.rateType,rating.text)">
								<div>
									<span class="time">{{rating.rateTime}}</span>
									<div class='user'>
										<span class="username">{{rating.username}}</span>
										<img :src="rating.avatar" alt="" width='12' height='12'>
									</div>
									<p class='text'>
										<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
									</p>
								</div>
							</li>
						</ul>
						<!-- 无评价时显示 -->
						<div class="no-ratings" v-show="!food.ratings||!food.ratings.length">暂无评价</div>
					</div>
				</div>
				
			</div>
		</div>
	</transition>
</template>
<script>
	const POSITIVE=0; //好的评价
	const NEGATIVE=1; //差评
	const ALL=2; //所有评价

	import BScroll from 'better-scroll';
	import cartControl from '@/components/cartControl/cartControl';
	import split from '@/components/split/split';
	import ratingSelect from '@/components/ratingSelect/ratingSelect';
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return{
				showFlag:false, //控制food页面显示和隐藏
				selectType:ALL, //控制评价选项切换
				onlyContent:true, //控制评价内容显示隐藏
				desc:{ //为了不写死内容
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		created(){
			this.$root.eventHub.$on('updateSelectType',(newType) => {
				this.selectType=newType;
			});
			this.$root.eventHub.$on('updateOnlyContent',(newContent)=>{
				this.onlyContent=newContent;
			})
		},
		methods:{
			// 父组件可以调用子组件的方法，反之不可以
			show(){
				this.showFlag=true;
				// 组件在多个地方使用，所以每次都要初始化，把评论制为all，onlyContent设置为true
				this.selectType=ALL;
				this.onlyContent=true;
				// 页面被展示了，初始化better-scroll
				// nextTick保证dom被渲染
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scorll=new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						// 从新计算
						this.scroll.refresh()
					}
				})
			},
			hide(){ //返回箭头
				this.showFlag=false
			},
			addFirst(event){
				// 阻止pc端默认行为,event._constucted为betterScroll自己派发的事件
				if(!event._constructed){
					return
				};
				// 对this.food对象添加count属性以便被属性是响应式的
				Vue.set(this.food,'count',1);
				this.food.count=1
			},
			needShow(type,text){
				// 如果只有要显示有内容的，且 没有文本时
				if(this.onlyContent && !text){
					return false
				};
				// 过了上一条，且选择的全部显示
				if(this.selectType===ALL){
					return true;
				}else{ //否则评价类型要与选中的条件一致时才显示
					return type===this.selectType;
				}
			},

		},
		components:{
			cartControl,
			split,
			ratingSelect
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .food
       position:fixed
       left:0
       top:0
       bottom:48px
       z-index:30
       width:100%
       background:#fff
       transition:all 0.2s linear
       transform:translate3d(0,0,0)
       &.move-enter,&.move-leave-active
          transform:translate3d(100%,0,0)
       .img-header
          position:relative
          width:100%
          height:0
          padding-top:100%
          img
            position:absolute
            top:0
            left:0
            width:100%
            height:100%
         .back
            position:absolute
            top:0
            left:10px
            .icon-arrow_lift
               display:block
               padding:10px
               font-size:20px
               color:#fff
       .content
          padding:18px
          position:relative
          .title
            font-size:14px
            font-weight:700
            color:rgb(7,17,27)
            line-height:14px
          .detail
             margin-top:8px
             font-size:10px
             color:rgb(147,153,159)
             line-height:10px
             height:10px
             .sell-count
                margin-right:10px
          .price
            font-weight:700
            line-height:24px
            .now
               font-size:14px
               color:rgb(240,20,20)
               margin-right:8px
            .old
               text-decoration:line-through
               font-size:10px
               color:rgb(147,153,159)
       .cartControl-wrapper
          position:absolute
          right:12px
          bottom:12px
       .buy
          position:absolute
          right:18px
          bottom:18px
          z-index:10
          line-height:24px
          padding:0 12px
          box-sizing: border-box
          font-size:10px
          border-radius:12px
          color:#fff
          background:rgb(0,160,220)
       .introduce
          padding:18px
          .title
             font-size:14px
             line-height:28px
             font-size:200
             color:#000
          .info
             font-size:12px
             line-height:24px
             color:rgb(77,85,93)
       .rating
          padding:18px
          .title
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)
       .ratingWrapper
          border-1px(rgba(7,17,27,0.1))
          .rating-item
            padding:16px 0
            position:relative
            border-1px(rgba(7,17,27,0.1))
            .time
               font-size:10px
               color:rgb(147,153,159)
               line-height:24px
            .user
               position:absolute
               top:16px
               right:0px
               font-size:0px
               line-height:12px
               .username
                 display:inline-block
                 vertical-align:top
                 font-size:10px
                 margin-right:6px
                 color:rgb(147,153,159)
               img
                 vertical-align:top
                 display:inline-block
                 border-radius:50%
            .text
               color:rgb(7,17,27)
               font-size:12px
               line-height:16px
               .icon-thumb_up,.icon-thumb_down
                  line-height:24px
                  margin-right:4px
                  font-size:12px
               .icon-thumb_up
                  color:rgb(0,160,220)
               .icon-thumb_down
                  color:rgb(147,153,159)
</style>