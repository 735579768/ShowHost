chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(
      null, {code:"document.body.style.background='red !important'"});
});

chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});

var i = "test";
//window.setInterval(function() {
  chrome.browserAction.setBadgeText({text:String(i)});
  chrome.browserAction.setBadgeBackgroundColor({color:[255, 0, 0, 0]})
//}, 10);





//======================一个简单的ajax对象===============================

(function (a, b) {

	//======================一个简单的ajax对象===============================
	//选择器
	$sel = function (id) {
		return document.getElementById(id)
	}

	var ajax = {
		test : function () {
			alert();
		},
		//开始发送ajax请求
		sendAjax : function (url, pram, method, callBackFun) {
			this.AddRequestArray(url, pram, method, callBackFun);
		},
		//创建一个请求队列
		RequestArray : new Array(),
		//增加到一个请求队列
		AddRequestArray : function (url, pram, method, callBackFun) {

			var ArgItem = new Array();

			ArgItem[0] = url;
			ArgItem[1] = pram;
			ArgItem[2] = method;
			ArgItem[3] = callBackFun;

			this.RequestArray.push(ArgItem); //将当前请求添加到队列末尾


			if (this.RequestArray.length == 1) //如果请求队列里只有当前请求立即要求执行队列，如果有其他请求，那么就不要求执行队列
			{
				this.ExeRequest();
			}
		},
		//开始执行一个ajax请求
		ExeRequest : function () {
			var arr = this.RequestArray[0];
			this.startRequest(arr[0], arr[1], arr[2], arr[3]);
		},
		result : null,
		xmlHttp : null,
		load : function (re_file, param, re_mod, elementId) {
			var a = arguments[0] && (arguments[0].toUpperCase() == "GET") ? arguments[0] : "GET";
			this.sendAjax(re_file, param, a, function (data) {
				$sel(elementId).innerHTML = data;
			});
		},
		//创建xmlHttp对象
		createXMLHttpRequest : function () {
			if (window.ActiveXObject) {
				return new ActiveXObject("Microsoft.XMLHTTP");
			} else if (window.XMLHttpRequest) {
				return new XMLHttpRequest();
			}
		},
		/*发送请求
		@param re_mod请求的方法
		@param re_file请求的文件
		@param re_param请求的参数，用，号分隔开如：（“1，2，3，”）
		@param callfun回调函数  这里最好直接用一个匿名函数来代替如：function(){}
		 */
		startRequest : function (re_file, param, re_mod, callfun) {
			this.xmlHttp = this.createXMLHttpRequest();
			var xmlobj = this; //把本对象赋值给一个变量是为啦兼容ie因为this对象在不同的浏览器中有不同的解释
			xmlobj.xmlHttp.onreadystatechange = function () {
				if (xmlobj.xmlHttp.readyState == 4) {
					xmlobj.result = xmlobj.xmlHttp.responseText
						if (xmlobj.xmlHttp.status == 200 || xmlobj.xmlHttp.status == 500) {
							callfun(xmlobj.result);
						} else {
							alert("ERROE:" + xmlobj.result);
						}

						xmlobj.RequestArray.shift(); //移除队列里的顺序第一个的请求，即当前已经执行完成的请求

					if (xmlobj.RequestArray.length >= 1) //如果请求队列里只有当前请求立即要求执行队列，如果有其他请求，那么就不要求执行队列
					{
						xmlobj.ExeRequest(); //要求执行队列中的请求
					}

				}
			};
			//把传进来的参数数组给分解下
			var par_arr = param.split(",");
			var str;
			//判断是否有参数传递
			if (param) {
				str = re_file + "?";
				for (i = 0; i <= par_arr.length; i++) {
					if (i == par_arr.length) {
						str += par_arr[i];
					} else {
						str += par_arr[i] + "&";
					}
				}
			} else {
				str = re_file;
			}

			xmlobj.xmlHttp.open(re_mod, str, true);
			xmlobj.xmlHttp.send(null);
		}
	};
	a.simpleAjax = ajax;
	a.$sel = $sel;
})(window);
