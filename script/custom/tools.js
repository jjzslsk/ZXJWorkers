//使用前先引用jquery、api和main.css
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
var dateFormat = function(date, fmt) {//author: meizz
	if (date == null)
		return '';
	var o = {
		"M+" : date.getMonth() + 1, //月份
		"d+" : date.getDate(), //日
		"h+" : date.getHours(), //小时
		"m+" : date.getMinutes(), //分
		"s+" : date.getSeconds(), //秒
		"q+" : Math.floor((date.getMonth() + 3) / 3), //季度
		"S" : date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt))
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
/**
 *获取当前时间
 */
var getCurrentDate = function(dateType) {
	var date = new Date()
	var datestr = dateFormat(date, dateType)
	return datestr
}
/**
 *两个时间相隔多少分钟
 */
var timeDifference = function(time1, time2) {
	if (time1 == undefined || time1 == null || time1 == '') {
		return '';
	}
	if (time2 == undefined || time2 == null || time2 == '') {
		return '';
	}
	//判断开始时间是否大于结束日期
	if (time1 > time2) {
		return '';
	}
	var begin1 = time1.substr(0, 10).split("-");
	var end1 = time2.substr(0, 10).split("-");
	//将拆分的数组重新组合，并实例成化新的日期对象
	var date1 = new Date(begin1[1] + -+begin1[2] + -+begin1[0]);
	var date2 = new Date(end1[1] + -+end1[2] + -+end1[0]);
	var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);
	//小时数和分钟数相加得到总的分钟数
	//time1.substr(11,2)截取字符串得到时间的小时数
	//parseInt(time1.substr(11,2))*60把小时数转化成为分钟
	var min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
	var min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));
	//两个分钟数相减得到时间部分的差值，以分钟为单位
	var n = min2 - min1;
	//将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
	var minutes = m + n;
	return minutes;
}
/**
 *把时间戳转为为普通日期格式
 */
function getLocalTime(nS) {
	if (nS == undefined || nS == null || nS == '') {
		return '';
	} else {
		Date.prototype.toLocaleString = function() {
			var year = this.getFullYear();
			var month = this.getMonth() + 1;
			var date = this.getDate();
			var hours = this.getHours();
			var minutes = this.getMinutes();

			if (Number(month) < 10) {
				month = '0' + month;
			}
			if (Number(date) < 10) {
				date = '0' + date;
			}
			if (Number(hours) < 10) {
				hours = '0' + hours;
			}
			if (Number(minutes) < 10) {
				minutes = '0' + minutes;
			}
			return year + "/" + month + "/" + date + ' ' + hours + ':' + minutes;
		};
		var unixTimestamp = new Date(nS);
		return unixTimestamp.toLocaleString();
	}
}

function pullupHint(id, isThereData) {
	if (isThereData) {
		$('#' + id).text('正在加载...');
	} else {
		$('#' + id).text('已加载完全部数据');
	}
}

var singleDialog, doubleDialog, threeDialog;
var showSingleAuiDialog = function(title, msg, btnText, funCal) {
	if (singleDialog == undefined || singleDialog == null || singleDialog == '') {
		singleDialog = new auiDialog();
	}
	if (title == undefined || title == null || title == '') {
		title = '提示';
	}
	if (btnText == undefined || btnText == null || btnText == '') {
		btnText = '确定';
	}
	singleDialog.remove();
	singleDialog.alert({
		title : title,
		msg : msg,
		buttons : [btnText]
	}, function(ret) {
		if (funCal != undefined && typeof funCal === "function") {
			funCal(ret);
		}
	})
	return singleDialog;
}
var closeSingleAuiDialog = function() {
	if (singleDialog != undefined && singleDialog != null && singleDialog != '') {
		singleDialog.close();
	}
}
var showDoubleAuiDialog = function(title, msg, confirmText, cancelText, funCal) {
	if (doubleDialog == undefined || doubleDialog == null || doubleDialog == '') {
		doubleDialog = new auiDialog();
	}
	if (title == undefined || title == null || title == '') {
		title = '提示';
	}
	if (confirmText == undefined || confirmText == null || confirmText == '') {
		confirmText = '确定';
	}
	if (cancelText == undefined || cancelText == null || cancelText == '') {
		cancelText = '取消';
	}
	doubleDialog.remove();
	doubleDialog.alert({
		title : title,
		msg : msg,
		buttons : [cancelText, confirmText]
	}, function(ret) {
		if (funCal != undefined && typeof funCal === "function") {
			funCal(ret);
		}
	})
	return doubleDialog;
}
var closeDoubleAuiDialog = function() {
	if (doubleDialog != undefined && doubleDialog != null && doubleDialog != '') {
		doubleDialog.close();
	}
}
var showThreeAuiDialog = function(title, msg, confirmText01, confirmText02, cancelText, funCal) {
	if (threeDialog == undefined || threeDialog == null || threeDialog == '') {
		threeDialog = new auiDialog();
	}
	if (title == undefined || title == null || title == '') {
		title = '提示';
	}
	if (confirmText01 == undefined || confirmText01 == null || confirmText01 == '') {
		confirmText01 = '确定1';
	}
	if (confirmText02 == undefined || confirmText02 == null || confirmText02 == '') {
		confirmText02 = '确定2';
	}
	if (cancelText == undefined || cancelText == null || cancelText == '') {
		cancelText = '取消';
	}
	threeDialog.alert({
		title : title,
		msg : msg,
		buttons : [cancelText, confirmText02, confirmText01]
	}, function(ret) {
		if (funCal != undefined && typeof funCal === "function") {
			funCal(ret);
		}
	})
}
var closeThreeAuiDialog = function() {
	if (threeDialog != undefined && threeDialog != null && threeDialog != '') {
		threeDialog.close();
	}
}
var weChat;
/**
 *跳转到微信小程序
 */
function goToWeChatApplet() {
	if (weChat == undefined || weChat == null || weChat == '') {
		weChat = api.require('wx');
		//加入微信模块
	}
	weChat.isInstalled(function(ret, err) {
		if (ret.installed) {
			weChat.launchMiniProgram({
				apiKey : 'wx5fb9d8a50dc4fbd4',
				miniProgramType : 'release', //拉起小程序的类型。test：开发版；review：体验版；release：正式版
				userName : 'gh_fd092677ec71',
				path : '',
			}, function(ret, err) {
				if (ret.status) {
				} else {
					api.alert({
						title : '提示',
						msg : '调起小程序失败' + err.code
					}, function(ret, err) {
					});
				}
			});
		} else {
			api.alert({
				title : '提示',
				msg : '当前设备未安装微信客户端',
			}, function(ret, err) {
			});
		}
	});
}

