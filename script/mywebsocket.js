var chatFunCal;


//设置播放消息通知预约 0不播放；1播放
function setPlayNoticeStor(isPlayNotice){
	$api.setStorage("isPlayNotice",isPlayNotice);//用户id
}

function getPlayNoticeStor(){
	return $api.getStorage("isPlayNotice");//用户id
}

// 时间统一函数
function getTimeText(argument) {
    var timeS = argument;
    var todayT = ''; //
    var yestodayT = '';
    var timeCha = getTimeS(timeS);
    timeS = timeS.slice(-8);
    todayT = new Date().getHours()*60*60*1000 + new Date().getMinutes()*60*1000 + new Date().getSeconds()*1000;
    yestodayT = todayT + 24*60*60*1000;
    if(timeCha > yestodayT) {
        return argument.slice(0,11);
    }
    if(timeCha > todayT && timeCha < yestodayT) {
        return timeS.slice(0,2)>12?'昨天 下午'+(timeS.slice(0,2)==12 ? 12 : timeS.slice(0,2) - 12)+timeS.slice(2,5):'昨天 上午'+timeS.slice(0,5);
    }
    if(timeCha < todayT) {
        return timeS.slice(0,2)>=12?'下午'+(timeS.slice(0,2)==12 ? 12 : timeS.slice(0,2) - 12)+timeS.slice(2,5):'上午'+timeS.slice(0,5);
    }
}
 
// 时间戳获取
function getTimeS(argument) {
	var timeS = argument;
	timeS = timeS.replace(/[年月]/g,'/').replace(/[日]/,'');
	return new Date().getTime() - new Date(timeS).getTime() - 1000; //有一秒的误差
}

var chatStatusMsg=function(status){
	var result='';
	if(status==0 || status=='0'){
		result='连接尚未建立';
	}
	else if(status==1 || status=='1'){
		result='连接已建立';
	}
	else if(status==2 || status=='2'){
		result='连接正在关闭';
	}
	else if(status==3 || status=='3'){
		result='连接已关闭或者连接不能打开';
	}
	else{
		result=''
	}
	return result;
};
/**
 * pengwei
 * websocket基类
 * */
function msgsocket(agreement,domain,port,ws_service_path,userinfo,funCal){
	chatFunCal=funCal;
	if(!ws_service_path||ws_service_path==null){
		ws_service_path = 'websocket/chat';
	}
	var _url = '';
	if(domain==''){
		_url = agreement+'://' + window.location.host + '/' + ws_service_path+'/'+userinfo;
	}else{
		_url =  agreement+'://' + domain + ':' + port + '/' + ws_service_path+'/'+userinfo;
	}
	var ws = new Object();
	ws.url = _url;
	ws.socket = null;
	ws.status = 0;//0连接尚未建立；1连接已建立；2连接正在关闭；3连接已关闭或者不能打开
	ws.call = null;
	
	ws.init = function(){
		var create_bool = true;
	      //判断当前浏览器是否支持WebSocket
		if ('WebSocket' in window) {  
            console.log("WebSocket。");  
            this.socket = new WebSocket(this.url);  
        } else if ('MozWebSocket' in window) {  
            console.log("MozWebSocket。");  
            this.socket = new MozWebSocket(this.url);  
        } else {  
           console.log("您的浏览器不支持WebSocket。");  
           create_bool = false;
        }  
        return create_bool;
	};
	
	ws.ready = function(){
		//建立加接
		this.socket.onopen = function(event){
			ws.status = ws.socket.readyState;
			if(ws.load && typeof ws.load=='function'){
				ws.load();
			}
			console.log('正在打开中.......('+ws.socket.readyState+')');
            chatFunCal(true,'')
	    };
	    //连接关闭的回调方法
	    this.socket.onclose = function(){
	    	ws.status = ws.socket.readyState;
	    	var msg = chatStatusMsg(ws.status);
            chatFunCal(false,msg+'('+ws.socket.readyState+')')
	    	console.log('正在关闭中.......('+ws.socket.readyState+')');
	    };
	    //关闭的方法
	    window.onbeforeunload = function(){
	    	ws.status = ws.socket.readyState;
	    	var msg = chatStatusMsg(ws.status);
            chatFunCal(false,msg+'('+ws.socket.readyState+')')
	    	console.log('正在关闭.......('+ws.socket.readyState+')');
	    	ws.socket.close();
	    };
	    //连接发生错误的回调方法
	    this.socket.onerror = function(event){
	    	//ws.status = 9;
	    	//弹出错误提示，待补充
	    	ws.status = ws.socket.readyState;
	    	console.log('发生错误.......('+ws.socket.readyState+')');
	    	var msg = chatStatusMsg(ws.status);
            chatFunCal(false,msg+'('+ws.socket.readyState+')')
	    };
	    //接收到消息的回调方法
	    this.socket.onmessage = function(event){
	    
	    	if(typeof ws.call=='function'){
	    		ws.call(event.data);
	    	}else{
	    		//alert(event.data);
	    	}
	    };
	};
	//发送消息
	ws.send = function(message,fun){
//		console.log('ws.status:'+ws.status)
		if(ws.status==1){
		    this.socket.send(message);
		    fun(true);
		    chatFunCal(true,'')
		    /*if(fun){
		    	ws.call = fun;
		    }*/
		} else{
			ws.status = 0;
			var msg = chatStatusMsg(ws.status);
			chatFunCal(false,msg+'('+ws.status+')')
			fun(false);
//			api.toast({ msg: msg+'('+ws.status+')',duration: 2000, location: 'middle'});
		}
	};
	//关闭
	ws.close = function(){
		console.log('close')
		ws.socket.close();
	};
	//返回对象
	return ws;
}