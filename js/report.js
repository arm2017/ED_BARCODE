// report generate
		var rw = require('rw');
		var qrCode = require('qrcode-npm');
		var htmlBoilerplatePDF = require("html-boilerplate-pdf");
		var pathHTML = "PDF/";
		
		var addrMark = ['....................................................................................................... ','.....................................................................................................................'
		,'............................................................... ','...........................','......................................................................................................................','...........................................................................................................................'];

		function getReportTempate(){
	    		var contents = rw.readFileSync("report/sr120_11.html", "utf8");
	    		// alert(contents);

	    		return contents;
		}0

		function sr120_11 () {

			loadingscr.show();
			log('generate report');

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
			var qrImage = getQrByRawDataAndSize(addr.taxNo,50);
			t_txt = t_txt.replace("{addQr}", qrImage );

			// QR grid List
			var gridsize =  myGrid.dataList.length;
			log( 'Grid size : ' + gridsize);
			if(gridsize > 0 ){
				var rows = new Array();
				var gridList =  myGrid.dataList;
				for (var i = 0; i < gridList.length; i++) {
					var html = myGrid.getHtmlRowForReport(gridList[i]);
					var r = gridList[i];
					var tag = r.num + "#" + r.col3 + "#" +  r.col5  + "#"  +  r.col7  + "#" +  r.col8   ;
					var qrImage = getQrByRawDataAndSize(tag,50);
					html = html.replace('{QrinRow}' , qrImage);
					rows.push(html);
				};
				var allHtml = rows.join("\n");
				// log( allHtml );

				t_txt = t_txt.replace("{gridData}", allHtml);
			}

			t_txt = t_txt.replace("{col15}", $('#col15').val());
			t_txt = t_txt.replace("{col16}", $('#col16').val());

			//QR total
			var tag = "1000#10.0000#10.0000#10.0000#10.0000#10.0000#10.0000#10.0000";
			var qrImage = getQrByRawDataAndSize(tag,50);
			t_txt = t_txt.replace("{qrtotal}", qrImage);
			log( 'QR total' );
			
			// write File
			var uuid = new Date().getTime();
			var fileName = "gen_" + uuid;
			rw.writeFileSync( pathHTML + fileName + ".html", t_txt ,"utf8");

			log('end ..generate report');

			// Gen to PDF;
 			log('start gen pdf ...... ');
			var htmlDocs = [ pathHTML + fileName  + ".html" ]
			  , bookPath =  pathHTML + fileName  + ".pdf" ;
			 
			htmlBoilerplatePDF({
				paperBorder : '0.5cm'
			}).concat.from(htmlDocs).to(bookPath, function () {
			  log("Created " +  bookPath);
			  alertMsg.show( alertMsg.reportSr120 );
			  loadingscr.hide();
			});

			

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

		function getQrByRawDataAndSize( rawData , width ){
				var qrTag = getQrByRawData (rawData);
				var addrEle = jQuery(qrTag);
				addrEle[0].height = addrEle[0].width = width ;
				addrEle[0].alt = 'QR Image';

			return addrEle.get(0).outerHTML ;
		}

		function log( msg ){
			if( console == undefined){
				console = {};
			}
			console.log( 'report js :  ' + msg);
		}

		function getDateFormat(){
			var dt = new Date();
			return dt.toLocaleDateString().replace(/\//g, "_");
		}

