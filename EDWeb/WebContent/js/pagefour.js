/**
 * dev by arm
 */
var Pagefour = angular.module('Pagefour', []);
var gui = require('nw.gui');
var path = require('path');
var cmd = require("cmd-exec").init();

Pagefour.controller('pagefourCtrl', function($scope, $http, $timeout) {
	console.log("Pagefour");
	var report001 = undefined;
	var report002 = undefined;
	var report003 = undefined;
	var report004 = undefined;

	// report preview
	$scope.isPreview = false;
	$scope.previewDisable = false;
	$scope.progressbarloading = false;

	$scope.dirPath = process.cwd();
	$scope.execPath = path.dirname(process.execPath);
	console.log($scope.dirPath, $scope.execPath);

	$scope.clickPreview = function() {
		// $scope.isPreview = true;
		$scope.previewDisable = true;
		$scope.progressbarloading = true;

		console.log("clickPreview" + $scope.isPreview);

		cmd.baseDir = $scope.cmdpath = $scope.execPath + "\\gen-report\\";
		console.log("baseDir", cmd.baseDir);

		var isError = false;
		cmd.exec("call run_report.bat").then(function(res) {
			console.log(res.message);
		}).fail(function(err) {
			console.log(err.message);
			isError = true;
			alert("cmd Error : " + err.message);

		}).done(function() {
			$timeout(function() {
				if (isError) {
					$scope.isPreview = false;
					$scope.previewDisable = false;
				} else {
					$scope.isPreview = true;
				}

				$scope.progressbarloading = false;

				console.log("done !!", isError);
			}, 100);
		});

	}

	$scope.back = function() {
		window.location = "pagethree.html";
	}

	$scope.report01 = function() {
		report001 = gui.Shell.openItem($scope.cmdpath + "pdf\\SR120-11.pdf");
	}

	$scope.report02 = function() {
		report002 = gui.Shell.openItem($scope.cmdpath + "pdf\\KKT1_01.pdf");
	}
	$scope.report03 = function() {
		report003 = gui.Shell.openItem($scope.cmdpath + "pdf\\SST1_01.pdf");
	}
	$scope.report04 = function() {
		report004 = gui.Shell.openItem($scope.cmdpath + "pdf\\SSS1_01.pdf");
	}

	$scope.saveTo = function() {

		console.log("saveto", $scope.hddpath);
		chooseFile("#savetohdd");
	}

	function chooseFile(name) {
		var chooser = document.querySelector(name);
		chooser.addEventListener("change", function(evt) {
			console.log(this.value);
			var v = this.value;
			$timeout(function() {
				$scope.hddpath = v;
			});
		}, false);

		chooser.click();
	}

});
