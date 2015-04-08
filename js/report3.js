function getReport_ThaiPBSTempate(){
	var contents = rw.readFileSync("report/Report_ThaiPBS.html", "utf8");
			return contents;
}

function Report_ThaiPBS () {

			loadingscr.show();
			log('generate report Report_ThaiPBS');

			var t_txt = getReport_ThaiPBSTempate();

			var jsonsyncMasterDataRequest = localStorage['syncMasterDataRequest'];
			var syncMasterDataRequest = JSON.parse(jsonsyncMasterDataRequest);
			var addr = syncMasterDataRequest.entrepreneur;

			t_txt = t_txt.replace("{sst1}","สำนักกฏหมาย กรมสรรพสารมิต");
			t_txt = t_txt.replace("{sst2}","ส่วนพิสูจน์และจัดการของกลาง");
			t_txt = t_txt.replace("{sst3}","เลขที่ 1488");
			t_txt = t_txt.replace("{sst4}","-");
			t_txt = t_txt.replace("{sst5}","-");
			t_txt = t_txt.replace("{sst6}","นครไชยศรี");
			t_txt = t_txt.replace("{sst7}","ถนนนครไชยศรี");
			t_txt = t_txt.replace("{sst8}","ดุสิต");
			t_txt = t_txt.replace("{sst9}","กรุงเทพมหานคร");
			t_txt = t_txt.replace("{sst10}","10300");
			t_txt = t_txt.replace("{sst11}","0-2241-5600 ต่อ 51518");
			t_txt = t_txt.replace("{sst12}","-");
			
			t_txt = t_txt.replace("{sst13}","43,175");
			t_txt = t_txt.replace("{sst14}","-");
			t_txt = t_txt.replace("{sst15}","647");
			t_txt = t_txt.replace("{sst16}","63");
			t_txt = t_txt.replace("{sst17}","647");
			t_txt = t_txt.replace("{sst18}","63");
			t_txt = t_txt.replace("{sst19}","647");
			t_txt = t_txt.replace("{sst20}","63");
			t_txt = t_txt.replace("{sst21}","647");
			t_txt = t_txt.replace("{sst22}","63");
			t_txt = t_txt.replace("{sst23}","(หกร้อยสี่สิบเจ็ดบาทหกสิบสามสตางค์)");
			t_txt = t_txt.replace("{sst24}","647.63");
			
			
			t_txt = t_txt.replace("{checkbox3}","checked");
			
			// write File
			var uuid = new Date().getTime();
			var fileName = "gen_ThaiPBS_" + uuid;
			rw.writeFileSync( pathHTML + fileName + ".html", t_txt ,"utf8");

			alertMsg.show(alertMsg.genReportOK );
			loadingscr.hide();
}

