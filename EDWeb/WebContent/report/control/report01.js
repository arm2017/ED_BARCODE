/**
 * dev by arm report 01 สร.120-11
 */
var report01 = angular.module('report01', []);

report01.controller('report01Ctrl', function($scope, $http) {
	console.log("report01");
	$scope.body = "body1";
	
	$scope.gridlist = [];
	var jstrmain = localStorage["mainItem"];
	 	 jstrmain = JSON.parse(jstrmain);
	$scope.gridlist = jstrmain;
	
	$scope.addrinfo = JSON.parse(  localStorage["addrinfo"] );
	
	var taxforpint = localStorage["taxforprint"];
	taxforpint = JSON.parse(taxforpint);
	$scope.taxforpint = taxforpint;
	
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
});