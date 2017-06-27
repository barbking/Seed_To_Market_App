//   Seed Service
myApp.service('seedService', ['$http', '$location', function($http, $location) {
  var self = this;

  //empty object as placeholder for data that will be returned for inventory page
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
    }, function error ( response ){
      console.log( 'Error in addSeed:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end POST '/inventory/addSeed'
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
    }, function error ( response ){
      console.log( 'Error in getSeeds:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end GET '/inventory'
  };//end getSeeds GET

  self.getSeeds();

  self.updateSeedStock = function (seedToUpdate) {
    console.log('in updateSeedStock service with seedToUpdate-->', seedToUpdate);
    return $http({
      method:'PUT',
      url:'/planner/updateSeedStock',
      data: seedToUpdate,
    }).then(function( response ) {
      console.log('in service for updateSeedStock with response-->', response );
      self.getSeeds();
      self.getPlannerSeeds();
      return response;
    }, function error ( response ){
      console.log( 'Error in updateSeedStock:', response );
      if ( response.status === 403 ) {
        $location.path( '/' );
      }
    }); // end POST
  };//end updatePlanted

}]);
