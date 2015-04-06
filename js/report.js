// report generate
		var rw = require('rw');
		var qrCode = require('qrcode-npm');
		var addrMark = ['....................................................................................................... ','.....................................................................................................................'
		,'............................................................... ','...........................','......................................................................................................................','...........................................................................................................................'];

		function getReportTempate(){
	    		var contents = rw.readFileSync("report/sr120_11.html", "utf8");
	    		// alert(contents);

	    		return contents;
		}

		function sr120_11 () {
			var t_txt = getReportTempate();

			var jsonsyncMasterDataRequest = localStorage['syncMasterDataRequest'];
			var syncMasterDataRequest = JSON.parse(jsonsyncMasterDataRequest);
			var addr = syncMasterDataRequest.entrepreneur;

			t_txt = t_txt.replace("{1}",  addTextInMark( addrMark[0] , addr.licenseAllowedName  ));
			t_txt = t_txt.replace("{2}",addTextInMark( addrMark[1] , addr.factoryName  ));
			t_txt = t_txt.replace("{3}", addTextInMark( addrMark[2] , addr.licenseNo  ));
			t_txt = t_txt.replace("{4}", addTextInMark( addrMark[4] , addr.taxNo ));
			t_txt = t_txt.replace("{5}", addTextInMark( addrMark[3] , '2015-02-01' ));
			t_txt = t_txt.replace("{6}",addTextInMark( addrMark[5] , addr.factoryAddress ));
			//Qr addr
			var addrImgTaxId = getQrByRawData (addr.taxNo);
			var addrEle = jQuery(addrImgTaxId);
			addrEle[0].height = addrEle[0].width = '50' ;
			t_txt = t_txt.replace("{addQr}", addrEle.get(0).outerHTML);

			// t_txt = t_txt.replace("{1}",  addTextInMark( addrMark[0] , '' ) );
			// t_txt = t_txt.replace("{2}",addTextInMark( addrMark[1] , '' ) );
			// t_txt = t_txt.replace("{3}", addTextInMark( addrMark[2] , '' ) );
			// t_txt = t_txt.replace("{4}", addTextInMark( addrMark[4] , '' ));
			// t_txt = t_txt.replace("{5}", addTextInMark( addrMark[3] , '' ));
			// t_txt = t_txt.replace("{6}",addTextInMark( addrMark[5] , addrList[6]  ));

			rw.writeFileSync("report_Gen.html",t_txt,"utf8");

		}
		function addTextInMark (mark, value ) {
			if( value == null || value == undefined || value == '' ){
				return mark;
			}
			if(value.length > mark.length){
				return  value.substr(0,mark.length - 3) + '...';
			}else{
				var mL = mark.length;
				var vL = value.length;
				var cpadding = parseInt( ((mL - vL) / 2) - (vL/1.5)) ;
				var padding = ( cpadding < 0 )? 0 :  cpadding ;
				var mHeader = mark.substr(0,padding);
				var mbody = mark.substr(padding , mL); 
				// var valueMark = mark.substr(0 , vL); 
				var replaceBody  = value ;

				return mHeader + replaceBody + mHeader;
			}
		}

		function getQrByRawData ( rawData) {
			

			var qr = qrCode.qrcode(4, 'M');
			qr.addData(rawData);
			qr.make();

			return qr.createImgTag(4);    // creates an <img> tag as text
			// qr.createTableTag(4);  // creates a <table> tag as text
		}

