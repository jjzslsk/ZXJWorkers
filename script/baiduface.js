///////////////////使用钱先引用api.js,aui_dialog.js///////////////////////////
var baiduFaceUrl = "https://aip.baidubce.com";

//判断日期，时间大小  
var compareTimeFace = function(startDate, endDate) {   
	if (startDate.length > 0 && endDate.length > 0) {   
	    var startDateTemp = startDate.split(" ");  
	    var endDateTemp = endDate.split(" ");  
	    
	    var arrStartDate = startDateTemp[0].split("-");   
	    var arrEndDate = endDateTemp[0].split("-");   
	
	    var arrStartTime = startDateTemp[1].split(":");   
	    var arrEndTime = endDateTemp[1].split(":"); 
	    if(arrStartTime.length<3) {
	    	arrStartTime.push('00')
	    }  
	    if(arrEndTime.length<3) {
	    	arrEndTime.push('00')
	    }    
	
		var allStartDate = new Date(arrStartDate[0], arrStartDate[1], arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);   
		var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);   
	
		if (allStartDate.getTime() > allEndDate.getTime()) {   
	        //startTime不能endTime
	        return false;   
		} else {   
		    //startTime小于等于endTime，所以通过了  
		    return true;   
        }   
	} 
	else {   
	    //时间不能为空  
	    return false;   
  	}   
}   

///////////////////////////////百度人脸识别start///////////////////////////////
/**百度人脸识别通用及业务错误码*/
var publicErrHintBaiduFace = function(errCode) {
	var errJson = {
		'222001' : '必要参数未传入',
		'222002' : '参数格式错误',
		'222003' : '参数格式错误',
		'222004' : '参数格式错误',
		'222005' : '参数格式错误',
		'222006' : '参数格式错误',
		'222007' : '参数格式错误',
		'222008' : '参数格式错误',
		'222009' : '参数格式错误',
		'222010' : '参数格式错误',
		'222011' : '参数格式错误',
		'222012' : '参数格式错误',
		'222013' : '参数格式错误',
		'222014' : '参数格式错误',
		'222015' : '参数格式错误',
		'222016' : '参数格式错误',
		'222017' : '参数格式错误',
		'222018' : '参数格式错误',
		'222019' : '参数格式错误',
		'222020' : '参数格式错误',
		'222021' : '参数格式错误',
		'222022' : '参数格式错误',
		'222023' : '参数格式错误',
		'222024' : '参数格式错误',
		'222025' : '参数格式错误',
		'222026' : '参数格式错误',
		'222027' : '验证码长度错误(最小值大于最大值)',
		'222200' : '该接口需使用application/json的格式进行请求,请修改接口格式为：application/json',
		'222201' : '服务端请求失败,重新尝试',
		'222202' : '图片中没有人脸(检查图片质量)',
		'222203' : '无法解析人脸(检查图片质量)',
		'222204' : '从图片的url下载图片失败,请确认url可公网访问',
		'222205' : '服务端请求失败,重新尝试',
		'222206' : '服务端请求失败,重新尝试',
		'222207' : '未找到匹配的用户,请确认人脸库中是否存在此用户',
		'222208' : '图片的数量错误,多张图片请使用son格式传输',
		'222209' : 'face token不存在,请确认您操作的人脸已创建成功',
		'222210' : '人脸库中用户下的人脸数目超过限制,当前每个用户下限制人脸数目最大20张',
		'222300' : '人脸图片添加失败,重新尝试',
		'222301' : '获取人脸图片失败,请重新尝试',
		'222302' : '服务端请求失败,重新尝试',
		'222303' : '获取人脸图片失败,请重新尝试',
		'223100' : '操作的用户组不存在,请确认您操作的用户组已创建成功',
		'223101' : '该用户组已存在,请不要重复创建用户组',
		'223102' : '该用户已存在,请不要重复创建用户',
		'223103' : '找不到该用户,请确认您操作的用户已创建成功',
		'223104' : 'group_list包含组数量过多',
		'223105' : '该人脸已存在,请不要重复添加人脸',
		'223106' : '该人脸不存在,请确认您操作的人脸已创建成功',
		'223110' : 'uid_list包含数量过多',
		'223111' : '目标用户组不存在',
		'223112' : 'quality_conf格式不正确',
		'223113' : '人脸有被遮挡',
		'223114' : '人脸模糊',
		'223115' : '人脸光照不好',
		'223116' : '人脸不完整',
		'223117' : 'app_list包含app数量过多',
		'223118' : '质量控制项错误',
		'223119' : '活体控制项错误',
		'223120' : '活体检测未通过',
		'223121' : '质量检测未通过 左眼遮挡程度过高',
		'223122' : '质量检测未通过 右眼遮挡程度过高',
		'223123' : '质量检测未通过 左脸遮挡程度过高',
		'223124' : '质量检测未通过 右脸遮挡程度过高',
		'223125' : '质量检测未通过 下巴遮挡程度过高',
		'223126' : '质量检测未通过 鼻子遮挡程度过高',
		'223127' : '质量检测未通过 嘴巴遮挡程度过高',
		'222901' : '参数校验初始化失败',
		'222902' : '参数校验初始化失败',
		'222903' : '参数校验初始化失败',
		'222904' : '参数校验初始化失败',
		'222905' : '接口初始化失败',
		'222906' : '接口初始化失败',
		'222907' : '缓存处理失败',
		'222908' : '缓存处理失败',
		'222909' : '缓存处理失败',
		'222910' : '数据存储处理失败',
		'222911' : '数据存储处理失败',
		'222912' : '数据存储处理失败',
		'222913' : '接口初始化失败',
		'222914' : '接口初始化失败',
		'222915' : '后端服务连接失败',
		'222916' : '后端服务连接失败,请重新尝试',
		'222304' : '图片尺寸太大,请确保图片尺寸在1920x1080以下下',
		'223128' : '正在清理该用户组的数据	请等该用户组清理完毕后再对该组进行操作',
		'222361' : '公安服务连接失败,请重新尝试',
		'222046' : '参数格式错误',
		'222101' : '参数格式错误',
		'222102' : '参数格式错误',
		'222307' : '图片非法 鉴黄未通过,请重新上传合法的图片',
		'222308' : '图片非法 含有政治敏感人物,请重新上传合法的图片',
		'222211' : '人脸融合失败 模板图质量不合格,请检查模板图是否符合人脸融合文档中的质量要求',
		'222212' : '人脸融合失败,请更换素材后重新尝试',
		'223129' : '人脸未面向正前方（人脸的角度信息大于30度）'
	};
	return errJson[errCode];
}

