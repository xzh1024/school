$(function() {
//	为主菜单项注册事件
	$("#mainMenu li").hover(function () {
//		为当前菜单项添加样式
		$(this).find(".main_menu_text").addClass("current");
//		显示隐藏的内容
		$(this).find(".sub_menu").show();
	},function () {
//		移除样式
		$(this).find(".main_menu_text").removeClass("current");
//		隐藏内容
		$(this).find(".sub_menu").hide();
	});
//	首页大轮播效果
	$("#banner").tyslide({
		boxh:420,//盒子的高度
		w:1000,//盒子的宽度
		h:394,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:1,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:20,//控制按钮高度
		radius:10,//控制按钮圆角度数
		controlsColor:"#d3d3d3",//普通控制按钮的颜色
		controlsCurrentColor:"#f60",//当前控制按钮的颜色
		isNumber:true//显示控制按钮中的文本
	});
//	图书轮播bookBanner
	$("#bookBanner1").tyslide({
		boxh:216,//盒子的高度
		w:328,//盒子的宽度
		h:216,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
	$("#bookBanner2").tyslide({
		boxh:216,//盒子的高度
		w:328,//盒子的宽度
		h:216,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
	$("#bookBanner3").tyslide({
		boxh:216,//盒子的高度
		w:328,//盒子的宽度
		h:216,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
	
//	为图书板块的菜单注册鼠标移入事件
	$("#bookLeft .book_title li").mouseover(function() {
//		为当前元素添加样式,并将其兄弟节点的样式移除
		$(this).addClass("current").siblings().removeClass("current");
//		隐藏所有匹配的元素
		$("#bookLeft .book_content_right").hide();
//		将对应下标的元素显示
		$("#bookLeft .book_content_right").eq($(this).index()).show();
	});
//	图书畅销榜注册鼠标移入事件
	$("#bookHot li").mouseover(function() {
//		移除样式 使详细信息隐藏
		$("#bookHot li").find("p:eq(0)").removeClass("dis_yes");
		$("#bookHot li").find("p:eq(1)").removeClass("dis_no");
		$(this).find("p:eq(0)").addClass("dis_yes").next().addClass("dis_no");
	});
	
//	服装轮播1
	$("#commonBanner1").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
	//	服装轮播2
	$("#commonBanner2").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
	//	服装轮播3
	$("#commonBanner3").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
//	为服装板块的菜单注册鼠标移入事件
	$("#clothing .sliding_menu li").mouseover(function() {
//		为当前元素添加样式,并将其兄弟节点的样式移除
		$(this).addClass("current").siblings().removeClass("current");
//		隐藏所有匹配的元素
		$("#clothing .common_main").hide();
//		将对应下标的元素显示
		$("#clothing .common_main").eq($(this).index()).show();
	});
	
//	户外轮播1
	$("#outdoorsBanner1").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
//	户外轮播2
	$("#outdoorsBanner2").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
//	户外轮播3
	$("#outdoorsBanner3").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
//	为户外板块的菜单注册鼠标移入事件
	$("#outdoors .sliding_menu li").mouseover(function() {
//		为当前元素添加样式,并将其兄弟节点的样式移除
		$(this).addClass("current").siblings().removeClass("current");
//		隐藏所有匹配的元素
		$("#outdoors .common_main").hide();
//		将对应下标的元素显示
		$("#outdoors .common_main").eq($(this).index()).show();
	});
	
//	童装轮播1
	$("#childrenBanner1").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
//	童装轮播2
	$("#childrenBanner2").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
//	童装轮播3
	$("#childrenBanner3").tyslide({
		boxh:338,//盒子的高度
		w:422,//盒子的宽度
		h:338,//图片的高度
		isShow:true,//是否显示控制器
		isShowBtn:true,//是否显示左右按钮
		controltop:3,//控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
		controlsW:20,//控制按钮宽度
		controlsH:3,//控制按钮高度
		radius:0,//控制按钮圆角度数
		controlsColor:"#fff",//普通控制按钮的颜色
		controlsCurrentColor:"#7f7f7f",//当前控制按钮的颜色
		isNumber:false//显示控制按钮中的文本
	});
//	为童装板块的菜单注册鼠标移入事件
	$("#children .sliding_menu li").mouseover(function() {
//		为当前元素添加样式,并将其兄弟节点的样式移除
		$(this).addClass("current").siblings().removeClass("current");
//		隐藏所有匹配的元素
		$("#children .common_main").hide();
//		将对应下标的元素显示
		$("#children .common_main").eq($(this).index()).show();
	});
//	为推广商品的滑动菜单注册移入事件
	$("#popularize .sliding_menu li").mouseover(function() {
//		为当前元素添加样式,并移出所有兄弟节点的样式
		$(this).addClass("text_color_f60").siblings().removeClass("text_color_f60");
//		移除所有内容，再显示指定下标的内容区
		$("#popularize .pop_content").addClass("dis_no").eq($(this).index()).removeClass("dis_no");
	});
});