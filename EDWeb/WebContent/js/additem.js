/**
 * dev by arm
 */
var additemApp = angular.module('additemApp', []);

additemApp.controller('additemAppCrl', function($scope, $http) {
	console.log("additem.html");
	var jstr = localStorage["filterSearch"];
	var jitem = localStorage["item"];
	$scope.search = JSON.parse(jstr);
	var items = JSON.parse(jitem);
	$scope.selectItem = [];

	$scope.btnSearch = function() {
		console.log("btnSearch");
		$('#showSearchItem').modal('show');
		console.log(this);
		$scope.itemfilter = [];
		for(i in items ){
			var tmp = items[i];
			if(isNotEmpty(this.search.s0) ){
				console.log( "s0");
				if( tmp[0] !=  this.search.s0){
					continue;
				}
			} 
			if(isNotEmpty(this.search.s1) ){
				console.log( "s1");
				if( tmp[3] !=  this.search.s1){
					continue;
				}
			} 
			if(isNotEmpty(this.search.s2) ){
				console.log( "s2");
				if( tmp[5] !=  this.search.s2){
					continue;
				}
			} 

			if(isNotEmpty(this.search.s3) ){
				console.log( "s3");
				if( tmp[4] !=  this.search.s3){
					continue;
				}
			} 

				
			if(isNotEmpty(this.search.s4) ){
				console.log( "s4");
				if( tmp[1] !=  this.search.s4){
					continue;
				}
			} 
			
			if(isNotEmpty(this.search.s5) ){
				console.log( "s5");
				if( tmp[2] !=  this.search.s5){
					continue;
				}
			} 
			
//			add
			console.log("add > " + i);
			if(tmp.checkbox == true){
				tmp.checkbox = false;
			}
			$scope.itemfilter.push(tmp);
			
		}
	}

	function isNotEmpty( v ){
		return   v != undefined && v != ""  &&  v != "ทั้งหมด";
	}
	
	$scope.confirmSearch = function() {
		console.log("confirmSearch");
//		console.log($scope.itemfilter);
		for(var i in $scope.itemfilter){
			var tmp = $scope.itemfilter[i];
			if( tmp.checkbox == true && !checkDupHashKey(	$scope.selectItem,tmp.$$hashKey) ){
				$scope.selectItem.push( tmp );
			}
		}
		
		$('#showSearchItem').modal('hide');
	}
	
	$scope.btnRemove = function() {
	
		var pid = this.item.$$hashKey;
		var dIndex = -1;
		for( index in $scope.selectItem){
			if( $scope.selectItem[index].$$hashKey == pid){
				dIndex = index;
				break;
			}
		}
		if( dIndex != -1 && confirm("ยืนยันการลบ ?") ){
			console.log( this.item );
			$scope.selectItem.splice(dIndex, 1);
		}
	}
	function checkDupHashKey( objArray , haskey ){
			for( var i in objArray){
					if(objArray[i].$$hashKey == haskey)
						return true;
			}
			return false;
	}
	
	$scope.btnback = function() {
		 window.location = "pageone.html";
	}

	$scope.btnnext = function() {
		if($scope.selectItem.length == 0)
			return ;
//			save
			localStorage["addItem"] = JSON.stringify($scope.selectItem);
			window.location = "pageone.html";
	}
	

});