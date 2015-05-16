$(function(){
	var pdfname = "taxforprint.pdf";
	var rw = require('rw');
	var htmlBoilerplatePDF = require("html-boilerplate-pdf");
	var pdfgen =  htmlBoilerplatePDF({	paperBorder : '0.4cm'	});
	
	console.log("install rw");
	console.log("install htmlBoilerplatePDF");
	var barprogress = '<div class="progress">  <div class="progress-bar" role="progressbar" aria-valuenow="$value" aria-valuemin="0" aria-valuemax="100" style="width: $value%;">    $value%  </div></div>';
	
	function offilneProgress( value ){
		$("#offlineprogress").html(barprogress.replace(/\$value/g,value));
	}
	
	//function to pdf
	var gprogress = 0;
	var fprogress = [];
	function topdfoffline ( htmlpath , pdfpath ){
		console.log("start ... " + htmlpath);
		console.log("pdfpath ... " + pdfpath);
		htmlBoilerplatePDF({
			paperBorder : '0.4cm'
		}).concat.from(htmlpath).to(pdfpath, function () {
			console.log("Created " +  pdfpath);
			fprogress.push(true);
		});
		
		return this;
	}
	
	function topdfofflines ( arrayhtmlpath ,pdfpath){
		
		pdfgen.concat.from(arrayhtmlpath).to(pdfpath, function () {
			  console.log("Created", pdfpath)
			  fprogress.push(true);
		})
	}
	
	//readhtml
	function readhtml( htmlpaht ){
		var contents = rw.readFileSync( htmlpaht , "utf8");
		return contents;
	}
	//offilne
	function pdfoffline (){
		if(localStorage["onlineflag"] != "false" ){
			console.log("not offline ");
			return false;
		}
		
		console.log(" offline running... ");
		$("#offlineView").show();
		fprogress = [];
		// 1 -> 10
//		var p1 = new topdfoffline ( "report/sr120_11.html" , "PDF/01.pdf"  );

		 //2 - > 10
//		var p2 = new topdfoffline ( "report/sr120_11.html" , "PDF/02.pdf" );
		
		//3 - > 10
//		var p3 = new topdfoffline ( "report/sr120_11.html" , "PDF/03.pdf" );
		var files = [ "report/sr120_11.html", "report/sr120_11.html", "report/sr120_11.html"];
		topdfofflines(files, "PDF/" + pdfname );
		
		var timer = setInterval(function(){
			if( gprogress >= 100){
				clearInterval(timer);
			}
			gprogress += 2;
			if( fprogress.length >=1 ){
				gprogress = 100;
			}
			
			offilneProgress(gprogress);
			
		}, 1000);
		
		gprogress = 10;
	}
	
	//inti
	function init(){
		console.log("init");
		pdfoffline();
		
		
	};
	
	init();
	
	$.fn["mysave"] = function (){
			console.log("save");
			var files = $('#fileDialog')[0].files;
			var p = files[0].path;
			console.log(p);
			var genfile =  "PDF/" + pdfname ;
			try{
				var contents = rw.readFileSync( genfile);
				rw.writeFileSync(p, contents);
				
				alert( "บันทึกไฟล์เรียบร้อย \n " + p );
			}catch( err){
				alert( err );
			}
			
	};
	
});

