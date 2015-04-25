// report generate
		var rw = require('rw');
		var qrCode = require('qrcode-npm');
		var htmlBoilerplatePDF = require("html-boilerplate-pdf");
		var cmd = require("cmd-exec").init();
		var pathHTML = "PDF/";
		var barcode = require("rescode");
			barcode.loadModules(["code39"]);
		
		var addrMark = ['....................................................................................................... ','.....................................................................................................................'
		,'............................................................... ','...........................','......................................................................................................................','...........................................................................................................................'];

		function getReportTempate(){
	    		var contents = rw.readFileSync("report/sr120_11.html", "utf8");
	    		// alert(contents);

	    		return contents;
		}0

		function sr120_11 ( params) {

			log('generate report');
			loadingscr.show();

			var t_txt = getReportTempate();

			var jsonsyncMasterDataRequest = localStorage['syncMasterDataRequest'];
			var syncMasterDataRequest = JSON.parse(jsonsyncMasterDataRequest.escapeSpecialChars());
			var addr = syncMasterDataRequest.entrepreneur;

			t_txt = t_txt.replace("{1}",  addTextInMark( addrMark[0] , addr.licenseAllowedName  ));
			t_txt = t_txt.replace("{2}",addTextInMark( addrMark[1] , addr.factoryName  ));
			t_txt = t_txt.replace("{3}", addTextInMark( addrMark[2] , addr.licenseNo  ));
			t_txt = t_txt.replace("{4}", addTextInMark( addrMark[4] , addr.taxNo ));
			t_txt = t_txt.replace("{5}", addTextInMark( addrMark[3] , '2015-02-01' ));
			t_txt = t_txt.replace("{6}",addTextInMark( addrMark[5] , addr.factoryAddress ));
			//Qr addr
			var qrImage = getQrByRawDataAndSize(addr.licenseNo,50);
			log( "licenseNo :" + addr.licenseNo );
			t_txt = t_txt.replace("{addQr}", qrImage );

			// QR grid List
			var gridsize =  myGrid.dataList.length;
			log( 'Grid size : ' + gridsize);
			var sumcol15 = 0;
			var sumcol16 = 0;
			if(gridsize > 0 ){
				var rows = new Array();
				var gridList =  myGrid.dataList;
				for (var i = 0; i < gridList.length; i++) {
					var html = myGrid.getHtmlRowForReport(gridList[i]);
					var r = gridList[i];
					var tag = r.productCode + "|" + r.col5 + "|" +  r.col7  + "|"  +  r.col8  + "|" +  r.col9  + "|" +  r.col10 + "|" +  r.col11  ;
					log("row : " + r.num + " data : " + tag );
					var qrImage = getQrByRawDataAndSize(tag,50);
					html = html.replace('{QrinRow}' , qrImage);
					rows.push(html);
					sumcol15 += r.col13;
					sumcol16 += r.col14;
				};
				var allHtml = rows.join("\n");
				// log( allHtml );

				t_txt = t_txt.replace("{gridData}", allHtml);
			}else{
				t_txt = t_txt.replace("{gridData}", '');
			}

			t_txt = t_txt.replace("{col15}", sumcol15 );
			t_txt = t_txt.replace("{col16}", sumcol16 );

			t_txt = t_txt.replace("{col19}", sumcol15 );
			t_txt = t_txt.replace("{col20}", sumcol16 );
			t_txt = t_txt.replace("{col21}",  sumcol15 + sumcol16);
			t_txt = t_txt.replace("{col28}",  ' ');

			//QR total
			var tag = "";
				var sumaryTag = new Array();
				sumaryTag.push( sumcol15 );
				sumaryTag.push( sumcol16 );
				sumaryTag.push( '' );
				sumaryTag.push( '' );
				sumaryTag.push( '' );
				sumaryTag.push( '' );
				sumaryTag.push( '' );
				sumaryTag.push( '' );
				sumaryTag.push( '' );

			tag = sumaryTag.join('|');
			
			log( 'QR total : ' + tag );
			
			var qrImage = getQrByRawDataAndSize(tag,50);
			t_txt = t_txt.replace("{qrtotal}", qrImage);

			// submit online
			var submintOnlyNumber = '';
			if( params != undefined && params != ''){
				var imgTag = '';
				var base64 = barcode.create("code39", params );
					base64 = base64.toString("base64");
				imgTag = "<img src=\"data:image/png;base64," + base64 + "\"  width='200px'  />" ;
					
				submintOnlyNumber = imgTag;
			}
			t_txt = t_txt.replace("{submintOnlyNumber}", submintOnlyNumber);
			
			// write File
			var uuid = new Date().getTime();
			var fileName = "gen_sr120_" + uuid;
			rw.writeFileSync( pathHTML + fileName + ".html", t_txt ,"utf8");

			log('end ..generate report');

			// Gen to PDF;
 			log('start gen pdf ...... ');
			var htmlDocs = [ pathHTML + fileName  + ".html" ]
			  , bookPath =  pathHTML + fileName  + ".pdf" ;
			 
			htmlBoilerplatePDF({
				paperBorder : '0.4cm'
			}).concat.from(htmlDocs).to(bookPath, function () {
			  log("Created " +  bookPath);
			  alertMsg.show( alertMsg.reportSr120 );
			  loadingscr.hide();
			  //openReport(fileName + ".html");
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

		function openReport ( fileName ){
			cmd
				  .exec("\"" + pathHTML + fileName)
				  .then(function(res){
				    console.log(res.message);
				  })
				  .fail(function(err){
				    console.log(err.message);
				  })
				  .done(function(){
				    console.log("Done!");
				  });
		}

