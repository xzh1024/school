function ajax(opt) {
	opt = opt || {};
	opt.method = opt.method.toUpperCase() || 'POST';
	opt.url = opt.url || '';
	opt.async = opt.async || true;
	opt.data = opt.data || null;
	opt.success = opt.success || function() {};
	opt.dataType = opt.dataType || "json";
	var xmlHttp = null;
	if(XMLHttpRequest) {
		xmlHttp = new XMLHttpRequest();
	} else {
		xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
	}
	var params = [];
	for(var key in opt.data) {
		params.push(key + '=' + opt.data[key]);
	}
	var postData = params.join('&');
	if(opt.method.toUpperCase() === 'POST') {
		xmlHttp.open(opt.method, opt.url, opt.async);
		xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
		xmlHttp.send(postData);
	} else if(opt.method.toUpperCase() === 'GET' && opt.dataType.toUpperCase() !== 'JSONP') {
		xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
		xmlHttp.send(null);
	}
	if(opt.method.toUpperCase() === 'GET' && opt.dataType.toUpperCase() === 'JSONP'){
		window.ajaxCallback = function(data) {
//		    console.dir(data);
		    opt.success(data);
		    document.body.removeChild(ele);
		};
		var ele = document.createElement('script');
		ele.type = "text/javascript";
//		ele.src = 'https://api.douban.com/v2/book/1220562?callback=ajaxCallback';
		ele.src = opt.url + "?" + postData + '&callback=ajaxCallback';
		//onerror 事件会在文档或图像加载过程中发生错误时被触发。异常时的回调
//		ele.onerror = function() {
//		    console.log('error');
//		};
//		//js成功加载（下载并执行完之后）后的回调
//		ele.onload = function() {
//			//会在这里调用ajaxCallback()函数
//		    console.log('loaded');
//		};
		document.body.appendChild(ele);
//		document.body.removeChild(ele);
	} else {
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				opt.success(xmlHttp.responseText);
			}
		};
	}
//	xmlHttp.onreadystatechange = function() {
//		if(opt.dataType != 'jsonp') {
//			if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//				opt.success(xmlHttp.responseText);
//			}
//		} else {
//			//alert(1); 
//			if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
//				var oScript = document.createElement('script');
//				document.body.appendChild(oScript);
//
//				var callbackname = 'wangxiao'
//				oScript.src = opt.url + "?" + postData + '&callback=' + callbackname;
//
//				window['wangxiao'] = function(data) {
//					opt.success(data);
//					document.body.removeChild(oScript);
//				};
//			}
//		}
//	};
}


/*
	 ajax({
	 method: 'GET',
	 dataType: 'json',
	 url:"js/pay.json",
	 success: function(datas) {
	 var datas = JSON.parse(datas)
	 console.log(datas)
	 document.getElementById('pay').innerHTML = datas.data.token;
	 //					document.forms['alipaysubmit'].submit();
	 }
	 });
 */