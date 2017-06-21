//   Seed Service
myApp.service('seedService', ['$http', function($http) {
  var self = this;

  //empty object as placeholder for data that will be returned
  self.inventory = { list: [] };

  self.addSeed = function(seedToSend){
    console.log('in addSeed service with seedToSend-->', seedToSend);
    return $http({
      method:'POST',
      url:'/inventory/addSeed',
      data: seedToSend,
    }).then(function( response ) {
      console.log('in service for addSeed with response-->', response );
      self.getSeeds();
      return response;
    });
  };//end addSeed POST

  self.getSeeds = function () {
    console.log('in getSeeds service');
    $http ({
      method: 'GET',
      url: '/inventory',
    }).then( function (response) {
      console.log( 'getSeeds resp:', response.data );
      self.inventory.list = response.data;
      console.log (self.inventory);
    });
  };//end getSeeds GET

  self.getSeeds();

}]);