/**验证身份证号格式是否正确*/
function checkIdCardNumber(idNo) {
	var resule = true;
	var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	if (idNo == undefined || idNo == null || idNo == '') {
		resule = false;
	} else if (!regIdNo.test(idNo)) {
		api.toast({
			msg : '身份证号格式填写有误',
			duration : 2000,
			location : 'middle'
		});
		resule = false;
	}
	return resule;
}

/**验证人员姓名是否正确*/
function checkPersonName(name) {
	var resule = true;
	var regName = /^[\u4e00-\u9fa5]{2,4}$/;
	if (name == undefined || name == null || name == '') {
		resule = false;
	} else if (!regName.test(name)) {
		api.toast({
			msg : '真实姓名填写有误',
			duration : 2000,
			location : 'middle'
		});
		resule = false;
	}
	return resule;
}

/**使用正则验证输入的是否是手机号 */
function checkPhone(str) {
	if (str == undefined || str == null || str == '') {
		return false;
	}
	var phoneReg = /^[1][1-9][0-9]{9}$/;
	//以1为开头;第二位可为1-9,中的任意一位；最后以0-9的9个整数结尾
	if (!phoneReg.test(str)) {
		return false;
	} else {
		return true;
	}
}

/**切割城市名称*/
function cutOutCityName(city) {
	if (city.length > 0 && city.charAt(city.length - 1) == '市') {
		city = city.substring(0, city.length - 1);
	}
	return city;
}

/**隐藏手机中间的信息*/
function phoneMiddleHide(phoneStr) {
	if (phoneStr == undefined || phoneStr == null || phoneStr == '') {
		return '';
	} else {
		return phoneStr.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
	}
}

/**隐藏身份证中间的信息*/
function idCardMiddleHide(idCardStr) {
	if (idCardStr == undefined || idCardStr == null || idCardStr == '') {
		return '';
	} else {
		return idCardStr.replace(/(\w)/g, function(a, b, c, d) {
			return (c > 2 && c < (idCardStr.length - 4)) ? '*' : a
		});
	}
}

/**隐藏银行卡中间的信息*/
function bankCardHide(bankCardStr) {
	if (bankCardStr == undefined || bankCardStr == null || bankCardStr == '') {
		return '';
	} else {
		return bankCardStr.replace(/\s/g, '').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2");
	}

}

/**隐藏人员姓名中间或者后面的文字的信息*/
function personNameHide(personStr) {
	var result = '';
	if (personStr == undefined || personStr == null || personStr == '') {
		result = personStr;
	} else if (personStr.length == 2) {
		result = personStr.substring(0, 1) + '*';
	} else if (personStr.length > 2) {
		result = personStr.substring(0, 1);
		for (var i = 0; i < personStr.length - 2; i++) {
			result = result + '*'
		}
		result = result + personStr.substring(personStr.length - 1, personStr.length);
	} else {
		result = personStr;
	}
	return result;
}

/**名字转换成性别+师傅*/
function personNameToMaster(nameStr) {
	var result = '';
	if (nameStr != undefined && nameStr != null && nameStr.length > 0) {
		result = nameStr.substring(0, 1) + '师傅';
	} else {
		result = nameStr;
	}
	return result;
}

/**
 *键盘监听
 * @param {Object} funCal(isShow) 回调  isShow true显示 false关闭
 */
function keyboardListening(funCal) {
	var systemType = api.systemType;
	// ios、android、win、wp
	if (systemType == 'android') {
		//获取原窗口的高度
		var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
		window.onresize = function() {
			//键盘弹起与隐藏都会引起窗口的高度发生变化
			var resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
			if (resizeHeight - 0 < originalHeight - 0) {
				//当软键盘弹起，在此处操作
				funCal(true);
			} else {
				//当软键盘收起，在此处操作
				funCal(false);
			}
		}
	}
	//	else if(systemType=='ios'){
	//		//focusin和focusout支持冒泡，对应focus和blur, 使用focusin和focusout的原因是focusin和focusout可以冒泡，focus和blur不会冒泡，这样就可以使用事件代理，处理多个输入框存在的情况。
	//		 document.body.addEventListener('focusin', function(){
	//          	//软键盘弹出的事件处理
	//				funCal(true);
	//      	});
	//		  document.body.addEventListener('focusout', function(){
	//		      	 //软键盘收起的事件处理
	//				funCal(false);
	//		   })
	//	}
}

var videoPlayer;
/**视频播放*/
var videoPlay = function(data) {
	if (videoPlayer == undefined || videoPlayer == null || videoPlayer == '') {
		videoPlayer = api.require('videoPlayer');
	}
	var title = data.title;
	if (title.length > 15) {
		title = title.substring(0, 15) + '...';
	}
	videoPlayer.play({
		texts : {
			head : {
				title : title
			}
		},
		styles : {
			head : {
				bg : 'rgba(0.5,0.5,0.5,0.7)',
				height : 30,
				titleSize : 15,
				titleColor : '#fff',
				backSize : 20,
				backImg : 'widget://image/back.png',
				setSize : 20,
				setImg : 'widget://image/set.png'
			},
			foot : {
				bg : 'rgba(0.5,0.5,0.5,0.7)',
				height : 30,
				playSize : 20,
				playImg : 'fs://img/back.png',
				pauseImg : 'fs://img/back.png',
				nextSize : 20,
				nextImg : 'fs://img/back.png',
				timeSize : 14,
				timeColor : '#fff',
				sliderImg : 'fs://img/slder.png',
				progressColor : '#696969',
				progressSelected : '#76EE00'
			}
		},
		path : data.videoUrl,
		autoPlay : true
	}, function(ret, err) {
	});

}
var goPhoto = function(sourceType, calFun) {
	api.getPicture({
		sourceType : sourceType, //library图片库;camera//相机;album//相册
		encodingType : 'jpg', //jpg,png
		mediaValue : 'pic', //pic图片;video视频;all图片和视频，Android不支持,
		destinationType : 'url', //base64指定返回数据为base64编码后内容;url指定返回数据为选取的图片地址
		allowEdit : true, //是否可以选择图片后进行编辑，支持iOS及部分安卓手机
		quality : 50, //图片质量，只针对jpg格式图片（0-100整数）默认值：50
		//      targetWidth: 100,//压缩后的图片宽度，图片会按比例适配此宽度,
		saveToPhotoAlbum : true//拍照或录制视频后是否保存到系统相册目录。注意此处仅是文件系统层面的操作，使用诸如“图库”App仍然有可能查看到。
	}, function(ret, err) {
		if (ret) {
			if(ret.data.length>0){
				var tempList = [];
				tempList.push(ret.data);
				calFun(tempList)
			}
		} else {
			api.toast({
				msg : err.msg,
				duration : 2000,
				location : 'bottom'
			});
		}
	});
}
var UIAlbumBrowser;
/**
 *从相册选择图片
 * @param {Object} calFun 回调，返回图片list
 * @param {Object} maxNun 最多能选择多少张
 * @param {Object} finishTextStr 确认按钮文字内容
 */
