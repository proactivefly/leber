<template>
	<div class='star' :class='starType'>
		<span v-for='itemClass in itemClasses' :class='itemClass' class='starItem'></span>
	</div>
</template>

<script>
	const LENGTH=5;//定义星星个数
	const CLS_ON='on';//定义星星类型 (全)
	const CLS_HALF='half';//定义星星类型 (半)
	const CLS_OFF='off';//定义星星类型 (无)

	export default{
		// 接受父组件传递的值
		props:{
			size:{ //定义类型
				type:Number
			},
			score:{ //定义接受类型
				type:Number
			}
		},
		computed:{
			// 星星大小48,36，24
			starType(){ //根据size，和score定义动态类型
				return 'star-'+this.size;
			},
			// 星星个数及类型
			itemClasses(){
                let result=[];
                let score=Math.floor(this.score*2)/2;// 向下按0.5取整
                let hasDecimal=score%1!==0;//判断是否有小数，有=>true,无=>false
                let integer=Math.floor(score)//有多少个整数
                //放全星
                for(let i=0;i<integer;i++){
                	result.push(CLS_ON);
                }
                // 如有半个星
                if(hasDecimal){
                	result.push(CLS_HALF)
                }
                // 如有剩余，用空星补全5个星
                while(result.length<LENGTH){
                	result.push(CLS_OFF)
                }
                return result;
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import '../../common/stylus/mixin';

  .star
    font-size:0px
    /* 星星通用样式 */
    .starItem
      display:inline-block
      background-repeat:no-repeat
      &:last-child
        margin-right:0px
    /* 大小为48px时 */
    &.star-48
      .starItem
        width:20px
        height:20px
        margin-right:22px
        background-size:20px 20px
        /* 动态的星星类型（全，半，无 ）*/
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    /* 大小为36px时 */
    &.star-36
       .starItem
        width:15px
        height:15px
        margin-right:6px
        background-size:15px 15px
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
       .starItem
        width:10px
        height:10px
        margin-right:3px
        background-size:10px 10px
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>