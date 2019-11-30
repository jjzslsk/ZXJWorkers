//////////使用前必须先引用api.js
/////////////正式环境地址///////////////////////
var serviceUrl = 'https://www.zxj888.cn:8443'//正式环境
var serviceUrl02 = 'https://www.zxj888.cn:9443'//正式环境
var upFileUrl="https://www.zxj888.cn:8443/upFile";//上传文件url
var webSocketAgreement='wss';//webSocket协议
var webSocketUrl='zxj888.cn'//webSocket域名
var webSocketPort=9443;//webSocket端口
var webSocketPath='zxj/websocket';//webSocket域名后面那部分路径
///////////////////正式环境地址end///////////////

/////////////////////////////////开发环境地址//////// //////
//var serviceUrl = 'https://www.zxjtest.xyz'//开发环境
//var serviceUrl02 = 'https://www.zxjtest.xyz:9443'//开发环境
//var upFileUrl="https://www.zxjtest.xyz/upFile";//上传文件url
//var webSocketAgreement='wss';//webSocket协议
//var webSocketUrl='zxjtest.xyz'//webSocket域名
//var webSocketPort=9443;//webSocket端口
//var webSocketPath='zxj/websocket';//webSocket域名后面那部分路径
///////////////////////////开发环境地址end///////////////

//////////////////////////////////
//var serviceUrl = 'http://ybhm6m.natappfree.cc/server'//本地开发原件
//var webSocketAgreement='ws';//webSocket协议
//var webSocketUrl='172.16.7.66'//webSocket域名
//var webSocketPort='8080';//webSocket端口
//var webSocketPath='zxj/websocket';//webSocket域名后面那部分路径
//////////////////////////////////

var thirdUseUrl="https://www.zxj888.cn:8443";//第三方使用(如调用微信公众号的连接)
var baiduMapUrl='http://api.map.baidu.com';//百度地图url
var baiduMapCityParam='/geocoder?key=6L4yakzR0hjRvzSvHqZLOQGSubyGhAQj&output=json'



/////////////////////公用信息配置/////////////////////
var phoneService='400-8798980';//400电话
var wxService='zhuangxj888';//微信客服
var qqService='2809712409';//qq客服
var emailService='zhuangxj888@163.com';//邮箱


var ajaxTimeout=60;//设置超时请求时间

/**对比ios版本号*/
function checkIOSVersion(oldVersion,newVersion){
	if(oldVersion==undefined || oldVersion==null || oldVersion==''){
		return false;
	}
	if(newVersion==undefined || newVersion==null || newVersion==''){
		return false;
	}
	var oldArr = oldVersion.split(".")//通过.截取当前版本数据信息
	var newArr = newVersion.split(".")//通过.截取新版本数据信息
	if(oldArr.length==0 || newArr.length==0){
		return false;//如果截取都是0，认为没有新版本
	}
	if(newArr.length>oldArr.length){
		return true;//如果截取的新的版本号比当前号长，则认为有新版本
	}
	else if(newArr.length<oldArr.length){
		return false;//如果截取的新的版本号比当前版本号短，则认为没有新版本
	}
	var resule=false;
	//遍历版本每个区的数字判断是否是新版本
	for(var index in newArr){
		if(Number(newArr[index])>Number(oldArr[index])){
			//新版本号第index个位置比就当前版本的大，认为有新版本更新
			resule=true;
			break;
		}
		else if(Number(newArr[index])<Number(oldArr[index])){
			//新版本号第index个位置比就当前版本的小，认为没有新版本更新
			resule=false;
			break;
		}
	}
	return resule;
}

/**
 *检测更新app版本 
 */
