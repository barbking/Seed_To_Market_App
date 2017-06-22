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
    });
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
    });
  };//end getPlant GET

  self.getPlants();

}]);
