Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};
Number.prototype.formatRoudDown = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
    var max = Math.max(0, ~~n);
     var   num = "0.00";
     if( this.toString().split(".").length == 2){
     		num =  this.toString().split(".")[0] +"."+ this.toString().split(".")[1].substr(0,max)
     }else{
     	 num = this.toFixed(Math.max(0, ~~n));
     }

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

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

		if( confirm("ยืนยันการลบ") == false) return false;

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
		 '<td class=\'number-input\'>' + parseFloat(row.col3).format(2) +'</td>' +
		 '<td class=\'number-input\'>' + parseFloat(row.col4).format(2) +'</td>' +
		 '<td>' + "<input id='p_" + row.objId + "' type='text' class='form-control input-number-only' style='width:80px;' placeholder='' onchange=\"myGrid.onChangeValue(this,'col5');\" value='" + row.col5 + "'>"  + '</td>'  + 
		 '<td class=\'number-input\'>' + parseFloat(row.col6).format(4)  +'</td>' +
		 '<td>' +  "<input id='p_" + row.objId + "'  type='text' class='form-control input-number-only' style='width:80px;' placeholder='' onchange=\"myGrid.onChangeValue(this,'col7')\"  value='" + row.col7 + "'>" + '</td>' +
		 '<td>' +  "<input id='p_" + row.objId + "'  type='text' class='form-control input-number-only' style='width:80px;' placeholder='' onchange=\"myGrid.onChangeValue(this,'col8')\"  value='" + row.col8 + "'>" +'</td>'  +
		 '<td class=\'number-input\'>' +  row.col9.format(4)  +'</td>'+
		 '<td class=\'number-input\'>' +  row.col10.format(4)  +'</td>'+
		 '<td class=\'number-input\'>' +  row.col11.format(4)  +'</td>'+
		 '<td class=\'number-input\'>' +  row.col12.format(4) +'</td>'+
		 '<td class=\'number-input\'>' +  (row.col13).format(4) +'</td>'+
		 '<td class=\'number-input\'>' +  row.col14.format(4) +'</td>'+
		 '<td class=\'number-input\'>' +  deleteHtml +'</td>'+
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
				myGrid.calcTax(myGrid.dataList[index]);
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

myGrid.calcTax = function  ( row ) {
	// calc
	var col9 = row.col6 * row.col7 ;
	row.col9 = col9;
	// ตามปริมาตริ
	var tax1 = (row.col6 * row.col3 * row.col4) / 100;
	var tax2 = row.col5 * row.col6 ;
	log( "tax1 : " + tax1 );
	log( "tax2 : " + tax2 );
	row.col10 = (tax1 > tax2)? tax1 : tax2 ;

	row.col12= row.col10 + row.col11;

	row.col14= row.col5 * row.col12;
	row.col13= (row.col5 * row.col9);

	// sum
	var sumcol13 = 0;
	var sumcol14 = 0;
		for	(var index = 0; index < myGrid.dataList.length; index++) {
		    	var r = myGrid.dataList[index];
		    	sumcol13 = sumcol13 + r.col13;
		    	sumcol14 = sumcol14 + r.col14;
		}
	// show
	myGrid.reRender();
	var sum13 = sumcol13.format(2);
	var sum14 = sumcol14.format(2);
	$('#col15').val(sum13);
	$('#col16').val(sum14);
	$('#col15_2').html(sum13);
	$('#col16_2').html(sum14);
	// sumary
	var summary = (sumcol13 + sumcol14).format(2);
	$('.row1').get(0).value = summary;
	$('.row2').val('0.00');
	$('.row3').get(0).value = summary;

	// 1. มหาดไทย (๗) = รวมอัตราภาษีสุรา * 0.1
	// 2. กองทุน สสส. (๗) = รวมอัตราภาษีสุรา * 0.02
	// 3. กองทุน สสท. (๗) = รวมอัตราภาษีสุรา * 0.015
	// 4. กองทุน กพฬ. (๗) = รวมอัตราภาษีสุรา * 0.02
	
	summary = sumcol13 + sumcol14 ;
	var taxby1 = ( summary * 0.1).format(2);
	$('.row1').get(1).value = taxby1;
	$('.row2').get(1).value= taxby1;
	$('.row3').get(1).value= taxby1;
	console.log( summary );
	$('.row5').get(0).value= ( summary + (summary * 0.1) ).format(2) ;
	//2
	 taxby1 = (summary * 0.02).formatRoudDown(2);
	$('.row1').get(2).value = taxby1;
	$('.row2').get(2).value= taxby1;
	$('.row3').get(2).value= taxby1;
	$('.row5').get(1).value= taxby1;
	//3
	 taxby1 = (summary * 0.015).format(2);
	$('.row1').get(3).value = taxby1;
	$('.row2').get(3).value= taxby1;
	$('.row5').get(2).value= taxby1;
	//4
	 taxby1 = (summary * 0.02).format(2);
	$('.row1').get(4).value = taxby1;
	$('.row2').get(4).value= taxby1;
	$('.row5').get(3).value= taxby1;

};



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



												 