var checkUpAppVersion=function(){
	var systemType = api.systemType;
//	var appVersion = api.appVersion;
	// ios、android、win、wp
	if (systemType == 'android') {
		var fdAppInfo = api.require('fdAppInfo');
		fdAppInfo.getVersionCode(function(ret ,err){
			if(ret){
				if(ret.code){
					var localVersionCode = ret.data.versionCode;
					var url=serviceUrl+'/appVersion/workerVersion.json';
					var zxjToken=getZxjToken();
					api.ajax({
						url : url,
						method : 'get',
						returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
						headers: {
					       'token':zxjToken
					    },
					}, function(ret, err) {
						if (ret) {
							var serAppVersionCode = ret.versionCode;
							if(Number(serAppVersionCode)>Number(localVersionCode)){
								api.confirm({
								    title: '版本提示',
								    msg: '发现您有新版本待更新',
								    buttons: ['立即更新', '暂时不更']
								}, function(ret, err) {
								    var index = ret.buttonIndex;
								    if(index==1){
								    	//确定
								    	//var appDwUrl='http://a.app.qq.com/o/simple.jsp?pkgname=com.ZXJWorkers.bmy';
										var appDwUrl=serviceUrl+'/appVersion/zxjWorkerApp.apk';
								    	api.openApp({
										    androidPkg: 'android.intent.action.VIEW',
										    mimeType: 'text/html',
										    uri: appDwUrl
										}, function(ret, err) {});
										
										
								    }
								});
							}
						} else {
							var msg = err.msg + '(' + err.code + ')'
							api.toast({ msg: msg,duration: 2000, location: 'middle'});
						}
					});
				} else{
					api.toast({ msg: ret.msg,duration: 2000, location: 'middle'});
				}
				
			}else{
				api.toast({ msg: err.msg,duration: 2000, location: 'middle'});
			}
			
		});
	}
	else if(systemType == 'ios'){
		var ipa = api.require('ipa');
		var bundleVersion = ipa.getBundleVersion();
//  return;
		api.ajax({
			url : 'https://itunes.apple.com/cn/lookup?id=1472159762',
			method : 'post',
			returnAll : false //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		}, function(ret, err) {
			if(ret){
				if(ret.results!=undefined && ret.results.length>0){
					var newVersion = ret.results[0].version;
					if(checkIOSVersion(bundleVersion,newVersion)){
						api.confirm({
						    title: '版本提示',
						    msg: '发现您有新版本待更新V'+newVersion,
						    buttons: ['立即更新', '暂时不更']
						}, function(ret, err) {
						    var index = ret.buttonIndex;
						    if(index==1){
						    	//确定
						    	var appDwUrl='http://itunes.apple.com/cn/app/id1472159762?mt=8';
						    	api.openApp({
								    iosUrl:appDwUrl
								}, function(ret, err) {});
						    }
						});
					}
				}
			}else {
				var msg = err.msg + '(' + err.code + ')'
				api.toast({ msg: msg,duration: 2000, location: 'middle'});
			}
			
		});
	
	}
};


/**通过用户id和手机号再次登录获取用户信息*/
var againLoginByUserId = function(funCal){
	var userId = $api.getStorage("userid");//用户id
	var clientPhone = $api.getStorage("clientPhone");//手机号
	if(userId==undefined || userId==null || userId==''){
		return;
	}
	else if(clientPhone==undefined || clientPhone==null || clientPhone==''){
		return;
	} else{
		if(!checkLoginOverdue()) return;
		var param = 'phone='+clientPhone+'&clientId='+userId;
//		api.showProgress();
		_getHttpsData('/user/login',param,
			function(res){
//				api.hideProgress();
				if(res.status){
					var pwd = $api.getStorage("pwd");
					saveUserInfoCache(pwd,res.data);
					if (funCal!=undefined && typeof funCal === "function") {
						funCal(true);
					}
				}
			},
			function(err){
//				api.hideProgress();
			},false
		);
	}
}

/**获取工人申请的信息，更新实名验证进度*/
var upUserRealNamePro=function(){
	var userId=$api.getStorage("userid");
	var clientLevel=$api.getStorage("clientLevel");
	var isCertification=$api.getStorage("isCertification");//是否实名验证（ 1为已实名认证    0 为未实名认证）
	if(userId==undefined || userId==null || userId==''){
		return;
	} 
	if(clientLevel==5 || clientLevel=='5'){
		if(isCertification!=1){
			var param = 'clientId='+userId+'&applyType=5';
			_getHttpsData('/member/getApplyInfo',param,
				function(ret){
					if(ret.status){
						var applyStatus = ret.data.applyStatus;//申请状态
						if(applyStatus==2){
							refreshIsCertification(1,5);
						} else{
							refreshIsCertification(0);
						}
					}
				},
				function(err){}
			);
		}
	}
}