var chooseImg = function(calFun, maxNun, finishTextStr) {
	if (maxNun == undefined || maxNun == null || maxNun == '') {
		maxNun = 9
	}
	if (finishTextStr == undefined || finishTextStr == null || finishTextStr == '') {
		finishTextStr = '完成'
	}
	if (UIAlbumBrowser == undefined || UIAlbumBrowser == null || UIAlbumBrowser == '') {
		UIAlbumBrowser = api.require('UIAlbumBrowser');
	}
	if (UIAlbumBrowser == undefined || UIAlbumBrowser == null || UIAlbumBrowser == '') {
		api.toast({
			msg : '打开相册失败' + UIAlbumBrowser,
			duration : 1000,
			location : 'bottom'
		});
		return;
	}
	UIAlbumBrowser.open({
		max : maxNun, //最多选择几张图片
		type : 'image',
		classify : false,
		styles : {
			bg : '#fff', //资源选择器背景
			mark : {//选中图标的样式
				icon : '',
				position : 'top_right', //图标的位置，默认：'bottom_left'(top_left 左上角;bottom_left 左下角;top_right 右上角;bottom_right 右下角)
				size : 20//图标的大小
			},
			nav : {
				bg : 'rgba(0,0,0,0.6)', //导航栏样式
				titleColor : '#fff', //标题文字颜色
				titleSize : 18, //标题文字大小
				cancelColor : '#fff', //取消按钮的文字颜色
				cancelSize : 16, //取消按钮的文字大小
				cancelText : '取消', //取消按钮文字内容；默认：'取消'
				finishColor : '#fff', //完成按钮的文字颜色
				finishSize : 16,
				finishText : finishTextStr//完成按钮文字内容；默认：'完成'
			}
		},
		rotation : true
	}, function(ret) {
		//eventType 按钮点击事件：confirm 用户点击确定按钮事件；cancel 用户点击取消按钮事件
		if (ret.eventType == 'confirm') {
			var tempList = [];
			for (var index in ret.list) {
				tempList.push(ret.list[index].path);
			}
			if (tempList.length > 0) {
				UIAlbumBrowser.batchTransPath({
					path : tempList
				}, function(ret, err) {
					if (ret) {
						calFun(ret.path)
					} else {
						api.toast({
							msg : '图片路径地址转化失败...',
							duration : 1000,
							location : 'bottom'
						});
					}
				})
			}

		}

	});
}
var zySmallVideo;
var zySmallVideoIsOpen=false;
var shootSmallVideo = function(calFun) {
	if (zySmallVideo == undefined || zySmallVideo == null || zySmallVideo == '') {
		zySmallVideo = api.require('zySmallVideo');
	}
	//	zySmallVideo.open({
	//	    MaxRecordTime: 10,//录制视频的秒数（默认5秒，安卓可能会比实际少1秒）;类型：数字型
	//	    videoColor: api.systemType=="ios"?0xcd0000:"#cd0000",//（可选项）录制圈的颜色 可以这么写（api.systemType=="ios"?0xcd0000:"#cd0000",）;默认值：android#000000/ios0xcd0000;类型：android字符串/ios长整型
	//	    AVAssetExportPreset:"AVAssetExportPreset1280x720",//ios的分辨率设置 越清晰 视频越大 仅ios可用;默认值：AVAssetExportPresetMediumQuality
	//	    mVideoSizeW:720,//android的分辨率宽设置 越清晰 视频越大 仅android可用（看实际情况填写，可能有失败的情况）;默认值：720
	//	    mVideoSizeH:1280//android的分辨率高设置 越清晰 视频越大 仅android可用（看实际情况填写，可能有失败的情况）;默认值：1280
	//	},function(ret, err){
	//		if(ret && ret.result=='success'){
	//			 calFun(ret,true)
	//		}
	//	});
	zySmallVideoIsOpen=true;
	zySmallVideo.openNew({
		rect : {//模块 附于一个frame之上
			x : 0,
			y : 0,
			w : api.frameWidth,
			h : api.frameHeight,
		},
		fixedOn : api.frameName,
		fixed : true,//布尔 描述：（可选项）模块是否不随所属 window 或 frame 滚动 默认值：true（不随之滚动）
		videoInfo : {//视频高级设置 不懂请勿修改
			videoSize_w : 720, //视频分辨率 宽 默认720
			videoSize_h : 1280, //视频分辨率 高 默认1280
			setOutputFormat : 2, //录制格式 默认2 mp4  0（DEFAULT） 1（THREE_GPP） 2（MPEG_4默认） 3（RAW_AMR） 4（AMR_WB） 5（AAC_ADIF） 6（AAC_ADTS） 7（OUTPUT_FORMAT_RTP_AVP） 8（OUTPUT_FORMAT_MPEG2TS） 9（WEBM）
			setVideoEncoder : 2, //编码格式 默认2 h264 0（DEFAULT） 1（H263） 2（H264默认） 3（MPEG_4_SP） 4（VP8） 5（HEVC）
			setAudioEncoder : 3,//音频格式应该是 默认3 aac  0（DEFAULT） 1（AMR_NB） 2（AMR_WB） 3（AAC默认） 4（HE_AAC） 5（AAC_ELD） 6（VORBIS）
		},
		MaxRecordTime : 10, //最大录制时间 单位秒 默认10
		MinRecordTime : 2, //最短录制时间  单位ms
		MinTimeText : "还没到时间呢", //最短时间提示词
		setFeatures : 1002, //设置拍照和录像   1001只拍照   1002只录像   1003两者都可以  默认1003
		setTip : "", //设置按钮上的提示词   长按拍摄等 默认空
		setBackIcon : "", //自定义返回图标 默认向下键头  支持widget  fs 等路径图片
		setBackShow : 1, //设置返回图标是否显示 1是 0否  默认1
		setCameraIcon : "", //自定义切换摄像头图标  支持widget  fs 等路径图片
		setCameraShow : 1, //右上角切换摄像头是否显示 1是 0否 默认1
		cameraInfo : {//摄像头 设置样式
			fit_xy : false, //图片是否拉伸占满宽高  默认false
			w : 120, // 摄像头宽度 默认 120
			h : 120, // 摄像头高度 默认 92
			margin_l : 0, //距左 默认都是0
			margin_r : 35, //距右
			margin_t : 65, //距上
			margin_b : 0,//距下
		},
		foucsInfo : {//点击的对焦框 样式
			color : "#cd0000", //线条颜色 默认16AE16
			width : 14,//线条宽度 默认4
		},
		recordInfo : {//录制时的参数
			button_radius : 120, //外圆半径 默认120
			button_inside_radius : 90, //内圆半径 默认90
			progress_color : "#cd0000", //进度条颜色 默认16AE16
			outside_color : "#DCDCDC", //外圆背景色 默认DCDCDC
			inside_color : "#FFFFFF", //内圆背景色 默认FFFFFF
			strokeWidth : 15, //进度条宽度 默认15
			outside_add_size : 48, //长按外圆半径变大的Size 默认48
			inside_reduce_size : 30,//长按内圆缩小的Size 默认30
		},
		confirmInfo : {//确认框参数
			fit_xy : false, //图片是否拉伸占满宽高  默认false
			img : "", //设置自定义图片
			w : 220, //宽 默认200
			h : 220, //高 默认200
			margin_r : 170, //确认按距右
		},
		cancelInfo : {//取消框参数
			fit_xy : false, //图片是否拉伸占满宽高  默认false
			img : "", //设置自定义图片
			w : 220, //宽 默认200
			h : 220, //高 默认200
			margin_l : 170,//确认按距左
		},
	}, function(ret, err) {
		zySmallVideoIsOpen=false;
		var systemType = api.systemType;
		if(systemType=='ios'){
			if(ret && ret.result=='success'){
				var resObj={};
				resObj.imgUrl=ret.filePic;
				resObj.videoUrl=ret.fileUrl;
				calFun(resObj,true)
			}else{
				api.toast({msg : ret.result,duration : 2000,location : 'bottom'});
			}
		}else{
			if (ret.status) {
				if(ret.type == "recordSuccess"){
					var resObj={};
					resObj.imgUrl=ret.result;
					resObj.videoUrl=ret.url;
					calFun(resObj,true)
				}
			}else{
				api.toast({msg : ret.result,duration : 2000,location : 'bottom'});
			}
		}
	
		
	});
}

