myApp.service('plantService', ['$http', function($http) {
  var self = this;

  self.plants = { list: [] };

  self.addPlant = function(plantToSend){
    console.log('in addSeed service with seedToSend-->', plantToSend);
    return $http({
      method:'POST',
      url:'/planner/addPlant',
      data: plantToSend,
    }).then(function( response ) {
      console.log('in service for addSeed with response-->', response );
      self.getPlants();
      return response;
    }, function error ( response ){
      console.log( 'Error in addPlant:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end POST '/planner/addPlant'
  };//end addPlant POST

  self.getPlants = function () {
    console.log('in getPlants service');
    $http ({
      method: 'GET',
      url: '/planner/Plants',
    }).then( function (response) {
      console.log( 'getPlants resp:', response.data );
      self.plants.list = response.data;
      console.log (self.plants);
    }, function error ( response ){
      console.log( 'Error in getPlants:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end getPlants
  };//end getPlant GET

  self.getPlants();

}]);
