$(function() {
	// gobal obj
	console.log("install suratable");
	var currentSuratable;
	jQuery.prototype.suratable = function() {
		var instance = this;
		if (currentSuratable != undefined) {
			return currentSuratable;
		}

		var tbody = this.children("tbody").length;
		if (tbody == 0) {
			throw new Error("ไม่เจอ tbody");
		}
		console.log("tbody");
		// varible
		this.records = new Array();
		console.log("records : " + this.records.length);

		this.add = function(jsonObj) {
			jsonObj = JSON.parse( jsonObj.escapeSpecialChars() );
			var column = jsonObj.row.length;
			console.log("column : " + column);
			var hidden = jsonObj.hidden.length;
			console.log("hidden : " + hidden);

			this.records.push(jsonObj);
			console.log("records : " + this.records.length);
		}

		this.remove = function(index) {
			this.records.splice(index,1);			
		}

		this.domUpdate = function() {
//			clear html
			currentSuratable.children("tbody").html('');
			
			var inputRow5 = "<input type=\"text\" index=\"$index\" row=\"5\" class=\"form-control userinput\" style=\"width: 80px;\" placeholder=\"\" value=\"$value\">";
			var inputRow7 = "<input type=\"text\" index=\"$index\"  row=\"7\"  class=\"form-control userinput\" style=\"width: 80px;\" placeholder=\"\" value=\"$value\">";
			var inputRow8 = "<input type=\"text\" index=\"$index\"  row=\"8\"  class=\"form-control userinput\" style=\"width: 80px;\" placeholder=\"\" value=\"$value\">";
			
			var html = [];
			var numberStyle = " style=\"text-align: right;\" ";
			var btndel = "<button type=\"button\" value=\"$index\"  class=\"btn btn-default btn-xs btnmaingriddelete\">   <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span> ลบ  </button>";
			for (var i = 0; i < this.records.length; i++) {
				var str = "";
				var r = this.records[i];
				r.row[0] = i + 1;
				str = str.concat("<tr>")
						.concat("<td>").concat( r.row[0] ).concat("</td>")
							.concat("<td>").concat( r.row[1] ).concat("</td>")
							.concat("<td>").concat( r.row[2] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[3] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[4] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( inputRow5.replace("$index" , i ).replace("$value", r.row[5] ) ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[6].format(4) ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( inputRow7.replace("$index" , i ).replace("$value", r.row[7] )  ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( inputRow8.replace("$index" , i ).replace("$value", r.row[8] )  ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[9].format(4) ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[10].format(4) ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[11].format(4) ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[12].format(4) ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[13].format(4) ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[14].format(4) ).concat("</td>")
							.concat("<td>").concat( btndel.replace("$index" , i ) ).concat("</td>")
						.concat("</tr>")	;
				
//				console.log( str );
				html.push( str );
			}
			
			//update
			for( h in html ){
				instance.append(html[h]);
			}
			
			//add event
			$(".userinput").change(function( obj ) {
				
//				  console.log(obj.currentTarget.attributes["index"].value + " > "  + obj.currentTarget.attributes["row"].value + " : " + obj.currentTarget.value  );
				 var index = obj.currentTarget.attributes["index"].value;	
				 var rowIndex = obj.currentTarget.attributes["row"].value;
				 var v = obj.currentTarget.value;
				 console.log( index + " > " + rowIndex + " = " + v) ;
				 instance.records[parseInt(index)].row[parseInt(rowIndex)] = parseFloat(v);
				 instance.calc( instance.records[parseInt(index)] );
				 
				 instance.domUpdate();
				 instance.calcsum();
			});
			
			//click btn delete
			$(".btnmaingriddelete").click(function(){
				if( confirm(" ยืนยันการลบ ?")){
					var btnValue = this.attributes["value"].value;
					console.log( btnValue  );
					currentSuratable.remove(btnValue);
					currentSuratable.domUpdate();
					console.log("$(.btnmaingriddelete).click");
					localStorage["MainGrid"] = JSON.stringify( currentSuratable.records );
					console.log("update : currentSuratable.records ");
				}
			});
		}
		
		this.calc = function( rowObj  ){
			console.log( "calc ");
			console.log(rowObj);
			var row6 = parseFloat(rowObj.row[5] ) * parseFloat(rowObj.row[4] );
			rowObj.row[6] = row6;
			console.log("rowObj[6].row " + rowObj.row[6]);
			var row7oRrow8 = rowObj.row[7];
			//อัตราภาษีตามมูลค่า
			var surarate =  rowObj.hidden[10];
			var row9 = (parseFloat(row7oRrow8) * parseFloat(surarate) ) / 100;
			rowObj.row[9] = parseFloat(row9);
			console.log("rowObj[6].row " + rowObj.row[9]);
			
			//อันตราภาษีตามปริมาณ 2
//			1.ต่อแอลกอฮอลบริสุท
			var v1 =  rowObj.hidden[11];
			var v2_1 =  parseFloat(rowObj.row[4] ) *  parseFloat(rowObj.row[3] ) * v1 / 100;
			console.log("1.ต่อแอลกอฮอลบริสุท =" +v2_1 );
//			2.ต่อลิตร
			var v2 = rowObj.hidden[12];
			var v2_2 = parseFloat(rowObj.row[4] ) * v2; 
			console.log("2.ต่อลิตร =" +v2_2 );
			
			var row10 = ( v2_1 > v2)? v2_1 : v2_2;
			rowObj.row[10] = parseFloat(row10);
			
			//ดีกรีเกิน
			var row12 = parseFloat(rowObj.row[10] ) + parseFloat(rowObj.row[11] ) ;
			rowObj.row[12] =row12;
			
			//รวม
			var row13 =  parseFloat(rowObj.row[5] ) * parseFloat(rowObj.row[9] ) ;
			rowObj.row[13] =row13;
			
			var row14 =  parseFloat(rowObj.row[5] ) * parseFloat(rowObj.row[12] ) ;
			rowObj.row[14] =row14;
				
		};
		
		this.calcsum = function(){
			var rs =  instance.records;
			var sum13 = 0;
			var sum14 = 0;
			for( var index in rs ){
				var r = rs[index].row;
				sum13 += r[13];
				sum14 += r[14];
			}
			
			
			console.log( "sum13 =" +  sum13);
			console.log( "sum14 =" +  sum14);
			
			$("#sum13").val(sum13.format(4));
			$("#sum14").val(sum14.format(4));
		}

		this.save = function (){
				if( this.records.length > 0 ){
					console.log( "save........." );
					localStorage["MainGrid"] = JSON.stringify( this.records );
				}
		};
		
		currentSuratable = this;
		return this;
	}
	
	console.log("install escapeSpecialChars");
	String.prototype.escapeSpecialChars = function() {
	    return this.replace(/\\n/g, "")
	               .replace(/\\r/g, "")
	               .replace(/\\t/g, "")
	               .replace(/\\b/g, "")
	               .replace(/\\f/g, "")
	               .replace(/[\u0000-\u0019]+/g,"")
	               .replace(/[\uFEFF]+/g,"")
	               ;
	};
	
	console.log("install Number.prototype.format");
	Number.prototype.format = function(n, x, s, c) {
	    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
	        num = this.toFixed(Math.max(0, ~~n));

	    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	};
	

	//init maintable data
	function initmaintable(){
		var json = localStorage["additms"];
		var additmsobj = JSON.parse( json );
		console.log(additmsobj);
		if( additmsobj.length == 0){
			return ;
		}
		
		console.log( "convert data ...");
		var temp = [];
		for( index in additmsobj ){
			console.log(index);
			var item  = additmsobj[index];
			var row = {};
			row["row"] = [];
			row["row"][0] = index;
			row["row"][1] = item.data[0];
			row["row"][2] = item.data[1];
			row["row"][3] = item.data[5];
			row["row"][4] = item.data[4];
			row["row"][5] = 0;
			row["row"][6] = 0;
			row["row"][7] = parseFloat( item.data[6]);
			row["row"][8] =  parseFloat( item.data[7]);
			row["row"][9] = 0;
			row["row"][10] = 0;
			row["row"][11] = 0;
			row["row"][12] = 0;
			row["row"][13] = 0;
			row["row"][14] = 0;
			row["row"][15] = 0;
			
			row["hidden"] = item.data;
			
			console.log( row );
			temp.push( row );
		}
		//find olddata
		var mgjson = localStorage["MainGrid"] ;
		var mgobj = JSON.parse( mgjson );
		if( mgobj.length > 0 ){
			console.log( "find old data ");
			for(var index in temp ){
				mgobj.push( temp[index ] );
			}
		}else{
			mgobj = temp;
		}
		localStorage["MainGrid"] = JSON.stringify( mgobj );
		//clear
		localStorage["additms"] = "[]";

	}; //end
	
	function maingridshow(){
		var mgjson = localStorage["MainGrid"] ;
		var mgobj = JSON.parse( mgjson );
		for(index in mgobj){
			$("#myGrid").suratable().add( JSON.stringify(mgobj[index]) );
		}
		$("#myGrid").suratable().domUpdate();
		$("#myGrid").suratable().calcsum();
	}
	
	initmaintable();
	maingridshow();
	

});


function moc(){
	s = "{\"row\": [0,\"สุราแช่อื่นๆ\",\"full moon\",0,1,2,3,4,5,6,7,8,9,10,11,12],\"hidden\": [\"A4f\",\"A3d\"]}";
	$("#myGrid").suratable().add( s );
	$("#myGrid").suratable().add( s );
	$("#myGrid").suratable().domUpdate();
}
// row prototype
/*
 * { "row": [0, "สุราแช่อื่นๆ", "full moon", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
 * 11, 12], "hidden": ["A4f", "A3d"] }
 */
