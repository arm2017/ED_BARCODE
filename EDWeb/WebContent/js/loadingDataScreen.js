/**
 * dev by arm
 */
var loadingApp = angular.module('loadingApp', []);
var rw = require('rw');
var gui = require('nw.gui');

String.prototype.escapeSpecialChars = function() {
	return this.replace(/\\n/g, "").replace(/\\r/g, "").replace(/\\t/g, "")
			.replace(/\\b/g, "").replace(/\\f/g, "").replace(
					/[\u0000-\u0019]+/g, "").replace(/[\uFEFF]+/g, "");
};
String.prototype.toTHDate = function() {
	// "20150115"
	str = this.substr(6, 2) + "/" + this.substr(4, 2) + "/" + this.substr(0, 4);
	return str;
};

function ParserXml(textXml) {
	var xmlDoc;
	if (window.DOMParser) {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(textXml, "text/xml");
	} else // code for IE
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.loadXML(textXml);
	}
	console.log(xmlDoc);

	this.getByTagName = function(strName, index) {
		var str = "";
		if (xmlDoc.getElementsByTagName(strName).length > 0
				&& index === undefined) {
			if (xmlDoc.getElementsByTagName(strName)[0].childNodes.length == 1) {
				str = xmlDoc.getElementsByTagName(strName)[0].childNodes[0].nodeValue;
			} else {
				if (xmlDoc.getElementsByTagName(strName)[0].childNodes.length == 0) {
					console.log("empty Value " + strName);
				} else {
					console.log("it root xml tag, Node > 1 :  " + strName);
				}
			}
		} else if (xmlDoc.getElementsByTagName(strName).length > 0
				&& index < xmlDoc.getElementsByTagName(strName).length) {
			if (xmlDoc.getElementsByTagName(strName)[index].childNodes.length == 1) {
				str = xmlDoc.getElementsByTagName(strName)[index].childNodes[0].nodeValue;
			} else {
				if (xmlDoc.getElementsByTagName(strName)[index].childNodes.length == 0) {
					// console.log("empty Value " + strName);
				} else {
					console.log("it root xml tag, Node > 1 :  " + strName);
				}
			}
		}
		return str;
	};

	this.getVal = function(tagName, index) {
		return this.getByTagName(tagName, index);
	}

	this.getSize = function(strName) {
		var size = 0;
		size = xmlDoc.getElementsByTagName(strName).length;
		return size;
	};

	this.countChild = function(tagName, index) {
		return xmlDoc.getElementsByTagName("GoodsList")[index].children.length;
	};
}

