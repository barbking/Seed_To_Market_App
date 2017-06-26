myApp.service('sellService', ['$http', '$location', function($http, $location) {
  var self = this;

  self.sold = { list: [] };

  self.addSale = function(saleToSend){
    console.log('in addSale service with saleToSend-->', saleToSend);
    return $http({
      method:'POST',
      url:'/planner/addSale',
      data: saleToSend,
    }).then(function( response ) {
      console.log('in service for addSale response-->', response );
      // self.getHarvest();
      // self.getHarvestAndCrop();
      return response;
    }, function error ( response ){
      console.log( 'Error in addSale:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end POST '/planner/addPlant'
  };//end addPlant POST

  }]);
