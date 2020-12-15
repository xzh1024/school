/*购物车*/
$(function() {
//	定义函数计算商品种类数、选中商品的数量、选中商品的总价
	function totalNumPrice() {
//		种类数
		var cartTotalNum = 0;
//		选中商品的数量
		var selectedNum = 0;
//		var rowsSumPrice = 0;
//		选中商品的总价
		var totalPrice = 0;
//		遍历购物车中的商品
		$(".rowsPrice").each(function() {
//			每进入一次种类自增1
			++cartTotalNum;
//			当前商品的数量
			var buyNumber = $(this).next().find(".buyNumber").val()-0;
//			商品单价
			var unitPrice = $(this).text();
//			小计
			var rowsSumPrice = buyNumber * unitPrice;
//			小计
			$(this).parent().find(".rowsSumPrice").text(rowsSumPrice);
//			判断商品选框是否勾选
			if($(this).parent().find(".rowsCheck").is(":checked")){
//				选中数量汇总
				selectedNum += buyNumber;
//				小计汇总
				totalPrice += rowsSumPrice;
			};
			$("#selectedNum").text(selectedNum);
			$("#totalPrice").text(totalPrice.toFixed(2));
		});
	}
//	调用函数更新数据
	totalNumPrice();
//	点击+号增加数量
	$(".add").click(function() {
//		找到当前输入框
		var buyInput = $(this).prev().find(".buyNumber");
//		获取val值并转换为数字类型
		var buyNum = parseInt(buyInput.val());
//		自增后赋值给当前文本框
		buyInput.val(++buyNum);
//		勾选当前商品元素
		$(this).parent().parent().parent().find(".rowsCheck").prop("checked",true);
//		调用函数更新数据
		totalNumPrice();
	});
	
//	点击-号减少数量
	$(".minus").click(function() {
//		找到当前输入框
		var buyInput = $(this).next().find(".buyNumber");
//		获取val值并转换为数字类型
		var buyNum = parseInt(buyInput.val());
//		判断是否大于1
		if(buyNum>1){
//			自减后赋值给当前文本框
			buyInput.val(--buyNum);
//			勾选当前商品元素
			$(this).parent().parent().parent().find(".rowsCheck").prop("checked",true);
//			调用函数更新数据
			totalNumPrice();
		}
	});
//	文本框输入事件
	$(".buyNumber").keyup(function() {
		if(isNaN($(this).val())){
//			非数字显示提示文字
			$(this).next().show();
		}
		else{
			if($(this).val()>0){
//				调用函数更新数据
				totalNumPrice();
			} else{
//				改变值
				$(this).val(1);
//				调用函数更新数据
				totalNumPrice();
			}
//			隐藏提示文字
			$(this).next().hide();
		};
	});
//	点击单选
	$(".rowsCheck").click(function() {
//		调用函数更新数据
		totalNumPrice();
//		判断当前选框状态
		if(!$(this).is(":checked")){
//			改变全选框的选中状态
			$(".checkAll").prop("checked",false);
		}
	});
//	点击全选
	$(".checkAll").click(function() {
//		判断全选的状态
		var checkAll = $(this).is(":checked");
//		设置所有勾选框的状态
		$(".checkAll,.rowsCheck").prop("checked",checkAll);
//		调用函数更新数据
		totalNumPrice();
	});
//	删除当前商品
	$(".delRows").click(function() {
		$(this).parent().parent().remove();
	});
//	删除选中的商品
	$("#delSelectedProduct").click(function() {
		$(".rowsCheck").each(function(index) {
//			判断当前商品是否被选中
			if($(this).is(":checked")){
				$(this).parent().parent().remove();
//				调用函数更新数据
				totalNumPrice();
			}
		});
	});
//	去结算
	$(document).on('confirmation', '.remodal', function () {
//		确认后跳转到首页
	    location.href="index.html";
	});
});