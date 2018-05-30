
function selectedAccessory( element ) {
	console.log('element ', element);
	var accessoryid = element.getAttribute( "accessoryid" );
	console.log( 'accessory ', accessoryid, ' clicked');
	localStorage.setItem( 'accessoryid', accessoryid );
}


$(document).ready(() => {
  const requestURL = 'store';
  // console.log('making ajax request to: ', requestURL);


  // Display child's points
	$.ajax( {
		url: 'store',
		type: 'POST',
		data: {
			childid: localStorage.getItem( 'childid' )
		},
		success: ( data ) => {
			console.log( 'points = ', data[0].points );
			$( '#ptsTotal' ).text( data[0].points + " pts" );
		}
	});

  // $('#ptsTotal').click( () => {
  // 	$.ajax( {
  // 		url: 'ptsTotal',
  // 		type: 'POST',
  // 		data: {
  // 			childid: localStorage.getItem('childid')
  // 		},
  // 		success: ( data ) => {
  // 			$('#ptsTotal').innerHTML = data[0].points + " pts";
  // 		}
  // 	})
  // });


  // upon clicked accessory, save id to local storage
  $('.items').click( () => {
  	var accessoryid = this.getAttribute( "accessoryid" );
  	localStorage.setItem( 'accessoryid', accessoryid );

  	$.ajax( {
  		url: 'toPurchase',
  		type: 'POST',
  		data: {

  		}
  	})
  })

});
