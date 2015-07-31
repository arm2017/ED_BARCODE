/**
 * by arm
 */
var targetNamespace = "tns";

function SOAPConnectionFactory(urlWSDL) {
	this.urlTarget = "";
	if (urlWSDL != undefined) {
		this.urlTarget = urlWSDL.replace(".wsdl", "/").replace(".WSDL", "/");
	}
	var req = {
		method : 'POST',
		url : this.urlTarget,
		headers : {
			"Content-Type" : "text/xml;charset=UTF-8",
		},
		data : ""
	}

	this.post = function($http, _SOAPMessage, url , callbackfn ) {
		// header
		req.url = url;
		if (url == undefined) {
			req.url = this.urlTarget;
		}
		req.data = _SOAPMessage.getSOAP();
		// end header
		$http(req).success(function(data, status, headers, config) {
			console.log("success " ,status);
			var xml = new ParserXml(data);
			var msg = SOAPMessage(xml);
			if(callbackfn != undefined ){
				callbackfn(msg,data);
			}
		}).error(function(data, status, headers, config) {
			console.log("ERROR :", data, status);
			if(callbackfn != undefined ){
				callbackfn("",data);
			}
		});
	};
}

function SOAPMessage(_xmlSOAP, namespaceUrl) {
	var namespace = "  xmlns:" + targetNamespace + "=\"" + namespaceUrl + "\">";
	var _prototype = "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"" + namespace + "\n<soapenv:Header>$HEADER</soapenv:Header>"
			+ " \n<soapenv:Body>\n$BODY\n</soapenv:Body>\n</soapenv:Envelope>";

	var _name;
	var items = [];

	this.xml = _xmlSOAP;
	this.init = function() {
		this.xml = _prototype;
	};

	this.getString = function() {
		var str = "<" + targetNamespace + ":" + _name + ">\n";
		for ( var _i in items) {
			str += items[_i].getString() + "\n";
		}
		str += "</" + targetNamespace + ":" + _name + ">\n";

		return str;
	}

	this.getSOAP = function() {
		var smsg = _prototype.replace("$HEADER", "");
		smsg = smsg.replace("$BODY", this.getString());

		return smsg.replace(/\n/g, '');
	}

	this.getXml = function() {
		return this.xml;
	}

	this.setName = function(name) {
		_name = name;
	}

	this.add = function(_paramSOAPScop) {
		items.push(_paramSOAPScop);
	}
}

function paramSOAPScop() {
	this.key = "";
	var items = [];

	this.setKey = function(_key) {
		this.key = _key;
	}

	this.addItem = function(paramSOAPItem) {
		items.push(paramSOAPItem);
	}

	this.getString = function() {
		var str = "<" + this.key + ">";
		for ( var _i in items) {
			str += items[_i].getString();
		}
		str += "</" + this.key + ">";

		return str;
	}
}

function paramSOAPItem() {
	this.key = "";
	this.value = "";

	this.getString = function() {
		var str = "<" + this.key + ">";
		str += this.value;
		str += "</" + this.key + ">";

		return str;
	}
};

function ParserXml(textXml) {
	var xmlDoc;

	this.getXML = function() {
		return xmlDoc;
	}

	if (window.DOMParser) {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(textXml, "text/xml");
	} else // code for IE
	{
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.loadXML(textXml);
	}
	console.log(xmlDoc);

	this.getByTagName = function(strName, index) {
		var str = "";
		if (xmlDoc.getElementsByTagName(strName).length > 0 && index === undefined) {
			if (xmlDoc.getElementsByTagName(strName)[0].childNodes.length == 1) {
				str = xmlDoc.getElementsByTagName(strName)[0].childNodes[0].nodeValue;
			} else {
				if (xmlDoc.getElementsByTagName(strName)[0].childNodes.length == 0) {
					console.log("empty Value " + strName);
				} else {
					console.log("it root xml tag, Node > 1 :  " + strName);
				}
			}
		} else if (xmlDoc.getElementsByTagName(strName).length > 0 && index < xmlDoc.getElementsByTagName(strName).length) {
			if (xmlDoc.getElementsByTagName(strName)[index].childNodes.length == 1) {
				str = xmlDoc.getElementsByTagName(strName)[index].childNodes[0].nodeValue;
			} else {
				if (xmlDoc.getElementsByTagName(strName)[index].childNodes.length == 0) {
					// console.log("empty Value " + strName);
				} else {
					console.log("it root xml tag, Node > 1 :  " + strName);
				}
			}
		}
		return str;
	};

	this.getVal = function(tagName, index) {
		return this.getByTagName(tagName, index);
	}

	this.getSize = function(strName) {
		var size = 0;
		size = xmlDoc.getElementsByTagName(strName).length;
		return size;
	};

	this.countChild = function(tagName, index) {
		return xmlDoc.getElementsByTagName("GoodsList")[index].children.length;
	};
}