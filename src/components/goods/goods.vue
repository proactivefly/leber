<template>
	<div class='goods'>
		<div class="menu-wrapper" ref='menuWrapper'>
			<ul>
				<li v-for='(item,index) in goods' class='menu-item' :class="{'current':currentIndex===index}">
					<span class='text border-1px'>
						<span v-show='item.type>0' class='icon' :class='classMap[item.type]'></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodsWrapper'>
			<ul>
				<li v-for='item in goods' class='foods-list foods-list-hook'>
					<h1 class='title'>{{item.name}}</h1>
					<ul>
						<li v-for='food in item.foods' class='food-item border-1px'>
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
							</div>
						</li>
					</ul>

				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	const ERR_OK=0;
	export default{
		props:{
			seller:{ //还会用到商家信息
				type:Object
			}
		},
		data(){
			return { //初始化商品信息
				goods:[],
				listHeight:[],
				scrollY:0
			}
		},
		created(){
			this.classMap=['decrease','discount','special','invoice','guarantee'];
			this.$http.get('/api/goods').then((response)=>{
		        response=response.body;
		        console.log(response);
		        if(response.errno===ERR_OK){
		          this.goods=response.data;
		          // console.log(this.goods)
		          // dom更新之后调用滚动方法
		          this.$nextTick(()=>{
		            //调用滚动方法
		          	this._initScroll();
		          	this._computerHeight();
		          })
		          
		        }
		    })
		},
		methods:{
			_initScroll(){ //实例化滚动元素
				console.log(this.$refs);
				this.menuScroll=new BScroll(this.$refs.menuWrapper,{});//菜单
				this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
					probeType:3 //监听foodsScroll滚动时的位置
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
				let foodsList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
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

			}
		},
		computed:{
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
			}
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
</style>