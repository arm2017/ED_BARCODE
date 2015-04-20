var alertMsg = {};

alertMsg.reportSr120 = "สร้าง สร 120 เรียบร้อย";
alertMsg.submitOnlineOK = "ส่งแบบฟอร์มออนไลน์ เรียบร้อย แล้วครับ :)";
alertMsg.submitOnlineFail = "ส่งแบบฟอร์มออนไลน์ ผิดผลาด :)";
alertMsg.genReportOK = " สร้าง ส่งแบบฟอร์ม สำเร็จ";
alertMsg.saveDraf = "บันทักเรียบร้อย";

alertMsg.show = function (argument , type ) {
	var pType = 'success';
	if(type == 'error' ){
		pType = 'danger' ;
	}
	if(type == 'info' ){
		pType = 'info' ;
	}
	var div =	"<div class=\"alert alert-" + pType + " alert-dismissible\" role=\"alert\"> " +
			 " <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> " + 
			  "<strong> " + argument + " </strong> " + 
			"</div>" ;
		$(".alertField").append( div );	
};

alertMsg.clear = function (argument) {
	$(".alertField").html('');
};


var loadingscr = {};
loadingscr.isShow = false;


loadingscr.show = function (){
	if( loadingscr.isShow == false){
		loadingscr.isShow = true;
		alertMsg.clear();
		$('#loadinghandle').modal('show');
		
	}
};

loadingscr.hide = function (){
	if( loadingscr.isShow == true){
		loadingscr.isShow = false;
		$('#loadinghandle').modal('hide');
	}
};