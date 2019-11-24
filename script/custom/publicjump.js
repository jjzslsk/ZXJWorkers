////////////使用前先引用api.js////////////////

/**跳转用户协议*/
function jumpUserAgreement(){
	api.openWin({
		name : 'agreement_win',
		url : 'widget://html/login/agreement/agreement_win.html',
		slidBackEnabled:true,
		delay:300
	});
}