var zySmallVideoClose=function(){
	if (zySmallVideo == undefined || zySmallVideo == null || zySmallVideo == '') {
		zySmallVideo = api.require('zySmallVideo');
	}
	zySmallVideoIsOpen=false;
	zySmallVideo.close();
}

/**
 *拍照或者从相册选择图片
 * @param {Object} calFun 回调，返回图片list
 * @param {Object} maxNun 最多能选择多少张，用于选择相册图片
 * @param {Object} finishTextStr 确认按钮文字内容，用于选择相册图片
 * @param {Object} isAddVideo 是否添加视频选项
 * @param {Object} onlyChooseVideo 是否只能选择视频
 */
function chooseCameraSheet(calFun, maxNun, finishTextStr, isAddVideo, onlyChooseVideo) {
	if (isAddVideo == undefined || isAddVideo == null || isAddVideo == '' || typeof isAddVideo != 'boolean') {
		isAddVideo = false;
	}
	if (onlyChooseVideo == undefined || onlyChooseVideo == null || onlyChooseVideo == '' || typeof onlyChooseVideo != 'boolean') {
		onlyChooseVideo = false;
	}
	var permissionNameObj = {
		camera : '相机',
		photos : '相册',
		storage : '存储空间'
	};
	var permissionList = ['camera', 'photos', 'storage'];

	
	var cameraAction = 0;
	//-1选择相机、相册和视频；0只能选择相机、相册；1：只能选择视频
	var buttons = ['拍照', '相册'];
	if (isAddVideo && onlyChooseVideo) {
		buttons = ['视频'];
		permissionNameObj.microphone='麦克风';
		permissionList.push('microphone');
		cameraAction = 1;
	} else if (isAddVideo && !onlyChooseVideo) {
		buttons = ['拍照', '相册', '视频'];
		permissionNameObj.microphone='麦克风';
		permissionList.push('microphone');
		cameraAction = -1;
	}
	if (!checkAppPermission(permissionNameObj, permissionList))return;
	
	api.actionSheet({
		cancelTitle : '取消',
		buttons : buttons
	}, function(ret, err) {
		var index = ret.buttonIndex;
		if (cameraAction == 1) {
			//只能选择视频
			if (index == 1) {
				//视频
				shootSmallVideo(calFun);
			}
		} else if (cameraAction == -1) {
			//选择相机、相册和视频
			if (index == 1) {
				//拍照
				goPhoto('camera', calFun)
			} else if (index == 2) {
				//选择相册
				chooseImg(calFun, maxNun, finishTextStr);
			} else if (isAddVideo && index == 3) {
				//视频
				shootSmallVideo(calFun);
			}
		} else {
			//只能选择相机、相册
			if (index == 1) {
				//拍照
				goPhoto('camera', calFun)
			} else if (index == 2) {
				//选择相册
				chooseImg(calFun, maxNun, finishTextStr);
			}
		}

	});
}

/**
 *检测身份证图片大小,过大需要压缩传给百度验证身份证号
 * @param {Object} imgPath 图片path
 * @param {Object} maxLong 最长边最大多少
 * @param {Object} minShort 最短边至少多少
 * @param {Object} callback 处理结果回调，返回base64图片
 */
function checkIdCardImgSize(imgPath, maxLong, minShort, callback) {
	var img = new Image();
	img.src = imgPath;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width, h = that.height, scale = w / h;
		//判断那边比较长
		if (w > h) {
			//长边最大不能超过maxLong
			scale = w / h;
			if (w > maxLong) {
				w = maxLong;
				h = w / scale;
			} else {
				//如果长边没超过最长，则再判断一下短边是否短过最短
				if (h < minShort) {
					h = minShort;
					w = h * scale;
				}
			}
		} else {
			scale = h / w;
			if (h > maxLong) {
				h = maxLong;
				w = h / scale;
			} else {
				//如果长边没超过最长，则再判断一下短边是否短过最短
				if (w < minShort) {
					w = minShort;
					h = w * scale;
				}
			}
		}
		var quality = 0.7;
		// 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		if (base64 != undefined && base64.length > 0) {
			base64 = base64.split(",")[1];
		}

		// 回调函数返回base64的值
		callback(base64);
	}
}

/**
 * 图片压缩，默认同比例压缩
 * @param {Object} path
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *   回调函数有一个参数，base64的字符串数据
 */