/**
 *上传文件 
 */
var uploadFileHttps = function(param,imgArray, funRecall, errFunRecall){
	var zxjToken=getZxjToken();
	api.ajax({
        url: upFileUrl,
        method: 'post',
        timeout: 90,
        dataType: 'json',
        returnAll:false,
        headers: {
	       'token':zxjToken
	    },
        data:{
            files:{attUrl:imgArray},
			values:param
 		}
    },function(ret,err){
    	if (ret) {
			funRecall(ret);
		} else {
			errFunRecall(err);
//			var title = '网络请求状态码(' + err.statusCode + ')';
//			var msg = err.msg + '(' + err.code + ')'
//			api.alert({
//				title : title,
//				msg : msg
//			});
			var msg = err.msg +'['+err.statusCode+'](' + err.code + ')'
			api.toast({ msg: msg,duration: 2000, location: 'middle'});
			
		}
    });	
}

//请求数据(提交JSON数据)
var _postHttpsData = function(actionUrl, param, funRecall, errFunRecall,isPopupErr) {
	if(isPopupErr==undefined || isPopupErr==null || isPopupErr==''){
		isPopupErr=true;
	}
	var url = serviceUrl+'/jaxrs' + actionUrl;
	var zxjToken=getZxjToken();
	api.ajax({
		url : url,
		method : 'post',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType:'json',
		headers: {
	       'Content-Type': 'application/json;charset=utf-8',
	       'token':zxjToken
	    },
	    timeout:ajaxTimeout,
		data : {
			body:param
		}
	}, function(ret, err) {
		if (ret) {
			funRecall(ret);
		} else {
			errFunRecall(err);
			if(isPopupErr){
//				var title = '网络请求状态码(' + err.statusCode + ')';
//				var msg = err.msg + '(' + err.code + ')'
//				api.alert({
//					title : title,
//					msg : msg
//				});
				var msg = err.msg +'['+err.statusCode+'](' + err.code + ')'
				api.toast({ msg: msg,duration: 2000, location: 'middle'});
			}
			
		}
	});

}

//请求数据(提交JSON数据)
var _postHttpsData1 = function(actionUrl, param, funRecall, errFunRecall,isPopupErr) {
	if(isPopupErr==undefined || isPopupErr==null || isPopupErr==''){
		isPopupErr=true;
	}
	var url;
	if(param==undefined || param==null || param==''){
		url = serviceUrl+'/jaxrs' + actionUrl;
	}else{
		url = serviceUrl+'/jaxrs' + actionUrl + '?' + param;
	}
	var zxjToken=getZxjToken();
	api.ajax({
		url : url,
		method : 'post',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType:'json',
		headers: {
	       'Content-Type': 'application/x-www-form-urlencoded',
	       'token':zxjToken
	    },
	    timeout:ajaxTimeout
	}, function(ret, err) {
		if (ret) {
			funRecall(ret);
		} else {
			errFunRecall(err);
			if(isPopupErr){
//				var title = '网络请求状态码(' + err.statusCode + ')';
//				var msg = err.msg + '(' + err.code + ')'
//				api.alert({
//					title : title,
//					msg : msg
//				});
				var msg = err.msg +'['+err.statusCode+'](' + err.code + ')'
				api.toast({ msg: msg,duration: 2000, location: 'middle'});
			}
		}
	});

}


//请求数据(提交JSON数据)
var _postHttpsData2 = function(actionUrl, param, funRecall, errFunRecall,isPopupErr) {
	if(isPopupErr==undefined || isPopupErr==null || isPopupErr==''){
		isPopupErr=true;
	}
	var url=serviceUrl02+'/zxj'+actionUrl;
	var zxjToken=getZxjToken();
	api.ajax({
		url : url,
		method : 'post',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType:'json',
	    timeout:ajaxTimeout,
	    headers: {
	       'token':zxjToken
	    },
	   	data : {
			values : param
		},
	}, function(ret, err) {
		if (ret) {
			funRecall(ret);
		} else {
			errFunRecall(err);
			if(isPopupErr){
//				var title = '网络请求状态码(' + err.statusCode + ')';
//				var msg = err.msg + '(' + err.code + ')'
//				api.alert({
//					title : title,
//					msg : msg
//				});
				var msg = err.msg +'['+err.statusCode+'](' + err.code + ')'
				api.toast({ msg: msg,duration: 2000, location: 'middle'});
			}
		}
	});

}

