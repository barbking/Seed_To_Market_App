myApp.service('plantService', ['$http', '$location', function($http, $location) {
  var self = this;

  self.plants = { list: [] };
  self.plantsAndSeeds = { list: [] };

  self.addPlant = function(plantToSend){
    console.log('in addPlant service with plantToSend-->', plantToSend);
    return $http({
      method:'POST',
      url:'/planner/addPlant',
      data: plantToSend,
    }).then(function( response ) {
      console.log('in service for addPlant with response-->', response );
      self.getPlants();
      self.getPlantsAndSeeds();
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
    }, function error ( response ){
      console.log( 'Error in getPlants:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end getPlants
  };//end getPlant GET

  self.getPlants();

  self.getPlantsAndSeeds = function () {
    console.log('in getPlantsandSeeds service');
    $http ({
      method: 'GET',
      url: '/planner/PlantsAndSeeds',
    }).then( function (response) {
      console.log( 'getPlants resp:', response.data );
      self.plantsAndSeeds.list = response.data;
      console.log (self.plantsAndSeeds.list);
    });
  };//end getPlant GET

  self.getPlantsAndSeeds();
}]);
