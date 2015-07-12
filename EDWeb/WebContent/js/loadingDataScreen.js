/**
 * dev by arm
 */
var loadingApp = angular.module('loadingApp', []);
var rw = require('rw');
String.prototype.escapeSpecialChars = function() {
	return this.replace(/\\n/g, "").replace(/\\r/g, "").replace(/\\t/g, "")
			.replace(/\\b/g, "").replace(/\\f/g, "").replace(
					/[\u0000-\u0019]+/g, "").replace(/[\uFEFF]+/g, "");
};
loadingApp.controller('loadingCrl', function($scope, $http) {
	console.log("loadingCrl");
	var contents = rw.readFileSync("userdata/proudcts.cfg", "utf8");
	var lines = contents.split("\n");
	console.log("lines > " + lines.length);

	var item = [];
	var s = [];
	for (var i = 0; i < 6; i++) {
		s[i] = [];
	}
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
	// save
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

	// addr
	var addrinfo = {
		username : " บริษัท สยามไวเนอรี่ จำกัด",
		factoryName : " บริษัท สยามไวเนอรี่ จำกัด 1",
		licence : "2558/70605817600002",
		idNumber : "3-1015-1763-7",
		licenceDate : "01/01/2558-31/12/2558",
		addr : "9/2 หมู่ 3 ต.บางโทรัด อ.เมืองสมุทรสาคร จ.สมุทรสาคร 74000"
	};

	localStorage["addrinfo"] = JSON.stringify(addrinfo);

});