function dealImage(path, obj, callback) {
	var img = new Image();
	img.src = path;
	img.onload = function() {
		var that = this;
		// 默认按比例压缩
		var w = that.width, h = that.height, scale = w / h;
		w = obj.width || w;
		h = obj.height || (w / scale);
		var quality = 1;
		// 默认图片质量为0.7
		//生成canvas
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		// 创建属性节点
		var anw = document.createAttribute("width");
		anw.nodeValue = w;
		var anh = document.createAttribute("height");
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(that, 0, 0, w, h);
		// 图像质量
		if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
			quality = obj.quality;
		}
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL('image/jpeg', quality);
		// 回调函数返回base64的值
		callback(base64);
	}
}

var toolsFs;
var pathChat = 'fs://ZXJWorkers';
//同步检测文件或者文件夹是否存在
var fsExistSync = function(path) {
	if (toolsFs == undefined || toolsFs == null || toolsFs == '') {
		toolsFs = api.require('fs');
	}
	var resule = false;
	var ret = toolsFs.existSync({
		path : path
	});
	if (ret.exist) {
		resule = true;
	} else {
		resule = false;
	}
	return resule;
};

/**获取缓存聊天数据的文件夹路径*/
var getChatCachePath = function() {
	if (!fsExistSync(pathChat)) {
		//文件目录不存在,则创建目录
		var ret = toolsFs.createDirSync({
			path : pathChat
		});
		if (ret.status) {
			//创建成功
			return pathChat;
		} else {
			api.toast({
				msg : '缓存聊天数据文件夹路径创建失败,请检查文件读写权限是否开启',
				duration : 2000,
				location : 'bottom'
			});
			return false;
		}
	} else {
		return pathChat;
	}

}
var base64Chat;
/**
 *通过文件名把聊天记录写入到本地缓存文件中
 * @param {Object} fileName 文件名，一般用对方聊天的id做文件名
 * @param {Object} otherPayObj 对方账号信息
 * @param {Object} jsonArray 存放的聊天内容数组
 */
var writeRecordChatToCache = function(fileName, otherPayObj, jsonArray) {
	if (jsonArray == undefined || jsonArray == null || jsonArray == '')
		return;
	var tempArray = [];
	if (jsonArray.length > 20) {
		//最多存放最新二十条数据
		tempArray = jsonArray.slice(-20)
	} else {
		tempArray = jsonArray;
	}
	if (base64Chat == undefined || base64Chat == null || base64Chat == '') {
		base64Chat = new Base64();
	}
	var paramObj = {};
	paramObj.otherPayInfo = otherPayObj;
	paramObj.chatList = tempArray;
	var jsonArrayBase64 = base64Chat.encode(JSON.stringify(paramObj));
	var userId = $api.getStorage("userid");
	//用户id
	var path = getChatCachePath() + '/' + userId + '/' + fileName + '.txt';
	if (!fsExistSync(path)) {
		//文件不存在则创建
		var ret = toolsFs.createFileSync({
			path : path
		});
		if (ret.status) {
			//创建成功
		} else {
			api.toast({
				msg : '缓存聊天数据文件创建失败,请检查文件读写权限是否开启',
				duration : 2000,
				location : 'bottom'
			});
			return;
		}
	}

	api.writeFile({
		path : path,
		data : jsonArrayBase64
	}, function(ret, err){});
}
/**
 * 封装打包好聊天数据，然后写入到本地缓存文件
 * @param {Object} wrOrderId 工单id
 * @param {Object} wrOtherPayId 聊天的时候对方的id
 * @param {Object} wrOtherPayName 聊天的时候对方的Name
 * @param {Object} wrOtherPayAva 聊天的时候对方的头像
 * @param {Object} unreadCount 未读数量
 * @param {Object} wrChatDataList 存放的聊天内容数组
 */
var writeRecordChatByPackag = function(wrOrderId, wrOtherPayId, wrOtherPayName, wrOtherPayAva, unreadCount, wrChatDataList) {
	var wrOtherPayObj = {};
	wrOtherPayObj.otherPayId = wrOtherPayId;
	//对方id
	wrOtherPayObj.otherPayName = wrOtherPayName;
	//对方的名字
	wrOtherPayObj.otherPayAva = wrOtherPayAva;
	//对方的头像
	wrOtherPayObj.orderId = wrOrderId;
	//工单id
	wrOtherPayObj.unreadCount = unreadCount == undefined ? 0 : unreadCount;
	//未读数据
	writeRecordChatToCache(wrOtherPayId, wrOtherPayObj, wrChatDataList);
}
/**
 *通过文件名读取本地文件保存的聊天记录
 * @param {Object} fileName 文件名
 */
var readRecordChatByCache = function(fileName) {
	var userId = $api.getStorage("userid");
	//用户id
	fileName = fileName.toString();
	if (fileName.substring(fileName.length - 4, fileName.length) != '.txt') {
		fileName = fileName + '.txt'
	}
	var path = getChatCachePath() + '/' + userId + '/' + fileName;
	if (base64Chat == undefined || base64Chat == null || base64Chat == '') {
		base64Chat = new Base64();
	}
	//同步返回结果：
	var retData = api.readFile({
		sync : true,
		path : path
	})
	var str = base64Chat.decode(retData);
	if (str.length > 0) {
		return JSON.parse(str);
	} else {
		return null;
	}
}
//通过文件名获取缓存在本地的聊天数据
var readRecordChatCacheByFileName = function(fileName) {
	var recordJson = readRecordChatByCache(fileName);
	if (recordJson == undefined || recordJson == null || recordJson == '') {
		recordData = null;
	} else {
		return recordJson;
	}
	return recordData;
}
//过滤赛选只要聊天内容对方的信息缓存数据
var getChatOtherPayInfo = function(recordJson) {
	var otherPayInfoTemp;
	if (recordJson == undefined || recordJson == null || recordJson == '' || recordJson.chatList == undefined || recordJson.chatList == null || recordJson.chatList == '') {
		otherPayInfoTemp = null;
	} else {

		if (isObjectFn(recordJson.otherPayInfo)) {
			otherPayInfoTemp = recordJson.otherPayInfo;
		} else {
			otherPayInfoTemp = null;
		}
	}
	return otherPayInfoTemp;
}
//过滤赛选只要聊天内容列表的缓存数据
var getChatListfilter = function(recordJson) {
	var recordData = [];
	if (recordJson == undefined || recordJson == null || recordJson == '' || recordJson.chatList == undefined || recordJson.chatList == null || recordJson.chatList == '') {
		recordData = [];
	} else {
		if (isArrayFn(recordJson.chatList)) {
			recordData = recordJson.chatList;
		} else {
			recordData = [];
		}
	}
	return recordData;
}
/**
 *获取对话信息列表
 */
