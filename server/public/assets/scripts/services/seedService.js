//   Seed Service
myApp.service('seedService', ['$http', function($http) {

  this.addSeed = function(seedToSend){
    console.log('in addSeed service with seedToSend-->', seedToSend);
    return $http({
      method:'POST',
      url:'/inventory/addSeed',
      data: seedToSend,
    }).then(function( response ) {
      console.log('in service for addSeed with response-->', response );
      return response;
    });
  };//end addSeed POST

  this.getSeeds = function () {
    console.log('in getSeeds service');
    return $http ({
      method: 'GET',
      url: '/inventory',
    }).then( function success(response) {
      console.log( 'getSeeds resp:', response );
      return response.data;
    });
  };//end getSeeds GET

}]);
