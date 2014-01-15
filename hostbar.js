//======================一个简单的ajax对象===============================

(function(e,t){$sel=function(e){return document.getElementById(e)};var n={test:function(){alert()},sendAjax:function(e,t,n,r){this.AddRequestArray(e,t,n,r)},RequestArray:new Array,AddRequestArray:function(e,t,n,r){var i=new Array;i[0]=e,i[1]=t,i[2]=n,i[3]=r,this.RequestArray.push(i),this.RequestArray.length==1&&this.ExeRequest()},ExeRequest:function(){var e=this.RequestArray[0];this.startRequest(e[0],e[1],e[2],e[3])},result:null,xmlHttp:null,load:function(e,t,n,r){var i=arguments[0]&&arguments[0].toUpperCase()=="GET"?arguments[0]:"GET";this.sendAjax(e,t,i,function(e){$sel(r).innerHTML=e})},createXMLHttpRequest:function(){if(window.ActiveXObject)return new ActiveXObject("Microsoft.XMLHTTP");if(window.XMLHttpRequest)return new XMLHttpRequest},startRequest:function(e,t,n,r){this.xmlHttp=this.createXMLHttpRequest();var s=this;s.xmlHttp.onreadystatechange=function(){s.xmlHttp.readyState==4&&(s.result=s.xmlHttp.responseText,(s.xmlHttp.status==200||s.xmlHttp.status==500)&&r(s.result),s.RequestArray.shift(),s.RequestArray.length>=1&&s.ExeRequest())};var o=t.split(","),u;if(t){u=e+"?";for(i=0;i<=o.length;i++)i==o.length?u+=o[i]:u+=o[i]+"&"}else u=e;s.xmlHttp.open(n,u,!0),s.xmlHttp.send(null)}};e.simpleAjax=n,e.$sel=$sel})(window)
//================
//测试ajax对象
/*发送请求
@param re_mod请求的方法
@param re_file请求的文件
@param re_param请求的参数，用，号分隔开如：（“1，2，3，”）
@param callfun回调函数  这里最好直接用一个匿名函数来代替如：function(){}
 */
//查询物理地址和百度收录情况
simpleAjax.sendAjax("http://www.ip138.com/ips138.asp","ip="+window.location.host+","+"action=2","GET",function(data){
//alert(data);
 var src = data;
 var showstr="";
 var re = /<font color=\"blue\">(.*?)>>(.*?)<\/font>([\s\S]*?)<li>本站主数据：(.*?)<\/li><li>参考数据/g;               // 创建正则表达式模式。    var arr;
 var arr = re.exec(src);
	if(arr!=null){
	showstr=arr[2]+"-->>"+arr[4];
	creatediv(showstr);
	}
});


var shoulu='';
simpleAjax.sendAjax("http://www.baidu.com/s","wd="+window.location.href,"GET",function(data){
//alert(data);
 var src = data;
 var showstr="";
 //var re = "/f13"+window.location.host+([\s\S]*?)(\d+)\-(\d+)\-(\d+)([\s\S]*?)百度快照/g; 
 var re=/class=\"f13\"([\s\S]*?)<b>([^<]{4,100})<\/b>([\s\S]*?)[^\d+];(2\d{3})\-(\d+)\-(\d+)([\s\S]*?)百度快照/g;              // 创建正则表达式模式。    var arr;
 var arr = re.exec(src);
 var temstr="";
 if(arr!=null)
 {
 	temstr=arr[1];
 } 
	if(arr!=null && temstr.indexOf(window.location.host)!=0){
	shoulu=arr[4]+"-"+arr[5]+"-"+arr[6];
	var barobj=document.getElementById('chrome-hosts-manager-ipaddr2');
	barobj.innerHTML=barobj.innerHTML+"-->百度快照时间"+shoulu;
	}else{
	var barobj=document.getElementById('chrome-hosts-manager-ipaddr2');
	barobj.innerHTML=barobj.innerHTML+"-->本页百度未收录";	
		}
});

//pr值查询
simpleAjax.sendAjax("http://app.likai.cc/pagerank/","website="+window.location.host,"GET",function(data){
//alert(data);
 var src = data;
 var showstr="";
 //var re = "/f13"+window.location.host+([\s\S]*?)(\d+)\-(\d+)\-(\d+)([\s\S]*?)百度快照/g; 
 var re=/<span>PR值([\s\S]*?)(\d+)([\s\S]*?)<\/div>/g;              // 创建正则表达式模式。    var arr;
 var arr = re.exec(src);
	if(arr!=null){
	//shoulu=arr[4]+"-"+arr[5]+"-"+arr[6];
	var barobj=document.getElementById('chrome-hosts-manager-ipaddr2');
	barobj.innerHTML=barobj.innerHTML+"-->百度PR为'"+arr[2]+"'";
	}
});

function creatediv(ipstr){
var newDiv = document.createElement("div");
newDiv.title="当前标签页IP->物理地址（点击隐藏）";
newDiv.innerHTML=ipstr;
newDiv.id="chrome-hosts-manager-ipaddr2";
document.body.appendChild(newDiv);
newDiv.className="chrome-hosts-manager-ipaddr2";

newDiv.onclick=function(){
var a=this.style.width;
if(a==="50px")
{
	this.style.width="auto";
	this.style.overflow="auto";
	this.title="当前标签页IP->物理地址（点击隐藏）";
}else
{
	this.style.width="50px";
	this.style.overflow="hidden";
	this.title="当前标签页IP->物理地址（点击显示）";
}
//this.style.display="none";
}
}
/////////////////////////////////////////////////////////////////////查询pr值
simpleAjax.sendAjax("http://www.aizhan.com/siteall/"+window.location.host,"","GET",function(data){
//alert(data);

});

  //chrome.browserAction.setBadgeText({text:String('100')});
//window.onerror=function(){return true;};
//simpleAjax.load( "xml.xml","","","test");