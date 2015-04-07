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

	myGrid.getHtmlRowForReport = function( row ){
		var html = '';

		// var editHtml = "<button id='" + row.objId + "' type='button' class='btn btn-default btn-xs' data-toggle='tooltip' data-placement='top' title='edit' ><span class='glyphicon glyphicon-edit' aria-hidden='true'></span> </button>";
		// var deleteHtml = "<button  id='" + row.objId + "'  type='button' class='btn btn-default btn-xs' data-toggle='tooltip' data-placement='top' title='remove' onClick='myGrid.removebyId(this.id);'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span> </button>";

	html = '<tr>' +
		 '<td width=\'55px\'> {QrinRow}' + '</td>' +		
		 '<td>' + row.col1 + '</td>' +
		 '<td>' + row.col2+ '</td>' +
		 '<td>' + row.col3 +'</td>' +
		 '<td>' + row.col4 +'</td>' +
		 '<td>' + row.col5 + '</td>'  + 
		 '<td>' + row.col6 +'</td>' +
		 '<td>' + row.col7  + '</td>' +
		 '<td>' + row.col8  +'</td>'  +
		 '<td>' + row.col9 +'</td>'+
		 '<td>' + row.col10 +'</td>'+
		 '<td>' + row.col11 +'</td>'+
		 '<td>' + row.col12+'</td>'+
		 '<td>' + row.col13 +'</td>'+
		 '<td>' + row.col14 +'</td>'+
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
	// var type = $('#groupIdName').val();
	// var nameType = $('#taxIdName').val();
	// selectProduct
	var selectProduct = searchGrid.getSelect();
	// new Record
	var r = myGrid.getRow();
		r.col1 = selectProduct.productGroup;
		r.col2 = selectProduct.productName;
		r.col3 = selectProduct.degree;
		r.col4 = selectProduct.size;
		r.col5 = 0;
		r.col6 = selectProduct.taxByCapacity;
		r.col7 = selectProduct.lowestSellingPriceNoTax;
		r.col8= selectProduct.taxPlusBySellingPrice;
		r.col9= 0;
		r.col10= 0;
		r.col11= 0;
		r.col12= 0;
		r.col13= 0;
		r.col14=0;
		r.productCode = selectProduct.productCode;


		log('add : ' +   r.productCode);

	//addTo list
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

	var jsonsyncMasterDataRequest = localStorage['syncMasterDataRequest'];
	// Gobal data
	syncMasterDataRequest = JSON.parse(jsonsyncMasterDataRequest);

	var addr = syncMasterDataRequest.entrepreneur;

	var obj = $('input.addinput');
	obj[0].value = addr.licenseAllowedName;
	obj[1].value = addr.factoryName;
	obj[2].value = addr.licenseNo;
	obj[3].value = addr.taxNo;
	$('textarea.addinput').val(addr.factoryAddress); 
	// $('input.liDate').val(addrList[3].substr(0,10)); 

});

var searchGrid = {};
searchGrid.dataList = new Array();

searchGrid.getHtmlRow = function (BEAN_productList) {
	var radioBtn = "<div class=\"radio searchGrid-radio\">  <label>    <input type=\"radio\" name=\"selectSearchGrid\"  value=\"" + BEAN_productList.productCode + "\" aria-label=\"...\">  </label></div>";
	var html  = "";
	html = 
	'<tr>' +
		'<td align=\'center\'>' + radioBtn + '</td>' +
		'<td>' + BEAN_productList.productGroup +'</td>' +
		'<td>' + BEAN_productList.productCode +'</td>' +
		'<td>' + BEAN_productList.productName +'</td>' +
		'<td>' + BEAN_productList.degree +'</td>' +
	'</tr>' ;

	return html;
};
searchGrid.reRender = function(){
	$("#searchGrid > tbody > tr").remove();
	for	(var index = 0; index < searchGrid.dataList.length; index++) {
		searchGrid.dataList[index].num  = index + 1;
	    	searchGrid.add( searchGrid.getHtmlRow (searchGrid.dataList[index]) );
	}
	if(searchGrid.dataList.length > 0){
		// checked
		 $('input[name=selectSearchGrid]')[0].checked = true;
	}
};

searchGrid.add = function ( htmlRow ) {
	$( "#searchGrid"  ).append( htmlRow );
};

searchGrid.search  = function ( params ) {
	var pList = syncMasterDataRequest.entrepreneur.productList;
	searchGrid.dataList = new Array();
	for (var i = 0; i < pList.length; i++) {
		var product = pList[i];
		if( params.productCode != undefined ){
			if(product.productCode.indexOf(params.productCode) == -1 ){
				continue;
			}
		}
		searchGrid.dataList.push(product);
	};

	searchGrid.reRender ();
};

searchGrid.getSelectRadio = function () {
	return $('input[name=selectSearchGrid]:checked').val();
};

searchGrid.getSelect = function () {
	var pId = searchGrid.getSelectRadio();
	if( pId != undefined || pId != ''){
		for	(var index = 0; index < searchGrid.dataList.length; index++) {
			var p = searchGrid.dataList[index];
			if( p.productCode == pId ){
				return p;
			}
		}
	}
	return '';
};

searchGrid.clear =function () {
	searchGrid.dataList = new Array();
	searchGrid.reRender();
};



												 

