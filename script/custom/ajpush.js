///////////////要先引用api.js//////////////////
var ajpush;
var isShowAppBadge=false;
/***
 *初始化极光推送
 */
var initAjpush = function(){
	var permissionNameObj={notification:'状态栏通知'};
	var permissionList=['notification'];
	if(!checkAppPermission(permissionNameObj,permissionList)) return;
	if(!checkLoginState(false)) return;
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	
	var systemType = api.systemType;
	if (systemType == 'android') {
		ajpush.init(function(ret) {
			isShowAppBadge=false;
			//status 操作成功状态值，1-成功，0-失败
		    if (ret && ret.status){
		        //success
		        bindAliasAndTags();
		    }
		})
	}
	else if(systemType == 'ios'){
		isShowAppBadge=false;
		bindAliasAndTags();
	}
}


var ajpushBadgeCount=0;
/**
 *设置推送监听
 */
var ajpushSetListener = function(){
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	ajpush.setListener(
	    function(ret) {
	    	if(isShowAppBadge){
	    		ajpushBadgeCount++;
		    	api.setAppIconBadge({
				    badge: ajpushBadgeCount
				});
	    	}
	    	api.sendEvent({
			    name: 'ajpush_push_event',
			    extra: {
			        isRefresh: true,
			    }
			});
			api.startPlay({
			    path: 'widget://res/audio/order_alert.mp3'
			}, function(ret, err) {});
	    	
	    	
//	         var id = ret.id;
//	         var title = ret.title;
//	         var content = ret.content;
//	         var extra = ret.extra;
	    }
	);
}


/**
 *移除消息监听
 */
var ajpushRemoveListener = function(){
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	ajpush.removeListener();
}

/**
 *绑定用户别名和标签。服务端可以指定别名和标签进行消息推送
 */
var bindAliasAndTags=function(){
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	var userId = $api.getStorage("userid");//用户id
	var param = {alias:userId,tags:['workersAppTags']};
	ajpush.bindAliasAndTags(param,function(ret) {
        var statusCode = ret.statusCode;
        if(statusCode==0){
        	ajpushSetListener();
        }
        
	});
}

/**
 *通知极光推送SDK当前应用恢复到前台(Android) 
 */
var ajpushOnResume = function(){
	if(!checkLoginState(false)) return;
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	ajpush.onResume();
}

/**
 *通知极光推送SDK当前应用退入到后台(Android) 
 */
var ajpushOnPause = function(){
	if(!checkLoginState(false)) return;
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	ajpush.onPause();
}

/**
 *清除极光推送发送到状态栏的通知。 
 */
var ajpushClearNotification = function(){
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	ajpush.clearNotification(param,function(ret) {
	    if(ret && ret.status){
	        //status操作成功状态值，1-成功，0-失败
	    }
	});
}

/**
 *设置应用图标右上角数字，只iOS有效。 
 */
var ajpushSetBadge=function(){
	isShowAppBadge=true;
}

var ajpushClearBadge=function(){
	ajpushBadgeCount=0;
	api.setAppIconBadge({
	    badge: ajpushBadgeCount
	});
	isShowAppBadge=false;
}


/**
 *集成了JPush SDK的应用程序在第一次成功注册到JPush服务器时，JPush服务器会给客户端返回一个唯一的该设备的标识RegistrationID。JPush SDK会以广播的形式发送RegistrationID到应用程序。应用程序可以把此RegistrationID保存于自己的应用服务器上，然后就可以根据 RegistrationID来向设备推送消息或者通知 
 */
var ajpushGetRegistrationId=function(){
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	ajpush.getRegistrationId(function(ret) {
	    var registrationId = ret.id;
	});
}


/**
 *查询当前推送服务是否停止。 
 */
var ajpushIsPushStopped=function(){
	if(!checkLoginState(false)) return;
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	ajpush.isPushStopped(function(ret) {
	    if(ret && ret.isStopped){
			 //isStopped推送服务是否停止状态，1-停止，0-未停止
			 ajpushResumePush();
	    }
	});
}

//恢复Push推送。
var ajpushResumePush=function(){
	if(!checkLoginState(false)) return;
	if(ajpush==undefined || ajpush==null || ajpush==''){
		ajpush = api.require('ajpush');
	}
	ajpush.resumePush(function(ret) {
	    if(ret && ret.status){
	        //success
	    }
	});
}






