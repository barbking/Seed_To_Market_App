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
      self.getSold();
      return response;
    }, function error ( response ){
      console.log( 'Error in addSale:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end POST '/planner/addPlant'
  };//end addPlant POST

  self.getSold = function () {
    console.log('in getSold service');
    $http ({
      method: 'GET',
      url: '/planner/sold',
    }).then( function (response) {
      console.log( 'getSold resp:', response.data );
      self.sold.list = response.data;
    }, function error ( response ){
      console.log( 'Error in getSold:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end getPlants
  };//end getPlant GET

  self.getSold();
  }]);