//请求数据(提交JSON数据)
var _getHttpsData = function(actionUrl, param, funRecall, errFunRecall,isPopupErr) {
	if(isPopupErr==undefined || isPopupErr==null || isPopupErr==''){
		isPopupErr=true;
	}
	var url;
	if(param==undefined || param==null || param==''){
		url = serviceUrl+'/jaxrs' + actionUrl;
	}else{
		url = serviceUrl+'/jaxrs' + actionUrl + '?' + param;
	}
	var zxjToken=getZxjToken();
	api.ajax({
		url : url,
		method : 'get',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
	    timeout:ajaxTimeout,
	    headers: {
	       'token':zxjToken
	    }
	}, function(ret, err) {
		if (ret) {
			funRecall(ret);
		} else {
			errFunRecall(err);
			if(isPopupErr){
				var msg = err.msg +'['+err.statusCode+'](' + err.code + ')'
				api.toast({ msg: msg,duration: 2000, location: 'middle'});
			}
		}
	});

}

//请求数据(提交JSON数据)
var _postDataMap = function(param, funRecall, errFunRecall) {
	var zxjToken=getZxjToken();
	api.ajax({
		url : baiduMapUrl+baiduMapCityParam+param,
		method : 'post',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
	    timeout:ajaxTimeout,
	    headers: {
	       'token':zxjToken
	    }
	}, function(ret, err) {
		if (ret) {
			funRecall(ret);
		} else {
			errFunRecall(err);
//			var title = '网络请求状态码(' + err.statusCode + ')';
//			var msg = err.msg + '(' + err.code + ')'
//			api.alert({
//				title : title,
//				msg : msg
//			});
			var msg = err.msg +'['+err.statusCode+'](' + err.code + ')'
			api.toast({ msg: msg,duration: 2000, location: 'middle'});
		}
	});

}




/**
  * 通过平台接口获取数据（sql）
  * dataSet 查询调用的名称
  * queryMode map或list
  * param 请求参数
  * funRecall 请求成功回调
  * errFunRecall 请求失败回调
*/
var _httpsPlatformSql=function(dataSet, queryMode, param, funRecall,errFunRecall){
	//key = 'zxj_repertory';//数据源名称
    //AJAX_MODE = 'AJAX_MODE_QUERY';//固定
    //DATASET = 'client_rec_addres_default';//查询调用的名称
    //QUERY_MODE = 'map';//’map或list’
    var paramStr;
    if(param==undefined || param==null || param==''){
    	paramStr = "key=zxj_repertory&AJAX_MODE=AJAX_MODE_QUERY&DATASET=" + dataSet + "&QUERY_MODE=" + queryMode;
    }else{
    	paramStr = "key=zxj_repertory&AJAX_MODE=AJAX_MODE_QUERY&DATASET=" + dataSet + "&QUERY_MODE=" + queryMode + "&" + param;
    }
    var url = serviceUrl + '/ajax?' + paramStr;
    var zxjToken=getZxjToken();
    api.ajax({
		url : url,
		method : 'post',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType:'json',
		headers: {
	       'Content-Type': 'application/json;charset=utf-8',
	       'token':zxjToken
	    },
	    timeout:ajaxTimeout
	}, function(ret, err) {
		api.hideProgress();
		if (ret) {
			funRecall(ret)
		} else {
			errFunRecall(err);
//			var title = '网络请求状态码(' + err.statusCode + ')';
//			var msg = err.msg + '(' + err.code + ')'
//			api.alert({
//				title : title,
//				msg : msg
//			});
			var msg = err.msg +'['+err.statusCode+'](' + err.code + ')'
			api.toast({ msg: msg,duration: 2000, location: 'middle'});
		}
	});
    
    
};


