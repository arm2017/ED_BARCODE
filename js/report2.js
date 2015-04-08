function getReport_ThaiHealthTempate(){
	var contents = rw.readFileSync("report/Report_ThaiHealth.html", "utf8");
			return contents;
}

function Report_ThaiHealth () {

			loadingscr.show();
			log('generate report Report_ThaiHealth');

			var t_txt = getReport_ThaiHealthTempate();

			var jsonsyncMasterDataRequest = localStorage['syncMasterDataRequest'];
			var syncMasterDataRequest = JSON.parse(jsonsyncMasterDataRequest);
			var addr = syncMasterDataRequest.entrepreneur;

			t_txt = t_txt.replace("{a}","สำนักกฏหมาย กรมสรรพสารมิต");
			t_txt = t_txt.replace("{b}","ส่วนพิสูจน์และจัดการของกลาง");
			t_txt = t_txt.replace("{c}","เลขที่ 1488");
			t_txt = t_txt.replace("{d}","-");
			t_txt = t_txt.replace("{e}","-");
			t_txt = t_txt.replace("{f}","นครไชยศรี");
			t_txt = t_txt.replace("{g}","ถนนนครไชยศรี");
			t_txt = t_txt.replace("{h}","ดุสิต");
			t_txt = t_txt.replace("{i}","กรุงเทพมหานคร");
			t_txt = t_txt.replace("{j}","10300");
			t_txt = t_txt.replace("{k}","0-2241-5600 ต่อ 51518");
			t_txt = t_txt.replace("{l}","-");
			
			t_txt = t_txt.replace("{m}","43,175");
			t_txt = t_txt.replace("{n}","-");
			t_txt = t_txt.replace("{o}","863");
			t_txt = t_txt.replace("{p}","50");
			t_txt = t_txt.replace("{q}","863");
			t_txt = t_txt.replace("{r}","50");
			t_txt = t_txt.replace("{s}","863");
			t_txt = t_txt.replace("{t}","50");
			t_txt = t_txt.replace("{u}","863");
			t_txt = t_txt.replace("{v}","50");
			t_txt = t_txt.replace("{w}","(แปดร้อยหกสิบบาทห้าสิบสตางค์)");
			t_txt = t_txt.replace("{x}","863.50");
			
			
			t_txt = t_txt.replace("{checkbox3}","checked");
			
			// write File
			var uuid = new Date().getTime();
			var fileName = "gen_ThaiHealth_" + uuid;
			rw.writeFileSync( pathHTML + fileName + ".html", t_txt ,"utf8");

			alertMsg.show(alertMsg.genReportOK );
			loadingscr.hide();

}

