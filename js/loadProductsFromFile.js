$(function() {
	console.log("install loadProductFromFile");
	var rw = require('rw');
	jQuery.loadProductFromFile = function() {
		try {

			var contents = rw.readFileSync("userdata/proudcts.cfg", "utf8");
			console.log(contents);
			var lines = contents.split("\n");

			var lineItems = [];
			// search criteria
			this.suraType = new Set();
			this.mainModel = new Set();
			this.subModel = new Set();
			this.modelType = new Set();
			this.degree = new Set();
			this.size = new Set();
			//----
			for (index in lines) {
				var datas = lines[index].split("|");
//				console.log(datas);
				
				this.suraType.add( datas[0]);
				this.mainModel.add( datas[1]);
				this.subModel.add( datas[2]);
				this.modelType.add( datas[3]);
				this.size.add( datas[4]);
				this.degree.add( datas[5]);
				
				lineItems.push(datas);
			}

			console.log("items : " + lineItems.length);
			var jsonstr = JSON.stringify(lineItems);
			localStorage["products"] = jsonstr;
			
			// search criteria json
			var tmp = [];
			for (item of this.suraType.values()) tmp.push(item);
			jsonstr = JSON.stringify(tmp);
			localStorage["suraType"] = jsonstr;
			console.log(jsonstr);
			
			tmp = [];
			for (item of this.mainModel.values()) tmp.push(item);
			jsonstr = JSON.stringify(tmp);
			localStorage["mainModel"] = jsonstr;
			console.log(jsonstr);
			
			tmp = [];
			for (item of this.subModel.values()) tmp.push(item);
			jsonstr = JSON.stringify(tmp);
			localStorage["subModel"] = jsonstr;
			console.log(jsonstr);
			
			tmp = [];
			for (item of this.modelType.values()) tmp.push(item);
			jsonstr = JSON.stringify(tmp);
			localStorage["modelType"] = jsonstr;
			console.log(jsonstr);
			
			tmp = [];
			for (item of this.size.values()) tmp.push(item);
			jsonstr = JSON.stringify(tmp);
			localStorage["size"] = jsonstr;
			console.log(jsonstr);
			
			tmp = [];
			for (item of this.degree.values()) tmp.push(item);
			jsonstr = JSON.stringify(tmp);
			localStorage["degree"] = jsonstr;
			console.log(jsonstr);

		} catch (err) {
			alert("loadProductFromFile " + err);
		}

//		return this;
	}

});
