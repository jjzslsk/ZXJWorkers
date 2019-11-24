///////////////要先引用api.js,packajax.js//////////////////

//定位位置默认值为南宁
var defCurLng=108.372978;//默认当前经度默认值
var defCurLat=22.823815;//当前纬度默认值
var defCurCityCode=261;//当前城市编码默认值
var defCurProvinceName='广西壮族自治区';//当前省份默认值
var defCurCityName='南宁市';//当前城市
var defCurCityNameCo='南宁';//当前城市去除后面的市默认值

//清除定位缓存
function clearLocationStor(){
	$api.rmStorage("curLng");//当前经度
	$api.rmStorage("curLat");//当前纬度
	$api.rmStorage("curCityCode");//当前城市编码
	$api.rmStorage("curProvinceName");//当前省份
	$api.rmStorage("curCityName");//当前城市
	$api.rmStorage("curCityNameCo");//当前城市去除后面的市
	$api.rmStorage("curDistrictName");//当前区域
	$api.rmStorage("curAddress");//当前地址
}
/**
 * 设置当前定位位置到缓存
 * @param {Object} curLng 当前经度
 * @param {Object} curLat 当前纬度
 * @param {Object} curCityCode 当前城市编码
 * @param {Object} curProvinceName 当前省份
 * @param {Object} curCityName 当前城市
 * @param {Object} curDistrictName 当前区域
 * @param {Object} lcRet 定位结果对象
 * @param {Object} successCal 成功回调
 * @param {Object} faultCal 失败回调
 */
function initLocationStor(curLng,curLat,curCityCode,curProvinceName,curCityName,curDistrictName,curAddress,lcRet,successCal,faultCal){
	var oldCityCode = $api.getStorage("curCityCode");
	var oldCityNameCo = $api.getStorage("curCityNameCo");
	var curCityNameCo = cutOutCityName(curCityName);
	if(oldCityCode==undefined || oldCityCode==null || oldCityCode==''){
		clearLocationStor();
		$api.setStorage("curLng", curLng);//当前经度
		$api.setStorage("curLat", curLat);//当前纬度
		$api.setStorage("curCityCode", curCityCode);//当前选择的城市编码
		$api.setStorage("curProvinceName", curProvinceName);//当前选择的省份
		$api.setStorage("curCityName", curCityName);//当前选择的城市
		$api.setStorage("curCityNameCo", curCityNameCo);//当前选择的城市去除后面的市
		$api.setStorage("curDistrictName", curDistrictName);//当前选择的区域
		$api.setStorage("curAddress", curAddress);//当前地址
		successCal(lcRet);
		return;
	}
	if(curCityCode==oldCityCode){
		$api.setStorage("curLng", curLng);//当前经度
		$api.setStorage("curLat", curLat);//当前纬度
		$api.setStorage("curAddress", curAddress);//当前地址
		successCal(lcRet);
		return;
	} 
	api.confirm({
	    title: '定位到您在'+curCityNameCo,
	    msg: '是否切换至该城市进行探索？',
	    buttons: ['切换', '取消']
	}, function(ret, err) {
	    var index = ret.buttonIndex;
	    if(index==1){
	    	//切换
	    	clearLocationStor();
			$api.setStorage("curLng", curLng);//当前经度
			$api.setStorage("curLat", curLat);//当前纬度
			$api.setStorage("curCityCode", curCityCode);//当前选择的城市编码
			$api.setStorage("curProvinceName", curProvinceName);//当前选择的省份
			$api.setStorage("curCityName", curCityName);//当前选择的城市
			$api.setStorage("curCityNameCo", curCityNameCo);//当前选择的城市去除后面的市
			$api.setStorage("curDistrictName", curDistrictName);//当前选择的区域
			$api.setStorage("curAddress", curAddress);//当前地址
			successCal(lcRet);
	    }else{
	    	faultCal(2,'取消切换');
	    }
	});
}

/**
 *手动选择当前城市，只更新城市编码和城市名称 
 * @param {Object} curCityCode
 * @param {Object} curCityName
 */
function chooseCurLocationStor(curCityCode,curCityName){
	$api.setStorage("curCityCode", curCityCode);//当前选择的城市编码
	$api.setStorage("curCityName", curCityName);//当前选择的城市
	$api.setStorage("curCityNameCo", cutOutCityName(curCityName));//当前选择的城市去除后面的市
}
//检测权限
function checkLocPer(){
	var permissionNameObj={location:'获取位置权限,您位置信息用于筛选过滤当前城市数据以及地图显示',locationAlways:'获取位置信息,用于筛选过滤当前城市数据以及地图显示'};
	var permissionList=['location','locationAlways'];
	return checkAppPermission(permissionNameObj,permissionList);
}
var bMap;
function startLocation(successCal,faultCal){
	if(bMap==undefined || bMap==null || bMap==''){
		var bMap = api.require('bMap');
	}
	bMap.getLocation({
	    accuracy: '100m',//（可选项）定位精度。默认值：'100m'取值范围：10m、100m、1km、3km
	    autoStop: true,//（可选项）获取到位置信息后是否自动停止定位。 默认值：true
	    filter: 1//（可选项）位置更新所需的最小距离（单位米），autoStop 为 true 时，此参数有效。 默认值：1.0
	}, function(ret, err) {
	    if (ret.status) {
	        var param ='&location='+ret.lat+','+ret.lon;
	        _postDataMap(param,
		        function(lcRet){
	        		var curLng = lcRet.result.location.lng;//当前经度
	        		var curLat = lcRet.result.location.lat;//当前纬度
	        		var curCityCode = lcRet.result.cityCode;//当前城市编码
	        		var curProvinceName = lcRet.result.addressComponent.province;//当前省份
	        		var curCityName = lcRet.result.addressComponent.city;//当前城市
	        		var curDistrictName = lcRet.result.addressComponent.district;//当前区域
	        		var curAddress= lcRet.result.formatted_address;//当前地址
	        		initLocationStor(curLng,curLat,curCityCode,curProvinceName,curCityName,curDistrictName,curAddress,lcRet,successCal,faultCal);
//		        	successCal(lcRet);
		        },
		        function(lcErr){
//	        		api.toast({msg: '定位失败('+ret.status+')', duration: 1000,location: 'bottom'});
	        		faultCal(1,lcErr);
		        }
	        );
	    } else {
//			api.toast({msg: '定位失败', duration: 1000,location: 'bottom'});
	    	faultCal(0,err);
	    }
	});
}