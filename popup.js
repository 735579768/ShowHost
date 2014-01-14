// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


simpleAjax.sendAjax("http://mytool.chinaz.com/baidusort.aspx?host="+window.location.host+"&sortType=0","","GET",function(data){
	alert(window.location.host);
document.write(data);
var re = /<div class="siteinfo">百度权重为 <font color="">(.*?)<\/font> ，共找到 <font color="blue">(.*?)<\/font> 条记录，预计从百度来访 <font color="blue">(.*?)<\/font> 次/g;               // 创建正则表达式模式。    var arr;
var arr = re.exec(data);
if(arr!=null){
document.body.innerHTML=arr[0];
}
});