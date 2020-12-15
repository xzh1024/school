/*登录页面*/
$(function() {
//	点击事件切换登录
	$("#loginTitle li").click(function() {
//		改变当前元素的字体颜色为橙色,兄弟节点的字体颜色为默认
		$(this).addClass("text_color_f60").siblings().removeClass("text_color_f60");
		var index = $(this).index();
		if(index == 0)
		{
			$("#qrcodeContent").show();
			$("#pcContent").hide();
		}
		else
		{
			$("#qrcodeContent").hide();
			$("#pcContent").show();
		}
//		$("#legoLogin div").hide();
//		$("#legoLogin div").eq($(this).index()).show();
	});
//	扫码登录移入移出事件
	$("#qrcodeContent").hover(
		function() {
			var isMove = $("#loginEqcodeICON").is(":animated") || $("#loginPhoneICON").is(":animated");
//			向左移动二维码图片
			if(!isMove){
				$("#loginEqcodeICON").stop(true,true).delay(100).animate({"left":"-76"});
//				淡入手机图片
				$("#loginPhoneICON").stop(true,true).delay(300).fadeIn(300);
			}
		},
		function() {
//			向右移动二维码图片
			$("#loginEqcodeICON").stop(true,true).animate({"left":"0"},100);
//			淡出手机图片
			$("#loginPhoneICON").stop(true,true).fadeOut(0);
		}
	);
})