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

	entrepreneur['productList'] = productList;
     	
     	var productTaxList = {};
     	productTaxList['recordNo'] = '';
     	productTaxList['productCode'] = '';
     	productTaxList['piece'] = '';
     	productTaxList['sellingPriceByOwner'] = '';
     	productTaxList['sellingPriceByDepartment'] = '';
     	productTaxList['taxByValue'] = '';
     	productTaxList['taxByCapacity'] = '';
     	productTaxList['taxByValuePlus'] = '';


     	var alcoholTaxFormSummary = {};
     	alcoholTaxFormSummary['sumTaxByValue'] = '';
     	alcoholTaxFormSummary['sumTaxByCapacity'] = '';
     	alcoholTaxFormSummary['reductTaxProduct'] = '';
     	alcoholTaxFormSummary['receipt'] = '';
     	alcoholTaxFormSummary['reduceTaxProductBaht'] = '';
     	alcoholTaxFormSummary['reduceTaxByDepBookNo'] = '';
     	alcoholTaxFormSummary['reduceTaxByDepBookNoBaht'] = '';
     	alcoholTaxFormSummary['taxRateByMOI'] = '';
     	alcoholTaxFormSummary['taxByMOI'] = '';
     	alcoholTaxFormSummary['other'] = '';
     	alcoholTaxFormSummary['taxByThaiHealth'] = '';
     	alcoholTaxFormSummary['taxByThaiPBS'] = '';
     	alcoholTaxFormSummary['taxByNSDF'] = '';


     	root.add('alcoholTaxForm', { 'entrepreneur' : entrepreneur , 
     		'productTaxList' : productTaxList,
     		'alcoholTaxFormSummary' : alcoholTaxFormSummary
     	} );
	// console.log( root.toXml() );

	this.callback = function ( p1 , respone ){

	if( p1 != 'error' ){

		var beanObj = convertXMLByname( respone , 'submitOnlineResponse');
		console.log( beanObj );
		if( beanObj.status == 0 ){

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


