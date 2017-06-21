myApp.controller( 'FarmController', [ '$http', '$filter', '$location', 'farmService', function( $http, $filter, $location, farmService ) {
  var vm = this;


vm.getFarmInfo = function(){
  farmService.getFarm().then( function ( data ){
    vm.farm = data;
  });
  console.log("vm.farm-->", vm.farm);
};


    vm.saveFarm = function() {
      console.log('in savefarm');
      farmService.updateFarm(vm.farm);


    };

  vm.getFarmInfo();

}]);//end FarmController
