/**
 * dev by arm
 */
var Pagefour = angular.module('Pagefour', []);
var gui = require('nw.gui');

Pagefour.controller('pagefourCtrl', function($scope, $http) {
	console.log("Pagefour");
	var report001 = undefined;
	var report002 = undefined;
	var report003 = undefined;
	var report004 = undefined;

	$scope.back = function() {
		window.location = "pagethree.html";
	}

	$scope.report01 = function() {
		if (report001 != undefined) {
			report001.focus();
		} else {

			report001 = gui.Window.open('report/report01.html', {
				position : 'center',
				width : 950,
				height : 760
			});
			report001.on('closed', function() {
				report001 = undefined;
			  });
		}
	}
	$scope.report02 = function() {
		if (report002 != undefined) {
			report002.focus();
		} else {

			report002 = gui.Window.open('report/report02.html', {
				position : 'center',
				width : 800,
				height : 760
			});
			report002.on('closed', function() {
				report002 = undefined;
			  });
		}
	}
	$scope.report03 = function() {
		if (report003  != undefined) {
			report003.focus();
		} else {
			
			report003 = gui.Window.open('report/report03.html', {
				position : 'center',
				width : 800,
				height : 760
			});
			report003.on('closed', function() {
				report003 = undefined;
			});
		}
	}
	$scope.report04 = function() {
		if (report004 != undefined) {
			report004.focus();
		} else {
			
			report004 = gui.Window.open('report/report04.html', {
				position : 'center',
				width : 800,
				height : 760
			});
			report004.on('closed', function() {
				report004 = undefined;
			});
		}
	}

});