var readChatMsgList = function() {
	var chatList = [];
	if (toolsFs == undefined || toolsFs == null || toolsFs == '') {
		toolsFs = api.require('fs');
	}
	var userId = $api.getStorage("userid");
	//用户id
	var path = pathChat + '/' + userId;
	var ret = toolsFs.readDirSync({
		path : path
	});
	if (ret.status) {
		var fileNameList = ret.data;
		if (fileNameList == undefined || fileNameList == null || fileNameList == '')
			return chatList;
		for (var index in fileNameList) {
			var chatJson = readRecordChatByCache(fileNameList[index]);
			var objJson = {};
			objJson.otherPayInfo = chatJson.otherPayInfo;
			if (chatJson.chatList != undefined && chatJson.chatList.length > 0) {
				objJson.lastChat = chatJson.chatList[chatJson.chatList.length - 1];
				//拿最后一条信息
			} else {
				objJson.lastChat = [];
				//拿最后一条信息
			}
			chatList.push(objJson)
		}
	}
	return chatList;
}
/**更新item未读标识，改为已读 */
var upChatUnreadCount = function(fromuserId) {
	var userId = $api.getStorage("userid");
	//用户id
	var receiveJson = readRecordChatCacheByFileName(fromuserId);
	//获取与该用户在本地的聊天记录
	var otherPayInfo = getChatOtherPayInfo(receiveJson);
	//获取到聊天对方的用户信息
	var recordData = getChatListfilter(receiveJson);

	if (otherPayInfo != null) {
		otherPayInfo.unreadCount = 0;
		writeRecordChatToCache(fromuserId, otherPayInfo, recordData);
		upChatMsgTabBage();
	}
}
/**设置消息右上角提示*/
var upChatMsgTabBage = function() {
	var chatMsgList = readChatMsgList();
	var unreadCountTotal = 0;
	var isShowHint = false;
	//是否显示提示
	for (var index in chatMsgList) {
		var unreadCount = chatMsgList[index].otherPayInfo.unreadCount == undefined ? 0 : chatMsgList[index].otherPayInfo.unreadCount;
		//		if(Number(unreadCount)>0){
		//			isShowHint = true;
		//			break;
		//		}
		unreadCountTotal = Number(unreadCountTotal) + Number(unreadCount);
	}
//	if (Number(unreadCountTotal) > 99) {
//		unreadCountTotal = '99..'
//	}
	api.execScript({
		name : 'main_win',
		script : 'msgShowTip(' + unreadCountTotal + ')'
	});

	//更新消息列表的item未读数量
	api.sendEvent({
		name : 'upChatMsgTabBage_send_event',
		extra : {
			isUpCount : true
		}
	});

	//  if (unreadCountTotal == undefined || unreadCountTotal == null || unreadCountTotal == '' || unreadCountTotal == 0) {
	//    //关闭提示
	//  } else {
	// 	  //开启提示
	//
	//  }
}
/**
 *删除与某个人聊天在本地缓存的记录
 * fileName 文件名称(文件名，一般用对方聊天的id做文件名)
 */
var removeChatMsgItem = function(fileName, resCalFun) {
	if (fileName == undefined || fileName == null || fileName == '') {
		if ( typeof resCalFun === "function") {
			resCalFun(false);
		}
		return;
	}
	if (toolsFs == undefined || toolsFs == null || toolsFs == '') {
		toolsFs = api.require('fs');
	}
	var userId = $api.getStorage("userid");
	//用户id
	var path = getChatCachePath() + '/' + userId + '/' + fileName + '.txt';
	var ret = toolsFs.removeSync({
		path : path
	});
	if (ret.status) {
		if ( typeof resCalFun === "function") {
			resCalFun(true);
		}
	} else {
		if ( typeof resCalFun === "function") {
			resCalFun(false);
		}
		api.toast({
			msg : '删除失败！',
			duration : 2000,
			location : 'middle'
		});
	}

};

var imageFilter;
/**获取imageFilter模块*/
var getImageFilter = function() {
	if (imageFilter == undefined || imageFilter == null || imageFilter == '') {
		imageFilter = api.require('imageFilter');
	}
	return imageFilter;
}
/**获取指定路径下的图片信息*/
var imageFilterGetAttr = function(imgPath, funCal) {
	getImageFilter().getAttr({
		path : imgPath
	}, function(ret, err) {
		if (ret.status) {
			if (funCal != undefined && typeof funCal === "function") {
				funCal(ret);
			}
			//	        {
			//		        status:        //布尔类型；操作成功状态值
			//		        width:         //数字类型；获取的图片的宽
			//		        height:        //数字类型；获取的图片的高
			//		        size:          //数字类型；获取的图片文件的大小，单位：byte
			//			}
		} else {
			api.toast({
				msg : err.code,
				duration : 2000,
				location : 'middle'
			});
		}
	});
}
/**图片压缩处理*/
var imageFilterCompress = function(imgPath, funCal) {
	var arr = imgPath.split('/');
	var imgName = 'comp-' + arr[arr.length - 1] + '';
	var savePath = api.fsDir + '/picture';
	getImageFilter().compress({
		img : imgPath,
		isClarityimg : false, //(可选项) 图片背景是否透明 仅支持iOS
		quality : 0.5, //（可选项）压缩程度，取值范围：0-1,当isClarityimg参数为false时有效
		scale : 1, //（可选项）压缩后的图片缩放比例，取值范围大于0(若size参数有值，则忽略本参数)
		//	    size:{//（可选项）压缩后的图片的大小(若本参数有值，则忽略scale)
		//	    	w:,//压缩后的图片的宽，数字类型，无默认值
		//	    	h://压缩后的图片的高，数字类型，无默认值
		//	    },
		save : {//（可选项）压缩后的图片保存位置
			album : false, //(可选项)布尔值，是否保存到系统相册，默认false
			imgPath : savePath, //(可选项)保存的文件路径,字符串类型，无默认值,不传或传空则不保存，若路径不存在文件夹则创建此目录
			imgName : imgName//(可选项)保存的图片名字，支持png和jpg格式，若不指定格式，则默认png，字符串类型，无默认值,不传或传空则不保存
		}
	}, function(ret, err) {
		if (ret.status) {
			if (funCal != undefined && typeof funCal === "function") {
				funCal(savePath + '/' + imgName);
			}
		} else {
			var imgFilErrMsg = {
				'-1' : '未知错误',
				'0' : '保存到相册失败',
				'1' : '保存到指定路径失败',
				'2' : '保存到相册和指定路径失败',
				'3' : '压缩图片路径不存在'
			};
			api.toast({
				msg : imgFilErrMsg[err.code] + '(' + err.code + ')',
				duration : 2000,
				location : 'middle'
			});
			if (funCal != undefined && typeof funCal === "function") {
				funCal(imgPath);
			}
		}
	});
}
/**图片上传前检测压缩*/
var checkCompressImg = function(imgPath, funCal) {
	imgPath = imgPath.toString();
	if (imgPath.substring(0, 4) == 'http') {
		funCal(null);
		return;
	}
	imageFilterCompress(imgPath, funCal);
	//	imageFilterGetAttr(imgPath,function(ret){
	//	    var size = ret.size;
	//	    var width = ret.width;
	//	    var height = ret.height;
	//	    var oneM=1048576;//1M的字节
	//	    if(size>oneM){
	//	    	//压缩图片
	//	   		imageFilterCompress(imgPath,funCal);
	//	    } else{
	//	    	if (funCal != undefined && typeof funCal === "function") {
	//				funCal(imgPath);
	//			}
	//	    }
	//
	//	});
}

