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
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[6] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( inputRow7.replace("$index" , i ).replace("$value", r.row[7] )  ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( inputRow8.replace("$index" , i ).replace("$value", r.row[8] )  ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[9] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[10] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[11] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[12] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[13] ).concat("</td>")
							.concat("<td").concat(numberStyle).concat(">").concat( r.row[14] ).concat("</td>")
							.concat("<td></td>")
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
				  
			});
		}

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
