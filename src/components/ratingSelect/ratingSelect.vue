<template>
	<div class="ratingselect">
		<div class="ratingType">
			<span class='block positive' :class="{'active':typeNumber===2}" @click="select(2,$event)">{{desc.all}}<span class='count'>{{ratings.length}}</span></span>
			<span class='block positive' :class="{'active':typeNumber===0}"  @click="select(0,$event)">{{desc.positive}}<span class='count'>{{positive.length}}</span></span>
			<span class='block negative' :class="{'active':typeNumber===1}"  @click="select(1,$event)">{{desc.negative}}<span class='count'>{{negative.length}}</span></span>
		</div>
		<div class="switch" :class="{'on':onlyContentPro}" @click="toggleContent">
			<span class='icon-check_circle' ></span>
			<span class='text'>只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
	const POSITIVE=0; //好的评价
	const NEGATIVE=1; //差评
	const ALL=2; //所有评价
	export default{
		props:{ //从父组件接收到的函数
			ratings:{
				type:Array,
				default(){ //数组和对象default都是函数
					return []
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:true
			},
			desc:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		// 为了解决vue2.0升级后子组件不能修改父组件prop的属性值
		data(){
			return {
				'typeNumber':this.selectType,
				'onlyContentPro':this.onlyContent
			}
		},
		computed:{
			positive(){
				return this.ratings.filter((rating)=>{
					// return 后边跟着过滤条件，返回复合条件的数组
					return rating.rateType===POSITIVE;
				})
			},
			negative(){
				return this.ratings.filter((rate)=>{
					return rate.rateType===NEGATIVE;
				})
			}
		},
		methods:{
			// 给按钮添加事件
			select(type,event){
				// 阻止pc端默认行为,event._constucted为betterScroll自己派发的事件
				if(!event._constructed){
					return
				};
				// 控制active状态切换，数值不同，不同按钮挂上class
				this.typeNumber=type;
				console.log(this.typeNumber);
				// 通知父组件状态发生变化
				this.$root.eventHub.$emit('updateSelectType', this.typeNumber);
			},
			toggleContent(){
				// 阻止pc端默认行为,event._constucted为betterScroll自己派发的事件
				if(!event._constructed){
					return
				};
				this.onlyContentPro=!this.onlyContentPro;
				// 通知父组件
				this.$root.eventHub.$emit('updateOnlyContent', this.onlyContentPro);
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.ratingselect
		.ratingType
			padding:18px 0
			font-size:0px
			border-1px(rgba(7,17,27,0.1))
			.block
				padding:8px 12px
				font-size:12px
				margin-right:8px
				border-radius:1px
				color:rgb(77,85,93)
				&.active
					color:#fff
				.count
					font-size:8px
					margin-left:2px
					line-height:16px
				&.positive
					background:rgba(0,160,220,0.2)
					&.active
						background:rgb(0,160,220)
				&.negative
					background:rgba(77,85,93,0.2)
					&.active
						background:rgb(77,85,93)
		.switch
			padding:12px 0 0 0
			line-height:24px
			font-size:0px
			color:rgb(147,153,159)
			&.on
				.icon-check_circle
					color:#00c850
			.icon-check_circle
				display:inline-block
				vertical-align:top
				font-size:24px
				margin-right:4px
			.text
				display:inline-block
				font-size:12px
				vertical-align:top
</style>