loadingApp.controller('loadingCrl', function($scope, $http) {
	console.log("loadingCrl");
	var contents = rw.readFileSync("userdata/proudcts.cfg", "utf8");
	var Response = rw.readFileSync("userdata/Response.txt", "utf8");
	$xmlService = new ParserXml(Response);

	var lines = contents.split("\n");
	console.log("lines > " + lines.length);

	// xml data
	var countGoodsList = $xmlService.getSize("GoodsList");
	console.log("GoodsList:" + countGoodsList);
	var loopCount = 0;
	var Products = [];
	for (var i = 0; i < countGoodsList; i++) {
		var c = $xmlService.countChild("GoodsList", i);
		var Product = {};
		Product["LicenseName"] = $xmlService.getVal("LicenseName", i);
		Product["LicenseNo"] = $xmlService.getVal("LicenseNo", i);
		Product["EffectiveDate"] = $xmlService.getVal("EffectiveDate", i);
		Product["ExpireDate"] = $xmlService.getVal("ExpireDate", i);
		Product["LicBook"] = $xmlService.getVal("LicBook", i);
		Product["item"] = [];
		Product["GenCode"] = [];
		console.log("GoodsList[" + i + "]=" + c);
		for (var j = loopCount; j < c + loopCount; j++) {
			var n = $xmlService.getVal("GoodsDescriptionText", j);
			var code = $xmlService.getVal("GoodsCode", j);
			Product["item"].push(code);
			// console.log(j + ">" + n);
			// เบียร์|ลีโอ|-|test|0.625|5|38|0|กระป๋อง|007|48|155|8|7|3
			var strItem = "";
			strItem = strItem
					.concat(
							$.trim($xmlService.getVal(
									"ProductTypeDescriptionText", j))).concat(
							"|");
			strItem = strItem.concat(
					$.trim($xmlService.getVal("GoodsDescriptionText", j)))
					.concat("|");
			strItem = strItem
					.concat($.trim($xmlService.getVal("BrandName", j))).concat(
							"|");
			strItem = strItem.concat(
					$.trim($xmlService.getVal("SubbrandName", j))).concat("|");
			strItem = strItem
					.concat($.trim($xmlService.getVal("GoodsSize", j))).concat(
							"|");
			strItem = strItem.concat($.trim($xmlService.getVal("Degree", j)))
					.concat("|");
			
			var goodsprice =$.trim($xmlService.getVal("GoodsPrice", j));
			goodsprice = parseFloat(goodsprice).toFixed(4);
			strItem = strItem.concat(
					$.trim(goodsprice)).concat("|");

			var dePrice = ($xmlService.getVal("DeclarePrice", j) == "") ? "0.0000"
					: $xmlService.getVal("DeclarePrice", j);
			strItem = strItem.concat($.trim(dePrice)).concat("|");
			
			strItem = strItem.concat(
					$.trim($xmlService
							.getVal("GoodsSizeUnitDescriptionText", j)))
					.concat("|");
			strItem = strItem.concat(
					$.trim($xmlService.getVal("ProductTypeCode", j))).concat(
					"|");
			strItem = strItem.concat(
					$.trim($xmlService.getVal("TaxRateByPriceAmount", j)))
					.concat("|");
			strItem = strItem.concat(
					$.trim($xmlService.getVal("TaxRateByQuantityAmount", j)))
					.concat("|");
			strItem = strItem
					.concat($.trim($xmlService.getVal("DegreeMin", j))).concat(
							"|");
			strItem = strItem.concat($.trim($xmlService.getVal(
					"RateDegreeOver", j)));
			console.log(strItem);
			Product["GenCode"].push(strItem);
		}
		console.log("------------");
		loopCount = c;
		Products.push(Product);
	}

	console.log("Products");
	console.log(Products);
	// load address
	// "9/2 หมู่ 3 ต.บางโทรัด อ.เมืองสมุทรสาคร จ.สมุทรสาคร 74000"
	var addressFactory = "";
	// 0
	var HouseIdNumber = $xmlService.getVal("HouseIdNumber");
	var BuildingName = $xmlService.getVal("BuildingName");
	var RoomNumber = $xmlService.getVal("RoomNumber");
	var FloorNumber = $xmlService.getVal("FloorNumber");
	var VillageName = $xmlService.getVal("VillageName");

	if (HouseIdNumber != "") {
		addressFactory += " " + HouseIdNumber;
	}
	if (BuildingName != "") {
		addressFactory += " " + BuildingName;
	}
	if (RoomNumber != "") {
		addressFactory += " " + RoomNumber;
	}
	if (FloorNumber != "") {
		addressFactory += " " + FloorNumber;
	}
	if (VillageName != "") {
		addressFactory += " " + VillageName;
	}
	// 1
	var HouseNumber = $xmlService.getVal("HouseNumber");
	var MooNumber = $xmlService.getVal("MooNumber");
	var TrokSoiName = $xmlService.getVal("TrokSoiName");
	TrokSoiName = (TrokSoiName == "-") ? "" : TrokSoiName;
	var StreetName = $xmlService.getVal("StreetName");
	StreetName = (StreetName == "-") ? "" : StreetName;

	addressFactory += HouseNumber + " หมู่ " + MooNumber;
	if (TrokSoiName != "") {
		addressFactory += " " + TrokSoiName;
	}
	if (StreetName != "") {
		addressFactory += " " + StreetName;
	}
	// 2
	var ThambolName = $xmlService.getVal("ThambolName");
	var AmphurName = $xmlService.getVal("AmphurName");
	var ProvinceName = $xmlService.getVal("ProvinceName");
	var Postcode = $xmlService.getVal("Postcode");
	var TelNumber = $xmlService.getVal("TelNumber");

	addressFactory += " ต. " + ThambolName + " อ. " + AmphurName + " จ. "
			+ ProvinceName + " " + Postcode;
	if (TelNumber != "") {
		addressFactory += " (" + TelNumber + ")";
	}

	console.log(addressFactory);
	// -----------------------------------------
	var cProducts = localStorage["currentProducts"];
	var indexProduct = 0;
	if (cProducts != undefined) {
		$.each(Products, function(_i, _r) {
			if (_r["LicenseName"] == cProducts) {
				indexProduct = _i;
				console.log("finde : " + cProducts);
			}
		});
	} else {
		console.log("not finde : " + cProducts);
		localStorage["currentProducts"] = Products[0]["LicenseName"];
	}

	var currentProducts = Products[indexProduct];
	factoryName = $xmlService.getVal("CompanyName");
	licenceNumber = currentProducts["LicBook"] + "/"
			+ currentProducts["LicenseNo"];
	licenceDate = currentProducts["EffectiveDate"].toTHDate() + " - "
			+ currentProducts["ExpireDate"].toTHDate();
	// -----------------------------------------
	// make list item and filter
	var item = [];
	var s = [ [], [], [], [], [], [] ];

	lines = Products[indexProduct]["GenCode"];
	for (i in lines) {
		var lineItem = lines[i].split("|");
		item.push(lineItem);
		s[0].push(lineItem[0]);
		s[1].push(lineItem[3]);
		s[2].push(lineItem[5]);
		s[3].push(lineItem[4]);
		s[4].push(lineItem[1]);
		s[5].push(lineItem[2]);
	}

	// console.log(s);
	console.log("item > " + item.length);
	// console.log(item);
	// filter
	for (var i = 0; i < 6; i++) {
		var tmp = [ "ทั้งหมด" ];
		new Set(s[i]).forEach(function(v1, v2) {
			// console.log(v1);
			tmp.push(v1);
		});

		s[i] = tmp;
	}

	// -------------- save ---------------------------
	localStorage["filterSearch"] = JSON.stringify(s);
	localStorage["item"] = JSON.stringify(item);
	localStorage["mainItem"] = JSON.stringify([]);
	var lcItem = localStorage["item"];
	if (lcItem == undefined) {
		localStorage["item"] = JSON.stringify([]);
	}
	if (localStorage["addItem"] == undefined) {
		localStorage["addItem"] = JSON.stringify([]);
	}

	localStorage["Products"] = JSON.stringify(Products);

	// addr
	var addrinfo = {
		username : $xmlService.getVal("CompanyName"),
		factoryName : factoryName,
		licence : licenceNumber,
		idNumber : $xmlService.getVal("CompanyId"),
		licenceDate : licenceDate,
		addr : addressFactory
	};

	localStorage["addrinfo"] = JSON.stringify(addrinfo);

	// go home page
	setTimeout(function() {
		window.location = "pageone.html";
	}, 1000);

	// onclose***********************************************************************************
	var w = gui.Window.get();
	console.log("win " + w.listeners("close").length);
	if (w.listeners("close").length == 0) {
		gui.Window.get().on('close', function() {
			// If the new window is still open then close it.
			console.log("ออกจากโปรแกรม");
			if (confirm("ออกจากโปรแกรม"))
				this.close(true);

		});
	}
});