<template>
	<div class='goods'>
		<div class="menu-wrapper" ref='menuWrapper'>
			<ul>
				<li v-for='(item,index) in goods' class='menu-item' :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class='text border-1px'>
						<span v-show='item.type>0' class='icon' :class='classMap[item.type]'></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodsWrapper'>
			<ul>
				<!-- 商品分类 -->
				<li v-for='item in goods' class='foods-list foods-list-hook'>
					<h1 class='title'>{{item.name}}</h1>
					<ul>
						<!--商品分类下的商品  -->
						<li v-for='food in item.foods' class='food-item border-1px' @click='selectFood(food,$event)'>
							<div class='icon'>
								<img :src="food.icon" width='57' height='57'>
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class='desc'>{{food.description}}</p>
								<div class='extra'>
									<span class='count'>月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class='now'>￥{{food.price}}</span>
									<span v-show='food.oldPrice' class='old'>￥{{food.oldPrice}}</span>
								</div>
								<div class="cartControlWrapper">
									<!-- 添加删除按钮组件 -->
									<cartControl :food="food"></cartControl>
								</div>
							</div>
						</li>
					</ul>

				</li>
			</ul>
		</div>
		<!-- 购物车组件 -->
		<shopCart :deliveryPrice='seller.deliveryPrice' :minPrice='
		seller.minPrice' :selectFoods='selectFoods'></shopCart>
		<!-- 具体食物组件 -->
		<food :food="selectedFood" ref='food'></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopCart from '@/components/shopCart/shopCart';
	import cartControl from '@/components/cartControl/cartControl';
	import food from '@/components/food/food';
	const ERR_OK=0;
	export default{
		props:{
			seller:{ //App.vue组件中router-view传过来，还会用到商家信息
				type:Object
			}
		},
		data(){
			return { //初始化商品信息
				goods:[],
				listHeight:[],//储存列表分割高度
				scrollY:0,
				selectedFood:{}
			}
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee'];
			this.$http.get('/api/goods').then((response)=>{
		        response=response.body;
		        // console.log(response);
		        if(response.errno===ERR_OK){
		          this.goods=response.data;
		          
		          /*dom更新之后调用滚动方法*/ 
		          this.$nextTick(()=>{
		            //调用滚动方法
		          	this._initScroll();
		          	this._computerHeight();
		          	// console.log(this.listHeight);
		          })
		          
		        }
		    });
		},
		methods:{
			_initScroll(){ //实例化滚动元素
				// console.log(this.$refs);
				this.menuScroll=new BScroll(this.$refs.menuWrapper,{
					click:true //click事件默认被阻止，开锁
				});//菜单
				this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
					probeType:3, //监听foodsScroll滚动时的位置
					click:true //click事件默认被阻止，开锁
				});
				// 为foodsScroll监听滚动事件，以便暴露位置pos
				this.foodsScroll.on('scroll',(pos)=>{
					/*获得foodsWrapper元素y轴滚动距离，转换成整数并取绝对值*/
					this.scrollY=Math.abs(Math.round(pos.y));
					// console.log(this.scrollY);
				})
			},
			// 动态关联菜单，高亮显示
			_computerHeight(){
				// 拿到class为food-list-hook的dom元素
				let foodsList=this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
				let height=0;
				this.listHeight.push(height);
				for(let i=0;i<foodsList.length;i++){
					// 获得每一个list的高度
					let item=foodsList[i];
					// 获得第一个元素的clientHeight（dom元素实际高度+padding值）高度
					height+=item.clientHeight;
					// 添加到高度数组listHeight中
					this.listHeight.push(height);
				}

			},
			selectMenu(index,event){
				// 阻止pc端默认行为,event._constucted为betterScroll自己派发的事件
				if(!event._constructed){
					return
				}
				// 使右侧滚动到相应位置
				let foodsList=this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook');
				// 拿到dom元素
				let el=foodsList[index];
				// 滚动到那个位置
				this.foodsScroll.scrollToElement(el,500);
			},
			// 选中商品查看food的详情
			selectFood(food,event){
				// 阻止pc端默认行为,event._constucted为betterScroll自己派发的事件
				if(!event._constructed){
					return
				};
				// 把被选中的food保存在selectedFood中
				this.selectedFood=food;
				// 调用子组件方法show方法------------------------------------
				this.$refs.food.show();
			}
		},
		computed:{
			// 计算当前滚动到的位置
			currentIndex(){ //左侧当前索引
				for(let i=0;i<this.listHeight.length;i++){
					// 获得当前索引值高度
					let height1=this.listHeight[i];
					// 获得下一个索引值高度
					let height2=this.listHeight[i+1];
					// 如果滚动的位置落到了两个位置的区间
					if(!height2||this.scrollY>height1&&this.scrollY<height2){
						return i
					}
				};
				return 0
			},
			selectFoods(){
				let foods=[];
				this.goods.forEach((good)=>{// 每一个商品类别
					good.foods.forEach((food)=>{ //每一个商品
					   //如果某个商品数量大于0,则添加该商品对象到数组foods中
					   if(food.count>0){
					   	 foods.push(food)
					   }
					})
				});
				// 返回foods给selectFoods
				// console.log(foods);
				return foods
			}
		},
		components:{
			shopCart,
			cartControl,
			food
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    
    @import '../../common/stylus/mixin.styl';

    .goods
       display:flex
       width:100%
       position:absolute
       top:174px
       bottom:46px
       overflow:hidden
       .menu-wrapper
          flex:0 0 80px
          background:#f3f5f7
          .menu-item
             display:table
             line-height:14px
             height:54px
             width:56px
             padding:0 12px
             &.current
                position:relative
                z-index:10
                margin-top:-1px
                font-weight:700
                background:#fff
                .text
                   border-none()
             .icon
                display:inline-block
                width:12px
                height:12px
                margin-right:2px
                background-repeat:no-repeat
                &.decrease
                  bg-image("decrease_3")
                &.discount
                  bg-image("discount_3")
                &.guartantee
                  bg-image('guarantee_3')
                &.invoice
                  bg-image('invoice_3')
                &.special
                  bg-image('special_3')
                background-size:12px 12px
              .text
                display:table-cell
                font-size:12px
                width:56px
                vertical-align:middle
                border-1px(rgba(7,17,27,0.1))
       .foods-wrapper
          flex:1
          .title
            height:26px
            line-height:26px
            padding-left:14px
            border-left:2px solid #d9dde1
            background:#f3f5f7
            color:rgb(147,153,159)
            font-size:12px
          .food-item
            display:flex
            margin:18px
            padding-bottom:18px
            border-1px(rgba(7,17,27,0.1))
            &:last-child
              border-none()
              margin-bottom:0px
            .icon
              flex:0 0 57px
              margin-right:10px
            .content
              flex:1
              .name
                margin:2px 0 8px 0
                font-size:14px
                color:rgb(7,17,27)
                line-height:14px
              .desc
                margin-bottom:8px
                line-height:12px
                font-size:10px
                color:rgb(147,153,159)
              .extra
                margin-bottom:8px
                fot-size:10px
                line-height:10px
                color:rgb(147,153,159)
                .count
                  margin-right:12px
              .price
                line-height:24px
                .now
                  margin-right:8px
                  font-size:14px
                  color:#e4393c
                  font-weight:700
                  vertical-align:middle
                .old
                  font-size:10px
                  color:rgb(147,153,159)
                  text-decoration:line-through
                  font-weight:700
                  vertical-align:middle
              .cartControlWrapper
                 position:absolute
                 right:0px
                 bottom:12px
</style>