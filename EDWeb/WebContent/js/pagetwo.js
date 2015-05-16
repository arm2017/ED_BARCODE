/**
 * dev by arm
 */
var Pagetwo = angular.module('Pagetwo', []);

Pagetwo
		.controller('pagetwoCtrl',
				function($scope, $http) {
					console.log("Pagetwo");
					$scope.sumTax1 = parseFloat(localStorage["sumTax1"]);
					$scope.sumTax2 = parseFloat(localStorage["sumTax2"]);
					$scope.royalTax = 10;

					$scope.updateTax = function() {
						$scope.row7 = $scope.sumTax1 + $scope.sumTax2;
						$scope.row8 = 0;
						$scope.row9 = 0;
						$scope.row10 = $scope.row7;
						$scope.row11 = ($scope.row7 * $scope.royalTax) / 100;
						$scope.row12 = $scope.row10 + $scope.row11;
						$scope.row13 = 0;
						$scope.row14 = $scope.row12 + $scope.row13;

						var taxforPrint = [ $scope.sumTax1, $scope.sumTax2,
								$scope.row7, $scope.row8, $scope.row9,
								$scope.row10, $scope.row11, $scope.row12,
								$scope.row13, $scope.row14 ];
						localStorage["taxforprint"] = JSON.stringify(taxforPrint);
					}

					$scope.back = function() {
						window.location = "pageone.html";
					}

					$scope.next = function() {
						window.location = "pagethree.html";
					}

					/** **** util ********** */
					$scope.displayNumber = function(value, length) {
						if (typeof value == "string") {
							value = parseFloat(value);
						}
						return value.format(length);
					}

					Number.prototype.format = function(n, x, s, c) {
						var re = '\\d(?=(\\d{' + (x || 3) + '})+'
								+ (n > 0 ? '\\D' : '$') + ')', num = this
								.toFixed(Math.max(0, ~~n));

						return (c ? num.replace('.', c) : num).replace(
								new RegExp(re, 'g'), '$&' + (s || ','));
					};
					/** **** util ********** */
					/** **** init ********** */
					$scope.updateTax();
					/** **** init ********** */
				});