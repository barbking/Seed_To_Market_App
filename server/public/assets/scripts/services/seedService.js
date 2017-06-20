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

}]);
