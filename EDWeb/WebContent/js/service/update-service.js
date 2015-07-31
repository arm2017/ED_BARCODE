/**
 * for update service
 */
var services = angular.module('update.service', []);
var path = require('path');
var execPath = path.dirname(process.execPath);

services.factory('SyncMasterDataRequest', function($http) {
	// service code
	console.log("$SyncMasterDataRequest.. install");

	this.updateData = function() {
		console.log("update");

		var fac = new SOAPConnectionFactory("http://161.246.3.242:8081/EDBarcodeWeb/ws/EDBarcodeService.wsdl");

		var msg = new SOAPMessage("", "http://www.excise.go.th/xsd/barcode");
		msg.setName("EbarcodeSyncMasterDataRequest");
		var InternetUser = new paramSOAPScop();
		InternetUser.setKey("InternetUser");
		var item = new paramSOAPItem();
		item.key = "CompanyId";
		item.value = "";
		InternetUser.addItem(item);
		msg.add(InternetUser);

		console.log(msg.getSOAP());

		fac.post($http, msg, undefined, function(xml, data) {
			if (data != null) {
				rw.writeFileSync(execPath + "\\gen-report\\update\\Response.txt", data, "utf8");
				alert("OK");
			} else {
				alert("error connection.....");
			}
		});

	}
	return this;
});

services.service('$SyncMasterDataRequest', function(SyncMasterDataRequest) {
	console.log("$SyncMasterDataRequest", SyncMasterDataRequest);
	this.updateData = function() {
		SyncMasterDataRequest.updateData();
	};

});