/**
 * 通过平台请求接口(class)
 * dataSet 查询调用的名称
 * param 请求参数
 * funRecall 请求成功回调
 * errFunRecall 请求失败回调 
 * paramIscustom param是否自定义,如果是dataSet无效
 * 
 */
var _httpsPlatformClass=function(dataSet, param, funRecall, errFunRecall,paramIscustom){
//	var paramStr = "AJAX_MODE=AJAX_MODE_OPERATE&operate=" + dataSet + "&" + param;
//  var url = serviceUrl + '/ajax?' + paramStr;

	//key = 'zxj_repertory';//数据源名称
    //AJAX_MODE = 'AJAX_MODE_QUERY';//固定
    //DATASET = 'client_rec_addres_default';//查询调用的名称
    //QUERY_MODE = 'map';//’map或list’
    // var paramStr = "AJAX_MODE_OPERATE=" + dataSet + "&" + param
    if(paramIscustom==undefined || paramIscustom==null || paramIscustom=='' || typeof paramIscustom != "boolean"){
		paramIscustom =false;
	}
	
	var paramStr = "";
    if(paramIscustom){
    	paramStr=param;
    }else{
    	paramStr = "AJAX_MODE=AJAX_MODE_OPERATE&operate=" + dataSet + "&" + param;
    }
	var url = serviceUrl + '/ajax?' + paramStr;
	var zxjToken=getZxjToken();
	api.ajax({
		url : url,
		method : 'post',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType:'json',
		headers: {
	       'Content-Type': 'application/json;charset=utf-8',
	       'token':zxjToken
	    },
	    timeout:ajaxTimeout
	}, function(ret, err) {
		if (ret) {
			funRecall(ret)
		} else {
			errFunRecall(err);
//			var title = '网络请求状态码(' + err.statusCode + ')';
//			var msg = err.msg + '(' + err.code + ')'
//			api.alert({
//				title : title,
//				msg : msg
//			});
			var msg = err.msg +'['+err.statusCode+'](' + err.code + ')'
			api.toast({ msg: msg,duration: 2000, location: 'middle'});
		}
	});
}

/**保存用户信息到缓存*/
var saveUserInfoCache=function(pwd,obj){
	clearUserInfoCache();
	$api.setStorage("pwd", pwd==undefined ? '':pwd);//登录密码
	$api.setStorage("userid", obj.hasOwnProperty("clientId") ? obj.clientId:'');//用户id
	$api.setStorage("clientName", obj.hasOwnProperty("clientName") ? obj.clientName:'');//用户姓名
	$api.setStorage("openId", obj.hasOwnProperty("openId2") ? obj.openId2:'');//openId
	$api.setStorage("nickname", obj.hasOwnProperty("clientAccount") ? obj.clientAccount:'');//昵称
	$api.setStorage("avatar", obj.hasOwnProperty("avatar") ? obj.avatar:'');//用户头像
	$api.setStorage("sex", obj.hasOwnProperty("sex") ? obj.sex:'');//性别:1-男 0-女
	$api.setStorage("age", obj.hasOwnProperty("age") ? obj.age:'');
	$api.setStorage("workerGoodReputation", obj.hasOwnProperty("workerGoodReputation") ? obj.workerGoodReputation:'');//好评率
	$api.setStorage("financeOption",obj.hasOwnProperty("financeOption") ? obj.financeOption:'');//
	$api.setStorage("financeDues", obj.hasOwnProperty("financeDues") ? obj.financeDues:'');//
	$api.setStorage("regFrom", obj.hasOwnProperty("regFrom") ? obj.regFrom:'');//注册来源
	$api.setStorage("starLevel", obj.hasOwnProperty("starLevel") ? obj.starLevel:'');//星级(1-5级，由返回信息时自动计算)
	$api.setStorage("clientLevel", obj.hasOwnProperty("clientLevel") ? obj.clientLevel:'');//用户级别(0-行业代表   1-服务中心  2-县级代理  3-市级代理  4-省级代理   5-工匠  6-商铺  9-普通用户)
	$api.setStorage("clientStatus", obj.hasOwnProperty("clientStatus") ? obj.clientStatus:'');//状态(1有效)
	$api.setStorage("clientLastLoginDate",obj.hasOwnProperty("clientLastLoginDate") ? obj.clientLastLoginDate:'');//最近登陆日期
	$api.setStorage("financeVirtualCurrency", obj.hasOwnProperty("financeVirtualCurrency") ? obj.financeVirtualCurrency:'');//
	$api.setStorage("clientClassId", obj.hasOwnProperty("clientClassId") ? obj.clientClassId:'');//用户类别ID
	$api.setStorage("clientPhone", obj.hasOwnProperty("clientPhone") ? obj.clientPhone:'');//手机号
	$api.setStorage("clientRegDate", obj.hasOwnProperty("clientRegDate") ? obj.clientRegDate:'');//注册日期
	$api.setStorage("isCertification", obj.hasOwnProperty("isCertification") ? obj.isCertification:'');//是否实名验证（ 1为已实名认证    0 为未实名认证）
	$api.setStorage("margin", obj.hasOwnProperty("margin") ? obj.margin:'');//保证金
	$api.setStorage("zxjToken", obj.hasOwnProperty("token") ? obj.token:'');//token
	recordLastLoginDate();
	
}