/**使用递归处理图片压缩异步顺序问题*/
var recursiveCompress=function(position,imgPathList,funCal){
	if(position>=imgPathList.length){
		return;
	}
	var imgPath = imgPathList[position];
	//检测压缩图片
	checkCompressImg(imgPath, function(imgPathCp) {
		if (imgPathCp != null) {
			funCal(true,imgPathCp);
//			attFkName.push(attFkNameStr);
//			attName.push(attNameStr + imgPathCpList.length + '.jpg');
//			imgPathCpList.push(imgPathCp);
		}else{
			funCal(false,'');
		}
//		count++;
//		if (funCal != undefined && typeof funCal === "function" && count == imgPathList.length) {
//			funCal(attName, attFkName, imgPathCpList);
//		}
	});
};

/**
 *批量压缩封装上传图片的参数
 */
var batchCompressList = function(attFkNameStr, attNameStr, imgPathList, funCal) {
	var attFkName = [];
	// 是固定的，client_idcard 就是身份证，client_cert 就是资质，client_place 经营场所，client_quali 其它认证文件，client_case 工程案例，如果没有，可自定义。
	var attName = [];
	// 是图片（附件）名称，比如client_idcard_on 身份证正面， client_idcard_off 身份证反面。。。完全自定义的
	var imgPathCpList = [];
//	var count = 0;
//	//压缩后的图片路径
//	for (var index in imgPathList) {
//		var imgPath = imgPathList[index];
//		//检测压缩图片
//		checkCompressImg(imgPath, function(imgPathCp) {
//			if (imgPathCp != null) {
//				attFkName.push(attFkNameStr);
//				attName.push(attNameStr + imgPathCpList.length + '.jpg');
//				imgPathCpList.push(imgPathCp);
//			}
//			count++;
//			if (funCal != undefined && typeof funCal === "function" && count == imgPathList.length) {
//				funCal(attName, attFkName, imgPathCpList);
//			}
//		});
//	}
//	
	var position=0;
	function compressFun(isPass,imgPathCp){
		if(isPass){
			attFkName.push(attFkNameStr);
			attName.push(attNameStr + imgPathCpList.length + '.jpg');
			imgPathCpList.push(imgPathCp);
		}
		position++;
		if(position == imgPathList.length){
			if(funCal != undefined && typeof funCal === "function"){
				funCal(attName, attFkName, imgPathCpList);
			}
		}else{
			recursiveCompress(position,imgPathList,compressFun)
		}
	}
	recursiveCompress(position,imgPathList,compressFun);//使用递归遍历，处理异步压缩文件顺序问题
	
};

// toFixed兼容方法
Number.prototype.toFixed = function(len) {
	if (len > 20 || len < 0) {
		throw new RangeError('toFixed() digits argument must be between 0 and 20');
	}
	// .123转为0.123
	var number = Number(this);
	if (isNaN(number) || number >= Math.pow(10, 21)) {
		return number.toString();
	}
	if ( typeof (len) == 'undefined' || len == 0) {
		return (Math.round(number)).toString();
	}
	var result = number.toString(), numberArr = result.split('.');

	if (numberArr.length < 2) {
		//整数的情况
		return padNum(result);
	}
	var intNum = numberArr[0], //整数部分
	deciNum = numberArr[1], //小数部分
	lastNum = deciNum.substr(len, 1);
	//最后一个数字

	if (deciNum.length == len) {
		//需要截取的长度等于当前长度
		return result;
	}
	if (deciNum.length < len) {
		//需要截取的长度大于当前长度 1.3.toFixed(2)
		return padNum(result)
	}
	//需要截取的长度小于当前长度，需要判断最后一位数字
	result = intNum + '.' + deciNum.substr(0, len);
	if (parseInt(lastNum, 10) >= 5) {
		//最后一位数字大于5，要进位
		var times = Math.pow(10, len);
		//需要放大的倍数
		var changedInt = Number(result.replace('.', ''));
		//截取后转为整数
		changedInt++;
		//整数进位
		changedInt /= times;
		//整数转为小数，注：有可能还是整数
		result = padNum(changedInt + '');
	}
	return result;
	//对数字末尾加0
	function padNum(num) {
		var dotPos = num.indexOf('.');
		if (dotPos === -1) {
			//整数的情况
			num += '.';
			for (var i = 0; i < len; i++) {
				num += '0';
			}
			return num;
		} else {
			//小数的情况
			var need = len - (num.length - dotPos - 1);
			for (var j = 0; j < need; j++) {
				num += '0';
			}
			return num;
		}
	}

}
/**
 *四舍五入
 * number数量
 * decimalNumber 保留多少位小数,默认0
 */
var _toFixed = function(sourceNumber, decimalNumber) {
	if (sourceNumber == undefined || sourceNumber == null || sourceNumber == '' || sourceNumber == 0) {
		return 0;
	}
	if (decimalNumber == undefined || decimalNumber == null || decimalNumber == '') {
		decimalNumber = 0;
	}
	return sourceNumber.toFixed(decimalNumber);
}
//检查是否是json对象，如果不是就转换成json对象并返回
var checkIsJsonObj = function(data) {
	if ( typeof data == 'object' && data) {
		//如果是json对象,不用做处理
		return data;
	} else {
		//如果是json字符串，则需要处理成json对象
		if (data != undefined && data != null && data != '') {
			var obj = eval('(' + data + ')');
			return obj;
		} else {
			return null;
		}
	}
};

