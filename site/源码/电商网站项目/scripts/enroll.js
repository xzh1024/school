/*注册*/
$(function() {
//	获取手机验证码
	$("#msgBtn").click(function() {
		var time = 10;
		$("#msgBtn").prop("disabled",true);
		var timesID = setInterval(function() {
			if (time>0) {
				$("#msgBtn").val(time + "s后可从新获取");
			} else{
				$("#msgBtn").val("获取验证码");
				$("#msgBtn").prop("disabled",false);
				clearInterval(timesID);
			};
			time--;
		},1000);
	});
//	手机号验证
	$("#cellPhone").change(function() {
//		手机正则
		var cellPhone = /^[1-9]\d{10}$/;
		var value = $("#cellPhone").val();
		if(cellPhone.test(value)){
			$("#cellPhone").next().hide();
		}
		else{
			$("#cellPhone").next().show();
		}
	});
//	提交按钮
	$("#pushSubmit").click(function() {
//		验证码
		var validateCode =$("#validateCode").val().toLowerCase();
		if(validateCode == "4e7r") {
			$("#validateCode").next().hide();
		} else{
			$("#validateCode").next().show();
		}
//		console.log($("#enrollAgreement").is(":checked"),$("#enrollAgreement").next().next());
//		if($("#enrollAgreement").is(":checked")) {
//			$("#enrollAgreement").parent().find(".errMessage").hide();
//		} else{
//			$("#enrollAgreement").parent().find(".errMessage").show();
//		}
	});
	$("#enrollForm").validate({
//		验证规则
		rules:{
//			用户名
			enrollUserName:{
				required: true
			},
//			设置密码
			setPW:{
	 	    	remote:"check.php",
				required: true,
				//最大与最小区间
                rangelength: [6,18]
			},
//			校验密码
			checkPW:{  
		  	    required: true,  
                rangelength: [6,18],
		 	    equalTo: "#setPW"
	 	    },
//			手机号
	 	    cellPhone:{
	            required: true,  
	 	    },
//	 	    用户注册协议
	 	    enrollAgreement:{
	 	    	required: true 
	 	    }
		}
	});
});