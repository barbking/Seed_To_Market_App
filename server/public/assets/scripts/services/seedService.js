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




//Edit seed PUT
  self.editSeed = function(seed){
    console.log('in editseed service with seedToSend triggered by Update Button-->', seed);
    return $http({
      method:'PUT',
      url:'/inventory/editSeed',
      params: {
        crop: seed.crop,
        variety: seed.variety,
        purchase_date: seed.purchase_date,
        lot_number: seed.lot_number,
        quantity: seed.quantity,
        item_code: seed.item_code,
        supplier_id: seed.supplier_id,
        organic: seed.organic,
        untreated:seed.untreated,
        non_gmo: seed.non_gmo,
        seed_check_sources: seed.seed_check_sources,
        receipt_url: seed.receipt_url,
        seed_id: seed.seed_id
      }//end params
    }).then(function( response ) {
      console.log('in service for editSeed with response-->', response );
      // self.getSeeds();
      return response;
    }, function error (response){
      console.log('error in update seed', response);
      if (response.status === 403) {
        $location.path('/');
      }
    });//end error
  };//end edit seed PUT


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

}]);//end Seedservice