function isArrayFn(value) {
	if ( typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

function isObjectFn(value) {
	if ( typeof value == "object") {
		return true;
	} else {
		return false;
	}
}

/**
 *弹出支付列表
 * @param {Object} payType 类型:0缴纳保证金
 * @param {Object} orderId 工单id
 * @param {Object} payMoney 要支付的金额
 * @param {Object} winName
 * @param {Object} frmName
 * @param {Object} payCallback 支付回调
 */
function showPayDialog(payType, orderId, payMoney, winName, frmName, payCallback) {
	api.openFrame({
		name : 'paydialog_frm',
		url : 'widget://html/tools/paydialog_frm.html',
		bounces : false,
		scrollToTop : false,
		bgColor : 'rgba(0,0,0,0.5)',
		animation : {
			type : 'movein',
			subType : 'from_bottom',
			duration : 300
		},
		pageParam : {
			payType : payType,
			orderId : orderId,
			payMoney : payMoney,
			winName : winName,
			frmName : frmName,
			payCallback : payCallback
		}
	});
}

/**
 *弹出显示信息说明dialog
 * @param {Object} title 标题
 * @param {Object} dialogHeight 高度，100位占满宽度
 * @param {Object} dialogWidth 宽度，100为占满宽度
 */
function showMsgDialog(title, msg, dialogHeight, dialogWidth) {
	api.openFrame({
		name : 'showmsgdialog_frm',
		url : 'widget://html/tools/showmsgdialog_frm.html',
		bounces : false,
		scrollToTop : false,
		bgColor : 'rgba(0,0,0,0.5)',
		animation : {
			type : 'movein',
			subType : 'from_bottom',
			duration : 300
		},
		pageParam : {
			title : title,
			msg : msg,
			height : dialogHeight,
			width : dialogWidth
		}
	});
}

//显示指导图
function showGuideDialog() {
	var appVersion = api.appVersion;
	// 比如： 1.0.0
	var showGuideDialog = $api.getStorage('showGuideDialog');
	//是否显示指导图轮播
	if (showGuideDialog == undefined || showGuideDialog == null || showGuideDialog == '' || showGuideDialog != appVersion) {
		$api.setStorage('showGuideDialog', appVersion);
		//登录密码
		api.openFrame({
			name : 'guidedialog_frm',
			url : 'widget://html/tools/guidedialog_frm.html',
			bounces : false,
			scrollToTop : false,
			//	        bgColor:'rgba(0,0,0,0.5)',
			animation : {
				type : 'movein',
				subType : 'from_right',
				duration : 300
			},
			rect : {
				marginTop : 0, // main页面距离win顶部的高度
				marginBottom : 0, // main页面距离win底部的高度
				w : 'auto' // main页面的宽度 自适应屏幕宽度
			}
		});
	}
}

var softInput;
/**
 *使用模块弹出键盘
 */
function autoFocus(viewKey) {
	// 使用模块弹出键盘
	if (softInput == undefined || softInput == null || softInput == '') {
		softInput = api.require('softInputMgr');
	}
	softInput.toggleKeyboard();
	// 将相应的输入框获取焦点
	document.getElementById(viewKey).focus()
}

/**
 *检测权限
 * @param {Object} permissionNameObj
 * @param {Object} permissionList
 */
function checkAppPermission(permissionNameObj, permissionList) {
	var hasList = api.hasPermission({
		list : permissionList
	});
	var isPass = true;
	for (var index in hasList) {
		if (!hasList || !hasList[index] || !hasList[index].granted) {
			api.confirm({
				title : '提醒',
				msg : '没有获得' + permissionNameObj[hasList[index].name] + "。权限\n是否前往设置？",
				buttons : ['开启', '取消']
			}, function(ret, err) {
				if (ret.buttonIndex == 1) {
					var perList = [];
					perList.push(hasList[index].name)
					api.requestPermission({
						list : perList,
						code : index
					}, function(ret, err) {
						if (ret) {
							api.toast({
								msg : '开启权限成功',
								duration : 2000,
								location : 'middle'
							});
						}
					});
				}
			});
			isPass = false;
			break;
		}
	}
	return isPass;
}

var clipBoard;
/**复制信息*/
var clipBoardCopyMsg = function(msgStr, funCal) {
	if (clipBoard == undefined || clipBoard == null || clipBoard == '') {
		clipBoard = api.require('clipBoard');
	}
	clipBoard.set({
		value : msgStr
	}, function(ret, err) {
		if (ret) {
			if ( typeof funCal === "function") {
				funCal(true);
			}
		} else {
			if ( typeof funCal === "function") {
				funCal(false);
			}
		}
	});
}
var sharebox;
var openSharebox = function(imgPathStart, funCal) {
	if (sharebox == undefined || sharebox == null || sharebox == '') {
		sharebox = new auiSharebox();
	}
	sharebox.init({
		frameBounces : true, //当前页面是否弹动，（主要针对安卓端）
		buttons : [{
			image : imgPathStart + '/icon/share/wx.png',
			text : '微信',
			value : 'session'//可选
		}, {
			image : imgPathStart + '/icon/share/wx_circle.png',
			text : '朋友圈',
			value : 'timeline'
		}, {
			image : imgPathStart + '/icon/share/wx_collect.png',
			text : '微信收藏',
			value : 'favorite'
		}],
		col : 5,
		cancelTitle : '关闭'//可选,当然也可以采用下面的方式使用图标
		// cancelTitle:'<i class="aui-iconfont aui-icon-close aui-font-size-16"></i>'//可选
	}, function(ret) {
		if (ret) {
			if ( typeof funCal === "function") {
				funCal(ret.buttonIndex, ret.buttonValue);
			}
		}
	})
}

/**
 *过滤键盘输入的表情(iOS10.2.1及之前的全部emoji表情，Android的表情因为比较多，如上面的正则有遗漏，可自行补充) 
 */
var filterKeyboardEmoji=function(contentStr){
	var regStr = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
	if(contentStr==undefined || contentStr==null || contentStr==''){
		return '';
	}else{
		if(regStr.test(contentStr)){
			contentStr=contentStr.replace(regStr,"");
 　　			return contentStr;
		}else{
			return contentStr;
		}
	}

}

/**临时使用占用界面*/
var gotoDescribedetail = function(title, action) {
	api.openWin({
		name : 'describedetail_win',
		url : 'widget://html/main/describedetail_win.html',
		pageParam : {
			title : title,
			action : action
		},
		slidBackEnabled : true,
		delay : 300
	});
}

