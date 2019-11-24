////////////////先引用pickermin.js///////////////
var picker;
var calFunPacker;
function initPicker(cityObj){
	var firstPicker = [];
	/* 省，直辖市 */
	var secondPicker = [];
	/* 市 */
	var thirdPicker = [];
	/* 镇 */
	var selectedIndex = [0, 0, 0];
	/* 默认选中的地区 */
	var checkedPicker = [0, 0, 0];
	/* 已选选项 */
	function creatList(obj, list) {
		obj.forEach(function(item, index, arr) {
			var temp = new Object();
			temp.id = item.id;
			temp.text = item.name;
			temp.code = item.code;
			temp.value = index;
			list.push(temp);
		})
	}

//	if (picker == undefined || picker == null || picker == '') {
		creatList(cityObj, firstPicker);
//	}

	if (cityObj[selectedIndex[0]].hasOwnProperty('sub')) {
		creatList(cityObj[selectedIndex[0]].sub, secondPicker);
	} else {
		secondPicker = [{
			text : '',
			value : 0
		}];
	}
	if (cityObj[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
		creatList(cityObj[selectedIndex[0]].sub[selectedIndex[1]].sub, thirdPicker);
	} else {
		thirdPicker = [{
			text : '',
			value : 0
		}];
	}

//	if (picker == undefined || picker == null || picker == '') {
		picker = new Picker({
			data : [firstPicker, secondPicker, thirdPicker],
			selectedIndex : selectedIndex,
			title : '地址选择'
		});
//	}
		
	picker.on('picker.select', function(selectedVal, selectedIndex) {
		var text1 = firstPicker[selectedIndex[0]].text;
		var text2 = secondPicker[selectedIndex[1]].text;
		var text3 = thirdPicker[selectedIndex[2]] ? thirdPicker[selectedIndex[2]].text : '';
		var fullPath = text1+text2+text3;
		calFunPacker(firstPicker[selectedIndex[0]], secondPicker[selectedIndex[1]], thirdPicker[selectedIndex[2]], fullPath);
		
		
	});

	picker.on('picker.change', function(index, selectedIndex) {
		if (index === 0) {
			firstChange();
		} else if (index === 1) {
			secondChange();
		}

		function firstChange() {
			secondPicker = [];
			thirdPicker = [];
			checkedPicker[0] = selectedIndex;
			var firstCity = cityObj[selectedIndex];
			if (firstCity.hasOwnProperty('sub')) {
				creatList(firstCity.sub, secondPicker);

				var secondCity = cityObj[selectedIndex].sub[0]
				if (secondCity.hasOwnProperty('sub')) {
					creatList(secondCity.sub, thirdPicker);
				} else {
					thirdPicker = [{
						text : '',
						value : 0
					}];
					checkedPicker[2] = 0;
				}
			} else {
				secondPicker = [{
					text : '',
					value : 0
				}];
				thirdPicker = [{
					text : '',
					value : 0
				}];
				checkedPicker[1] = 0;
				checkedPicker[2] = 0;
			}

			picker.refillColumn(1, secondPicker);
			picker.refillColumn(2, thirdPicker);
			picker.scrollColumn(1, 0)
			picker.scrollColumn(2, 0)
		}

		function secondChange() {
			thirdPicker = [];
			checkedPicker[1] = selectedIndex;
			var first_index = checkedPicker[0];
			if (cityObj[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
				var secondCity = cityObj[first_index].sub[selectedIndex];
				creatList(secondCity.sub, thirdPicker);
				picker.refillColumn(2, thirdPicker);
				picker.scrollColumn(2, 0)
			} else {
				thirdPicker = [{
					text : '',
					value : 0
				}];
				checkedPicker[2] = 0;
				picker.refillColumn(2, thirdPicker);
				picker.scrollColumn(2, 0)
			}
		}

	});

	picker.on('picker.valuechange', function(selectedVal, selectedIndex) {});
}

function shopAddressPicker(cityObj,calFun) {
	if (picker == undefined || picker == null || picker == '') {
		initPicker(cityObj);
	}
	calFunPacker=calFun;
	picker.show();
}



var pickerCity;
var calFunPacker;
function initPickerCity(cityObj){
	var firstPicker = [];
	/* 省，直辖市 */
	var secondPicker = [];
	/* 市 */
	var thirdPicker = [];
	/* 镇 */
	var selectedIndex = [0, 0, 0];
	/* 默认选中的地区 */
	var checkedPicker = [0, 0, 0];
	/* 已选选项 */
	function creatList(obj, list) {
		obj.forEach(function(item, index, arr) {
			var temp = new Object();
			temp.id = item.id;
			temp.text = item.name;
			temp.code = item.code;
			temp.value = index;
			list.push(temp);
		})
	}

//	if (pickerCity == undefined || pickerCity == null || pickerCity == '') {
		creatList(cityObj, firstPicker);
//	}

	if (cityObj[selectedIndex[0]].hasOwnProperty('sub')) {
		creatList(cityObj[selectedIndex[0]].sub, secondPicker);
	} else {
		secondPicker = [{
			text : '',
			value : 0
		}];
	}
	if (cityObj[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
		creatList(cityObj[selectedIndex[0]].sub[selectedIndex[1]].sub, thirdPicker);
	} else {
		thirdPicker = [{
			text : '',
			value : 0
		}];
	}

//	if (pickerCity == undefined || pickerCity == null || pickerCity == '') {
		pickerCity = new Picker({
			data : [firstPicker, secondPicker, thirdPicker],
			selectedIndex : selectedIndex,
			title : '地址选择'
		});
//	}
		
	pickerCity.on('picker.select', function(selectedVal, selectedIndex) {
		var text1 = firstPicker[selectedIndex[0]].text;
		var text2 = secondPicker[selectedIndex[1]].text;
		var fullPath = text1+text2;
		calFunPacker(firstPicker[selectedIndex[0]], secondPicker[selectedIndex[1]], fullPath);
		
		
	});

	pickerCity.on('picker.change', function(index, selectedIndex) {
		if (index === 0) {
			firstChange();
		} else if (index === 1) {
			secondChange();
		}

		function firstChange() {
			secondPicker = [];
			thirdPicker = [];
			checkedPicker[0] = selectedIndex;
			var firstCity = cityObj[selectedIndex];
			if (firstCity.hasOwnProperty('sub')) {
				creatList(firstCity.sub, secondPicker);

				var secondCity = cityObj[selectedIndex].sub[0]
				if (secondCity.hasOwnProperty('sub')) {
					creatList(secondCity.sub, thirdPicker);
				} else {
					thirdPicker = [{
						text : '',
						value : 0
					}];
					checkedPicker[2] = 0;
				}
			} else {
				secondPicker = [{
					text : '',
					value : 0
				}];
				thirdPicker = [{
					text : '',
					value : 0
				}];
				checkedPicker[1] = 0;
				checkedPicker[2] = 0;
			}

			pickerCity.refillColumn(1, secondPicker);
			pickerCity.refillColumn(2, thirdPicker);
			pickerCity.scrollColumn(1, 0)
			pickerCity.scrollColumn(2, 0)
		}

		function secondChange() {
			thirdPicker = [];
			checkedPicker[1] = selectedIndex;
			var first_index = checkedPicker[0];
			if (cityObj[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
				var secondCity = cityObj[first_index].sub[selectedIndex];
				creatList(secondCity.sub, thirdPicker);
				pickerCity.refillColumn(2, thirdPicker);
				pickerCity.scrollColumn(2, 0)
			} else {
				thirdPicker = [{
					text : '',
					value : 0
				}];
				checkedPicker[2] = 0;
				pickerCity.refillColumn(2, thirdPicker);
				pickerCity.scrollColumn(2, 0)
			}
		}

	});

	pickerCity.on('picker.valuechange', function(selectedVal, selectedIndex) {});
}

/**创建只选择到城市的选择框*/
function shopAddressPickerCity(cityObj,calFun) {
	if (pickerCity == undefined || pickerCity == null || pickerCity == '') {
		initPickerCity(cityObj);
	}
	calFunPacker=calFun;
	pickerCity.show();
}
