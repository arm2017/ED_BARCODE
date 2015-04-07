var alertMsg = {};

alertMsg.reportSr120 = "สร้าง สร 120 เรียบร้อย";

alertMsg.show = function (argument) {
	var div =	"<div class=\"alert alert-success alert-dismissible\" role=\"alert\"> " +
			 " <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> " + 
			  "<strong> " + argument + " </strong> " + 
			"</div>" ;
		$("#alertField").append( div );	
};

alertMsg.clear = function (argument) {
	$("#alertField").html('');
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