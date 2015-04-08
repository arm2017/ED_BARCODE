var BEAN = {};
BEAN.BeanType = 'Bean';
BEAN.ListType = 'List';
 BEAN.syncMasterDataResponse = { status : '' , description : '' , entrepreneur : BEAN.BeanType };
 BEAN.entrepreneur = { licenseNo : ''  , licenseAllowedName : '' ,  factoryName : '' , licenseStartDate : '' , licenseEndDate : '' , taxNo : '' , factoryAddress : '' , productList : BEAN.ListType };
 BEAN.productList = {productGroup : '' ,productCode : '' ,  productName : '' , brandMajor: '' ,brandMinor : '' , model : '' , size : '' , unit : '' , degree : '' ,taxByValue : '' 
			,taxByCapacity : '' ,  taxByLiter : '' , lowestDegreeNoTax : '' , taxPlusByDegree : '' , lowestSellingPriceNoTax : '' , taxPlusBySellingPrice : '' , announcePriceDate : '' 
			, announcePriceValue : '' };
BEAN.submitOnlineResponse = { status : '' ,  description : '' , referenceCode : '' };	

		//convertXML
		function convertXML ( xmlDoc ) {
				var syncMaster  = {};
				syncMaster = injectBean (xmlDoc , 'syncMasterDataResponse');	
				logBean( syncMaster );
				return syncMaster;
		}
		function convertXMLByname ( xmlDoc , masterBeanName) {
				var syncMaster  = {};
				syncMaster = injectBean (xmlDoc , masterBeanName );	
				logBean( syncMaster );
				return syncMaster;
		}

		function injectBean (xmlDoc , beanName , array , index) {
			var isList = false;
			if(array != undefined && index < 1 ){
				 return array;
			}else if (index != undefined) {
				isList = true;
			}

			var bean = BEAN[ beanName ] ;
			if( bean == undefined ) { 
				throw new Error('Bean not Found '  +  beanName) ; 
			}
				var beanClone = jQuery.extend({}, bean);
				var keys = Object.keys(beanClone);

					for (var i = 0; i < keys.length; i++) {
						var k = keys[i];
						console.log( k );
						if(  beanClone[k] == "" ){
							// string int 
							var nodes = xmlDoc.getElementsByTagName( k );
							if(nodes.length != 0){
								if(isList){
									beanClone[k] = nodes[ index - 1].innerHTML;
								}else{
									beanClone[k] = nodes[0].innerHTML;
								}
							}
						} else	if( beanClone[k] == BEAN.BeanType ){
							// object 
							beanClone[k] = injectBean (xmlDoc, k );

						} else	if( beanClone[k] == BEAN.ListType ){
							// list object
							var nodes = xmlDoc.getElementsByTagName( k );
							var listLength = nodes.length ;
							beanClone[k] = injectBean (xmlDoc,k , new Array() , listLength);
						}
					}
					if(array != undefined ){
						array.push( beanClone );
						return injectBean (xmlDoc , beanName  , array , index - 1 );
					}

				return beanClone;
		}

function logBean( msg ){
	console.log('bean js----->' );
	console.log(msg );
	console.log('<----- bean js' );
}

	

