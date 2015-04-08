function getReport_NSDFTempate(){
	var contents = rw.readFileSync("report/Report_NSDF.html", "utf8");
			return contents;
}

function Report_NSDF () {

			loadingscr.show();
			log('generate report Report_NSDF');

			var t_txt = getReport_NSDFTempate();

			var jsonsyncMasterDataRequest = localStorage['syncMasterDataRequest'];
			var syncMasterDataRequest = JSON.parse(jsonsyncMasterDataRequest);
			var addr = syncMasterDataRequest.entrepreneur;

			t_txt = t_txt.replace("{kpp1}","สำนักกฏหมาย กรมสรรพสารมิต");
			t_txt = t_txt.replace("{kpp2}","ส่วนพิสูจน์และจัดการของกลาง");
			t_txt = t_txt.replace("{kpp3}","เลขที่ 1488");
			t_txt = t_txt.replace("{kpp4}","-");
			t_txt = t_txt.replace("{kpp5}","-");
			t_txt = t_txt.replace("{kpp6}","นครไชยศรี");
			t_txt = t_txt.replace("{kpp7}","ถนนนครไชยศรี");
			t_txt = t_txt.replace("{kpp8}","ดุสิต");
			t_txt = t_txt.replace("{kpp9}","กรุงเทพมหานคร");
			t_txt = t_txt.replace("{kpp10}","10300");
			t_txt = t_txt.replace("{kpp11}","0-2241-56000 ต่อ 51518");
			t_txt = t_txt.replace("{kpp12}","-");
			
			t_txt = t_txt.replace("{kpp13}","43,175");
			t_txt = t_txt.replace("{kpp14}","-");
			t_txt = t_txt.replace("{kpp15}","863");
			t_txt = t_txt.replace("{kpp16}","50");
			t_txt = t_txt.replace("{kpp17}","863");
			t_txt = t_txt.replace("{kpp18}","50");
			t_txt = t_txt.replace("{kpp19}","863");
			t_txt = t_txt.replace("{kpp20}","50");
			t_txt = t_txt.replace("{kpp21}","863");
			t_txt = t_txt.replace("{kpp22}","50");
			t_txt = t_txt.replace("{kpp23}","(แปดร้อยหกสิบบาทห้าสิบสตางค์)");
			
			
			t_txt = t_txt.replace("{checkbox3}","checked");
			
			// write File
			var uuid = new Date().getTime();
			var fileName = "gen_NSDF_" + uuid;
			rw.writeFileSync( pathHTML + fileName + ".html", t_txt ,"utf8");

			alertMsg.show(alertMsg.genReportOK );
			loadingscr.hide();
			
}