/**清除缓存中的用户信息*/
var clearUserInfoCache=function(){
	$api.rmStorage("pwd");//登录密码
	$api.rmStorage("userid");//用户id
	$api.rmStorage("openId");//openId
	$api.rmStorage("nickname");//昵称
	$api.rmStorage("avatar");//用户头像
	$api.rmStorage("sex");
	$api.rmStorage("age");
	$api.rmStorage("workerGoodReputation");
	$api.rmStorage("financeOption");//
	$api.rmStorage("financeDues");//
	$api.rmStorage("regFrom");//注册来源
	$api.rmStorage("starLevel");//星级(1-5级，由返回信息时自动计算)
	$api.rmStorage("clientLevel");//用户级别(0-行业代表   1-服务中心  2-县级代理  3-市级代理  4-省级代理   5-工匠  6-商铺  9-普通用户)
	$api.rmStorage("clientStatus");//状态(1有效)
	$api.rmStorage("clientLastLoginDate");//最近登陆日期
	$api.rmStorage("financeVirtualCurrency");//
	$api.rmStorage("clientClassId");//用户类别ID
	$api.rmStorage("clientPhone");//手机号
	$api.rmStorage("clientRegDate");//注册日期
	$api.rmStorage("isCertification");//是否实名验证（ 1为已实名认证    0 为未实名认证）
	$api.rmStorage("margin");//保证金
	$api.rmStorage("zxjToken");//token
}

/**获取token*/
var getZxjToken=function(){
	return $api.getStorage("zxjToken")==undefined ? null:$api.getStorage("zxjToken");
}

/**记录在app最后的登录时间*/
var recordLastLoginDate = function(){
	var curDate = getCurrentDate('yyyy-MM-dd');
	$api.setStorage("app_last_login_date", curDate==undefined ? '':curDate);
}
/**检测缓存登录是否已经过期:true未过期，false已过期*/
var checkLoginOverdue = function(){
	var lastLiginDate = $api.getStorage("app_last_login_date");
	if(lastLiginDate==undefined || lastLiginDate==null || lastLiginDate==''){
		return false;
	}
	var curDate = getCurrentDate('yyyy-MM-dd');
	var endDateArr= lastLiginDate.split('-');
    var curDateArr= curDate.split('-');
    var strDateS = new Date(endDateArr[0], endDateArr[1]-1, endDateArr[2]);
    var strDateE = new Date(curDateArr[0], curDateArr[1]-1, curDateArr[2]);
    var iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
    if(iDays>30){
    	//有效期已为30天，超过视为过期
    	clearUserInfoCache();
    	$api.rmStorage("app_last_login_date");//保证金
    	api.alert({
			title : '温馨提示',
			msg : '您过久未重新进行登录过系统,请重新登录'
		});
    	return false;
    }else{
    	return true;
    }
}


