// submit online
// use SOAPClientParameters
var submitOnlineRefNo = '';
function submitOnline ( argument ) {
	loadingscr.show();
	var root = new SOAPClientParameters();

	var entrepreneur = {};

	entrepreneur['licenseNo'] = '';
	entrepreneur['licenseAllowedName'] = '';
	entrepreneur['factoryName'] = '';
	entrepreneur['licenseStartDate'] = '';
	entrepreneur['licenseEndDate'] = '';
	entrepreneur['taxNo'] = '';
	entrepreneur['factoryAddress'] = '';

	var productList  = {};
	productList['productGroup'] = '';
	productList['productCode'] = '';
	productList['brandMajor'] = '';
	productList['brandMinor'] = '';
	productList['model'] = '';
	productList['size'] = '';
	productList['unit'] = '';
	productList['degree'] = '';
	productList['taxByValue'] = '';
	productList['taxByCapacity'] = '';
	productList['taxByLiter'] = '';
	productList['lowestDegreeNoTax'] = '';
	productList['taxPlusByDegree'] = '';
	productList['lowestSellingPriceNoTax'] = '';
	productList['taxPlusBySellingPrice'] = '';
	productList['announcePriceDate'] = '';
	productList['announcePriceValue'] = '';

	// entrepreneur['productList'] = productList;
     	
     	var productTaxList = {};
     	productTaxList['recordNo'] = '';
     	productTaxList['productCode'] = '';
     	productTaxList['piece'] = '';
     	productTaxList['sellingPriceByOwner'] = '';
     	productTaxList['sellingPriceByDepartment'] = '';
     	productTaxList['taxByValue'] = '';
     	productTaxList['taxByCapacity'] = '';
     	productTaxList['taxByValuePlus'] = '';

     	// data record
     	var list = myGrid.dataList;
     	var productTaxListArray = new Array();
     	for (var i = 0; i < list.length; i++) {
     		var r = list[i];
     		var newProduct = jQuery.extend({}, productTaxList );
     		newProduct.recordNo = i + 1;
     		newProduct.productCode = r.productCode;
     		newProduct.piece =  r.col5;
     		newProduct.sellingPriceByOwner =  r.col7;
     		newProduct.sellingPriceByDepartment =  r.col8;
     		newProduct.taxByValue =  r.col9;
     		newProduct.taxByCapacity =  r.col10;
     		newProduct.taxByValuePlus =  r.col11;
     		var productTaxListSP = new SOAPClientParameters();
     		productTaxListSP.add("productTaxList" , newProduct);
     		productTaxListArray.push(productTaxListSP);
     	};

     	var TotalTax = myGrid.getTotalTax();

     	var alcoholTaxFormSummary = {};
     	alcoholTaxFormSummary['sumTaxByValue'] = TotalTax[0];
     	alcoholTaxFormSummary['sumTaxByCapacity'] = TotalTax[1];
     	alcoholTaxFormSummary['reductTaxProduct'] = 0;
     	alcoholTaxFormSummary['receipt'] = '';
     	alcoholTaxFormSummary['reduceTaxProductBaht'] = 0;
     	alcoholTaxFormSummary['reduceTaxByDepBookNo'] = 0;
     	alcoholTaxFormSummary['reduceTaxByDepBookNoBaht'] = 0;
     	alcoholTaxFormSummary['taxRateByMOI'] = 0;
     	alcoholTaxFormSummary['taxByMOI'] = 0;
     	alcoholTaxFormSummary['other'] = 0;
     	alcoholTaxFormSummary['taxByThaiHealth'] = 0;
     	alcoholTaxFormSummary['taxByThaiPBS'] = 0;
     	alcoholTaxFormSummary['taxByNSDF'] = 0;

     
     	var licenseNo = syncMasterDataRequest.entrepreneur.licenseNo ;

     	root.add('alcoholTaxForm', { 
     		'licenseNo' : licenseNo,
     		'SOAPClientParameters' : productTaxListArray,
     		'alcoholTaxFormSummary' : alcoholTaxFormSummary
     	} );
	console.log( root.toXml() );

	this.callback = function ( p1 , respone ){

	if( p1 != 'error' ){
		var beanObj = convertXMLByname( respone , 'submitOnlineResponse');
		 // beanObj.referenceCode = "12345ABCDE";
		console.log( beanObj );
		if( beanObj.status == '0' ){

			submitOnlineRefNo =  beanObj.referenceCode;

			alertMsg.show (alertMsg.submitOnlineOK);
			alertMsg.show ( 'หมายเลข  : ' + beanObj.referenceCode);

			$("#submitOnlieBtn").hide();
			$("#btnReset").show();
			$("#printOffline").show();

		}else{
			alertMsg.show (alertMsg.submitOnlineFail , 'error');
			submitOnlineRefNo = '';
		}

	}else{
		alertMsg.show (alertMsg.submitOnlineFail , 'error');
		submitOnlineRefNo = '';
	}
	  loadingscr.hide();

	};

	 var url = "http://161.246.3.242:8081/EDBarcodeWeb/ws/EDBarcodeService";
	 SOAPClient.invoke(url, "submitOnlineRequest", root , true, this.callback);
}

function submitOnlinePrint () {
	sr120_11 (submitOnlineRefNo);
}