var baiduFaceLive;
/**打开人脸识别界面*/
var openFaceDetectView = function(funCal) {
	if (baiduFaceLive == undefined || baiduFaceLive == null || baiduFaceLive == '') {
		baiduFaceLive = api.require('baiduFaceLive');
	}
	baiduFaceLive.openFaceDetectView({
			rect:{
			    w:'auto',
			    marginLeft:0,
			    marginTop:0,
			    marginBottom:0,
			    marginRight:0
			}
		},function(ret, err) {
			if (ret.evenType == 'success') {
				//由于base64数据量大，请不要用JSON.stringify(ret)调试
				//关闭人脸识别界面
				if ( typeof funCal === "function") {
					funCal(ret.data);
				}
			} else {
				api.toast({
					msg : ret.message
				});
				if (ret.message == '验证失败' || ret.message == '检测超时') {
					closeFaceDetectView();
				}
			}
		}
	);
};

/**识别结果处理后继续人脸识别(识别界面未关闭时调用)*/
var continueFaceDetect = function() {
	if (baiduFaceLive == undefined || baiduFaceLive == null || baiduFaceLive == '') {
		return;
	}
	baiduFaceLive.continueFaceDetect(function(ret, err) {
	});
};

//关闭人脸识别界面
var closeFaceDetectView = function() {
	if (baiduFaceLive == undefined || baiduFaceLive == null || baiduFaceLive == '') {
		return;
	}
	baiduFaceLive.closeFaceDetectView(function(ret, err) {
	});
}
//请求数据
var _postBaiduFaceData = function(actionUrl, accessToken, param, funRecall, errFunRecall) {
	var url = baiduFaceUrl + actionUrl + "?access_token=" + accessToken;
	api.ajax({
		url : url,
		method : 'post',
		encode : true,
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType : 'json',
		headers : {
			'Content-Type' : 'application/json'
		},
		data : {
			body : param
		},
	}, function(ret, err) {
		if (ret) {
			funRecall(ret);
		} else {
			api.hideProgress();
			errFunRecall(err);
			var title = '网络请求状态码(' + err.statusCode + ')';
			var msg = err.msg + '(' + err.code + ')'
			showSingleAuiDialog(title, msg);
		}
	});

}
/**获取获取Baidu人脸识别face的AccessToken*/
var getBaiDuFaceAccessToken = function(funCal) {
	var param = {};
	param.grant_type = 'client_credentials';
	param.client_id = '6em5rbx6eS3wgPvHR15bLi0E';
	//API Key
	param.client_secret = 'Ky8sKZWNfPP8dbZ4oAnIZKbPkdQbysjY';
	//Secret Key

	var url = baiduFaceUrl + '/oauth/2.0/token';
	api.ajax({
		url : url,
		method : 'post',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType : 'json',
		data : {
			values : param
		},
	}, function(ret, err) {
		if (ret) {
			funCal(ret.access_token);
		} else {
			api.hideProgress();
			var title = '网络请求状态码(' + err.statusCode + ')';
			var msg = err.msg + '(' + err.code + ')'
			showSingleAuiDialog(title, msg);
		}
	});
};

