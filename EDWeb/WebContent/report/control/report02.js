/**
 * dev by arm report 02 กกท
 */
var report01 = angular.module('report02', []);

report01.controller('report02Ctrl', function($scope, $http) {
	console.log("report02Ctrl");
	$scope.tbody = [];
	$scope.addrinfo = JSON.parse(  localStorage["addrinfo"] );
	var taxforpint = localStorage["taxforprint"];
	taxforpint = JSON.parse(taxforpint);
	$scope.taxforpint = taxforpint;
	console.log($scope.taxforpint);
	
	
	$scope.updateTax = function() {
		var taxrate = 0.02;
		var rowmoney = parseFloat( $scope.taxforpint[9]);
		var tax = rowmoney * taxrate;
		
		rowmoney = $scope.displayNumber(rowmoney,2);
		tax =  $scope.displayNumber(tax , 2 );
		
		rowmoney = rowmoney.split(".");
		tax  = tax.split(".");
		
		var row1 = {
				baht : rowmoney[0],
				stang : rowmoney[1],
				taxbath : 	tax[0],
				taxstang : tax[1]
		};
		
		$scope.tbody.push(row1);
		$scope.tbody.push({});
		$scope.tbody.push({});
		$scope.tbody.push({});
	}
	
	
	
	$scope.displayNumber = function ( value , length ){
		if( typeof value == "string"){
			value = parseFloat(value);
		}
		return value.format(length);
	}
	
	Number.prototype.format = function(n, x, s, c) {
		var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
		num = this.toFixed(Math.max(0, ~~n));
		
		return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	};
	
/***	init method***/
	$scope.updateTax();
});