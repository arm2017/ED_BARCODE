/**
 * dev by arm
 */
var Pagethree = angular.module('Pagethree', []);

Pagethree.controller('pagethreeCtrl', function($scope, $http) {
	console.log("Pagethree");

	$scope.back = function() {
		window.location = "pagetwo.html";
	}

	$scope.next = function() {
		window.location = "pagefour.html";
	}
});