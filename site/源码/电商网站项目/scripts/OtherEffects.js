//楼层滚动特效
$(function() {
	var colorArray = ["#44aeb8","#93d56f","#f55826","#ba9eee","#fe7594","#c2ed50","#c2341c","#eaab1d"];
	$("#layerScroll li").hover(
//		移入
		function() {
//			存放背景色
//			var colorArray = ["#44aeb8","#93d56f","#f55826","#ba9eee","#fe7594","#c2ed50","#c2341c","#eaab1d"];
//			改变宽度和背景图片位置
			$(this).animate({
				width:40,
				backgroundPositionX:-40
			},100);
//			改变背景颜色
			$(this).css("background-color",colorArray[$(this).index()]);
		},
//		移出
		function() {
//			恢复宽度和背景图片位置
			$(this).animate({
				width:0,
				backgroundPositionX: 0
			},100);
//			恢复背景颜色
			$(this).css("background-color","#f2f2f2");
		}
	);

//	注册滚轮事件,判断是否显示左侧楼层导航条
	$(window).scroll(function() {
//		获取当前距离文档顶部的距离
		var topValue = $(document).scrollTop();
//		定义变量存放.floor相对于文档的高度
		var floorTop = 0;
//		遍历
		$(".floor").each(function (index) {
//			获取当前元素距文档顶部的高度    此处+300使因为每个区块的高度差不多都是500px，如果区块的高度相差500px很多的话，将不能很好的实现效果
			floorTop = $(this).offset().top+400;
			if(floorTop > topValue)
			{
//				恢复样式
				$("#layerScroll li").css({"background-color":"#F2F2F2","background-position-x":0});
//				为导航条指定元素添加背景和修改背景图片的位置
				$("#layerScroll li").eq(index).css({"background-color":colorArray[index],"background-position-x":-40});
//				跳出循环
				return false;
			}
		});
//		判断是否显示导航条和搜索框
		if(topValue > 200) {
//			显示楼层导航条
			$("#layerScroll").fadeIn();
//			显示搜索框
			$("#topFixSearch").slideDown();
//			移动页眉中搜索框
			$("#newSearch").prepend($("#search").detach()).animate();
		}
		else
		{
//			隐藏导航条
			$("#layerScroll").fadeOut();
//			隐藏搜索框
			$("#topFixSearch").slideUp();
//			还原页眉搜索框
			$("#shopCart").after($("#search").detach());
		}
	});
//	为返回图标注册返回顶部的点击事件
	$("#layerScroll li:last").click(function() {
		$("html,body").animate({"scrollTop":0},500);
	});
//	点击对应图标达到对应楼层
	$("#layerScroll li:not(:last)").click(function() {
//		获取索引
		var index = $(this).index();
//		获取对应楼层距离顶部的值
		var floorTop = $(".floor").eq(index).offset().top;
//		console.log($(".floor").eq(index))
		$("html,body").animate({"scrollTop":floorTop},300);
	});
	
//	优惠券和二维码
	$("#Qrcode").hover(
//		移入
		function() {
			$("#QrcodeICON").stop(true,true).delay(50).animate({"left":"-100px","opacity":"1"});
		},
//		移出
		function() {
			$("#QrcodeICON").stop(true,true).delay(50).animate({"left":"39px","opacity":"0.3"});
	});
});