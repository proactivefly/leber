<template>
	<div class="cartControl">
		<!-- 显示时触发动画 -->
		<transition name='move'>
			<div class="cartDecrease" v-show="food.count>0" @click="decrease($event)">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="count" v-show="food.count>0">{{food.count}}</div>
		<div class="add icon-add_circle" @click='addCart($event)'></div>
	</div>
</template>

<script>
	//为什么改变count后没有变化呢，因为food的count字段是新增的不会动态监听
	import Vue from "vue";
	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addCart(event){
				// 阻止pc端默认行为,event._constucted为betterScroll自己派发的事件
				if(!event._constructed){
					return
				};
				if(!this.food.count){
					// 对this.food对象添加count属性以便被属性是响应式的-------------------------
					Vue.set(this.food,'count',1);
					this.food.count=1;
				}else{
					this.food.count++
				};
				// console.log(this.food.count)
				// 派发事件，向外传出dom对象（this.$root代表根）-----------------------------------------
				this.$root.eventHub.$emit('cart.add', event.target);
			},
			decrease(event){
				if(!event._constructed){
					return
				};
				if(this.food.count>=0){
					this.food.count--
				}

			}
		}
	}	
</script>

<style lang="stylus" rel='stylesheet/stylus'>
    .cartControl
       font-size:0px
       .cartDecrease
          display:inline-block
          padding:6px
          // 定义过度效果
          transition:all 0.4s linear
          // 开启硬件加速，使动画变得更流畅
          transform:translate3D(0,0,0)
          opacity:1
          // 定义动画离开和结束过度过程
          &.move-enter,&.move-leave-active
            opacity:0
            transform:translate3D(24px,0,0)
            .inner
              transform:rotate(180deg)
          .inner
             color:rgb(0,160,220)
             font-size:24px
             line-height:24px
             display:inline-block
             transition:all 0.4s linear
             trnasform:rotate(0px)
       .count
          display:inline-block
          font-size:10px
          width:12px
          padding-top:6px
          line-height:24px
          text-align: center
          color:rgb(147,153,159)
          vertical-align:top
       .add
          display:inline-block
          color:rgb(0,160,220)
          padding:6px
          font-size:24px
          line-height:24px
</style>