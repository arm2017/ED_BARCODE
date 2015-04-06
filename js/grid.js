var myGrid = {};
	myGrid.Id = "myGrid";
	myGrid.label = "1234";
	myGrid.dataList = new Array();
	myGrid.rowMaster = { objId : 0, num : 0 , col1 : '' , col2 : '', col3 : 0, col4 : 0, col5 : 0 , col6 : 0, col7 : 0 , col8 : 0, col9 : 0, col10 : 0, col11 : 0, col12 : 0, col13 : 0, col14: 0 , col15: 0 };
	myGrid.add = function ( row ) {
		$( "#" + myGrid.Id  ).append( row );
	};

	myGrid.getRow = function(){
		var r = jQuery.extend({},myGrid.rowMaster);
		r.objId = new Date().getTime();
		return r;
	};

	myGrid.removebyId = function( objId ){
		var removeIndex = -1;
		for	(var index = 0; index < myGrid.dataList.length; index++) {
			if( myGrid.dataList[index].objId == objId ){
				removeIndex = index;
				break;
			}
		}
		if( removeIndex != -1){
			myGrid.dataList.splice(removeIndex , 1);
			myGrid.reRender();
		}
	};

	myGrid.getHtmlRow = function( row ){
		var html = '';

		var editHtml = "<button id='" + row.objId + "' type='button' class='btn btn-default btn-xs' data-toggle='tooltip' data-placement='top' title='edit' ><span class='glyphicon glyphicon-edit' aria-hidden='true'></span> </button>";
		var deleteHtml = "<button  id='" + row.objId + "'  type='button' class='btn btn-default btn-xs' data-toggle='tooltip' data-placement='top' title='remove' onClick='myGrid.removebyId(this.id);'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span> </button>";

	html = '<tr>' +
		 '<td>'+ row.num +'</td>' +		
		 '<td>' + row.col1 + '</td>' +
		 '<td>' + row.col2+ '</td>' +
		 '<td>' + row.col3 +'</td>' +
		 '<td>' + row.col4 +'</td>' +
		 '<td>' + "<input id='p_" + row.objId + "' type='text' class='form-control' style='width:80px;' placeholder='' onchange=\"myGrid.onChangeValue(this,'col5');\" value='" + row.col5 + "'>"  + '</td>'  + 
		 '<td>' + row.col6 +'</td>' +
		 '<td>' +  "<input id='p_" + row.objId + "'  type='text' class='form-control' style='width:80px;' placeholder='' onchange=\"myGrid.onChangeValue(this,'col7')\"  value='" + row.col7 + "'>" + '</td>' +
		 '<td>' +  "<input id='p_" + row.objId + "'  type='text' class='form-control' style='width:80px;' placeholder='' onchange=\"myGrid.onChangeValue(this,'col8')\"  value='" + row.col8 + "'>" +'</td>'  +
		 '<td>' +  row.col9 +'</td>'+
		 '<td>' +  row.col10 +'</td>'+
		 '<td>' +  row.col11 +'</td>'+
		 '<td>' +  row.col12+'</td>'+
		 '<td>' +  row.col13 +'</td>'+
		 '<td>' +  row.col14 +'</td>'+
		 '<td>' +  deleteHtml +'</td>'+
		 '</tr>';

		 return html;
	};

myGrid.onChangeValue = function (element, col_num ) {
	var removeIndex = -1;
		for	(var index = 0; index < myGrid.dataList.length; index++) {
			if( 'p_' + myGrid.dataList[index].objId == element.id ){
				if(col_num == 'col5'){
					myGrid.dataList[index].col5 =  element.value ;
				}
				if(col_num == 'col7'){
					myGrid.dataList[index].col7 =  element.value ;
				}
				if(col_num == 'col8'){
					myGrid.dataList[index].col8 =  element.value ;
				}
				removeIndex = index;

				// myGrid.reRender();

				break;
			}
		}
};

myGrid.reRender = function(){
	$("#myGrid > tbody > tr").remove();
	for	(var index = 0; index < myGrid.dataList.length; index++) {
		myGrid.dataList[index].num  = index + 1;
	    	myGrid.add( myGrid.getHtmlRow (myGrid.dataList[index]) );
	}
};

myGrid.addItemPopup = function(){
	var type = $('#groupIdName').val();
	var nameType = $('#taxIdName').val();
	var r = myGrid.getRow();
		r.col1 = type;
		r.col2 = nameType;
	myGrid.dataList.push(r);

	$('#addItems').modal('hide');
	$('#groupIdName').val('');
	$('#taxIdName').val('');
	myGrid.reRender();
};


var addrData = {};
addrData.getAllData = function () {
	var values = new Array();
	var obj = $('input.addinput');
	for (var i = 0; i < obj.length; i++) {
		values.push(obj[i].value);
	};

	values.push($('textarea.addinput').val());

	return values;
};


myGrid.getSum = function(){
	var values = new Array();
	var obj = $('input.sumtax');
	for (var i = 0; i < obj.length; i++) {
		values.push(obj[i].value);
	};
	return values;
};

myGrid.getTotalTax = function(){
	var values = new Array();
	var obj = $('input.ttx');
	for (var i = 0; i < obj.length; i++) {
		values.push(obj[i].value);
	};
	return values;
};

var TaxType = {};
	TaxType.getRadio  = function () {
		return $("input[type='radio']:checked").val();
	};


//InJact Data
$(document).ready (function(){
	// var addrList = localStorage['addrList'].split(',');
	// if(undefined == addrList) return ;
	// var obj = $('input.addinput');
	// obj[0].value = addrList[1];
	// obj[1].value = addrList[2];
	// obj[2].value = addrList[0];
	// obj[3].value = addrList[5];
	// $('textarea.addinput').val(addrList[6]); 
	// $('input.liDate').val(addrList[3].substr(0,10)); 
	var jsonsyncMasterDataRequest = localStorage['syncMasterDataRequest'];
	var syncMasterDataRequest = JSON.parse(jsonsyncMasterDataRequest);

	var addr = syncMasterDataRequest.entrepreneur;

	var obj = $('input.addinput');
	obj[0].value = addr.licenseAllowedName;
	obj[1].value = addr.factoryName;
	obj[2].value = addr.licenseNo;
	obj[3].value = addr.taxNo;
	$('textarea.addinput').val(addr.factoryAddress); 
	// $('input.liDate').val(addrList[3].substr(0,10)); 

});


												 