/**检测是否缴纳保证金*/
var checkSecurity=function(){
	var margin = $api.getStorage("margin");//保证金
	if(margin == undefined || margin==null || margin=='' || margin==0 || margin=='0') {
		return false;
	} else{
		return true;
	}
}

/**
 *检测是否缴纳保证金和保证金是否足够金额
 *  return 0没缴纳保证金；1已缴纳保证金并且金额足够；2已缴纳保证金但金额不足够
 */
var securityIsEnough=function(){
	if(checkSecurity()){
		var margin = $api.getStorage("margin");//保证金
		if(Number(margin)>=50){
			return 1;
		} else{
			return 2;
		}
	}else{
		return 0;
	}
}

var setPwdStor=function(pwd){
	$api.setStorage("pwd", pwd);//登录密码
}

var setAvatarStor=function(avatar){
	$api.setStorage("avatar", avatar);//用户头像
}

var setClientPhoneStor=function(clientPhone){
	$api.setStorage("clientPhone", clientPhone);//手机号
}

/**设置在线模式关闭或者开启*/
var setOnlineModel=function(onlineModel){
	$api.setStorage("onlineModel", onlineModel);
	api.execScript({
	    name: 'main_win',
	    script: 'openLocation()'
	});
}
var setOnlineModel=function(onlineModel){
	$api.setStorage("onlineModel", onlineModel);
	api.execScript({
	    name: 'main_win',
	    script: 'openLocation()'
	});
}
/**
 *强制下线 
 */
var forcedOfflineModel=function(){
	var onlineModel = $api.getStorage("onlineModel")
	if(onlineModel==1){
		$api.setStorage("onlineModel", 0);
		api.sendEvent({
		    name: 'forcedOffline_send_event',
		    extra: {
		        offlineSuccess: true,
		    }
		});
	}
	
}




/**获取是否开启在线模式*/
var getOnlineModel=function(){
	return $api.getStorage("onlineModel");
}


/**
 *刷新是否实名验证缓存 
 */
var refreshIsCertification=function(isCertificationNew,clientLevel){
	var isCertification = $api.getStorage("isCertification");
	$api.setStorage("isCertification", isCertificationNew);//是否实名验证（ 1为已实名认证    0 为未实名认证）
	$api.setStorage("clientLevel",clientLevel);//用户级别(0-行业代表   1-服务中心  2-县级代理  3-市级代理  4-省级代理   5-工匠  6-商铺  9-普通用户)
	if(isCertification!=isCertificationNew){
		api.sendEvent({
		    name: 'refresh_certification_event',
		    extra: {
		        isRefreshData: true,
		    }
		});
	}
}


/**检查是否是登录状态*/
var checkLoginState=function(isShowErrHint){
	if (isShowErrHint != undefined && typeof isShowErrHint === "boolean") {
		
	} else{
		isShowErrHint=true;
	}
	var userId=$api.getStorage("userid");
	if(userId==undefined || userId==null || userId==''){
		if(isShowErrHint){
			api.toast({ msg: '请先登录',duration: 2000, location: 'middle'});
		}
		return false;
	} else{
		return true;
	}
}
/**检查是否是工匠类型*/
var checkCurLoginClientLevel=function(isShowErrHint){
	if (isShowErrHint != undefined && typeof isShowErrHint === "boolean") {
		
	} else{
		isShowErrHint=true;
	}
	var userId=$api.getStorage("userid");
	if(userId==undefined || userId==null || userId==''){
		if(isShowErrHint){
			api.toast({ msg: '请先登录',duration: 2000, location: 'middle'});
		}
		return false;
	} else{
		var clientLevel=$api.getStorage("clientLevel");
		if(clientLevel==5 || clientLevel=='5') {
			var isCertification=$api.getStorage("isCertification");//是否实名验证（ 1为已实名认证    0 为未实名认证）
			if(isCertification==1){
				return true;
			} else{
				if(isShowErrHint){
					api.toast({ msg: '您还未实名验证或实名验证未通过',duration: 2000, location: 'middle'});
				}
				return false;
			}
		} else{
			if(isShowErrHint){
				api.toast({ msg: '您尚未是工匠,请切换账号或者完成实名验证试试?',duration: 2000, location: 'middle'});
			}
			return false;
		}
	}
}





