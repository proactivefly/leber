<template>
	<div>
    <div class="shopCart">
      <div class='content' @click='toggleList'>
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
        <div class="content-right" @click.stop.prevent='pay'>
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div> 
      </div>
    <!-- <div class="ball-container">
        <transition-group name='drop' v-on:enter='enter' v-on:after-enter:'afterEnter' v-on:before-enter='beforeEnter'>
          <div v-for='ball in balls' v-show='ball.show' class='ball' :key='ball'>
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div> -->
    <!-- 购物车模块 -->
      <transition name='fold'>
        <div class="shopCart-list" v-show='listShow'>
            <div class="list-header">
              <h1 class='title'>购物车</h1>
              <span class='empty' @click='empty'>清空</span>
            </div>
              <div class="list-content" ref='listContent'>
                <ul>
                  <li v-for='food in selectFoods' class='food'>
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                      <span>￥{{food.price*food.count}}</span>
                    </div>
                    <div class="cartControl-wrapper">
                      <cartControl :food='food'></cartControl>
                    </div>
                  </li>
                </ul>
            </div>
        </div>
      </transition>
    </div>
    <transition name='slide'>
      <div class="list-mask" v-show='listShow' @click='hideList'></div>
    </transition>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import cartControl from '@/components/cartControl/cartControl';
	export default{
    data(){
      return{
        balls:[{'show':false},{'show':false},{'show':false},{'show':false},{'show':false}],
        // 保留已经下落的小球到数组dropBall
        dropBalls:[],
        // 购物车折叠状态
        fold:true
      }
    },
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
      // 商品总价
			totalPrice(){
				let total=0;
				this.selectFoods.forEach((food)=>{
					total+=food.price*food.count
				})
				return total
			},
      // 商品数量
			totalCount(){
				let count=0;
				this.selectFoods.forEach((food)=>{
					count+=food.count;
				});
				return count
			},
      // 支付描述
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
      // 去结算class
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
			},
      // 是否展开购物车列表
      listShow(){
        // 如果没商品，购物车折叠
        if(!this.totalCount){
          this.fold=true;
          return false
        };
        let show=!this.fold;
        if(show){
          // 数据变了dom内容并没有立即变化，nextTick之后就可以了
          this.$nextTick(()=>{
            // console.log(this.$refs.listContent);
            if(!this.scroll){
              this.scroll=new BScroll(this.$refs.listContent,{
              click:true
            });
            }else{
              this.scroll.refresh();
            }
          })
        }
        return show;
      }
		},
    created(){
       //在created中监听cartControl组件传来的cart.add事件
        //父组件要执行的方法
       this.$root.eventHub.$on('cart.add',
        (target) => {this._drop(target)}
       )
    },
    methods:{
      // _drop方法
      _drop(el){
        // console.log(el);
        for(let i=0;i<this.balls.length;i++){
          let ball=this.balls[i];
          // 如果ballshi false的话
          if(!ball.show){
            // 去出该球,设置其为true
            ball.show=true;
            // ball.el对象保留该dom
            ball.el=el;
            this.dropBalls.push(ball);
            return
          }
        }
      },
      /*// 动画钩子
      beforeEnter(el){
        console.log('beforeEnter');
        let count=this.balls.length;
        while(count--){
          let ball=this.balls[count];
          if(ball.show){
            // 获取小球相对于视口的位置
            let rect=ball.el.getBoundingClientRect();
            // 获得偏移量
            let x=rect.left-32;
            let y=-(window.innerHeight-rect.top-22);
            el.style.display='';
            el.style.webkitTransform=`translate3d(0,${y}px,0)`;
            el.style.transform=`translate3d(0,${y}px,0)`;
            let inner=el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
            inner.style.transform=`translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el){
        console.log('enter');
        // 触发浏览器重绘
        let rf=el.offestHeight;

        this.$nextTick(()=>{
          // 重置样式
           el.style.webkitTransform='translate3d(0,0,0)';
           el.style.transform='translate3d(0,0,0)';
           let inner=el.getElementsByClassName('inner-hook')[0];
           inner.style.webkitTransform='translate3d(0,0,0)';
           inner.style.transform='translate3d(0,0,0)';
        })
      },
      afterEnter(el){
        console.log('afterEnter');
        let ball=this.dropBalls.shift();
        if(ball){
          ball.show=false;
          el.style.display='none';
        }
      }*/
      //控制购物车点击事件
      toggleList(){
        if(!this.totalCount){
          return
        };
        // 对折叠状态取反
        this.fold=!this.fold;
      },
      empty(){
        // console.log(this.selectFoods);
        this.selectFoods.forEach((food)=>{
          food.count=0;
        })
      },
      // 点击遮罩层隐藏购物车
      hideList(){
        // 重新计算listShow
        this.fold=true
      },
      pay(){
        // 如果总价小于配送价
        if(this.totalPrice<this.minPrice){
          return;
        };
        window.alert('需要支付'+this.totalPrice+'元')
      }
    },
   
    components:{
      cartControl
    }
	}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
  @import "../../common/stylus/mixin";
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
        .shopCart-list
             position:absolute
             top:0
             left:0
             z-index:-1
             width:100%
             transition:all 0.5s
             transform:translate3d(0,-100%,0)
             &.fold-enter,&.fold-leave-active
               transform:translate3d(0,0,0)
             .list-header
               height:40px
               background:#f3f5f7
               padding:0px 18px
               border-1px(#DBDEE1)
               .title
                 font-size:14px
                 line-height:40px
                 font-weight:200
                 color:rgb(7,17,28)
                 float:left
               .empty
                 dipslay:inline-block
                 font-size:14px
                 color:rgb(0,160,220)
                 line-height:40px
                 float:right
             .list-content
               padding:0px 18px
               overflow:hidden
               max-height:217px
               background:#fff
               .food
                 position:relative;
                 padding:12px 0
                 box-sizing:border-box
                 border-1px(rgba(7,17,27,0.1))
                 .name
                   font-size:14px
                   line-height:24px
                   color:rgb(7,17,27)
                 .price
                   position:absolute
                   right:90px
                   bottom:12px
                   font-size:14px
                   font-weight:700
                   line-height:24px
                   color:rgb(240,20,20)
                 .cartControl-wrapper
                   position:absolute
                   right:0px
                   bottom:6px
     .list-mask
       position:fixed
       top:0
       left:0
       height:100%
       width:100%
       background:rgba(7,17,27,0.6)
       transition:all 0.4s ease
       opacity:1
       &.slide-enter,&.slide-leave-active
         opacity:0
         background:rgba(7,17,27,0)
</style>