/**
 *人脸检测
 * @param {Object} param
 * @idCardNumber {Object} param 身份证号码
 * @name {Object} param 姓名（注：需要进行utf8编码）
 * @checkFunCal {Object} param 验证回调结果
 */
var faceDetection = function(base64Img, idCardNumber, name, checkFunCal) {
	getBaiDuFaceAccessToken(function(accessToken) {
		var param = {};
		param.image = base64Img;
		param.image_type = 'BASE64';
		param.face_field = 'age,gender,glasses,quality,eye_status';
		_postBaiduFaceData('/rest/2.0/face/v3/detect', accessToken, param, function(ret) {
			if (ret.error_code == 0) {
				var faceObj = ret.result.face_list[0];
				var quality = faceObj.quality;

				var occlusion = quality.occlusion;
				//遮挡范围(取值范围[0~1]，0为无遮挡，1是完全遮挡)
				var leftEye = occlusion.left_eye;
				//左眼被遮挡的阈值(推荐数值界限:0.6)
				var rightEye = occlusion.right_eye;
				//右眼被遮挡的阈值(推荐数值界限:0.6)
				var nose = occlusion.nose;
				//鼻子被遮挡的阈值(推荐数值界限:0.7)
				var mouth = occlusion.mouth;
				//嘴巴被遮挡的阈值(推荐数值界限:0.7)
				var leftCheek = occlusion.left_cheek;
				//左脸颊被遮挡的阈值(推荐数值界限:0.8)
				var rightCheek = occlusion.right_cheek;
				//右脸颊被遮挡的阈值(推荐数值界限:0.8)
				var chinContour = occlusion.chin_contour;
				//下巴被遮挡阈值(推荐数值界限:0.6)

				var blur = quality.blur;
				//取值范围[0~1]，0是最清晰，1是最模糊(推荐数值界限:小于0.7)
				var illumination = quality.illumination;
				//取值范围[0~255]脸部光照的灰度值，0表示光照不好以及对应客户端SDK中，YUV的Y分量。(推荐数值界限:大于40)
				var completeness = quality.completeness;
				//人脸完整度，0或1, 0为人脸溢出图像边界，1为人脸都在图像边界内

				var angle = faceObj.angle;
				//角度(推荐数值界限:分别小于20度)
				var yaw = angle.yaw;
				//三维旋转之左右旋转角[-90(左), 90(右)]
				var pitch = angle.pitch;
				//三维旋转之俯仰角度[-90(上), 90(下)]
				var roll = angle.roll;
				//平面内旋转角[-180(逆时针), 180(顺时针)]

				if (leftEye > 0.6) {
					api.toast({
						msg : '左眼被遮挡',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else if (rightEye > 0.6) {
					api.toast({
						msg : '右眼被遮挡',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else if (nose > 0.7) {
					api.toast({
						msg : '鼻子被遮挡',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else if (mouth > 0.7) {
					api.toast({
						msg : '嘴巴被遮挡',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else if (leftCheek > 0.8) {
					api.toast({
						msg : '左脸颊被遮挡',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else if (rightCheek > 0.8) {
					api.toast({
						msg : '右脸颊被遮挡',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else if (chinContour > 0.6) {
					api.toast({
						msg : '下巴被遮挡',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();

				} else if (blur > 0.7) {
					api.toast({
						msg : '过于模糊',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();

				} else if (illumination < 40) {
					api.toast({
						msg : '脸部光照太暗',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else if (completeness == 0) {
					api.toast({
						msg : '人脸溢出图像边界',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else if (yaw > 20 || yaw < -20) {
					if (yaw > 20) {
						api.toast({
							msg : '右摇头角度过大',
							duration : 2000,
							location : 'middle'
						});
					} else {
						api.toast({
							msg : '左摇头角度过大',
							duration : 2000,
							location : 'middle'
						});
					}
					api.hideProgress();
				} else if (pitch > 20 || pitch < -20) {
					if (pitch > 20) {
						api.toast({
							msg : '低头角度过大',
							duration : 2000,
							location : 'middle'
						});
					} else {
						api.toast({
							msg : '抬头角度过大',
							duration : 2000,
							location : 'middle'
						});
					}
				} else if (roll > 20 || roll < -20) {
					if (roll > 20) {
						api.toast({
							msg : '左摆头角度过大',
							duration : 2000,
							location : 'middle'
						});
					} else {
						api.toast({
							msg : '右摆头角度过大',
							duration : 2000,
							location : 'middle'
						});
					}
					api.hideProgress();
				} else {
					//通过验证
					//进行活体检测
					faceVerify(accessToken, base64Img, idCardNumber, name, checkFunCal);
				}
			} else {
				api.hideProgress();
				showSingleAuiDialog('人脸检测错误提示', ret.error_msg + '(' + ret.error_code + ')');
			}
		}, function(err) {
			api.hideProgress();
		});

	});
}
/**
 *活体检测
 * @param {Object} accessToken
 * @param {Object} base64Img
 * @idCardNumber {Object} param 身份证号码
 * @name {Object} param 姓名（注：需要进行utf8编码）
 * @checkFunCal {Object} param 验证回调结果
 */
var faceVerify = function(accessToken, base64Img, idCardNumber, name, checkFunCal) {
	var param = {};
	param.image = base64Img;
	param.image_type = 'BASE64';
	//	param.face_field = 'quality';

	var url = baiduFaceUrl + "/rest/2.0/face/v3/faceverify?access_token=" + accessToken;
	api.ajax({
		url : url,
		method : 'post',
		encode : true,
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType : 'json',
		headers : {
			'Content-Type' : 'application/json'
		},
		data : {
			body : "[" + JSON.stringify(param) + "]"//跟数据格式跟官方说的不一样，不要问我问什么，我也是被官方坑过来的
		},
	}, function(ret, err) {
		if (ret) {
			if (ret.error_code == 0) {
				var faceObj = ret.result.face_list[0];
				var faceProbability = faceObj.face_probability;
				//double	人脸置信度，范围【0~1】，代表这是一张人脸的概率，0最小、1最大。
				if (faceProbability < 0.8) {
					api.toast({
						msg : '活体检测该物体为人脸的概率过低',
						duration : 2000,
						location : 'middle'
					});
					api.hideProgress();
				} else {
					//通过活体检测
					//进行公安系统身份验证
					faceIdentityVerify(accessToken, base64Img, idCardNumber, name, checkFunCal);
				}

			} else {
				api.hideProgress();
				showSingleAuiDialog('活体检测错误提示', ret.error_msg + '(' + ret.error_code + ')');
			}
		} else {
			api.hideProgress();
			var title = '网络请求状态码(' + err.statusCode + ')';
			var msg = err.msg + '(' + err.code + ')'
			showSingleAuiDialog(title,msg);
		}
	});

}
/**
 *身份验证
 * @param {Object} accessToken
 * @param {Object} base64Img 图片
 * @param {Object} idCardNumber 身份证号码
 * @param {Object} name 姓名
 * @param {Object} checkFunCal 验证回调结果
 */
var faceIdentityVerify = function(accessToken, base64Img, idCardNumber, name, checkFunCal) {
	var param = {};
	param.image = base64Img;
	//（必填）
	param.image_type = 'BASE64';
	//（必填）
	param.id_card_number = idCardNumber;
	//身份证号码（必填）
	param.name = name;
	//姓名（注：需要进行utf8编码）（必填）
	//	param.quality_control='NONE';//图片质量控制(NONE: 不进行控制;LOW:较低的质量要求;NORMAL: 一般的质量要求;HIGH: 较高的质量要求;默认NONE)（非必填）
	//	param.liveness_control='NONE';//活体检测控制(NONE: 不进行控制;LOW:较低的活体要求(高通过率 低攻击拒绝率);NORMAL: 一般的活体要求(平衡的攻击拒绝率, 通过率);HIGH: 较高的活体要求(高攻击拒绝率 低通过率);默认NONE)（非必填）
	var url = baiduFaceUrl + "/rest/2.0/face/v3/person/verify?access_token=" + accessToken;

	api.ajax({
		url : url,
		method : 'post',
		encode : true,
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType : 'json',
		headers : {
			'Content-Type' : 'application/json'
		},
		data : {
			values : param
		},
	}, function(ret, err) {
		if (ret) {
			var isPass = false;
			if (ret.error_code == 0) {
				//验证成功
				var score = ret.result.score;
				//float 与公安小图相似度可能性，用于验证生活照与公安小图是否为同一人，有正常分数时为[0~100]，推荐阈值80，超过即判断为同一人
				if (score < 80) {
					api.hideProgress();
					isPass = false;
					showSingleAuiDialog('公安验证结果', '身份证号与扫描的人脸不是同一个人');
				} else {
					//身份验证，身份证号与扫描的人脸是同一个人
					isPass = true;
				}
			} else if (ret.error_code == 222350) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '公安网图片不存在或质量过低(' + ret.error_code + ')')
			} else if (ret.error_code == 222351) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '身份证号与姓名不匹配或该身份证号不存在(' + ret.error_code + ')')
			} else if (ret.error_code == 222352) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '身份证名字格式错误(' + ret.error_code + ')')
			} else if (ret.error_code == 222353) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '身份证号码格式错误(' + ret.error_code + ')')
			} else if (ret.error_code == 222354) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '公安库里不存在此身份证号(' + ret.error_code + ')')
			} else if (ret.error_code == 222355) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '身份证号码正确，公安库里没有对应的照片(' + ret.error_code + ')')
			} else if (ret.error_code == 222356) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '验证的人脸图片质量不符合要求(' + ret.error_code + ')')
			} else if (ret.error_code == 222360) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '身份证号码或名字非法（公安网校验不通过）(' + ret.error_code + ')')
			} else if (ret.error_code == 222361) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '公安服务连接失败(' + ret.error_code + ')')
			} else if (ret.error_code == 216600) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('验证失败', '输入身份证格式错误(' + ret.error_code + ')')
			} else if (ret.error_code == 216601) {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', '身份证号和名字匹配失败(' + ret.error_code + ')')
			} else {
				api.hideProgress();
				isPass = false;
				showSingleAuiDialog('公安验证失败', publicErrHintBaiduFace(ret.error_code) + '(' + ret.error_code + ')')
			}

			if (checkFunCal != undefined && typeof checkFunCal === "function") {
				checkFunCal(isPass);
			}
		} else {
			api.hideProgress();
			var title = '网络请求状态码(' + err.statusCode + ')';
			var msg = err.msg + '(' + err.code + ')'
			showSingleAuiDialog(title,msg);
			if (checkFunCal != undefined && typeof checkFunCal === "function") {
				checkFunCal(false);
			}
		}
	});

}
///////////////////////////////百度人脸识别end///////////////////////////////

///////////////////////////////百度文字识别start///////////////////////////////

/**百度文字识别通用错误码提示语*/
var publicErrHintBaiduTextDiscern=function(errCode){
	var errMsgJson={
		'1':'服务器内部错误，请再次请求',
		'2':'服务暂不可用，请再次请求',
		'3':'调用的API不存在，请检查后重新尝试',
		'4':'集群超限额',
		'6':'无权限访问该用户数据',
		'14':'IAM鉴权失败',
		'17':'每天请求量超限额',
		'18':'QPS超限额',
		'19':'请求总量超限额',
		'100':'无效的access_token参数，请检查后重新尝试',
		'110':'access_token无效',
		'111':'access token过期',
		'282000':'服务器内部错误',
		'216100':'请求中包含非法参数，请检查后重新尝试',
		'216101':'缺少必须的参数，请检查参数是否有遗漏',
		'216102':'请求了不支持的服务，请检查调用的url',
		'216103':'请求中某些参数过长，请检查后重新尝试',
		'216110':'appid不存在，请重新核对信息是否为后台应用列表中的appid',
		'216200':'图片为空，请检查后重新尝试',
		'216201':'上传的图片格式错误，现阶段我们支持的图片格式为：PNG、JPG、JPEG、BMP',
		'216202':'上传的图片大小错误',
		'216630':'识别错误，请再次请求',
		'216631':'识别银行卡错误，出现此问题的原因一般为：您上传的图片非银行卡正面，上传了异形卡的图片或上传的银行卡正品图片不完整',
		'216633':'识别身份证错误，出现此问题的原因一般为：您上传了非身份证图片或您上传的身份证图片不完整',
		'216634':'检测错误，请再次请求',
		'272000':'未进行分类，未能匹配模板',
		'272001':'未能成功分类',
		'272002':'分类成功，但未能匹配模板。',
		'282003':'请求参数缺失',
		'282004':'您指定的模板暂未发布，请先保存发布该模板，再调用',
		'282005':'处理批量任务时发生部分或全部错误',
		'282006':'批量任务处理数量超出限制，请将任务数量减少到10或10以下',
		'282102':'未检测到图片中识别目标，请确保图片中包含对应卡证票据',
		'282103':'图片目标识别错误，请确保图片中包含对应卡证票据',
		'282110':'URL参数不存在，请核对URL后再次提交',
		'282111':'URL格式非法，请检查url格式是否符合相应接口的入参要求',
		'282112':'url下载超时',
		'282113	':'URL返回无效参数',
		'282114':'URL长度超过1024字节或为0',
		'282808':'request id xxxxx 不存在',
		'282809':'返回结果请求错误（不属于excel或json',
		'282810':'图像识别错误'
	};
	return errMsgJson[errCode];
}

/**
 *比较识别的身份证上面的姓名和身份证号 跟填写的是否一致
 * @param {Object} idCardImgName 识别出身份证图片上的姓名
 * @param {Object} idCardImgNum 识别出身份证图片上的身份证号
 * @param {Object} userName 填写的姓名
 * @param {Object} idCardNum 填写的身份证号码 
 */
var checkIdCardNameCardNum=function(idCardImgName,idCardImgNum,userName,idCardNum){
	if(userName==idCardImgName){
		if(idCardNum==idCardImgNum){
			return true;
		} else{
			showSingleAuiDialog('识别身份证异常','检测身份证图片的身份证证号跟填写的不一致');
			return false;
		}
	}else{
		showSingleAuiDialog('识别身份证异常','检测身份证图片的身份证姓名跟填写的不一致');
		return false;
	}
}

/**
 *检测身份证是否过期 
 */
var checkIdCardPv=function(startDate,endDate,curDate){
//	getCurrentDate('yyyy-MM-dd');
	startDate=startDate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")+' 00:00:00';
	endDate=endDate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")+' 00:00:00';
	if(!compareTimeFace(startDate,curDate) || !compareTimeFace(curDate,endDate)){
		showSingleAuiDialog('验证身份证异常', '身份证不在有效期内');
		return false;
	} else{
		return true;
	}
}

/**
 *文字识别-身份证识别 
 * @param {Object} accessToken 
 * @param {Object} base64ImgPt 身份证正面图片
 * @param {Object} base64ImgRe 身份证反面图片
 * @param {Object} userName 填写的用户姓名
 * @param {Object} idCardNum 填写的用户身份账号
 * @param {Object} isPositive 是否是正面，true是，false否
 * @param {Object} curDate 当前时间
 * @param {Object} funCal 回调结果是否通过
 */
var startCheckIdCardImg=function(accessToken,base64ImgPt,base64ImgRe,userName,idCardNum,isPositive,curDate,funCal){
	var param={};
	param.image=isPositive ? base64ImgPt:base64ImgRe;//图像数据，base64编码后进行urlencode，要求base64编码和urlencode后大小不超过4M，最短边至少15px，最长边最大4096px,支持jpg/jpeg/png/bmp格式
	param.id_card_side=isPositive ? 'front':'back';//front：身份证含照片的一面；back：身份证带国徽的一面
	param.detect_direction=true;//是否检测图像旋转角度，默认检测，即：true。朝向是指输入图像是正常方向、逆时针旋转90/180/270度。可选值包括:true：检测旋转角度并矫正识别；false：不检测旋转角度，针对摆放情况不可控制的情况建议本参数置为tru
	param.detect_risk=true;//是否开启身份证风险类型(身份证复印件、临时身份证、身份证翻拍、修改过的身份证)功能，默认不开启，即：false。可选值:true-开启；false-不开启
	var url = baiduFaceUrl + '/rest/2.0/ocr/v1/idcard?access_token=' + accessToken;
	api.ajax({
		url : url,
		method : 'post',
		returnAll : false, //（可选项）是否需要返回所有 response 信息（包括响应头、消息体、状态码），为 true 时，返回的头信息获取方法(ret.headers)，消息体信息获取方法(ret.body)，状态码获取方法(ret.statusCode)
		dataType : 'json',
		data : {
			values : param
		},
	}, function(ret, err) {
		if (ret) {
			if (ret.error_code!=undefined && ret.error_code!=null && ret.error_code!='' && ret.error_code!=0) {
				//识别异常
				api.hideProgress();
				showSingleAuiDialog('识别身份证失败(' + ret.error_code + ')', publicErrHintBaiduTextDiscern(ret.error_code));
			} else{
				
				var imageStatus=ret.image_status;//String normal-识别正常;reversed_side-身份证正反面颠倒;non_idcard-上传的图片中不包含身份证;blurred-身份证模糊;other_type_card-其他类型证照;over_exposure-身份证关键字段反光或过曝;over_dark-身份证欠曝（亮度过低）;unknown-未知状态
				var riskType=ret.risk_type==undefined ? null:ret.risk_type;//String 输入参数 detect_risk = true 时，则返回该字段识别身份证类型: normal-正常身份证；copy-复印件；temporary-临时身份证；screen-翻拍；unknown-其他未知情况
				var editTool=ret.edit_tool==undefined ? null:ret.edit_tool;//如果参数 detect_risk = true 时，则返回此字段。如果检测身份证被编辑过，该字段指定编辑软件名称，如:Adobe Photoshop CC 2014 (Macintosh),如果没有被编辑过则返回值无此参数
				
				var wordsResult=ret.words_result;//定位和识别结果
				
				var idCardNumber,idCardName,issueDate,expiryDate;
				if(isPositive){
					//身份证正面信息
					idCardNumber = wordsResult["公民身份号码"].words;//获取到身份证上面的身份证号码
					idCardName = wordsResult["姓名"].words;//获取到身份证上面的身份证姓名
				} else{
					//身份证反面信息
					issueDate = wordsResult["签发日期"].words;//获取到身份证上面的签发日期
					expiryDate = wordsResult["失效日期"].words;//获取到身份证上面的签发日期
				}
				
				if(imageStatus=='normal'){
					//imageStatus识别正常
					if(riskType!=null){
						if(riskType=='normal'){
							//riskType验证正常
							if(editTool!=null){
								api.hideProgress();
								showSingleAuiDialog('识别身份证异常','检测身份证被编辑过,编辑软件名称:'+editTool);
							} else{
								//识别全部通过
								if(isPositive){
									//身份证正面验证结果
									//验证识别的信息跟填写的是否一样
									if(checkIdCardNameCardNum(idCardName,idCardNumber,userName,idCardNum)){
										//识别身份证正面的信息跟填写的信息一样，通过
										//开始识别身份证反面
										startCheckIdCardImg(accessToken,base64ImgPt,base64ImgRe,userName,idCardNum,false,curDate,funCal);
									} else{
										//识别的身份证正面信息跟填写的信息不一样
										api.hideProgress();
									}
								} else{
//									api.hideProgress();
									//身份证反面验证结果,执行回调反馈信息
									if (funCal != undefined && typeof funCal === "function") {
										funCal(checkIdCardPv(issueDate,expiryDate,curDate));
									}
								}
							}
						}
						else if(riskType=='copy'){
							api.hideProgress();
							showSingleAuiDialog('识别身份证异常(' + riskType + ')','检测到该身份证件是复印件');
						}
						else if(riskType=='temporary'){
							api.hideProgress();
							showSingleAuiDialog('识别身份证异常(' + riskType + ')','检测到该身份证件是临时身份证');
						}
						else if(riskType=='screen'){
							api.hideProgress();
							showSingleAuiDialog('识别身份证异常(' + riskType + ')','检测到该身份证件是翻拍的');
						}
						else if(riskType=='unknown'){
							api.hideProgress();
							showSingleAuiDialog('识别身份证异常(' + riskType + ')','其他未知情况');
						}
						else{
							api.hideProgress();
							showSingleAuiDialog('识别身份证异常(' + riskType + ')','其他未知情况');
						}
					}else{
						if(editTool!=null){
							api.hideProgress();
							showSingleAuiDialog('识别身份证异常','检测身份证被编辑过,编辑软件名称:'+editTool);
						} else{
							//识别全部通过
							if(isPositive){
								//身份证正面验证结果
								//验证识别的信息跟填写的是否一样
								if(checkIdCardNameCardNum(idCardName,idCardNumber,userName,idCardNum)){
									//识别身份证正面的信息跟填写的信息一样，通过
									//开始识别身份证反面
									startCheckIdCardImg(accessToken,base64ImgPt,base64ImgRe,userName,idCardNum,false,curDate,funCal);
								} else{
									//识别的身份证正面信息跟填写的信息不一样
									api.hideProgress();
								}
							} else{
//								api.hideProgress();
								//身份证反面验证结果,执行回调反馈信息
								if (funCal != undefined && typeof funCal === "function") {
									funCal(checkIdCardPv(issueDate,expiryDate,curDate));
								}
							}
						}
					}
				}
				else if(imageStatus=='reversed_side'){
					api.hideProgress();
					showSingleAuiDialog('识别身份证异常(' + imageStatus + ')','身份证正反面颠倒');
				}
				else if(imageStatus=='non_idcard'){
					api.hideProgress();
					showSingleAuiDialog('识别身份证异常(' + imageStatus + ')','上传的图片中不包含身份证');
				}
				else if(imageStatus=='blurred'){
					api.hideProgress();
					showSingleAuiDialog('识别身份证异常(' + imageStatus + ')','身份证模糊');
				}
				else if(imageStatus=='other_type_card'){
					api.hideProgress();
					showSingleAuiDialog('识别身份证异常(' + imageStatus + ')','其他类型证照');
				}
				else if(imageStatus=='over_exposure'){
					api.hideProgress();
					showSingleAuiDialog('识别身份证异常(' + imageStatus + ')','身份证关键字段反光或过曝');
				}
				else if(imageStatus=='over_dark'){
					api.hideProgress();
					showSingleAuiDialog('识别身份证异常(' + imageStatus + ')','身份证欠曝（亮度过低）');
				}
				else if(imageStatus=='unknown'){
					api.hideProgress();
					showSingleAuiDialog('识别身份证异常(' + imageStatus + ')','未知状态' );
				} else{
					api.hideProgress();
					showSingleAuiDialog('识别身份证异常(' + imageStatus + ')','未知状态' );
				}
				
			}
		} else {
			api.hideProgress();
			var title = '网络请求状态码(' + err.statusCode + ')';
			var msg = err.msg + '(' + err.code + ')'
			showSingleAuiDialog(title,msg);
		}
	});
}

/**
 *身份证识别
 * @param {Object} base64ImgPt 身份证正面图片
 * @param {Object} base64ImgRe 身份证反面图片
 * @param {Object} userName
 * @param {Object} idCardNum
 * @param {Object} curDate 当前时间
 * @param {Object} funCal 回调结果是否通过
 * @param {Object} funCal
 */
var checkIdCardImg=function(base64ImgPt,base64ImgRe,userName,idCardNum,curDate,funCal){
	getBaiDuFaceAccessToken(function(accessToken) {
		startCheckIdCardImg(accessToken,base64ImgPt,base64ImgRe,userName,idCardNum,true,curDate,funCal);
	});
}


///////////////////////////////百度文字识别end///////////////////////////////




