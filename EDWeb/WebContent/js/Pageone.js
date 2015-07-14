/**
 * dev by arm
 */
var Pageone = angular.module('Pageone', []);

Pageone.controller('pageoneCtrl',
		function($scope, $http) {
			console.log("Pageone.controller");

			$scope.sumTax1 = 0;
			$scope.sumTax2 = 0;

			$scope.addrinfo = JSON.parse(localStorage["addrinfo"]);
			var products = JSON.parse(localStorage["Products"]);

			$scope.updateinfo = {
				userid : "3-1015-1763-7",
				updateDate : "18/4/2015",
				version : "ED Barcod v 0.1 ",
			};

			$scope.grid = function() {
				console.log("grid");
				var jstr = localStorage["addItem"];
				var jstrmain = localStorage["mainItem"];
				var additem = JSON.parse(jstr);
				$scope.gridlist = JSON.parse(jstrmain);
				// $scope.gridlist = [];

				for ( var i in additem) {
					var tmp = {};
					var itm = additem[i];
					tmp["col3"] = itm[0];
					tmp["col4_1"] = itm[1];
					tmp["col4_2"] = itm[5];
					tmp["col4_3"] = itm[4];
					tmp["col4_4"] = 0;
					tmp["col4_5"] = 0;
					tmp["col4_61"] = itm[6];
					tmp["col4_62"] = itm[7];
					tmp["col5_1"] = 0;
					tmp["col5_2"] = 0;
					tmp["col5_3"] = 0;
					tmp["col5_4"] = 0;
					tmp["col6_1"] = 0;
					tmp["col6_2"] = 0;
					tmp["$$hashKey"] = new Date().getTime();
					// 10
					// 5|70|10|45|3
					tmp["tax1"] = itm[10];
					tmp["tax2"] = itm[11];
					tmp["tax3"] = itm[12];
					tmp["overdegree"] = itm[13];
					tmp["overdegreeTax"] = itm[14];

					$scope.gridlist.push(tmp);
				}
				localStorage["addItem"] = "[]";
				// save
				$scope.save();

			};
			$scope.save = function() {
				console.log("save");
				localStorage["mainItem"] = JSON.stringify($scope.gridlist);
			}

			$scope.updateRequest = function() {
				alert("อัพเดตล่าสุด");
			};

			$scope.updatechange = function() {
				var r = this.g;
				r.col4_5 = parseFloat(r.col4_3) * parseFloat(r.col4_4);
				// 5.1
				r.col5_1 = parseFloat(r.tax1) * parseFloat(r.col4_61) / 100;
				// 5.2
				var sum1 = parseFloat(r.col4_3) * parseFloat(r.col4_2)
						* parseFloat(r.tax2) / 100;
				var sum2 = parseFloat(r.col4_3) * parseFloat(r.tax3);
				r.col5_2 = sum1;
				if (sum1 < sum2) {
					r.col5_2 = sum2;
				}
				// console.log(sum1)
				// console.log(sum2)
				// 5.4
				r.col5_4 = parseFloat(r.col5_2) + parseFloat(r.col5_3);
				// 6.1
				r.col6_1 = r.col4_4 * r.col5_1;
				// 6.2
				r.col6_2 = r.col4_4 * r.col5_4;

				console.log(r);

				$scope.updateSumTax();
			};

			$scope.updateSumTax = function() {
				$scope.sumTax1 = 0;
				$scope.sumTax2 = 0;
				for ( var i in $scope.gridlist) {
					var r = $scope.gridlist[i];
					$scope.sumTax1 += parseFloat(r.col6_1);
					$scope.sumTax2 += parseFloat(r.col6_2);
				}
			}

			$scope.btnRemove = function() {
				var pid = this.g.$$hashKey;
				console.log("remove >" + pid);
				var dIndex = -1;
				for (index in $scope.gridlist) {
					if ($scope.gridlist[index].$$hashKey == pid) {
						dIndex = index;
						break;
					}
				}
				if (dIndex != -1 && confirm("ยืนยันการลบ ?")) {
					$scope.gridlist.splice(dIndex, 1);
					console.log("remove >" + dIndex);
					// save
					$scope.save();
					$scope.updateSumTax();
				}
			};

			$scope.addItem = function() {
				$scope.save();
				window.location = "additem.html";
			};

			$scope.displayNumber = function(value, length) {
				if (typeof value == "string") {
					value = parseFloat(value);
				}
				return value.format(length);
			}

			Number.prototype.format = function(n, x, s, c) {
				var re = '\\d(?=(\\d{' + (x || 3) + '})+'
						+ (n > 0 ? '\\D' : '$') + ')', num = this.toFixed(Math
						.max(0, ~~n));

				return (c ? num.replace('.', c) : num).replace(new RegExp(re,
						'g'), '$&' + (s || ','));
			};

			$scope.next = function() {
				localStorage["sumTax1"] = $scope.sumTax1;
				localStorage["sumTax2"] = $scope.sumTax2;
				$scope.save();
				window.location = "pagetwo.html?sum1=" + $scope.sumTax1
						+ "&sum2=" + $scope.sumTax2;
			}

			// select factory
			$scope.factoryList = [];
			var cs = (localStorage["currentProducts"] != undefined)? localStorage["currentProducts"] : "" ;
			$.each(products, function(_i, _r) {
				$scope.factoryList.push({
					LicenseName: _r["LicenseName"],
					LicenseNo: _r["LicenseNo"],
					isselected : (cs ==  _r["LicenseName"]) ? "selected" : ""
				});
			});
			console.log($scope.factoryList);
			
			
			/** *********** init**************** */
			/** *********** start up function**************** */
			$scope.grid();
			$scope.updateSumTax();
			/** *************************** */

		});

function factoryUpdate(v){
	v = $.trim(v);
	console.log(v);
	localStorage["currentProducts"] = v;
	window.location = "loadingDataScreen.html";
}

//A $( document ).ready() block.
$( document ).ready(function() {
	var v = localStorage["currentProducts"] ;
    console.log( "ready!" + v );
    $("#factoryList").val(v);
    // input number only
    $("input[type='text']").numeric()
});